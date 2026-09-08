"use strict";

/* =========================================================
   GLOBAL VARIABLES
   ========================================================= */

let cart = [];
let currentUser = null;

let activeCategory = "all";
let searchTerm = "";
let sortMode = "default";


/* =========================================================
   PRODUCTS
   ========================================================= */

const products = [
    {
        id: 1,
        name: "UltraBook Pro X",
        category: "laptops",
        price: 999,
        oldPrice: 1199,
        emoji: "💻",
        desc: "Slim, fast, and powerful laptop for work and study.",
        rating: 5
    },
    {
        id: 2,
        name: "AeroBook Air 14",
        category: "laptops",
        price: 749,
        oldPrice: 899,
        emoji: "💻",
        desc: "Lightweight ultraportable with all-day battery life.",
        rating: 4
    },
    {
        id: 3,
        name: "TitanBook Gaming 17",
        category: "laptops",
        price: 1499,
        oldPrice: 1799,
        emoji: "💻",
        desc: "High-performance gaming laptop with an RGB keyboard.",
        rating: 5
    },
    {
        id: 4,
        name: "NovaPhone X12",
        category: "phones",
        price: 699,
        oldPrice: 799,
        emoji: "📱",
        desc: "Flagship smartphone with a stunning OLED display.",
        rating: 5
    },
    {
        id: 5,
        name: "PixelWave Lite",
        category: "phones",
        price: 349,
        oldPrice: 429,
        emoji: "📱",
        desc: "Affordable smartphone with a great camera.",
        rating: 4
    },
    {
        id: 6,
        name: "FoldMax Z",
        category: "phones",
        price: 999,
        oldPrice: 1199,
        emoji: "📱",
        desc: "Foldable smartphone with a large flexible screen.",
        rating: 4
    },
    {
        id: 7,
        name: "SonicBuds Pro",
        category: "accessories",
        price: 129,
        oldPrice: 159,
        emoji: "🎧",
        desc: "Wireless earbuds with active noise cancellation.",
        rating: 5
    },
    {
        id: 8,
        name: "PowerCore 20K",
        category: "accessories",
        price: 39,
        oldPrice: 59,
        emoji: "🔋",
        desc: "Portable power bank that charges devices twice over.",
        rating: 4
    },
    {
        id: 9,
        name: "SwiftCharge GaN",
        category: "accessories",
        price: 29,
        oldPrice: 39,
        emoji: "🔌",
        desc: "Compact fast charger for phones and laptops.",
        rating: 4
    },
    {
        id: 10,
        name: "StormPad Mechanical",
        category: "gaming",
        price: 89,
        oldPrice: 119,
        emoji: "⌨️",
        desc: "Mechanical gaming keyboard with customizable RGB.",
        rating: 5
    },
    {
        id: 11,
        name: "ViperMouse RGB",
        category: "gaming",
        price: 49,
        oldPrice: 69,
        emoji: "🖱️",
        desc: "Lightweight gaming mouse with a precision sensor.",
        rating: 4
    },
    {
        id: 12,
        name: "PulseView 27",
        category: "gaming",
        price: 279,
        oldPrice: 349,
        emoji: "🖥️",
        desc: "27-inch 144Hz gaming monitor for smooth visuals.",
        rating: 5
    }
];


/* =========================================================
   START APPLICATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", init);

function init() {

    applyStoredTheme();

    setupMobileMenu();

    renderProducts();

    setupCategoryFilters();

    setupSearchAndSort();

    setupProductModalEvents();

    loadUser();

    updateAuthUI();

    setupAuthModalEvents();

    loadCart();

    updateCartCount();

    setupCartEvents();

    renderCart();

    setupCheckout();

    startCountdown();

    setupContactForm();

    setupNewsletterForm();

    setupDarkModeToggle();

    setupKeyboardEvents();
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function setupMobileMenu() {

    const menuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener("click", function () {

        const isOpen = navLinks.classList.toggle("open");

        menuBtn.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });

}


/* =========================================================
   DARK MODE
   ========================================================= */

function applyStoredTheme() {

    const isDark =
        localStorage.getItem("darkMode") === "true";

    document.body.classList.toggle("dark", isDark);

    updateDarkModeIcon();
}


