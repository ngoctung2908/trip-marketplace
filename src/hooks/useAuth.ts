import { useCallback } from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { connectors } from 'utils/web3React'
import { useAppDispatch } from 'store/hooks'
import { toast } from 'react-toastify'
import { setupNetwork } from 'utils/wallet'

const useAuth = () => {
  const dispatch = useAppDispatch()
  const { chainId, activate, deactivate } = useWeb3React()

  const login = useCallback(
    (connector) => {
      if (connector) {
        // connector.handleAccountsChanged = () => localStorage.removeItem('token')
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork()
            if (hasSetup) {
              activate(connector)
            }
          } else {
            window.localStorage.removeItem('provider')
            if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
              toast.error('Provider Error: No provider was found', {
                autoClose: 3000,
                hideProgressBar: true,
              })
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector
                walletConnector.walletConnectProvider = null
              }
              toast.error('Authorization Error: Please authorize to access your account', {
                autoClose: 3000,
                hideProgressBar: true,
              })
            } else {
              toast.error(`${error.name}: ${error.message}`, {
                autoClose: 3000,
                hideProgressBar: true,
              })
            }
          }
        })
      } else {
        toast.error('Unable to find connector: The connector config is wrong', {
          autoClose: 3000,
          hideProgressBar: true,
        })
      }
    },
    [activate]
  )

  // const logout = useCallback(() => {
  //   dispatch(profileClear())
  //   dispatch(resetUserNftState())
  //   deactivate()
  //   // This localStorage key is set by @web3-react/walletconnect-connector
  //   if (window.localStorage.getItem('walletconnect')) {
  //     connectorsByName.walletconnect.close()
  //     connectorsByName.walletconnect.walletConnectProvider = null
  //   }
  //   window.localStorage.removeItem(connectorLocalStorageKey)
  //   if (chainId) {
  //     dispatch(clearAllTransactions({ chainId }))
  //   }
  // }, [deactivate, dispatch, chainId])

  return { login }
}

export default useAuth
