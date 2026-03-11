// shared utilities for casino pages
const BALANCE_KEY = 'cbc_balance';
const ATTR_KEY = 'cbc_attributes';

function getBalance() {
  let bal = parseInt(localStorage.getItem(BALANCE_KEY), 10);
  if (isNaN(bal)) {
    bal = 350; // default starting balance
    localStorage.setItem(BALANCE_KEY, bal);
  }
  return bal;
}

function updateBalance(amount) {
  const bal = getBalance() + amount;
  localStorage.setItem(BALANCE_KEY, bal);
  refreshBalanceDisplays();
}

function refreshBalanceDisplays() {
  document.querySelectorAll('.balance span').forEach(el => {
    el.textContent = getBalance();
  });
}

const LUCK_MAX = 10;

function getAttributes() {
  const raw = localStorage.getItem(ATTR_KEY);
  if(raw) return JSON.parse(raw);
  const defaults = { luck: 0 };
  localStorage.setItem(ATTR_KEY, JSON.stringify(defaults));
  return defaults;
}

function getLuckCost() {
  const attrs = getAttributes();
  const lvl = attrs.luck || 0;
  if(lvl >= LUCK_MAX) return null;
  // cost starts at 500 and increases by 1500 more than the last each upgrade
  return 500 + lvl * 1500;
}

function purchaseLuck() {
  const cost = getLuckCost();
  if(cost === null) return false; // already at max
  const attrs = getAttributes();
  if(getBalance() < cost) return false;
  updateBalance(-cost);
  attrs.luck = (attrs.luck || 0) + 1;
  localStorage.setItem(ATTR_KEY, JSON.stringify(attrs));
  purchaseUpgradeStat();
  return true;
}

function purchaseAttribute(name, cost) {
  // generic fallback if we ever add other attributes
  const attrs = getAttributes();
  const current = attrs[name] || 0;
  // respect any defined max for attributes if present
  if (ATTR_DEFS && ATTR_DEFS[name] && current >= ATTR_DEFS[name].max) return false;
  if(getBalance() < cost) return false;
  updateBalance(-cost);
  attrs[name] = current + 1;
  localStorage.setItem(ATTR_KEY, JSON.stringify(attrs));
  purchaseUpgradeStat();
  return true;
}

function getLuckBonus() {
  const attrs = getAttributes();
  return attrs.luck || 0;
}

function getPayoutAmount(bet, odds) {
  // odds is multiplier (e.g. 2 for double, 35 for straight roulette etc.)
  let amount = bet * odds;
  const luck = getLuckBonus();
  if(luck > 0) {
    const doubleChance = Math.min(luck * 0.05, 0.5);
    if(Math.random() < doubleChance) {
      amount *= 2;
    }
  }
  return amount;
}

// Attribute definitions for dynamic costs and limits
const ATTR_DEFS = {
  charisma: { max: 5, base: 300, step: 800 },
  strategy: { max: 5, base: 400, step: 1000 }
};

function getAttributeCost(name) {
  if (name === 'luck') return getLuckCost();
  const defs = ATTR_DEFS[name];
  if(!defs) return null;
  const attrs = getAttributes();
  const lvl = attrs[name] || 0;
  if(lvl >= defs.max) return null;
  return defs.base + lvl * defs.step;
}

function getCharismaBonus() {
  const attrs = getAttributes();
  return attrs.charisma || 0;
}

function getStrategyBonus() {
  const attrs = getAttributes();
  return attrs.strategy || 0;
}

// stats persistence
const STATS_KEY = 'cbc_stats';
function getStats() {
  const raw = localStorage.getItem(STATS_KEY);
  if (raw) return JSON.parse(raw);
  const initial = {
    moneyMade: 0,
    moneyLost: 0,
    upgradesPurchased: 0,
    achievements: 0,
    wins: 0,
    losses: 0
  };
  localStorage.setItem(STATS_KEY, JSON.stringify(initial));
  return initial;
}
function saveStats(stats) {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}
function recordWin(amount) {
  const stats = getStats();
  stats.wins += 1;
  stats.moneyMade += amount;
  // consecutive win tracking and achievement
  stats.consecutiveWins = (stats.consecutiveWins || 0) + 1;
  // unlock hot streak achievement at 10 consecutive wins
  if (stats.consecutiveWins === 10) {
    unlockAchievement('hot-streak');
  }
  // big winner achievement for large single payouts
  if (amount >= 1000) {
    unlockAchievement('big-winner');
  }
  saveStats(stats);
}
function recordLoss(amount) {
  const stats = getStats();
  stats.losses += 1;
  stats.moneyLost += amount;
  // reset consecutive wins
  stats.consecutiveWins = 0;
  saveStats(stats);
}
function purchaseUpgradeStat() {
  const stats = getStats();
  stats.upgradesPurchased += 1;
  // unlock first-upgrade achievement when first upgrade purchased
  if (stats.upgradesPurchased === 1) unlockAchievement('first-upgrade');
  saveStats(stats);
}
function unlockAchievementStat() {
  const stats = getStats();
  stats.achievements += 1;
  saveStats(stats);
}

function unlockAchievement(id) {
  const stats = getStats();
  stats.unlocked = stats.unlocked || {};
  if (stats.unlocked[id]) return; // already unlocked
  stats.unlocked[id] = true;
  stats.achievements = (stats.achievements || 0) + 1;
  saveStats(stats);
}
function getWinRate() {
  const s = getStats();
  const total = s.wins + s.losses;
  return total === 0 ? 0 : ((s.wins / total) * 100).toFixed(1);
}
function getLossRate() {
  const s = getStats();
  const total = s.wins + s.losses;
  return total === 0 ? 0 : ((s.losses / total) * 100).toFixed(1);
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  refreshBalanceDisplays();
});

// expose for games
window.casinoUtils = {
  getBalance,
  updateBalance,
  refreshBalanceDisplays,
  getAttributes,
  getLuckCost,
  purchaseLuck,
  purchaseAttribute,
  getAttributeCost,
  getLuckBonus,
  getCharismaBonus,
  getStrategyBonus,
  getPayoutAmount,
  // stats helpers
  getStats,
  recordWin,
  recordLoss,
  purchaseUpgradeStat,
  unlockAchievementStat,
  getWinRate,
  getLossRate
};
