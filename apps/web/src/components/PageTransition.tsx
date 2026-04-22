// View Transitions are handled globally via CSS (globals.css ::view-transition-*)
// and enabled in next.config.ts experimental.viewTransition.
// This wrapper just provides a consistent layout container.
export function PageTransition({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
