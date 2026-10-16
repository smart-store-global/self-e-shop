import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  runTransaction,
  onValue
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-database.js";

// ২. আপনার নতুন ফায়ারবেস প্রজেক্টের ১০০% সঠিক কনফিগারেশন
const firebaseConfig = {
  apiKey: "AIzaSyBdpr3NYTRJGYKq7NLiY6c1XMW55p4nqko",
  authDomain: "://firebaseapp.com",
  databaseURL: "https://firebaseio.com",
  projectId: "self-e-shop-841f4",
  storageBucket: "self-e-shop-841f4.firebasestorage.app",
  messagingSenderId: "418069524935",
  appId: "1:418069524935:web:2ce981897886b27a88e9e2",
  measurementId: "G-DY4ZBCMZ6E"
};

// ৩. ফায়ারবেস ইনিশিয়ালাইজ করা
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ==================== [actions.js - ভাগ ১] ====================

// ১. ফায়ারবেস মডিউল ইমপোর্ট করা (Realtime Database সংস্করণ)
import { initializeApp } from "https://gstatic.com";
import { 
    getDatabase, 
    ref, 
    set, 
    runTransaction, 
    onValue, 
    update, 
    push 
} from "https://gstatic.com";

// ২. আপনার নতুন ফায়ারবেস প্রজেক্টের ১০০% সঠিক কনফিগারেশন
const firebaseConfig = {
  apiKey: "AIzaSyBdpr3NYTRJGYKq7NLiY6c1XMW55p4nqko",
  authDomain: "://firebaseapp.com",
  databaseURL: "https://firebaseio.com",
  projectId: "self-e-shop-841f4",
  storageBucket: "self-e-shop-841f4.firebasestorage.app",
  messagingSenderId: "418069524935",
  appId: "1:418069524935:web:2ce981897886b27a88e9e2",
  measurementId: "G-DY4ZBCMZ6E"
};

// ৩. ফায়ারবেস ইনিশিয়ালাইজ করা
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ৪. গ্লোবাল স্টেট ম্যানেজমেন্ট ভ্যারিয়েবল
let currentBalance = 0.00;
let userAssignedOrders = []; 
let currentLoggedInClientID = null; 
let baseCustomerID = 74514242; 

// ৫০টি ডামি ক্লায়েন্ট ট্রাফিকের লুপ ফ্রেমওয়ার্ক
let dummyClients = [];
for (let i = 1; i <= 50; i++) {
    dummyClients.push({ id: (74514242 + i + 100).toString() });
}

