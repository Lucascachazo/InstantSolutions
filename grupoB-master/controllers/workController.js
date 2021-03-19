const Work = require('../models/Work')

const WorkController = {
   addWork:(req,res) =>{
      const {idUserConsumer, idUserProvider} = req.body
      const newWork = new Work({
        idUserConsumer, idUserProvider
      })
      newWork.save()
      .then(work =>{return res.json({
        success:true, 
        response:{work,
          workId: work._id
        }
        })})
      .catch(error => {return res.json({success:false, error})})
   },
   getWorks:(req,res) =>{
      Work.find()
      .populate('idUserProvider')
         .populate('idUserConsumer')
         .populate({
            path:'idUserProvider',
            populate:{
              path:'idUserBase',
              model:'userBase'
            }
          })
         .populate({
            path:'idUserConsumer',
            populate:{
              path:'idUserBase',
              model:'userBase'
            }
          })
          .populate({
            path:'idUserProvider',
            populate:{
              path:'review.idUser',
              model:'userConsumer'
            }
          }).populate({
            path:'idUserProvider',
            model:'userProvider',
            populate:[{
              path:'review.idUser',
              model:'userConsumer',
              populate:{
                path:'idUserBase',
                model:'userBase'
              }
            }]
          })
      .then(work => {return res.json({success:true, response:work})})
      .catch(error => {return res.json({success:false, error})})
   },
   delWork:async(req,res) =>{
     const idForDelete=req.params.id
     try {
      const data = await Work.findOneAndRemove({_id:idForDelete})
      return res.json({success:true, respuesta:data})
    } catch (e) {
      return res.json({success:false, respuesta: 'Ha ocurrido un error en la eliminacion.'})
    }
   },
   changeState:async(req,res)=>{

     const idWork=req.body.idWork
     try {
      const work= await Work.find({'_id':idWork})
      const newState=work[0].state+1
      const respuesta= await Work.updateOne(
         {'_id':idWork},
         {'$set' : {'state':newState}}
        )
        return res.json({success:true, respuesta:respuesta})
     } catch (error) {
      return res.json({success:false, respuesta: 'Ha ocurrido un error en la modificacion del estado'})
    }
   },
   findWorkById :async (req,res) =>{
     const urlId = req.params.id
     var userConsult=await Work.find({'idUserConsumer': urlId})
     .populate('idUserConsumer')
     .populate('idUserProvider')
     .populate({
      path:'idUserConsumer',
      populate:{
        path:'idUserBase',
        model:'userBase'
      }
    })
    .populate({
      path:'idUserProvider',
      populate:{
        path:'idUserBase',
        model:'userBase'
      }
    })
    if (userConsult.length === 0) {
      userConsult=await Work.find({'idUserProvider': urlId})
      .populate('idUserConsumer')
      .populate('idUserProvider')
      .populate({
        path:'idUserConsumer',
        populate:{
          path:'idUserBase',
          model:'userBase'
        }
      })
      .populate({
        path:'idUserProvider',
        populate:{
          path:'idUserBase',
          model:'userBase'
        }
      })
      
      if(userConsult.length === 0){
        return res.json({
          success: false,
          response: []
        })
      }
    }
      return res.json({
        success: true,
        response: userConsult
      })
},
}
module.exports = WorkController