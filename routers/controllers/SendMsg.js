const nodemailer = require("nodemailer");
const verificationModel = require("../../db/models/VerificationModel");

require("dotenv").config();

const sendEmailMsg = async (req, res) => {
  const { email } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // Slove number result, if begin number 0 it is send 4 numbers, if begin numbers 00 it is send 3 numbers. convert to string don't missing any number[length 5]
  let result = "";
  for (let i = 0; i < 5; i++) {
    result += Math.floor(Math.random() * 10);
  }

  let mailOptions = {
    from: "Alfaiadh bank",
    to: email,
    subject: "Alfaiadh Bank",
    text: "Verification code..",
    html: `<h2 style="color:black">Alfaiadh Bank</h2>
    <p>Verification code:</p>
    <h3>${result}</h3>
    `,
  };

  transporter.sendMail(mailOptions, async (err, data) => {
    if (err) {
      res.status(403).send("Error " + err);
    } else {
      const lastCode = await verificationModel.findOne({ email });
      if (lastCode == true) {
        const updateCode = await verificationModel.findOneAndUpdate(
          { email },
          { code: result },
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

  // update code if was create any code to same email!
  const lastCode = await verificationModel
    .findOne({ email })
    .sort({ _id: -1 })
    .limit(1);

  if (code == lastCode.code) {
    res.status(200).json("successfully");
  } else {
    res.status(403).json("Enter Correct Code");
  }
};

module.exports = {
  sendEmailMsg,
  checkCode,
};
