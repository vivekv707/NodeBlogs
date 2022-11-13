const Blog = require('../models/blog')
const blog_index = (req,res)=>{
    Blog.find().sort({createdAt: -1}).then((result)=>{
        res.render('index',{title: 'Home Page',blogs: result})
    }).catch((err)=>console.log(err))
}
const blog_delete = (req,res)=>{
    const id = req.params.id
    Blog.findByIdAndDelete(id).then((result)=>{
        res.json({redirect:'/blogs'})
    }).catch((err)=>{console.log(err)})
}
const blog_details = (req,res)=>{
    const id = req.params.id
    Blog.findById(id).then((result)=>{
        res.render('details',{blog:result,title:'Blog details'})
    }).catch(err=>res.render('404',{title:'404: Not Found'}))
}
const blog_create_get =(req,res)=>{
    res.render('./blogs/createblog',{title:'Create A Blog'})
}
const blog_create_post = (req,res)=>{
    const blog = new Blog({
        title: req.body.title,
        blogContent: req.body.content
    })
    blog.save().then((result)=>{
        //redirect to homepage
        res.redirect('/blogs')
    }).catch((err)=>console.log(err))
}
module.exports = {
    blog_index,
    blog_delete,
    blog_create_get,
    blog_create_post,
    blog_details
}