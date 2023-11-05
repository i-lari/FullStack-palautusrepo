import React, { useState } from 'react'
import blogService from './../services/blogs'

const Blog = ({ blog, handleLike, showDelete, sortBlogs }) => {
  const [visible, setVisible] = useState(false)
  const likes= blog.likes
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const deleteBlog = async () => {
    if(window.confirm(`Delete ${blog.title} by ${blog.author} ?`)) {
      await blogService.remove({ ...blog })
      sortBlogs()
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const user = blog.user.username || ''

  return (
    <div style={blogStyle}>
      <div>
        <h3>{blog.title}</h3>
        <p>{blog.author}</p>
        <div style={hideWhenVisible}>
          <button id='viewblog-button' onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible}>
          <p>{blog.url} </p>
          <p id='likes'>{likes}</p><button id='like-button' onClick={handleLike}>like</button>
          <p>{user}</p>
          <button onClick={toggleVisibility}>hide</button>
          {showDelete&& <button id='delete-button' onClick={deleteBlog}>Delete</button>}
        </div>
      </div>
    </div>
  )
}

export default Blog