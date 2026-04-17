import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

export default function ScrollButtons() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2">
      <button
        onClick={scrollToTop}
        aria-label="Ir arriba"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-light/80 text-gray-400 backdrop-blur-sm transition-colors hover:bg-brand hover:text-black"
      >
        <MdKeyboardArrowUp className="text-xl" />
      </button>
      <button
        onClick={scrollToBottom}
        aria-label="Ir abajo"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-light/80 text-gray-400 backdrop-blur-sm transition-colors hover:bg-brand hover:text-black"
      >
        <MdKeyboardArrowDown className="text-xl" />
      </button>
    </div>
  );
}
