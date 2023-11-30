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
    },
    sortAnecdotes(state,action) {
      return state.sort((a,b)=>b.votes-a.votes)  
    }
  },
})

export const { createAnecdote, voteAnecdote, setAnecdotes, sortAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const vote = (id) => {
  return async dispatch => {
    const voted = await anecdoteService.vote(id)
    dispatch(voteAnecdote(id))
  }
}

export default anecdotesSlice.reducer