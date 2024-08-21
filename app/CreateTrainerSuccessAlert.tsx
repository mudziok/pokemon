import { Button } from "@/components/Button/Button";
import { Dialog, Stack, Typography } from "@mui/material";

export function CreateTrainerSuccessAlert({
  isOpen,
  onReset,
}: {
  isOpen: boolean;
  onReset: () => void;
}) {
  return (
    <Dialog open={isOpen} onClose={onReset}>
      <Stack padding={4} gap={4} minWidth={380} alignItems="center">
        <Typography fontSize={40}>Success</Typography>
        <Button onClick={onReset} autoFocus>
          Reset form
        </Button>
      </Stack>
    </Dialog>
  );
}
