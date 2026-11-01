export const ViewMore = ({ selectedProject, onClose }) => {
  return (
    /* El fondo cierra al pulsar fuera; el teclado se cubre con Escape y el botón Cerrar. */
    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-60 p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="bg-white dark:bg-gray-900 text-black dark:text-white p-8 rounded-2xl max-w-lg w-full max-h-[90dvh] overflow-y-auto shadow-xl relative"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
        >
          ×
        </button>
        <img
          src={selectedProject.image}
          alt={selectedProject.title}
          loading="lazy"
          decoding="async"
          width="900"
          height="600"
          className="w-full h-56 object-cover rounded-xl mb-5"
        />
        <h2 id="project-dialog-title" className="text-3xl font-bold mb-3">
          {selectedProject.title}
        </h2>
        <p className="text-sm mb-6">{selectedProject.details}</p>

        <div className="flex flex-wrap gap-4">
          {selectedProject.github && (
            <a
              href={selectedProject.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              GitHub
            </a>
          )}
          {selectedProject.deploy && (
            <a
              href={selectedProject.deploy}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-200 dark:bg-green-700 rounded-lg hover:bg-green-300 dark:hover:bg-green-600 transition"
            >
              Ver Deploy
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
