/** Bump when shipping a user-visible change — match this string in chat. */
export const APP_VERSION = '1.8.0';

export const APP_BUILD_LABEL = `v${APP_VERSION}`;

/** Injected at Vite build time (see vite.config.ts). Fallback for local dev. */
declare const __BF_BUILT_AT__: string | undefined;

export const APP_BUILT_AT =
  typeof __BF_BUILT_AT__ !== 'undefined' ? __BF_BUILT_AT__ : 'dev';
