import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Blog from './Blog'
import blogService from '../services/blogs'

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
    user:  { name: 'Sepi Papunen' },
    likes: 8
  }

  render(
    <Blog blog={blog} />
  )

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
    user:  { name: 'Sepi Papunen' },
    likes: 5,
    id: '9495969969'
  }

  const addLike = jest.fn()

  blogService.update = jest.fn().mockResolvedValue({
    ...blog,
    likes: blog.likes + 1
  })

  const component = render(
    <Blog blog={blog} addLike={addLike} />
  )

  fireEvent.click(component.getByText('View'))
  fireEvent.click(component.getByText('Like'))
  fireEvent.click(component.getByText('Like'))

  await waitFor(() => {
    expect(addLike).toHaveBeenCalledTimes(2)
  })
})


/*
  userEvent.click(likeButton)
  console.log('mockUpdate calls after second click:', mockUpdate.mock.calls)

  expect(mockUpdate.mock.calls).toHaveLength(2)
*/