
import "../globals.css";

export const metadata = {
  title: "Login - Hugocrest Bank",
};

export default function AuthLayout({ children }) {
  return (
    <html lang="de-DE">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />
        <style>{`
          
          body, html {
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            font-family: 'Open Sans', sans-serif;
            color: #424242;
          }
          
          /* Responsive adjustments */
          .auth-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 40px;
            background-color: #ffffff;
            border-bottom: 1px solid #eeeeee;
          }
          
          .auth-footer {
            display: flex;
            justify-content: center;
            padding: 40px;
            background-color: #ffffff;
            border-top: 1px solid #eeeeee;
          }
          
          .footer-inner {
            width: 100%;
            max-width: 600px;
            display: flex;
            gap: 50px;
          }
          
          .auth-main {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding-top: 80px;
            padding-bottom: 80px;
          }

          @media (max-width: 768px) {
            .auth-header {
              flex-direction: column;
              align-items: center;
              padding: 20px;
              gap: 20px;
            }
            .lang-switcher {
              width: 100%;
              justify-content: center;
            }
            .auth-main {
              padding-top: 40px;
              padding-bottom: 40px;
            }
            h1 {
              font-size: 28px !important;
            }
            .auth-footer {
              padding: 30px 20px;
            }
            .footer-inner {
              flex-direction: column;
              gap: 30px;
            }
            .action-buttons {
              flex-direction: column;
              width: 100%;
            }
            .action-buttons button {
              width: 100%;
            }
          }

        `}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
