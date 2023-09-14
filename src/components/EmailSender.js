import React, { useState } from 'react';

const EmailForm = () => {
  const [emailData, setEmailData] = useState({
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmailData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3002/Mailer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        // Email sent successfully
        alert('Email sent successfully!');
      } else {
        // Email sending failed
        alert('Failed to send email. Please try again latersss.');
      }
    } catch (error) {
      // Handle any network errors
      console.error('Error sending email:', error);
      alert('An error occurred while sending the email. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Recipient Email"
        value={emailData.email}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={emailData.subject}
        onChange={handleInputChange}
        required
      />
      <textarea
        name="message"
        placeholder="Message"
        value={emailData.message}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Send Email</button>
    </form>
  );
};

export default EmailForm;
