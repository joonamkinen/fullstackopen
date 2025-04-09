import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [fullView, setFullView] = useState(false)

  const handleDelete = async () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      deleteBlog(blog)
    }
  }

  return (
    <div style={blogStyle}>
      <p>
        {blog.title} {blog.author}
        <button onClick={() => setFullView(!fullView)}>
          {fullView ? 'hide' : 'show'}
        </button>
      </p>
      {fullView && (
        <div>
          URL: {blog.url} <br />
          likes: <span data-testid="likes">{blog.likes}</span>
          <button onClick={() => updateBlog(blog)}>like</button>
          <br />
          {blog.user && blog.user.name} <br />
          {user && blog.user && user.username === blog.user.username && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog