import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput, updateBlogInput } from "cohort-medium-common";
export const blogRouter= new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string,
      authorization:string
    }
    , Variables:{
        authorId:string,
        authorization:string,
    }
  }>();
blogRouter.use("*", async(c , next)=>{
    try{
        // const token = await getCookie(c, "authorization")
        const token=c.req.header('authorization');
        // console.log(token);
        if (!token){
            throw new Error("Unauthorized");
        }
        const key= token.split("_").splice(1).join("_");
        const resp = await verify(key, c.env?.JWT_SECRET);
        if (!resp){
            throw new Error("Invalid token")
        }
        const prisma = new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        const user = await prisma.user.findFirst({
            where:{
                id:resp.id,
            }
        })
        if (!user){
            throw new Error("User not found")
        }
        c.set('authorId', user.id)
        await next();
    }
    catch(e:any){
        c.status(511)
        return c.json({
            message:e.message
        })
    }
})

blogRouter.get("/bulk", async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      try{  
        const blogs = await prisma.post.findMany({
            where:
            {
                published:true
            },
            select:{
                title:true,
                content:true,
                publishedDate:true,
                id:true,
                author:{
                    select:{
                        name:true,
                    }
                }
            },
            orderBy:{
                publishedDate:"desc"
            }
        });
        c.status(200)
        return c.json({
            success:true, 
            message :"Data fetched Successfully",
            data:blogs,
        })
      }
      catch(e:any){
        c.status(500)
        return c.json({
            success:false, 
            message:"Unable to fetch the data",
            error :e.message
        })
      }    
})

blogRouter.get("/:id", async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      try{
        const id = await c.req.param('id');
        const blog = await prisma.post.findFirst({
            where:{
                id :id,
            },
            select:{
                title:true,
                content:true,
                publishedDate:true,
                id:true,
                author:{
                    select:{
                        name:true,
                    }
                }
            }
        });
        console.log(c.var.authorId);
        c.status(200)
        return c.json({
            success:true, 
            message :"Blog fetched successfully",
            data:blog,
        })
      }
      catch(e:any){
        c.status(500)
        return c.json({
            success:false,
            message:"Error encountered while fetching data",
            error : e.message
        })
      }
})

blogRouter.put("/", async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      try{
        const body = await c.req.json();
        const userid = c.var.authorId;
        const {success}= updateBlogInput.safeParse(body);
        if (!success){
            throw new Error("Invalid Data type")
        }
        const resp =await prisma.post.update({
            where:{
                id:body.id,
                authorId:userid
            },
            data:{
                title: body.title,
                content:body.content,
                published:body.published,
            }
        })
        c.status(201)
        return c.json({
            success:true, 
            message:"Blog Updated Successfully",
        })
      }
      catch(e:any){
        c.status(500)
        return c.json({
            success:false, 
            message:"Error in updating the blog", 
            error:e.message
        })
      }
})

blogRouter.post("/publish", async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      try{
        const body = await c.req.json();
        console.log(body);
        const success= true;
        // const {success}= createBlogInput.safeParse(body);
        if (!success){
            throw new Error("Invlaid Data  type ")
        }
        const response = await prisma.post.create({
            data:{
                title:body.title, 
                content:body.content,
                published:body.published,
                authorId:c.var.authorId,
            }
        })
        c.status(201)
        return c.json({
            success:true,
            message:"Blog  created successfully",
        })
      }
      catch(e:any){
        console.log(e.message);
        c.status(500)
        return c.json({
            success:false,
            message:"Error in creating the blog",
            error :e.message,
        })
      }
})