const { z } = require("zod");

const courseSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, "Title must be at least 3 characters")
    .trim(),
  description: z
    .string({ required_error: "Description is required" })
    .min(10, "Description must be at least 10 characters"),
  price: z
    .number({ required_error: "Price is required" })
    .min(0, "Price cannot be negative"),
  duration: z
    .string({ required_error: "Duration is required" })
    .min(1, "Duration is required"),
  category: z.enum(
    [
      "Web Development",
      "Cybersecurity",
      "Networking",
      "Data Science",
      "Digital Marketing",
      "Cloud Computing",
      "UI/UX Design",
      "ERP & Business",
    ],
    { required_error: "Category is required" }
  ),
  image: z
    .string({ required_error: "Thumbnail URL is required" })
    .url("Image must be a valid URL"),
});

const updateCourseSchema = courseSchema.partial();

module.exports = { courseSchema, updateCourseSchema };
