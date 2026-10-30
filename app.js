/**
 * Chai & Charcha Cafe & Roastery - Customer Loyalty & Rewards Management System
 * Production Controller, POS Engine, Confetti Celebrations & Data Visualizations
 * Lead & Hospitality Owner: Jatin
 */

// Application State
let currentMembers = [...INITIAL_MEMBERS];
let activeMember = currentMembers[0]; // Jatin by default
let businessCharts = {};
let activeMenuCategory = "All";

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initHeroAnimatedSwitcher();
    initDemoMembers();
    renderReviews();
    initReviewForm();
    renderActiveMemberProfile();
    initMenuFilterTabs();
    renderMenu("All");
    renderRewardsStore();
    initTerminal();
    initLiveSavingsCalculator();
    initBusinessCharts();
});

/* ================= 1. NAVIGATION & VIEW CONTROLLER ================= */
function initNavigation() {
    const navButtons = document.querySelectorAll(".nav-btn");
    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            navButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const targetSectionId = btn.getAttribute("data-target");
            const targetElement = document.getElementById(targetSectionId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    // Terminal Quick Button in Header
    const terminalQuickBtn = document.getElementById("terminalQuickBtn");
    if (terminalQuickBtn) {
        terminalQuickBtn.addEventListener("click", () => {
            const terminalSec = document.getElementById("terminalSection");
            if (terminalSec) {
                terminalSec.scrollIntoView({ behavior: "smooth" });
            }
        });
    }

    // Branch Selector Change
    const branchSelector = document.getElementById("branchSelect");
    if (branchSelector) {
        branchSelector.addEventListener("change", (e) => {
            const selectedBranch = CAFE_CONFIG.branches.find(b => b.id === e.target.value);
            if (selectedBranch) {
                showToast(`Switched outlet to: ${selectedBranch.name}`);
            }
        });
    }
}

/* ================= 2. HERO ANIMATED DISH SWITCHER ================= */
const HERO_DISHES = [
    {
        name: "Ginger Cardamom Kulhad Chai",
        tag: "Handcrafted Kulhad Brew",
        price: "₹90",
        desc: "Slow-simmered Assam tea leaves with freshly pounded ginger and fragrant green cardamom in an earthy clay kulhad.",
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
        hasSteam: true
    },
    {
        name: "Wood-Fired Paneer Tikka Pizza",
        tag: "Hand-Stretched Sourdough",
        price: "₹340",
        desc: "Charred tandoori paneer, crisp bell peppers, red onions, and melted mozzarella on our signature 48-hr fermented sourdough crust.",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
        hasSteam: false
    },
    {
        name: "Velvet Arabica Cappuccino",
        tag: "Double Shot Espresso",
        price: "₹180",
        desc: "Rich single-origin Chikmagalur Arabica espresso with micro-textured velvety steamed milk and intricate barista latte art.",
        image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80",
        hasSteam: true
    },
    {
        name: "Classic Virgin Mint Mojito",
        tag: "Botanical Chilled Cooler",
        price: "₹150",
        desc: "Hand-muddled fresh garden mint, key lime slices, raw sugar cane syrup, and bubbly club soda served over crushed ice.",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
        hasSteam: false
    }
];

let heroCurrentIndex = 0;
function initHeroAnimatedSwitcher() {
    const prevBtn = document.getElementById("heroDishPrev");
    const nextBtn = document.getElementById("heroDishNext");

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            heroCurrentIndex = (heroCurrentIndex - 1 + HERO_DISHES.length) % HERO_DISHES.length;
            updateHeroDishDisplay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            heroCurrentIndex = (heroCurrentIndex + 1) % HERO_DISHES.length;
            updateHeroDishDisplay();
        });
    }

    // Auto rotate every 6 seconds
    setInterval(() => {
        heroCurrentIndex = (heroCurrentIndex + 1) % HERO_DISHES.length;
        updateHeroDishDisplay();
    }, 6000);
}

