import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { deleteCookie, setCookie } from "hono/cookie";
import { signInInput, signUpInput } from "cohort-medium-common";
export const authRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

authRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  // zod and hash remaining
  // console.log(body);
  try {
    const { success } = signUpInput.safeParse(body);
    if (!success) {
      throw new Error("Invalid Input Formats");
    }
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    c.status(201);
    return c.json({
      success: true,
      message: "User created Successfully",
      token: `Bearer_${token}`,
      name: user.name,
      id:user.id
    });
  } catch (e: any) {
    c.status(411);
    return c.json({
      success: false,
      message: "Unable to create User at the moment",
      error: e.message,
    });
  }
});

authRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  // zod and hash remaining
  console.log(body);
  try {
    const { success } = signInInput.safeParse(body);
    if (!success) {
      throw new Error("Invalid Input formats");
    }
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!user) {
      throw new Error("User does not exist");
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    c.status(201);
    return c.json({
      success: true,
      message: "User Logged in  Successfully",
      token: `Bearer_${token}`,
      name: user.name,
      id:user.id,
    });
  } catch (e: any) {
    console.log(e.message);
    c.status(411);
    return c.json({
      success: false,
      message: "Unable to login at the moment",
      error: e.message,
    });
  }
});
authRouter.get("/logout", async (c) => {
  try {
    await deleteCookie(c, "authorization");
    c.status(200);
    return c.json({
      success: true,
      message: "Logout Sucessfull",
    });
  } catch (e: any) {
    c.status(500);
    return c.json({
      success: false,
      message: "Unable to logout at the moment ",
      error: e.message,
    });
  }
});


// to verify existing user 
authRouter.post("/", async (c) => {
  try {
    const token = c.req.header("authorization");
    if (!token) {
      throw new Error("Unauthorized");
    }
    const key = token.split("_").splice(1).join("_");
    const resp = await verify(key, c.env?.JWT_SECRET);
    if (!resp) {
      throw new Error("Invalid token");
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const user = await prisma.user.findFirst({
      where:{
        id:resp.id
      },
      select:{
        name:true,
        id:true,
      }
    })
    if (!user){
      throw new Error("User not found")
    }
    c.status(200);
    return c.json({
      success:true, 
      user:user
    })

  } catch (e:any) {
    c.status(500);
    return c.json({
      success:false,
      error:e.message
    })
  }
});


authRouter.get("/:id", async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try{
    const id = await c.req.param('id')
    const user = await prisma.user.findFirst({
      where:{
        id:id
      },
      select:{
        id:true, 
        name:true,
        bio:true, 
        location:true,
        createdAt:true, 
        updatedAt:true, 
        favouritedPosts:{
          select:{
            title:true, 
            thumbnail:true
          }
        },
        posts:{
          select:{
            title:true,
            thumbnail:true
          },
          take:2,
          orderBy:{
            publishedDate:"desc"
          }
        }
      }
    })
    if (!user){
      throw new Error("User not found");
    }
    c.status(200);
    return c.json({
      success:true,
      user:user
    })
  }
  catch(e:any){
    c.status(404);
    return c.json({
      success:false,
      error:e.message
    })
  }
})



authRouter.patch("/:id", async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try{
    const data= await c.req.json();
    const id = await c.req.param('id')
    const updatedUser= await prisma.user.update({
      where:{
        id:id,
      }, 
      data:{
        bio:data.bio,
        location:data.location,
      }
    })
    c.status(200);
    return c.json({
      sucess:true,
      bio:updatedUser.bio,
      location:updatedUser.location
    })
  }
  catch(e:any){
    c.status(500);
    return c.json({
      success:false,
      error :e.message
    })

  }
})