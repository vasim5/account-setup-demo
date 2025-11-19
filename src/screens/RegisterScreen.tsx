import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registrationSchema, { RegistrationData } from "../validation/registrationSchema";
import usePersistentForm from "../hooks/usePersistentForm";
import { AuthContext } from "../context/AuthContext";
import { BackButtonHeader } from "../components/header";

export default function RegisterScreen({ navigation }: any) {
  const { signUp } = useContext(AuthContext);
  const [enableBio, setEnableBio] = useState<boolean>(true);

  const { control, handleSubmit, formState, reset, watch } = useForm<RegistrationData>({
    resolver: yupResolver(registrationSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: ""
    }
  });

  usePersistentForm("registration_form_v1", { watch, reset });

  const onSubmit = async (data: RegistrationData) => {
    await signUp(
      {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone
      },
      data.password,
      enableBio
    );
    Alert.alert("Account created", "You are now signed in.");
    // Navigation will switch to Home due to context change
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <BackButtonHeader title={"Account Setup"} />
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <>
                  <Text style={styles.label}>EMAIL ADDRESS</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="enter a email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={field.value}
                    onChangeText={field.onChange}
                    accessibilityLabel="Email address"
                  />
                  {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
                </>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <>
                  <Text style={styles.label}>PASSWORD</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="enter a password"
                    secureTextEntry
                    value={field.value}
                    onChangeText={field.onChange}
                    accessibilityLabel="Password"
                  />
                  {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
                </>
              )}
            />

            <Controller
              control={control}
              name="firstName"
              render={({ field, fieldState }) => (
                <>
                  <Text style={styles.label}>FIRST NAME</Text>
                  <TextInput style={styles.input} placeholder="enter your first name" value={field.value} onChangeText={field.onChange} accessibilityLabel="First name" />
                  {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
                </>
              )}
            />

            <Controller
              control={control}
              name="lastName"
              render={({ field, fieldState }) => (
                <>
                  <Text style={styles.label}>LAST NAME</Text>
                  <TextInput style={styles.input} placeholder="enter your last name" value={field.value} onChangeText={field.onChange} accessibilityLabel="Last name" />
                  {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
                </>
              )}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field, fieldState }) => (
                <>
                  <Text style={styles.label}>PHONE NUMBER</Text>
                  <TextInput style={styles.input} placeholder="enter a phone number" keyboardType="phone-pad" value={field.value} onChangeText={field.onChange} accessibilityLabel="Phone number" />
                  {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
                </>
              )}
            />

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.link}>Already registered? Sign in here</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.cta, !formState.isValid && styles.ctaDisabled]} onPress={handleSubmit(onSubmit)} disabled={!formState.isValid}>
            <Text style={styles.ctaText}>SAVE & START</Text>
          </TouchableOpacity>

          <View style={{ height: 32 }} />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, backgroundColor: "#fff", alignItems: "center" },
  card: {
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 12,
    backgroundColor: "#fafafa"
  },
  label: { fontSize: 12, color: "#666", marginTop: 8 },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 12,
    marginTop: 6,
    backgroundColor: "#fff"
  },
  error: { color: "#b00020", marginTop: 4, fontSize: 12 },
  link: { color: "#1e88e5", marginTop: 12, textAlign: "center" },
  cta: {
    marginTop: 16,
    width: "90%",
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#b2e0ef",
    backgroundColor: "#e6f7fb",
    paddingVertical: 14,
    alignItems: "center"
  },
  ctaDisabled: {
    opacity: 0.5
  },
  ctaText: { color: "#0d6b6b", fontWeight: "600" }
});
