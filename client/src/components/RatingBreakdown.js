// Komponent som visar en visuell sammanställning av betyg 1–5 stjärnor.
// För varje betygsnivå räknas hur många som gett det betyget och visas i ett stapeldiagram.
// getCount(star) räknar antal gånger ett visst betyg förekommer i listan.
// percent räknar ut andelen i procent för varje stjärn-nivå.
// LinearProgress visar detta visuellt.
// Vi använder sx för att styla koden

import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

const RatingBreakdown = ({ ratings = [] }) => {
  const total = ratings.length;

  const getCount = (star) => ratings.filter((r) => r === star).length;

  return (
    <Box sx={{ mt: 3 }}>
      {[5, 4, 3, 2, 1].map((star) => {
        const count = getCount(star);
        const percent = total > 0 ? (count / total) * 100 : 0;
        return (
          <Box key={star} sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Typography sx={{ width: 80 }}>{star} stjärnor</Typography>
            <LinearProgress
              variant="determinate"
              value={percent}
              sx={{ width: "100%", mx: 2, height: 10, borderRadius: 5 }}
            />
            <Typography>{count}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default RatingBreakdown;