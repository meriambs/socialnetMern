const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const personRouter = require ('./routes/Users')
//ici les rest des routes : 
const authentificationRouter = require ('./routes/Auth');
const postRouter = require ('./routes/Post');
const profilRouter = require ('./routes/Profil')



//**fin des routes  */
//middelwar thing to execute things while we enter an other page 
//ici permet d'utiliser le req?body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
// you can create routes
app.get('/', (req,res)=>{
    res.send('heyyy test home ')
}); 
//**********/ connect


//*********Install and setup mongoose::
dotenv.config({path:__dirname + '/config/.env'});
mongoose.connect(process.env.MONGO_URI,{useFindAndModify: false,
     useNewUrlParser: true, 
     useUnifiedTopology: true,useCreateIndex:true}).then(()=>{
    console.log('connected')
}).catch(()=>{
    console.log("not connected")
})
//routes
app.use('/users', personRouter);
//ici les liens des routes :
app.use('/auth', authentificationRouter);
app.use('/profil', profilRouter);
app.use('/post', postRouter);


//**find des liens de routes */
//how to startl listen 
app.listen(3000);