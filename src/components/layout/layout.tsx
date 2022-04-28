import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'
import { WalletModal } from './../modal/walletModal'

export const Layout = () => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div className="bg-app-backgound">
      <Header onOpen={setOpen} />
      <div className="p-3">
        <Outlet />
      </div>
      <WalletModal open={open} onClose={setOpen} />
    </div>
  )
}
