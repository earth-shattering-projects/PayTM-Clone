const { Router } = require("express");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleWare } = require("../middleware");

const router = Router();

const doesUsernameExist = async (username) => {
  const existingUser = await User.findOne({ username });
  return existingUser;
};

const doesUserExist = async (username, password) => {
  const existingUser = await User.findOne({ username, password });
  return existingUser;
};

router.post("/signup", async (req, res) => {
  const UserSchema = z.object({
    username: z
      .string()
      .min(3)
      .max(30)
      .trim()
      .toLowerCase()
      .refine((value) => value.length > 0, { message: "Username is required" }),
    password: z
      .string()
      .min(6)
      .refine((value) => value.length > 0, { message: "Password is required" }),
    firstName: z
      .string()
      .max(50)
      .trim()
      .refine((value) => value.length > 0, {
        message: "First name is required",
      }),
    lastName: z
      .string()
      .max(50)
      .trim()
      .refine((value) => value.length > 0, {
        message: "Last name is required",
      }),
  });

  const { success, data } = UserSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({ message: "Incorrect inputs" });
  }

  const existingUser = await doesUsernameExist(data.username);

  if (existingUser) {
    return res.status(411).json({ message: "Username already taken" });
  }
  const newUser = await User.create(data);
  const userId = newUser._id;
  const token = jwt.sign({ userId }, JWT_SECRET);
  return res.json({ token, message: "User created successfully" });
});

router.post("/signin", async (req, res) => {
  const UserSchema = z.object({
    username: z
      .string()
      .min(3)
      .max(30)
      .trim()
      .toLowerCase()
      .refine((value) => value.length > 0, { message: "Username is required" }),
    password: z
      .string()
      .min(6)
      .refine((value) => value.length > 0, { message: "Password is required" }),
  });

  const { success, data } = UserSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({ message: "Incorrect inputs" });
  }

  const existingUser = await doesUserExist(data.username, data.password);
  if (existingUser) {
    return res.json({
      token: jwt.sign({ userId: existingUser._id }, JWT_SECRET),
    });
  }
  return res.status(411).json({ message: "Error while logging in" });
});

router.put("/", authMiddleWare, async (req, res) => {
  const UserSchema = z.object({
    password: z.string().min(6).optional(),
    firstName: z.string().max(50).trim().optional(),
    lastName: z.string().max(50).trim().optional(),
  });

  const { success, data } = UserSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({ message: "Invalid inputs" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.userId, data, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(411).json({ message: "User not found" });
    }

    return res.json({ message: "Updated successfully" });
  } catch (error) {
    return res
      .status(411)
      .json({ message: "Error while updating information" });
  }
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  try {
    const users = await User.find({
      $or: [
        { firstName: { $regex: filter, $options: "i" } }, // Case-insensitive match for firstName
        { lastName: { $regex: filter, $options: "i" } }, // Case-insensitive match for lastName
      ],
    });

    return res.json({
      users: users.map((user) => {
        const { _id, firstName, lastName } = user;
        return { _id, firstName, lastName };
      }),
    });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

module.exports = router;