function updateHeroDishDisplay() {
    const dish = HERO_DISHES[heroCurrentIndex];
    const imgEl = document.getElementById("heroDishImg");
    const tagEl = document.getElementById("heroDishTag");
    const priceEl = document.getElementById("heroDishPrice");
    const titleEl = document.getElementById("heroDishTitle");
    const descEl = document.getElementById("heroDishDesc");
    const steamEl = document.getElementById("heroSteamWrap");

    if (imgEl) {
        imgEl.style.opacity = "0.2";
        imgEl.style.transform = "scale(0.96)";
        setTimeout(() => {
            imgEl.src = dish.image;
            imgEl.style.opacity = "1";
            imgEl.style.transform = "scale(1)";
        }, 200);
    }
    if (tagEl) tagEl.textContent = dish.tag;
    if (priceEl) priceEl.textContent = dish.price;
    if (titleEl) titleEl.textContent = dish.name;
    if (descEl) descEl.textContent = dish.desc;
    if (steamEl) steamEl.style.display = dish.hasSteam ? "flex" : "none";
}

/* ================= 3. MEMBER PROFILE & DIGITAL PASS ================= */
function initDemoMembers() {
    const pillsContainer = document.getElementById("demoPillsContainer");
    if (!pillsContainer) return;

    pillsContainer.innerHTML = "";
    currentMembers.forEach((member) => {
        const pill = document.createElement("button");
        pill.className = `demo-pill ${member.id === activeMember.id ? "active" : ""}`;
        pill.innerHTML = `👤 ${member.name} (${member.id})`;
        pill.addEventListener("click", () => {
            switchActiveMember(member.id);
        });
        pillsContainer.appendChild(pill);
    });

    // Search Member Handler
    const searchBtn = document.getElementById("searchMemberBtn");
    const searchInput = document.getElementById("memberSearchInput");
    if (searchBtn && searchInput) {
        searchBtn.addEventListener("click", () => {
            const query = searchInput.value.trim().toLowerCase();
            if (!query) {
                showToast("Please enter a Mobile Number or Member ID");
                return;
            }
            const found = currentMembers.find(m =>
                m.phone.includes(query) || m.id.toLowerCase().includes(query) || m.name.toLowerCase().includes(query)
            );
            if (found) {
                switchActiveMember(found.id);
                showToast(`Welcome back, ${found.name}!`);
            } else {
                showToast("Enrolling new VIP Club Account...");
                const newMember = {
                    id: `CC-${Math.floor(1000 + Math.random() * 9000)}`,
                    phone: query.match(/^\d+$/) ? query : "98" + Math.floor(10000000 + Math.random() * 90000000),
                    name: query.match(/^\d+$/) ? "New Guest Member" : capitalize(query),
                    joinedDate: "Today",
                    tier: "Silver Member",
                    coins: 50, // 50 coins welcome bonus
                    stamps: 1,
                    totalSpent: 0,
                    visitsCount: 1,
                    whatsappConsent: true,
                    history: [
                        { id: `TX-${Date.now().toString().slice(-4)}`, date: "Today", type: "Bonus", amount: 0, coinsEarned: 50, stampsEarned: 1, note: "VIP Welcome Bonus Coins Credited" }
                    ],
                    activeVouchers: []
                };
                currentMembers.push(newMember);
                initDemoMembers();
                switchActiveMember(newMember.id);
            }
        });
    }
}

function switchActiveMember(memberId) {
    const found = currentMembers.find(m => m.id === memberId);
    if (found) {
        activeMember = found;
        document.querySelectorAll(".demo-pill").forEach(p => {
            p.classList.toggle("active", p.innerText.includes(memberId));
        });
        renderActiveMemberProfile();
        updateCashierMemberSelect();
        showToast(`Active Club Pass: ${activeMember.name}`);
    }
}

