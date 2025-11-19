import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { BackButtonHeader } from "../components/header";

export default function HomeScreen() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <BackButtonHeader title={"Home"} showBackButton={false} />
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text>{user?.firstName} {user?.lastName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text>{user?.email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone</Text>
          <Text>{user?.phone || "-"}</Text>
        </View>

        <TouchableOpacity style={styles.cta} onPress={() => signOut()}>
          <Text style={styles.ctaText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  row: { marginBottom: 12 },
  label: { fontSize: 12, color: "#666" },
  cta: {
    marginTop: 28,
    width: "60%",
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
    paddingVertical: 12,
    alignItems: "center"
  },
  ctaText: { color: "#333", fontWeight: "600" }
});
