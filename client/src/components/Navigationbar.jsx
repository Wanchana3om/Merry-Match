function Navigationbar() {
  const handleOnClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="relative z-30 w-full shadow-md">
      <div className="w-[77%] flex flex-row justify-between items-center  py-5 bg-white mx-auto ">
        <nav className="">
          <a href="#" className="text-black font-semibold text-4xl">
            Merry
          </a>
          <a href="#" className="text-red-500 font-bold text-4xl">
            Match
          </a>
        </nav>
        <nav>
          <ul className="flex flex-row mx-3">
            <li className="mr-[56px] text-base font-bold hover:text-[#191C77]">
              <a
                href="#why-merry"
                onClick={(e) => handleOnClick(e, "why-merry")}
              >
                Why Merry Match?
              </a>
            </li>
            <li className="mr-[56px] text-base font-bold hover:text-[#191C77]">
              <a href="#how-to" onClick={(e) => handleOnClick(e, "how-to")}>
                How to Merry
              </a>
            </li>
<<<<<<< HEAD
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold mx-5 px-6 rounded-full">
=======
            <button class="bg-red-500 hover:bg-red-600 text-white font-bold  px-6 rounded-full">
>>>>>>> feature/gus/change-form-register
              Login
            </button>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navigationbar;