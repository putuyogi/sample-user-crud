import BadRequestError from '../errors/BadRequestError'
import ChangePassword from '../models/ChangePassword'
import User from '../models/User'
import commonHelper from '../helpers/CommonHelper'

const validateAddUser = (user: User) => {
    if (commonHelper.isNullOrEmpty(user.first_name)) {
        throw new BadRequestError("first_name is required field and cannot be empty.")
    }

    if (commonHelper.isNullOrEmpty(user.email)) {
        throw new BadRequestError("email is required field and cannot be empty.")
    }

    if (commonHelper.isNullOrEmpty(user.password)) {
        throw new BadRequestError("password is required field and cannot be empty.")
    }

    if (commonHelper.isNullOrEmpty(user.sex)) {
        throw new BadRequestError("sex is required field and cannot be empty.")
    }

    if (commonHelper.isNullOrEmpty(user.date_of_birth)) {
        throw new BadRequestError("date_of_birth is required field and cannot be empty.")
    }
}

const validateEditUser = (user: User) => {
    if (commonHelper.isNullOrEmpty(user.first_name)) {
        throw new BadRequestError("first_name is required field and cannot be empty.")
    }

    if (commonHelper.isNullOrEmpty(user.email)) {
        throw new BadRequestError("email is required field and cannot be empty.")
    }

    if (commonHelper.isNullOrEmpty(user.sex)) {
        throw new BadRequestError("sex is required field and cannot be empty.")
    }

    if (commonHelper.isNullOrEmpty(user.date_of_birth)) {
        throw new BadRequestError("date_of_birth is required field and cannot be empty.")
    }
}

const validateChangePassword = (changePassword: ChangePassword) => {
    if (commonHelper.isNullOrEmpty(changePassword.current_password)) {
        throw new BadRequestError("current_password is required field and cannot be empty.")
    }

    if (commonHelper.isNullOrEmpty(changePassword.new_password)) {
        throw new BadRequestError("new_password is required field and cannot be empty.")
    }

    if (commonHelper.isNullOrEmpty(changePassword.retype_new_password)) {
        throw new BadRequestError("retype_new_password is required field and cannot be empty.")
    }

    if (changePassword.new_password !== changePassword.retype_new_password) {
        throw new BadRequestError("new_password and retype_new_password is required to be same.")
    }
}

export default {
    validateAddUser,
    validateEditUser,
    validateChangePassword
}