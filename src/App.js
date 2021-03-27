import React, { useState} from 'react';
import './Styles/App.scss';
import PokemonList from '../src/Components/PokemonList';
import Nav from '../src/Components/Nav';
import PaginationBar from './Components/PaginationBar';
import Home from './Components/Home';
import Loading from './Components/Loading';
import { webPageStore } from './Store/web-page/web-page-reducer'

const INDEX = 'index';
const POKEDEX = 'pokedex';
const LOADING = 'loading';

function App() {

  const [page, setPage] = useState(1);
  const [mode, setMode] = useState(INDEX)

  const togglePage = (val = false) => {
    if (!val) {
      toggleMode();
      setPage(page + 1);
    }

    toggleMode();
    return setPage(val)
  }

  const toggleMode = () => {
    const state = webPageStore.getState();
    setMode(state.mode);
  }

  webPageStore.subscribe(toggleMode);

  return (
    <div className="App">
      <Nav />
      {mode === LOADING && <Loading />}
      {mode === INDEX && <Home toggleMode={toggleMode}/>}
      {mode === POKEDEX &&
        <div>
          <PokemonList page={page} togglePage={togglePage} />
          <div className='paginate'>
            <PaginationBar togglePage={togglePage} page={page} className="paginate"/>      
          </div>
        </div>
      }
    </div>
  );
}

export default App;
