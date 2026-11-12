export default function EmptyState({ icon, title, text, children }) {
  return (
    <div className="card-surface flex flex-col items-center px-6 py-16 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 max-w-md text-base-content/70">{text}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}
