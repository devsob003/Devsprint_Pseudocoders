import { Card, CardSection, createStyles, Group, Text } from "@mantine/core";
import Link from "next/link";
import { FC } from "react";
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

interface PostProps {
	body: string;
	authorPublicKey: string;
	likes: number;
}

const Post: FC<PostProps> = ({ body, authorPublicKey, likes }) => {
	const { classes } = useStyles();
	return (
		<Card className={classes.container}>
			<Card.Section className={classes.header}>
				<Link href={"/profile/" + authorPublicKey} className={classes.author_link}>
					{authorPublicKey.slice(0, 6) + "..." + authorPublicKey.slice(-6)}
				</Link>
				<Text className={classes.timestamp} title={"Posted 17h ago"}>
					17h
				</Text>
			</Card.Section>
			<Card.Section className={classes.post_section}>
				<Text>{body}</Text>
			</Card.Section>
			<CardSection className={classes.actions}>
				<Group>
					<LikeButton likes={likes} />
				</Group>
			</CardSection>
		</Card>
	);
};

export default Post;
