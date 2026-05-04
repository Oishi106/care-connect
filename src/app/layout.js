import "./globals.css";
import ConditionalLayout from "@/component/ConditionalLayout";

export const metadata = {
  title: "CareConnect - Trusted Care for Your Loved Ones",
  description: "Professional child and adult care services. Find verified caregivers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
