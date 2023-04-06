function Homepage() {
  return (
    <div className="part-2-container flex w-[1440px] h-[533px] bg-[#160404]">
      <div className="text-container-outer flex flex-col justify-center items-center w-1/2 h-full pl-40">
        <h1 className="text-[#DF89C6] pb-10 font-bold">Why Merry Match</h1>
        <div className="text-container-inner flex flex-col gap-5">
          <p className="text-white text-sm text-left px-4 font-sans">
            Merry Match is a new generation of online dating website for
            everyone.
          </p>
          <p className="text-white text-sm text-left px-4 font-sans ">
            Whether you’re committed to dating, meeting new people, expanding
            your social network, meeting locals while traveling, or even just
            making a small chat with strangers.
          </p>
          <p className="text-white text-sm text-left px-4 font-sans ">
            This site allows you to make your own dating profile, discover new
            people, save favorite profiles, and let them know that you’re
            interested.
          </p>
        </div>
      </div>
      <div className="picture container flex flex-col justify-center items-center w-1/2 h-full">
        <img
          className="h-[348px] w-[546px]"
          src="../src/assets/fast-and-easy.png"
        />
      </div>
    </div>
  );
}

export default Homepage;
