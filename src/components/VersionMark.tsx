import { APP_BUILD_LABEL, APP_BUILT_AT } from '../version';

/** Persistent watermark so you can confirm the deployed build after refresh. */
export function VersionMark() {
  return (
    <div className="version-mark" title={`Built ${APP_BUILT_AT}`}>
      {APP_BUILD_LABEL}
      <span className="version-mark__time">{APP_BUILT_AT}</span>
    </div>
  );
}
