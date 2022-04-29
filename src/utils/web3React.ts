import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { ethers } from 'ethers'

const POLLING_INTERVAL = 12000
const rpcUrl = process.env.REACT_APP_NODE || 'https://api.s0.b.hmny.io'
const chainId = parseInt(process.env.REACT_APP_CHAIN_ID || '1666700000', 10)

const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl },
  qrcode: true,
  supportedChainIds: [chainId],
})

const bscConnector = new BscConnector({ supportedChainIds: [chainId] })

const injected = new InjectedConnector({
  supportedChainIds: [chainId],
})

export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
  bscWallet: bscConnector,
}

export const getLibrary = (provider): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}
