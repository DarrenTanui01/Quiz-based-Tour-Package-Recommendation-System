import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function QuizQuestion({ question }) {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{question.title}</Typography>
        <Typography>{question.questionText}</Typography>
        {/* Render options/inputs here */}
      </CardContent>
    </Card>
  );
}

export default QuizQuestion;