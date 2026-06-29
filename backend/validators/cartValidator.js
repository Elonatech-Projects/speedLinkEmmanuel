const { z } = require("zod");

const addToCartSchema = z.object({
  courseId: z
    .string({ required_error: "Course ID is required" })
    .regex(/^[a-fA-F0-9]{24}$/, "Invalid course ID format"),
});

const enrollSchema = z.object({
  courseId: z
    .string({ required_error: "Course ID is required" })
    .regex(/^[a-fA-F0-9]{24}$/, "Invalid course ID format"),
});

module.exports = { addToCartSchema, enrollSchema };
