import { Product } from "../models"
import multer from 'multer';
import CustomErrorHandler from "../services/CustomErrorHandler";
import Joi from "joi";
import fs from 'fs';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads') //Destination folder
    },
    filename: function (req, file, cb) {
        let newdata = Date.now() + "-" + file.originalname
        cb(null, newdata) //File name after saving
    }
})
const uploadData = multer({ storage: storage }).single('image')

const store = async (req, res, next) => {

    // Multipart form data
    uploadData(req, res, async (err) => {
        if (err) {
            return next(CustomErrorHandler.serverError(err.message));
        }
        // console.log(req.file);
        const filePath = req.file.path;

        const productSchema = Joi.object({
            name: Joi.string().required(),
            price: Joi.number().required(),
            size: Joi.string().required(),
        })

        const { error } = productSchema.validate(req.body)
        if (error) {
            fs.unlink(`${appRoot}/${filePath}`, (error) => {
                if (error) {
                    return next(CustomErrorHandler.serverError(error.message));
                }
            });
            return next(error);
        }

        // const { name, price, size } = req.body;
        let document;
        try {
            const newData = {
                name: req.body.name,
                price: req.body.price,
                size: req.body.size,
                image: filePath
            }
            document = await Product.create({ newData })
        } catch (error) {
            return next(error)
        }

        res.status(201).json(document);
    });
}

//update
const update = async (req, res, next) => {

    // Multipart form data
    uploadData(req, res, async (err) => {
        if (err) {
            return next(CustomErrorHandler.serverError(err.message));
        }

        let filePath;
        if (req.file) {

            filePath = req.file.path;
        }

        const productSchema = Joi.object({
            name: Joi.string().required(),
            price: Joi.number().required(),
            size: Joi.string().required(),
            image: Joi.string()
        })

        const { error } = productSchema.validate(req.body)
        if (error) {
            if (req.file) {
                fs.unlink(`${appRoot}/${filePath}`, (error) => {
                    if (err) {
                        return next(CustomErrorHandler.serverError(error.message));
                    }
                });
            }
            return next(error);
        }

        const { name, price, size } = req.body;
        let document;
        try {
            document = await Product.findOneAndUpdate({ _id: req.params.id }, {
                name,
                price,
                size,
                ...(req.file && { image: filePath })
            }, { new: true })
            console.log(document);
        } catch (error) {
            return next(error)
        }
        res.status(201).json(document);
    });
}

//delete
const productdelete = async (req, res, next) => {
    const document = await Product.findByIdAndRemove({ _id: req.params.id });

    if (!document) {
        return next(new Error('not delete'));
    }

    const imagePath = document._doc.image;
    // console.log(imagePath);

    fs.unlink(`${appRoot}/${imagePath}`, (error) => {
        if (error) {
            return next(CustomErrorHandler.server());
        }
        return res.json("successfuly Delete")
    })
}

//get
const productget = async (req, res, next) => {
    let document;
    try {
        document = await Product.find().select("-updatedAt -__v").sort({ name: -1 });//sort by data in sorting
    } catch (error) {
        return next(CustomErrorHandler.server());
    }
    return res.json(document)
}

//single get
const productgetsingle = async (req, res, next) => {
    let document;
    try {
        document = await Product.findOne({ _id: req.params.id }).select("-updatedAt -__v")
    } catch (error) {
        return next(CustomErrorHandler.server());
    }
    return res.json(document)
}

export {
    store,
    update,
    productdelete,
    productget,
    productgetsingle,
}
