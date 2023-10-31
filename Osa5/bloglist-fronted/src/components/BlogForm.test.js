import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> calls back with correct info', async () => {

  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm handleSubmit={createBlog}/>)

  const inputs = screen.getAllByRole('textbox')
  const button = screen.getByText('create')
  expect(button).toBeDefined()
  await user.type(inputs[0], 'formtest')
  await user.click(button)

  console.log(createBlog.mock.calls)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].content).toBe('formtest')


})