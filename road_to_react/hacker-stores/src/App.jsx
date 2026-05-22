import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

const App = () => {
    const stories = [
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

    return (
        <div>
            <Search />

            <hr />
            
            <List items={stories} />
        </div>
    );
}

const List = props => (
    <ul>
        {props.items.map(item => <ListItem key={item.objectID} item={item} />)}
    </ul>
);


{/* Without the key, there is an error in the console; doesn't stop from rendering 
    This is because, upon re-rendering a list, React checks whether an item has changed,
    and it can efficiently exchange changed items; without the keys, it may be done 
    inefficiently. Using the index of the item should be avoided: if you were to insert 
    an item near the start of the list, all subsequent items will have new keys and 
    will be re-rendered.
    
    Crucially, this is not a key on the list item. It is for React's diffing engine.
    When I extracted out the ListItem as its own component, it needed to be added to the
    ListItem element in the map in the List component.
*/}
const ListItem = props => (
        <li>
            <span><a href={props.item.url}>{props.item.title}</a>, </span>
            <span>{props.item.author}, </span>
            <span>{props.item.num_comments}, </span>
            <span>{props.item.points}</span>
        </li>
);

const Search = () => {
    const handleChange = event => {
        console.log(event);
        console.log(event.target.value);
    }
    return (
        <div>
            <h1>Learning React</h1>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" onChange={handleChange}/>
            {/* Always pass functions to handlers, not the return value -
                unless the function returns another function.
            */}
        </div>
    );
};

export default App;

