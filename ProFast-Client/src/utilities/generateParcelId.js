

const generateParcelId = () => {
    const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const datePart = `${year}${month}${day}`;
  
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();

  return `PID-${datePart}-${randomPart}`;
};

export default generateParcelId;