import express from 'express'
import { getAllBlogs, addBlog, updateBlog, getBlogByID, deleteBlog } from '../controllers/blog-controller';

const blogRouter = express.Router();
blogRouter.get('/', getAllBlogs);
blogRouter.post('/add', addBlog)
blogRouter.put('/update/:id', updateBlog)
blogRouter.delete('/:id',deleteBlog )
blogRouter.get('/:id', getBlogByID )


export default blogRouter;