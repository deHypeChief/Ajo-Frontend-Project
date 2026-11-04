const PREFIX = 'ajo:'

export function read <T>(key:string, fallback:T): T {
  try{
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function write<T>(key: string, value:T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))      
  } catch {
   // storage full or blocked; ignore
  }
}

export function clearAll(): void {
  try {
    const ours = Object.keys(localStorage).filter((k) => k.startsWith(PREFIX))
    ours.forEach((k) => localStorage.removeItem(k))
  } catch {
    // storage blocked: nothing to clear
  }
}