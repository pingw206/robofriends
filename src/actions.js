import {CHANGE_SEARCH_FIELD} from './constants.js';



export const setSearchField = (text) => ({
    type: CHANGE_SEARCH_FIELD, //防止error不好定位，将字符串写成常量
    payload: text

} )