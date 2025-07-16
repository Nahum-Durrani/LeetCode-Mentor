# LeetCode Mentor Chrome Extension

Get AI-powered hints while solving LeetCode problems!

## Features
- Detects when you are viewing a LeetCode problem page.
- Injects a collapsible sidebar with a "Get Hint" button.
- Sends the problem title and description to the Gemini API for a helpful hint.
- Securely stores your Gemini API key (in Chrome storage).

## Setup
1. **Get a Gemini API Key:**
   - Go to [Google AI Studio](https://aistudio.google.com/app/apikey) and create a Gemini API key.
2. **Clone or Download this Repo.**
3. **Load the Extension in Chrome:**
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select this folder.
4. **Set Your API Key:**
   - Click the LeetCode Mentor icon in your Chrome toolbar.
   - Enter your Gemini API key and click Save.
5. **Use on LeetCode:**
   - Visit any LeetCode problem page (e.g., https://leetcode.com/problems/two-sum/)
   - Open the sidebar and click "Get Hint".

## How It Works
- The content script detects when you are on a LeetCode problem page and injects a sidebar.
- When you click "Get Hint", it extracts the problem title and description, retrieves your Gemini API key from storage, and sends a POST request to the Gemini API.
- The AI's hint is displayed in the sidebar.

## Example Gemini API Call
```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY
Content-Type: application/json

{
  "contents": [
    { "parts": [ { "text": "Give me a hint for this LeetCode problem: Two Sum\nGiven an array of integers..." } ] }
  ]
}
```

## File Structure
- `manifest.json` — Chrome extension manifest (v3)
- `content.js` — Injects sidebar, handles UI, API call
- `popup.html` — For entering Gemini API key
- `popup.js` — Logic to save/retrieve API key
- `styles.css` — Minimal styling
- `README.md` — This file

## Notes
- Your API key is stored only in your browser (chrome.storage.sync).
- The extension only runs on LeetCode problem pages.
- If the sidebar does not appear, try refreshing the page.

---

Enjoy AI-powered coding hints! 🎉 