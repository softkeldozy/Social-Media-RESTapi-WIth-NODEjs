import User from "../model/user";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } 
  catch (error) {
    console.log(error);
  }

  if (!users){
    return res.status(404).json({message: 'No Users found'});
  }
  return res.status(200).json({users});
};

export const signup = async (req, res, next) => {
  const {name, email, password } = req.body;
  // checking for existing user
  let existingUser;
  try {
    existingUser = await User.findOne({email});
  } 
  catch (error) {
    return console.log(error);
  }
  if(existingUser){
    return res.status(400).json({ message: 'User already exists! Please Login' });
  }

  // if no existing user exists, create a new one
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password:hashedPassword,
    blogs:[], 
  });

  try {
      await user.save();
    } 
    catch (error) {
     return console.log(error);
    }
    return res.status(201).json({ user });
};

// Logging in 
export const login = async (req, res, next) => {
   const {email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({email});
  } 
  catch (error) {
    return console.log(error); 
  }
  // check if user already exists
  if(!existingUser){
    return res.status(404).json({nessage: 'Couldn\'t find user with existin email address'});
  }
  // checking passwords for correctness
  
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect){
    return res.status(400).json({message: 'Invalid password'});
  }
  return res.status(200).json({message: 'Login successful'});
};