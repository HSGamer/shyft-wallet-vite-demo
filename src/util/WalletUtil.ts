import {Connection, Transaction} from "@solana/web3.js";
import {WalletAdapterProps} from "@solana/wallet-adapter-base";

export async function confirmTransaction(transaction: Transaction, connection: Connection, sendTransaction: WalletAdapterProps['sendTransaction']) {
    const {
        context: {slot: minContextSlot},
        value: {blockhash, lastValidBlockHeight}
    } = await connection.getLatestBlockhashAndContext();

    const signature = await sendTransaction(transaction, connection, {minContextSlot});
    await connection.confirmTransaction({blockhash, lastValidBlockHeight, signature});
}

export async function confirmEncodedTransaction(encodedTransaction: string, connection: Connection, sendTransaction: WalletAdapterProps['sendTransaction']) {
    await confirmTransaction(Transaction.from(Buffer.from(encodedTransaction, 'base64')), connection, sendTransaction);
}