const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const path = require("path");

// Load .env from the backend/ folder regardless of where the script is run from
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const User = require("../models/User");
const Course = require("../models/Course");

const courses = [
  {
    title: "Full Stack Web Development Bootcamp",
    description:
      "Master HTML, CSS, JavaScript, React, Node.js and MongoDB. Build real-world projects from scratch and become a job-ready full stack developer.",
    price: 49999,
    duration: "12 weeks",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800",
  },
  {
    title: "Cybersecurity Fundamentals",
    description:
      "Learn ethical hacking, penetration testing, network security, and cyber threat analysis. Prepare for CompTIA Security+ certification.",
    price: 39999,
    duration: "8 weeks",
    category: "Cybersecurity",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800",
  },
  {
    title: "Computer Networking & CCNA Prep",
    description:
      "Understand TCP/IP, routing, switching, VLANs, and wireless networking. Includes hands-on labs and CCNA exam preparation.",
    price: 34999,
    duration: "10 weeks",
    category: "Networking",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
  },
  {
    title: "Data Science with Python",
    description:
      "Explore data analysis, visualization, machine learning, and AI using Python, Pandas, NumPy, and Scikit-learn.",
    price: 44999,
    duration: "10 weeks",
    category: "Data Science",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
  },
  {
    title: "Digital Marketing Masterclass",
    description:
      "Learn SEO, social media marketing, Google Ads, email marketing, and content strategy. Grow businesses online effectively.",
    price: 24999,
    duration: "6 weeks",
    category: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  },
  {
    title: "AWS Cloud Practitioner Essentials",
    description:
      "Get started with Amazon Web Services. Covers EC2, S3, RDS, Lambda, IAM, and cloud architecture best practices.",
    price: 42999,
    duration: "8 weeks",
    category: "Cloud Computing",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800",
  },
  {
    title: "UI/UX Design with Figma",
    description:
      "Learn user interface and experience design principles. Master Figma to create wireframes, prototypes and design systems.",
    price: 29999,
    duration: "7 weeks",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
  },
  {
    title: "ERP & Business Process Automation",
    description:
      "Understand enterprise resource planning systems, business workflows, and how to automate operations using modern ERP tools.",
    price: 54999,
    duration: "9 weeks",
    category: "ERP & Business",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
  },
  {
    title: "Advanced React & Next.js Development",
    description:
      "Deep dive into React hooks, context API, server-side rendering with Next.js, TypeScript, and deploying to production.",
    price: 39999,
    duration: "8 weeks",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
  },
  {
    title: "Network Security & Ethical Hacking",
    description:
      "Advanced cybersecurity course covering vulnerability assessment, exploit development, firewall configuration and incident response.",
    price: 59999,
    duration: "12 weeks",
    category: "Cybersecurity",
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    console.log("🗑️  Cleared existing users and courses");

    // Create admin user (password will be hashed by pre-save hook)
    const admin = await User.create({
      username: "Admin Speedlink",
      email: "admin@speedlink.com",
      password: "Admin@1234",
      role: "admin",
    });

    // Create sample student
    const student = await User.create({
      username: "John Student",
      email: "student@speedlink.com",
      password: "Student@1234",
      role: "student",
    });

    // Seed courses
    const seededCourses = await Course.insertMany(courses);

    console.log(`✅ Seeded ${seededCourses.length} courses`);
    console.log("\n🔐 Sample Credentials:");
    console.log("─────────────────────────────────");
    console.log("Admin:");
    console.log("  Email:    admin@speedlink.com");
    console.log("  Password: Admin@1234");
    console.log("\nStudent:");
    console.log("  Email:    student@speedlink.com");
    console.log("  Password: Student@1234");
    console.log("─────────────────────────────────\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDB();
