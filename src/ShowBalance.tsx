import { Loader, Text } from "@mantine/core";

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

export default ShowBalance;