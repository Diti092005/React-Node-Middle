const User = require("../models/User")

const addUser = async (req, res) => {
    const { fullname, username, email,phone,address } = req.body
    if (!fullname || !username)
        return res.status(400).send("Missing required fields")
    const existUser = await User.findOne({username}).lean()
    if (existUser)
        return res.status(400).send("user exists")
    const user = await User.create({fullname,username,email,phone,address})
    res.json(user)
}

const getAllUsers = async (req, res) => {
    const users = await User.find().lean()
    res.json(users)
}

const getUserById = async (req, res) => {
    const { id } = req.params
    if (!id)
        return res.status(400).send("Id is required")
    const users = await User.find().lean()
    if (!users?.length)
        return res.status(400).send("No users exists")
    const user = await User.findById(id).lean()
    if (!user)
        return res.status(400).send("user is not exists")
    res.json(user)
}

const updateUser = async (req, res) => {
   
    const { fullname, id, address, email, phone,username } = req.body
    if (!id)
        return res.status(400).send("Id is required")
    
    const user = await User.findById(id).exec()
    if (!user)
        return res.status(400).send("user is not exists")
    if (fullname)
        user.fullname = fullname
    if (username)
        user.username = username
    if (phone)
        user.phone = phone
    if (address)
        user.address = address
    if (email)
        user.email = email
    const upuser=await user.save()
    res.json(upuser)
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    if (!id)
        return res.status(400).send("Id is required")
    const user = await User.findById(id).exec()
    if (!user)
        return res.status(400).send("user is not exists")
    const result = await user.deleteOne()
    res.send(result)
}
module.exports = { getUserById, getAllUsers, addUser, deleteUser, updateUser }