function updateDarkModeIcon() {

    const btn =
        document.getElementById("darkModeBtn");

    if (!btn) return;

    btn.textContent =
        document.body.classList.contains("dark")
            ? "☀️"
            : "🌙";
}


function setupDarkModeToggle() {

    const btn =
        document.getElementById("darkModeBtn");

    if (!btn) return;

    btn.addEventListener(
        "click",
        toggleDarkMode
    );
}


function toggleDarkMode() {

    const isDark =
        document.body.classList.toggle("dark");

    localStorage.setItem(
        "darkMode",
        String(isDark)
    );

    updateDarkModeIcon();
}


/* =========================================================
   PRODUCTS
   ========================================================= */

function getVisibleProducts() {

    let list = products.filter(function (product) {

        return (
            activeCategory === "all" ||
            product.category === activeCategory
        );

    });


    if (searchTerm.trim() !== "") {

        const term =
            searchTerm.trim().toLowerCase();

        list = list.filter(function (product) {

            return (
                product.name
                    .toLowerCase()
                    .includes(term) ||

                product.category
                    .toLowerCase()
                    .includes(term)
            );

        });

    }


    if (sortMode === "price-asc") {

        list = list
            .slice()
            .sort(function (a, b) {
                return a.price - b.price;
            });

    }

    else if (sortMode === "price-desc") {

        list = list
            .slice()
            .sort(function (a, b) {
                return b.price - a.price;
            });

    }

    else if (sortMode === "name-asc") {

        list = list
            .slice()
            .sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });

    }


    return list;
}


function renderProducts() {

    const grid =
        document.getElementById("productsGrid");

    if (!grid) return;

    const visible =
        getVisibleProducts();


    if (visible.length === 0) {

        grid.innerHTML = `
            <p class="no-results">
                No products match your search.
            </p>
        `;

        return;
    }


    grid.innerHTML = visible.map(function (product) {

        const stars =
            "★".repeat(product.rating) +
            "☆".repeat(5 - product.rating);


        return `
            <article
                class="product-card"
                data-id="${product.id}"
            >

                <div class="product-card-emoji">
                    ${product.emoji}
                </div>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-desc">
                    ${product.desc}
                </p>

                <p class="product-category">
                    ${product.category}
                </p>

                <p class="price-row">

                    <span class="price">
                        $${product.price}
                    </span>

                    <span class="old-price">
                        $${product.oldPrice}
                    </span>

                </p>

                <p class="rating">
                    ${stars}
                </p>

                <div class="product-card-actions">

                    <button
                        class="add-to-cart-btn"
                        data-id="${product.id}"
                        type="button"
                    >
                        Add to Cart
                    </button>

                    <button
                        class="view-details-btn"
                        data-id="${product.id}"
                        type="button"
                    >
                        View Details
                    </button>

                </div>

            </article>
        `;

    }).join("");

}


/* =========================================================
   CATEGORY FILTER
   ========================================================= */

function setupCategoryFilters() {

    const buttons =
        document.querySelectorAll(".category-btn");

    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                buttons.forEach(function (item) {

                    item.classList.remove("active");

                });

                button.classList.add("active");

                activeCategory =
                    button.dataset.category;

                renderProducts();

            }
        );

    });

}


/* =========================================================
   SEARCH + SORT
   ========================================================= */

function setupSearchAndSort() {

    const searchInput =
        document.getElementById("searchInput");

    const sortSelect =
        document.getElementById("sortSelect");


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                searchTerm =
                    searchInput.value;

                renderProducts();

            }
        );

    }


    if (sortSelect) {

        sortSelect.addEventListener(
            "change",
            function () {

                sortMode =
                    sortSelect.value;

                renderProducts();

            }
        );

    }

}


/* =========================================================
   PRODUCT MODAL
   ========================================================= */

function setupProductModalEvents() {

    const grid =
        document.getElementById("productsGrid");

    if (grid) {

        grid.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        ".view-details-btn"
                    );

                if (!button) return;

                openProductModal(
                    Number(button.dataset.id)
                );

            }
        );

    }


    document
        .querySelectorAll("[data-modal]")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const modal =
                        document.getElementById(
                            button.dataset.modal
                        );

                    closeModal(modal);

                }
            );

        });

}


