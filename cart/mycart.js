
let cartdata = JSON.parse(localStorage.getItem("cart"))

 // mapping cart data on screen 

    cartdata.map((x)=>{
            let wrapper = document.querySelector(".products_wrapper")
              wrapper.innerHTML +=
                `
            <div class="item">
            <img src="${x.image}" alt="Item" />
            <div class="info">
              <div class="row">
              <div>Product: ${x.title.split(' ',2).join()}</div>
                <div class="price">Price: ₹${x.price}</div>
               
              </div>
              <div class="row">Rating: ${x.rating['rate']}</div>
            </div>
            <button class="remove" data-product-id=${x.id} id="removeitem">Remove item</button>
          </div>
          `                             
         // checkout content

         let checkoutlist = document.querySelector(".checkout")
         checkoutlist.innerHTML +=
         `
        <li>${x.title} :- ₹${x.price} </li>

         `
         totalPrice(cartdata);
        });
       

//=======>>>>>>>payment process<<<<<<<<<==========//
var amount ;
function totalPrice(data)
{
var total = data.reduce((sum,x)=> { return sum+x.price},0);
document.querySelector("#total").innerHTML=`Total Amount:- ₹ ${total}`;
amount = total;
}

//checkout button on click
document.querySelector("#rzp").onclick = function (e) 
  { 
//razor pay object
    var option = {
      key: "rzp_test_9OXl2wK2vH03Va", // Enter the Key ID generated from the Dashboard
      amount: amount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Me Shop",
      description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      theme: {
        color: "#3399cc",
      },
      image:
        "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
        handler: function () {
            // Redirect the user to the shop.html page after the payment is completed
            window.location.href = "../shop/shop.html";
          },
    };

    var razor = new Razorpay(option);
    razor.open();
    localStorage.removeItem("cart");
    e.preventDefault();
  };
    
// remove product btn functionality

   let wrapper = document.querySelector(".products_wrapper")
    wrapper.addEventListener('click', (event) => {
      wrapper.innerHTML = '';
      let checkoutlist = document.querySelector(".checkout")
      checkoutlist.innerHTML = '';
      const removebtn = event.target.closest('#removeitem');   //accessing the remove button of cards
      if (removebtn) {
        const id = removebtn.getAttribute('data-product-id');  // finding the data id and matching with the product id to send that particular id
         
        const index = cartdata.findIndex((product) => product.id == id); 
        console.log(index);
        if (index>-1) {
          cartdata.splice(index,1);
        
          localStorage.setItem('cart', JSON.stringify(cartdata));
          let newcart = JSON.parse(localStorage.getItem("cart"))
         newcart.map((x)=>{
          
           {
               let wrapper = document.querySelector(".products_wrapper")
                 wrapper.innerHTML +=
                   `
               <div class="item">
               <img src="${x.image}" alt="Item" />
               <div class="info">
                 <div class="row">
                 <div>Product: ${x.title.split(' ',2).join()}</div>
                   <div class="price">Price: ₹${x.price}</div>
                  
                 </div>
                 <div class="row">Rating: ${x.rating['rate']}</div>
               </div>
               <button class="remove" data-product-id=${x.id} id="removeitem">Remove item</button>
             </div>
             `                             
          
          //  let checkoutlist
            checkoutlist.innerHTML +=
            `
           <li>${x.title} :- ₹${x.price} </li>
            `
           };
           totalPrice(newcart)
           })

        }
    
      }
    });




