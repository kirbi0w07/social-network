export interface SignupData {
    name: string,
    last_name: string,
    username: string,
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
    username?: string,
    email?: string,
    password?: string,
    confirm_password?: string,
    birthDate?: string
    gender?: string,
}

export interface SignupCredentials {
    email: string,
    name: string,
    last_name: string,
    username: string,
    password: string,
    password_confirmation: string,
    birthday: Date,
    gender: string,
}