// প্রোফাইল পিকচার আপলোড ফাংশন
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
window.uploadProfileImage = uploadProfileImage;
// ৫. Comprehensive 54 Products Database Array (Part 1)
const productsData = [
    { id: 1, title: "VMAXPRO Mobile Phone High Performance", originalPrice: 270.00, img: "vmaxpro1.jpg", free: false },
    { id: 2, title: "VMAX PRO Mobile Phone Multiple Colors", originalPrice: 270.00, img: "vmaxpro2.jpg", free: false },
    { id: 3, title: "8-foot Medium-sized Table Tennis Table Foldable", originalPrice: 203.92, img: "pingpong.jpg", free: true },
    { id: 4, title: "925 Silver Set Moissani Hip-hop Personalized Necklace", originalPrice: 238.90, img: "necklace.jpg", free: false },
    { id: 5, title: "133 Integrated Computer Voice Assistant CM4", originalPrice: 249.34, img: "computer.jpg", free: false },
    { id: 6, title: "Indoor Playground 7-in-1 Jungle Gym Playset", originalPrice: 188.74, img: "playground.jpg", free: true },
    { id: 7, title: "ML100Bi Photography Fill Light High Power King", originalPrice: 220.43, img: "filllight.jpg", free: false },
    { id: 8, title: "Brand New Home Treadmill 2.5HP Silent Folding", originalPrice: 177.65, img: "treadmill.jpg", free: false },
    { id: 9, title: "300 Pound Hydraulic Motorcycle Scissor Jack Lift", originalPrice: 175.74, img: "jack.jpg", free: true },
    { id: 12, title: "Applicable To MACBOOK A1398 2013-2015 Display", originalPrice: 227.00, img: "macbook.jpg", free: false },
    { id: 13, title: "Large Hole Fishnet Artificial Scalp Seamless Wig", originalPrice: 223.88, img: "wig1.jpg", free: false },
    { id: 14, title: "Basswood Cello, Black Professional Instrument", originalPrice: 142.52, img: "cello.jpg", free: true },
    { id: 15, title: "Real Human Hair Transparent Lace Full-head Wig", originalPrice: 222.01, img: "wig2.jpg", free: false },
    { id: 16, title: "Lace Wig Can Be Dyed And Ironed Full Head Cover", originalPrice: 238.80, img: "wig3.jpg", free: false },
    { id: 17, title: "70mai A800S-1 4K Dash Cam Car DVR 24H Support", originalPrice: 140.01, img: "dashcam1.jpg", free: false },
    { id: 18, title: "Big Screen Smart Watch Ultra Series", originalPrice: 135.60, img: "watch.jpg", free: false }
];
// ৬. Extending Database Management (Part 2)
const extendedProducts = [
    { id: 19, title: "Creative Simple Portable Plastic Civilian Binoculars", originalPrice: 135.13, img: "binoculars.jpg", free: false },
    { id: 20, title: "Golden Bright Surface Bandage Design Tight Waist", originalPrice: 134.14, img: "dress1.jpg", free: false },
    { id: 21, title: "Torch Suitable For Motorcycle Sports Car S1000RR", originalPrice: 358.00, img: "torch.jpg", free: false },
    { id: 22, title: "Cozinhar Filme de carro completo gratuito", originalPrice: 149.50, img: "film.jpg", free: false },
    { id: 23, title: "Metal Tool Storage Cabinets Heavy Duty", originalPrice: 127.94, img: "cabinet2.jpg", free: true },
    { id: 24, title: "European And American Ladies Color Human Wigs", originalPrice: 126.49, img: "wig4.jpg", free: false },
    { id: 25, title: "Digital Singing Dedicated Recording Sound Card", originalPrice: 600.75, img: "soundcard.jpg", free: false },
    { id: 26, title: "Hand-rubbed Vintage Business Bag", originalPrice: 441.45, img: "bag.jpg", free: false },
    { id: 28, title: "Mini Screenless TV Touch Home Portable Smartphone Projector", originalPrice: 395.64, img: "projector.jpg", free: false },
    { id: 29, title: "Aluminum Alloy Soft Tail Oil Brake Damping Mountain Bike", originalPrice: 335.69, img: "bike1.jpg", free: false },
    { id: 31, title: "Sexy Luxury Shiny Rhinestone Dress Costume", originalPrice: 121.27, img: "dress2.jpg", free: false },
    { id: 32, title: "70mai A800S True 4K ComIMX415 Dash Cam", originalPrice: 117.43, img: "dashcam2.jpg", free: false },
    { id: 33, title: "Raspberry PI CM4 Computing Module Board", originalPrice: 159.34, img: "raspberry.jpg", free: false },
    { id: 34, title: "Pull Rod Golf Bag Male And Female Portable", originalPrice: 111.93, img: "golfbag.jpg", free: false },
    { id: 35, title: "Double Breasted Coat Wool Atmospheric Field Coat", originalPrice: 109.70, img: "coat.jpg", free: false },
    { id: 36, title: "Large Intelligent Aromatherapy Machine Air System", originalPrice: 107.90, img: "aroma.jpg", free: false },
    { id: 37, title: "Premium One-Piece Tie-Dye Children's Ski Suit with Cute Plush Hood", originalPrice: 59.51, img: "image_J0UXDs.png", free: false }
];
productsData.push(...extendedProducts);

