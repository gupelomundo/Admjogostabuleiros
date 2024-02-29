const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/list", async (req, res) => {
  const dbResult = await prisma.user.findMany({
    include: {
      games: true,
    },
  });

  if (!dbResult) {
    return res
      .status(400)
      .json({ message: "Users not found!", error: "Invalid data" });
  }

  return res.status(200).json({ data: dbResult });
});

router.post("/signin", async (req, res) => {
  const { email, password, birthday, name, authType, gender } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return res
      .status(400)
      .json({ message: "User not created!", error: "User already exists" });
  }

  const dbResult = await prisma.user.create({
    data: {
      email,
      password,
      birthday: new Date(birthday),
      name,
      authType,
      gender,
    },
  });

  console.log(dbResult);

  if (!dbResult) {
    return res
      .status(400)
      .json({ message: "User not created!", error: "Invalid data" });
  }

  return res
    .status(202)
    .json({ message: "User Created", data: { user: dbResult } });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = {
    email,
    password,
  };
  const dbResult = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!dbResult) {
    return res
      .status(401)
      .json({ message: "Login failed!", error: "User not found" });
  }

  if (dbResult.password !== user.password) {
    return res
      .status(401)
      .json({ message: "Login failed!", error: "Invalid password" });
  }
  return res
    .status(200)
    .json({ message: "Login successful!", data: { user: dbResult } });
});

router.put("/update", async (req, res) => {
  const { id, email, password, birthday, name, authType, gender } = req.body;
  const user = {
    email,
    password,
    birthday,
    gender,
    name,
    authType,
  };
  const dbResult = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      ...user,
      birthday: new Date(user.birthday),
    },
  });

  if (!dbResult) {
    return res
      .status(400)
      .json({ message: "User not updated!", error: "Invalid data" });
  }

  return res
    .status(202)
    .json({ message: "User Updated", data: { user: dbResult } });
});

router.delete("/delete", async (req, res) => {
  const { email, adminEmail } = req.body;
  const dbAdminResult = await prisma.user.findUnique({
    where: {
      email: adminEmail,
    },
  });

  if (!dbAdminResult) {
    return res.status(401).json({
      message: "User not deleted!",
      error: "You don`t have permission to delete a user",
    });
  }

  const dbResult = await prisma.user.delete({
    where: {
      email: email,
    },
  });

  if (!dbResult) {
    return res
      .status(400)
      .json({ message: "User not deleted!", error: "Invalid data" });
  }

  return res
    .status(202)
    .json({ message: "User Deleted", data: { user: dbResult } });
});

module.exports = router;
