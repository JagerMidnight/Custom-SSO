const crypto = require("crypto");
const ADMIN_USERNAME = process.env.ADMIN_ACCOUNT_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_ACCOUNT_PASSWORD;
const ADMIN_2FA_EMAIL = process.env.ADMIN_ACCOUNT_2FA_EMAIL;
const generate2FACode = () => Math.floor(100000 + Math.random() * 900000).toString();
const hash = (str) => crypto.createHash("sha256").update(str).digest("hex");

module.exports = (req, res) => {
  const { loginIdentity, loginPassword, submitted2FACode, hashed2FACode } = req.body;

  if (!loginIdentity) {
    return res.status(400).json({ success: false, message: "Missing loginIdentity." });
  }
  // PHASE 1: LOGIN
  if (!submitted2FACode && !hashed2FACode) {
    if (loginIdentity === ADMIN_USERNAME && loginPassword === ADMIN_PASSWORD) {
      const code = generate2FACode();
      const hashCode = hash(code + loginIdentity);

      // For testing purposes, log the code
      console.log(`[2FA] Code for ${loginIdentity}: ${code}`);

      // Send a email to the User
      return res.status(200).json({
        success: true,
        message: "Credentials accepted. 2FA required.",
        twoFARequired: true,
        hashed2FACode: hashCode // this will be stored client-side temporarily
      });
    } else {
      return res.status(401).json({ success: false, message: "Invalid login credentials." });
    }
  }

  // PHASE 2: 2FA Verification
  if (submitted2FACode && hashed2FACode) {
    const expectedHash = hash(submitted2FACode + loginIdentity);

    if (expectedHash === hashed2FACode) {
      return res.status(200).json({
        success: true,
        message: "2FA verified. Login complete.",
        redirect: "/dashboard"
      });
    } else {
      return res.status(403).json({ success: false, message: "Invalid 2FA code." });
    }
  }

  return res.status(400).json({ success: false, message: "Bad request format." });
};
