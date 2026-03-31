export interface SignupData {
    name: string,
    last_name: string,
    email: string,
    password: string,
    confirm_password: string,
    birthDate: {
        day: string,
        month: string,
        year: string,
    },
    gender: string,
}
export interface ErrorsSignupData {
    name?: string,
    last_name?: string,
    email?: string,
    password?: string,
    confirm_password?: string,
    birthDate?: string
    gender?: string,
}