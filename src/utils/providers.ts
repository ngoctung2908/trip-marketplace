import { ethers } from 'ethers'

const RPC_URL = process.env.REACT_APP_NODE || 'https://api.s0.b.hmny.io'

export const simpleRpcProvider = new ethers.providers.StaticJsonRpcProvider(RPC_URL)
