import moment from 'moment'; ''

export interface Base {
    id?: string
    createdAt?: any
    updatedAt?: any
}

export const defaultBase = () => {
    return { id: `${moment().format('YYYYMMDDHHmmssSSSx')}`, createdAt: new Date(), updatedAt: new Date() };
}

export interface Response {
    data?: { success?: boolean, data?: any, message?: string };
}