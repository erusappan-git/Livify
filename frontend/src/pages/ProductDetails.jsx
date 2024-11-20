import { useParams } from 'react-router-dom'
import Rating from '../components/Rating';
import { FaShoppingCart } from "react-icons/fa";
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const ProductDetails = () => {

  const {productId} = useParams();

  const dispatch = useDispatch();

  const [ qty , setQty ] = useState(1);

  const { data:product , error, isLoading } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({...product,qty}));
  }

  if(isLoading) return <div>Loading...</div>
  if(error) return <div>Error : {error}</div>

  return (
    <div className="container mx-auto p-8">
      {/* Product Details Wrapper */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Left Side: Product Image */}
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-lg shadow-lg w-full object-cover"
          />
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-1/2 space-y-4">
          {/* Product Name */}
          <h1 className="text-3xl font-bold">{product.name}</h1>

          {/* Product Brand */}
          <p className="text-sm text-gray-500">Brand: {product.brand}</p>
          
          {/* Product Description */}
          <p className="text-gray-600 mb-4">{product.description}</p>

          {/* Rating and Number of Reviews */}
          <div className="flex items-center space-x-2">
            <Rating rating={product.rating} />
            <span className="text-yellow-500">({product.numReviews} Reviews)</span>
          </div>

          {/* Price */}
          <h2 className="text-2xl font-semibold text-primary">&#8377; {product.price}</h2>

          {/* Stock Availability */}
          <div className={`text-lg ${product.countInStock > 0 ? 'text-white-600' : 'text-red-600'}`}>
            {product.countInStock > 0 ? (
                <div className="mt-4">
                  <h4 className="text-lg font-medium">Qty</h4>
                  <form className="mt-2">
                    <select className="select select-primary w-2/4 max-w-60"
                    onChange={(e) => setQty(Number(e.target.value))}>
                      {
                        [...Array(product.countInStock).keys()].map((item) => (
                          <option key={item + 1}>{item + 1}</option>
                        ))
                      }
                    </select>
                  </form>
                </div>
              ) : 'Out of Stock'}
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mt-4">
            <button
              onClick={addToCartHandler}
              className={`btn btn-accent flex items-center ${product.countInStock === 0 ? 'disabled' : ''}`}
              disabled={product.countInStock === 0}
            >
              Add to Cart <FaShoppingCart className="ml-2" />
            </button>
            <button className="btn btn-primary" disabled={product.countInStock === 0}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
