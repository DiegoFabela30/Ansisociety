"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface HeaderProps {
  variant?: "home" | "auth" | "default";
}

export default function Header({ variant = "default" }: HeaderProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsDropdownOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const brandContent = (
    <div className="brandBox">
      <div className="logoCircle" />
      <div>
        <h1 className="brandTitle">ANSISOCIETY</h1>
        <p className="brandSubtitle">APOYO EMOCIONAL DIGITAL</p>
      </div>
    </div>
  );

  const unauthenticatedButtons = (
    <div className="navButtons">
      <Link href="/login">
        <button className="btnOutline">Iniciar Sesión</button>
      </Link>
      <Link href="/registro">
        <button className="btnSolid">Registrarse</button>
      </Link>
    </div>
  );

  const authenticatedButtons = (
    <div className="navButtons">
      <Link href="/">
        <button className="btnOutline">📋 Menú</button>
      </Link>
      <div className="profileDropdown">
        <button
          className="btnOutline profileButton"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          👤 Perfil
        </button>
        {isDropdownOpen && (
          <div className="dropdownMenu">
            <Link href="/perfil" onClick={() => setIsDropdownOpen(false)}>
              <button className="dropdownItem">Mi Perfil</button>
            </Link>
            <button className="dropdownItem logoutItem" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const headerClass =
    variant === "home"
      ? "topBar"
      : variant === "auth"
        ? "topBar glassBar"
        : "topBar";

  if (loading) {
    return (
      <header className={headerClass}>
        {brandContent}
      </header>
    );
  }

  return (
    <header className={headerClass}>
      {brandContent}
      {user ? authenticatedButtons : unauthenticatedButtons}
    </header>
  );
}
