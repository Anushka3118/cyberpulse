const btn = document.getElementById("scanBtn");
const resultDiv = document.getElementById("result");

btn.addEventListener("click", async () => {
  resultDiv.innerText = "🔍 Scanning current website...";

  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    const currentUrl = tab.url;

    // ✅ UPDATED BACKEND URL
    const res = await fetch("https://cyberpulse-duif.onrender.com/scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: currentUrl }),
    });

    const data = await res.json();

    resultDiv.innerText = data.result || "⚠️ No result from AI";

  } catch (err) {
    console.error(err);

    resultDiv.innerText =
      "❌ Error scanning.\n\n👉 Check:\n- Backend deployed?\n- URL correct?\n- CORS enabled?";
  }
});