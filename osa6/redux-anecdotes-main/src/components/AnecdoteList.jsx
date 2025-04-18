import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"


const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) =>
        anecdotes.filter((anecdote) =>
            anecdote.content && anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
    )
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAnecdote(id))
    }

    return (
        <div>
            {
                anecdotes.slice().sort((a, b) => b.votes - a.votes).map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AnecdoteList