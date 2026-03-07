import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  title: string;
  description: string;
}



function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);

const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        alert("Failed to load projects");}
    };
    fetchProjects();
  }, []);

  return (
    <div>
      <h2>My Projects</h2>
      {projects.map((project) => (
        <div key={project.id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
      ))}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;