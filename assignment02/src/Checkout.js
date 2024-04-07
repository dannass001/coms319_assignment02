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

  const CartItems = cart.map((el) => (
    <li class="list-group-item d-flex justify-content-between lh-sm" key={el.id}>
      <div>
        <h6 class="my-0">{el.title}</h6>
        <img class="img-fluid" src={el.image} width={150} />
      </div>
      <span class="text-body-secondary">${el.price}</span>
    </li>
  ));
  //begin copy
  const titles = [];
  var count = 0;
  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }
  const CartItemsCheckout = cart.map(function(el){
    for(var i = 0; i < titles.length; i++){
      if(titles[i] == el.title){
        return;
      }
    }
    titles[count] = el.title;
    count++;
    return(
      <li class="list-group-item d-flex justify-content-between lh-sm" key={el.id}>
      <div>
        <h6 class="my-0">{el.title}</h6>
        <img class="img-fluid" src={el.image} width={150} />
      </div>
      <span class="text-body-secondary">${el.price} x{howManyofThis(el.id)}</span>
    </li>
    );
  });
  //end copy

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
        <div class="row g-5">
          <div class="col-md-5 col-lg-4 order-md-last">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-primary">Your cart</span>
              <span class="badge bg-primary rounded-pill">{cart.length}</span>
            </h4>
            <ul class="list-group mb-3">
              {CartItemsCheckout}
              <li class="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${cartTotal}</strong>
              </li>
            </ul>
          </div>
          <div class="col-md-7 col-lg-8">
            <h4 class="mb-3">Billing address</h4>
            <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
                <div class="col-12">
                  <label for="firstName" class="form-label">Full Name</label>
                  <input {...register("fullName", {required: true})} className="form-control"/>
                </div>
                <div class="col-12">
                    <label for="firstName" class="form-label">Email</label>
                    <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="you@example.com" className="form-control"/>
                    {errors.email && <p>Email is required.</p>}
                </div>
                <div class="col-12">
                    <label for="firstName" class="form-label">Credit Card</label>
                    <input {...register("creditCard", { required: true })} placeholder="1111 2222 3333 4444" className="form-control"/>
                    {errors.creditCard && <p>Credit Card is required.</p>}
                </div>
                <div class="col-12">
                    <label for="firstName" class="form-label">Address</label>
                    <input {...register("address", { required: true })} placeholder="1234 Main St" className="form-control"/>
                    {errors.address && <p>Address is required.</p>}
                </div>
                <div class="col-12">
                    <label for="firstName" class="form-label">Address 2 (Optional)</label>
                    <input {...register("address2")} placeholder="Apartment or suite" className="form-control"/>
                </div>
                <div class="row g-5">
                  <div class="col-md-5">
                      <label for="firstName" class="form-label">City</label>
                      <input {...register("city", { required: true })} className="form-control"/>
                      {errors.city && <p>City is required.</p>}
                  </div>
                  <div class="col-md-4">
                      <label for="firstName" class="form-label">State</label>
                      <input {...register("state", { required: true })} className="form-control"/>
                      {errors.state && <p>State is required.</p>}
                  </div>
                  <div class="col-md-3">
                      <label for="firstName" class="form-label">Zip Code</label>
                      <input {...register("zip", { required: true })} className="form-control"/>
                      {errors.zip && <p>Zip is required.</p>}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Order</button>
            </form>
          </div>
        </div>
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
