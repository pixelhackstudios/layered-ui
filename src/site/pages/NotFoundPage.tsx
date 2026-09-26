import { ButtonLink } from "../components/ButtonLink";

export function NotFoundPage() {
  return (
    <section className="not-found">
      <p className="eyebrow">Error 404</p>
      <h1>No signal on this channel.</h1>
      <p>That page doesn't exist. It may have moved, or the link may be mistyped.</p>
      <ButtonLink to="/">Back to the start</ButtonLink>
    </section>
  );
}
