

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  isFree: boolean;
}

const CourseTable = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    isFree: true,
    price: 0,
  });

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
      setNewCourse({ title: "", description: "", isFree: true, price: 0 });
    } catch (error) {
      console.error("Error adding course", error);
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
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Courses</h2>

      
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Title"
          value={newCourse.title}
          onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
          className="p-2 border rounded"
        />
        <button onClick={addCourse} className="p-2 bg-blue-500 text-white rounded">
          Add Course
        </button>
      </div>

      
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border">
              <td className="border p-2">{course.title}</td>
              <td className="border p-2">{course.description}</td>
              <td className="border p-2">{course.isFree ? "Free" : `$${course.price}`}</td>
              <td className="border p-2">
                <Link to={`/courses/${course.id}`} className="text-blue-500 mr-2">View</Link>
                <Link to={`/courses/edit/${course.id}`} className="text-green-500 mr-2">Edit</Link>
                <button
                  className="text-red-500"
                  onClick={() => deleteCourse(course.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
