export default {
    async fetch(request, env, ctx) {
      const url = new URL(request.url);
      const acceptHeader = request.headers.get("accept") || "";
  
      if (acceptHeader.includes("text/markdown")) {
        url.pathname = "/index.md"; 
        
        let response = await env.ASSETS.fetch(url.toString(), request);
        
        response = new Response(response.body, response);
        response.headers.set("Content-Type", "text/markdown; charset=utf-8");
        response.headers.set("x-markdown-tokens", "true"); 
        return response;
      }
  
      return env.ASSETS.fetch(request);
    }
  };