import Image from "next/image";
import React from "react";
import aboutImage from "../public/images/about.jpeg";

const About = () => {
  return (
    <div
      id="about-us"
      className="px-20 py-10 h-[calc(100vh_-_80px)] w-full flex justify-between  items-center bg-[#f3f2f2]"
    >
      <div className="relative w-2/6 ">
        <Image
          src={aboutImage}
          width="full"
          height="full"
          className="rounded-lg"
        />
      </div>
      <div className="w-4/6 flex flex-col gap-3 items-start pl-16 ml-10">
        <h2 className="text-lg font-semibold text-[#d1411e]">About Us</h2>
        <h2 className="text-2xl font-bold text-gray-600">This is our Story</h2>
        <p className=" text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
          laudantium ipsum voluptas incidunt perferendis non nobis eius dolore
          quo sequi, earum praesentium est eveniet inventore iusto quasi natus
          amet nisi?Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Dolorem laudantium ipsum voluptas incidunt perferendis non nobis eius
          dolore quo sequi, earum praesentium est eveniet inventore iusto quasi
          natus amet nisi?
        </p>
      </div>
    </div>
  );
};

export default About;
