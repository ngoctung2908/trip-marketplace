import { useEffect } from 'react'
import { usePrivateSaleContract } from 'hooks/useContract'
import { useDispatch } from 'react-redux'
import { fetchUserBalance } from '../../homePage/userSlice'
import { AppDispatch } from 'store/store'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'

const UserInfo = ({ pid, account }) => {
  const privateSaleContract = usePrivateSaleContract()
  const dispatch = useDispatch<AppDispatch>()
  const balance = useSelector((state: RootState) => state.user.value)

  useEffect(() => {
    if (account) {
      dispatch(fetchUserBalance({ account, pid, contract: privateSaleContract }))
    }
  }, [account, dispatch, privateSaleContract, pid])

  return (
    <div className="md:w-1/2 bg-sky-900 rounded p-5">
      <p className="text-white">Your balance: {balance} ONETRIP</p>
      <p className="text-white">Claimed: 0/{balance} ONETRIP</p>
    </div>
  )
}

export default UserInfo
