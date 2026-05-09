import { useEffect, useState } from "react";
import { FaPlus} from "react-icons/fa";
import ProjectItem from "../components/ProjectItem.jsx";
import Button from "../components/Button.jsx";
import DateRangePicker from "../components/DateRangePicker.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { API_BASE_URL } from "../utils/api.js";


const emptyProjectForm = {
  name: "",
  description: "",
  status: "",
  githubUrl: "",
  liveUrl: "",
  stack: "",
  dateWorkedOn: "",
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState(emptyProjectForm);

  const isAdmin = Boolean(localStorage.getItem("adminToken"));

  const fetchProjects = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setProjects(data);
      console.log("Fetched projects:", data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddProjectModal = () => {
    setEditingProject(null);
    setProjectForm(emptyProjectForm);
    setIsModalOpen(true);
  };

  const openEditProjectModal = (project) => {
    setEditingProject(project);
    setProjectForm({
      name: project.name || "",
      description: project.description || "",
      status: project.status || "",
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      stack: project.stack?.join("/ ") || "",
      dateWorkedOn: project.dateWorkedOn || "",
    });
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setProjectForm(emptyProjectForm);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProjectForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmitProject = async (event) => {
    event.preventDefault();

    const projectPayload = {
      ...projectForm,
      stack: projectForm.stack
        .split("/")
        .map((tech) => tech.trim())
        .filter(Boolean),
    };

    const url = editingProject
      ? `${API_BASE_URL}/api/projects/${editingProject.id}`
      : `${API_BASE_URL}/api/projects`;

    const method = editingProject ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(projectPayload),
      });

      if (!response.ok) {
        throw new Error("Project save failed");
      }

      await fetchProjects();
      closeProjectModal();
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    const shouldDelete = window.confirm(
      "Delete this project? This cannot be undone."
    );

    if (!shouldDelete) return;

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Project delete failed");
      }

      await fetchProjects();

    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <div className="main-container main-container-start gap-6 px-4 md:px-8 py-6">
      <section className="w-full max-w-6xl text-left">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Projects</h1>
        <p className="text-lg md:text-xl leading-none max-w-3xl">
          A collection of projects I have worked on, focused on clean
          interfaces, practical features, and maintainable code.
        </p>
      </section>

      <section className="w-full max-w-6xl flex flex-col gap-5">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          projects.map((project) => (
            <ProjectItem
              key={project.id}
              id={project.id}
              title={project.name}
              description={project.description}
              stack={project.stack}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              status={project.status}
              date={project.dateWorkedOn}
              isAdmin={isAdmin}
              onEdit={() => openEditProjectModal(project)}
              onDelete={() => handleDeleteProject(project.id)}
            />
          ))
        )}
      </section>

      {isAdmin && (
        <Button
          className="out-button w-10 h-10 inline-flex items-center justify-center"
          onClick={openAddProjectModal}
        >
          <FaPlus />
        </Button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <form
            onSubmit={handleSubmitProject}
            className="relative w-full max-w-2xl h-5/6 overflow-y-auto rounded-2xl border border-brand-border_dark dark:border-brand-border_light bg-brand-light_bg dark:bg-brand-dark_bg p-5 text-left shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-5">
              {editingProject ? "Edit Project" : "Add Project"}
            </h2>

            <div className="grid gap-4">
              <Button
                onClick={closeProjectModal}
                className="delete-btn absolute right-5 top-5 px-4 py-4"
              >
                ×
              </Button>

              <label className="flex flex-col gap-2">
                Project name
                <input
                  name="name"
                  value={projectForm.name}
                  onChange={handleInputChange}
                  className="rounded-xl border border-brand-border_dark dark:border-brand-border_light bg-transparent px-4 py-2"
                  required
                />
              </label>

              <label className="flex flex-col gap-2">
                Status
                <input
                  name="status"
                  value={projectForm.status}
                  onChange={handleInputChange}
                  placeholder="Full Stack, Frontend, Developer Tool..."
                  className="rounded-xl border border-brand-border_dark dark:border-brand-border_light bg-transparent px-4 py-2"
                />
              </label>

              <label className="flex flex-col gap-2">
                Description
                <textarea
                  name="description"
                  value={projectForm.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="rounded-xl border border-brand-border_dark dark:border-brand-border_light bg-transparent px-4 py-2"
                  required
                />
              </label>

              <div className="flex flex-col gap-2">
                <DateRangePicker
                  label="Date range"
                  value={projectForm.dateWorkedOn}
                  onChange={(nextValue) =>
                    setProjectForm((currentForm) => ({
                      ...currentForm,
                      dateWorkedOn: nextValue,
                    }))
                  }
                  placeholder="Select the project timeline"
                />
              </div>

              <label className="flex flex-col gap-2">
                Tech stack ('/' separated)
                <input
                  name="stack"
                  value={projectForm.stack}
                  onChange={handleInputChange}
                  placeholder="React/ Spring Boot/ MySQL"
                  className="rounded-xl border border-brand-border_dark dark:border-brand-border_light bg-transparent px-4 py-2"
                />
              </label>

              <label className="flex flex-col gap-2">
                GitHub URL
                <input
                  name="githubUrl"
                  value={projectForm.githubUrl}
                  onChange={handleInputChange}
                  className="rounded-xl border border-brand-border_dark dark:border-brand-border_light bg-transparent px-4 py-2"
                />
              </label>

              <label className="flex flex-col gap-2">
                Live URL
                <input
                  name="liveUrl"
                  value={projectForm.liveUrl}
                  onChange={handleInputChange}
                  className="rounded-xl border border-brand-border_dark dark:border-brand-border_light bg-transparent px-4 py-2"
                />
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeProjectModal}
                className="out-button px-5 py-2"
              >
                Cancel
              </button>
              <button type="submit" className="out-button px-5 py-2">
                {editingProject ? "Save Changes" : "Add Project"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Projects;
