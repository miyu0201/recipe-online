import React,{useContext} from 'react'
import {themeContext} from '../App'
const RecipeElement = (props) => {
  const {theme,setTheme}=useContext(themeContext)

    const recipeItem= props.recipe.map((item)=><div id= {item.id} className="recipe-element">
     <img className="image" src={item.image} alt={item.title}/>
     <p className="recipe-title">{item.title}</p>
     <button className= {theme===true? "favourite-button-dark": "favourite-button-light"} onClick={()=>props.addFavourite(item)}>Add to Favourite</button>
    </div>
    )

  return (
    <div>
      <div className="recipe-elements">{recipeItem}</div> 
    </div>
  )
}

export default RecipeElement
