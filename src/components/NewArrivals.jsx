import React from "react";

const NewArrivals = () => {
  return (
    <div className="w-full bg-[#f8f5f2] pb-12">

      {/* 🔶 TOP BANNER */}
      <div className="relative w-full h-[55vh]">

        <img
          src="/show.jpeg"
          alt="banner"
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

        {/* TEXT */}
        <div
          className="absolute inset-0 flex flex-col justify-center px-16 text-white"
          style={{ fontFamily: "Playfair Display" }}
        >
          <h1 className="text-5xl font-semibold mb-3">
            Abirami World
          </h1>

          <p className="text-xl mb-2">
            A company for every occasion
          </p>

          <p className="text-sm text-gray-200 max-w-xl">
            Discover timeless jewellery crafted for every moment in life.
          </p>
        </div>

      </div>

      {/* 🔶 CARDS */}
      <div className="grid grid-cols-2 gap-6 px-16 -mt-20">

        {/* CARD 1 */}
        <div className="relative rounded-xl overflow-hidden group shadow-lg">

          <img
            src="/show1.jpeg"
            alt="silver idols"
            className="w-full h-[300px] object-cover group-hover:scale-105 transition duration-300"
          />

          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-xl font-semibold">Bracelets</p>
          </div>

        </div>

        {/* CARD 2 */}
        <div className="relative rounded-xl overflow-hidden group shadow-lg">

          <img
            src="/show2.jpeg"
            alt="chains"
            className="w-full h-[300px] object-cover group-hover:scale-105 transition duration-300"
          />

          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-xl font-semibold">Elegant rings</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default NewArrivals;