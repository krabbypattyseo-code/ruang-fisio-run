import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev server di-bind ke 0.0.0.0 agar bisa diakses dari luar kontainer. Tanpa daftar ini
  // Next memblokir aset dev dari origin selain localhost, sehingga halaman tidak terhidrasi.
  allowedDevOrigins: ["127.0.0.1", "0.0.0.0", "localhost"],
};

export default nextConfig;
