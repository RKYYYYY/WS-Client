import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="bg-secondary-900 min-h-screen flex flex-col items-center justify-center">
      <AuthProvider>
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Outlet />
        </main>
        <Footer />
      </AuthProvider>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            backgroundColor: "oklch(26.18% 0.0237 256.4)",
            color: "oklch(87.83% 0.0169 250.9)",
            borderRadius: "12px",
            border: "solid 1px oklch(35.89% 0.0349 253.6)",
          },
          duration: 3500,
          success: {
            color: "oklch(81.25% 0.1884 154.7)",
            borderRadius: "12px",
            border: "solid 1px oklch(35.89% 0.0349 253.6)",
            icon: "✓",
            iconTheme: {
              primary: "oklch(74.05% 0.1848 153.1 / 50%)",
              secondary: "oklch(81.25% 0.1884 154.7)",
            },
          },
          error: {
            color: "oklch(61.03% 0.1947 28.6)",
            borderRadius: "12px",
            border: "solid 1px oklch(35.89% 0.0349 253.6)",
            icon: "✕",
            iconTheme: {
              primary: "oklch(54.18% 0.1937 29.4 / 50%)",
              secondary: "oklch(61.03% 0.1947 28.6)",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
