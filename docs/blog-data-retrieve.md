## BlogContext (Data Provider)

The `BlogContext` is a **React Context** that manages and provides blog data to components throughout the application. It ensures that blog posts are fetched once and then made available to any component that needs them, preventing redundant API calls.

### Key Features

* **Centralized Data Fetching**: It uses the `useEffect` hook to fetch blog data from your API (`${API_BASE_URL}/api/blogs?populate[0]=image`) when the `BlogProvider` component mounts.
* **Single Fetch Optimization**: The `useRef(hasFetched)` ensures that the blog data is fetched only once during the application's lifecycle, even if the component re-renders. This optimizes performance by preventing multiple API calls.
* **State Management**: It maintains the fetching state (`loading`), any encountered errors (`error`), and the fetched blog data (`data`). These states are exposed to consuming components.
* **Error Handling**: It includes basic error handling to catch network issues or non-successful HTTP responses during the data fetch.
* **`useBlogData` Hook**: A custom hook, `useBlogData`, is provided to simplify accessing the blog data, loading status, and error information from any component wrapped within the `BlogProvider`.
* **Environment Variable for API URL**: The API base URL is sourced from `import.meta.env.VITE_API_BASE_URL`, promoting flexible configuration for different deployment environments.

This `BlogContext` acts as the single source of truth for blog post information, ensuring consistent data access and handling across your application's components.