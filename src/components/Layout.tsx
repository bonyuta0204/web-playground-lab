import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

interface NavItem {
  path: string;
  label: string;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems: NavItem[] = [
    { path: '/', label: 'Home' },
    { path: '/fullscreen', label: 'Fullscreen Demo' },
    { path: '/d3-bar-chart', label: 'D3 Bar Chart' },
    { path: '/dfs-visualization', label: 'DFS Visualization' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Web Playground Lab</h1>
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`hover:text-indigo-200 transition-colors ${currentPath === item.path ? 'font-bold underline' : ''}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <nav className="md:hidden mt-4">
            <ul className="flex flex-wrap gap-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`hover:text-indigo-200 transition-colors ${currentPath === item.path ? 'font-bold underline' : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>Web Playground Lab - A personal frontend experiment space</p>
          <p className="text-sm mt-2">Built with React, Vite, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
