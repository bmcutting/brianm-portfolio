import Brian from "../../assets/images/BrianPic.webp"
import { FaGithub, FaLinkedinIn } from "react-icons/fa"

export const Intro = () => {
  return (
    <section
      className="min-h-screen w-full grid lg:grid-cols-2 grid-cols-1 pt-[6vh] md:pt-[10vh] px-4 sm:px-6 lg:px-8
    bg-background dark:bg-backgroundDark dark:text-gray-200"
      id="intro"
      data-section="intro"
    >
      <div className="h-full flex items-center justify-center max-sm:items-start py-8 order-2 lg:order-1 lg:py-0">
        <div className="max-w-2xl mx-auto lg:ml-5 text-center lg:text-left">
          <h1 className="font-display mb-4 md:mb-6">
            <span className="block text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-gray-600 dark:text-gray-400">
              Hola, mi nombre es
            </span>{" "}
            <span className="inline-block mt-2 pb-1 border-b-2 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-none text-primary dark:text-primaryDark">
              Brian Michel
            </span>
          </h1>
          <p
            className="flex items-center justify-center lg:justify-start gap-3 mb-4 md:mb-6 font-mono text-sm sm:text-base font-medium uppercase tracking-[0.18em]
            before:h-0.5 before:w-7 before:bg-primary dark:before:bg-primaryDark"
          >
            Desarrollador Fullstack
          </p>
          <p className="max-w-[60ch] mx-auto lg:mx-0 text-base sm:text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-400">
            Ingeniero en Automática con perfil híbrido entre automatización industrial y
            desarrollo fullstack. Backend con{" "}
            <strong className="text-[#7c5cff] animate-pulse drop-shadow-md">
              .NET (C#)
            </strong>{" "}
            y PostgreSQL, frontend con{" "}
            <strong className="text-[#61dafb] animate-pulse drop-shadow-md">React</strong>{" "}
            y{" "}
            <strong className="text-[#3178c6] animate-pulse drop-shadow-md">
              TypeScript
            </strong>
            , e integración de dispositivos industriales mediante Modbus, PROFINET, S7 y
            MQTT.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center order-1 lg:order-2 flex-col">
        <div
          className="aspect-square w-full max-w-[250px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px] 
          rounded-full overflow-hidden flex items-center justify-center
        bg-primary dark:bg-primaryDark dark:shadow-gray-800/30 shadow-xl
          border-4 border-white dark:border-black"
        >
          <img
            src={Brian}
            alt="Brian Michel Morales Cutting"
            width="700"
            height="700"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-6 flex gap-4">
          <a
            href="https://github.com/bmcutting"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 duration-400 hover:scale-130 transition-transform"
          >
            <FaGithub className="text-4xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/brian-michel-morales-cutting"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 duration-400 hover:scale-130 transition-transform"
          >
            <FaLinkedinIn className="text-4xl" />
          </a>
        </div>
      </div>
    </section>
  )
}
