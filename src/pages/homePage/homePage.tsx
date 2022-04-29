import { useOneTripContract } from 'hooks/useContract'
import { useEffect } from 'react'

export const HomePage = () => {
  const oneTripContract = useOneTripContract()

  useEffect(() => {
    const getBalanceOf = async (address) => {
      console.log(oneTripContract)
      const balance = await oneTripContract.totalSupply()
      return balance
    }

    getBalanceOf('0x79De33Cd871A154335D59c1E568063d2Bd6B8E74')
  }, [oneTripContract])

  return (
    <div className="p-5">
      <h1>Homepage haha</h1>
    </div>
  )
}
