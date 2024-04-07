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

    function Browse(){

        const [searchItem, setSearchItem] = useState("");
        const [searchResults, setSearchResults] = useState([]);

        const updateHooks = ()=>{
            setViewer(0);
            setDataF({});
        };
    
        const listItems = searchResults.map((el) => (
            // PRODUCT
            <div class="row border-top border-bottom" key={el.id}>
                <div class="row main align-items-center">
                    <div class="col-2">
                        <img class="img-fluid" src={el.image} />
                    </div>
                    <div class="col">
                        <div class="row text-muted">{el.title}</div>
                        <div class="row">{el.category}</div>
                    </div>
                    <div class="col">
                        <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
                        <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
                    </div>
                    <div class="col">${el.price} <span class="close">&#10005;</span>{howManyofThis(el.id)}</div>
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
    
        const cartItems = cart.map((el) => (
            <div key={el.id}>
            <img class="img-fluid" src={el.image} width={150} />
            {el.title}
            ${el.price}
            </div>
            ));
            
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
                STORE SE/ComS319
                <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for"
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                />
                <button onClick={updateHooks} className="btn-payment">Payment</button>
                </div>
                <div class="card">
                    <div class="row">
                        {/* HERE, IT IS THE SHOPPING CART */}
                            <div class="col-md-8 cart">
                                <div class="title">
                                    <div class="row">
                                        <div class="col">
                                        <h4>
                                        <b>319 Shopping Cart</b>
                                        </h4>
                                    </div>
                                    <div class="col align-self-center text-right text-muted">
                                        Products selected {cart.length}
                                    </div>
                                </div>
                            </div>
                            <div class ="float-end">
                                <p class ="mb-0 me-5 d-flex align-items-center">
                                    <span class ="small text-muted me-2">Order total:</span>
                                    <span class ="lead fw-normal">${cartTotal}</span>
                                </p>
                            </div>
                        </div>
                        <div>{listItems}</div>
                    </div>
                </div>
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
                <cartItems></cartItems>
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

    function Payment(){
        const onSubmit = data => {
            console.log(data); // log all data
            console.log(data.fullName); // log only fullname
            
            // update hooks
            setDataF(data);
            setViewer(1);
        }
    }

    // function Summary(){
    //     const updateHooks = () => {
    //         setViewer(2);
    //         setDataF({});
    //     }

    //     return(
    //         <div>
    //             <h1>Payment summary:</h1>
    //             <h3>{dataF.fullName}</h3>
    //             <p>{dataF.email}</p>
    //             <p>{dataF.city},{dataF.state} {dataF.zip} </p>

    //             <button onClick={updateHooks} className="btn btn-secondary">Submit</button>
    //         </div>
    //     );
    // }
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
            <cartItems></cartItems>
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
            {viewer === 1 && <Payment />}
            {viewer === 2 && <Summary />}
        </div>
    );
}



export default App;