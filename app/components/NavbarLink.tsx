import { ClassNames } from "@emotion/react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createStyles, Text } from "@mantine/core";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

interface NavbarLinkProps {
	label: string;
	href: string;
	icon: IconDefinition;
}

const useStyles = createStyles((theme) => ({
	link: {
		color: theme.white,
		transition: "all 100ms ease",
		display: "flex",
		alignItems: "center",
		padding: "1em",
		fontSize: "1.4em",
		borderRadius: "5px",
		marginBottom: "0.4em",

		":hover": {
			backgroundColor: "#21272a",
		},
	},

	active: {
		backgroundColor: "#21272a",
	},

	link_icon: {
		marginRight: "20px",
		fontSize: "1.4em",
		// verticalAlign: 'middle'
	},
}));

const NavbarLink: FC<NavbarLinkProps> = ({ label, icon, href }) => {
	const { classes } = useStyles();
	const router = useRouter();
	return (
		<Link
			href={href}
			className={classNames({
				[classes.link]: true,
				[classes.active]: router.pathname === href,
			})}>
			<FontAwesomeIcon icon={icon} className={classes.link_icon} />
			<Text>{label}</Text>
		</Link>
	);
};

export default NavbarLink;
