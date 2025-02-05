import { networkConfig } from "../networkConfig.js"
import bitcoin from "../utils/bitcoin.js"

const network = networkConfig.SUGAR

export function getAddress(keys, type = "bech32") {
  const { publicKey: pubkey } = keys
  let address

  switch (type) {
    case "bech32":
      address = bitcoin.payments.p2wpkh({
        pubkey,
        network
      }).address
      break

    case "segwit":
      address = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wpkh({
          pubkey,
          network
        }),
        network
      }).address
      break

    case "legacy":
      address = bitcoin.payments.p2pkh({
        pubkey,
        network
      }).address
      break

    default:
      throw new Error("Invalid address type")
  }

  return address
}
