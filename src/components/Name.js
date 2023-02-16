import React from "react"
const Name = ({ name }) => {
    console.log(name);
    return (
      <div>{name.content}</div>
    )
  }
  
  export default Name