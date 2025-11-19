import registrationSchema from "../validation/registrationSchema";

describe("registration validation", () => {
  it("validates a correct payload", async () => {
    const data = {
      email: "test@example.com",
      password: "Password1",
      firstName: "Vasim",
      lastName: "Ghosi",
      phone: "+911234567890"
    };
    await expect(registrationSchema.validate(data)).resolves.toBeTruthy();
  });

  it("rejects weak password", async () => {
    const data = {
      email: "a@b.com",
      password: "weak",
      firstName: "A",
      lastName: "B",
      phone: "+911234"
    };
    await expect(registrationSchema.validate(data)).rejects.toThrow();
  });
});
