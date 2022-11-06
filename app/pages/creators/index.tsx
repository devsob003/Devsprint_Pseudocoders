import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Container, createStyles, Loader } from "@mantine/core";
import { Program } from "@project-serum/anchor";
import { useEffect, useState } from "react";
import ProfileCard from "../../components/profile/Profile";
import { useProgram } from "../../hooks";

const useStyles = createStyles((theme) => ({
	container: {},
	loader_container: {
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
}));

const SomethingWentWrongError = () => {
	const { classes } = useStyles();
	return (
		<Container className={classes.loader_container}>
			<Alert icon={<FontAwesomeIcon icon={faCircleExclamation} />} p="lg" title="Bummer!" color="red">
				Something went wrong while accessing our decentralised network! Please try again later.
			</Alert>
		</Container>
	);
};

const getAllProfiles = async (program: Program) => {
	const profiles = await program.account.profile.all();
	return profiles;
};

export default function Creators() {
	const { classes } = useStyles();
	const [profiles, setProfiles] = useState<any[]>();
	const [loaded, setLoaded] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const { program } = useProgram();

	useEffect(() => {
		if (!program) return;

		getAllProfiles(program)
			.then((profiles) => {
				setProfiles(profiles);
			})
			.catch((err) => {
				console.error(err);
				setError(true);
			})
			.finally(() => {
				setLoaded(true);
			});
	}, [setLoaded, setProfiles, program, setError]);

	return (
		<>
			{loaded ? (
				error ? (
					<SomethingWentWrongError />
				) : (
					<Container className={classes.container} p={0}>
						{profiles?.map((profile) => (
						<ProfileCard profile={profile} key={profile.publicKey.toString()} />
					))}
					</Container>
				)
			) : (
				<Container className={classes.loader_container}>
					<Loader />
				</Container>
			)}
		</>
	);
}
