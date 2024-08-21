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
    <Dialog
      open={isOpen}
      onClose={onReset}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 380,
          borderRadius: "2px",
          boxShadow: "0px 4px 10px 2px #0000001A",
        },
      }}
    >
      <Stack padding={4} gap={4} alignItems="center">
        <Typography fontSize={40}>Success</Typography>
        <Button onClick={onReset} autoFocus>
          Reset form
        </Button>
      </Stack>
    </Dialog>
  );
}
