export const userSchema = {
  name: "users",
  type: "document",
  title: "User",
  fields: [
    {
      name: "name",
      type: "string",
      title: "name",
    },
    {
      name: "walletAddress",
      type: "string",
      title: "Wallet Address",
    },
    { name: "email", type: "string", title: "Email" },
    { name: "profileImage", type: "image", title: "Profile Image" },
  ],
};
