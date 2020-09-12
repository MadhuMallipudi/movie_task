import React,{Component} from 'react';
import './App.css';
import Header from "./components/header";
import Movies from "./components/movies";
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      fav:true,
    }
  }
  favouriteFun = () => {
    this.setState({fav:!this.state.fav});
  } 
  render(){
    const {fav} = this.state;
    const {favouriteFun}= this;
    return (
      <div className="App">
         <Header favourties={()=>{favouriteFun()}}/>
         <Movies isFavourite={fav}/>
      </div>
    );
  }
}

export default App;
