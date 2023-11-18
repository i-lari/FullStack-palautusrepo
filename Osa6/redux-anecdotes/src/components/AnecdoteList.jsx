import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const allAnecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const anecdotes = filter === 'ALL' ? allAnecdotes : allAnecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList