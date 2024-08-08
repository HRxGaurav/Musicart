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

  const listText = {
    color: '#555',
    fontSize: '16px',
  };

  const policyText = {
    color: '#555',
    fontSize: '16px',
  };

  const strongText = {
    color: '#555',
    fontSize: '16px',
  };

  return (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Terms & Conditions</h2>
        <p style={policyText}>
          Music Art is run by Munna Enterprises. All information, products, and services displayed on the musicart.in website constitute an "invitation to offer". Your order for purchase constitutes your "offer", which shall be subject to the terms and conditions listed below. Music Art reserves the right to accept or reject your offer without assigning any reason.
        </p>
        <p style={policyText}>
          To use the musicart.in website, you (the user) accept the following terms and conditions. Music Art reserves the right to add, delete, alter, or modify these terms at any time.
        </p>
        <p style={policyText}>
          You (the user) are advised to read these terms carefully every time you use the musicart.in website.
        </p>
        <ul style={policyText}>
          <li style={listText}>All prices listed on our website are subject to change without notice.</li>
          <li style={listText}>We reserve the right to refuse service to anyone for any reason at any time.</li>
          <li style={listText}>All products are subject to availability, and we reserve the right to limit the quantity of products supplied.</li>
          <li style={listText}>We make every effort to display colors and images of our products accurately. However, we cannot guarantee that your computer monitor's display of any color will be accurate.</li>
          <li style={listText}>By placing an order on our website, you represent that you are at least the age of majority in your state or province of residence.</li>
          <li style={listText}>Color Discrepancy: We have made every effort to display the color of our products as accurately as possible. However, we cannot guarantee that your monitor's display of color will be accurate.</li>
          <li style={listText}>Customer Age: The user certifies that they are at least 18 years of age or have the consent of a parent or legal guardian.</li>
          <li style={listText}>Non-Liability Clause: Music Art will not be responsible for any damage suffered by users from the use of the services on musicart.in, including loss of revenue or data due to delays, non-deliveries, or service interruptions.</li>
          <li style={listText}>Order Fulfillment: Music Art will take responsibility for your order if it has been shipped to any city using private courier companies that service your pincode.</li>
          <li style={listText}>Changes in Price and Stock Availability: Prices and availability of products are subject to change without prior notice at the discretion of Music Art.</li>
          <li style={listText}>Order Cancellations: Requests for order cancellations shall be entertained only if the order hasn't already been dispatched.</li>
          <li style={listText}>Incorrect Pricing: Music Art reserves the right to refuse or cancel any order placed for a product listed at an incorrect price.</li>
          <li style={listText}>Delayed Delivery: If a late delivery occurs due to a mistake by the user, any extra cost spent by Music Art for re-delivery shall be claimed from the user.</li>
          <li style={listText}>Customer Information: The user agrees to provide accurate information. Music Art reserves the right to confirm and validate the information provided.</li>
          <li style={listText}>Warranty and Returns: Music Art's liability for warranty replacements will only cover the value paid by the customer at the time of purchase.</li>
          <li style={listText}>Third Party Fraud: Music Art will not be liable for any type of credit card fraud. The liability for fraudulent use of a card rests with the user.</li>
          <li style={listText}>Exclusive Jurisdiction: This agreement shall be construed in accordance with the applicable laws of India. Only the courts at Varanasi, Uttar Pradesh shall have exclusive jurisdiction in any proceedings arising out of this agreement.</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Privacy Policy</h2>
        <p style={policyText}>
          This Privacy Policy explains how we collect, use, and disclose your personal information when you visit or make a purchase from our e-commerce website.
        </p>
        <p style={policyText}>
          <strong style={strongText}>Information We Collect:</strong> We collect personal information that you provide to us when you register on our website, place an order, subscribe to our newsletter, or contact us. This information may include your name, email address, shipping address, and payment information.
        </p>
        <p style={policyText}>
          <strong style={strongText}>How We Use Your Information:</strong> We use the information we collect to process your orders, communicate with you, improve our website, and for marketing purposes. We do not sell or share your personal information with third parties except as necessary to provide our services or comply with the law.
        </p>
        <p style={policyText}>
          <strong style={strongText}>Data Security:</strong> We implement a variety of security measures to maintain the safety of your personal information. Your payment information is processed securely through our payment gateway providers.
        </p>
        <p style={policyText}>
          <strong style={strongText}>Cookies:</strong> We use cookies to enhance your experience on our website, analyze site traffic, and personalize content. You can choose to disable cookies through your browser settings.
        </p>
        <p style={policyText}>
          <strong style={strongText}>Changes to This Policy:</strong> We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Return Policy</h2>
        <p style={policyText}>
          You can raise a return request within 7 days of when the order was delivered.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Refund Policy</h2>
        <p style={policyText}>
          We offer refunds within 7 days of purchase only for items that are damaged or different from what you ordered. To request a refund, please contact our customer service team with your order details and evidence of the issue.
        </p>
        <p style={policyText}>
          Once the ticket is validated, your refund will be issued in 2 business days, and it will take up to 7 working days to reach your source account.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Shipping Policy</h2>
        <p style={policyText}>
          All items will be shipped within 2 business days after the order is placed. You will receive a confirmation email with tracking details once your order has been shipped.
        </p>
      </div>
    </div>
  );
};

export default Policies;
