const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')

blogsRouter.get('/blogs', async (request, response) => {
    console.log(request.body)
    const blogs = await Blog.find({})
        response.json(blogs)
  })

blogsRouter.get('/blogs/:id', async (request, response) => {
    console.log('get by ID route hit')
    const blog = await Blog.findById(request.params.id)
    console.log('blog', blog)
    if(blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
})

blogsRouter.post('/blogs', async (request, response, next) => {   
  const body = request.body

  if(!body.title || !body.url) {
    return response.status(400).json({error: 'title or url missing'})
  }
 
  const blog = new Blog ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0 
  })
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/blogs/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id) 
  response.status(204).end()
  })
 

blogsRouter.put('/blogs/:id', (request, response, next) => {
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
  
  Blog.findByIdAndUpdate(request.params.id, blog,  { new: true })
   .then(updatedBlog => {
      response.json(updatedBlog)
   }) 
  .catch(error  => next(error))
})

module.exports = blogsRouter