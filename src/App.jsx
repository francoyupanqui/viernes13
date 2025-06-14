import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CartaParaMama = () => {
  const [sobreAbierto, setSobreAbierto] = useState(false);
  const [cartaAbierta, setCartaAbierta] = useState(false);
  const [mostrandoCarta, setMostrandoCarta] = useState(false);
  const [cerrandoCarta, setCerrandoCarta] = useState(false);

  const flowers = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    size: Math.random() * 20 + 10,
    duration: Math.random() * 10 + 10,
  }));

  const manejarClickSobre = () => {
    if (!sobreAbierto) {
      setSobreAbierto(true);
      setTimeout(() => {
        setMostrandoCarta(true);
        setTimeout(() => {
          setMostrandoCarta(false);
          setCartaAbierta(true);
        }, 500);
      }, 1000);
    } else if (cartaAbierta) {
      setCerrandoCarta(true);
      setTimeout(() => {
        setCerrandoCarta(false);
        setCartaAbierta(false);
        setSobreAbierto(false);
      }, 500);
    } else {
      setSobreAbierto(false);
    }
  };

  useEffect(() => {
    const audio1 = new Audio(
      "/Charlie USG - Viernes 13 (Videoclip Oficial).mp3"
    );
    const audio2 = new Audio("/Marcos Menchaca - Viernes 13 (Letra).mp3"); // Pon el nombre exacto del segundo archivo
    let reproducido = false;

    const handleFirstClick = () => {
      if (!reproducido) {
        audio1.play().catch((e) => console.log("No se pudo reproducir:", e));
        reproducido = true;
      }
    };

    // Cuando termina la primera canción, inicia la segunda
    audio1.addEventListener("ended", () => {
      audio2
        .play()
        .catch((e) =>
          console.log("No se pudo reproducir la segunda canción:", e)
        );
    });

    window.addEventListener("click", handleFirstClick);

    return () => {
      window.removeEventListener("click", handleFirstClick);
      audio1.removeEventListener("ended", () => {});
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-rose-50 flex flex-col items-center justify-center p-4 overflow-hidden relative font-sans">
      {/* Flores animadas */}
      {flowers.map((flower) => (
        <motion.div
          key={flower.id}
          className="absolute text-amber-300 opacity-70"
          style={{
            left: `${flower.left}%`,
            top: "-50px",
            fontSize: `${flower.size}px`,
          }}
          initial={{ y: -50, rotate: 0 }}
          animate={{
            y: ["-50px", "110vh"],
            rotate: 360,
            x: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: flower.duration,
            delay: flower.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {Math.random() > 0.5 ? "🌻" : "🌹"}
        </motion.div>
      ))}

      <h1 className="font-['Marck_Script'] text-center text-5xl md:text-6xl mb-50 text-gray-700 drop-shadow-md">
        ¡Feliz Viernes 13! ❤️
      </h1>

      <div className="w-full max-w-md relative">
        {/* Carta */}
        <div
          className={`absolute top-0 left-0 w-full h-72 md:h-80 bg-white rounded-lg shadow-md p-5 transition-all duration-500 z-30
            ${
              mostrandoCarta || cartaAbierta || cerrandoCarta
                ? "opacity-100 transform -translate-y-20"
                : "opacity-0"
            }`}
          onClick={manejarClickSobre}
        >
          <div className="h-full border-2 border-dotted border-gray-700 p-3 overflow-y-auto text-xs md:text-sm leading-tight">
            <strong className="text-gray-800">Querida Mamá,</strong>
            <p className="mt-2 text-gray-700">
              Hoy es <strong>viernes 13</strong>, La verdad no sabia si hacer
              esto pues nunca hice algo para estos dias, nose ni lo que se
              celebra pero vi que lo subiste a tu estado, aammmm ojala le guste
              :c <br />
              <br />
              Me encanta que te guste <em>One Piece</em>, me hace pensar que al
              igual q luffy siempre suelta una gran sonrisa, no te conosco bien
              pero simepre q la veo la lleva puesta y solo quiero q siempre
              sonria, simepre crei que una mujer es mas hermosa con una sonrisa
              en el rostro, le falto sonreir para que gane el derecho de ser
              miss enfermeria :p xd . <br />
              <br />
              Que te gusten los <em>perritos</em>, las <em>tortuas</em>, e
              incluso los <em>cuys</em> xd . <br />Y que juegues{" "}
              <em>Minecraft</em>... <em>Roblox</em>, a verdad tambien{" "}
              <em>Clash Royale</em>, es una buena manera en la que puedes
              relajarte, y no lleges a ser aburrida como io :c xd 😳. <br />
              <br />
              segun chatGPT viernes 13 significa cosas malas :0, pero yo me
              siento afortunado por haberte conocido. <br />
              Si pudiera escribir lo que me haces sentir en código, seguro
              saldría algo así: <br />
              <br />
              <span className="text-gray-500 text-xs">
                PD: Ahora te lo digo en codigo xd:
              </span>
              <br />
              <code className="bg-gray-100 p-1 rounded">
                console.log("Graaaaasias por tar :3. <br />
                Feliz viernes 13 mi sol ☀️")
              </code>
              <br />
              <br />
              Con cariño (y unas cuantas líneas de código), <br />
              Alguien que se emociona cada vez que te ve en linea y no respondes
              :3.✨
            </p>
          </div>
        </div>

        {/* Sobre */}
        <div
          className={`relative bg-pink-100 rounded-xl shadow-xl cursor-pointer transition-all duration-500`}
          onClick={manejarClickSobre}
        >
          <div className="relative w-full h-72 md:h-80">
            {/* Solapa superior */}
            <div
              className={`absolute top-0 left-0 w-full h-80 md:h-80 bg-pink-200 origin-top transition-transform duration-500 z-10 rounded-t-xl 
                ${sobreAbierto ? "rotate-x-180" : "rotate-0"}`}
              style={{
                clipPath: "polygon(0 0, 50% 50%, 100% 0)",
                transformStyle: "preserve-3d",
              }}
            ></div>

            {/* Lados del sobre */}
            <div
              className="absolute top-0 right-0 w-full h-full bg-pink-300 rounded-r-xl rounded-bl-xl"
              style={{
                clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
              }}
            ></div>

            <div
              className="absolute top-0 left-0 w-full h-full bg-pink-300 rounded-l-xl rounded-br-xl"
              style={{
                clipPath: "polygon(0 0, 0 100%, 100% 100%)",
              }}
            ></div>

            {/* Corazón */}
            <div
              className={`absolute top-1/2 left-1/2 w-8 h-8 bg-red-400 transform -translate-x-1/2 -translate-y-1/2 rotate-315 transition-transform duration-500 z-20`}
            >
              <div className="absolute top-0 left-0 w-8 h-8 bg-red-400 rounded-full -translate-y-1/2"></div>
              <div className="absolute top-0 left-0 w-8 h-8 bg-red-400 rounded-full translate-x-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartaParaMama;
