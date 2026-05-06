const Footer = () => {
  return (
    <footer className="footer-surface py-3 mt-auto">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <small>© {new Date().getFullYear()} WorkTracker Dashboard</small>
          <a
            className="footer-branding fw-semibold"
            href="https://www.kavyainfoweb.com"
            target="_blank"
            rel="noopener noreferrer"
          >
          <small>Designed & Developed by | Kavya Infoweb Pvt Ltd</small>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;