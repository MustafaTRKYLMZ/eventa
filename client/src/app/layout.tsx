// app/layout.tsx
import { StateProvider } from "./context/stateContext";
import "./styles/globals.css";
import Link from "next/link";
import { GlobalVenueProvider } from "./context/venueContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="display flex flex-col min-h-screen ">
        <StateProvider>
          <GlobalVenueProvider>
            <header className="bg-gray-800 text-white p-4">
              <nav className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-lg font-bold">
                  Eventa
                </Link>

                <div>
                  <Link
                    href="/venue-workspace"
                    className="mr-4 hover:underline"
                  >
                    Venue workspace
                  </Link>

                  <a
                    href="/elements-workspace"
                    className="mr-4 hover:underline"
                  >
                    Elements Workspace
                  </a>
                </div>
              </nav>
            </header>
            <main>{children}</main>
          </GlobalVenueProvider>
        </StateProvider>
      </body>
    </html>
  );
}
