import Link from 'next/link';

export default function Blog() {
  return (
    <div>
      <h1>Welcome to the Blog</h1>
      <Link href="/blog/test">First blog entry</Link>
    </div>
  );
}
