import axios from "axios";

const API_URL = "http://localhost:3000/courses";

export const getCourses = () => axios.get(API_URL);
export const getCourseById = (id: number) => axios.get(`${API_URL}/${id}`);
export const addCourse = (course: any) => axios.post(API_URL, course);
export const updateCourse = (id: number, course: any) => axios.put(`${API_URL}/${id}`, course);
export const deleteCourse = (id: number) => axios.delete(`${API_URL}/${id}`);
