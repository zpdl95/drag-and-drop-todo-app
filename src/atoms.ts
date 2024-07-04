import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

/* [key: string] = key가 단지 3개만 존재하는게 아니다 여러개다 라고 알려줌 */
interface ItoDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<ItoDoState>({
  key: "toDos",
  default: JSON.parse(localStorage.getItem("toDos") as string) || {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});
