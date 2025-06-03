## BlogsPage

The `BlogsPage` component serves as the **main archive page for all blog posts**, providing a comprehensive list of articles published on "thefabgen" platform. It leverages a shared data context to display blog information.

### Key Features

* **Centralized Blog Display**: This page fetches all available blog posts from the `BlogContext` and presents them in a responsive grid layout.
* **Persistent Header**: A fixed "thefabgen" header is displayed at the top, transitioning its visibility based on whether the site's initial introduction animation has completed. It also provides a direct link back to the home page.
* **Hero Section**: It includes a dedicated hero section with a title "Voices from the Fabs" and a descriptive subtitle, both featuring subtle entrance animations.
* **Loading and Empty States**:
    * **Loading Skeleton**: While blog data is being fetched, the page displays a grid of animated skeleton loaders, providing a smooth user experience by indicating that content is on its way.
    * **No Blogs Found**: If no blog posts are available, a clear message is shown, along with a button to return to the home page.
* **Responsive Grid Layout**: Blog posts are arranged in a grid that adapts to different screen sizes, displaying one, two, or three columns as appropriate.
* **Footer Integration**: A `Footer` component is included at the bottom of the page.

---

## BlogCard Component

The `BlogCard` component is a reusable UI element responsible for **displaying individual blog post summaries** within the `BlogsPage` grid.

### Key Features

* **Interactive Hover Effects**: When a user hovers over a `BlogCard`, it subtly lifts (`y: -8`) and the blog image slightly scales up, providing visual feedback and enhancing user engagement. The title text also changes color on hover.
* **Dynamic Image Handling**: It displays the blog post's image, ensuring the correct URL is used whether the application is served over HTTPS or HTTP. A fallback message is shown if no image is available.
* **Key Information Display**: Each card prominently features:
    * **Title**: The title of the blog post, truncated to two lines to maintain a clean layout.
    * **Description**: A short summary of the blog post, truncated to three lines.
    * **Published Date**: A clear date badge indicating when the blog was published.
    * **Category**: The blog's category, accompanied by an icon, displayed at the bottom of the card.
* **"Read More" Link**: A clear call to action to read the full blog post, with an animated arrow that moves on hover.
* **Navigation**: The entire card is wrapped in a `Link` component, allowing users to navigate directly to the detailed view of the specific blog post when clicked.