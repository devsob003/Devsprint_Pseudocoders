import { Button, createStyles, Modal, Navbar as MantineNavbar } from "@mantine/core";
import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";

import { faGhost, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { Program } from "@project-serum/anchor";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import Link from "next/link";
import { PROFILE_STATE } from "../constants/seeds";
import { useProgram } from "../hooks";
import NavbarLink from "./NavbarLink";
import CustomWalletButton from "./nossr/CustomWalletButton";
import CreateProfileForm from "./CreateProfileForm";

interface NavbarProps extends PropsWithChildren {}

const useStyles = createStyles((theme) => ({
	wallet_btn_container: {
		"wallet-adapter-dropdown": {
			width: "100%",
		},
	},

	profile_btn: {
		marginBottom: "10px",
		width: "100%",
		borderColor: "#c8b2ff",
		color: "#c8b2ff",
		padding: "1em 2em",
		height: "auto",
	},
}));

const navbarLinks = [
	{ label: "Explore", href: "/", icon: faHashtag },
	{ label: "Creators", href: "/creators", icon: faGhost },
];

const checkIfCreator = async (publicKey: PublicKey, program: Program) => {
	try {
		const [profilePda, profileBump] = await findProgramAddressSync(
			[PROFILE_STATE, publicKey.toBuffer()],
			program.programId
		);

		await program.account.profile.fetch(profilePda);
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};

const Navbar: FC<NavbarProps> = () => {
	const { classes } = useStyles();
	const links = navbarLinks.map((item) => <NavbarLink {...item} key={item.label} />);
	const { publicKey, program } = useProgram();
	const anchorWallet = useAnchorWallet();
	const [isCreator, setIsCreator] = useState<boolean>();
	const [createProfileModalOpened, setCreateProfileModalOpened] = useState<boolean>(false);

	useEffect(() => {
		setIsCreator(false);
		if (!publicKey || !program || !anchorWallet) return;

		checkIfCreator(publicKey, program)
			.then(setIsCreator)
			.catch((err) => {
				console.error(err);
				setIsCreator(false);
			});
	}, [anchorWallet, setIsCreator, publicKey, program]);

	const handleBecomeCreatorBtn = () => {
		setCreateProfileModalOpened(true);
	};

	const createProfile = useCallback(
		async ({ name, bio }: { name: string; bio: string }) => {
			if (!program || !publicKey) return;

			const [profilePda, profileBump] = await findProgramAddressSync(
				[PROFILE_STATE, publicKey.toBuffer()],
				program.programId
			);

			const tx = await program.methods
				.createProfile(name, bio)
				.accounts({
					profile: profilePda,
					signer: publicKey,
					systemProgram: SystemProgram.programId,
				})
				.rpc();
			setCreateProfileModalOpened(false);
		},
		[program, publicKey]
	);

	return (
		<>
			<MantineNavbar
				width={{ base: "100%" }}
				height="100%"
				style={{ background: "transparent", border: "none", padding: 8 }}>
				<MantineNavbar.Section grow>{links}</MantineNavbar.Section>
				<MantineNavbar.Section>
					{isCreator ? (
						<Button
							variant="outline"
							uppercase
							component={Link}
							href="/profile"
							className={classes.profile_btn}>
							Profile
						</Button>
					) : (
						<Button
							variant="outline"
							uppercase
							className={classes.profile_btn}
							onClick={handleBecomeCreatorBtn}>
							Become a creator
						</Button>
					)}
					<CustomWalletButton />
				</MantineNavbar.Section>
			</MantineNavbar>
			<Modal opened={createProfileModalOpened} onClose={() => setCreateProfileModalOpened(false)}>
				<CreateProfileForm onSubmit={(values) => createProfile(values)} />
			</Modal>
		</>
	);
};

export default Navbar;
