import { useReducer, useState, useRef, useEffect, useCallback } from "react";
import useSWR from "swr";
import clsx from "clsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from 'immutability-helper'

import { useUserStore } from "../../stores/userStore";
import { setProbableActivities, getUser } from "../../api/user";

import s from "./style.module.scss";

import Button from "../../components/Button";
import Row from "./Row";

function Daily() {
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const [activities, setActivities] = useState<string[]>([]);
  const [data, setData] = useState([""]);
  const id = useUserStore((state) => state.id);

  useEffect(() => {
    (async function () {
      const data = await getUser(id);
      setData(data.probable_activities);
    })();
  }, []);

  const handleButtonClick = async () =>
    await setProbableActivities(activities, id);

  const moveRow = useCallback((dragIndex:number, hoverIndex:number) => {
      setData((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        }),
      )
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={s.root}>
        <div className={s.card}>
          <div className={s.title}>
            <div>Choose or add things that you did today,</div>
            <div>select time frame</div>
            and locate in order of completion each task
          </div>
          <div>
            {data &&
              data.map((el: string, index: number) => (
                <Row
                  index={index}
                  key={el}
                  el={el}
                  setActivities={setActivities}
                  activities={activities}
                  moveRow={moveRow}
                />
              ))}
          </div>
          <div className={s.button}>
            {/* <Button text="Continue" handleClick={handleButtonClick}/> */}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default Daily;
