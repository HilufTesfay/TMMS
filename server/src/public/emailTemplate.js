const template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 20px;
      }
      .email-container {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 600px;
        margin: auto;
      }
      .email-header {
        text-align: center;
        margin-bottom: 20px;
      }
      .email-header img {
        max-width: 120px;
        margin-bottom: 20px;
      }
      .email-content {
        font-size: 16px;
        color: #333333;
      }
      .verification-button {
        display: inline-block;
        padding: 12px 24px;
        margin-top: 20px;
        margin-bottom: 10px;
        background-color: #4caf50;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
        text-align: center;
      }
      .email-footer {
        font-size: 12px;
        color: #777777;
        text-align: center;
        margin-top: 20px;
      }

      @media (max-width: 600px) {
        .email-container {
          width: 100%;
          padding: 15px;
        }
        .email-content {
          font-size: 14px;
        }
        .verification-button {
          width: 100%;
          padding: 12px;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <img src="../src/public/logo.jpg" alt="ASTU Logo" />
        <h2>Email Verification</h2>
      </div>
      <div class="email-content">
        <p>Dear [User],</p>
        <p>
          Thank you for registering with us! Please click the button below to
          verify your email address:
        </p>
        <p>
          <a
            class="verification-button"
            href="[verification_link]"
            target="_blank"
            >Verify Your Email</a
          >
        </p>
        <p>
          If the button above does not work, copy and paste the following URL
          into your browser:
        </p>
        <p>[verification_link]</p>
      </div>
      <div class="email-footer">

        <p>Best regards,<br />AASTU TMMS Team</p>
      </div>
    </div>
  </body>
</html>
`;
