import React from "react"
import { TbHome as HomeIcon, TbNews as NewsIcon } from "react-icons/tb"

import { IconButton } from "./ui/IconButton"

export default function Tabs() {
  return (
    <div className="flex flex-row items-center justify-around p-2 border-0 border-t-[1px] border-solid border-[#313131] bg-[#1a1a1a]">
      <IconButton
        icon={HomeIcon}
        size="1.5rem"
        bgColor="#fff"
        accentColor="#fff"
      />
      <IconButton
        icon={NewsIcon}
        size="1.5rem"
        bgColor="#1a1a1a"
        accentColor="#fff"
      />
    </div>
  )
}
