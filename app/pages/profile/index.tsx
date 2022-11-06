import { Container, Group, Loader, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useProgram } from "../../hooks";

const ProfileRedirectPage = () => {
	const { publicKey } = useProgram();
	const router = useRouter();

	useEffect(() => {
		if (!publicKey) return;
		router.push("/profile/[pid]", "/profile/" + publicKey.toString());
	}, [publicKey, router]);

	return (
		<Container style={{ height: "100%", display: "grid", placeItems: "center" }}>
			<Group>
				<Loader />
				<Text c="white">Redirecting to your profile page</Text>
			</Group>
		</Container>
	);
};

export default ProfileRedirectPage;
