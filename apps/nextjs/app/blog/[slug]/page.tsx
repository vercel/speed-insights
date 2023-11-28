export default function Blog({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return <div>My blog page {slug}</div>;
}
