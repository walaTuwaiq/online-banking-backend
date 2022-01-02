const userModel = require("../../db/models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  let { email, password } = req.body;
    // res.send({email,password})
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const newDate = (new Date(Date.now()).getMonth()+1)+"/"+new Date(Date.now()).getDate()+"/"+new Date(Date.now()).getFullYear()+"-"+new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
      const updateLastSeen = await userModel.findOneAndUpdate({email},{lastLogIn:newDate})
      // console.log(user,"user");
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        const payload = { userId: user._id, userName: user.userName, isAdmin:user.isAdmin };
        const token = jwt.sign(payload, "ABC",{
          expiresIn: "1h",
        });
        res.status(201).json({ token,payload });
      } else {
        res.send("wrong password!");
      }
    } else {
      res.send("You're don't have an account.");
    }
  } catch (error) {
    res.send("error");
  }
};

const checkToken = (req,res)=>{
  res.status(200).json("DD")
}

module.exports = { login,checkToken };
