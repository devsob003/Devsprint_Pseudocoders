import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useEffect } from "react";
import WalletMultiButton from "../components/nossr/WalletMultiButton";
import { PROFILE_STATE } from "../constants/seeds";
import { useProgram } from "../hooks";

export default function Home() {
	const { program, publicKey } = useProgram();

	// check if this user has any creator account

	useEffect(() => {
		if (program === undefined || publicKey === null) return;

		const work = async () => {
			const [profilePda, profileBump] = await findProgramAddressSync(
				[PROFILE_STATE, publicKey.toBuffer()],
				program.programId
			); // handle if something went wrong here

			try {
				
				const profileAccount = await program.account.profile.fetch(profilePda);
				console.log("Welcome creator!");
				console.log(profileAccount);

				// get all memberships under creator

				const memberships = await program.account.membershipPlan.all([
					{
						memcmp: {
							offset: 8,
							bytes: publicKey.toString(),
						},
					},
				]);

				const posts = await program.account.post.all([
					{
						memcmp: {
							offset: 8,
							bytes: publicKey.toString(),
						},
					},
				]);

				console.log(memberships);
				console.log(posts);

				const profiles = await program.account.profile.all();

				console.log(await program.account.profile);

				for (const profile of profiles) {
					// get posts for each profile
					console.log(profile);

					const posts = await program.account.post.all([
						{
							memcmp: {
								offset: 8,
								bytes: profile.account.authority.toString(),
							},
						},
					]);

					console.log(posts);
				}
			} catch (e) {
				console.log(e);
				console.log("You are not a creator!");
			}
		};

		work();
	}, [program]);

	useEffect(() => {
		console.log(program);
	}, [program]);

	return <WalletMultiButton />;
}
