import { useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import AddBoard from './components/AddBoard';
import DroppableBoard from './components/DroppableBoard';
import TrashCan from './components/TrashCan';

const Main = styled.div`
  padding: 5%;
  display: grid;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const Boards = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, source, type, draggableId } = info;
    /* toDo들의 배열이 움직였을때 정렬 */
    if (type === 'toDo') {
      if (!destination) return;
      if (destination?.droppableId === source.droppableId) {
        if (destination.index === source.index) return;
        setToDos((allBoards) => {
          const boardCopy = [...allBoards[source.droppableId]];
          const target = boardCopy.splice(source.index, 1);
          boardCopy.splice(destination?.index, 0, ...target);
          return {
            ...allBoards,
            [source.droppableId]: boardCopy,
          };
        });
      }
      if (destination.droppableId !== source.droppableId) {
        setToDos((allBoards) => {
          const sourceBoard = [...allBoards[source.droppableId]];
          const destBoard = [...allBoards[destination.droppableId]];
          const target = sourceBoard.splice(source.index, 1);
          destBoard.splice(destination.index, 0, ...target);
          return {
            ...allBoards,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destBoard,
          };
        });
      }
    }
    /* "Board"들의 배열이 움직였을때 정렬 */
    if (type === 'Boards') {
      if (!destination) return;
      if (destination.index === source.index) return;
      if (destination.droppableId === 'Boards') {
        setToDos((allBoards) => {
          const entriesBoards = Object.entries(allBoards);
          const target = entriesBoards.splice(source.index, 1);
          entriesBoards.splice(destination.index, 0, ...target);
          return Object.fromEntries(entriesBoards);
        });
      }
      /* "Board"들이 "TrashCan"으로 이동했을때 삭제 */
      if (destination.droppableId === 'TrashCan') {
        setToDos((allBoards) => {
          const copyAllBoards = { ...allBoards };
          delete copyAllBoards[draggableId];
          return copyAllBoards;
        });
      }
    }
  };
  /* 로컬스토리지에 저장 */
  useEffect(() => {
    localStorage.setItem('toDos', JSON.stringify(toDos));
  }, [toDos]);

  return (
    <Main>
      <AddBoard />
      {/* onDragEnd = 드래그가 끝났을때 실행되는 함수 */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Droppable type='Boards' droppableId='Boards' direction='horizontal'>
            {(magic) => (
              <Boards ref={magic.innerRef} {...magic.droppableProps}>
                {Object.keys(toDos).map((boardId, index) => (
                  <DroppableBoard
                    key={boardId}
                    toDos={toDos[boardId]}
                    boardId={boardId}
                    index={index}
                  />
                ))}
                {magic.placeholder}
              </Boards>
            )}
          </Droppable>
        </Wrapper>
        <TrashCan />
      </DragDropContext>
    </Main>
  );
}

export default App;
