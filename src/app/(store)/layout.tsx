// src/app/(store)/layout.tsx
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { CartSidebar } from "@/components/store/CartSidebar";
import { AgeVerificationModal } from "@/components/store/AgeVerificationModal";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AgeVerificationModal />  {/* ✅ Modal +18 */}
      <Navbar />
      <CartSidebar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}