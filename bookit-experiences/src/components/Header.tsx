import React from "react";

interface HeaderProps {
  search?: string;
  setSearch?: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ search, setSearch }) => {
  const searchActive = typeof setSearch === "function";
  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex flex-col sm:flex-row items-center gap-4">
        {/* Logo always visible */}
        <div className="flex items-center gap-2 flex-shrink-0 mb-2 sm:mb-0">
          <img src="/images/logo.png" alt="Logo" className="h-10 sm:h-12 w-auto block" />
        </div>
        <div className="flex-1 w-full">
          <div className="flex  flex-col sm:flex-row sm:items-center gap-2 w-full justify-end">
            <input
              className="border shadow-md border-gray-300
                transition-transform transition-shadow duration-200
                hover:shadow-lg hover:-translate-y-[2px]
                cursor-pointer rounded px-4 py-2  text-sm placeholder-gray-400 w-full sm:w-[180px] md:w-[220px] outline-none"
              placeholder="Search experiences"
              value={search ?? ""}
              onChange={searchActive ? (e) => setSearch!(e.target.value) : undefined}
              type="text"
              disabled={!searchActive}
              // w-full for mobile, fixed width for sm/md+ screens
            />
            <button
              className="bg-primary  shadow-md               // <-- Always visible medium shadow
                        transition-transform transition-shadow duration-200
                        hover:shadow-lg hover:-translate-y-[2px] hover:border-primary
                        cursor-pointer hover:bg-primary-hover text-black text-sm font-medium px-4 py-2 rounded"
              disabled={!searchActive}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
