import {Group, Loader, Text} from "@mantine/core";
import {useWallet} from "@solana/wallet-adapter-react";
import {useEffect, useState} from "react";
import {shyft} from "./ShyftUtil.ts";

function FetchBalance() {
    const {publicKey} = useWallet();
    const [balance, setBalance] = useState<number>(-1);

    useEffect(() => {
        const fetchBalance = async () => {
            if (!publicKey) return;
            const bal = await shyft.wallet.getBalance({wallet: publicKey!.toBase58()});
            setBalance(bal);
        };

        fetchBalance().catch(console.error);
    }, [publicKey]);

    return <Group>
        {
            balance < 0
                ? (
                    <Loader/>
                )
                : (
                    <Text>Balance: {balance}</Text>
                )
        }
    </Group>
}

export default FetchBalance;