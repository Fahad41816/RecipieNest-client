export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "RecipeNest",
  description: " A cozy place for food lovers",
  navItems: [
    {
      label: "Feed",
      href: "/",
    },
    {
      label: "My Recipe",
      href: "/myRecipe",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {},
};
