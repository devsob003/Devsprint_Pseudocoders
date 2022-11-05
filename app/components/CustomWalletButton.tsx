import { Button, Container, createStyles, Popover } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import {
	FC,
	forwardRef,
	ForwardRefRenderFunction,
	HTMLProps,
	PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

interface CustomWalletButtonProps extends PropsWithChildren {}

const useStyles = createStyles((theme) => ({
	container: {
		width: "100%",
	},

	button: {
		width: "100%",
		background: "#512da8",
		borderRadius: "5px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",

		":hover": {
			background: "#1a1f2e",
		},
	},

	logo: {
		marginRight: 10,
	},

	dropdownContainer: {
		background: "#512da8",
		border: "none",
		padding: 0,
	},

	dropdown_btn: {
		width: "100%",
		background: "transparent",
		margin: 0,
		height: "50px",

		":hover": {
			background: "#1a1f2e",
		},
	},
}));

interface DropDownContentProps extends HTMLProps<HTMLDivElement> {
	onCopy?: () => void;
	onDisconnect?: () => void;
	onSelectWallet?: () => void;
}
const DropdownContentWithRef: ForwardRefRenderFunction<HTMLDivElement, DropDownContentProps> = (
	{ onCopy, onDisconnect, onSelectWallet },
	ref
) => {
	const { classes } = useStyles();
	const [copied, setCopied] = useState<boolean>(false);

	const onCopyHandler = () => {
		if (onCopy) onCopy();
		setCopied(true);
		setTimeout(() => setCopied(false), 400);
	};

	return (
		<Container p={0} ref={ref}>
			<Button className={classes.dropdown_btn} onClick={onCopyHandler}>
				{copied ? "Copied" : "Copy address"}
			</Button>
			<Button className={classes.dropdown_btn} onClick={onSelectWallet}>
				Change wallet
			</Button>
			<Button className={classes.dropdown_btn} onClick={onDisconnect}>
				Disconnect
			</Button>
		</Container>
	);
};

const DropdownContent = forwardRef(DropdownContentWithRef);

const CustomWalletButton: FC<CustomWalletButtonProps> = ({ children }) => {
	const { classes } = useStyles();
	const { publicKey, wallet, disconnect, connecting, connected } = useWallet();
	const { setVisible } = useWalletModal();
	const [opened, { open, close }] = useDisclosure(false);
	const dropDownRef = useRef<HTMLDivElement>(null);

	const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
	const content = useMemo(() => {
		if (children) return children;
		if (connecting) return "Connecting...";
		if (connected) {
			return base58 ? base58.slice(0, 6) + "..." + base58.slice(-6) : "Connected";
		}
		if (wallet) return "Connect";
		return "Select Wallet";
	}, [children, connecting, connected, wallet, base58]);

	const icon = useMemo(() => {
		if (wallet) return wallet.adapter.icon;
		else return null;
	}, [wallet]);

	const copyAddress = useCallback(async () => {
		if (base58) {
			await navigator.clipboard.writeText(base58);
		}
	}, [base58]);

	const openModal = useCallback(() => {
		setVisible(true);
	}, [setVisible]);

	const handleClick = () => {
		if (!wallet) openModal();
		open();
	};

	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent) => {
			const node = dropDownRef.current;

			// Do nothing if clicking dropdown or its descendants
			if (!node || node.contains(event.target as Node)) return;

			close();
		};

		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);

		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	});

	useEffect(() => {
		if (!connected) close();
	}, [connected, close]);

	return (
		<>
			<Popover width="target" position="top-end" shadow="md" opened={opened}>
				<Container className={classes.container} m={0} p={0}>
					<Popover.Target>
						<Button className={classes.button} h={48} onClick={handleClick}>
							{icon && (
								<Image src={icon} width={24} height={24} alt="Wallet Logo" className={classes.logo} />
							)}
							{content}
						</Button>
					</Popover.Target>
				</Container>
				<Popover.Dropdown className={classes.dropdownContainer} m={0}>
					<DropdownContent
						ref={dropDownRef}
						onCopy={copyAddress}
						onDisconnect={disconnect}
						onSelectWallet={openModal}
					/>
				</Popover.Dropdown>
			</Popover>
		</>
	);
};

export default CustomWalletButton;
