import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Create new</h2>
      <div>
                Title:
        <input
          data-testid="title-input"
          type="text"
          value={newTitle}
          onChange={event => setNewTitle(event.target.value) }
        />
      </div>
      <div>
                Author:
        <input
          data-testid="author-input"
          type="text"
          value={newAuthor}
          onChange={event => setNewAuthor(event.target.value) }
        />
      </div>
      <div>
                URL:
        <input
          data-testid="url-input"
          type="text"
          value={newUrl}
          onChange={event => setNewUrl(event.target.value) }
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm