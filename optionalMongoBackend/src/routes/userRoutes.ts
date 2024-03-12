import express, { Request, Response, Router } from "express";
import { signInInput } from "cohort-medium-common";
import bcrypt from "bcrypt";
import User from "../models/userSchema";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
    try {
        const { success} = signInInput.safeParse(req.body);

        if (!success) {
            return res.status(400).json({ success: false, message: "Invalid Input formats" });
        }

        const salts = await bcrypt.genSalt(parseInt(process.env.SALTS as string, 10));
        const hash = await bcrypt.hash(req.body.password, salts);

        const user = await User.create({
            email: req.body.email,
            password: hash,
            name:  req.body.name,
        });

        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET as string);

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            token: `Bearer_${token}`,
        });
    } catch (error:any) {
        console.error("Error during signup:", error);
        return res.status(500).json({ success: false, message: "Unable to create user at the moment", error: error.message });
    }
});

router.post("/signin", async (req: Request, res: Response) => {
    try {
        const { success } = signInInput.safeParse(req.body);

        if (!success) {
            return res.status(400).json({ success: false, message: "Invalid input formats" });
        }

        const user = await User.findOne({
            email:  req.body.email,
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const comparedPasswords = await bcrypt.compare( req.body.password, user.password);

        if (!comparedPasswords) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET as string);

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: `Bearer_${token}`,
        });
    } catch (error:any) {
        console.error("Error during signin:", error);
        return res.status(500).json({ success: false, message: "Unable to sign in user at the moment", error: error.message });
    }
});

router.get("/", (req: Request, res: Response) => {
    return res.send("Hello");
});

export default router;
