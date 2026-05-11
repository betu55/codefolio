import { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/api.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import Button from "../components/Button.jsx";
import Dropdown from "../components/Dropdown.jsx";
import DateRangePicker from "../components/DateRangePicker.jsx";
import { FaPlus, FaPen, FaTrash } from "react-icons/fa";

const emptyJobForm = {
  role: "",
  company: {
    name: "",
    location: "",
    logoUrl: "",
    companyUrl: "",
  },
  employmentType: "",
  status: "",
  dateApplied: "",
  applicationDeadline: "",
  jobUrl: "",
  updates: "",
};

const JobTracker = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobForm, setJobForm] = useState(emptyJobForm);

  const isAdmin = Boolean(localStorage.getItem("adminToken"));

  // Fetch jobs from the backend API
  const fetchJobs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/job-tracker`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const openAddJobModal = () => {
    setEditingJob(null);
    setJobForm(emptyJobForm);
    setIsModalOpen(true);
  }

  const openEditJobModal = (job) => {
    setEditingJob(job);
    setJobForm({
      role: job.role || "",
      company: job.company || "",
      employmentType: job.employmentType || "",
      status: job.status || "",
      dateApplied: job.dateApplied || "",
      applicationDeadline: job.applicationDeadline || "",
      jobUrl: job.jobUrl || "",
      updates: job.updates?.join("/ ") || "",
    });
    setIsModalOpen(true);
  }

  const closeJobModal = () => {
    setIsModalOpen(false);
    setEditingJob(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;

    setJobForm((currentForm) => ({
      ...currentForm,
      company: {
        ...currentForm.company,
        [name]: value,
      },
    }));
  };

  const handleSubmitJob = async (e) => {
    e.preventDefault();

    const jobPayload = {
      ...jobForm,
      dateApplied: jobForm.dateApplied || null,
      applicationDeadline: jobForm.applicationDeadline || null,
      updates: jobForm.updates
        ? jobForm.updates
          .split("/")
          .map((update) => update.trim())
          .filter(Boolean)
        : [],
    };

    const url = editingJob
      ? `${API_BASE_URL}/api/job-tracker/${editingJob.id}`
      : `${API_BASE_URL}/api/job-tracker`;

    const method = editingJob ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(jobPayload),
      });

      if (!response.ok) {
        throw new Error("Failed to save job.");
      }

      await fetchJobs();
      closeJobModal();
    } catch (error) {
      console.error("Failed to submit job:", error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try{
      const response = await fetch(`${API_BASE_URL}/api/job-tracker/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete job.");
      }

      await fetchJobs();

    }catch (error) {
      console.error("Failed to delete job:", error);
    }
  }

  return (
    <div className="w-full min-w-0 max-w-full">
      <div className="main-container main-container-start gap-6 px-4 md:px-8 py-6">
        <section className="w-full max-w-5/6 text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Job Tracker</h1>
          <p className="text-lg md:text-xl leading-none">
            Here lies the chronological saga of my job applications, a testament
            to my relentless hunt
          </p>
        </section>
        <div className="w-full max-w-full overflow-x-auto rounded-xl border border-brand-border_dark dark:border-brand-border_light">
          <table className="w-full min-w-[950px] border-collapse text-left">
            <thead className="bg-brand-mac_maximize dark:bg-brand-mac_minimize/50 rounded-xl">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em]">
                  Actions
                </th>
                <th className="px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em]">
                  Status
                </th>
                <th className="px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em]">
                  Role
                </th>

                <th className="px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em]">
                  Company
                </th>

                <th className="px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em]">
                  Location
                </th>

                <th className="px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em]">
                  Type
                </th>

                <th className="px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em]">
                  Applied?
                </th>

                <th className="px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em]">
                  Deadline
                </th>

                <th className="px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em]">
                  Link
                </th>
              </tr>
            </thead>

            {isLoading ? (
              <tbody>
                <tr>
                  <td colSpan="9">
                    <LoadingSpinner />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {jobs.map((job, index) => (
                  <tr
                    key={job.id}
                    className={
                      index % 2 === 0
                        ? "bg-brand-light_bg dark:bg-brand-dark_bg"
                        : "bg-brand-mac_maximize/40 dark:bg-brand-mac_minimize/10"
                    }
                  >
                    <td className="px-4 py-4 align-center">
                      {isAdmin && (
                        <div className="flex flex-row gap-2">
                          <button
                            type="button"
                            title="Edit job"
                            aria-label="Edit job"
                            onClick={() => openEditJobModal(job)}
                            className="edit-btn inline-flex h-8 w-8 items-center justify-center"
                          >
                            <FaPen className="text-[12px]" />
                          </button>

                          <button
                            type="button"
                            title="Delete job"
                            aria-label="Delete job"
                            onClick={() => handleDeleteJob(job.id)}
                            className="delete-btn inline-flex h-8 w-8 items-center justify-center"
                          >
                            <FaTrash className="text-[12px]" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={
                          job.status === "Accepted"
                            ? "rounded-xl border border-brand-accepted dark:border-brand-accepted/50 px-3 py-1 text-sm text-brand-accepted dark:text-brand-accepted/90"
                            : job.status === "Rejected"
                              ? "rounded-xl border border-brand-rejected dark:border-brand-rejected/50 px-3 py-1 text-sm text-brand-rejected dark:text-brand-rejected/90"
                              : "rounded-xl border border-brand-pending dark:border-brand-pending/50 px-3 py-1 text-sm text-brand-pending dark:text-brand-pending/90"
                        }
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-medium">{job.role}</td>

                    <td className="px-4 py-4">{job.company?.name}</td>

                    <td className="px-4 py-4">{job.company?.location}</td>

                    <td className="px-4 py-4">{job.employmentType}</td>

                    <td className="px-4 py-4">
                      {job.dateApplied || "Not applied"}
                    </td>

                    <td className="px-4 py-4">
                      {job.applicationDeadline || "N/A"}
                    </td>

                    <td className="px-4 py-4">
                      {job.jobUrl ? (
                        <a
                          href={job.jobUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-mac_close dark:text-brand-mac_minimize underline"
                        >
                          View
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        {isAdmin && (
          <Button
            className="out-button w-10 h-10 inline-flex items-center justify-center mt-4"
            onClick={openAddJobModal}
          >
            <FaPlus />
          </Button>
        )}

        {/* Job Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="relative w-full max-w-2xl h-5/6">
              <Button
                type="button"
                onClick={closeJobModal}
                className="delete-btn absolute right-6 top-6 z-30 flex items-center justify-center"
              >
                ×
              </Button>
              <form
                onSubmit={handleSubmitJob}
                className="relative w-full h-full overflow-y-auto rounded-2xl border border-brand-border_dark dark:border-brand-border_light bg-brand-light_bg dark:bg-brand-dark_bg p-6 text-left shadow-xl"
              >
                <h2 className="text-2xl font-bold mb-5">
                  {editingJob ? "Edit Job" : "Add Job"}
                </h2>

                <div className="grid gap-4">
                  <div className="flex flex-colmd:flex-row gap-2 w-full">
                    <label className="flex w-3/4 flex-col gap-2">
                      Role
                      <input
                        name="role"
                        value={jobForm.role}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </label>

                    <label className="flex flex-col gap-2">
                      Application Status
                      <Dropdown
                        options={["Applied", "Accepted", "Rejected"]}
                        onSelect={(value) =>
                          setJobForm((currentForm) => ({
                            ...currentForm,
                            status: value,
                          }))
                        }
                      />
                    </label>
                  </div>

                  <div className="flex flex-col gap-4 p-4 border border-brand-border_dark/80 dark:border-brand-border_light rounded-xl">
                    <h2 className="text-xl text-brand-mac_minimize">
                      Company info
                    </h2>
                    <label className="flex w-full flex-col gap-2">
                      Company Name
                      <input
                        name="name"
                        value={jobForm.company?.name || ""}
                        onChange={handleCompanyChange}
                        className="input-field"
                        required
                      />
                    </label>

                    <label className="flex w-full flex-col gap-2">
                      Company Location
                      <input
                        name="location"
                        value={jobForm.company?.location || ""}
                        onChange={handleCompanyChange}
                        className="input-field"
                        placeholder="Address, City, Country, Postal Code"
                        required
                      />
                    </label>

                    <div className="flex flex-col md:flex-row gap-4">
                      <label className="flex w-full flex-col gap-2">
                        Company Url
                        <input
                          name="companyUrl"
                          value={jobForm.company?.companyUrl || ""}
                          onChange={handleCompanyChange}
                          className="input-field"
                          placeholder="https://www.example.com"
                          required
                        />
                      </label>
                      <label className="flex w-full flex-col gap-2">
                        Logo Url
                        <input
                          name="logoUrl"
                          value={jobForm.company?.logoUrl || ""}
                          onChange={handleCompanyChange}
                          className="input-field"
                          placeholder="https://www.example.com/logo.png"
                          required
                        />
                      </label>
                    </div>
                  </div>

                  <label className="flex flex-col gap-2">
                    Employment Type
                    <Dropdown
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
                        setJobForm((currentForm) => ({
                          ...currentForm,
                          employmentType: value,
                        }))
                      }
                    />
                  </label>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex w-full flex-col gap-2">
                      <DateRangePicker
                        mode="single"
                        label="Date Applied"
                        value={jobForm.dateApplied}
                        onChange={(nextValue) => {
                          setJobForm((currentForm) => ({
                            ...currentForm,

                            dateApplied: nextValue,
                          }));
                        }}
                        placeholder="Date Applied"
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2">
                      <DateRangePicker
                        mode="single"
                        label="Application Deadline"
                        value={jobForm.applicationDeadline}
                        onChange={(nextValue) => {
                          setJobForm((currentForm) => ({
                            ...currentForm,

                            applicationDeadline: nextValue,
                          }));
                        }}
                        placeholder="Application Deadline"
                      />
                    </div>
                  </div>

                  <label className="flex flex-col gap-2">
                    Job Posting Url
                    <input
                      name="jobUrl"
                      value={jobForm.jobUrl}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="https://www.example.com"
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    Updates ('/' separated)
                    <textarea
                      name="updates"
                      value={jobForm.updates}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Applied online / Recruiter responded / Sent follow-up email"
                      className="input-field min-h-32 resize-y"
                    />
                  </label>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <Button
                    onClick={closeJobModal}
                    className="out-button px-5 py-2"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="out-button px-5 py-2">
                    {editingJob ? "Save Changes" : "Add Job"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobTracker;
