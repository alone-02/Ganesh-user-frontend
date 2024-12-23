import axios from "axios";
import React from "react";

function Cart() {
 

    useEffect(() => {
        async function fetchIdol() {
          try {
            const response = await axios.get("/api/products");
            const result = response.data;
            setIdolList(result);
          } catch (err) {
            console.log(err);
          }
        }
        fetchIdol();
      }, []);

      async function cartItems(){
        const response = await axios.get("api/products/orders",);

    }

    return(
        <h2>This is Cart</h2>
    )
}

export default Cart;