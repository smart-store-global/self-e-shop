// ========================================================
// 1. BRANDED FIREBASE CORE INTEGRATION (নতুন অ্যাপ চাবি)
// ========================================================
const firebaseConfig = {
    apiKey: "AIzaSyCN2rRO11v1gZQ54G7N339nD_XiOLNbfKw",
    authDomain: "://firebaseapp.com",
    databaseURL: "https://firebaseio.com",
    projectId: "self-e-shop",
    storageBucket: "self-e-shop.firebasestorage.app",
    messagingSenderId: "931929696538",
    appId: "1:931929696538:web:9e52b9e72b5ddee06f24a3",
    measurementId: "G-K28PMC5YL6"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// ========================================================
// 2. GLOBAL SYSTEM STATE VARIABLES
// ========================================================
let currentBalance = 0.00;
let userAssignedOrders = [];
let activeClientID = null;

// ========================================================
// 3. COMPLETE INTEGRATED PRODUCTS DATABASE ARRAY (Part 1)
// ========================================================
const extendedProducts = [
    { id: 1, title: "Children's Ski Suit Warm Boys Girls Waterproof", originalPrice: 65.50, image: "prod1.jpg", category: "clothing" },
    { id: 2, title: "Winter Thick Windproof Outdoor Snowboard Jacket Onesie", originalPrice: 72.30, image: "prod2.jpg", category: "clothing" },
    { id: 3, title: "Thicken Fleece Hooded Jumpsuit Infant Outerwear", originalPrice: 35.90, image: "prod3.jpg", category: "clothing" },
    { id: 4, title: "Men's Waterproof Tactical Mountain Jacket Winter Coat", originalPrice: 85.00, image: "prod4.jpg", category: "clothing" },
    { id: 5, title: "Women's Slim Fit Insulated Snowboard Pants Waterproof", originalPrice: 45.20, image: "prod5.jpg", category: "clothing" },
    { id: 6, title: "Thermal Fleece Face Mask Cold Weather Neck Warmer", originalPrice: 12.50, image: "prod6.jpg", category: "accessories" },
    { id: 7, title: "Waterproof Touchscreen Winter Cycling Ski Gloves Pack", originalPrice: 19.90, image: "prod7.jpg", category: "accessories" },
    { id: 8, title: "Anti-Fog UV Protection Professional Snow Goggles Eyes", originalPrice: 29.99, image: "prod8.jpg", category: "accessories" },
    { id: 9, title: "Rechargeable Smart Electric Heated Vest Body Warmer", originalPrice: 55.00, image: "prod9.jpg", category: "clothing" },
    { id: 10, title: "Premium Wool Blend Outdoor Mountaineering Hiking Socks", originalPrice: 15.00, image: "prod10.jpg", category: "accessories" },
    { id: 11, title: "Ultra Lightweight Winter Snow Camp Sleeping Bag Sleep", originalPrice: 49.90, image: "prod11.jpg", category: "outdoor" },
    { id: 12, title: "Professional Ice Cleats Crampons Traction Snow Grips Shoes", originalPrice: 24.50, image: "prod12.jpg", category: "accessories" },
    { id: 13, title: "Windproof Thermal Ear Muffs Band Headwear Ear Warmer", originalPrice: 9.99, image: "prod13.jpg", category: "accessories" },
    { id: 14, title: "Kids Polar Fleece Balaclava Full Face Hood Scarf Winter", originalPrice: 14.20, image: "prod14.jpg", category: "clothing" },
    { id: 15, title: "Portable High Performance Ice Snow Fishing Tent Castle", originalPrice: 129.00, image: "prod15.jpg", category: "outdoor" }
    ,
    { id: 16, title: "High Speed Intelligent Remote Control Snow Mobile Car Sled", originalPrice: 89.90, image: "prod16.jpg", category: "electronics" },
    { id: 17, title: "Ultrasonic Intelligent Room Humidifier Cool Mist Spray", originalPrice: 39.50, image: "prod17.jpg", category: "electronics" },
    { id: 18, title: "Smart Thermostat Space Heater Tower PTC Fast Overheat", originalPrice: 69.00, image: "prod18.jpg", category: "electronics" },
    { id: 19, title: "USB Intelligent Heated Eye Mask Sleep Thermal Compress", originalPrice: 22.00, image: "prod19.jpg", category: "electronics" },
    { id: 20, title: "Electric Rechargeable Hand Warmers Portable Pocket Power Bank", originalPrice: 26.50, image: "prod20.jpg", category: "electronics" },
    { id: 21, title: "Premium Portable Espresso Machine Mini Travel Coffee Maker", originalPrice: 49.00, image: "prod21.jpg", category: "electronics" },
    { id: 22, title: "Smart Mug Heated Coffee Cup Drink Warm Constant Alert Temp", originalPrice: 34.90, image: "prod22.jpg", category: "electronics" },
    { id: 23, title: "Multifunctional Electric Hot Pot Skillet Steamer Nonstick", originalPrice: 42.00, image: "prod23.jpg", category: "electronics" },
    { id: 24, title: "Winter Plush Fuzzy Soft Indoor House Slippers Memory Foam", originalPrice: 18.00, image: "prod24.jpg", category: "clothing" },
    { id: 25, title: "Thick Knit Beanie Hat Cozy Daily Slouchy Skull Cap Unisex", originalPrice: 11.50, image: "prod25.jpg", category: "accessories" },
    { id: 26, title: "Unisex Fleece Lined Heavyweight Winter Cargo Pants Utility", originalPrice: 38.90, image: "prod26.jpg", category: "clothing" },
    { id: 27, title: "Professional Alpine Down Jacket Extreme Weather Protection", originalPrice: 159.00, image: "prod27.jpg", category: "clothing" },
    { id: 28, title: "Automatic Snow Ice Melting Mat Heated Outdoor Walkway Path", originalPrice: 79.90, image: "prod28.jpg", category: "outdoor" },
    { id: 29, title: "Rechargeable Headlamp Waterproof LED Zoom Cap Mountain Tech", originalPrice: 19.50, image: "prod29.jpg", category: "electronics" },
    { id: 30, title: "Thermal Insulated Travel Mug Leak Proof Flask Stainless Steel", originalPrice: 16.00, image: "prod30.jpg", category: "accessories" },
    { id: 31, title: "Winter Warm Pet Dog Clothes Padded Vest Jacket Puppy Sled", originalPrice: 14.90, image: "prod31.jpg", category: "clothing" },
    { id: 32, title: "Ergonomic Snow Shovel Heavy Duty Metal Blade Utility Tool", originalPrice: 32.00, image: "prod32.jpg", category: "outdoor" },
    { id: 33, title: "Compact Car Snow Ice Scraper Extendable Brush Foam Grip", originalPrice: 15.50, image: "prod33.jpg", category: "outdoor" },
    { id: 34, title: "Heavy Duty Ice Traction Cleats Snow Chains Iron Links Shoes", originalPrice: 28.00, image: "prod34.jpg", category: "accessories" },
    { id: 35, title: "Double Breasted Coat Wool Atmospheric Field Coat", originalPrice: 109.70, image: "prod35.jpg", category: "clothing" },
    { id: 36, title: "Large Intelligent Aromatherapy Machine Air System", originalPrice: 107.90, image: "prod36.jpg", category: "electronics" },
    { id: 37, title: "Premium One-Piece Tie-Dye Children's Ski Suit with Cute Plush Hood", originalPrice: 59.51, image: "prod37.jpg", category: "clothing" }
];
// ========================================================
// 4. AUTOMATIC REFRESH-PROOF LIFECYCLE CONTROLLER
// ========================================================
function checkActiveLoginSession() {
    const isUserActive = localStorage.getItem('is_shop_user_active');
    const savedCustID = localStorage.getItem('saved_shop_cust_id');
    const savedShopName = localStorage.getItem('saved_shop_name');

    if (isUserActive === 'true' && savedCustID && savedShopName) {
        activeClientID = savedCustID;
        
        document.getElementById('displayShopName').innerText = savedShopName;
        document.getElementById('brandName').innerText = savedShopName;
        document.getElementById('displayCustID').innerText = savedCustID;

        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('dashboard-section').style.display = 'block';

        loadProductsEngine();
        initializeLiveClientSync(savedCustID);
        initEverGrowingTraffic();
        
        console.log("Welcome back! Active session locked for client: " + savedCustID);
    } else {
        generateFreshUniqueIDForForm();
    }
}

// নতুন সম্পূর্ণ আলাদা ৫ ডিজিটের ইউনিক আইডি মেকার ইঞ্জিন
function generateFreshUniqueIDForForm() {
    const randDigits = Math.floor(Math.random() * 90000) + 10000; 
    const uniqueTimeID = "SH-" + randDigits;
    
    const idDisplay = document.getElementById('displayCustID');
    if (idDisplay) idDisplay.innerText = uniqueTimeID;
    
    window.tempGeneratedUniqueID = uniqueTimeID;
}

// ========================================================
// 5. INTELLECTUAL REAL-TIME REGISTRATION SUBMITTER
// ========================================================
function handleRegister(event) {
    if (event) event.preventDefault();
    
    const inputShopName = document.getElementById('shopName').value.trim();
    if (!inputShopName) return alert("Please enter your Shop Name first!");

    if (!window.tempGeneratedUniqueID) {
        window.tempGeneratedUniqueID = "SH-" + (Math.floor(Math.random() * 90000) + 10000);
    }
    
    const uniqueTimeID = window.tempGeneratedUniqueID;
    activeClientID = uniqueTimeID;

    document.getElementById('displayShopName').innerText = inputShopName;
    document.getElementById('brandName').innerText = inputShopName;
    document.getElementById('displayCustID').innerText = uniqueTimeID;

    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'block';

    localStorage.setItem('is_shop_user_active', 'true');
    localStorage.setItem('saved_shop_cust_id', uniqueTimeID);
    localStorage.setItem('saved_shop_name', inputShopName);

    // ফায়ারবেস ডেটাবেজে সম্পূর্ণ আলাদা কাস্টমার নোড তৈরি
    database.ref('shop_traffic_' + uniqueTimeID).set({
        shopName: inputShopName,
        balance: 0.00,
        registeredAt: firebase.database.ServerValue.TIMESTAMP
    });

    loadProductsEngine();
    initializeLiveClientSync(uniqueTimeID);
    initEverGrowingTraffic();
}
// ========================================================
// 6. REAL-TIME DATA TRANSMISSION & LISTENER SYNC
// ========================================================
function initializeLiveClientSync(clientID) {
    // ক) অ্যাডমিন প্যানেল থেকে টাকা বা ব্যালেন্স পাঠানো ট্র্যাক করার লাইভ লিসেনার
    database.ref('shop_traffic_' + clientID + '/balance').on('value', (snapshot) => {
        if (snapshot.exists()) {
            currentBalance = parseFloat(snapshot.val());
            document.getElementById('userBalance').innerText = currentBalance.toFixed(2);
        }
    });

    // খ) কাস্টম নোটিশ বোর্ড অ্যালার্ট রিসিভার
    database.ref('notices/' + clientID).on('value', (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            alert("📢 BREAKING SYSTEM NOTICE FROM ADMIN:\n\n" + data.text);
        }
    });

    // গ) অ্যাডমিন প্যানেল থেকে পাঠানো প্রডাক্ট অর্ডার রিসিভ করার লিসেনার
    database.ref('orders/' + clientID).on('value', (snapshot) => {
        const grid = document.getElementById('orderGridContainer');
        if (!grid) return;
        grid.innerHTML = "";
        
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const order = childSnapshot.val();
                const card = document.createElement('div');
                card.className = 'order-card';
                card.style.cssText = "background:#fff; border:1px solid #e2e8f0; padding:15px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.02); margin-bottom:10px;";
                card.innerHTML = `
                    <div style="font-weight:bold; color:#ff5722; font-size:13px;">🛒 ${order.orderId}</div>
                    <div style="font-size:14px; font-weight:600; margin:5px 0; color:#1e293b;">${order.title}</div>
                    <div style="font-weight:700; color:#22c55e;">Wholesale Cost: $${order.price}</div>
                    <div style="font-size:11px; color:#64748b; margin-top:2px;">SKU: ${order.sku}</div>
                    <div style="margin-top:8px; display:inline-block; padding:3px 8px; background:#ffe0b2; color:#e65100; border-radius:4px; font-size:11px; font-weight:bold;">${order.status}</div>
                `;
                grid.appendChild(card);
            });
        } else {
            grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:25px; color:#94a3b8; font-size:13px;">No dropship stock assigned yet. System waiting for Admin command...</div>`;
        }
    });

    // ঘ) লাইভ সাপোর্ট প্রাইভেট চ্যাট ইঞ্জিন লিসেনার
    database.ref('chats/' + clientID).on('value', (snapshot) => {
        const stream = document.getElementById('publicChatStream');
        if (!stream) return;
        stream.innerHTML = "";
        
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const chat = childSnapshot.val();
                const bubble = document.createElement('div');
                if (chat.sender === 'user') {
                    bubble.style.cssText = "background:#ff5722; color:white; padding:8px 12px; border-radius:8px; max-width:80%; margin:4px 0; font-size:13px; margin-left:auto; width:fit-content; word-break:break-word;";
                    bubble.innerText = chat.message;
                } else {
                    bubble.style.cssText = "background:#e2e8f0; color:#1e293b; padding:8px 12px; border-radius:8px; max-width:80%; margin:4px 0; font-size:13px; width:fit-content; word-break:break-word;";
                    bubble.innerText = "Support: " + chat.message;
                }
                stream.appendChild(bubble);
            });
            stream.scrollTop = stream.scrollHeight;
        }
    });
}
// ========================================================
// 7. CLIENT STOREFRONT INTERFACE GENERATOR WITH FILTERS
// ========================================================
function loadProductsEngine(filterCategory = "all") {
    const container = document.getElementById('productContainer');
    if (!container) return;
    container.innerHTML = "";

    extendedProducts.forEach(prod => {
        if (filterCategory !== "all" && prod.category !== filterCategory) return;

        const item = document.createElement('div');
        item.className = 'product-card';
        item.style.cssText = "background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:15px; box-shadow:0 2px 4px rgba(0,0,0,0.02); text-align:center;";
        item.innerHTML = `
            <div style="width:100%; height:120px; background:#f8fafc; border-radius:6px; margin-bottom:10px; display:flex; align-items:center; justify-content:center; color:#94a3b8; font-size:12px; font-weight:bold;">📦 Product Image</div>
            <div style="font-weight:600; font-size:14px; color:#1e293b; min-height:40px; display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical; overflow:hidden; text-align:left;">${prod.title}</div>
            <div style="display:flex; justify-content:between; align-items:center; margin-top:10px;">
                <span style="color:#ff5722; font-weight:bold; font-size:15px;">$${prod.originalPrice}</span>
                <span style="font-size:11px; color:#94a3b8; text-decoration:line-through;">$${(prod.originalPrice * 1.5).toFixed(2)}</span>
            </div>
            <button style="width:100%; background:#0f172a; color:#fff; border:none; padding:8px; border-radius:4px; margin-top:10px; font-size:12px; font-weight:bold; cursor:pointer;">Push to Store</button>
        `;
        container.appendChild(item);
    });
}

