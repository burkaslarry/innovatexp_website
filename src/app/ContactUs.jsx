"use client"
import Typography from "@mui/material/Typography";
import {Container} from "@mui/system";
import ContactForm from "./ContactForm";
import { useLanguage } from './LanguageContext';

export default function ContactUs() {
  const { t } = useLanguage();
  
  return (
    <Container sx={{ p: 6 }} className="bg-black">
      <Typography
        variant="h4"
        gutterBottom
        color={"#FFFFFF"}
        fontWeight="700"
        sx={{ paddingTop: 3 }}
        align="center"
      >
          {t('contact.title')}
      </Typography>

      <Typography
        variant="h6"
        gutterBottom
        color={"#FFFFFF"}
        fontWeight="700"
        sx={{ paddingTop: 3 }}
        align="center"
      >
        {t('contact.subtitle')}
      </Typography>

      <ContactForm />
    </Container>
  );
}
