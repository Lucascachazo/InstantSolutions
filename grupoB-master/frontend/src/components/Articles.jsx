import React, { useEffect, useState } from 'react'
import Article from './Article'
import Api from './Api'

const Articles = () => {
  const [articles, setArticles] = useState([])
  useEffect(() => {
    fetch(Api + '/article/')
      .then(response => response.json())
      .then(data => setArticles(data.response))
  }, [])
  return (
    <>
      <h3 className="titleArticle">Aprendamos juntos!</h3>
      <div className="cardContainer">
        {articles.map(article => <Article article={article} key={article._id} />)}
      </div>
    </>
  )
}

export default Articles
