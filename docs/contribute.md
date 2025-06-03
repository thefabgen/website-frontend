## Contribute Page

The `Contribute` page is designed to **encourage and facilitate user participation** in "thefabgen" platform. It outlines various ways for users to contribute their voices, ideas, and support.

### Key Features

* **Persistent Header:** Displays the "thefabgen" logo/title, linking back to the homepage. The header's visibility is controlled by the `introFinished` prop, allowing it to appear smoothly after any initial animations.
* **Introductory Section:** Sets the tone by describing "thefabgen" as a dynamic archive of voices and visions. It highlights the various ways to get involved.
* **Contribution Methods Grid:** Presents a grid of contribution options, each with:
    * **Icon:** A relevant icon for visual representation.
    * **Title:** A clear heading describing the contribution type.
    * **Content:** A brief explanation of how to contribute.
    * **Link (Conditional):** Most options link to the `/submission` page, where users can submit their content. The "Spread the Word" option, however, provides direct links to "thefabgen's" Instagram and YouTube profiles.
* **"Ready to Contribute?" Section:** This section strongly encourages users to contribute by completing a Google Form, directing them to the `/submission` page.
* **Email Subscription Section:** Includes a prominent section to encourage users to subscribe to the newsletter.
    * Uses the `useMailchimpSubscribe` hook and `Toast` component (as seen in the `Footer` component) to handle email submissions and display feedback.
* **Footer Integration:** The page concludes with the `Footer` component, ensuring consistent site-wide navigation and engagement options are available.