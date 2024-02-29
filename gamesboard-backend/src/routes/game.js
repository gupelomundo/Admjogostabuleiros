const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/list", async (req, res) => {
  const dbResult = await prisma.gameBoard.findMany();

  if (!dbResult) {
    return res
      .status(400)
      .json({ message: "Games not found!", error: "Invalid data" });
  }

  return res.status(200).json({ data: dbResult });
});

router.get("/list/:id", async (req, res) => {
  const { id } = req.params;
  const dbResult = await prisma.gameBoard.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!dbResult) {
    return res
      .status(400)
      .json({ message: "Game not found!", error: "Invalid data" });
  }

  return res.status(200).json({ data: dbResult });
});

router.get("/list-categories", async (req, res) => {
  const dbResult = await prisma.gameBoard.findMany({
    distinct: ["category"],
    select: {
      category: true,
    },
  });

  if (!dbResult) {
    return res
      .status(400)
      .json({ message: "Categorys not found!", error: "Invalid data" });
  }

  return res.status(200).json({ data: dbResult });
});

router.post("/create", async (req, res) => {
  const { name, description = "", price, authorEmail, available } = req.body;

  if (!name || !price) {
    return res
      .status(400)
      .json({ message: "Invalid data", error: "Invalid data" });
  }

  const dbResult = await prisma.gameBoard.create({
    data: {
      name,
      description,
      price,
      available,
      owner: {
        connect: {
          email: authorEmail,
        },
      },
    },
  });

  if (!dbResult) {
    return res
      .status(400)
      .json({ message: "Game not created!", error: "Invalid data" });
  }

  return res
    .status(201)
    .json({ message: "Game Created", data: { game: dbResult } });
});

router.put("/update", async (req, res) => {
  const { id, name, description, price, available } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Invalid data", error: "Invalid data" });
  }

  const dbResult = await prisma.gameBoard.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      price,
      available,
    },
  });

  if (!dbResult) {
    return res
      .status(400)
      .json({ message: "Game not updated!", error: "Invalid data" });
  }

  return res
    .status(202)
    .json({ message: "Game Updated", data: { game: dbResult } });
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  const dbResult = await prisma.gameBoard.delete({
    where: {
      id,
    },
  });

  if (!dbResult) {
    return res
      .status(400)
      .json({ message: "Game not deleted!", error: "Invalid data" });
  }

  return res
    .status(202)
    .json({ message: "Game Deleted", data: { game: dbResult } });
});

module.exports = router;
