/**
 * Kolom aplikasi tetap selebar ponsel, seperti Ruang Fisio Pasien.
 * Di desktop: kolom 390px di tengah canvas abu-abu.
 * Di HP: kolom mengisi lebar layar (maks 390px).
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell flex min-h-dvh w-full max-w-[390px] flex-col overflow-x-hidden bg-background shadow-[0_0_0_1px_rgba(0,0,0,0.04)]">
      {children}
    </div>
  );
}
