import PropTypes from 'prop-types';

export default function SearchResults({ results = [], closeSearch }) {
  if (results.length === 0) {
    return;
  }

  return (
    <div className="absolute top-0 left-0 w-full bg-white dark:bg-gray-800 z-50">
      <div className="container mx-auto py-4">
        <button onClick={closeSearch} className="text-gray-600 dark:text-gray-300">
          Close
        </button>
        <ul>
          {results.map((result) => (
            <li key={result.slug} className="border-b border-gray-200 dark:border-gray-700">
              <a href={`/posts/${result.slug}`} className="block p-4 hover:bg-gray-100 dark:hover:bg-gray-700">
                {result.frontmatter.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

SearchResults.propTypes = {
  results: PropTypes.array,
  closeSearch: PropTypes.func.isRequired,
};