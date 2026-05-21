import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

const test_list = Array.from(range(0,10));

function App() {
    return (
        <div>
            <h1>Learning React</h1>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" />
        </div>

        <hr />

        <ul>
            {test_list.map(item => {
                return <li>This is item {item}</li>;
            });}
        </ul>
    );
}

export default App;
