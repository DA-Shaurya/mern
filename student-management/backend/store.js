const crypto = require("crypto");
const bcrypt = require("bcryptjs");

// Sample initial data matching PDF
const defaultStudents = [
  {
    _id: "6501a1b2c3d4e5f600100001",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    course: "MCA",
    age: 22,
    phone: "+91 98765 43210",
    gender: "Male",
    status: "Active",
    createdAt: new Date("2026-01-15T10:00:00Z"),
    updatedAt: new Date("2026-01-15T10:00:00Z"),
  },
  {
    _id: "6501a1b2c3d4e5f600100002",
    name: "Priya Patel",
    email: "priya.patel@gmail.com",
    course: "BCA",
    age: 20,
    phone: "+91 98765 43211",
    gender: "Female",
    status: "Active",
    createdAt: new Date("2026-02-10T11:30:00Z"),
    updatedAt: new Date("2026-02-10T11:30:00Z"),
  },
  {
    _id: "6501a1b2c3d4e5f600100003",
    name: "Amit Kumar",
    email: "amit.kumar@yahoo.com",
    course: "B.Tech",
    age: 21,
    phone: "+91 98765 43212",
    gender: "Male",
    status: "Active",
    createdAt: new Date("2026-02-18T09:15:00Z"),
    updatedAt: new Date("2026-02-18T09:15:00Z"),
  },
  {
    _id: "6501a1b2c3d4e5f600100004",
    name: "Sneha Reddy",
    email: "sneha.reddy@gmail.com",
    course: "MCA",
    age: 23,
    phone: "+91 98765 43213",
    gender: "Female",
    status: "Active",
    createdAt: new Date("2026-03-01T14:20:00Z"),
    updatedAt: new Date("2026-03-01T14:20:00Z"),
  },
  {
    _id: "6501a1b2c3d4e5f600100005",
    name: "Vikram Malhotra",
    email: "vikram.m@outlook.com",
    course: "M.Tech",
    age: 24,
    phone: "+91 98765 43214",
    gender: "Male",
    status: "Active",
    createdAt: new Date("2026-03-12T16:45:00Z"),
    updatedAt: new Date("2026-03-12T16:45:00Z"),
  },
  {
    _id: "6501a1b2c3d4e5f600100006",
    name: "Ananya Iyer",
    email: "ananya.i@gmail.com",
    course: "B.Tech",
    age: 21,
    phone: "+91 98765 43215",
    gender: "Female",
    status: "Active",
    createdAt: new Date("2026-04-05T12:00:00Z"),
    updatedAt: new Date("2026-04-05T12:00:00Z"),
  },
  {
    _id: "6501a1b2c3d4e5f600100007",
    name: "Rohan Verma",
    email: "rohan.v@gmail.com",
    course: "BCA",
    age: 19,
    phone: "+91 98765 43216",
    gender: "Male",
    status: "Active",
    createdAt: new Date("2026-04-20T08:30:00Z"),
    updatedAt: new Date("2026-04-20T08:30:00Z"),
  },
];

let inMemoryStudents = [...defaultStudents];

let inMemoryUsers = [
  {
    _id: "6501a1b2c3d4e5f600200001",
    name: "College Administrator",
    email: "admin@college.edu",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin",
    createdAt: new Date(),
    matchPassword: async function (enteredPassword) {
      return bcrypt.compare(enteredPassword, this.password);
    },
  },
  {
    _id: "6501a1b2c3d4e5f600200002",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    password: bcrypt.hashSync("student123", 10),
    role: "student",
    createdAt: new Date(),
    matchPassword: async function (enteredPassword) {
      return bcrypt.compare(enteredPassword, this.password);
    },
  },
];

// Helper to generate 24-character hex ID (like MongoDB ObjectId)
const generateId = () => crypto.randomBytes(12).toString("hex");