function renderActiveMemberProfile() {
    if (!activeMember) return;

    // Digital Pass Elements
    const nameEl = document.getElementById("passMemberName");
    const idEl = document.getElementById("passMemberId");
    const tierEl = document.getElementById("passMemberTier");
    const coinsEl = document.getElementById("passCoinsBalance");
    const inrValueEl = document.getElementById("passInrValue");
    const visitsEl = document.getElementById("passVisitsCount");

    if (nameEl) nameEl.textContent = activeMember.name;
    if (idEl) idEl.textContent = `Card ID: ${activeMember.id} • ${activeMember.phone}`;
    if (tierEl) tierEl.textContent = activeMember.tier;
    if (coinsEl) coinsEl.textContent = activeMember.coins;
    if (inrValueEl) inrValueEl.textContent = `(Worth ₹${(activeMember.coins * CAFE_CONFIG.rules.coinValueInINR).toFixed(0)})`;
    if (visitsEl) visitsEl.textContent = activeMember.visitsCount;

    // Render Dynamic QR Code
    renderQRCode(activeMember.id);

    // Render Digital Stamp Card
    renderStampCard();

    // Render History Ledger
    renderHistoryLedger();
}

function renderQRCode(text) {
    const qrContainer = document.getElementById("passQRCode");
    if (!qrContainer) return;
    qrContainer.innerHTML = "";

    if (typeof QRCode !== "undefined") {
        new QRCode(qrContainer, {
            text: `CHAI-CHARCHA-MEMBER:${text}`,
            width: 68,
            height: 68,
            colorDark: "#1c130d",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.M
        });
    } else {
        qrContainer.innerHTML = `<div style="font-size:10px;text-align:center;color:#1c130d;font-weight:bold;padding-top:14px;">[QR: ${text}]</div>`;
    }
}

/* ================= 4. DIGITAL STAMP CARD ================= */
function renderStampCard() {
    const stampContainer = document.getElementById("stampSlotsGrid");
    const stampCountBadge = document.getElementById("stampCountBadge");
    if (!stampContainer) return;

    stampContainer.innerHTML = "";
    const totalSlots = CAFE_CONFIG.rules.stampsNeededForFreeDrink;
    const userStamps = activeMember.stamps || 0;

    if (stampCountBadge) {
        stampCountBadge.textContent = `${userStamps} of ${totalSlots} Stamps`;
    }

    for (let i = 1; i <= totalSlots; i++) {
        const isStamped = i <= userStamps;
        const isFreeSlot = i === totalSlots;

        const slot = document.createElement("div");
        slot.className = `stamp-slot ${isStamped ? "stamped" : ""} ${isFreeSlot ? "free-reward" : ""}`;

        slot.innerHTML = `
            <div class="stamp-icon">${isStamped ? (isFreeSlot ? "🎉" : "☕") : (isFreeSlot ? "🎁" : "○")}</div>
            <div class="stamp-number">${isFreeSlot ? "FREE DRINK" : `Stamp #${i}`}</div>
        `;

        slot.title = isStamped ? `Stamp #${i} Collected` : `Order ₹120+ beverage to unlock Stamp #${i}`;
        stampContainer.appendChild(slot);
    }
}

/* ================= 5. TRANSACTION HISTORY LEDGER ================= */
function renderHistoryLedger() {
    const tbody = document.getElementById("historyTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";
    if (!activeMember.history || activeMember.history.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:16px;">No recent transactions recorded.</td></tr>`;
        return;
    }

    activeMember.history.slice(-5).reverse().forEach(tx => {
        const tr = document.createElement("tr");
        const isCredit = tx.coinsEarned > 0;
        tr.innerHTML = `
            <td><strong>${tx.id}</strong><div style="font-size:0.7rem;color:var(--text-muted);">${tx.date}</div></td>
            <td>${tx.note || "Cafe Dine-in"}</td>
            <td>₹${tx.amount || 0}</td>
            <td class="${isCredit ? 'tag-credit' : 'tag-debit'}">
                ${isCredit ? `+${tx.coinsEarned} Coins` : `-${tx.coinsUsed} Coins`}
            </td>
        `;
        tbody.appendChild(tr);
    });
}

/* ================= 6. CAFE MENU FILTER & RENDERER ================= */
function initMenuFilterTabs() {
    const filterButtons = document.querySelectorAll(".menu-filter-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const category = btn.getAttribute("data-category");
            activeMenuCategory = category;
            renderMenu(category);
        });
    });
}

