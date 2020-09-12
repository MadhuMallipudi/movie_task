import React,{Component} from "react";
import header from '../assets/css/header.module.css';

export default class Header extends Component{
    render(){
        const {favourties}=this.props; 
        return(
            <nav className="navbar navbar-dark bg-dark">
                <span  className={header["icon"]}>Home</span>
                <span  className={header["icon"]} onClick={()=>{favourties()}}>Favourites</span>
            </nav>
        )
    }
}