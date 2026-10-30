/**
 * Chai & Charcha Cafe & Roastery - Customer Loyalty & Rewards Management System
 * Production Brand Configuration, Menu Dataset & Customer Loyalty Engine
 * Founder & Hospitality Lead: Jatin
 */

const CAFE_CONFIG = {
    brandName: "Chai & Charcha",
    brandTagline: "Artisanal Kaapi, Kulhad Chai, Wood-Fired Pizzas & Mojito Bar",
    founder: "Jatin",
    currency: "₹",
    branches: [
        { id: "ldh-mt", name: "Model Town Flagship, Ludhiana", city: "Punjab", contact: "+91 98765-43210" },
        { id: "chd-sec35", name: "Sector 35-C, Chandigarh", city: "UT", contact: "+91 98765-43211" },
        { id: "del-cp", name: "Connaught Place, New Delhi", city: "Delhi NCR", contact: "+91 98765-43212" }
    ],
    rules: {
        pointsEarnRate: 0.10, // 10% cashback in Charcha Coins (₹100 spend = 10 Coins)
        coinValueInINR: 1.00, // 1 Charcha Coin = ₹1.00 discount
        stampsNeededForFreeDrink: 8, // Buy 7 beverages, 8th is 100% FREE
        minBillForStamp: 120, // Min ₹120 beverage to earn 1 stamp
        spendingTargetDiscount: {
            spendThreshold: 600,
            discountAmount: 120, // Instant ₹120 discount on orders >= ₹600
            label: "Flat ₹120 OFF on orders above ₹600"
        }
    }
};

// Registered Demo VIP Members
const INITIAL_MEMBERS = [
    {
        id: "CC-8421",
        phone: "9876543210",
        name: "Jatin",
        joinedDate: "12 Oct 2026",
        tier: "Platinum Club Elite",
        coins: 480,
        stamps: 6, // 6 out of 8 collected
        totalSpent: 6250,
        visitsCount: 14,
        preferredItem: "Special Ginger Kulhad Chai & Paneer Pizza",
        whatsappConsent: true,
        history: [
            { id: "TX-109", date: "Today", type: "Order", amount: 620, coinsEarned: 62, stampsEarned: 1, note: "Wood-Fired Paneer Tikka Pizza + Mint Mojito" },
            { id: "TX-104", date: "Yesterday", type: "Redemption", amount: 0, coinsUsed: 120, note: "Redeemed: Flat ₹120 Off Group Dine-in Voucher" },
            { id: "TX-098", date: "24 Oct 2026", type: "Order", amount: 350, coinsEarned: 35, stampsEarned: 1, note: "Mysuru Degree Filter Kaapi + Samosa Croissant" }
        ],
        activeVouchers: [
            { id: "VOUCH-35OFF", title: "Founder's VIP Welcome Perk", code: "CHARCHA35", discount: "35% OFF", minSpend: 250, expires: "30 Nov 2026", used: false }
        ]
    },
    {
        id: "CC-5520",
        phone: "9812345678",
        name: "Aarav Sharma",
        joinedDate: "18 Oct 2026",
        tier: "Gold Baithak Member",
        coins: 210,
        stamps: 4,
        totalSpent: 2800,
        visitsCount: 6,
        preferredItem: "Artisanal Velvet Cappuccino & Virgin Mojito",
        whatsappConsent: true,
        history: [
            { id: "TX-088", date: "26 Oct 2026", type: "Order", amount: 380, coinsEarned: 38, stampsEarned: 1, note: "Hazelnut Cold Brew + Classic Mojito" }
        ],
        activeVouchers: []
    },
    {
        id: "CC-9912",
        phone: "9988776655",
        name: "Simran Preet",
        joinedDate: "20 Oct 2026",
        tier: "Gold Baithak Member",
        coins: 360,
        stamps: 7, // 1 stamp away from FREE drink
        totalSpent: 4900,
        visitsCount: 11,
        preferredItem: "Kashmiri Kahwa & Margherita Pizza",
        whatsappConsent: true,
        history: [
            { id: "TX-120", date: "28 Oct 2026", type: "Order", amount: 590, coinsEarned: 59, stampsEarned: 1, note: "Royal Kahwa Pot + San Marzano Margherita" }
        ],
        activeVouchers: [
            { id: "VOUCH-FREE-DRINK", title: "VIP Stamp Reward Unlocked", code: "FREEDRINK8", discount: "100% OFF Any Chai or Coffee", minSpend: 0, expires: "15 Dec 2026", used: false }
        ]
    }
];

