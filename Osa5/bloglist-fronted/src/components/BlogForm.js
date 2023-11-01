import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = React.forwardRef(({
  createBlog
},ref) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div> title
          <input value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
          ></input>
        </div>
        <div> author
          <input value={newAuthor}
            onChange={event => setNewAuthor(event.target.value)}
          ></input>
        </div>
        <div> Url
          <input value={newUrl}
            onChange={event => setNewUrl(event.target.value)}
          ></input>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )})

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}
BlogForm.displayName = 'BlogForm'

export default BlogForm