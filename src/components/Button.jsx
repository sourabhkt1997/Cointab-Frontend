import React from 'react'

function Button(props) {
  return (
    <button onClick={props.onClick}  type={props.type}>
      {props.content}
    </button>
  )
}

export default Button