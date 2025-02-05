import { api } from "../api"

export async function getTransactionDetails(address) {
  try {
    const response = await axios.get(`${api.GET_TRANSACTION}/${address}`)
    const unspentOutputs = response.data.result
    return unspentOutputs
  } catch (error) {
    console.error("Error fetching balance:", error)
    return null
  }
}
