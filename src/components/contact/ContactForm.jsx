import { MESSAGE_MAX_LENGTH, useContactForm } from "../../hooks/useContactForm"

const labelClassName =
  "font-mono text-xs uppercase tracking-wider font-medium text-gray-600 dark:text-gray-400"

const inputClassName =
  "w-full rounded-lg border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 px-3.5 py-2.5 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors focus:outline-none focus:border-primaryInk dark:focus:border-primaryDark aria-[invalid=true]:border-red-700 aria-[invalid=true]:focus:border-red-700 dark:aria-[invalid=true]:border-red-300 dark:aria-[invalid=true]:focus:border-red-300"

// El hueco del error está siempre reservado: al aparecer un mensaje no se
// desplaza nada (antes empujaba el botón fuera de la pantalla).
const FieldError = ({ id, message }) => (
  <p id={id} className="min-h-5 text-sm text-red-700 dark:text-red-300">
    {message}
  </p>
)

export const ContactForm = () => {
  const {
    formData,
    errors,
    status,
    submitError,
    sentTo,
    formRef,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useContactForm()

  const fieldProps = (name) => ({
    id: name,
    name,
    value: formData[name],
    onChange: handleChange,
    onBlur: handleBlur,
    required: true,
    "aria-invalid": errors[name] ? "true" : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  })

  return (
    <div>
      <h3
        id="contact-form-title"
        className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-2"
      >
        Envíame un mensaje
      </h3>
      <p className="mb-8 text-gray-600 dark:text-gray-400">Te respondo por email.</p>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        aria-labelledby="contact-form-title"
        className="grid content-start gap-3"
      >
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <label htmlFor="website">No rellenar</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="user_name" className={labelClassName}>
            Nombre
          </label>
          <input
            type="text"
            autoComplete="name"
            maxLength={80}
            className={inputClassName}
            {...fieldProps("user_name")}
          />
          <FieldError id="user_name-error" message={errors.user_name} />
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="user_email" className={labelClassName}>
            Email
          </label>
          <input
            type="email"
            autoComplete="email"
            maxLength={254}
            className={inputClassName}
            {...fieldProps("user_email")}
          />
          <FieldError id="user_email-error" message={errors.user_email} />
        </div>

        <div className="grid gap-1.5">
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="message" className={labelClassName}>
              Mensaje
            </label>
            <span className="text-xs tabular-nums text-gray-500 dark:text-gray-400">
              {formData.message.length} / {MESSAGE_MAX_LENGTH}
            </span>
          </div>
          <textarea
            rows={4}
            maxLength={MESSAGE_MAX_LENGTH}
            placeholder="Cuéntame sobre el puesto o el proyecto"
            className={`${inputClassName} resize-y`}
            {...fieldProps("message")}
          />
          <FieldError id="message-error" message={errors.message} />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full cursor-pointer rounded-lg bg-primary dark:bg-primaryDark px-6 py-3 font-semibold text-gray-950 dark:text-backgroundDark transition hover:brightness-95 disabled:cursor-progress disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryInk dark:focus-visible:outline-primaryDark"
        >
          {status === "sending" ? (
            "Enviando…"
          ) : (
            <>
              Enviar mensaje <span aria-hidden="true">→</span>
            </>
          )}
        </button>

        <div role="status" aria-live="polite">
          {status === "sent" && (
            <p className="border-l-[3px] border-primary dark:border-primaryDark pl-3 text-gray-900 dark:text-gray-100">
              Mensaje enviado. Te responderé a {sentTo}.
            </p>
          )}
          {status === "error" && (
            <p className="border-l-[3px] border-red-700 dark:border-red-300 pl-3 text-red-700 dark:text-red-300">
              {submitError}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
