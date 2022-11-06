import { Container, createStyles, Loader } from "@mantine/core";
import { Program } from "@project-serum/anchor";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useEffect, useState } from "react";
import { useMainLayout } from "../components/common/MainLayoutProvider";
import Post from "../components/post/Post";
import { useProgram } from "../hooks";

const useStyles = createStyles((theme) => ({
	container: {},
	loader_container: {
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
}));

const getPostByProfile = async (program: Program, profile: any) => {
	return await program.account.post.all([
		{
			memcmp: {
				offset: 8,
				bytes: profile.account.authority.toString(),
			},
		},
	]);
};

const getAllPosts = async (program: Program) => {
	const profiles = await program.account.profile.all();
	let posts: any[] = [];

	for (const profile of profiles) {
		const profilePosts = await getPostByProfile(program, profile);
		posts = [...posts, ...profilePosts];
	}

	return posts;
};

export default function Home({ data }: { data: any }) {
	const { program, publicKey } = useProgram();
	const { classes } = useStyles();
	const mainLayout = useMainLayout();
	const [feedLoaded, setFeedLoaded] = useState<boolean>(false);
	const [posts, setPosts] = useState<any[]>();

	useEffect(() => {
		if (!program || !publicKey || feedLoaded) return;
		getAllPosts(program)
			.then((posts) => {
				setPosts(posts);
			})
			.finally(() => {
				setFeedLoaded(true);
			});
	}, [program, publicKey, feedLoaded]);

	return (
		<>
			{feedLoaded ? (
				<Container className={classes.container} p={0}>
					{posts?.map((post) => (
						<Post post={post} key={post.publicKey.toString()} />
					))}
				</Container>
			) : (
				<Container className={classes.loader_container}>
					<Loader />
				</Container>
			)}
		</>
	);
}
