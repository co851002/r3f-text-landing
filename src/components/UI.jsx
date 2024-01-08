import { atom, useAtom } from "jotai";

export const currentPageAtom = atom("intro");

export const UI = () => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  return (
    <div className="fixed inset-0 pointer-events-none">
      <section
        className={`flex w-full h-full flex-col items-center justify-center 
      duration-500
      ${currentPage === "home" ? "" : "opacity-0 hidden"}`}
      >
        <div className="h-[66%]"></div>
        <button
          onClick={() => setCurrentPage("store")}
          className="pointer-events-auto py-4 px-8 bg-blue-400 text-white font-black rounded-full hover:bg-blue-600 cursor-pointer transition-colors duration-500"
        >
          ENTER
        </button>
      </section>
      <section
        className={`flex w-full h-full flex-col items-center justify-center duration-500 absolute top-0
      ${currentPage === "store" ? "" : "opacity-0 hidden"}`}
      >
        <div className="h-[66%]"></div>

        <button
          onClick={() => setCurrentPage("home")}
          className="pointer-events-auto py-4 px-8 bg-red-400 text-white font-black rounded-full hover:bg-red-600 cursor-pointer transition-colors duration-500 "
        >
          Back
        </button>
      </section>
    </div>
  );
};
