const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const PORT = process.env.PORT||3030
const BlogRoutes = require('./routes/blogRoutes')
const app = express()

//connect to mongoDB
const dbURI = 'mongodb+srv://vivuser:kzFK33TBJ0KOtzyD@cluster0.ayr0cua.mongodb.net/notes-node?retryWrites=true&w=majority'
mongoose.connect(dbURI).then((result)=>{
    console.log('connected to db')
    app.listen(PORT)
}).catch((err)=>console.log('Error connecting to db',err))
//register view engine (ejs)
app.set('view engine','ejs')

//mongoose sandbox routes
// app.get('/add-blog',(req,res)=>{
//     const blog = new Blog({
//         title: 'new blog 2',
//         blogContent: 'about my new blog'
//     })
//     blog.save().then((result)=>{
//         res.send(result)
//     }).catch((err)=>{console.log(err)})
// })
// app.get('/all-blogs',(req,res)=>{
//     Blog.find().then((result)=>{
//         res.send(result)
//     }).catch((err)=>console.log(err))
// })

// app.get('/single-blog',(req,res)=>{
//     Blog.findById('630f510166fcbee49821696b').then((result)=>{
//         res.send(result)
//     }).catch((err)=>console.log(err))
// })


//middleware & static files
//morgan logger
app.use(morgan('dev'))
app.use(express.static('public'))
// to use post data
app.use(express.urlencoded({extended: true}))

//routes
app.get('/',(req,res)=>{
    res.redirect('/blogs')
})
app.get('/about',(req,res)=>{
    res.render('about',{title:'About'})
})

app.use('/blogs',BlogRoutes)

//redirect
app.get('/aboutus',(req,res)=>{
    res.redirect('/about')
})

//must be the last 
//404 page
app.use((req,res)=>{
    res.render('404',{title:'404: Not Found'})
})