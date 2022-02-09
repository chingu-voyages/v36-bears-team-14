import dayjs from "dayjs";

export const formatDate = (rawDate: string): string => {
  return dayjs(rawDate).format("MMM DD YYYY HH:mm");
};
