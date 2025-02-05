import axios from "axios"

import { api } from "../api.js"

export async function getInputs(address, amount) {
  try {
    const response = await axios.get(
      `${api.GET_BALANCE}/${address}?amount=${amount}`
    )
    const unspentOutputs = response.data.result
    return unspentOutputs
  } catch (error) {
    console.error("Error fetching balance:", error)
    return null
  }
}

getInputs("sugar1qmq5tdj8hdpaw2pw7r6hdztyw2767rdryhrlkg2", 232)

/* 
a = sugar1qmq5tdj8hdpaw2pw7r6hdztyw2767rdryhrlkg2
p = KyaXetysP1Uzw94R79QLjC754mg3S9VF4khz1JRaRzqNMNn9jgYp

a = sugar1qk70wgt4g4spd4hmtal4ajg6dudy79lzdcgxphu
p = KxDNx3JZmBZU4eto6812qXfd73dmiVxkhRZZTGT2mLa3rTrDmPQm

*/

// const privateKey = "KyaXetysP1Uzw94R79QLjC754mg3S9VF4khz1JRaRzqNMNn9jgYp"
// const address = "sugar1qk70wgt4g4spd4hmtal4ajg6dudy79lzdcgxphu"
