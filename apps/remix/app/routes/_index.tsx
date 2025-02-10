import { Link } from '@remix-run/react';

export default function Home() {
  return (
    <main>
      <h1>Speed Insights Demo</h1>
      <Link to="/blog/henri">About Henri</Link>
      <br />
      <Link to="/blog/bruno">About Bruno</Link>
    </main>
  );
}
