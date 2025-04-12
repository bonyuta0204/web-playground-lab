import { Link } from 'react-router-dom';

interface ExperimentCard {
  title: string;
  description: string;
  path: string;
  tags: string[];
}

const Home = () => {
  const experiments: ExperimentCard[] = [
    {
      title: 'Fullscreen API Demo',
      description: 'Explore the browser Fullscreen API with a simple interactive demo.',
      path: '/fullscreen',
      tags: ['Browser API', 'UI/UX'],
    },
    {
      title: 'D3.js Bar Chart',
      description: 'Interactive data visualization using the D3.js library.',
      path: '/d3-bar-chart',
      tags: ['Data Visualization', 'D3.js'],
    },
    {
      title: 'DFS Algorithm Visualization',
      description: 'Visual representation of the Depth-First Search graph traversal algorithm.',
      path: '/dfs-visualization',
      tags: ['Algorithm', 'Canvas', 'Animation'],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Web Playground Lab</h1>
        <p className="text-xl text-gray-600">
          A collection of web experiments, visualizations, and demos to explore modern web technologies.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Experiments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiments.map((experiment) => (
            <div 
              key={experiment.path}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{experiment.title}</h3>
                <p className="text-gray-600 mb-4">{experiment.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {experiment.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link 
                  to={experiment.path}
                  className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                >
                  View Experiment
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">About This Project</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="mb-4">
            Web Playground Lab is a personal project for experimenting with modern web technologies,
            visualizing algorithms, and testing out new browser APIs.
          </p>
          <p>
            Each experiment is self-contained and demonstrates a specific concept, library, or technique.
            Feel free to explore the code and learn how these demos are implemented!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
