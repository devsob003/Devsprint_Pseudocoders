import { Button, Card, Container, createStyles, Group, ScrollArea, Text, Title } from "@mantine/core";
import { Program } from "@project-serum/anchor";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { PublicKey } from "@solana/web3.js";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { PROFILE_STATE } from "../../constants/seeds";
import { useProgram } from "../../hooks";
import { useProfile } from "./common/ProfileProvider";

interface ProfileDetailProps {}

const useStyles = createStyles((theme) => ({
	profile_image: {
		borderRadius: "50%",
		padding: "0.2em",
		background: "white",
	},

	profile_section: {
		background: "transparent",
		position: "relative",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: "1em",
	},

	profile_details: {
		// background: "white",
		height: "180px",
		flex: "1",
		zIndex: 10,
		display: "flex",
		justifyContent: "center",
		paddingLeft: "4em",
		flexDirection: "column",
	},
}));

const loadPints = async (program: Program, publicKey: string) => {
	return await program.account.membershipPlan.all([
		{
			memcmp: {
				offset: 8,
				bytes: publicKey,
			},
		},
	]);
};

const ProfileDetail: FC<ProfileDetailProps> = () => {
	const profileCtx = useProfile();
	const { publicKey, program } = useProgram();
	const { classes } = useStyles();
	const [pints, setPints] = useState<any[]>();

	useEffect(() => {
		if (!program || !profileCtx || !profileCtx.profile) return;
		loadPints(program, profileCtx?.profile)
			.then((pints) => console.log(pints))
			.catch(console.error);
	}, [profileCtx, program]);

	return (
		<>
			{profileCtx && (
				<Container>
					<Card style={{ backgroundColor: "transparent" }}>
						<Card.Section className={classes.profile_section}>
							<Image
								src={`https://avatars.dicebear.com/api/avataaars/${profileCtx.profile.authority.toString()}.svg`}
								width={200}
								height={200}
								alt="profile image"
								className={classes.profile_image}
							/>

							<Container className={classes.profile_details}>
								<Title c={"#c8b2ff"} mb={10}>
									{profileCtx.profile.name}
								</Title>
								<Text c="#eee">{profileCtx.profile.authority.toString()}</Text>
							</Container>
						</Card.Section>
					</Card>
					<Container py={30}>
						<Title order={3} color={"white"}>
							My Pints
						</Title>

						<ScrollArea></ScrollArea>
					</Container>
				</Container>
			)}
		</>
	);
};

export default ProfileDetail;
