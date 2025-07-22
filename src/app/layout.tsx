import "./globals.css";
import AuthProvider from "@/lib/providers/authProvider";
import { Toaster as Sonner } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Sonner richColors expand={true} position="bottom-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
