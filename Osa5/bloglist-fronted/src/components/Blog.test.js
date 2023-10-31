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
    user: 'testUser',
    likes: '2'
  }

  render(<Blog blog={blog}/>)

  const element = screen.getByText('this is a test')
  const element2 = screen.getByText('testAuthor')
  expect(element).toBeDefined()
  expect(element2).toBeDefined()
})

test('does not initially render url or likes', () => {

  const blog = {
    title: 'this is a test',
    author: 'testAuthor',
    url: 'testUrl',
    user: 'testUser',
    likes: '2'
  }
  render(<Blog blog={blog}/>)

  const element = screen.getByText('testUrl').closest("div")
  const element2 = screen.getByText('2').closest("div")
  
  expect(element).toBeDefined()
  expect(element2).toBeDefined()
  expect(element2).toHaveStyle('display: none')
  expect(element).toHaveStyle('display: none')

})