import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TodoCard from "@/components/TodoCard";
import axios from "axios";

const Todos = () => {
  const [data, setData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Fetch To-do List
    const fetchTodo = async () => {
      try {
        const response = await axios.get("http://localhost:3000/todolist");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodo();

    // Update Time Every Second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Format Time & Date
  const formattedTime = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }); // 10:06 PM
  const formattedDate = currentTime.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" }); // Friday, 21 February

  return (
    <div>
      <Card className="w-[750px] p-6 self-start" style={{ backgroundColor: "#e4d6da" }}>
        <CardHeader>
          <div className="flex justify-between gap-x-5">
            <div className="w-[700px] h-32 bg-white shadow-lg rounded-lg p-4 border border-gray-300 self-start">
              {/* 📅 Small Date */}
              <p className="text-2xl text-gray-600 mt-2 self-start">Hey there!</p>
              {/* 🕒 Big Time */}
                <h1 className="text-3xl font-bold text-gray-900">What's your plan?</h1>
              
            </div>
            <div className="w-64 h-32 bg-white shadow-lg rounded-lg p-4 border border-gray-300">
              <CardTitle className="mt-4">{formattedDate} </CardTitle>
              <CardDescription>{formattedTime}</CardDescription>
            </div>
          </div>
          
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-y-5 items-center">
            {data.map((todo, index) => (
              <TodoCard key={index} data={todo} />
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <h1>Made with ♥ by Mario Inguito</h1>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Todos;
