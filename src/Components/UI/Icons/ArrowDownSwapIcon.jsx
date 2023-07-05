import * as React from "react"

const ArrowDownSwapIcon = (props) => (
  <svg
    width={27}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M1.5 13v0c0-6.628 5.372-12 12-12v0c6.628 0 12 5.372 12 12v0c0 6.628-5.372 12-12 12v0c-6.628 0-12-5.372-12-12Z"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.5 18.333V7.667M17.5 14.333l-4 4-4-4"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ArrowDownSwapIcon
