import { useReducer, useState } from "react";
import useSWR from "swr";

import { fetcher } from "../../utils";
import { useUserStore } from "../../stores/userStore";
import { setProbableActivities } from "../../api/user";

import s from "./style.module.scss";

import Button from "../../components/Button";

function Initial() {
  const [activities, setActivities] = useState<string[]>([]);
  const id = useUserStore((state) => state.id);

  const { data } = useSWR(`${import.meta.env.VITE_URL}/activities`, fetcher);

  const handleRowClick = (el: string) => setActivities(prev => [...prev, el]);
  const handleButtonClick = async () => await setProbableActivities(activities, id);

  return (
    <div className={s.root}>
      <div className={s.card}>
        <div className={s.title}>
          Choose or add activities that you are most likely to do
        </div>
        <div>
          {data &&
            data.map((el: { name: string; _id: string }) => (
              <div key={el._id} className={s.row} onClick={() => handleRowClick(el.name)}>
                {el.name}
              </div>
            ))}
        </div>
        <div className={s.button}>
        <Button text="Continue" handleClick={handleButtonClick}/>
        </div>
      </div>
    </div>
  );
}

export default Initial;
