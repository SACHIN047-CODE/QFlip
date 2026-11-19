export const generatePatientId = (counter = 1) => {
  const year = new Date().getFullYear();
  const padded = String(counter).padStart(5, '0');
  return `CF-${year}-${padded}`;
};

export default generatePatientId;
