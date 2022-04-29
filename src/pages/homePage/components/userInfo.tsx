import { useState, useEffect } from 'react'
import { usePrivateSaleContract } from 'hooks/useContract'
import toNormalNumber from 'utils/toNormalNumber'

const UserInfo = ({ pid, account }) => {
  const [balance, setBalance] = useState('0')
  const privateContract = usePrivateSaleContract()

  useEffect(() => {
    const getUserBalance = async () => {
      const val = await privateContract.userBuy(account, pid)
      setBalance(toNormalNumber(val))
    }
    if (account) {
      getUserBalance()
    }
  }, [account, privateContract])

  return account && <p className="text-center text-gray-700">Your balance: {balance} ONETRIP</p>
}

export default UserInfo
