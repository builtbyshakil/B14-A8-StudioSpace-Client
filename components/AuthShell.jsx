import { FcGoogle } from "react-icons/fc";

export function GoogleButton({ onClick, disabled, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="btn btn-outline w-full"
    >
      <FcGoogle size={20} />
      {label}
    </button>
  );
}

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="container-page flex justify-center py-12 md:py-16">
      <div className="card-surface w-full max-w-md p-8">
        <h1 className="text-3xl font-extrabold">{title}</h1>
        <p className="mt-2 text-base-content/70">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
