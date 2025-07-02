const cryptoList = document.getElementById('crypto-list');
const searchInput = document.getElementById('search');

async function fetchCryptos() {
  const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
  const data = await res.json();
  displayCryptos(data);
}

function displayCryptos(coins) {
  cryptoList.innerHTML = '';
  coins.forEach(coin => {
    const crypto = document.createElement('div');
    crypto.classList.add('crypto');
    crypto.innerHTML = `
      <img src="${coin.image}" alt="${coin.name}">
      <h2>${coin.name} (${coin.symbol.toUpperCase()})</h2>
      <p>$${coin.current_price.toLocaleString()}</p>
    `;
    cryptoList.appendChild(crypto);
  });
}

searchInput.addEventListener('input', async () => {
  const query = searchInput.value.toLowerCase();
  const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
  const data = await res.json();
  const filtered = data.filter(coin =>
    coin.name.toLowerCase().includes(query) || coin.symbol.toLowerCase().includes(query)
  );
  displayCryptos(filtered);
});

fetchCryptos();
