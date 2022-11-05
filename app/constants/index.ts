import { PublicKey } from "@solana/web3.js";

export const PROGRAM_KEY = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_PUBLIC_KEY ?? "");