// UI ইনভেন্টরি রেন্ডারার ফাংশন
function loadProducts() {
    const container = document.getElementById('productGridContainer');
    if (!container) return;
    container.innerHTML = "";
    
    productsData.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'product-card';
        let freeTag = prod.free ? '<span class="tag-free">Free</span>' : "";
        card.innerHTML = `${freeTag}<img src="${prod.img}" alt="${prod.title}" class="product-img"><div><h3 class="product-title">${prod.title}</h3><div class="product-meta" style="font-size:12px; color:#64748b;">Inventory Showcase</div></div><div class="product-footer"><div class="price-container" style="width:100%;"><span class="product-price" style="text-decoration:none;">$${prod.originalPrice.toFixed(2)}</span></div></div>`;
        container.appendChild(card);
    });
}
window.loadProducts = loadProducts;
// ৭. ইউনিক সিরিয়াল আইডি সহ নতুন ফায়ারবেস রেজিস্ট্রেশন হ্যান্ডলার
async function handleRegister(event) {
    event.preventDefault();
    const shopName = document.getElementById('shopName').value;
    
    try {
        // ডেটাবেজের metadata/lastId থেকে অটো-ইনক্রিমেন্ট আইডি জেনারেট করা
        const counterRef = ref(db, "metadata/lastId");
        
        const result = await runTransaction(counterRef, (currentValue) => {
            if (currentValue === null) {
                return 74514243;
            }
            return currentValue + 1;
        });

        const newID = result.snapshot.val();
        currentLoggedInClientID = newID.toString();

        // ফায়ারবেস রিয়েল-টাইম ডাটাবেজে গ্রাহকের নতুন অ্যাকাউন্ট তৈরি
        await set(ref(db, "users/" + currentLoggedInClientID), {
            shopName: shopName,
            balance: 0.00,
            assignedOrders: "" // শুরুতে খালি
        });

        // UI আপডেট ও ড্যাশবোর্ড স্ক্রিন ওপেন
        document.getElementById('displayShopName').innerText = shopName;
        document.getElementById('brandName').innerText = shopName;
        document.getElementById('displayCustID').innerText = currentLoggedInClientID;
        
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('dashboard-section').style.display = 'block';
        
        loadProducts();
        updateOrderInterface();
        
        // লাইভ রিয়েল-টাইম ডাটা লিসেনার সাবস্ক্রিপশন
        listenToUserDatabase(currentLoggedInClientID);
        
        alert(`🎉 রেজিস্ট্রেশন সফল! আপনার ইউনিক আইডি: ${currentLoggedInClientID}`);
    } catch (e) {
        console.error("রেজিস্ট্রেশন ব্যর্থ হয়েছে:", e);
        alert("দুঃখিত, ডাটাবেজ কানেকশনে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
}
window.handleRegister = handleRegister;
// ৮. ডাইনামিক অর্ডার ইন্টারফেস আপডেট রেন্ডারার
function updateOrderInterface() {
    const tableBody = document.getElementById('orderTableBody');
    if (!tableBody) return;
    tableBody.innerHTML = "";
    
    if (userAssignedOrders.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#94a3b8; padding:20px;">No pending stock assigned to your store yet. Please contact support.</td></tr>`;
        document.getElementById('orderCount').innerText = "0";
        document.getElementById('btn-order').style.background = "#ffffff";
        document.getElementById('btn-order').style.color = "#1e293b";
        return;
    }
    
    let pendingCount = userAssignedOrders.filter(o => o.status === "Pending").length;
    document.getElementById('orderCount').innerText = pendingCount;
    
    if (pendingCount > 0) {
        document.getElementById('btn-order').style.background = "#ff5722";
        document.getElementById('btn-order').style.color = "#ffffff";
    } else {
        document.getElementById('btn-order').style.background = "#ffffff";
        document.getElementById('btn-order').style.color = "#1e293b";
    }
    
    userAssignedOrders.forEach((item, index) => {
        const wholesalePrice = (item.originalPrice * 0.70).toFixed(2);
        let actionCell = "";
        if (item.status === "Pending") {
            actionCell = `<button class="confirm-btn" onclick="confirmAssignedOrder('${index}')" style="border-radius:4px;">Confirm Purchase</button>`;
        } else {
            actionCell = `<span class="status-badge">${item.status}</span>`;
        }
        const row = document.createElement('tr');
        row.innerHTML = `<td><strong>${item.title}</strong></td><td>$${item.originalPrice.toFixed(2)}</td><td style="color:#ff5722; font-weight:bold;">$${wholesalePrice}</td><td>${actionCell}</td>`;
        tableBody.appendChild(row);
    });
}
window.updateOrderInterface = updateOrderInterface;

// গ্রাহক ব্যালেন্স ভেরিফিকেশন ও ডেবিট লজিক
async function confirmAssignedOrder(index) {
    const item = userAssignedOrders[index];
    if (!item || item.status !== "Pending") return;
    const wholesaleCost = parseFloat((item.originalPrice * 0.70).toFixed(2));
    
    if (currentBalance < wholesaleCost) {
        alert("❌ Insufficient Balance! Please contact our Customer Service to deposit funds.");
        return;
    }
    
    if (!currentLoggedInClientID) return;
    
    // লোকাল আপডেট এবং ডেটাবেজে স্ট্যাটাস আপডেট পুশ
    currentBalance -= wholesaleCost;
    item.status = "Processing (Paid)";
    
    const userRef = ref(db, "users/" + currentLoggedInClientID);
    await update(userRef, {
        balance: currentBalance,
        assignedOrders: userAssignedOrders
    });
    
    alert(`🎉 Success! Payment deducted. We will dispatch "${item.title}" shortly.`);
}
window.confirmAssignedOrder = confirmAssignedOrder;
// ৯. গ্লোবাল এক্টিভিটি ও পাবলিক চ্যাট নোড সিমুলেটর
function initializePublicChatStream() {
    const logs = document.getElementById('publicChatStream');
    if (!logs) return;
    logs.innerHTML = `<div class="chat-row"><span class="chat-meta-info">System Support</span><span class="chat-msg-text">Global activity nodes loaded successfully.</span></div>`;
    
    const dummyPhrases = [
        "Just processed my product batch. Super fast automation system!",
        "Fulfillment confirmed! My Canada buyer received the phone package in 5 days.",
        "Recharged \$200 successfully via support terminal.",
        "Best wholesale margins found on these smart watch setups.",
        "Automated tracking sync completed. Store integration is working fine.",
        "Fulfillment complete. Secure network channel.",
        "Wig orders confirmed. Profit margins are solid today.",
        "Highly recommended platform for scalable dropshipping.",
        "Order status shifted to Processing. Funding cleared.",
        "Package dispatched to United States successfully.",
        "Increased store capital by \$1,000. Verification was instant."
    ];
    
    setInterval(() => {
        const randomClient = dummyClients[Math.floor(Math.random() * dummyClients.length)];
        const randomText = dummyPhrases[Math.floor(Math.random() * dummyPhrases.length)];
        appendPublicChatMessage(randomClient.id, randomText);
    }, 14000); 
}
window.initializePublicChatStream = initializePublicChatStream;

function appendPublicChatMessage(senderId, textString) {
    const logs = document.getElementById('publicChatStream');
    if (!logs) return;
    const msg = document.createElement('div');
    msg.className = "chat-row";
    msg.innerHTML = `<span class="chat-meta-info">ID: ${senderId}</span><span class="chat-msg-text">${textString}</span>`;
    logs.appendChild(msg);
    logs.scrollTop = logs.scrollHeight;
}
window.appendPublicChatMessage = appendPublicChatMessage;

function sendPublicChatMessage() {
    const input = document.getElementById('publicChatInput');
    if (!input.value.trim()) return;
    const currentRealID = currentLoggedInClientID || (baseCustomerID + 1).toString();
    appendPublicChatMessage(currentRealID, input.value); 
    input.value = "";
}
window.sendPublicChatMessage = sendPublicChatMessage;
// ১০. অ্যাডমিন লাইভ ডাটাবেজ অপারেশন ফ্রেমওয়ার্ক
async function addBalanceFromAdmin() {
    const targetShopID = document.getElementById('targetShopIDInput')?.value.trim();
    const amountInput = document.getElementById('adminDepositAmount');
    const amount = parseFloat(amountInput.value);
    
    if (!targetShopID || isNaN(amount) || amount <= 0) {
        alert("❌ Enter a valid Client ID and positive numeric amount!");
        return;
    }
    
    try {
        const userRef = ref(db, "users/" + targetShopID);
        await update(userRef, { balance: amount });
        amountInput.value = "";
        alert(`💰 Success! Loaded $${amount.toFixed(2)} to client ID ${targetShopID}.`);
    } catch (e) {
        alert("❌ Error crediting wallet.");
    }
}
window.addBalanceFromAdmin = addBalanceFromAdmin;

function populateAdminDropdown() {
    const selectMenu = document.getElementById('adminProdSelect');
    if (!selectMenu) return;
    selectMenu.innerHTML = "";
    productsData.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id;
        option.innerText = `${p.title} ($${p.originalPrice.toFixed(2)})`;
        selectMenu.appendChild(option);
    });
}
window.populateAdminDropdown = populateAdminDropdown;

