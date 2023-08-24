import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {useState} from "react";
import {shyft} from "./ShyftUtil.ts";
import {Transaction} from "@solana/web3.js";
import {Button, Group, Text} from "@mantine/core";

export function CreateMarketplaceButton() {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [ marketplaceAddress, setMarketplaceAddress ] = useState<string | undefined>(undefined);

    const createMarketplace = async () => {
        if (!publicKey) return;
        const marketplace = await shyft.marketplace.create({
            creatorWallet: publicKey.toBase58()
        });

        const transaction = Transaction.from(Buffer.from(marketplace.encoded_transaction, 'base64'));
        const {
            context: { slot: minContextSlot },
            value: { blockhash, lastValidBlockHeight }
        } = await connection.getLatestBlockhashAndContext();

        const signature = await sendTransaction(transaction, connection, { minContextSlot });
        await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });

        setMarketplaceAddress(marketplace.address);
    }

    return <Group>
        <Button onClick={createMarketplace}>Create Marketplace</Button>
        <Text>Marketplace: {marketplaceAddress}</Text>
    </Group>
}