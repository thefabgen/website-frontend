## Footer Component

The `Footer` component serves as a **consistent navigation and engagement hub** at the bottom of every page on the website. It provides quick links, social media access, and a newsletter subscription option.

### Key Features

* **Branding and Home Link**: Displays the "thefabgen" logo, styled with a gradient, which also acts as a clickable link to return to the homepage.
* **Social Media Integration**: Features prominent links to the "thefabgen" YouTube and Instagram profiles, using `react-social-icons` for consistent styling and external navigation.
* **Newsletter Subscription (Mailchimp)**: Includes an email subscription form that allows users to sign up for newsletters.
    * It uses a custom `useMailchimpSubscribe` hook to handle the subscription logic and state (loading, success, error).
    * A `Toast` component is used to display real-time feedback (success or error messages) after a subscription attempt.
    * This section is **conditionally hidden** on specific routes (`/contribute` and `/submission`) to streamline user experience on those pages.
* **Site Navigation Links**: Provides a clear and comprehensive set of internal navigation links to key pages like Home, About, Resources, Contribute, Blog, and Support.
* **Copyright Information**: Displays the current year and copyright notice for "thefabgen."
* **Responsive Layout**: The footer adapts its layout for different screen sizes, arranging content in a column on smaller screens and in rows on larger screens.

---