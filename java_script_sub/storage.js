const STORAGE_TOKEN = 'TGOC6J8TYRQ77OFG0DRIZ0U4RV5ZU3930WO1CZ06'; // Token für Gruppe join-697
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * Store a key-value pair in remote storage.
 * @param {string} key - name for the remote-storage key
 * @param {string} value - name for the remote-storage value
 * @returns 
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: 'POST',
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}


/**
 * Get a key-value pair from remote storage.
 * @param {string} key - name for the remote-storage key
 * @returns 
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
}
