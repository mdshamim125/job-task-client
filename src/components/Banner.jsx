import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-16 mx-auto">
        <div className="items-center lg:flex">
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
              <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
                Best place to choose <br /> your{" "}
                <span className="text-blue-500">products</span>
              </h1>

              <p className="mt-3 text-gray-600 dark:text-gray-400">
                Discover a wide range of high-quality products tailored to meet
                all your needs. Shop confidently knowing you're getting the best
                deals and unparalleled customer service.
              </p>

              <Link to="all-products">
                <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
            <img
              className="w-full h-full lg:max-w-3xl"
              src="https://i.ibb.co/NZpmsRN/pexels-dnsfotos-2569465.jpg"
              alt="Catalogue-pana"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Banner;
