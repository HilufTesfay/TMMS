const jwt = require("jsonwebtoken");
// Generate a token
function generateToken(payload, expiresIn = "1h") {
  return jwt.sign(payload, secretKey, { expiresIn });
}

// Save token to a file
function saveToken(token) {
  let tokens = [];
  if (fs.existsSync(tokenFilePath)) {
    tokens = JSON.parse(fs.readFileSync(tokenFilePath));
  }
  tokens.push(token);
  fs.writeFileSync(tokenFilePath, JSON.stringify(tokens));
}

// Verify a token
function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
}

// Refresh a token
function refreshToken(token) {
  const decoded = verifyToken(token);
  if (decoded) {
    const newToken = generateToken({ id: decoded.id }, "1h");
    saveToken(newToken);
    return newToken;
  }
  return null;
}

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  refreshToken,
};
