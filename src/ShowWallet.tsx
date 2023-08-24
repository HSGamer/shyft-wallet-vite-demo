import {useWallet} from "@solana/wallet-adapter-react";
import {Group, Text} from "@mantine/core";

export function ShowWallet() {
    const { publicKey } = useWallet();

    return <Group>
        <Text>Wallet: {publicKey?.toBase58()}</Text>
    </Group>
}