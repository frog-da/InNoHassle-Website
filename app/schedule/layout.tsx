import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
