import '@testing-library/jest-dom';
import { vi } from "vitest";

vi.mock('next/navigation', () => {
  return {
    __esModule: true,
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn()
    }),
    useSearchParams: () => ({
      get: () => {
      }
    }),
    useParams: vi.fn(),
    usePathname: vi.fn()
  }
});