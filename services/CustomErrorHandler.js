class CustomErrorHandler {
    constructor(status, msg) {
        this.status = status;
        this.message = msg;
    }

    static alredyExist(message) {
        return new CustomErrorHandler(409, message);
    }

    static wrongCredentials(message = "Username or Password Wrong!") {
        return new CustomErrorHandler(401, message);
    }

    static unAuthorized(message = "UnAuthorized!") {
        return new CustomErrorHandler(401, message);
    }

    static server(message = "Internal server error") {
        return new CustomErrorHandler(500, message);
    }

    static notFound(message = "404 user not found") {
        return new CustomErrorHandler(404, message);
    }
}
export default CustomErrorHandler