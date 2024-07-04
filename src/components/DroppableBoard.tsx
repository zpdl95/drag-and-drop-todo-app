import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { IToDo, toDoState } from '../atoms';
import DragableCard from './DragableCard';

interface IMagicBoard {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Board = styled.div`
  width: 300px;
  min-height: 300px;
  padding: 10px 0px;
  background-color: ${(props) => props.theme.boardColor};
  /* backdrop-filter: blur(5px); */ // dnd에서 에러발생
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 10px black;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 20px;
`;

const Form = styled.form`
  width: 100%;
  padding: 0.5em 1em;
  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 1rem;
    background-color: transparent;
  }
  span {
    display: block;
    margin-top: 0.5em;
    margin-left: 2px;
    color: #b71540;
    font-size: 15px;
    font-weight: 600;
    text-shadow: 0 0 5px black;
  }
`;

const MagicBoard = styled.div<IMagicBoard>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? props.theme.boardAccentColor
      : props.isDraggingFromThis
      ? props.theme.boardAccentColor
      : 'none'};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 10px 10px;
`;

interface IDroppableBoard {
  toDos: IToDo[];
  boardId: string;
  index: number;
}

interface IForm {
  toDo: string;
}

function DroppableBoard({ toDos, boardId, index }: IDroppableBoard) {
  const setToDo = useSetRecoilState(toDoState);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const onVaild = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDo((allBoards) => {
      return { ...allBoards, [boardId]: [...allBoards[boardId], newToDo] };
    });
    setValue('toDo', '');
  };
  return (
    <Draggable draggableId={boardId} index={index}>
      {(magic) => (
        <Board ref={magic.innerRef} {...magic.draggableProps}>
          <Title {...magic.dragHandleProps}>{boardId}</Title>
          <Form onSubmit={handleSubmit(onVaild)}>
            <input
              {...register('toDo', { required: '할 일을 적으세요' })}
              type='text'
              placeholder={`${boardId}에 할 일을 추가`}
            />
            <span>{errors.toDo?.message}</span>
          </Form>
          {/* Droppable = children으로 함수를 받는다 */}
          {/* id도 받아야함 */}
          <Droppable type='toDo' droppableId={boardId}>
            {(magic, info) => (
              <MagicBoard
                isDraggingOver={info.isDraggingOver}
                isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                ref={magic.innerRef}
                {...magic.droppableProps}
              >
                {/* Draggable = children으로 함수를 받는다 */}
                {/* id와 index를 받아야함 */}
                {toDos.map((toDo, index) => (
                  /* key값과 draggableId값이 다르면 오류가 발생함 */
                  <DragableCard
                    key={toDo.id}
                    index={index}
                    toDoId={toDo.id}
                    toDoText={toDo.text}
                    boardId={boardId}
                  />
                ))}
                {/* placeholder = 빠진요소의 자리를 채워줌 */}
                {magic.placeholder}
              </MagicBoard>
            )}
          </Droppable>
        </Board>
      )}
    </Draggable>
  );
}
export default DroppableBoard;
