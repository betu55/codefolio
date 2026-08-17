import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import ExperienceItem from "../components/ExperienceItem.jsx";
import Button from "../components/Button.jsx";
import Dropdown from "../components/Dropdown.jsx";
import DateRangePicker from "../components/DateRangePicker.jsx";
import { formatDateKey, parseDateKey, parseDateRange } from "../utils/dateRange";
import { API_BASE_URL } from "../utils/api.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const emptyExperienceForm = {
  role: "",
  company: "",
  location: "",
  employmentType: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  orderIndex: 10,
  description: "",
  highlights: "",
  stack: "",
  companyUrl: "",
  logoUrl: "",
};

const Experience = () => { 

  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [experienceForm, setExperienceForm] = useState(emptyExperienceForm);

  const isAdmin = Boolean(localStorage.getItem("adminToken"));

  const fetchExperiences = async () => {
    setIsLoading(true);

    try{
      const response = await fetch(`${API_BASE_URL}/api/experiences`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setExperiences(data);
      console.log("Fetched experiences:", data);
    } catch (error) {
      console.error("Failed to fetch experiences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=> {
    fetchExperiences();
  }, []);

  const openAddExperienceModal = () => {
    setEditingExperience(null);
    setExperienceForm(emptyExperienceForm);
    setIsModalOpen(true);
  }

  const openEditExperienceModal = (experience) => {
    setEditingExperience(experience);
    setExperienceForm({
      role: experience.role || "",
      company: experience.company || "",
      location: experience.location || "",
      employmentType: experience.employmentType || "",
      startDate: experience.startDate || "",
      endDate: experience.endDate || "",
      isCurrent: experience.isCurrent || false,
      orderIndex: experience.orderIndex || 10,
      description: experience.description || "",
      highlights: experience.highlights?.join("/ ") || "",
      stack: experience.stack?.join("/ ") || "",
      companyUrl: experience.companyUrl || "",
      logoUrl: experience.logoUrl || "",
    });
    setIsModalOpen(true);
  }

  const closeExperienceModal = () => {
    setIsModalOpen(false);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExperienceForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  const handleSubmitExperience = async (e) => {
    e.preventDefault();

    const experiencePayload = {
      ...experienceForm,
      orderIndex: Number(experienceForm.orderIndex),
      startDate: experienceForm.startDate
        ? formatDateKey(parseDateKey(experienceForm.startDate))
        : "",
      endDate: experienceForm.endDate
        ? formatDateKey(parseDateKey(experienceForm.endDate))
        : "",
      highlights: experienceForm.highlights
        .split("/")
        .map((h) => h.trim())
        .filter(Boolean),
      stack: experienceForm.stack
        .split("/")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    const url = editingExperience
      ? `${API_BASE_URL}/api/experiences/${editingExperience.id}`
      : `${API_BASE_URL}/api/experiences`;

    const method = editingExperience ? "PUT" : "POST";

    try{
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(experiencePayload),
      });

      if (!response.ok) {
        throw new Error("Failed to save experience");
      }

      await fetchExperiences();
      closeExperienceModal();
    } catch (error) {
      console.error("Failed to save experience:", error);
    }
  };

  const handleDeleteExperience = async (experienceId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this experience?");

    if (!confirmDelete) {
      return;
    }

    try{
      const response = await fetch(`${API_BASE_URL}/api/experiences/${experienceId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete experience");
      }

      await fetchExperiences();

    }catch (error) {
      console.error("Failed to delete experience:", error);
    }
  }

  return (
    <div className="main-container main-container-start gap-6 px-4 md:px-8 py-6">
      <section className="w-full max-w-6xl text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Experience</h1>
        <p className="text-lg md:text-xl leading-none max-w-4xl">
          A summary of my professional experience that has shaped my journey as
          a software developer.
        </p>
      </section>

      <section className="w-full max-w-6xl flex flex-col gap-5">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          experiences.map((exp) => (
            <ExperienceItem
              key={exp.id}
              role={exp.role}
              company={exp.company}
              location={exp.location}
              employmentType={exp.employmentType}
              startDate={exp.startDate}
              endDate={exp.endDate}
              isCurrent={exp.isCurrent}
              description={exp.description}
              highlights={exp.highlights}
              stack={exp.stack}
              companyUrl={exp.companyUrl}
              logoUrl={exp.logoUrl}
              isAdmin={isAdmin}
              onEdit={() => openEditExperienceModal(exp)}
              onDelete={() => handleDeleteExperience(exp.id)}
            />
          ))
        )}
      </section>

      {isAdmin && (
        <Button
          className="out-button w-10 h-10 inline-flex items-center justify-center"
          onClick={openAddExperienceModal}
        >
          <FaPlus />
        </Button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="relative w-full max-w-2xl h-5/6 mt-auto">
            <Button
              onClick={closeExperienceModal}
              className="delete-btn absolute right-6 top-6 z-30 flex h-10 w-10 items-center justify-center"
            >
              ×
            </Button>
            <form
              onSubmit={handleSubmitExperience}
              className="relative w-full max-w-2xl h-5/6 overflow-y-auto rounded-2xl border border-brand-border_dark dark:border-brand-border_light bg-brand-light_bg dark:bg-brand-dark_bg p-6 text-left shadow-xl"
            >
              <h2 className="text-2xl font-bold mb-5">
                {editingExperience ? "Edit Experience" : "Add Experience"}
              </h2>

              <div className="grid gap-4">
                <div className="flex flex-row gap-4">
                  <label className="flex w-5/6 flex-col gap-2">
                    Role
                    <input
                      name="role"
                      value={experienceForm.role}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    Order index
                    <Dropdown
                      options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(String)}
                      value={experienceForm.orderIndex}
                      onSelect={(value) =>
                        setExperienceForm((currentForm) => ({
                          ...currentForm,
                          orderIndex: parseInt(value, 10),
                        }))
                      }
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-2">
                  Company
                  <input
                    name="company"
                    value={experienceForm.company}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </label>

                <label className="flex flex-col gap-2">
                  Location
                  <input
                    name="location"
                    value={experienceForm.location}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  Employment Type
                  <Dropdown
                    value={experienceForm.employmentType}
                    options={[
                      "Full-time",
                      "Full-time (contract)",
                      "Part-time",
                      "Part-time (contract)",
                      "Internship",
                      "Apprenticeship",
                      "Volunteer",
                    ]}
                    onSelect={(value) =>
                      setExperienceForm((currentForm) => ({
                        ...currentForm,
                        employmentType: value,
                      }))
                    }
                  />
                </label>

                <label className="flex items-center w-fit gap-2 hover:cursor-pointer">
                  <span className="relative inline-flex items-center justify-center">
                    <input
                      type="checkbox"
                      name="isCurrent"
                      checked={experienceForm.isCurrent}
                      className="w-7 h-7 p-2accent-brand-mac_minimize appearance-none border rounded-lg border-brand-border_dark dark:border-brand-border_light checked:bg-brand-mac_minimize checked:border-brand-mac_minimize focus:outline-none focus:ring-2 focus:ring-brand-mac_minimize/50 hover:cursor-pointer transition-colors duration-100 peer"
                      onChange={(e) =>
                        setExperienceForm((currentForm) => ({
                          ...currentForm,
                          isCurrent: e.target.checked,
                          endDate: e.target.checked ? "" : currentForm.endDate,
                        }))
                      }
                    />
                    <span className="pointer-events-none w-7 h-7 mx-auto my-auto absolute inset-0 hidden items-center justify-center text-brand-dark_txt peer-checked:flex font-bold">
                      ✓
                    </span>
                  </span>
                  <span className="text-base">I currently work here</span>
                </label>

                <div className="flex flex-col gap-2">
                  <DateRangePicker
                    label="Date range"
                    value={`${experienceForm.startDate || null}|${experienceForm.endDate || null}`}
                    onChange={(nextValue) => {
                      const { startDate, endDate } = parseDateRange(nextValue);

                      setExperienceForm((currentForm) => ({
                        ...currentForm,
                        startDate: startDate ? formatDateKey(startDate) : "",
                        endDate: endDate ? formatDateKey(endDate) : "",
                      }));
                    }}
                    placeholder="Select employment timeline"
                  />
                </div>

                <label className="flex flex-col gap-2">
                  Description
                  <textarea
                    name="description"
                    value={experienceForm.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="input-field min-h-32 resize-y"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  Highlights ('/' separated)
                  <textarea
                    name="highlights"
                    value={experienceForm.highlights}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Led a team of 5 developers/ Improved performance by 30%..."
                    className="input-field min-h-32 resize-y"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  Tech Stack ('/' separated)
                  <input
                    name="stack"
                    value={experienceForm.stack}
                    onChange={handleInputChange}
                    placeholder="React/ Spring Boot/ MySQL"
                    className="input-field"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  Company URL
                  <input
                    name="companyUrl"
                    value={experienceForm.companyUrl}
                    onChange={handleInputChange}
                    placeholder="https://www.example.com"
                    className="input-field"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  Logo URL
                  <input
                    name="logoUrl"
                    value={experienceForm.logoUrl}
                    onChange={handleInputChange}
                    placeholder="https://www.example.com/logo.png"
                    className="input-field"
                  />
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button
                  onClick={closeExperienceModal}
                  className="out-button px-5 py-2"
                >
                  Cancel
                </Button>
                <Button type="submit" className="out-button px-5 py-2">
                  {editingExperience ? "Save Changes" : "Add Experience"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;
