import { useState } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import SecretQuestion from "@/components/SecretQuestion";
import ValentineGreeting from "@/components/ValentineGreeting";

const Index = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingHearts />
      {authenticated ? (
        <ValentineGreeting />
      ) : (
        <SecretQuestion onSuccess={() => setAuthenticated(true)} />
      )}
    </div>
  );
};

export default Index;
