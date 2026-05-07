import { FaPen, FaTrash } from "react-icons/fa";
import MacCard from "./MacCard";
import Button from "./Button";
import { FaExternalLinkAlt } from "react-icons/fa";
import { formatDateRangeLabel } from "../utils/dateRange";

const ExperienceItem = ({
  role = "",
  company = "",
  location = "",
  employmentType = "",
  startDate = "",
  endDate = "",
  isCurrent = false,
  isAdmin = false,
  description = "",
  highlights = [],
  stack = [],
  companyUrl = "",
  logoUrl = "",
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
        <div className="flex flex-row w-full gap-4 p-2 md:p-4 text-left">
          <div className="flex flex-col w-full items-center">
            <div className="flex w-full flex-col md:flex-row items-center gap-4 md:gap-6 justify-center">
              <div className="flex flex-none md:flex-col w-fit justify-center items-center">
                <img
                  src={logoUrl}
                  alt={`${company} logo`}
                  className="w-20 md:w-28 h-auto my-2 rounded-md"
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-sm flex-none uppercase tracking-[0.25em] text-brand-mac_close dark:text-brand-mac_minimize">
                  {employmentType}
                </p>
                <h2 className="text-xl md:text-2xl">
                  {role}{" "}
                  <div className="text-brand-mac_close md:inline justify-center text-center dark:text-brand-mac_minimize ">
                    ×
                  </div>{" "}
                  {company}
                </h2>
                {isCurrent ? (
                  <p className="text-sm md:text-base lg:text-lg text-brand-dark_txt_accent dark:text-brand-github italic px-1 mt-2 md:mt-0">
                    {formatDateRangeLabel(`${startDate}|`)}
                  </p>
                ) : (
                  <p className="text-sm md:text-base lg:text-lg text-brand-dark_txt_accent dark:text-brand-github italic px-1 mt-2 md:mt-0">
                    {formatDateRangeLabel(`${startDate}|${endDate}`)}
                  </p>
                )}
                {companyUrl && (
                  <Button
                    link={companyUrl}
                    external={true}
                    className="out-button w-fit px-5 py-2 inline-flex items-center"
                  >
                    <FaExternalLinkAlt className="mr-2 h-3.5 w-3.5" /> Visit
                    Company
                  </Button>
                )}
              </div>
            </div>
            <div className="flex flex-col mt-2 md:px-4 w-full">
              <div className="mt-2 dark:bg-brand-dark_accent/40 py-4 border-brand-border_dark/80 dark:border-brand-border_light rounded-xl">
                <p className="mb-2 mt-2 text-center md:text-left text-sm uppercase tracking-[0.25em] text-brand-mac_close dark:text-brand-mac_minimize">
                  Impact
                </p>

                <p className="text-base md:text-lg leading-relaxed font-bold">
                  {description}
                </p>

                {highlights?.length > 0 && (
                  <ul className="mt-4 flex flex-col gap-3 text-base md:text-lg pb-2">
                    {highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 leading-relaxed md:pl-6 md:pr-24"
                      >
                        <span className="mt-2 h-2 w-2 flex-none rounded-full bg-brand-mac_close dark:bg-brand-mac_minimize" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mt-4">
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm md:text-base lg:text-lg text-end text-brand-dark_txt_accent dark:text-brand-github italic mx-4 mt-2 md:mt-0">
          {location}
        </p>
      </MacCard>
    </article>
  );
};

export default ExperienceItem;