function Footer() {
  return (
    <footer className="absolute w-full h-auto py-5 bg-white">
      <div className="flex flex-col items-center justify-center">
        <div>
          <span className="text-black font-semibold text-4xl">Merry</span>
          <span className="text-red-500 font-bold text-4xl">Match</span>
        </div>
        <div className="text-gray-700 py-2 pb-5 text-xl">
          New generation of online dating website for everyone
        </div>
        <hr className="w-3/4 mx-auto border-b-2 my-3" />
        <div className="text-gray-400 text-sm">
          copyright ©2022 merrymatch.com All rights reserved
        </div>
      </div>
      <div className="flex flex-row items-center justify-center py-2">
        <a href="https://" target="blank">
          <img src='../../icon/fb.png' alt="facebook icon" className="w-8 m-1"></img>
        </a>
        <a href="https://" target="blank">
          <img src='../../icon/ig.png' alt="instagram icon" className="w-8 m-1"></img>
        </a>
        <a href="https://" target="blank">
          <img src='../../icon/tw.png' alt="twitter icon" className="w-8 m-1"></img>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
