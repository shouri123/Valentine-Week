/**
 * Valentine Week Date Lock System
 * Each day unlocks only when its actual date arrives (Feb 7-14, 2026)
 */

const VALENTINE_DAYS = [
  { day: 7, name: "Rose Day", page: "rose-day.html", icon: "🌹" },
  { day: 8, name: "Propose Day", page: "propose-day.html", icon: "💍" },
  { day: 9, name: "Chocolate Day", page: "chocolate-day.html", icon: "🍫" },
  { day: 10, name: "Teddy Day", page: "teddy-day.html", icon: "🧸" },
  { day: 11, name: "Promise Day", page: "promise-day.html", icon: "🤝" },
  { day: 12, name: "Hug Day", page: "hug-day.html", icon: "🤗" },
  { day: 13, name: "Kiss Day", page: "kiss-day.html", icon: "💋" },
  { day: 14, name: "Valentine's Day", page: "valentines-day.html", icon: "❤️" },
];

const VALENTINE_YEAR = 2026;
const VALENTINE_MONTH = 2; // February (1-indexed for clarity in code)

/**
 * Check if a specific day is unlocked
 * @param {number} dayOfMonth - The day of the month (7-14)
 * @returns {boolean} - Whether the day is unlocked
 */
function isDayUnlocked(dayOfMonth) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // Convert to 1-indexed
  const currentDay = now.getDate();

  // If it's before February 2026, nothing is unlocked
  if (currentYear < VALENTINE_YEAR) return false;
  if (currentYear === VALENTINE_YEAR && currentMonth < VALENTINE_MONTH)
    return false;

  // If it's after February 2026, everything is unlocked
  if (currentYear > VALENTINE_YEAR) return true;
  if (currentYear === VALENTINE_YEAR && currentMonth > VALENTINE_MONTH)
    return true;

  // It's February 2026 - check the day
  return currentDay >= dayOfMonth;
}

/**
 * Get the status of a day
 * @param {number} dayOfMonth - The day of the month (7-14)
 * @returns {string} - 'today', 'unlocked', 'locked'
 */
function getDayStatus(dayOfMonth) {
  const now = new Date();
  const currentDay = now.getDate();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  if (currentYear === VALENTINE_YEAR && currentMonth === VALENTINE_MONTH) {
    if (currentDay === dayOfMonth) return "today";
    if (currentDay > dayOfMonth) return "unlocked";
    return "locked";
  }

  return isDayUnlocked(dayOfMonth) ? "unlocked" : "locked";
}

/**
 * Get time remaining until a day unlocks
 * @param {number} dayOfMonth - The day of the month (7-14)
 * @returns {object} - { days, hours, minutes, seconds }
 */
function getTimeUntilUnlock(dayOfMonth) {
  const now = new Date();
  const unlockDate = new Date(
    VALENTINE_YEAR,
    VALENTINE_MONTH - 1,
    dayOfMonth,
    0,
    0,
    0,
  );

  let diff = unlockDate - now;
  if (diff < 0) diff = 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, total: diff };
}

/**
 * Redirect to index if current page is locked
 * Call this at the top of each day page
 * @param {number} requiredDay - The day required to view this page
 */
function checkPageAccess(requiredDay) {
  if (!isDayUnlocked(requiredDay)) {
    window.location.href = "index.html";
  }
}

/**
 * Format countdown string
 * @param {number} dayOfMonth - The day of the month (7-14)
 * @returns {string} - Formatted countdown string
 */
function formatCountdown(dayOfMonth) {
  const time = getTimeUntilUnlock(dayOfMonth);
  if (time.total <= 0) return "Unlocked!";

  if (time.days > 0) {
    return `${time.days}d ${time.hours}h`;
  }
  return `${time.hours}h ${time.minutes}m`;
}
