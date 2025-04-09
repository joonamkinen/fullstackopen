import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { expect } from 'vitest'

describe('<Blog />', () => {
  const blog = {
    title: 'Testblog',
    author: 'Test Author',
    url: 'testurl.fi',
    likes: 5,
    user: { username: 'testuser' }
  }

  const user = { username: 'testuser', name: 'test' }
  const mockUpdateBlog = vi.fn()
  const mockDeleteBlog = vi.fn()



  test('renders blog title', () => {
    render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
        user={user}
      />
    )

    const element = screen.getByText((content, element) =>
      content.startsWith('Testblog')
    )
    expect(element).toBeDefined()
  })
  test('renders url, likes, and author when the "show" button is clicked', async () => {
    const component = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
        user={user}
      />
    )
    const testuser = userEvent.setup()
    const button = screen.getByText('show')
    await testuser.click(button)

    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
  })
  test('when likebutton is pressed twice call eventhandler twice', async () => {
    render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
        user={user}
      />
    )

    const testuser = userEvent.setup()
    const showButton = screen.getByText('show')
    await testuser.click(showButton)

    const likeButton = screen.getByText('like')
    await testuser.click(likeButton)
    await testuser.click(likeButton)

    expect(mockUpdateBlog).toHaveBeenCalledTimes(2)
  })
  test('calls the event handler with the correct details when a new blog is created', async () => {
    const mockCreateBlog = vi.fn()

    render(<BlogForm createBlog={mockCreateBlog} />)

    const testuser = userEvent.setup()

    const titleInput = screen.getByTestId('title-input')
    const authorInput = screen.getByTestId('author-input')
    const urlInput = screen.getByTestId('url-input')
    const createButton = screen.getByText('create')

    await testuser.type(titleInput, 'New Blog Title')
    await testuser.type(authorInput, 'New Blog Author')
    await testuser.type(urlInput, 'newblogurl.com')
    await testuser.click(createButton)

    expect(mockCreateBlog).toHaveBeenCalledTimes(1)
    expect(mockCreateBlog).toHaveBeenCalledWith({
      title: 'New Blog Title',
      author: 'New Blog Author',
      url: 'newblogurl.com',
    })
  })
})