//firebase config
var firebaseConfig = {
  apiKey: "AIzaSyAXPR_BZHaWp_SKw4AFbYtwmJvaAa1-38c",
  authDomain: "zaqpsy.firebaseapp.com",
  databaseURL: "https://zaqpsy.firebaseio.com",
  projectId: "zaqpsy",
  storageBucket: "",
  messagingSenderId: "432228304497",
  appId: "1:432228304497:web:78de1f3e6eed3f18"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let shoppingDataRef = firebase.database().ref("shopping-data");

//navbar handler
(function toggleNavbar() {
  const hamburgerButton = document.querySelector(".hamburger");
  const container = document.querySelector(".header-container");
  const sideNav = document.querySelector(".list");

  container.addEventListener("click", handleHamburgerClick);
  function handleHamburgerClick(e) {
    if (e.target === hamburgerButton || e.target === sideNav) {
      sideNav.classList.add("visible");
    } else {
      sideNav.classList.remove("visible");
    }
  }
})();

// modal handler
(function() {
  const showModalButton = document.querySelector(".open-modal-button");
  const shoppingListContainer = document.querySelector(
    ".shopping-list-container"
  );
  const modal = document.querySelector(".modal");
  const showModal = e => {
    if (e.target == showModalButton) {
      modal.classList.add("visible");
      console.log("Tap w button");
    } else if (e.target == modal) {
      modal.classList.remove("visible");
      console.log("Tap w modal");
    }
  };
  shoppingListContainer.addEventListener("click", showModal);
})();

// Firebase actions
(function handleFirebaseActions() {
  const addProductButton = document.querySelector(".add-product");

  //add a product to the list
  const addProduct = e => {
    e.preventDefault();
    let productName = document.querySelector(".product").value;
    let productQuantity = document.querySelector(".quantity").value;
    let shop = document.querySelector(".shop").value;
    let notes = document.querySelector(".notes").value;
    //push data to firebase database and reset the form

    shoppingDataRef.push({
      productName,
      productQuantity,
      shop,
      notes
    });
    resetForm();
  };

  const removeProductReady = ids => {
    //kolejna deklaracje tego samego
    const productList = document.querySelector(".product-list");
    const deleteButtons = document.querySelectorAll(".delete-button");

    const removeProduct = e => {
      deleteButtons.forEach((button, i) => {
        if (e.target == button) {
          shoppingDataRef.child(ids[i]).remove();
        }
      });
    };

    productList.addEventListener("click", removeProduct);
  };

  const resetForm = () => {
    const form = document.querySelector(".form");
    form.reset();
  };

  //render dataBase content onLoad
  const renderOnLoad = () => {
    let getTheDatabaseContent = () => {
      shoppingDataRef.on("value", getProductsData);
    };
    const getProductsData = data => {
      let dbContent = data.val();
      let products = Object.values(dbContent);
      let ids = Object.keys(dbContent);
      renderListItems(products);
      removeProductReady(ids);
    };
    const renderListItems = products => {
      const list = document.querySelector(".product-list");
      //clear the list
      list.innerHTML = "";
      products.map(product => {
        let listItemContent = `<div class="list-item-content">
          <span class="product-name">${product.productName}</span>
          <div class="product-info"> 
            <span class="quantity">${product.productQuantity} szt.</span>
            <span class="shop"> w ${product.shop}</span>
          </div>
          <button class="delete-button">

          </button>
        </div>`;
        let listItem = document.createElement("li");
        listItem.innerHTML = listItemContent;
        list.appendChild(listItem);
      });
    };
    removeProductReady();
    getTheDatabaseContent();
  };
  window.addEventListener("DOMContentLoaded", renderOnLoad);
  addProductButton.addEventListener("click", addProduct);
})();
