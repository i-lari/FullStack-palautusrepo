const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: (body.likes ? body.likes : 0),
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.notes.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogsRouter.get('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(note)
    } else {
      response.status(404).end()
    }
})


blogsRouter.delete('/:id', async (request,response,next) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request,response,next) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  await Blog.findByIdAndUpdate(request.params.id,blog,
    { new: true, runValidators: true, context: 'query' })
  
  response.status(201).end()
})

module.exports = blogsRouter