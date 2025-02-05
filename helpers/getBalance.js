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

/* 
a = sugar1qmq5tdj8hdpaw2pw7r6hdztyw2767rdryhrlkg2
p = KyaXetysP1Uzw94R79QLjC754mg3S9VF4khz1JRaRzqNMNn9jgYp

a = sugar1qk70wgt4g4spd4hmtal4ajg6dudy79lzdcgxphu
p = KxDNx3JZmBZU4eto6812qXfd73dmiVxkhRZZTGT2mLa3rTrDmPQm

*/

// const privateKey = "KyaXetysP1Uzw94R79QLjC754mg3S9VF4khz1JRaRzqNMNn9jgYp"
// const address = "sugar1qk70wgt4g4spd4hmtal4ajg6dudy79lzdcgxphu"

/* 
async function signTransaction(transaction, privateKey) {
  try {
    const keyPair = ECPair.fromWIF(privateKey, network)
    const address = getAddress(keyPair, type)
    const txb = new bitcoin.Psbt(network)
    txb.version = 2

    // Convert amounts to BigInt
    const totalOutput = transaction.outputs.reduce(
      (acc, output) => acc + BigInt(output.amount),
      BigInt(0)
    )

    const inputs = await getInputs(
      address,
      totalOutput + BigInt(transaction.fee)
    )
    if (!inputs || inputs.length === 0) {
      throw new Error("No inputs found")
    }

    console.dir({ inputs }, { depth: null })

    // Calculate total input amount using BigInt
    const totalInput = inputs.reduce(
      (acc, input) => acc + BigInt(input.value),
      BigInt(0)
    )

    // Process inputs sequentially using for...of loop
    const ins = []
    let index = 0

    for (const input of inputs) {
      try {
        const type = getScriptType(input.script)

        // Wait for the transaction hash
        const response = await axios.get(`${api.GET_TRANSACTION}/${input.txid}`)
        if (response.error) {
          throw new Error(
            `Failed to get transaction hash for txid: ${input.txid}`
          )
        }

        const { hash: hexString } = response.data.result
        const hash = Uint8Array.from(Buffer.from(hexString, "hex"))
        console.dir({ hash }, { depth: null })

        // Add input based on type
        if (type === "bech32") {
          const p2wpkh = getP2WPKHScript(keyPair.publicKey)
          txb.addInput({
            hash: input.txid,
            index
            // nonWitnessUtxo: hash
          })
        } else {
          txb.addInput({
            hash: input.txid,
            index,
            witnessUtxo: {
              script: input.script,
              value: input.value

            }
            // nonWitnessUtxo: hash
          })
        }

        ins.push({
          type,
          index
        })

        index++
      } catch (error) {
        console.error(`Error processing input ${index}:`, error)
        throw error
      }
    }

    // Add outputs using BigInt values
    transaction.outputs.forEach(({ address, amount }) => {
      txb.addOutput({
        script: bitcoin.address.toOutputScript(address, network),
        value: BigInt(amount)
      })
    })

    // Calculate change using BigInt
    const change = totalInput - totalOutput - BigInt(transaction.fee)
    if (change > BigInt(0)) {
      txb.addOutput({
        script: bitcoin.address.toOutputScript(address, network),
        value: change
      })
    }

    // Sign inputs
    for (const { index, type } of ins) {
      txb.signInput(index, keyPair)
    }

    txb.finalizeAllInputs()

    const tx = txb.extractTransaction()
    return tx.toHex()
  } catch (error) {
    console.error("Error in signTransaction:", error)
    throw error
  }
}

*/
