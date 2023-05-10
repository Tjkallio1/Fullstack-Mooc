const listHelper = require('./list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const blogs = [
    {
    title: "Esimerkkiblogi1",
    author: "Esimerkki Eetu",
    url: "http://www.blogitestaus.fi",
    likes: 7,
    __v: 0
    },
    {
    title: "Esimerkkiblogi2",
    author: "Esimerkki Erkki",
    url: "http://www.skeidaa.fi",
    likes: 12,
    __v: 0
    },
    {
    title: "Esimerkkiblogi3",
    author: "Esimerkki Eemeli",
    url: "http://www.juuh.fi",
    likes: 21,
    __v: 0
    }
    ]

test('total likes counted', () => {
  const likeResults = listHelper.totalLikes(blogs)
  expect(likeResults).toBe(40)
})
})
