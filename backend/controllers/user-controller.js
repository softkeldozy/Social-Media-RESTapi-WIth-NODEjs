import User from "../model/user";

export const getAllUser = async (req, res, next)=>{
  let users;
  try {
    users = await User.find();
  } 
  catch (error) {
    console.log(error);
  }

  if (!users){
    return res.status(404).json({message: 'No users found'});
  }
  return res.status(200).json({User});
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
  const user = new User({
    name,
    email,
    password
  });

  try {
      await user.save();
    } 
    catch (error) {
     return console.log(error);
    }
    return res.status(201).json({ user });
};