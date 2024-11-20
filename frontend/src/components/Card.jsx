import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Rating from "./Rating";


const Card = ({ product }) => {

    return (
        <Link to={`product/${product._id}`}>
            <div className="card glass w-80 transform transition-transform duration-300 hover:scale-105">
                <figure>
                    <img
                        src={`../${product.image}`}
                        alt="car!" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <p className="line-clamp-3 mb-2">{product.description}</p>
                    <Rating rating={product.rating}/>
                    <h2 className="badge badge-secondary mb-2">&#8377; {product.price}</h2>
                    {/* <div className="card-actions justify-between">
                        <button className="btn btn-accent">Add to Cart <FaShoppingCart /></button>
                        <button className="btn btn-primary">Buy Now</button>
                    </div> */}
                </div>
            </div>
        </Link>
    )
}

export default Card
