import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const Notification = ({ message,className }) => {
  if (message === '' || message===null) {
    return null
  }
  return (
    <div className={className}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [notification, setNotification] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      setNotification('login succesful')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

    const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')

      setUser(null)
      setUsername('')
      setPassword('')
      blogService.setToken(null)
      setNotification('logout succesful')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('what is going on help')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    blogService.create(newBlog)
    setBlogAuthor('')
    setBlogTitle('')
    setBlogUrl('')
    setNotification('blog creation succesful')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
  } catch (exception) {
    setErrorMessage(`what is going on help ${exception}`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  }
  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.username} logged in
      <button onClick={handleLogout}> logout </button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div> title
          <input value={blogTitle} onChange={({target})=>setBlogTitle(target.value)}></input>
        </div>
        <div> author
          <input value={blogAuthor} onChange={({target})=>setBlogAuthor(target.value)}></input>
        </div>
        <div> Url
          <input value={blogUrl} onChange={({target})=>setBlogUrl(target.value)}></input>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
const notifications = () => (
  <div>
      <Notification message={notification} className='successMessage'/>
      <Notification message={errorMessage} className='errorMessage'/>
  </div>
)
  return (
    <div>
      {notifications()}
      {!user && loginForm()}
      {user && blogList()}
      {user && blogForm()}

    </div>
  )
}

export default App