
let wrapper = document.querySelector(".products_wrapper")
//fetching products and displaying all products 
window.addEventListener("load", () => {
  async function dataFetch() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      console.log(data);
      localStorage.setItem('all', JSON.stringify(data));
      let mendata = data.filter((item) => { return item.category == "men's clothing" });
      localStorage.setItem('mens', JSON.stringify(mendata));
      let womendata = data.filter((item) => { return item.category == "women's clothing" });
      localStorage.setItem('women', JSON.stringify(womendata));
      let electronics = data.filter((item) => { return item.category == "electronics" });
      localStorage.setItem('electronics', JSON.stringify(electronics));
      let jewellery = data.filter((item) => { return item.category == "jewelery" });
      localStorage.setItem('jewellery', JSON.stringify(jewellery));
    }
    catch (e) {
      console.log("error", e)
    }
  }
  dataFetch();
  let dataa = JSON.parse(localStorage.getItem("all"))
  loadData(dataa);
})
//cards  display function

function loadData(products) {
  let wrapper = document.querySelector(".products_wrapper")
  wrapper.innerHTML = '';
  products.map((item) => {

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
  <div class="btn" id="BTN">
  <button class="add_tocart" data-product-id=${item.id} id="addToCart">ADD TO CART</button>
</div>
</div>
`                              })

}
//filtering according to filter buttons

function displayAll() {
  let alldata = JSON.parse(localStorage.getItem("all"))
  loadData(alldata);
}
function displayMen() {
  let mensdata = JSON.parse(localStorage.getItem("mens"))
  loadData(mensdata);
}
function displayWomen() {
  let women = JSON.parse(localStorage.getItem("women"))
  loadData(women);
}

function displayElectric() {
  let electrico = JSON.parse(localStorage.getItem("electronics"))
  loadData(electrico);
}
function displayJewel() {
  let jojo = JSON.parse(localStorage.getItem("jewellery"))
  loadData(jojo);
}
function displaySearch() {
  let inputtext = document.querySelector("#search")
  let inputValue = inputtext.value
  let products = JSON.parse(localStorage.getItem("all"))
  let filtered = products.filter((item) => {
     return item.title.toLowerCase().includes(inputValue.toLowerCase()) || 
     item.description.toLowerCase().includes(inputValue.toLowerCase())  })
     console.log(filtered)
  loadData(filtered);
}

// add to cart

const cart = JSON.parse(localStorage.getItem('cart')) || [] ;  //creating cart array to store the added to cart product to display them on the cart page
   
wrapper.addEventListener('click', (event) => {

  const addToCartBtn = event.target.closest('#addToCart');   

  if (addToCartBtn) {
    const id = addToCartBtn.getAttribute('data-product-id');  // finding the data id and matching with the product id to send that particular id
    let allcart = JSON.parse(localStorage.getItem("all"))
    const product = allcart.find((product) => product.id == id); //closest is used so that the functionality works when products are filtred
    
    if (product) {
      addToCartBtn.style.backgroundColor = 'green'
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
    }

  }
});
/*
let checkboxes = document.querySelectorAll(".check")
let filterValues = []

checkboxes.forEach((c) => { 
   c.addEventListener("change", (e) => {     //adding value of the checked button in an array on chagne in checkbox
    if (e.target.checked) {
      let products = JSON.parse(localStorage.getItem("all"))
      filter
      let value = filter.value
      filterValues.push(value)  //-
    }})})

checkbox[0].addEventListener("change",()=>{if(checkbox[0].checked){priceOne()}})
checkbox[1].addEventListener("change",()=>{if(checkbox[1].checked){priceTwo()}})
checkbox[2].addEventListener("change",()=>{if(checkbox[2].checked){priceThree()}})
checkbox[3].addEventListener("change",()=>{if(checkbox[3].checked){priceFour()}})
*/

// add to cart 


