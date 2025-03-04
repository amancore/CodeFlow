import localFont from "next/font/local";
import "./globals.css";

const A = localFont({
	src: "./fonts/SF-Pro-Display-Regular.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const B = localFont({
	src: "./fonts/SF-Pro-Display-Regular.woff",
	variable: "--font-geist-mono",
	weight: "100 700",
});

export const metadata = {
  title: "Code Flow",
  description: "Explore and learn algorithms through visualization.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${A.variable} ${B.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}