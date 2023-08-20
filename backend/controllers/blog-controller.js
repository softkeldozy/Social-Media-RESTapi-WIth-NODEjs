import Blog from "../model/blog";
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
  const blog = new Blog({title, description, image, user});
  try {
    await blog.save();
  } 
  catch (error) {
    return console.log(error);
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