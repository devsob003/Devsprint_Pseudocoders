import type { AppProps } from "next/app";
import WalletContext from "../components/WalletContext";
import "../styles/globals.css";
import MainLayoutProvider from "../components/common/MainLayoutProvider";
import { ScrollArea } from "@mantine/core";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<WalletContext network="http://localhost:8899">
			<MainLayoutProvider>
				<Component {...pageProps} />
			</MainLayoutProvider>
		</WalletContext>
	);
}
