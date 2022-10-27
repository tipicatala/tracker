export const getUser = async (value: string) => {  
  const res = await fetch(
    `${import.meta.env.VITE_URL}/user/${value}`,
  );
  return await res.json();
}

export const postUser = async (value: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_URL}/user/add`,
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

export const setProbableActivities = async (values: string[], id: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_URL}/probable-actvities/${id}`,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ values }),
    }
  );
  return await res.json();
}

export const setTodayActivities = async (values: string[], id: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_URL}/day-activities/${id}`,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ values }),
    }
  );
  return await res.json();
}

export const getTodayActivities = async (id: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_URL}/today-activities/${id}`,
  );
  return await res.json();
}