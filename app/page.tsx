import { Suspense } from 'react';
import { CodeSnapClient } from '@/components/page/code-snap-client';
import { Code2SnapLoader } from '@/components/page/code2snap-loader';

export default function Page() {
  return (
    <Suspense fallback={<Code2SnapLoader />}>
      <CodeSnapClient />
    </Suspense>
  );
}
