import dynamic from "next/dynamic";

const CustomWalletButton = dynamic(async () => (await import("../CustomWalletButton")), {
	ssr: false,
});

export default CustomWalletButton;
