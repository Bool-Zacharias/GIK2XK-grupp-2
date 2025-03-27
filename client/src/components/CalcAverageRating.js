// Uträking för snitt, fungerade inte som vi ville när de implementerades i kod direkt. Så vart enklare att göra en egen fil för det

export const CalcAverageRating = (ratings = []) => {
    if (ratings.length === 0) return "Ingen än";
  
    let sum = 0;
    for (let i = 0; i < ratings.length; i++) {
      sum += ratings[i];
    }
  
    let average = sum / ratings.length;
    return Math.round(average * 10) / 10; // Avrundar till en decimal
  };