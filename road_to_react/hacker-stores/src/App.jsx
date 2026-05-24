import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

const useStorageState = (key, initialState) => {
    const [state, setState] = useState(localStorage.getItem(key) ?? initialState);
    useEffect(() => localStorage.setItem(key, state), [key, state]);
    return [state, setState];
};

const initialStories = [
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
{/* The timeout in this function is to simulate delay while fetching data from elsewhere. This
    could be more succinctly written as:
    const getAsyncStories = () => Promise.resolve({ data: { stories: initialStories } });
*/}
const getAsyncStories = () => new Promise((resolve) => setTimeout(() => resolve({ data: { stories: initialStories } }), 2000));

const App = () => {
    const [searchTerm, setSearchTerm] = useStorageState('search', '');
    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAsyncStories()
          .then(result => {
            setStories(result.data.stories)
            setIsLoading(false);
          })
          .catch(() => setIsError(true));
    }, []);

    const handleSearch = event => setSearchTerm(event.target.value);
    const handleRemoveStory = item => setStories(stories.filter(story => item.objectID !== story.objectID));
    const filteredStories = searchTerm ? stories.filter(story => story.title.toLowerCase().includes(searchTerm.toLowerCase())) : stories;

    return (
        <div>
            <h1>Learning React</h1>
            <InputWithLabel id="search" value={searchTerm} onInputChange={handleSearch}>Search:&nbsp;</InputWithLabel>

            <hr />

            {isError && <p>Something went wrong...</p>}
            {isLoading ? (
            <p>Loading...</p>
            ) : (
            <List items={filteredStories} onRemoveItem={handleRemoveStory} />
            )}
        </div>
    );
}

const List = ({items, onRemoveItem}) => (
    <ul>
        {items.map(item => <ListItem key={item.objectID} item={item} onRemoveItem={onRemoveItem} />)}
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
const ListItem = ({item, onRemoveItem}) => (
    <li>
        <span><a href={item.url}>{item.title}</a>, </span>
        <span>{item.author}, </span>
        <span>{item.num_comments}, </span>
        <span>{item.points}</span>
        &nbsp;
        <span><button type="button"onClick={() => onRemoveItem(item)}>Remove</button></span>
    </li>
);

const InputWithLabel = ({id, value, type='text', onInputChange, children}) => {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input id={id} type={type} value={value} onChange={onInputChange}/>
            {/* Always pass functions to handlers, not the return value -
                unless the function returns another function.
            */}
        </>
    );
};

export default App;

