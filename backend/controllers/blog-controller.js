import mongoose from "mongoose";
import Blog from "../model/blog";
import User from "../model/user";


// get All Blog posts
export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } 
  catch (error) {
    return console.log(error);
  }

  if(!blogs){
    return res.status(404).json({message:'Could not find any Blogs'});
  }
  return res.status(200).json({blogs});
}
//Add blog 
export const addBlog = async (req, res, next) => {
  const {title, description, image, user} = req.body;
  let existingUser;
  try {
  existingUser = await User.findById(user);
  } 
  catch (error) {
  return console.log(error);
  }
  if(!existingUser){
    return res.status(404).json({message: 'No user found by this ID'});
  }
  const blog = new Blog({title, description, image, user});
  try {
    /**Here I'm definning a session to save the bog, then start the session, 
     * save the blog and the array and push
     * to the array of the user andd commiting the transaction.*/
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({session});
    existingUser.blogs.push(blog);
    await existingUser.save({session});
    await session.commitTransaction();
  } 
  catch (error) {  
    console.log(error);
    return res.status(500).json({message: error});
  } 
  return res.status(200).json({blog})
};
// Update blog
export const updateBlog = async (req, res, next) => {
  const {title, description} = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description
    })
  } 
  catch (error) {
    return console.log(error);
  }
  // Check if blog already exists for update
  if(!blog){
    return res.status(500).json({message: "Unable to update the blog"});
  }
  return res.status(200).json({blog});
};
// get blog by ID
export const getBlogByID = async (req, res) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if(!blog){
    return res.status(404).json({message: 'No blog found'});
  }
  return res.status(200).json({blog});
};
// delete blog
export const deleteBlog = async  (req, res)=>{
  const id = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id);
  } catch (error) {
    return console.log(error);
  }
  if(!blog) {
    return res.status(500).json({message: 'Unable to delete Blog'});
  }
  return res.status(200).json({message: 'Blog deleted successfully'});
}