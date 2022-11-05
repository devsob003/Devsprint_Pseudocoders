import type { AppProps } from "next/app";
import WalletContext from "../components/WalletContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<WalletContext network="http://localhost:8899">
			<Component {...pageProps} />
		</WalletContext>
	);
}
