// src/lib/basePath.js
export function getBasePath() {
    return import.meta.env.BASE_URL;
}

export function withBasePath(path) {
    const base = getBasePath();
    return `${base}${path.startsWith('/') ? path.slice(1) : path}`;
}