export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat("en-IL", {
    timeZone: "Asia/Jerusalem",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const partMap = parts.reduce(
    (acc, part) => {
      acc[part.type] = part.value;
      return acc;
    },
    {} as Record<string, string>,
  );

  return `${partMap.day}/${partMap.month}/${partMap.year} : ${partMap.hour}:${partMap.minute}:${partMap.second}`;
};
