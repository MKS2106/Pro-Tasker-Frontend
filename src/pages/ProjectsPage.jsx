import { useState, useEffect } from "react";
import { backendClient } from "../client/backendClient";

import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function ProjectsPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [projects, setProjects] = useState([]);

  //State management : to edit the project
  const [isEditing, setIsEditing] = useState(false)
  const [editingProjectId, setEditingProjectId] = useState("");
  
  const navigate = useNavigate();
  const {user} = useUser();

  useEffect(() => {

    //  if(!user || !user.role) return 


    // const token = localStorage.getItem("protasker-token")
    // console.log(token)
    // if(token){

    
    const endpoint = user.role === 'admin'? "/projects/adminprojects" : "/projects"
  
    
   
    const fetchProjects = async () => {
      try {
        const res = await backendClient.get(endpoint, { //Adding this line to accomodate admin user as well
          // const res = await backendClient.get("/projects", {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("protasker-token")
            )}`,
          },
        });
        console.log(res.data);
        setProjects(res.data);
      } catch (error) {}
    };

    
    fetchProjects();
    //  }
  }, []);
  



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      // to add validation for past date - Reference: mod-4 SBA
     const dueDate = new Date(deadLine)
     const today = new Date()
      
        if(dueDate < today){
          alert("Due date cannot be in the past")
          setDeadLine("")
          return

      }
    
     

      if(isEditing){
        const res = await backendClient.put(
        `/projects/${editingProjectId}`,
        { name, description, deadLine },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("protasker-token")
            )}`,
          },
        }
      );

       const updatedProjects = projects.map((project) => project._id === res.data._id ? res.data : project)
     setProjects(updatedProjects);

      } else{


        const res = await backendClient.post(
        "/projects",
        { name, description, deadLine },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("protasker-token")
            )}`,
          },
        }
      );
      setProjects((prev) => [...prev, res.data]);

     
    }

     //reset form data
      setIsEditing(false)
      setEditingProjectId("")
      setName("");
      setDescription("");
      setDeadLine("")
      //   console.log(res);
      }
       catch (error) {
      console.error(error);
    }
  };

  //ToDo:========================== Date: 07/29/2025 =============================================
   const handleEdit = async (project) => {
    setIsEditing(true)
    setEditingProjectId(project._id)
    setName(project.name)
    setDescription(project.description)
    setDeadLine(project.deadLine || "")
   
  }
  

  const handleDelete = async (projectId) => {
    // const projectId = e.target.id
    console.log(`Trying to delete the project${projectId}`);
    const confirm = window.confirm("Are you sure you want to delete the project?")
    if(!confirm){
            return
    }
    //  alert("deleting the projet")
  
    try {
     
      const res = await backendClient.delete(
        `/projects/${projectId}`,
        // { name: "UpdatedName", description:"UpdatedDescrption" },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("protasker-token")
            )}`,
          },
        }
      );
      const updatedProjects = projects.filter(
        (project) => project._id !== res.data._id
      );
      setProjects(updatedProjects);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  //=========================================== Date: 07/29/2025 =====================================

  return (
    <main className="max-w-md mx-auto p-4">
      {/* <h1>Welcome {user.username} </h1> */}
      <div className="border rounded p-4">    
      <form className="flex flex-col space-y-4 mt-3" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" />
          <input
            className="border rounded px-3 py-2 w-full"
            type="text"
            name="name"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <label htmlFor="deadLine">Due date</label>
          <input
            className="border rounded px-3 py-2 w-full"
            type="date"
            name="deadLine"
            // placeholder="DueDate"
            value={deadLine}
            onChange={(e) => setDeadLine(e.target.value)}
            // required
          />
        </div>

        <input
          className="border bg-sky-100 font-bold rounded p-1 text-blue-800"
          type="submit"
          value={ isEditing ? "Update Project" : "Create Project"}
        />
      </form>
      </div>

      <div className="mb-4">
        {/* {projects.length > 0 && ( */}
          {projects.length > 0 ? (
          <>
            <h2 className="font-bold text-xl text-center mb-1 mt-4">Current Projects:</h2>
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
              >
                <h4
                  className="text-lg font-semibold text-blue-600 underline mb-2"
                  onClick={() => navigate(`/projects/${project._id}`)}
                >
                  {project.name}
                </h4>
                <p className="text-gray-700 mb-4">{project.description}</p>

                {/*
                <label>StartDate:</label>
                <p>{project.createdAt}</p>
                <label>EndDate: To be Set</label>
                <p>{project.deadLine}</p>
*/}

                {/* <p>{project.user.username}</p> */}

                <button className="px-3 py-1 mr-1 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded hover:bg-yellow-200" onClick={() => handleEdit(project)}>Edit</button>

                {/* <button id={project._id} className="border rounded mr-1 p-1" onClick={handleDelete}>delete</button> */}
                <button
                  className="px-3 py-1 bg-red-100 text-red-800 border border-red-300 rounded hover:bg-red-200"
                  onClick={() => handleDelete(project._id)}
                >
                  delete
                </button>
              </div>
            ))}
          </>
        ): <p className="text-center font-semibold text-orange-800 italic mt-2"> There are no active projects.</p>}
      </div>
    </main>
  );
}

export default ProjectsPage;
