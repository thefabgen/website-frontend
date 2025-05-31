import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("EMAIL", email);
    formData.append("b_a64da97ea7d5767a1e6f9818b_f5a50b6a3a", ""); // honeypot

    try {
      const response = await fetch(
        "https://test.us10.list-manage.com/subscribe/post?u=a64da97ea7d5767a1e6f9818b&id=f5a50b6a3a",
        {
          method: "POST",
          mode: "no-cors", // <== Mailchimp doesn’t send CORS headers!
          body: formData,
        }
      );
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        type="email"
        name="EMAIL"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border rounded px-4 py-2 w-full"
        placeholder="Your email"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Subscribe
      </button>
      {status === "success" && <p className="text-green-600">Thanks for subscribing!</p>}
      {status === "error" && <p className="text-red-600">Something went wrong.</p>}
    </form>
  );
};