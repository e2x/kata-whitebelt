'use client';

import './globals.css'
import KataHead from "@/app/kataHead";

export const metadata = {
  title: 'KATA Whitebelt',
  description: 'Welcome to KATA Whitebelt',
  navigation: [],
  userNavigation: [],
};

export default function RootLayout({
  children, params
}: {
  children: React.ReactNode
  params: Record<string, string>
}) {
  console.log((params as any));

  return (
    <html lang="en" className="h-full bg-gray-100">

    {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <KataHead />
      <body className="h-full">
        {children}
      </body>
    </html>
  )
}
