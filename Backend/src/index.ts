import { Hono } from 'hono';

import { authRouter} from './routes/authRoute';
import { blogRouter } from './routes/blogRoute';
import { cors } from 'hono/cors';
import { fileRouter } from './routes/fileUpload';
// Create the main Hono app
const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string,
  }
}>();

app.use(cors());
app.route("/api/v1/auth", authRouter);
app.route("/api/v1/blog", blogRouter)
app.route("/api/v1/files", fileRouter)
app.notFound((c)=>{
  c.status(404);
  return c.json({
    success:false,
    message:"Invalid URL / Expired "
  })
})

export default app;