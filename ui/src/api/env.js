
import { get, post } from './req';

const actions = {
    saveApp: async function (request) {
        return post("/api/v1/env", request);
    },
    list: async function () {
        return get("/api/v1/env/list");
    },
    detail: async function (id) {
        return get("/api/v1/env?id=" + id);
    },
}

export default actions;



