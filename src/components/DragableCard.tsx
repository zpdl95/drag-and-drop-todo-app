import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from '../atoms';

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? props.theme.cardAccentColor : props.theme.cardColor};
  box-shadow: ${(props) => (props.isDragging ? '0px 3px 5px black' : 'none')};
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 5px;
  transition: background-color 1s ease-out, box-shadow 1s ease-out;
  display: flex;
  justify-content: space-between;

  > p {
    overflow-wrap: anywhere;
  }

  > button {
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

interface IDragableCard {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DragableCard({ toDoId, toDoText, index, boardId }: IDragableCard) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = () => {
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: allBoards[boardId].filter((toDo) => toDo.id !== toDoId),
      };
    });
  };
  return (
    <Draggable draggableId={toDoId + ''} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          <p>{toDoText}</p>
          <button onClick={onClick}>❌</button>
        </Card>
      )}
    </Draggable>
  );
}
/* Card를 움직일때마다 Board컴포넌트가 렌더링이 된다. */
/* Board컴포넌트가 렌더링 될때마다 모든 Card컴포넌트가 리렌더링된다 */
/* 움직이지 않은 Card컴포넌트는 리렌더링 되지않기 위해 memo사용 */
export default React.memo(DragableCard);
