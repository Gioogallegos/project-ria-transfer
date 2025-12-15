# Ria Intern Project - [PROJECT-RIA-TRANSFER]

## Project Overview
This is my submission for the Ria Software Engineer Intern challenge. It is a **Currency Exchange Dashboard** built with **Next.js 14 (App Router)** and **TypeScript**.

The goal was to create a clean, responsive application where users can convert amounts between different currencies and see real-time exchange rates.

### 🛠 Tech Stack
* **Framework:** Next.js 14
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **API:** Frankfurter API

---

## 🚀 How to Run the Project

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_GITHUB_REPO_LINK]
    cd ria-challenge
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💡 Innovation Feature: 24h Trend Indicator

For the bonus task, I thought about what I actually look for when I need to send money. I usually ask myself: *"Is the rate better or worse than yesterday?"*

So, I implemented a **Trend Indicator**.
* **What it does:** Beside each currency card, there is an arrow and a percentage.
* **Green Arrow:** The currency value went up compared to yesterday.
* **Red Arrow:** The currency value went down.
* **Why:** This gives immediate context to the user, helping them decide if they should transfer money now or wait.

---

## 🤖 AI Usage Explanation

Per the instructions, here is how I used AI tools (ChatGPT/Gemini) during development:

1.  **Boilerplate & Config:** I used it to quickly generate the initial `types` interfaces for the Frankfurter API response, so I wouldn't have to type them manually from the documentation.
2.  **Styling Components:** I asked for help creating the `SkeletonCard` component using Tailwind classes to make the loading state look smooth.
3.  **Debugging:** I had a specific bug where the input field was showing a "0" stuck on the left side or throwing `NaN` errors. I used AI to help me refine the `handleAmountChange` logic to handle empty strings and numbers correctly.

*All the core logic (hooks, state management, and component structure) was implemented and reviewed by me.*

---

## 📝 Assumptions & Trade-offs

* **Weekend Rates:** The Frankfurter API relies on ECB data, which updates on working days. If you check the dashboard on a weekend, the "Trend Indicator" might show `0.00%` difference because the "today" and "yesterday" rates are effectively the same (Friday's close).
* **Currency Selection:** The requirements asked for major currencies. Since the API doesn't support CLP (Chilean Peso), I added **MXN** and **BRL** to the list to represent the LATAM market, which is important for Ria.
* **Client-Side Fetching:** For this size of project, I used a custom hook (`useRates`) with `useEffect` to fetch data on the client side. In a larger production app, I would probably move this data fetching to the server side (Server Components) for better performance.

## 🔮 Future Improvements

If I had more time, I would:
* Add a small line chart to visualize the history of the last 30 days.
* Implement a "Swap" animation so the currencies switch places smoothly.
* Add better support for weekend dates in the logic.

---

**Thanks for reviewing my code!**