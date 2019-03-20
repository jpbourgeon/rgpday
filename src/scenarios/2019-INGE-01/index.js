const articles = [
  {
    name: 'Informatique'
  },
  {
    name: 'Direction'
  },
  {
    name: 'RH / Finances'
  }
]

const getArticle = (index = 0) => {
  return articles[index]
}

export { articles, getArticle }
