import { FC, PropsWithChildren } from "react";
import { createStyles, Navbar as MantineNavbar } from "@mantine/core";
import WalletMultiButton from "./nossr/WalletMultiButton";

import styles from "./Navbar.module.css";
import { WalletConnectButton, WalletDisconnectButton, WalletModalButton } from "@solana/wallet-adapter-react-ui";
import CustomWalletButton from "./CustomWalletButton";

interface NavbarProps extends PropsWithChildren {}

const useStyles = createStyles((theme) => ({
	wallet_btn_container: {
		"wallet-adapter-dropdown": {
			width: "100%",
		},
	},
}));

const Navbar: FC<NavbarProps> = () => {
	const { classes } = useStyles();

	return (
		<MantineNavbar width={{ base: "100%" }} height="100%" style={{ background: "transparent", border: "none" }}>
			<MantineNavbar.Section grow>
				<div>Hello</div>
			</MantineNavbar.Section>
			<MantineNavbar.Section>
				{/* <WalletMultiButton /> */}
				<CustomWalletButton />
			</MantineNavbar.Section>
		</MantineNavbar>
	);
};

export default Navbar;
