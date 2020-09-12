import React,{Component} from 'react';
import './App.css';
import Header from "./components/header";
import Movies from "./components/movies";
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      fav:true,
      isClear:false
    }
  }
  favouriteFun = () => {
    this.setState({fav:!this.state.fav});
  } 
  clearFavourites = () =>{
    this.setState({isClear:true})
  }
  render(){
    const {fav,isClear} = this.state;
    const {favouriteFun,clearFavourites}= this;
    return (
      <div className="App">
         <Header favourties={()=>{favouriteFun()}} clearFav ={()=>clearFavourites()}/>
         <Movies isFavourite={fav} isClear ={isClear}/>
      </div>
    );
  }
}

export default App;
