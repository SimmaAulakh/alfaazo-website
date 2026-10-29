import type { IconName } from "../ui/Icon";

export interface NavItem {
  href: string;
  label: string;
  icon: IconName;
  /** One line shown under the page title. */
  description: string;
}

export interface NavGroup {
  heading: string | null;
  items: NavItem[];
}

export const NAV: NavGroup[] = [
  {
    heading: null,
    items: [
      { href: "/admin", label: "Overview", icon: "overview", description: "The headline numbers for the selected period." },
    ],
  },
  {
    heading: "Users",
    items: [
      { href: "/admin/growth", label: "Growth", icon: "growth", description: "Sign-ups, total users and onboarding." },
      { href: "/admin/audience", label: "Audience", icon: "audience", description: "Who your learners are: age and Punjabi background." },
      { href: "/admin/retention", label: "Retention", icon: "retention", description: "How many learners come back after signing up." },
    ],
  },
  {
    heading: "Product",
    items: [
      { href: "/admin/engagement", label: "Engagement", icon: "engagement", description: "Daily activity, XP, streaks and levels." },
      { href: "/admin/learning", label: "Learning", icon: "learning", description: "Course progress and completion for every lesson." },
    ],
  },
  {
    heading: "Business",
    items: [
      { href: "/admin/revenue", label: "Revenue", icon: "revenue", description: "Paid subscribers and conversion." },
    ],
  },
];

export const ALL_ITEMS: NavItem[] = NAV.flatMap((g) => g.items);

export function itemForPath(pathname: string): NavItem {
  return (
    ALL_ITEMS.filter((i) => i.href !== "/admin").find((i) => pathname.startsWith(i.href)) ??
    ALL_ITEMS[0]
  );
}
