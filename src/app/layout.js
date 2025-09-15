import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
	title: "Code Flow",
	description: "Explore and learn algorithms through visualization.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${inter.variable} antialiased`}>{children}</body>
		</html>
	);
}
