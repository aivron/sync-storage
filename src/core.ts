// src/core.ts

export type StorageType = {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    key(index: number): string | null;
    readonly length: number;
};

/**
 * Returns the default storage instance.
 * In browser/desktop (Electron) environments, this is typically localStorage.
 */
export function getDefaultStorage(): StorageType {
    if (typeof localStorage !== "undefined") {
        return localStorage;
    }
    throw new Error("Default storage is not available. Provide a custom storage adapter.");
}

export function getStorageKeys(storage: StorageType = getDefaultStorage()): string[] {
    const keys: string[] = [];
    for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (key !== null) {
            keys.push(key);
        }
    }
    return keys;
}

export function hasStorageItem(key: string, storage: StorageType = getDefaultStorage()): boolean {
    return storage.getItem(key) !== null;
}

export function getStorageItem(key: string, storage: StorageType = getDefaultStorage()): string | null {
    return storage.getItem(key);
}

export function setStorageItem(key: string, value: string, storage: StorageType = getDefaultStorage()): void {
    storage.setItem(key, value);
}

export function updateStorageItem(
    key: string,
    updateFn: (currentValue: string | null) => string,
    storage: StorageType = getDefaultStorage()
): void {
    const current = storage.getItem(key);
    const updated = updateFn(current);
    storage.setItem(key, updated);
}

export function removeStorageItem(key: string, storage: StorageType = getDefaultStorage()): void {
    storage.removeItem(key);
}
