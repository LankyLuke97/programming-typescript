import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

const welcome = {title: "React", greeting: "Hey"};

function App() {
    return (
        <div>
            <h1>{welcome.greeting} {welcome.title}</h1>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" />
        </div>
    );
}

export default App;
