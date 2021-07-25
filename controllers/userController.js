const asyncHandler = require('express-async-handler')
const User = require('../models/userModel.js')
const generateToken = require('../utils/generateToken')
const sendEmail = require('../utils/sendEmail.js')
const sendWhatsApp = require('../utils/sendWhatsApp.js')
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      address: user.address,
      phone: user.phone,
      birthday: user.birthday,
      image: user.image,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

const registerUser = asyncHandler(async (req, res) => {
  const { name, lastname, email, address, phone, birthday, image, password, confirmPassword } = req.body
  console.log("new user" + JSON.stringify(req.body))
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  if (password !== confirmPassword) {
    res.status(400)
    throw new Error('Passwords do not match.')
  }



  const user = await User.create({
    name,
    lastname,
    email,
    address,
    phone,
    birthday,
    image,
    password,
    confirmPassword,
  })

  if (user) {

    emailSubject = 'Nuevo Registro'
    emailHTML = '<h2>Se ha registrado un nuevo usaurio</h1>  <br/> <h4>Nombre: '
      + user.name + '</h4><h4>Apellido: '
      + user.lastname + '</h4><h4>Email: '
      + user.email + '</h4><h4>Numero de Teléfono: '
      + user.phone + '</h4><h4>Dirección: '
      + user.address + '</h4><h4>Fecha Nacimiento: '
      + user.birthday

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_ADMINISTRADOR,
      subject: emailSubject,
      html: emailHTML
    };

    sendEmail(mailOptions)


    sendWhatsApp(emailSubject)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      address: user.address,
      phone: user.phone,
      birthday: user.birthday,
      image: user.image,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      address: user.address,
      phone: user.phone,
      birthday: user.birthday,
      image: user.image,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.lastname = req.body.lastname || user.lastname
    user.email = req.body.email || user.email
    user.address = req.body.address || user.address
    user.phone = req.body.phone || user.phone
    user.birthday = req.body.birthday || user.birthday
    user.image = req.body.image || user.image
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      address: updatedUser.address,
      phone: updatedUser.phone,
      birthday: updatedUser.birthday,
      image: updatedUser.image,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.lastname = req.body.lastname || user.lastname
    user.email = req.body.email || user.email
    user.address = req.body.address || user.address
    user.phone = req.body.phone || user.phone
    user.birthday = req.body.birthday || user.birthday
    user.image = req.body.image || user.image

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      address: updatedUser.address,
      phone: updatedUser.phone,
      birthday: updatedUser.birthday,
      image: updatedUser.image,

      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

module.exports = {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
