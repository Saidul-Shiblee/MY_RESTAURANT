import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";

const Footer = () => {
  return (
    <div className="flex justify-around  bg-gray-800 h-[calc(100vh_-_80px)]  w-full" id="footer">
      <div className="w-2/5 h-full bg-[url('../public/images/footer.jpg')] bg-cover bg-no-repeat"></div>
      <div className="flex flex-col w-3/5 justify-around items-center pt-6">
        <div className="relative newsletter flex items-center justify-center w-2/6">
          <input
            className="focus:outline-none  bg-gray-800 text-white placeholder:text-xs pr-6 border-b-[1px] border-[#d1411e] w-full"
            placeholder="Enter your emial address"
            type="email"
          />
          <a href="#" className=" absolute right-0">
            <ArrowRightAltIcon fontSize="medium" style={{ color: "white" }} />
          </a>
        </div>
        <div className="flex pl-8 pr-20 justify-between w-full">
          <div className="Menu ">
            <h2 className="text-white text-lg font-semibold mb-2">Menu</h2>
            <ul className="text-white text-xs">
              <li className="leading-8 cursor-pointer">Pizza</li>
              <li className="leading-8 cursor-pointer">Burgers</li>
              <li className="leading-8 cursor-pointer">Sea Food</li>
              <li className="leading-8 cursor-pointer">Ice Cream</li>
              <li className="leading-8 cursor-pointer">Others</li>
            </ul>
          </div>
          <div className="Support">
            <h2 className="text-white font font-semibold mb-2">Support</h2>
            <ul className="text-white text-xs">
              <li className="leading-8 cursor-pointer">How To Order</li>
              <li className="leading-8 cursor-pointer">Where we Deliver</li>
              <li className="leading-8 cursor-pointer">FAQS</li>
              <li className="leading-8 cursor-pointer">Contact Us</li>
              <li className="leading-8 cursor-pointer">Where is My Order</li>
            </ul>
          </div>
          <div className="Support">
            <h2 className="text-white font font-semibold mb-2">Restaurent</h2>
            <ul className="text-white text-xs">
              <li className="leading-8 cursor-pointer">About Us</li>
              <li className="leading-8 cursor-pointer">Menu</li>
              <li className="leading-8 cursor-pointer">Offers & Coupons</li>
              <li className="leading-8 cursor-pointer">Reservation</li>
            </ul>
          </div>
          <div className="opening Hour">
            <h2 className="text-white font font-semibold mb-2">Opening Hour</h2>
            <ul className="text-white text-xs">
              <li className="leading-8 cursor-pointer">
                Week Day : 10.30AM-9.00PM
              </li>
              <li className="leading-8 cursor-pointer">
                Week Day : 9.30AM-10.30PM
              </li>
              <li className="leading-8 cursor-pointer">
                Week Day : 9.30AM-10.30PM
              </li>
            </ul>
          </div>
        </div>
        <div className="socialMedia flex gap-8 ">
          <a className="hover:text-[#d1411e] text-white cursor-pointer transition-all duration-75 ease-linear">
            <FacebookIcon />
          </a>
          <a className="hover:text-[#d1411e] text-white cursor-pointer transition-all duration-75 ease-linear">
            <InstagramIcon />
          </a>
          <a className="hover:text-[#d1411e] text-white cursor-pointer transition-all duration-75 ease-linear">
            <PinterestIcon />
          </a>
        </div>
        <div className="border-t-[1px] w-full border-[#d1411e] flex items-end justify-center text-xs text-white ">
          <p className="text-center">
            Copyright 2022 ,Foody ,All Right Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
