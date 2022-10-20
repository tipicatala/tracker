import { useReducer, useState } from "react";
import useSWR from "swr";
import clsx from "clsx"

import { fetcher } from "../../utils";
import { useUserStore } from "../../stores/userStore";
import { setProbableActivities } from "../../api/user";

import s from "./style.module.scss";

import Button from "../../components/Button";

function Daily() {
  const [activities, setActivities] = useState<string[]>([]);
  const id = useUserStore((state) => state.id);

  const { data } = useSWR(`${import.meta.env.VITE_URL}/user/${id}`, fetcher);

  console.log(data)

  const handleRowClick = (el: string) => setActivities(prev => [...prev, el]);
  const handleButtonClick = async () => await setProbableActivities(activities, id);

  return (
    <div className={s.root}>
      <div className={s.card}>
        <div className={s.title}>
          Choose or add things that you did today
        </div>
        <div>
          {data &&
            data.probable_activities.map((el: string) => (
              <div key={el} className={clsx(s.row, activities.includes(el) && s.row_selected)} onClick={() => handleRowClick(el)}>
                {el}
              </div>
            ))}
        </div>
        <div className={s.button}>
        {/* <Button text="Continue" handleClick={handleButtonClick}/> */}
        </div>
      </div>
    </div>
  );
}

export default Daily;
