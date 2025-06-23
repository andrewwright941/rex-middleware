let accessToken = null;
let tokenExpiry = 0;

async function getAccessToken() {
  if (accessToken && Date.now() < tokenExpiry) return accessToken;

  const response = await fetch('https://api.rexsoftware.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: process.env.REX_USERNAME,
      password: process.env.REX_PASSWORD,
      grant_type: 'password',
      client_id: 'rexapi',
      client_secret: ''
    })
  });

  const data = await response.json();
  if (!data.access_token) throw new Error('Rex auth failed');

  accessToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000;
  return accessToken;
}

async function getListings() {
  const token = await getAccessToken();
  const res = await fetch('https://api.rexsoftware.com/v1/rex/listings/', {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) throw new Error('Failed to fetch listings');
  return await res.json();
}

module.exports = { getListings };