function renderMenu(category = "All") {
    const menuGrid = document.getElementById("menuGrid");
    if (!menuGrid) return;

    menuGrid.innerHTML = "";
    const itemsToRender = (category === "All")
        ? CAFE_MENU
        : CAFE_MENU.filter(item => item.category === category);

    itemsToRender.forEach(item => {
        const card = document.createElement("div");
        card.className = "menu-card";
        card.innerHTML = `
            <div class="menu-card-img-wrap">
                <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="handleImgError(this, '${item.category}')" />
                <span class="menu-item-badge">${item.badge}</span>
            </div>
            <div class="menu-card-body">
                <div>
                    <span class="menu-category">${item.category}</span>
                    <div class="menu-title-row">
                        <h4>${item.name}</h4>
                        <span class="menu-price">₹${item.price}</span>
                    </div>
                    <p class="menu-desc">${item.desc}</p>
                </div>
                <div class="menu-card-footer">
                    <span class="loyalty-perk-hint">🪙 Earns +${item.points} Coins</span>
                    <button class="btn-add-order" onclick="quickAddToTerminal('${item.name}', ${item.price})">Bill in POS ＋</button>
                </div>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

window.quickAddToTerminal = function (itemName, price) {
    const billInput = document.getElementById("posBillAmount");
    const notesInput = document.getElementById("posItemNotes");
    if (billInput) {
        const cur = parseFloat(billInput.value) || 0;
        billInput.value = cur + price;
    }
    if (notesInput) {
        const curNotes = notesInput.value ? notesInput.value + ", " : "";
        notesInput.value = curNotes + itemName;
    }
    showToast(`Added "${itemName}" (₹${price}) to Billing Desk`);

    const terminalSec = document.getElementById("terminalSection");
    if (terminalSec) {
        terminalSec.scrollIntoView({ behavior: "smooth" });
    }
    calculatePOSPreview();
};

/* ================= 7. REWARDS STORE & 1-CLICK REDEEM ================= */
function renderRewardsStore() {
    const rewardsGrid = document.getElementById("rewardsGrid");
    if (!rewardsGrid) return;

    rewardsGrid.innerHTML = "";
    REWARDS_CATALOGUE.forEach((reward, index) => {
        const card = document.createElement("div");
        card.className = `reward-card ${index === 0 ? "featured" : ""}`;

        let iconSymbol = "🎁";
        if (reward.id === "rew-1") iconSymbol = "🏷️";
        if (reward.id === "rew-2") iconSymbol = "☕";
        if (reward.id === "rew-3") iconSymbol = "🍹";
        if (reward.id === "rew-4") iconSymbol = "🍕";
        if (reward.id === "rew-5") iconSymbol = "🎂";

        card.innerHTML = `
            ${index === 0 ? '<div class="reward-ribbon">POPULAR CHOICE</div>' : ''}
            <div>
                <div class="reward-head">
                    <div class="reward-icon-wrap">${iconSymbol}</div>
                    <div class="reward-info">
                        <h4>${reward.title}</h4>
                        <span class="survey-insight-badge">✨ ${reward.surveySupport}</span>
                    </div>
                </div>
                <p class="reward-desc">${reward.desc}</p>
            </div>
            <div class="reward-foot">
                <div class="reward-cost">
                    <span class="cost-coins">${reward.costCoins}</span>
                    <span class="cost-lbl">Charcha Coins</span>
                </div>
                <button class="btn-redeem" onclick="redeemReward('${reward.id}')">Redeem Now</button>
            </div>
        `;
        rewardsGrid.appendChild(card);
    });
}

window.redeemReward = function (rewardId) {
    const reward = REWARDS_CATALOGUE.find(r => r.id === rewardId);
    if (!reward) return;

    if (activeMember.coins < reward.costCoins) {
        showToast(`Insufficient balance! You need ${reward.costCoins} coins, but have ${activeMember.coins}.`, "error");
        return;
    }

    activeMember.coins -= reward.costCoins;
    const voucherCode = `CC-${rewardId.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    activeMember.history.push({
        id: `TX-${Date.now().toString().slice(-4)}`,
        date: "Today",
        type: "Redemption",
        amount: 0,
        coinsUsed: reward.costCoins,
        note: `Redeemed: ${reward.title} (${voucherCode})`
    });

    activeMember.activeVouchers.push({
        id: voucherCode,
        title: reward.title,
        code: voucherCode,
        discount: reward.title,
        expires: "30 Days from today",
        used: false
    });

    triggerConfetti();
    renderActiveMemberProfile();
    showVoucherModal(reward, voucherCode);
    showToast(`🎉 Congratulations! Redeemed ${reward.title}`);
};

function showVoucherModal(reward, code) {
    const modal = document.getElementById("voucherModal");
    const body = document.getElementById("voucherModalBody");
    if (!modal || !body) return;

    body.innerHTML = `
        <div style="text-align:center;padding:10px 0;">
            <div style="font-size:3rem;margin-bottom:8px;">🎉</div>
            <h3 style="font-size:1.3rem;font-weight:800;color:var(--bg-dark);">${reward.title}</h3>
            <p style="font-size:0.85rem;color:var(--text-muted);margin:6px 0 16px;">Voucher credited to <strong>${activeMember.name}</strong></p>
            
            <div style="background:#ffedd5;border:2px dashed #ea580c;border-radius:12px;padding:16px;margin-bottom:18px;">
                <div style="font-size:0.75rem;color:#9a3412;font-weight:700;text-transform:uppercase;">Present at Billing Counter</div>
                <div style="font-size:1.6rem;font-weight:900;letter-spacing:2px;color:#c2410c;font-family:monospace;margin:6px 0;">${code}</div>
                <div style="font-size:0.75rem;color:#7c2d12;">Valid across Ludhiana, Chandigarh & Delhi outlets</div>
            </div>

            <button class="btn-primary-glow" style="width:100%;justify-content:center;" onclick="closeModal('voucherModal')">Got It, Save in Wallet</button>
        </div>
    `;
    modal.classList.add("active");
}

/* ================= 8. CASHIER / ADMIN BILLING TERMINAL ================= */
function initTerminal() {
    updateCashierMemberSelect();

    const billInput = document.getElementById("posBillAmount");
    const memberSelect = document.getElementById("posMemberSelect");
    const processBtn = document.getElementById("posProcessBtn");

    if (billInput) {
        billInput.addEventListener("input", calculatePOSPreview);
    }
    if (memberSelect) {
        memberSelect.addEventListener("change", (e) => {
            const memberId = e.target.value;
            if (memberId) {
                switchActiveMember(memberId);
            }
            calculatePOSPreview();
        });
    }

    if (processBtn) {
        processBtn.addEventListener("click", processCashierBill);
    }

    calculatePOSPreview();
}

function updateCashierMemberSelect() {
    const select = document.getElementById("posMemberSelect");
    if (!select) return;

    select.innerHTML = "";
    currentMembers.forEach(m => {
        const opt = document.createElement("option");
        opt.value = m.id;
        opt.textContent = `${m.name} (${m.phone}) - Bal: ${m.coins} Coins`;
        if (m.id === activeMember.id) opt.selected = true;
        select.appendChild(opt);
    });
}

function calculatePOSPreview() {
    const billInput = document.getElementById("posBillAmount");
    const previewBox = document.getElementById("posReceiptPreview");
    if (!previewBox) return;

    const rawBill = parseFloat(billInput ? billInput.value : 0) || 0;
    const earnRate = CAFE_CONFIG.rules.pointsEarnRate;
    const coinsToEarn = Math.floor(rawBill * earnRate);
    const eligibleForStamp = rawBill >= CAFE_CONFIG.rules.minBillForStamp;

    let discountApplied = 0;
    let promoNote = "Standard Pricing";

    // Auto apply spending target discount (spend >= ₹600 -> ₹120 off)
    if (rawBill >= CAFE_CONFIG.rules.spendingTargetDiscount.spendThreshold) {
        discountApplied = CAFE_CONFIG.rules.spendingTargetDiscount.discountAmount;
        promoNote = "Flat ₹120 Group Dine-In Discount Applied";
    }

    const netPayable = Math.max(0, rawBill - discountApplied);

    previewBox.innerHTML = `
------------------------------------------------
         CHAI & CHARCHA CAFE & ROASTERY
       GSTIN: 03AAAAA0000A1Z5 • Ludhiana Flagship
------------------------------------------------
Date: ${new Date().toLocaleDateString('en-IN')} ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
Customer: ${activeMember.name} (${activeMember.id})
Tier Status: ${activeMember.tier}
------------------------------------------------
Gross Subtotal:               ₹${rawBill.toFixed(2)}
Loyalty Discount:            -₹${discountApplied.toFixed(2)}
------------------------------------------------
NET PAYABLE (INR):            ₹${netPayable.toFixed(2)}
------------------------------------------------
REWARDS SUMMARY:
+ Charcha Coins Earned:       +${coinsToEarn} Coins (10% cashback)
+ Digital Stamp Added:        ${eligibleForStamp ? '+1 Stamp (Total: ' + (activeMember.stamps + 1) + '/8)' : 'None (Min ₹120 required)'}
Applied Privilege: ${promoNote}
------------------------------------------------
       THANK YOU FOR DINING AT CHAI & CHARCHA!
`;
}

function processCashierBill() {
    const billInput = document.getElementById("posBillAmount");
    const rawBill = parseFloat(billInput ? billInput.value : 0) || 0;

    if (rawBill <= 0) {
        showToast("Please enter a valid bill amount greater than ₹0", "error");
        return;
    }

    const earnRate = CAFE_CONFIG.rules.pointsEarnRate;
    let discountApplied = 0;
    if (rawBill >= CAFE_CONFIG.rules.spendingTargetDiscount.spendThreshold) {
        discountApplied = CAFE_CONFIG.rules.spendingTargetDiscount.discountAmount;
    }
    const netAmount = Math.max(0, rawBill - discountApplied);
    const coinsEarned = Math.floor(netAmount * earnRate);
    const eligibleForStamp = rawBill >= CAFE_CONFIG.rules.minBillForStamp;

    activeMember.coins += coinsEarned;
    activeMember.totalSpent += netAmount;
    activeMember.visitsCount += 1;

    let stampsAdded = 0;
    if (eligibleForStamp) {
        if (activeMember.stamps < CAFE_CONFIG.rules.stampsNeededForFreeDrink) {
            activeMember.stamps += 1;
            stampsAdded = 1;
        } else {
            activeMember.stamps = 1;
            stampsAdded = 1;
        }
    }

    activeMember.history.push({
        id: `TX-${Date.now().toString().slice(-4)}`,
        date: "Today",
        type: "Order",
        amount: netAmount,
        coinsEarned: coinsEarned,
        stampsEarned: stampsAdded,
        note: `Counter Bill • Paid ₹${netAmount}`
    });

    if (activeMember.totalSpent >= 5000 && activeMember.tier !== "Platinum Club Elite") {
        activeMember.tier = "Platinum Club Elite";
        showToast(`🎖️ Elite Milestone: ${activeMember.name} upgraded to Platinum Club Elite!`);
    } else if (activeMember.totalSpent >= 2500 && activeMember.tier === "Silver Member") {
        activeMember.tier = "Gold Baithak Member";
        showToast(`🎖️ ${activeMember.name} upgraded to Gold Baithak Member!`);
    }

    if (billInput) billInput.value = "";
    const notesInput = document.getElementById("posItemNotes");
    if (notesInput) notesInput.value = "";

    triggerConfetti();
    renderActiveMemberProfile();
    updateCashierMemberSelect();
    calculatePOSPreview();

    showToast(`✅ Bill of ₹${netAmount} settled! +${coinsEarned} coins & ${stampsAdded} stamp credited to ${activeMember.name}.`);
}

/* ================= 9. LIVE REWARDS & SAVINGS CALCULATOR ================= */
function initLiveSavingsCalculator() {
    const slider = document.getElementById("calcSpendSlider");
    const spendDisplay = document.getElementById("calcSpendDisplay");
    const coinsResult = document.getElementById("calcCoinsResult");
    const discountResult = document.getElementById("calcDiscountResult");
    const stampResult = document.getElementById("calcStampResult");
    const netSavings = document.getElementById("calcNetSavings");

    if (!slider) return;

    function updateCalculator() {
        const spend = parseInt(slider.value, 10);
        if (spendDisplay) spendDisplay.textContent = `₹${spend}`;

        // Coins (10%)
        const coins = Math.floor(spend * 0.10);
        if (coinsResult) coinsResult.textContent = `+${coins} Coins (₹${coins})`;

        // Target spend discount
        let instantDiscount = 0;
        if (spend >= 600) {
            instantDiscount = 120;
        }
        if (discountResult) discountResult.textContent = instantDiscount > 0 ? `₹${instantDiscount} Flat OFF` : `None (Unlocked at ₹600)`;

        // Stamp
        const stamps = spend >= 120 ? Math.min(3, Math.floor(spend / 120)) : 0;
        if (stampResult) stampResult.textContent = `${stamps} Stamp${stamps > 1 ? 's' : ''}`;

        // Total benefit value
        const totalValue = coins + instantDiscount + (stamps > 0 ? stamps * 25 : 0);
        if (netSavings) netSavings.textContent = `₹${totalValue} Total Value`;
    }

    slider.addEventListener("input", updateCalculator);
    updateCalculator();
}

/* ================= 10. BUSINESS INSIGHTS CHARTS (PULSE & METRICS) ================= */
function initBusinessCharts() {
    if (typeof Chart === "undefined") {
        console.warn("Chart.js not loaded. Skipping charts.");
        return;
    }

    // Chart 1: Member Reward Preference Breakdown
    const ctxReward = document.getElementById("chartRewardFormat");
    if (ctxReward) {
        businessCharts.reward = new Chart(ctxReward, {
            type: "bar",
            data: {
                labels: ["Spending Target Discount (35%)", "Digital Stamp Card (20%)", "Birthday VIP Perks (15%)", "Cashback Coins (10%)", "Free Item Vouchers (10%)"],
                datasets: [{
                    label: "% of Members",
                    data: [35, 20, 15, 10, 10],
                    backgroundColor: "#c2410c",
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true, max: 40, ticks: { callback: v => v + "%" } }
                }
            }
        });
    }

    // Chart 2: Customer Visit Motivations
    const ctxReason = document.getElementById("chartVisitReasons");
    if (ctxReason) {
        businessCharts.reason = new Chart(ctxReason, {
            type: "doughnut",
            data: {
                labels: COMMUNITY_METRICS.visitMotivations.labels,
                datasets: [{
                    data: COMMUNITY_METRICS.visitMotivations.counts,
                    backgroundColor: ["#ea580c", "#d97706", "#f59e0b", "#fbbf24", "#fcd34d"],
                    borderWidth: 2,
                    borderColor: "#ffffff"
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 10 } } }
                }
            }
        });
    }

    // Chart 3: Member Satisfaction Level (90% Positive)
    const ctxSatisfaction = document.getElementById("chartSatisfactionLevel");
    if (ctxSatisfaction) {
        businessCharts.satisfaction = new Chart(ctxSatisfaction, {
            type: "pie",
            data: {
                labels: COMMUNITY_METRICS.memberSatisfaction.labels,
                datasets: [{
                    data: COMMUNITY_METRICS.memberSatisfaction.counts,
                    backgroundColor: ["#15803d", "#22c55e", "#94a3b8", "#cbd5e1"],
                    borderWidth: 2,
                    borderColor: "#ffffff"
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 } } }
                }
            }
        });
    }

    // Chart 4: Preferred Access Channels
    const ctxChannels = document.getElementById("chartAccessChannels");
    if (ctxChannels) {
        businessCharts.channels = new Chart(ctxChannels, {
            type: "bar",
            data: {
                labels: ["Mobile Website & QR (70%)", "WhatsApp Alerts (20%)", "Physical Pass (10%)"],
                datasets: [{
                    label: "Preferred Mode",
                    data: [70, 20, 10],
                    backgroundColor: "#9a3412",
                    borderRadius: 6
                }]
            },
            options: {
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { beginAtZero: true, max: 80, ticks: { callback: v => v + "%" } }
                }
            }
        });
    }
}

