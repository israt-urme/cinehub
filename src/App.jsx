// Functional arrow component
const Card = ({ title, rating=0, isCool=false, actors=[] }) => {
    return (
        /**
         * If I change same thing here and in "card" class, these style will work
         * because inline styles have preferences over all the other CSS styles
         */
        <div className="card" style={{border: '1px solid #4b5362'}}>
            <h2>{title} has {rating} rating.</h2>
        </div>
    )
}

const App = () => {
    return (
        <div className="card-container">
            {/* Passing props to component title, rating, isCool etc. */}
            <Card title="Star wars" rating={5} isCool={true} actors={[{ name:"Actor-A" }]} />
            <Card title="Avatar" />
            <Card title="The lion King" />
        </div>
    )
}

export default App
