import React,{useContext} from 'react'
import {themeContext} from '../App'

const Favourite = (props) => {

  const {theme,setTheme}=useContext(themeContext)

    const recipeItem= props.favourite.map((item)=><div id= {item.id} className="favourite-element"> 
    <img src={item.image} alt={item.title}/>
    <p className="recipe-title">{item.title}</p>
    <button className= {theme===true? "favourite-button-dark": "favourite-button-light"} onClick={()=>props.removeFavourite(item)}>Remove From Favourite</button>
    </div>
   )

 return (
   <div>
     <div className="favourite-elements">{recipeItem}</div>
   </div>
 )
}

export default Favourite
