import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import QuizQuestion from './QuizQuestion';

const quizQuestions = [
  {
    id: 1,
    title: "What kind of Kenyan experience are you dreaming of?",
    questionText: "This will help us find the right vibe for your trip. Are you drawn to the wild, the city, the coast, or historical treasures?",
    type: "radio",
    options: [
      "Wildlife & Safari Adventures",
      "Beach Relaxation & Coastal Culture",
      "Hiking & Scenic Landscapes",
      "Historical & Cultural Immersion",
      "Urban Exploration & City Life"
    ]
  },
  {
    id: 2,
    title: "What's your ideal travel pace?",
    questionText: "How long would you like your Kenyan adventure to be?",
    type: "radio",
    options: [
      "A quick getaway (3-4 Days)",
      "A standard vacation (5-7 Days)",
      "An extended exploration (8-10 Days)",
      "A deep dive (11+ Days)"
    ]
  },
  {
    id: 3,
    title: "What activities excite you the most?",
    questionText: "Select your must-do experiences. This will help tailor your itinerary.",
    type: "checkbox",
    options: [
      "Game Drives to see the Big Five",
      "Visiting Maasai Villages & Local Markets",
      "Snorkeling or Diving in Marine Parks",
      "Mountain Hiking or Nature Walks",
      "Exploring Historical Ruins",
      "Museum and Gallery Visits",
      "Relaxing on the Beach"
    ]
  },
  {
    id: 4,
    title: "What's your estimated budget for this trip?",
    questionText: "Please provide a rough estimate per person for accommodation and activities, excluding international flights. This will help us suggest packages that are a great value for you.",
    type: "radio",
    options: [
      "Budget-Friendly: Below $1,000 USD",
      "Mid-Range: $1,000 - $2,500 USD",
      "Luxury: $2,500 - $5,000 USD",
      "Premium: Above $5,000 USD"
    ]
  },
  {
    id: 5,
    title: "Where do you see yourself resting after a day of exploration?",
    questionText: "Your comfort is key. What type of accommodation do you prefer?",
    type: "radio",
    options: [
      "Luxury Safari Lodges & Tented Camps",
      "Boutique Hotels",
      "Beach Resorts",
      "Budget-friendly Guesthouses & Hostels"
    ]
  }
];

function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [quizQuestions[current].id]: answer });
  };

  const handleNext = () => {
    if (current < quizQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      // Submit or show results
      alert("Quiz complete! Answers: " + JSON.stringify(answers, null, 2));
    }
  };

  const handleBack = () => {
    if (current > 0) setCurrent(current - 1);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Quiz
      </Typography>
      <QuizQuestion
        question={quizQuestions[current]}
        value={answers[quizQuestions[current].id] || (quizQuestions[current].type === "checkbox" ? [] : "")}
        onChange={handleAnswer}
      />
      <div style={{ marginTop: 24 }}>
        <Button onClick={handleBack} disabled={current === 0} sx={{ mr: 2 }}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext}>
          {current === quizQuestions.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </Container>
  );
}

export default Quiz;