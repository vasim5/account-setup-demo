import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { BackButtonHeader } from "../components/header";

export default function LoginScreen({ navigation }: any) {
  const { signIn, signInWithBiometrics } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(0);

  useEffect(() => {
    // Try biometric on mount — optional: only if user previously enabled it
    (async () => {
      // We attempt biometric sign-in; if it succeeds, context will redirect to Home.
      // If you don't want auto-prompt, remove this.
      try {
        await signInWithBiometrics();
      } catch {
        // ignore
      }
    })();
  }, []);

  const handleLogin = async () => {
    const ok = await signIn(email, password);
    if (!ok) {
      setFailed((v) => v + 1);
      Alert.alert("Login failed", "Invalid email or password");
    } else {
      setFailed(0);
    }
  };

  const locked = failed >= 5;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <BackButtonHeader title={"Account Sign In"} showBackButton={false} />
        <View style={styles.container}>
          {locked && <Text style={styles.error}>Too many failed attempts. Please restart the app to retry.</Text>}

          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <TextInput style={styles.input} placeholder="enter a email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />

          <Text style={[styles.label, { marginTop: 12 }]}>PASSWORD</Text>
          <TextInput style={styles.input} placeholder="enter a password" secureTextEntry value={password} onChangeText={setPassword} />

          <TouchableOpacity onPress={() => Alert.alert("Reset password", "Reset functionality not implemented for local test.")}>
            <Text style={styles.link}>Forgot your password? Reset it here</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>No Account? Register here</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.cta, locked && styles.ctaDisabled]} onPress={handleLogin} disabled={locked}>
            <Text style={styles.ctaText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  label: { fontSize: 12, color: "#666", alignSelf: "flex-start", marginLeft: 16 },
  input: {
    width: "90%",
    height: 44,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 12,
    marginTop: 6,
    backgroundColor: "#fff"
  },
  link: { color: "#1e88e5", marginTop: 12 },
  cta: {
    marginTop: 20,
    width: "90%",
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#b2e0ef",
    backgroundColor: "#e6f7fb",
    paddingVertical: 14,
    alignItems: "center"
  },
  ctaDisabled: { opacity: 0.5 },
  ctaText: { color: "#0d6b6b", fontWeight: "600" },
  error: { color: "#b00020", marginBottom: 8 }
});
