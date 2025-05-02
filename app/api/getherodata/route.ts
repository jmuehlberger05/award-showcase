export async function GET() {
  const res = await fetch(`${process.env.HERO_DATA_URL}`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    return new Response("Error fetching data", { status: 500 });
  }
  const data = await res.json();

  return Response.json({ data });
}
