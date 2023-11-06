function lastWorkDay() {
  const today = new Date();
  today.setDate(today.getDate() - 1);

  // Check if yesterday was a weekend
  if (today.getDay() === 0) {
    // Sunday
    today.setDate(today.getDate() - 2);
  } else if (today.getDay() === 6) {
    // Saturday
    today.setDate(today.getDate() - 1);
  }

  const formattedDate = today.toISOString().slice(0, 10);
  return formattedDate;
}
export default lastWorkDay;
