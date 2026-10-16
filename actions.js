// ১. ফায়ারবেস মডিউল ইমপোর্ট করা (Realtime Database সংস্করণ)
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  runTransaction,
  onValue
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-database.js";

// ২. আপনার নতুন ফায়ারবেস স্ক্রিনশট থেকে পাওয়া ১০০% সঠিক কনফিগারেশন
const firebaseConfig = {
    apiKey: "AIzaSyBdpr3NYTRJGYKq7nL1yGc1XMW55p4nqko",
    authDomain: "self-e-shop-841f4.firebaseapp.com",
    databaseURL: "https://self-e-shop-841f4-default-rtdb.firebaseio.com",
    projectId: "self-e-shop-841f4",
    storageBucket: "self-e-shop-841f4.firebasestorage.app",
    messagingSenderId: "418069524935",
    appId: "1:418069524935:web:2ce981897086b27a88e9e2",
    measurementId: "G-DY4Z0CMZ6E"
  };

// ৩. ফায়ারবেস ইনিশিয়ালাইজ করা
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ৪. গ্লোবাল ভ্যারিয়েবল
let currentBalance = 0.00;
let userAssignedOrders = []; 
let currentLoggedInClientID = null; 
let baseCustomerID = 74514242; 

// ৫০টি ডামি ক্লায়েন্ট ট্রাফিকের লুপ
let dummyClients = [];
for (let i = 1; i <= 50; i++) {
    dummyClients.push({ id: (74514242 + i + 100).toString() });
}

