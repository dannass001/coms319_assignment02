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
    
        const listItems = searchResults.map((el) => (
            // PRODUCT
            <div class="col-md-2 text-white" key={el.id}>
              <div class="card mb-4 box-shadow p-3 bg-light">
                <img class="card-img-top" src={el.image} alt="Card image cap"/>
                <div class="card-body">
                <div class="row text-muted">{el.title}</div>
                <div class="row">{el.category}</div>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                    <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
                        <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
                    </div>
                    <small class="text-muted">${el.price} <span class="close text-success">&#10005;</span>{howManyofThis(el.id)}</small>
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
                            <a href="#" class="navbar-brand d-flex align-items-center">
                                <strong>Store SE/ComS319</strong>
                            </a>
                            <input
                                type="text"
                                placeholder="Search for"
                                value={searchItem}
                                onChange={(e) => setSearchItem(e.target.value)}
                            />
                            <button onClick={updateHooks} className="btn-payment">Payment</button>
                        </div>
                    </div>
                </header>
                <header>
                <div class="collapse bg-dark" id="navbarHeader">
                    
                </div>
                </header>
                <div class="bg-secondary">
                    <div class="row">
                        {/* HERE, IT IS THE SHOPPING CART */}
                        <div class="col-md-4 mb-4 card">
                                <div class="title">
                                    <div class="row">
                                        <div class="col text-center">
                                            <h4 class="d-flex justify-content-between align-items-center mb-3">
                                                <b>319 Shopping Cart</b>
                                            </h4>
                                        </div>
                                    </div>
                                    <div class="col align-self-center text-right text-muted">
                                        Products selected {cart.length}
                                    </div>
                                    <p class ="mb-0 me-5 d-flex align-items-center">
                                        <span class ="small text-muted me-2">Order total:</span>
                                        <span class ="lead fw-normal">${cartTotal}</span>
                                    </p>
                                </div>
                            </div>
                        <div>{listItems}</div>
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
              <div>{CartItems}</div>
                <p class ="mb-0 me-5 d-flex align-items-center">
                  <span class ="small text-muted me-2">Order total:</span>
                  <span class ="lead fw-normal">${cartTotal}</span>
                </p>
              </div>
              <div class="col-md-7 col-lg-8">
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
          <div>
            <h3>Congrats on your purchase</h3>
            <div>{CartItems}</div>
            <p class ="mb-0 me-5 d-flex align-items-center">
              <span class ="small text-muted me-2">Order total:</span>
              <span class ="lead fw-normal">${cartTotal}</span>
            </p>
            <button onClick={freshStart}>Home  </button>
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