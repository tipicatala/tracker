import { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import s from "./style.module.scss";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "../../stores/userStore";
import { getUser } from "../../api/user";

import Form from "../../components/Form";
import Button from "../../components/Button";

function Daily() {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [allActivities, setAllActivities] = useState([""]);
  const navigate = useNavigate();

  const id = useUserStore((state) => state.id);

  useEffect(() => {
    (async function () {
      const data = await getUser(id);
      setAllActivities(data.probable_activities);
    })();
  }, []);

  const handleButtonClick = () => navigate("/daily-drag");
  const handleRowClick = (el: string) => setSelectedActivities((prev) => [...prev, el]);

  return (
    <Form
      title={"Choose or add things that you did today"}
      renderRows={() => (
        <div>
          {allActivities &&
            allActivities.map((el: string, index: number) => (
              <div
                key={el}
                className={clsx(
                  s.row,
                  selectedActivities.includes(el) && s.row_selected
                )}
                onClick={() => handleRowClick(el)}
              >
                {el}
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

export default Daily;
