import { FaDev } from "react-icons/fa"
import { articles } from "./articlesData"

export const Articles = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="font-display text-3xl font-semibold tracking-tight text-center mb-8">
        Artículos
      </h3>
      <div className="flex flex-col gap-6">
        {articles.map((article) => (
          <a
            key={article.url}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-wrap sm:flex-nowrap items-center gap-5 bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <FaDev className="text-6xl shrink-0" aria-hidden="true" />
            <div>
              <h4 className="font-display text-lg font-semibold tracking-tight mb-1">
                {article.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {article.description}
              </p>
            </div>
            <span className="sm:ml-auto shrink-0 text-sm font-medium text-blue-600 dark:text-blue-400">
              Leer en dev.to →
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
