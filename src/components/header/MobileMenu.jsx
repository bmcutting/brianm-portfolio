import { useEffect, useRef, useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"
import { sections } from "./menu"

export const MobileMenu = ({ activeSection, onNavigate }) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const buttonRef = useRef(null)

  // Mientras está abierto: Escape o un toque fuera del menú lo cierran.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const onPointerDown = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [open])

  const handleNavigate = (sectionId) => {
    setOpen(false)
    onNavigate(sectionId)
  }

  return (
    <div ref={containerRef} className="fixed top-2 right-4 z-50 lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="flex items-center justify-center p-2 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300"
      >
        {open ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navegación principal"
          className="absolute right-0 mt-2 w-56 p-2 flex flex-col gap-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-xl shadow-lg text-sm font-medium text-black/80 dark:text-white/70"
        >
          {sections.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => handleNavigate(id)}
              className={`w-full text-left px-4 py-3 rounded-lg cursor-pointer transition-colors hover:bg-black/5 dark:hover:bg-white/10 ${
                activeSection === id ? "text-black dark:text-white font-semibold" : ""
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </div>
  )
}
