const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/list", async (req, res) => {
  const dbResult = await prisma.order.findMany({
    include: {
      user: true,
      game: true,
    },
  });

  if (!dbResult) {
    return res
      .status(400)
      .json({ message: "Order not found!", error: "Invalid data" });
  }

  return res.status(200).json({ data: dbResult });
});

router.post("/create", async (req, res) => {
  const { userId, gameId, price, status } = req.body;

  if (!price || !userId || !gameId) {
    return res
      .status(400)
      .json({ message: "Invalid data", error: "Invalid data" });
  }

  const dbResult = await prisma.order.create({
    data: {
      price,
      status,
      user: {
        connect: {
          id: Number(userId),
        },
      },
      game: {
        connect: {
          id: Number(gameId),
        },
      },
    },
  });

  console.log(dbResult);

  return res.status(200).json({ data: dbResult });
});

module.exports = router;
