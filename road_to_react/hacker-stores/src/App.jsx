import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

const useStorageState = (key, initialState) => {
    const [state, setState] = useState(localStorage.getItem(key) || initialState);
    useEffect(() => localStorage.setItem(key, state), [key, state]);
    return [state, setState]
};

const App = () => {
    const [searchTerm, setSearchTerm] = useStorageState('search', '')

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
    const filteredStories = searchTerm ? stories.filter(story => story.title.toLowerCase().includes(searchTerm.toLowerCase())) : stories;
    const handleSearch = event => setSearchTerm(event.target.value);

    return (
        <div>
            <h1>Learning React</h1>
            <Search search={searchTerm} onSearch={handleSearch} />

            <hr />
            
            <List items={filteredStories}  />
        </div>
    );
}

const List = ({items}) => (
    <ul>
        {items.map(item => <ListItem key={item.objectID} item={item} />)}
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
{/* Could also destructure here with url, title, etc., and then
    in the list component destructure the props as list.map(objectID, ...item => {...} 
    and then use the spread operator for the ListItem element.
*/}
const ListItem = ({item}) => (
        <li>
            <span><a href={item.url}>{item.title}</a>, </span>
            <span>{item.author}, </span>
            <span>{item.num_comments}, </span>
            <span>{item.points}</span>
        </li>
);

const Search = ({search, onSearch}) => {
    return (
        <>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" value={search} onChange={onSearch}/>
            {/* Always pass functions to handlers, not the return value -
                unless the function returns another function.
            */}
        </>
    );
};

export default App;

