export function scoreOffer(offer, listPrice) {
  let score = 0;
  const priceScore = ((offer.price - listPrice * 0.9) / (listPrice * 0.25)) * 40;
  score += Math.max(0, Math.min(40, priceScore));
  
  if (offer.earnest === 1) score += 5;
  else if (offer.earnest === 2) score += 10;
  else if (offer.earnest === 3) score += 15;

  if (!offer.inspection) score += 10;
  if (!offer.appraisal) score += 10;
  if (!offer.financing) score += 10;

  if (offer.timeline === 45) score += 5;
  else if (offer.timeline === 30) score += 10;
  else if (offer.timeline === 21) score += 15;

  return score;
}
