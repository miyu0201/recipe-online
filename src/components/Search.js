import React,{useState,useContext} from 'react'
import {themeContext} from '../App'

const Search = (props) => {
const [searchValue,setSearchValue]=useState("")
const {theme,setTheme}=useContext(themeContext)

function handleSearchValue(e){
setSearchValue(e.target.value)

}

function handleSearch(e){
    e.preventDefault()
    props.getDataFromSearch(searchValue)
    //when search is submitted, reset search input value
    setSearchValue("")
   // console.log("submit")
}

//console.log(searchValue)

  return (
    <form onSubmit={handleSearch} className="search">
      <input className="search-input" name="search" value={searchValue} onChange={handleSearchValue}placeholder='please enter recipe to search...' id="search"/>
      <button className={theme===true?"search-button-dark":"search-button-light"}>Search</button>
    </form>
  )
}

export default Search
