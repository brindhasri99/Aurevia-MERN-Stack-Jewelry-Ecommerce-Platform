import React from "react";

const Footer = () => {
  return (
    <div className="bg-black text-white px-10 py-12">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* 🔶 LOGO + QR */}
        <div>
          <h1
            className="text-3xl mb-4"
            style={{ fontFamily: "Playfair Display" }}
          >
            Abirami Jewellers
          </h1>

          <p className="mb-4 text-gray-400">
            Follow us on Instagram
          </p>

          <img
            src="/insta-qr.png"
            alt="Instagram QR"
            className="w-40 h-40 rounded-lg bg-white p-2"
          />

          <p className="mt-3 text-gray-300 text-sm">
            @abirami_jewellers
          </p>
        </div>

        {/* 🔶 LINKS */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Useful Links</h2>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">Delivery Info</li>
            <li className="hover:text-white cursor-pointer">Returns</li>
            <li className="hover:text-white cursor-pointer">Track Order</li>
            <li className="hover:text-white cursor-pointer">Store Locator</li>
          </ul>
        </div>

        {/* 🔶 INFO */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Information</h2>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">Offers</li>
          </ul>
        </div>

        {/* 🔶 CONTACT */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>

          <p className="text-gray-400">+91 9876543210</p>

          <p className="mt-4 font-semibold">Chat With Us</p>

          <div className="flex gap-4 mt-2">
            <span className="cursor-pointer hover:text-green-400">WhatsApp</span>
            <span className="cursor-pointer hover:text-blue-400">Instagram</span>
          </div>
        </div>

      </div>

      {/* 🔻 BOTTOM LINE */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-500 text-sm">
        © 2026 Abirami Jewellers. All rights reserved.
      </div>

    </div>
  );
};

export default Footer;