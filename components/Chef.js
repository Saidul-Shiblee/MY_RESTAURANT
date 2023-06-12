import React from "react";
import Chef1 from "../public/images/chef/Lorenzo.jpg";
import Chef2 from "../public/images/chef/Tom_Wandera.jpg";
import Chef3 from "../public/images/chef/Shota.jpg";
import Chef4 from "../public/images/chef/Anna.jpg";
import Image from "next/image";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";

const Chef = () => {
  return (
    <div className="py-10 px-20 flex flex-col  bg-gray-50 w-full">
      <div className="flex flex-col items-center gap-3 mb-10">
        <h2 className="text-lg font-semibold text-[#d1411e] text-center">
          Our Chefs
        </h2>
        <h2 className="text-2xl font-bold text-gray-600 text-center">
          Meet our great Heros
        </h2>
        <p className=" text-sm text-gray-600 w-1/2 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
          laudantium ipsum voluptas incidunt perferendis non nobis eius dolore
          quo sequi, earum praesentium est eveniet inventore iusto quasi natus
          amet nisi?Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Dolorem laudantium ipsum voluptas incidunt perferendis non nobis eius
          dolore quo sequi, earum praesentium est eveniet inventore iusto quasi
          natus amet nisi?
        </p>
      </div>
      <div className="flex gap-4 w-full  justify-between">
        <div className="relative w-[23%] cursor-pointer chefCard drop-shadow-md hover:drop-shadow-xl transitiona-all ease-in-out duration-100 hover:scale-[1.005]">
          <Image className="chefImage" src={Chef1} />
          <div className="absolute flip-card w-1/2 h-1/6 z-10 bottom-3 left-1/2 -translate-x-1/2 ">
            <div className=" flip-card-inner flip-card-inner    ">
              <div className=" flip-card-front cursor-pointer flex flex-col  justify-center  items-center  text-[#d1411e]   rounded-lg  backdrop-blur-lg ">
                <h3 className="font-semibold text-center">Lorenzo</h3>
                <h3 className="text-xs text-center">Senior Chef</h3>
              </div>
              <div className="flip-card-back flex gap-4 justify-center  items-center cursor-pointer   text-[#d1411e]  rounded-lg  backdrop-blur-lg">
                <a className="text-[#d1411e]  cursor-pointer transition-all duration-75 ease-linear">
                  <FacebookIcon fontSize="small" />
                </a>
                <a className="text-[#d1411e]  cursor-pointer transition-all duration-75 ease-linear">
                  <InstagramIcon fontSize="small" />
                </a>
                <a className="text-[#d1411e]  cursor-pointer transition-all duration-75 ease-linear">
                  <PinterestIcon fontSize="small" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-[23%] cursor-pointer chefCard drop-shadow-md hover:drop-shadow-xl transitiona-all ease-in-out duration-100 hover:scale-[1.005]">
          <Image className="chefImage" src={Chef2} />
          <div className="absolute flip-card w-1/2 h-1/6 z-10 bottom-3 left-1/2 -translate-x-1/2 ">
            <div className=" flip-card-inner flip-card-inner    ">
              <div className=" flip-card-front cursor-pointer flex flex-col  justify-center  items-center  text-[#d1411e]   rounded-lg  backdrop-blur-lg ">
                <h3 className="font-semibold text-center">Tom</h3>
                <h3 className="text-xs text-center">Senior Chef</h3>
              </div>
              <div className="flip-card-back flex gap-4 justify-center  items-center cursor-pointer   text-[#d1411e]  rounded-lg  backdrop-blur-lg">
                <a className="text-[#d1411e]  cursor-pointer transition-all duration-75 ease-linear">
                  <FacebookIcon fontSize="small" />
                </a>
                <a className="text-[#d1411e]  cursor-pointer transition-all duration-75 ease-linear">
                  <InstagramIcon fontSize="small" />
                </a>
                <a className="text-[#d1411e]  cursor-pointer transition-all duration-75 ease-linear">
                  <PinterestIcon fontSize="small" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-[23%] cursor-pointer chefCard drop-shadow-md hover:drop-shadow-xl transitiona-all ease-in-out duration-100 hover:scale-[1.005]">
          <Image className="chefImage" src={Chef3} />
          <div className="absolute flip-card w-1/2 h-1/6 z-10 bottom-3 left-1/2 -translate-x-1/2 ">
            <div className=" flip-card-inner flip-card-inner    ">
              <div className=" flip-card-front cursor-pointer flex flex-col  justify-center  items-center  text-[#d1411e]   rounded-lg  backdrop-blur-lg ">
                <h3 className="font-semibold text-center">Shato</h3>
                <h3 className="text-xs text-center">Senior Chef</h3>
              </div>
              <div className="flip-card-back flex gap-4 justify-center  items-center cursor-pointer   text-[#d1411e]  rounded-lg  backdrop-blur-lg">
                <a className="text-[#d1411e]  cursor-pointer transition-all duration-75 ease-linear">
                  <FacebookIcon fontSize="small" />
                </a>
                <a className="text-[#d1411e]  cursor-pointer transition-all duration-75 ease-linear">
                  <InstagramIcon fontSize="small" />
                </a>
                <a className="text-[#d1411e]  cursor-pointer transition-all duration-75 ease-linear">
                  <PinterestIcon fontSize="small" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-[23%] cursor-pointer chefCard drop-shadow-md hover:drop-shadow-xl transitiona-all ease-in-out duration-100 hover:scale-[1.005]">
          <Image className="chefImage" src={Chef4} />
          <div className="absolute flip-card w-1/2 h-1/6 z-10 bottom-3 left-1/2 -translate-x-1/2 ">
            <div className=" flip-card-inner flip-card-inner    ">
              <div className=" flip-card-front cursor-pointer flex flex-col  justify-center  items-center  text-[#d1411e]   rounded-lg  backdrop-blur-lg ">
                <h3 className="font-semibold text-center">Anna</h3>
                <h3 className="text-xs text-center">Senior Chef</h3>
              </div>
              <div className="flip-card-back flex gap-4 justify-center  items-center cursor-pointer   text-[#d1411e]  rounded-lg  backdrop-blur-lg">
                <a className="text-[#d1411e]  cursor-pointer transition-all duration-75 ease-linear">
                  <FacebookIcon fontSize="small" />
                </a>
                <a className="text-[#d1411e]  cursor-pointer transition-all duration-75 ease-linear">
                  <InstagramIcon fontSize="small" />
                </a>
                <a className="text-[#d1411e]  cursor-pointer transition-all duration-75 ease-linear">
                  <PinterestIcon fontSize="small" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chef;
