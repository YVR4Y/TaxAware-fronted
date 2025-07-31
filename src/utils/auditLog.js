import SHA256 from 'crypto-js/sha256';

const STORAGE_KEY = 'taxaware_audit_log';

function loadLog() {
  const json = localStorage.getItem(STORAGE_KEY);
  if (!json) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }
  try { return JSON.parse(json); }
  catch { return []; }
}

function saveLog(log) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
}

export function appendLogEntry({ ico, action, payload }) {
  const log = loadLog();
  const prevHash = log.length ? log[log.length - 1].hash : '0'.repeat(64);
  const timestamp = new Date().toISOString();
  const entry = { ico, action, payload, timestamp };
  const hash = SHA256(prevHash + JSON.stringify(entry)).toString();
  const record = { ...entry, prevHash, hash };
  log.push(record);
  saveLog(log);
  return record;
}

export function getAuditLog() {
  return loadLog();
}
