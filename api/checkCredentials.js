let cached2FA = {};

module.exports = (req, res) => {
  const { loginIdentity, loginPassword } = req.body;

  const expectedUsername = process.env.ADMIN_ACCOUNT_USERNAME;
  const expectedPassword = process.env.ADMIN_ACCOUNT_PASSWORD;
  const twoFAEmail = process.env.ADMIN_ACCOUNT_2FA_EMAIL;

  if (!loginIdentity || !loginPassword) {
    return res.status(400).json({ success: false, message: "Missing credentials." });
  }

  if (loginIdentity === expectedUsername && loginPassword === expectedPassword) {
    const code = Math.floor(100000 + Math.random() * 900000); // 6-digit 2FA code

    cached2FA[loginIdentity] = {
      code: String(code),
      timestamp: Date.now(),
    };

    console.log(`[2FA] Code for ${loginIdentity}: ${code}`); // Replace with email when complete. Functionality not there yet.

    return res.status(200).json({
      success: true,
      message: "Credentials verified. 2FA required.",
      twoFANeeded: true,
    });
  }

  return res.status(401).json({ success: false, message: "Invalid credentials." });
};

module.exports.cached2FA = cached2FA;
