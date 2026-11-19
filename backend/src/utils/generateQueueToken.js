export const generateQueueToken = (deptCode = 'GEN', sequenceNumber = 1) => {
  const code = (deptCode || 'GEN').toUpperCase().slice(0, 4);
  const padded = String(sequenceNumber).padStart(3, '0');
  return `OPD-${code}-${padded}`;
};

export default generateQueueToken;
