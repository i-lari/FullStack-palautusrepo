import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  //  const mockHandleLike = jest.fn()

    const blog = {
        title: 'this is a test',
        author: 'testAuthor',
        url: 'testUrl',
        user: 'testUser'
      }

  render(<Blog blog={blog} handleLike={mockHandleLike} showDelete={false} />)

  const element = screen.getByText('this is a test')
  expect(element).toBeDefined()
})