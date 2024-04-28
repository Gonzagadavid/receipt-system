"use server";
import { signIn, signOut } from "@/app/api/auth/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function authenticate(prevState, formData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut();
}

export const revalidateAction = (path) => {
  revalidatePath(path);
  redirect(path);
};
