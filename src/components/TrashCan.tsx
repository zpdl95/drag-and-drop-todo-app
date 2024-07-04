import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const TrashCanArea = styled.div<{ isDraggingOver: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  align-self: center;
  background-color: ${(props) =>
    props.isDraggingOver
      ? props.theme.boardAccentColor
      : props.theme.trashBoardColor};
  max-width: 300px;
  height: 100px;
  border-radius: 10px;
  box-shadow: ${(props) =>
    props.isDraggingOver
      ? `0 0 5px 5px ${props.theme.trashBoardColor}`
      : '0 0 5px black'};
  h2 {
    font-size: 18px;
    font-weight: 600;
  }
  span {
    font-size: 40px;
  }
`;

function TrashCan() {
  return (
    <Droppable type={'Boards'} droppableId='TrashCan'>
      {(magic, info) => (
        <>
          <TrashCanArea
            isDraggingOver={info.isDraggingOver}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            <h2>보드 제거</h2>
            <span>🚮</span>
          </TrashCanArea>
          {magic.placeholder}
        </>
      )}
    </Droppable>
  );
}
export default TrashCan;
