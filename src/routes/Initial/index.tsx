import useSWR from "swr";

import { fetcher } from "../../utils";

import s from "./style.module.scss";

function Initial() {
  const { data } = useSWR(`${import.meta.env.VITE_URL}/activities`, fetcher);

  return (
    <div className={s.root}>
      <div className={s.card}>
        <div className={s.title}>
          Choose or add activities that you are most likely to do
        </div>
        <div>
          {data &&
            data.map((el: { name: string; _id: string }) => (
              <div key={el._id} className={s.row}>{el.name}</div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Initial;
