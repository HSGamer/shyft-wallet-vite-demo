import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {useState} from "react";
import {shyft} from "./util/ShyftUtil.ts";
import {Button, Group, Text} from "@mantine/core";
import {confirmEncodedTransaction} from "./util/WalletUtil.ts";

export function CreateMarketplaceButton() {
    const {connection} = useConnection();
    const {publicKey, sendTransaction} = useWallet();
    const [marketplaceAddress, setMarketplaceAddress] = useState<string | undefined>(undefined);

    const fetchMarketplace = async () => {
        if (!publicKey) return;

        const marketplace = await shyft.marketplace.find({
            authorityAddress: publicKey.toBase58()
        })

        setMarketplaceAddress(marketplace.address)
    }

    const createMarketplace = async () => {
        await fetchMarketplace();
        if (marketplaceAddress) return;

        if (!publicKey) return;
        const marketplace = await shyft.marketplace.create({
            creatorWallet: publicKey.toBase58()
        });

        await confirmEncodedTransaction(marketplace.encoded_transaction, connection, sendTransaction);

        setMarketplaceAddress(marketplace.address);
    }

    return <Group>
        <Button onClick={createMarketplace}>Create Marketplace</Button>
        <Button onClick={fetchMarketplace}>Fetch Marketplace</Button>
        <Text>Marketplace: {marketplaceAddress}</Text>
    </Group>
}