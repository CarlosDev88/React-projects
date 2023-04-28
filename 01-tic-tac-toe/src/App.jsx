import "react";

import "./App.css";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkWinner, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { resetGametoStorage, saveGametoStorage } from "./logic/storage";

function App() {
  //respecto de este hook se puede ejecutar de tres formas:
  //1-) sin array de dependeicas y el codigo se ejcutara cada vez que el componente se renderice
  //2-) con array de dependeicas y el codigo se ejecuta cuando alguna de las dependencias cambie
  //3-) con array de dependeicas y el codigo se ejecuta cuando alguna de las dependencias cambie
  useEffect(() => {
    console.log("codigo a ejecutar");
  }, []);

  const initalBoard = Array(9).fill(null);
  const [board, setBoard] = useState(() => {
    const boardFromStorage = localStorage.getItem("board");
    return boardFromStorage ? JSON.parse(boardFromStorage) : initalBoard;
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = localStorage.getItem("turn");
    return turnFromStorage ? turnFromStorage : TURNS.X;
  });
  const [winner, setWinner] = useState(null);
  //reglas: null no hay ganador, false hay un empate

  const updateBoard = (index) => {
    console.log("winner", winner);
    //no actualizar el tablero si ya hay un valor o hay un ganador
    if (board[index] || winner) return;

    //actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //guradar el turno en el localStorage
    saveGametoStorage({ board: newBoard, turn: newTurn });

    //revisar si  hay un ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
      console.log("empate");
    }
  };

  //funcion para resetar el juego
  const resetGame = () => {
    setBoard(initalBoard);
    setTurn(TURNS.X);
    setWinner(null);
    resetGametoStorage();
  };

  return (
    <>
      <main className="board">
        <h1>Tic Tac Toe</h1>
        <button onClick={resetGame}>Resetar el juego</button>
        <section className="game">
          {board.map((_, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            );
          })}
        </section>

        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>

        <WinnerModal resetGame={resetGame} winner={winner} />
      </main>
    </>
  );
}

export default App;
