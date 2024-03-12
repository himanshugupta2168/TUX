import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'; 
import { authRouter} from './routes/authRoute';
import { blogRouter } from './routes/blogRoute';
import { cors } from 'hono/cors';
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

app.notFound((c)=>{
  c.status(404);
  return c.json({
    success:false,
    message:"Invalid URL / Expired "
  })
})

export default app;