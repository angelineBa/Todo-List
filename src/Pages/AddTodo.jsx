import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Import Sonner

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/todolist", {
        id: Math.floor(Math.random() * 10).toString(),
        title,
        description,
        date,
      });
      const formattedDate = new Date(date).toLocaleString();
      toast.success(`${title}  added successfully!`, {
        description: `${formattedDate}`,
      });

      navigate("/");
    } catch (error) {
      toast.error("Failed to add To-do", {
        description: error.message,
      });
      console.error(error);
    }
  };

  return (
    <div>
      <Card className="w-[750px]" style={{ backgroundColor: "#e4d6da" }}>
        <CardHeader>
          <CardTitle>Add To Do</CardTitle>
          <CardDescription>Fill all fields to add a To-do</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col py-10 gap-y-5 w-full">
          <div className="gap-y-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="gap-y-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="gap-y-2">
            <Label>Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <Button variant="save" onClick={handleSubmit}>Add To Do</Button>
        </CardContent>
        <CardFooter className="flex justify-between">
          <h1>Made with ♥ by Mario Inguito</h1>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddTodo;
