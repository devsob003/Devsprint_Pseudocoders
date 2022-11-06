import type { AppProps } from "next/app";
import WalletContext from "../components/WalletContext";
import "../styles/globals.css";
import MainLayoutProvider from "../components/common/MainLayoutProvider";

import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */

export default function App({ Component, pageProps }: AppProps) {
	return (
		<WalletContext network="https://api.devnet.solana.com">
			<MainLayoutProvider>
				<Component {...pageProps} />
			</MainLayoutProvider>
		</WalletContext>
	);
}
