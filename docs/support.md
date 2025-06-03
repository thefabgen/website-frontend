## SupportMission Page

The `SupportMission` component is dedicated to **soliciting financial support for "thefabgen" project**. It explains the value of the platform, details how contributions help, and provides various donation avenues.

### Key Features

* **Header and Back Navigation**:
    * Displays "thefabgen" logo/title at the top, linking to the homepage.
    * Includes a "Back" link that dynamically returns the user to the previous page they visited, enhancing user flow.
* **Donation Options**: Provides multiple ways for users to contribute:
    * **Venmo**: A direct link to "thefabgen's" Venmo profile, opening in a new tab.
    * **Crypto**: A button that triggers a **modal popup** (`CryptoModal`) displaying an Ethereum wallet address for cryptocurrency donations.
    * **Other Options**: A link to a Google Form for alternative donation methods or inquiries.
* **Crypto Modal (`CryptoModal`)**:
    * A full-screen overlay that appears when the "Crypto" button is clicked.
    * Provides the **Ethereum wallet address** with a convenient "Copy" button.
    * Includes a success message ("✓ Copied!") that appears after the address is copied to the clipboard, along with a temporary visual change to the button.
    * Has a close button (`FiX`) and allows closing by clicking outside the modal.
* **Specific Sponsorship/Collaboration**: A dedicated section invites users interested in sponsoring particular stories or projects to contact "thefabgen" via a Google Form, suggesting avenues for larger or targeted support.
* **Footer Integration**: The page includes a `Footer` component, providing consistent site-wide navigation and engagement options. A `useRef` hook is used to allow smooth scrolling to the footer if needed (though not explicitly triggered by a visible element in this snippet, it's set up for potential future use).
