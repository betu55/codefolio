import { FaPen, FaTrash, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import MacCard from "./MacCard";
import { formatDateRangeLabel } from "../utils/dateRange";

const ProjectItem = ({
  title,
  description,
  stack = [],
  githubUrl,
  liveUrl,
  status = "Featured",
  isAdmin = false,
  date = "",
  onEdit,
  onDelete,
}) => {
  const headerActions = isAdmin ? (
    <>
      <button
        type="button"
        title="Edit project"
        aria-label="Edit project"
        onClick={onEdit}
        className="edit-btn"
      >
        <FaPen className="text-[12px]" />
      </button>
      <button
        type="button"
        title="Delete project"
        aria-label="Delete project"
        onClick={onDelete}
        className="delete-btn"
      >
        <FaTrash className="text-[12px]" />
      </button>
    </>
  ) : null;

  return (
    <article className="w-full">
      <MacCard headerActions={headerActions}>
        <div className="flex flex-col gap-6 p-3 md:p-7 text-left">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-brand-mac_close dark:text-brand-mac_minimize mb-2">
                {status}
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
            </div>

            {(githubUrl || liveUrl) && (
              <div className="flex flex-wrap gap-3">
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="out-button px-8 py-1 inline-flex"
                  >
                    <FaExternalLinkAlt className="mr-2 h-3.5 w-3.5" /> Live Demo
                  </a>
                )}

                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="out-button px-8 py-1 inline-flex"
                  >
                    <FaGithub className="mr-2 h-5 w-5" /> GitHub
                  </a>
                )}
              </div>
            )}
          </div>

          <p className="text-base md:text-lg leading-relaxed max-w-4xl">
            {description}
          </p>

          {stack.length > 0 && (
            <div className="md:flex justify-between">
              <div className="flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-brand-border_dark dark:border-brand-border_light px-4 py-1 text-sm md:text-base"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {date !== "" && (
                <p className="text-sm md:text-base lg:text-lg text-brand-dark_txt_accent text-end italic px-1 mt-2 md:mt-0">
                  {formatDateRangeLabel(date, date)}
                </p>
              )}
            </div>
          )}
        </div>
      </MacCard>
    </article>
  );
};

export default ProjectItem;
