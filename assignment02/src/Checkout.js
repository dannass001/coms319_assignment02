import React, {useState} from "react";
import { useForm } from "react-hook-form";
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import items from "./products.json";

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [dataF,setDataF] = useState({});
  const [page, setPage] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const cartItems = cart.map((el) => (
    <div key={el.id}>
        <img class="img-fluid" src={el.image} width={150} />
        {el.title}
        ${el.price}
    </div>
  ));
  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
        totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };

  function Checkout(){
    const goHome = () => {
      setPage(0);
    }

    const onSubmit = data => {
      setDataF(data);
      setPage(2);
    }

    return(
      <div>
        <button onClick={goHome}>Return</button>
        <div>
          <cartItems></cartItems>
          <p class ="mb-0 me-5 d-flex align-items-center">
            <span class ="small text-muted me-2">Order total:</span>
            <span class ="lead fw-normal">${cartTotal}</span>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
                <div className="form-group">
                    <input {...register("fullName", {required: true})} placeholder="Full Name" className="form-control"/>
                </div>
                <div className="form-group">
                    <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" className="form-control"/>
                    {errors.email && <p>Email is required.</p>}
                </div>
                <div className="form-group">
                    <input {...register("creditCard", { required: true })} placeholder="Credit Card" className="form-control"/>
                    {errors.creditCard && <p>Credit Card is required.</p>}
                </div>
                <div className="form-group">
                    <input {...register("address", { required: true })} placeholder="Address" className="form-control"/>
                    {errors.address && <p>Address is required.</p>}
                </div>
                <div className="form-group">
                    <input {...register("address2")} placeholder="Address 2" className="form-control"/>
                </div>
                <div className="form-group">
                    <input {...register("city", { required: true })} placeholder="City" className="form-control"/>
                    {errors.city && <p>City is required.</p>}
                </div>
                <div className="form-group">
                    <input {...register("state", { required: true })} placeholder="State" className="form-control"/>
                    {errors.state && <p>State is required.</p>}
                </div>
                <div className="form-group">
                    <input {...register("zip", { required: true })} placeholder="Zip" className="form-control"/>
                    {errors.zip && <p>Zip is required.</p>}
                </div>
                <button type="submit" className="btn btn-primary">Order</button>
            </form>
      </div>
    );
  }
  function Home(){
    const goCheckout = () => {
      setPage(1);
    }
    return(
      <div>
        <button onClick={goCheckout}>Checkout</button>
      </div>
    );
  }
  function Confirmation(){
    const freshStart = () => {
      setCart([]);
      setCartTotal(0);
      setDataF({});
      setPage(0);
    }
    return(
      <div>
        <h3>Congrats on your purchase</h3>
        <cartItems></cartItems>
        <p class ="mb-0 me-5 d-flex align-items-center">
          <span class ="small text-muted me-2">Order total:</span>
          <span class ="lead fw-normal">${cartTotal}</span>
        </p>
        <button onClick={freshStart}>Home  </button>
      </div>
    );
  }
  return (
    <div >
      {page === 0 && <Home />}
      {page === 1 && <Checkout />}
      {page === 2 && <Confirmation />}
    </div>
  );
}

export default App;
