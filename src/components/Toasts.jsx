import { useStore } from '../context/StoreContext';

// Renders the toast stack from StoreContext (bottom-right notifications).
export default function Toasts() {
  const { toasts } = useStore();
  return (
    <div className="toast-stack" aria-live="polite">
      {toasts.map((t) => (
        <div className="toast" key={t.id}>
          <span className="t-dot" />
          {t.msg}
        </div>
      ))}
    </div>
  );
}
