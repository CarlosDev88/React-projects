import { useEffect, useState } from "react";

import "./App.css";

const FolloWMouse = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handlerMove = (e) => {
      const { clientX, clientY } = e;
      setPosition({ x: clientX, y: clientY });
    };
    //aca me suscribo al evento
    if (enabled) {
      window.addEventListener("pointermove", handlerMove);
    }

    //aca me desuscribo al evento
    //esta funcion se ejecuta cuando el componente se desmonta
    //cuando cambian las dependencias, antes de ejecutar el efecto de nuevo
    return () => {
      window.removeEventListener("pointermove", handlerMove);
    };
  }, [enabled]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          backgroundColor: "#09f",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          width: 40,
          height: 40,
          top: -20,
          left: -20,
          transform: `translate(${position.x}px, ${position.y}px`,
        }}
      ></div>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Activar" : "Desactivar"} seguir puntero
      </button>
    </>
  );
};

function App() {
  return (
    <>
      <FolloWMouse />
    </>
  );
}

export default App;
