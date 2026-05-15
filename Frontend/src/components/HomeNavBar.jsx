import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NAV = [
  { text: "Home", url: "/" },
  { text: "Cars", url: "/home/cars" },
];

const NavBar = () => {
  // Lire depuis le state pour que le composant réagisse aux changements
  const [nomClient, setNomClient] = useState(() => localStorage.getItem("nomClient"));
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("nomClient");
    localStorage.removeItem("idClient");
    setNomClient(null);
    navigate("/home");
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black/6 px-4 py-4 sm:px-6 lg:px-10">
      <div className="mx-auto flex flex-wrap items-center justify-between gap-4 max-w-7xl">
        <span className="text-[1.25rem] font-bold tracking-tight text-slate-900">Drivenxa</span>

        <nav className="flex flex-wrap items-center gap-3 md:gap-6">
          {NAV.map((l) => (
            <a
              key={l.text}
              href={l.url}
              className={`nav-link text-sm font-medium no-underline ${
                l.text === "Home" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {l.text}
            </a>
          ))}

          {nomClient && (
            <a
              href="/home/mesReservations"
              className="nav-link text-sm font-medium no-underline text-gray-600 hover:text-blue-600"
            >
              Mes Réservations
            </a>
          )}
        </nav>

        <div className="flex flex-wrap items-center justify-end gap-3">
          {!nomClient ? (
            <>
              <button className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1 border rounded-2xl p-2">
                <label>Rechercher</label>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>

              <a
                href="/loginclient"
                className="signup-btn bg-blue-600 text-white rounded-full px-5 py-2 text-sm font-semibold transition-shadow"
              >
                Login
              </a>
            </>
          ) : (
            <div className="flex gap-2 items-center">
              <a
                href="/home/mesReservations"
                className="signup-btn bg-blue-600 text-white rounded-full px-5 py-2 text-sm font-semibold transition-shadow"
              >
                {nomClient}
              </a>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-800 transition-colors"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;