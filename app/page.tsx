import { Container, Paper } from "@mui/material";
import { CreateTrainerForm } from "@/app/CreateTrainerForm";

export default function Home() {
  return (
    <main>
      <Container maxWidth="sm">
        <Paper variant="outlined" sx={{ padding: 4 }}>
          <CreateTrainerForm />
        </Paper>
      </Container>
    </main>
  );
}
