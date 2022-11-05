import { useTheme } from "@emotion/react";
import { Container, Grid, ScrollArea } from "@mantine/core";
import "@solana/wallet-adapter-react-ui/styles.css";
import Navbar from "../components/Navbar";
import { useProgram } from "../hooks";

export default function Home() {
	const { program, publicKey } = useProgram();

	return (
		<Container style={{ minWidth: "100%", overflow: "auto", height: "100vh" }} p={0} m={0}>
			<Grid style={{ minHeight: "100vh" }} m={0}>
				<Grid.Col xs={2} style={{ background: "#2c2f33", position: "relative" }} p={0}>
					<Container
						style={{
							position: "sticky",
							top: 0,
							margin: 0,
							padding: 0,
							height: "100vh",
						}}>
						<Navbar />
					</Container>
				</Grid.Col>
				<Grid.Col xs={7} style={{ background: "#23272a" }}>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat nihil autem molestiae perferendis
					error. Accusantium natus ad, numquam sed fuga nemo quos magni qui repellat doloremque cupiditate
					saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat nihil autem
					molestiae perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui repellat
					doloremque cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					Placeat nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed fuga nemo quos
					magni qui repellat doloremque cupiditate saepe id quam? p=
					{20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat nihil autem molestiae
					perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui repellat doloremque
					cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
					nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui
					repellat doloremque cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur
					adipisicing elit. Placeat nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed
					fuga nemo quos magni qui repellat doloremque cupiditate saepe id quam? p=
					{20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat nihil autem molestiae
					perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui repellat doloremque
					cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
					nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui
					repellat doloremque cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur
					adipisicing elit. Placeat nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed
					fuga nemo quos magni qui repellat doloremque cupiditate saepe id quam? p=
					{20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat nihil autem molestiae
					perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui repellat doloremque
					cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
					nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui
					repellat doloremque cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur
					adipisicing elit. Placeat nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed
					fuga nemo quos magni qui repellat doloremque cupiditate saepe id quam? p=
					{20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat nihil autem molestiae
					perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui repellat doloremque
					cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
					nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui
					repellat doloremque cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur
					adipisicing elit. Placeat nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed
					fuga nemo quos magni qui repellat doloremque cupiditate saepe id quam? p=
					{20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat nihil autem molestiae
					perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui repellat doloremque
					cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
					nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui
					repellat doloremque cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur
					adipisicing elit. Placeat nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed
					fuga nemo quos magni qui repellat doloremque cupiditate saepe id quam? p=
					{20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat nihil autem molestiae
					perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui repellat doloremque
					cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
					nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui
					repellat doloremque cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur
					adipisicing elit. Placeat nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed
					fuga nemo quos magni qui repellat doloremque cupiditate saepe id quam? p=
					{20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat nihil autem molestiae
					perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui repellat doloremque
					cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
					nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui
					repellat doloremque cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur
					adipisicing elit. Placeat nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed
					fuga nemo quos magni qui repellat doloremque cupiditate saepe id quam? p=
					{20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat nihil autem molestiae
					perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui repellat doloremque
					cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
					nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui
					repellat doloremque cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur
					adipisicing elit. Placeat nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed
					fuga nemo quos magni qui repellat doloremque cupiditate saepe id quam? p=
					{20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat nihil autem molestiae
					perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui repellat doloremque
					cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
					nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui
					repellat doloremque cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur
					adipisicing elit. Placeat nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed
					fuga nemo quos magni qui repellat doloremque cupiditate saepe id quam? p=
					{20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat nihil autem molestiae
					perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui repellat doloremque
					cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
					nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui
					repellat doloremque cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur
					adipisicing elit. Placeat nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed
					fuga nemo quos magni qui repellat doloremque cupiditate saepe id quam? p=
					{20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat nihil autem molestiae
					perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui repellat doloremque
					cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
					nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui
					repellat doloremque cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur
					adipisicing elit. Placeat nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed
					fuga nemo quos magni qui repellat doloremque cupiditate saepe id quam? p=
					{20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat nihil autem molestiae
					perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui repellat doloremque
					cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
					nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui
					repellat doloremque cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur
					adipisicing elit. Placeat nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed
					fuga nemo quos magni qui repellat doloremque cupiditate saepe id quam? p=
					{20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat nihil autem molestiae
					perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui repellat doloremque
					cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
					nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui
					repellat doloremque cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur
					adipisicing elit. Placeat nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed
					fuga nemo quos magni qui repellat doloremque cupiditate saepe id quam? p=
					{20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat nihil autem molestiae
					perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui repellat doloremque
					cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
					nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui
					repellat doloremque cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur
					adipisicing elit. Placeat nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed
					fuga nemo quos magni qui repellat doloremque cupiditate saepe id quam? p=
					{20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat nihil autem molestiae
					perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui repellat doloremque
					cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
					nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui
					repellat doloremque cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur
					adipisicing elit. Placeat nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed
					fuga nemo quos magni qui repellat doloremque cupiditate saepe id quam? p=
					{20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat nihil autem molestiae
					perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui repellat doloremque
					cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
					nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui
					repellat doloremque cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur
					adipisicing elit. Placeat nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed
					fuga nemo quos magni qui repellat doloremque cupiditate saepe id quam? p=
					{20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat nihil autem molestiae
					perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui repellat doloremque
					cupiditate saepe id quam? p={20}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
					nihil autem molestiae perferendis error. Accusantium natus ad, numquam sed fuga nemo quos magni qui
					repellat doloremque cupiditate saepe id quam? p={20}
				</Grid.Col>
				<Grid.Col xs={3} style={{ background: "#2c2f33" }}>
					Recommendations
				</Grid.Col>
			</Grid>
		</Container>
	);
}
