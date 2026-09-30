const mongoose = require("mongoose");
const Student = require("./models/Student");
const User = require("./models/User");

const initialStudents = [
  {
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    course: "MCA",
    age: 22,
    phone: "+91 98765 43210",
    gender: "Male",
    status: "Active",
  },
  {
    name: "Priya Patel",
    email: "priya.patel@gmail.com",
    course: "BCA",
    age: 20,
    phone: "+91 98765 43211",
    gender: "Female",
    status: "Active",
  },
  {
    name: "Amit Kumar",
    email: "amit.kumar@yahoo.com",
    course: "B.Tech",
    age: 21,
    phone: "+91 98765 43212",
    gender: "Male",
    status: "Active",
  },
  {
    name: "Sneha Reddy",
    email: "sneha.reddy@gmail.com",
    course: "MCA",
    age: 23,
    phone: "+91 98765 43213",
    gender: "Female",
    status: "Active",
  },
  {
    name: "Vikram Malhotra",
    email: "vikram.m@outlook.com",
    course: "M.Tech",
    age: 24,
    phone: "+91 98765 43214",
    gender: "Male",
    status: "Active",
  },
  {
    name: "Ananya Iyer",
    email: "ananya.i@gmail.com",
    course: "B.Tech",
    age: 21,
    phone: "+91 98765 43215",
    gender: "Female",
    status: "Active",
  },
  {
    name: "Rohan Verma",
    email: "rohan.v@gmail.com",
    course: "BCA",
    age: 19,
    phone: "+91 98765 43216",
    gender: "Male",
    status: "Active",
  },
];

async function seedData() {
  try {
    const studentCount = await Student.countDocuments();
    if (studentCount === 0) {
      await Student.insertMany(initialStudents);
      console.log(`✅ Seeded ${initialStudents.length} sample students (including Rahul Sharma).`);
    }

    const adminUser = await User.findOne({ email: "admin@college.edu" });
    if (!adminUser) {
      await User.create({
        name: "College Administrator",
        email: "admin@college.edu",
        password: "admin123",
        role: "admin",
      });
      console.log("✅ Seeded default Admin user (admin@college.edu / admin123).");
    }

    const demoStudent = await User.findOne({ email: "rahul@gmail.com" });
    if (!demoStudent) {
      await User.create({
        name: "Rahul Sharma",
        email: "rahul@gmail.com",
        password: "student123",
        role: "student",
      });
      console.log("✅ Seeded default Student user (rahul@gmail.com / student123).");
    }
  } catch (err) {
    console.error("Error seeding database:", err.message);
  }
}

module.exports = { seedData, initialStudents };
