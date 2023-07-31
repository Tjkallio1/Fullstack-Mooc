const dummy = (blogs) => {
    return 1  
  }

  const totalLikes = (blogs) => {
    const likes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
    return likes
  }

  const mostLikes = (blogs) => {
    const sorted = blogs.sort((a, b) => b.likes - a.likes)
    const mostLiked = sorted[0]
    
    const { title, author, likes } = mostLiked
    const mostLikedObject = JSON.stringify({ title, author, likes })
    return mostLikedObject
  }
  
  module.exports = {
    dummy,
    totalLikes,
    mostLikes
  }