import React, { ReactNode } from 'react';

import { Navbar } from './Navbar/Navbar';

type LayoutProps = {
  children: ReactNode;
};
const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export const Layout = LayoutComponent;
