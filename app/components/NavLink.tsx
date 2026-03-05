"use client";
import { usePathname } from "next/navigation";
import { UtensilsCrossed, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";

const icons = {
  utensils: UtensilsCrossed,
  plus: Plus,
  cart: ShoppingCart,
} as const;

export default function NavLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: keyof typeof icons;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const Icon = icons[icon];

  return (
    <Link
      href={href}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-200 ${
        isActive
          ? "bg-secondary text-white shadow-md"
          : "text-tertiary/70 hover:text-accent hover:bg-white/10"
      }`}
    >
      <Icon size={16} />
      {label}
    </Link>
  );
}
