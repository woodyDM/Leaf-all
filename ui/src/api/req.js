import axios from 'axios';
import { notification } from 'antd';


const pop = function (msg) {
    notification.error({
        message: '操作失败',
        description: msg
    });
}

const handleRequest = function (axioPromise) {
    return new Promise((resolve, reject) => {
        axioPromise.then(res => {
            if (res.data.code !== 0) {
                pop(res.data.msg);
                reject(res.data.msg);
            } else {
                resolve(res.data.data);
            }
        }).catch(e => {
            if(e.response.status===401){
                window.location.href="/login"
            }else{
                pop(e);
                console.log(e);
                reject(e);
            }
        });
    })
}


const get = function (url, params) {
    return handleRequest(
        axios.get(url, {
            params: { ...params }
        }))
}

const post = function (url, params) {
    return handleRequest(
        axios.post(url, params))
}

export { get, post };