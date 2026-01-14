"use client";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { teal } from "@mui/material/colors";
import LightPurpleTextField from "./LightPurpleTextField";
import { useLanguage } from './LanguageContext';

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    senderName: "",
    email: "",
    message: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  useEffect(() => {
    const { senderName, email, message } = formData;
    setIsFormValid(senderName.trim() !== "" && email.trim() !== "" && message.trim() !== "");
  }, [formData]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      const timer = setTimeout(() => {
        setIsSubmitSuccessful(false); // Reset the state to show the form again
      }, 3000); // 3 seconds

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [isSubmitSuccessful]);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    form.append("access_key", "cb229ca6-07dc-41c8-a2b2-99e9e6e287f5");
    form.append("subject", "Normal Inquiry - " + formData.senderName);

    const object = Object.fromEntries(form);
    const json = JSON.stringify(object);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });

    const result = await response.json();
    if (result.success) {
      setIsSubmitSuccessful(true);
    }
  }

  if (isSubmitSuccessful) {
    return (
      <div style={{ textAlign: "center" }}>
        <CheckCircleIcon sx={{ fontSize: 100 }} color="success" />
        <Typography color={teal[900]}>
          <strong>{t('contact.form.success')}</strong>
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
          placeTxt={t('contact.form.name')}
          placeholder={t('contact.form.placeholder')}
           />
        </Grid>
        <Grid item xs={12}>
     
          
          <LightPurpleTextField 
          formData={formData}
          handleChange={handleChange}
          inputName="email"
          placeTxt={t('contact.form.email')}
          placeholder={t('contact.form.placeholder')}
           />
        </Grid>
        <Grid item xs={12}>
       
            
        <LightPurpleTextField 
          formData={formData}
          handleChange={handleChange}
          inputName="message"        
          placeTxt={t('contact.form.content')}
          placeholder={t('contact.form.placeholder')}
           />
        </Grid>
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
              "&:disabled": { background: "#fed7aa", color: "#FFFFFF", opacity: 0.7 }
            }}
            disabled={!isFormValid}
          >
            {t('contact.form.submit')}
          </Button>
        </Grid>
        <Grid item xs={12} container justifyContent="center" alignItems="center">
          <input type="hidden" name="from_name" value="Client"></input>
        </Grid>
      </Grid>
    </form>
  );
}