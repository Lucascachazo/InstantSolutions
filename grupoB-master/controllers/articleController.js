const Article = require('../models/Article')

const articleController = {
   addArticle:(req,res) =>{
      const {title, pic, url, description} = req.body
      
      const newArticle = new Article({
         title, pic, url, description
      })
      newArticle.save()
      .then(newArticle =>{return res.json({success:true, response:newArticle})})
      .catch(error => {return res.json({success:true, error})})
   },
   getArticles:(req,res) =>{
      Article.find()
      .then(articles => {return res.json({success:true, response:articles})})
      .catch(error => {return res.json({success:false, error})})
   }
}

module.exports = articleController