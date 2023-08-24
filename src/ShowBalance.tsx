import { Loader, Text } from "@mantine/core";
import {useWallet} from "@solana/wallet-adapter-react";
import {useEffect, useState} from "react";
import {shyft} from "./ShyftUtil.ts";

type BalanceProps = {
    balance: number
}

function ShowBalance(balanceProps: BalanceProps) {
    return <div>
        {
            balanceProps.balance < 0
                ? (
                    <Loader />
                )
                : (
                    <Text>Balance: {balanceProps.balance}</Text>
                )
        }
    </div>
}

function FetchBalance() {
    const { publicKey } = useWallet();
    const [ balance, setBalance ] = useState<number>(-1);

    useEffect(() => {
        const fetchBalance = async () => {
            if (!publicKey) return;
            const bal = await shyft.wallet.getBalance({ wallet: publicKey!.toBase58() });
            setBalance(bal);
        };

        fetchBalance().catch(console.error);
    }, [publicKey]);

    return (
        !publicKey
            ? <Text>Not Connected</Text>
            : <ShowBalance balance={balance} />
    )
}

export default FetchBalance;