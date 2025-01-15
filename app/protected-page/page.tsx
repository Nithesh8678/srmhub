"use client";

import ProtectedRoute from "../components/ProtectedRoute";

export default function ProtectedPage() {
  return (
    <ProtectedRoute>
      <div>Protected Content</div>
    </ProtectedRoute>
  );
}
