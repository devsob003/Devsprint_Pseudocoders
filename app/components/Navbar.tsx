import { createStyles, Navbar as MantineNavbar } from "@mantine/core";
import { FC, PropsWithChildren } from "react";

import CustomWalletButton from "./nossr/CustomWalletButton";
import NavbarLink from "./NavbarLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

interface NavbarProps extends PropsWithChildren {}

const useStyles = createStyles((theme) => ({
	wallet_btn_container: {
		"wallet-adapter-dropdown": {
			width: "100%",
		},
	},
}));

const navbarLinks = [{ label: "Explore", icon: <FontAwesomeIcon icon={faCoffee} /> }];

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
