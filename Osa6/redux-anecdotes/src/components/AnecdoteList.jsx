import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const allAnecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const anecdotes = filter === 'ALL' ? allAnecdotes : allAnecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    const vote = (id) => {
        dispatch(voteAnecdote(id))
        dispatch(setNotification(`you voted '${anecdotes.find(a=> id === a.id).content}'`))
        setTimeout( () => {
            dispatch(setNotification(null))
        },5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList