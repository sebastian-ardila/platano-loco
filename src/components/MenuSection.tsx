import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { allCategoriesWithVegetarian, formatPrice, type MenuItem } from '../data/menu';
import { ForkKnife, Hamburger, Dog, CookingPot, BeerBottle, Plus, Leaf } from '@phosphor-icons/react';
import { MdAdd, MdRemove, MdClose } from 'react-icons/md';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  ForkKnife,
  Hamburger,
  Dog,
  CookingPot,
  Beer: BeerBottle,
  Plus,
  Leaf,
};

export default function MenuSection() {
  const { t, i18n } = useTranslation();
  const en = i18n.language === 'en';
  const { items: cartItems, addItem, updateQuantity } = useCart();
  const categories = allCategoriesWithVegetarian();

  const [activeCategory, setActiveCategory] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const isScrolling = useRef(false);
  const selectorRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const NAVBAR_H = 64;
  const SELECTOR_H = 80;
  const OFFSET = NAVBAR_H + SELECTOR_H + 16;

  const getCartQuantity = (itemId: string) => {
    const ci = cartItems.find((c) => c.item.id === itemId);
    return ci ? ci.quantity : 0;
  };

  // Scroll spy with IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const selectorObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !isScrolling.current) {
          // Selector not visible — user is at hero or elsewhere
        }
      },
      { threshold: 0 }
    );

    if (selectorRef.current) {
      selectorObserver.observe(selectorRef.current);
    }

    const categoryObserver = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return;

        let topEntry: IntersectionObserverEntry | null = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!topEntry || entry.boundingClientRect.top < topEntry.boundingClientRect.top) {
              topEntry = entry;
            }
          }
        });

        if (topEntry) {
          const id = (topEntry as IntersectionObserverEntry).target.getAttribute('data-category');
          if (id) setActiveCategory(id);
        }
      },
      {
        rootMargin: `-${NAVBAR_H + SELECTOR_H}px 0px -60% 0px`,
        threshold: 0,
      }
    );

    categories.forEach((cat) => {
      const el = sectionRefs.current[cat.id];
      if (el) categoryObserver.observe(el);
    });

    observers.push(selectorObserver, categoryObserver);

    // Initial detection for page refresh
    setTimeout(() => {
      if (isScrolling.current) return;
      categories.forEach((cat) => {
        const el = sectionRefs.current[cat.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.5 && rect.bottom > OFFSET) {
            setActiveCategory(cat.id);
          }
        }
      });
    }, 100);

    return () => {
      observers.forEach((o) => o.disconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToCategory = useCallback(
    (catId: string) => {
      const el = sectionRefs.current[catId];
      if (!el) return;

      isScrolling.current = true;
      setActiveCategory(catId);

      const top = el.offsetTop - OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });

      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    },
    [OFFSET]
  );

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName];
    return Icon ? <Icon size={16} /> : null;
  };


  return (
    <section id="carta" className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="mb-6 text-center text-3xl font-bold">{t('menu.title')}</h2>

      {/* Category selector */}
      <div
        ref={selectorRef}
        className="sticky bg-[#111111] py-3 shadow-lg shadow-black/30 z-40"
        style={{ top: NAVBAR_H }}
      >
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-brand text-black'
                  : 'bg-surface-light text-gray-400 hover:bg-border hover:text-white'
              }`}
            >
              {getIcon(cat.icon)}
              {en ? cat.name.en : cat.name.es}
            </button>
          ))}
        </div>
      </div>

      {/* Category sections */}
      {categories.map((cat) => (
        <div
          key={cat.id}
          id={cat.id}
          data-category={cat.id}
          ref={(el) => { sectionRefs.current[cat.id] = el; }}
          className="pt-8"
        >
          <h3 className="mb-4 text-2xl font-bold">{en ? cat.name.en : cat.name.es}</h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {cat.items.map((item) => {
              const qty = getCartQuantity(item.id);
              return (
                <div
                  key={item.id}
                  className="flex h-[280px] flex-col overflow-hidden rounded-2xl bg-surface"
                >
                  {/* Image placeholder */}
                  <div className="relative flex h-28 items-center justify-center bg-surface-light">
                    <img
                      src={import.meta.env.BASE_URL + 'platano-loco-logo.webp'}
                      alt=""
                      className="h-16 object-contain opacity-15"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-3">
                    <p className="text-sm font-bold leading-tight text-white line-clamp-1">
                      {en ? item.name.en : item.name.es}
                    </p>
                    <p className="mt-1 text-xs leading-tight text-gray-400 line-clamp-2">
                      {en ? item.ingredients.en : item.ingredients.es}
                    </p>
                    {item.quantity && (
                      <p className="mt-0.5 text-xs text-gray-500">{item.quantity}</p>
                    )}
                    <p className="mt-auto font-bold text-brand">{formatPrice(item.price)}</p>
                  </div>

                  {/* Buttons */}
                  <div className="px-3 pb-3">
                    <div className="flex flex-col gap-1.5 sm:flex-row">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="flex-1 rounded-lg bg-surface-light px-2 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:bg-border"
                      >
                        {t('menu.viewDish')}
                      </button>
                      {qty === 0 ? (
                        <button
                          onClick={() => addItem(item)}
                          className="flex-1 rounded-lg bg-brand px-2 py-1.5 text-xs font-medium text-black transition-colors hover:bg-brand-dark"
                        >
                          {t('menu.add')}
                        </button>
                      ) : (
                        <div className="flex flex-1 items-center justify-between rounded-lg bg-brand px-3 py-1.5 text-black">
                          <button onClick={() => updateQuantity(item.id, qty - 1)}>
                            <MdRemove className="text-sm" />
                          </button>
                          <span className="text-xs font-bold">{qty}</span>
                          <button onClick={() => updateQuantity(item.id, qty + 1)}>
                            <MdAdd className="text-sm" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Product detail modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedItem(null)} />
          <div className="relative w-[90%] max-w-md rounded-2xl bg-surface p-6">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <MdClose className="text-2xl" />
            </button>

            <div className="mb-4 flex h-40 items-center justify-center rounded-xl bg-surface-light">
              <img
                src={import.meta.env.BASE_URL + 'platano-loco-logo.webp'}
                alt=""
                className="h-20 object-contain opacity-15"
              />
            </div>

            <h3 className="mb-2 text-xl font-bold text-white">
              {en ? selectedItem.name.en : selectedItem.name.es}
            </h3>

            <p className="mb-3 text-sm text-gray-400">
              {en ? selectedItem.ingredients.en : selectedItem.ingredients.es}
            </p>

            {selectedItem.quantity && (
              <p className="mb-2 text-sm text-gray-500">{selectedItem.quantity}</p>
            )}

            <p className="mb-4 text-xl font-bold text-brand">
              {formatPrice(selectedItem.price)}
            </p>

            {(() => {
              const q = getCartQuantity(selectedItem.id);
              return q === 0 ? (
                <button
                  onClick={() => {
                    addItem(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="w-full rounded-xl bg-brand py-3 font-bold text-black transition-colors hover:bg-brand-dark"
                >
                  {t('menu.add')}
                </button>
              ) : (
                <div className="flex items-center justify-center gap-4 rounded-xl bg-brand py-3 text-black">
                  <button onClick={() => updateQuantity(selectedItem.id, q - 1)}>
                    <MdRemove className="text-xl" />
                  </button>
                  <span className="text-lg font-bold">{q}</span>
                  <button onClick={() => updateQuantity(selectedItem.id, q + 1)}>
                    <MdAdd className="text-xl" />
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}
