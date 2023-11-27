"use client";

// REACT
import { ReactNode, createContext, useEffect, useState } from "react";
// NEXT.JS
import { useRouter } from "next/navigation";
// INTERNAL
import checkAuth from "@/actions/CheckAuth";
import { Profile, Subscriber } from "@/utils/interfaces";

type AuthContextState = {
  user: Subscriber | null;
  loggedIn: boolean;
  persist: boolean;
  authLoaded: boolean;
  persistedProfile: string;
  currentProfile: Profile | null;
  loginUser(user: Subscriber): void;
  logoutUser(): void;
  selectProfile(profile: Profile | null): void;
  persistUser(value: boolean): void;
  persistUserProfile(id: string): void;
};

const INITIAL_CONTEXT: AuthContextState = {
  user: null,
  loggedIn: false,
  persist: false,
  authLoaded: false,
  persistedProfile: "",
  currentProfile: null,
  loginUser: (user: Subscriber) => {},
  logoutUser: () => {},
  selectProfile: (profile: Profile | null) => {},
  persistUser: (value: boolean) => {},
  persistUserProfile: (id: string) => {},
};

export const AuthContext = createContext<AuthContextState>(INITIAL_CONTEXT);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Subscriber | null>(null);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [authLoaded, setAuthLoaded] = useState<boolean>(false);
  const [persist, setPersist] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      let trustDevice = localStorage.getItem("persist");
      return trustDevice ? JSON.parse(trustDevice) : false;
    }
  });
  const [persistedProfile, setPersistProfile] = useState<string>(() => {
    if (typeof window !== "undefined") {
      let pid = localStorage.getItem("pid");
      return pid ? JSON.parse(pid) : "";
    }
  });

  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      let user = await checkAuth();
      if (user) {
        let profile = user.profiles.find((p) => p.id === persistedProfile)!;
        loginUser(user);
        setCurrentProfile(profile);
      } else {
        logoutUser();
        // TODO: Check if previous route is an access or home route. If so, redirect to previous route, else redirect to home page.
        router.replace("/");
      }
    };

    if (persist) verifyAuth();
    setAuthLoaded(true);
  }, [currentProfile, persist, persistedProfile, router]);

  const loginUser = (user: Subscriber) => {
    setUser(user);
    setLoggedIn(true);
  };
  const logoutUser = () => {
    setLoggedIn(false);
    setUser(null);
    setCurrentProfile(null);
    setPersistProfile("");
    localStorage.removeItem("pid");
  };
  const selectProfile = (profile: Profile | null) => setCurrentProfile(profile);
  const persistUser = (value: boolean) => setPersist(value);
  const persistUserProfile = (id: string) => {
    setPersistProfile(id);
    localStorage.setItem("pid", JSON.stringify(id));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        persist,
        loggedIn,
        authLoaded,
        currentProfile,
        persistedProfile,
        loginUser,
        logoutUser,
        persistUser,
        selectProfile,
        persistUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
