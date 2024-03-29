const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const { tokenExtractor } = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { urlencoded } = require('express')

blogsRouter.get('/blogs', async (request, response) => {
    console.log(request.body)
    const blogs = await Blog
      .find({}).populate('user', {username: 1, name: 1})
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

blogsRouter.post('/blogs/:id/comments', async (request, response) => {
  const { id } = request.params
  const { comment } = request.body
  if(!comment) {
    return response.status(400).json({error: 'Comment missing'})
  }

  try {
    const blog = await Blog.findById(id)
    if (!blog) {
      return response.status(404).json({error:'Blog not found'})
    }

    blog.comments.push(comment)
    const updatedBlog = await blog.save()
    response.json(updatedBlog)
  } catch (error) {
    response.status(500).json({ error: 'Something went wrong' })
  }
})

blogsRouter.use(tokenExtractor);

blogsRouter.post('/blogs', async (request, response) => {   
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if(!body.title || !body.url) {
    return response.status(400).json({error: 'title or url missing'})
  }

  const blog = new Blog ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
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