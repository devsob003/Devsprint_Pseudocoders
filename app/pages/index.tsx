import { Col, Container, Grid } from "@mantine/core";
import { WalletConnectButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import Navbar from "../components/Navbar";
import WalletMultiButton from "../components/nossr/WalletMultiButton";
import { useProgram } from "../hooks";

export default function Home() {
	const { program, publicKey } = useProgram();

	return (
		<Container style={{ minWidth: "100%", overflow: "auto", height: "100vh" }} p={0} m={0}>
			<Grid style={{ minHeight: "100vh", position: "relative" }} m={0}>
				<Grid.Col xs={2} style={{ background: "#2c2f33" }}>
					<Navbar />
				</Grid.Col>
				<Grid.Col xs={7} style={{ background: "#23272a" }} p={20}>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil provident quam minima ducimus
					voluptate! Exercitationem accusamus natus aliquam ad ratione? Cupiditate perferendis officiis
					nesciunt nam, velit quos voluptatem laborum possimus.
				</Grid.Col>
				<Grid.Col xs={3} style={{ background: "#2c2f33" }}>
					Recommendations
				</Grid.Col>
			</Grid>
		</Container>
	);
}
