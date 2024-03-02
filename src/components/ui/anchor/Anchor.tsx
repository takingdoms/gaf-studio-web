import React from 'react';

type AnchorProps = {
  href: string;
  children: React.ReactNode;
  newTab?: boolean;
};

export default function Anchor({ href, children, newTab }: AnchorProps) {
  return (
    <a
      href={href}
      className="text-sky-600 hover:text-sky-500 underline"
      target={newTab ? '_blank' : undefined}
    >
      {children}
    </a>
  );
}
