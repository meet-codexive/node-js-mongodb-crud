import Joi from 'joi';
import { User, RefreshToken } from '../models';
import CustomErrorHandler from '../services/CustomErrorHandler';
import bcrypt from 'bcrypt';
import jwtService from '../services/jwtService';
import { REFRESH_SECRET } from '../config';

const login = async (req, res, next) => {

    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    })

    const { error } = loginSchema.validate(req.body)

    if (error) {
        return next(error)
    }

    try {
        const user = await User.findOne({ email: req.body.email });
        // console.log(user);
        if (!user) {
            return next(CustomErrorHandler.wrongCredentials());
        }

        //password compare
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) {
            return next(CustomErrorHandler.wrongCredentials());
        }

        const access_token = jwtService.sign({ _id: user._id, role: user.role });
        const refresh_token = jwtService.sign({ _id: user._id, role: user.role }, '1y', REFRESH_SECRET)

        await RefreshToken.create({ token: refresh_token });
        res.json({ access_token, refresh_token })

    } catch (error) {
        return next(error)
    }

}

// const logout = async (req, res, next) => {

//     try {

//     } catch (error) {
//         return next(new Error('Data base something wrong'))
//     }
// }
export {
    login,
    // logout
}