import bitcoin from "../utils/bitcoin.js"

export function getScriptType(script) {
  var type = undefined

  if (script[0] == bitcoin.opcodes.OP_0 && script[1] == 20) {
    type = "bech32"
  }

  if (script[0] == bitcoin.opcodes.OP_HASH160 && script[1] == 20) {
    type = "segwit"
  }

  if (
    script[0] == bitcoin.opcodes.OP_DUP &&
    script[1] == bitcoin.opcodes.OP_HASH160 &&
    script[2] == 20
  ) {
    type = "legacy"
  }

  return type
}
