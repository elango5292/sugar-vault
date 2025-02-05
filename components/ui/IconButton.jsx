import React from "react"

export const IconButton = ({
  icon: Icon,
  size = "1.25rem",
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`
        !border-none
        group relative
        w-10 h-10
        rounded-lg
        transition-all duration-200 ease-out
        text-foreground
        hover:bg-accent/10 active:bg-accent/20
        focus:outline-none
        disabled:opacity-50 disabled:cursor-not-allowed
        ${disabled ? "hover:bg-background active:bg-background" : ""}
        ${className}
      `}
      disabled={disabled}
      {...props}>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon
          size={size}
          className="relative transition-all duration-200 ease-out group-hover:scale-110 group-active:scale-95"
          style={{ color: "var(--color-foreground)" }}
        />
      </div>
      <span
        className="
          absolute inset-0 rounded-lg
          opacity-0 transition-opacity duration-200 ease-out
          group-hover:opacity-100
        "
      />
    </button>
  )
}
