import Typography from "@mui/material/Typography";
import {Container} from "@mui/system";
import ContactForm from "./ContactForm";

export default function ContactUs() {
  return (
    <Container sx={{ bgcolor: "none", p: 6 }}>
      <Typography
        variant="h4"
        gutterBottom
        color={"#FFFFFF"}
        fontWeight="700"
        sx={{ paddingTop: 3 }}
        align="center"
      >
          {"Contact Us"}
      </Typography>

      <Typography
        variant="h6"
        gutterBottom
        color={"#FFFFFF"}
        fontWeight="700"
        sx={{ paddingTop: 3 }}
        align="center"
      >
        {"Please leave a message, we will get back to you as soon as possible."}
      </Typography>

      <ContactForm />
    </Container>
  );
}
