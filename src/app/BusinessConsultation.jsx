"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Typography, TextField, MenuItem, CircularProgress, Box, Link } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { teal } from "@mui/material/colors";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useLanguage } from './LanguageContext';
import ErrorModal from './ErrorModal';

export default function BusinessConsultation() {
  const { t } = useLanguage();
  
  // Get today's date
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    consultationType: "",
    preferredDate: getTodayDate(),
    preferredTime: "",
    message: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [errors, setErrors] = useState({});
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [notionError, setNotionError] = useState<'notion-api-error' | 'network-error' | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState(false);

  React.useEffect(() => {
    const { name, email, company, phone, consultationType, preferredDate, preferredTime } = formData;
    const isValid = 
      name.trim() !== "" && 
      email.trim() !== "" && 
      company.trim() !== "" &&
      phone.trim() !== "" &&
      consultationType !== "" &&
      preferredDate !== "" &&
      preferredTime !== "";
    setIsFormValid(isValid);
  }, [formData]);

  // Fetch available slots when date changes
  React.useEffect(() => {
    if (!formData.preferredDate) {
      setAvailableSlots([]);
      setFormData(prev => ({ ...prev, preferredTime: "" }));
      return;
    }

    const fetchSlots = async () => {
      setLoadingSlots(true);
      setNotionError(null);
      try {
        const response = await fetch(`/api/calendar/slots?date=${formData.preferredDate}`);
        const data = await response.json();

        if (!response.ok) {
          console.error('❌ Slots API error:', data);
          setNotionError('network-error');
          setShowErrorModal(true);
          setAvailableSlots([]);
          return;
        }

        // Check if Notion API had an error
        if (data.notionStatus === 'api-error') {
          console.warn('⚠️ Notion API error:', data.notionErrorMessage);
          setNotionError('notion-api-error');
          setShowErrorModal(true);
        }

        // Still show available slots even if Notion had an error
        if (data.slots && Array.isArray(data.slots)) {
          setAvailableSlots(data.slots);
        }
      } catch (error) {
        console.error('❌ Error fetching slots:', error);
        setNotionError('network-error');
        setShowErrorModal(true);
        setAvailableSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [formData.preferredDate]);

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      const timer = setTimeout(() => {
        setIsSubmitSuccessful(false);
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          consultationType: "",
          preferredDate: "",
          preferredTime: "",
          message: "",
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSubmitSuccessful]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.email.match(emailRegex)) {
      newErrors.email = t('consultation.form.invalidEmail') || 'Invalid email format';
    }
    
    if (!/^\d{8,}$/.test(formData.phone.replace(/[\s\-()]/g, ''))) {
      newErrors.phone = t('consultation.form.invalidPhone') || 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Find the selected time slot object
    const selectedSlot = availableSlots.find(slot => slot.display === formData.preferredTime);
    if (!selectedSlot) {
      console.error('❌ Selected time slot not found');
      setErrors(prev => ({ ...prev, preferredTime: 'Invalid time slot selected' }));
      return;
    }

    const submissionData = {
      visitorName: formData.name,
      visitorEmail: formData.email,
      visitorPhone: formData.phone,
      visitorCompany: formData.company,
      selectedDate: formData.preferredDate,
      selectedTimeSlot: selectedSlot,
      message: formData.message,
    };

    setIsSubmitting(true);
    setBookingError(false);

    try {
      const response = await fetch('/api/calendar/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();
      
      if (!response.ok) {
        console.error('❌ Booking failed:', result);
        setBookingError(true);
        setIsSubmitting(false);
        return;
      }

      // Successfully booked
      setIsSubmitSuccessful(true);
    } catch (error) {
      console.error('❌ Submission error:', error);
      setBookingError(true);
      setIsSubmitting(false);
    }
  }

  if (isSubmitSuccessful) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <CheckCircleIcon sx={{ fontSize: 100 }} color="success" />
        <Typography color={teal[900]} sx={{ marginTop: 2 }}>
          <strong>{t('consultation.form.success')}</strong>
        </Typography>
        <Typography color={teal[700]} sx={{ marginTop: 1, fontSize: "0.95rem" }}>
          {t('consultation.form.successMessage')}
        </Typography>
      </div>
    );
  }

  const consultationTypes = [
    { value: 'system-development', label: t('services.system.title') },
    { value: 'ai-integration', label: t('services.ai.title') },
    { value: 'data-analytics', label: t('services.data.title') },
    { value: 'agile-devops', label: t('services.agile.title') },
    { value: 'other', label: t('consultation.form.other') || 'Other' },
  ];

  return (
    <>
      <ErrorModal
        open={showErrorModal}
        errorType={notionError || 'validation-error'}
        onClose={() => setShowErrorModal(false)}
      />
      <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {/* Booking Guidelines */}
        <Grid item xs={12}>
          <Box
            sx={{
              backgroundColor: '#1e293b',
              borderLeft: '4px solid #06b6d4',
              padding: 2.5,
              borderRadius: 1,
              marginBottom: 2,
            }}
          >
            <Typography sx={{ color: '#06b6d4', fontWeight: 700, marginBottom: 1.5, fontSize: '1.1rem' }}>
              📋 預約須知
            </Typography>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#cbd5e1' }}>
              <li style={{ marginBottom: '8px' }}>預約時間為週一至週五，上午 10:00 至晚上 8:00</li>
              <li style={{ marginBottom: '8px' }}>每個時段為 1 小時的一對一諮詢</li>
              <li style={{ marginBottom: '8px' }}>預約成功後，您將收到確認郵件及日曆邀請</li>
              <li style={{ marginBottom: '8px' }}>如需取消或更改預約，請提前 24 小時通知</li>
              <li>諮詢可選擇線上會議或實體拜訪</li>
            </ul>
          </Box>
        </Grid>

        {/* Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="name"
            label={t('consultation.form.name')}
            placeholder={t('consultation.form.placeholder')}
            value={formData.name}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                '& fieldset': { borderColor: '#7c3aed' },
                '&:hover fieldset': { borderColor: '#a78bfa' },
                '&.Mui-focused fieldset': { borderColor: '#a78bfa' },
              },
              '& .MuiOutlinedInput-input::placeholder': {
                color: '#9370DB',
                opacity: 0.7,
              },
              '& .MuiInputBase-input': {
                color: '#FFFFFF',
              },
              '& .MuiInputLabel-root': {
                color: '#9370DB',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#a78bfa',
              },
            }}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="email"
            type="email"
            label={t('consultation.form.email')}
            placeholder={t('consultation.form.placeholder')}
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                '& fieldset': { borderColor: '#7c3aed' },
                '&:hover fieldset': { borderColor: '#a78bfa' },
                '&.Mui-focused fieldset': { borderColor: '#a78bfa' },
              },
              '& .MuiOutlinedInput-input::placeholder': {
                color: '#9370DB',
                opacity: 0.7,
              },
              '& .MuiInputBase-input': {
                color: '#FFFFFF',
              },
              '& .MuiInputLabel-root': {
                color: '#9370DB',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#a78bfa',
              },
              '& .MuiFormHelperText-root': {
                color: '#f87171',
              },
            }}
          />
        </Grid>

        {/* Company */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="company"
            label={t('consultation.form.company')}
            placeholder={t('consultation.form.placeholder')}
            value={formData.company}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                '& fieldset': { borderColor: '#7c3aed' },
                '&:hover fieldset': { borderColor: '#a78bfa' },
                '&.Mui-focused fieldset': { borderColor: '#a78bfa' },
              },
              '& .MuiOutlinedInput-input::placeholder': {
                color: '#9370DB',
                opacity: 0.7,
              },
              '& .MuiInputBase-input': {
                color: '#FFFFFF',
              },
              '& .MuiInputLabel-root': {
                color: '#9370DB',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#a78bfa',
              },
            }}
          />
        </Grid>

        {/* Phone */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="phone"
            label={t('consultation.form.phone')}
            placeholder={t('consultation.form.placeholder')}
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                '& fieldset': { borderColor: '#7c3aed' },
                '&:hover fieldset': { borderColor: '#a78bfa' },
                '&.Mui-focused fieldset': { borderColor: '#a78bfa' },
              },
              '& .MuiOutlinedInput-input::placeholder': {
                color: '#9370DB',
                opacity: 0.7,
              },
              '& .MuiInputBase-input': {
                color: '#FFFFFF',
              },
              '& .MuiInputLabel-root': {
                color: '#9370DB',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#a78bfa',
              },
              '& .MuiFormHelperText-root': {
                color: '#f87171',
              },
            }}
          />
        </Grid>

        {/* Consultation Type */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            name="consultationType"
            label={t('consultation.form.consultationType')}
            value={formData.consultationType}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                '& fieldset': { borderColor: '#7c3aed' },
                '&:hover fieldset': { borderColor: '#a78bfa' },
                '&.Mui-focused fieldset': { borderColor: '#a78bfa' },
              },
              '& .MuiInputBase-input': {
                color: '#FFFFFF',
              },
              '& .MuiInputLabel-root': {
                color: '#9370DB',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#a78bfa',
              },
              '& .MuiSvgIcon-root': {
                color: '#9370DB',
              },
            }}
          >
            <MenuItem value="">
              <em>{t('consultation.form.select')}</em>
            </MenuItem>
            {consultationTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Preferred Date */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="preferredDate"
            type="date"
            label={t('consultation.form.preferredDate')}
            value={formData.preferredDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: new Date().toISOString().split('T')[0],
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                '& fieldset': { borderColor: '#7c3aed' },
                '&:hover fieldset': { borderColor: '#a78bfa' },
                '&.Mui-focused fieldset': { borderColor: '#a78bfa' },
              },
              '& .MuiInputBase-input': {
                color: '#FFFFFF',
              },
              '& .MuiInputLabel-root': {
                color: '#9370DB',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#a78bfa',
              },
              '& .MuiSvgIcon-root': {
                color: '#9370DB',
              },
            }}
          />
        </Grid>

        {/* Preferred Time */}
        <Grid item xs={12} sm={6}>
          <Box sx={{ position: 'relative' }}>
            <TextField
              fullWidth
              select
              name="preferredTime"
              label={t('consultation.form.preferredTime')}
              value={formData.preferredTime}
              onChange={handleChange}
              disabled={!formData.preferredDate || loadingSlots || availableSlots.length === 0}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#FFFFFF',
                  '& fieldset': { borderColor: '#7c3aed' },
                  '&:hover fieldset': { borderColor: '#a78bfa' },
                  '&.Mui-focused fieldset': { borderColor: '#a78bfa' },
                },
                '& .MuiInputBase-input': {
                  color: '#FFFFFF',
                },
                '& .MuiInputLabel-root': {
                  color: '#9370DB',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#a78bfa',
                },
                '& .MuiSvgIcon-root': {
                  color: '#9370DB',
                },
                '&.Mui-disabled': {
                  opacity: 0.6,
                },
              }}
            >
              <MenuItem value="">
                <em>
                  {!formData.preferredDate
                    ? t('consultation.form.selectDate') || 'Select a date first'
                    : loadingSlots
                    ? t('consultation.form.loading') || 'Loading...'
                    : t('consultation.form.select') || 'Select'}
                </em>
              </MenuItem>
              {availableSlots.map((slot) => (
                <MenuItem key={slot.display} value={slot.display}>
                  {slot.display}
                </MenuItem>
              ))}
            </TextField>
            
            {loadingSlots && (
              <Box
                sx={{
                  position: 'absolute',
                  right: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                }}
              >
                <CircularProgress size={24} sx={{ color: '#9370DB' }} />
              </Box>
            )}
          </Box>
        </Grid>

        {/* Additional Message */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="message"
            label={t('consultation.form.additionalMessage')}
            placeholder={t('consultation.form.placeholder')}
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={4}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                '& fieldset': { borderColor: '#7c3aed' },
                '&:hover fieldset': { borderColor: '#a78bfa' },
                '&.Mui-focused fieldset': { borderColor: '#a78bfa' },
              },
              '& .MuiOutlinedInput-input::placeholder': {
                color: '#9370DB',
                opacity: 0.7,
              },
              '& .MuiInputBase-input': {
                color: '#FFFFFF',
              },
              '& .MuiInputLabel-root': {
                color: '#9370DB',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#a78bfa',
              },
            }}
          />
        </Grid>

        {/* Error Message Display */}
        {bookingError && (
          <Grid item xs={12}>
            <Box
              sx={{
                backgroundColor: '#fee2e2',
                borderLeft: '4px solid #dc2626',
                padding: 2,
                borderRadius: 1,
                marginBottom: 2,
              }}
            >
              <Typography sx={{ color: '#dc2626', fontWeight: 600, marginBottom: 1 }}>
                ❌ 業務拜訪未能預約成功！
              </Typography>
              <Typography sx={{ color: '#991b1b', fontSize: '0.9rem' }}>
                盡快聯絡 InnovateXP Limited：
                <Link
                  href="mailto:info@innovatexp.com"
                  sx={{
                    color: '#dc2626',
                    fontWeight: 600,
                    textDecoration: 'none',
                    marginLeft: 0.5,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  📧 info@innovatexp.com
                </Link>
              </Typography>
            </Box>
          </Grid>
        )}

        {/* Submit Button */}
        <Grid item xs={12} container justifyContent="center" alignItems="center">
          <Button
            type="submit"
            variant="contained"
            startIcon={<CalendarTodayIcon />}
            sx={{
              width: "60vw",
              background: "#008080",
              padding: 1.5,
              margin: 2,
              fontSize: "1rem",
              fontWeight: 600,
              transition: "all 0.3s ease",
              "&:hover": {
                background: "#006666",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 12px rgba(0, 128, 128, 0.4)",
              },
            }}
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? t('consultation.form.submitting') || 'Submitting...' : t('consultation.form.submit')}
          </Button>
        </Grid>
      </Grid>
    </form>
    </>
  );
}

