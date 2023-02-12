import './App.css';
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core'





const CoinbaseWallet = new WalletLinkConnector({
  url: 'https://mainnet.infura.io/v3/${process.env.INFURA_KEY}',
  appName: "Web3-react Demo",
  supportedChainIds: [1, 3, 4, 5, 42],
 });


 const WalletConnect = new WalletConnectConnector({

  rpcUrl: 'https://mainnet.infura.io/v3/${process.env.INFURA_KEY}',
  bridge: "https://bridge.walletconnect.org/",
  qrcode: true,
 });
 
const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
 });




function App() {
  const { activate, deactivate } = useWeb3React();
  const { chainId, account } = useWeb3React();
  const { library } = useWeb3React();

  const switchNetwork = async () => {
    try{
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: "0x63564c40",
            rpcUrls: ["https://api.harmony.one"],
            chainName: "Harmony Mainnet",
            nativeCurrency: { name: "ONE", decimals: 18, symbol: "ONE" },
            blockExplorerUrls: ["https://explorer.harmony.one"],
            iconUrls: ["https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png"]
          }
        ],
      });
    }
    catch (error) {
      console.error(error)
  }
  };

  return (
    <div className="App">

      <h1>Connect your wallet</h1>

      <button id='btn' onClick={() => { activate(CoinbaseWallet) }}>Coinbase Wallet</button>
      <button id='btn' onClick={() => { activate(WalletConnect) }}>Wallet Connect</button>
      <button id='btn' onClick={() => { activate(Injected) }}>Metamask</button>

      <h1>Wallet information: </h1>
      <div className='info'>Account: {account}</div>
      <div className='info'>Network ID: {chainId}</div>


    </div>
  );
}

export default App;
