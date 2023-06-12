import React from "react";

export const Reservation = () => {
  return (
    <div className="bg-[url('../public/images/reservation.jpg')] w-full h-[calc(100vh_-_80px)] bg-cover	flex items-center justify-center">
      <div className="bg-white/80 flex flex-col justify-around w-1/4  items-center pb-4 gap-4 rounded-lg">
        <div className="bg-[#d1411e] text-white font-semibold w-full rounded-t-lg">
          <h3 className="text-center text-2xl ">Reservation</h3>
        </div>
        <div>
          <h2 className="text-gray-600 text-xl font-semibold tetx-center">
            Opening Time
          </h2>
          <h3 className="text-[#d1411e] text-sm font-semibold tetx-center">
            Open 7 Days a Week
          </h3>
        </div>
        <div className="flex flex-col w-full px-10 gap-2 text-sm font-semibold divide-y divide-dashed divide-[#d1411e]">
          <div className="flex justify-between items-center">
            <p>Week Days</p>
            <p>10.30AM-9.00PM</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Week Days</p>
            <p>10.30AM-9.00PM</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Week Days</p>
            <p>10.30AM-9.00PM</p>
          </div>
        </div>
        <div className="text-sm text-center">
          <h3>Book your table for lunch or dinner</h3>
        </div>
        <div className="px-4 py-1 bg-[#d1411e]  rounded-full text-white flex justify-center items-center">
          Book Now
        </div>
      </div>
    </div>
  );
};
