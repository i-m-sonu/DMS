const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost:27017/database")
.then(()=>{
    console.log('mongodb connected');
})
.catch(()=>{
    console.log('error');
})
