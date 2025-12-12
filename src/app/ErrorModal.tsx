"use client";

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
  List,
  ListItem,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';

interface ErrorModalProps {
  open: boolean;
  errorType: 'notion-api-error' | 'network-error' | 'validation-error' | 'server-error';
  onClose: () => void;
}

export default function ErrorModal({ open, errorType, onClose }: ErrorModalProps) {
  const getErrorContent = () => {
    switch (errorType) {
      case 'notion-api-error':
        return {
          title: '📅 Booking System Connection Error',
          icon: ErrorIcon,
          severity: 'error' as const,
          message:
            'We are currently unable to fetch available booking times from your calendar. This may be due to Notion API integration issues.',
          troubleshootingSteps: [
            {
              icon: CheckCircleIcon,
              title: 'Verify Notion API Key',
              description:
                'Ensure your NOTION_TOKEN environment variable is set correctly in your .env.local file',
            },
            {
              icon: CheckCircleIcon,
              title: 'Check Database Access',
              description:
                'Verify that your Notion integration has been granted access to your calendar database',
            },
            {
              icon: CheckCircleIcon,
              title: 'Validate Database ID',
              description:
                'Ensure NOTION_CALENDAR_DB_ID in your environment is correct (find it in your Notion database URL)',
            },
            {
              icon: CheckCircleIcon,
              title: 'Check Server Logs',
              description:
                'Review your server logs (terminal or Vercel dashboard) for detailed error messages',
            },
            {
              icon: CheckCircleIcon,
              title: 'Restart Development Server',
              description: 'Try stopping and restarting your Next.js development server (npm run dev)',
            },
          ],
          actionText: 'Try Again',
        };

      case 'network-error':
        return {
          title: '🌐 Network Connection Error',
          icon: WarningIcon,
          severity: 'warning' as const,
          message:
            'Unable to reach the booking server. Please check your internet connection and try again.',
          troubleshootingSteps: [
            {
              icon: CheckCircleIcon,
              title: 'Check Internet Connection',
              description: 'Ensure you have a stable internet connection',
            },
            {
              icon: CheckCircleIcon,
              title: 'Refresh the Page',
              description: 'Try refreshing your browser and attempting the booking again',
            },
            {
              icon: CheckCircleIcon,
              title: 'Check Server Status',
              description:
                'If using Vercel, check your deployment status in the Vercel dashboard',
            },
          ],
          actionText: 'Close',
        };

      case 'server-error':
        return {
          title: '⚙️ Server Error',
          icon: ErrorIcon,
          severity: 'error' as const,
          message: 'An unexpected error occurred on the server. Please try again later.',
          troubleshootingSteps: [
            {
              icon: CheckCircleIcon,
              title: 'Try Again Later',
              description: 'Wait a few moments and attempt your booking again',
            },
            {
              icon: CheckCircleIcon,
              title: 'Contact Support',
              description:
                'If the problem persists, please contact the website administrator',
            },
            {
              icon: CheckCircleIcon,
              title: 'Check Status Page',
              description: 'Visit the Vercel status page to check for ongoing incidents',
            },
          ],
          actionText: 'Close',
        };

      case 'validation-error':
      default:
        return {
          title: '⚠️ Form Validation Error',
          icon: WarningIcon,
          severity: 'warning' as const,
          message: 'Please check your form entries and ensure all required fields are completed.',
          troubleshootingSteps: [
            {
              icon: CheckCircleIcon,
              title: 'Complete All Fields',
              description: 'Ensure name, email, company, phone, consultation type, date, and time are all selected',
            },
            {
              icon: CheckCircleIcon,
              title: 'Validate Email Format',
              description: 'Make sure your email address is valid (e.g., user@example.com)',
            },
            {
              icon: CheckCircleIcon,
              title: 'Check Phone Format',
              description:
                'Ensure your phone number contains at least 8 digits',
            },
          ],
          actionText: 'Close',
        };
    }
  };

  const content = getErrorContent();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 1 }}>
        <ErrorIcon color="error" />
        <Typography variant="h6">{content.title}</Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {/* Main error message */}
          <Alert severity={content.severity} sx={{ mb: 3 }}>
            {content.message}
          </Alert>

          {/* Troubleshooting section */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <InfoIcon color="info" fontSize="small" />
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                Troubleshooting Steps:
              </Typography>
            </Box>

            <List sx={{ pl: 2 }}>
              {content.troubleshootingSteps.map((step, index) => (
                <ListItem key={index} sx={{ flexDirection: 'column', alignItems: 'flex-start', pb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, width: '100%' }}>
                    <CheckCircleIcon
                      sx={{
                        color: '#4caf50',
                        mt: 0.5,
                        flexShrink: 0,
                      }}
                      fontSize="small"
                    />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {step.title}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {step.description}
                      </Typography>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Developer note */}
          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="caption">
              💡 <strong>Tip:</strong> Always check your browser console (F12 Developer Tools) and server logs for
              more detailed error information.
            </Typography>
          </Alert>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="contained" color="primary" fullWidth>
          {content.actionText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
