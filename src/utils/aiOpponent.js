export function generateAIOffer(listPrice) {
  const pricePercent = 0.96 + Math.random() * 0.16;
  const price = Math.round((listPrice * pricePercent) / 1000) * 1000;
  
  const earnestOptions = [1, 2, 3];
  const earnest = earnestOptions[Math.floor(Math.random() * 3)];
  
  const inspection = Math.random() > 0.4;
  const appraisal = Math.random() > 0.4;
  const financing = Math.random() > 0.4;
  
  const timelineOptions = [45, 30, 21];
  const timeline = timelineOptions[Math.floor(Math.random() * 3)];

  return { price, earnest, inspection, appraisal, financing, timeline };
}
