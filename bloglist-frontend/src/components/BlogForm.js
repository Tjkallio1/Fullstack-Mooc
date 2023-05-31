const BlogForm = ({ handleSubmit, handleTitle, handleAuthor, handleUrl, value }) => {

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          Title
          <input
            type="text"
            value={value}
            onChange={handleTitle}
          />
        </div>
        <div>
        Author
          <input
            type="text"
            value={value}
            onChange={handleAuthor}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            value={value}
            onChange={handleUrl}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm