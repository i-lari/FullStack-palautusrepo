import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
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
   blogService.getAll()
   .then(blogs =>
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
      url: blogUrl,
      user: user
    }
    await blogService.create(newBlog)
    blogService.getAll()
    .then(blogs =>
       setBlogs(blogs)
     )
    setBlogAuthor('')
    setBlogTitle('')
    setBlogUrl('')
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
    setNotification(`created ${newBlog.title} by ${newBlog.author}`)
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

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
       <Blog key={blog.id} blog={blog}/> 
      )}
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
      {!user &&<Togglable buttonLabel='login'>
      <LoginForm
       username={username}
       password={password}
       handleUsernameChange={({ target }) => setUsername(target.value)}
       handlePasswordChange={({ target }) => setPassword(target.value)}
       handleSubmit={handleLogin}
       />
       </Togglable>}
       {user && <p>{user.username} logged in
      <button onClick={handleLogout}> logout </button></p>}
      {user && blogList()}
     {user && <Togglable buttonLabel='create new'>
        <BlogForm
        Title={blogTitle}
        Author={blogAuthor}
        Url={blogUrl}
        handleAuthorChange={({ target }) => setBlogAuthor(target.value)}
        handleTitleChange={({ target }) => setBlogTitle(target.value)}
        handleUrlChange={({ target }) => setBlogUrl(target.value)}
        handleSubmit={handleNewBlog}
        />
      </Togglable> }

    </div>
  )
}

export default App