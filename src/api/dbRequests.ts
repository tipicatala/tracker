export const getUser = async (value: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_URL}:${
      import.meta.env.VITE_PORT
    }/user/${value}`,
  );
  return await res.json();
}

export const postUser = async (value: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_URL}:${
      import.meta.env.VITE_PORT
    }/user/add`,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ name: value }),
    }
  );

  return await res.json();
}