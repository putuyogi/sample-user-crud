export default interface User {
    id?: number,
    first_name: string,
    last_name?: string,
    email: string,
    password: string,
    sex: string,
    date_of_birth: Date,
    address?: string
}