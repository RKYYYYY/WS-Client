export default function TermsOfService() {
  return (
    <div className="flex flex-col mx-4 max-w-4xl w-full">
      {/* Page header */}
      <div className="flex flex-col items-center mt-10 mb-10">
        <h1 className="font-schibsted-grotesk text-secondary-100 font-extrabold text-3xl sm:text-4xl mb-4 text-center">
          Terms of Service
        </h1>
      </div>

      {/* Content */}
      <div className="bg-secondary-800 border border-secondary-700 rounded-2xl p-6 sm:p-8 mb-10">
        {/* Introduction */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            1. Site Presentation
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <p className="text-secondary-200 text-base leading-relaxed mb-4">
              The WrongSettings website, accessible at{" "}
              <a
                href="https://wrongsettings.netlify.app"
                className="text-primary-400 hover:text-primary-500 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://wrongsettings.netlify.app
              </a>
              , is a platform allowing users to create an account to record,
              manage, and share their game settings used on Counter-Strike 2
              (CS2).
            </p>
            <p className="text-secondary-200 text-base leading-relaxed">
              Access and use of the site are subject to these Terms of Service
              (hereinafter "Terms"). By creating an account on WrongSettings,
              the user acknowledges having read, understood, and accepted
              without reservation these Terms.
            </p>
          </div>
        </div>

        {/* Legal Information */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            2. Legal Information
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <ul className="text-secondary-300 text-base leading-relaxed space-y-2">
              <li>
                <span className="font-semibold text-secondary-200">
                  Site Owner:
                </span>{" "}
                Dylan MANIER
              </li>
              <li>
                <span className="font-semibold text-secondary-200">
                  Legal Status:
                </span>{" "}
                Self-employed
              </li>
              <li>
                <span className="font-semibold text-secondary-200">
                  Address:
                </span>{" "}
                20 rue du Faubourg d'Aval, 62190 Lillers, France
              </li>
              <li>
                <span className="font-semibold text-secondary-200">
                  Contact Email:
                </span>{" "}
                <a
                  href="mailto:dylanmnr@proton.me"
                  className="text-primary-400 hover:text-primary-500 transition-colors duration-300"
                >
                  dylanmnr@proton.me
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Site Access */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            3. Site Access
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <p className="text-secondary-200 text-base leading-relaxed mb-4">
              Access to the WrongSettings site is reserved for registered users.
              To benefit from the site's features, the user must create a
              personal account and provide the information requested during
              registration.
            </p>
            <p className="text-secondary-200 text-base leading-relaxed">
              The site is freely accessible from any device with an Internet
              connection. The site hosting is provided by Netlify.
            </p>
          </div>
        </div>

        {/* Account Creation and Management */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            4. Account Creation and Management
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <p className="text-secondary-200 text-base leading-relaxed mb-4">
              The user undertakes to provide accurate information when creating
              their account and to keep it up to date. They are solely
              responsible for the confidentiality of their credentials and all
              actions performed from their account.
            </p>
            <p className="text-secondary-200 text-base leading-relaxed">
              In case of loss or compromise of their credentials, the user must
              contact the site administrator.
            </p>
          </div>
        </div>

        {/* Site Usage */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            5. Site Usage
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <p className="text-secondary-200 text-base leading-relaxed mb-4">
              WrongSettings allows its members to:
            </p>
            <ul className="text-secondary-300 text-base leading-relaxed space-y-2 list-disc ml-6 mb-4">
              <li>Record their CS2 game settings</li>
              <li>Consult their settings</li>
              <li>Share them with other users</li>
            </ul>
            <p className="text-secondary-200 text-base leading-relaxed">
              Any use of the site contrary to its purpose is strictly
              prohibited. The administrator reserves the right to suspend or
              delete a user account in case of abusive use.
            </p>
          </div>
        </div>

        {/* Intellectual Property */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            6. Intellectual Property
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <p className="text-secondary-200 text-base leading-relaxed">
              All elements of the site (texts, images, logos, code, etc.) are
              protected by copyright. Any unauthorized reproduction or
              distribution is prohibited.
            </p>
          </div>
        </div>

        {/* Site Evolution */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            7. Site Evolution
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <p className="text-secondary-200 text-base leading-relaxed">
              Dylan MANIER reserves the right to modify or suspend the site at
              any time. These Terms may also be modified without notice.
            </p>
          </div>
        </div>

        {/* Personal Data */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            8. Personal Data
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <p className="text-secondary-200 text-base leading-relaxed">
              Personal data is processed in accordance with the site's{" "}
              <a
                href="/privacy-policy"
                className="text-primary-400 hover:text-primary-500 transition-colors duration-300 font-semibold"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        {/* Applicable Law */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            9. Applicable Law
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <p className="text-secondary-200 text-base leading-relaxed">
              These Terms are applicable internationally, subject to French law.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="mb-0">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            10. Contact
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <p className="text-secondary-200 text-base leading-relaxed">
              For any questions:{" "}
              <a
                href="mailto:dylanmnr@proton.me"
                className="text-primary-400 hover:text-primary-500 transition-colors duration-300 font-semibold"
              >
                dylanmnr@proton.me
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="text-center mb-10">
        <p className="text-secondary-500 text-sm">
          This document was drafted in accordance with applicable French and
          European legislation
        </p>
      </div>
    </div>
  );
}
