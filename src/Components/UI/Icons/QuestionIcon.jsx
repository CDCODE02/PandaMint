import * as React from "react"

const QuestionIcon = (props) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 1.933a6.067 6.067 0 1 0 0 12.134A6.067 6.067 0 0 0 8 1.933ZM.733 8a7.267 7.267 0 1 1 14.534 0A7.267 7.267 0 0 1 .733 8Zm7.934 2.667a.667.667 0 1 1-1.333 0 .667.667 0 0 1 1.333 0Zm-1.4-4a.733.733 0 0 1 1.466 0v.08a.814.814 0 0 1-.238.576l-.92.92a.6.6 0 0 0 .85.848l.918-.92c.378-.377.59-.89.59-1.423v-.081a1.933 1.933 0 1 0-3.866 0V7a.6.6 0 0 0 1.2 0v-.333Z"
      fill={props.color}
    />
  </svg>
)

export default QuestionIcon
