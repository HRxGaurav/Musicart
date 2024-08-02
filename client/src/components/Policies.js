import React from 'react';

const Policies = () => {
  const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const sectionStyle = {
    marginBottom: '20px',
  };

  const headingStyle = {
    color: '#333',
    borderBottom: '2px solid #ddd',
    paddingBottom: '5px',
    fontSize: '18px',
  };

  const listText={
    color: '#555',
    fontSize: '16px',
  }

  const policyText = {
    color: '#555',
    fontSize: '16px',
  };

  const strongText={
    color: '#555',
    fontSize: '16px',
  }

  return (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Terms & Conditions</h2>
        <p style={policyText}>
          MusicArt is run by Munna Enterprises
        </p>
        <p style={policyText}>
          Welcome to our e-commerce website for music headphones and earphones.
          By accessing or using our website, you agree to comply with and be
          bound by the following terms and conditions:
        </p>
        <ul style={policyText}>
          <li style={listText}>All prices listed on our website are subject to change without notice.</li>
          <li style={listText}>We reserve the right to refuse service to anyone for any reason at any time.</li>
          <li style={listText}>All products are subject to availability and we reserve the right to limit the quantity of products we supply.</li>
          <li style={listText}>We make every effort to display the colors and images of our products accurately. However, we cannot guarantee that your computer monitor's display of any color will be accurate.</li>
          <li style={listText}>By placing an order on our website, you represent that you are at least the age of majority in your state or province of residence.</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Privacy Policy</h2>
        <p style={policyText}>
          This Privacy Policy explains how we collect, use, and disclose your
          personal information when you visit or make a purchase from our
          e-commerce website.
        </p>
        <p style={policyText}>
          <strong style={strongText}>Information We Collect:</strong> We collect personal
          information that you provide to us when you register on our website,
          place an order, subscribe to our newsletter, or contact us. This
          information may include your name, email address, shipping address,
          and payment information.
        </p>
        <p style={policyText}>
          <strong style={strongText}>How We Use Your Information:</strong> We use the information
          we collect to process your orders, communicate with you, improve our
          website, and for marketing purposes. We do not sell or share your
          personal information with third parties except as necessary to
          provide our services or comply with the law.
        </p>
        <p style={policyText}>
          <strong style={strongText}>Data Security:</strong> We implement a variety of security
          measures to maintain the safety of your personal information. Your
          payment information is processed securely through our payment gateway
          providers.
        </p>
        <p style={policyText}>
          <strong style={strongText}>Cookies:</strong> We use cookies to enhance your experience on
          our website, analyze site traffic, and personalize content. You can
          choose to disable cookies through your browser settings.
        </p>
        <p style={policyText}>
          <strong style={strongText}>Changes to This Policy:</strong> We may update this Privacy
          Policy from time to time. Any changes will be posted on this page with
          an updated revision date.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Return Policy</h2>
        <p style={policyText}>
          You can raise return request within 7 days when the order was delivered.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Refund Policy</h2>
        
        <p style={policyText}>
          We offer refunds within 7 days of purchase only for items that are
          damaged or different from what you ordered. To request a refund,
          please contact our customer service team with your order details and
          evidence of the issue.
        </p>
        <p style={policyText}>
          Once the ticket is validated your refund will be issued in 2 business day and after that it will take to reach source account in 7 working days.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Shipping Policy</h2>
        <p style={policyText}>
          All items will be shipped within 2 business days after the order is
          placed. You will receive a confirmation email with tracking details
          once your order has been shipped.
        </p>
      </div>
    </div>
  );
};

export default Policies;
