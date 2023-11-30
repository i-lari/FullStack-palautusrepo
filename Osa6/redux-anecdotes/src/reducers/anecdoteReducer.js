import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find( a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1 
      }
      return state.map(a => a.id !== id ? a : changedAnecdote).sort((a,b)=>b.votes-a.votes)  
    },
    setAnecdotes(state,action) {
      return action.payload
    }
  },
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdotesSlice.reducer