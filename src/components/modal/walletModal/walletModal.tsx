import { Fragment } from 'react'

import { useWeb3React } from '@web3-react/core'
import { connectors } from 'utils/web3React'

import useAuth from 'hooks/useAuth'
import Modal from '../modal'
import bscSvg from 'assets/img/bsc.svg'
import metamaskSvg from 'assets/img/metamask.svg'
import walletConnectSvg from 'assets/img/wallet-connect.svg'

type WalletModalProps = {
  open: boolean
  onClose: (value: boolean) => void
}

export const WalletModal = (props: WalletModalProps) => {
  const { open, onClose } = props
  const { activate } = useWeb3React()
  const { login } = useAuth()
  const setProvider = (type) => {
    window.localStorage.setItem('provider', type)
  }
  return (
    <Modal open={open} onClose={onClose}>
      <>
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h6 className="text-gray-700 font-semibold text-xl">Select wallet</h6>
          <div className="flex flex-col gap-y-4 sm:items-start mt-5">
            <button
              onClick={() => {
                login(connectors.bscWallet)
                setProvider('bscWallet')
                onClose(false)
              }}
              className="flex items-center gap-x-2 border-gray-300 border shadow-sm rounded-md w-full justify-center py-1 text-gray-700 hover:bg-gray-50 font-medium"
            >
              <img src={bscSvg} alt="" /> Binance Chain
            </button>
            <button
              onClick={() => {
                login(connectors.walletConnect)
                setProvider('walletConnect')
                onClose(false)
              }}
              className="flex items-center gap-x-2 border-gray-300 border shadow-sm rounded-md w-full justify-center py-1 text-gray-700 hover:bg-gray-50 font-medium"
            >
              <img src={walletConnectSvg} alt="" /> Wallet Connect
            </button>
            <button
              onClick={() => {
                login(connectors.injected)
                setProvider('injected')
                onClose(false)
              }}
              className="flex items-center gap-x-2 border-gray-300 border shadow-sm rounded-md w-full justify-center py-1 text-gray-700 hover:bg-gray-50 font-medium"
            >
              <img src={metamaskSvg} alt="" /> Metamask
            </button>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => onClose(false)}
          >
            Cancel
          </button>
        </div>
      </>
    </Modal>
  )
}
