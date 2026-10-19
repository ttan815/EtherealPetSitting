import "../../styles/AuthHeading.css";

// Big serif title with a short line under it, used at the top of auth forms.
function AuthHeading({ title, subtitle }) {
  return (
    <div className="auth-heading">
      <h1 className="auth-heading-title">{title}</h1>
      <p className="auth-heading-subtitle">{subtitle}</p>
    </div>
  );
}

export default AuthHeading;
