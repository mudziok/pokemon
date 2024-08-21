import { Typography } from "@mui/material";

export const Clock = ({ date }: { date: Date }) => {
  return (
    <Typography fontSize={12}>
      {date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })}
    </Typography>
  );
};
