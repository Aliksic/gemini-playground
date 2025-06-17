addEventListener("fetch", (event) => {
  // 拼接 Gemini 官方地址（去掉反代域名，保留路径）
  const geminiPath = event.request.url.replace(/^https?:\/\/[^/]+/, "");
  const geminiUrl = `https://generativelanguage.googleapis.com${geminiPath}`;
  
  // 透传请求到 Gemini 官方
  event.respondWith(
    fetch(geminiUrl, {
      method: event.request.method,
      headers: event.request.headers,
      body: event.request.body
    }).then((res) => {
      // 强制设置 JSON 响应头，确保返回格式
      return new Response(res.body, {
        status: res.status,
        headers: { ...Object.fromEntries(res.headers), "Content-Type": "application/json" }
      });
    })
  );
});
