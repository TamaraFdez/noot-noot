import { useEffect, useState } from "react";
import "./App.css";
import nootSound from "./assets/nootnoot.mp3";
import pingu from "./assets/Pingu.png";

function App() {
  const [frecuencia, setFrecuencia] = useState(10);
  const [duracion, setDuracion] = useState(1);
  const [activo, setActivo] = useState(false);
  const [sonando, setSonando] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(10);
  const [tiempoTotal, setTiempoTotal] = useState(0);

  function reproducirSonido() {
    const audio = new Audio(nootSound);

    setSonando(true);
    audio.onended = () => setSonando(false);
    audio.play();
  }

  useEffect(() => {
    if (!activo) return;

    let segundos = 0;

    const intervalo = setInterval(() => {
      segundos++;

      if (segundos % frecuencia === 0) reproducirSonido();
      setTiempoRestante(frecuencia - (segundos % frecuencia));
      setTiempoTotal(duracion * 60 - segundos);

      if (segundos >= duracion * 60) setActivo(false);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [activo, frecuencia, duracion]);

  function iniciar() {
    setTiempoRestante(frecuencia);
    setTiempoTotal(duracion * 60);
    setActivo(true);
    reproducirSonido();
  }
  function formatoTiempo(segundos) {
    const min = String(Math.floor(segundos / 60)).padStart(2, "0");
    const seg = String(segundos % 60).padStart(2, "0");
    return `${min}:${seg}`;
  }

  return (
    <main className="contenedor">
      <h1>¡Noot Noot!</h1>

    

      <div className="configuracion">
        <label>
          Frecuencia (seg)
          <input
            type="number"
            min="1"
            value={frecuencia}
            onChange={(e) => setFrecuencia(Number(e.target.value))}
            disabled={activo}
          />
        </label>

        <label>
          Duración (min)
          <input
            type="number"
            min="1"
            value={duracion}
            onChange={(e) => setDuracion(Number(e.target.value))}
            disabled={activo}
          />
        </label>
      </div>

      <div className="acciones">
        <button onClick={iniciar} disabled={activo}>
          Iniciar
        </button>
        <button onClick={() => setActivo(false)} disabled={!activo}>
          Detener
        </button>
      </div>
 <button className="btn-noot" onClick={reproducirSonido}>
        ¡Noot Noot!
      </button>
      {activo && (
        <section className="temporizador">
          <p>Próximo aviso en {tiempoRestante} s</p>
          <input
            className="barra"
            type="range"
            min="0"
            max={frecuencia}
            value={tiempoRestante}
            style={{ "--progreso": `${(tiempoRestante / frecuencia) * 100}%` }}
            disabled
          />
          <p>Tiempo total restante: {formatoTiempo(tiempoTotal)}</p>
        </section>
      )}
      

      {sonando && <img className="pingu" src={pingu} alt="Pingu" />}
    </main>
  );
}

export default App;
