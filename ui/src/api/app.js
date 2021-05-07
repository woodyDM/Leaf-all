
import { get, post } from './req';

const actions = {
    saveApp: async function (request) {
        return post("/api/v1/app", request);
    },
    list: async function () {
        return get("/api/v1/app/list");
    },
    detail: async function (id) {
        return get("/api/v1/app?id=" + id);
    },
    run: async function (id) {
        return post("/api/v1/app/run?id=" + id);
    }
}

export default actions;



