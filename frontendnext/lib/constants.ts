//pure api
//const BASE_API_URL = process.env.BASE_API_URL!; //! asserts it is defined
//export const GET_ALL_PRODUCTS=`${BASE_API_URL}/items/cparts`
//export const GET_SINGLE_PRODUCT = `${BASE_API_URL}/part`;

//program API
const BASE_API_URL = process.env.BASE_API_URL!;

export const GET_ALL_PRODUCTS = `${BASE_API_URL}/parts/json`; //  new all-products endpoint
export const GET_SINGLE_PRODUCT = `${BASE_API_URL}/part`; //  new single-product endpoint

export const LOGIN_API_URL = `${BASE_API_URL}/login`;
export const REGISTER_API_URL = `${BASE_API_URL}/signup`;
