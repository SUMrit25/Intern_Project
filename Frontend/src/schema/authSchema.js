import {z} from "zod"

export const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1,"Password can not be empty")
})

export const registerSchema = z.object({
    name: z.string().min(1,"Name is required"),
    email: z.string().email("enter valid email"),
    password: z.string().min(1,"Password can not be empty")
})