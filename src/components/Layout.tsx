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
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar for desktop */}
      <aside className="bg-indigo-600 text-white w-full md:w-64 md:min-h-screen md:fixed">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-6">Web Playground Lab</h1>
          <nav>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`block py-2 px-4 rounded hover:bg-indigo-700 transition-colors ${currentPath === item.path ? 'bg-indigo-700 font-bold' : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64">
        <main className="container mx-auto px-4 py-8 flex-grow">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p>Web Playground Lab - A personal frontend experiment space</p>
            <p className="text-sm mt-2">Built with React, Vite, and Tailwind CSS</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
