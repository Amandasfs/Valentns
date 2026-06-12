import { useState, useMemo, type ReactNode } from "react";
// Certifique-se de que os caminhos estão corretos no seu projeto
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import letter from "../assets/love-letter.png";
// import tictac from "../assets/tic-tac-toe.png"; // Removido
import pet from "../assets/dog.png";
import info from "../assets/exclamation.png";
import heart from "../assets/heart.png";
// Assumindo que você adicionou esse ícone na pasta assets baseado no pedido
import brokenHeart from "../assets/heartbroken.png"; 
import mail from "../assets/mail-box.png";
import pets from "../assets/pets.png";
import rocket from "../assets/rocket.png";

type Step = "love" | "pet" | "result";

const ANGELS = [
  { src: img4, className: "top-10 left-10" },
  { src: img3, className: "top-20 right-10" },
  { src: img1, className: "bottom-10 left-20" },
  { src: img2, className: "bottom-20 right-20" },
];

export default function Terminal() {
  const [step, setStep] = useState<Step>("love");
  
  // Função para definir o estado inicial
  const getInitialLines = (): ReactNode[] => [
    "$ node valentines-checker.js",
    "",
    // Alteração: Traduzido para Português
    <span className="flex items-center gap-2">
      <img src={mail} alt="" className="w-5 h-5" /> Você tem um grande amor? [sim/não]
    </span>,
  ];

  const [lines, setLines] = useState<ReactNode[]>(getInitialLines());

  const hearts = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${i * 0.2}s`,
    }));
  }, []);

  // Função para reiniciar o terminal
  function resetTerminal() {
    setLines(getInitialLines());
    setStep("love");
  }

  function answerLove(value: boolean) {
    // Alteração: Respostas traduzidas
    setLines((prev) => [...prev, `> ${value ? "sim" : "não"}`]);

    if (value) {
      setLines((prev) => [
        ...prev,
        "",
        <span className="flex items-center gap-2">
          <img src={letter} alt="" className="w-5 h-5" /> Feliz Dia dos Namorados!
        </span>,
        <span className="flex items-center gap-2">
          {/* Alteração: Substituído tictac por heart */}
          <img src={heart} alt="" className="w-5 h-5" /> Amor compilado com sucesso.
        </span>,
        <span className="flex items-center gap-2">
          <img src={rocket} alt="" className="w-5 h-5" /> Deploy da felicidade concluído.
        </span>,
      ]);
      setStep("result");
      return;
    }

    // Fluxo "Não"
    setLines((prev) => [
      ...prev,
      "",
      // Alteração: Adicionado ícone de coração partido
      <span className="flex items-center gap-2 text-red-400">
         <img src={brokenHeart} alt="" className="w-5 h-5" /> Ops...
      </span>,
      // Alteração: Traduzido para Português
      "Você tem um gato ou cachorro? [sim/não]"
    ]);
    setStep("pet");
  }

  function answerPet(value: boolean) {
    if (value) {
      setLines((prev) => [
        ...prev,
        // Alteração: Resposta traduzida
        "> sim",
        "",
        <span className="flex items-center gap-2">
          {/* Alteração: Ícone mudado para pets e frase alterada */}
          <img src={pets} alt="" className="w-5 h-5" /> Companhia fiel detectada.
        </span>,
        <span className="flex items-center gap-2">
          <img src={heart} alt="" className="w-5 h-5" /> Amor encontrado.
        </span>,
      ]);
    } else {
      setLines((prev) => [
        ...prev,
        // Alteração: Resposta traduzida
        "> não",
        "",
        <span className="flex items-center gap-2 text-red-500">
          <img src={info} alt="" className="w-5 h-5" /> Erro 404: Amor não encontrado.
        </span>,
        // Alteração: Frase alterada e ícone de rocket adicionado
        <span className="flex items-center gap-2">
           <img src={rocket} alt="" className="w-5 h-5" /> Continue evoluindo. Novas conexões podem surgir.
        </span>,
      ]);
    }
    setStep("result");
  }

  return (
    <div
      className="relative h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6"
      style={{ background: "radial-gradient(circle at top, #a30000, #4e0000 60%, #200000)" }}
    >
      {/* ANJOS BACKGROUND */}
      {ANGELS.map((angel, index) => (
        <img
          key={index}
          src={angel.src}
          alt=""
          aria-hidden="true"
          className={`fixed w-20 sm:w-28 opacity-40 animate-pulse ${angel.className}`}
        />
      ))}

      {/* ANIMAÇÃO FINAL COM ÍCONE DE CORAÇÃO */}
      {step === "result" &&
        hearts.map((h) => (
          <div
            key={h.id}
            className="fixed bottom-[-50px] z-20 animate-heart"
            style={{
              left: h.left,
              animationDelay: h.delay,
            }}
          >
            <img src={heart} alt="" className="w-10 h-10 drop-shadow-lg" />
          </div>
        ))}

      {/* TERMINAL */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-red-500/40 bg-black/80 shadow-[0_0_40px_rgba(255,0,0,0.5)] flex flex-col">
        
        {/* HEADER DO TERMINAL */}
        <div className="px-5 py-3 bg-red-950 border-b border-red-500/40 flex gap-2 shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-red-700" />
          <div className="w-3 h-3 rounded-full bg-white" />
        </div>

        {/* TEXTO DO TERMINAL */}
        <div className="p-6 sm:p-8 h-[250px] sm:h-[300px] overflow-y-auto font-mono text-red-300 flex-1 scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-transparent">
          {lines.map((line, index) => (
            <div key={index} className="min-h-[1.5rem]">
              {line || "\u00A0"}
            </div>
          ))}
        </div>

        {/* BOTÕES LOVE */}
        {step === "love" && (
          <div className="flex gap-4 p-4 sm:p-5 border-t border-red-500/30 shrink-0">
            <button
              onClick={() => answerLove(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors"
            >
              {/* Alteração: Botão traduzido */}
              Sim <img src={heart} alt="" className="w-5 h-5" />
            </button>
            <button
              onClick={() => answerLove(false)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-red-950 hover:bg-red-900 text-red-200 transition-colors"
            >
              {/* Alteração: Ícone mudado para brokenHeart e botão traduzido */}
              Não <img src={brokenHeart} alt="" className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* BOTÕES PET */}
        {step === "pet" && (
          <div className="flex gap-4 p-4 sm:p-5 border-t border-red-500/30 shrink-0">
            <button
              onClick={() => answerPet(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors"
            >
              {/* Alteração: Botão traduzido */}
              Sim <img src={pet} alt="" className="w-5 h-5" />
            </button>
            <button
              onClick={() => answerPet(false)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-red-950 hover:bg-red-900 text-white transition-colors"
            >
              {/* Alteração: Botão traduzido */}
              Não <img src={info} alt="" className="w-5 h-5 opacity-70" />
            </button>
          </div>
        )}

        {/* Alteração: Botão de reiniciar adicionado na tela de resultado */}
        {step === "result" && (
            <div className="p-4 sm:p-5 border-t border-red-500/30 shrink-0 flex justify-center">
                <button 
                    onClick={resetTerminal}
                    className="px-6 py-2 rounded-lg bg-transparent border border-red-500/50 text-red-300 hover:bg-red-950/50 transition-colors font-mono text-sm"
                >
                    &gt; Reiniciar Terminal
                </button>
            </div>
        )}
      </div>

      {/* ASSINATURA */}
      <p className="relative z-10 mt-6 sm:mt-8 text-red-200 font-mono text-xs sm:text-sm flex items-center gap-2">
        Desenvolvido por Amanda de Freitas <img src={heart} alt="" className="w-4 h-4" />
      </p>

      {/* ESTILOS DE ANIMAÇÃO */}
      <style>{`
        @keyframes heart {
          0% {
            transform: translateY(0) scale(0.7);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateY(-110vh) rotate(25deg) scale(1.4);
            opacity: 0;
          }
        }
        .animate-heart {
          animation: heart 5s linear infinite;
        }
      `}</style>
    </div>
  );
}
