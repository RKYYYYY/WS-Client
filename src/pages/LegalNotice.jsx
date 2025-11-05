export default function LegalNotice() {
  return (
    <div className="flex flex-col mx-4 max-w-4xl w-full">
      {/* Page header */}
      <div className="flex flex-col items-center mt-10 mb-10">
        <h1 className="font-schibsted-grotesk text-secondary-100 font-extrabold text-3xl sm:text-4xl mb-4 text-center">
          Legal Notice
        </h1>
        <p className="text-secondary-400 text-sm sm:text-base">
          Effective as of November 04, 2025
        </p>
      </div>

      {/* Content */}
      <div className="bg-secondary-800 border border-secondary-700 rounded-2xl p-6 sm:p-8 mb-10">
        {/* Introduction */}
        <div className="mb-8">
          <p className="text-secondary-200 text-base leading-relaxed mb-4">
            In accordance with the provisions of Law No. 2004-575 of June 21,
            2004 on Confidence in the Digital Economy, users and visitors,
            hereinafter referred to as the "User", of the website
            wrongsettings.netlify.app/, hereinafter referred to as the "Site",
            are hereby informed of these legal notices.
          </p>
          <p className="text-secondary-200 text-base leading-relaxed mb-4">
            Connection to and navigation of the Site by the User implies full
            and unreserved acceptance of these legal notices.
          </p>
          <p className="text-secondary-200 text-base leading-relaxed">
            These are accessible on the Site under the "Legal Notice" section.
          </p>
        </div>

        {/* Site Publication */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            Site Publication
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <p className="text-secondary-200 text-base leading-relaxed mb-3">
              The publication and editorial management of the Site is provided
              by:
            </p>
            <ul className="text-secondary-300 text-base leading-relaxed space-y-2">
              <li>
                <span className="font-semibold text-secondary-200">Name:</span>{" "}
                Mr. Dylan Manier
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

        {/* Hosting */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            Hosting
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <p className="text-secondary-200 text-base leading-relaxed mb-3">
              The Site is hosted by:
            </p>
            <ul className="text-secondary-300 text-base leading-relaxed space-y-2">
              <li>
                <span className="font-semibold text-secondary-200">
                  Company:
                </span>{" "}
                Netlify
              </li>
              <li>
                <span className="font-semibold text-secondary-200">
                  Headquarters:
                </span>{" "}
                2325 3rd Street, Suite 215, California 94107, USA
              </li>
            </ul>
          </div>
        </div>

        {/* Site Access */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            Site Access
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <p className="text-secondary-200 text-base leading-relaxed">
              The Site is normally accessible at all times to Users. However,
              the Publisher may, at any time, suspend, limit, or interrupt the
              Site in order to perform updates or modifications to its content.
              The Publisher cannot be held responsible for any consequences of
              this unavailability on the User's activities.
            </p>
          </div>
        </div>

        {/* Data Collection */}
        <div className="mb-8">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            Data Collection
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <p className="text-secondary-200 text-base leading-relaxed mb-4">
              The Site ensures the collection and processing of personal data in
              respect of privacy in accordance with Law No. 78-17 of January 6,
              1978 relating to data processing, files, and freedoms, and in
              compliance with applicable regulations regarding the processing of
              personal data in accordance with Regulation (EU) 2016/679 of the
              European Parliament and of the Council of April 27, 2016
              (hereinafter, together, the "Applicable Regulation on Personal
              Data Protection").
            </p>
            <p className="text-secondary-200 text-base leading-relaxed mb-4">
              Under the Applicable Regulation on Personal Data Protection, the
              User has the right to access, rectify, delete, and object to their
              personal data.
            </p>
            <p className="text-secondary-200 text-base leading-relaxed">
              The User can exercise this right by email at:{" "}
              <a
                href="mailto:dylanmnr@proton.me"
                className="text-primary-400 hover:text-primary-500 transition-colors duration-300 font-semibold"
              >
                dylanmnr@proton.me
              </a>
            </p>
          </div>
        </div>

        {/* Intellectual Property */}
        <div className="mb-0">
          <h2 className="font-schibsted-grotesk text-primary-400 font-bold text-xl sm:text-2xl mb-4">
            Intellectual Property
          </h2>
          <div className="bg-secondary-900 border border-secondary-700 rounded-xl p-4 sm:p-6">
            <p className="text-secondary-200 text-base leading-relaxed">
              Any use, reproduction, distribution, commercialization, or
              modification of all or part of the Site, without the express
              authorization of the Publisher, is prohibited and may result in
              legal actions and proceedings as provided for by current
              regulations.
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
