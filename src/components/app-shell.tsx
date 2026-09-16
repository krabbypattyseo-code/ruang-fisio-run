/**
 * Kolom aplikasi tetap selebar ponsel, seperti Ruang Fisio Pasien.
 * Lebar dan canvas di luar frame diatur di globals.css (body + .app-shell).
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return <div className="app-shell flex flex-col">{children}</div>;
}
