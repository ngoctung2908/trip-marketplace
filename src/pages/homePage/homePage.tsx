import { useState } from 'react'
import { usePrivateSaleContract } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'

import PoolInfo from './components/poolInfo'
import BuyTokenPanel from './components/buyTokenPanel'
import UserInfo from './components/userInfo'

const PID = 0
export const HomePage = () => {
  const privateSaleContract = usePrivateSaleContract()
  const { account } = useWeb3React()
  const [poolInfo, setPoolInfo] = useState(null)

  useEffect(() => {
    let isMounted = true
    const getPoolInfo = async () => {
      const pool = await privateSaleContract.poolInfo(PID)
      if (isMounted) {
        setPoolInfo(pool)
      }
    }

    if (account) {
      getPoolInfo()
    }

    return () => {
      isMounted = false
    }
  }, [privateSaleContract, account])

  return (
    poolInfo && (
      <div className="p-5">
        <PoolInfo poolInfo={poolInfo} />
        <div className="mt-5">
          <BuyTokenPanel pid={PID} poolInfo={poolInfo} account={account} />
        </div>
        <div className="mt-5">
          <UserInfo pid={PID} account={account} />
        </div>
      </div>
    )
  )
}
