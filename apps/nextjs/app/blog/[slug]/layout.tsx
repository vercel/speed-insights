import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>
        <Link href="/blog/some-slug">Some post</Link>
        <Link href="/blog/another-slug">Another post</Link>
        <Link href="/blog/test">Testin</Link>
      </nav>
      {children}
    </div>
  );
}
