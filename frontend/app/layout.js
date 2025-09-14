import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "松山機場航班即時到站",
  description: "即時查詢松山機場國際航班到站資訊",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
