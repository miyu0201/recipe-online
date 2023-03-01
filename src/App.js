
import './App.css';
import React, {useState,createContext} from 'react'
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

export const themeContext= createContext() //comtext for toggle theme

function App() {
  const [theme,setTheme]=useState(false)

  return (
    <themeContext.Provider value={{theme, setTheme}}>
    <div className={theme===true?"App-dark": "App-light"}> 
     <Home/> 
    </div>
    </themeContext.Provider>
   
  );
}

export default App;
