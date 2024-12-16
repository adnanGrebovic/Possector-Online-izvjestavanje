import axios, { AxiosResponse } from "axios";


axios.defaults.baseURL = "http://192.168.2.46:1234/reports/";


const responseBody = (response: AxiosResponse) => response.data;


const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const agent = {
    articles_sales: (from: Date | string, to: Date | string) => requests.get(`articles-sales?from=${from}&to=${to}`),
    waiters_sales: (from: Date | string, to: Date | string) => requests.get(`waiters-sales?from=${from}&to=${to}`),
    taxes_total: (from: Date | string, to: Date | string) => requests.get(`taxes-total?from=${from}&to=${to}`),
    taxes_tags: (from: Date | string, to: Date | string) => requests.get(`taxes-tags?from=${from}&to=${to}`),
    goods_spent: (from: Date | string, to: Date | string) => requests.get(`goods-spent?from=${from}&to=${to}`),
    payment_types: (from: Date | string, to: Date | string) => requests.get(`paymenttypes-report?from=${from}&to=${to}`),
    waiters_articles_sales: (from: Date | string, to: Date | string) => requests.get(`waiters-articles-sales?from=${from}&to=${to}`),
    customers_sales: (from: Date | string, to: Date | string) => requests.get(`customers-sales?from=${from}&to=${to}`),
    invoices_num: (from: Date | string, to: Date | string) => requests.get(`invoices-num?from=${from}&to=${to}`),
    tax_free: (from: Date | string, to: Date | string) => requests.get(`tax-free?from=${from}&to=${to}`),
    storage_report: (from: Date | string, to: Date | string) => requests.get(`storage-report?from=${from}&to=${to}`),
    // invoices: (from: Date | string, to: Date | string, page: number, pageSize: number) => requests.get(`invoices?from=${from}&to=${to}?page=${page}&pageSize=${pageSize}`),
    invoices: (from: Date | string, to: Date | string) => requests.get(`invoices?from=${from}&to=${to}`),
    cash_register: (from: Date | string, to: Date | string)=> requests.get(`cash-register?from=${from}&to=${to}`),
    previous_cash_register: (from: Date | string, to: Date | string)=> requests.get(`cash-register?from=${from}&to=${to}`),

}


const Agent = {
    agent
}


export default Agent;