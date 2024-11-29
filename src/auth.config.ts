// https://authjs.dev/guides/edge-compatibility

import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Google],
} satisfies NextAuthConfig;
