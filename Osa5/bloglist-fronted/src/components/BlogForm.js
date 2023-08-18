const BlogForm = ({
    handleSubmit,
    Title,
    Author,
    Url,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange
    })=> (
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
  )
  export default BlogForm