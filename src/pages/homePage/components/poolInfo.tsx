import { format } from 'date-fns'

const PoolInfo = ({ poolInfo }) => {
  return (
    <div>
      <h1 className="text-gray-700 text-center text-2xl font-bold">Open for sale of ONE TRIP</h1>
      <div className="mt-2 flex gap-x-5 justify-center">
        <span>{format(poolInfo.startTime * 1000, 'Pp')} (UTC)</span>-
        <span>{format(poolInfo.endTime * 1000, 'Pp')} (UTC)</span>
      </div>
    </div>
  )
}

export default PoolInfo
