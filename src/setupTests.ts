import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

console.log('matchers:', matchers); // Debugging

expect.extend(matchers.default || matchers);
