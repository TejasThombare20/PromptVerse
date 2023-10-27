// import './globals.css'
import "@styles/globals.css";
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
import Provider from "@component/Provider";
import Nav from "@component/Nav";

export const metadata = {
  title: "PromptVerse",
  description:
    "share and excahnge the effective and efficient prompt for Chat GPT ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={inter.className}>{children}</body> */}
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />

            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
