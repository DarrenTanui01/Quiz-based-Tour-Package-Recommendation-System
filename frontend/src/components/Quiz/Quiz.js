import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';
import packages from '../data/packages';
import PackageDetail from '../Packages/PackageDetail';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

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

function scorePackage(pkg, answers) {
  let score = 0;
  if (
    (answers[1] === "Wildlife & Safari Adventures" && pkg.persona === "Luxury Safari Enthusiast") ||
    (answers[1] === "Beach Relaxation & Coastal Culture" && pkg.persona === "Budget Coastal Explorer") ||
    (answers[1] === "Hiking & Scenic Landscapes" && pkg.persona === "Active Rift Valley") ||
    (answers[1] === "Historical & Cultural Immersion" && pkg.persona === "Cultural Explorer & Community Enthusiast") ||
    (answers[1] === "Urban Exploration & City Life" && pkg.persona === "Cultural Explorer & Community Enthusiast")
  ) score++;

  if (
    (answers[2] === "A quick getaway (3-4 Days)" && pkg.duration.includes("4 Days")) ||
    (answers[2] === "A standard vacation (5-7 Days)" && pkg.duration.includes("6 Nights")) ||
    (answers[2] === "An extended exploration (8-10 Days)" && pkg.duration.includes("8 Days")) ||
    (answers[2] === "A deep dive (11+ Days)" && pkg.duration.includes("11"))
  ) score++;

  if (answers[3] && Array.isArray(answers[3])) {
    const acts = answers[3].join(" ");
    if (acts.match(/Game Drives|Big Five/) && pkg.persona.includes("Wildlife")) score++;
    if (acts.match(/Snorkeling|Beach/) && pkg.persona.includes("Coastal")) score++;
    if (acts.match(/Hiking|Mountain/) && pkg.persona.includes("Rift Valley")) score++;
    if (acts.match(/Maasai|Cultural|Historical|Museum|Gallery/) && pkg.persona.includes("Cultural")) score++;
    if (acts.match(/Boat|Family|Kids/) && pkg.persona.includes("Family")) score++;
    if (acts.match(/Walking|Conservation|Wilderness/) && pkg.persona.includes("Wilderness")) score++;
  }

  if (
    (answers[4] && answers[4].includes("Below $1,000") && pkg.estimatedCost.includes("850")) ||
    (answers[4] && answers[4].includes("Mid-Range") && pkg.estimatedCost.includes("1,200")) ||
    (answers[4] && answers[4].includes("Luxury") && pkg.estimatedCost.includes("6,500")) ||
    (answers[4] && answers[4].includes("Premium") && pkg.estimatedCost.includes("3,800"))
  ) score++;

  if (
    (answers[5] && answers[5].includes("Luxury Safari Lodges") && pkg.accommodation.includes("Luxury Safari Lodge")) ||
    (answers[5] && answers[5].includes("Boutique Hotels") && pkg.accommodation.includes("Boutique Hotel")) ||
    (answers[5] && answers[5].includes("Beach Resorts") && pkg.accommodation.includes("Beachalets")) ||
    (answers[5] && answers[5].includes("Budget-friendly Guesthouses") && pkg.accommodation.includes("Guesthouse"))
  ) score++;

  return score;
}

function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [recommended, setRecommended] = useState([]);
  const [detailPkg, setDetailPkg] = useState(null);
  const [error, setError] = useState(""); 
  const theme = useTheme();

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [quizQuestions[current].id]: answer });
    setError(""); 
  };

  const handleNext = () => {
    const q = quizQuestions[current];
    const answer = answers[q.id];

    // Validation: require at least one answer
    if (
      (q.type === "radio" && !answer) ||
      (q.type === "checkbox" && (!answer || answer.length === 0))
    ) {
      setError("Please select at least one option to continue.");
      return;
    }

    if (current < quizQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      // Score and recommend packages
      const scored = packages
        .map(pkg => ({ ...pkg, score: scorePackage(pkg, answers) }))
        .sort((a, b) => b.score - a.score);
      const topScore = scored[0]?.score || 0;
      setRecommended(scored.filter(pkg => pkg.score === topScore && topScore > 0));
      alert("Quiz complete! Your answers:\n" + JSON.stringify(answers, null, 2));
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
      setCurrent(0);
    } else if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const handleCloseDialog = () => {
    setShowResults(false);
    setCurrent(0);
    setAnswers({});
    setRecommended([]);
  };

  if (detailPkg) {

    return (
      <PackageDetail
        pkg={detailPkg}
        onBack={() => setDetailPkg(null)}
      />
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        background: theme.palette.mode === 'light'
          ? 'linear-gradient(135deg, #fffbe7 20%,rgb(248, 155, 6) 100%)'
          : theme.palette.background.default,
        transition: 'background 0.5s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: { xs: 8, sm: 10 },
        pb: { xs: 8, sm: 10 },
      }}
    >
      <Container maxWidth="sm" sx={{ py: { xs: 4, sm: 8 }, zIndex: 1 }}>
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: 6,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #232936 60%, #1976d2 100%)'
              : 'linear-gradient(135deg, #fffbe7 60%, #ff9800 100%)',
            opacity: 0.97,
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2rem', sm: '2.5rem' },
                textAlign: 'center',
                color: theme.palette.mode === 'dark' ? '#fff' : '#232936',
                textShadow: '0 2px 8px rgba(0,0,0,0.4)'
              }}
            >
              Quiz
            </Typography>
            <QuizQuestion
              question={quizQuestions[current]}
              value={answers[quizQuestions[current].id] || (quizQuestions[current].type === "checkbox" ? [] : "")}
              onChange={handleAnswer}
              error={error}
            />
            
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
              <Button onClick={handleBack} disabled={current === 0 && !showResults} sx={{ mr: 2 }}>
                Back
              </Button>
              <Button variant="contained" onClick={handleNext}>
                {current === quizQuestions.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
      <Dialog
        open={showResults}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #232936 60%, #1976d2 100%)'
              : 'linear-gradient(135deg, #fffbe7 60%, #ff9800 100%)',
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: theme.palette.mode === 'dark' ? '#fff' : '#232936' }}>
          Quiz Results
        </DialogTitle>
        <DialogContent>
          <QuizResult
            recommended={recommended}
            onViewDetail={pkg => {
              setDetailPkg(pkg);
              // Do NOT setShowResults(false)
            }}
          />
          <Button onClick={handleCloseDialog} sx={{ mt: 2 }}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Quiz;