import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-100 h-[60px] border-b border-wh/10 bg-ink/85 px-6 backdrop-blur-xl md:px-10">
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center gap-5">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div className="flex h-5 w-7 flex-col overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(255,255,255,0.15)]">
              <div className="bg-g flex-1" />
              <div className="bg-y flex-1" />
              <div className="bg-b flex-1" />
            </div>
            <span className="font-head text-base font-semibold tracking-tight text-wh">
              Gabon <em>Fériés</em>
            </span>
          </Link>
          <div className="h-5 w-px bg-wh/12" />
          <span className="font-mono text-[11px] font-medium tracking-wide text-muted">
            V1.0.0
          </span>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="#calendrier" className="font-body text-xs font-medium text-muted transition-colors hover:text-wh">
            Calendrier
          </Link>
          <Link href="#import" className="font-body text-xs font-medium text-muted transition-colors hover:text-wh">
            S'abonner
          </Link>
          <button className="rounded-lg bg-g px-3.5 py-1.5 font-body text-xs font-semibold text-wh transition-all hover:-translate-y-0.5 hover:bg-g-d">
            Admin
          </button>
        </nav>
      </div>
    </header>
  );
}
