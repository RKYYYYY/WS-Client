import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import CookieConsent from "react-cookie-consent";

function App() {
  return (
    <div className="bg-secondary-900 min-h-screen flex flex-col ">
      <AuthProvider>
        <Header />
        <main className="flex-1 flex justify-center">
          <Outlet />
        </main>
        <Footer />
      </AuthProvider>

      {/* toast notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            backgroundColor: "oklch(26.18% 0.0237 256.4)",
            color: "oklch(87.83% 0.0169 250.9)",
            borderRadius: "12px",
            border: "solid 1px oklch(35.89% 0.0349 253.6)",
          },
          duration: 2000,
          success: {
            color: "oklch(81.25% 0.1884 154.7)",
            borderRadius: "12px",
            border: "solid 1px oklch(35.89% 0.0349 253.6)",
            iconTheme: {
              primary: "oklch(74.05% 0.1848 153.1 / 25%)",
              secondary: "oklch(81.25% 0.1884 154.7)",
            },
          },
          error: {
            color: "oklch(61.03% 0.1947 28.6)",
            borderRadius: "12px",
            border: "solid 1px oklch(35.89% 0.0349 253.6)",
            iconTheme: {
              primary: "oklch(54.18% 0.1937 29.4 / 25%)",
              secondary: "oklch(61.03% 0.1947 28.6)",
            },
          },
        }}
      />

      {/* Cookie Consent Banner */}
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        enableDeclineButton
        cookieName="wrongSettingsCookieConsent"
        style={{
          background: "oklch(26.18% 0.0237 256.4)",
          borderTop: "1px solid oklch(35.89% 0.0349 253.6)",
          padding: "20px",
        }}
        buttonStyle={{
          background: "oklch(89.91% 0.1819 97.6)",
          color: "oklch(15.4% 0.0092 264.3)",
          fontSize: "16px",
          fontWeight: "600",
          borderRadius: "12px",
          padding: "12px 24px",
          transition: "all 0.3s cubic-bezier(0.86,0,0.07,1)",
        }}
        declineButtonStyle={{
          background: "oklch(54.18% 0.1937 29.4 / 25%)",
          color: "oklch(61.03% 0.1947 28.6)",
          fontSize: "16px",
          fontWeight: "600",
          borderRadius: "12px",
          padding: "12px 24px",
          transition: "all 0.3s cubic-bezier(0.86,0,0.07,1)",
        }}
        contentStyle={{
          color: "oklch(87.83% 0.0169 250.9)",
          fontSize: "16px",
          margin: "0",
          flex: "1 1 auto",
        }}
        expires={365}
      >
        <span>
          We use cookies to enhance your experience on WrongSettings. These
          cookies help us remember your authentication and settings preferences.
          &nbsp;
          <a
            href="/privacy-policy"
            className="text-primary-400 underline hover:text-primary-500 transition-colors duration-300"
          >
            Learn more
          </a>
        </span>
      </CookieConsent>
    </div>
  );
}

export default App;
