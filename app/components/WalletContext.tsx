import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { FC, PropsWithChildren, useMemo } from "react";

interface WalletContextProps extends PropsWithChildren {
	network: WalletAdapterNetwork | string;
}

const WalletContext: FC<WalletContextProps> = ({ network, children }) => {
	const endpoint = useMemo(() => {
		if (typeof network == "string") return network;
		return clusterApiUrl(network);
	}, [network]);

	const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

	return (
		<>
			<ConnectionProvider endpoint={endpoint}>
				<WalletProvider wallets={wallets} autoConnect>
					<WalletModalProvider>{children}</WalletModalProvider>
				</WalletProvider>
			</ConnectionProvider>
		</>
	);
};

export default WalletContext;
