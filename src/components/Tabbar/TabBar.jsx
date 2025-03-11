import React from "react";

export default function TabBar() {
  return (
    // "block md:hidden" permet de n'afficher la barre que sur mobile.
    <div className="fixed bottom-4 w-full flex justify-center md:hidden">
      {/* Conteneur barre “flottante” */}
      <nav
        className="
          relative 
          w-11/12 
          bg-white 
          border 
          border-gray-200 
          rounded-2xl 
          px-4 py-2 
          shadow-lg 
          flex 
          justify-between 
          items-center
        "
      >
        {/* Bouton 1 : Accueil */}
        <button className="flex flex-col items-center text-gray-600 hover:text-gray-900 focus:outline-none">
          {/* Icône Home */}
          <svg
            className="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 9.75L12 2.25l9 7.5v10.5a1.5 1.5 0 01-1.5 1.5h-3.75a1.5 1.5 0 01-1.5-1.5v-4.5h-3v4.5a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 20.25V9.75z"
            />
          </svg>
          <span className="text-xs">Accueil</span>
        </button>

        {/* Bouton 2 : Recherche */}
        <button className="flex flex-col items-center text-gray-600 hover:text-gray-900 focus:outline-none">
          {/* Icône Search */}
          <svg
            className="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 4.5a6.5 6.5 0 106.5 6.5m0 0l4.5 4.5"
            />
          </svg>
          <span className="text-xs">Recherche</span>
        </button>

        {/* Bouton 3 (Croix) */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-6">
          <button
            className="
              w-14 h-14 
              bg-cyan-400
              text-white 
              rounded-full 
              shadow-xl 
              hover:bg-cyan-400 
              focus:outline-none
              text-3xl
            "
          > +
          </button>
        </div>

        {/* Bouton 4 : Favoris */}
        <button className="flex flex-col items-center text-gray-600 hover:text-gray-900 focus:outline-none">
          {/* Icône Heart */}
          <svg
            className="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.172 5.172a4.001 4.001 0 015.656 0l1.172 1.172 1.172-1.172a4.001 4.001 0 015.656 5.656L12 15.656l-6.828-6.828a4.001 4.001 0 010-5.656z"
            />
          </svg>
          <span className="text-xs">Favoris</span>
        </button>

        {/* Bouton 5 : Profil */}
        <button className="flex flex-col items-center text-gray-600 hover:text-gray-900 focus:outline-none">
          {/* Icône User */}
          <svg
            className="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 7.125a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM3 20.25v-.75A4.5 4.5 0 017.5 15h9a4.5 4.5 0 014.5 4.5v.75"
            />
          </svg>
          <span className="text-xs">Profil</span>
        </button>
      </nav>
    </div>
  );
}
