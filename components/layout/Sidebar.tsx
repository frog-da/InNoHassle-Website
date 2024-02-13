"use client";
import SwitchThemeButton from "@/components/layout/SwitchThemeButton";
import UserMenu from "@/components/layout/UserMenu";
import { useUsersGetMe } from "@/lib/events";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import Logo from "../icons/Logo";
import SidebarSection from "./SidebarSection";

type Item = {
  title: string;
  path: string;
  icon: React.ReactNode;
};

const items: Item[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: (
      <span className="icon-[material-symbols--space-dashboard-outline] text-4xl" />
    ),
  },
  {
    title: "Schedule",
    path: "/schedule",
    icon: (
      <span className="icon-[material-symbols--calendar-month-outline-rounded] text-4xl" />
    ),
  },
  {
    title: "Scholarship",
    path: "/scholarship",
    icon: (
      <span className="icon-[material-symbols--credit-card-outline] text-4xl" />
    ),
  },
  {
    title: "Music room",
    path: "/music-room",
    icon: <span className="icon-[material-symbols--piano] text-4xl" />,
  },
];

const externalItems: Item[] = [
  {
    title: "Sports",
    path: "https://sport.innopolis.university",
    icon: (
      <span className="icon-[material-symbols--exercise-outline] text-4xl" />
    ),
  },
  {
    title: "Moodle",
    path: "https://moodle.innopolis.university",
    icon: (
      <span className="icon-[material-symbols--school-outline-rounded] text-4xl" />
    ),
  },
  {
    title: "Baam",
    path: "https://baam.duckdns.org/s",
    icon: (
      <span className="icon-[material-symbols--qr-code-rounded] text-4xl" />
    ),
  },
  {
    title: "Innopoints",
    path: "https://ipts.innopolis.university/",
    icon: (
      <span className="icon-[material-symbols--loyalty-outline-rounded] text-4xl" />
    ),
  },
  {
    title: "My University",
    path: "https://my.university.innopolis.ru",
    icon: (
      <span className="icon-[material-symbols--account-circle-outline] text-4xl" />
    ),
  },
];

export const SidebarContext = React.createContext<{
  isOpened: boolean;
  setOpened: (opened: boolean) => void;
  isMobile: boolean;
}>({ isOpened: false, setOpened: () => {}, isMobile: false });

function Sidebar({ children }: React.PropsWithChildren) {
  const { data: user } = useUsersGetMe();
  const pathname = usePathname();
  const currentItem = items.find((v) => pathname.startsWith(v.path));
  const selection = currentItem?.title;
  const isMobile = !useMediaQuery(
    "(min-width: 1024px) and (min-height: 600px)",
  );
  const [isOpened, setOpened] = useState(false);

  return (
    <SidebarContext.Provider value={{ isOpened, setOpened, isMobile }}>
      <div className="absolute flex flex-col lgw-smh:hidden">
        <div
          className={clsx(
            "fixed inset-0 transition-colors",
            isOpened ? "visible z-[2] block bg-black/50" : "z-[-1] bg-black/0",
          )}
          onClick={() => setOpened(false)}
        />
        <aside
          className={clsx(
            "bg-pink fixed top-0 z-10 h-[100dvh] flex-col items-center justify-center overflow-y-auto px-8 py-8",
            "transition-transform",
            isOpened
              ? "translate-x-0 transform bg-primary-main"
              : "  -translate-x-full transform bg-primary-main",
          )}
        >
          <div className="left-0 flex h-full flex-col items-center opacity-100">
            <Link
              href={user ? "/dashboard" : "/schedule"}
              onClick={() => setOpened(false)}
              className="mb-4 flex"
            >
              <Logo className="fill-text-main" />
            </Link>
            <nav className="flex-col">
              {items.map((item) => (
                <div
                  key={item.title}
                  onClick={() =>
                    item.path !== "#" ? setOpened(false) : undefined
                  }
                >
                  <SidebarSection
                    title={item.title}
                    icon={item.icon}
                    selected={selection === item.title}
                    path={item.path}
                    onClick={() => setOpened(false)}
                  />
                </div>
              ))}
              <div className="mx-2.5 my-1 h-0.5 rounded-full bg-gray-500/20" />
              {externalItems.map((item) => (
                <div
                  key={item.title}
                  onClick={() =>
                    item.path !== "#" ? setOpened(false) : undefined
                  }
                >
                  <SidebarSection
                    title={item.title}
                    icon={item.icon}
                    selected={false}
                    path={item.path}
                    onClick={() => setOpened(false)}
                    external={true}
                  />
                </div>
              ))}
            </nav>
            <div className="flex grow"></div>
            <br />
            <div className="mb-2 flex w-full flex-row items-center justify-center gap-4">
              <SwitchThemeButton />
              <UserMenu isMobile={true} isSidebar={true} />
            </div>
            <a
              className="w-full text-center"
              href="https://t.me/one_zero_eight"
            >
              one-zero-eight 💜
            </a>
          </div>
        </aside>
      </div>
      <aside className="sticky top-0 hidden h-[100dvh] flex-col items-center bg-primary-main px-8 py-4 lgw-smh:flex">
        <Link
          href={user ? "/dashboard" : "/schedule"}
          onClick={() => setOpened(false)}
          className="mb-4"
        >
          <Logo className="fill-text-main" />
        </Link>
        <nav className="flex flex-col">
          {items.map((item) => (
            <SidebarSection
              key={item.title}
              title={item.title}
              icon={item.icon}
              selected={selection === item.title}
              path={item.path}
              onClick={() => setOpened(false)}
            />
          ))}
          <div className="mx-2.5 my-1 h-0.5 rounded-full bg-gray-500/20" />
          {externalItems.map((item) => (
            <div
              key={item.title}
              onClick={() => (item.path !== "#" ? setOpened(false) : undefined)}
            >
              <SidebarSection
                title={item.title}
                icon={item.icon}
                selected={false}
                path={item.path}
                onClick={() => setOpened(false)}
                external={true}
              />
            </div>
          ))}
        </nav>
        <div className="grow"></div>
        <br />
        <div className="mb-4 lgw-smh:invisible lgw-smh:hidden">
          <UserMenu isMobile={false} isSidebar={true} />
        </div>
        <a href="https://t.me/one_zero_eight">
          See you at
          <br />
          <span className="underline underline-offset-2">
            one-zero-eight
          </span>{" "}
          💜
        </a>
      </aside>
      {children}
    </SidebarContext.Provider>
  );
}

export function SidebarMenuButton({ className }: { className?: string }) {
  const { isOpened, setOpened } = React.useContext(SidebarContext);

  return (
    <button className={className} onClick={() => setOpened(!isOpened)}>
      <span className="icon-[material-symbols--menu] text-4xl" />
    </button>
  );
}

export default Sidebar;
