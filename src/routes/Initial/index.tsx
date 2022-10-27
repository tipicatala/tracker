import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import clsx from "clsx";

import { fetcher } from "../../utils";
import { useUserStore } from "../../stores/userStore";
import { setProbableActivities } from "../../api/user";

import s from "./style.module.scss";

import Form from "../../components/Form";
import Button from "../../components/Button";

function Initial() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<string[]>([]);
  const id = useUserStore((state) => state.id);

  const { data } = useSWR(`${import.meta.env.VITE_URL}/activities`, fetcher);

  const handleRowClick = (el: string) => setActivities((prev) => [...prev, el]);
  const handleButtonClick = async () => {
    await setProbableActivities(activities, id);
    navigate("/daily-select");
  };

  return (
    <Form
      title={"Choose or add activities that you are most likely to do"}
      renderRows={() => (
        <div>
          {data &&
            data.map((el: { name: string; _id: string }) => (
              <div
                key={el._id}
                className={clsx(
                  s.row,
                  activities.includes(el.name) && s.row_selected
                )}
                onClick={() => handleRowClick(el.name)}
              >
                {el.name}
              </div>
            ))}
        </div>
      )}
      renderButton={() => (
        <Button text="Continue" handleClick={handleButtonClick} />
      )}
    />
  );
}

export default Initial;
