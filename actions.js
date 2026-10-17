import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-analytics.js";

import {
    getDatabase,
    ref,
    runTransaction,
    set,
    push,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-database.js";

import {
    getAuth,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";

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

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getDatabase(app);

// Global State
let currentBalance = 0.00;
let userAssignedOrders = [];

const FIRST_CUSTOMER_ID = 74514244;

// Generate the next customer ID
async function getNextCustomerId() {
    const counterRef = ref(db, "counters/customerId");

    const result = await runTransaction(counterRef, (currentId) => {
        if (currentId === null) {
            return FIRST_CUSTOMER_ID;
        }

        return Number(currentId) + 1;
    });

    if (!result.committed) {
        throw new Error("Customer ID তৈরি করা যায়নি।");
    }

    return result.snapshot.val();
}

// Demo client nodes
let dummyClients = [];

for (let i = 1; i <= 50; i++) {
    dummyClients.push({
        id: (74514242 + i + 100).toString()
    });
}

// Restore customer session
function checkActiveLoginSession() {
    const isUserActive =
        localStorage.getItem("is_shop_user_active");

    const savedCustID =
        localStorage.getItem("saved_shop_cust_id");

    const savedShopName =
        localStorage.getItem("saved_shop_name");

    if (
        isUserActive === "true" &&
        savedCustID &&
        savedShopName
    ) {
        const displayShopName =
            document.getElementById("displayShopName");

        const brandName =
            document.getElementById("brandName");

        const displayCustID =
            document.getElementById("displayCustID");

        const authSection =
            document.getElementById("auth-section");

        const dashboardSection =
            document.getElementById("dashboard-section");

        if (displayShopName) {
            displayShopName.innerText = savedShopName;
        }

        if (brandName) {
            brandName.innerText = savedShopName;
        }

        if (displayCustID) {
            displayCustID.innerText = savedCustID;
        }

        if (authSection) {
            authSection.style.display = "none";
        }

        if (dashboardSection) {
            dashboardSection.style.display = "block";
        }

        if (typeof loadProducts === "function") {
            loadProducts();
        }

        if (typeof populateAdminDropdown === "function") {
            populateAdminDropdown();
        }

        if (typeof updateOrderInterface === "function") {
            updateOrderInterface();
        }

        if (typeof initializePublicChatStream === "function") {
            initializePublicChatStream();
        }

        if (typeof initEverGrowingTraffic === "function") {
            initEverGrowingTraffic();
        }

        console.log(
            "Session restored for Customer ID:",
            savedCustID
        );
    }
}

document.addEventListener(
    "DOMContentLoaded",
    checkActiveLoginSession
);

// Customer registration
window.handleRegister = async function (event) {
    event.preventDefault();

    const shopName =
        document.getElementById("shopName").value.trim();

    const ownerName =
        document.getElementById("ownerName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    try {
        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        const customerId = await getNextCustomerId();

        await set(
            ref(db, `customers/${userCredential.user.uid}`),
            {
                customerId,
                shopName,
                ownerName,
                email,
                createdAt: new Date().toISOString()
            }
        );

        localStorage.setItem(
            "is_shop_user_active",
            "true"
        );

        localStorage.setItem(
            "saved_shop_cust_id",
            String(customerId)
        );

        localStorage.setItem(
            "saved_shop_name",
            shopName
        );

        alert(
            `Registration successful. Your customer ID is ${customerId}.`
        );

        const registerForm =
            document.getElementById("registerForm");

        if (registerForm) {
            registerForm.reset();
        }

        document.getElementById("displayShopName").innerText =
            shopName;

        document.getElementById("brandName").innerText =
            shopName;

        document.getElementById("displayCustID").innerText =
            customerId;

        document.getElementById("auth-section").style.display =
            "none";

        document.getElementById("dashboard-section").style.display =
            "block";

    } catch (error) {
        console.error("Registration error:", error);

        alert(
            `Registration failed: ${error.message}`
        );
    }
};

// Upload profile image
function uploadProfileImage(event) {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const profilePic =
            document.getElementById("userProfilePic");

        if (profilePic) {
            profilePic.src = e.target.result;
        }
    };

    reader.readAsDataURL(file);
}

// Product database
const productsData = [
    {
        id: 1,
        title: "VMAXPRO Mobile Phone High Performance",
        originalPrice: 270.00,
        img: "vmaxpro1.jpg",
        free: false
    },
    {
        id: 2,
        title: "VMAX PRO Mobile Phone Multiple Colors",
        originalPrice: 270.00,
        img: "vmaxpro2.jpg",
        free: false
    },
    {
        id: 3,
        title: "8-foot Medium-sized Table Tennis Table Foldable",
        originalPrice: 203.92,
        img: "pingpong.jpg",
        free: true
    },
    {
        id: 4,
        title: "925 Silver Set Moissani Hip-hop Personalized Necklace",
        originalPrice: 238.90,
        img: "necklace.jpg",
        free: false
    },
    {
        id: 5,
        title: "133 Integrated Computer Voice Assistant CM4",
        originalPrice: 249.34,
        img: "computer.jpg",
        free: false
    },
    {
        id: 6,
        title: "Indoor Playground 7-in-1 Jungle Gym Playset",
        originalPrice: 188.74,
        img: "playground.jpg",
        free: true
    },
    {
        id: 7,
        title: "ML100Bi Photography Fill Light High Power King",
        originalPrice: 220.43,
        img: "filllight.jpg",
        free: false
    },
    {
        id: 8,
        title: "Brand New Home Treadmill 2.5HP Silent Folding",
        originalPrice: 177.65,
        img: "treadmill.jpg",
        free: false
    },
    {
        id: 9,
        title: "300 Pound Hydraulic Motorcycle Scissor Jack Lift",
        originalPrice: 175.74,
        img: "jack.jpg",
        free: true
    },
    {
        id: 12,
        title: "Applicable To MACBOOK A1398 2013-2015 Display",
        originalPrice: 227.00,
        img: "macbook.jpg",
        free: false
    },
    {
        id: 13,
        title: "Large Hole Fishnet Artificial Scalp Seamless Wig",
        originalPrice: 223.88,
        img: "wig1.jpg",
        free: false
    },
    {
        id: 14,
        title: "Basswood Cello, Black Professional Instrument",
        originalPrice: 142.52,
        img: "cello.jpg",
        free: true
    },
    {
        id: 15,
        title: "Real Human Hair Transparent Lace Full-head Wig",
        originalPrice: 222.01,
        img: "wig2.jpg",
        free: false
    },
    {
        id: 16,
        title: "Lace Wig Can Be Dyed And Ironed Full Head Cover",
        originalPrice: 238.80,
        img: "wig3.jpg",
        free: false
    },
    {
        id: 17,
        title: "70mai A800S-1 4K Dash Cam Car DVR 24H Support",
        originalPrice: 140.01,
        img: "dashcam1.jpg",
        free: false
    },
    {
        id: 18,
        title: "Big Screen Smart Watch Ultra Series",
        originalPrice: 135.60,
        img: "watch.jpg",
        free: false
    }
];

// 2. Extended Products Database
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
    { id: 36, title: "Large Intelligent Aromatherapy Machine Air System", originalPrice: 107.90, img: "aroma.jpg", free: false }
];

