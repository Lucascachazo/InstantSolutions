import React from 'react'
import { Link } from 'react-router-dom'
const Article = ({ article }) => {
  return (
    <div className="card" >
      <div className="cardTop" style={{ backgroundImage: `url(${article.pic})` }}>
      </div>
      <div className="cardBottom">
        <h4>{article.title}</h4>
        <p>{article.description}</p>
        <Link to={{ pathname: article.url }} target="_blank" >Ver mas...</Link>
      </div>
    </div>
  )
}

export default Article
