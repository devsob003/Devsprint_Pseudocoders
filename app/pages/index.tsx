import { Container, createStyles } from "@mantine/core";
import { Program } from "@project-serum/anchor";
import "@solana/wallet-adapter-react-ui/styles.css";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useMainLayout } from "../components/common/MainLayoutProvider";
import Post from "../components/post/Post";
import { useProgram } from "../hooks";

const useStyles = createStyles((theme) => ({
	container: {},
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

const getAllPosts = async (publicKey: PublicKey, program: Program) => {
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
		getAllPosts(publicKey, program).then((posts) => {
			console.log(posts);
			setPosts(posts);
		});
	}, [program, publicKey, feedLoaded]);

	return (
		<Container className={classes.container} p={0}>
			{posts?.map((post) => (
				<Post
					key={post.publicKey.toString()}
					body={post.account.body}
					authorPublicKey={post.account.authority.toString()}
					likes={0}
				/>
			))}
		</Container>
	);
}
