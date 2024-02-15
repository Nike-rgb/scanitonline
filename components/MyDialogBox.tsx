import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Heading, Regular } from "@/theme/Typography";
import styled from "styled-components";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 15,
    padding: 10,
    margin: 18,
    maxWidth: 400,
  },
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
}));

export default function MyDialogBox(props: {
  open: boolean;
  title: string;
  content: string;
  actions: React.ReactNode;
}) {
  return (
    <>
      <BootstrapDialog
        open={props.open}
        aria-labelledby="alert box"
        aria-describedby="Load the last saved images">
        <DialogTitle>
          <Heading size={17}>{props.title}</Heading>
        </DialogTitle>
        <DialogContent>
          <Regular size={13}>{props.content}</Regular>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "start", paddingLeft: 2 }}>
          {props.actions}
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
