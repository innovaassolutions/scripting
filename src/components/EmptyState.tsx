import Image from "next/image";
import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <Image
        src="/scriptwriter.png"
        alt="Create your first script"
        width={120}
        height={120}
        className="rounded-full mb-6 opacity-80"
      />
      <h2 className="text-xl font-semibold text-dark-brown mb-2">
        No scripts yet
      </h2>
      <p className="text-charcoal/60 mb-6 max-w-sm">
        Create your first script using The Creator&apos;s Script Template and
        start preparing for your next video.
      </p>
      <Link
        href="/scripts/new"
        className="bg-dark-brown text-cream px-6 py-3 rounded-lg font-medium hover:bg-dark-brown/90 transition-colors"
      >
        Create Your First Script
      </Link>
    </div>
  );
}
