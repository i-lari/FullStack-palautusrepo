const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "sienet",
        author: "pekka orponen",
        url: "aaa.com",
        likes: 15
    },
    {
        title: "pokemon",
        author: "raato234",
        url: "https://fi.wikipedia.org/wiki/Beluga",
        likes: 2147483647
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let BlogObject = new Blog(initialBlogs[0])
    await BlogObject.save()
    BlogObject = new Blog(initialBlogs[1])
    await BlogObject.save()
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const authors = response.body.map(r => r.author)

    expect(authors).toContain(
        'pekka orponen'
    )
})

test('id is defined', async () => {
    const response = await api.get('/api/blogs')
    for (let i = 0; i < response.body.length; i++) {
        expect(response.body[i].id).toBeDefined()
      }
})

test('POST adds blog', async () => {
    const blogsFirst = await api.get('/api/blogs')
    expect(blogsFirst.body).toHaveLength(initialBlogs.length)

    const newBlog = {
        title: "pokemonni",
        author: "raa",
        url: "https://fi.wikipedia.org/wiki/Beluga",
        likes: 21474
    }
    
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)

})

test('likes is 0 when not specified', async () => {
    const newBlog = {
        title: "pokemonni",
        author: "raa",
        url: "https://fi.wikipedia.org/wiki/Beluga"
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body[response.body.length-1].likes).toEqual(0)
    expect(response.body[response.body.length-1].title).toEqual('pokemonni')
    expect(response.body[response.body.length-1].url).toEqual("https://fi.wikipedia.org/wiki/Beluga")
    expect(response.body[response.body.length-1].author).toEqual("raa")
    expect(response.body).toHaveLength(initialBlogs.length + 1)

})