import { Demo } from "../models";
import Joi from "joi";

const demoadd = async (req, res, next) => {

    const demoSchema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required(),
        mobile: Joi.number().required(),
        gender: Joi.string().required(),
        living: Joi.boolean().required(),
    })
    const { error } = demoSchema.validate(req.body)
    if (error) {
        return next(error);
    }

    let result;
    const { name, age, mobile, gender, living } = req.body;
    try {
        const newdata = {
            name,
            age,
            mobile,
            gender,
            living
        }
        result = await Demo.create(newdata)
        // console.log(result);
    } catch (error) {
        return next(error)
    }
    res.json(result);
}

const demoupdate = async (req, res, next) => {

    const demoupdateSchema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required(),
        mobile: Joi.number().required(),
        gender: Joi.string().required(),
    })
    const { error } = demoupdateSchema.validate(req.body)
    if (error) {
        return next(error)
    }
    const { name, age, mobile, gender } = req.body;
    let result;
    try {
        result = await Demo.findOneAndUpdate({ _id: req.params.id }, {
            name,
            age,
            mobile,
            gender
        }, { new: true })
        console.log(result);
    } catch (error) {
        return next(error)
    }
    res.json(result)
}

const demodelete = async (req, res, next) => {
    const remove = await Demo.findByIdAndRemove({ _id: req.params.id });
    // console.log(remove);
    if (!remove) {
        return next(new Error("not data"))
    }
    return res.json("successfuly Delete")
}

const demoget = async (req, res, next) => {
    let result;
    try {
        result = await Demo.find().select("-__v -updatedAt");
    } catch (error) {
        return next(error)
    }
    res.json(result)
}

const demogetdata = async (req, res, next) => {
    let result;
    try {
        result = await Demo.findOne({ _id: req.params.id })
    } catch (error) {
        return next(error)
    }
    return res.json(result)
}

export {
    demoadd,
    demoupdate,
    demodelete,
    demoget,
    demogetdata,
}


