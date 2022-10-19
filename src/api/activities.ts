export const getActivities = async (value: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_URL}/activites`,
  );
  return await res.json();
}