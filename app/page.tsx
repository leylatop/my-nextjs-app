import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
export default function Home() {
  const LinkList = [
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Todo',
      href: '/todo',
    },
    {
      label: 'GridTrade',
      href: '/grid-trade',
    }
  ]
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {
          LinkList.map((link) => (
            <Link href={link.href} legacyBehavior passHref key={link.href}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {link.label}
              </NavigationMenuLink>
            </Link>
          ))
        }
      </NavigationMenuList>
    </NavigationMenu>
  );
}