function openProductModal(id) {

    const product =
        products.find(function (item) {
            return item.id === id;
        });

    if (!product) return;


    const body =
        document.getElementById(
            "productModalBody"
        );

    const modal =
        document.getElementById(
            "productModal"
        );

    if (!body || !modal) return;


    const stars =
        "★".repeat(product.rating) +
        "☆".repeat(5 - product.rating);


    body.innerHTML = `

        <span class="modal-emoji">
            ${product.emoji}
        </span>

        <h2>
            ${product.name}
        </h2>

        <p class="product-category">
            ${product.category}
        </p>

        <p>
            ${product.desc}
        </p>

        <p class="rating">
            ${stars}
        </p>

        <p class="price-row">

            <span class="price">
                $${product.price}
            </span>

            <span class="old-price">
                $${product.oldPrice}
            </span>

        </p>

        <button
            class="add-to-cart-btn"
            data-id="${product.id}"
            type="button"
        >
            Add to Cart
        </button>
    `;


    modal.classList.remove("hidden");
}


function closeModal(modalEl) {

    if (!modalEl) return;

    modalEl.classList.add("hidden");
}


/* =========================================================
   AUTHENTICATION
   ========================================================= */

function setupAuthModalEvents() {

    const loginBtn =
        document.getElementById("loginBtn");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const loginTab =
        document.getElementById("loginTabBtn");

    const signupTab =
        document.getElementById("signupTabBtn");

    const loginForm =
        document.getElementById("loginForm");

    const signupForm =
        document.getElementById("signupForm");


    if (loginBtn) {

        loginBtn.addEventListener(
            "click",
            function () {
                openAuthModal("login");
            }
        );

    }


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            handleLogout
        );

    }


    if (loginTab) {

        loginTab.addEventListener(
            "click",
            function () {
                switchAuthTab("login");
            }
        );

    }


    if (signupTab) {

        signupTab.addEventListener(
            "click",
            function () {
                switchAuthTab("signup");
            }
        );

    }


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            handleLogin
        );

    }


    if (signupForm) {

        signupForm.addEventListener(
            "submit",
            handleSignup
        );

    }

}


function openAuthModal(tab) {

    switchAuthTab(tab || "login");

    const modal =
        document.getElementById("authModal");

    if (modal) {
        modal.classList.remove("hidden");
    }

}


function switchAuthTab(tab) {

    const isLogin =
        tab === "login";


    const loginTab =
        document.getElementById("loginTabBtn");

    const signupTab =
        document.getElementById("signupTabBtn");

    const loginForm =
        document.getElementById("loginForm");

    const signupForm =
        document.getElementById("signupForm");


    if (loginTab) {
        loginTab.classList.toggle(
            "active",
            isLogin
        );
    }


    if (signupTab) {
        signupTab.classList.toggle(
            "active",
            !isLogin
        );
    }


    if (loginForm) {
        loginForm.classList.toggle(
            "hidden",
            !isLogin
        );
    }


    if (signupForm) {
        signupForm.classList.toggle(
            "hidden",
            isLogin
        );
    }


    const loginError =
        document.getElementById("loginError");

    const signupError =
        document.getElementById("signupError");


    if (loginError) {
        loginError.textContent = "";
    }

    if (signupError) {
        signupError.textContent = "";
    }

}


function getUsers() {

    const stored =
        localStorage.getItem("users");

    let users =
        stored ? JSON.parse(stored) : [];


    if (
        !users.some(function (user) {
            return user.email === "admin@gmail.com";
        })
    ) {

        users.push({
            name: "Admin",
            email: "admin@gmail.com",
            password: "123456"
        });

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

    }


    return users;
}


/* =========================================================
   SIGN UP
   ========================================================= */

