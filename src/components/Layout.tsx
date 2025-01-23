import { AppProps } from "next/app";

export default function Layout({ Component, pageProps }: AppProps) {
  return (
    <main className="h-screen w-screen relative overflow-hidden">
      <Component {...pageProps} />
    </main>
  );
}
