"use client";

// REACT
import { ReactNode, createContext, useEffect, useState } from "react";
// NEXT.JS
import { useRouter } from "next/navigation";
// INTERNAL
import checkAuth from "@/actions/CheckAuth";
import { Profile } from "@/utils/interfaces";

type AuthContextState = {
  loggedIn: boolean;
  profiles: Profile[];
  persist: boolean;
  authLoaded: boolean;
  persistProfile: string;
  currentProfile: Profile | null;
  loginUser(): void;
  logoutUser(): void;
  selectProfile(profile: Profile): void;
  updateProfileList(profiles: Profile[]): void;
  persistUser(value: boolean): void;
  persistUserProfile(id: string): void;
};

const INITIAL_CONTEXT: AuthContextState = {
  loggedIn: false,
  profiles: [],
  persist: false,
  authLoaded: false,
  persistProfile: "",
  currentProfile: null,
  loginUser: () => {},
  logoutUser: () => {},
  selectProfile: (profile: Profile) => {},
  updateProfileList: (profiles: Profile[]) => {},
  persistUser: (value: boolean) => {},
  persistUserProfile: (id: string) => {},
};

export const AuthContext = createContext<AuthContextState>(INITIAL_CONTEXT);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [authLoaded, setAuthLoaded] = useState<boolean>(false);
  const [persist, setPersist] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      let trustDevice = localStorage.getItem("persist");
      return trustDevice ? JSON.parse(trustDevice) : false;
    }
  });
  const [persistProfile, setPersistProfile] = useState<string>(() => {
    if (typeof window !== "undefined") {
      let pid = localStorage.getItem("pid");
      return pid ? JSON.parse(pid) : "";
    }
  });

  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      let res = await checkAuth(persistProfile);
      if (res) {
        setCurrentProfile(res);
        loginUser();
        setAuthLoaded(true);
      } else {
        logoutUser();
        setAuthLoaded(true);
        router.replace("/");
      }
    };

    if (persist && !currentProfile) verifyAuth();
  }, []);

  const loginUser = () => setLoggedIn(true);
  const logoutUser = () => {
    localStorage.removeItem("pid");
    setPersistProfile("");
    setLoggedIn(false);
    setCurrentProfile(null);
  };
  const selectProfile = (profile: Profile) => setCurrentProfile(profile);
  const updateProfileList = (profiles: Profile[]) => setProfiles(profiles);
  const persistUser = (value: boolean) => setPersist(value);
  const persistUserProfile = (id: string) => setPersistProfile(id);

  return (
    <AuthContext.Provider
      value={{
        persist,
        loggedIn,
        profiles,
        authLoaded,
        persistProfile,
        currentProfile,
        loginUser,
        logoutUser,
        persistUser,
        selectProfile,
        updateProfileList,
        persistUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
