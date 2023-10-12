"use client";
import { useState, createContext } from "react";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

interface State {
  showSnackbar: boolean;
  loading: boolean;
  error: boolean;
  success: boolean;
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
  showSnackbar: false,
  loading: false,
  error: false,
  success: false,
  setAuthState: () => {},
});

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState<State>({
    showSnackbar: false,
    loading: false,
    error: false,
    success: false,
  });

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
