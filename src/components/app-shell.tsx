/**
 * Kolom aplikasi tetap selebar ponsel, seperti Ruang Fisio Pasien.
 * Tinggi dikunci 100dvh di globals.css agar bottom nav bisa di-freeze.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return <div className="app-shell">{children}</div>;
}
