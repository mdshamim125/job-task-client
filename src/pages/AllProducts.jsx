import axios from "axios";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { BeatLoader } from "react-spinners";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://job-task-server.up.railway.app/products?page=${page}&limit=12&search=${searchTerm}&sort=${sort}&brand=${brand}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );

      // const response = await axios.get(
      //   `https://job-task-server-1fof.onrender.com/products?page=${page}&limit=12&search=${searchTerm}&sort=${sort}&brand=${brand}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      // );
      setProducts(response.data.products);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      // console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm, sort, brand, category, minPrice, maxPrice]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  return (
    <div className="container mx-auto p-4 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for products..."
          className=" p-2 border border-gray-300 rounded w-full"
        />
        {/* <select
          className="border p-2 rounded ml-4"
          value={sort}
          onChange={handleSortChange}
        >
          <option value="newestFirst">Newest First</option>
          <option value="priceLowToHigh">Low to High</option>
          <option value="priceHighToLow">High to Low</option>
        </select> */}

        <div className="flex gap-2 justify-center items-start">
          <p className="text-xl font-bold">Sort By:</p>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="newestFirst"
                checked={sort === "newestFirst"}
                onChange={handleSortChange}
                className="mr-2"
              />
              Newest First
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="priceLowToHigh"
                checked={sort === "priceLowToHigh"}
                onChange={handleSortChange}
                className="mr-2"
              />
              Low to High
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="priceHighToLow"
                checked={sort === "priceHighToLow"}
                onChange={handleSortChange}
                className="mr-2"
              />
              High to Low
            </label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
        <select
          className="border p-2 rounded"
          value={brand}
          onChange={handleBrandChange}
        >
          <option value="">All Brands</option>
          <option value="WellnessPro">WellnessPro</option>
          <option value="FitGear">FitGear</option>
          <option value="VisionTech">VisionTech</option>
          <option value="StyleIcon">StyleIcon</option>
          <option value="SunGuard">SunGuard</option>
        </select>
        <select
          className="border p-2 rounded"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          <option value="Home">Home</option>
          <option value="Electronics">Electronics</option>
          <option value="Beauty and Health">Beauty & Health</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Fashion">Fashion</option>
        </select>
        <input
          type="number"
          value={minPrice}
          onChange={handleMinPriceChange}
          placeholder="Min Price"
          className="p-2 border  border-gray-300 rounded"
        />
        <input
          type="number"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          placeholder="Max Price"
          className="p-2 border border-gray-300 rounded "
        />
      </div>
      {loading ? (
        <BeatLoader
          className="flex mt-12 justify-center text-center"
          color="#36d7b7"
        />
      ) : (
        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {products?.map((product) => (
              <li
                key={product._id}
                className="bg-white shadow rounded-lg p-4 cursor-pointer"
              >
                <img
                  src={product.productImage}
                  alt={product.productImage}
                  className="w-full h-60 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold text-gray-800 mt-4">
                  {product.productName}
                </h3>
                <p className="text-gray-600 my-2">{product.description}</p>
                <p className="text-blue-600  font-bold">
                  Category: {product.category}
                </p>
                <p className="text-blue-600 my-1 font-bold">
                  Brand: {product.brandName}
                </p>
                <div className="flex justify-between gap-2 items-center">
                  <p className="text-blue-600  font-bold">
                    Price: ${product.price}
                  </p>
                  <div className="flex items-center">
                    {/* <div className="flex text-yellow-400">
                      {Array.from({ length: 5 }, (_, index) => (
                        <FaStar
                          key={index}
                          className={
                            index < product.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div> */}
                    <span className=" text-blue-600  font-bold">
                      Rating: {product.rating}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-center items-center mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-white bg-blue-500 rounded mr-2 ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-600"
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } mx-1`}
              >
                {index + 1}
              </button>
            ))}

            {/* {totalPages.map((page) => (
              <button
                className={currentPage === page ? "selected" : undefined}
                onClick={() => setCurrentPage(page)}
                key={page}
              >
                {page}
              </button>
            ))} */}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-white bg-blue-500 rounded ml-2 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-600"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