// Verified Professional Food & Beverage Menu Items with Backup High-Res Images
const CAFE_MENU = [
    // 1. CHAI & TEAS
    {
        id: "item-1",
        name: "Desi Kulhad Masala Chai",
        category: "Chai",
        price: 90,
        points: 9,
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=700&q=80",
        backupImage: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=80",
        desc: "Slow-brewed Assam leaves infused with fresh ginger, cardamom, cinnamon in an authentic clay kulhad.",
        badge: "Bestseller ⭐"
    },
    {
        id: "item-2",
        name: "Royal Kashmiri Saffron Kahwa",
        category: "Chai",
        price: 160,
        points: 16,
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=80",
        backupImage: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=700&q=80",
        desc: "Exotic green tea steeped with pure Kashmiri saffron threads, cinnamon, crushed almonds and cardamom.",
        badge: "Royal Special"
    },
    {
        id: "item-3",
        name: "Cutting Cardamom Ginger Chai",
        category: "Chai",
        price: 80,
        points: 8,
        image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=700&q=80",
        backupImage: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=80",
        desc: "Mumbai tapri style robust adrak-elaichi milk chai poured piping hot into classic glasses.",
        badge: "All-Day Classic"
    },

    // 2. COFFEE
    {
        id: "item-4",
        name: "Artisanal Velvet Cappuccino",
        category: "Coffee",
        price: 180,
        points: 18,
        image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=700&q=80",
        backupImage: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80",
        desc: "Double shot of single-origin Arabica espresso with micro-textured velvety milk foam and barista latte art.",
        badge: "Barista Special"
    },
    {
        id: "item-5",
        name: "Mysuru Degree Filter Kaapi",
        category: "Coffee",
        price: 110,
        points: 11,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80",
        backupImage: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=700&q=80",
        desc: "Authentic 80:20 chicory plantation blend frothed high in traditional South Indian brass tumbler & davarah.",
        badge: "South Origin"
    },
    {
        id: "item-6",
        name: "Lotus Biscoff Iced Cold Brew",
        category: "Coffee",
        price: 240,
        points: 24,
        image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=700&q=80",
        backupImage: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80",
        desc: "18-hour steeped cold brew crowned with Belgian cookie butter sweet foam and caramelized biscuit crumbs.",
        badge: "Trending 🔥"
    },

    // 3. GOURMET PIZZAS
    {
        id: "item-7",
        name: "Wood-Fired Paneer Tikka Pizza",
        category: "Pizzas",
        price: 340,
        points: 34,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80",
        backupImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80",
        desc: "Tandoori marinated cottage cheese cubes, charred bell peppers, red onions, mozzarella on hand-stretched sourdough.",
        badge: "Desi Fusion Pizza"
    },
    {
        id: "item-8",
        name: "Classic San Marzano Margherita",
        category: "Pizzas",
        price: 290,
        points: 29,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80",
        backupImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80",
        desc: "Crushed San Marzano tomatoes, fresh buffalo mozzarella, aromatic sweet basil leaves, and extra virgin olive oil drizzle.",
        badge: "Italian Favorite"
    },
    {
        id: "item-9",
        name: "Farmhouse Jalapeño & Mushroom Pizza",
        category: "Pizzas",
        price: 330,
        points: 33,
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=700&q=80",
        backupImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80",
        desc: "Sautéed button mushrooms, spicy Mexican jalapeños, sweet corn kernels, sun-dried tomatoes, and four-cheese blend.",
        badge: "Crowd Pleaser"
    },

    // 4. FRESH MOJITOS & COOLERS
    {
        id: "item-10",
        name: "Classic Virgin Mint Lime Mojito",
        category: "Mojitos",
        price: 150,
        points: 15,
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80",
        backupImage: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80",
        desc: "Fresh garden mint muddled with juicy key lime wedges, raw brown sugar cane syrup, and sparkling soda over crushed ice.",
        badge: "Summer Refresher"
    },
    {
        id: "item-11",
        name: "Spicy Jamun & Kala Khatta Mojito",
        category: "Mojitos",
        price: 170,
        points: 17,
        image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=700&q=80",
        backupImage: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80",
        desc: "Wild Indian blackberry reduction, roasted cumin, black salt (chaat masala), mint leaves, and chilled sparkling club soda.",
        badge: "Signature Desi Mojito"
    },
    {
        id: "item-12",
        name: "Passionfruit & Lemongrass Fizz",
        category: "Mojitos",
        price: 180,
        points: 18,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80",
        backupImage: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80",
        desc: "Tropical golden passionfruit nectar infused with aromatic crushed lemongrass stalks, fresh lime juice, and tonic.",
        badge: "Exotic Cooler"
    },

    // 5. QUICK BITES & DESSERTS
    {
        id: "item-13",
        name: "Amritsari Samosa Chaat Croissant",
        category: "Bites",
        price: 195,
        points: 20,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80",
        backupImage: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80",
        desc: "Flaky Parisian butter croissant stuffed with spiced potato-pea samosa filling, sweet tamarind & coriander mint chutney.",
        badge: "Signature Fusion"
    },
    {
        id: "item-14",
        name: "Irani Bun Maska with Jam",
        category: "Bites",
        price: 130,
        points: 13,
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80",
        backupImage: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80",
        desc: "Warm pillowy brioche bun lavishly spread with whipped salted butter and homemade mixed-berry jam.",
        badge: "Heritage Treat"
    },
    {
        id: "item-15",
        name: "Sizzling Belgian Chocolate Brownie",
        category: "Bites",
        price: 220,
        points: 22,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80",
        backupImage: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80",
        desc: "Dense dark fudge brownie served on a smoking cast-iron sizzler plate with vanilla gelato and warm chocolate fudge.",
        badge: "Decadent Dessert"
    }
];

