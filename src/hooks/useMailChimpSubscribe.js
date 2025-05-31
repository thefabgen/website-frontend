import { useState, useEffect } from "react";

export function useMailchimpSubscribe() {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const subscribe = async (email) => {
    const formData = new FormData();
    formData.append("EMAIL", email);
    formData.append("b_a64da97ea7d5767a1e6f9818b_f5a50b6a3a", "");

    try {
      await fetch(
        // "https://test.us10.list-manage.com/subscribe/post?u=a64da97ea7d5767a1e6f9818b&id=f5a50b6a3a",
        "https://thefabgen.us4.list-manage.com/subscribe/post?u=ead7fd9c1fb50dfea37c96061&id=3993a95998",
        {
          method: "POST",
          mode: "no-cors",
          body: formData,
        }
      );
      setStatus("success");
      setMessage("You're subscribed!");
    } catch (error) {
      setStatus("error");
      setMessage("Subscription failed. Please try again.");
    }
  };

  // Auto-clear after 3 seconds
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null);
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return { subscribe, status, message }
};
