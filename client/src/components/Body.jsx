import image_1 from "../../public/header/image-1.png";
import image from "../../public/header/image.png";
import ellipse from "../../public/header/Ellipse 2.png";
import smile from "../../public/header/smile.png";
import ellipse_2 from "../../public/header/Ellipse 4.png";
import vector_1 from "../../public/header/Vector (1).png";
import vector from "../../public/header/Vector.png";

const Body = () => {
  return (
    <header className="w-full h-screen bg-[#160404] relative flex justify-center items-center">
      <img src={image_1} className="absolute left-40 bottom-0" />

      <div className="flex flex-col justify-center items-center gap-10">
        <h1 className="text-white text-6xl text-center">
          Make the <br />
          first ‘Merry’
        </h1>
        <h2 className="text-white text-center">
          If you feel lonely, let’s start meeting
          <br />
          new people in your area!
          <br />
          Dont’t forget to get Merry with us
        </h2>
        <button className="bg-[#c70039] shadow-[2px_2px_12px_0_rgba(64, 50, 133, 0.16)] rounded-[99px] text-[#ffffff] h-[48px] w-[163px] mt-[5%] font-[700] hover:bg-[#FF1659]">
          Start matching!
        </button>
      </div>

      <img src={image} className="absolute right-40 -top-20" />
      <img src={ellipse} className="absolute right-20 top-[430px]" />
      <img src={ellipse} className="absolute -left-3 top-24" />
      <img src={smile} className="absolute right-32 top-[460px]" />
      <img src={ellipse_2} className="absolute right-52 bottom-36" />
      <img src={ellipse_2} className="absolute left-32 top-20" />
      <img src={vector_1} className="absolute right-[600px] top-36" />
      <img src={vector} className="absolute left-[170px] top-[273px]" />
    </header>
  );
};

export default Body;
