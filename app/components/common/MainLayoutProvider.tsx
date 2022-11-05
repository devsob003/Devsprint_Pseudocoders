import { Container, Grid } from "@mantine/core";
import { createContext, FC, PropsWithChildren, ReactNode, useCallback, useContext, useState } from "react";
import Navbar from "../Navbar";

interface MainLayoutProviderProps extends PropsWithChildren {}

interface MainLayoutContext {
	attachRightSide: (children: ReactNode) => void;
}

export const MainLayoutContext = createContext<MainLayoutContext | null>(null);

const MainLayoutProvider: FC<MainLayoutProviderProps> = ({ children }) => {
	const [rightSide, setRightSide] = useState<ReactNode | null>(null);

	const attachRightSide = useCallback((children: ReactNode) => setRightSide(children), [setRightSide]);

	return (
		<MainLayoutContext.Provider
			value={{
				attachRightSide,
			}}>
			<Container
				style={{
					minWidth: "100%",
					overflow: "auto",
					height: "100vh",
					paddingLeft: "10%",
					paddingRight: "10%",
					background: "#2c2f33",
				}}
				p={0}
				m={0}>
				<Grid style={{ minHeight: "100vh" }} m={0}>
					<Grid.Col
						xs={2}
						style={{ background: "#2c2f33", position: "relative", borderLeft: "1px solid #23272a" }}
						p={0}>
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
						{children}
					</Grid.Col>
					<Grid.Col xs={3} style={{ background: "#2c2f33", borderRight: "1px solid #23272a" }}>
						{rightSide}
					</Grid.Col>
				</Grid>
			</Container>
		</MainLayoutContext.Provider>
	);
};

export function useMainLayout() {
	return useContext(MainLayoutContext);
}

export default MainLayoutProvider;
