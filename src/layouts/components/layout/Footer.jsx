const Footer = () => {
  return (
    <footer className="footer-surface text-center py-3 mt-auto">
      <div className="container">
        <small>
          © {new Date().getFullYear()} WorkTracker Dashboard | Built with React
        </small>
      </div>
    </footer>
  );
};

export default Footer;