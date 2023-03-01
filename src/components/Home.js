import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useCallback,
  useMemo,
} from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Search from "./Search";
import RecipeElement from "./RecipeElement";
import Favourite from "./Favourite";
import Theme from "./Theme";
import { themeContext } from "../App";
/*
const initialState = {findFavouriteValue: "",
findTypeValue:""}*/
const initialState = { findFavouriteValue: "" };

function reducer(state, action) {
  switch (action.type) {
    case "findFavourite":
      console.log(action);
      return {
        ...state,
        findFavouriteValue: action.value,
      };

    /* case 'findType':
        console.log(action)
        return {
          ...state,
          findTypeValue: action.value
        }*/

    default:
      return state;
  }
}

const Home = () => {
  const [data, setData] = useState([]); //recipes data from api
  const [loading, setLoading] = useState(false); //loading state
  const [favourite, setFavourite] = useState(
    JSON.parse(localStorage.getItem("favourite")) || []
  );
  const [state, dispatch] = useReducer(reducer, initialState);
  const { theme, setTheme } = useContext(themeContext);
  const [show, setShow] = useState(false); //toggle offcanvas
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(
    function () {
      localStorage.setItem("favourite", JSON.stringify(favourite));
    },
    [favourite]
  );

  //initial dataset
  useEffect(function () {
    function getRecipes() {
      fetch(
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=0b486e71c68f4b9c9a0e5430c2d4b447"
      )
        .then((res) => res.json())
        .then((data) => data.results.length > 0 && setData(data.results))
        .then(setLoading(false)); //set loading state as false after data received from api call
    }
    getRecipes();
  }, []);

 

  //fetch data from API, using the {searchValue} to get filtered result
  function getDataFromSearch(searchValue) {
    setLoading(true); //set loading state as true before data received from api call
    //with async function
    /*  async function getRecipes() {
            const res = await fetch(
              `https://api.spoonacular.com/recipes/complexSearch?apiKey=0b486e71c68f4b9c9a0e5430c2d4b447&query=${searchValue}`
            )
            const data = await res.json();
            setData(data)
        }*/
    function getRecipes() {
      fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=0b486e71c68f4b9c9a0e5430c2d4b447&query=${searchValue}`
      )
        .then((res) => res.json())
        .then((data) => data.results.length > 0 ? setData(data.results) :setData([]))
        .then(setLoading(false)); //set loading state as false after data received from api call
    }
    getRecipes();
  }

  console.log(data);

   //useCall back function, only run updateSearchResult when [data] changes
   const updateSearchResult = useCallback(
    function () {
      if (loading === true) {
        return <p className="loading">loading</p>;
      } else if(data.length>0) {
        return <RecipeElement recipe={data} addFavourite={addFavourite} />;
      }
      else if(data.length===0) {return <div className="favourite-elements">No result found!</div>}
      
    },
    [data]
  );
  

  function addFavourite(item) {
    console.log(item.id);
    // check if the recipe already existing in favourite, return -1 means no, return 0 means yes
    var sameRecipe = favourite.findIndex((value) => {
      return value.id == item.id;
    });
    console.log(sameRecipe);

    if (sameRecipe === -1) {
      setFavourite((pre) => [
        ...pre,
        { id: item.id, title: item.title, image: item.image },
      ]);
    } else {
      window.alert("The recipe is already in your favourite list!");
    }
  }

  function removeFavourite(item) {
    const updated = favourite.filter((recipe) => recipe.id !== item.id);
    setFavourite(updated);
  }

  const handleFindFavourite = favourite.filter((item) =>
    item.title.toLowerCase().includes(state.findFavouriteValue)
  );

  return (
    <div>
      <header className="header">
        <h1 className="title">RECIPE ONLINE</h1>
        <div>
          <button
            className={
              theme === true ? "myFav-button-dark" : "myFav-button-light"
            }
            onClick={handleShow}
          >
            My favourite
          </button>
        </div>
        <Theme />
      </header>
      <Search getDataFromSearch={getDataFromSearch} />

      {updateSearchResult()}
      {/*   usecall back , return function ,  usememo , return value */}
      {/* only rerender the value when [data] changes,  { useMemo(()=>loading ? <p className="loading">loading</p> : <RecipeElement recipe={data} favourite={favourite} addFavourite={addFavourite} />,[data])} */}

      {/* orignal, with out using callback or useMemo*/}
      {/*{loading ? <p className="loading">loading</p> : <RecipeElement recipe={data} favourite={favourite} addFavourite={addFavourite} />} */}

      <Offcanvas style={{ width: "800px" }} show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My Favourite Recipes</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* search in favourite item list */}
          <input
            className="search-fav-input"
            name="search"
            value={state.findFavouriteValue}
            onChange={(e) =>
              dispatch({ type: "findFavourite", value: e.target.value })
            }
            placeholder="please enter recipe to search..."
            id="searchFav"
          />
          {/* <input className="search-input" name="search" value={state.findTypeValue}  onChange={(e)=>dispatch({type: 'findType', value:e.target.value})}placeholder='please enter recipe to search...'/>*/}

          {/* if filterFavourite, show filteredFavourite, else, show all favourite items*/}
          {state.findFavouriteValue ? (
            <Favourite
              removeFavourite={removeFavourite}
              favourite={handleFindFavourite}
            />
          ) : (
            <Favourite
              removeFavourite={removeFavourite}
              favourite={favourite}
            />
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Home;
// <div className="recipe-elements">{favourite && <Favourite recipe={favourite} removeFavourite={removeFavourite}/>}</div>
