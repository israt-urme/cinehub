import {useEffect, useState} from "react";

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

const App = () => {
    return (
        <main>
            <div className="pattern"></div>
            <div className="wrapper">
                <header>
                    <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without The Hassle</h1>
                </header>
            </div>
        </main>
    )
}

export default App
