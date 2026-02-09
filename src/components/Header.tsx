import Image from "next/image";
import Link from "next/link";

export default function Header({ minimal = false }: { minimal?: boolean }) {
  return (
    <header className="w-full px-4 py-3 flex items-center gap-3">
      <Link href="/scripts" className="flex items-center gap-3">
        <Image
          src="/scriptwriter.png"
          alt="The Creator's Script"
          width={minimal ? 32 : 48}
          height={minimal ? 32 : 48}
          className="rounded-full"
        />
        {!minimal && (
          <h1 className="text-lg font-semibold text-dark-brown">
            The Creator&apos;s Script
          </h1>
        )}
      </Link>
    </header>
  );
}
