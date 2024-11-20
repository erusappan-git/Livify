import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItem } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  console.log(cartItem.map( (item) => {return item.countInStock}));

  const totalPrice = cartItem.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
  const GST = (totalPrice * 0.18).toFixed(2);
  const shippingFee = totalPrice > 1000 ? 0 : 79;

  if (cartItem.length === 0) {
    return (
      <div className="container mx-auto mt-10">
        <h2 className="text-center text-2xl font-semibold text-gray-700">Your cart is empty</h2>
        <Link to="/" className="btn btn-primary mt-5 mx-auto block w-fit">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-8 min-h-screen">

      {/* Left Side: Product Details */}
      <div className="w-full md:w-3/4">
        <h2 className="text-xl font-semibold mb-4">{cartItem.length} Items Selected</h2>
        {cartItem.map((item) => (
          <div className="flex items-center gap-6 border-b pb-6 mb-6" key={item._id}>
            <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-lg" />
            <div className="flex-grow">
              <h3 className="font-bold mb-5 text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500 flex gap-3 items-center">
                <span>Qty:</span>
                <select 
                className="select select-bordered w-1/7"
                value={item.qty} name="qty" 
                onChange={(e)=>dispatch(addToCart({...item, qty: Number(e.target.value)}))}>
                  {[...Array(item.countInStock).keys()].map((qty) => (
                    <option key={qty + 1} value={qty + 1}>
                      {qty + 1}
                    </option>
                  ))}
                </select>
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold mb-2">&#8377; {item.qty * item.price}</p>
              <p className="text-sm font-medium mb-2">{`${item.qty} x ${item.price}`}</p>
              <button 
                className="btn btn-sm btn-error mt-2" 
                onClick={() => removeFromCartHandler(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Right Side: Price Details */}
      <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg self-start">
        <h3 className="text-lg font-semibold mb-4">Price Details ({cartItem.length} Items)</h3>
        <div className="flex justify-between mb-2">
          <p>Total MRP</p>
          <p>&#8377; {totalPrice}</p>
        </div>
  
        <div className="flex justify-between mb-2">
          <p>GST</p>
          <p>&#8377; {GST}</p>
        </div>
        <div className="flex justify-between mb-4">
          <p>Shipping Fee</p>
          <p className={shippingFee === 0 ? "text-green-600" : ""}>
          &#8377; 
            {shippingFee === 0 ? "FREE" : ` ${shippingFee}`}
          </p>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between mb-4">
            <p className="font-bold">Total Amount</p>
            <p className="font-bold">&#8377; {(Number(totalPrice) + Number(GST) + shippingFee).toFixed(2)}</p>
          </div>
          <button className="btn btn-primary w-full">Place Order</button>
        </div>
      </div>
    </div>

  );
};

export default Cart;
