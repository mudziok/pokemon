import { timeSchema } from "@/data/time/schema";

export const getTime = async () => {
  const response = await fetch(
    "https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Warsaw"
  );
  const time = timeSchema.parse(await response.json());
  return time;
};
