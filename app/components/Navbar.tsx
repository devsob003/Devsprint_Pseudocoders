import { createStyles, Navbar as MantineNavbar } from "@mantine/core";
import { FC, PropsWithChildren } from "react";

import CustomWalletButton from "./CustomWalletButton";
import WalletMultiButton from "./nossr/WalletMultiButton";
import Link from "next/link";
import NavbarLink from "./NavbarLink";

interface NavbarProps extends PropsWithChildren {}

const useStyles = createStyles((theme) => ({
	wallet_btn_container: {
		"wallet-adapter-dropdown": {
			width: "100%",
		},
	},
}));

const navbarLinks = [{ label: "Explore", icon: null }];

const Navbar: FC<NavbarProps> = () => {
	const { classes } = useStyles();
	const links = navbarLinks.map((item) => <NavbarLink {...item} key={item.label} />);

	return (
		<MantineNavbar width={{ base: "100%" }} height="100%" style={{ background: "transparent", border: "none" }}>
			<MantineNavbar.Section grow>{links}</MantineNavbar.Section>
			<MantineNavbar.Section>
				<CustomWalletButton />
			</MantineNavbar.Section>
		</MantineNavbar>
	);
};

export default Navbar;