// Verified Customer Reviews & Testimonials for Upper Home Page
const CUSTOMER_REVIEWS = [
    {
        id: "rev-1",
        name: "Priya Sharma",
        city: "Ludhiana",
        rating: 5,
        quote: "The Special Ginger Kulhad Chai is unmatched! Richly infused with crushed adrak and green cardamom in a natural earthen clay cup. Scanned my QR card and earned 10% Charcha Coins right away.",
        favItem: "Ginger Cardamom Kulhad Chai",
        date: "2 days ago"
    },
    {
        id: "rev-2",
        name: "Rohan Kapoor",
        city: "Chandigarh",
        rating: 5,
        quote: "The Wood-Fired Paneer Tikka Pizza paired with the Chilled Virgin Mint Mojito is phenomenal! Got an instant flat ₹120 discount on our group bill. Super transparent loyalty system.",
        favItem: "Paneer Tikka Pizza & Mint Mojito",
        date: "Yesterday"
    },
    {
        id: "rev-3",
        name: "Ananya Deshmukh",
        city: "Delhi NCR",
        rating: 5,
        quote: "Incredible cafe atmosphere for evening baithaks. The 8-stamp card is super convenient on the phone — I just unlocked my free drink without carrying any plastic card!",
        favItem: "Lotus Biscoff Cold Brew & Bun Maska",
        date: "3 days ago"
    }
];

// Catalogue of Available Loyalty Rewards to Claim
const REWARDS_CATALOGUE = [
    {
        id: "rew-1",
        title: "Flat ₹120 Group Spending Discount",
        category: "Target Discount",
        costCoins: 120,
        surveySupport: "Top Customer Choice • 35% Member Preference",
        desc: "Instant ₹120 deduction on dining bills above ₹600. Perfect for pizza parties, family baithaks & casual team meetups.",
        tag: "#1 Member Choice",
        icon: "badge-percent"
    },
    {
        id: "rew-2",
        title: "Free Handcrafted Chai or Coffee",
        category: "Free Item",
        costCoins: 100,
        surveySupport: "Earned via Digital Stamp Card • 100% Free",
        desc: "Redeem any handcrafted hot drink (Filter Kaapi, Velvet Cappuccino, or Special Kulhad Chai) with zero billing charge.",
        tag: "Instant Perk",
        icon: "coffee"
    },
    {
        id: "rew-3",
        title: "Free Chilled Virgin Mint Mojito",
        category: "Free Item",
        costCoins: 130,
        surveySupport: "Top Afternoon Refresher • 100% Free",
        desc: "Cool off with a complimentary Classic Virgin Mint Lime Mojito or Passionfruit Fizz on your next counter check-in.",
        tag: "Fresh Cooler",
        icon: "glass"
    },
    {
        id: "rew-4",
        title: "Flat ₹150 OFF on Wood-Fired Pizzas",
        category: "Food Perk",
        costCoins: 180,
        surveySupport: "Combo Treat Driver • Loved by 20% Members",
        desc: "Enjoy ₹150 off on any 10-inch hand-stretched pizza (Tandoori Paneer Tikka, San Marzano Margherita, or Farmhouse).",
        tag: "Gourmet Pizza Treat",
        icon: "pizza"
    },
    {
        id: "rew-5",
        title: "Birthday Month 25% Off + Brownie",
        category: "Personalised",
        costCoins: 50,
        surveySupport: "VIP Birthday Celebration Privilege",
        desc: "Celebrate your birthday month with 25% off entire table bill plus a complimentary sizzling dark chocolate brownie.",
        tag: "VIP Celebration",
        icon: "gift"
    }
];

// Live Community Pulse & Member Satisfaction Metrics (Transformed from Research Data into Business Intelligence)
const COMMUNITY_METRICS = {
    brand: "Chai & Charcha Cafe & Roastery",
    activeClubMembers: "2,400+",
    overallRating: 4.85,
    totalReviews: 840,
    repeatRetentionRate: "70%",

    // Member Preference Trends
    rewardPreferences: {
        labels: ["Spending Target Discount (35%)", "Digital Stamp Card (20%)", "Birthday / VIP Perks (15%)", "Cashback Coins (10%)", "Free Item Vouchers (10%)"],
        counts: [35, 20, 15, 10, 10]
    },
    visitMotivations: {
        labels: ["Coffee, Chai & Gourmet Food (30%)", "Meeting Friends & Baithaks (25%)", "Location & Work Ambience (20%)", "Quick Service (15%)", "Value for Money (10%)"],
        counts: [30, 25, 20, 15, 10]
    },
    memberSatisfaction: {
        labels: ["Very Satisfied", "Satisfied", "Neutral", "Others"],
        counts: [55, 35, 7, 3]
    },
    accessChannels: {
        labels: ["Mobile Web & QR Code (70%)", "WhatsApp Updates (20%)", "Physical Pass (10%)"],
        counts: [70, 20, 10]
    }
};
