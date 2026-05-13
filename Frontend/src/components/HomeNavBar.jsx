const NAV= [
  { text: "Home", url: "/" },
  { text: "About", url: "/home/about" },
  { text: "Services", url: "/services" },
  { text: "Cars", url: "/home/cars" },
  { text: "Contacts", url: "/home" }
];

const NavBar = () => {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-white/95 backdrop-blur-sm border-b border-black/[.06] px-10 py-4"
    >
      <span className="text-[1.25rem] font-bold tracking-tight text-slate-900">Drivenxa</span>

      <nav className="flex items-center gap-8">
        {NAV.map((l, i) => (
          <a
            key={l.text}
            href={l.url}
            className={`nav-link text-sm font-medium no-underline transition-colors ${l.text === "Home" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
          >
            {l.text}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-900 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <button className="flex items-center gap-1 text-[13.5px] font-medium text-gray-600 hover:text-gray-900 transition-colors">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          Eng
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
        </button>
        <button
          className="signup-btn bg-blue-600 text-white rounded-full px-5 py-2 text-sm font-semibold transition-shadow"
        >
          Sign Up
        </button>
      </div>
    </header>


  )
}

export default NavBar
