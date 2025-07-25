import {useEffect, useState} from "react";
import heroImage from './assets/hero.jpg';
import Search from "./components/Search.jsx";
import MovieCard from "./components/MovieCard.jsx";

/** React state:
 * React rendering process relies on state and props to decide when and how to re-render a component
 * when a state changes, react automatically re-renders and reflect the new changes on the screen such as like/unlike
 */

/** React hooks:
 * Hooks are special func in react that allows to let you tap into react features like;
 * for managing state (useState)
 * for handling side effects e.g. data fetching (useEffect)
 * for sharing data across components (useContext)
 * for optimizing callback functions (useCallback)
 * and plenty more (useReducer, useMemo, useRef, useTransition)
 */

/** Card component includes:
 * @param title
 * @param rating
 * @param isCool
 * @param actors
 * @returns {JSX.Element}
 * @constructor
 */

// Functional arrow component
const Card = ({ title, rating=0, isCool=false, actors=[] }) => {
    // defining a state [variable_name, set_var_name]
    const [count, setCount] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);

    /**
     * My Effect runs twice when the component mounts
     * because react runs setup and cleanup one extra time before the actual setup.
     * (remove StrictMode wrapper from main.jsx to avoid this).
     * it's a stress test that verifies Effect's logic is implemented correctly.
     */
    useEffect(() => {
        console.log(`${title} has been liked: ${hasLiked}`);
    }, [hasLiked]);

    // most common
    useEffect(() => {
        console.log("card rendered");
    }, [])

    return (
        /**
         * If I change same thing here and in "card" class, these style will work
         * because inline styles have preferences over all the other CSS styles
         */
        <div
            className="card"
            style={{border: '1px solid #4b5362'}}
        >
            <h2>{title}</h2>
            <button
                onClick={() => {
                    setHasLiked(!hasLiked);
                    setCount((prevState) =>  prevState + 1);
                }
                }
                type="button"
            >
                {/* conditional rendering; a simple case: render when count has value*/}
                {hasLiked ? '❤️' : '🤍'}{count || null}
            </button>
        </div>
    )
}

/*
const App = () => {
    return (
        <div>
            <h1 className="mb-10 text-3xl font-bold text-white">
                Welcome to the app!
            </h1>
            <div className="card-container">
                {/!* Passing props to component title, rating, isCool etc. *!/}
                <Card title="Star wars" rating={5} isCool={true} actors={[{name: "Actor-A"}]}/>
                <Card title="Avatar"/>
                <Card title="The lion King"/>
            </div>
        </div>
    )
}
*/

/** API: Application Programming Interface
 * A set of rules that allows one software application (eg a react app) to
 * talk to another (server or database) that set somewhere else
 */

const API_BASE_URL = "https://api.themoviedb.org/3"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`, // verifies who's trying to make a request
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    // to view error message in app browser
    const [errorMessage, setErrorMessage] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMovies = async (query = '') => {
        setIsLoading(true);
        setErrorMessage("");

        try {
            const endpoint = query
                ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie`;
            // fetch allows to make api request to get data
            const response = await fetch(endpoint, API_OPTIONS);

            if(!response.ok) {
                throw new Error("Failed to fetch movie");
            }
            // parse this response to a json object
            const data = await response.json();

            if(data.success === false) {
                setErrorMessage(data.statusMessage || 'Failed to fetch movie');
                setMovieList([]);
                return;
            }
            setMovieList(data.results || []);
        } catch (e) {
            console.log(`Error fetching movies ${e}`);
            setErrorMessage('Error fetching movies. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchMovies(searchTerm);
    }, [searchTerm])

    return (
        <main>
            <div className="pattern"></div>
            <div className="wrapper">
                <header>
                    <img src={heroImage} alt="Hero Banner" />
                    <h3 className="text-white text-3xl text-center">Find <span className="text-gradient">Movies</span> You'll Enjoy <br/> Without The Hassle</h3>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>

                <section className="all-movies">
                    <h2>All Movies</h2>
                    {isLoading ? (
                        <div className="spinner"></div>
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                        ) : (
                          <ul>
                              {/** Mapping a list of array
                               array.map((item) => { return item; }
                               or
                               array.map((item) => ( renders directly in the brackets without return )
                               also don't forget to add unique key; best practice is to pass id as key
                               */}
                              {movieList.map((movie) => (
                                  <MovieCard key={movie.id} movie={movie} />
                              ))}
                          </ul>
                        )
                    }
                </section>
            </div>
        </main>
    )
}

export default App
