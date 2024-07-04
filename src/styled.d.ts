// 이 페이지는 typescript에게 어떤 변수(테마)를 선언해주는 파일이다
// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    boardColor: string;
    cardColor: string;
    boardAccentColor: string;
    cardAccentColor: string;
    trashBoardColor: string;
  }
}
