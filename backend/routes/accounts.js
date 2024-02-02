const { Router } = require("express");
const { authMiddleWare } = require("../middleware");
const { Account } = require("../db");
const { z } = require("zod");
const { default: mongoose } = require("mongoose");

const router = Router();

const transferFunds = async (fromAccountId, toAccountId, amount, session) => {
  // Decrement the balance of the fromAccount
  await Account.findByIdAndUpdate(fromAccountId, {
    $inc: { balance: -amount },
  }).session(session);

  // Increment the balance of the toAccount
  await Account.findByIdAndUpdate(toAccountId, {
    $inc: { balance: amount },
  }).session(session);
};

router.get("/balance", authMiddleWare, async (req, res, next) => {
  const account = await Account.findOne({ userId: req.userId });
  return res.json({ balance: account.balance });
});

router.post("/transfer", authMiddleWare, async (req, res, next) => {
  const transferBody = z.object({
    to: z.string(),
    amount: z.number(),
  });
  const { success, data } = transferBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: "Invalid request" });
  }
  console.log(success, data);
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const fromAccount = await Account.findOne({ userId: req.userId }).session(
      session
    );
    if (!fromAccount) {
      await session.abortTransaction();
      await session.endSession();
      return res.status(400).json({ message: "Invalid source account" });
    }
    console.log("from", fromAccount);

    if (fromAccount.balance < data.amount) {
      await session.abortTransaction();
      await session.endSession();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const toAccount = await Account.findOne({ userId: data.to }).session(
      session
    );
    if (!toAccount) {
      await session.abortTransaction();
      await session.endSession();
      return res.status(400).json({ message: "Invalid target account" });
    }
    console.log("to", toAccount);
    await transferFunds(fromAccount._id, toAccount._id, data.amount, session);
    await session.commitTransaction();
    await session.endSession();
    return res.json({ message: "Transfer successful" });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    return res.status(400).json({ message: "Invalid source / target account" });
  }
});

router.all("*", (req, res, next) => {
  return res.send("Account router In progress");
});

module.exports = router;