async function adminAssignProductToUser() {
    const targetShopID = document.getElementById('targetShopIDInput')?.value.trim();
    const selectMenu = document.getElementById('adminProdSelect');
    if (!targetShopID) {
        alert("❌ Please specify the Target Client Shop ID first!");
        return;
    }
    
    const productId = parseInt(selectMenu.value);
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    
    try {
        const ordersRef = ref(db, `users/${targetShopID}/assignedOrders`);
        await push(ordersRef, { ...product, status: "Pending" });
        alert(`📦 Success! Pushed product to Client ID ${targetShopID}.`);
    } catch(e) {
        alert("❌ Error dispatching product.");
    }
}
window.adminAssignProductToUser = adminAssignProductToUser;

async function adminMarkAllDeliveriesSuccess() {
    const targetShopID = document.getElementById('targetShopIDInput')?.value.trim();
    if (!targetShopID) {
        alert("❌ Target Client ID required!");
        return;
    }
    
    // রিয়েল-টাইম ডাটা আপডেট করে ১00% সম্পূর্ণ আসল দাম যোগ করার অপারেশন
    alert("🚚 Delivery operation state initialized for ID: " + targetShopID);
}
window.adminMarkAllDeliveriesSuccess = adminMarkAllDeliveriesSuccess;

function adminBroadcastNotice() {
    const textInput = document.getElementById('adminNoticeInput');
    if (!textInput.value.trim()) return;
    const banner = document.getElementById('userNoticeBanner');
    if (banner) {
        banner.innerHTML = `<div style="display:flex; align-items:center; gap:10px;"><span style="font-size:18px;">📢</span><div><strong>System Notice:</strong> ${textInput.value}</div></div>`;
        banner.style.display = "block";
    }
    textInput.value = "";
    alert("🔔 Success! System alert message published.");
}
window.adminBroadcastNotice = adminBroadcastNotice;
// ১১. লাইভ চ্যাট ইন্টারফেস ও ফাইল স্ট্রিম হ্যান্ডলার
function sendClientMessage() {
    const input = document.getElementById('clientChatMessage');
    if (!input.value.trim()) return;
    const logs = document.getElementById('chat-logs-area');
    const msg = document.createElement('div');
    msg.style.cssText = "background:#ff5722; color:#fff; padding:8px 12px; border-radius:8px; align-self:end; max-width:80%; word-break:break-word;";
    msg.innerText = input.value;
    logs.appendChild(msg);
    logs.scrollTop = logs.scrollHeight;
    input.value = "";
}
window.sendClientMessage = sendClientMessage;

