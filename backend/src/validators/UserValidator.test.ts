import BadRequestError from "../errors/BadRequestError";
import userValidator from "./UserValidator";

describe("UserValidator Tests", () => {
    test("validateAddUser with valid data. Expect to not throw BadRequestError", () => {
        // arrange 
        const data = {
            first_name: 'Putu',
            email: 'putu@sample.email',
            password: '123',
            sex: 'Male',
            date_of_birth: new Date()
        }

        // act & assert
        expect(() => userValidator.validateAddUser(data)).not.toThrow(BadRequestError)
    });

    test("validateAddUser with empty first_name. Expect to throw BadRequestError", () => {
        // arrange 
        const data = {
            first_name: '',
            email: 'putu@sample.email',
            password: '123',
            sex: 'Male',
            date_of_birth: new Date()
        }

        // act & assert
        expect(() => userValidator.validateAddUser(data)).toThrow(BadRequestError)
    });

    test("validateAddUser with empty email. Expect to throw BadRequestError", () => {
        // arrange 
        const data = {
            first_name: 'Putu',
            email: '',
            password: '123',
            sex: 'Male',
            date_of_birth: new Date()
        }

        // act & assert
        expect(() => userValidator.validateAddUser(data)).toThrow(BadRequestError)
    });

    test("validateAddUser with empty password. Expect to throw BadRequestError", () => {
        // arrange 
        const data = {
            first_name: 'Putu',
            email: 'putu@sample.email',
            password: '',
            sex: 'Male',
            date_of_birth: new Date()
        }

        // act & assert
        expect(() => userValidator.validateAddUser(data)).toThrow(BadRequestError)
    });

    test("validateAddUser with empty sex. Expect to throw BadRequestError", () => {
        // arrange 
        const data = {
            first_name: 'Putu',
            email: 'putu@sample.email',
            password: '123',
            sex: '',
            date_of_birth: new Date()
        }

        // act & assert
        expect(() => userValidator.validateAddUser(data)).toThrow(BadRequestError)
    });
})