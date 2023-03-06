let data = JSON.parse(localStorage.getItem("all"))
let cartdata = JSON.parse(localStorage.getItem("cart"))
data.map((item)=>{
    cartdata.map((x)=>{
        if(item.id===x.id)
        {
            let wrapper = document.querySelector(".products_wrapper")
              wrapper.innerHTML +=
                `
            <div class="item">
            <img src="${item.image}" alt="Item" />
            <div class="info">
              <div class="row">
              <div>Product: ${item.title.split(' ',2).join()}</div>
                <div class="price">Price: ₹${item.price}</div>
               
              </div>
              <div class="row">Rating: ${item.rating['rate']}</div>
            </div>
            <button class="remove" data-product-id=${x.id} id="removeitem">Remove item</button>
          </div>
          `                             
         

         let checkoutlist = document.querySelector(".checkout")
         checkoutlist.innerHTML +=
         `
        <li>${item.title} :- ₹${item.price} </li>
         `
        };
        })
    });
//=======>>>>>>>payment process<<<<<<<<<==========//

var totalPrice = cartdata.reduce((sum,x)=> { return sum+x.price},0);
document.querySelector("#total").innerHTML=`Total Amount:- ₹ ${totalPrice}`;

//checkout button on click
document.getElementById("rzp").onclick = function (e) 
  {
    
   
//razor pay object
    var option = {
      key: "rzp_test_9OXl2wK2vH03Va", // Enter the Key ID generated from the Dashboard
      amount: totalPrice*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
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
            window.location.href = "./shop.html";
          },
    };

    var razor = new Razorpay(option);
    razor.open();
    localStorage.removeItem("cart");
    e.preventDefault();
  };
    
/*
    let wrapper = document.querySelector(".products_wrapper")
    wrapper.addEventListener('click', (event) => {

      const remove = event.target.closest('#removeitem');   
    
      if (remove) {
        const id = remove.getAttribute('data-product-id');  // finding the data id and matching with the product id to send that particular id
        let allcart = JSON.parse(localStorage.getItem("cart"))
        const product = allcart.find((product) => product.id == id); //closest is used so that the functionality works when products are filtred
        
        if (product) {
         // wrapper.innerHTML=''
         // addToCartBtn.style.backgroundColor = 'green'
          cartdata.pop(product);
         // localStorage.setItem('cart', JSON.stringify(cart));
        }
    
      }
    });
*/


