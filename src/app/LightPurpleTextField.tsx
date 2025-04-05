import React, { ChangeEvent } from 'react';
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define the props interface
interface LightPurpleTextFieldProps {
    formData: { [key: string]: string }; // Object with string keys and string values
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void; // Function to handle input changes
    inputName: string; // Name of the input field
    placeTxt: string; // Placeholder text
    labelTxt: string; // Label text
  }

  
  const LightPurpleTextField: React.FC<LightPurpleTextFieldProps> = ({ formData, handleChange, inputName, placeTxt, labelTxt }) => {
    // Create a custom theme with the colors you want
    const theme = createTheme({
        palette: {
            primary: {
                main: '#A370F7', // Light purple color when focused
            },
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiInputBase-input': {
                            color: 'white', // Text color
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white', // Label color
                        },
                        '& .MuiInput-underline:before': {
                            borderBottomColor: 'white', // Underline when not focused
                        },
                        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                            borderBottomColor: 'white', // Underline when hovered
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: '#A370F7', // Underline when focused
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#A370F7', // Label color when focused
                        },
                        '& .MuiInputBase-input::placeholder': {
                            color: 'white', // Placeholder color
                            opacity: 0.7,
                        },
                    },
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <TextField
                name={inputName} // Use the inputName prop here
                id={inputName}
                required
                placeholder={placeTxt}
                label={labelTxt}
                fullWidth
                variant="standard"
                value={formData[inputName]} // Use formData with inputName
                onChange={handleChange}
                color="primary" // Apply the light purple color
            />
        </ThemeProvider>
    );
};

export default LightPurpleTextField;