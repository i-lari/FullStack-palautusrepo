import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async blogObject => {
  const config = {
    headers: {authorization: token},
  }
  const newBlog = {...blogObject}
  newBlog.likes = blogObject.likes + 1

  const response = await axios.put(`${baseUrl}/${blogObject.id}`,newBlog,config)
  return response.data
}

const remove = async blogObject => {
  const config = {
    headers: {authorization: token},
  }
  const response = await axios.delete(`${baseUrl}/${blogObject.id}`,config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll,setToken, create, like, remove }