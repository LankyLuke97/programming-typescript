import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

const list = [
     {
          title: 'React',
          url: 'https://react.dev/',
          author: 'Jordan Walke',
          num_comments: 3,
          points: 4,
          objectID: 0,
     },
     {
          title: 'Redux',
          url: 'https://redux.js.org/',
          author: 'Dan Abramov, Andrew Clark',
          num_comments: 2,
          points: 5,
          objectID: 1,
     },
];

function App() {
    return (
        <div>
            <h1>Learning React</h1>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" />

            <hr />

            {list.map(item => {
                {/* Without the key, there is an error in the console; doesn't stop from rendering 
                    This is because, upon re-rendering a list, React checks whether an item has changed,
                    and it can efficiently exchange changed items; without the keys, it may be done 
                    inefficiently. Using the index of the item should be avoided: if you were to insert 
                    an item near the start of the list, all subsequent items will have new keys and 
                    will be re-rendered.
                */}
                return (
                    <li key={item.objectID}>
                        <span><a href={item.url}>{item.title}</a>, </span>
                        <span>{item.author}, </span>
                        <span>{item.num_comments}, </span>
                        <span>{item.points}</span>
                    </li>
                );
            })}
        </div>
    );
}

export default App;
