const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: (body.likes ? body.likes : 0)
  })

  if (body.title && body.url) {
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  } else {
    response.status(400).json('title or url missing')
  }
})

blogsRouter.delete('/:id', async (request,response,next) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter