const Showcase = () => {
  return (
    <div className="p-6 bg-gray-100">

      <div className="grid grid-cols-3 grid-rows-2 gap-2 h-[90vh]">

        {/* BIG IMAGE (left) */}
        <div className="col-span-1 row-span-2">
          <img
            src="/img1.jpeg"
            alt=""
            className="w-full h-full object-cover  object-bottom rounded-lg hover:scale-105 transition duration-500"
          />
        </div>

        {/* TOP RIGHT */}
        <div>
          <img
            src="/img2.jpeg"
            alt=""
            className="w-full h-full object-cover object-[center_80%] rounded-lg  hover:scale-105 transition duration-500"
          />
        </div>

        <div>
          <img
            src="/img3.jpeg"
            alt=""
            className="w-full h-full object-cover object-[center_60%] rounded-lg hover:scale-105 transition duration-500"
          />
        </div>

        {/* BOTTOM RIGHT */}
        <div>
          <img
            src="/img4.jpeg"
            alt=""
            className="w-full h-full object-cover rounded-lg hover:scale-105 transition duration-500"
          />
        </div>

        <div>
          <img
            src="/img5.jpeg"
            alt=""
            className="w-full h-full object-cover object-[center_80%] rounded-lg hover:scale-105 transition duration-500"
          />
        </div>

      </div>

    </div>
  );
};

export default Showcase;