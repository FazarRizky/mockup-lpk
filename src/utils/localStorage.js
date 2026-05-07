export function getItem(key, fallback = null) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null || raw === undefined) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[localStorage] gagal membaca key "${key}"`, err);
    return fallback;
  }
}

export function setItem(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.warn(`[localStorage] gagal menulis key "${key}"`, err);
    return false;
  }
}

export function removeItem(key) {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (err) {
    console.warn(`[localStorage] gagal menghapus key "${key}"`, err);
    return false;
  }
}
