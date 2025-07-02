import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import { useTheme } from '@mui/material/styles';

function QuizQuestion({ question, value, onChange }) {
  const theme = useTheme();

  const handleRadioChange = (event) => {
    onChange(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const option = event.target.name;
    if (event.target.checked) {
      onChange([...value, option]);
    } else {
      onChange(value.filter((v) => v !== option));
    }
  };

  return (
    <Card sx={{
      marginBottom: 2,
      background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #232936 60%, #1976d2 100%)'
              : 'linear-gradient(135deg, #fffbe7 60%, #ff9800 100%)',
            opacity: 0.97,
    }}>
      <CardContent>
        <Typography variant="h6">{question.title}</Typography>
        <Typography sx={{ mb: 2 }}>{question.questionText}</Typography>
        <FormControl component="fieldset">
          <FormLabel component="legend"></FormLabel>
          {question.type === "radio" && (
            <RadioGroup value={value} onChange={handleRadioChange}>
              {question.options.map((opt, idx) => (
                <FormControlLabel
                  key={idx}
                  value={opt}
                  control={<Radio />}
                  label={opt}
                />
              ))}
            </RadioGroup>
          )}
          {question.type === "checkbox" && (
            <FormGroup>
              {question.options.map((opt, idx) => (
                <FormControlLabel
                  key={idx}
                  control={
                    <Checkbox
                      checked={value.includes(opt)}
                      onChange={handleCheckboxChange}
                      name={opt}
                    />
                  }
                  label={opt}
                />
              ))}
            </FormGroup>
          )}
        </FormControl>
      </CardContent>
    </Card>
  );
}

export default QuizQuestion;