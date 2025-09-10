export  function checkTokenExpiry() {
  const token = localStorage.getItem("token");
  const storedDate = localStorage.getItem("tokenDate");

  const now = Date.now();
  const savedTime = parseInt(storedDate, 10);

  if (now - savedTime > 24 * 60 * 60 * 1000 || !token || !storedDate) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenDate");
    console.log("Token deleted");
    return null;
  }

  return token;
}

export function initTokenWithExpiration(token) {
  const now = Date.now();
  localStorage.setItem("token", token);
  localStorage.setItem("tokenDate", now.toString());
  console.log("Token registered:", token, "at", new Date(now).toISOString());
}