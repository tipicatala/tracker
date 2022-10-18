export const getActivities = async (value: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_URL}:${
      import.meta.env.VITE_PORT
    }/activites`,
  );
  return await res.json();
}