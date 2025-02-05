import { api } from "../api"

export async function getHistory(address, offset) {
  try {
    const response = await axios.get(
      `${api.GET_HISTORY}/${address}?offset=${offset}`
    )
    const unspentOutputs = response.data.result
    return unspentOutputs
  } catch (error) {
    console.error("Error fetching balance:", error)
    return null
  }
}
