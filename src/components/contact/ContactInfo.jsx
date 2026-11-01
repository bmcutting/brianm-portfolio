import { FiArrowUpRight } from "react-icons/fi"
import { CopyButton } from "./CopyButton"
import { CONTACT_EMAIL } from "../../hooks/useContactForm"

const InfoRow = ({ label, children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-[7.5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-1 py-3.5 border-t border-gray-200 dark:border-white/10">
    <dt className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
      {label}
    </dt>
    <dd className="min-w-0 font-semibold">{children}</dd>
  </div>
)

const ExternalLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-between gap-4 hover:text-primaryInk dark:hover:text-primaryDark transition-colors"
  >
    <span>{children}</span>
    <FiArrowUpRight
      aria-hidden="true"
      className="shrink-0 text-lg text-primaryInk dark:text-primaryDark"
    />
  </a>
)

export const ContactInfo = () => {
  return (
    <div>
      <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter leading-none mb-3">
        Contacto
      </h1>
      <p className="max-w-sm text-gray-600 dark:text-gray-400">
        Escríbeme por donde te resulte más cómodo o usa el formulario.
      </p>

      <dl className="mt-8 border-b border-gray-200 dark:border-white/10">
        <InfoRow label="Email">
          <div className="flex items-center justify-between gap-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="min-w-0 break-words hover:text-primaryInk dark:hover:text-primaryDark transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
            <CopyButton text={CONTACT_EMAIL} label="email" />
          </div>
        </InfoRow>
        <InfoRow label="LinkedIn">
          <ExternalLink href="https://www.linkedin.com/in/brian-michel-morales-cutting">
            Ver perfil<span className="sr-only"> de LinkedIn</span>
          </ExternalLink>
        </InfoRow>
        <InfoRow label="GitHub">
          <ExternalLink href="https://github.com/bmcutting">@bmcutting</ExternalLink>
        </InfoRow>
        <InfoRow label="Ubicación">La Habana, Cuba · remoto</InfoRow>
        <InfoRow label="Estado">
          <span className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full bg-primary dark:bg-primaryDark"
            />
            Abierto a empleo y proyectos
          </span>
        </InfoRow>
      </dl>
    </div>
  )
}
