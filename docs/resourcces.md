## Resources Page

The `Resources` component serves as a **central hub for various valuable assets and connections** offered by "thefabgen" to its audience. It presents key links and information in an easily digestible format.

### Key Features

* **Persistent Header**: Displays the "thefabgen" logo/title at the top, acting as a link back to the homepage and featuring a smooth transition based on the `introFinished` prop.
* **Hero Section**: A large, animated header with the title "Resources" and a descriptive subtitle, emphasizing the page's purpose as a central point for connection and support.
* **Animated Content Sections**: Each resource item animates into view with a subtle upward motion and fade-in effect, enhancing the visual appeal.
* **"The Book: Fabulous AF: 9 Years of Potential"**:
    * Highlights an upcoming book with a brief description.
    * Features a **"Coming soon, Be notified!" button** that triggers the `BookPopup` component.
* **"Our YouTube Channel"**:
    * Provides a description of the YouTube channel's content (short videos, interviews, reflections).
    * Includes a direct link to the channel, opening in a new tab.
* **"Fab Merch"**:
    * Promotes merchandise with a brief tagline about wearing and sharing the movement.
    * Offers a direct link to the Etsy shop where users can browse and purchase items.
* **Footer Integration**: The page concludes with the `Footer` component, providing consistent site-wide navigation and engagement options.

---

## BookPopup Component

The `BookPopup` component is a **modal dialog** designed to capture email addresses from users who wish to be notified when the "Fabulous AF" book becomes available.

### Key Features

* **Controlled Visibility**: The popup's visibility is controlled by the `isOpen` prop. If `isOpen` is `false`, the component renders `null`.
* **Overlay**: When open, it creates a semi-transparent black overlay that covers the entire screen, focusing user attention on the popup content. Clicking on this overlay closes the popup.
* **Animated Entry/Exit**: Uses `framer-motion` for smooth fade-in and slide-up animations when appearing, and fade-out when closing.
* **Close Button**: A clear 'X' icon is provided in the top-right corner to allow users to manually close the popup.
* **Email Subscription Form**:
    * A simple form with an email input field and a "Notify Me" submit button.
    * It manages local state for the email input, loading status, and submission feedback.
    * When submitted, it sends the email to a **Mailchimp subscription URL** (note the explicit `tags` field, likely for segmenting this audience in Mailchimp).
    * The `mode: "no-cors"` is used for the `fetch` request, common for direct Mailchimp form integrations.
* **Loading Indicator**: The submit button displays a spinning loader and "Processing..." text while the subscription request is in progress.
* **Submission Status and Message**: Provides clear feedback to the user upon submission:
    * **Success**: "You're subscribed! We'll notify you when the book is available." with a green background.
    * **Error**: "Subscription failed. Please try again." with a red background.
    * These messages automatically disappear after 3 seconds.