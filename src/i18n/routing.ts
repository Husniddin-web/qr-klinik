import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["uz", "kr"],
  defaultLocale: "uz",
  localePrefix: "as-needed",
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
