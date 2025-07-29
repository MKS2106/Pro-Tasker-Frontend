import { useState, useEffect } from "react";
import { backendClient } from "../client/backendClient";
import {useParams, useNavigate} from "react-router-dom"

function ProjectDetailPage(){
    const {projectId} = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [taskDueDate, setTaskDueDate]= useState("")
    const [project, setProject] = useState("");
    const [tasks, setTasks] = useState([])

    const navigate = useNavigate();

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
            console.log(res.data)
            setProject(res.data);
            
          } catch (error) {}
        };
        fetchProject();
      }, [projectId]);

      const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await backendClient.post(
        `/tasks/${projectId}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("protasker-token")
            )}`,
          },
        }
      );
      setTasks((prev) => [...prev, res.data]);
    //   setName(" ");
    //   setDescription(" ");
      //   console.log(res);
    } catch (error) {
      console.error(error);
    }
  };



    return(
        <main className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">

            {/* Project Details Page */}
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Project Detail Page</h1>

            {/* Rendering Project Information */}
            <div>
                {/* <p className="text-sm text-gray-500 uppercase" >Project Name:</p> */}
                <p className="text-gray-800 text-4xl font-bold mb-4">{project.name}</p>
            </div>

             <div>
                <p className="text-sm text-gray-500 uppercase" >Project Descrption:</p>
                <p className="text-gray-500">{project.description}</p>
            </div>

             <div>
                <p className="text-sm text-gray-500" >Projec Start Date:</p>
                <p className="text-gray-700">{project.createdAt ? new Date(project.createdAt).toLocaleDateString(): "Not Started Yet"}</p>
            </div>

             <div>
                <p className="text-sm text-gray-500" >Project Name:</p>
                <p className="text-gray-700">{project.deadLine ? new Date(project.deadLine).toLocaleDateString(): "TBD"}</p>
            </div>     
            <div>
                 {tasks.map((task) => (
                    <div key={task._id} className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200" >
                <h4 className="text-lg font-semibold text-blue-600 underline mb-2"
                onClick={() => navigate(`/tasks/${task._id}`)}
                >
                  {task.title}
                </h4>
                <p className="text-gray-700 mb-4">{task.description}</p>
                </div>
                   ))}
                
            </div>

    {/******************************** Adding new Tasks *****************************************/}
            <form className="flex flex-col space-y-4 mt-3" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" />
          <input
            className="border rounded px-3 py-2 w-full"
            type="text"
            name="title"
            placeholder="Task Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description" />
          <input
            className="border rounded px-3 py-2 w-full"
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="taskDueDate">Due date</label>
          <input
            className="border rounded px-3 py-2 w-full"
            type="date"
            name="taskDueDate"
            // placeholder="DueDate"
            value={taskDueDate}
            onChange={(e) => setTaskDueDate(e.target.value)}
            // required
          />
        </div>

        <input
          className="border bg-sky-100 font-bold rounded p-1 text-blue-800"
          type="submit"
          value="AddTask"
        />
      </form>

                  
           
         
        </main>
    )
}
export default ProjectDetailPage