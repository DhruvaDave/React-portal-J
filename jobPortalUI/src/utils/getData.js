import http from "../http-common";


class JobDataService {
  getAll() {
    return http.get("/job/findAll");
  }

  getOne(id) {
    return http.get(`/job/${id}`);
  }

  create(data) {
    return http.post("/job/create", data);
  }

  update(id, data) {
    return http.put(`/job/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/job/delete/${id}`);
  }

  deleteAll() {
    return http.delete(`/job/deleteAll`);
  }

  findByTitle(title) {
    return http.get(`/job/findAll?title=${title}`);
  }
}

export default new JobDataService();