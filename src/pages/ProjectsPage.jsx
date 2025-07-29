import { useState, useEffect } from "react";
import { backendClient } from "../client/backendClient";

function ProjectsPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await backendClient.get("/projects", {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("protasker-token")
            )}`,
          },
        });

        setProjects(res.data);
      } catch (error) {}
    };
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await backendClient.post(
        "/projects",
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("protasker-token")
            )}`,
          },
        }
      );
      setProjects((prev) => [...prev, res.data]);
      setName(" ");
      setDescription(" ");
    //   console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="max-w-md mx-auto p-4">
      <div className="mb-4">
        {projects.length > 0 && (
          <>
            <h2 className="font-bold text-xl mb-1 mt-4">Project List:</h2>
            {projects.map((project) => (
              <div key={project._id}>
                <h4 className="underline text-blue-600 font-bold">
                  {project.name}
                </h4>
                <p>{project.description}</p>
                <button>edit</button>
                <button>delete</button>
              </div>
            ))}
          </>
        )}
      </div>

      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" />
          <input
            className="border rounded px-3 py-2 w-full"
            type="text"
            name="name"
            placeholder="Project Name"
            onChange={(e) => setName(e.target.value)}
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
          />
        </div>

        <input
          className="border bg-sky-100 font-bold rounded p-1 text-blue-800"
          type="submit"
          value="Add Project"
        />
      </form>
    </main>
  );
}

export default ProjectsPage;
