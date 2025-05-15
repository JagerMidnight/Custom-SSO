const TITLE_NAME = "Custom SSO"; // Replace this when forked ex. "Google SSO"
document.title = `${TITLE_NAME} Portal`;
document.getElementById("page-title").textContent = `${TITLE_NAME} Login`;
const form = document.getElementById("login-form");
const status = document.getElementById("status");
const twoFASection = document.getElementById("2fa-section");
const identityInput = document.getElementById("identity");
const passwordInput = document.getElementById("password");
const codeInput = document.getElementById("code");
let hashed2FACode = "";
let loginIdentity = "";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  status.textContent = "Processing...";

  const identity = identityInput.value.trim();
  const password = passwordInput.value;
  const code = codeInput.value.trim();

  const body = {
    loginIdentity: identity
  };

  if (twoFASection.style.display === "none" || !twoFASection.style.display) {
    // First phase: send login credentials
    body.loginPassword = password;
  } else {
    // Second phase: send 2FA verification
    body.submitted2FACode = code;
    body.hashed2FACode = hashed2FACode;
  }

  try {
    const response = await fetch("/api/server-verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const result = await response.json();

    if (result.twoFARequired) {
      // Show 2FA input
      hashed2FACode = result.hashed2FACode;
      loginIdentity = identity;
      twoFASection.style.display = "block";
      status.textContent = "2FA code sent. Check your email.";
    } else if (result.success) {
      status.textContent = "Login successful! Redirecting...";
      window.location.href = result.redirect || "/dashboard";
    } else {
      status.textContent = result.message || "Login failed.";
    }
  } catch (err) {
    status.textContent = "Network error. Please try again.";
  }
});
