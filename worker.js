import api from './netlify/functions/api.mjs';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) return api(request, env);
    if (url.pathname === '/login' || url.pathname === '/login/') {
      return env.ASSETS.fetch(new Request(new URL('/login.html', url), request));
    }
    if (url.pathname === '/setup' || url.pathname === '/setup/') {
      return env.ASSETS.fetch(new Request(new URL('/setup.html', url), request));
    }
    return env.ASSETS.fetch(request);
  },
};
