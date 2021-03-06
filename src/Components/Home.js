import React, { useEffect, useState } from 'react';
import '../Styles/Home.scss';
import axios from 'axios';
import * as webPageActions from '../Store/web-page/web-page-actions';
import { webPageStore } from '../Store/web-page/web-page-reducer';
import {
  Link
} from 'react-router-dom';

export default function Home() {
  const [homeImage, setImage] = useState();
  const getImage = (img, setImage) => {
    return setImage(img);
  }

  const toggleMode = () => {
    setTimeout(() => {
      webPageStore.dispatch(webPageActions.setPokedex);
    }, 2000);
  }

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/pikachu`)
      .then(res => {
        return getImage(res.data.sprites.front_shiny, setImage);
      })
  }, []);

  return (
    <div className='home'>
      <h1>Welcome to the Pokédex</h1>
      <div className='img-container'>
        <img src={homeImage} alt="home-img"/>
      </div>
      <p>A website that hosts a collection of pokemon-related information</p>
      <div className="prompt">
        <p>Ready to start? Click the pokeball! </p>
        <Link to="/pokemon">
          <img
          src="https://github.com/PokeAPI/sprites/blob/master/sprites/items/poke-ball.png?raw=true"
          className="pokeball"
          onClick={toggleMode}
          alt="poke-ball"/>          
        </Link>
      </div>
    </div>
  )
}