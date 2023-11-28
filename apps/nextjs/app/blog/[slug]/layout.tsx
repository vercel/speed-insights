import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/blog/some-slug">Some post</Link>
          </li>
          <li>
            <Link href="/blog/another-slug">Another post</Link>
          </li>
          <li>
            <Link href="/blog/test">Testing article</Link>
          </li>
          <li>
            <Link href="/blog">Blog Home</Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
