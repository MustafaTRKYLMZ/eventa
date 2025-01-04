// app/layout.tsx
import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="display flex flex-col min-h-screen ">
        <header className="bg-gray-800 text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-lg font-bold">
              Eventa
            </Link>

            <div>
              <Link href="/events" className="mr-4 hover:underline">
                Events
              </Link>

              <a href="/admin" className="mr-4 hover:underline">
                Admin Panel
              </a>
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
