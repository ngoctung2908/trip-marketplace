import { Outlet } from 'react-router-dom'
import Header from './header'

export const Layout = () => {
  return (
    <div className="bg-app-backgound">
      <Header />
      <div className="p-3">
        <Outlet />
      </div>
    </div>
  )
}
