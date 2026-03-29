"use client";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { teal } from "@mui/material/colors";
import LightPurpleTextField from "@/app/LightPurpleTextField";
import { useLanguage } from "@/app/LanguageContext";
import { submitToWeb3FormsContact } from "@/lib/web3forms-submit";

/** MUI variant of the contact form; submits to the same Web3Forms key(s) as {@link ContactForm}. */
export default function MuiContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    senderName: "",
    email: "",
    message: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const { senderName, email, message } = formData;
    setIsFormValid(
      senderName.trim() !== "" && email.trim() !== "" && message.trim() !== ""
    );
  }, [formData]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      const timer = setTimeout(() => {
        setIsSubmitSuccessful(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitSuccessful]);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError(null);
    const form = new FormData(event.target);
    form.append("subject", "Normal Inquiry - " + formData.senderName);
    const object = Object.fromEntries(form);

    try {
      const result = await submitToWeb3FormsContact(object);
      if (result.success) {
        setIsSubmitSuccessful(true);
      } else {
        setSubmitError("Could not send. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please try again.");
    }
  }

  if (isSubmitSuccessful) {
    return (
      <div style={{ textAlign: "center" }}>
        <CheckCircleIcon sx={{ fontSize: 100 }} color="success" />
        <Typography color={teal[900]}>
          <strong>{t("contact.form.success")}</strong>
        </Typography>
      </div>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <LightPurpleTextField
            formData={formData}
            handleChange={handleChange}
            inputName="senderName"
            placeTxt={t("contact.form.name")}
            placeholder={t("contact.form.placeholder")}
          />
        </Grid>
        <Grid item xs={12}>
          <LightPurpleTextField
            formData={formData}
            handleChange={handleChange}
            inputName="email"
            placeTxt={t("contact.form.email")}
            placeholder={t("contact.form.placeholder")}
          />
        </Grid>
        <Grid item xs={12}>
          <LightPurpleTextField
            formData={formData}
            handleChange={handleChange}
            inputName="message"
            placeTxt={t("contact.form.content")}
            placeholder={t("contact.form.placeholder")}
          />
        </Grid>
        {submitError ? (
          <Grid item xs={12}>
            <Typography color="error" variant="body2" role="alert">
              {submitError}
            </Typography>
          </Grid>
        ) : null}
        <Grid item xs={12} container justifyContent="center" alignItems="center">
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "60vw",
              background: isFormValid ? "#f97316" : "#fed7aa",
              padding: 1,
              margin: 2,
              color: "#FFFFFF",
              fontWeight: "bold",
              "&:hover": { background: isFormValid ? "#ea580c" : "#fed7aa" },
              "&:disabled": { background: "#fed7aa", color: "#FFFFFF", opacity: 0.7 },
            }}
            disabled={!isFormValid}
          >
            {t("contact.form.submit")}
          </Button>
        </Grid>
        <Grid item xs={12} container justifyContent="center" alignItems="center">
          <input type="hidden" name="from_name" value="Client" readOnly />
        </Grid>
      </Grid>
    </form>
  );
}
