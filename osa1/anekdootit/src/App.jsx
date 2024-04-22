import { useState } from 'react'

const AnecdoteDisplay = ({ anecdote, votes }) => (
  <div>
    <p>{anecdote}</p>
    <p>Has {votes} votes</p>
  </div>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const initialVotes = Array(anecdotes.length).fill(0)
  const [votes, setVotes] = useState(initialVotes)
  
  const handleNextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes);
  }

  const mostVotedIndex = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <div>
      <h2>Anecdote of the Day</h2>
      <AnecdoteDisplay anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={handleNextAnecdote} text="Next anecdote" />
      <Button handleClick={handleVote} text="Vote" />
    </div>
    <div>
        <h2>Most Voted Anecdote</h2>
        <AnecdoteDisplay anecdote={anecdotes[mostVotedIndex]} votes={votes[mostVotedIndex]} />
      </div>
    </div>
    
  )
}

export default App