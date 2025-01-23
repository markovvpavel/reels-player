import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 h-[50px] md:h-[69px] w-full px-[20px] flex items-center justify-between z-[1000] bg-zinc-100">
      <Logo />
      <Link href={"/about"}>
        <span className="cursor-pointer">About Us</span>
      </Link>
    </header>
  );
}

const Logo = () => {
  return (
    <a className="cursor-pointer" href="/">
      <Image
        alt="logo"
        className="h-[20px] w-auto"
        src={`/logo.svg`}
        height={0}
        width={0}
      />
    </a>
  );
};
