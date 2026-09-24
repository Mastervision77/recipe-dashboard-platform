export function Footer() {
  return (
    <footer className="border-t border-black/5 py-4">
      <div className="container text-sm text-text-primary/60">
        © {new Date().getFullYear()} Recipe
      </div>
    </footer>
  );
}
