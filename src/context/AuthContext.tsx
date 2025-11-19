import React, { createContext, ReactNode, useEffect, useState } from "react";
import * as Keychain from "react-native-keychain";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type User = {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
};

type AuthContextType = {
  user: User | null;
  signUp: (user: User, password: string, enableBiometrics?: boolean) => Promise<void>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signInWithBiometrics: () => Promise<boolean>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signUp: async () => {},
  signIn: async () => false,
  signInWithBiometrics: async () => false,
  signOut: async () => {}
});

const USER_KEY = "app_user_v1";
const CREDENTIAL_SERVICE = "rn.account.setup.test";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(USER_KEY);
      if (stored) setUser(JSON.parse(stored));
    })();
  }, []);

  const signUp = async (u: User, password: string, enableBiometrics = false) => {
    // Save non-sensitive user data in AsyncStorage
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(u));
    setUser(u);

    // Save credentials in Keychain. Optionally enable biometrics with accessControl
    try {
      const options: Keychain.BaseOptions = {
        service: CREDENTIAL_SERVICE
      };
      await Keychain.setGenericPassword(u.email, password, options);

      if (enableBiometrics) {
        // Re-save with biometric access control
        await Keychain.resetGenericPassword({ service: CREDENTIAL_SERVICE });
        await Keychain.setGenericPassword(u.email, password, {
          service: CREDENTIAL_SERVICE,
          accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET
        });
      }
    } catch (e) {
      console.warn("Keychain save failed", e);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const creds = await Keychain.getGenericPassword({ service: CREDENTIAL_SERVICE });
      console.log('creds', creds);
      
      if (!creds) return false;
      // Simple equality check (local-only). In production, use hashed verification or server.
      const ok = creds.username === email && creds.password === password;
      if (ok) {
        const stored = await AsyncStorage.getItem(USER_KEY);
        setUser(stored ? JSON.parse(stored) : { email });
      }
      return ok;
    } catch (e) {
      console.warn("Keychain get failed", e);
      return false;
    }
  };

  const signInWithBiometrics = async () => {
    try {
      const creds = await Keychain.getGenericPassword({
        service: CREDENTIAL_SERVICE,
        authenticationPrompt: {
          title: "Authenticate",
          subtitle: "Use biometrics to sign in",
          description: "Place your finger or use Face ID",
          cancel: "Cancel"
        }
      });
      if (!creds) return false;
      const stored = await AsyncStorage.getItem(USER_KEY);
      setUser(stored ? JSON.parse(stored) : { email: creds.username });
      return true;
    } catch (e) {
      console.warn("Biometric sign-in failed", e);
      return false;
    }
  };

  const signOut = async () => {
    try {
      await Keychain.resetGenericPassword({ service: CREDENTIAL_SERVICE });
    } catch (e) {
      console.warn("Keychain reset failed", e);
    }
    await AsyncStorage.removeItem(USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signInWithBiometrics, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
