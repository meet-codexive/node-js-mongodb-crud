import Student from "../models/student"

//Insert 
const addstud = async (req, res, next) => {

    let result;
    // console.log("newdata", req.body);
    try {
        const newdata = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address: req.body.address,
            rollno: req.body.rollno,
        }
        result = await Student.create(newdata) //Save Data Table
        // res.json("sss")
        res.json(result)

    } catch (error) {
        return next(error)
    }
    res.json("")
}

//Update
const updatestud = async (req, res, next) => {

    let result;
    // console.log("update", req.body);
    try {

        result = await Student.findOneAndUpdate({ _id: req.params.id }, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address: req.body.address,
            rollno: req.body.rollno
        }, { new: true }) //update data *new: false* not update data

        console.log(result);
    } catch (error) {
        return next(error)
    }
    res.json(result)
}

const deletestud = async (req, res, next) => {

    const remove = await Student.findByIdAndRemove({ _id: req.params.id });

    if (!remove) {
        return next(new Error("Not Data Found"))
    }
    return res.json("Successfully Delete!")
}

const getstud = async (req, res, next) => {
    let result;
    try {
        result = await Student.find().select("-__v -updatedAt") //select Remove To Get Data
    } catch (error) {
        return next(error)
    }
    res.json(result)
}

const getstudById = async (req, res, next) => {
    let result;
    try {
        const id = { _id: req.params.id }
        result = await Student.findOne(id);

        if (!result) {
            res.json("Not Data")
        }
    } catch (error) {
        return next(error)
    }
    return res.json(result)
}
export {
    addstud,
    updatestud,
    deletestud,
    getstud,
    getstudById
}