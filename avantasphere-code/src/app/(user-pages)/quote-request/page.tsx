import { Suspense } from "react";
import QuoteRequestClient from "./QuoteRequestClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <QuoteRequestClient />
    </Suspense>
  );
}
