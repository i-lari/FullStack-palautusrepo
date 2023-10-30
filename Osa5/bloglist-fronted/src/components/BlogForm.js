import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = React.forwardRef(({
  handleSubmit,
  Title,
  Author,
  Url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
},ref) => (
  <div>
    <h2>create new</h2>
    <form onSubmit={handleSubmit}>
      <div> title
        <input value={Title} onChange={handleTitleChange}></input>
      </div>
      <div> author
        <input value={Author} onChange={handleAuthorChange}></input>
      </div>
      <div> Url
        <input value={Url} onChange={handleUrlChange}></input>
      </div>
      <button type="submit">create</button>
    </form>
  </div>
))

BlogForm.propTypes = {
  Title: PropTypes.string.isRequired,
  Author: PropTypes.string.isRequired,
  Url: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired
}
BlogForm.displayName = 'BlogForm'

export default BlogForm