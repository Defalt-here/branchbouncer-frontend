export async function GET() {
  // Update baseUrl if you deploy to a different domain
  const baseUrl = "https://branchbouncer.vercel.app";

  const pages = ["/", "/bouncer-generator", "/docs"];

  const urls = pages
    .map((path) => {
      const loc = `${baseUrl}${path}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`;
    })
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
