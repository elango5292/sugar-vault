import React, { useState } from "react"

import Main from "./components/main"
import Nav from "./components/nav"
import PopOver from "./components/PopOver"
import Tabs from "./components/tabs"

import "./style.css"

export default function IndexPopup() {
  const [activeTab, setActiveTab] = useState("home")
  const [showPopOver, setShowPopOver] = useState(false)

  return (
    <div className="h-[600px] !min-h-[600px] !min-w-[360px] overflow-hidden w-[360px] bg-gradient-to-b from-[#00ffffb4] via-[#000] to-[#000] text-white flex flex-col">
      <Nav />

      <div className="flex-1 overflow-auto relative">
        <button
          onClick={() => setShowPopOver(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">
          Open Popover
        </button>
        <Main activeTab={activeTab} />
        <PopOver
          showPopOver={showPopOver}
          setShowPopOver={setShowPopOver}
          direction="bottom">
          <h2 className="text-2xl font-bold mb-4">Popover Content</h2>
          <p>
            This is the content of the popover. It slides in smoothly along with
            the background.
          </p>
        </PopOver>
      </div>
      <Tabs />
    </div>
  )
}
