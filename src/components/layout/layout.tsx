import { Outlet } from 'react-router-dom'
import { RootState } from 'store/store'
import { useSelector } from 'react-redux'
import Header from './header'
import { WalletModal } from './../modal/walletModal'

export const Layout = () => {
  const open = useSelector((state: RootState) => state.walletModal.open)
  return (
    <div className="bg-app-backgound">
      <Header />
      <div className="p-3">
        <Outlet />
      </div>
      <WalletModal open={open} />
    </div>
  )
}
