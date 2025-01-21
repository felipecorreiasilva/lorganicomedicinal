import type { Metadata } from "next";
import MainContainer from "@/components/MainContainer";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProductsProvider } from "@/context/CartContext";
import { CartModalProvider } from "@/context/CartModalContext";
import { ContactProvider } from "@/context/MyContactContext";
import { SendingToProvider } from "@/context/SendingToContext";
import { DeliveryMethodProvider } from "@/context/DeliveryMethodContext";
import { IdentificationProvider } from "@/context/IdentificationContext";
import { PaymentMethodProvider } from "@/context/PaymentMethodContext";

export const metadata: Metadata = {
  title: "L´Organico Medicinal",
  description: "L´Organico Medicinal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth overflow-x-hidden" lang="pt-BR">
      <body
        className={``}
      >
        <PaymentMethodProvider>
        <IdentificationProvider>
        <DeliveryMethodProvider>
        <SendingToProvider>
        <ContactProvider>
        <CartModalProvider>
        <ProductsProvider>
        <Header/>
        
        <MainContainer>
        {children}
        </MainContainer>

        <Footer />
        </ProductsProvider>
        </CartModalProvider>
        </ContactProvider>
        </SendingToProvider>
        </DeliveryMethodProvider>
        </IdentificationProvider>
        </PaymentMethodProvider>
      </body>
    </html>
  );
}
