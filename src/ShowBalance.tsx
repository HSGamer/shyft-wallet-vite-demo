type BalanceProps = {
    balance: number
}

function ShowBalance(balanceProps: BalanceProps) {
    if (balanceProps.balance < 0) {
        return <p>Getting Balance</p>
    } else {
        return <p>Balance: {balanceProps.balance}</p>
    }
}

export default ShowBalance;