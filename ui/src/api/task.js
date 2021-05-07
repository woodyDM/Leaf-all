import { get ,post} from './req';
const actions = {
    list: async function (appId, pageNum, pageSize) {
        return get('/api/v1/task',
            {
                AppId: appId,
                PageNum: pageNum,
                PageSize: pageSize

            })
    },
    detail: async function (id) {
        return get("/api/v1/task/detail?id=" + id)
    },

    stop: async function (id) {
        return post("/api/v1/task/kill?id=" + id)
    }
}

export default actions;