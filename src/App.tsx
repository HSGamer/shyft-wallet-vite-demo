import {WalletAdapterNetwork} from '@solana/wallet-adapter-base';
import {ConnectionProvider, useWallet, WalletProvider} from '@solana/wallet-adapter-react';
import {WalletModalProvider, WalletMultiButton} from '@solana/wallet-adapter-react-ui';
import {clusterApiUrl} from '@solana/web3.js';
import {FC, ReactNode, useMemo} from 'react';

import FetchBalance from './ShowBalance'

import '@solana/wallet-adapter-react-ui/styles.css';
import {MantineProvider, Text} from '@mantine/core';
import {CreateMarketplaceButton} from "./CreateMarketplace.tsx";
import {ShowWallet} from "./ShowWallet.tsx";

const App: FC = () => {
    return (
        <Context>
            <MantineProvider withGlobalStyles withNormalizeCSS>
                <Content/>
            </MantineProvider>
        </Context>
    );
};
export default App;

const Context: FC<{ children: ReactNode }> = ({children}) => {
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
    const {publicKey} = useWallet();

    return (
        <div className="App">
            <WalletMultiButton/>
            {
                !publicKey ? <Text>Not connected</Text> : <>
                    <ShowWallet />
                    <FetchBalance/>
                    <CreateMarketplaceButton/>
                </>
            }
        </div>
    );
};

