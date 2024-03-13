import {Request, Response , Router} from "express"
import { createBlogInput } from "cohort-medium-common"
import Blog from "../models/blogSchema"
import User from "../models/userSchema"
const router = Router();
import { Authenticate } from "../authMiddleware";

router.get("/bulk", Authenticate, async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find({
            published: true,
        }).populate("authorId", "-password").sort({createdAt:-1});

        return res.status(200).json({
            success: true,
            message:"Blogs fetched Successfully",
            data: blogs,
        });
    } catch (error:any) {
        console.error("Error fetching published blogs:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch published blogs at the moment",
            error: error.message,
        });
    }
});
router.get("/:id",Authenticate, async (req: Request, res: Response) => {
    try {
        const id = req.params.id; 
        const blog = await Blog.findById({
            _id: id,
        }).populate("authorId", "-password");

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Blog fetched successfully",
            data: blog,
        });

    } catch (error:any) {
        console.error("Error fetching blog by ID:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch blog at the moment",
            error: error.message,
        });
    }
});

router.post("/publish", Authenticate, async (req: Request, res: Response) => {
    try {
        const { success} = createBlogInput.safeParse(req.body);

        if (!success) {
            throw new Error("Invalid Data type");
        }

        const response = await Blog.create(req.body);

        if (!response) {
            throw new Error("Error in publishing blog");
        }

        return res.status(200).json({
            success: true,
            message: "Blog Published Successfully",
        });
    } catch (error:any) {
        console.error("Error in creating blog:", error);
        return res.status(500).json({
            success: false,
            message: "Error in creating blog",
            error: error.message,
        });
    }
});




export default router;
