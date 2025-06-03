## ContentSubmission Page

The `ContentSubmission` component provides a **dedicated form for users to submit their written reflections or video content** to "thefabgen" platform. It's a key interactive page for community engagement.

### Key Features

* **Header and Back Navigation**:
    * Features the "thefabgen" logo/title at the top, linking to the homepage.
    * Includes a "Back to Contribute" link, allowing users to easily return to the previous page where various contribution methods are outlined.
* **Submission Guidelines**: Provides clear introductory text and bullet points outlining the types of content sought, desired tone, and themes of interest, ensuring users understand what kind of contributions are welcomed.
* **Dynamic Form Handling**:
    * Manages various form fields using **React's `useState` hook** to capture personal details (first name, last name, birth year, country, email), how the user heard about the platform, social media handles, and content details (title, video file, text content).
    * Dynamically populates the "Birth Year" dropdown for specific years (1988-1997).
* **Content Submission Options**:
    * **Video Upload**: Allows users to upload a video file (MP4, MOV, AVI, max 100MB) with clear instructions and a file input mechanism.
    * **Written Reflection (Markdown Editor)**: Integrates `@uiw/react-md-editor` to provide a rich text editor supporting Markdown formatting, enabling users to write detailed reflections directly in the form. It also displays a live word count.
    * Users can submit **either a video, written content, or both**.
* **Form Validation**: Implements client-side validation to ensure all required fields are filled and that at least one form of content (video or text) is provided before submission.
* **Recaptcha Integration**: Uses `react-google-recaptcha` to prevent spam and ensure submissions come from legitimate users, enhancing security.
* **Contributor Release Agreement (Modal)**:
    * A checkbox requires users to agree to "Contributor Release Terms" before submitting.
    * Clicking on the terms opens a **modal dialog** (`Modal` component) that displays the full agreement, outlining permissions for content usage, crediting, editing, originality, and finality of submissions.
* **Submission Logic**:
    * Handles the submission process, including:
        * **Video Upload**: If a video is provided, it's uploaded to the backend (`${API_BASE_URL}/api/upload`) first.
        * **Data Submission**: The collected form data (including the video URL if applicable) is then sent as a `POST` request to the backend API (`${API_BASE_URL}/api/contributions`).
        * **Mailchimp Integration**: Upon successful submission, the user's email is automatically subscribed to a Mailchimp list via the `subscribeToMailchimp` function, with a specific TAG(contributed) and a link back to the submission in Strapi (CMS).
    * Manages a **loading state (`isSubmitting`)** to disable the submit button and provide feedback during the process.
* **Toast Notifications**: Uses a `Toast` component to display real-time feedback to the user regarding submission status (success or error messages), which auto-hide after a short delay.
* **Form Reset**: After a successful submission, the form fields are reset to their initial empty states.
* **Footer Integration**: The page includes a `Footer` component at the bottom.

---