function uploadProfileImage(event) {
    const file = event.target.files;
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) { document.getElementById('userProfilePic').src = e.target.result; };
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
    { id: 37, title: "Premium One-Piece Tie-Dye Children's Ski Suit with Cute Plush Hood", originalPrice: 59.51, img: "image_J0UXDs.png", free: false },
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
// ইউনিক সিরিয়াল আইডি সহ নতুন রেজিস্ট্রেশন হ্যান্ডলার (Realtime Database সংস্করণ)
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
            assignedOrders: "" // শুরুতে খালি অর্ডার লিস্ট
        });

        // UI আপডেট ও ড্যাশবোর্ড দেখানো
        document.getElementById('displayShopName').innerText = shopName;
        document.getElementById('brandName').innerText = shopName;
        document.getElementById('displayCustID').innerText = currentLoggedInClientID;
        
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('dashboard-section').style.display = 'block';
        
        loadProducts();
        updateOrderInterface();
        
        // লাইভ রিয়েল-টাইম ডাটা লিসেনার চালু করা
        listenToUserDatabase(currentLoggedInClientID);
        
        alert(`🎉 রেজিস্ট্রেশন সফল! আপনার ইউনিক আইডি: ${currentLoggedInClientID}`);
    } catch (e) {
        console.error("রেজিস্ট্রেশন ব্যর্থ হয়েছে:", e);
        alert("দুঃখিত, ডাটাবেজ কানেকশনে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
}

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
    const amountInput = document.getElementById('adminDepositAmount');
    const amount = parseFloat(amountInput.value);
    if (!isNaN(amount) && amount > 0) {
        currentBalance += amount;
        document.getElementById('userBalance').innerText = currentBalance.toFixed(2);
        amountInput.value = "";
        alert(`💰 Success! Added $${amount.toFixed(2)} to client account balance.`);
    }
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

document.getElementById('btn-service').addEventListener('click', function() {
    let chatBox = document.getElementById('customer-chat-modal');
    if (!chatBox) {
        chatBox = document.createElement('div');
        chatBox.id = 'customer-chat-modal';
        chatBox.style.cssText = "position:fixed; bottom:20px; right:20px; width:350px; background:#fff; border:1px solid #eaedf1; border-radius:12px; box-shadow:0 10px 25px rgba(0,0,0,0.15); z-index:9999; overflow:hidden;";
                        chatBox.innerHTML = `
            <div style="background:#ff5722; color:#fff; padding:15px; font-weight:bold; display:flex; justify-content:space-between; align-items:center;"><span>Private Live Support</span><span style="cursor:pointer;" onclick="this.parentElement.parentElement.style.display='none'">×</span></div>
            <div id="chat-logs-area" style="height:220px; overflow-y:auto; padding:15px; background:#f8fafc; font-size:13px; display:flex; flex-direction:column; gap:10px;"></div>
            <div style="padding:10px; border-top:1px solid #eaedf1; background:#fff; display:flex; flex-direction:column; gap:8px;">
                <div style="display:flex; gap:5px; align-items:center;">
                    <!-- গ্রাহকের ছবি আপলোড বাটন -->
                    <input type="file" id="privateChatFileInput" accept="image/*" style="display: none;" onchange="handlePrivateChatImage(event, 'user')">
                    <button type="button" onclick="document.getElementById('privateChatFileInput').click()" style="background: #f1f5f9; border: 1px solid #cbd5e1; padding: 6px 8px; border-radius: 4px; cursor: pointer; font-size: 14px;">📎</button>
                    <input type="text" id="clientChatMessage" placeholder="Type your personal query..." style="flex:1; padding:8px; border:1px solid #ccc; border-radius:4px;">
                    <button onclick="sendClientMessage()" style="background:#ff5722; color:#fff; border:none; padding:8px 12px; border-radius:4px; cursor:pointer; font-weight:bold;">Send</button>
                </div>
                <!-- অ্যাডমিন পোর্টালের কালো বক্সটি এখান থেকে সম্পূর্ণ মুছে দেওয়া হয়েছে যাতে গ্রাহক দেখতে না পায় -->
            </div>`;

        document.body.appendChild(chatBox);
    } else { chatBox.style.display = 'block'; }
});

function sendClientMessage() {
    const input = document.getElementById('clientChatMessage'); if (!input.value.trim()) return;
    const logs = document.getElementById('chat-logs-area'); const msg = document.createElement('div');
    msg.style.cssText = "background:#ff5722; color:#fff; padding:8px 12px; border-radius:8px; align-self:end; max-width:80%; word-break:break-word;";
    msg.innerText = input.value; logs.appendChild(msg); logs.scrollTop = logs.scrollHeight; input.value = "";
}
function sendAdminReply() {
    const input = document.getElementById('adminReplyMessage'); if (!input.value.trim()) return;
    const logs = document.getElementById('chat-logs-area'); const msg = document.createElement('div');
    msg.style.cssText = "background:#e2e8f0; color:#1e293b; padding:8px 12px; border-radius:8px; align-self:start; max-width:80%; word-break:break-word;";
    msg.innerText = input.value; logs.appendChild(msg); logs.scrollTop = logs.scrollHeight; input.value = "";
}
function filterCountry(code) { console.log("Filtering: " + code); }
function handlePrivateChatImage(event, senderType) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const chatLog = document.getElementById('chat-logs-area');
            if (!chatLog) return;

            const msg = document.createElement('div');
            
            // গ্রাহকের ছবি ডান পাশে কমলা রঙে এবং অ্যাডমিনের ছবি বাম পাশে অ্যাশ রঙে দেখাবে
            if (senderType === 'user') {
                msg.style.cssText = "background:#ff5722; color:#fff; padding:8px 12px; border-radius:8px; align-self:end; max-width:80%; margin: 5px 0; margin-left: auto;";
            } else {
                msg.style.cssText = "background:#e2e8f0; color:#1e293b; padding:8px 12px; border-radius:8px; align-self:start; max-width:80%; margin: 5px 0; margin-right: auto;";
            }

            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '100%';
            img.style.borderRadius = '6px';
            img.style.display = 'block';

            msg.appendChild(img);
            chatLog.appendChild(msg);
            
            // নতুন ছবি আসার পর চ্যাট বক্স অটোমেটিক নিচে স্ক্রল হবে
            chatLog.scrollTop = chatLog.scrollHeight;
        }
        reader.readAsDataURL(file);
    }
}
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

// HTML-এর inline onsubmit হ্যান্ডলারের সাথে জাভাস্ক্রিপ্টের সংযোগ তৈরি করা
window.handleRegister = handleRegister;

// গ্রাহকের স্ক্রিনে অটো-আপডেট পাওয়ার লাইভ লিসেনার (Realtime Database সংস্করণ)
function listenToUserDatabase(clientID) {
    onValue(ref(db, "users/" + clientID), (snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            
            // লাইভ ব্যালেন্স ও অর্ডার আপডেট
            currentBalance = userData.balance || 0.00;
            document.getElementById('userBalance').innerText = currentBalance.toFixed(2);
            
            userAssignedOrders = userData.assignedOrders ? Object.values(userData.assignedOrders) : [];
            updateOrderInterface(); 
        }
    });
}

// 🎯 index.html ফাইলের ফর্ম আইডি ট্র্যাক করে সাবমিট লিসেনার যুক্ত করা
const regForm = document.getElementById('registerForm');
if (regForm) {
    regForm.addEventListener('submit', handleRegister);
}
