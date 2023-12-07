import { Link } from '@remix-run/react';

export default function BlogPage() {
  return (
    <div>
      <h1>Blog</h1>
      <p>Blog content goes here</p>
      <Link to="/blog/first">First post</Link>
      <Link to="/blog/second">First second</Link>
    </div>
  );
}
