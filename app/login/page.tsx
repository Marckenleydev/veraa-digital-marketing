
import { Suspense } from "react";
import LoginContent from "./content/LoginContent";



export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}