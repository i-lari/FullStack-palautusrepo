import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const user = blog.user.username || ''
  console.log(user)

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
      <p>{blog.likes}</p>
      <p>{user}</p>
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  </div>
  )
}

export default Blog