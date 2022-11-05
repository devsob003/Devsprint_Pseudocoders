import { Card, CardSection, createStyles, Group, Text } from "@mantine/core";
import { Program } from "@project-serum/anchor";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { PublicKey } from "@solana/web3.js";
import Link from "next/link";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { PROFILE_STATE } from "../../constants/seeds";
import { useOnScreen, useProgram } from "../../hooks";
import LikeButton from "./LikeButton";

const useStyles = createStyles((theme) => ({
	container: {
		background: "#33363a",
		boxShadow: "0 6px 6px -6px #0f0e11",
		color: theme.white,
		borderRadius: "5px",
		marginBottom: "10px",
		"> div": {
			padding: "1em 2em",
		},
	},
	header: {
		paddingBottom: "0 !important",
	},
	post_section: {
		background: "transparent",
		paddingBottom: "0 !important",
	},
	author_link: {
		color: "#b596ff",
		display: "inline-block",
		marginRight: "10px",
	},
	timestamp: {
		display: "inline-block",
		color: "#777",
	},
	actions: {},
}));

const getProfileInfo = async (program: Program, authority: PublicKey) => {
	const [profilePda, profileBump] = await findProgramAddressSync(
		[PROFILE_STATE, authority.toBuffer()],
		program.programId
	);

	return await program.account.profile.fetch(profilePda);
};

interface PostProps {
	post: any; // TODO update with types
}

const Post: FC<PostProps> = ({ post }) => {
	const { classes } = useStyles();
	const postRef = useRef(null);
	const isOnScreen = useOnScreen(postRef);
	const [profile, setProfile] = useState<any>(null);
	const { program } = useProgram();

	useEffect(() => {
		// only load the profile names when the post is in viewport
		if (isOnScreen && program && !profile) {
			console.log("getting profile name");
			getProfileInfo(program, post.account.authority)
				.then((profile: any) => {
					setProfile(profile);
				})
				.catch(() => {
					setProfile(null);
				});
		}
	}, [isOnScreen, program, setProfile, post, profile]);

	const profileDisplayName = useMemo(() => {
		if (profile == null)
			return post.account.authority.toString().slice(0, 6) + "..." + post.account.authority.toString().slice(-6);
		else return profile.name;
	}, [profile, post]);

	return (
		<Card className={classes.container} ref={postRef}>
			<Card.Section className={classes.header}>
				<Link href={"/profile/" + post.account.authority.toString()} className={classes.author_link}>
					{profileDisplayName}
				</Link>
				<Text className={classes.timestamp} title={"Posted 17h ago"}>
					17h
				</Text>
			</Card.Section>
			<Card.Section className={classes.post_section}>
				<Text>{post.account.body}</Text>
			</Card.Section>
			<CardSection className={classes.actions}>
				<Group>
					<LikeButton likes={0} />
				</Group>
			</CardSection>
		</Card>
	);
};

export default Post;
