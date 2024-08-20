import { Container } from "@mui/material";
import { CreateTrainerForm } from "@/app/CreateTrainerForm";

export default function Home() {
  return (
    <main>
      <Container maxWidth="sm">
        <CreateTrainerForm />
      </Container>
    </main>
  );
}
