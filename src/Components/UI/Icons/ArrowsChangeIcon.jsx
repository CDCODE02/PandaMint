import * as React from "react"

const ArrowsChangeIcon = (props) => (
  <svg
    width={25}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.5 6h-6a6 6 0 0 0-6 6c0 1.912.897 3.611 2.29 4.71M9.5 18h6a6 6 0 0 0 6-6 5.985 5.985 0 0 0-2.29-4.71"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 15.5 9.5 18l2.5 2.5M13 8.5 15.5 6 13 3.5"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ArrowsChangeIcon
