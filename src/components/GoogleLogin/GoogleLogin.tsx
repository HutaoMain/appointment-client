const GoogleLogin = () => {
  const handleSignIn = () => {
    window.open(`${import.meta.env.VITE_APP_API_URL}/auth/google`, "_self");
  };

  return (
    <div>
      <button className="google-button" onClick={handleSignIn}>
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
