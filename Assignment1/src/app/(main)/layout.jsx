import { Footer } from "@/components/footer";
import Header from "@/components/header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen"> 
          <Header />
          <main className="flex-grow"> 
          {children}
          </main>
          <Footer /> 
        </div>
      </body>
    </html>
  );
}
