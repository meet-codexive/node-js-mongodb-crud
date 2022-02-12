import Joi from 'joi';
import { User, RefreshToken } from '../models';
import bcrypt from 'bcrypt';
import CustomErrorHandler from '../services/CustomErrorHandler';
import jwtService from '../services/jwtService';
import { REFRESH_SECRET } from '../config';

const register = async (req, res, next) => {

    const registerSchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        repeat_password: Joi.ref('password')
    });
    const { error } = registerSchema.validate(req.body);

    // console.log(req.body);

    if (error) {
        return next(error)
    }

    try {
        const exist = await User.exists({ email: req.body.email })
        if (exist) {
            return next(CustomErrorHandler.alredyExist('this email already use'));
        }
    } catch (error) {
        return next(error)
    }

    //hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        // role: "admi"
    }

    let access_token;
    let refresh_token;
    try {

        const result = await new User(user)
        result.save()

        access_token = jwtService.sign({ _id: result._id, role: result.role });
        refresh_token = jwtService.sign({ _id: result._id, role: result.role }, '1y', REFRESH_SECRET);

        // database whitelist
        await RefreshToken.create({ token: refresh_token });
        console.log(result._id);

    } catch (err) {
        return next(err)
    }

    res.json({ access_token, refresh_token });
    // res.json({ msg: "success!" })
}

export {
    register
}