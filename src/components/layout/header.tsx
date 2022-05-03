import { Link } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { Popover } from '@headlessui/react'
import truncateHash from 'utils/truncateHash'
import useAuth from 'hooks/useAuth'
import { useDispatch } from 'react-redux'
import { open } from '../modal/walletModal/walletModalSlice'

const Header = () => {
  const { account } = useWeb3React()
  const { logout } = useAuth()
  const dispatch = useDispatch()

  return (
    <div className="px-5 py-3 bg-sky-900 flex justify-between items-center">
      <Link to="" className="text-2xl text-white font-bold">
        Logo
      </Link>
      <ul className="flex gap-x-8">
        <li>
          {account ? (
            <Popover className="relative">
              <Popover.Button>
                <span className="text-white font-semibold">{truncateHash(account, 8, 4)}</span>
              </Popover.Button>
              <Popover.Panel className="absolute z-10">
                <div className="bg-sky-900 p-5">
                  <button onClick={logout} className="text-white">
                    Logout
                  </button>
                </div>
              </Popover.Panel>
            </Popover>
          ) : (
            <button
              onClick={() => dispatch(open())}
              className="bg-teal-600 text-white rounded px-5 py-1 font-semibold"
            >
              Connect wallet
            </button>
          )}
        </li>
      </ul>
    </div>
  )
}

export default Header
