import { useState, useEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

import { useUserStore } from "../../stores/userStore";
import { getUser, getTodayActivities } from "../../api/user";

import Form from "../../components/Form";
import Button from "../../components/Button";
import Row from "./Row";

function DailyDrag() {
  const [allActivities, setAllActivities] = useState([""]);
  // const [hoveredRow, setHoveredRow] = useState(-1);

  const id = useUserStore((state) => state.id);

  useEffect(() => {
    (async function () {
      const data = await getTodayActivities(id);

      console.log(data)
      setAllActivities([]);
    })();
  }, []);

  const handleButtonClick = () => {
    // setTodayActivities(all)
  };

  const moveRow = useCallback((dragIndex: number, hoverIndex: number) => {
    setAllActivities((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Form
        title={"Choose or add things that you did today"}
        renderRows={() => (
          <div>
            {allActivities &&
              allActivities.map((el: string, index: number) => (
                <Row
                  index={index}
                  key={el}
                  el={el}
                  // setActivities={setSelectedActivities}
                  // activities={selectedActivities}
                  moveRow={moveRow}
                />
              ))}
          </div>
        )}
        renderButton={() => (
          <Button text="Continue" handleClick={handleButtonClick} />
        )}
      />
    </DndProvider>
  );
}

export default DailyDrag;
