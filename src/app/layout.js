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
			<head>
				<title>Code Flow</title>
				<meta
					name="description"
					content="Explore and learn algorithms through visualization."
				/>
				<link rel="icon" href="/code.svg" type="image/svg+xml" />
			</head>
			<body className={`${inter.variable} antialiased`}>{children}</body>
		</html>
	);
}
