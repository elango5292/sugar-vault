import {
  TbRobotFace as AccountIcon,
  TbSettings2 as SettingsIcon
} from "react-icons/tb"

import { walletStore } from "../store"
import { IconButton } from "./ui/IconButton"

export default function Nav() {
  const { activeWallet } = walletStore()
  return (
    <div
      className={`flex flex-row items-center justify-between p-2 border-0 border-b-[1px] border-solid border-[#313131] bg-[#1a1a1a]`}>
      <div className="text-lg font-semibold">{activeWallet.name}</div>
      <div className="flex flex-row items-center gap-2">
        <div>
          <IconButton icon={AccountIcon} size={"1.5rem"} />
        </div>
        <div>
          <IconButton icon={SettingsIcon} size={"1.5rem"} />
        </div>
      </div>
    </div>
  )
}