function handleSignup(event) {

    event.preventDefault();


    const name =
        document
            .getElementById("signupName")
            .value
            .trim();


    const email =
        document
            .getElementById("signupEmail")
            .value
            .trim()
            .toLowerCase();


    const password =
        document
            .getElementById("signupPassword")
            .value;


    const errorEl =
        document.getElementById(
            "signupError"
        );


    if (name === "") {

        errorEl.textContent =
            "Name is required.";

        return;
    }


    if (
        !email.includes("@") ||
        !email.includes(".")
    ) {

        errorEl.textContent =
            "Enter a valid email.";

        return;
    }


    if (password.length < 6) {

        errorEl.textContent =
            "Password must be at least 6 characters.";

        return;
    }


    const users = getUsers();


    if (
        users.some(function (user) {
            return user.email === email;
        })
    ) {

        errorEl.textContent =
            "An account with this email already exists.";

        return;
    }


    users.push({
        name: name,
        email: email,
        password: password
    });


    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    loginUser({
        name: name,
        email: email
    });


    document
        .getElementById("authModal")
        .classList.add("hidden");


    event.target.reset();

}


/* =========================================================
   LOGIN
   ========================================================= */

function handleLogin(event) {

    event.preventDefault();


    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();


    const password =
        document
            .getElementById("loginPassword")
            .value;


    const errorEl =
        document.getElementById(
            "loginError"
        );


    const users = getUsers();


    const match =
        users.find(function (user) {

            return (
                user.email === email &&
                user.password === password
            );

        });


    if (!match) {

        errorEl.textContent =
            "Incorrect email or password.";

        return;
    }


    loginUser({
        name: match.name,
        email: match.email
    });


    document
        .getElementById("authModal")
        .classList.add("hidden");


    event.target.reset();

}


/* =========================================================
   USER
   ========================================================= */

function loginUser(user) {

    currentUser = user;

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );

    updateAuthUI();
}


function handleLogout() {

    currentUser = null;

    localStorage.removeItem(
        "currentUser"
    );

    updateAuthUI();

}


function loadUser() {

    const stored =
        localStorage.getItem(
            "currentUser"
        );

    currentUser =
        stored
            ? JSON.parse(stored)
            : null;

}


function updateAuthUI() {

    const loginBtn =
        document.getElementById(
            "loginBtn"
        );

    const userArea =
        document.getElementById(
            "userArea"
        );

    const usernameDisplay =
        document.getElementById(
            "usernameDisplay"
        );


    if (!loginBtn || !userArea) return;


    if (currentUser) {

        loginBtn.classList.add(
            "hidden"
        );

        userArea.classList.remove(
            "hidden"
        );


        if (usernameDisplay) {

            usernameDisplay.textContent =
                currentUser.name;

        }

    }

    else {

        loginBtn.classList.remove(
            "hidden"
        );

        userArea.classList.add(
            "hidden"
        );


        if (usernameDisplay) {

            usernameDisplay.textContent = "";

        }

    }

}


/* =========================================================
   CART
   ========================================================= */

function loadCart() {

    const stored =
        localStorage.getItem("cart");

    try {

        cart =
            stored
                ? JSON.parse(stored)
                : [];

    }

    catch (error) {

        cart = [];

    }

}


function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


function addToCart(id) {

    if (!currentUser) {

        openAuthModal("login");

        return;
    }


    const existing =
        cart.find(function (item) {
            return item.id === id;
        });


    if (existing) {

        existing.qty += 1;

    }

    else {

        cart.push({
            id: id,
            qty: 1
        });

    }


    saveCart();

    updateCartCount();

    renderCart();

}


/* =========================================================
   CART COUNT
   ========================================================= */

function updateCartCount() {

    let count = 0;


    cart.forEach(function (item) {

        count += item.qty;

    });


    const countElement =
        document.getElementById(
            "cartCount"
        );


    if (countElement) {

        countElement.textContent =
            String(count);

    }

}


/* =========================================================
   RENDER CART
   ========================================================= */

