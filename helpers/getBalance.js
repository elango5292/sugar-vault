import axios from "axios"

import { api } from "../api.js"

export async function getBalance(address) {
  try {
    const response = await axios.get(`${api.GET_BALANCE}/${address}`)
    const unspentOutputs = response.data.result

    if (!unspentOutputs || unspentOutputs.length === 0) {
      return 0
    }
    const balance = unspentOutputs.reduce(
      (total, output) => total + output.value,
      0
    )
    return balance
  } catch (error) {
    console.error("Error fetching balance:", error)
    return null
  }
}

getBalance("sugar1qmq5tdj8hdpaw2pw7r6hdztyw2767rdryhrlkg2").then((balance) => {
  console.log("Balance:", balance)
})
