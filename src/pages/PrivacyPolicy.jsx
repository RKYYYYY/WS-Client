export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col mx-4 max-w-4xl w-full">
      {/* Page header */}
      <div className="flex flex-col items-center mt-10 mb-10">
        <h1 className="font-schibsted-grotesk text-secondary-100 font-extrabold text-3xl sm:text-4xl mb-4 text-center">
          Privacy Policy
        </h1>
        <p className="text-secondary-400 text-sm sm:text-base">
          Last updated: [To be completed]
        </p>
      </div>

      {/* Content */}
      <div className="bg-secondary-800 border border-secondary-700 rounded-2xl p-6 sm:p-8 mb-10">
        {/* Introduction */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            1. Introduction
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <p className="text-secondary-200 text-base leading-relaxed">
              This Privacy Policy describes how WrongSettings collects, uses,
              and protects users' personal data.
            </p>
          </div>
        </div>

        {/* Data Controller */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            2. Data Controller
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <ul className="text-secondary-300 text-base leading-relaxed space-y-2">
              <li>
                <span className="font-semibold text-secondary-200">Name:</span>{" "}
                Dylan MANIER - Self-employed
              </li>
              <li>
                <span className="font-semibold text-secondary-200">
                  Address:
                </span>{" "}
                20 rue du Faubourg d'Aval, 62190 Lillers, France
              </li>
              <li>
                <span className="font-semibold text-secondary-200">Email:</span>{" "}
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

        {/* Data Collected */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            3. Data Collected
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <p className="text-secondary-200 text-base leading-relaxed mb-4">
              When creating an account, we collect:
            </p>
            <ul className="text-secondary-300 text-base leading-relaxed space-y-2 list-disc ml-6">
              <li>Email address</li>
              <li>Password (encrypted)</li>
              <li>Username</li>
              <li>Technical data (IP address, browser)</li>
              <li>Game settings (CS2 configurations you choose to save)</li>
            </ul>
          </div>
        </div>

        {/* Purpose */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            4. Purpose
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <p className="text-secondary-200 text-base leading-relaxed mb-4">
              The data is used for:
            </p>
            <ul className="text-secondary-300 text-base leading-relaxed space-y-2 list-disc ml-6 mb-4">
              <li>Account management</li>
              <li>Site security</li>
              <li>Site improvement</li>
            </ul>
            <p className="text-secondary-200 text-base leading-relaxed font-semibold">
              No data is used for commercial purposes.
            </p>
          </div>
        </div>

        {/* Legal Basis */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            5. Legal Basis
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <p className="text-secondary-200 text-base leading-relaxed">
              The processing is based on the execution of the contract (user
              account) and the user's consent.
            </p>
          </div>
        </div>

        {/* Retention Period */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            6. Data Retention Period
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <p className="text-secondary-200 text-base leading-relaxed">
              Data is retained as long as the account is active and deleted
              within 30 days after its deletion.
            </p>
          </div>
        </div>

        {/* Hosting and Security */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            7. Hosting and Security
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <ul className="text-secondary-300 text-base leading-relaxed space-y-3">
              <li>
                <span className="font-semibold text-secondary-200">
                  Hosting:
                </span>{" "}
                Netlify (United States)
              </li>
              <li>
                <span className="font-semibold text-secondary-200">
                  Storage:
                </span>{" "}
                Data stored on secure servers
              </li>
              <li>
                <span className="font-semibold text-secondary-200">
                  Passwords:
                </span>{" "}
                All passwords are encrypted using industry-standard encryption
              </li>
            </ul>
          </div>
        </div>

        {/* Data Sharing */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            8. Data Sharing
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <p className="text-secondary-200 text-base leading-relaxed font-semibold">
              No data is sold or shared with third parties, except for legal
              obligations.
            </p>
          </div>
        </div>

        {/* Cookies */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            9. Cookies
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <p className="text-secondary-200 text-base leading-relaxed mb-4">
              WrongSettings uses only essential functional cookies:
            </p>
            <ul className="text-secondary-300 text-base leading-relaxed space-y-3 list-disc ml-6">
              <li>
                <span className="font-semibold text-secondary-200">
                  Authentication cookies:
                </span>{" "}
                Used to maintain your session and keep you logged in (7 days)
              </li>
              <li>
                <span className="font-semibold text-secondary-200">
                  Preference cookies:
                </span>{" "}
                Remember your cookie consent choice (365 days)
              </li>
            </ul>
            <p className="text-secondary-200 text-base leading-relaxed mt-4">
              We do not use tracking or advertising cookies. You can manage your
              cookie preferences at any time by clearing your browser cookies.
            </p>
          </div>
        </div>

        {/* User Rights */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            10. User Rights
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <p className="text-secondary-200 text-base leading-relaxed mb-4">
              Under the GDPR, you have the following rights:
            </p>
            <ul className="text-secondary-300 text-base leading-relaxed space-y-2 list-disc ml-6 mb-4">
              <li>
                <span className="font-semibold text-secondary-200">
                  Right of access:
                </span>{" "}
                Obtain a copy of your personal data
              </li>
              <li>
                <span className="font-semibold text-secondary-200">
                  Right to rectification:
                </span>{" "}
                Correct inaccurate data
              </li>
              <li>
                <span className="font-semibold text-secondary-200">
                  Right to deletion:
                </span>{" "}
                Request deletion of your data
              </li>
              <li>
                <span className="font-semibold text-secondary-200">
                  Right to object:
                </span>{" "}
                Object to certain data processing
              </li>
              <li>
                <span className="font-semibold text-secondary-200">
                  Right to portability:
                </span>{" "}
                Receive your data in a structured format
              </li>
            </ul>
            <p className="text-secondary-200 text-base leading-relaxed">
              To exercise these rights, contact:{" "}
              <a
                href="mailto:dylanmnr@proton.me"
                className="text-primary-400 hover:text-primary-500 transition-colors duration-300 font-semibold"
              >
                dylanmnr@proton.me
              </a>{" "}
              (response within 30 days)
            </p>
          </div>
        </div>

        {/* Policy Updates */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            11. Policy Updates
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <p className="text-secondary-200 text-base leading-relaxed">
              This Privacy Policy may be updated. The date will appear at the
              top of the document.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="mb-0">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            12. Contact
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
          European legislation (GDPR)
        </p>
      </div>
    </div>
  );
}
