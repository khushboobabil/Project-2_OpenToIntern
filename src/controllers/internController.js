const internModel = require("../models/internModels")



// validation//

const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}


// create intern//

    const createIntern = async function (req, res) {


        try {

            let data = req.body;

            if (Object.keys(data).length > 0) {

                if (!isValid(data.name)) { return res.status(400).send({ status: false, msg: "First name is required" }) }
                if(!isValid(data.collegeId)){return res.status(400).send({status:false , msg:"College Id is required"})}

                if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.email))) {
                    return res.status(400).send({ status: false, msg: "Please provide a valid email" })
                }
                if (!(/^([+]\d{2})?\d{10}$/.test(data.mobile))) {
                    return res.status(400).send({ status: false, msg: "please provide a valid moblie Number" })
                }

                let dupli = await internModel.findOne({ email: data.email })

                if (dupli) { return res.status(400).send({ status: false, msg: "Email already exists" }) }

                let savedData = await internModel.create(data);
                return res.status(201).send({ internDetails: savedData });

            } else {
                return res.status(400).send({ ERROR: "BAD REQUEST" })
            }

        } catch (err) {

            return res.status(500).send({ ERROR: err.message })

        }
    }


    module.exports.createIntern = createIntern;