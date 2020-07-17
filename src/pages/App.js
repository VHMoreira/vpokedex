import React, { useState } from 'react';
import logo from '../assets/logo.png';
import './App.css';
import Main from './Main/Main';

function App() {
    const [activeGeneration, setActiveGeneration] = useState(0);

    function handleActiveGeneration(generation) {
        setActiveGeneration(generation);
    }

    return (
        <>
            <header>
                <div className="appName">
                    <img src={logo} width={35} alt="logo" />
                    <span>V-Pokedex</span>
                </div>

                <nav className="navBar">
                    <ul>
                        <li onClick={() => handleActiveGeneration(0)} className={activeGeneration === 0 ? 'active' : ''}>G1</li>
                        <li onClick={() => handleActiveGeneration(1)} className={activeGeneration === 1 ? 'active' : ''}>G2</li>
                        <li onClick={() => handleActiveGeneration(2)} className={activeGeneration === 2 ? 'active' : ''}>G3</li>
                        <li onClick={() => handleActiveGeneration(3)} className={activeGeneration === 3 ? 'active' : ''}>G4</li>
                    </ul>
                </nav>
            </header>
            <section className="pokemonGridList">
                <Main activeGeneration={activeGeneration} />
            </section>
        </>
    );
}

export default App;