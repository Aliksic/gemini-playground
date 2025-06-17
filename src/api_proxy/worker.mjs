addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  e.respondWith(
    fetch(`https://generativelanguage.googleapis.com${u.pathname}`, {
      method: e.request.method,
      headers: e.request.headers,
      body: e.request.body
    }).then(r => new Response(r.body, {
      status: r.status,
      headers: { ...r.headers, "Content-Type": "application/json" }
    }))
  );
});
