import React, { useState } from 'react'
import blogService from './../services/blogs'

const Blog = ({ blog, handleLike,showDelete }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = () => {
    const ref = { ...blog }
    ref.likes=likes
    blogService.like(ref).then(response =>
      setLikes(response.likes)
    )
    handleLike()
  }

  const deleteBlog = () => {
    if(window.confirm(`Delete ${blog.title} by ${blog.author} ?`)) {
      blogService.remove({ ...blog })
      handleLike()
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
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>view</button>
          {blog.title} {blog.author}
        </div>
        <div style={showWhenVisible}>
          <h3>{blog.title}</h3>
          <p>{blog.author}</p>
          <p>{blog.url} </p>
          <p>{likes}</p><button onClick={likeBlog}>like</button>
          <p>{user}</p>
          <button onClick={toggleVisibility}>hide</button>
          {showDelete&& <button onClick={deleteBlog}>Delete</button>}
        </div>
      </div>
    </div>
  )
}

export default Blog