import express from 'express'
import { getAllBlogs, addBlog, updateBlog } from '../controllers/blog-controller';

const blogRouter = express.Router();
blogRouter.get('/', getAllBlogs);
blogRouter.post('/add', addBlog)
blogRouter.put('/update/:id', updateBlog)
// blogRouter.delete('/delete', )


export default blogRouter;