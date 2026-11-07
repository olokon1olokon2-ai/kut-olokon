  } catch (error) {
    console.error('KUT API ERROR:', {
      message: error?.message || String(error),
      code: error?.code || null,
      detail: error?.detail || null,
      hint: error?.hint || null,
      stack: error?.stack || null
    });

    const status = Number(error?.status) || 500;

    return json({
      error: status >= 500
        ? 'Внутренняя ошибка сервера. Проверьте настройки Cloudflare, Hyperdrive и базы данных.'
        : error.message
    }, status);
  }
};
