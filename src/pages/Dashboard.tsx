import { useEffect, useState } from "react";
import api from "../api/axios";

// Shape of a project object from the API
interface Project {
  id: number;
  title: string;
  description: string;
}

function Dashboard() {
  // State to store the list of projects
  const [projects, setProjects] = useState<Project[]>([]);

  // State for UI feedback
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch projects from the API when the component first loads
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");
        setProjects(response.data);
      } catch (error) {
        // Show inline error instead of alert()
        setError("Failed to load projects");
      } finally {
        // Always turn off loading when request is done
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); // Empty array means this runs once on mount

  return (
    // Full page layout with light gray background
    <div className="min-h-screen bg-gray-100">

      {/* Main content area */}
      <main className="max-w-5xl mx-auto px-6 py-8">

        {/* Page title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Projects</h2>

        {/* Loading state */}
        {loading && (
          <p className="text-gray-500 text-center py-12">Loading projects...</p>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Empty state — shows when there are no projects */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">No projects yet</p>
            <p className="text-sm mt-1">Create your first project to get started</p>
          </div>
        )}

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (

            // Project card
            <div
              key={project.id}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition duration-200 cursor-pointer"
            >
              {/* Project title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {project.title}
              </h3>

              {/* Project description */}
              <p className="text-gray-500 text-sm line-clamp-3">
                {project.description}
              </p>
            </div>

          ))}
        </div>

      </main>
    </div>
  );
}

export default Dashboard;