/* ================= 12. UPPER HOMEPAGE REVIEWS & FEEDBACK ================= */
function renderReviews() {
    const container = document.getElementById("reviewsGridContainer");
    if (!container) return;

    container.innerHTML = "";
    CUSTOMER_REVIEWS.forEach(rev => {
        const card = document.createElement("div");
        card.className = "review-card";
        card.innerHTML = `
            <div>
                <div class="review-stars">
                    ${'★'.repeat(rev.rating)}
                </div>
                <p class="review-quote">"${rev.quote}"</p>
            </div>
            <div class="review-author">
                <div class="author-avatar">${rev.name.charAt(0)}</div>
                <div class="author-meta">
                    <h5>${rev.name} <span style="font-size:0.7rem;color:#7c2d12;">(${rev.city})</span></h5>
                    <span>✓ Verified Club Member • ${rev.favItem}</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

let selectedRating = 5;
function initReviewForm() {
    const starSpans = document.querySelectorAll("#starPicker span");
    starSpans.forEach(span => {
        span.addEventListener("click", () => {
            selectedRating = parseInt(span.getAttribute("data-val"), 10);
            starSpans.forEach(s => {
                const val = parseInt(s.getAttribute("data-val"), 10);
                s.style.opacity = val <= selectedRating ? "1" : "0.3";
            });
        });
    });

    const submitBtn = document.getElementById("btnSubmitReview");
    if (submitBtn) {
        submitBtn.addEventListener("click", () => {
            const nameInput = document.getElementById("reviewAuthorName");
            const textInput = document.getElementById("reviewComment");
            const itemInput = document.getElementById("reviewFavDish");

            const authorName = nameInput ? nameInput.value.trim() : "";
            const comment = textInput ? textInput.value.trim() : "";
            const dish = itemInput && itemInput.value.trim() ? itemInput.value.trim() : "Special Ginger Kulhad Chai";

            if (!authorName || !comment) {
                showToast("Please enter your name and a brief review message", "error");
                return;
            }

            CUSTOMER_REVIEWS.unshift({
                id: `rev-${Date.now()}`,
                name: authorName,
                city: "Ludhiana Flagship",
                rating: selectedRating,
                quote: comment,
                favItem: dish,
                date: "Just now"
            });

            renderReviews();
            triggerConfetti();

            if (nameInput) nameInput.value = "";
            if (textInput) textInput.value = "";
            showToast("🎉 Thank you for your feedback! Review published live.");
        });
    }
}

window.orderGingerChai = function () {
    quickAddToTerminal("Special Ginger Cardamom Kulhad Chai", 90);
};

/* ================= 11. MODAL, TOAST & CONFETTI HELPERS ================= */
window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("active");
};

function showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    if (type === "error") {
        toast.style.borderLeftColor = "#dc2626";
    }
    toast.innerHTML = `<span>${type === 'error' ? '⚠️' : '✨'}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(20px)";
        toast.style.transition = "all 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 3800);
}

function triggerConfetti() {
    if (typeof confetti === "function") {
        confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
            colors: ["#c2410c", "#d97706", "#f59e0b", "#15803d"]
        });
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
