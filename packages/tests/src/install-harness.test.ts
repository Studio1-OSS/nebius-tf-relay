import { describe, expect, test } from "vitest";
import { ensureHarnessInstalled } from "../../cli/src/lib/install-harness.js";
import { HARNESS } from "../../cli/src/lib/harness.js";

const NOT_INSTALLED = { installed: false } as ReturnType<
  typeof import("../../cli/src/lib/detect.js").detectInstalledHarness
>;
const INSTALLED = { installed: true } as typeof NOT_INSTALLED;

describe("ensureHarnessInstalled", () => {
  test("no prompt and no install when the harness is already present", async () => {
    let prompted = false;
    let ran = false;
    const ok = await ensureHarnessInstalled(HARNESS.PI, {
      detect: () => INSTALLED,
      confirm: async () => {
        prompted = true;
        return true;
      },
      run: async () => {
        ran = true;
        return 0;
      },
    });
    expect(ok).toBe(true);
    expect(prompted).toBe(false);
    expect(ran).toBe(false);
  });

  // These installers are third-party `curl | bash` pipelines. Running one
  // without explicit consent would be executing remote code on the user's
  // machine unprompted.
  test("declining means nothing is executed", async () => {
    let ran = false;
    const ok = await ensureHarnessInstalled(HARNESS.HERMES, {
      detect: () => NOT_INSTALLED,
      confirm: async () => false,
      run: async () => {
        ran = true;
        return 0;
      },
    });
    expect(ok).toBe(false);
    expect(ran).toBe(false);
  });

  test("the prompt shows the exact command that will run", async () => {
    let question = "";
    await ensureHarnessInstalled(HARNESS.DEEPSEEK, {
      detect: () => NOT_INSTALLED,
      confirm: async (q) => {
        question = q;
        return false;
      },
      run: async () => 0,
    });
    expect(question).toContain("npm install -g @deepseek-ai/dsh");
    expect(question).toContain("DeepSeek Harness");
  });

  test("accepting runs the install and re-detects afterwards", async () => {
    let ran = "";
    let detectCalls = 0;
    const ok = await ensureHarnessInstalled(HARNESS.GROK, {
      detect: () => {
        detectCalls += 1;
        // absent on the first check, present after the install
        return detectCalls === 1 ? NOT_INSTALLED : INSTALLED;
      },
      confirm: async () => true,
      run: async (command) => {
        ran = command;
        return 0;
      },
    });
    expect(ok).toBe(true);
    expect(ran).toContain("x.ai/cli/install.sh");
    expect(detectCalls).toBe(2);
  });

  test("a failed install reports false without claiming success", async () => {
    const ok = await ensureHarnessInstalled(HARNESS.GROK, {
      detect: () => NOT_INSTALLED,
      confirm: async () => true,
      run: async () => 1,
    });
    expect(ok).toBe(false);
  });

  // Some installers put the binary somewhere not yet on this process's PATH.
  // Exit code 0 alone must not be treated as "ready to launch".
  test("install exits 0 but binary still missing -> not ready", async () => {
    const ok = await ensureHarnessInstalled(HARNESS.HERMES, {
      detect: () => NOT_INSTALLED,
      confirm: async () => true,
      run: async () => 0,
    });
    expect(ok).toBe(false);
  });
});
