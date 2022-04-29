import { Link } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import truncateHash from 'utils/truncateHash'

type HeaderProps = {
  onOpen: (value: boolean) => void
}

const Header = (props: HeaderProps) => {
  const { onOpen } = props
  const { account } = useWeb3React()
  return (
    <div className="px-5 py-3 bg-sky-900 flex justify-between items-center">
      <Link to="" className="text-2xl text-white font-bold">
        Logo
      </Link>
      <ul className="flex gap-x-8">
        <li className="text-white font-semibold flex items-center">Token</li>
        <li className="text-white font-semibold flex items-center">Voucher</li>
        <li className="text-white font-semibold flex items-center">About</li>
        <li className="text-white font-semibold flex items-center">Contact</li>
        <li>
          {account ? (
            <span className="text-white font-semibold">{truncateHash(account, 8, 4)}</span>
          ) : (
            <button
              onClick={() => onOpen(true)}
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
