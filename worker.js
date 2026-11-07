import api from './netlify/functions/api.mjs';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
      return api(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
