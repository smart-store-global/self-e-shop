import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-analytics.js";
  import { getDatabase, ref, runTransaction, set, push, update, onChildAdded, onValue } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyBdpr3NYTRJGYKq7nL1yGc1XMW55p4nqko",
  authDomain: "self-e-shop-841f4.firebaseapp.com",
  databaseURL: "https://self-e-shop-841f4-default-rtdb.firebaseio.com",
  projectId: "self-e-shop-841f4",
  storageBucket: "self-e-shop-841f4.firebasestorage.app",
  messagingSenderId: "418069524935",
  appId: "1:418069524935:web:2ce981897086b27a88e9e2",
  measurementId: "G-DY4Z0CMZ6E",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
const auth = getAuth(app);

// Global State Management Variables
let currentBalance = 0.00;
let userAssignedOrders = [];
const db = getDatabase(app);
const FIRST_CUSTOMER_ID = 74514244;
async function getNextCustomerId() {
  const counterRef = ref(db, "counters/customerId");
  const result = await runTransaction(counterRef, (currentId) => {
    if (currentId === null) return FIRST_CUSTOMER_ID;
    return Number(currentId) + 1;
  });
  if (!result.committed) {
    throw new Error("Customer ID তৈরি করা যায়নি।");
  }
  return result.snapshot.val();
}

// Auto-generator loop framework for 50 unique anonymous client nodes
let dummyClients = [];
for (let i = 1; i <= 50; i++) {
    dummyClients.push({ id: (74514242 + i + 100).toString() });
}

// [নতুন সেশন ইঞ্জিন] পেজ রিফ্রেশ দিলে গ্রাহককে ড্যাশবোর্ডে ধরে রাখার অটোমেটিক লজিক
function checkActiveLoginSession() {
    const isUserActive = localStorage.getItem('is_shop_user_active');
    const savedCustID = localStorage.getItem('saved_shop_cust_id');
    const savedShopName = localStorage.getItem('saved_shop_name');

    // গ্রাহক যদি আগে থেকেই লগইন বা রেজিস্টার্ড থাকে, তবে রিফ্রেশ দিলেও ড্যাশবোর্ডেই থাকবে
    if (isUserActive === 'true' && savedCustID && savedShopName) {
        document.getElementById('displayShopName').innerText = savedShopName;
        document.getElementById('brandName').innerText = savedShopName;
        document.getElementById('displayCustID').innerText = savedCustID;

        // রেজিস্ট্রেশন পেজ লুকিয়ে সরাসরি মেইন ড্যাশবোর্ড ওপেন করা
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('dashboard-section').style.display = 'block';

        // আপনার প্রজেক্টের বাকি প্রয়োজনীয় ফাংশনগুলো সচল করা
        if (typeof loadProducts === "function") loadProducts();
        if (typeof populateAdminDropdown === "function") populateAdminDropdown();
        if (typeof updateOrderInterface === "function") updateOrderInterface();
        if (typeof initializePublicChatStream === "function") initializePublicChatStream();
        if (typeof initEverGrowingTraffic === "function") initEverGrowingTraffic();
        
        console.log("Session Restored for Client ID: " + savedCustID);
    }
}

// পেজটি ব্রাউজারে রিফ্রেশ বা লোড হওয়া মাত্রই সেশন চেক হবে
document.addEventListener("DOMContentLoaded", checkActiveLoginSession);

