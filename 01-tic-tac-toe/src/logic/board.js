import { WINNER_COMBINATIONS } from "../constants";

//metodo revisa si hay un ganador
export const checkWinner = (boardTocheck) => {
  //revisa todas las combinaciones ganadoras
  //si hay una combinacion ganadora regresa el valor de X,O
  for (const combo of WINNER_COMBINATIONS) {
    const [a, b, c] = combo;
    if (
      boardTocheck[a] &&
      boardTocheck[a] === boardTocheck[b] &&
      boardTocheck[a] === boardTocheck[c]
    ) {
      return boardTocheck[a];
    }
  }
  //si no hay ganador
  return null;
};

//funcion que revisa si hay empate o el juego termino
export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null);
};
