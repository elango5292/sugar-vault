import { api } from "../api.js"
import { networkConfig } from "../networkConfig.js"
import bitcoin from "../utils/bitcoin.js"
import { getAddress } from "../utils/getAddress.js"
import { getScriptType } from "../utils/getScriptType.js"
import { getInputs } from "./getInputs.js"

const network = networkConfig.SUGAR

const privateKey = "KyaXetysP1Uzw94R79QLjC754mg3S9Vkhz1JRaRzqNMNn9jgYp"
const address = "sugar1qk70wgt4g4spd4hmtal4ajg6dudy79lzdcgxphu"
const amount = 0.01 * 100000000 // Amount in satoshis
const fee = 0.01 * 100000000 // Fee in satoshis
const type = "bech32"

export async function sendBalance(recipientAddress, amount, fee, privateKey) {
  if (!recipientAddress || !amount || !fee || !privateKey) {
    throw new Error(
      "All parameters (recipientAddress, amount, fee, privateKey) are required."
    )
  }

  const transaction = {
    outputs: [
      {
        address: recipientAddress,
        amount: amount
      }
    ],
    fee
  }

  const signedTransaction = await signTransaction(transaction, privateKey)

  // try {
  //   const response = await broadcastTransaction(signedTransaction)
  //   return response
  // } catch (error) {
  //   throw new Error("Failed to broadcast transaction: " + error.message)
  // }

  console.dir({ signedTransaction }, { depth: null })
}

async function signTransaction(transaction, privateKey) {
  console.log("send")
  const keyPair = bitcoin.ECPair.fromWIF(privateKey, network)
  const address = getAddress(keyPair, type)

  var txb = new bitcoin.TransactionBuilder(network)
  txb.setVersion(2)

  const totalOutput = transaction.outputs.reduce(
    (acc, output) => acc + output.amount,
    0
  )

  transaction.outputs.forEach(({ address, amount }) => {
    txb.addOutput(address, amount)
  })

  const inputs = await getInputs(address, totalOutput + transaction.fee)

  let ins = []
  let value = 0
  inputs.forEach((input) => {
    const script = bitcoin.Buffer(input.script, "hex")
    const type = getScriptType(script)

    value += input.value

    if (type == "bech32") {
      const p2wpkh = bitcoin.payments.p2wpkh({
        pubkey: keyPair.publicKey,
        network
      })
      txb.addInput(input.txid, input.index, null, p2wpkh.output)
    } else {
      txb.addInput(input.txid, input.index)
    }

    ins.push({
      type,
      script,
      value: input.value
    })
  })

  if (value >= amount + transaction.fee) {
    const change = value - (amount + transaction.fee)
    if (change > 0) {
      txb.addOutput(address, change)
    }

    for (var i = 0; i < ins.length; i++) {
      const value = ins[i].value
      switch (ins[i].type) {
        case "bech32":
          txb.sign(i, keyPair, null, null, value, null)
          break

        case "segwit":
          const redeem = bitcoin.payments.p2wpkh({
            pubkey: keyPair.publicKey,
            network
          })
          const p2sh = bitcoin.payments.p2sh({
            redeem,
            network
          })

          txb.sign(i, keyPair, p2sh.redeem.output, null, value, null)
          break

        case "legacy":
          txb.sign(i, keyPair)
          break

        default:
          throw new Error("Unknown script type: " + ins[i].type)
          break
      }
    }
  }

  const tx = txb.build()

  return tx.toHex()
}

async function broadcastTransaction(signedTransaction) {
  const apiUrl = api.POST_BROADCAST
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ tx: signedTransaction })
  })
  return await response.json()
}
