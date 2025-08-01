import { useState, useEffect } from "react";
import { backendClient } from "../client/backendClient";
import { useParams, useNavigate, Link } from "react-router-dom";
import TasksPage from "./TasksPage";

function ProjectDetailPage() {
  const { projectId } = useParams();
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [project, setProject] = useState({}); //project is an object so setting it as an object
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false); //toggle task form visibility
  const [editTask, setEditTask] = useState(""); //hold task being edited
  // added to track task status
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  //Get/List project details
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await backendClient.get(`/projects/${projectId}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("protasker-token")
            )}`,
          },
        });
        console.log(res.data);
        setProject(res.data);
        setTasks(res.data.task);
      } catch (error) {}
    };
    fetchProject();
  }, [projectId]);

  //Handler to add tasks for the project
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // to add validation for past date - Reference: mod-4 SBA
      const dueDate = new Date(taskDueDate);
      const today = new Date();
      //Validate dueDate for past date
      if (dueDate < today) {
        alert("Due date cannot be in the past");
        setTaskDueDate("");
        return;
      }
      if (editTask) {
        const res = await backendClient.put(
          `/tasks/${editTask._id}`,
          { title, description, status, deadLine: taskDueDate },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("protasker-token")
              )}`,
            },
          }
        );

        const updatedTasks = tasks.map((task) =>
          task._id === res.data._id ? res.data : task
        );
        setTasks(updatedTasks);

        setEditTask("");
      } else {
        const res = await backendClient.post(
          `/tasks/${projectId}`,
          { title, description, status, deadLine: taskDueDate },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("protasker-token")
              )}`,
            },
          }
        );
        setTasks((prev) => [...prev, res.data]); //Append new tasks
      }

      setTitle("");
      setStatus("");
      setDescription("");
      setTaskDueDate("");
      setShowForm(false);
      //   console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  //Populate form for editing a task
  const handleTaskEdit = async (taskId) => {
    const task = tasks.find((task) => task._id === taskId);
    console.log(task);
    if (task) {
      setEditTask(task);
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      const date = task.deadLine ? new Date(task.deadLine).toISOString().split("T")[0] : "" ;
      setTaskDueDate(date);
      setShowForm(true);
    }
  };

  //handler to delete a task
  const handleTaskDelete = async (taskId) => {
    console.log(`Trying to delete the project${taskId}`); //debugging
    //Confirm before deleting the task
    const confirm = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirm) {
      return;
    }
    try {
      const res = await backendClient.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("protasker-token")
          )}`,
        },
      });
      const updatedtasks = tasks.filter((task) => task._id !== res.data._id);
      setTasks(updatedtasks);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 text-center">
        Project Detail Page
      </h1>

      <div className="flex justify-between item-start mb-4">
        <div>
          {/* Rendering Project Information */}
          <p className="text-gray-800 text-4xl font-bold mb-4">
            {project.name}
          </p>
          <p className="text-xl font-bold text-gray-500">Project Descrption:</p>
          <p className="text-gray-500 mb-4 ">{project.description}</p>
          <p className="text-l font-bold text-gray-500">Projec Start Date:</p>
          <p className="text-gray-700 mb-2">
            {project.createdAt
              ? new Date(project.createdAt).toLocaleDateString()
              : "Not Started Yet"}
          </p>
          <p className="text-l font-bold text-gray-500">Project DeadLine:</p>
          <p className="text-gray-700">
            {project.deadLine
              ? new Date(project.deadLine).toLocaleDateString()
              : "TBD"}
          </p>
        </div>
        <button
          className="h-fit mb-3 px-7 py-2 bg-green-100 font-bold text-green-800 border border-green-300 rounded hover:bg-green-200"
          onClick={() => {
            if (showForm) {
              setTitle("");
              setDescription("");
              setTaskDueDate("");
              setEditTask("");
            }
            setShowForm((prev) => !prev);
          }}
        >
          {showForm ? "Cancel" : "+ Add Task"}
        </button>
      </div>

      {/* Rendering Tasks */}
      <div>
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
          >
            <h4
              className="text-lg font-semibold text-blue-600 underline mb-2"
              
            >
              {task.title}
            </h4>
            <p className="text-gray-700 mb-4">
              Description: {task.description}
            </p>
            <p className="text-gray-700 mb-4">Status: {task.status}</p>
            {task.deadLine && (
              <p className="text-gray-700 mb-4">
                Due Date: {new Date(task.deadLine).toLocaleDateString()}
              </p>
            )}

            <button
              onClick={() => handleTaskEdit(task._id)}
              className="mr-4 px-3 py-1 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded hover:bg-yellow-200"
            >
              Edit
            </button>
            <button
              className="px-3 py-1 bg-red-100 text-red-800 border border-red-300 rounded hover:bg-red-200"
              onClick={() => handleTaskDelete(task._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link
          to="/dashboard"
          className="inline-block bg-blue-200 font-semibold py-1 px-3 rounded "
        >
          Back
        </Link>
      </div>

      {/******************************** Adding new Tasks *****************************************/}
      {showForm && (
        <TasksPage
          title={title}
          description={description}
          taskDueDate={taskDueDate}
          status={status}
          setTitle={setTitle}
          setStatus={setStatus}
          setDescription={setDescription}
          setTaskDueDate={setTaskDueDate}
          onSubmit={handleSubmit}
          isEditing={!!editTask}
        />
      )}
    </main>
  );
}
export default ProjectDetailPage;
