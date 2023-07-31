import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'
//import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const blog = {
    title: 'Joku blogi',
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Joku blogi')

  expect(element).toBeDefined()
})

test('clicking the view button displays rest of the information', async () => {
  const blog = {
    title: 'Testiblogi',
    url: 'www.testailua.fi',
    user: { name: 'Sepi Papunen' },
    likes: 8,
  }

  render(<Blog blog={blog} />)

  const button = screen.getByText('View')
  fireEvent.click(button)

  const urlElement = screen.getByText('www.testailua.fi')
  const userElement = screen.getByText('Sepi Papunen')
  const likesElement = screen.getByText(/likes: 8/i)

  expect(urlElement).toBeInTheDocument()
  expect(userElement).toBeInTheDocument()
  expect(likesElement).toBeInTheDocument()
})

test('clicking like button will call the event handler twice', async () => {
  const blog = {
    title: 'Testiblogi',
    url: 'www.testailua.fi',
    user: { name: 'Sepi Papunen' },
    likes: 5,
    id: '9495969969',
  }

  const addLike = jest.fn()
  const setBlogs = jest.fn()

  blogService.update = jest.fn().mockResolvedValue({
    ...blog,
    likes: blog.likes + 1,
  })

  const component = render(
    <Blog blog={blog} addLike={addLike} setBlogs={setBlogs} />
  )

  fireEvent.click(component.getByText('View'))
  fireEvent.click(component.getByText('Like'))
  fireEvent.click(component.getByText('Like'))

  await waitFor(() => {
    expect(addLike).toHaveBeenCalledTimes(2)
  })
})

test('the LoginForm calls right callback functions when new blog is created', async () => {
  //const user = userEvent.setup()

  const handleSubmitMock = jest.fn()
  const handleTitleMock = jest.fn()
  const handleAuthorMock = jest.fn()
  const handleUrlMock = jest.fn()

  render(
    <BlogForm
      handleSubmit={handleSubmitMock}
      handleTitle={handleTitleMock}
      handleAuthor={handleAuthorMock}
      handleUrl={handleUrlMock}
      value=""
    />
  )

  const titleInput = screen.getByPlaceholderText('add title here')
  const authorInput = screen.getByPlaceholderText('add author here')
  const urlInput = screen.getByPlaceholderText('add url here')
  const createButton = screen.getByText('Create')

  const titleValue = 'Jest-testauksen salat'
  const authorValue = 'Tero Testitukko'
  const urlValue = 'www.toimiiko.fi'

  fireEvent.change(titleInput, { target: { value: titleValue } })
  fireEvent.change(authorInput, { target: { value: authorValue } })
  fireEvent.change(urlInput, { target: { value: urlValue } })
  fireEvent.submit(createButton.parentNode)

  console.log('Title', titleInput)
  console.log('Author', authorInput)
  console.log('Url', urlInput)
  console.log('Data:', handleSubmitMock)

  expect(handleSubmitMock).toHaveBeenCalledTimes(1)
})
