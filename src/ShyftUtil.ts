import {Network, ShyftSdk} from "@shyft-to/js";

export const shyft = new ShyftSdk({ apiKey: import.meta.env.VITE_API_KEY, network: Network.Devnet });