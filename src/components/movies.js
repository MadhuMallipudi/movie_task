import React,{Component} from 'react';
import moviescss from "../assets/css/movies.module.css";
import axios from 'axios';

export default class Movies extends Component{
    constructor(props){
        super(props);
        this.state={
            favBtn:true,
            movie_types: [{type:"All",value:'all'},{type:"Movies",value:'movie'},{type:"Series",value:'series'},{type:"Episodes",value:'episode'}],
            search_value:'',
            selected_type:'',
            movies_list : [],
            ErrorMsg:"No Movies Found",
            favouriteMovieList:[],
            isFavourite:false
        }
    }
    componentWillReceiveProps = ({ isFavourite , isClear}) =>{
        let list = !isFavourite ? JSON.parse(localStorage.getItem("favourites")) : [];
        if(isClear){
            this.setState({movies_list:[],search_value:'',selected_type:'',ErrorMsg:"No Movies Found"});
        } 
        this.setState({movies_list:list,ErrorMsg:(list && list.length) > 0 ? "No Favourites Found" : "No Movies Found"});
    }
    setFavourite = (movie_item) => {
        this.setState({[movie_item.imdbID]:!this.state[movie_item.imdbID]});
        let {favouriteMovieList} = this.state;
        let list  = (JSON.parse(localStorage.getItem("favourites")) || []).map((item)=> { return item.imdbID });

        if(!(list.includes(movie_item.imdbID))){
            favouriteMovieList = [...favouriteMovieList,movie_item];
        } else {
            favouriteMovieList  = (JSON.parse(localStorage.getItem("favourites")) || []).filter((item)=> { return item.imdbID != [movie_item.imdbID] });
        }
        this.setState({favouriteMovieList});
        localStorage.setItem("favourites",JSON.stringify(favouriteMovieList)); 
    }
    searchMovies = async () => {
        const {search_value , selected_type}= this.state;
        if(search_value == ''){
            this.setState({ErrorMsg:"Please search with title"});
        } else {
            let result = await axios.get('http://www.omdbapi.com/', {
            params: {
              s: search_value,
              type:selected_type,
              apikey:"f49c9bf6"
            }
          });
          if(result.status === 200 && result.data.Search && result.data.Search.length > 0){
            this.setState({movies_list:result.data.Search});
          } else {
            this.setState({movies_list:[],ErrorMsg:(result.data && result.data.Error) ?result.data.Error :"something went wrong"});
          }
        } 
    }
    render() {
        const {movie_types,movies_list} = this.state;
        const types = (movie_types || [] ).map((item,index)=>{
            return <option key={index} value={item.value}>{item.type}</option>
        });
        let list = '';
        if(movies_list && movies_list.length > 0){
             list = movies_list.map((movie_item,index)=>{
                return (
                    <div key={index}>
                        <div className="card" style={{width:'min-content',maxHeight:'250px',overflow:'hidden',marginTop:"20px"}}>
                            <img className="card-img-top" src={movie_item.Poster !== "N/A" ? movie_item.Poster : require("../assets/images/logo512.png") } alt="No Poster" height="100px"/>
                            <div className="card-body" style={{paddingLeft:"10px",paddingTop:"10px"}}>
                                <p style={{whiteSpace: "nowrap",textOverflow: "ellipsis",width:" 100px",overflow: "hidden",margin:0,fontSize:'13px',fontWeight:'bold'}}>Title:{movie_item.Title}</p>
                                <p style={{whiteSpace: "nowrap",textOverflow: "ellipsis",width:" 100px",overflow: "hidden",margin:0,fontSize:'13px',fontWeight:'bold'}}>Year:{movie_item.Year}</p>
                                <button className="btn btn-outline-info btn-sm" style={{marginTop:'10px'}} onClick ={()=>{this.setFavourite(movie_item)}}>{this.state[movie_item.imdbID] ? "UnFavourite" : "Favourite"}</button>
                            </div>
                        </div>
                    </div> 
                )
            });
        } else {
             list = <div>{this.state.ErrorMsg}</div>
        }
        return(
            <div className={moviescss["list"]}>
                <div className={moviescss["group"]}>
                    <input 
                        type="text"
                        className={"form-control "+ moviescss["inp"]} 
                        style={{paddingRight:'100px',borderRadius:'0px'}} 
                        placeholder = "search with movie title" 
                        value={this.state.search_value} 
                        onChange={(event)=>{this.setState({search_value:event.target.value})}}/>
                    <div>
                        <select className={"form-control " + moviescss["dropdwn"]} id="exampleFormControlSelect1" onChange={(event)=>{this.setState({selected_type:event.target.value})}}>
                            {types}
                        </select>
                    </div>
                    <button type="button" style={{marginLeft:"40px"}} className="btn btn-success" onClick={()=>{this.searchMovies()}} >Search</button>
                </div>
                <div  className="card-deck" style={{marginTop:'40px',justifyContent:"center"}}> 
                    {list}                   
                </div>
            </div>
        )
    }
}