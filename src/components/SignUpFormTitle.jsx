export default function SignUpFormTitle({ label,onClick,step }) {
  return (
    <>
      <div className="flex flex-row items-center m-auto gap-3  justify-center">
        {step > 0 &&  <svg onClick={onClick}
          class="w-6 h-6 text-gray-800 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m15 19-7-7 7-7"
          />
        </svg>}
       
        <h2 className="text-center font-bold text-2xl  ">{label}</h2>
      </div>
    </>
  );
}
