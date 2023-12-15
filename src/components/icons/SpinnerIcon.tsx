type SpinnerIconProps = {
  color?: string
  size?: number
}

export const SpinnerIcon = ({ color = "#000000", size = 32 }: SpinnerIconProps) => (
  <svg
    className="w-8 h-8 animate-spin"
    fill={color}
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <g>
        {" "}
        <path d="M10,1V3a7,7,0,1,1-7,7H1a9,9,0,1,0,9-9Z"></path>{" "}
      </g>{" "}
    </g>
  </svg>
)
