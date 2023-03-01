import React,{useContext} from 'react'
import {themeContext} from '../App'

const Theme = () => {

 const {theme,setTheme}=useContext(themeContext)
 console.log(theme)
  return (
    <div>
      <button className={theme===true? "theme-button-dark":"theme-button-light"} onClick={()=>{setTheme(!theme)}}>{theme===true? <i class="fa-solid fa-moon" style={{marginRight:"15px"}}></i>: <i class="fa-solid fa-sun" style={{marginRight:"15px"}}></i>}Theme</button>
    </div>
  )
}

export default Theme
