"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose?: () => void;
}

export default function Toast({
  message,
  type = "success",
  duration = 3000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const bgColor =
    type === "success"
      ? "rgba(34, 197, 94, 0.95)"
      : type === "error"
        ? "rgba(239, 68, 68, 0.95)"
        : "rgba(59, 130, 246, 0.95)";

  const icon = type === "success" ? "✓" : type === "error" ? "✕" : "ℹ";

  return (
    <div
      className="toastNotification"
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        backgroundColor: bgColor,
        color: "white",
        padding: "16px 24px",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        fontSize: "15px",
        fontWeight: "500",
        zIndex: 9999,
        animation: "slideInUp 0.3s ease-out",
        maxWidth: "400px",
        wordWrap: "break-word",
      }}
    >
      <span style={{ fontSize: "20px", fontWeight: "bold" }}>{icon}</span>
      <span>{message}</span>
    </div>
  );
}
