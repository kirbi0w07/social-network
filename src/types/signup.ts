export interface SignupData {
    name: string,
    last_name: string,
    email: string,
    password: string,
    confirm_password: string,
    birthDate: {
        day: number | null,
        month: number | null,
        year: number | null,
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