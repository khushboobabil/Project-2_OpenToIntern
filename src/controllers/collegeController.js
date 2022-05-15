const collegeModel = require("../models/collegeModel")
const internModels = require("../models/internModels")



const isValid = function (value) {
  if (typeof value == undefined || value == null) return false
  if (typeof value === 'string' && value.trim().length === 0) return false
   if (typeof value === Number && value.trim().length === 0) return false
  return true
}

// create college controller..................................

const createCollege = async function (req, res) {

  try {
    const data = req.body;

    if (Object.keys(data).length > 0) {

      if (!isValid(data.name)) { return res.status(400).send({ status: false, msg: "Name is required" }) }

      let checkNameCollege = await collegeModel.findOne({ name: data.name })
      if (checkNameCollege) { return res.status(400).send({ msg: "Name Already exist" }) }

      if (!isValid(data.fullName)) { return res.status(400).send({ status: false, msg: "Full Name is required" }) }

      if (!isValid(data.logoLink)) { return res.status(400).send({ status: false, msg: " LogoLink is required" }) }


      const upperCaseFullName = data.fullName
      let newStringFullName = convertFirstLetterToUpperCase(upperCaseFullName)
      function convertFirstLetterToUpperCase(upperCaseFullName) {
        var splitStr = upperCaseFullName.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
          splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }

        return splitStr.join(' ');
      }


      let collegeFullName = await collegeModel.findOne({ fullName: data.fullName })
      if (collegeFullName) {
        return res.status(400).send({ status: false, message: "college already exist" })
      }

      if ((/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(data.logoLink))) {

        const savedData = await collegeModel.create(data)
        let resultCollegeEntry = {
          name: savedData.name,
          fullName: newStringFullName,
          logoLink: savedData.logoLink,
          isDeleted: savedData.isDeleted

        }

        return res.status(201).send({ status: "college Created", date: resultCollegeEntry })

      } else { return res.status(400).send({ msg: "Please enter a valid URL" }) }

    } else { return res.status(400).send({ msg: "Please enter some data" }) }

  } catch (err) {
    return res.status(500).send({ ERROR: err.message })
  }
}


// get college detalis controller.........................

const collegeDetails = async function (req, res) {

  try {
    const data = req.query.collegeName
    if (!data) { return res.status(400).send("college name not found") }

    const newData = await collegeModel.findOne({ name: data, isDeleted: false })
    if (!isValid(newData)) { return res.status(400).send({ ERROR: "Data provided is not present in college Database" }) }



    const internData = await internModels.find({ collegeId: newData._id, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 })
    if (!isValid(internData)) { return res.status(400).send({ ERROR: "No intern applied til now" }) }

    const getData = { name: newData.name, fullName: newData.fullName, logoLink: newData.logoLink, internData }

    return res.status(200).send({ Data: getData })

  } catch (err) {
    return res.status(500).send({ ERROR: err.message })
  }

}






module.exports.createCollege = createCollege
module.exports.collegeDetails = collegeDetails
