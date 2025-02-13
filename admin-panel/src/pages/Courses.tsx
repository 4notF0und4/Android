



import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css'

interface Course {
  id: number;
  title: string;
  description: string;
  isFree: boolean;
  price: number;
  expiryYear: number;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState<Course>({
    id: 0,
    title: "",
    description: "",
    isFree: false,
    price: 0,
    expiryYear: new Date().getFullYear(),
  });
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/courses");
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  const addCourse = async () => {
    try {
      await axios.post("http://localhost:3000/courses", newCourse);
      fetchCourses();
      setNewCourse({
        id: 0,
        title: "",
        description: "",
        isFree: false,
        price: 0,
        expiryYear: new Date().getFullYear(),
      });
    } catch (error) {
      console.error("Error adding course", error);
    }
  };


  const handleEditClick = (course: Course) => {
    setEditingCourse(course);
  };

 
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingCourse) {
      const { name, value, type, checked } = e.target;
      setEditingCourse({
        ...editingCourse,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;
    try {
      await axios.put(`http://localhost:3000/courses/${editingCourse.id}`, {
        title: editingCourse.title,
        description: editingCourse.description,
        price: Number(editingCourse.price),
        expiryYear: Number(editingCourse.expiryYear),
        isFree: editingCourse.isFree,
      });
      setEditingCourse(null);
      fetchCourses();
    } catch (error) {
      console.error("Error updating course", error);
    }
  };

  const deleteCourse = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`http://localhost:3000/courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course", error);
    }
  };

  return (
    <div className="p-6">
     <h1 className="text-2xl font-bold mb-4  dark:text-white">Courses</h1>


     
      <div className="flex flex-col gap-3 mb-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <input
          type="text"
          placeholder="Title"
          value={newCourse.title}
          onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        />

        <input
          type="text"
          placeholder="Description"
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={newCourse.isFree}
            onChange={(e) => setNewCourse({ ...newCourse, isFree: e.target.checked })}
            className="w-5 h-5"
          />
          <label className="dark:text-white">Is Free?</label>
        </div>
        {!newCourse.isFree && (
          <input
            type="number"
            placeholder="Price"
            value={newCourse.price}
            onChange={(e) => setNewCourse({ ...newCourse, price: Number(e.target.value) })}
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        )}
        <input
          type="number"
          placeholder="Expiry Year"
          value={newCourse.expiryYear}
          onChange={(e) => setNewCourse({ ...newCourse, expiryYear: Number(e.target.value) })}
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <button onClick={addCourse} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add Course
        </button>
      </div>

     
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Expiry Year</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="text-center bg-white dark:bg-gray-800">
              <td className="border p-2">{course.title}</td>
              <td className="border p-2">{course.description}</td>
              <td className="border p-2">{course.isFree ? "Free" : `${course.price}₼`}</td>
              <td className="border p-2">{course.expiryYear}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEditClick(course)}
                  className="p-1 bg-green-500 text-white rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteCourse(course.id)}
                  className="p-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      {editingCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Update Course</h2>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="title"
                value={editingCourse.title}
                onChange={handleEditChange}
                placeholder="Title"
                className="p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
              <input
                type="text"
                name="description"
                value={editingCourse.description}
                onChange={handleEditChange}
                placeholder="Description"
                className="p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isFree"
                  checked={editingCourse.isFree}
                  onChange={handleEditChange}
                  className="w-5 h-5"
                />
                <label className="dark:text-white">Is Free?</label>
              </div>
              {!editingCourse.isFree && (
                <input
                  type="number"
                  name="price"
                  value={editingCourse.price}
                  onChange={handleEditChange}
                  placeholder="Price"
                  className="p-2 border rounded dark:bg-gray-700 dark:text-white"
                />
              )}
              <input
                type="number"
                name="expiryYear"
                value={editingCourse.expiryYear}
                onChange={handleEditChange}
                placeholder="Expiry Year"
                className="p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;


