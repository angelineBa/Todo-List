import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"; 
import { toast } from "sonner";
const Todo = () => {
  const [todo, setTodo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch ToDo item
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/todolist/${id}`);
        setTodo(response.data);
        setEditedTodo(response.data); // Set initial values for editing
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodo();
  }, [id]);

  // Handle Delete
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/todolist/${id}`);
      navigate("/");

      const formattedDate = new Date(todo.date).toLocaleString();
      toast.error(`${todo.title} deleted successfully!`, {
        description: ` ${formattedDate}`,
      });
0      
    } catch (error) {
      toast.error("Failed to add To-do", {
              description: error.message,
            });
      console.log(error);
    }
  };

  // Toggle Edit Mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handle Input Change
  const handleChange = (e) => {
    setEditedTodo({ ...editedTodo, [e.target.name]: e.target.value });
  };

  // Save Updated Data
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/todolist/${id}`, editedTodo);
      setTodo(editedTodo); // Update the displayed data
      setIsEditing(false); // Exit edit mode

      const formattedDate = new Date(todo.date).toLocaleString();
      toast.success(`${todo.title} updated successfully!`, {
        description: ` ${formattedDate}`,
        
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-10" >
      <Card className="w-[750px] p-4" style={{ backgroundColor: "#e4d6da" }}>
        <CardHeader>
          <CardTitle className="flex justify-between gap-4 ">
            {isEditing ? (
              <input
                type="text"
                name="title"
                value={editedTodo.title}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            ) : (
              <h1>{todo.title}</h1>
            )}
            <div className="flex gap-4">
              <Button onClick={handleDelete} variant="destructive">
                <FontAwesomeIcon icon={faTrash} className="text-[#e4d6da] text-2xl hover:text-gray-500" />
              </Button>
              {isEditing ? (

                <Button onClick={handleUpdate} variant="save">
                  <FontAwesomeIcon icon={faCheck} className="text-[#e4d6da] text-2xl hover:text-gray-500" />
                </Button>
              ) : (
                <Button onClick={toggleEdit} variant="update">
                  <FontAwesomeIcon icon={faPenToSquare} className="text-[#e4d6da] text-2xl hover:text-gray-500" />
                </Button>
              )}
            </div>
          </CardTitle>
          {isEditing ? (
            <input
              type="date"
              name="date"
              value={editedTodo.date}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          ) : (
            <CardDescription>{todo.date}</CardDescription>
          )}
        </CardHeader>

        <CardContent className="flex flex-col items-center ">
          {isEditing ? (
            <textarea
              name="description"
              value={editedTodo.description}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          ) : (
            <p>{todo.description}</p>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <h1>Made with ♥ by Mario Inguito</h1>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Todo;
