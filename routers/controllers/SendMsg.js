const nodemailer = require("nodemailer");
const verificationModel = require("../../db/models/VerificationModel");
require("dotenv").config();

const sendEmailMsg = async (req, res) => {
  // const userId = req.token.userId;
  const { email } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // console.log(process.env.MAIL_USERNAME,"process.env.MAIL_USERNAME");
  // userName in .env file!

  // Slove number result, if begin number 0 it is send 4 numbers, if begin numbers 00 it is send 3 numbers. convert to string don't missing any number[length 5]
  let result = "";
  for (let i = 0; i < 5; i++) {
    result += Math.floor(Math.random() * 10);
  }

  let mailOptions = {
    from: "Alradhi bank",
    to: email,
    subject: "Alradhi Bank",
    text: result,
  };

  transporter.sendMail(mailOptions, async (err, data) => {
    if (err) {
      res.status(403).send("Error " + err);
    } else {
      const lastCode = await verificationModel.findOne({ email });
      if (lastCode == true) {
        const updateCode = await verificationModel.findOneAndUpdate(
          { email },
          { code:result },
          { new: true }
        );
        res.status(201).json("successfully");
      } else {
        const newVerification = await new verificationModel({
          email,
          code: result,
        });
        const saveVer = await newVerification.save();
        res.status(201).json("successfully");
      }
    }
  });
};

const checkCode = async (req, res) => {
  const { code, email } = req.body;

  // console.log(code,"code");
  // console.log(email,"email");

  // const findCode = await verificationModel.findOne({email, code:{$in:code}})

  // update code if was create any code to same email!

  const lastCode = await verificationModel
    .findOne({ email })
    .sort({ _id: -1 })
    .limit(1);
  // console.log(lastCode,"lastCode");

  if (code == lastCode.code) {
    // console.log(findCode,"findCode");
    res.status(200).json("successfully");
  } else {
    res.status(403).json("Enter Correct Code");
  }
  // console.log(findCode.length >0,"findCode");
};

module.exports = {
  sendEmailMsg,
  checkCode,
};
