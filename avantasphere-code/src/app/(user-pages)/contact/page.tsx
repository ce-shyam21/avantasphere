import { Suspense } from "react";
import ContactClient from "./ContactClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ContactClient />
    </Suspense>
  );
}
