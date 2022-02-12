import { User } from "../models"
import CustomErrorHandler from "../services/CustomErrorHandler";

const me = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user._id }).select('-__v -password -updatedAt');

        if (!user) {
            return next(CustomErrorHandler.notFound());
        }
        res.json(user);
    } catch (error) {
        return next(error)
    }
}

export {
    me
}