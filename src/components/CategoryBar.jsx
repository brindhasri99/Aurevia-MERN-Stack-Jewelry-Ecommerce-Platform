import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryBar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();

  const categories = ["Home", "Gold", "Diamond", "Silver", "Victorian"];

  const menuData = {
    Gold: {
      items: [
        { label: "Gold Necklaces", path: "/gold-necklaces",  },
        { label: "Gold Earrings",  path: "/gold-earrings",   },
        { label: "Gold Rings",     path: "/gold-rings",      },
      ],
      image: "/gold.jpeg",
    },
    Diamond: {
      items: [
        { label: "Diamond Rings",     path: "/diamond-rings",      },
        { label: "Diamond Earrings",  path: "/diamond-earrings",  },
        { label: "Diamond Necklaces", path: "/diamond-necklaces",  },
      ],
      image: "/diamond.jpeg",
    },
    Silver: {
      items: [
        { label: "Silver Chains",    path: "/silver-chains",     },
        { label: "Silver Bracelets", path: "/silver-bracelets",  },
        { label: "Silver Idols",     path: "/silver-idols",     },
      ],
      image: "/silver.jpeg",
    },
    Victorian: {
      items: [
        { label: "Victorian Earrings",  path: "/victorian-earrings",   },
        { label: "Victorian Lockets",   path: "/victorian-lockets",    },
        { label: "Victorian Necklaces", path: "/victorian-necklaces",  },
      ],
      image: "/show.jpeg",
    },
  };

  return (
    <div
      className="relative z-40"
      style={{ fontFamily: "Playfair Display" }}
      onMouseLeave={() => setActiveCategory(null)}
    >
      {/* CATEGORY NAV BAR */}
      <div className="bg-[#f9f9f9] border-b border-gray-200 px-10 py-3">
        <div className="flex justify-center gap-16 text-sm font-medium">
          {categories.map((item) => (
            <span
              key={item}
              onMouseEnter={() => item !== "Home" && setActiveCategory(item)}
              onClick={() => {
                setActiveCategory(null);
                if (item === "Home") navigate("/");
              }}
              className={`cursor-pointer relative px-3 py-1 transition-colors duration-200
                ${activeCategory === item
                  ? "text-yellow-600"
                  : "text-gray-700 hover:text-yellow-600"
                }`}
            >
              {item}
              {activeCategory === item && (
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-yellow-600 rounded" />
              )}
            </span>
          ))}
        </div>
      </div>

      {/* MEGA MENU DROPDOWN */}
      {menuData[activeCategory] && (
        <div className="absolute left-0 top-full w-full bg-[#f8f5f2] shadow-[0_10px_30px_rgba(0,0,0,0.12)] z-50 border-t border-gray-100">
          <div className="flex max-w-3xl mx-auto py-8 px-6 gap-10">

            {/* Category Links */}
            <div className="flex-1 grid grid-cols-1 gap-2">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">
                {activeCategory} Collection
              </p>
              {menuData[activeCategory].items.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setActiveCategory(null);
                    navigate(item.path);
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                    hover:bg-[#efe7df] transition-all duration-200 group"
                >
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-yellow-700">
                    {item.label}
                  </span>
                  <span className="ml-auto text-yellow-500 opacity-0 group-hover:opacity-100 transition">→</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px bg-gray-200" />

            {/* Right Image */}
            <div className="w-44 flex flex-col justify-center">
              <img
                src={menuData[activeCategory].image}
                alt={activeCategory}
                className="w-full h-[180px] object-cover rounded-xl shadow-md"
              />
              <button
                onClick={() => {
                  setActiveCategory(null);
                  navigate(menuData[activeCategory].items[0].path);
                }}
                className="mt-3 text-yellow-600 text-xs font-semibold hover:underline text-center"
              >
                View All {activeCategory} →
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryBar;
