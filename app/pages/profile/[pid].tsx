import { createStyles } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ProfileContextProvider, { useProfile } from "../../components/profile/common/ProfileProvider";
import ProfileDetail from "../../components/profile/ProfileDetail";

const useStyles = createStyles((theme) => ({}));

const Profile = () => {
	const router = useRouter();
	const { pid } = router.query;

	return (
		<ProfileContextProvider publicKey={pid?.toString()}>
			<ProfileDetail />
		</ProfileContextProvider>
	);
};

export default Profile;