window.handleRegister = async function (event) {
  event.preventDefault();

  const shopName = document.getElementById("shopName").value.trim();
  const ownerName = document.getElementById("ownerName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  let authAccountCreated = false;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    authAccountCreated = true;

    const customerId = await getNextCustomerId();

    await set(ref(db, `customers/${userCredential.user.uid}`), {
      customerId,
      shopName,
      ownerName,
      email,
      createdAt: new Date().toISOString(),
    });

    // [ম্যাজিক লাইন] গ্রাহকের আইডি ও শপের নাম ব্রাউজারের স্থায়ী স্মৃতিতে লক করা
    localStorage.setItem('is_shop_user_active', 'true');
    localStorage.setItem("saved_shop_cust_id", String(customerId));
    localStorage.setItem("saved_shop_name", shopName);

    alert(`Registration successful. Your customer ID is ${customerId}.`);
    document.getElementById("registerForm").reset();
    document.getElementById("displayShopName").innerText = shopName;
    document.getElementById("brandName").innerText = shopName;
    document.getElementById("displayCustID").innerText = customerId;
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("dashboard-section").style.display = "block";
} catch (error) {
  console.error("Registration error details:", error.message, error.stack);
  alert(`Registration failed: ${error.name}: ${error.message}`);
}
};

    if (typeof populateAdminDropdown === "function") populateAdminDropdown();
    updateOrderInterface();
    initializePublicChatStream();
    if (typeof initEverGrowingTraffic === "function") initEverGrowingTraffic();

function uploadProfileImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) { 
            document.getElementById('userProfilePic').src = e.target.result; 
        };
        reader.readAsDataURL(file);
    }
}

// 2. Comprehensive 54 Products Database Array (Part 1)
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
// Extending Database Management (Part 2)
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
    ];

productsData.push(...extendedProducts);
// 3. UI Inventory Showcase Renderer
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
loadProducts();

// 4. Update the Customer Private Modal Table dynamically (With Real-Time RED Alert Counter)
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
            actionCell = `<button class="confirm-btn" onclick="confirmAssignedOrder(${index})" style="border-radius:4px;">Confirm Purchase</button>`;
        } else {
            actionCell = `<span class="status-badge">${item.status}</span>`;
        }
        const row = document.createElement('tr');
        row.innerHTML = `<td><strong>${item.title}</strong></td><td>$${item.originalPrice.toFixed(2)}</td><td style="color:#ff5722; font-weight:bold;">$${wholesalePrice}</td><td>${actionCell}</td>`;
        tableBody.appendChild(row);
    });
}
// 5. Customer Balance Verification & Fund Deduction Handler (-30% Debit Mode)
function confirmAssignedOrder(index) {
    const item = userAssignedOrders[index];
    if (!item || item.status !== "Pending") return;
    const wholesaleCost = parseFloat((item.originalPrice * 0.70).toFixed(2));
    if (currentBalance < wholesaleCost) {
        alert("❌ Insufficient Balance! Please contact our Customer Service to deposit funds.");
        return;
    }
    currentBalance -= wholesaleCost;
    document.getElementById('userBalance').innerText = currentBalance.toFixed(2);
    item.status = "Processing (Paid)";
    updateOrderInterface();
    alert(`🎉 Success! Payment deducted. We will dispatch "${item.title}" shortly.`);
}

