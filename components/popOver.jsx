import React, { useEffect, useRef } from "react"
import { TbX } from "react-icons/tb"

export default function PopOver({
  showPopOver,
  setShowPopOver,
  children,
  direction = "right"
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      if (showPopOver) {
        container.style.display = "block"
        requestAnimationFrame(() => {
          container.style.transform = "translate(0, 0)"
          container.style.opacity = "1"
        })
      } else {
        container.style.transform = getInitialTransform(direction)
        container.style.opacity = "0"
        const transitionEndHandler = () => {
          if (container.style.opacity === "0") {
            container.style.display = "none"
          }
          container.removeEventListener("transitionend", transitionEndHandler)
        }
        container.addEventListener("transitionend", transitionEndHandler)
      }
    }
  }, [showPopOver, direction])

  const handleClose = () => {
    setShowPopOver(false)
  }

  const getInitialTransform = (dir) => {
    switch (dir) {
      case "top":
        return "translate(0, -100%)"
      case "bottom":
        return "translate(0, 100%)"
      case "left":
        return "translate(-100%, 0)"
      case "right":
        return "translate(100%, 0)"
      default:
        return "translate(100%, 0)"
    }
  }

  return (
    <div
      ref={containerRef}
      className={`
        fixed inset-0 z-40
        transition-all duration-300 ease-in-out
        ${direction === "left" || direction === "right" ? "w-full md:w-96" : "w-full"}
        ${direction === "top" || direction === "bottom" ? "h-full md:h-96" : "h-full"}
        ${direction === "left" ? "left-0" : direction === "right" ? "right-0" : ""}
        ${direction === "top" ? "top-0" : direction === "bottom" ? "bottom-0" : ""}
      `}
      style={{
        display: "none",
        transform: getInitialTransform(direction),
        opacity: 0
      }}>
      <div className="w-full h-full bg-black bg-opacity-80 flex">
        <div className="w-full h-full bg-gradient-to-b from-[#00ffffb4] via-[#000] to-[#000] text-white flex flex-col">
          <div className="flex justify-end p-4">
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-300 transition-colors">
              <TbX className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4">{children}</div>
        </div>
      </div>
    </div>
  )
}
