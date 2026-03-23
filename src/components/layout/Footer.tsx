export default function Footer() {
  return (
    <footer className="mt-auto border-t border-wh/5 bg-ink2/50 py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-5 w-7 flex-col overflow-hidden rounded-[3px]">
              <div className="bg-g flex-1" />
              <div className="bg-y flex-1" />
              <div className="bg-b flex-1" />
            </div>
            <span className="font-head text-sm font-bold text-wh">
              GABON FÉRIÉS
            </span>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="text-xs text-muted transition-colors hover:text-g">À propos</a>
            <a href="#" className="text-xs text-muted transition-colors hover:text-g">API</a>
            <a href="#" className="text-xs text-muted transition-colors hover:text-g">Contact</a>
          </div>

          <div className="text-[11px] text-muted">
            © {new Date().getFullYear()} Gabon Fériés. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
}
