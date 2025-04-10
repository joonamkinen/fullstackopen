import { BrowserRouter as Router, Routes, Route, Link, } from 'react-router-dom'
import PropTypes from 'prop-types'
import Anecdote from './Anecdote'
import AnecdoteList from './AnecdoteList'
import CreateNew from './AnecdoteForm'
import About from './About'

const Menu = ({ anecdotes, addNew }) => {
    const padding = {
        paddingRight: 5
    }
    return (
        <Router>
            <div>
                <Link style={padding} to="/" >anecdotes</Link>
                <Link style={padding} to="/create">create new</Link>
                <Link style={padding} to="/about">about</Link>
            </div>

            <Routes>
                <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
                <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
                <Route path="/create" element={<CreateNew addNew={addNew} />} />
                <Route path="/about" element={<About />} />
            </Routes>

        </Router>
    )
}

Menu.propTypes = {
    anecdotes: PropTypes.array.isRequired,
    addNew: PropTypes.func.isRequired,
}
export default Menu

