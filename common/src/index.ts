import z from "zod"
export const signUpInput= z.object({
    email:z.string().email(),
    password:z.string().min(8),
    name:z.string().optional(),
});
export type signUpInputType = z.infer<typeof signUpInput>;

export const signInInput= z.object({
    email:z.string().email(),
    password:z.string().min(8),
});
export type signInInputType = z.infer<typeof signInInput>;


export const createBlogInput= z.object({
    title:z.string(),
    content:z.string(),
    published:z.boolean().optional(),
    authorId:z.string().optional(),
})

export type createBlogInputType= z.infer<typeof createBlogInput>


export const updateBlogInput= z.object({
    authorId:z.string().optional(),
    id:z.string(),
    title:z.string(),
    content:z.string(),
    published:z.boolean().optional(),
})
export type updateBlogInputType = z.infer<typeof updateBlogInput>;