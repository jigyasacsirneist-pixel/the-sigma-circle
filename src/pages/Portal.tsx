const PortalPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-background rounded-2xl shadow-card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary mx-auto flex items-center justify-center mb-4">
              <span className="text-primary-foreground font-bold text-xl">σ</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              The Sigma Circle Portal
            </h1>
            <p className="text-muted-foreground">
              Authentication coming soon. This is a placeholder page.
            </p>
          </div>
          
          <div className="space-y-4">
            <button className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
              Login (Coming Soon)
            </button>
            <button className="w-full h-12 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
              Register (Coming Soon)
            </button>
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-8">
            <a href="/" className="text-primary hover:underline">
              ← Back to Home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortalPage;
