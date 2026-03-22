const btn = document.getElementById("scanBtn");
const resultDiv = document.getElementById("result");

btn.addEventListener("click", async () => {
  resultDiv.innerText = "🔍 Scanning current website...";

  try {
    // ✅ get current tab
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    const currentUrl = tab.url;

    // ✅ correct backend URL + correct body
    const res = await fetch("http://localhost:5001/scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: currentUrl }), // 🔥 IMPORTANT FIX
    });

    const data = await res.json();

    // ✅ better formatted output
    resultDiv.innerText = data.result || "⚠️ No result from AI";

  } catch (err) {
    console.error(err);

    resultDiv.innerText =
      "❌ Error scanning.\n\n👉 Check:\n- Backend running?\n- Port correct?\n- CORS fixed?";
  }
});