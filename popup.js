// popup.js - Handles Gemini API key storage

document.getElementById('save-api-key').onclick = function() {
  const key = document.getElementById('api-key-input').value;
  chrome.storage.sync.set({ geminiApiKey: key }, function() {
    document.getElementById('save-status').textContent = 'API key saved!';
    setTimeout(() => {
      document.getElementById('save-status').textContent = '';
    }, 2000);
  });
};

// Load existing key (if any)
chrome.storage.sync.get(['geminiApiKey'], function(result) {
  if (result.geminiApiKey) {
    document.getElementById('api-key-input').value = result.geminiApiKey;
  }
}); 