function AuthLayout({ children }) {
  return (
    <div className="auth-page d-flex justify-content-center align-items-center vh-100">
      {children}
    </div>
  );
}

export default AuthLayout;