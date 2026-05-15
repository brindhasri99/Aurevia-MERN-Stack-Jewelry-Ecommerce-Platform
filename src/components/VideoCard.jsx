import React from "react";

const VideoCard = () => {
  return (
    <div className="w-full">

      {/* VIDEO SECTION */}
      <div className="relative w-full h-[80vh] overflow-hidden">

        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/jewellery-video.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>

        {/* TEXT */}
        <div
          className="absolute inset-0 flex flex-col justify-center px-16 text-white"
          style={{ fontFamily: "Playfair Display" }}
        >
          <h1 className="text-5xl font-semibold mb-4 text-align-leftbottom-3    ">
            Abirami jewellers
          </h1>

          
        </div>

      </div>

    </div>
  );
};

export default VideoCard;