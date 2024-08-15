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

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/products?page=${page}&limit=12&search=${searchTerm}`
      );
      setProducts(response.data.products);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // setCurrentPage(1); // Reset to the first page for a new search
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for products..."
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      {loading ? (
        <BeatLoader className="text-center" color="#36d7b7" />
      ) : (
        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <li key={product._id} className="bg-white shadow rounded-lg p-4">
                <img
                  src={product.productImage}
                  alt={product.productImage}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold text-gray-800 mt-4">
                  {product.productName}
                </h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-blue-600 mt-4 font-bold">
                  Price: ${product.price}
                </p>
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400">
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
                  </div>
                  <span className="text-gray-600 ml-2">({product.rating})</span>
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
