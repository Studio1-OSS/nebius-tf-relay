import { describe, expect, test } from "vitest";
import { nebiusrelayHome, isProcessAlive } from "@nebiusrelay/cli/dist/lib/paths.js";

describe("paths.ts - single source of truth for home + liveness (#7)", () => {
  test("nebiusrelayHome honors NEBIUSRELAY_HOME env", () => {
    const original = process.env.NEBIUSRELAY_HOME;
    process.env.NEBIUSRELAY_HOME = "/tmp/nebiusrelay-test-home-xyz";
    try {
      expect(nebiusrelayHome()).toBe("/tmp/nebiusrelay-test-home-xyz");
    } finally {
      if (original === undefined) delete process.env.NEBIUSRELAY_HOME;
      else process.env.NEBIUSRELAY_HOME = original;
    }
  });

  test("nebiusrelayHome falls back to ~/.nebiusrelay when env unset", () => {
    const original = process.env.NEBIUSRELAY_HOME;
    delete process.env.NEBIUSRELAY_HOME;
    try {
      const home = nebiusrelayHome();
      expect(home.endsWith("/.nebiusrelay")).toBe(true);
    } finally {
      if (original !== undefined) process.env.NEBIUSRELAY_HOME = original;
    }
  });

  test("isProcessAlive returns false for a dead pid (ESRCH)", () => {
    // pid 0 is never a valid kill target on unix; use a very large unused pid.
    expect(isProcessAlive(999_999_999)).toBe(false);
  });

  test("isProcessAlive returns true for the current process", () => {
    expect(isProcessAlive(process.pid)).toBe(true);
  });
});