// 50 Unique Client Traffic Flow Engine
function initializePublicChatStream() {
    const logs = document.getElementById('publicChatStream');
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

function appendPublicChatMessage(senderId, textString) {
    const logs = document.getElementById('publicChatStream');
    if (!logs) return;
    const msg = document.createElement('div');
    msg.className = "chat-row";
    msg.innerHTML = `<span class="chat-meta-info">ID: ${senderId}</span><span class="chat-msg-text">${textString}</span>`;
    logs.appendChild(msg);
    logs.scrollTop = logs.scrollHeight;
}

function sendPublicChatMessage() {
    const input = document.getElementById('publicChatInput');
    if (!input.value.trim()) return;
    const currentRealID = baseCustomerID + 1;
    appendPublicChatMessage(currentRealID, input.value); 
    input.value = "";
}
// 🔒 6. Admin Portal Controllers Framework
function addBalanceFromAdmin() {
  alert("ব্যালেন্স শুধু Admin যোগ করতে পারবে।");
}

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

function adminAssignProductToUser() {
    const selectMenu = document.getElementById('adminProdSelect');
    const productId = parseInt(selectMenu.value);
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    userAssignedOrders.push({ ...product, status: "Pending" });
    updateOrderInterface();
    alert(`📦 Success! Pushed "${product.title}" into the user's Order button panel.`);
}

// 🚚 এডমিন যখন কুরিয়ার সাকসেস করবে, তখন গ্রাহকের ওয়ালেটে ১00% মূল দাম জমা করার লজিক
function adminMarkAllDeliveriesSuccess() {
    let paidItems = userAssignedOrders.filter(o => o.status === "Processing (Paid)");
    if (paidItems.length === 0) { 
        alert("No active paid orders available to fulfill right now!"); 
        return; 
    }
    
    let totalRefundCredited = 0;
    userAssignedOrders.forEach(o => { 
        if (o.status === "Processing (Paid)") { 
            o.status = "Delivered (Success)"; 
            currentBalance += o.originalPrice; // ১00% সম্পূর্ণ আসল দাম ব্যালেন্সে যোগ করা হলো
            totalRefundCredited += o.originalPrice;
        } 
    });
    
    document.getElementById('userBalance').innerText = currentBalance.toFixed(2);
    updateOrderInterface();
    alert(`🚚 Fulfillment Complete! Orders updated to Delivered. Total $${totalRefundCredited.toFixed(2)} credited to user balance (Wholesale profit auto-split).`);
}

function adminBroadcastNotice() {
    const textInput = document.getElementById('adminNoticeInput');
    if (!textInput.value.trim()) return;
    const banner = document.getElementById('userNoticeBanner');
    banner.innerHTML = `<div style="display:flex; align-items:center; gap:10px;"><span style="font-size:18px;">📢</span><div><strong>System Notice:</strong> ${textInput.value}</div></div>`;
    banner.style.display = "block";
    textInput.value = "";
    alert("🔔 Success! System alert message published.");
}

function adminSendCustomChatMessage() {
    const identitySelect = document.getElementById('adminChatSpeakerSelect');
    const messageInput = document.getElementById('adminChatSpeakerMessage');
    if (!messageInput.value.trim()) return;
    const targetVal = identitySelect.value;
    if (targetVal === "OFFICIAL") {
        appendPublicChatMessage("SUPPORT", messageInput.value);
    } else {
        appendPublicChatMessage(targetVal, messageInput.value);
    }
    messageInput.value = "";
}
// Append Administration Management Tools interface fields dynamically
window.addEventListener('DOMContentLoaded', () => {
    const srvBtn = document.getElementById('btn-service');
    if (srvBtn) { srvBtn.innerHTML = "💬 Service"; }

    setTimeout(() => {
        const panel = document.querySelector('.admin-panel');
        if (panel) {
            const controls = document.createElement('div');
            controls.style.cssText = "margin-top:15px; border-top:1px dashed #475569; padding-top:15px; display:flex; flex-direction:column; gap:12px;";
            let selectOptionsHTML = `<option value="OFFICIAL">🔒 Talk as System Support (Admin)</option>`;
            dummyClients.forEach((c) => { selectOptionsHTML += `<option value="${c.id}">Client Node ID: ${c.id}</option>`; });

            controls.innerHTML = `
                <p style="font-size:13px; color:#94a3b8; font-weight:bold;">🔒 Push Stock & Fulfillment Operations Area:</p>
                <div style="display:flex; flex-direction:column; gap:6px;">
                    <label style="font-size:12px; color:#cbd5e1;">Select Product to Push into User Box:</label>
                    <select id="adminProdSelect" style="width:100%; max-width:500px; color:#333; padding:8px; border-radius:4px;"></select>
                    <button onclick="adminAssignProductToUser()" style="background:#ff5722; color:white; border:none; padding:8px; border-radius:4px; cursor:pointer; font-weight:bold; font-size:13px; margin-top:5px;">Push Selected Product to Client Order Box</button>
                </div>
                <button onclick="adminMarkAllDeliveriesSuccess()" style="background:#3b82f6; color:white; border:none; padding:10px; border-radius:4px; cursor:pointer; font-weight:bold; font-size:13px;">Mark Paid Orders as Delivered & Credit Full Price</button>
                <p style="font-size:13px; color:#94a3b8; font-weight:bold; margin-top:5px; border-top:1px dashed #475569; padding-top:10px;">🔒 Live Public Chat Stream Simulation (50 Unique IDs):</p>
                <div style="display:flex; flex-direction:column; gap:5px;">
                    <label style="font-size:12px; color:#cbd5e1;">Select Client ID Node to Simulate Message:</label>
                    <select id="adminChatSpeakerSelect" style="padding:8px; color:#333; border-radius:4px; max-width:500px;">${selectOptionsHTML}</select>
                    <input type="text" id="adminChatSpeakerMessage" placeholder="Type text to inject..." style="padding:8px; border-radius:4px; border:none; color:#333; max-width:500px; outline:none;">
                    <button onclick="adminSendCustomChatMessage()" style="background:#34d399; color:#0f172a; border:none; padding:8px; border-radius:4px; cursor:pointer; font-weight:bold; font-size:13px; max-width:500px;">Inject Message into Activity Stream</button>
                </div>
                <div style="border-top:1px dashed #475569; padding-top:12px; display:flex; flex-direction:column; gap:6px;">
                    <label style="font-size:12px; color:#cbd5e1;">Send System Alert Banner Message to Client Display:</label>
                    <input type="text" id="adminNoticeInput" placeholder="Type systemic notice message here..." style="width:100%; padding:8px; border-radius:4px; border:none; color:#333;">
                    <button onclick="adminBroadcastNotice()" style="background:#ef4444; color:white; border:none; padding:8px; border-radius:4px; cursor:pointer; font-weight:bold; font-size:13px; margin-top:5px;">Publish System Warning Message</button>
                </div>
            `;
            panel.appendChild(controls);
            populateAdminDropdown();
        }
    }, 500);
});

document.getElementById('btn-order').addEventListener('click', function() { document.getElementById('order-modal-window').style.display = 'flex'; });
function closeOrderModal() { document.getElementById('order-modal-window').style.display = 'none'; }
document.getElementById('btn-recharge').addEventListener('click', function() { alert('⚠️ Action Restricted: Please contact our official Customer Service framework to safely credit your store account.'); });
document.getElementById('btn-withdraw').addEventListener('click', function() { alert('⚠️ Action Restricted: Please connect with Customer Service to securely initiate your withdrawal procedure.'); });

/* ================= Customer live chat ================= */
let chatId = null;
let chatUnsub = null;
let chatListenerStarted = false;

onAuthStateChanged(auth, (user) => {
    if (chatUnsub) { chatUnsub(); chatUnsub = null; }
    chatListenerStarted = false;
    const logs = document.getElementById('chat-logs-area');
    if (logs) logs.innerHTML = '';
    chatId = user ? user.uid : null;
    startChatListener();
});

function compressImage(file, maxSize = 800, quality = 0.7) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => {
            const img = new Image();
            img.onerror = reject;
            img.onload = () => {
                const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
                const canvas = document.createElement('canvas');
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

function renderChatMessage(m) {
    const logs = document.getElementById('chat-logs-area');
    if (!logs) return;
    const msg = document.createElement('div');
    const isUser = m.sender === 'user';
    msg.style.cssText = isUser
        ? "background:#ff5722; color:#fff; padding:8px 12px; border-radius:8px; align-self:flex-end; max-width:80%; word-break:break-word;"
        : "background:#e2e8f0; color:#1e293b; padding:8px 12px; border-radius:8px; align-self:flex-start; max-width:80%; word-break:break-word;";
    if (m.image && String(m.image).startsWith('data:image/')) {
        const img = document.createElement('img');
        img.src = m.image;
        img.style.cssText = "max-width:100%; border-radius:6px; display:block;";
        msg.appendChild(img);
    } else {
        msg.textContent = m.text || '';
    }
    logs.appendChild(msg);
    logs.scrollTop = logs.scrollHeight;
}

function startChatListener() {
    if (chatListenerStarted || !chatId || !document.getElementById('chat-logs-area')) return;
    chatListenerStarted = true;
    chatUnsub = onChildAdded(ref(db, 'chats/' + chatId + '/messages'), (snap) => renderChatMessage(snap.val()));
}

async function pushUserMessage(data, preview) {
    if (!chatId) return;
    const now = Date.now();
    try {
        await push(ref(db, 'chats/' + chatId + '/messages'), { sender: 'user', time: now, ...data });
        await update(ref(db, 'chatMeta/' + chatId), {
            lastMessage: preview,
            lastTime: now,
            unreadAdmin: true,
            name: (auth.currentUser && auth.currentUser.email) || 'Customer'
        });
    } catch (err) {
        console.error('Send failed:', err);
    }
}

window.sendClientMessage = function () {
    const input = document.getElementById('clientChatMessage');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    pushUserMessage({ text: text }, text);
};

window.handlePrivateChatImage = async function (event) {
    const file = event.target.files[0];
    event.target.value = '';
    if (!file) return;
    try {
        const dataUrl = await compressImage(file);
        pushUserMessage({ image: dataUrl }, '📷 Photo');
    } catch (e) {
        console.error('Image read failed:', e);
    }
};

document.getElementById('btn-service').addEventListener('click', function () {
    let chatBox = document.getElementById('customer-chat-modal');
    if (!chatBox) {
        chatBox = document.createElement('div');
        chatBox.id = 'customer-chat-modal';
        chatBox.style.cssText = "position:fixed; bottom:20px; right:20px; width:350px; background:#fff; border:1px solid #eaedf1; border-radius:12px; box-shadow:0 10px 25px rgba(0,0,0,0.15); z-index:9999; overflow:hidden;";
        chatBox.innerHTML = `
            <div style="background:#ff5722; color:#fff; padding:15px; font-weight:bold; display:flex; justify-content:space-between; align-items:center;"><span>Private Live Support</span><span style="cursor:pointer;" onclick="this.parentElement.parentElement.style.display='none'">×</span></div>
            <div id="chat-logs-area" style="height:220px; overflow-y:auto; padding:15px; background:#f8fafc; font-size:13px; display:flex; flex-direction:column; gap:10px;"></div>
            <div style="padding:10px; border-top:1px solid #eaedf1; background:#fff; display:flex; gap:5px; align-items:center;">
                <input type="file" id="privateChatFileInput" accept="image/*" style="display:none;" onchange="handlePrivateChatImage(event)">
                <button type="button" onclick="document.getElementById('privateChatFileInput').click()" style="background:#f1f5f9; border:1px solid #cbd5e1; padding:6px 8px; border-radius:4px; cursor:pointer; font-size:14px;">📎</button>
                <input type="text" id="clientChatMessage" placeholder="Type your personal query..." style="flex:1; padding:8px; border:1px solid #ccc; border-radius:4px;" onkeydown="if(event.key==='Enter') sendClientMessage()">
                <button onclick="sendClientMessage()" style="background:#ff5722; color:#fff; border:none; padding:8px 12px; border-radius:4px; cursor:pointer; font-weight:bold;">Send</button>
            </div>`;
        document.body.appendChild(chatBox);
    } else {
        chatBox.style.display = 'block';
    }
    startChatListener();
});

// প্রত্যেক নতুন ড্রপশিপারের দোকানের জন্য আলাদা ক্রমবর্ধমান লাইভ ট্রাফিক লজিক
function initEverGrowingTraffic() {
    const visitorElement = document.getElementById('totalVisitorCount');
    if (!visitorElement) return;

    // ১. প্রত্যেক ইউজারের দোকানের জন্য আলাদা মেমোরি চাবি তৈরি (ইউনিক কাস্টমার আইডি দিয়ে)
    // যদি displayCustID না থাকে তবে একটি সাধারণ ইউনিক চাবি ব্যবহার করবে
    const customerID = document.getElementById('displayCustID') ? document.getElementById('displayCustID').innerText.trim() : 'guest';
    const storageKey = 'shop_traffic_' + customerID;

    let savedTraffic = localStorage.getItem(storageKey);
    let currentTotalTraffic;

    // ২. যদি নতুন দোকানদার হয়, তবে সংখ্যাটি একদম শুরু (১ বা ২) থেকে শুরু হবে
    if (savedTraffic && !isNaN(savedTraffic) && savedTraffic !== "null") {
        currentTotalTraffic = parseInt(savedTraffic);
    } else {
        currentTotalTraffic = Math.floor(Math.random() * 2) + 1; // একদম শুরুতে ১ অথবা ২ জন দেখাবে
        localStorage.setItem(storageKey, currentTotalTraffic);
    }

    // স্ক্রিনে সংখ্যাটি তাৎক্ষণিকভাবে দেখানো
    visitorElement.innerText = currentTotalTraffic;

    // ৩. প্রতিবার এলোমেলো সময় পর পর সংখ্যা ১/২ করে বাড়তে থাকবে (কখনো কমবে না)
    function increaseTraffic() {
        const newVisitors = Math.floor(Math.random() * 2) + 1; // ১ অথবা ২ জন যোগ হবে
        currentTotalTraffic += newVisitors;

        // এই নির্দিষ্ট দোকানদারের মেমোরিতে সংখ্যাটি লক করা
        localStorage.setItem(storageKey, currentTotalTraffic);
        
        // স্ক্রিনে লাইভ সংখ্যা আপডেট
        visitorElement.innerText = currentTotalTraffic;

        // পরবর্তী ডামি গ্রাহক আসার সময় (৭ থেকে ৮ মিনিট পর পর) প্রতিদিন ২০০+ ভিজিটর নিশ্চিত করবে
        const nextInterval = (Math.floor(Math.random() * 60) + 420) * 1000; 
        setTimeout(increaseTraffic, nextInterval);
    }

    // দোকান ওপেন করার ঠিক ৫ সেকেন্ড পরই প্রথম টেস্ট ১/২ জন কাস্টমার বাড়বে
    setTimeout(increaseTraffic, 5000);
}

// পেজ প্রস্তুত হলে কাউন্টার চালু
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initEverGrowingTraffic);
} else {
    initEverGrowingTraffic();
}

/* ===== Notification badge on service button ===== */
let notifUnsub = null;
let unreadCount = 0;

function seenKey(uid) { return 'chatLastSeen_' + uid; }

function setBadge(n) {
    unreadCount = n;
    const btn = document.getElementById('btn-service');
    if (!btn) return;
    let badge = document.getElementById('chat-notify-badge');
    if (n <= 0) { if (badge) badge.remove(); return; }
    if (!badge) {
        badge = document.createElement('span');
        badge.id = 'chat-notify-badge';
        badge.style.cssText = "background:#e53935; color:#fff; border-radius:999px; min-width:18px; height:18px; padding:0 5px; font-size:11px; font-weight:bold; display:inline-flex; align-items:center; justify-content:center; margin-left:6px; vertical-align:middle;";
        btn.appendChild(badge);
    }
    badge.textContent = n > 9 ? '9+' : String(n);
}

function startNotifyListener(uid) {
    if (notifUnsub) { notifUnsub(); notifUnsub = null; }
    setBadge(0);
    if (!uid) return;
    notifUnsub = onChildAdded(ref(db, 'chats/' + uid + '/messages'), (snap) => {
        const m = snap.val();
        if (!m || m.sender !== 'admin') return;
        const modal = document.getElementById('customer-chat-modal');
        const isOpen = modal && modal.style.display !== 'none';
        if (isOpen) {
            localStorage.setItem(seenKey(uid), String(Date.now()));
            return;
        }
        const lastSeen = Number(localStorage.getItem(seenKey(uid)) || 0);
        if ((m.time || 0) > lastSeen) setBadge(unreadCount + 1);
    });
}

onAuthStateChanged(auth, (user) => {
    startNotifyListener(user ? user.uid : null);
});

document.getElementById('btn-service').addEventListener('click', () => {
    if (chatId) localStorage.setItem(seenKey(chatId), String(Date.now()));
    setBadge(0);
});

const orderAuthRef = getAuth();
const orderDbRef = getDatabase();
let stopAssignedOrders = null;

onAuthStateChanged(orderAuthRef, (user) => {
  if (stopAssignedOrders) { stopAssignedOrders(); stopAssignedOrders = null; }
  userAssignedOrders = [];
  updateOrderInterface();
  if (!user) return;

  stopAssignedOrders = onValue(
    ref(orderDbRef, 'assignedOrders/' + user.uid),
    (snap) => {
      const list = [];
      snap.forEach((c) => { list.push({ ...(c.val() || {}), _key: c.key }); });
      list.sort((a, b) => (b.time || 0) - (a.time || 0));
      userAssignedOrders = list;
      updateOrderInterface();
    },
    (err) => console.error('Assigned orders load failed:', err.code)
  );
});

window.confirmAssignedOrder = async function (index) {
  const item = userAssignedOrders[index];
  const user = orderAuthRef.currentUser;

  if (!item || !user || item.status !== "Pending") return;

  // Wholesale price is 70% of the original price.
  const originalPrice = parseFloat(
    String(item.originalPrice ?? "").replace(/[$,\s]/g, "")
  );
  const price = Math.round(originalPrice * 0.70 * 100) / 100;

  if (!Number.isFinite(originalPrice) || originalPrice <= 0) {
    alert("The original product price is unavailable.");
    return;
  }

  if (!confirm(`Purchase this product for $${price.toFixed(2)}?`)) return;

  const orderRef = ref(
    orderDbRef,
    `assignedOrders/${user.uid}/${item._key}`
  );
  const balanceRef = ref(orderDbRef, `balances/${user.uid}`);

  let orderClaimed = false;
  let balanceDeducted = false;

  try {
    // Claim the order to prevent duplicate purchases.
    const claimTx = await runTransaction(orderRef, currentOrder => {
      if (!currentOrder || currentOrder.status !== "Pending") return;

      return {
        ...currentOrder,
        status: "Processing"
      };
    });

    if (!claimTx.committed) {
      alert("This order is already being processed or is no longer pending.");
      return;
    }

    orderClaimed = true;

    // Deduct the wholesale price only if the balance is sufficient.
    const balanceTx = await runTransaction(balanceRef, currentBalance => {
      const balance = Number(currentBalance) || 0;

      if (balance < price) return;

      return Math.round((balance - price) * 100) / 100;
    });

    if (!balanceTx.committed) {
      const latestBalance = Number(balanceTx.snapshot.val()) || 0;
      const insufficientBalance = latestBalance < price;

      try {
        await update(orderRef, { status: "Pending" });
        orderClaimed = false;
      } catch (resetError) {
        console.error("Could not reset the order status:", resetError);
        alert(
          "The balance was not charged, but the order status could not be reset. Please contact support."
        );
        return;
      }

      alert(
        insufficientBalance
          ? "Insufficient balance. Your balance does not have enough dollars for this purchase."
          : "Could not update the balance. Please try again."
      );
      return;
    }

    balanceDeducted = true;

    try {
      await update(orderRef, {
        status: "Confirmed",
        statusMessage: "Product is being sent for shipment.",
        confirmedAt: Date.now()
      });

      orderClaimed = false;
    } catch (orderError) {
      // Refund the balance if the order status could not be updated.
      let refundCommitted = false;

      try {
        const refundTx = await runTransaction(balanceRef, currentBalance => {
          const balance = Number(currentBalance);

          if (!Number.isFinite(balance)) return;

          return Math.round((balance + price) * 100) / 100;
        });

        refundCommitted = refundTx.committed;
      } catch (refundError) {
        console.error("Refund transaction failed:", refundError);
      }

      if (!refundCommitted) {
        console.error("Order update failed and refund needs review:", orderError);
        alert(
          "The order could not be updated and the refund could not be verified. Please contact support before retrying."
        );
        return;
      }

      balanceDeducted = false;
      await update(orderRef, { status: "Pending" });
      orderClaimed = false;

      throw orderError;
    }

    // Record the debit in the balance log.
    try {
      await set(
        push(ref(orderDbRef, `balanceLogs/${user.uid}`)),
        {
          amount: -price,
          type: "order_purchase",
          orderKey: item._key,
          at: serverTimestamp()
        }
      );
    } catch (logError) {
      console.error("Balance log write failed:", logError);
    }

    alert("Payment received. Product is being sent for shipment.");
  } catch (error) {
    console.error("Purchase confirmation failed:", error);

    if (orderClaimed && !balanceDeducted) {
      try {
        await update(orderRef, { status: "Pending" });
      } catch (resetError) {
        console.error("Could not reset the order status:", resetError);
      }
    }

    alert(
      balanceDeducted
        ? "The purchase may have been charged, but the order status could not be verified. Please contact support before retrying."
        : "Could not complete the purchase. Please try again."
    );
  }
};

// ✕ বাটন ঠিক করা: closeOrderModal কে HTML থেকে ডাকার উপযোগী করা
if (typeof closeOrderModal === 'function') {
  window.closeOrderModal = closeOrderModal;
} else {
  window.closeOrderModal = function () {
    const m = document.getElementById('order-modal-window');
    if (m) {
      m.style.display = 'none';
      m.classList.remove('active', 'show', 'open');
    }
  };
}

// ===== Live Balance Listener (admin যোগ করলে সঙ্গে সঙ্গে দেখাবে) =====
import * as BalApp  from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import * as BalAuth from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import * as BalDb   from "https://www.gstatic.com/firebasejs/13.0.0/firebase-database.js";

(function startBalanceListener() {
  const balAuth = BalAuth.getAuth(BalApp.getApp());
  const balDb   = BalDb.getDatabase(BalApp.getApp());

  BalAuth.onAuthStateChanged(balAuth, (user) => {
    if (!user) return;
    BalDb.onValue(BalDb.ref(balDb, "balances/" + user.uid), (snap) => {
      const bal = Number(snap.val()) || 0;
      try { currentBalance = bal; } catch (e) { window.currentBalance = bal; }
      const el = document.getElementById("userBalance");
      if (el) el.innerText = bal.toFixed(2);
    });
  });
})();

// ===== Login / Register switch =====
import * as LgAuth from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import * as LgApp  from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";

(function loginSetup() {
  const $ = (id) => document.getElementById(id);
  const auth = LgAuth.getAuth(LgApp.getApp());
  const regForm = $("registerForm"), loginForm = $("loginForm");
  const title = document.querySelector("#auth-section h2");
  let mode = "register";

  function setMode(m) {
    mode = m;
    regForm.style.display   = m === "register" ? "" : "none";
    loginForm.style.display = m === "login" ? "" : "none";
    title.textContent = m === "register" ? "Register Your Shop" : "Login to Your Shop";
    $("authToggleText").textContent = m === "register" ? "Already have an account?" : "New here?";
    $("authToggleLink").textContent = m === "register" ? "Login" : "Register";
    $("loginMsg").textContent = "";
  }
  $("authToggleLink").onclick = (e) => { e.preventDefault(); setMode(mode === "register" ? "login" : "register"); };

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = $("loginMsg");
    msg.style.color = "#555"; msg.textContent = "Please wait...";
    try {
      await LgAuth.signInWithEmailAndPassword(auth, $("loginEmail").value.trim(), $("loginPassword").value);
      msg.textContent = "";
      // If your page does not switch to the dashboard by itself, do it here
      setTimeout(() => {
        const a = $("auth-section"), d = $("dashboard-section");
        if (a && d && getComputedStyle(a).display !== "none") { a.style.display = "none"; d.style.display = "block"; }
      }, 1200);
    } catch (err) {
      msg.style.color = "#e53935";
      msg.textContent = (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found")
        ? "Wrong email or password." : "Login failed: " + err.code;
    }
  });

  $("forgotLink").onclick = async (e) => {
    e.preventDefault();
    const em = $("loginEmail").value.trim(), msg = $("loginMsg");
    if (!em) { msg.style.color = "#e53935"; msg.textContent = "Enter your email first."; return; }
    try { await LgAuth.sendPasswordResetEmail(auth, em); msg.style.color = "#16a34a"; msg.textContent = "Reset link sent to " + em; }
    catch (err) { msg.style.color = "#e53935"; msg.textContent = "Could not send: " + err.code; }
  };
})();