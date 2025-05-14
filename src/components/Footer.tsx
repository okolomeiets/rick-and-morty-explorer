"use client";

export default function Footer() {
  return (
    <footer className="mt-auto text-center text-sm text-gray-500 p-6">
      <p className="mb-1">Developed by Olha Kolomeiets</p>
      <p>© {new Date().getFullYear()} Olha Kolomeiets. All rights reserved.</p>
    </footer>
  );
}
