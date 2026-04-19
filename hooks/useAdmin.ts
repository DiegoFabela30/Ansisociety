import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useAdmin() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingAdmin, setLoadingAdmin] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoadingAdmin(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "usuarios", user.uid));
        const userData = userDoc.data();
        setIsAdmin(userData?.rol === "admin");
      } catch (error) {
        console.error("Error verificando rol de admin:", error);
        setIsAdmin(false);
      } finally {
        setLoadingAdmin(false);
      }
    };

    checkAdmin();
  }, [user]);

  return { isAdmin, loadingAdmin };
}
