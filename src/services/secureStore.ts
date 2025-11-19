import * as SecureStore from "expo-secure-store";

export async function saveSecure(key: string, value: string) {
  return SecureStore.setItemAsync(key, value, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });
}

export async function getSecure(key: string) {
  return SecureStore.getItemAsync(key);
}

export async function deleteSecure(key: string) {
  return SecureStore.deleteItemAsync(key);
}
