import { FC, ReactNode } from "react";

interface NavbarLinkProps {
	label: string;
	icon?: ReactNode;
}

const NavbarLink: FC<NavbarLinkProps> = ({ label, icon }) => {
	return <>{icon}</>;
};

export default NavbarLink;
