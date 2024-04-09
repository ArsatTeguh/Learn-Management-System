const calculateProgress = (complete_data: number, total_data: number) => {
  const result = (complete_data / total_data) * 100;
  return result;
};

export default calculateProgress;
