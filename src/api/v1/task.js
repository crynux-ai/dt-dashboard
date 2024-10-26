import BaseAPI from '../base-api'
import v1 from './v1'

class TaskAPI extends BaseAPI {
    getTaskInfo() {
        return v1.get("/task")
    }
    getTaskNodes() {
        return v1.get("/task/nodes")
    }
    getTaskLogs() {
        return v1.get("/task/logs")
    }
    getTaskMetrics() {
        return v1.get("/task/metrics")
    }
}

const taskAPI = new TaskAPI()

export default taskAPI
