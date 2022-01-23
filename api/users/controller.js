const fs = require('fs');
const path = require('path')
const { sendResponse, errReturned } = require('../../utils/dto');
const { SUCCESS } = require('../../utils/ResponseCodes');
const User = require('./models');


/**
 * 
Create User Records
 */
exports.createUserRecords = async (req, res) => {

    try { 
     
     let dirname_ =  path.dirname(__dirname)
     let file_path = dirname_+'/userRecords/user.json'

     let  userData = fs.readFileSync(file_path, 'utf8')
    
     userData = JSON.parse(userData)
     let userCount = userData.users

     
     for(let i=0; i < userCount.length; i++){

       let { userId, firstName, lastName, phoneNumber, emailAddress } = userCount[i]
       let filterUser = await User.findOne({emailAddress})

       if(filterUser) return sendResponse(res, SUCCESS, 'User already Exist')

       let user = new User({
        userId, 
        firstName, 
        lastName, 
        phoneNumber, 
        emailAddress
       })

       let newUser = await user.save()
     }

     return sendResponse(res, SUCCESS, 'User Records Generated')
    } catch (error) {
        return errReturned(res, error)
    }
}

/**
 * 
Create New user
 */
exports.newUser = async (req, res) => {

  try { 
   

     let { userId, firstName, lastName, phoneNumber, emailAddress } = req.body

     let filterUser = await User.findOne({emailAddress})

     if(filterUser) return sendResponse(res, SUCCESS, 'User already Exist')

     let user = new User({
      userId, 
      firstName, 
      lastName, 
      phoneNumber, 
      emailAddress
     })

     let newUser = await user.save()
   

   return sendResponse(res, SUCCESS, 'User','Create User Successfully')
  } catch (error) {
      return errReturned(res, error)
  }
}

/**
 * 
User List
 */
exports.userList = async (req, res)=>{
  try {
    let users = await User.find()
    if (users === undefined || users.length == 0) {
      return sendResponse(res, SUCCESS, 'Not Found', 'No Records Found')
  }

  return sendResponse(res, SUCCESS, 'User list', users)

  } catch (error) {
    return errReturned(res, error)
  }
}

/**
 * 
User Detail via user email
 */
exports.userDetail = async (req, res)=>{
  try {

    let emailAddress = req.params.email
    let user = await User.findOne({emailAddress})

    if (!user) {
      return sendResponse(res, SUCCESS, 'Not Found', 'User Not Found')
  }

  return sendResponse(res, SUCCESS, 'User Detail', user)

  } catch (error) {
    return errReturned(res, error)
  }
}

/**
 * 
User Update via User email ( you can only update fisrtName, lastname and phone number)
 */
exports.userUpdate = async (req, res)=>{
  try {

    let { firstName, lastName, phoneNumber, emailAddress } = req.body
    let user = await User.findOne({emailAddress})

    if (!user) {
      return sendResponse(res, SUCCESS, 'Not Found', 'User Not Found')
  }

  let status = await User.updateOne({ emailAddress }, { firstName, lastName, phoneNumber }).exec();
  

  return sendResponse(res, SUCCESS, 'Updated', 'User Detail Updated Successfully')

  } catch (error) {
    return errReturned(res, error)
  }
}

/**
 * 
Sorted user via User ID
 */
exports.userSort = async (req, res)=>{
  try {

    let users = await User.aggregate([{ $sort : { userId : 1 }}])

    if (!users) {
      return sendResponse(res, SUCCESS, 'Not Found', 'User Not Found')
  }

  return sendResponse(res, SUCCESS, 'Users', users)

  } catch (error) {
    return errReturned(res, error)
  }
}

/**
 * 
Delete User Via Email
 */
exports.userRemove = async (req, res)=>{
  try {

    let emailAddress = req.params.email
    let user = await User.findOne({emailAddress})

    if (!user) {
      return sendResponse(res, SUCCESS, 'Not Found', 'User Not Found')
  }

  let status = await User.remove({ emailAddress }).exec();

  return sendResponse(res, SUCCESS, 'delete', 'User delete successfully')

  } catch (error) {
    return errReturned(res, error)
  }
}