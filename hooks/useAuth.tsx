// REACT
import { useContext } from "react";
// INTERNAL
import { AuthContext } from "@/providers/AuthProvider";

const useAuth = () => useContext(AuthContext);

export default useAuth;