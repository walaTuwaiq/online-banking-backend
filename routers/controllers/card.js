const cardModel = require("../../db/models/cardModel");

const getCards = (req, res) => {
    cardModel
    .find({}).populate("userId")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.send(error);
    });
};

// const userData = async(req,res)=>{
//   const userId = req.token.userId
//   try {
//     const userDate = await cardModel.find({_id:userId}).select("userName fullName lastSeen dateOfBirth nationalId history isAdmin")
//     res.status(200).json(userDate[0])
//   } catch (error) {
//     res.send(error)
//   }
// }

// const newCourse = async (req, res) => {
//   const { name, chapters, subject } = req.body;
//   const userId = req.token.userId;
//   const newCourse = new courseModel({ name, chapters, subject, userId });
//   try {
//     const saveCourse = await newCourse.save();
//     const courses = await courseModel.find({}).populate('userId');
//     res.status(201).json(courses);
//   } catch (error) {
//     res.send(error);
//   }
// };

// const deleteCourse = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const deleteOne = await courseModel.findOneAndDelete({ _id: id });
//     const courses = await courseModel.find({}).populate('userId');
//     res.status(201).json(courses);
//   } catch (error) {
//     res.send(error);
//   }
// };

// const updateCourse = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const updateOne = await courseModel.findOneAndUpdate(
//       { _id: id },
//       req.body,
//       { new: true }
//     );
//     const courses = await courseModel.find({}).populate('userId');
//     res.status(201).json(courses);
//   } catch (error) {
//     res.send(error);
//   }
// };

module.exports = { getCards };