productsData.push(...extendedProducts);


// 3. Product Grid Renderer
function loadProducts() {
    const container = document.getElementById("productGridContainer");

    if (!container) return;

    container.innerHTML = "";

    productsData.forEach((prod) => {
        const card = document.createElement("div");
        card.className = "product-card";

        const freeTag = prod.free
            ? '<span class="tag-free">Free</span>'
            : "";

        card.innerHTML = `
            ${freeTag}
            <img
                src="${prod.img}"
                alt="${prod.title}"
                class="product-img"
            >
            <div>
                <h3 class="product-title">${prod.title}</h3>
                <div class="product-meta"
                     style="font-size:12px;color:#64748b;">
                    Inventory Showcase
                </div>
            </div>
            <div class="product-footer">
                <div class="price-container" style="width:100%;">
                    <span class="product-price"
                          style="text-decoration:none;">
                        $${prod.originalPrice.toFixed(2)}
                    </span>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

loadProducts();


// 4. Customer Order Interface
function updateOrderInterface() {
    const tableBody = document.getElementById("orderTableBody");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (userAssignedOrders.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4"
                    style="text-align:center;color:#94a3b8;padding:20px;">
                    No pending stock assigned to your store yet.
                    Please contact support.
                </td>
            </tr>
        `;

        const orderCount = document.getElementById("orderCount");
        const orderButton = document.getElementById("btn-order");

        if (orderCount) orderCount.innerText = "0";

        if (orderButton) {
            orderButton.style.background = "#ffffff";
            orderButton.style.color = "#1e293b";
        }

        return;
    }

    const pendingCount = userAssignedOrders.filter(
        order => order.status === "Pending"
    ).length;

    const orderCount = document.getElementById("orderCount");
    const orderButton = document.getElementById("btn-order");

    if (orderCount) {
        orderCount.innerText = pendingCount;
    }

    if (orderButton) {
        orderButton.style.background =
            pendingCount > 0 ? "#ff5722" : "#ffffff";

        orderButton.style.color =
            pendingCount > 0 ? "#ffffff" : "#1e293b";
    }

    userAssignedOrders.forEach((item, index) => {
        const wholesalePrice =
            (item.originalPrice * 0.70).toFixed(2);

        let actionCell = "";

        if (item.status === "Pending") {
            actionCell = `
                <button
                    class="confirm-btn"
                    onclick="confirmAssignedOrder(${index})"
                    style="border-radius:4px;">
                    Confirm Purchase
                </button>
            `;
        } else {
            actionCell = `
                <span class="status-badge">${item.status}</span>
            `;
        }

        const row = document.createElement("tr");

        row.innerHTML = `
            <td><strong>${item.title}</strong></td>
            <td>$${item.originalPrice.toFixed(2)}</td>
            <td style="color:#ff5722;font-weight:bold;">
                $${wholesalePrice}
            </td>
            <td>${actionCell}</td>
        `;

        tableBody.appendChild(row);
    });
}


// 5. Order Confirmation and Balance Deduction
function confirmAssignedOrder(index) {
    const item = userAssignedOrders[index];

    if (!item || item.status !== "Pending") return;

    const wholesaleCost = parseFloat(
        (item.originalPrice * 0.70).toFixed(2)
    );

    if (currentBalance < wholesaleCost) {
        alert(
            "Insufficient Balance! Please contact Customer Service."
        );
        return;
    }

    currentBalance -= wholesaleCost;

    const balanceElement = document.getElementById("userBalance");

    if (balanceElement) {
        balanceElement.innerText = currentBalance.toFixed(2);
    }

    item.status = "Processing (Paid)";

    updateOrderInterface();

    alert(
        `Success! Payment deducted. We will dispatch "${item.title}" shortly.`
    );
}


// 6. Public Chat Stream Simulation
function initializePublicChatStream() {
    const logs = document.getElementById("publicChatStream");

    if (!logs) return;

    logs.innerHTML = `
        <div class="chat-row">
            <span class="chat-meta-info">System Support</span>
            <span class="chat-msg-text">
                Global activity nodes loaded successfully.
            </span>
        </div>
    `;

    const dummyPhrases = [
        "Just processed my product batch. Super fast automation system!",
        "Fulfillment confirmed! My Canada buyer received the package.",
        "Recharged $200 successfully via support terminal.",
        "Best wholesale margins found on these smart watch setups.",
        "Automated tracking sync completed.",
        "Fulfillment complete. Secure network channel.",
        "Wig orders confirmed. Profit margins are solid today.",
        "Highly recommended platform for scalable dropshipping.",
        "Order status shifted to Processing. Funding cleared.",
        "Package dispatched successfully.",
        "Increased store capital. Verification was instant."
    ];

    setInterval(() => {
        const randomClient =
            dummyClients[
                Math.floor(Math.random() * dummyClients.length)
            ];

        const randomText =
            dummyPhrases[
                Math.floor(Math.random() * dummyPhrases.length)
            ];

        appendPublicChatMessage(randomClient.id, randomText);
    }, 14000);
}

function appendPublicChatMessage(senderId, textString) {
    const logs = document.getElementById("publicChatStream");

    if (!logs) return;

    const msg = document.createElement("div");
    msg.className = "chat-row";

    const sender = document.createElement("span");
    sender.className = "chat-meta-info";
    sender.textContent = `ID: ${senderId}`;

    const message = document.createElement("span");
    message.className = "chat-msg-text";
    message.textContent = textString;

    msg.appendChild(sender);
    msg.appendChild(message);

    logs.appendChild(msg);
    logs.scrollTop = logs.scrollHeight;
}

function sendPublicChatMessage() {
    const input = document.getElementById("publicChatInput");

    if (!input || !input.value.trim()) return;

    // Public activity stream only; this is not private support chat.
    appendPublicChatMessage("CUSTOMER", input.value.trim());

    input.value = "";
}


// 7. Admin Interface Functions
function addBalanceFromAdmin() {
    const amountInput =
        document.getElementById("adminDepositAmount");

    if (!amountInput) return;

    const amount = parseFloat(amountInput.value);

    if (!Number.isNaN(amount) && amount > 0) {
        currentBalance += amount;

        const balanceElement =
            document.getElementById("userBalance");

        if (balanceElement) {
            balanceElement.innerText = currentBalance.toFixed(2);
        }

        amountInput.value = "";

        alert(
            `Added $${amount.toFixed(2)} to the displayed balance.`
        );
    }
}

function populateAdminDropdown() {
    const selectMenu = document.getElementById("adminProdSelect");

    if (!selectMenu) return;

    selectMenu.innerHTML = "";

    productsData.forEach((product) => {
        const option = document.createElement("option");

        option.value = product.id;
        option.innerText =
            `${product.title} ($${product.originalPrice.toFixed(2)})`;

        selectMenu.appendChild(option);
    });
}

function adminAssignProductToUser() {
    const selectMenu = document.getElementById("adminProdSelect");

    if (!selectMenu) return;

    const productId = parseInt(selectMenu.value, 10);

    const product = productsData.find(
        item => item.id === productId
    );

    if (!product) return;

    userAssignedOrders.push({
        ...product,
        status: "Pending"
    });

    updateOrderInterface();

    alert(`Product added to the current order list: ${product.title}`);
}

function adminMarkAllDeliveriesSuccess() {
    const paidItems = userAssignedOrders.filter(
        order => order.status === "Processing (Paid)"
    );

    if (paidItems.length === 0) {
        alert("No active paid orders available.");
        return;
    }

    let totalCredited = 0;

    userAssignedOrders.forEach((order) => {
        if (order.status === "Processing (Paid)") {
            order.status = "Delivered (Success)";

            currentBalance += order.originalPrice;
            totalCredited += order.originalPrice;
        }
    });

    const balanceElement = document.getElementById("userBalance");

    if (balanceElement) {
        balanceElement.innerText = currentBalance.toFixed(2);
    }

    updateOrderInterface();

    alert(
        `Delivery status updated. Displayed balance credit: $${totalCredited.toFixed(2)}`
    );
}

function adminBroadcastNotice() {
    const textInput = document.getElementById("adminNoticeInput");
    const banner = document.getElementById("userNoticeBanner");

    if (!textInput || !banner || !textInput.value.trim()) return;

    const wrapper = document.createElement("div");
    wrapper.style.cssText =
        "display:flex;align-items:center;gap:10px;";

    const icon = document.createElement("span");
    icon.textContent = "📢";

    const message = document.createElement("div");
    message.textContent = `System Notice: ${textInput.value.trim()}`;

    wrapper.appendChild(icon);
    wrapper.appendChild(message);

    banner.replaceChildren(wrapper);
    banner.style.display = "block";

    textInput.value = "";

    alert("System notice displayed.");
}

function adminSendCustomChatMessage() {
    const identitySelect =
        document.getElementById("adminChatSpeakerSelect");

    const messageInput =
        document.getElementById("adminChatSpeakerMessage");

    if (
        !identitySelect ||
        !messageInput ||
        !messageInput.value.trim()
    ) {
        return;
    }

    const targetVal = identitySelect.value;
    const sender = targetVal === "OFFICIAL"
        ? "SUPPORT"
        : targetVal;

    appendPublicChatMessage(sender, messageInput.value.trim());

    messageInput.value = "";
}


                    <input type="text" id="adminNoticeInput" placeholder="Type systemic notice message here..." style="width:100%; padding:8px; border-radius:4px; border:none; color:#333;">
                    <button onclick="adminBroadcastNotice()" style="background:#ef4444; color:white; border:none; padding:8px; border-radius:4px; cursor:pointer; font-weight:bold; font-size:13px; margin-top:5px;">Publish System Warning Message</button>
                </div>
            `;
            panel.appendChild(controls);
            populateAdminDropdown();
        }
    }, 500);
});

document.getElementById('btn-order').addEventListener('click', function() {
    document.getElementById('order-modal-window').style.display = 'flex';
});

function closeOrderModal() {
    document.getElementById('order-modal-window').style.display = 'none';
}

document.getElementById('btn-recharge').addEventListener('click', function() {
    alert('⚠️ Action Restricted: Please contact our official Customer Service framework to safely credit your store account.');
});

document.getElementById('btn-withdraw').addEventListener('click', function() {
    alert('⚠️ Action Restricted: Please connect with Customer Service to securely initiate your withdrawal procedure.');
});

document.getElementById('btn-service').addEventListener('click', function() {
    let chatBox = document.getElementById('customer-chat-modal');

    if (!chatBox) {
        chatBox = document.createElement('div');
        chatBox.id = 'customer-chat-modal';

        chatBox.style.cssText = "position:fixed; bottom:20px; right:20px; width:350px; background:#fff; border:1px solid #eaedf1; border-radius:12px; box-shadow:0 10px 25px rgba(0,0,0,0.15); z-index:9999; overflow:hidden;";

        chatBox.innerHTML = `
            <div style="background:#ff5722; color:#fff; padding:15px; font-weight:bold; display:flex; justify-content:space-between; align-items:center;">
                <span>Private Live Support</span>
                <span style="cursor:pointer;" onclick="this.parentElement.parentElement.style.display='none'">×</span>
            </div>

            <div id="chat-logs-area" style="height:220px; overflow-y:auto; padding:15px; background:#f8fafc; font-size:13px; display:flex; flex-direction:column; gap:10px;"></div>

            <div style="padding:10px; border-top:1px solid #eaedf1; background:#fff; display:flex; flex-direction:column; gap:8px;">
                <div style="display:flex; gap:5px; align-items:center;">
                    <input type="file" id="privateChatFileInput" accept="image/*" style="display:none;" onchange="handlePrivateChatImage(event, 'user')">

                    <button type="button" onclick="document.getElementById('privateChatFileInput').click()" style="background:#f1f5f9; border:1px solid #cbd5e1; padding:6px 8px; border-radius:4px; cursor:pointer; font-size:14px;">📎</button>

                    <input type="text" id="clientChatMessage" placeholder="Type your personal query..." style="flex:1; padding:8px; border:1px solid #ccc; border-radius:4px;">

                    <button onclick="sendClientMessage()" style="background:#ff5722; color:#fff; border:none; padding:8px 12px; border-radius:4px; cursor:pointer; font-weight:bold;">Send</button>
                </div>
            </div>
        `;

        document.body.appendChild(chatBox);
    } else {
        chatBox.style.display = 'block';
    }
});


// গ্রাহকের মেসেজ Firebase Realtime Database-এ পাঠানো

async function sendClientMessage() {
    const input = document.getElementById('clientChatMessage');
    const logs = document.getElementById('chat-logs-area');

    if (!input || !logs) {
        console.error('Chat input বা message area পাওয়া যায়নি।');
        return;
    }

    const messageText = input.value.trim();
    if (!messageText) return;

    // Modular Firebase Auth
    const user = auth.currentUser;

    if (!user) {
        alert('মেসেজ পাঠানোর জন্য প্রথমে লগইন করুন।');
        return;
    }

    const button = document.querySelector(
        '#customer-chat-modal button[onclick="sendClientMessage()"]'
    );

    if (button) button.disabled = true;

    try {
        // Modular Firebase Database
        const messagesRef = ref(db, `chats/${user.uid}/messages`);
        const newMessageRef = push(messagesRef);

        await set(newMessageRef, {
            sender: 'user',
            text: messageText,
            type: 'text',
            timestamp: serverTimestamp()
        });

        const msg = document.createElement('div');
        msg.style.cssText =
            'background:#ff5722;color:#fff;padding:8px 12px;' +
            'border-radius:8px;align-self:flex-end;max-width:80%;' +
            'overflow-wrap:anywhere;margin:5px 0;';

        msg.textContent = messageText;
        msg.dataset.messageId = newMessageRef.key;

        if (!logs.querySelector(
            `[data-message-id="${newMessageRef.key}"]`
        )) {
            logs.appendChild(msg);
        }

        logs.scrollTop = logs.scrollHeight;
        input.value = '';

        console.log('Message saved:', newMessageRef.key);

    } catch (error) {
        console.error('Message send failed:', error);
        alert('মেসেজ পাঠানো যায়নি। Console-এ error দেখুন।');
    } finally {
        if (button) button.disabled = false;
    }
}

window.sendClientMessage = sendClientMessage;


// অ্যাডমিন রিপ্লাই UI-তে দেখানোর ফাংশন
function sendAdminReply() {
    const input = document.getElementById('adminReplyMessage');

    if (!input || !input.value.trim()) return;

    const logs = document.getElementById('chat-logs-area');
    if (!logs) return;

    const msg = document.createElement('div');

    msg.style.cssText =
        "background:#e2e8f0; color:#1e293b; padding:8px 12px; border-radius:8px; align-self:start; max-width:80%; word-break:break-word;";

    msg.innerText = input.value;
    logs.appendChild(msg);
    logs.scrollTop = logs.scrollHeight;
    input.value = "";
}

function filterCountry(code) {
    console.log("Filtering: " + code);
}

// প্রাইভেট চ্যাটে ছবি দেখানোর ফাংশন
function handlePrivateChatImage(event, senderType) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const chatLog = document.getElementById('chat-logs-area');
            if (!chatLog) return;

            const msg = document.createElement('div');

            // গ্রাহকের ছবি ডানে, অ্যাডমিনের ছবি বামে
            if (senderType === 'user') {
                msg.style.cssText =
                    "background:#ff5722; color:#fff; padding:8px 12px; border-radius:8px; align-self:end; max-width:80%; margin:5px 0; margin-left:auto;";
            } else {
                msg.style.cssText =
                    "background:#e2e8f0; color:#1e293b; padding:8px 12px; border-radius:8px; align-self:start; max-width:80%; margin:5px 0; margin-right:auto;";
            }

            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '100%';
            img.style.borderRadius = '6px';
            img.style.display = 'block';

            msg.appendChild(img);
            chatLog.appendChild(msg);

            // নতুন ছবি এলে নিচে স্ক্রল
            chatLog.scrollTop = chatLog.scrollHeight;
        };

        reader.readAsDataURL(file);
    }
}

// প্রত্যেক দোকানের জন্য আলাদা লাইভ ট্রাফিক কাউন্টার
function initEverGrowingTraffic() {
    const visitorElement = document.getElementById('totalVisitorCount');
    if (!visitorElement) return;

    // দোকানের কাস্টমার আইডি দিয়ে localStorage key তৈরি
    const customerID = document.getElementById('displayCustID')
        ? document.getElementById('displayCustID').innerText.trim()
        : 'guest';

    const storageKey = 'shop_traffic_' + customerID;

    let savedTraffic = localStorage.getItem(storageKey);
    let currentTotalTraffic;

    // আগে সেভ করা সংখ্যা থাকলে সেটি ব্যবহার
    if (savedTraffic && !isNaN(savedTraffic) && savedTraffic !== "null") {
        currentTotalTraffic = parseInt(savedTraffic);
    } else {
        currentTotalTraffic = Math.floor(Math.random() * 2) + 1;
        localStorage.setItem(storageKey, currentTotalTraffic);
    }

    visitorElement.innerText = currentTotalTraffic;

    // প্রতি নির্দিষ্ট সময় পর কাউন্টার বাড়ানো
    function increaseTraffic() {
        const newVisitors = Math.floor(Math.random() * 2) + 1;
        currentTotalTraffic += newVisitors;

        localStorage.setItem(storageKey, currentTotalTraffic);
        visitorElement.innerText = currentTotalTraffic;

        // ৭ থেকে ৮ মিনিট পর আবার আপডেট
        const nextInterval = (Math.floor(Math.random() * 60) + 420) * 1000;
        setTimeout(increaseTraffic, nextInterval);
    }

    // পেজ খোলার ৫ সেকেন্ড পর প্রথম আপডেট
    setTimeout(increaseTraffic, 5000);
}


// পেজ প্রস্তুত হলে কাউন্টার চালু
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initEverGrowingTraffic);
} else {
    initEverGrowingTraffic();
}
