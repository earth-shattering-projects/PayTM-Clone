const { Router } = require("express");

const router = Router();

router.all("*", (req, res, next) => {
  return res.send("Account router In progress");
});

module.exports = router;
