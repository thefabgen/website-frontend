## BlogContent Page

The `BlogContent` component is responsible for **displaying the full content of a single blog post**. It dynamically fetches and renders blog details based on the `documentId` provided in the URL parameters.

### Key Features

* **Dynamic Content Loading**: It uses the `documentId` from the URL to find and display the corresponding blog post from the data provided by `useBlogData`.
* **Loading and Error States**:
    * **Loading Spinner**: While the blog data is being fetched or processed, a loading spinner is displayed to indicate activity.
    * **Blog Not Found/Error Message**: If the blog post cannot be found (e.g., invalid ID, or an API error occurred), a "Blog Not Found" message is displayed, along with a link to browse all blogs.
* **Smooth Transitions**: The entire page and its main sections (header, image, content) feature subtle entrance animations using `framer-motion` for a polished user experience.
* **Back Navigation**: A prominent "Back to Blog List" link allows users to easily return to the main blog archive page.
* **Blog Header Details**: Displays essential information about the blog post, including:
    * **Title**: The main title of the blog post.
    * **Description**: A brief summary or subtitle for the blog.
    * **Published Date**: The exact date the blog was published, formatted for readability.
    * **Read Time**: An estimated reading time, indicated by a clock icon.
    * **Category**: The blog's category, with a category icon.
* **Featured Image**: Displays a prominent image associated with the blog post. It includes a fallback placeholder if no image URL is provided. The image is styled to be responsive and visually appealing.
* **Markdown Content Rendering**: The core blog content, which is expected to be in **Markdown format**, is rendered using `react-markdown`.
    * It uses `remarkGfm` for GitHub Flavored Markdown support and `rehypeRaw` to handle raw HTML embedded within the Markdown.
    * The rendered content is wrapped in a `markdown-body` class, which applies styling consistent with GitHub's markdown rendering, along with custom font styling.
* **Footer Integration**: A `Footer` component is included at the bottom of the page.

---