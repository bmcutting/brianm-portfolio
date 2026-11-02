import { useCallback, useState } from "react"
import { projects } from "./projects"
import { ViewMore } from "./ViewMore"
import { Articles } from "./Articles"
import { useModal } from "../../hooks/useModal"

export const ProjectPage = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const closeProject = useCallback(() => setSelectedProject(null), [])
  useModal(selectedProject !== null, closeProject)

  return (
    <section
      className="min-h-screen bg-white dark:bg-backgroundDark text-black dark:text-white px-6 py-12"
      id="projects"
      data-section="projects"
    >
      <h2 className="section-title text-center mb-12">Mis Proyectos</h2>
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 place-items-center mb-20">
        {projects.map((project) => (
          <div
            key={project.title}
            className="max-w-sm w-full bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              width="900"
              height="600"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="font-display text-2xl font-semibold tracking-tight mb-3">
                {project.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 mb-5">
                {project.description}
              </p>
              <button
                onClick={() => setSelectedProject(project)}
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                Ver más
              </button>
            </div>
          </div>
        ))}
      </div>

      <Articles />

      {selectedProject && (
        <ViewMore selectedProject={selectedProject} onClose={closeProject} />
      )}
    </section>
  )
}
