import { Container, Stack } from "@mui/material";
import { Paper } from "@/components/Paper/Paper";
import { Clock } from "@/app/_components/Clock";
import { CreateTrainerFormWithQueries } from "@/app/_components/CreateTrainerFormWithQueries";
import { getTime } from "@/data/time/api";

export default async function Home() {
  const { dateTime } = await getTime();

  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <Stack
        sx={{ minHeight: { xs: "auto", sm: "100%" } }}
        justifyContent="center"
        paddingY={2}
      >
        <Paper sx={{ padding: 4 }}>
          <Stack gap={3} alignItems="flex-end">
            <Clock date={new Date(dateTime)} />
            <CreateTrainerFormWithQueries />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
