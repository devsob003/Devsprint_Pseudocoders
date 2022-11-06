import { AnchorProvider, Program } from "@project-serum/anchor";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { PROGRAM_KEY } from "../constants";

const useProgram = () => {
	const { connection } = useConnection();
	const { publicKey } = useWallet();
	const anchorWallet = useAnchorWallet();
	const IDL = require("../constants/idl/idl.json");

	const program = useMemo(() => {
		if (!anchorWallet) return;

		const provider = new AnchorProvider(
			connection,
			anchorWallet,
			AnchorProvider.defaultOptions()
		);
		return new Program(IDL, PROGRAM_KEY, provider);

	}, [connection, anchorWallet, IDL]);

	return { program, anchorWallet, connection, publicKey }
}

export default useProgram;