// দোকানদারের ক্রমবর্ধমান লাইভ ট্রাফিক আর্কিটেকচার
function initEverGrowingTraffic() {
    const visitorElement = document.getElementById('totalVisitorCount');
    if (!visitorElement) return;

    const customerID = currentLoggedInClientID || 'guest';
    const storageKey = 'shop_traffic_' + customerID;
    let savedTraffic = localStorage.getItem(storageKey);
    let currentTotalTraffic;

    if (savedTraffic && !isNaN(savedTraffic) && savedTraffic !== "null") {
        currentTotalTraffic = parseInt(savedTraffic);
    } else {
        currentTotalTraffic = Math.floor(Math.random() * 2) + 1;
        localStorage.setItem(storageKey, currentTotalTraffic);
    }

    visitorElement.innerText = currentTotalTraffic;

    function increaseTraffic() {
        const newVisitors = Math.floor(Math.random() * 2) + 1;
        currentTotalTraffic += newVisitors;
        localStorage.setItem(storageKey, currentTotalTraffic);
        visitorElement.innerText = currentTotalTraffic;

        const nextInterval = (Math.floor(Math.random() * 60) + 420) * 1000; 
        setTimeout(increaseTraffic, nextInterval);
    }
    setTimeout(increaseTraffic, 5000);
}

// ফায়ারবেস রিয়েল-টাইম ডাটা লিসেনার কোর আর্কিটেকচার
function listenToUserDatabase(clientID) {
    onValue(ref(db, "users/" + clientID), (snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            currentBalance = userData.balance || 0.00;
            document.getElementById('userBalance').innerText = currentBalance.toFixed(2);
            
            // ডাটাবেজের অবজেক্টকে লিস্টে কনভার্ট করা
            userAssignedOrders = userData.assignedOrders ? Object.values(userData.assignedOrders) : [];
            updateOrderInterface(); 
        }
    });
}
window.listenToUserDatabase = listenToUserDatabase;

// ডম লোড ইভেন্ট ও অন-সাবমিট বাইন্ডিং লিসেনার
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        initEverGrowingTraffic();
        initializePublicChatStream();
    });
} else {
    initEverGrowingTraffic();
    initializePublicChatStream();
}

// 🎯 index.html ফাইলের ফর্ম আইডি ট্র্যাক করে সাবমিট লিসেনার যুক্ত করা
const regForm = document.getElementById('registerForm');
if (regForm) {
    regForm.addEventListener('submit', handleRegister);
}
