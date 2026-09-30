require("dotenv").config();
const http = require("http");

console.log("==================================================");
console.log("       COLLEGEDB - DATABASE INSPECTOR             ");
console.log("==================================================");

// Fetch data directly from the active backend API
const req = http.get("http://localhost:5000/students", (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    try {
      const students = JSON.parse(data);
      console.log(`\n📊 Database: collegeDB`);
      console.log(`📁 Collection: students`);
      console.log(`📈 Total Documents: ${students.length}\n`);

      console.table(
        students.map((s, idx) => ({
          "#": idx + 1,
          _id: s._id,
          Name: s.name,
          Email: s.email,
          Course: s.course,
          Age: s.age,
          Status: s.status || "Active",
        }))
      );

      console.log("\n💡 First Document (JSON representation matching PDF Page 6):");
      if (students.length > 0) {
        console.log(JSON.stringify(students[0], null, 2));
      }
    } catch (err) {
      console.error("Error parsing response:", err.message);
    }
  });
});

req.on("error", (err) => {
  console.error("❌ Could not connect to backend server. Make sure it is running on port 5000.");
  console.error("Run 'npm start' or 'npm run dev' first.");
});
