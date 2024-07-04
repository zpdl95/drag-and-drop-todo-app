import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from '../atoms';

const AddSpace = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: rgb(255 245 255 / 80%);
  box-shadow: 0 0 5px black;
  border-radius: 10px;
  display: flex;
  margin-bottom: 3vh;
  justify-content: center;
  padding: 1em 1em;
  justify-self: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
  h2 {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
  }
  input {
    outline: none;
    border: none;
    font-size: 1rem;
    background-color: transparent;
  }
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  span {
    margin-top: 2px;
    margin-left: 2px;
    color: #b71540;
    font-size: 15px;
    font-weight: 600;
    text-shadow: 0 0 5px black;
  }
`;

interface IForm {
  board: string;
}

function AddBoard() {
  const setToDos = useSetRecoilState(toDoState);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const onValid = ({ board }: IForm) => {
    setToDos((allBoards) => {
      return { ...allBoards, [board[0].toUpperCase() + board.slice(1)]: [] };
    });
    setValue('board', '');
  };
  return (
    <AddSpace>
      <Form onSubmit={handleSubmit(onValid)}>
        <h2>보드 생성</h2>
        <div>
          <input
            {...register('board', {
              required: '작성해주세요',
              pattern: {
                value: /^[^0-9].*/,
                message: '숫자가 먼저 오면 안됩니다.',
              },
            })}
            type='text'
            placeholder='보드 이름 작성'
          />
          <button>➕</button>
        </div>
        <span>{errors.board?.message}</span>
      </Form>
    </AddSpace>
  );
}
export default AddBoard;
