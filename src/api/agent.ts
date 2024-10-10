import axios, { AxiosResponse } from "axios";


axios.defaults.baseURL="http://192.168.0.28:1234/reports/";
// axios.defaults.withCredentials=true;

const responseBody=(response:AxiosResponse)=>response.data;


const requests={
    get: (url:string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url:string, body: object) => axios.post(url, body).then(responseBody),
    put: (url:string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url:string) => axios.delete(url).then(responseBody),
}

const reports={
    articles_sales: (from: Date, to: Date)=> requests.get(`articles-sales?from=${from}&to=${to}`),
    waiters_sales: (from: Date, to: Date)=> requests.get(`waiters-sales?from=${from}&to=${to}`),
    taxes_total: (from: Date, to: Date)=> requests.get(`taxes-total?from=${from}&to=${to}`),
    taxes_tags: (from: Date, to: Date)=> requests.get(`taxes-tags?from=${from}&to=${to}`),
    goods_spent: (from: Date, to: Date)=> requests.get(`goods-spent?from=${from}&to=${to}`),
    payment_types: (from: Date, to: Date)=> requests.get(`payment-types?from=${from}&to=${to}`),
    waiters_articles_sales: (from: Date, to: Date)=> requests.get(`waiters-articles-sales?from=${from}&to=${to}`),
    customers_sales: (from: Date, to: Date)=> requests.get(`customers-sales?from=${from}&to=${to}`),
    invoices_num: (from: Date, to: Date)=> requests.get(`invoices-num?from=${from}&to=${to}`),
    tax_free: (from: Date, to: Date)=> requests.get(`tax-free?from=${from}&to=${to}`),
    goods_stock: (from: Date, to: Date)=> requests.get(`goods-stock?from=${from}&to=${to}`),
    invoices: (from: Date, to: Date)=> requests.get(`invoices?from=${from}&to=${to}`),
}


const Agent={
    reports
}

export default Agent;