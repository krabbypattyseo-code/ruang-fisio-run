import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/event/proyeksi", destination: "/event/gtr-ultra-30k/proyeksi", permanent: false },
      { source: "/event/rencana", destination: "/event/gtr-ultra-30k/rencana", permanent: false },
      { source: "/event/strategi", destination: "/event/gtr-ultra-30k/strategi", permanent: false },
    ];
  },
  // Dev server di-bind ke 0.0.0.0 agar bisa diakses dari luar kontainer. Tanpa daftar ini
  // Next memblokir aset dev dari origin selain localhost, sehingga halaman tidak terhidrasi.
  allowedDevOrigins: ["127.0.0.1", "0.0.0.0", "localhost"],
};

export default nextConfig;
