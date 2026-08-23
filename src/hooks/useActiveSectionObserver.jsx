// hooks/useActiveSection.js
import { useEffect, useContext, useRef } from "react"
import { ActiveSectionContext } from "../contexts/ActiveSection/ActiveSectionContext"

export function useActiveSection() {
  const { setActiveSection } = useContext(ActiveSectionContext)
  const sectionRatios = useRef(new Map()) // Guardamos ratios de todas las secciones

  useEffect(() => {
    const ratios = sectionRatios.current
    const sections = document.querySelectorAll("[data-section]")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Actualizamos el ratio de cada sección
          ratios.set(entry.target.dataset.section, entry.intersectionRatio)
        })

        // Encontramos la sección con mayor ratio de intersección
        let maxRatio = 0
        let mostVisibleSection = ""

        ratios.forEach((ratio, sectionId) => {
          if (ratio > maxRatio) {
            maxRatio = ratio
            mostVisibleSection = sectionId
          }
        })

        // Solo actualizamos si hay una sección visible significativamente
        if (mostVisibleSection && maxRatio > 0.1) {
          setActiveSection(mostVisibleSection)
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: "-20% 0% -20% 0%", // Ignora el 20% superior e inferior
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
      ratios.clear()
    }
  }, [setActiveSection])
}
