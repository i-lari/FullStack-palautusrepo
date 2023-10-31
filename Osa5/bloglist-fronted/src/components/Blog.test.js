import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {

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

  const element = screen.getByText('testUrl').closest('div')
  const element2 = screen.getByText('2').closest('div')

  expect(element).toBeDefined()
  expect(element2).toBeDefined()
  expect(element2).toHaveStyle('display: none')
  expect(element).toHaveStyle('display: none')

})


test('renders url and likes after "view" -button has been pressed', async () => {

  const blog = {
    title: 'this is a test',
    author: 'testAuthor',
    url: 'testUrl',
    user: 'testUser',
    likes: '2'
  }
  render(<Blog blog={blog}/>)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  expect(button).toBeDefined()
  const element = screen.getByText('testUrl').closest('div')
  expect(element).toBeDefined()
  const element2 = screen.getByText('2').closest('div')
  expect(element2).toHaveStyle('display: none')
  expect(element).toHaveStyle('display: none')

  await user.click(button)

  expect(element2).toHaveStyle('display: block')
  expect(element).toHaveStyle('display: block')

})

test('renders url and likes after "view" -button has been pressed', async () => {

  const blog = {
    title: 'this is a test',
    author: 'testAuthor',
    url: 'testUrl',
    user: 'testUser',
    likes: '2'
  }
  render(<Blog blog={blog}/>)
  const user = userEvent.setup()
 // const viewButton = screen.getByText('view')
  const button = screen.getByText('like')
  expect(button).toBeDefined()

  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1)
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)

})