import { useState, useCallback } from 'react'
import { ethers } from 'ethers'
import toNormalNumber from 'utils/toNormalNumber'
import NumberFormat from 'react-number-format'
import { usePrivateSaleContract, useOneUsdtContract } from 'hooks/useContract'
import addresses from 'config/constants/contracts'
import { getContractAddress } from 'utils'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { open } from 'components/modal/walletModal/walletModalSlice'
import { fetchUserBalance } from '../../homePage/userSlice'
import { AppDispatch } from 'store/store'
import { Button } from 'components/button'

const BuyTokenPanel = ({ pid, poolInfo, account }) => {
  const [buyAmount, setBuyAmount] = useState<string>('')
  const [tokenAmount, setTokenAmount] = useState<number | string>('')
  const [isValid, setIsValid] = useState<boolean>(true)
  const [pendingTx, setPendingTx] = useState(false)
  const thousandSeparator = true
  const rate = toNormalNumber(poolInfo.tokenBuy2IDOtoken)
  const dispatch = useDispatch<AppDispatch>()

  const privateSaleContract = usePrivateSaleContract()
  const oneUsdtContract = useOneUsdtContract()

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setBuyAmount(e.currentTarget.value)
        const value = Number(e.currentTarget.value.replace(/,/g, ''))
        const amount = value / Number(rate)
        setTokenAmount(amount)
        if (amount >= Number(toNormalNumber(poolInfo.minAmount))) {
          setIsValid(false)
        } else {
          setIsValid(true)
        }
      }
    },
    [setBuyAmount, poolInfo, rate]
  )

  const checkAllowance = async () => {
    const allowance = await oneUsdtContract.allowance(
      account,
      getContractAddress(addresses.privateSale)
    )

    return Number(toNormalNumber(allowance))
  }

  const handleBuyToken = async () => {
    try {
      setPendingTx(true)
      const amount = ethers.utils.parseEther(tokenAmount.toString())

      const allowance = await checkAllowance()

      if (allowance < tokenAmount) {
        await oneUsdtContract.approve(getContractAddress(addresses.privateSale), amount)
      }

      const transaction = await privateSaleContract.buy(pid, amount)
      await transaction.wait()

      setPendingTx(false)
      toast.success('Buy ONETRIP successful', {
        autoClose: 3000,
        hideProgressBar: true,
      })
      setBuyAmount('')
      setTokenAmount(0)

      dispatch(fetchUserBalance({ account, pid, contract: privateSaleContract }))
    } catch (err) {
      setPendingTx(false)
    }
  }

  return (
    <div className="md:w-1/2 bg-sky-900 rounded p-5">
      <p className="text-white font-semibold">Buy private sale ONETRIP (1 ONETRIP ≈ {rate} USDT)</p>
      <div className="mt-3 md:mt-0 flex flex-col md:gap-y-0 md:flex-row md:gap-x-5 justify-center items-center">
        <div className="w-full md:w-auto md:mt-3 bg-white rounded px-3 flex items-center flex-1">
          <NumberFormat
            className="bg-transparent text-center focus:outline-none py-1 rounded flex-1"
            value={buyAmount}
            onChange={handleChange}
            placeholder="0.0"
            thousandSeparator={thousandSeparator}
          />
          USDT
        </div>
        <span className="text-white">≈</span>
        <div className="w-full md:w-auto md:mt-3 bg-gray-100 rounded px-3 flex items-center flex-1">
          <input
            type="text"
            value={tokenAmount.toLocaleString('en', {
              maximumFractionDigits: 2,
            })}
            className="bg-transparent text-center focus:outline-none py-1 rounded flex-1"
            readOnly
            placeholder="0.0"
          />
          ONETRIP
        </div>
      </div>
      <p className="text-red-400 text-sm text-right">
        Min amount: {toNormalNumber(poolInfo.minAmount)} ONETRIP
      </p>
      <div className="text-right mt-5">
        {!account ? (
          <Button onClick={() => dispatch(open())}>Connect Wallet</Button>
        ) : (
          <Button onClick={handleBuyToken} isDisabled={isValid} isLoading={pendingTx}>
            Buy
          </Button>
        )}
      </div>
    </div>
  )
}

export default BuyTokenPanel
