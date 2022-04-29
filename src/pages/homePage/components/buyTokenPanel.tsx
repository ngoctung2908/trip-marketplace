import { useState, useCallback } from 'react'
import { ethers } from 'ethers'
import toNormalNumber from 'utils/toNormalNumber'
import NumberFormat from 'react-number-format'
import { usePrivateSaleContract, useOneUsdtContract } from 'hooks/useContract'
import addresses from 'config/constants/contracts'
import { getContractAddress } from 'utils'
import { toast } from 'react-toastify'

const BuyTokenPanel = ({ pid, poolInfo, account }) => {
  const [buyAmount, setBuyAmount] = useState<string>('')
  const [tokenAmount, setTokenAmount] = useState<number>(0)
  const [isValid, setIsValid] = useState<boolean>(true)
  const [pendingTx, setPendingTx] = useState(false)
  const thousandSeparator = true
  const rate = toNormalNumber(poolInfo.tokenBuy2IDOtoken)

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
        const transaction = await privateSaleContract.buy(pid, amount)
        await transaction.wait()
        setPendingTx(false)
        toast.success('Buy ONETRIP successful', {
          autoClose: 3000,
          hideProgressBar: true,
        })
        setBuyAmount('')
        setTokenAmount(0)
      } else {
        const transaction = await privateSaleContract.buy(pid, amount)
        await transaction.wait()
        setPendingTx(false)
      }
    } catch (err) {
      setPendingTx(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-sky-900 rounded p-5">
      <p className="text-white font-semibold">Buy private sale ONETRIP (1 ONETRIP ≈ {rate} USDT)</p>
      <div className="flex gap-x-5 items-center">
        <div className="mt-3 bg-white rounded px-3 flex items-center">
          <NumberFormat
            className="bg-transparent text-center focus:outline-none py-1 rounded flex-1"
            value={buyAmount}
            onChange={handleChange}
            placeholder="0"
            thousandSeparator={thousandSeparator}
          />
          USDT
        </div>
        <span className="text-white">≈</span>
        <div className="mt-3 bg-gray-100 rounded px-3 flex items-center">
          <input
            type="text"
            value={tokenAmount.toLocaleString('en', {
              maximumFractionDigits: 2,
            })}
            className="bg-transparent text-center focus:outline-none py-1 rounded flex-1"
            readOnly
            placeholder="0.00"
          />
          ONETRIP
        </div>
      </div>
      <p className="text-white text-sm">Min amount: {toNormalNumber(poolInfo.minAmount)} ONETRIP</p>
      <div className="text-right mt-5">
        {!pendingTx ? (
          <button
            className={`px-8 py-1 rounded transition-all ${
              isValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-300'
            }`}
            onClick={handleBuyToken}
          >
            Buy
          </button>
        ) : (
          <button
            type="button"
            className="ml-auto flex items-center justify-center py-1 px-5 rounded text-gray-700 pointer-events-none bg-gray-400 transition ease-in-out duration-150 cursor-not-allowed"
            disabled
          >
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Waiting...
          </button>
        )}
      </div>
    </div>
  )
}

export default BuyTokenPanel
