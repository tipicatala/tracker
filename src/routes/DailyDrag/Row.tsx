import React, { ReactComponentElement, ReactHTMLElement, useRef, useState } from "react";
import clsx from "clsx";
import { useDrag, useDrop } from 'react-dnd'

import s from "./style.module.scss";

interface IProps {
  el: string,
  setActivities: React.Dispatch<React.SetStateAction<string[]>>,
  activities: string[],
  index: number,
  moveRow: (dragIndex: any, hoverIndex: any) => void
}

function Row({ el, index, moveRow }: IProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isDraging, setIsDraging] = useState(false);

  // const handleRowClick = (el: string) => setActivities((prev) => [...prev, el]);

  const [{ handlerId }, drop] = useDrop({
    accept: "Row",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = (item as { index: number}).index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset() as { y:number }
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveRow(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      (item as { index: number}).index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: "Row",
    item: () => {
      return { el, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  return (
    <div
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      className={clsx(s.row, isDraging && s.row_selected)}
      onDragStart={() => setIsDraging(true)}
      onDragEnd={() => setIsDraging(false)}
    >
      {el}
    </div>
  );
}

export default Row;