function renderCart() {

    const container =
        document.getElementById(
            "cartItems"
        );

    const totalElement =
        document.getElementById(
            "cartTotal"
        );

    const messageElement =
        document.getElementById(
            "cartMessage"
        );


    if (!container || !totalElement) {
        return;
    }


    if (messageElement) {
        messageElement.textContent = "";
    }


    if (cart.length === 0) {

        container.innerHTML = `
            <p class="no-results">
                Your cart is empty.
            </p>
        `;

        totalElement.textContent = "$0";

        return;
    }


    let total = 0;


    container.innerHTML =
        cart.map(function (item) {

            const product =
                products.find(function (p) {
                    return p.id === item.id;
                });


            if (!product) return "";


            const itemTotal =
                product.price * item.qty;


            total += itemTotal;


            return `

                <div
                    class="cart-item"
                    data-id="${product.id}"
                >

                    <span>
                        ${product.emoji}
                        ${product.name}
                    </span>

                    <span class="cart-qty-controls">

                        <button
                            class="qty-btn"
                            data-action="decrease"
                            data-id="${product.id}"
                            type="button"
                        >
                            -
                        </button>

                        ${item.qty}

                        <button
                            class="qty-btn"
                            data-action="increase"
                            data-id="${product.id}"
                            type="button"
                        >
                            +
                        </button>

                    </span>

                    <span>
                        $${itemTotal}
                    </span>

                    <button
                        class="remove-btn"
                        data-id="${product.id}"
                        type="button"
                    >
                        Remove
                    </button>

                </div>

            `;

        }).join("");


    totalElement.textContent =
        "$" + total.toFixed(2);

}


/* =========================================================
   CART EVENTS
   ========================================================= */

function setupCartEvents() {

    const cartBtn =
        document.getElementById("cartBtn");

    const closeBtn =
        document.getElementById(
            "cartCloseBtn"
        );

    const overlay =
        document.getElementById(
            "cartOverlay"
        );


    if (cartBtn) {

        cartBtn.addEventListener(
            "click",
            openCart
        );

    }


    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            closeCart
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeCart
        );

    }


    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    ".add-to-cart-btn"
                );


            if (!button) return;


            addToCart(
                Number(button.dataset.id)
            );

        }
    );

}


/* =========================================================
   OPEN / CLOSE CART
   ========================================================= */

function openCart() {

    const sidebar =
        document.getElementById(
            "cartSidebar"
        );

    const overlay =
        document.getElementById(
            "cartOverlay"
        );


    if (sidebar) {

        sidebar.classList.add(
            "open"
        );

    }


    if (overlay) {

        overlay.classList.remove(
            "hidden"
        );

    }

}


function closeCart() {

    const sidebar =
        document.getElementById(
            "cartSidebar"
        );

    const overlay =
        document.getElementById(
            "cartOverlay"
        );


    if (sidebar) {

        sidebar.classList.remove(
            "open"
        );

    }


    if (overlay) {

        overlay.classList.add(
            "hidden"
        );

    }

}


/* =========================================================
   CHANGE QUANTITY
   ========================================================= */

function changeQty(id, delta) {

    const item =
        cart.find(function (cartItem) {
            return cartItem.id === id;
        });


    if (!item) return;


    item.qty += delta;


    if (item.qty <= 0) {

        cart =
            cart.filter(function (cartItem) {

                return cartItem.id !== id;

            });

    }


    saveCart();

    updateCartCount();

    renderCart();

}


/* =========================================================
   REMOVE FROM CART
   ========================================================= */

function removeFromCart(id) {

    cart =
        cart.filter(function (item) {

            return item.id !== id;

        });


    saveCart();

    updateCartCount();

    renderCart();

}


/* =========================================================
   CHECKOUT
   ========================================================= */

function checkout() {

    const messageEl =
        document.getElementById(
            "cartMessage"
        );


    if (!currentUser) {

        openAuthModal("login");

        return;
    }


    if (cart.length === 0) {

        messageEl.textContent =
            "Your cart is empty.";

        messageEl.classList.add(
            "form-error"
        );

        messageEl.classList.remove(
            "form-success"
        );

        return;
    }


    cart = [];

    saveCart();

    updateCartCount();

    renderCart();


    messageEl.textContent =
        "Thank you for your order!";

    messageEl.classList.add(
        "form-success"
    );

    messageEl.classList.remove(
        "form-error"
    );

}


/* =========================================================
   CHECKOUT EVENTS
   ========================================================= */

