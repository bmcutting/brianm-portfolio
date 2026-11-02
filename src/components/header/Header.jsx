import { Toggle } from "./Toggle"
import { MobileMenu } from "./MobileMenu"
import { sections } from "./menu"
import { useContext } from "react"
import { ActiveSectionContext } from "../../contexts/ActiveSection/ActiveSectionContext"

export const Header = () => {
  const context = useContext(ActiveSectionContext)

  // Manejar el caso donde el contexto no esté disponible
  if (!context) {
    return (
      <header>
        <nav>Navegación no disponible</nav>
      </header>
    )
  }

  const { activeSection } = context

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(`[data-section="${sectionId}"]`)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <div className="fixed top-2 left-4 z-50">
        <Toggle />
      </div>
      <nav
        aria-label="Navegación principal"
        className="fixed top-2 right-4 z-50 hidden lg:flex items-center gap-1 p-1.5
      bg-white/20 dark:bg-black/20 backdrop-blur-lg rounded-xl shadow-md
      text-sm text-black/80 dark:text-white/50 font-medium transition-all duration-300"
      >
        {sections.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            data-label={label}
            onClick={() => scrollToSection(id)}
            // El ::after invisible en negrita reserva el ancho del estado activo,
            // así el menú no cambia de tamaño al pasar de una sección a otra.
            className={`whitespace-nowrap px-4 py-3 rounded-xl cursor-pointer transition-colors hover:dark:text-white hover:dark:bg-black/30
            after:block after:h-0 after:overflow-hidden after:invisible after:font-semibold after:content-[attr(data-label)]
            ${activeSection === id ? "dark:text-white font-semibold transition-all duration-500" : ""}`}
          >
            {label}
          </button>
        ))}
      </nav>
      <MobileMenu activeSection={activeSection} onNavigate={scrollToSection} />
    </>
  )
}
