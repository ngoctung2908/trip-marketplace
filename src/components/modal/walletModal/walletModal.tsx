import { connectors } from 'utils/web3React'
import useAuth from 'hooks/useAuth'
import Modal from '../modal'
import { useDispatch } from 'react-redux'
import { close } from '../walletModal/walletModalSlice'

import circleMetamaskSvg from 'assets/img/circle-metamask.svg'
import circleBscSvg from 'assets/img/circle-bsc.svg'
import circleMathWalletkSvg from 'assets/img/circle-mathwallet.svg'
import circleSafepalSvg from 'assets/img/circle-safepal.svg'
import circleTrustWalletSvg from 'assets/img/circle-trustwallet.svg'
import circleWalletConnectSvg from 'assets/img/circle-walletconnect.svg'
import circleTokenpocketSvg from 'assets/img/circle-tokenpocket.svg'

type WalletModalProps = {
  open: boolean
}

const WALLETS = [
  { name: 'Metamask', icon: circleMetamaskSvg, provider: 'injected' },
  { name: 'WalletConnect', icon: circleWalletConnectSvg, provider: 'walletConnect' },
  { name: 'Binance Chain Wallet', icon: circleBscSvg, provider: 'bscWallet' },
  { name: 'TrustWallet', icon: circleTrustWalletSvg, provider: 'injected' },
  { name: 'MathWallet', icon: circleMathWalletkSvg, provider: 'injected' },
  { name: 'TokenPocket', icon: circleTokenpocketSvg, provider: 'injected' },
  { name: 'Safepal Wallet', icon: circleSafepalSvg, provider: 'injected' },
]

export const WalletModal = (props: WalletModalProps) => {
  const { open } = props
  const { login } = useAuth()
  const dispatch = useDispatch()

  const setProvider = (type) => {
    window.localStorage.setItem('provider', type)
  }

  return (
    <Modal open={open}>
      <div className="bg-white px-4 pt-5 sm:p-6 pb-6">
        <div className="flex justify-between items-center" onClick={() => dispatch(close())}>
          <h6 className="text-gray-700 font-semibold text-xl">Connect to wallet</h6>
          <button className="outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-y-2 sm:items-start mt-5">
          {WALLETS.map((wallet) => {
            return (
              <button
                onClick={() => {
                  login(connectors[wallet.provider])
                  setProvider(wallet.provider)
                  dispatch(close())
                }}
                key={wallet.name}
                className="flex items-center justify-between bg-[rgb(239,244,245)] border-none rounded-xl w-full px-8 py-2 text-gray-700 hover:opacity-80 font-medium"
              >
                {wallet.name} <img src={wallet.icon} alt="" />
              </button>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}
