import { useEffect } from "react";

export default function SignUpPage() {
  useEffect(() => {
    window.location.href =
      "https://ap-south-1xunnsjsub.auth.ap-south-1.amazoncognito.com/signup" +
      "?client_id=388ic5mifocpkc420jtp51e55a" +
      "&response_type=code" +
      "&scope=email+openid+phone" +
      "&redirect_uri=http%3A%2F%2Flocalhost%3A5173";
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-sm font-bold text-brand-muted">Opening sign up...</div>
    </div>
  );
}
