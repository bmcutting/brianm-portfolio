import { ContactForm } from "./ContactForm"
import { ContactInfo } from "./ContactInfo"

export const ContactPage = () => {
  return (
    <section
      className="min-h-screen flex items-center bg-background dark:bg-backgroundDark text-gray-900 dark:text-gray-200 px-6 py-20"
      id="contact"
      data-section="contact"
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-14 lg:gap-24">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  )
}
