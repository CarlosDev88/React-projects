export const saveGametoStorage = ({ board, turn }) => {
  localStorage.setItem("board", JSON.stringify(board));
  localStorage.setItem("turn", turn);
};

export const resetGametoStorage = () => {
  localStorage.removeItem("board");
  localStorage.removeItem("turn");
};
