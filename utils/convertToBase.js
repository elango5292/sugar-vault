import { constants } from "../constants"

export function convertToBase(valueInSmallestUnits) {
  return valueInSmallestUnits / constants.SMALLEST_UNIT_FACTOR
}
