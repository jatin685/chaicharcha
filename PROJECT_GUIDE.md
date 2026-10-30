# Chai & Charcha Cafe & Roastery
## Customer Loyalty & Rewards Management System
**Academic Project Type:** Interdisciplinary MBA & BCA Collaborative Project  
**Institution:** Punjab College of Technical Education (PCTE), Ludhiana  
**MBA Course:** Organisational Behaviour and Design (Semester III)  
**Developer (BCA):** Jatin Dubey (Roll No: 2445463)  
**MBA Research Partner:** Jasmeet Kaur (Roll No: 2525430)  
**Faculty Guide:** Ms. Shivangi Singh, Assistant Professor, Business Management  

---

### 1. Suggested Brand Name & Positioning
Instead of *Sip n' Petals*, this project introduces:
> **"Chai & Charcha Cafe & Roastery"**  
> *Artisanal Kaapi, Kulhad Chai, Gourmet Pizzas & Fresh Mojito Bar*

#### Why this name?
* **Deep Cultural Relevance:** *"Charcha"* (meaning engaging conversation, community gathering, and warm discussion) perfectly matches the primary finding in Section 5.3 of the research report, where **25% of respondents visit cafes to meet friends or family**.
* **Authentic Indian Identity & Diverse Menu:** Balances traditional Indian chai culture (*Assam ginger kulhad chai, Kashmiri saffron kahwa*) with specialty espresso (*Mysuru degree filter kaapi, cold brew with lotus biscoff*), wood-fired sourdough pizzas (*Paneer Tikka, Margherita*), and chilled botanical mocktails (*Virgin Mint Lime Mojito, Jamun Masala Fizz*).
* **High Brand Memorability:** Chic, welcoming, and memorable across metropolitan and tier-1/tier-2 Indian cities (Ludhiana, Chandigarh, Delhi NCR).

---

### 2. Implemented Modules & Technical Architecture

| Project Module | Minimum Prototype Requirement | How It Is Implemented |
| :--- | :--- | :--- |
| **Customer Landing Page** | Mobile-friendly layout with animated food & cafe pictures | Responsive single-page web app with animated steam particles rising over kulhad cups, floating animated snack badges, and hero stats. |
| **Visual Gourmet Showcase** | High-definition professional photography for Coffee, Pizzas, Mojitos, Chai | Dedicated visual cards with image tags, descriptions, and loyalty coin earn rates. |
| **Menu Filter System** | Easy browsing across diverse categories | Interactive category filter tabs (All, Kulhad Chai, Artisanal Coffee, Wood-Fired Pizzas, Fresh Mojitos, Bites). |
| **Member Identity** | Demo member ID; avoid collecting unnecessary personal data | 1-click Demo Account Switcher (`Jatin - CC-8421`, `Aarav Sharma - CC-5520`, `Simran Preet - CC-9912`) and instant mobile lookup. |
| **QR Access** | QR code opens the responsive website / scans at cashier | Dynamic QR generator (powered by QRCode.js) updating in real-time per member. |
| **Rewards Dashboard** | Show points/stamps balance and available rewards | Live Charcha Coins balance with instant ₹ INR value conversion and tier tracking (Silver, Gold, Platinum). |
| **Digital Stamp Card** | Reward after a set number of visits (20% survey preference) | 8-slot interactive digital stamp card ("Buy 7 Beverages, 8th is 100% Free") with stamp pop animations. |
| **Offers & Target Discounts** | Configurable reward rules, spending target discounts (35% survey top choice) | Flat ₹120 OFF on orders above ₹600, combo vouchers, birthday perks, and 1-click claim modal with canvas confetti. |
| **Cashier POS Desk** | Record qualifying purchases and reward credits | Complete staff billing console with automated discount application, coin earning (10%), stamp increments, and digital thermal receipt generation. |
| **Survey Insights Dashboard** | Show anonymised counts and charts from the survey (n=20) | 4 live interactive Chart.js charts rendering all empirical data points from Section 5.1 to Section 5.13 of the project report. |
| **Privacy & Trust** | Privacy note and optional marketing consent | Addresses the #1 customer barrier (35% privacy concern) with zero-spam pledge and minimal data collection. |
| **Acceptance Testing** | Automated test verification as specified in Section 7.2 | Interactive test runner that executes 6 acceptance tests with live status indicators. |

---

### 3. File Directory Structure
```
chai-charcha-loyalty/
├── index.html        # Semantic, mobile-first HTML5 layout
├── style.css         # Warm Indian cafe design system, animations
├── data.js           # Menu, rewards, members, reviews, survey dataset
├── app.js            # State management, POS terminal, QR, Chart.js
├── README.md         # Overview
└── PROJECT_GUIDE.md  # This documentation
```

---

### 4. How to Open and Present the Prototype
1. Keep all four files (`index.html`, `style.css`, `data.js`, `app.js`) in the **same folder**.
2. Double-click **`index.html`** to open it in Chrome, Edge or any modern browser.
3. No build step or server is needed. An internet connection is needed only for fonts, photos, QR code, charts and confetti libraries (CDN).
