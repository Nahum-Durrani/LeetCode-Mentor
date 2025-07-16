// content.js - Injects sidebar, handles UI, API key retrieval, and Gemini API call

// Utility: Check if on a LeetCode problem page
function isLeetCodeProblemPage() {
  return window.location.hostname === 'leetcode.com' && window.location.pathname.startsWith('/problems/');
}

// Utility: Extract problem title and description from the page
function getProblemDetails() {
  // LeetCode uses React, so DOM structure may change. This is a best-effort selector.
  const title = document.querySelector('h1')?.innerText || '';
  const description = document.querySelector('.content__u3I1.question-content__JfgR')?.innerText || '';
  return { title, description };
}

// Create sidebar UI
function createSidebar() {
  if (document.getElementById('lc-mentor-sidebar')) return; // Prevent duplicates
  const sidebar = document.createElement('div');
  sidebar.id = 'lc-mentor-sidebar';
  sidebar.innerHTML = `
    <div class="lc-mentor-header">LeetCode Mentor <button id="lc-mentor-toggle">–</button></div>
    <div id="lc-mentor-body">
      <button id="lc-mentor-hint-btn">Get Hint</button>
      <div id="lc-mentor-hint-area">AI hints will appear here.</div>
    </div>
  `;
  document.body.appendChild(sidebar);

  // Collapsible logic
  document.getElementById('lc-mentor-toggle').onclick = () => {
    const body = document.getElementById('lc-mentor-body');
    body.style.display = body.style.display === 'none' ? 'block' : 'none';
  };

  // Hint button logic
  document.getElementById('lc-mentor-hint-btn').onclick = async () => {
    const hintArea = document.getElementById('lc-mentor-hint-area');
    hintArea.textContent = 'Loading...';
    // Get API key from chrome.storage
    chrome.storage.sync.get(['geminiApiKey'], async (result) => {
      const apiKey = result.geminiApiKey;
      if (!apiKey) {
        hintArea.textContent = 'Please set your Gemini API key in the extension popup.';
        return;
      }
      const { title, description } = getProblemDetails();
      const prompt = `Give me a hint for this LeetCode problem: ${title}\n${description}`;
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }]
            })
          }
        );
        const data = await response.json();
        const hint = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No hint received.';
        hintArea.textContent = hint;
      } catch (e) {
        hintArea.textContent = 'Error fetching hint.';
      }
    });
  };
}

// Inject sidebar if on problem page
if (isLeetCodeProblemPage()) {
  createSidebar();
}

// Optionally, observe for SPA navigation (LeetCode is React-based)
const observer = new MutationObserver(() => {
  if (isLeetCodeProblemPage() && !document.getElementById('lc-mentor-sidebar')) {
    createSidebar();
  }
});
observer.observe(document.body, { childList: true, subtree: true }); 