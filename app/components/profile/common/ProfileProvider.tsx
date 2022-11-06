import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Container, Loader } from "@mantine/core";
import { Program } from "@project-serum/anchor";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { PublicKey } from "@solana/web3.js";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { PROFILE_STATE } from "../../../constants/seeds";
import { useProgram } from "../../../hooks";

type Profile = any | null;

interface ProfileContextProps {
	profile: Profile;
}

export const ProfileContext = createContext<ProfileContextProps | null>(null);

const loadProfile = async (program: Program, publicKey: string) => {
	const _publicKey = new PublicKey(publicKey);
	const [profilePDA, profileBump] = await findProgramAddressSync(
		[PROFILE_STATE, _publicKey.toBuffer()],
		program.programId
	);

	return await program.account.profile.fetch(profilePDA);
};

interface ProfileContextProviderProps extends PropsWithChildren {
	publicKey: string | undefined;
}

const Spinner = () => (
	<Container style={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
		<Loader />
	</Container>
);

const ErrorMessage = () => (
	<Container style={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
		<Alert icon={<FontAwesomeIcon icon={faCircleExclamation} />} p="lg" title="Bummer!" color="red">
			We could not load the profile
		</Alert>
	</Container>
);

const ProfileContextProvider: FC<ProfileContextProviderProps> = ({ children, publicKey }) => {
	const [profile, setProfile] = useState<Profile>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [loaded, setLoaded] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const { program } = useProgram();

	useEffect(() => {
		if (!program || !publicKey || loaded || profile) return;
		console.log("useEffect");
		loadProfile(program, publicKey)
			.then((profile) => {
				console.log("profile");
				setProfile(profile);
				setError(false);
			})
			.catch((err) => {
				console.error(err);
				setError(true);
			})
			.finally(() => {
				setLoading(false);
				setLoaded(true);
			});
		return () => {};
	}, [publicKey, program, loaded, profile]);

	return (
		<ProfileContext.Provider value={{ profile }}>
			{loading ? <Spinner /> : error ? <ErrorMessage /> : children}
		</ProfileContext.Provider>
	);
};

export function useProfile() {
	return useContext(ProfileContext);
}

export default ProfileContextProvider;
