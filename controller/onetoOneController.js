import { Customer, Identifier } from "../models";

const customerpost = async (req, res, next) => {
    let result;
    const { name, age, gender } = req.body;
    try {
        const newdata = {
            name,
            age,
            gender
        }
        result = await Customer.create(newdata)
        // console.log(result);
    } catch (error) {
        return next(error)
    }
    res.json(result);
}

const customerget = async (req, res, next) => {
    let result;
    try {
        result = await Customer.find();
    } catch (error) {
        return next(error)
    }
    res.json(result)
}
const identifier = async (req, res, next) => {

    // console.log(req.query);
    let result;
    const { carcode, customer } = req.query;
    try {
        const newdata = {
            cardCode: carcode,
            customer: customer
        }
        result = await Identifier.create(newdata)
    } catch (error) {
        return next(error)
    }
    res.json(result);
}

export {
    customerpost,
    customerget,
    identifier
}