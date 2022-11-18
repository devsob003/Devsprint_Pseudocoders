import { Button, Card, Container, createStyles, Group, Modal, ScrollArea, Text, Title } from "@mantine/core";
import { BN, Program } from "@project-serum/anchor";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { useConnection } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { generateKeyPairSync } from "crypto";
import Image from "next/image";
import { FC, useCallback, useEffect, useState } from "react";
import { PROFILE_STATE } from "../../constants/seeds";
import { useProgram } from "../../hooks";
import CreateMembershipForm from "../CreateMembershipForm";
import CreatePostForm from "../CreatePostForm";
import Post from "../post/Post";
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

interface PintProps {
	pint: any;
}

const Pint: FC<PintProps> = ({ pint }) => {
	const { publicKey, program } = useProgram();
	const [sending, setSending] = useState<boolean>(false);

	const sendToken = useCallback(
		(amount: number) => {
			if (!publicKey || !program || sending) return;
			setSending(true);

			(async () => {
				console.log("trying to buy");
				console.log(JSON.stringify(pint));
				const [profilePda, profileBump] = await findProgramAddressSync(
					[PROFILE_STATE, pint.account.authority.toBuffer()],
					program.programId
				);

				const tx = await program.methods
					.buyMembership()
					.accounts({
						authority: profilePda,
						signer: publicKey,
						membershipPlan: pint.publicKey,
						systemProgram: SystemProgram.programId,
					})
					.rpc();

				setSending(false);
			})();
		},
		[publicKey, program, sending, setSending, pint]
	);

	return (
		<Card style={{ width: "265.33px", marginRight: "10px" }}>
			<Title>{pint.account.name}</Title>
			<Text>{pint.account.description}</Text>
			<Button
				style={{ width: "100%", marginTop: "10px", background: "#512da8" }}
				disabled={sending}
				onClick={() => sendToken(pint.account.amount)}>
				Send {pint.account.amount.toString()} Lamport
			</Button>
		</Card>
	);
};

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

const getPostByProfile = async (program: Program, profile: any) => {
	return await program.account.post.all([
		{
			memcmp: {
				offset: 8,
				bytes: profile.authority.toString(),
			},
		},
	]);
};

const ProfileDetail: FC<ProfileDetailProps> = () => {
	const profileCtx = useProfile();
	const { publicKey, program, connection } = useProgram();
	const { classes } = useStyles();
	const [openedCreateMembership, setOpenedCreateMembership] = useState<boolean>(false);
	const [openedCreatePost, setOpenedCreatePost] = useState<boolean>(false);
	const [pints, setPints] = useState<any[]>();
	const [currentAccountBalance, setCurrentAccountBalance] = useState<number>(0);
	const [posts, setPosts] = useState<any[]>();

	useEffect(() => {
		if (!program || !profileCtx || !profileCtx.profile) return;
		loadPints(program, profileCtx?.profile.authority.toString())
			.then((pints) => setPints(pints))
			.catch(console.error);
	}, [profileCtx, program]);

	useEffect(() => {
		if (!program || !profileCtx || !connection || !profileCtx.profile || !publicKey) return;
		if (profileCtx?.profile.authority.toString() === publicKey?.toString()) {
			(async () => {
				const [profilePda, profileBump] = await findProgramAddressSync(
					[PROFILE_STATE, publicKey.toBuffer()],
					program.programId
				);
				let balance = await connection.getBalance(profilePda);
				setCurrentAccountBalance(balance);
			})();
		}

		getPostByProfile(program, profileCtx.profile).then((posts) => setPosts(posts));
	}, [profileCtx, program, connection]);

	const createMembership = useCallback(
		async (values: { name: string; description: string; amount: number }) => {
			if (!program || !publicKey) return;

			const [profilePda, profileBump] = await findProgramAddressSync(
				[PROFILE_STATE, publicKey.toBuffer()],
				program.programId
			);

			const tx = await program.methods
				.createMembershipPlan(values.name, values.description, new BN(values.amount))
				.accounts({
					profile: profilePda,
					authority: publicKey,
					membership_plan: Keypair.generate().publicKey,
					systemProgram: SystemProgram.programId,
				})
				.rpc();
			setOpenedCreateMembership(false);
			loadPints(program, profileCtx?.profile.authority.toString())
				.then((pints) => setPints(pints))
				.catch(console.error);
		},
		[program, publicKey]
	);

	const createPost = useCallback(
		async (values: { body: string }) => {
			if (!program || !publicKey || !profileCtx) return;
			const [profilePda, profileBump] = await findProgramAddressSync(
				[PROFILE_STATE, publicKey.toBuffer()],
				program.programId
			);

			const tx = await program.methods
				.createPost(values.body)
				.accounts({
					profile: profilePda,
					authority: publicKey,
					post: Keypair.generate().publicKey,
					systemProgram: SystemProgram.programId,
				})
				.rpc();
			getPostByProfile(program, profileCtx?.profile).then((posts) => setPosts(posts));
			setOpenedCreatePost(false);
		},
		[program, publicKey, setOpenedCreatePost, profileCtx]
	);

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

					{publicKey?.toString() === profileCtx.profile.authority.toString() && (
						<Container py={20}>
							<Text inline c="white" fz="lg">
								Current account balance:{" "}
								<span style={{ color: "lime", fontWeight: "bold" }}>{currentAccountBalance}</span>{" "}
								Lamports
							</Text>
						</Container>
					)}

					<Container py={30}>
						<Group>
							<Title order={3} color={"white"}>
								{publicKey?.toString() === profileCtx.profile.authority.toString()
									? "My Pints"
									: "Pints offered"}
							</Title>
							{publicKey?.toString() === profileCtx.profile.authority.toString() && (
								<Button
									uppercase
									onClick={() => {
										setOpenedCreateMembership(true);
									}}>
									create
								</Button>
							)}
						</Group>

						<ScrollArea style={{ marginTop: "20px" }}>
							<div style={{ display: "flex" }}>
								{pints?.map((pint) => (
									<Pint pint={pint} key={pint.publicKey.toString()} />
								))}
							</div>
						</ScrollArea>
					</Container>

					<Container py={30}>
						<Group>
							<Title order={3} color={"white"}>
								Posts
							</Title>
							{publicKey?.toString() === profileCtx.profile.authority.toString() && (
								<Button
									uppercase
									onClick={() => {
										setOpenedCreatePost(true);
									}}>
									create
								</Button>
							)}
						</Group>

						<Container p={0} pt={10}>
							{posts?.map((post) => (
								<Post post={post} key={post.publicKey.toString()} />
							))}
						</Container>
					</Container>
				</Container>
			)}

			<Modal opened={openedCreateMembership} onClose={() => setOpenedCreateMembership(false)}>
				<CreateMembershipForm onSubmit={(values) => createMembership(values)} />
			</Modal>

			<Modal opened={openedCreatePost} onClose={() => setOpenedCreatePost(false)}>
				<CreatePostForm onSubmit={(values) => createPost(values)} />
			</Modal>
		</>
	);
};

export default ProfileDetail;
