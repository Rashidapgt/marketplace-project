import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  // Define styles for the footer
  const styles = {
    footer: {
      backgroundColor: "#333",
      color: "white",
      padding: "20px 0",
      textAlign: "center",
    },
    footerContent: {
      display: "flex",
      justifyContent: "space-between",
      padding: "0 20px",
    },
    footerLinks: {
      listStyleType: "none",
      padding: "0",
      textAlign: "left",
    },
    footerSocial: {
      listStyleType: "none",
      padding: "0",
      textAlign: "left",
    },
    footerBottom: {
      marginTop: "20px",
      paddingTop: "10px",
      borderTop: "1px solid #444",
    },
    footerLink: {
      color: "white",
      textDecoration: "none",
    },
    footerSocialLink: {
      color: "white",
      textDecoration: "none",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        {/* Footer Links */}
        <div style={styles.footerLinks}>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/about" style={styles.footerLink}>About Us</Link>
            </li>
            <li>
              <Link to="/contact" style={styles.footerLink}>Contact Us</Link>
            </li>
            <li>
              <Link to="/privacy-policy" style={styles.footerLink}>Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms" style={styles.footerLink}>Terms of Service</Link>
            </li>
          </ul>
        </div>

        {/* Footer Social Media Links */}
        <div style={styles.footerSocial}>
          <h4>Follow Us</h4>
          <ul>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.footerSocialLink}>
                Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.footerSocialLink}>
                Twitter
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.footerSocialLink}>
                Instagram
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.footerSocialLink}>
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div style={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Multi-Vendor Marketplace. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