// ক্যাটাগরি ফিল্টার করার ট্রিক ফাংশন
function filterProducts(category) {
    loadProductsEngine(category);
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}
// ========================================================
// 8. EVER-GROWING INTERNET TRAFFIC GENERATOR ENGINE
// ========================================================
function initEverGrowingTraffic() {
    let count = Math.floor(Math.random() * 45) + 120;
    const txt = document.getElementById('totalVisitorCount');
    if (txt) txt.innerText = count;
    
    setInterval(() => {
        count += Math.floor(Math.random() * 3) + 1;
        if (txt) txt.innerText = count;
    }, 4000);
}

// ইউজার চ্যাট মেসেজ পাঠানোর ফাংশন
function sendUserMessage() {
    const input = document.getElementById('userChatMessageInput');
    if (!input || !input.value.trim() || !activeClientID) return;
    
    database.ref('chats/' + activeClientID).push({
        sender: 'user',
        type: 'text',
        message: input.value.trim()
    }).then(() => {
        input.value = "";
    });
}

// ইউজার লগআউট সিস্টেম (রিসেট মেমোরি)
function handleUserLogout() {
    localStorage.clear();
    location.reload();
}

// প্রোফাইল ছবি আপলোড ফাংশন
function uploadProfileImage(event) {
    const file = event.target.files;
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) { 
            document.getElementById('userProfilePic').src = e.target.result; 
        };
        reader.readAsDataURL(file);
    }
}

// পেজ লোড হওয়ার সাথে সাথে সেশন এবং ইউনিক আইডি চেকার চালু করা
document.addEventListener("DOMContentLoaded", checkActiveLoginSession);
