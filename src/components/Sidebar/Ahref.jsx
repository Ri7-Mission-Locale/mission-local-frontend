function Ahref({ href, icon, text, badgeText, badgeColor }) {
    return (
      <li>
        <a
          href={href}
          className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
        >
          <span className="inline-flex justify-center items-center ml-4">
            {icon}
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">{text}</span>
          {badgeText && (
            <span className={`hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-${badgeColor}-500 bg-${badgeColor}-50 rounded-full`}>
              {badgeText}
            </span>
          )}
        </a>
      </li>
    );
  }
  

  

export default Ahref