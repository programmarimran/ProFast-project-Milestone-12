const calculateParcelCost = (type, weight, senderDistrict, receiverDistrict) => {
  const isWithinCity = senderDistrict === receiverDistrict;
  let cost = 0;
  let breakdown = "";

  if (type === "Document") {
    cost = isWithinCity ? 60 : 80;
    breakdown = isWithinCity ? "Within City: ৳60" : "Outside City: ৳80";
  } else if (type === "Not-Document" && weight <= 3) {
    cost = isWithinCity ? 110 : 150;
    breakdown = isWithinCity ? "Within City (≤3kg): ৳110" : "Outside City (≤3kg): ৳150";
  } else if (type === "Not-Document" && weight > 3) {
    const extraKg = weight - 3;
    const base = isWithinCity ? 110 : 150;
    const extra = extraKg * 40;
    const fixed = isWithinCity ? 0 : 40;
    cost = base + extra + fixed;
    breakdown = isWithinCity
      ? `Base: ৳110 + (${extraKg}kg × ৳40)= ৳${extra}`
      : `Base: ৳150 + (${extraKg}kg × ৳40) = ৳${extra} + ৳40`;
  }

  return { cost, breakdown };
};

export default calculateParcelCost
