import React from 'react'
import HomeCSS from "../styles/home.module.css"

function Button(props) {
  return (
    <button className={HomeCSS.buttons} onClick={props.onClick}  type={props.type}>
      {props.content}
    </button>
  )
}

export default Button