// Student Model In-Memory Handler
class MockStudentModel {
  constructor(data) {
    this._id = data._id || generateId();
    this.name = data.name;
    this.email = data.email;
    this.course = data.course;
    this.age = Number(data.age);
    this.phone = data.phone || "";
    this.gender = data.gender || "";
    this.status = data.status || "Active";
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  async save() {
    inMemoryStudents.unshift({ ...this });
    return this;
  }

  static find(query = {}) {
    let result = [...inMemoryStudents];

    if (query.course && query.course !== "All") {
      result = result.filter((s) => s.course.toLowerCase() === query.course.toLowerCase());
    }

    if (query.$or && Array.isArray(query.$or)) {
      const searchTerms = query.$or.map((o) => {
        const key = Object.keys(o)[0];
        return { key, val: o[key].$regex ? o[key].$regex.toLowerCase() : "" };
      });

      result = result.filter((s) => {
        return searchTerms.some((t) => {
          const fieldVal = String(s[t.key] || "").toLowerCase();
          return fieldVal.includes(t.val);
        });
      });
    }

    // Return query-like object supporting sort() and limit()
    return {
      sort: (sortObj) => {
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return {
          limit: (n) => result.slice(0, n),
          then: (resolve) => resolve(result),
          [Symbol.iterator]: () => result[Symbol.iterator](),
        };
      },
      then: (resolve) => resolve(result),
      [Symbol.iterator]: () => result[Symbol.iterator](),
    };
  }

  static async findById(id) {
    return inMemoryStudents.find((s) => String(s._id) === String(id)) || null;
  }

  static async findByIdAndUpdate(id, data, options = {}) {
    const idx = inMemoryStudents.findIndex((s) => String(s._id) === String(id));
    if (idx === -1) return null;

    inMemoryStudents[idx] = {
      ...inMemoryStudents[idx],
      ...data,
      age: data.age !== undefined ? Number(data.age) : inMemoryStudents[idx].age,
      updatedAt: new Date(),
    };
    return inMemoryStudents[idx];
  }

  static async findByIdAndDelete(id) {
    const idx = inMemoryStudents.findIndex((s) => String(s._id) === String(id));
    if (idx === -1) return null;
    const deleted = inMemoryStudents.splice(idx, 1);
    return deleted[0];
  }

  static async countDocuments() {
    return inMemoryStudents.length;
  }

  static async distinct(field) {
    const values = inMemoryStudents.map((s) => s[field]);
    return [...new Set(values)];
  }

  static async aggregate(pipeline) {
    // Basic aggregation support for count and average
    if (pipeline[0]?.$group?._id === "$course") {
      const counts = {};
      inMemoryStudents.forEach((s) => {
        counts[s.course] = (counts[s.course] || 0) + 1;
      });
      return Object.entries(counts).map(([course, count]) => ({ _id: course, count }));
    }
    if (pipeline[0]?.$group?.avgAge) {
      if (inMemoryStudents.length === 0) return [];
      const totalAge = inMemoryStudents.reduce((acc, s) => acc + (s.age || 0), 0);
      return [{ _id: null, avgAge: totalAge / inMemoryStudents.length }];
    }
    return [];
  }

  static async insertMany(docs) {
    for (const d of docs) {
      const s = new MockStudentModel(d);
      inMemoryStudents.push(s);
    }
    return inMemoryStudents;
  }
}

// User Model In-Memory Handler
class MockUserModel {
  constructor(data) {
    this._id = data._id || generateId();
    this.name = data.name;
    this.email = data.email;
    this.password = data.password.startsWith("$2a$")
      ? data.password
      : bcrypt.hashSync(data.password, 10);
    this.role = data.role || "student";
    this.createdAt = new Date();
  }

  async matchPassword(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
  }

  static async findOne(query) {
    const user = inMemoryUsers.find((u) => u.email.toLowerCase() === query.email.toLowerCase());
    if (!user) return null;
    return {
      ...user,
      matchPassword: user.matchPassword || (async (pw) => bcrypt.compare(pw, user.password)),
    };
  }

  static async create(data) {
    const newUser = new MockUserModel(data);
    inMemoryUsers.push(newUser);
    return newUser;
  }

  static findById(id) {
    const user = inMemoryUsers.find((u) => String(u._id) === String(id));
    return {
      select: (fields) => {
        if (!user) return null;
        const { password, ...rest } = user;
        return rest;
      },
      then: (resolve) => resolve(user),
    };
  }
}

module.exports = {
  MockStudentModel,
  MockUserModel,
  defaultStudents,
};
