export default function HomeLoading() {
  return (
    <div aria-busy="true">
      <span className="sr-only" role="status">
        Caricamento in corso…
      </span>
      <section className="flex min-h-[100svh] items-end bg-ink pb-24">
        <div className="container-page space-y-6">
          <div className="skeleton-dark h-9 w-72 rounded-full" />
          <div className="skeleton-dark h-32 w-full max-w-4xl rounded-3xl sm:h-56" />
          <div className="skeleton-dark h-6 w-full max-w-lg rounded-full" />
        </div>
      </section>
    </div>
  );
}
