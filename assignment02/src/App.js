import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import items from "./products.json";

function App(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [dataF,setDataF] = useState({});
    const [viewer,setViewer] = useState(0);
  
    // clearButton.addEventListener('click', function() {
    //   searchInput.value = '';
    //   const cards = cardsContainer.querySelectorAll('.card');
    //   cards.forEach(card => {
    //     card.classList.remove('hidden');
    //   });
    // });

    function Browse(){

        const [cart, setCart] = useState([]);
        const [cartTotal, setCartTotal] = useState(0);
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
                const products = listItems.filter((item) =>
                  item.name.toLowerCase().includes(searchItem.toLowerCase())
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

    function Payment(){
        const onSubmit = data => {
            console.log(data); // log all data
            console.log(data.fullName); // log only fullname
            
            // update hooks
            setDataF(data);
            setViewer(1);
        }
    }

    function Summary(){
        const updateHooks = () => {
            setViewer(2);
            setDataF({});
        }

        return(
            <div>
                <h1>Payment summary:</h1>
                <h3>{dataF.fullName}</h3>
                <p>{dataF.email}</p>
                <p>{dataF.city},{dataF.state} {dataF.zip} </p>

                <button onClick={updateHooks} className="btn btn-secondary">Submit</button>
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