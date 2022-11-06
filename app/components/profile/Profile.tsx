import { Card, CardSection, createStyles, Group, Text } from "@mantine/core";
import { Program } from "@project-serum/anchor";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { PublicKey } from "@solana/web3.js";
import Link from "next/link";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { PROFILE_STATE } from "../../constants/seeds";
import { useOnScreen, useProgram } from "../../hooks";

const useStyles = createStyles((theme) => ({
	container: {
		background: "#33363a",
		boxShadow: "0 6px 6px -6px #0f0e11",
		color: theme.white,
		borderRadius: "5px",
		marginBottom: "10px",
	},
	header: {
		padding: "1em 2em",
	},

	bio: {
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
}));

const getProfileInfo = async (program: Program, authority: PublicKey) => {
	const [profilePda, profileBump] = await findProgramAddressSync(
		[PROFILE_STATE, authority.toBuffer()],
		program.programId
	);

	return await program.account.profile.fetch(profilePda);
};

interface ProfileCardProps {
	profile: any; // TODO update with types
}

const ProfileCard: FC<ProfileCardProps> = ({ profile }) => {
	const { classes } = useStyles();
	return (
		<Card className={classes.container}>
			<Card.Section
				className={classes.header}
				component="a"
				href={"/profile/" + profile?.account.authority.toString()}>
				<Text color="#c8b2ff" fz="xl">
					{profile?.account.name ?? "Loading..."}
				</Text>
				<Text color="#757575">{profile?.account.authority.toString()}</Text>
				<Text mt={10} className={classes.bio}>
					{profile?.account.bio ?? "Loading..."}
				</Text>
			</Card.Section>
		</Card>
	);
};

export default ProfileCard;
