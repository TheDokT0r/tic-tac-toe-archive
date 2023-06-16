import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Switch, Link } from "react-router-dom";
import {withRouter} from 'react-router';

export default function Lol() {
    const clickBack = () => {
        
    }

  return (
    <div className='center-div lol-div'>
        <h1 className='monday'>Seems like a monday...</h1>
        <iframe width="1000" height="780" src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe>

        <Link to="/">        
        <button className='menu-buttons'>Back To Game</button></Link>
    </div>
  )
}
