import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import items from "./products.json";

function App(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [dataF,setDataF] = useState({});
    const [viewer,setViewer] = useState(0);
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
  
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
    
    const CartItems = cart.map((el) => (
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

    function Browse(){

        const [searchItem, setSearchItem] = useState("");
        const [searchResults, setSearchResults] = useState([]);

        const updateHooks = ()=>{
            setViewer(1);
            setDataF({});
        };

        // const listItemRows = (function(listItems) {
        //     for (i = 0; i < listItems.length; i++){
        //         if (i % 3){

        //         }
        //     }
        // });
    
        const listItems = searchResults.map((el) => (
            // PRODUCT
                <div class="row">
                    <div class="col-md-3 text-white rounded" key={el.id}>
                        <div class="card mb-4 box-shadow p-3 bg-light">
                            <img class="card-img-top" src={el.image} alt="Card image cap"/>
                            <div class="card-body">
                                <div class="row text-success lead fw-normal">${el.price}</div>
                                <div class="row text-muted">{el.title}</div>
                                <div class="row">{el.category}</div>
                                <div class="d-flex justify-content-between align-items-center bg-info border border-dark">
                                    <div class="btn-group">
                                        <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
                                        <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
                                    </div>
                                    <small class="text-muted px-2">{howManyofThis(el.id)}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ));

            useEffect(() => {
                const products = items.filter((item) =>
                  item.title.toLowerCase().includes(searchItem.toLowerCase())
                );

                setSearchResults(products);
            },
            [searchItem]);
            
            const addToCart = (el) => {
                setCart([...cart, el]);
            };
            
        function howManyofThis(id) {
    
            let hmot = cart.filter((cartItem) => cartItem.id === id);
    
            return hmot.length;
        }
            
        useEffect(() => {
    
            total();
        }, [cart]);
        
        const removeFromCart = (el) => {
        
            let hardCopy = [...cart];
        
            hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
        
            setCart(hardCopy);
        };
        
        const total = () => {
        
            let totalVal = 0;
            for (let i = 0; i < cart.length; i++) {
            totalVal += cart[i].price;
            }
            setCartTotal(totalVal);
        };

        return (
            <div>
                <header>
                    <div class="navbar navbar-dark bg-dark box-shadow">
                        <div class="container d-flex justify-content-between">
                            <input
                                // class=""
                                type="text"
                                placeholder="Search for"
                                value={searchItem}
                                onChange={(e) => setSearchItem(e.target.value)}
                            />
                            <a href="#" class="navbar-brand d-flex align-items-center">
                                <strong>Store SE/ComS319</strong>
                            </a>
                            <button onClick={updateHooks} className="btn-payment" class="bg-success rounded border-3 m-3">Checkout</button>
                        </div>
                    </div>
                </header>
                <header>
                <div class="collapse bg-dark" id="navbarHeader">
                    
                </div>
                </header>
                <section class="jumbotron text-center m-3">
                    <div class="container">
                        <p class ="mb-3 me-5 d-flex align-items-center mx-auto">
                            <span class ="small text-muted me-4 text-right lead fw-normal"><b>Cart</b></span>
                            <span class ="small text-muted me-4 text-right">Products selected {cart.length}</span>
                            <span class ="small text-muted me-2">Order total:</span>
                            <span class ="lead fw-normal">${cartTotal}</span>
                        </p>
                    </div>
                </section>
                <div class="bg-secondary">
                     <div class="album py-5">
                        <div class="container">
                           <div>{listItems}</div>
                        </div>
                    </div>
                </div>
                <footer class="text-muted">
                    <div class="container">
                        <p class="float-center">
                            <a href="#">Back to top</a>
                        </p>
                    </div>
                </footer>
            </div>
        );
    
    }

    function Checkout(){
        const goHome = () => {
          setViewer(0);
        }
    
        const onSubmit = data => {
          setDataF(data);
          setViewer(2);
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

    function Summary(){
        const freshStart = () => {
          setCart([]);
          setCartTotal(0);
          setDataF({});
          setViewer(0);
        }
        return(
            <div className="text-center">
              <div className="text-center">
                <h4>
                    <span >Thank you for your purchase!</span>
                </h4>
                <h4>
                  <span >Order total: ${cartTotal}</span>
                </h4>
                <ul class="list-group mb-3">
                  {CartItemsCheckout}
                </ul>
              </div>
              <button onClick={freshStart}>Home</button>
            </div>
          );
      }

    

    return(
        <div>
            {viewer === 0 && <Browse />}
            {viewer === 1 && <Checkout />}
            {viewer === 2 && <Summary />}
        </div>
    );
}



export default App;