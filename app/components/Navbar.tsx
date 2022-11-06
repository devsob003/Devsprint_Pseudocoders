import { Button, createStyles, Navbar as MantineNavbar } from "@mantine/core";
import { FC, PropsWithChildren, useEffect, useState } from "react";

import CustomWalletButton from "./nossr/CustomWalletButton";
import NavbarLink from "./NavbarLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { useProgram } from "../hooks";
import { PublicKey } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import { PROFILE_STATE } from "../constants/seeds";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

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

	return (
		<MantineNavbar
			width={{ base: "100%" }}
			height="100%"
			style={{ background: "transparent", border: "none", padding: 8 }}>
			<MantineNavbar.Section grow>{links}</MantineNavbar.Section>
			<MantineNavbar.Section>
				{isCreator && (
					<Button variant="outline" uppercase component="a" href="/profile" className={classes.profile_btn}>
						Profile
					</Button>
				)}
				<CustomWalletButton />
			</MantineNavbar.Section>
		</MantineNavbar>
	);
};

export default Navbar;
