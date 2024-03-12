import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { deleteCookie, setCookie } from "hono/cookie";
import { signInInput, signUpInput } from "cohort-medium-common";
export const authRouter=new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string,
    }
  }>();



authRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    // zod and hash remaining
    try{
      const {success}= signUpInput.safeParse(body);
      if (!success){
        throw new Error ("Invalid Input Formats")
      }
      const user = await prisma.user.create({
        data:{
          email:body.email,
          password:body.password,
          name :body.name,
        }
      })
      const token = await sign({id:user.id},c.env.JWT_SECRET);
     c.status(201)
     return c.json({
      success:true, 
      message:"User created Successfully",
      token:`Bearer_${token}`,
      name:user.name,
     }) 
    }
    catch(e:any){
      c.status(411)
      return c.json({
        success:false,
        message:"U  nable to create User at the moment",
        error :e.message
      })
    }
  })
  
  authRouter.post('/signin', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    // zod and hash remaining
    try{
      const{success}= signInInput.safeParse(body);
      if (!success){
        throw new Error ("Invalid Input formats")
      }
      const user = await prisma.user.findUnique({
        where:{
          email:body.email,
          password:body.password,  
        }
      })
      if (!user){
        throw new Error("User does not exist"); 
      }
      const token = await sign({id:user.id},c.env.JWT_SECRET)
     c.status(201)
     return c.json({
      success:true, 
      message:"User Logged in  Successfully",
      token:`Bearer_${token}`,
      name:user.name
     }) 
    }
    catch(e:any){
      c.status(411)
      return c.json({
        success:false,
        message:"Unable to login at the moment",
        error :e.message
      })
    }
  })
  authRouter.get("/logout",async ( c)=>{
    try{
        await deleteCookie(c, "authorization")
        c.status(200)
        return c.json({
            success:true, 
            message:"Logout Sucessfull"
        })

    }
    catch(e:any){
        c.status(500)
        return c.json({
            success:false,
            message: "Unable to logout at the moment ",
            error :e.message
        })
    }
  })