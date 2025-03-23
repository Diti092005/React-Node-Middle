const Post = require("../models/Post")
const addPost = async (req, res) => {
    const {title,body}=req.body
    if(!title)
        return res.status(400).send("Title is required")
    const post = await Post.create({ title, body })
    res.json(post)
}

const getAllPosts = async (req, res) => {
    const posts=await Post.find().lean()
    res.json(posts)
}
const getPostById = async (req, res) => {
    const {id} =req.params
    const posts=await Post.find().lean()
    if(!posts)
        return res.status(400).send("No posts exists")
    if(!id)
        return res.status(400).send("Id is required")
    const post=await Post.findById(id).lean()
    if(!post)
        return res.status(400).send("This post isn't exists")
    res.json(post)
}
const updatePost = async (req, res) => {
    const {id,title,body} =req.body
    if(!id)
        return res.status(400).send("Id is required")
    const post=await Post.findById(id).exec()
    if(!post)
        return res.status(400).send("This post isn't exists")
    if(title)
        post.title = title
    if(body)
        post.body = body
    const upPost=await post.save()
    res.json(upPost)
}

const deletePost= async (req, res) => {
    const {id} =req.params
    if(!id)
        return res.status(400).send("Id is required")
    const post=await Post.findById(id).exec()
    if(!post)
        return res.status(400).send("This post isn't exists")
    const result = await post.deleteOne()
    res.json(result)
}
module.exports={addPost,getAllPosts,getPostById,updatePost,deletePost}