function setupCheckout() {

    const checkoutBtn =
        document.getElementById(
            "checkoutBtn"
        );


    if (checkoutBtn) {

        checkoutBtn.addEventListener(
            "click",
            checkout
        );

    }


    const cartItems =
        document.getElementById(
            "cartItems"
        );


    if (!cartItems) return;


    cartItems.addEventListener(
        "click",
        function (event) {

            const qtyBtn =
                event.target.closest(
                    ".qty-btn"
                );


            if (qtyBtn) {

                const id =
                    Number(qtyBtn.dataset.id);

                const delta =
                    qtyBtn.dataset.action ===
                    "increase"
                        ? 1
                        : -1;


                changeQty(
                    id,
                    delta
                );

                return;
            }


            const removeBtn =
                event.target.closest(
                    ".remove-btn"
                );


            if (removeBtn) {

                removeFromCart(
                    Number(removeBtn.dataset.id)
                );

            }

        }
    );

}


/* =========================================================
   COUNTDOWN
   ========================================================= */

function startCountdown() {

    /*
       Change this date whenever you want
       the sale to end.
    */

    const target =
        new Date(
            "2026-09-15T00:00:00"
        );


    function tick() {

        const now =
            new Date();


        let diff =
            target.getTime() -
            now.getTime();


        if (diff < 0) {

            diff = 0;

        }


        const days =
            Math.floor(
                diff /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (diff /
                    (1000 * 60 * 60)) %
                    24
            );


        const minutes =
            Math.floor(
                (diff /
                    (1000 * 60)) %
                    60
            );


        const seconds =
            Math.floor(
                (diff / 1000) %
                    60
            );


        updateElement(
            "cdDays",
            String(days)
        );

        updateElement(
            "cdHours",
            String(hours).padStart(2, "0")
        );

        updateElement(
            "cdMinutes",
            String(minutes).padStart(2, "0")
        );

        updateElement(
            "cdSeconds",
            String(seconds).padStart(2, "0")
        );

    }


    tick();

    setInterval(
        tick,
        1000
    );

}


/* =========================================================
   CONTACT FORM
   ========================================================= */

function setupContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "contactName"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "contactEmail"
                    )
                    .value
                    .trim();


            const message =
                document
                    .getElementById(
                        "contactMessage"
                    )
                    .value
                    .trim();


            const msgArea =
                document.getElementById(
                    "contactMsgArea"
                );


            if (
                name === "" ||
                email === "" ||
                message === ""
            ) {

                showFormMessage(
                    msgArea,
                    "All fields are required.",
                    false
                );

                return;
            }


            if (
                !email.includes("@") ||
                !email.includes(".")
            ) {

                showFormMessage(
                    msgArea,
                    "Enter a valid email.",
                    false
                );

                return;
            }


            showFormMessage(
                msgArea,
                "Message sent successfully.",
                true
            );


            form.reset();

        }
    );

}


/* =========================================================
   NEWSLETTER
   ========================================================= */

function setupNewsletterForm() {

    const form =
        document.getElementById(
            "newsletterForm"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document
                    .getElementById(
                        "newsletterEmail"
                    )
                    .value
                    .trim();


            const msgArea =
                document.getElementById(
                    "newsletterMsgArea"
                );


            if (email === "") {

                showFormMessage(
                    msgArea,
                    "Email is required.",
                    false
                );

                return;
            }


            if (
                !email.includes("@") ||
                !email.includes(".")
            ) {

                showFormMessage(
                    msgArea,
                    "Enter a valid email.",
                    false
                );

                return;
            }


            showFormMessage(
                msgArea,
                "Thank you for subscribing!",
                true
            );


            form.reset();

        }
    );

}


/* =========================================================
   FORM MESSAGE
   ========================================================= */

function showFormMessage(
    element,
    message,
    success
) {

    if (!element) return;


    element.textContent =
        message;


    element.classList.toggle(
        "form-success",
        success
    );


    element.classList.toggle(
        "form-error",
        !success
    );

}


/* =========================================================
   KEYBOARD / MODAL EVENTS
   ========================================================= */

function setupKeyboardEvents() {

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }


            const productModal =
                document.getElementById(
                    "productModal"
                );

            const authModal =
                document.getElementById(
                    "authModal"
                );


            if (
                productModal &&
                !productModal.classList.contains(
                    "hidden"
                )
            ) {

                closeModal(productModal);

            }


            if (
                authModal &&
                !authModal.classList.contains(
                    "hidden"
                )
            ) {

                closeModal(authModal);

            }


            closeCart();

        }
    );

}


/* =========================================================
   HELPER
   ========================================================= */

function updateElement(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;

    }

}