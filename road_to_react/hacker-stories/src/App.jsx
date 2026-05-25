import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

const useStorageState = (key, initialState) => {
    const [state, setState] = useState(localStorage.getItem(key) ?? initialState);
    useEffect(() => localStorage.setItem(key, state), [key, state]);
    return [state, setState];
};

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

{/* The timeout in this function is to simulate delay while fetching data from elsewhere. This
    could be more succinctly written as:
    const getAsyncStories = () => Promise.resolve({ data: { stories: initialStories } });
*/}
const storyActions = {  fetchStories: 'STORIES_FETCH_INIT',
                        successFetch: 'STORIES_FETCH_SUCCESS',
                        failFetch: 'STORIES_FETCH_FAILURE',
                        removeStory: 'REMOVE_STORY'
                     };
const storiesReducer = (state, action) => {
    switch (action.type) {
        case storyActions.fetchStories:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case storyActions.successFetch:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case storyActions.failFetch:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case storyActions.removeStory:
            return {
                ...state,
                data: state.data.filter((story) => action.payload.objectID !== story.objectID),
            };
        default:
            throw new Error();
    }
};

const App = () => {
    const [searchTerm, setSearchTerm] = useStorageState('search', '');
    const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);
    const [stories, dispatchStories] = useReducer(storiesReducer, {
        data: [],
        isLoading: false,
        isError: false
    });

    const handleFetchStories = useCallback(async () => {
        dispatchStories({ type: storyActions.fetchStories });
        try {
            const response = await fetch(url);
            const result = await response.json();
            dispatchStories({ 
                type: storyActions.successFetch,
                payload: result.hits,
            });
        } catch (error) {
            console.log(error);
            dispatchStories({ type: storyActions.failFetch });
        }
    }, [url]);

    const handleSearchInput = event => setSearchTerm(event.target.value);
    const handleSearchSubmit = event => {
        setUrl(`${API_ENDPOINT}${searchTerm}`);
        event.preventDefault();
    };
    const handleRemoveStory = item => dispatchStories({
        type: storyActions.removeStory,
        payload: item
    });

    useEffect(() => {handleFetchStories()}, [handleFetchStories]);

    return (
        <div className="container">
            <h1 className="headline-primary">My Hacker Stories</h1>
            <SearchForm searchTerm={searchTerm} onSearchInput={handleSearchInput} onSearchSubmit={handleSearchSubmit} />

            {stories.isError && <p>Something went wrong...</p>}
            {stories.isLoading ? (
            <p>Loading...</p>
            ) : (
            <List items={stories.data} onRemoveItem={handleRemoveStory} />
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
    <li className="item">
        <span style={{ width: '40%' }}><a href={item.url}>{item.title}</a>, </span>
        <span style={{ width: '30%' }}>{item.author}, </span>
        <span style={{ width: '10%' }}>{item.num_comments}, </span>
        <span style={{ width: '10%' }}>{item.points}</span>
        &nbsp;
        <span style={{ width: '10%' }}><button className="button button_small" type="button" onClick={() => onRemoveItem(item)}>Remove</button></span>
    </li>
);

const InputWithLabel = ({id, value, type='text', onInputChange, isFocused, children}) => {
    const inputRef = useRef();
    useEffect(() => {
        if (isFocused && inputRef.current) inputRef.current.focus();
    }, [isFocused]);
    
    return (
        <>
            <label className="label" htmlFor={id}>{children}</label>
            <input className="input" id={id} type={type} value={value} onChange={onInputChange}/>
            {/* Always pass functions to handlers, not the return value -
                unless the function returns another function.
            */}
        </>
    );
};

const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }) => (
    <form onSubmit={onSearchSubmit} className="search-form">
        <InputWithLabel id="search" value={searchTerm} isFocused onInputChange={onSearchInput}>Search:&nbsp;</InputWithLabel>
        <button className="button button_large" type="submit" disabled={!searchTerm}>&#x1F50D;</button>
    </form>
);

export default App;

