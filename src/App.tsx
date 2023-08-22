import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { FC, ReactNode, useMemo, useState, useEffect } from 'react';

import { ShyftSdk, Network } from '@shyft-to/js';

import ShowBalance from './ShowBalance'

import './App.css';
import '@solana/wallet-adapter-react-ui/styles.css';

const App: FC = () => {
    return (
        <Context>
            <Content />
        </Context>
    );
};
export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content: FC = () => {
    const { publicKey } = useWallet();
    const shyft = new ShyftSdk({ apiKey: "API_KEY", network: Network.Devnet });
    const [ balance, setBalance ] = useState<number>(-1);

    useEffect(() => {
        const fetchBalance = async () => {
            const bal = await shyft.wallet.getBalance({ wallet: publicKey!.toBase58() });
            setBalance(bal);
        };

        fetchBalance().catch(console.error);
    }, [shyft.wallet, publicKey]);

    return (
        <div className="App">
            <WalletMultiButton />
            {
            !publicKey 
                ? <p>Not Connected</p> 
                : <ShowBalance balance={balance} />
            }
        </div>
    );
};

