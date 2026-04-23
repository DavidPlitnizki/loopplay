import { IoConstructOutline } from "react-icons/io5";

interface ComingSoonProps {
  title: string;
}

export function ComingSoon({ title }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 border border-white/10 mb-6">
        <IoConstructOutline className="text-4xl text-white/30" />
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
      <p className="text-sm text-white/40 max-w-sm">
        This section is currently in development. Check back soon.
      </p>
    </div>
  );
}
