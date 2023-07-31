const BlogForm = ({
  handleSubmit,
  handleTitle,
  handleAuthor,
  handleUrl,
  value,
}) => {
  return (
    <div>
      <h3>Create new</h3>
      <form id="blog-form" onSubmit={handleSubmit}>
        <div>
                    Title
          <input
            id="title"
            type="text"
            value={value}
            onChange={handleTitle}
            placeholder="add title here"
          />
        </div>
        <div>
                    Author
          <input
            id="author"
            type="text"
            value={value}
            onChange={handleAuthor}
            placeholder="add author here"
          />
        </div>
        <div>
                    Url
          <input
            id="url"
            type="text"
            value={value}
            onChange={handleUrl}
            placeholder="add url here"
          />
        </div>
        <button id="create-button" type="submit">
                    Create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
