import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const object = { content, id: Math.floor(Math.random() * 1000000), votes : 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const vote = async (id) => {
    const start = await axios.get(baseUrl +"/"+ id)
    const change = start.data
    const newAnecdote = {...change, votes : change.votes + 1}
    const response = await axios.put(baseUrl +"/"+ id, newAnecdote)
    return response.data

}

export default { getAll, createNew, vote }