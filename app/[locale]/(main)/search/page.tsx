import { Suspense } from "react";

import { Main } from "@/modules/search";

export default function Page() {
  return (
    <Suspense>
      <Main />
    </Suspense>
  );
}
