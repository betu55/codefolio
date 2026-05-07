const rangeFormatter = new Intl.DateTimeFormat("en-CA", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

export const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const parseDateKey = (value) => {
  if (!value || !isoDatePattern.test(value)) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const serializeDateRange = (startDate, endDate) => {
  if (!startDate && !endDate) {
    return "";
  }

  const start = startDate ? formatDateKey(startDate) : "";
  const end = endDate ? formatDateKey(endDate) : "";
  return `${start}|${end}`;
};

export const parseDateRange = (value) => {
  if (!value || typeof value !== "string") {
    return { startDate: null, endDate: null };
  }

  const [startValue = "", endValue = ""] = value.split("|");
  return {
    startDate: parseDateKey(startValue),
    endDate: parseDateKey(endValue),
  };
};

export const formatDateRangeLabel = (value, fallback = "Select date range") => {
  const { startDate, endDate } = parseDateRange(value);

  if (!startDate && !endDate) {
    return fallback;
  }

  if (startDate && !endDate) {
    return `${rangeFormatter.format(startDate)} - Present`;
  }

  if (!startDate && endDate) {
    return rangeFormatter.format(endDate);
  }

  const startLabel = rangeFormatter.format(startDate);
  const endLabel = rangeFormatter.format(endDate);

  if (startLabel === endLabel) {
    return startLabel;
  }

  return `${startLabel} - ${endLabel}`;
};
