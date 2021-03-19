const mongoose = require('mongoose') 

mongoose.connect(process.env.MONGODB,{
   useNewUrlParser:true,
   useCreateIndex:true,
   useUnifiedTopology:true,
   useFindAndModify:false
})
.then(() => console.log('Data Base connected'))
.catch(error => console.log(error))