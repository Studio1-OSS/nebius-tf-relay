#!/usr/bin/env node
// @bun
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);

// packages/cli/src/lib/harness.ts
var HARNESS, ALL_HARNESSES, HARNESS_BIN, HARNESS_LABEL, HARNESS_INSTALL;
var init_harness = __esm(() => {
  HARNESS = {
    CLAUDE: "claude",
    CODEX: "codex",
    OPENCODE: "opencode",
    PI: "pi",
    PRIME: "prime"
  };
  ALL_HARNESSES = [
    HARNESS.CLAUDE,
    HARNESS.CODEX,
    HARNESS.OPENCODE,
    HARNESS.PI,
    HARNESS.PRIME
  ];
  HARNESS_BIN = {
    [HARNESS.CLAUDE]: "claude",
    [HARNESS.CODEX]: "codex",
    [HARNESS.OPENCODE]: "opencode",
    [HARNESS.PI]: "pi",
    [HARNESS.PRIME]: "prime-agent"
  };
  HARNESS_LABEL = {
    [HARNESS.CLAUDE]: "Claude Code",
    [HARNESS.CODEX]: "Codex",
    [HARNESS.OPENCODE]: "OpenCode",
    [HARNESS.PI]: "Pi Code",
    [HARNESS.PRIME]: "Prime Agent"
  };
  HARNESS_INSTALL = {
    [HARNESS.CLAUDE]: {
      command: "npm install -g @anthropic-ai/claude-code",
      url: "https://docs.anthropic.com/en/docs/claude-code/setup"
    },
    [HARNESS.CODEX]: {
      command: "npm install -g @openai/codex",
      url: "https://github.com/openai/codex"
    },
    [HARNESS.OPENCODE]: {
      command: "npm install -g opencode-ai@latest",
      url: "https://github.com/anomalyco/opencode"
    },
    [HARNESS.PI]: {
      command: "npm install -g --ignore-scripts @earendil-works/pi-coding-agent",
      url: "https://pi.dev/docs/latest/quickstart"
    },
    [HARNESS.PRIME]: {
      command: "curl -fsSL https://app.primeintellect.ai/prime-agent/install.sh | sh",
      url: "https://github.com/PrimeIntellect-ai/prime-agent"
    }
  };
});

// node_modules/.pnpm/sisteransi@1.0.5/node_modules/sisteransi/src/index.js
var require_src = __commonJS((exports, module) => {
  var ESC = "\x1B";
  var CSI = `${ESC}[`;
  var beep = "\x07";
  var cursor = {
    to(x, y) {
      if (!y)
        return `${CSI}${x + 1}G`;
      return `${CSI}${y + 1};${x + 1}H`;
    },
    move(x, y) {
      let ret = "";
      if (x < 0)
        ret += `${CSI}${-x}D`;
      else if (x > 0)
        ret += `${CSI}${x}C`;
      if (y < 0)
        ret += `${CSI}${-y}A`;
      else if (y > 0)
        ret += `${CSI}${y}B`;
      return ret;
    },
    up: (count = 1) => `${CSI}${count}A`,
    down: (count = 1) => `${CSI}${count}B`,
    forward: (count = 1) => `${CSI}${count}C`,
    backward: (count = 1) => `${CSI}${count}D`,
    nextLine: (count = 1) => `${CSI}E`.repeat(count),
    prevLine: (count = 1) => `${CSI}F`.repeat(count),
    left: `${CSI}G`,
    hide: `${CSI}?25l`,
    show: `${CSI}?25h`,
    save: `${ESC}7`,
    restore: `${ESC}8`
  };
  var scroll = {
    up: (count = 1) => `${CSI}S`.repeat(count),
    down: (count = 1) => `${CSI}T`.repeat(count)
  };
  var erase = {
    screen: `${CSI}2J`,
    up: (count = 1) => `${CSI}1J`.repeat(count),
    down: (count = 1) => `${CSI}J`.repeat(count),
    line: `${CSI}2K`,
    lineEnd: `${CSI}K`,
    lineStart: `${CSI}1K`,
    lines(count) {
      let clear = "";
      for (let i = 0;i < count; i++)
        clear += this.line + (i < count - 1 ? cursor.up() : "");
      if (count)
        clear += cursor.left;
      return clear;
    }
  };
  module.exports = { cursor, scroll, erase, beep };
});

// node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS((exports, module) => {
  var p = process || {};
  var argv = p.argv || [];
  var env = p.env || {};
  var isColorSupported = !(!!env.NO_COLOR || argv.includes("--no-color")) && (!!env.FORCE_COLOR || argv.includes("--color") || p.platform === "win32" || (p.stdout || {}).isTTY && env.TERM !== "dumb" || !!env.CI);
  var formatter = (open, close, replace = open) => (input) => {
    let string = "" + input, index = string.indexOf(close, open.length);
    return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
  };
  var replaceClose = (string, close, replace, index) => {
    let result = "", cursor = 0;
    do {
      result += string.substring(cursor, index) + replace;
      cursor = index + close.length;
      index = string.indexOf(close, cursor);
    } while (~index);
    return result + string.substring(cursor);
  };
  var createColors = (enabled = isColorSupported) => {
    let f = enabled ? formatter : () => String;
    return {
      isColorSupported: enabled,
      reset: f("\x1B[0m", "\x1B[0m"),
      bold: f("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
      dim: f("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
      italic: f("\x1B[3m", "\x1B[23m"),
      underline: f("\x1B[4m", "\x1B[24m"),
      inverse: f("\x1B[7m", "\x1B[27m"),
      hidden: f("\x1B[8m", "\x1B[28m"),
      strikethrough: f("\x1B[9m", "\x1B[29m"),
      black: f("\x1B[30m", "\x1B[39m"),
      red: f("\x1B[31m", "\x1B[39m"),
      green: f("\x1B[32m", "\x1B[39m"),
      yellow: f("\x1B[33m", "\x1B[39m"),
      blue: f("\x1B[34m", "\x1B[39m"),
      magenta: f("\x1B[35m", "\x1B[39m"),
      cyan: f("\x1B[36m", "\x1B[39m"),
      white: f("\x1B[37m", "\x1B[39m"),
      gray: f("\x1B[90m", "\x1B[39m"),
      bgBlack: f("\x1B[40m", "\x1B[49m"),
      bgRed: f("\x1B[41m", "\x1B[49m"),
      bgGreen: f("\x1B[42m", "\x1B[49m"),
      bgYellow: f("\x1B[43m", "\x1B[49m"),
      bgBlue: f("\x1B[44m", "\x1B[49m"),
      bgMagenta: f("\x1B[45m", "\x1B[49m"),
      bgCyan: f("\x1B[46m", "\x1B[49m"),
      bgWhite: f("\x1B[47m", "\x1B[49m"),
      blackBright: f("\x1B[90m", "\x1B[39m"),
      redBright: f("\x1B[91m", "\x1B[39m"),
      greenBright: f("\x1B[92m", "\x1B[39m"),
      yellowBright: f("\x1B[93m", "\x1B[39m"),
      blueBright: f("\x1B[94m", "\x1B[39m"),
      magentaBright: f("\x1B[95m", "\x1B[39m"),
      cyanBright: f("\x1B[96m", "\x1B[39m"),
      whiteBright: f("\x1B[97m", "\x1B[39m"),
      bgBlackBright: f("\x1B[100m", "\x1B[49m"),
      bgRedBright: f("\x1B[101m", "\x1B[49m"),
      bgGreenBright: f("\x1B[102m", "\x1B[49m"),
      bgYellowBright: f("\x1B[103m", "\x1B[49m"),
      bgBlueBright: f("\x1B[104m", "\x1B[49m"),
      bgMagentaBright: f("\x1B[105m", "\x1B[49m"),
      bgCyanBright: f("\x1B[106m", "\x1B[49m"),
      bgWhiteBright: f("\x1B[107m", "\x1B[49m")
    };
  };
  module.exports = createColors();
  module.exports.createColors = createColors;
});

// node_modules/.pnpm/@clack+core@0.3.5/node_modules/@clack/core/dist/index.mjs
import { stdin as $, stdout as k } from "process";
import * as f from "readline";
import _ from "readline";
import { WriteStream as U } from "tty";
function q({ onlyFirst: e = false } = {}) {
  const F = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");
  return new RegExp(F, e ? undefined : "g");
}
function S(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected a \`string\`, got \`${typeof e}\``);
  return e.replace(J, "");
}
function T(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function A(e, u = {}) {
  if (typeof e != "string" || e.length === 0 || (u = { ambiguousIsNarrow: true, ...u }, e = S(e), e.length === 0))
    return 0;
  e = e.replace(uD(), "  ");
  const F = u.ambiguousIsNarrow ? 1 : 2;
  let t = 0;
  for (const s of e) {
    const C = s.codePointAt(0);
    if (C <= 31 || C >= 127 && C <= 159 || C >= 768 && C <= 879)
      continue;
    switch (X.eastAsianWidth(s)) {
      case "F":
      case "W":
        t += 2;
        break;
      case "A":
        t += F;
        break;
      default:
        t += 1;
    }
  }
  return t;
}
function tD() {
  const e = new Map;
  for (const [u, F] of Object.entries(r)) {
    for (const [t, s] of Object.entries(F))
      r[t] = { open: `\x1B[${s[0]}m`, close: `\x1B[${s[1]}m` }, F[t] = r[t], e.set(s[0], s[1]);
    Object.defineProperty(r, u, { value: F, enumerable: false });
  }
  return Object.defineProperty(r, "codes", { value: e, enumerable: false }), r.color.close = "\x1B[39m", r.bgColor.close = "\x1B[49m", r.color.ansi = M(), r.color.ansi256 = P(), r.color.ansi16m = W(), r.bgColor.ansi = M(d), r.bgColor.ansi256 = P(d), r.bgColor.ansi16m = W(d), Object.defineProperties(r, { rgbToAnsi256: { value: (u, F, t) => u === F && F === t ? u < 8 ? 16 : u > 248 ? 231 : Math.round((u - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(u / 255 * 5) + 6 * Math.round(F / 255 * 5) + Math.round(t / 255 * 5), enumerable: false }, hexToRgb: { value: (u) => {
    const F = /[a-f\d]{6}|[a-f\d]{3}/i.exec(u.toString(16));
    if (!F)
      return [0, 0, 0];
    let [t] = F;
    t.length === 3 && (t = [...t].map((C) => C + C).join(""));
    const s = Number.parseInt(t, 16);
    return [s >> 16 & 255, s >> 8 & 255, s & 255];
  }, enumerable: false }, hexToAnsi256: { value: (u) => r.rgbToAnsi256(...r.hexToRgb(u)), enumerable: false }, ansi256ToAnsi: { value: (u) => {
    if (u < 8)
      return 30 + u;
    if (u < 16)
      return 90 + (u - 8);
    let F, t, s;
    if (u >= 232)
      F = ((u - 232) * 10 + 8) / 255, t = F, s = F;
    else {
      u -= 16;
      const i = u % 36;
      F = Math.floor(u / 36) / 5, t = Math.floor(i / 6) / 5, s = i % 6 / 5;
    }
    const C = Math.max(F, t, s) * 2;
    if (C === 0)
      return 30;
    let D = 30 + (Math.round(s) << 2 | Math.round(t) << 1 | Math.round(F));
    return C === 2 && (D += 60), D;
  }, enumerable: false }, rgbToAnsi: { value: (u, F, t) => r.ansi256ToAnsi(r.rgbToAnsi256(u, F, t)), enumerable: false }, hexToAnsi: { value: (u) => r.ansi256ToAnsi(r.hexToAnsi256(u)), enumerable: false } }), r;
}
function R(e, u, F) {
  return String(e).normalize().replace(/\r\n/g, `
`).split(`
`).map((t) => oD(t, u, F)).join(`
`);
}
function hD(e, u) {
  if (e === u)
    return;
  const F = e.split(`
`), t = u.split(`
`), s = [];
  for (let C = 0;C < Math.max(F.length, t.length); C++)
    F[C] !== t[C] && s.push(C);
  return s;
}
function lD(e) {
  return e === V;
}
function v(e, u) {
  e.isTTY && e.setRawMode(u);
}

class x {
  constructor({ render: u, input: F = $, output: t = k, ...s }, C = true) {
    a(this, "input"), a(this, "output"), a(this, "rl"), a(this, "opts"), a(this, "_track", false), a(this, "_render"), a(this, "_cursor", 0), a(this, "state", "initial"), a(this, "value"), a(this, "error", ""), a(this, "subscribers", new Map), a(this, "_prevFrame", ""), this.opts = s, this.onKeypress = this.onKeypress.bind(this), this.close = this.close.bind(this), this.render = this.render.bind(this), this._render = u.bind(this), this._track = C, this.input = F, this.output = t;
  }
  prompt() {
    const u = new U(0);
    return u._write = (F, t, s) => {
      this._track && (this.value = this.rl.line.replace(/\t/g, ""), this._cursor = this.rl.cursor, this.emit("value", this.value)), s();
    }, this.input.pipe(u), this.rl = _.createInterface({ input: this.input, output: u, tabSize: 2, prompt: "", escapeCodeTimeout: 50 }), _.emitKeypressEvents(this.input, this.rl), this.rl.prompt(), this.opts.initialValue !== undefined && this._track && this.rl.write(this.opts.initialValue), this.input.on("keypress", this.onKeypress), v(this.input, true), this.output.on("resize", this.render), this.render(), new Promise((F, t) => {
      this.once("submit", () => {
        this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), v(this.input, false), F(this.value);
      }), this.once("cancel", () => {
        this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), v(this.input, false), F(V);
      });
    });
  }
  on(u, F) {
    const t = this.subscribers.get(u) ?? [];
    t.push({ cb: F }), this.subscribers.set(u, t);
  }
  once(u, F) {
    const t = this.subscribers.get(u) ?? [];
    t.push({ cb: F, once: true }), this.subscribers.set(u, t);
  }
  emit(u, ...F) {
    const t = this.subscribers.get(u) ?? [], s = [];
    for (const C of t)
      C.cb(...F), C.once && s.push(() => t.splice(t.indexOf(C), 1));
    for (const C of s)
      C();
  }
  unsubscribe() {
    this.subscribers.clear();
  }
  onKeypress(u, F) {
    if (this.state === "error" && (this.state = "active"), F?.name && !this._track && z.has(F.name) && this.emit("cursor", z.get(F.name)), F?.name && xD.has(F.name) && this.emit("cursor", F.name), u && (u.toLowerCase() === "y" || u.toLowerCase() === "n") && this.emit("confirm", u.toLowerCase() === "y"), u === "\t" && this.opts.placeholder && (this.value || (this.rl.write(this.opts.placeholder), this.emit("value", this.opts.placeholder))), u && this.emit("key", u.toLowerCase()), F?.name === "return") {
      if (this.opts.validate) {
        const t = this.opts.validate(this.value);
        t && (this.error = t, this.state = "error", this.rl.write(this.value));
      }
      this.state !== "error" && (this.state = "submit");
    }
    u === "\x03" && (this.state = "cancel"), (this.state === "submit" || this.state === "cancel") && this.emit("finalize"), this.render(), (this.state === "submit" || this.state === "cancel") && this.close();
  }
  close() {
    this.input.unpipe(), this.input.removeListener("keypress", this.onKeypress), this.output.write(`
`), v(this.input, false), this.rl.close(), this.emit(`${this.state}`, this.value), this.unsubscribe();
  }
  restoreCursor() {
    const u = R(this._prevFrame, process.stdout.columns, { hard: true }).split(`
`).length - 1;
    this.output.write(import_sisteransi.cursor.move(-999, u * -1));
  }
  render() {
    const u = R(this._render(this) ?? "", process.stdout.columns, { hard: true });
    if (u !== this._prevFrame) {
      if (this.state === "initial")
        this.output.write(import_sisteransi.cursor.hide);
      else {
        const F = hD(this._prevFrame, u);
        if (this.restoreCursor(), F && F?.length === 1) {
          const t = F[0];
          this.output.write(import_sisteransi.cursor.move(0, t)), this.output.write(import_sisteransi.erase.lines(1));
          const s = u.split(`
`);
          this.output.write(s[t]), this._prevFrame = u, this.output.write(import_sisteransi.cursor.move(0, s.length - t - 1));
          return;
        } else if (F && F?.length > 1) {
          const t = F[0];
          this.output.write(import_sisteransi.cursor.move(0, t)), this.output.write(import_sisteransi.erase.down());
          const s = u.split(`
`).slice(t);
          this.output.write(s.join(`
`)), this._prevFrame = u;
          return;
        }
        this.output.write(import_sisteransi.erase.down());
      }
      this.output.write(u), this.state === "initial" && (this.state = "active"), this._prevFrame = u;
    }
  }
}
function OD({ input: e = $, output: u = k, overwrite: F = true, hideCursor: t = true } = {}) {
  const s = f.createInterface({ input: e, output: u, prompt: "", tabSize: 1 });
  f.emitKeypressEvents(e, s), e.isTTY && e.setRawMode(true);
  const C = (D, { name: i }) => {
    if (String(D) === "\x03") {
      t && u.write(import_sisteransi.cursor.show), process.exit(0);
      return;
    }
    if (!F)
      return;
    let n = i === "return" ? 0 : -1, E = i === "return" ? -1 : 0;
    f.moveCursor(u, n, E, () => {
      f.clearLine(u, 1, () => {
        e.once("keypress", C);
      });
    });
  };
  return t && u.write(import_sisteransi.cursor.hide), e.once("keypress", C), () => {
    e.off("keypress", C), t && u.write(import_sisteransi.cursor.show), e.isTTY && !WD && e.setRawMode(false), s.terminal = false, s.close();
  };
}
var import_sisteransi, import_picocolors, J, j, Q, X, DD = function() {
  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
}, uD, d = 10, M = (e = 0) => (u) => `\x1B[${u + e}m`, P = (e = 0) => (u) => `\x1B[${38 + e};5;${u}m`, W = (e = 0) => (u, F, t) => `\x1B[${38 + e};2;${u};${F};${t}m`, r, FD, eD, sD, g, CD = 39, b = "\x07", O = "[", iD = "]", I = "m", w, N = (e) => `${g.values().next().value}${O}${e}${I}`, L = (e) => `${g.values().next().value}${w}${e}${b}`, rD = (e) => e.split(" ").map((u) => A(u)), y = (e, u, F) => {
  const t = [...u];
  let s = false, C = false, D = A(S(e[e.length - 1]));
  for (const [i, n] of t.entries()) {
    const E = A(n);
    if (D + E <= F ? e[e.length - 1] += n : (e.push(n), D = 0), g.has(n) && (s = true, C = t.slice(i + 1).join("").startsWith(w)), s) {
      C ? n === b && (s = false, C = false) : n === I && (s = false);
      continue;
    }
    D += E, D === F && i < t.length - 1 && (e.push(""), D = 0);
  }
  !D && e[e.length - 1].length > 0 && e.length > 1 && (e[e.length - 2] += e.pop());
}, ED = (e) => {
  const u = e.split(" ");
  let F = u.length;
  for (;F > 0 && !(A(u[F - 1]) > 0); )
    F--;
  return F === u.length ? e : u.slice(0, F).join(" ") + u.slice(F).join("");
}, oD = (e, u, F = {}) => {
  if (F.trim !== false && e.trim() === "")
    return "";
  let t = "", s, C;
  const D = rD(e);
  let i = [""];
  for (const [E, h] of e.split(" ").entries()) {
    F.trim !== false && (i[i.length - 1] = i[i.length - 1].trimStart());
    let o = A(i[i.length - 1]);
    if (E !== 0 && (o >= u && (F.wordWrap === false || F.trim === false) && (i.push(""), o = 0), (o > 0 || F.trim === false) && (i[i.length - 1] += " ", o++)), F.hard && D[E] > u) {
      const B = u - o, p = 1 + Math.floor((D[E] - B - 1) / u);
      Math.floor((D[E] - 1) / u) < p && i.push(""), y(i, h, u);
      continue;
    }
    if (o + D[E] > u && o > 0 && D[E] > 0) {
      if (F.wordWrap === false && o < u) {
        y(i, h, u);
        continue;
      }
      i.push("");
    }
    if (o + D[E] > u && F.wordWrap === false) {
      y(i, h, u);
      continue;
    }
    i[i.length - 1] += h;
  }
  F.trim !== false && (i = i.map((E) => ED(E)));
  const n = [...i.join(`
`)];
  for (const [E, h] of n.entries()) {
    if (t += h, g.has(h)) {
      const { groups: B } = new RegExp(`(?:\\${O}(?<code>\\d+)m|\\${w}(?<uri>.*)${b})`).exec(n.slice(E).join("")) || { groups: {} };
      if (B.code !== undefined) {
        const p = Number.parseFloat(B.code);
        s = p === CD ? undefined : p;
      } else
        B.uri !== undefined && (C = B.uri.length === 0 ? undefined : B.uri);
    }
    const o = sD.codes.get(Number(s));
    n[E + 1] === `
` ? (C && (t += L("")), s && o && (t += N(o))) : h === `
` && (s && o && (t += N(s)), C && (t += L(C)));
  }
  return t;
}, nD, aD = (e, u, F) => (u in e) ? nD(e, u, { enumerable: true, configurable: true, writable: true, value: F }) : e[u] = F, a = (e, u, F) => (aD(e, typeof u != "symbol" ? u + "" : u, F), F), V, z, xD, BD, cD, AD = (e, u, F) => (u in e) ? cD(e, u, { enumerable: true, configurable: true, writable: true, value: F }) : e[u] = F, G = (e, u, F) => (AD(e, typeof u != "symbol" ? u + "" : u, F), F), pD, fD, gD = (e, u, F) => (u in e) ? fD(e, u, { enumerable: true, configurable: true, writable: true, value: F }) : e[u] = F, K = (e, u, F) => (gD(e, typeof u != "symbol" ? u + "" : u, F), F), vD, mD, dD = (e, u, F) => (u in e) ? mD(e, u, { enumerable: true, configurable: true, writable: true, value: F }) : e[u] = F, Y = (e, u, F) => (dD(e, typeof u != "symbol" ? u + "" : u, F), F), bD, wD, yD = (e, u, F) => (u in e) ? wD(e, u, { enumerable: true, configurable: true, writable: true, value: F }) : e[u] = F, Z = (e, u, F) => (yD(e, typeof u != "symbol" ? u + "" : u, F), F), $D, kD, _D = (e, u, F) => (u in e) ? kD(e, u, { enumerable: true, configurable: true, writable: true, value: F }) : e[u] = F, H = (e, u, F) => (_D(e, typeof u != "symbol" ? u + "" : u, F), F), SD, TD, jD = (e, u, F) => (u in e) ? TD(e, u, { enumerable: true, configurable: true, writable: true, value: F }) : e[u] = F, MD = (e, u, F) => (jD(e, typeof u != "symbol" ? u + "" : u, F), F), PD, WD;
var init_dist = __esm(() => {
  import_sisteransi = __toESM(require_src(), 1);
  import_picocolors = __toESM(require_picocolors(), 1);
  J = q();
  j = { exports: {} };
  (function(e) {
    var u = {};
    e.exports = u, u.eastAsianWidth = function(t) {
      var s = t.charCodeAt(0), C = t.length == 2 ? t.charCodeAt(1) : 0, D = s;
      return 55296 <= s && s <= 56319 && 56320 <= C && C <= 57343 && (s &= 1023, C &= 1023, D = s << 10 | C, D += 65536), D == 12288 || 65281 <= D && D <= 65376 || 65504 <= D && D <= 65510 ? "F" : D == 8361 || 65377 <= D && D <= 65470 || 65474 <= D && D <= 65479 || 65482 <= D && D <= 65487 || 65490 <= D && D <= 65495 || 65498 <= D && D <= 65500 || 65512 <= D && D <= 65518 ? "H" : 4352 <= D && D <= 4447 || 4515 <= D && D <= 4519 || 4602 <= D && D <= 4607 || 9001 <= D && D <= 9002 || 11904 <= D && D <= 11929 || 11931 <= D && D <= 12019 || 12032 <= D && D <= 12245 || 12272 <= D && D <= 12283 || 12289 <= D && D <= 12350 || 12353 <= D && D <= 12438 || 12441 <= D && D <= 12543 || 12549 <= D && D <= 12589 || 12593 <= D && D <= 12686 || 12688 <= D && D <= 12730 || 12736 <= D && D <= 12771 || 12784 <= D && D <= 12830 || 12832 <= D && D <= 12871 || 12880 <= D && D <= 13054 || 13056 <= D && D <= 19903 || 19968 <= D && D <= 42124 || 42128 <= D && D <= 42182 || 43360 <= D && D <= 43388 || 44032 <= D && D <= 55203 || 55216 <= D && D <= 55238 || 55243 <= D && D <= 55291 || 63744 <= D && D <= 64255 || 65040 <= D && D <= 65049 || 65072 <= D && D <= 65106 || 65108 <= D && D <= 65126 || 65128 <= D && D <= 65131 || 110592 <= D && D <= 110593 || 127488 <= D && D <= 127490 || 127504 <= D && D <= 127546 || 127552 <= D && D <= 127560 || 127568 <= D && D <= 127569 || 131072 <= D && D <= 194367 || 177984 <= D && D <= 196605 || 196608 <= D && D <= 262141 ? "W" : 32 <= D && D <= 126 || 162 <= D && D <= 163 || 165 <= D && D <= 166 || D == 172 || D == 175 || 10214 <= D && D <= 10221 || 10629 <= D && D <= 10630 ? "Na" : D == 161 || D == 164 || 167 <= D && D <= 168 || D == 170 || 173 <= D && D <= 174 || 176 <= D && D <= 180 || 182 <= D && D <= 186 || 188 <= D && D <= 191 || D == 198 || D == 208 || 215 <= D && D <= 216 || 222 <= D && D <= 225 || D == 230 || 232 <= D && D <= 234 || 236 <= D && D <= 237 || D == 240 || 242 <= D && D <= 243 || 247 <= D && D <= 250 || D == 252 || D == 254 || D == 257 || D == 273 || D == 275 || D == 283 || 294 <= D && D <= 295 || D == 299 || 305 <= D && D <= 307 || D == 312 || 319 <= D && D <= 322 || D == 324 || 328 <= D && D <= 331 || D == 333 || 338 <= D && D <= 339 || 358 <= D && D <= 359 || D == 363 || D == 462 || D == 464 || D == 466 || D == 468 || D == 470 || D == 472 || D == 474 || D == 476 || D == 593 || D == 609 || D == 708 || D == 711 || 713 <= D && D <= 715 || D == 717 || D == 720 || 728 <= D && D <= 731 || D == 733 || D == 735 || 768 <= D && D <= 879 || 913 <= D && D <= 929 || 931 <= D && D <= 937 || 945 <= D && D <= 961 || 963 <= D && D <= 969 || D == 1025 || 1040 <= D && D <= 1103 || D == 1105 || D == 8208 || 8211 <= D && D <= 8214 || 8216 <= D && D <= 8217 || 8220 <= D && D <= 8221 || 8224 <= D && D <= 8226 || 8228 <= D && D <= 8231 || D == 8240 || 8242 <= D && D <= 8243 || D == 8245 || D == 8251 || D == 8254 || D == 8308 || D == 8319 || 8321 <= D && D <= 8324 || D == 8364 || D == 8451 || D == 8453 || D == 8457 || D == 8467 || D == 8470 || 8481 <= D && D <= 8482 || D == 8486 || D == 8491 || 8531 <= D && D <= 8532 || 8539 <= D && D <= 8542 || 8544 <= D && D <= 8555 || 8560 <= D && D <= 8569 || D == 8585 || 8592 <= D && D <= 8601 || 8632 <= D && D <= 8633 || D == 8658 || D == 8660 || D == 8679 || D == 8704 || 8706 <= D && D <= 8707 || 8711 <= D && D <= 8712 || D == 8715 || D == 8719 || D == 8721 || D == 8725 || D == 8730 || 8733 <= D && D <= 8736 || D == 8739 || D == 8741 || 8743 <= D && D <= 8748 || D == 8750 || 8756 <= D && D <= 8759 || 8764 <= D && D <= 8765 || D == 8776 || D == 8780 || D == 8786 || 8800 <= D && D <= 8801 || 8804 <= D && D <= 8807 || 8810 <= D && D <= 8811 || 8814 <= D && D <= 8815 || 8834 <= D && D <= 8835 || 8838 <= D && D <= 8839 || D == 8853 || D == 8857 || D == 8869 || D == 8895 || D == 8978 || 9312 <= D && D <= 9449 || 9451 <= D && D <= 9547 || 9552 <= D && D <= 9587 || 9600 <= D && D <= 9615 || 9618 <= D && D <= 9621 || 9632 <= D && D <= 9633 || 9635 <= D && D <= 9641 || 9650 <= D && D <= 9651 || 9654 <= D && D <= 9655 || 9660 <= D && D <= 9661 || 9664 <= D && D <= 9665 || 9670 <= D && D <= 9672 || D == 9675 || 9678 <= D && D <= 9681 || 9698 <= D && D <= 9701 || D == 9711 || 9733 <= D && D <= 9734 || D == 9737 || 9742 <= D && D <= 9743 || 9748 <= D && D <= 9749 || D == 9756 || D == 9758 || D == 9792 || D == 9794 || 9824 <= D && D <= 9825 || 9827 <= D && D <= 9829 || 9831 <= D && D <= 9834 || 9836 <= D && D <= 9837 || D == 9839 || 9886 <= D && D <= 9887 || 9918 <= D && D <= 9919 || 9924 <= D && D <= 9933 || 9935 <= D && D <= 9953 || D == 9955 || 9960 <= D && D <= 9983 || D == 10045 || D == 10071 || 10102 <= D && D <= 10111 || 11093 <= D && D <= 11097 || 12872 <= D && D <= 12879 || 57344 <= D && D <= 63743 || 65024 <= D && D <= 65039 || D == 65533 || 127232 <= D && D <= 127242 || 127248 <= D && D <= 127277 || 127280 <= D && D <= 127337 || 127344 <= D && D <= 127386 || 917760 <= D && D <= 917999 || 983040 <= D && D <= 1048573 || 1048576 <= D && D <= 1114109 ? "A" : "N";
    }, u.characterLength = function(t) {
      var s = this.eastAsianWidth(t);
      return s == "F" || s == "W" || s == "A" ? 2 : 1;
    };
    function F(t) {
      return t.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
    }
    u.length = function(t) {
      for (var s = F(t), C = 0, D = 0;D < s.length; D++)
        C = C + this.characterLength(s[D]);
      return C;
    }, u.slice = function(t, s, C) {
      textLen = u.length(t), s = s || 0, C = C || 1, s < 0 && (s = textLen + s), C < 0 && (C = textLen + C);
      for (var D = "", i = 0, n = F(t), E = 0;E < n.length; E++) {
        var h = n[E], o = u.length(h);
        if (i >= s - (o == 2 ? 1 : 0))
          if (i + o <= C)
            D += h;
          else
            break;
        i += o;
      }
      return D;
    };
  })(j);
  Q = j.exports;
  X = T(Q);
  uD = T(DD);
  r = { modifier: { reset: [0, 0], bold: [1, 22], dim: [2, 22], italic: [3, 23], underline: [4, 24], overline: [53, 55], inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29] }, color: { black: [30, 39], red: [31, 39], green: [32, 39], yellow: [33, 39], blue: [34, 39], magenta: [35, 39], cyan: [36, 39], white: [37, 39], blackBright: [90, 39], gray: [90, 39], grey: [90, 39], redBright: [91, 39], greenBright: [92, 39], yellowBright: [93, 39], blueBright: [94, 39], magentaBright: [95, 39], cyanBright: [96, 39], whiteBright: [97, 39] }, bgColor: { bgBlack: [40, 49], bgRed: [41, 49], bgGreen: [42, 49], bgYellow: [43, 49], bgBlue: [44, 49], bgMagenta: [45, 49], bgCyan: [46, 49], bgWhite: [47, 49], bgBlackBright: [100, 49], bgGray: [100, 49], bgGrey: [100, 49], bgRedBright: [101, 49], bgGreenBright: [102, 49], bgYellowBright: [103, 49], bgBlueBright: [104, 49], bgMagentaBright: [105, 49], bgCyanBright: [106, 49], bgWhiteBright: [107, 49] } };
  Object.keys(r.modifier);
  FD = Object.keys(r.color);
  eD = Object.keys(r.bgColor);
  [...FD];
  sD = tD();
  g = new Set(["\x1B", "\x9B"]);
  w = `${iD}8;;`;
  nD = Object.defineProperty;
  V = Symbol("clack:cancel");
  z = new Map([["k", "up"], ["j", "down"], ["h", "left"], ["l", "right"]]);
  xD = new Set(["up", "down", "left", "right", "space", "enter"]);
  BD = class BD extends x {
    get cursor() {
      return this.value ? 0 : 1;
    }
    get _value() {
      return this.cursor === 0;
    }
    constructor(u) {
      super(u, false), this.value = !!u.initialValue, this.on("value", () => {
        this.value = this._value;
      }), this.on("confirm", (F) => {
        this.output.write(import_sisteransi.cursor.move(0, -1)), this.value = F, this.state = "submit", this.close();
      }), this.on("cursor", () => {
        this.value = !this.value;
      });
    }
  };
  cD = Object.defineProperty;
  pD = class pD extends x {
    constructor(u) {
      super(u, false), G(this, "options"), G(this, "cursor", 0);
      const { options: F } = u;
      this.options = Object.entries(F).flatMap(([t, s]) => [{ value: t, group: true, label: t }, ...s.map((C) => ({ ...C, group: t }))]), this.value = [...u.initialValues ?? []], this.cursor = Math.max(this.options.findIndex(({ value: t }) => t === u.cursorAt), 0), this.on("cursor", (t) => {
        switch (t) {
          case "left":
          case "up":
            this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
            break;
          case "down":
          case "right":
            this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
            break;
          case "space":
            this.toggleValue();
            break;
        }
      });
    }
    getGroupItems(u) {
      return this.options.filter((F) => F.group === u);
    }
    isGroupSelected(u) {
      return this.getGroupItems(u).every((F) => this.value.includes(F.value));
    }
    toggleValue() {
      const u = this.options[this.cursor];
      if (u.group === true) {
        const F = u.value, t = this.getGroupItems(F);
        this.isGroupSelected(F) ? this.value = this.value.filter((s) => t.findIndex((C) => C.value === s) === -1) : this.value = [...this.value, ...t.map((s) => s.value)], this.value = Array.from(new Set(this.value));
      } else {
        const F = this.value.includes(u.value);
        this.value = F ? this.value.filter((t) => t !== u.value) : [...this.value, u.value];
      }
    }
  };
  fD = Object.defineProperty;
  vD = class extends x {
    constructor(u) {
      super(u, false), K(this, "options"), K(this, "cursor", 0), this.options = u.options, this.value = [...u.initialValues ?? []], this.cursor = Math.max(this.options.findIndex(({ value: F }) => F === u.cursorAt), 0), this.on("key", (F) => {
        F === "a" && this.toggleAll();
      }), this.on("cursor", (F) => {
        switch (F) {
          case "left":
          case "up":
            this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
            break;
          case "down":
          case "right":
            this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
            break;
          case "space":
            this.toggleValue();
            break;
        }
      });
    }
    get _value() {
      return this.options[this.cursor].value;
    }
    toggleAll() {
      const u = this.value.length === this.options.length;
      this.value = u ? [] : this.options.map((F) => F.value);
    }
    toggleValue() {
      const u = this.value.includes(this._value);
      this.value = u ? this.value.filter((F) => F !== this._value) : [...this.value, this._value];
    }
  };
  mD = Object.defineProperty;
  bD = class bD extends x {
    constructor({ mask: u, ...F }) {
      super(F), Y(this, "valueWithCursor", ""), Y(this, "_mask", "\u2022"), this._mask = u ?? "\u2022", this.on("finalize", () => {
        this.valueWithCursor = this.masked;
      }), this.on("value", () => {
        if (this.cursor >= this.value.length)
          this.valueWithCursor = `${this.masked}${import_picocolors.default.inverse(import_picocolors.default.hidden("_"))}`;
        else {
          const t = this.masked.slice(0, this.cursor), s = this.masked.slice(this.cursor);
          this.valueWithCursor = `${t}${import_picocolors.default.inverse(s[0])}${s.slice(1)}`;
        }
      });
    }
    get cursor() {
      return this._cursor;
    }
    get masked() {
      return this.value.replaceAll(/./g, this._mask);
    }
  };
  wD = Object.defineProperty;
  $D = class extends x {
    constructor(u) {
      super(u, false), Z(this, "options"), Z(this, "cursor", 0), this.options = u.options, this.cursor = this.options.findIndex(({ value: F }) => F === u.initialValue), this.cursor === -1 && (this.cursor = 0), this.changeValue(), this.on("cursor", (F) => {
        switch (F) {
          case "left":
          case "up":
            this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
            break;
          case "down":
          case "right":
            this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
            break;
        }
        this.changeValue();
      });
    }
    get _value() {
      return this.options[this.cursor];
    }
    changeValue() {
      this.value = this._value.value;
    }
  };
  kD = Object.defineProperty;
  SD = class SD extends x {
    constructor(u) {
      super(u, false), H(this, "options"), H(this, "cursor", 0), this.options = u.options;
      const F = this.options.map(({ value: [t] }) => t?.toLowerCase());
      this.cursor = Math.max(F.indexOf(u.initialValue), 0), this.on("key", (t) => {
        if (!F.includes(t))
          return;
        const s = this.options.find(({ value: [C] }) => C?.toLowerCase() === t);
        s && (this.value = s.value, this.state = "submit", this.emit("submit"));
      });
    }
  };
  TD = Object.defineProperty;
  PD = class PD extends x {
    constructor(u) {
      super(u), MD(this, "valueWithCursor", ""), this.on("finalize", () => {
        this.value || (this.value = u.defaultValue), this.valueWithCursor = this.value;
      }), this.on("value", () => {
        if (this.cursor >= this.value.length)
          this.valueWithCursor = `${this.value}${import_picocolors.default.inverse(import_picocolors.default.hidden("_"))}`;
        else {
          const F = this.value.slice(0, this.cursor), t = this.value.slice(this.cursor);
          this.valueWithCursor = `${F}${import_picocolors.default.inverse(t[0])}${t.slice(1)}`;
        }
      });
    }
    get cursor() {
      return this._cursor;
    }
  };
  WD = globalThis.process.platform.startsWith("win");
});

// node_modules/.pnpm/@clack+prompts@0.8.2/node_modules/@clack/prompts/dist/index.mjs
var exports_dist = {};
__export(exports_dist, {
  text: () => ae,
  tasks: () => we,
  spinner: () => _2,
  selectKey: () => ue,
  select: () => le,
  password: () => oe,
  outro: () => ge,
  note: () => me,
  multiselect: () => $e,
  log: () => v2,
  isCancel: () => lD,
  intro: () => pe,
  groupMultiselect: () => de,
  group: () => ve,
  confirm: () => ce,
  cancel: () => he
});
import h from "process";
function K2() {
  return h.platform !== "win32" ? h.env.TERM !== "linux" : !!h.env.CI || !!h.env.WT_SESSION || !!h.env.TERMINUS_SUBLIME || h.env.ConEmuTask === "{cmd::Cmder}" || h.env.TERM_PROGRAM === "Terminus-Sublime" || h.env.TERM_PROGRAM === "vscode" || h.env.TERM === "xterm-256color" || h.env.TERM === "alacritty" || h.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
function ye() {
  const s = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");
  return new RegExp(s, "g");
}
var import_picocolors2, import_sisteransi2, C, u = (s, n) => C ? s : n, Y2, P2, V2, M2, Q2, a2, $2, I2, T2, j2, b2, B, X2, G2, H2, ee, te, se, re, ie, ne, y2 = (s) => {
  switch (s) {
    case "initial":
    case "active":
      return import_picocolors2.default.cyan(Y2);
    case "cancel":
      return import_picocolors2.default.red(P2);
    case "error":
      return import_picocolors2.default.yellow(V2);
    case "submit":
      return import_picocolors2.default.green(M2);
  }
}, E = (s) => {
  const { cursor: n, options: t, style: i } = s, r2 = s.maxItems ?? 1 / 0, o = Math.max(process.stdout.rows - 4, 0), c2 = Math.min(o, Math.max(r2, 5));
  let l2 = 0;
  n >= l2 + c2 - 3 ? l2 = Math.max(Math.min(n - c2 + 3, t.length - c2), 0) : n < l2 + 2 && (l2 = Math.max(n - 2, 0));
  const d2 = c2 < t.length && l2 > 0, p = c2 < t.length && l2 + c2 < t.length;
  return t.slice(l2, l2 + c2).map((S2, f2, x2) => {
    const g2 = f2 === 0 && d2, m2 = f2 === x2.length - 1 && p;
    return g2 || m2 ? import_picocolors2.default.dim("...") : i(S2, f2 + l2 === n);
  });
}, ae = (s) => new PD({ validate: s.validate, placeholder: s.placeholder, defaultValue: s.defaultValue, initialValue: s.initialValue, render() {
  const n = `${import_picocolors2.default.gray(a2)}
${y2(this.state)}  ${s.message}
`, t = s.placeholder ? import_picocolors2.default.inverse(s.placeholder[0]) + import_picocolors2.default.dim(s.placeholder.slice(1)) : import_picocolors2.default.inverse(import_picocolors2.default.hidden("_")), i = this.value ? this.valueWithCursor : t;
  switch (this.state) {
    case "error":
      return `${n.trim()}
${import_picocolors2.default.yellow(a2)}  ${i}
${import_picocolors2.default.yellow($2)}  ${import_picocolors2.default.yellow(this.error)}
`;
    case "submit":
      return `${n}${import_picocolors2.default.gray(a2)}  ${import_picocolors2.default.dim(this.value || s.placeholder)}`;
    case "cancel":
      return `${n}${import_picocolors2.default.gray(a2)}  ${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(this.value ?? ""))}${this.value?.trim() ? `
` + import_picocolors2.default.gray(a2) : ""}`;
    default:
      return `${n}${import_picocolors2.default.cyan(a2)}  ${i}
${import_picocolors2.default.cyan($2)}
`;
  }
} }).prompt(), oe = (s) => new bD({ validate: s.validate, mask: s.mask ?? X2, render() {
  const n = `${import_picocolors2.default.gray(a2)}
${y2(this.state)}  ${s.message}
`, t = this.valueWithCursor, i = this.masked;
  switch (this.state) {
    case "error":
      return `${n.trim()}
${import_picocolors2.default.yellow(a2)}  ${i}
${import_picocolors2.default.yellow($2)}  ${import_picocolors2.default.yellow(this.error)}
`;
    case "submit":
      return `${n}${import_picocolors2.default.gray(a2)}  ${import_picocolors2.default.dim(i)}`;
    case "cancel":
      return `${n}${import_picocolors2.default.gray(a2)}  ${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(i ?? ""))}${i ? `
` + import_picocolors2.default.gray(a2) : ""}`;
    default:
      return `${n}${import_picocolors2.default.cyan(a2)}  ${t}
${import_picocolors2.default.cyan($2)}
`;
  }
} }).prompt(), ce = (s) => {
  const n = s.active ?? "Yes", t = s.inactive ?? "No";
  return new BD({ active: n, inactive: t, initialValue: s.initialValue ?? true, render() {
    const i = `${import_picocolors2.default.gray(a2)}
${y2(this.state)}  ${s.message}
`, r2 = this.value ? n : t;
    switch (this.state) {
      case "submit":
        return `${i}${import_picocolors2.default.gray(a2)}  ${import_picocolors2.default.dim(r2)}`;
      case "cancel":
        return `${i}${import_picocolors2.default.gray(a2)}  ${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(r2))}
${import_picocolors2.default.gray(a2)}`;
      default:
        return `${i}${import_picocolors2.default.cyan(a2)}  ${this.value ? `${import_picocolors2.default.green(I2)} ${n}` : `${import_picocolors2.default.dim(T2)} ${import_picocolors2.default.dim(n)}`} ${import_picocolors2.default.dim("/")} ${this.value ? `${import_picocolors2.default.dim(T2)} ${import_picocolors2.default.dim(t)}` : `${import_picocolors2.default.green(I2)} ${t}`}
${import_picocolors2.default.cyan($2)}
`;
    }
  } }).prompt();
}, le = (s) => {
  const n = (t, i) => {
    const r2 = t.label ?? String(t.value);
    switch (i) {
      case "selected":
        return `${import_picocolors2.default.dim(r2)}`;
      case "active":
        return `${import_picocolors2.default.green(I2)} ${r2} ${t.hint ? import_picocolors2.default.dim(`(${t.hint})`) : ""}`;
      case "cancelled":
        return `${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(r2))}`;
      default:
        return `${import_picocolors2.default.dim(T2)} ${import_picocolors2.default.dim(r2)}`;
    }
  };
  return new $D({ options: s.options, initialValue: s.initialValue, render() {
    const t = `${import_picocolors2.default.gray(a2)}
${y2(this.state)}  ${s.message}
`;
    switch (this.state) {
      case "submit":
        return `${t}${import_picocolors2.default.gray(a2)}  ${n(this.options[this.cursor], "selected")}`;
      case "cancel":
        return `${t}${import_picocolors2.default.gray(a2)}  ${n(this.options[this.cursor], "cancelled")}
${import_picocolors2.default.gray(a2)}`;
      default:
        return `${t}${import_picocolors2.default.cyan(a2)}  ${E({ cursor: this.cursor, options: this.options, maxItems: s.maxItems, style: (i, r2) => n(i, r2 ? "active" : "inactive") }).join(`
${import_picocolors2.default.cyan(a2)}  `)}
${import_picocolors2.default.cyan($2)}
`;
    }
  } }).prompt();
}, ue = (s) => {
  const n = (t, i = "inactive") => {
    const r2 = t.label ?? String(t.value);
    return i === "selected" ? `${import_picocolors2.default.dim(r2)}` : i === "cancelled" ? `${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(r2))}` : i === "active" ? `${import_picocolors2.default.bgCyan(import_picocolors2.default.gray(` ${t.value} `))} ${r2} ${t.hint ? import_picocolors2.default.dim(`(${t.hint})`) : ""}` : `${import_picocolors2.default.gray(import_picocolors2.default.bgWhite(import_picocolors2.default.inverse(` ${t.value} `)))} ${r2} ${t.hint ? import_picocolors2.default.dim(`(${t.hint})`) : ""}`;
  };
  return new SD({ options: s.options, initialValue: s.initialValue, render() {
    const t = `${import_picocolors2.default.gray(a2)}
${y2(this.state)}  ${s.message}
`;
    switch (this.state) {
      case "submit":
        return `${t}${import_picocolors2.default.gray(a2)}  ${n(this.options.find((i) => i.value === this.value), "selected")}`;
      case "cancel":
        return `${t}${import_picocolors2.default.gray(a2)}  ${n(this.options[0], "cancelled")}
${import_picocolors2.default.gray(a2)}`;
      default:
        return `${t}${import_picocolors2.default.cyan(a2)}  ${this.options.map((i, r2) => n(i, r2 === this.cursor ? "active" : "inactive")).join(`
${import_picocolors2.default.cyan(a2)}  `)}
${import_picocolors2.default.cyan($2)}
`;
    }
  } }).prompt();
}, $e = (s) => {
  const n = (t, i) => {
    const r2 = t.label ?? String(t.value);
    return i === "active" ? `${import_picocolors2.default.cyan(j2)} ${r2} ${t.hint ? import_picocolors2.default.dim(`(${t.hint})`) : ""}` : i === "selected" ? `${import_picocolors2.default.green(b2)} ${import_picocolors2.default.dim(r2)}` : i === "cancelled" ? `${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(r2))}` : i === "active-selected" ? `${import_picocolors2.default.green(b2)} ${r2} ${t.hint ? import_picocolors2.default.dim(`(${t.hint})`) : ""}` : i === "submitted" ? `${import_picocolors2.default.dim(r2)}` : `${import_picocolors2.default.dim(B)} ${import_picocolors2.default.dim(r2)}`;
  };
  return new vD({ options: s.options, initialValues: s.initialValues, required: s.required ?? true, cursorAt: s.cursorAt, validate(t) {
    if (this.required && t.length === 0)
      return `Please select at least one option.
${import_picocolors2.default.reset(import_picocolors2.default.dim(`Press ${import_picocolors2.default.gray(import_picocolors2.default.bgWhite(import_picocolors2.default.inverse(" space ")))} to select, ${import_picocolors2.default.gray(import_picocolors2.default.bgWhite(import_picocolors2.default.inverse(" enter ")))} to submit`))}`;
  }, render() {
    let t = `${import_picocolors2.default.gray(a2)}
${y2(this.state)}  ${s.message}
`;
    const i = (r2, o) => {
      const c2 = this.value.includes(r2.value);
      return o && c2 ? n(r2, "active-selected") : c2 ? n(r2, "selected") : n(r2, o ? "active" : "inactive");
    };
    switch (this.state) {
      case "submit":
        return `${t}${import_picocolors2.default.gray(a2)}  ${this.options.filter(({ value: r2 }) => this.value.includes(r2)).map((r2) => n(r2, "submitted")).join(import_picocolors2.default.dim(", ")) || import_picocolors2.default.dim("none")}`;
      case "cancel": {
        const r2 = this.options.filter(({ value: o }) => this.value.includes(o)).map((o) => n(o, "cancelled")).join(import_picocolors2.default.dim(", "));
        return `${t}${import_picocolors2.default.gray(a2)}  ${r2.trim() ? `${r2}
${import_picocolors2.default.gray(a2)}` : ""}`;
      }
      case "error": {
        const r2 = this.error.split(`
`).map((o, c2) => c2 === 0 ? `${import_picocolors2.default.yellow($2)}  ${import_picocolors2.default.yellow(o)}` : `   ${o}`).join(`
`);
        return t + import_picocolors2.default.yellow(a2) + "  " + E({ options: this.options, cursor: this.cursor, maxItems: s.maxItems, style: i }).join(`
${import_picocolors2.default.yellow(a2)}  `) + `
` + r2 + `
`;
      }
      default:
        return `${t}${import_picocolors2.default.cyan(a2)}  ${E({ options: this.options, cursor: this.cursor, maxItems: s.maxItems, style: i }).join(`
${import_picocolors2.default.cyan(a2)}  `)}
${import_picocolors2.default.cyan($2)}
`;
    }
  } }).prompt();
}, de = (s) => {
  const n = (t, i, r2 = []) => {
    const o = t.label ?? String(t.value), c2 = typeof t.group == "string", l2 = c2 && (r2[r2.indexOf(t) + 1] ?? { group: true }), d2 = c2 && l2.group === true, p = c2 ? `${d2 ? $2 : a2} ` : "";
    return i === "active" ? `${import_picocolors2.default.dim(p)}${import_picocolors2.default.cyan(j2)} ${o} ${t.hint ? import_picocolors2.default.dim(`(${t.hint})`) : ""}` : i === "group-active" ? `${p}${import_picocolors2.default.cyan(j2)} ${import_picocolors2.default.dim(o)}` : i === "group-active-selected" ? `${p}${import_picocolors2.default.green(b2)} ${import_picocolors2.default.dim(o)}` : i === "selected" ? `${import_picocolors2.default.dim(p)}${import_picocolors2.default.green(b2)} ${import_picocolors2.default.dim(o)}` : i === "cancelled" ? `${import_picocolors2.default.strikethrough(import_picocolors2.default.dim(o))}` : i === "active-selected" ? `${import_picocolors2.default.dim(p)}${import_picocolors2.default.green(b2)} ${o} ${t.hint ? import_picocolors2.default.dim(`(${t.hint})`) : ""}` : i === "submitted" ? `${import_picocolors2.default.dim(o)}` : `${import_picocolors2.default.dim(p)}${import_picocolors2.default.dim(B)} ${import_picocolors2.default.dim(o)}`;
  };
  return new pD({ options: s.options, initialValues: s.initialValues, required: s.required ?? true, cursorAt: s.cursorAt, validate(t) {
    if (this.required && t.length === 0)
      return `Please select at least one option.
${import_picocolors2.default.reset(import_picocolors2.default.dim(`Press ${import_picocolors2.default.gray(import_picocolors2.default.bgWhite(import_picocolors2.default.inverse(" space ")))} to select, ${import_picocolors2.default.gray(import_picocolors2.default.bgWhite(import_picocolors2.default.inverse(" enter ")))} to submit`))}`;
  }, render() {
    let t = `${import_picocolors2.default.gray(a2)}
${y2(this.state)}  ${s.message}
`;
    switch (this.state) {
      case "submit":
        return `${t}${import_picocolors2.default.gray(a2)}  ${this.options.filter(({ value: i }) => this.value.includes(i)).map((i) => n(i, "submitted")).join(import_picocolors2.default.dim(", "))}`;
      case "cancel": {
        const i = this.options.filter(({ value: r2 }) => this.value.includes(r2)).map((r2) => n(r2, "cancelled")).join(import_picocolors2.default.dim(", "));
        return `${t}${import_picocolors2.default.gray(a2)}  ${i.trim() ? `${i}
${import_picocolors2.default.gray(a2)}` : ""}`;
      }
      case "error": {
        const i = this.error.split(`
`).map((r2, o) => o === 0 ? `${import_picocolors2.default.yellow($2)}  ${import_picocolors2.default.yellow(r2)}` : `   ${r2}`).join(`
`);
        return `${t}${import_picocolors2.default.yellow(a2)}  ${this.options.map((r2, o, c2) => {
          const l2 = this.value.includes(r2.value) || r2.group === true && this.isGroupSelected(`${r2.value}`), d2 = o === this.cursor;
          return !d2 && typeof r2.group == "string" && this.options[this.cursor].value === r2.group ? n(r2, l2 ? "group-active-selected" : "group-active", c2) : d2 && l2 ? n(r2, "active-selected", c2) : l2 ? n(r2, "selected", c2) : n(r2, d2 ? "active" : "inactive", c2);
        }).join(`
${import_picocolors2.default.yellow(a2)}  `)}
${i}
`;
      }
      default:
        return `${t}${import_picocolors2.default.cyan(a2)}  ${this.options.map((i, r2, o) => {
          const c2 = this.value.includes(i.value) || i.group === true && this.isGroupSelected(`${i.value}`), l2 = r2 === this.cursor;
          return !l2 && typeof i.group == "string" && this.options[this.cursor].value === i.group ? n(i, c2 ? "group-active-selected" : "group-active", o) : l2 && c2 ? n(i, "active-selected", o) : c2 ? n(i, "selected", o) : n(i, l2 ? "active" : "inactive", o);
        }).join(`
${import_picocolors2.default.cyan(a2)}  `)}
${import_picocolors2.default.cyan($2)}
`;
    }
  } }).prompt();
}, R2 = (s) => s.replace(ye(), ""), me = (s = "", n = "") => {
  const t = `
${s}
`.split(`
`), i = R2(n).length, r2 = Math.max(t.reduce((c2, l2) => (l2 = R2(l2), l2.length > c2 ? l2.length : c2), 0), i) + 2, o = t.map((c2) => `${import_picocolors2.default.gray(a2)}  ${import_picocolors2.default.dim(c2)}${" ".repeat(r2 - R2(c2).length)}${import_picocolors2.default.gray(a2)}`).join(`
`);
  process.stdout.write(`${import_picocolors2.default.gray(a2)}
${import_picocolors2.default.green(M2)}  ${import_picocolors2.default.reset(n)} ${import_picocolors2.default.gray(G2.repeat(Math.max(r2 - i - 1, 1)) + H2)}
${o}
${import_picocolors2.default.gray(ee + G2.repeat(r2 + 2) + te)}
`);
}, he = (s = "") => {
  process.stdout.write(`${import_picocolors2.default.gray($2)}  ${import_picocolors2.default.red(s)}

`);
}, pe = (s = "") => {
  process.stdout.write(`${import_picocolors2.default.gray(Q2)}  ${s}
`);
}, ge = (s = "") => {
  process.stdout.write(`${import_picocolors2.default.gray(a2)}
${import_picocolors2.default.gray($2)}  ${s}

`);
}, v2, _2 = () => {
  const s = C ? ["\u25D2", "\u25D0", "\u25D3", "\u25D1"] : ["\u2022", "o", "O", "0"], n = C ? 80 : 120;
  let t, i, r2 = false, o = "";
  const c2 = (g2) => {
    const m2 = g2 > 1 ? "Something went wrong" : "Canceled";
    r2 && x2(m2, g2);
  }, l2 = () => c2(2), d2 = () => c2(1), p = () => {
    process.on("uncaughtExceptionMonitor", l2), process.on("unhandledRejection", l2), process.on("SIGINT", d2), process.on("SIGTERM", d2), process.on("exit", c2);
  }, S2 = () => {
    process.removeListener("uncaughtExceptionMonitor", l2), process.removeListener("unhandledRejection", l2), process.removeListener("SIGINT", d2), process.removeListener("SIGTERM", d2), process.removeListener("exit", c2);
  }, f2 = (g2 = "") => {
    r2 = true, t = OD(), o = g2.replace(/\.+$/, ""), process.stdout.write(`${import_picocolors2.default.gray(a2)}
`);
    let m2 = 0, w2 = 0;
    p(), i = setInterval(() => {
      const L2 = import_picocolors2.default.magenta(s[m2]), O2 = ".".repeat(Math.floor(w2)).slice(0, 3);
      process.stdout.write(import_sisteransi2.cursor.move(-999, 0)), process.stdout.write(import_sisteransi2.erase.down(1)), process.stdout.write(`${L2}  ${o}${O2}`), m2 = m2 + 1 < s.length ? m2 + 1 : 0, w2 = w2 < s.length ? w2 + 0.125 : 0;
    }, n);
  }, x2 = (g2 = "", m2 = 0) => {
    o = g2 ?? o, r2 = false, clearInterval(i);
    const w2 = m2 === 0 ? import_picocolors2.default.green(M2) : m2 === 1 ? import_picocolors2.default.red(P2) : import_picocolors2.default.red(V2);
    process.stdout.write(import_sisteransi2.cursor.move(-999, 0)), process.stdout.write(import_sisteransi2.erase.down(1)), process.stdout.write(`${w2}  ${o}
`), S2(), t();
  };
  return { start: f2, stop: x2, message: (g2 = "") => {
    o = g2 ?? o;
  } };
}, ve = async (s, n) => {
  const t = {}, i = Object.keys(s);
  for (const r2 of i) {
    const o = s[r2], c2 = await o({ results: t })?.catch((l2) => {
      throw l2;
    });
    if (typeof n?.onCancel == "function" && lD(c2)) {
      t[r2] = "canceled", n.onCancel({ results: t });
      continue;
    }
    t[r2] = c2;
  }
  return t;
}, we = async (s) => {
  for (const n of s) {
    if (n.enabled === false)
      continue;
    const t = _2();
    t.start(n.title);
    const i = await n.task(t.message);
    t.stop(i || n.title);
  }
};
var init_dist2 = __esm(() => {
  init_dist();
  init_dist();
  import_picocolors2 = __toESM(require_picocolors(), 1);
  import_sisteransi2 = __toESM(require_src(), 1);
  C = K2();
  Y2 = u("\u25C6", "*");
  P2 = u("\u25A0", "x");
  V2 = u("\u25B2", "x");
  M2 = u("\u25C7", "o");
  Q2 = u("\u250C", "T");
  a2 = u("\u2502", "|");
  $2 = u("\u2514", "\u2014");
  I2 = u("\u25CF", ">");
  T2 = u("\u25CB", " ");
  j2 = u("\u25FB", "[\u2022]");
  b2 = u("\u25FC", "[+]");
  B = u("\u25FB", "[ ]");
  X2 = u("\u25AA", "\u2022");
  G2 = u("\u2500", "-");
  H2 = u("\u256E", "+");
  ee = u("\u251C", "+");
  te = u("\u256F", "+");
  se = u("\u25CF", "\u2022");
  re = u("\u25C6", "*");
  ie = u("\u25B2", "!");
  ne = u("\u25A0", "x");
  v2 = { message: (s = "", { symbol: n = import_picocolors2.default.gray(a2) } = {}) => {
    const t = [`${import_picocolors2.default.gray(a2)}`];
    if (s) {
      const [i, ...r2] = s.split(`
`);
      t.push(`${n}  ${i}`, ...r2.map((o) => `${import_picocolors2.default.gray(a2)}  ${o}`));
    }
    process.stdout.write(`${t.join(`
`)}
`);
  }, info: (s) => {
    v2.message(s, { symbol: import_picocolors2.default.blue(se) });
  }, success: (s) => {
    v2.message(s, { symbol: import_picocolors2.default.green(re) });
  }, step: (s) => {
    v2.message(s, { symbol: import_picocolors2.default.green(M2) });
  }, warn: (s) => {
    v2.message(s, { symbol: import_picocolors2.default.yellow(ie) });
  }, warning: (s) => {
    v2.warn(s);
  }, error: (s) => {
    v2.message(s, { symbol: import_picocolors2.default.red(ne) });
  } };
});

// packages/models/dist/catalog-snapshot.js
var CATALOG_SNAPSHOT;
var init_catalog_snapshot = __esm(() => {
  CATALOG_SNAPSHOT = [
    {
      id: "Qwen/Qwen2.5-VL-72B-Instruct",
      name: "Qwen2.5-VL-72B-Instruct",
      description: "High-end multimodal model delivering strong vision-language reasoning with long-context support.",
      context_length: 32000,
      architecture: {
        modality: "text+image->text"
      },
      pricing: {
        prompt: "0.00000025",
        completion: "0.00000075",
        image: "0"
      }
    },
    {
      id: "MiniMaxAI/MiniMax-M3",
      name: "MiniMax-M3",
      description: "MiniMax-M3 is a 428B MoE reasoning model with 1M context, served on B200 via vLLM with EAGLE3 speculative decoding.",
      context_length: 8000,
      architecture: {
        modality: "text->text"
      },
      pricing: {
        prompt: "0.0000003",
        completion: "0.0000012",
        image: "0"
      }
    },
    {
      id: "moonshotai/Kimi-K2.7-Code",
      name: "Kimi-K2.7-Code",
      description: "Open-source code-focused reasoning model built for long-context software engineering, tool use, and agentic coding workflows.",
      context_length: 8000,
      architecture: {
        modality: "text->text"
      },
      pricing: {
        prompt: "0.00000095",
        completion: "0.000004",
        image: "0"
      }
    },
    {
      id: "moonshotai/Kimi-K2.6",
      name: "Kimi-K2.6",
      description: "Kimi K2.6 is an open-source, native multimodal agentic model built through continual pretraining on approximately 15 trillion mixed visual and text tokens atop Kimi-K2-Base",
      context_length: 262144,
      architecture: {
        modality: "text+image->text"
      },
      pricing: {
        prompt: "0.00000095",
        completion: "0.000004",
        image: "0"
      }
    },
    {
      id: "Qwen/Qwen3.5-397B-A17B",
      name: "Qwen3.5-397B-A17B",
      description: "Multimodal model featuring a Hybrid Mixture-of-Experts architecture, designed for state-of-the-art performance across chat, retrieval-augmented generation, vision-language understanding, video understanding, and agentic workflows",
      context_length: 262144,
      architecture: {
        modality: "text->text"
      },
      pricing: {
        prompt: "0.0000006",
        completion: "0.0000036",
        image: "0"
      }
    },
    {
      id: "deepseek-ai/DeepSeek-V4-Flash",
      name: "DeepSeek-V4-Flash",
      description: "DeepSeek-V4-Flash is a fast, cost-effective V4 preview model for coding, reasoning, and agentic workflows.",
      context_length: 1048576,
      architecture: {
        modality: "text->text"
      },
      pricing: {
        prompt: "0",
        completion: "0",
        image: "0"
      }
    },
    {
      id: "deepseek-ai/DeepSeek-V4-Pro",
      name: "DeepSeek-V4-Pro",
      description: "DeepSeek-V4 is designed for advanced reasoning, coding, and long-horizon agent workflows, with strong performance across knowledge, math, and software engineering benchmarks.",
      context_length: 1048576,
      architecture: {
        modality: "text->text"
      },
      pricing: {
        prompt: "0.00000175",
        completion: "0.0000035",
        image: "0"
      }
    },
    {
      id: "zai-org/GLM-5.2",
      name: "GLM-5.2",
      description: "Zhipu AI's latest flagship multimodal model with strong bilingual (Chinese-English) reasoning, long-context understanding, advanced tool use, and agent-oriented capabilities.",
      context_length: 8000,
      architecture: {
        modality: "text->text"
      },
      pricing: {
        prompt: "0.0000014",
        completion: "0.0000044",
        image: "0"
      }
    },
    {
      id: "moonshotai/Kimi-K3",
      name: "Kimi-K3",
      description: "Moonshot AI's Kimi K3 frontier open-weights MoE model (MXFP4, 1M context) with MTP speculative decoding, strong agentic tool use, reasoning, and coding.",
      context_length: 8000,
      architecture: {
        modality: "text->text"
      },
      pricing: {
        prompt: "0.000003",
        completion: "0.000015",
        image: "0"
      }
    }
  ];
});

// packages/models/dist/index.js
function costPerToken(costPerMillion) {
  return costPerMillion / TOKENS_PER_MILLION;
}
function acceptsReasoningEffort(modelId) {
  return REASONING_EFFORT_MODEL_IDS.has(modelId);
}
function priceToMillion(value) {
  const perToken = typeof value === "string" ? Number.parseFloat(value) : value ?? 0;
  if (!Number.isFinite(perToken) || perToken <= 0) {
    return 0;
  }
  return perToken * TOKENS_PER_MILLION;
}
function parseModalities(modality) {
  const known = ["text", "audio", "image", "video", "pdf"];
  const isKnown = (v3) => known.includes(v3);
  const [inputRaw = "text", outputRaw = "text"] = (modality ?? "text->text").split("->");
  const parse = (side) => {
    const parts = side.split("+").map((p) => p.trim().toLowerCase()).filter(isKnown);
    return parts.length > 0 ? parts : ["text"];
  };
  return { input: parse(inputRaw), output: parse(outputRaw) };
}
function rawOutputIsText(modality) {
  const output = (modality ?? "text->text").split("->")[1] ?? "text";
  return output.split("+").map((part) => part.trim().toLowerCase()).includes("text");
}
function mapApiModel(api, override) {
  const modalities = parseModalities(api.architecture?.modality);
  const attachment = modalities.input.includes("image");
  const apiContext = typeof api.context_length === "number" && api.context_length > 0 ? api.context_length : 0;
  const context = Math.max(apiContext, override?.minContext ?? 0) || DEFAULT_CONTEXT;
  const output = override?.outputLimit ?? Math.min(context, DEFAULT_OUTPUT_LIMIT);
  return {
    id: api.id,
    name: override?.name ?? api.name ?? api.id,
    anthropicAlias: override?.anthropicAlias ?? null,
    cost: {
      input: priceToMillion(api.pricing?.prompt),
      output: priceToMillion(api.pricing?.completion),
      cache_read: 0
    },
    limit: { context, output },
    attachment,
    reasoning: override?.reasoning ?? true,
    temperature: override?.temperature ?? true,
    tool_call: override?.tool_call ?? true,
    modalities
  };
}
function buildCatalog(apiModels) {
  const seenIds = new Set(apiModels.filter((m2) => m2 && typeof m2.id === "string" && m2.id.length > 0).map((m2) => m2.id));
  const bundledFallbackRows = CATALOG_SNAPSHOT.filter((m2) => BUNDLED_FALLBACK_MODEL_IDS.has(m2.id) && !seenIds.has(m2.id));
  const sourceModels = [...apiModels, ...bundledFallbackRows];
  const defs = sourceModels.filter((m2) => m2 && typeof m2.id === "string" && m2.id.length > 0).filter((m2) => rawOutputIsText(m2.architecture?.modality)).map((m2) => mapApiModel(m2, CURATED_OVERRIDES[m2.id]));
  const orderOf = (d2) => CURATED_OVERRIDES[d2.id]?.order ?? ORDER_FALLBACK;
  const selectable = [...defs].sort((a3, b3) => orderOf(a3) - orderOf(b3) || a3.name.localeCompare(b3.name));
  const visionRankOf = (d2) => CURATED_OVERRIDES[d2.id]?.visionRank ?? ORDER_FALLBACK;
  const vision = defs.filter((d2) => d2.attachment).sort((a3, b3) => visionRankOf(a3) - visionRankOf(b3) || a3.name.localeCompare(b3.name));
  const byId = new Map(defs.map((d2) => [d2.id, d2]));
  const defaultModel = byId.get(DEFAULT_MODEL_ID) ?? selectable[0] ?? defs[0];
  if (!defaultModel) {
    throw new Error("Nebius catalog is empty: no chat models available.");
  }
  return { all: defs, selectable, vision, byId, defaultModel };
}
function fromSnapshot(id) {
  const model = SNAPSHOT_CATALOG.byId.get(id);
  if (!model) {
    throw new Error(`Snapshot is missing required model "${id}".`);
  }
  return model;
}
function applyCatalog(catalog) {
  activeCatalog = catalog;
}
function getSelectableModels() {
  return activeCatalog.selectable;
}
function getVisionModels() {
  return activeCatalog.vision;
}
function getVisionPrimary() {
  return activeCatalog.vision[0] ?? VISION_PRIMARY;
}
function getDefaultModel() {
  return activeCatalog.defaultModel;
}
function findModelById(id) {
  return activeCatalog.byId.get(id);
}
function resolveModelByKeys(list, value, keys, defaultId) {
  const defaultModel = list.find((model) => model.id === defaultId) ?? list[0];
  if (!value) {
    return defaultModel;
  }
  return list.find((model) => keys.some((key) => key(model) === value));
}
var NEBIUS_BASE_URL = "https://api.tokenfactory.nebius.com/v1", TOKENS_PER_MILLION = 1e6, CURATED_OVERRIDES, BUNDLED_FALLBACK_MODEL_IDS, DEFAULT_MODEL_ID = "moonshotai/Kimi-K3", REASONING_EFFORT_MODEL_IDS, ORDER_FALLBACK = 1000, DEFAULT_OUTPUT_LIMIT = 32768, DEFAULT_CONTEXT = 131072, GLM_5_2_ANTHROPIC_CAPABILITIES = "effort,xhigh_effort,max_effort,thinking,adaptive_thinking,interleaved_thinking", SNAPSHOT_CATALOG, GLM_5_2, KIMI_K2_6, KIMI_K2_7_CODE, MINIMAX_M3, QWEN_3_5_397B, DEEPSEEK_V4_FLASH, DEEPSEEK_V4_PRO, QWEN_2_5_VL_72B, SELECTABLE_MODELS, VISION_MODELS, VISION_PRIMARY, activeCatalog, VISION_PROMPT;
var init_dist3 = __esm(() => {
  init_catalog_snapshot();
  CURATED_OVERRIDES = {
    "zai-org/GLM-5.2": {
      name: "GLM 5.2",
      anthropicAlias: "nebius-glm-5-2",
      outputLimit: 164000,
      minContext: 262144,
      order: 5
    },
    "moonshotai/Kimi-K2.6": {
      name: "Kimi K2.6 \xB7 vision",
      anthropicAlias: "nebius-kimi-k2-6",
      outputLimit: 131000,
      order: 10,
      visionRank: 0
    },
    "moonshotai/Kimi-K3": {
      name: "Kimi K3 \xB7 default",
      anthropicAlias: "nebius-kimi-k3",
      outputLimit: 131072,
      minContext: 262144,
      order: 0
    },
    "moonshotai/Kimi-K2.7-Code": {
      name: "Kimi K2.7 Code",
      anthropicAlias: "nebius-kimi-k2-7-code",
      outputLimit: 131072,
      minContext: 262144,
      order: 20
    },
    "MiniMaxAI/MiniMax-M3": {
      name: "MiniMax M3",
      outputLimit: 128000,
      minContext: 196608,
      order: 30
    },
    "Qwen/Qwen3.5-397B-A17B": {
      name: "Qwen 3.5 397B \xB7 flagship",
      outputLimit: 65536,
      order: 40
    },
    "deepseek-ai/DeepSeek-V4-Flash": {
      name: "DeepSeek V4 Flash",
      anthropicAlias: "nebius-deepseek-v4-flash",
      outputLimit: 384000,
      minContext: 1048576,
      order: 45
    },
    "deepseek-ai/DeepSeek-V4-Pro": {
      name: "DeepSeek V4 Pro",
      anthropicAlias: "nebius-deepseek-v4-pro",
      outputLimit: 384000,
      minContext: 1048576,
      order: 50
    },
    "Qwen/Qwen2.5-VL-72B-Instruct": {
      name: "Qwen2.5-VL 72B \xB7 vision",
      reasoning: false,
      outputLimit: 32768,
      order: 60,
      visionRank: 1
    }
  };
  BUNDLED_FALLBACK_MODEL_IDS = new Set([
    "deepseek-ai/DeepSeek-V4-Flash",
    "deepseek-ai/DeepSeek-V4-Pro"
  ]);
  REASONING_EFFORT_MODEL_IDS = new Set([
    "zai-org/GLM-5.2",
    "moonshotai/Kimi-K2.6",
    "moonshotai/Kimi-K3"
  ]);
  SNAPSHOT_CATALOG = buildCatalog(CATALOG_SNAPSHOT);
  GLM_5_2 = fromSnapshot("zai-org/GLM-5.2");
  KIMI_K2_6 = fromSnapshot("moonshotai/Kimi-K2.6");
  KIMI_K2_7_CODE = fromSnapshot("moonshotai/Kimi-K2.7-Code");
  MINIMAX_M3 = fromSnapshot("MiniMaxAI/MiniMax-M3");
  QWEN_3_5_397B = fromSnapshot("Qwen/Qwen3.5-397B-A17B");
  DEEPSEEK_V4_FLASH = fromSnapshot("deepseek-ai/DeepSeek-V4-Flash");
  DEEPSEEK_V4_PRO = fromSnapshot("deepseek-ai/DeepSeek-V4-Pro");
  QWEN_2_5_VL_72B = fromSnapshot("Qwen/Qwen2.5-VL-72B-Instruct");
  SELECTABLE_MODELS = SNAPSHOT_CATALOG.selectable;
  VISION_MODELS = SNAPSHOT_CATALOG.vision;
  VISION_PRIMARY = SNAPSHOT_CATALOG.vision[0] ?? GLM_5_2;
  activeCatalog = SNAPSHOT_CATALOG;
  VISION_PROMPT = "Describe this image for a coding assistant that cannot see it. " + "Be concise but specific: layout, UI elements, colors, any text (quote it " + "verbatim), diagrams, charts, or notable details. If it is a screenshot, " + "describe the visible UI. Keep it under 150 words.";
});

// packages/cli/src/lib/claude/defaults.ts
function getClaudeSupportedModels() {
  const selectable = getSelectableModels().map((definition) => ({
    alias: definition.anthropicAlias ?? definition.id,
    definition
  }));
  const hasHaiku = selectable.some((model) => model.definition.id === CLAUDE_HAIKU_MODEL_SELECTION.definition.id);
  return hasHaiku ? selectable : [...selectable, CLAUDE_HAIKU_MODEL_SELECTION];
}
function resolveClaudeModel(value) {
  const supported = getClaudeSupportedModels();
  if (supported.length === 0) {
    throw new Error("No Claude models are configured.");
  }
  const found = resolveModelByKeys(supported.map((model) => model.definition), value, [(model) => model.anthropicAlias, (model) => model.id], getDefaultModel().id);
  if (!found) {
    const expected = supported.map((model) => `${model.definition.anthropicAlias ?? model.definition.id} (${model.definition.id})`).join(", ");
    throw new Error(`Unsupported Claude model "${value}". Expected one of: ${expected}.`);
  }
  return { alias: found.anthropicAlias ?? found.id, definition: found };
}
var CLAUDE_LOCAL_PROXY_HOST = "127.0.0.1", CLAUDE_MODEL_CAPABILITIES, CLAUDE_HAIKU_MODEL, CLAUDE_HAIKU_MODEL_SELECTION;
var init_defaults = __esm(() => {
  init_dist3();
  CLAUDE_MODEL_CAPABILITIES = GLM_5_2_ANTHROPIC_CAPABILITIES;
  CLAUDE_HAIKU_MODEL = KIMI_K2_7_CODE;
  CLAUDE_HAIKU_MODEL_SELECTION = {
    alias: CLAUDE_HAIKU_MODEL.anthropicAlias ?? CLAUDE_HAIKU_MODEL.id,
    definition: CLAUDE_HAIKU_MODEL
  };
});

// packages/cli/src/lib/harness-types.ts
function defineHarness(impl) {
  if (typeof impl.run !== "function") {
    throw new Error(`Harness "${impl.id}" is missing required method "run"`);
  }
  return impl;
}

// packages/cli/src/lib/global-config.ts
var exports_global_config = {};
__export(exports_global_config, {
  writeGlobalConfig: () => writeGlobalConfig,
  setGlobalTavilyApiKey: () => setGlobalTavilyApiKey,
  setGlobalApiKey: () => setGlobalApiKey,
  resolveStoredTavilyApiKey: () => resolveStoredTavilyApiKey,
  resolveStoredApiKey: () => resolveStoredApiKey,
  readGlobalConfig: () => readGlobalConfig,
  nebiusrelayHome: () => nebiusrelayHome
});
import os from "os";
import path2 from "path";
function nebiusrelayHome(home = os.homedir()) {
  return path2.join(home, ".nebiusrelay");
}
function globalConfigPath(home = os.homedir()) {
  return path2.join(nebiusrelayHome(home), "config.json");
}
async function readGlobalConfig(home = os.homedir()) {
  const config = await readJsonIfExists(globalConfigPath(home));
  return {
    apiKey: config.apiKey ?? "",
    tavilyApiKey: config.tavilyApiKey ?? ""
  };
}
async function writeGlobalConfig(home, config) {
  await writeJsonAtomic(globalConfigPath(home), config);
}
async function setGlobalApiKey(home, apiKey) {
  const config = await readGlobalConfig(home);
  config.apiKey = apiKey;
  await writeGlobalConfig(home, config);
}
async function setGlobalTavilyApiKey(home, tavilyApiKey) {
  const config = await readGlobalConfig(home);
  config.tavilyApiKey = tavilyApiKey;
  await writeGlobalConfig(home, config);
}
function resolveStoredApiKey(stored) {
  if (!stored) {
    return "";
  }
  if (stored === NEBIUS_API_KEY_ENV_REF) {
    return process.env.NEBIUS_API_KEY?.trim() ?? "";
  }
  return stored;
}
function resolveStoredTavilyApiKey(stored) {
  if (!stored) {
    return "";
  }
  if (stored === TAVILY_API_KEY_ENV_REF) {
    return process.env.TAVILY_API_KEY?.trim() ?? "";
  }
  return stored;
}
var init_global_config = __esm(() => {
  init_nebius_core();
});

// packages/cli/src/lib/nebius-core.ts
import { mkdir, readFile, writeFile, rename } from "fs/promises";
import path3 from "path";
function resolveNebiusBaseUrl(env = process.env) {
  const override = env.NEBIUS_BASE_URL?.trim();
  if (!override) {
    return NEBIUS_BASE_URL2;
  }
  const normalized = override.replace(/\/+$/, "");
  return normalized.endsWith("/v1") ? normalized : `${normalized}/v1`;
}
async function readJsonIfExists(filePath) {
  try {
    const raw = await readFile(filePath, "utf8");
    return raw.trim() ? JSON.parse(raw) : {};
  } catch (err) {
    if (isNodeError(err) && err.code === "ENOENT") {
      return {};
    }
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to read ${filePath}: ${message}`);
  }
}
async function writeJsonAtomic(filePath, value) {
  await mkdir(path3.dirname(filePath), { recursive: true });
  const serialized = `${JSON.stringify(value, null, 2)}
`;
  const tmpPath = `${filePath}.tmp-${process.pid}`;
  await writeFile(tmpPath, serialized, { mode: 384 });
  await rename(tmpPath, filePath);
}
async function resolveNebiusApiKey({
  apiKey,
  home
}) {
  if (apiKey?.trim()) {
    return apiKey.trim();
  }
  if (home) {
    const { readGlobalConfig: readGlobalConfig2, resolveStoredApiKey: resolveStoredApiKey2 } = await Promise.resolve().then(() => (init_global_config(), exports_global_config));
    const globalKey = resolveStoredApiKey2((await readGlobalConfig2(home)).apiKey);
    if (globalKey) {
      return globalKey;
    }
  }
  return process.env.NEBIUS_API_KEY?.trim() ?? "";
}
function isNodeError(err) {
  return err instanceof Error && "code" in err;
}
var NEBIUS_BASE_URL2, NEBIUS_API_KEY_ENV_REF = "{env:NEBIUS_API_KEY}", TAVILY_API_KEY_ENV_REF = "{env:TAVILY_API_KEY}";
var init_nebius_core = __esm(() => {
  init_dist3();
  NEBIUS_BASE_URL2 = NEBIUS_BASE_URL;
});

// packages/cli/src/lib/version.ts
var VERSION = "0.10.1";
var init_version = () => {
};

// packages/cli/src/lib/http-util.ts
import { timingSafeEqual } from "crypto";
function requestPath(req) {
  return new URL(req.url ?? "/", "http://127.0.0.1").pathname;
}
async function readJsonBodyWithSize(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const raw = Buffer.concat(chunks);
  const text = raw.toString("utf8");
  const body = text ? JSON.parse(text) : {};
  return { body, rawBytes: raw.length };
}
async function readJsonBody(req) {
  return (await readJsonBodyWithSize(req)).body;
}
function writeJson(res, status, value) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(value));
}
function extractToken(req) {
  const authorization = req.headers.authorization;
  if (typeof authorization === "string" && authorization.startsWith("Bearer ")) {
    return authorization.slice("Bearer ".length);
  }
  const apiKey = req.headers["x-api-key"];
  return typeof apiKey === "string" ? apiKey : undefined;
}
function isAuthorized(req, authToken) {
  const token = extractToken(req);
  return token !== undefined && constantTimeEqual(token, authToken);
}
function constantTimeEqual(actual, expected) {
  if (typeof actual !== "string") {
    return false;
  }
  const actualBytes = Buffer.from(actual);
  const expectedBytes = Buffer.from(expected);
  if (actualBytes.length !== expectedBytes.length) {
    return false;
  }
  return timingSafeEqual(actualBytes, expectedBytes);
}
var init_http_util = () => {
};

// packages/cli/src/lib/paths.ts
import os2 from "os";
import path4 from "path";
function nebiusrelayHome2() {
  return process.env.NEBIUSRELAY_HOME || path4.join(os2.homedir(), ".nebiusrelay");
}
function isProcessAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (err) {
    return err.code === "EPERM";
  }
}
var init_paths = () => {
};

// packages/cli/src/lib/model-preferences.ts
import path5 from "path";
function preferencesPath() {
  return path5.join(nebiusrelayHome2(), "preferences.json");
}
async function recordAgentModel(agent, modelId) {
  if (!modelId || lastRecorded.get(agent) === modelId) {
    return;
  }
  lastRecorded.set(agent, modelId);
  try {
    const file = preferencesPath();
    const current = await readJsonIfExists(file) ?? {};
    if (current.models?.[agent] === modelId) {
      return;
    }
    await writeJsonAtomic(file, {
      ...current,
      models: { ...current.models ?? {}, [agent]: modelId }
    });
  } catch {
  }
}
async function readAgentModelPreference(agent) {
  try {
    const current = await readJsonIfExists(preferencesPath());
    const model = current?.models?.[agent];
    return typeof model === "string" && model.length > 0 ? model : undefined;
  } catch {
    return;
  }
}
var lastRecorded;
var init_model_preferences = __esm(() => {
  init_paths();
  init_nebius_core();
  lastRecorded = new Map;
});

// packages/cli/src/lib/proxy-perf.ts
import { performance } from "perf_hooks";
function createProxyPerfTracer(name, fields = {}, sink) {
  if (process.env.NEBIUSRELAY_PERF !== "1") {
    return disabledProxyPerfTracer;
  }
  const startedAt = performance.now();
  const spans = [];
  const marks = [];
  const seenMarks = new Set;
  let ended = false;
  const elapsed = () => performance.now() - startedAt;
  const recordSpan = (spanName, start, spanFields) => {
    spans.push({
      name: spanName,
      durationMs: roundMs(performance.now() - start),
      atMs: roundMs(elapsed()),
      ...spanFields ? { fields: spanFields } : {}
    });
  };
  return {
    enabled: true,
    async span(spanName, fn, spanFields) {
      const start = performance.now();
      try {
        return await fn();
      } finally {
        recordSpan(spanName, start, spanFields);
      }
    },
    spanSync(spanName, fn, spanFields) {
      const start = performance.now();
      try {
        return fn();
      } finally {
        recordSpan(spanName, start, spanFields);
      }
    },
    mark(markName, markFields) {
      marks.push({
        name: markName,
        atMs: roundMs(elapsed()),
        ...markFields ? { fields: markFields } : {}
      });
    },
    markOnce(markName, markFields) {
      if (seenMarks.has(markName)) {
        return;
      }
      seenMarks.add(markName);
      this.mark(markName, markFields);
    },
    end(endFields) {
      if (ended) {
        return;
      }
      ended = true;
      const payload = {
        name,
        totalMs: roundMs(elapsed()),
        fields,
        ...endFields ? { result: endFields } : {},
        spans,
        marks
      };
      try {
        sink?.(payload);
      } catch {
      }
      process.stderr.write(`[nebiusrelay perf] ${JSON.stringify(payload)}
`);
    }
  };
}
function roundMs(value) {
  return Math.round(value * 1000) / 1000;
}
var disabledProxyPerfTracer;
var init_proxy_perf = __esm(() => {
  disabledProxyPerfTracer = {
    enabled: false,
    async span(_name, fn) {
      return await fn();
    },
    spanSync(_name, fn) {
      return fn();
    },
    mark() {
    },
    markOnce() {
    },
    end() {
    }
  };
});

// packages/cli/src/lib/debug-log.ts
import { appendFile } from "fs/promises";
function writeDebugLogLine(line) {
  process.stderr.write(line);
  const logPath = process.env.NEBIUSRELAY_DEBUG_LOG;
  if (!logPath) {
    return;
  }
  appendFile(logPath, line).catch((err) => {
    if (warnedAboutDebugLogWrite) {
      return;
    }
    warnedAboutDebugLogWrite = true;
    process.stderr.write(`[nebiusrelay debug] failed to append debug log: ${err instanceof Error ? err.message : String(err)}
`);
  });
}
var warnedAboutDebugLogWrite = false;
var init_debug_log = () => {
};

// packages/cli/src/lib/proxy-debug.ts
function writeProxyDebugLog(prefix, options, label, value) {
  if (!options?.debug) {
    return;
  }
  const payload = typeof value === "function" ? value() : value;
  writeDebugLogLine(`[${prefix}] ${label}: ${JSON.stringify(payload)}
`);
}
var init_proxy_debug = __esm(() => {
  init_debug_log();
});

// packages/cli/src/lib/tavily-search.ts
function withNativeToolSystemPrompt(messages, nativeTools, options = {}) {
  const toolName = options.toolName ?? ((tool) => String(tool));
  const prompt = [
    "Native server tools are available through function calls.",
    ...nativeTools.map((tool) => `- ${toolName(tool)}: call this for live web search. Always provide a concise non-empty query.`),
    "After tool results are returned, answer from the provided sources and include source URLs when relevant."
  ].join(`
`);
  const nextMessages = [{ role: "system", content: prompt }, ...messages];
  return options.mergeLeadingSystemMessages ? options.mergeLeadingSystemMessages(nextMessages) : nextMessages;
}
function nativeToolMaxUses(tool) {
  const value = tool.max_uses;
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 5;
}
async function runWebSearch(params) {
  return (await runWebSearchDetailed(params)).text;
}
async function runWebSearchDetailed(params) {
  const query = webSearchQuery(params.query, params.queryKeys);
  if (!query) {
    return failedSearch("", "Web search error: missing query.", "invalid_tool_input");
  }
  const body = tavilySearchBody({
    query,
    allowedDomains: params.allowedDomains,
    blockedDomains: params.blockedDomains
  });
  const tavilyApiKey = params.tavilyApiKey?.trim();
  if (!tavilyApiKey) {
    return failedSearch(query, params.missingApiKeyMessage ?? "Web search error: TAVILY_API_KEY is not set. Set it and retry.", "unavailable");
  }
  params.debugLog?.("tavily search request", { query, hasApiKey: Boolean(tavilyApiKey), body });
  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tavilyApiKey}`
    },
    body: JSON.stringify(body)
  });
  const text = await response.text();
  if (!response.ok) {
    params.debugLog?.("tavily search error", {
      status: response.status,
      body: text.slice(0, 1000)
    });
    return failedSearch(query, `Web search error from Tavily (${response.status}): ${text.slice(0, 1200)}`, response.status === 429 ? "too_many_requests" : "unavailable");
  }
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    return failedSearch(query, `Web search error: Tavily returned non-JSON content: ${text.slice(0, 1200)}`, "unavailable");
  }
  const results = (json.results ?? []).slice(0, 5).map((result) => {
    const mapped = {};
    if (result.title !== undefined)
      mapped.title = result.title;
    if (result.url !== undefined)
      mapped.url = result.url;
    if (result.content !== undefined)
      mapped.text = result.content;
    if (result.published_date !== undefined)
      mapped.publishedDate = result.published_date;
    return mapped;
  });
  if (results.length === 0) {
    return {
      query,
      results,
      text: `Web search completed for "${query}" but returned no results.${json.answer ? ` Answer: ${json.answer}` : ""}`
    };
  }
  const lines = [`Web search results for "${query}" via Tavily:`];
  if (json.answer) {
    lines.push(`Answer: ${trimSearchText(json.answer, params.snippetLength)}`);
  }
  results.forEach((result, index) => {
    lines.push([
      `${index + 1}. ${result.title ?? "Untitled"}`,
      `URL: ${result.url ?? ""}`,
      params.includePublishedDate && result.publishedDate ? `Published: ${result.publishedDate}` : "",
      `Snippet: ${trimSearchText(result.text ?? "", params.snippetLength)}`
    ].filter(Boolean).join(`
`));
  });
  return { query, results, text: lines.join(`

`) };
}
function failedSearch(query, text, errorCode) {
  return { query, text, results: [], errorCode };
}
function tavilySearchBody(params) {
  const body = {
    query: params.query,
    max_results: 5,
    search_depth: "basic",
    include_answer: true
  };
  if (params.allowedDomains.length > 0) {
    body.include_domains = params.allowedDomains;
  }
  if (params.blockedDomains.length > 0) {
    body.exclude_domains = params.blockedDomains;
  }
  return body;
}
function webSearchQuery(input, keys = ["query", "q", "search_query", "input"]) {
  if (typeof input === "string") {
    return input.trim();
  }
  if (typeof input !== "object" || input === null) {
    return "";
  }
  const record = input;
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return "";
}
function stringArray(value, options = {}) {
  const requireTrimmed = options.requireTrimmed ?? true;
  return Array.isArray(value) ? value.filter((item) => typeof item === "string" && (requireTrimmed ? item.trim().length > 0 : item.length > 0)) : [];
}
function trimSearchText(value, maxLength = 700) {
  return value.replaceAll(/\s+/g, " ").trim().slice(0, maxLength);
}

// packages/cli/src/lib/claude/content-format.ts
function stringifyAnthropicContent(content) {
  if (!content) {
    return "";
  }
  if (typeof content === "string") {
    return content;
  }
  return content.filter((block) => block.type === "text").map((block) => block.text).join(`
`);
}
function stringifyUnknown(value) {
  return typeof value === "string" ? value : JSON.stringify(value ?? "");
}
function formatToolResultContent(content, isError) {
  const prefix = isError ? `[tool_result error]
` : "";
  if (typeof content === "string") {
    return `${prefix}${content}`;
  }
  if (Array.isArray(content)) {
    const parts = content.map(formatContentBlockForToolResult).filter((part) => part.length > 0);
    return `${prefix}${parts.join(`
`)}`;
  }
  return `${prefix}${stringifyUnknown(content)}`;
}
function formatContentBlockForToolResult(block) {
  if (typeof block !== "object" || block === null) {
    return stringifyUnknown(block);
  }
  const record = block;
  if (record.type === "text" && typeof record.text === "string") {
    return record.text;
  }
  if (record.type === "image") {
    const source = typeof record.source === "object" && record.source !== null ? record.source : {};
    const mediaType = typeof source.media_type === "string" ? ` ${source.media_type}` : "";
    return `[image${mediaType} in tool result]`;
  }
  if (record.type === "url" && typeof record.url === "string") {
    return `[url in tool result] ${record.url}`;
  }
  if (record.type === "tool_reference" && typeof record.tool_name === "string") {
    return `Loaded deferred tool: ${record.tool_name}`;
  }
  return stringifyUnknown(block);
}
function formatWebSearchToolResult(block) {
  const errorCode = typeof block.error_code === "string" ? block.error_code : undefined;
  if (block.type === "web_search_tool_result_error") {
    return `Web search error${errorCode ? ` (${errorCode})` : ""}: ${formatToolResultContent(block.content)}`;
  }
  const content = block.content;
  if (Array.isArray(content)) {
    const lines = content.flatMap((item, index) => formatWebSearchResultItem(item, index));
    return lines.length > 0 ? lines.join(`

`) : "Web search returned no results.";
  }
  if (typeof content === "object" && content !== null) {
    const record = content;
    if (record.type === "web_search_tool_result_error") {
      const code = typeof record.error_code === "string" ? record.error_code : errorCode;
      return `Web search error${code ? ` (${code})` : ""}: ${formatToolResultContent(record.content)}`;
    }
  }
  return formatToolResultContent(content);
}
function formatWebSearchResultItem(item, index) {
  if (typeof item !== "object" || item === null) {
    return [`${index + 1}. ${stringifyUnknown(item)}`];
  }
  const record = item;
  if (record.type === "web_search_tool_result_error") {
    const code = typeof record.error_code === "string" ? record.error_code : undefined;
    return [
      `Web search error${code ? ` (${code})` : ""}: ${formatToolResultContent(record.content)}`
    ];
  }
  const title = stringField(record, "title") ?? stringField(record, "page_title") ?? "Untitled result";
  const url = stringField(record, "url") ?? stringField(record, "source");
  const snippet = stringField(record, "text") ?? stringField(record, "snippet") ?? stringField(record, "description");
  return [
    [
      `${index + 1}. ${title}`,
      ...url ? [`URL: ${url}`] : [],
      ...snippet ? [`Snippet: ${trimSearchText(snippet)}`] : []
    ].join(`
`)
  ];
}
function stringField(record, key) {
  const value = record[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}
function objectKeys(value) {
  return typeof value === "object" && value !== null ? Object.keys(value) : undefined;
}
function parseJsonOrEmpty(value) {
  if (!value) {
    return {};
  }
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}
function mapStopReason(reason, usage) {
  if (reason === "tool_calls") {
    return "tool_use";
  }
  if (reason === "length") {
    if (usage && isShortLengthStop(usage.outputTokens, usage.requestedMaxTokens)) {
      return "end_turn";
    }
    return "max_tokens";
  }
  return "end_turn";
}
function isShortLengthStop(outputTokens, requestedMaxTokens) {
  if (typeof outputTokens !== "number" || !Number.isFinite(outputTokens) || typeof requestedMaxTokens !== "number" || !Number.isFinite(requestedMaxTokens)) {
    return false;
  }
  const output = Math.max(0, Math.floor(outputTokens));
  const requested = Math.max(1, Math.floor(requestedMaxTokens));
  if (output >= requested) {
    return false;
  }
  const nearRequested = output >= Math.floor(requested * 0.9) || requested - output <= 1024;
  return !nearRequested;
}
var init_content_format = () => {
};

// packages/cli/src/lib/claude/translate-request.ts
function defaultReasoningEffort() {
  return normalizeNebiusReasoningEffort(process.env.NEBIUSRELAY_REASONING_EFFORT) ?? "none";
}
function nebiusReasoningEffort(body, targetModel) {
  if (!acceptsReasoningEffort(targetModel.id)) {
    return;
  }
  const explicitEffort = normalizeNebiusReasoningEffort(body.reasoning_effort ?? body.effort ?? body.thinking?.effort);
  if (explicitEffort) {
    return explicitEffort;
  }
  return defaultReasoningEffort();
}
function normalizeNebiusReasoningEffort(value) {
  if (typeof value !== "string") {
    return;
  }
  const effort = value.toLowerCase();
  if (effort === "none" || effort === "minimal" || effort === "off") {
    return "none";
  }
  if (effort === "low") {
    return "low";
  }
  if (effort === "medium") {
    return "medium";
  }
  if (effort === "high") {
    return "high";
  }
  if (effort === "max" || effort === "xhigh") {
    return "max";
  }
  return;
}
function toOpenAITools(tools, options) {
  if (!tools || tools.length === 0) {
    return;
  }
  const hasNativeWebSearch = tools.some(isNativeWebSearchTool);
  return tools.flatMap((tool) => {
    if (hasNativeWebSearch && !isNativeWebSearchTool(tool) && tool.name === "web_search") {
      debugLog(options, "dropped colliding custom web_search tool", {
        name: tool.name,
        type: tool.type
      });
      return [];
    }
    return [
      {
        type: "function",
        function: {
          name: openAIToolName(tool),
          description: tool.description ?? "",
          parameters: toOpenAIToolParameters(tool)
        }
      }
    ];
  });
}
function openAIToolName(tool) {
  return isNativeWebSearchTool(tool) ? "web_search" : tool.name ?? "tool";
}
function toOpenAIToolParameters(tool) {
  if (tool.input_schema) {
    return tool.input_schema;
  }
  if (isNativeWebSearchTool(tool)) {
    return {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search query."
        }
      },
      required: ["query"],
      additionalProperties: false
    };
  }
  return { type: "object", properties: {} };
}
function toOpenAIToolChoice(toolChoice) {
  if (!toolChoice || typeof toolChoice !== "object") {
    return;
  }
  const choice = toolChoice;
  if (choice.type === "auto") {
    return "auto";
  }
  if (choice.type === "any") {
    return "required";
  }
  if (choice.type === "tool" && typeof choice.name === "string" && choice.name) {
    return { type: "function", function: { name: choice.name } };
  }
  return;
}
function nativeServerTools(tools) {
  return (tools ?? []).flatMap((tool) => {
    if (!isNativeWebSearchTool(tool)) {
      return [];
    }
    return [{ kind: "web_search", name: "web_search", definition: tool }];
  });
}
function isNativeWebSearchTool(tool) {
  return tool.type?.startsWith("web_search") === true;
}
function claudeNativeToolMaxUses(tool) {
  return nativeToolMaxUses(tool);
}
function withClaudeNativeToolSystemPrompt(messages, nativeTools) {
  return withNativeToolSystemPrompt(messages, nativeTools, {
    mergeLeadingSystemMessages,
    toolName: (tool) => tool.name
  });
}
async function runClaudeWebSearch(input, tool, options) {
  return runWebSearchDetailed({
    query: input,
    queryKeys: ["query", "q"],
    allowedDomains: stringArray(tool.allowed_domains, { requireTrimmed: false }),
    blockedDomains: stringArray(tool.blocked_domains, { requireTrimmed: false }),
    tavilyApiKey: process.env.TAVILY_API_KEY,
    debugLog: (label, value) => debugLog(options, label, value),
    missingApiKeyMessage: "Web search error: TAVILY_API_KEY is not set. Set it in the repo .env (TAVILY_API_KEY=...) and retry.",
    snippetLength: 600
  });
}
function toOpenAIMessages(body, targetModel) {
  const systemParts = [
    targetModel ? `${NEBIUSRELAY_IDENTITY_PROMPT} Backend: ${targetModel.name} (${targetModel.id}).` : NEBIUSRELAY_IDENTITY_PROMPT
  ];
  const system = stringifyAnthropicContent(body.system);
  if (system) {
    systemParts.push(system);
  }
  const messages = [{ role: "system", content: systemParts.join(`

`) }];
  for (const message of body.messages ?? []) {
    if (typeof message.content === "string") {
      messages.push({ role: message.role, content: message.content });
      continue;
    }
    const textParts = [];
    const reasoningParts = [];
    const toolCalls = [];
    for (const block of message.content) {
      if (block.type === "text") {
        textParts.push(block.text);
      } else if (block.type === "thinking") {
        reasoningParts.push(block.thinking);
      } else if (block.type === "redacted_thinking") {
        reasoningParts.push(block.data);
      } else if (block.type === "tool_result") {
        messages.push({
          role: "tool",
          tool_call_id: block.tool_use_id,
          content: formatToolResultContent(block.content, block.is_error)
        });
      } else if (block.type === "web_search_tool_result" || block.type === "web_search_tool_result_error") {
        messages.push({
          role: "tool",
          tool_call_id: block.tool_use_id ?? "web_search",
          content: formatWebSearchToolResult(block)
        });
      } else if (block.type === "tool_use" || block.type === "server_tool_use") {
        toolCalls.push({
          id: block.id,
          type: "function",
          function: { name: block.name, arguments: JSON.stringify(block.input ?? {}) }
        });
      }
    }
    const content = textParts.join(`
`);
    if (content || reasoningParts.length > 0 || toolCalls.length > 0) {
      messages.push({
        role: message.role,
        content: content || null,
        ...reasoningParts.length > 0 ? { reasoning_content: reasoningParts.join(`
`) } : {},
        ...toolCalls.length > 0 ? { tool_calls: toolCalls } : {}
      });
    }
  }
  return messages;
}
function mergeLeadingSystemMessages(messages) {
  const systemParts = [];
  let index = 0;
  while (index < messages.length && messages[index]?.role === "system") {
    const content = messages[index]?.content;
    if (typeof content === "string" && content.trim()) {
      systemParts.push(content);
    }
    index += 1;
  }
  if (systemParts.length === 0) {
    return messages.slice(index);
  }
  return [{ role: "system", content: systemParts.join(`

`) }, ...messages.slice(index)];
}
function debugLog(options, label, value) {
  writeProxyDebugLog("nebiusrelay proxy", options, label, value);
}
var NEBIUSRELAY_IDENTITY_PROMPT = "You are a Nebius Token Factory model routed through nebiusrelay, not Anthropic Claude.";
var init_translate_request = __esm(() => {
  init_dist3();
  init_proxy_debug();
  init_content_format();
});

// packages/cli/src/lib/stable-hash.ts
import { createHash } from "crypto";
function stableHash(value) {
  return createHash("sha256").update(stableStringify(value)).digest("hex").slice(0, 16);
}
function stableStringify(value) {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  const record = value;
  return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`).join(",")}}`;
}
var init_stable_hash = () => {
};

// packages/cli/src/lib/telemetry.ts
import os3 from "os";
import path6 from "path";
import { randomUUID } from "crypto";
function telemetryEndpoint() {
  return process.env.NEBIUSRELAY_TELEMETRY_URL;
}
function installIdPath(home = os3.homedir()) {
  return path6.join(nebiusrelayHome(home), "install-id");
}
function telemetryDisabledByEnvironment() {
  return process.env.GITHUB_ACTIONS === "true";
}
async function getInstallId(home = os3.homedir()) {
  const filePath = installIdPath(home);
  const pending = pendingInstallIds.get(filePath);
  if (pending) {
    return pending;
  }
  const operation = readOrCreateInstallId(filePath);
  pendingInstallIds.set(filePath, operation);
  try {
    return await operation;
  } finally {
    if (pendingInstallIds.get(filePath) === operation) {
      pendingInstallIds.delete(filePath);
    }
  }
}
async function readOrCreateInstallId(filePath) {
  const existing = await readJsonIfExists(filePath);
  if (existing.id) {
    return existing.id;
  }
  const id = randomUUID();
  await writeJsonAtomic(filePath, { id });
  return id;
}
function normalizedOs() {
  switch (process.platform) {
    case "darwin":
      return "macos";
    case "linux":
      return "linux";
    case "win32":
      return "windows";
    default:
      return "unknown";
  }
}
async function sendTelemetryEvent(event, home = os3.homedir()) {
  const endpoint = telemetryEndpoint();
  if (!endpoint || telemetryDisabledByEnvironment()) {
    return;
  }
  try {
    const installId = await getInstallId(home);
    const controller = new AbortController;
    const timeout = setTimeout(() => controller.abort(), TELEMETRY_TIMEOUT_MS);
    try {
      await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          installId,
          version: VERSION,
          os: normalizedOs(),
          arch: process.arch,
          ...event
        }),
        signal: controller.signal
      });
    } finally {
      clearTimeout(timeout);
    }
  } catch {
  }
}
function randomSessionId() {
  return randomUUID();
}
var TELEMETRY_TIMEOUT_MS = 2000, pendingInstallIds;
var init_telemetry = __esm(() => {
  init_nebius_core();
  init_global_config();
  init_version();
  pendingInstallIds = new Map;
});

// packages/cli/src/lib/context-fit.ts
function jsonByteLength(value) {
  return Buffer.byteLength(JSON.stringify(value), "utf8");
}
function parseNebiusContextLengthMaxTokens(message) {
  const match = message.match(/maximum context length is\s+([\d,_]+)\s+tokens/is);
  return parseTokenCount(match?.[1]);
}
function parseNebiusContextLengthInputTokens(message) {
  const parentheticalMatch = message.match(/maximum context length is\s+[\d,_]+\s+tokens.*?\(([\d,_]+)\s+input\b/is);
  if (parentheticalMatch) {
    return parseTokenCount(parentheticalMatch[1]);
  }
  const vllmMessagesMatch = message.match(/you requested\s+[\d,_]+\s+tokens\s*\(\s*([\d,_]+)\s+in the messages\b/is);
  if (vllmMessagesMatch) {
    return parseTokenCount(vllmMessagesMatch[1]);
  }
  const resolvedInputMatch = message.match(/request resolved to\s+([\d,_]+)\s+input tokens\b/is);
  return parseTokenCount(resolvedInputMatch?.[1]);
}
function parseTokenCount(value) {
  if (!value) {
    return;
  }
  const parsed = Number.parseInt(value.replaceAll(/[,_]/g, ""), 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}
function contextLengthOverflow(message, model) {
  const inputTokens = parseNebiusContextLengthInputTokens(message);
  if (inputTokens === undefined) {
    return;
  }
  const contextTokens = parseNebiusContextLengthMaxTokens(message) ?? model.limit.context;
  return { inputTokens, contextTokens };
}
function trimPayloadMessages(messages, requestedCharsToTrim) {
  if (!Array.isArray(messages) || requestedCharsToTrim <= 0) {
    return;
  }
  let charsToTrim = requestedCharsToTrim;
  let trimmedChars = 0;
  for (const message of messages) {
    if (charsToTrim <= 0) {
      break;
    }
    const record = asFitMessage(message);
    if (!record || record.role === "system") {
      continue;
    }
    const result = trimMessageContent(record, charsToTrim);
    if (!result) {
      continue;
    }
    charsToTrim -= result.trimmedChars;
    trimmedChars += result.trimmedChars;
  }
  return trimmedChars > 0 ? { trimmedChars } : undefined;
}
function trimMessageContent(record, charsToTrim) {
  if (typeof record.content === "string" && record.content.length > 0) {
    const result = trimOldContextText(record.content, charsToTrim);
    if (!result) {
      return;
    }
    record.content = result.text;
    return { trimmedChars: result.trimmedChars };
  }
  if (Array.isArray(record.content)) {
    let remaining = charsToTrim;
    let trimmed = 0;
    for (const part of record.content) {
      if (remaining <= 0) {
        break;
      }
      if (part && typeof part === "object" && part.type === "text" && typeof part.text === "string") {
        const result = trimOldContextText(part.text, remaining);
        if (!result) {
          continue;
        }
        part.text = result.text;
        remaining -= result.trimmedChars;
        trimmed += result.trimmedChars;
      }
    }
    return trimmed > 0 ? { trimmedChars: trimmed } : undefined;
  }
  return;
}
function trimOldContextText(text, requestedChars) {
  if (requestedChars <= 0 || text.length <= TRIM_MARKER.length + 32) {
    return;
  }
  const preservedPrefixChars = Math.min(TRIM_PRESERVED_PREFIX_CHARS, Math.max(0, text.length - TRIM_MARKER.length - 32));
  const maxRemovableChars = Math.max(1, text.length - preservedPrefixChars - TRIM_MARKER.length - 32);
  const removableChars = Math.min(requestedChars, maxRemovableChars);
  const nextText = `${text.slice(0, preservedPrefixChars)}${TRIM_MARKER}${text.slice(preservedPrefixChars + removableChars)}`;
  return {
    text: nextText,
    trimmedChars: Math.max(0, text.length - nextText.length)
  };
}
function stripOldImages(messages, keepMostRecent = 1) {
  if (!Array.isArray(messages)) {
    return;
  }
  const locations = [];
  for (const message of messages) {
    const record = asFitMessage(message);
    if (!record || !Array.isArray(record.content)) {
      continue;
    }
    record.content.forEach((part, index) => {
      if (isImagePart(part)) {
        locations.push({ parts: record.content, index });
      }
    });
  }
  if (locations.length <= keepMostRecent) {
    return;
  }
  const toRemove = locations.slice(0, locations.length - keepMostRecent);
  let removedParts = 0;
  let freedChars = 0;
  for (const location of toRemove) {
    const before = jsonByteLength(location.parts[location.index]);
    location.parts[location.index] = { type: "text", text: IMAGE_REMOVED_PLACEHOLDER };
    const after = jsonByteLength(location.parts[location.index]);
    freedChars += Math.max(0, before - after);
    removedParts += 1;
  }
  return removedParts > 0 ? { removedParts, freedChars } : undefined;
}
function isImagePart(part) {
  if (!part || typeof part !== "object") {
    return false;
  }
  const record = part;
  return record.type === "image_url" || record.type === "input_image" || record.image_url !== undefined;
}
function dropOldestTurns(messages, charsToFree) {
  if (!Array.isArray(messages) || charsToFree <= 0) {
    return;
  }
  let start = 0;
  while (start < messages.length && asFitMessage(messages[start])?.role === "system") {
    start += 1;
  }
  const boundaries = [];
  for (let i = start;i < messages.length; i += 1) {
    if (asFitMessage(messages[i])?.role === "user") {
      boundaries.push(i);
    }
  }
  if (boundaries.length <= 1) {
    return;
  }
  let freedChars = 0;
  let dropUpTo = start;
  for (let k3 = 0;k3 < boundaries.length - 1; k3 += 1) {
    if (freedChars >= charsToFree) {
      break;
    }
    const blockEnd = boundaries[k3 + 1];
    for (let i = dropUpTo;i < blockEnd; i += 1) {
      freedChars += jsonByteLength(messages[i]);
    }
    dropUpTo = blockEnd;
  }
  const droppedMessages = dropUpTo - start;
  if (droppedMessages <= 0) {
    return;
  }
  messages.splice(start, droppedMessages);
  return { droppedMessages, freedChars };
}
function newContextFitState(payload) {
  const originalMaxTokens = typeof payload.max_tokens === "number" && Number.isFinite(payload.max_tokens) ? Math.max(CONTEXT_LENGTH_RETRY_FLOOR, Math.floor(payload.max_tokens)) : undefined;
  return {
    originalChars: jsonByteLength(payload.messages ?? []),
    freedChars: 0,
    ...originalMaxTokens !== undefined ? { originalMaxTokens } : {}
  };
}
function applyContextFit(payload, message, model, state) {
  const overflow = contextLengthOverflow(message, model);
  if (!overflow) {
    return {
      mutated: false,
      freedChars: 0,
      inputTokens: 0,
      contextWindow: model.limit.context,
      hard: false
    };
  }
  const { inputTokens, contextTokens } = overflow;
  const base = { inputTokens, contextWindow: contextTokens };
  const availableOutput = contextTokens - inputTokens - CONTEXT_OUTPUT_SAFETY_TOKENS;
  const currentMaxTokens = typeof payload.max_tokens === "number" ? payload.max_tokens : undefined;
  const desiredMaxTokens = Math.min(state.originalMaxTokens ?? currentMaxTokens ?? model.limit.output, model.limit.output);
  const minPreferredOutput = Math.min(desiredMaxTokens, MIN_PREFERRED_OUTPUT_TOKENS);
  if (availableOutput >= minPreferredOutput) {
    const nextMaxTokens = Math.max(CONTEXT_LENGTH_RETRY_FLOOR, Math.floor(availableOutput));
    if (currentMaxTokens === undefined || nextMaxTokens < currentMaxTokens) {
      payload.max_tokens = nextMaxTokens;
      return { mutated: true, action: "max_tokens", freedChars: 0, hard: false, ...base };
    }
  }
  if (currentMaxTokens !== desiredMaxTokens) {
    payload.max_tokens = desiredMaxTokens;
  }
  const targetInputTokens = contextTokens - desiredMaxTokens - CONTEXT_OUTPUT_SAFETY_TOKENS;
  const tokensToFree = Math.max(1, inputTokens - targetInputTokens) + CONTEXT_RETRY_TRIM_EXTRA_TOKENS;
  const payloadBytes = jsonByteLength({
    messages: payload.messages,
    tools: payload.tools,
    tool_choice: payload.tool_choice
  });
  const realCharsPerToken = Math.max(1, payloadBytes / Math.max(1, inputTokens));
  const charsToFree = Math.max(1, Math.ceil(tokensToFree * realCharsPerToken));
  const stripped = stripOldImages(payload.messages, 1);
  if (stripped) {
    return finish(state, base, "strip_images", stripped.freedChars);
  }
  const trimmed = trimPayloadMessages(payload.messages, charsToFree);
  if (trimmed) {
    return finish(state, base, "trim_text", trimmed.trimmedChars);
  }
  const dropped = dropOldestTurns(payload.messages, charsToFree);
  if (dropped) {
    return finish(state, base, "drop_turns", dropped.freedChars);
  }
  return { mutated: false, freedChars: 0, hard: false, ...base };
}
function finish(state, base, action, freedChars) {
  state.freedChars += freedChars;
  const hard = state.originalChars > 0 && state.freedChars / state.originalChars > HARD_WARN_DROPPED_FRACTION;
  return { mutated: true, action, freedChars, hard, ...base };
}
function emitContextTrimAlarm(info) {
  const severity = info.hard ? "DROPPED A LARGE PORTION of" : "trimmed";
  process.stderr.write(`nebiusrelay: ${severity} ${info.trimmedChars} chars of conversation context ` + `to fit <${info.model}> window (${info.path} path${info.action ? `, ${info.action}` : ""}) ` + `- if you see this often, report it
`);
  sendTelemetryEvent({ event: "context_trim", contextTrim: info });
}
function asFitMessage(value) {
  return typeof value === "object" && value !== null ? value : undefined;
}
var APPROX_CHARS_PER_TOKEN = 4, CONTEXT_LENGTH_RETRY_FLOOR = 1, CONTEXT_OUTPUT_SAFETY_TOKENS = 512, CONTEXT_RETRY_TRIM_EXTRA_TOKENS = 512, TRIM_PRESERVED_PREFIX_CHARS = 4096, MIN_PREFERRED_OUTPUT_TOKENS = 8000, HARD_WARN_DROPPED_FRACTION = 0.5, CONTEXT_FIT_MAX_ATTEMPTS = 6, IMAGE_REMOVED_PLACEHOLDER = "[nebiusrelay removed an older image to fit the model window]", TRIM_MARKER = `
[nebiusrelay trimmed older context to fit the model window]
`;
var init_context_fit = __esm(() => {
  init_telemetry();
});

// packages/cli/src/lib/claude/context-budget.ts
function clampRequestedMaxTokens(maxTokens, model) {
  if (typeof maxTokens !== "number" || !Number.isFinite(maxTokens)) {
    return maxTokens;
  }
  return Math.min(Math.max(CONTEXT_LENGTH_RETRY_FLOOR2, Math.floor(maxTokens)), model.limit.output);
}
function clampClaudeClientMaxTokens(maxTokens, model, options) {
  const clamped = clampRequestedMaxTokens(maxTokens, model);
  if (typeof clamped !== "number" || !Number.isFinite(clamped)) {
    return clamped;
  }
  const claudeCodeMaxOutputTokens = finiteTokenCount(options.claudeCodeMaxOutputTokens) ?? CLAUDE_CODE_DEFAULT_MAX_OUTPUT_TOKENS;
  const clientCap = options.claudeCodeMaxOutputTokensUserSet === true || options.isCompactionRequest === true ? claudeCodeMaxOutputTokens : Math.min(claudeCodeMaxOutputTokens, DEFAULT_CLAUDE_NORMAL_MAX_OUTPUT_TOKENS);
  return Math.min(clamped, clientCap);
}
function applyEstimatedContextBudget(payload, model, options, label, estimatedInputTokens) {
  const currentMaxTokens = payload.max_tokens;
  if (typeof currentMaxTokens !== "number" || !Number.isFinite(currentMaxTokens)) {
    return;
  }
  const estimatedInputTokensWithHeadroom = estimatedInputTokens * 1.15;
  if (currentMaxTokens <= model.limit.output && estimatedInputTokensWithHeadroom + currentMaxTokens + CONTEXT_OUTPUT_SAFETY_TOKENS2 < model.limit.context) {
    return;
  }
  let refinedInputTokens = estimatePayloadInputTokens(payload);
  const reserveOverflowTokens = refinedInputTokens + currentMaxTokens + CONTEXT_OUTPUT_SAFETY_TOKENS2 - model.limit.context;
  if (reserveOverflowTokens > 0) {
    const trimmed = trimPayloadInputByApproxTokens(payload, reserveOverflowTokens);
    if (trimmed) {
      refinedInputTokens = estimatePayloadInputTokens(payload);
      reportContextTrim(options, {
        path: "preemptive",
        model: typeof payload.model === "string" ? payload.model : "",
        trimmedChars: trimmed.trimmedChars,
        inputTokens: estimatedInputTokens,
        contextWindow: model.limit.context
      });
      debugLog2(options, `trimmed ${label} input to reserve requested output`, {
        model: payload.model,
        trimmedChars: trimmed.trimmedChars,
        requestedMaxTokens: currentMaxTokens,
        estimatedInputTokens: refinedInputTokens
      });
    }
  }
  const availableOutputTokens = Math.max(CONTEXT_LENGTH_RETRY_FLOOR2, Math.floor(model.limit.context - refinedInputTokens - CONTEXT_OUTPUT_SAFETY_TOKENS2));
  const nextMaxTokens = Math.min(currentMaxTokens, model.limit.output, availableOutputTokens);
  if (nextMaxTokens >= currentMaxTokens) {
    return;
  }
  if (options.isCompactionRequest) {
    debugLog2(options, `preserved ${label} compaction output budget for reactive context fit`, {
      model: payload.model,
      maxTokens: currentMaxTokens,
      estimatedAvailableOutputTokens: availableOutputTokens,
      estimatedInputTokens: refinedInputTokens
    });
    return;
  }
  payload.max_tokens = nextMaxTokens;
  debugLog2(options, `clamped ${label} max_tokens to estimated context budget`, {
    model: payload.model,
    maxTokens: nextMaxTokens,
    requestedMaxTokens: currentMaxTokens,
    estimatedInputTokens: refinedInputTokens
  });
}
function finiteTokenCount(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return;
  }
  return Math.max(CONTEXT_LENGTH_RETRY_FLOOR2, Math.floor(value));
}
function estimatePayloadInputTokens(payload) {
  return Math.max(1, Math.ceil(jsonByteLength({
    messages: payload.messages,
    tools: payload.tools,
    tool_choice: payload.tool_choice
  }) / APPROX_CHARS_PER_TOKEN));
}
function trimPayloadInputByApproxTokens(payload, tokensToTrim) {
  if (tokensToTrim <= 0) {
    return;
  }
  return trimPayloadMessages(payload.messages, Math.max(1, Math.ceil(tokensToTrim * APPROX_CHARS_PER_TOKEN)));
}
function safeClaudeInputLimit(model) {
  return Math.max(1, model.limit.context - CONTEXT_INPUT_SAFETY_TOKENS);
}
function reportContextTrim(options, info) {
  const override = options.emitContextTrimAlarm;
  if (override) {
    override(info);
    return;
  }
  emitContextTrimAlarm(info);
}
function debugLog2(options, label, value) {
  writeProxyDebugLog("nebiusrelay proxy", options, label, value);
}
var CONTEXT_LENGTH_RETRY_FLOOR2 = 1, CONTEXT_INPUT_SAFETY_TOKENS = 4096, CONTEXT_OUTPUT_SAFETY_TOKENS2 = 512, CLAUDE_CODE_DEFAULT_MAX_OUTPUT_TOKENS = 32000, DEFAULT_CLAUDE_NORMAL_MAX_OUTPUT_TOKENS = 28000;
var init_context_budget = __esm(() => {
  init_proxy_debug();
  init_context_fit();
  init_context_fit();
});

// packages/cli/src/lib/claude/native-web-search-response.ts
import { randomUUID as randomUUID2 } from "crypto";
function createClaudeNativeWebSearchRecord({
  input,
  outcome,
  fallbackErrorCode = "unavailable"
}) {
  return {
    id: `srvtoolu_${randomUUID2().replaceAll("-", "")}`,
    name: "web_search",
    input,
    result: searchResultContent(outcome, fallbackErrorCode)
  };
}
function nativeWebSearchBlocks(record) {
  return [
    {
      type: "server_tool_use",
      id: record.id,
      name: record.name,
      input: record.input
    },
    {
      type: "web_search_tool_result",
      tool_use_id: record.id,
      content: record.result
    }
  ];
}
function searchResultContent(outcome, fallbackErrorCode) {
  if (!outcome) {
    return { type: "web_search_tool_result_error", error_code: fallbackErrorCode };
  }
  if (outcome.errorCode) {
    return { type: "web_search_tool_result_error", error_code: outcome.errorCode };
  }
  return outcome.results.flatMap((result) => {
    const url = result.url?.trim();
    if (!url) {
      return [];
    }
    return [
      {
        type: "web_search_result",
        title: result.title?.trim() || "Untitled",
        url
      }
    ];
  });
}
var init_native_web_search_response = () => {
};

// packages/cli/src/lib/claude/translate-response.ts
import { randomUUID as randomUUID3 } from "crypto";
function thinkingSignature(reasoning) {
  return `nebiusrelay:${stableHash(reasoning)}`;
}
function resolveTargetModel(requestedModel, options) {
  const supported = getClaudeSupportedModels().find((model) => model.alias === requestedModel || model.definition.id === requestedModel);
  return supported ?? { alias: options.modelId, definition: options.modelDefinition };
}
function findClaudeModel(modelId, options) {
  const supported = getClaudeSupportedModels().find((model) => model.alias === modelId || model.definition.id === modelId);
  if (supported) {
    return supported;
  }
  if (modelId === options.modelId || modelId === options.targetModelId) {
    return { alias: options.modelId, definition: options.modelDefinition };
  }
  return;
}
function claudeModelResponse(model) {
  return {
    id: model.alias,
    type: "model",
    object: "model",
    display_name: `Nebius ${model.definition.name}`,
    max_input_tokens: safeClaudeInputLimit(model.definition),
    max_tokens: model.definition.limit.output,
    created_at: "2026-06-16T00:00:00Z"
  };
}
function countTokensResponse(body, options, rawBytes, estimator) {
  if (typeof rawBytes === "number" && rawBytes > 0) {
    const estimate = estimator?.estimate(rawBytes) ?? Math.ceil(rawBytes / APPROX_CHARS_PER_TOKEN);
    return { input_tokens: Math.max(1, estimate) };
  }
  const targetModel = options ? resolveTargetModel(body.model, options).definition : undefined;
  const estimatedBytes = jsonByteLength({
    messages: targetModel ? toOpenAIMessages({ ...body, max_tokens: 1 }, targetModel) : [
      {
        system: body.system,
        messages: body.messages
      }
    ],
    tools: body.tools,
    tool_choice: body.tool_choice
  });
  const estimatedTokens = Math.max(1, Math.ceil(estimatedBytes / APPROX_CHARS_PER_TOKEN));
  return {
    input_tokens: estimatedTokens
  };
}
function toAnthropicMessage(response, model) {
  const choice = response.choices?.[0];
  const message = choice?.message ?? {};
  const requestedMaxTokens = response._nebiusrelayRequestedMaxTokens;
  const nativeWebSearches = response._nebiusrelayNativeWebSearches ?? [];
  const content = [];
  const reasoning = message.reasoning ?? message.reasoning_content;
  if (reasoning) {
    content.push({
      type: "thinking",
      thinking: reasoning,
      signature: thinkingSignature(reasoning)
    });
  }
  for (const search of nativeWebSearches) {
    content.push(...nativeWebSearchBlocks(search));
  }
  if (message.content) {
    content.push({ type: "text", text: message.content });
  }
  for (const toolCall of message.tool_calls ?? []) {
    content.push({
      type: "tool_use",
      id: toolCall.id ?? `toolu_${randomUUID3().replaceAll("-", "")}`,
      name: toolCall.function?.name ?? "tool",
      input: parseJsonOrEmpty(toolCall.function?.arguments)
    });
  }
  return {
    id: response.id ?? `msg_${randomUUID3().replaceAll("-", "")}`,
    type: "message",
    role: "assistant",
    model,
    content,
    stop_reason: message.tool_calls?.length ? "tool_use" : mapStopReason(choice?.finish_reason, {
      outputTokens: response.usage?.completion_tokens,
      requestedMaxTokens
    }),
    stop_sequence: null,
    usage: {
      input_tokens: response.usage?.prompt_tokens ?? 0,
      output_tokens: response.usage?.completion_tokens ?? 0,
      ...nativeWebSearches.length > 0 ? { server_tool_use: { web_search_requests: nativeWebSearches.length } } : {}
    }
  };
}
var init_translate_response = __esm(() => {
  init_stable_hash();
  init_defaults();
  init_context_budget();
  init_content_format();
  init_native_web_search_response();
  init_translate_request();
});

// packages/cli/src/lib/nebius-retry.ts
function parseRetryAfter(value) {
  if (!value) {
    return;
  }
  const seconds = Number.parseInt(value, 10);
  if (Number.isFinite(seconds) && seconds >= 0) {
    return seconds * 1000;
  }
  const dateMs = Date.parse(value);
  if (Number.isFinite(dateMs)) {
    return Math.max(0, dateMs - Date.now());
  }
  return;
}
function backoffMs(attempt) {
  const base = 1000 * 2 ** attempt;
  const jitter = (attempt % 2 === 0 ? 1 : -1) * base * 0.2;
  return Math.max(100, base + jitter);
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// packages/cli/src/lib/request-diagnostics.ts
import { appendFile as appendFile2, chmod, mkdir as mkdir2 } from "fs/promises";
import path7 from "path";
async function persistRequestDiagnostic(diagnostic) {
  if (process.env.NEBIUSRELAY_REQUEST_DIAGNOSTICS === "0") {
    return;
  }
  const file = resolveRequestDiagnosticsPath();
  await mkdir2(path7.dirname(file), { recursive: true });
  await appendFile2(file, `${JSON.stringify({ at: new Date().toISOString(), ...diagnostic })}
`, {
    mode: 384
  });
  await chmod(file, 384).catch(() => {
    return;
  });
}
function resolveRequestDiagnosticsPath(home = nebiusrelayHome2()) {
  return path7.join(home, REQUEST_DIAGNOSTICS_FILE);
}
var REQUEST_DIAGNOSTICS_FILE = "request-diagnostics.jsonl";
var init_request_diagnostics = __esm(() => {
  init_paths();
});

// packages/cli/src/lib/nebius-client.ts
import { randomUUID as randomUUID4 } from "crypto";
function fallbackModel() {
  const raw = process.env.NEBIUSRELAY_FALLBACK_MODEL;
  if (raw === undefined) {
    return DEFAULT_FALLBACK_MODEL;
  }
  const trimmed = raw.trim();
  const lower = trimmed.toLowerCase();
  if (trimmed === "" || lower === "off" || lower === "none" || lower === "0") {
    return;
  }
  return trimmed;
}
function fallbackCooldownMs() {
  const raw = Number.parseInt(process.env.NEBIUSRELAY_FALLBACK_COOLDOWN_MS ?? "", 10);
  return Number.isFinite(raw) && raw >= 0 ? raw : DEFAULT_FALLBACK_COOLDOWN_MS;
}
function markModelUnhealthy(model) {
  unhealthySince.set(model, Date.now());
}
function isModelUnhealthy(model) {
  const at = unhealthySince.get(model);
  return at !== undefined && Date.now() - at < fallbackCooldownMs();
}
function withModelReplaced(body, model) {
  try {
    const parsed = JSON.parse(body);
    parsed.model = model;
    return JSON.stringify(parsed);
  } catch {
    return body;
  }
}
function logFallback(reason, from, to) {
  persistRequestDiagnostic({
    phase: "fallback",
    reason,
    clientRequestId: randomUUID4(),
    model: to,
    error: reason === "circuit_open" ? `Model ${from} is in cooldown after a timeout; serving ${to} instead.` : `Model ${from} returned no response headers; failing over to ${to}.`
  }).catch(() => {
    return;
  });
}
function withModelFallback(fetcher, signal) {
  return async (body) => {
    const fallback = fallbackModel();
    const current = modelFromSerializedBody(body);
    if (fallback && current && current !== fallback && isModelUnhealthy(current)) {
      logFallback("circuit_open", current, fallback);
      return fetcher(withModelReplaced(body, fallback));
    }
    try {
      return await fetcher(body);
    } catch (err) {
      if (err instanceof NebiusResponseHeaderTimeoutError && !signal?.aborted && fallback && current && current !== fallback) {
        markModelUnhealthy(current);
        logFallback("header_timeout", current, fallback);
        return fetcher(withModelReplaced(body, fallback));
      }
      throw err;
    }
  };
}
function getNebiusResponseDiagnostics(response) {
  return responseDiagnostics.get(response);
}
async function postChatCompletion(payload, options, signal, fit) {
  const doFetch = withModelFallback((body) => payload.stream === true ? streamFetchOnce(body, options, signal) : postChatCompletionOnce(body, options, signal), signal);
  if (!fit) {
    return doFetch(JSON.stringify(payload));
  }
  return fetchWithContextFit(payload, fit, doFetch);
}
async function postChatCompletionOnce(body, options, signal) {
  for (let attempt = 0;attempt <= MAX_RETRIES; attempt += 1) {
    let response;
    try {
      response = await fetchNebiusResponse(body, options, signal, attempt);
    } catch (err) {
      if (signal?.aborted) {
        throw err;
      }
      if (err instanceof NebiusResponseHeaderTimeoutError) {
        if (attempt < responseHeaderRetries()) {
          await sleep(backoffMs(attempt));
          continue;
        }
        throw err;
      }
      if (attempt < MAX_RETRIES) {
        await sleep(backoffMs(attempt));
        continue;
      }
      return syntheticOverloadedResponse(err instanceof Error ? err.message : String(err));
    }
    if (response.ok || !RETRYABLE_STATUSES.has(response.status) || attempt >= MAX_RETRIES) {
      return response;
    }
    await response.arrayBuffer().catch(() => {
      return;
    });
    await sleep(parseRetryAfter(response.headers.get("retry-after")) ?? backoffMs(attempt));
  }
  return syntheticOverloadedResponse("Nebius request failed after retries.");
}
async function postChatCompletionStream(payload, options, signal, body, fit) {
  const doFetch = withModelFallback((b3) => streamFetchOnce(b3, options, signal), signal);
  if (body !== undefined || !fit) {
    return doFetch(body ?? JSON.stringify(payload));
  }
  return fetchWithContextFit(payload, fit, doFetch);
}
async function streamFetchOnce(body, options, signal) {
  const maxRetries = Math.max(streamRetries(), responseHeaderRetries());
  for (let attempt = 0;attempt <= maxRetries; attempt += 1) {
    let response;
    try {
      response = await fetchNebiusResponse(body, options, signal, attempt);
    } catch (err) {
      const allowedRetries = err instanceof NebiusResponseHeaderTimeoutError ? responseHeaderRetries() : streamRetries();
      if (signal?.aborted || attempt >= allowedRetries) {
        throw err;
      }
      await sleep(backoffMs(attempt));
      continue;
    }
    if (response.ok || !RETRYABLE_STATUSES.has(response.status) || attempt >= maxRetries) {
      return response;
    }
    await response.arrayBuffer().catch(() => {
      return;
    });
    await sleep(parseRetryAfter(response.headers.get("retry-after")) ?? backoffMs(attempt));
  }
  throw new Error("Nebius stream request failed after retries.");
}
async function fetchNebiusResponse(body, options, signal, attempt) {
  const clientRequestId = randomUUID4();
  const timeoutMs = responseHeaderTimeoutMs();
  const controller = new AbortController;
  let timeoutError;
  const abortFromCaller = () => controller.abort(signal?.reason);
  if (signal?.aborted) {
    abortFromCaller();
  } else {
    signal?.addEventListener("abort", abortFromCaller, { once: true });
  }
  const timeout = setTimeout(() => {
    timeoutError = new NebiusResponseHeaderTimeoutError(timeoutMs, clientRequestId);
    controller.abort(timeoutError);
  }, timeoutMs);
  timeout.unref?.();
  try {
    const response = await fetch(`${options.baseUrl ?? NEBIUS_BASE_URL2}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${options.apiKey}`,
        "Content-Type": "application/json",
        "X-Client-Request-ID": clientRequestId
      },
      body,
      signal: controller.signal
    });
    const responseRequestId = upstreamRequestId(response);
    responseDiagnostics.set(response, {
      clientRequestId,
      ...responseRequestId ? { upstreamRequestId: responseRequestId } : {}
    });
    return response;
  } catch (err) {
    signal?.removeEventListener("abort", abortFromCaller);
    const reason = timeoutError ? "timeout" : signal?.aborted ? "caller_abort" : "network_error";
    const surfaced = timeoutError ?? err;
    await persistRequestDiagnostic({
      phase: "response_headers",
      reason,
      clientRequestId,
      model: modelFromSerializedBody(body),
      attempt,
      ...timeoutError ? { timeoutMs } : {},
      error: surfaced instanceof Error ? surfaced.message : String(surfaced)
    }).catch(() => {
      return;
    });
    throw surfaced;
  } finally {
    clearTimeout(timeout);
  }
}
function responseHeaderTimeoutMs() {
  const raw = process.env.NEBIUSRELAY_RESPONSE_HEADER_TIMEOUT_MS;
  const parsed = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? Math.max(100, parsed) : DEFAULT_RESPONSE_HEADER_TIMEOUT_MS;
}
function streamRetries() {
  const raw = process.env.NEBIUSRELAY_STREAM_RETRIES;
  const parsed = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : DEFAULT_STREAM_RETRIES;
}
function responseHeaderRetries() {
  const raw = process.env.NEBIUSRELAY_RESPONSE_HEADER_RETRIES ?? process.env.NEBIUSRELAY_STREAM_RETRIES;
  const parsed = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : DEFAULT_STREAM_RETRIES;
}
function upstreamRequestId(response) {
  return response.headers.get("x-request-id") ?? response.headers.get("request-id") ?? response.headers.get("cf-ray") ?? undefined;
}
function modelFromSerializedBody(body) {
  try {
    const parsed = JSON.parse(body);
    return typeof parsed.model === "string" ? parsed.model : undefined;
  } catch {
    return;
  }
}
async function fetchWithContextFit(payload, fit, doFetch) {
  let response = await doFetch(JSON.stringify(payload));
  const state = newContextFitState(payload);
  for (let attempt = 0;attempt < CONTEXT_FIT_MAX_ATTEMPTS; attempt += 1) {
    if (response.ok || response.status !== 400) {
      return response;
    }
    const text = await response.text();
    const outcome = applyContextFit(payload, text, fit.modelDefinition, state);
    if (!outcome.mutated) {
      return rebuildJsonResponse(text, response.status);
    }
    if (fit.debug) {
      process.stderr.write(`[nebiusrelay proxy] context-fit retry (${outcome.action}): ` + `input ${outcome.inputTokens} tokens vs window ${outcome.contextWindow}
`);
    }
    if (outcome.action !== "max_tokens") {
      (fit.onContextTrim ?? emitContextTrimAlarm)({
        path: "retry",
        model: typeof payload.model === "string" ? payload.model : "",
        trimmedChars: outcome.freedChars,
        inputTokens: outcome.inputTokens,
        contextWindow: outcome.contextWindow,
        action: outcome.action,
        hard: outcome.hard
      });
    }
    response = await doFetch(JSON.stringify(payload));
  }
  if (!response.ok && response.status === 400) {
    return rebuildJsonResponse(await response.text(), response.status);
  }
  return response;
}
function rebuildJsonResponse(body, status) {
  return new Response(body, {
    status,
    headers: { "content-type": "application/json" }
  });
}
function syntheticOverloadedResponse(message) {
  return new Response(JSON.stringify({ error: { message } }), {
    status: 503,
    headers: { "content-type": "application/json" }
  });
}
var RETRYABLE_STATUSES, MAX_RETRIES = 3, DEFAULT_STREAM_RETRIES = 1, DEFAULT_RESPONSE_HEADER_TIMEOUT_MS = 45000, DEFAULT_FALLBACK_MODEL = "moonshotai/Kimi-K2.6", DEFAULT_FALLBACK_COOLDOWN_MS = 60000, unhealthySince, responseDiagnostics, NebiusResponseHeaderTimeoutError;
var init_nebius_client = __esm(() => {
  init_nebius_core();
  init_request_diagnostics();
  init_context_fit();
  RETRYABLE_STATUSES = new Set([429, 503]);
  unhealthySince = new Map;
  responseDiagnostics = new WeakMap;
  NebiusResponseHeaderTimeoutError = class NebiusResponseHeaderTimeoutError extends Error {
    timeoutMs;
    requestId;
    constructor(timeoutMs, requestId) {
      super(`Nebius returned no response headers within ${timeoutMs}ms ` + `(client request ID: ${requestId}).`);
      this.timeoutMs = timeoutMs;
      this.requestId = requestId;
      this.name = "NebiusResponseHeaderTimeoutError";
    }
  };
});

// packages/cli/src/lib/claude/nebius-call.ts
async function fetchNebius(payload, options, modelDefinition, signal) {
  const response = await postChatCompletion(payload, options, signal, {
    modelDefinition,
    debug: options.debug
  });
  if (response.ok) {
    return { ok: true, json: await response.json() };
  }
  const error = await mapNebiusError(response);
  debugLog3(options, "nebius error", {
    status: error.status,
    anthropicType: error.anthropicType,
    code: error.code,
    retryable: error.retryable,
    body: error.message.slice(0, 1000)
  });
  return { ok: false, error };
}
async function mapNebiusError(response) {
  const raw = await response.text();
  let code;
  let message = raw.slice(0, 500);
  try {
    const parsed = JSON.parse(raw);
    const err = parsed.error;
    if (err) {
      code = err.code ?? (typeof err.message === "object" ? err.message.code : undefined);
      const msg = typeof err.message === "object" ? err.message.message : typeof err.message === "string" ? err.message : undefined;
      message = msg ?? err.type ?? message;
    }
  } catch {
  }
  const retryAfterMs = parseRetryAfter(response.headers.get("retry-after"));
  const retryable = RETRYABLE_STATUSES2.has(response.status) || typeof code === "string" && RETRYABLE_ERROR_CODES.has(code);
  const mapped = mapStatusToAnthropicError(response.status);
  return {
    status: response.status,
    anthropicStatus: mapped.status,
    anthropicType: mapped.type,
    message: `Nebius API returned ${response.status}: ${message}`,
    code,
    retryAfterMs,
    retryable
  };
}
function mapStatusToAnthropicError(status) {
  switch (status) {
    case 400:
      return { status: 400, type: "invalid_request_error" };
    case 401:
      return { status: 401, type: "authentication_error" };
    case 402:
      return { status: 402, type: "billing_error" };
    case 403:
      return { status: 403, type: "permission_error" };
    case 404:
      return { status: 404, type: "not_found_error" };
    case 408:
      return { status: 408, type: "timeout_error" };
    case 429:
      return { status: 429, type: "rate_limit_error" };
    case 503:
      return { status: 503, type: "overloaded_error" };
    case 500:
    case 502:
    case 504:
      return { status: 500, type: "api_error" };
    default:
      return { status: status || 500, type: "api_error" };
  }
}
function writeAnthropicError(res, status, type, message) {
  writeJson(res, status, {
    type: "error",
    error: { type, message }
  });
}
function isNebiusApiError(value) {
  return typeof value === "object" && value !== null && "anthropicType" in value && "anthropicStatus" in value && "retryable" in value;
}
function debugLog3(options, label, value) {
  writeProxyDebugLog("nebiusrelay proxy", options, label, value);
}
var RETRYABLE_STATUSES2, RETRYABLE_ERROR_CODES;
var init_nebius_call = __esm(() => {
  init_http_util();
  init_proxy_debug();
  init_nebius_client();
  RETRYABLE_STATUSES2 = new Set([429, 503]);
  RETRYABLE_ERROR_CODES = new Set(["overloaded", "service_unavailable"]);
});

// packages/cli/src/lib/native-web-search.ts
async function runNativeWebSearchCall({
  name,
  priorUses,
  maxUses,
  isWebSearch,
  recordUse,
  runSearch
}) {
  if (priorUses >= maxUses) {
    return `Web search error: max_uses_exceeded for ${name}. Do not call this tool again; answer from the results already provided or say search is unavailable.`;
  }
  if (!isWebSearch) {
    return "Unsupported native server tool.";
  }
  recordUse();
  return await runSearch();
}

// packages/cli/src/lib/sse.ts
function* takeSseEvents(buffer) {
  let current = buffer;
  let boundary = findSseBoundary(current);
  while (boundary) {
    const rawEvent = current.slice(0, boundary.index);
    current = current.slice(boundary.index + boundary.length);
    yield { payload: sseEventPayload(rawEvent), remaining: current };
    boundary = findSseBoundary(current);
  }
}
function findSseBoundary(buffer, fromIndex = 0) {
  let newline = buffer.indexOf(`
`, fromIndex);
  while (newline !== -1) {
    const next = newline + 1;
    const nextCode = buffer.charCodeAt(next);
    if (nextCode === 10) {
      return { index: newline, length: 2 };
    }
    if (nextCode === 13 && buffer.charCodeAt(next + 1) === 10) {
      return { index: newline, length: 3 };
    }
    if (newline > fromIndex && buffer.charCodeAt(newline - 1) === 13) {
      if (nextCode === 10) {
        return { index: newline - 1, length: 3 };
      }
      if (nextCode === 13 && buffer.charCodeAt(next + 1) === 10) {
        return { index: newline - 1, length: 4 };
      }
    }
    newline = buffer.indexOf(`
`, next);
  }
  return;
}
function sseDataPayload(rawEvent) {
  let payload = "";
  let hasData = false;
  let lineStart = 0;
  for (;; ) {
    let lineEnd = rawEvent.indexOf(`
`, lineStart);
    if (lineEnd === -1) {
      lineEnd = rawEvent.length;
    }
    const line = lineEnd > lineStart && rawEvent.charCodeAt(lineEnd - 1) === 13 ? rawEvent.slice(lineStart, lineEnd - 1) : rawEvent.slice(lineStart, lineEnd);
    if (line.startsWith("data:")) {
      const valueStart = line.charCodeAt(5) === 32 ? 6 : 5;
      if (hasData) {
        payload += `
`;
      }
      payload += line.slice(valueStart);
      hasData = true;
    }
    if (lineEnd === rawEvent.length) {
      break;
    }
    lineStart = lineEnd + 1;
  }
  return hasData ? payload : undefined;
}
function sseEventPayload(rawEvent) {
  return sseDataPayload(rawEvent) ?? "";
}
function createSseIdleWatchdog(idleTimeoutMs, createTimeoutError = () => new Error(`SSE stream produced no event for ${idleTimeoutMs}ms.`)) {
  let timer;
  let rejectIdle;
  let disposed = false;
  const arm = () => {
    if (disposed) {
      return;
    }
    if (timer) {
      timer.refresh();
      return;
    }
    timer = setTimeout(() => {
      const reject = rejectIdle;
      rejectIdle = undefined;
      timer = undefined;
      reject?.(createTimeoutError());
    }, idleTimeoutMs);
  };
  return {
    async read(reader) {
      const idle = new Promise((_3, reject) => {
        rejectIdle = reject;
      });
      arm();
      try {
        return await Promise.race([reader.read(), idle]);
      } finally {
        rejectIdle = undefined;
      }
    },
    dispose() {
      disposed = true;
      rejectIdle = undefined;
      if (timer) {
        clearTimeout(timer);
        timer = undefined;
      }
    }
  };
}
function writeSse(res, event, data) {
  res.write(`event: ${event}
data: ${JSON.stringify(data)}

`);
}

// packages/cli/src/lib/nebius-stream.ts
async function* readNebiusSseWithRetry(initialResponse, retry, options) {
  const idleTimeoutMs = streamIdleTimeoutMs();
  const maxRetries = streamRetries2();
  let response = initialResponse;
  let attempt = 0;
  for (;; ) {
    try {
      for await (const data of readResponseSse(response, idleTimeoutMs)) {
        yield { data, attempt };
      }
      return;
    } catch (err) {
      if (!(err instanceof NebiusSseIdleTimeoutError) && !(err instanceof NebiusSsePrematureCloseError)) {
        throw err;
      }
      await persistStreamDiagnostic(response, err, attempt);
      if (options.isOutputStarted() || attempt >= maxRetries) {
        throw err;
      }
      options.onRetry?.({ attempt, maxRetries, timeoutMs: idleTimeoutMs });
      await sleep(backoffMs(attempt));
      const next = await retry();
      if (!next.ok) {
        throw new NebiusSseRetryResponseError(next);
      }
      if (!next.body) {
        throw new Error("Nebius returned no stream body after an SSE idle retry.");
      }
      response = next;
      attempt += 1;
    }
  }
}
async function* readResponseSse(response, idleTimeoutMs) {
  if (!response.body) {
    throw new Error("Nebius returned no stream body.");
  }
  const diagnostics = getNebiusResponseDiagnostics(response);
  const reader = response.body.getReader();
  const decoder = new TextDecoder;
  const watchdog = createSseIdleWatchdog(idleTimeoutMs, () => new NebiusSseIdleTimeoutError(idleTimeoutMs, diagnostics?.clientRequestId, diagnostics?.upstreamRequestId));
  let buffer = "";
  let sawDone = false;
  try {
    for (;; ) {
      const read = await watchdog.read(reader);
      if (read.done) {
        break;
      }
      buffer += decoder.decode(read.value, { stream: true });
      for (const event of takeSseEvents(buffer)) {
        buffer = event.remaining;
        if (event.payload) {
          if (event.payload === "[DONE]") {
            sawDone = true;
          }
          yield event.payload;
        }
      }
    }
  } catch (err) {
    if (err instanceof NebiusSseIdleTimeoutError) {
      await reader.cancel(err).catch(() => {
        return;
      });
    }
    throw err;
  } finally {
    watchdog.dispose();
    reader.releaseLock();
  }
  buffer += decoder.decode();
  const trailing = buffer.trim();
  if (trailing) {
    const payload = sseEventPayload(trailing);
    if (payload) {
      if (payload === "[DONE]") {
        sawDone = true;
      }
      yield payload;
    }
  }
  if (!sawDone) {
    throw new NebiusSsePrematureCloseError(diagnostics?.clientRequestId, diagnostics?.upstreamRequestId);
  }
}
async function persistStreamDiagnostic(response, error, attempt) {
  const diagnostics = getNebiusResponseDiagnostics(response);
  if (!diagnostics) {
    return;
  }
  await persistRequestDiagnostic({
    phase: "sse",
    reason: error instanceof NebiusSseIdleTimeoutError ? "idle_timeout" : "premature_close",
    clientRequestId: diagnostics.clientRequestId,
    upstreamRequestId: diagnostics.upstreamRequestId,
    attempt,
    ...error instanceof NebiusSseIdleTimeoutError ? { timeoutMs: error.timeoutMs } : {},
    error: error.message
  }).catch(() => {
    return;
  });
}
function streamIdleTimeoutMs() {
  const raw = process.env.NEBIUSRELAY_STREAM_IDLE_TIMEOUT_MS ?? process.env.NEBIUSRELAY_CODEX_STREAM_IDLE_TIMEOUT_MS;
  const parsed = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? Math.max(100, parsed) : DEFAULT_STREAM_IDLE_TIMEOUT_MS;
}
function streamRetries2() {
  const raw = process.env.NEBIUSRELAY_STREAM_RETRIES ?? process.env.NEBIUSRELAY_CODEX_STREAM_IDLE_RETRIES;
  const parsed = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : DEFAULT_STREAM_RETRIES2;
}
var DEFAULT_STREAM_IDLE_TIMEOUT_MS = 120000, DEFAULT_STREAM_RETRIES2 = 1, NebiusSseIdleTimeoutError, NebiusSsePrematureCloseError, NebiusSseRetryResponseError;
var init_nebius_stream = __esm(() => {
  init_nebius_client();
  init_request_diagnostics();
  NebiusSseIdleTimeoutError = class NebiusSseIdleTimeoutError extends Error {
    timeoutMs;
    clientRequestId;
    upstreamRequestId2;
    constructor(timeoutMs, clientRequestId, upstreamRequestId2) {
      const ids = [
        clientRequestId ? `client request ID: ${clientRequestId}` : undefined,
        upstreamRequestId2 ? `upstream request ID: ${upstreamRequestId2}` : undefined
      ].filter(Boolean);
      super(`Nebius stream produced no SSE event for ${timeoutMs}ms.` + (ids.length > 0 ? ` (${ids.join(", ")})` : ""));
      this.timeoutMs = timeoutMs;
      this.clientRequestId = clientRequestId;
      this.upstreamRequestId = upstreamRequestId2;
      this.name = "NebiusSseIdleTimeoutError";
    }
  };
  NebiusSsePrematureCloseError = class NebiusSsePrematureCloseError extends Error {
    clientRequestId;
    upstreamRequestId2;
    constructor(clientRequestId, upstreamRequestId2) {
      const ids = [
        clientRequestId ? `client request ID: ${clientRequestId}` : undefined,
        upstreamRequestId2 ? `upstream request ID: ${upstreamRequestId2}` : undefined
      ].filter(Boolean);
      super("Nebius stream closed before the [DONE] event." + (ids.length > 0 ? ` (${ids.join(", ")})` : ""));
      this.clientRequestId = clientRequestId;
      this.upstreamRequestId = upstreamRequestId2;
      this.name = "NebiusSsePrematureCloseError";
    }
  };
  NebiusSseRetryResponseError = class NebiusSseRetryResponseError extends Error {
    response;
    constructor(response) {
      super(`Nebius SSE retry returned HTTP ${response.status}.`);
      this.response = response;
      this.name = "NebiusSseRetryResponseError";
    }
  };
});

// packages/cli/src/lib/claude/stream.ts
import { randomUUID as randomUUID5 } from "crypto";
async function streamAnthropicFromNebius(res, body, options, signal, perf) {
  const run = () => {
    const targetModel2 = resolveTargetModel(body.model, options);
    const messages = toOpenAIMessages(body, targetModel2.definition);
    const nativeTools2 = nativeServerTools(body.tools);
    const upstreamMessages2 = nativeTools2.length > 0 ? withClaudeNativeToolSystemPrompt(messages, nativeTools2) : messages;
    const tools2 = toOpenAITools(body.tools, options);
    const reasoningEffort2 = options.isCompactionRequest ? undefined : nebiusReasoningEffort(body, targetModel2.definition);
    const maxTokens2 = clampClaudeClientMaxTokens(body.max_tokens, targetModel2.definition, options);
    return {
      targetModel: targetModel2,
      messages,
      nativeTools: nativeTools2,
      upstreamMessages: upstreamMessages2,
      tools: tools2,
      reasoningEffort: reasoningEffort2,
      maxTokens: maxTokens2
    };
  };
  const translated = perf ? perf.spanSync("translate_request", run) : run();
  const { targetModel, nativeTools, upstreamMessages, tools, reasoningEffort } = translated;
  const { maxTokens } = translated;
  const payload = {
    model: targetModel.definition.id,
    messages: upstreamMessages,
    max_tokens: maxTokens,
    stop: body.stop_sequences,
    temperature: body.temperature,
    tools,
    tool_choice: toOpenAIToolChoice(body.tool_choice),
    ...options.isCompactionRequest ? { reasoning: { enabled: false } } : reasoningEffort ? { reasoning_effort: reasoningEffort } : {},
    chat_template_kwargs: { clear_thinking: options.isCompactionRequest === true },
    stream: true,
    stream_options: { include_usage: true }
  };
  const estimatedInputTokens = estimateInputTokensFromRawBytes(options);
  applyEstimatedContextBudget(payload, targetModel.definition, options, "stream", estimatedInputTokens);
  debugLog4(options, "nebius stream request", {
    model: payload.model,
    messageCount: payload.messages.length,
    toolCount: payload.tools?.length ?? 0,
    maxTokens: payload.max_tokens,
    reasoningEffort
  });
  let response;
  try {
    response = await postNebiusStream(payload, options, signal, perf);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const timedOut = err instanceof NebiusResponseHeaderTimeoutError;
    writeAnthropicError(res, timedOut ? 504 : 503, timedOut ? "timeout_error" : "overloaded_error", message);
    return { ok: false, status: timedOut ? 504 : 503, error: message };
  }
  if (!response.ok) {
    const error = await mapNebiusError(response);
    debugLog4(options, "nebius stream error", {
      status: error.status,
      anthropicType: error.anthropicType,
      code: error.code,
      body: error.message.slice(0, 1000)
    });
    writeAnthropicError(res, error.anthropicStatus, error.anthropicType, error.message);
    return { ok: false, status: error.anthropicStatus, error: error.message };
  }
  if (!response.body) {
    const message = "Nebius returned no stream body.";
    writeAnthropicError(res, 500, "api_error", message);
    return { ok: false, status: 500, error: message };
  }
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive"
  });
  res.flushHeaders?.();
  res.socket?.setNoDelay(true);
  const messageId = `msg_${randomUUID5().replaceAll("-", "")}`;
  const model = body.model ?? options.modelId;
  writeSse(res, "message_start", {
    type: "message_start",
    message: {
      id: messageId,
      type: "message",
      role: "assistant",
      model,
      content: [],
      stop_reason: null,
      stop_sequence: null,
      usage: { input_tokens: 0, output_tokens: 0 }
    }
  });
  if (nativeTools.length > 0) {
    try {
      return await streamAnthropicNativeToolLoop({
        res,
        initialResponse: response,
        initialPayload: payload,
        initialMessages: upstreamMessages.slice(),
        nativeTools,
        targetModel: targetModel.definition,
        model,
        options,
        ...signal ? { signal } : {}
      });
    } catch (err) {
      if (err instanceof NebiusSsePrematureCloseError) {
        return failAnthropicStream(res, 502, "api_error", err.message);
      }
      if (err instanceof NebiusSseIdleTimeoutError) {
        return failAnthropicStream(res, 504, "timeout_error", err.message);
      }
      if (err instanceof NebiusSseRetryResponseError) {
        const mapped = await mapNebiusError(err.response);
        return failAnthropicStream(res, mapped.anthropicStatus, mapped.anthropicType, mapped.message);
      }
      throw err;
    }
  }
  const blockManager = new StreamBlockManager(res, new StreamOutputBudget(options));
  let stopReason = "end_turn";
  let upstreamFinishReason = null;
  let inputTokens = 0;
  let outputTokens = 0;
  let cachedTokens = 0;
  let streamAttempt = 0;
  try {
    for await (const eventData of readNebiusSseWithRetry(response, () => postNebiusStream(payload, options, signal, perf, "upstream_fetch_retry"), {
      isOutputStarted: () => blockManager.hasOutput(),
      onRetry: ({ attempt, maxRetries, timeoutMs }) => debugLog4(options, "retrying nebius stream after idle timeout", {
        attempt,
        maxRetries,
        model: payload.model,
        timeoutMs
      })
    })) {
      if (eventData.attempt !== streamAttempt) {
        streamAttempt = eventData.attempt;
        upstreamFinishReason = null;
        inputTokens = 0;
        outputTokens = 0;
        cachedTokens = 0;
      }
      const event = parseStreamData(eventData.data);
      if (!event) {
        continue;
      }
      const delta = event.delta;
      if (delta) {
        const reasoning = delta.reasoning ?? delta.reasoning_content;
        if (typeof reasoning === "string" && reasoning.length > 0) {
          if (options.isCompactionRequest) {
            perf?.markOnce("first_delta", { kind: "text" });
            blockManager.emitText(reasoning);
          } else {
            perf?.markOnce("first_delta", { kind: "thinking" });
            blockManager.emitThinking(reasoning);
          }
        }
        if (typeof delta.content === "string" && delta.content.length > 0) {
          perf?.markOnce("first_delta", { kind: "text" });
          blockManager.emitText(delta.content);
        }
        if (Array.isArray(delta.tool_calls)) {
          for (const toolCall of delta.tool_calls) {
            perf?.markOnce("first_delta", { kind: "tool_call" });
            blockManager.emitToolCall(toolCall);
          }
        }
      }
      if (event.usage) {
        inputTokens = event.usage.prompt_tokens ?? inputTokens;
        outputTokens = event.usage.completion_tokens ?? outputTokens;
        cachedTokens = event.usage.prompt_tokens_details?.cached_tokens ?? event.usage.cached_tokens ?? cachedTokens;
      }
      if (event.finish_reason) {
        upstreamFinishReason = event.finish_reason;
      }
    }
  } catch (err) {
    debugLog4(options, "nebius stream read error", {
      error: err instanceof Error ? err.message : String(err)
    });
    if (err instanceof NebiusSsePrematureCloseError) {
      return failAnthropicStream(res, 502, "api_error", err.message);
    }
    if (err instanceof NebiusSseIdleTimeoutError) {
      return failAnthropicStream(res, 504, "timeout_error", err.message);
    }
    if (err instanceof NebiusSseRetryResponseError) {
      const mapped = await mapNebiusError(err.response);
      return failAnthropicStream(res, mapped.anthropicStatus, mapped.anthropicType, mapped.message);
    }
  }
  stopReason = mapStopReason(upstreamFinishReason, {
    outputTokens,
    requestedMaxTokens: payload.max_tokens
  });
  if (options.isCompactionRequest && upstreamFinishReason === "length") {
    stopReason = "end_turn";
  }
  if (upstreamFinishReason === "length" && stopReason !== "max_tokens") {
    debugLog4(options, "downgraded short Nebius length stop", {
      outputTokens,
      requestedMaxTokens: payload.max_tokens
    });
  }
  blockManager.close();
  if (inputTokens > 0 || outputTokens > 0) {
    options.costTracker?.addUsage(inputTokens, cachedTokens, outputTokens, targetModel.definition);
  }
  debugLog4(options, "nebius stream done", {
    stopReason,
    usage: { inputTokens, outputTokens, cachedTokens },
    blocks: blockManager.summary(),
    outputBudget: blockManager.outputSummary()
  });
  writeSse(res, "message_delta", {
    type: "message_delta",
    delta: { stop_reason: stopReason, stop_sequence: null },
    usage: { input_tokens: inputTokens, output_tokens: outputTokens }
  });
  writeSse(res, "message_stop", { type: "message_stop" });
  res.end();
  return { ok: true, status: res.statusCode };
}
async function streamAnthropicNativeToolLoop({
  res,
  initialResponse,
  initialPayload,
  initialMessages,
  nativeTools,
  targetModel,
  model,
  options,
  signal
}) {
  const blockManager = new StreamBlockManager(res, new StreamOutputBudget(options));
  const nativeToolNames = new Set(nativeTools.map((tool) => tool.name));
  const nativeToolUses = new Map;
  const messages = initialMessages.slice();
  let response = initialResponse;
  let currentPayload = initialPayload;
  let stopReason = "end_turn";
  let inputTokens = 0;
  let outputTokens = 0;
  let cachedTokens = 0;
  let nativeWebSearchCount = 0;
  for (let turn = 0;turn < 5; turn += 1) {
    const collected = await collectNebiusStreamTurn(response, options, initialPayload.max_tokens, () => postNebiusStream(currentPayload, options, signal), () => blockManager.hasOutput());
    inputTokens += collected.inputTokens;
    outputTokens += collected.outputTokens;
    cachedTokens += collected.cachedTokens;
    stopReason = collected.stopReason;
    const nativeToolCalls = collected.toolCalls.filter((toolCall) => nativeToolNames.has(toolCall.function.name ?? ""));
    if (nativeToolCalls.length === 0) {
      emitCollectedStreamTurn(blockManager, collected);
      break;
    }
    debugLog4(options, "stream native tool calls", {
      turn,
      toolCalls: nativeToolCalls.map((toolCall) => ({
        id: toolCall.id,
        name: toolCall.function.name,
        argumentsPreview: toolCall.function.arguments.slice(0, 300)
      }))
    });
    messages.push({
      role: "assistant",
      content: collected.text || null,
      ...collected.reasoning ? { reasoning_content: collected.reasoning } : {},
      tool_calls: collected.toolCalls.map((toolCall) => ({
        id: toolCall.id ?? `call_${randomUUID5().replaceAll("-", "")}`,
        type: "function",
        function: {
          name: toolCall.function.name ?? "tool",
          arguments: toolCall.function.arguments || "{}"
        }
      }))
    });
    const toolResults = await Promise.all(nativeToolCalls.map(async (toolCall) => {
      const id = toolCall.id ?? `call_${randomUUID5().replaceAll("-", "")}`;
      const name = toolCall.function.name ?? "web_search";
      const nativeTool = nativeTools.find((tool) => tool.name === name);
      const input = parseJsonOrEmpty(toolCall.function.arguments);
      const priorUses = nativeToolUses.get(name) ?? 0;
      const maxUses = nativeTool ? claudeNativeToolMaxUses(nativeTool.definition) : 0;
      let searchOutcome;
      const result = await runNativeWebSearchCall({
        name,
        priorUses,
        maxUses,
        isWebSearch: nativeTool?.kind === "web_search",
        recordUse: () => nativeToolUses.set(name, priorUses + 1),
        runSearch: async () => {
          searchOutcome = await runClaudeWebSearch(input, nativeTool.definition, options);
          return searchOutcome.text;
        }
      });
      return {
        id,
        result,
        search: createClaudeNativeWebSearchRecord({
          input,
          outcome: searchOutcome,
          fallbackErrorCode: priorUses >= maxUses ? "max_uses_exceeded" : "unavailable"
        })
      };
    }));
    for (const { id, result, search } of toolResults) {
      messages.push({ role: "tool", tool_call_id: id, content: result });
      blockManager.emitNativeWebSearch(search);
      nativeWebSearchCount += 1;
    }
    const nextPayload = {
      ...initialPayload,
      messages,
      model: targetModel.id,
      stream: true,
      stream_options: { include_usage: true }
    };
    debugLog4(options, "nebius stream native continuation request", {
      model: nextPayload.model,
      messageCount: messages.length,
      toolCount: Array.isArray(nextPayload.tools) ? nextPayload.tools.length : 0,
      turn: turn + 1
    });
    let nextResponse;
    try {
      nextResponse = await postNebiusStream(nextPayload, options, signal);
    } catch (err) {
      emitCollectedStreamTurn(blockManager, {
        reasoning: "",
        text: `Native server tool continuation failed: ${err instanceof Error ? err.message : String(err)}`,
        toolCalls: [],
        stopReason: "end_turn",
        inputTokens: 0,
        outputTokens: 0,
        cachedTokens: 0
      });
      stopReason = "end_turn";
      break;
    }
    if (!nextResponse.ok || !nextResponse.body) {
      const error = !nextResponse.ok ? await mapNebiusError(nextResponse) : undefined;
      emitCollectedStreamTurn(blockManager, {
        reasoning: "",
        text: error?.message ?? "Nebius returned no stream body after native server tool execution.",
        toolCalls: [],
        stopReason: "end_turn",
        inputTokens: 0,
        outputTokens: 0,
        cachedTokens: 0
      });
      stopReason = "end_turn";
      break;
    }
    response = nextResponse;
    currentPayload = nextPayload;
  }
  blockManager.close();
  if (inputTokens > 0 || outputTokens > 0) {
    options.costTracker?.addUsage(inputTokens, cachedTokens, outputTokens, targetModel);
  }
  debugLog4(options, "nebius native stream done", {
    model,
    stopReason,
    usage: { inputTokens, outputTokens, cachedTokens },
    blocks: blockManager.summary(),
    outputBudget: blockManager.outputSummary()
  });
  writeSse(res, "message_delta", {
    type: "message_delta",
    delta: { stop_reason: stopReason, stop_sequence: null },
    usage: {
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      ...nativeWebSearchCount > 0 ? { server_tool_use: { web_search_requests: nativeWebSearchCount } } : {}
    }
  });
  writeSse(res, "message_stop", { type: "message_stop" });
  res.end();
  return { ok: true, status: res.statusCode };
}
async function postNebiusStream(payload, options, signal, perf, spanName = "upstream_fetch", spanFields) {
  const request = () => postChatCompletionStream(payload, options, signal, undefined, {
    modelDefinition: options.modelDefinition,
    debug: options.debug
  });
  return await (perf?.span(spanName, request, spanFields) ?? request());
}
async function collectNebiusStreamTurn(response, options, requestedMaxTokens, retry = async () => response, isOutputStarted = () => false) {
  const toolCalls = new Map;
  let upstreamFinishReason = null;
  const turn = {
    reasoning: "",
    text: "",
    toolCalls: [],
    stopReason: "end_turn",
    inputTokens: 0,
    outputTokens: 0,
    cachedTokens: 0
  };
  if (!response.body) {
    return turn;
  }
  let streamAttempt = 0;
  try {
    for await (const eventData of readNebiusSseWithRetry(response, retry, {
      isOutputStarted,
      onRetry: ({ attempt, maxRetries, timeoutMs }) => debugLog4(options, "retrying nebius native stream after idle timeout", {
        attempt,
        maxRetries,
        timeoutMs
      })
    })) {
      if (eventData.attempt !== streamAttempt) {
        streamAttempt = eventData.attempt;
        toolCalls.clear();
        upstreamFinishReason = null;
        turn.reasoning = "";
        turn.text = "";
        turn.inputTokens = 0;
        turn.outputTokens = 0;
        turn.cachedTokens = 0;
      }
      const event = parseStreamData(eventData.data);
      if (!event) {
        continue;
      }
      const delta = event.delta;
      if (delta) {
        const reasoning = delta.reasoning ?? delta.reasoning_content;
        if (typeof reasoning === "string") {
          turn.reasoning += reasoning;
        }
        if (typeof delta.content === "string") {
          turn.text += delta.content;
        }
        if (Array.isArray(delta.tool_calls)) {
          for (const chunk of delta.tool_calls) {
            const index = typeof chunk.index === "number" ? chunk.index : 0;
            const existing = toolCalls.get(index) ?? { index, function: { arguments: "" } };
            if (chunk.id) {
              existing.id = chunk.id;
            }
            if (chunk.function?.name) {
              existing.function.name = chunk.function.name;
            }
            if (chunk.function?.arguments) {
              existing.function.arguments += chunk.function.arguments;
            }
            toolCalls.set(index, existing);
          }
        }
      }
      if (event.usage) {
        turn.inputTokens = event.usage.prompt_tokens ?? turn.inputTokens;
        turn.outputTokens = event.usage.completion_tokens ?? turn.outputTokens;
        turn.cachedTokens = event.usage.prompt_tokens_details?.cached_tokens ?? event.usage.cached_tokens ?? turn.cachedTokens;
      }
      if (event.finish_reason) {
        upstreamFinishReason = event.finish_reason;
      }
    }
  } catch (err) {
    debugLog4(options, "nebius native stream read error", {
      error: err instanceof Error ? err.message : String(err)
    });
    throw err;
  }
  turn.stopReason = mapStopReason(upstreamFinishReason, {
    outputTokens: turn.outputTokens,
    requestedMaxTokens
  });
  if (upstreamFinishReason === "length" && turn.stopReason !== "max_tokens") {
    debugLog4(options, "downgraded short Nebius native length stop", {
      outputTokens: turn.outputTokens,
      requestedMaxTokens
    });
  }
  turn.toolCalls = [...toolCalls.values()].sort((a3, b3) => a3.index - b3.index);
  return turn;
}
function emitCollectedStreamTurn(blockManager, turn) {
  if (turn.reasoning) {
    blockManager.emitThinking(turn.reasoning);
  }
  if (turn.text) {
    blockManager.emitText(turn.text);
  }
  for (const toolCall of turn.toolCalls) {
    const fn = {
      arguments: toolCall.function.arguments
    };
    if (toolCall.function.name) {
      fn.name = toolCall.function.name;
    }
    const emittedToolCall = {
      index: toolCall.index,
      function: fn
    };
    if (toolCall.id) {
      emittedToolCall.id = toolCall.id;
    }
    blockManager.emitToolCall(emittedToolCall);
  }
}
function parseStreamData(data) {
  let parsed;
  try {
    parsed = JSON.parse(data);
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== "object") {
    return null;
  }
  const obj = parsed;
  const choices = obj.choices;
  const choice = Array.isArray(choices) && choices.length > 0 ? choices[0] : null;
  return {
    delta: choice?.delta ?? null,
    usage: obj.usage ?? null,
    finish_reason: typeof choice?.finish_reason === "string" ? choice.finish_reason : null
  };
}

class StreamBlockManager {
  res;
  outputBudget;
  nextIndex = 0;
  openBlock = null;
  blockCount = 0;
  constructor(res, outputBudget) {
    this.res = res;
    this.outputBudget = outputBudget;
  }
  emitThinking(reasoning) {
    const emittedReasoning = this.outputBudget.takeThinking(reasoning);
    if (!emittedReasoning) {
      return;
    }
    if (!this.openBlock || this.openBlock.type !== "thinking") {
      this.closeOpenBlock();
      this.openBlock = { type: "thinking", index: this.nextIndex, reasoning: "" };
      writeSse(this.res, "content_block_start", {
        type: "content_block_start",
        index: this.openBlock.index,
        content_block: { type: "thinking", thinking: "", signature: "" }
      });
      this.blockCount += 1;
    }
    this.openBlock.reasoning += emittedReasoning;
    writeSse(this.res, "content_block_delta", {
      type: "content_block_delta",
      index: this.openBlock.index,
      delta: { type: "thinking_delta", thinking: emittedReasoning }
    });
  }
  emitText(text) {
    const emittedText = this.outputBudget.takeText(text);
    if (!emittedText) {
      return;
    }
    if (!this.openBlock || this.openBlock.type !== "text") {
      this.closeOpenBlock();
      this.openBlock = { type: "text", index: this.nextIndex };
      writeSse(this.res, "content_block_start", {
        type: "content_block_start",
        index: this.openBlock.index,
        content_block: { type: "text", text: "" }
      });
      this.blockCount += 1;
    }
    writeSse(this.res, "content_block_delta", {
      type: "content_block_delta",
      index: this.openBlock.index,
      delta: { type: "text_delta", text: emittedText }
    });
  }
  emitToolCall(toolCall) {
    const tcIndex = typeof toolCall.index === "number" ? toolCall.index : 0;
    const name = toolCall.function?.name;
    const argsFragment = this.outputBudget.takeToolJson(toolCall.function?.arguments ?? "");
    const open = this.openBlock;
    if (open && open.type === "tool_use" && this.currentToolCallIndex === tcIndex) {
      if (argsFragment) {
        open.arguments += argsFragment;
        writeSse(this.res, "content_block_delta", {
          type: "content_block_delta",
          index: open.index,
          delta: { type: "input_json_delta", partial_json: argsFragment }
        });
      }
      return;
    }
    this.closeOpenBlock();
    const id = toolCall.id ?? `toolu_${randomUUID5().replaceAll("-", "")}`;
    const toolName = name ?? "tool";
    const block = {
      type: "tool_use",
      index: this.nextIndex,
      id,
      name: toolName,
      arguments: ""
    };
    this.openBlock = block;
    this.currentToolCallIndex = tcIndex;
    writeSse(this.res, "content_block_start", {
      type: "content_block_start",
      index: block.index,
      content_block: { type: "tool_use", id, name: toolName, input: {} }
    });
    this.blockCount += 1;
    if (argsFragment) {
      block.arguments += argsFragment;
      writeSse(this.res, "content_block_delta", {
        type: "content_block_delta",
        index: block.index,
        delta: { type: "input_json_delta", partial_json: argsFragment }
      });
    }
  }
  emitNativeWebSearch(search) {
    this.closeOpenBlock();
    const toolIndex = this.nextIndex;
    writeSse(this.res, "content_block_start", {
      type: "content_block_start",
      index: toolIndex,
      content_block: {
        type: "server_tool_use",
        id: search.id,
        name: search.name,
        input: {}
      }
    });
    writeSse(this.res, "content_block_delta", {
      type: "content_block_delta",
      index: toolIndex,
      delta: { type: "input_json_delta", partial_json: JSON.stringify(search.input ?? {}) }
    });
    writeSse(this.res, "content_block_stop", {
      type: "content_block_stop",
      index: toolIndex
    });
    this.nextIndex += 1;
    this.blockCount += 1;
    const resultIndex = this.nextIndex;
    writeSse(this.res, "content_block_start", {
      type: "content_block_start",
      index: resultIndex,
      content_block: {
        type: "web_search_tool_result",
        tool_use_id: search.id,
        content: search.result
      }
    });
    writeSse(this.res, "content_block_stop", {
      type: "content_block_stop",
      index: resultIndex
    });
    this.nextIndex += 1;
    this.blockCount += 1;
  }
  currentToolCallIndex = -1;
  closeOpenBlock() {
    if (!this.openBlock) {
      return;
    }
    if (this.openBlock.type === "thinking") {
      writeSse(this.res, "content_block_delta", {
        type: "content_block_delta",
        index: this.openBlock.index,
        delta: { type: "signature_delta", signature: thinkingSignature(this.openBlock.reasoning) }
      });
    }
    writeSse(this.res, "content_block_stop", {
      type: "content_block_stop",
      index: this.openBlock.index
    });
    this.nextIndex += 1;
    this.openBlock = null;
  }
  close() {
    this.closeOpenBlock();
  }
  hasOutput() {
    return this.blockCount > 0;
  }
  summary() {
    return `${this.blockCount} block(s)`;
  }
  outputSummary() {
    return this.outputBudget.summary();
  }
}
function failAnthropicStream(res, status, type, message) {
  writeSse(res, "error", { type: "error", error: { type, message } });
  res.end();
  return { ok: false, status, error: message };
}

class StreamOutputBudget {
  maxContentChars;
  maxThinkingChars;
  contentChars = 0;
  thinkingChars = 0;
  droppedThinkingChars = 0;
  droppedContentChars = 0;
  constructor(options) {
    const claudeMaxTokens = finitePositiveInteger(options.claudeCodeMaxOutputTokens) ?? CLAUDE_CODE_DEFAULT_MAX_OUTPUT_TOKENS2;
    const safeContentTokens = Math.max(1, claudeMaxTokens - CLAUDE_RESPONSE_OUTPUT_HEADROOM_TOKENS);
    this.maxContentChars = safeContentTokens * APPROX_CHARS_PER_TOKEN;
    this.maxThinkingChars = Math.min(safeContentTokens, CLAUDE_THINKING_OUTPUT_MAX_TOKENS) * APPROX_CHARS_PER_TOKEN;
  }
  takeThinking(value) {
    return this.take(value, true);
  }
  takeText(value) {
    return this.take(value, false);
  }
  takeToolJson(value) {
    return this.take(value, false);
  }
  summary() {
    return {
      contentChars: this.contentChars,
      thinkingChars: this.thinkingChars,
      droppedContentChars: this.droppedContentChars,
      droppedThinkingChars: this.droppedThinkingChars,
      maxContentChars: this.maxContentChars,
      maxThinkingChars: this.maxThinkingChars
    };
  }
  take(value, thinking) {
    if (!value) {
      return "";
    }
    const remainingContentChars = this.maxContentChars - this.contentChars;
    const remainingThinkingChars = thinking ? this.maxThinkingChars - this.thinkingChars : Infinity;
    const remaining = Math.max(0, Math.min(remainingContentChars, remainingThinkingChars));
    if (remaining <= 0) {
      this.drop(value.length, thinking);
      return "";
    }
    if (value.length <= remaining) {
      this.contentChars += value.length;
      if (thinking) {
        this.thinkingChars += value.length;
      }
      return value;
    }
    const emitted = value.slice(0, remaining);
    this.contentChars += emitted.length;
    if (thinking) {
      this.thinkingChars += emitted.length;
    }
    this.drop(value.length - emitted.length, thinking);
    return emitted;
  }
  drop(chars, thinking) {
    if (thinking) {
      this.droppedThinkingChars += chars;
    } else {
      this.droppedContentChars += chars;
    }
  }
}
function finitePositiveInteger(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return;
  }
  return Math.max(1, Math.floor(value));
}
function debugLog4(options, label, value) {
  writeProxyDebugLog("nebiusrelay proxy", options, label, value);
}
function estimateInputTokensFromRawBytes(options) {
  const rawBytes = options.rawBytes;
  if (typeof rawBytes !== "number" || rawBytes <= 0) {
    return 1;
  }
  if (options.costTracker) {
    return options.costTracker.tokenEstimator.estimate(rawBytes);
  }
  return Math.max(1, Math.ceil(rawBytes / APPROX_CHARS_PER_TOKEN));
}
var CLAUDE_CODE_DEFAULT_MAX_OUTPUT_TOKENS2 = 32000, CLAUDE_RESPONSE_OUTPUT_HEADROOM_TOKENS = 2048, CLAUDE_THINKING_OUTPUT_MAX_TOKENS = 8000;
var init_stream = __esm(() => {
  init_proxy_debug();
  init_nebius_client();
  init_nebius_stream();
  init_context_budget();
  init_content_format();
  init_native_web_search_response();
  init_translate_request();
  init_translate_response();
  init_nebius_call();
});

// packages/cli/src/lib/claude/vision.ts
import { createHash as createHash2 } from "crypto";
function isImageBlock(block) {
  return typeof block === "object" && block !== null && block.type === "image";
}
function isUrlImageBlock(block) {
  return typeof block === "object" && block !== null && block.type === "url";
}
async function callVisionModel(model, imageUrl, options, signal) {
  const body = {
    model,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: VISION_PROMPT },
          { type: "image_url", image_url: { url: imageUrl } }
        ]
      }
    ],
    reasoning: { enabled: false },
    temperature: 0.6,
    top_p: 0.95,
    max_tokens: 800,
    stream: false
  };
  try {
    const response = await fetch(`${NEBIUS_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${options.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
      ...signal ? { signal } : {}
    });
    const text = await response.text();
    if (!response.ok) {
      debug(options, "vision error", { model, status: response.status, body: text.slice(0, 500) });
      return { ok: false, model, error: `vision model returned ${response.status}` };
    }
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      return { ok: false, model, error: "vision model returned non-JSON" };
    }
    const message = json.choices?.[0]?.message;
    const description = (message?.content || message?.reasoning || "").trim();
    if (!description) {
      return { ok: false, model, error: "vision model returned empty content" };
    }
    const usage = json.usage ?? {};
    return {
      ok: true,
      model,
      description,
      usage: {
        promptTokens: usage.prompt_tokens ?? 0,
        completionTokens: usage.completion_tokens ?? 0,
        cachedTokens: usage.cached_tokens ?? 0
      }
    };
  } catch (err) {
    debug(options, "vision error", {
      model,
      error: err instanceof Error ? err.message : String(err)
    });
    return { ok: false, model, error: err instanceof Error ? err.message : String(err) };
  }
}
async function describeImage(block, options) {
  const imageUrl = toDataUrl(block);
  if (!imageUrl) {
    return { description: "[Image unavailable: could not read image data]", model: "none" };
  }
  const visionModels = getVisionModels();
  const raceDelayMs = visionFailoverRaceDelayMs();
  if (raceDelayMs !== undefined && visionModels.length >= 2) {
    const raced = await describeImageWithDelayedFailoverRace(imageUrl, options, raceDelayMs);
    if (raced !== undefined) {
      return raced;
    }
  }
  for (const model of visionModels) {
    const outcome = await callVisionModel(model.id, imageUrl, options);
    if (outcome.ok) {
      return { description: outcome.description, model: outcome.model, usage: outcome.usage };
    }
    debug(options, "vision fallback", { from: outcome.model, reason: outcome.error });
  }
  return {
    description: "[Image description unavailable: all vision models failed]",
    model: "none"
  };
}
async function describeImageWithDelayedFailoverRace(imageUrl, options, delayMs) {
  const visionModels = getVisionModels();
  const primary = visionModels[0];
  const fallback = visionModels[1];
  if (!primary || !fallback) {
    return;
  }
  const primaryController = new AbortController;
  let fallbackController;
  let fallbackStarted = false;
  let fallbackPromise;
  let fallbackTimer;
  const primaryPromise = callVisionModel(primary.id, imageUrl, options, primaryController.signal).then((outcome) => ({ source: "primary", outcome }));
  const startFallback = () => {
    fallbackStarted = true;
    fallbackController = new AbortController;
    fallbackPromise = callVisionModel(fallback.id, imageUrl, options, fallbackController.signal).then((outcome) => ({ source: "fallback", outcome }));
    return fallbackPromise;
  };
  const delayedFallbackPromise = new Promise((resolve) => {
    fallbackTimer = setTimeout(() => {
      startFallback().then(resolve);
    }, delayMs);
  });
  const first = await Promise.race([primaryPromise, delayedFallbackPromise]);
  if (first.outcome.ok) {
    if (fallbackTimer && !fallbackStarted) {
      clearTimeout(fallbackTimer);
    }
    if (first.source === "primary") {
      fallbackController?.abort();
    } else {
      primaryController.abort();
    }
    return {
      description: first.outcome.description,
      model: first.outcome.model,
      usage: first.outcome.usage
    };
  }
  debug(options, "vision fallback", { from: first.outcome.model, reason: first.outcome.error });
  if (fallbackTimer && !fallbackStarted) {
    clearTimeout(fallbackTimer);
    const second2 = await startFallback();
    if (second2.outcome.ok) {
      return {
        description: second2.outcome.description,
        model: second2.outcome.model,
        usage: second2.outcome.usage
      };
    }
    debug(options, "vision fallback", {
      from: second2.outcome.model,
      reason: second2.outcome.error
    });
    return;
  }
  const second = first.source === "primary" ? await fallbackPromise : await primaryPromise;
  if (second?.outcome.ok) {
    return {
      description: second.outcome.description,
      model: second.outcome.model,
      usage: second.outcome.usage
    };
  }
  if (second && !second.outcome.ok) {
    debug(options, "vision fallback", { from: second.outcome.model, reason: second.outcome.error });
  }
  return;
}
function visionFailoverRaceDelayMs() {
  const raw = process.env.NEBIUSRELAY_VISION_FAILOVER_RACE_DELAY_MS;
  const parsed = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}
function toDataUrl(block) {
  if (isImageBlock(block)) {
    const { source } = block;
    if (source.type === "base64" && source.data && source.media_type) {
      return `data:${source.media_type};base64,${source.data}`;
    }
    if (source.type === "url" && source.url) {
      return source.url;
    }
    return null;
  }
  return block.url;
}
function imageBlockKey(block) {
  if (isImageBlock(block)) {
    const { source } = block;
    if (source.type === "base64" && source.data) {
      return `base64:${source.media_type ?? ""}:${createHash2("sha256").update(source.data).digest("hex")}`;
    }
    if (source.type === "url" && source.url) {
      return `url:${source.url}`;
    }
    return `unknown:${JSON.stringify(source)}`;
  }
  return `url:${block.url}`;
}
function debug(options, label, value) {
  if (!options.debug) {
    return;
  }
  process.stderr.write(`[nebiusrelay vision] ${label}: ${JSON.stringify(value)}
`);
}
var init_vision = __esm(() => {
  init_dist3();
});

// packages/cli/src/lib/claude/vision-resolver.ts
class LruCache {
  map = new Map;
  maxEntries;
  maxBytes;
  sizeOf;
  bytes = 0;
  constructor(maxEntries, maxBytes, sizeOf) {
    this.maxEntries = maxEntries;
    this.maxBytes = maxBytes;
    this.sizeOf = sizeOf ?? ((value) => typeof value === "string" ? value.length : 1);
  }
  get(key) {
    if (!this.map.has(key)) {
      return;
    }
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }
  set(key, value) {
    const existing = this.map.get(key);
    if (existing !== undefined) {
      this.bytes -= this.sizeOf(existing);
      this.map.delete(key);
    }
    this.map.set(key, value);
    this.bytes += this.sizeOf(value);
    this.evict(key);
  }
  get size() {
    return this.map.size;
  }
  evict(justSet) {
    while (this.map.size > this.maxEntries || this.bytes > this.maxBytes) {
      const oldest = this.map.keys().next();
      if (oldest.done) {
        break;
      }
      const key = oldest.value;
      if (key === justSet) {
        break;
      }
      const value = this.map.get(key);
      this.bytes -= this.sizeOf(value);
      this.map.delete(key);
    }
    if (this.bytes < 0) {
      this.bytes = 0;
    }
  }
}
async function resolveImageBlocks(body, options) {
  const descriptions = new Map;
  const resolve = async (block) => {
    if (!isImageBlock(block) && !isUrlImageBlock(block)) {
      return block;
    }
    const key = imageBlockKey(block);
    let cached = descriptions.get(key) ?? imageDescriptionCache.get(key);
    if (cached === undefined) {
      debugLog5(options, "vision describe start", { key });
      const result = await describeImage(block, {
        apiKey: options.apiKey,
        debug: options.debug
      });
      debugLog5(options, "vision describe done", {
        key,
        model: result.model,
        length: result.description.length,
        preview: result.description.slice(0, 200)
      });
      if (result.usage) {
        options.costTracker?.addVisionUsage(result.model, result.usage.promptTokens, result.usage.completionTokens);
      }
      cached = `${result.description}
[described by ${result.model}]`;
      imageDescriptionCache.set(key, cached);
    }
    descriptions.set(key, cached);
    return { type: "text", text: `[Image description]
${cached}` };
  };
  if (Array.isArray(body.system)) {
    body.system = await Promise.all(body.system.map((block) => resolve(block)));
  }
  for (const message of body.messages ?? []) {
    if (Array.isArray(message.content)) {
      message.content = await Promise.all(message.content.map(async (block) => {
        const resolved = await resolve(block);
        if (resolved.type === "tool_result" && Array.isArray(resolved.content)) {
          resolved.content = await Promise.all(resolved.content.map(async (innerBlock) => {
            return typeof innerBlock === "object" && innerBlock !== null ? await resolve(innerBlock) : innerBlock;
          }));
        }
        return resolved;
      }));
    }
  }
}
function extractImageBlocks(body) {
  const found = [];
  const knownTypes = new Set([
    "text",
    "thinking",
    "redacted_thinking",
    "tool_use",
    "server_tool_use",
    "tool_result",
    "web_search_tool_result",
    "web_search_tool_result_error"
  ]);
  const inspectBlock = (block, location) => {
    if (typeof block !== "object" || block === null) {
      return;
    }
    const record = block;
    const type = record.type;
    const isImageLike = type === "image" || type === "url" || type === "document" || typeof type === "string" && !knownTypes.has(type);
    if (!isImageLike) {
      return;
    }
    const summary = { location, type, rawKeys: Object.keys(record) };
    const source = record.source;
    if (source) {
      summary.sourceType = source.type;
      summary.mediaType = source.media_type;
      const data = source.data;
      summary.dataPreview = typeof data === "string" ? `${data.slice(0, 32)}\u2026 (${data.length} chars)` : typeof data;
    }
    const url = record.url;
    if (typeof url === "string") {
      summary.urlPreview = url.length > 64 ? `${url.slice(0, 64)}\u2026` : url;
    }
    found.push(summary);
  };
  const inspectContent = (content, location) => {
    if (!Array.isArray(content)) {
      return;
    }
    for (const block of content) {
      inspectBlock(block, location);
      const inner = block?.content;
      if (Array.isArray(inner)) {
        for (const innerBlock of inner) {
          inspectBlock(innerBlock, `${location}/tool_result`);
        }
      }
    }
  };
  inspectContent(body.system, "system");
  for (const message of body.messages ?? []) {
    inspectContent(message.content, `messages[${message.role}]`);
  }
  return found;
}
function debugLog5(options, label, value) {
  writeProxyDebugLog("nebiusrelay proxy", options, label, value);
}
var IMAGE_CACHE_MAX_ENTRIES = 64, IMAGE_CACHE_MAX_BYTES, imageDescriptionCache;
var init_vision_resolver = __esm(() => {
  init_proxy_debug();
  init_vision();
  IMAGE_CACHE_MAX_BYTES = 4 * 1024 * 1024;
  imageDescriptionCache = new LruCache(IMAGE_CACHE_MAX_ENTRIES, IMAGE_CACHE_MAX_BYTES);
});

// packages/cli/src/lib/claude/chat-completions.ts
import { randomUUID as randomUUID6 } from "crypto";
async function callNebiusChatCompletions(body, options, signal, perf) {
  const translated = perf?.spanSync("translate_request", () => {
    const targetModel2 = resolveTargetModel(body.model, options);
    const nativeTools2 = nativeServerTools(body.tools);
    const messages2 = toOpenAIMessages(body, targetModel2.definition);
    const tools2 = toOpenAITools(body.tools, options);
    return { targetModel: targetModel2, nativeTools: nativeTools2, messages: messages2, tools: tools2 };
  }) ?? (() => {
    const targetModel2 = resolveTargetModel(body.model, options);
    const nativeTools2 = nativeServerTools(body.tools);
    const messages2 = toOpenAIMessages(body, targetModel2.definition);
    const tools2 = toOpenAITools(body.tools, options);
    return { targetModel: targetModel2, nativeTools: nativeTools2, messages: messages2, tools: tools2 };
  })();
  const { targetModel, nativeTools, messages, tools } = translated;
  const nativeToolNames = new Set(nativeTools.map((tool) => tool.name));
  const nativeToolUses = new Map;
  const nativeWebSearches = [];
  for (let turn = 0;turn < 5; turn += 1) {
    const reasoningEffort = options.isCompactionRequest ? undefined : nebiusReasoningEffort(body, targetModel.definition);
    const maxTokens = clampClaudeClientMaxTokens(body.max_tokens, targetModel.definition, options);
    const payload = {
      model: targetModel.definition.id,
      messages: turn === 0 && nativeTools.length > 0 ? withClaudeNativeToolSystemPrompt(messages, nativeTools) : messages,
      max_tokens: maxTokens,
      stop: body.stop_sequences,
      temperature: body.temperature,
      tools,
      tool_choice: toOpenAIToolChoice(body.tool_choice),
      ...options.isCompactionRequest ? { reasoning: { enabled: false } } : reasoningEffort ? { reasoning_effort: reasoningEffort } : {},
      chat_template_kwargs: { clear_thinking: options.isCompactionRequest === true },
      stream: false
    };
    const estimatedInputTokens = estimateInputTokensFromRawBytes2(options);
    applyEstimatedContextBudget(payload, targetModel.definition, options, "request", estimatedInputTokens);
    debugLog6(options, "nebius request", {
      model: payload.model,
      messageCount: payload.messages.length,
      toolCount: payload.tools?.length ?? 0,
      maxTokens: payload.max_tokens,
      reasoningEffort,
      nativeToolCount: nativeTools.length,
      turn
    });
    const response = await (perf?.span("upstream_fetch", () => fetchNebius(payload, options, targetModel.definition, signal), { turn }) ?? fetchNebius(payload, options, targetModel.definition, signal));
    if (!response.ok) {
      throw response.error;
    }
    const json = response.json;
    if (typeof payload.max_tokens === "number") {
      json._nebiusrelayRequestedMaxTokens = payload.max_tokens;
    }
    const usage = json.usage;
    const promptTokens = usage?.prompt_tokens ?? 0;
    const completionTokens = usage?.completion_tokens ?? 0;
    const cachedTokens = usage?.prompt_tokens_details?.cached_tokens ?? usage?.cached_tokens ?? 0;
    const incrementalCost = options.costTracker?.addUsage(promptTokens, cachedTokens, completionTokens, targetModel.definition) ?? 0;
    debugLog6(options, "nebius response", {
      id: json.id,
      choices: json.choices?.length ?? 0,
      finishReason: json.choices?.[0]?.finish_reason,
      usage: { promptTokens, completionTokens, cachedTokens },
      incrementalCostUsd: Number(incrementalCost.toFixed(6)),
      toolCalls: json.choices?.[0]?.message?.tool_calls?.map((toolCall) => ({
        name: toolCall.function?.name,
        argumentsPreview: toolCall.function?.arguments?.slice(0, 300)
      }))
    });
    const toolCalls = json.choices?.[0]?.message?.tool_calls ?? [];
    const nativeToolCalls = toolCalls.filter((toolCall) => nativeToolNames.has(toolCall.function?.name ?? ""));
    if (nativeToolCalls.length === 0) {
      if (nativeWebSearches.length > 0) {
        json._nebiusrelayNativeWebSearches = nativeWebSearches;
      }
      return json;
    }
    const reasoning = json.choices?.[0]?.message?.reasoning ?? json.choices?.[0]?.message?.reasoning_content;
    messages.push({
      role: "assistant",
      content: json.choices?.[0]?.message?.content ?? null,
      ...reasoning ? { reasoning_content: reasoning } : {},
      tool_calls: toolCalls.map((toolCall) => ({
        id: toolCall.id ?? `call_${randomUUID6().replaceAll("-", "")}`,
        type: "function",
        function: {
          name: toolCall.function?.name ?? "tool",
          arguments: toolCall.function?.arguments ?? "{}"
        }
      }))
    });
    for (const toolCall of nativeToolCalls) {
      const id = toolCall.id ?? `call_${randomUUID6().replaceAll("-", "")}`;
      const name = toolCall.function?.name ?? "web_search";
      const nativeTool = nativeTools.find((tool) => tool.name === name);
      const input = parseJsonOrEmpty(toolCall.function?.arguments);
      const priorUses = nativeToolUses.get(name) ?? 0;
      const maxUses = nativeTool ? claudeNativeToolMaxUses(nativeTool.definition) : 0;
      let searchOutcome;
      const result = await runNativeWebSearchCall({
        name,
        priorUses,
        maxUses,
        isWebSearch: nativeTool?.kind === "web_search",
        recordUse: () => nativeToolUses.set(name, priorUses + 1),
        runSearch: async () => {
          searchOutcome = await (perf?.span("native_tool", () => runClaudeWebSearch(input, nativeTool.definition, options), { name }) ?? runClaudeWebSearch(input, nativeTool.definition, options));
          return searchOutcome.text;
        }
      });
      nativeWebSearches.push(createClaudeNativeWebSearchRecord({
        input,
        outcome: searchOutcome,
        fallbackErrorCode: priorUses >= maxUses ? "max_uses_exceeded" : "unavailable"
      }));
      messages.push({ role: "tool", tool_call_id: id, content: result });
    }
  }
  const exhaustedResponse = {
    id: `msg_${randomUUID6().replaceAll("-", "")}`,
    choices: [
      {
        finish_reason: "stop",
        message: {
          content: "I could not complete the native web search because the model kept requesting additional search tool calls."
        }
      }
    ]
  };
  if (nativeWebSearches.length > 0) {
    exhaustedResponse._nebiusrelayNativeWebSearches = nativeWebSearches;
  }
  return exhaustedResponse;
}
function debugLog6(options, label, value) {
  writeProxyDebugLog("nebiusrelay proxy", options, label, value);
}
function estimateInputTokensFromRawBytes2(options) {
  const rawBytes = options.rawBytes;
  if (typeof rawBytes !== "number" || rawBytes <= 0) {
    return 1;
  }
  if (options.costTracker) {
    return options.costTracker.tokenEstimator.estimate(rawBytes);
  }
  return Math.max(1, Math.ceil(rawBytes / APPROX_CHARS_PER_TOKEN));
}
var init_chat_completions = __esm(() => {
  init_proxy_debug();
  init_context_budget();
  init_content_format();
  init_native_web_search_response();
  init_translate_request();
  init_translate_response();
  init_nebius_call();
});

// packages/cli/src/lib/claude/compaction.ts
function tuneClaudeCompactionRequest(body, options = {}) {
  if (!isClaudeCompactionRequest(body)) {
    return { detected: false, userConfiguredClaudeMaxOutputTokens: false };
  }
  const requestedMaxTokens = finiteTokenCount2(body.max_tokens);
  const claudeCodeMaxOutputTokens = finiteTokenCount2(options.claudeCodeMaxOutputTokens) ?? CLAUDE_CODE_DEFAULT_MAX_OUTPUT_TOKENS3;
  const userConfiguredClaudeMaxOutputTokens = options.userConfiguredClaudeMaxOutputTokens === true;
  const effectiveRequestedMaxTokens = requestedMaxTokens ?? claudeCodeMaxOutputTokens;
  const maxTokens = Math.min(effectiveRequestedMaxTokens, claudeCodeMaxOutputTokens);
  if (maxTokens !== undefined) {
    body.max_tokens = maxTokens;
    rewriteCompactionInstruction(body, maxTokens, userConfiguredClaudeMaxOutputTokens);
  }
  return {
    detected: true,
    requestedMaxTokens,
    maxTokens,
    userConfiguredClaudeMaxOutputTokens
  };
}
function isClaudeCompactionRequest(body) {
  const lastUserText = lastUserMessageText(body);
  return COMPACTION_SIGNATURES.every((signature) => lastUserText.includes(signature));
}
function rewriteCompactionInstruction(body, maxTokens, userConfiguredClaudeMaxOutputTokens) {
  const lastUser = [...body.messages ?? []].reverse().find((message) => message.role === "user");
  if (!lastUser) {
    return;
  }
  const instruction = boundedCompactionInstruction(maxTokens, userConfiguredClaudeMaxOutputTokens);
  if (typeof lastUser.content === "string") {
    lastUser.content = replaceUnboundedCompactionPrompt(lastUser.content, instruction);
    return;
  }
  if (Array.isArray(lastUser.content)) {
    for (const block of lastUser.content) {
      if (block.type === "text" && typeof block.text === "string") {
        block.text = replaceUnboundedCompactionPrompt(block.text, instruction);
      }
    }
  }
}
function replaceUnboundedCompactionPrompt(text, instruction) {
  const index = text.indexOf(COMPACTION_INSTRUCTION_START);
  if (index === -1) {
    return `${text.trimEnd()}

${instruction}`;
  }
  const prefix = text.slice(0, index).trimEnd();
  return prefix ? `${prefix}

${instruction}` : instruction;
}
function boundedCompactionInstruction(maxTokens, userConfiguredClaudeMaxOutputTokens) {
  return `Nebius TF Relay bounded compaction request:

Respond with plain text only: a short <analysis> block followed by a <summary> block.

Hard budget:
- Finish the entire response under ${maxTokens} output tokens.
- Keep <analysis> under 150 words.
- Close both XML-ish tags. Do not continue until the token limit.

Write a durable handoff summary for continuing the coding task, but keep it bounded:
1. Primary request and current objective.
2. Important technical facts, decisions, and constraints.
3. Files touched/read and why they matter, using paths and concise descriptions.
4. Errors encountered and fixes or current hypotheses.
5. Current work and next concrete step.

Do not list every user message verbatim. Group repeated feedback.
Do not include full tool outputs, full diffs, or full code snippets unless a short snippet is essential.
Prefer precise file paths, commands, test results, and line-level facts over transcript prose.
Preserve security-relevant user constraints verbatim if any exist.
${userConfiguredClaudeMaxOutputTokens ? "The user configured CLAUDE_CODE_MAX_OUTPUT_TOKENS; honor that configured budget while staying concise." : ""}`;
}
function lastUserMessageText(body) {
  const lastUser = [...body.messages ?? []].reverse().find((message) => message.role === "user");
  return lastUser ? contentText(lastUser.content) : "";
}
function contentText(content) {
  if (typeof content === "string") {
    return content;
  }
  return content.map((block) => block.type === "text" && typeof block.text === "string" ? block.text : "").join(`
`);
}
function finiteTokenCount2(value) {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(1, Math.floor(value)) : undefined;
}
var CLAUDE_CODE_DEFAULT_MAX_OUTPUT_TOKENS3 = 32000, COMPACTION_SIGNATURES, COMPACTION_INSTRUCTION_START = "CRITICAL: Respond with TEXT ONLY. Do NOT call any tools.";
var init_compaction = __esm(() => {
  COMPACTION_SIGNATURES = [
    "CRITICAL: Respond with TEXT ONLY. Do NOT call any tools.",
    "Your entire response must be plain text: an <analysis> block followed by a <summary> block.",
    "Your task is to create a detailed summary"
  ];
});

// packages/cli/src/lib/claude/proxy.ts
async function handleProxyRequest(req, res, options) {
  const path8 = requestPath(req);
  const perf = createProxyPerfTracer("claude.proxy", {
    method: req.method,
    path: path8
  }, options.perfSink);
  debugLog7(options, "http request", { method: req.method, url: req.url, path: path8 });
  if (req.method === "HEAD" && path8 === "/") {
    res.writeHead(200);
    res.end();
    return;
  }
  if (req.method === "GET" && path8 === "/healthz") {
    writeJson(res, 200, { ok: true });
    return;
  }
  if (!isAuthorized(req, options.authToken)) {
    writeAnthropicError(res, 401, "authentication_error", "Unauthorized local proxy request.");
    return;
  }
  if (req.method === "GET" && path8 === "/v1/models") {
    writeJson(res, 200, {
      data: getClaudeSupportedModels().map(claudeModelResponse)
    });
    return;
  }
  if (req.method === "GET" && path8.startsWith("/v1/models/")) {
    const modelId = decodeURIComponent(path8.slice("/v1/models/".length));
    const model = findClaudeModel(modelId, options);
    if (!model) {
      writeAnthropicError(res, 404, "not_found_error", `Unknown model "${modelId}".`);
      return;
    }
    writeJson(res, 200, claudeModelResponse(model));
    return;
  }
  if (req.method === "POST" && path8 === "/v1/messages/count_tokens") {
    const { body: parsedBody2, rawBytes: rawBytes2 } = await readJsonBodyWithSize(req);
    const body2 = parsedBody2;
    if (!body2 || typeof body2 !== "object") {
      writeAnthropicError(res, 400, "invalid_request_error", "Request body must be an object.");
      return;
    }
    if (!body2.model) {
      writeAnthropicError(res, 400, "invalid_request_error", "model is required.");
      return;
    }
    if (!Array.isArray(body2.messages)) {
      writeAnthropicError(res, 400, "invalid_request_error", "messages must be an array.");
      return;
    }
    writeJson(res, 200, countTokensResponse(body2, options, rawBytes2, options.costTracker?.tokenEstimator));
    return;
  }
  if (req.method !== "POST" || path8 !== "/v1/messages") {
    writeAnthropicError(res, 404, "not_found_error", `Unsupported route ${req.method ?? ""} ${req.url ?? ""}`.trim());
    return;
  }
  const { body: parsedBody, rawBytes } = await perf.span("body_read_parse", () => readJsonBodyWithSize(req));
  const body = parsedBody;
  const upstreamAbort = new AbortController;
  const markClientDisconnected = () => {
    upstreamAbort.abort();
  };
  req.once("aborted", markClientDisconnected);
  res.once("close", () => {
    if (!res.writableEnded) {
      markClientDisconnected();
    }
  });
  options.costTracker?.noteRequestBytes(rawBytes);
  options.costTracker?.beginRequest();
  debugLog7(options, "anthropic request", () => ({
    model: body.model,
    stream: body.stream,
    messageCount: body.messages?.length ?? 0,
    toolCount: body.tools?.length ?? 0,
    tools: summarizeAnthropicTools(body.tools)
  }));
  if (body.model) {
    const requested = getClaudeSupportedModels().find((m2) => m2.alias === body.model || m2.definition.id === body.model);
    if (requested && requested.definition.id !== CLAUDE_HAIKU_MODEL.id) {
      recordAgentModel("claude", requested.definition.id);
    }
  }
  const compactionTuning = tuneClaudeCompactionRequest(body, {
    claudeCodeMaxOutputTokens: options.claudeCodeMaxOutputTokens,
    userConfiguredClaudeMaxOutputTokens: options.claudeCodeMaxOutputTokensUserSet
  });
  if (compactionTuning.detected) {
    debugLog7(options, "claude compaction request tuned", compactionTuning);
  }
  const imageBlocks = extractImageBlocks(body);
  if (imageBlocks.length > 0) {
    debugLog7(options, "image blocks detected", imageBlocks);
  }
  if (imageBlocks.length > 0) {
    await perf.span("vision_image_resolution", () => resolveImageBlocks(body, options), {
      imageBlockCount: imageBlocks.length
    });
  } else {
    perf.mark("vision_image_resolution_skipped", { imageBlockCount: 0 });
  }
  const budgetRawBytes = imageBlocks.length > 0 ? undefined : rawBytes;
  if (imageBlocks.length > 0) {
    debugLog7(options, "ignored raw byte estimator after image resolution", {
      rawBytes,
      imageBlockCount: imageBlocks.length
    });
  }
  if (body.stream) {
    await perf.span("stream_response", () => streamAnthropicFromNebius(res, body, {
      ...options,
      rawBytes: budgetRawBytes,
      isCompactionRequest: compactionTuning.detected
    }, upstreamAbort.signal, perf), { nativeToolCount: nativeServerTools(body.tools).length });
    const delta2 = options.costTracker?.requestDelta;
    const totals2 = options.costTracker?.totals;
    if (options.debug && delta2 && totals2) {
      debugLog7(options, "request cost", {
        requestCostUsd: Number(delta2.costUsd.toFixed(6)),
        requestInputTokens: delta2.promptTokens,
        requestCachedTokens: delta2.cachedTokens,
        requestOutputTokens: delta2.completionTokens,
        sessionTotalCostUsd: Number(totals2.costUsd.toFixed(6))
      });
    }
    perf.end({ status: res.statusCode, stream: true });
    return;
  }
  const openAiResponse = await callNebiusChatCompletions(body, {
    ...options,
    rawBytes: budgetRawBytes,
    isCompactionRequest: compactionTuning.detected
  }, upstreamAbort.signal, perf);
  if (compactionTuning.detected && openAiResponse.choices?.[0]?.finish_reason === "length") {
    openAiResponse.choices[0].finish_reason = "stop";
  }
  if (compactionTuning.detected) {
    const message = openAiResponse.choices?.[0]?.message;
    if (message && !message.content) {
      const reasoning = message.reasoning_content ?? message.reasoning;
      if (reasoning) {
        message.content = reasoning;
        message.reasoning = null;
        message.reasoning_content = null;
      }
    }
  }
  const anthropicMessage = perf.spanSync("response_map", () => toAnthropicMessage(openAiResponse, body.model ?? options.modelId));
  const delta = options.costTracker?.requestDelta;
  const totals = options.costTracker?.totals;
  if (options.debug && delta && totals) {
    debugLog7(options, "request cost", {
      requestCostUsd: Number(delta.costUsd.toFixed(6)),
      requestInputTokens: delta.promptTokens,
      requestCachedTokens: delta.cachedTokens,
      requestOutputTokens: delta.completionTokens,
      sessionTotalCostUsd: Number(totals.costUsd.toFixed(6))
    });
  }
  writeJson(res, 200, anthropicMessage);
  perf.end({ status: res.statusCode, stream: false });
}
function debugLog7(options, label, value) {
  writeProxyDebugLog("nebiusrelay proxy", options, label, value);
}
function summarizeAnthropicTools(tools) {
  if (!tools || tools.length === 0) {
    return;
  }
  return tools.map((tool) => ({
    name: tool.name,
    type: tool.type,
    maxUses: tool.max_uses,
    inputSchemaKeys: objectKeys(tool.input_schema),
    rawKeys: Object.keys(tool)
  }));
}
var init_proxy = __esm(() => {
  init_defaults();
  init_model_preferences();
  init_proxy_perf();
  init_proxy_debug();
  init_http_util();
  init_content_format();
  init_translate_request();
  init_translate_response();
  init_nebius_call();
  init_stream();
  init_vision_resolver();
  init_chat_completions();
  init_compaction();
});

// packages/cli/src/lib/codex/defaults.ts
function codexDefaultModelId() {
  return getDefaultModel().id;
}
function getCodexSupportedModels() {
  return getSelectableModels().map((definition) => ({
    id: definition.id,
    definition
  }));
}
function resolveCodexModel(value) {
  const supported = getCodexSupportedModels();
  if (supported.length === 0) {
    throw new Error("No Codex models are configured.");
  }
  const found = resolveModelByKeys(supported.map((model) => model.definition), value, [(model) => model.id], codexDefaultModelId());
  if (!found) {
    const expected = supported.map((model) => model.id).join(", ");
    throw new Error(`Unsupported Codex model "${value}". Expected one of: ${expected}.`);
  }
  return { id: found.id, definition: found };
}
var CODEX_PROVIDER_ID = "nebiusrelay", CODEX_AUTH_ENV = "NEBIUSRELAY_CODEX_AUTH_TOKEN";
var init_defaults2 = __esm(() => {
  init_dist3();
});

// packages/cli/src/lib/codex/catalog.ts
function codexModelCatalog() {
  return {
    models: getCodexSupportedModels().map((model, index) => toCodexModelCatalogEntry(model, index))
  };
}
function codexModelCatalogJson() {
  return JSON.stringify(codexModelCatalog());
}
function toCodexModelCatalogEntry(model, priority = 50) {
  const reasoningLevels = model.definition.reasoning ? [
    { effort: "minimal", description: "Fastest; no reasoning before replies" },
    { effort: "low", description: "Fast responses with lighter reasoning" },
    { effort: "medium", description: "Balances speed and reasoning depth" },
    { effort: "high", description: "Greater reasoning depth for complex tasks" }
  ] : [];
  return {
    slug: model.id,
    display_name: model.definition.name,
    description: `Nebius Token Factory model via nebiusrelay (${model.definition.id})`,
    default_reasoning_level: model.definition.reasoning ? "minimal" : "none",
    supported_reasoning_levels: reasoningLevels,
    shell_type: "shell_command",
    visibility: "list",
    supported_in_api: true,
    priority,
    additional_speed_tiers: [],
    service_tiers: [],
    default_service_tier: null,
    availability_nux: null,
    upgrade: null,
    base_instructions: CODEX_BASE_INSTRUCTIONS,
    model_messages: CODEX_MODEL_MESSAGES,
    supports_personality: true,
    supports_reasoning_summaries: model.definition.reasoning,
    default_reasoning_summary: model.definition.reasoning ? "auto" : "none",
    support_verbosity: false,
    default_verbosity: "low",
    apply_patch_tool_type: "freeform",
    web_search_tool_type: "text_and_image",
    truncation_policy: {
      mode: "tokens",
      limit: Math.floor(model.definition.limit.context / CODEX_TOKENIZER_MISMATCH_RATIO)
    },
    supports_parallel_tool_calls: model.definition.tool_call,
    supports_image_detail_original: model.definition.attachment,
    context_window: model.definition.limit.context,
    max_context_window: model.definition.limit.context,
    auto_compact_token_limit: Math.floor(model.definition.limit.context / CODEX_TOKENIZER_MISMATCH_RATIO),
    comp_hash: null,
    effective_context_window_percent: Math.round(100 / CODEX_TOKENIZER_MISMATCH_RATIO),
    experimental_supported_tools: [],
    input_modalities: model.definition.modalities.input,
    supports_search_tool: false,
    use_responses_lite: false
  };
}
var CODEX_BASE_INSTRUCTIONS = "You are Codex, a coding agent. You and the user share one workspace, and your job is to help them complete their coding task accurately and efficiently.", CODEX_TOKENIZER_MISMATCH_RATIO = 1.8, CODEX_MODEL_MESSAGES;
var init_catalog = __esm(() => {
  init_defaults2();
  CODEX_MODEL_MESSAGES = {
    instructions_template: `${CODEX_BASE_INSTRUCTIONS}

{{ personality }}`,
    instructions_variables: {
      personality_default: "",
      personality_friendly: `# Personality

You are warm, collaborative, and helpful. Keep the user clearly informed while you work, and make the collaboration feel easy.`,
      personality_pragmatic: `# Personality

You are direct, task-focused, and precise. State assumptions clearly, prioritize actionable progress, and avoid unnecessary detail.`
    }
  };
});

// packages/cli/src/lib/codex/content-format.ts
function objectKeys2(value) {
  return value && typeof value === "object" ? Object.keys(value) : undefined;
}
function stringifyUnknown2(value) {
  if (typeof value === "string") {
    return value;
  }
  if (value === undefined || value === null) {
    return "";
  }
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}
function parseJsonOrEmpty2(value) {
  if (!value) {
    return {};
  }
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

// packages/cli/src/lib/codex/translate-request.ts
import { randomUUID as randomUUID7 } from "crypto";
function toChatPayload(body, options, stream, toolTranslation, requestModel, estimatedInputTokens) {
  const messages = toChatMessages(body, options, toolTranslation);
  const translatedReasoningEffort = reasoningEffort(body, requestModel.definition);
  const messagesWithNativePrompt = toolTranslation.nativeTools.length > 0 ? withNativeToolSystemPrompt2(messages, toolTranslation.nativeTools) : messages;
  return {
    model: requestModel.targetModelId,
    messages: messagesWithNativePrompt,
    max_tokens: body.max_output_tokens ?? defaultMaxOutputTokens(requestModel.definition, estimatedInputTokens),
    temperature: body.temperature,
    ...toolTranslation.tools.length > 0 ? { tools: toolTranslation.tools } : {},
    tool_choice: toChatToolChoice(body.tool_choice, toolTranslation),
    response_format: toChatResponseFormat(body.text),
    ...translatedReasoningEffort ? { reasoning_effort: translatedReasoningEffort } : {},
    chat_template_kwargs: { clear_thinking: false },
    stream,
    ...stream ? { stream_options: { include_usage: true } } : {}
  };
}
function resolveCodexRequestModel(body, options) {
  const requestedModelId = body.model ?? options.modelId;
  if (isCodexMemoryRequest(body, requestedModelId)) {
    const configured = process.env[CODEX_MEMORY_MODEL_ENV]?.trim();
    const configuredModel = configured ? findModelById(configured) : undefined;
    const definition2 = configuredModel ?? MINIMAX_M3;
    return {
      requestedModelId,
      targetModelId: definition2.id,
      definition: definition2,
      memory: true
    };
  }
  const requestedModel = findModelById(requestedModelId);
  const definition = requestedModel ?? options.modelDefinition;
  return {
    requestedModelId,
    targetModelId: definition.id,
    definition,
    memory: false
  };
}
function isCodexMemoryRequest(body, requestedModelId) {
  if (CODEX_MEMORY_REQUESTED_MODELS.has(requestedModelId)) {
    return true;
  }
  return body.instructions?.includes("## Memory Writing Agent:") === true;
}
function toChatMessages(body, options, toolTranslation) {
  const messages = [
    {
      role: "system",
      content: `${CODEX_IDENTITY_PROMPT}
Selected Nebius backend: ${options.modelName} (${options.targetModelId}).`
    }
  ];
  if (body.instructions) {
    messages.push({ role: "system", content: body.instructions });
  }
  if (typeof body.input === "string") {
    messages.push({ role: "user", content: body.input });
    return messages;
  }
  const pendingToolCalls = [];
  const pendingReasoningParts = [];
  const takePendingReasoning = () => {
    const reasoning = pendingReasoningParts.join(`
`);
    pendingReasoningParts.length = 0;
    return reasoning;
  };
  const flushPendingToolCalls = () => {
    if (pendingToolCalls.length === 0) {
      return;
    }
    const reasoning = takePendingReasoning();
    messages.push({
      role: "assistant",
      content: null,
      tool_calls: pendingToolCalls.splice(0),
      ...reasoning ? { reasoning_content: reasoning } : {}
    });
  };
  for (const item of body.input ?? []) {
    if (item.type === "reasoning") {
      const reasoning = stringifyResponsesContent(item.content);
      if (reasoning) {
        pendingReasoningParts.push(reasoning);
      }
      continue;
    }
    if (item.type === "function_call") {
      pendingToolCalls.push({
        id: item.call_id ?? `call_${randomUUID7().replaceAll("-", "")}`,
        type: "function",
        function: {
          name: toChatHistoryToolName(item, toolTranslation, "function"),
          arguments: sanitizeToolCallArguments(typeof item.arguments === "string" ? item.arguments : JSON.stringify(item.arguments))
        }
      });
      continue;
    }
    if (item.type === "tool_search_call") {
      pendingToolCalls.push({
        id: item.call_id ?? `call_${randomUUID7().replaceAll("-", "")}`,
        type: "function",
        function: {
          name: toChatHistoryToolName(item, toolTranslation, "tool_search"),
          arguments: typeof item.arguments === "string" ? item.arguments : JSON.stringify(item.arguments ?? {})
        }
      });
      continue;
    }
    if (item.type === "custom_tool_call") {
      pendingToolCalls.push({
        id: item.call_id ?? `call_${randomUUID7().replaceAll("-", "")}`,
        type: "function",
        function: {
          name: toChatHistoryToolName(item, toolTranslation, "custom"),
          arguments: JSON.stringify({ input: item.input ?? "" })
        }
      });
      continue;
    }
    flushPendingToolCalls();
    if (item.type === "tool_search_output") {
      messages.push({
        role: "tool",
        tool_call_id: item.call_id ?? "",
        content: `Loaded tools: ${(item.tools ?? []).map((tool) => tool.name).filter(Boolean).join(", ") || "none"}`
      });
      continue;
    }
    if (item.type === "function_call_output" || item.type === "custom_tool_call_output") {
      messages.push({
        role: "tool",
        tool_call_id: item.call_id ?? "",
        content: stringifyUnknown2(item.output)
      });
      continue;
    }
    if (item.type === "message" || item.role) {
      const role = toChatRole(item.role);
      const reasoning = role === "assistant" ? takePendingReasoning() : "";
      messages.push({
        role,
        content: toChatMessageContent(item.content),
        ...reasoning ? { reasoning_content: reasoning } : {}
      });
    }
  }
  flushPendingToolCalls();
  return messages;
}
function toChatHistoryToolName(item, toolTranslation, preferredKind) {
  const sourceName = item.name ?? (preferredKind === "tool_search" ? "tool_search" : "tool");
  for (const mapping of toolTranslation.mappings.values()) {
    if (item.namespace && mapping.kind === "namespace" && mapping.namespace === item.namespace && mapping.sourceName === sourceName) {
      return mapping.modelName;
    }
    if (!item.namespace && mapping.kind === preferredKind && mapping.sourceName === sourceName) {
      return mapping.modelName;
    }
  }
  return item.namespace ? `${sanitizeToolName(item.namespace)}__${sanitizeToolName(sourceName)}` : sourceName;
}
function translateCodexTools(tools) {
  const translated = [];
  const mappings = new Map;
  const nativeTools = [];
  const usedNames = new Set;
  const uniqueName = (raw) => {
    const base = sanitizeToolName(raw);
    let candidate = base;
    let suffix = 2;
    while (usedNames.has(candidate)) {
      candidate = `${base}_${suffix}`;
      suffix += 1;
    }
    usedNames.add(candidate);
    return candidate;
  };
  for (const tool of tools ?? []) {
    if (tool.type === "tool_search") {
      const sourceName = tool.name ?? "tool_search";
      const modelName = uniqueName(sourceName);
      const mapping = {
        kind: "tool_search",
        sourceName,
        modelName,
        execution: tool.execution ?? "client"
      };
      mappings.set(modelName, mapping);
      translated.push(toChatFunctionTool(modelName, tool.description ?? "Search for tools relevant to the current task.", tool.parameters));
      continue;
    }
    if (isWebSearchTool(tool)) {
      const sourceName = tool.name ?? "web_search";
      const modelName = uniqueName(sourceName);
      const mapping = {
        kind: "web_search",
        sourceName,
        modelName,
        definition: tool
      };
      mappings.set(modelName, mapping);
      nativeTools.push(mapping);
      translated.push(toChatFunctionTool(modelName, tool.description ?? "Search the web for recent or source-backed information.", {
        type: "object",
        properties: { query: { type: "string", description: "The web search query." } },
        required: ["query"],
        additionalProperties: false
      }));
      continue;
    }
    if (tool.type === "function" && tool.name) {
      const modelName = uniqueName(tool.name);
      const mapping = { kind: "function", sourceName: tool.name, modelName };
      mappings.set(modelName, mapping);
      translated.push(toChatFunctionTool(modelName, tool.description ?? "", tool.parameters));
      continue;
    }
    if (tool.type === "custom" && tool.name) {
      const modelName = uniqueName(tool.name);
      const mapping = { kind: "custom", sourceName: tool.name, modelName };
      mappings.set(modelName, mapping);
      translated.push(toChatFunctionTool(modelName, customToolDescription(tool), {
        type: "object",
        properties: {
          input: { type: "string", description: "The complete freeform input for this tool." }
        },
        required: ["input"],
        additionalProperties: false
      }));
      continue;
    }
    if (tool.type === "namespace" && tool.name && Array.isArray(tool.tools)) {
      for (const child of tool.tools) {
        if (child.type !== "function" || !child.name) {
          continue;
        }
        const modelName = uniqueName(`${tool.name}__${child.name}`);
        const mapping = {
          kind: "namespace",
          sourceName: child.name,
          modelName,
          namespace: tool.name
        };
        mappings.set(modelName, mapping);
        const description = [tool.description, child.description].filter(Boolean).join(`

`);
        translated.push(toChatFunctionTool(modelName, description, child.parameters));
      }
      continue;
    }
  }
  return { tools: translated, mappings, nativeTools };
}
function translateCodexRequestTools(body) {
  const visibleTools = (body.tools ?? []).filter((tool) => tool.defer_loading !== true);
  const discoveredTools = typeof body.input === "string" ? [] : (body.input ?? []).flatMap((item) => item.type === "tool_search_output" ? item.tools ?? [] : []);
  const combined = [...visibleTools];
  const seen = new Set(combined.map(toolIdentity));
  for (const tool of discoveredTools) {
    const identity = toolIdentity(tool);
    if (!seen.has(identity)) {
      combined.push(tool);
      seen.add(identity);
    }
  }
  return combined.length > 0 ? translateCodexTools(combined) : EMPTY_CODEX_TOOL_TRANSLATION;
}
function toolIdentity(tool) {
  return `${tool.type ?? ""}:${tool.name ?? ""}`;
}
function toChatFunctionTool(name, description, parameters) {
  return {
    type: "function",
    function: {
      name,
      description,
      parameters: parameters ?? { type: "object", properties: {} }
    }
  };
}
function sanitizeToolName(name) {
  const sanitized = name.replaceAll(/[^A-Za-z0-9_-]/g, "_").replace(/^_+|_+$/g, "");
  return sanitized || "tool";
}
function customToolDescription(tool) {
  const pieces = [tool.description ?? ""];
  if (tool.format?.syntax || tool.format?.definition) {
    pieces.push(`Input format: ${[tool.format.syntax, tool.format.definition].filter(Boolean).join(`
`)}`);
  }
  return pieces.filter(Boolean).join(`

`) || "Call this custom freeform tool.";
}
function isWebSearchTool(tool) {
  return tool.type === "web_search" || tool.type?.startsWith("web_search") === true || tool.name === "web_search";
}
function withNativeToolSystemPrompt2(messages, nativeTools) {
  return withNativeToolSystemPrompt(messages, nativeTools, {
    toolName: (tool) => tool.modelName
  });
}
function codexNativeToolMaxUses(tool) {
  return nativeToolMaxUses(tool);
}
async function runCodexWebSearch(input, tool, options) {
  return runWebSearch({
    query: input,
    allowedDomains: stringArray(tool.allowed_domains),
    blockedDomains: stringArray(tool.blocked_domains),
    tavilyApiKey: process.env.TAVILY_API_KEY,
    debugLog: (label, value) => debugLog8(options, label, value),
    missingApiKeyMessage: "Web search error: TAVILY_API_KEY is not set. Run `nebiusrelay configure` or export TAVILY_API_KEY and retry.",
    includePublishedDate: true,
    snippetLength: 700
  });
}
function toChatRole(role) {
  if (role === "assistant") {
    return "assistant";
  }
  if (role === "developer" || role === "system") {
    return "system";
  }
  return "user";
}
function stringifyResponsesContent(content) {
  if (typeof content === "string") {
    return content;
  }
  return (content ?? []).map((part) => {
    if (part.type === "input_text" || part.type === "output_text" || part.type === "text" || part.type === "reasoning_text") {
      return part.text ?? "";
    }
    return "";
  }).filter(Boolean).join(`
`);
}
function sanitizeToolCallArguments(argumentsJson) {
  if (!argumentsJson) {
    return "{}";
  }
  try {
    const parsed = JSON.parse(argumentsJson);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed) && Object.prototype.hasOwnProperty.call(parsed, "items")) {
      parsed._items = parsed.items;
      delete parsed.items;
      return JSON.stringify(parsed);
    }
  } catch {
  }
  return argumentsJson;
}
function toChatMessageContent(content) {
  if (typeof content === "string") {
    return content;
  }
  const parts = content ?? [];
  if (!parts.some((part) => part.type === "input_image" || part.type === "image_url")) {
    return stringifyResponsesContent(parts);
  }
  return parts.map((part) => {
    if (part.type === "input_text" || part.type === "output_text" || part.type === "text") {
      return part.text ? { type: "text", text: part.text } : undefined;
    }
    if ((part.type === "input_image" || part.type === "image_url") && typeof part.image_url === "string") {
      return {
        type: "image_url",
        image_url: {
          url: part.image_url,
          ...part.detail ? { detail: part.detail } : {}
        }
      };
    }
    return;
  }).filter((part) => part !== undefined);
}
function toChatToolChoice(toolChoice, toolTranslation) {
  if (!toolChoice || typeof toolChoice !== "object") {
    return;
  }
  const choice = toolChoice;
  if (choice.type === "auto") {
    return "auto";
  }
  if (choice.type === "required") {
    return "required";
  }
  if (choice.type === "function" && typeof choice.name === "string") {
    return {
      type: "function",
      function: { name: toChatToolChoiceName(choice.name, toolTranslation) }
    };
  }
  return;
}
function toChatToolChoiceName(name, toolTranslation) {
  if (toolTranslation.mappings.has(name)) {
    return name;
  }
  for (const mapping of toolTranslation.mappings.values()) {
    if (mapping.sourceName === name) {
      return mapping.modelName;
    }
  }
  return name;
}
function toChatResponseFormat(text) {
  const format = text?.format;
  if (!format?.type) {
    return;
  }
  if (format.type === "json_schema") {
    return {
      type: "json_schema",
      json_schema: {
        name: format.name ?? "codex_output_schema",
        ...format.schema !== undefined ? { schema: format.schema } : {},
        ...format.strict !== undefined ? { strict: format.strict } : {}
      }
    };
  }
  if (format.type === "json_object") {
    return { type: "json_object" };
  }
  return;
}
function reasoningEffort(body, model) {
  const effort = body.reasoning?.effort;
  if (!model.reasoning) {
    return;
  }
  if (acceptsReasoningEffort(model.id)) {
    if (effort === "high" || effort === "xhigh" || effort === "max") {
      return "max";
    }
    if (effort === "medium") {
      return "medium";
    }
    if (effort === "low") {
      return "low";
    }
    if (effort === "minimal" || effort === "none") {
      return "none";
    }
    return glmDefaultReasoningEffort();
  }
  if (effort === "low" || effort === "medium" || effort === "high" || effort === "max") {
    return effort;
  }
  if (effort === "xhigh") {
    return "high";
  }
  return;
}
function glmDefaultReasoningEffort() {
  const raw = process.env.NEBIUSRELAY_REASONING_EFFORT?.toLowerCase();
  switch (raw) {
    case "low":
    case "medium":
    case "high":
    case "max":
      return raw;
    case "xhigh":
      return "max";
    default:
      return "none";
  }
}
function defaultMaxOutputTokens(modelDefinition, estimatedInputTokens) {
  if (estimatedInputTokens * 1.15 + modelDefinition.limit.output + CODEX_CONTEXT_OUTPUT_SAFETY_TOKENS < modelDefinition.limit.context) {
    return modelDefinition.limit.output;
  }
  const availableOutputTokens = Math.floor(modelDefinition.limit.context - estimatedInputTokens - CODEX_CONTEXT_OUTPUT_SAFETY_TOKENS);
  return Math.max(1, Math.min(modelDefinition.limit.output, availableOutputTokens));
}
function debugLog8(options, label, payload) {
  writeProxyDebugLog("nebiusrelay codex proxy", options, label, payload);
}
var CODEX_IDENTITY_PROMPT, CODEX_MEMORY_MODEL_ENV = "NEBIUSRELAY_CODEX_MEMORY_MODEL", CODEX_MEMORY_REQUESTED_MODELS, CODEX_CONTEXT_OUTPUT_SAFETY_TOKENS = 512, EMPTY_CODEX_TOOL_TRANSLATION;
var init_translate_request2 = __esm(() => {
  init_dist3();
  init_proxy_debug();
  CODEX_IDENTITY_PROMPT = "You are running inside Codex through nebiusrelay's local Responses-to-Nebius proxy. " + "The upstream model is a Nebius Token Factory model, not an OpenAI model. " + "If asked what model you are, identify yourself as the selected Nebius Token Factory backend routed by nebiusrelay.";
  CODEX_MEMORY_REQUESTED_MODELS = new Set(["gpt-5.4-mini"]);
  EMPTY_CODEX_TOOL_TRANSLATION = {
    tools: [],
    mappings: new Map,
    nativeTools: []
  };
});

// packages/cli/src/lib/codex/sse.ts
function writeResponsesSse(res, event, data) {
  const sequenceNumber = responseSequenceNumbers.get(res) ?? 0;
  responseSequenceNumbers.set(res, sequenceNumber + 1);
  const payload = data && typeof data === "object" && !Array.isArray(data) && !("sequence_number" in data) ? { ...data, sequence_number: sequenceNumber } : data;
  writeSse(res, event, payload);
}
var responseSequenceNumbers;
var init_sse = __esm(() => {
  responseSequenceNumbers = new WeakMap;
});

// packages/cli/src/lib/codex/translate-response.ts
import { randomUUID as randomUUID8 } from "crypto";
function toResponsesResponse(chatResponse, body, options, toolTranslation) {
  const responseId = chatResponse.id ?? `resp_${randomUUID8().replaceAll("-", "")}`;
  const isLengthTruncated = chatResponse.choices?.[0]?.finish_reason === "length";
  return {
    id: responseId,
    object: "response",
    created_at: Math.floor(Date.now() / 1000),
    status: isLengthTruncated ? "incomplete" : "completed",
    ...isLengthTruncated ? { incomplete_details: { reason: "max_output_tokens" } } : {},
    model: body.model ?? options.modelId,
    output: toResponsesOutput(chatResponse, toolTranslation),
    usage: toResponsesUsage(chatResponse.usage)
  };
}
function toResponsesOutput(chatResponse, toolTranslation) {
  const message = chatResponse.choices?.[0]?.message ?? {};
  const output = [];
  const reasoning = message.reasoning ?? message.reasoning_content;
  if (reasoning) {
    output.push(reasoningOutputItem());
  }
  if (message.content) {
    output.push(messageOutputItem(message.content));
  }
  for (const toolCall of message.tool_calls ?? []) {
    output.push(responseToolCallOutputItem({
      id: toolCall.id ?? `call_${randomUUID8().replaceAll("-", "")}`,
      name: toolCall.function?.name ?? "tool",
      arguments: toolCall.function?.arguments ?? "{}"
    }, toolTranslation));
  }
  return output;
}
function openReasoningOutputItem(res, state) {
  if (state.reasoningItemId !== undefined) {
    return;
  }
  state.reasoningItemId = `rs_${randomUUID8().replaceAll("-", "")}`;
  state.reasoningOutputIndex = state.nextOutputIndex;
  state.nextOutputIndex += 1;
  writeResponsesSse(res, "response.output_item.added", {
    type: "response.output_item.added",
    output_index: state.reasoningOutputIndex,
    item: {
      id: state.reasoningItemId,
      type: "reasoning",
      status: "in_progress",
      summary: [],
      content: []
    }
  });
}
function openTextOutputItem(res, state) {
  if (state.textItemId !== undefined) {
    return;
  }
  state.textItemId = `msg_${randomUUID8().replaceAll("-", "")}`;
  state.textOutputIndex = state.nextOutputIndex;
  state.nextOutputIndex += 1;
  const item = {
    id: state.textItemId,
    type: "message",
    role: "assistant",
    status: "in_progress",
    content: []
  };
  writeResponsesSse(res, "response.output_item.added", {
    type: "response.output_item.added",
    output_index: state.textOutputIndex,
    item
  });
  writeResponsesSse(res, "response.content_part.added", {
    type: "response.content_part.added",
    item_id: state.textItemId,
    output_index: state.textOutputIndex,
    content_index: 0,
    part: { type: "output_text", text: "", annotations: [] }
  });
}
function reasoningOutputItem(id = `rs_${randomUUID8().replaceAll("-", "")}`) {
  return {
    id,
    type: "reasoning",
    status: "completed",
    summary: [],
    content: []
  };
}
function messageOutputItem(text, id = `msg_${randomUUID8().replaceAll("-", "")}`) {
  return {
    id,
    type: "message",
    role: "assistant",
    status: "completed",
    content: [{ type: "output_text", text, annotations: [] }]
  };
}
function responseToolCallOutputItem(toolCall, toolTranslation) {
  const mapping = toolTranslation.mappings.get(toolCall.name);
  if (mapping?.kind === "tool_search") {
    return {
      id: `tsc_${randomUUID8().replaceAll("-", "")}`,
      type: "tool_search_call",
      status: "completed",
      call_id: toolCall.id,
      execution: mapping.execution,
      arguments: parseJsonOrEmpty2(toolCall.arguments)
    };
  }
  if (mapping?.kind === "custom") {
    const parsed = parseJsonOrEmpty2(toolCall.arguments);
    return {
      id: `ctc_${randomUUID8().replaceAll("-", "")}`,
      type: "custom_tool_call",
      status: "completed",
      call_id: toolCall.id,
      name: mapping.sourceName,
      input: customToolInput(parsed, toolCall.arguments)
    };
  }
  if (mapping?.kind === "namespace") {
    return {
      id: `fc_${randomUUID8().replaceAll("-", "")}`,
      type: "function_call",
      status: "completed",
      call_id: toolCall.id,
      namespace: mapping.namespace,
      name: mapping.sourceName,
      arguments: toolCall.arguments || "{}"
    };
  }
  return functionCallOutputItem({
    ...toolCall,
    name: mapping?.sourceName ?? toolCall.name
  });
}
function functionCallOutputItem(toolCall) {
  return {
    id: `fc_${randomUUID8().replaceAll("-", "")}`,
    type: "function_call",
    status: "completed",
    call_id: toolCall.id,
    name: toolCall.name || "tool",
    arguments: toolCall.arguments || "{}"
  };
}
function customToolInput(parsed, rawArguments) {
  if (typeof parsed === "object" && parsed !== null && "input" in parsed) {
    const input = parsed.input;
    if (typeof input === "string") {
      return input;
    }
    return stringifyUnknown2(input);
  }
  return rawArguments;
}
function toResponsesUsage(usage) {
  const inputTokens = usage?.prompt_tokens ?? 0;
  const outputTokens = usage?.completion_tokens ?? 0;
  const reasoningTokens = usage?.completion_tokens_details?.reasoning_tokens ?? usage?.reasoning_tokens ?? 0;
  return {
    input_tokens: inputTokens,
    output_tokens: outputTokens,
    total_tokens: usage?.total_tokens ?? inputTokens + outputTokens,
    output_tokens_details: {
      reasoning_tokens: reasoningTokens
    }
  };
}
var init_translate_response2 = __esm(() => {
  init_sse();
});

// packages/cli/src/lib/codex/nebius-call.ts
import { randomUUID as randomUUID9 } from "crypto";
async function callNebius(payload, options, modelDefinition, signal) {
  const result = await fetchNebiusChat(payload, options, modelDefinition, signal);
  if (!result.ok) {
    throw new Error(`Nebius API returned ${result.status}: ${result.text.slice(0, 1000)}`);
  }
  return await result.response.json();
}
async function callNebiusWithNativeTools(payload, toolTranslation, options, modelDefinition, signal) {
  if (toolTranslation.nativeTools.length === 0) {
    return callNebius(payload, options, modelDefinition, signal);
  }
  const messages = Array.isArray(payload.messages) ? [...payload.messages] : [];
  const nativeToolNames = new Set(toolTranslation.nativeTools.map((tool) => tool.modelName));
  const nativeToolUses = new Map;
  for (let iteration = 0;iteration < 6; iteration += 1) {
    const json = await callNebius({ ...payload, messages }, options, modelDefinition, signal);
    const toolCalls = json.choices?.[0]?.message?.tool_calls ?? [];
    const nativeToolCalls = toolCalls.filter((toolCall) => nativeToolNames.has(toolCall.function?.name ?? ""));
    if (nativeToolCalls.length === 0) {
      return json;
    }
    if (nativeToolCalls.length !== toolCalls.length) {
      const message = json.choices?.[0]?.message;
      if (message) {
        const nativeResults = [];
        for (const toolCall of nativeToolCalls) {
          const name = toolCall.function?.name ?? "web_search";
          const nativeTool = toolTranslation.mappings.get(name);
          const input = parseJsonOrEmpty2(toolCall.function?.arguments);
          const priorUses = nativeToolUses.get(name) ?? 0;
          const webSearchDefinition = nativeTool?.kind === "web_search" ? nativeTool.definition : undefined;
          const maxUses = webSearchDefinition !== undefined ? codexNativeToolMaxUses(webSearchDefinition) : 0;
          const result = await runNativeWebSearchCall({
            name,
            priorUses,
            maxUses,
            isWebSearch: webSearchDefinition !== undefined,
            recordUse: () => nativeToolUses.set(name, priorUses + 1),
            runSearch: () => runCodexWebSearch(input, webSearchDefinition, options)
          });
          nativeResults.push(`Native ${name} result:
${result}`);
        }
        message.tool_calls = toolCalls.filter((toolCall) => !nativeToolNames.has(toolCall.function?.name ?? ""));
        message.content = [message.content?.trim(), ...nativeResults].filter(Boolean).join(`

`) || null;
      }
      return json;
    }
    const reasoning = json.choices?.[0]?.message?.reasoning ?? json.choices?.[0]?.message?.reasoning_content;
    messages.push({
      role: "assistant",
      content: json.choices?.[0]?.message?.content ?? null,
      tool_calls: toolCalls.map((toolCall) => ({
        id: toolCall.id ?? `call_${randomUUID9().replaceAll("-", "")}`,
        type: "function",
        function: {
          name: toolCall.function?.name ?? "tool",
          arguments: toolCall.function?.arguments ?? "{}"
        }
      })),
      ...reasoning ? { reasoning_content: reasoning } : {}
    });
    for (const toolCall of nativeToolCalls) {
      const id = toolCall.id ?? `call_${randomUUID9().replaceAll("-", "")}`;
      const name = toolCall.function?.name ?? "web_search";
      const nativeTool = toolTranslation.mappings.get(name);
      const input = parseJsonOrEmpty2(toolCall.function?.arguments);
      const priorUses = nativeToolUses.get(name) ?? 0;
      const webSearchDefinition = nativeTool?.kind === "web_search" ? nativeTool.definition : undefined;
      const maxUses = webSearchDefinition !== undefined ? codexNativeToolMaxUses(webSearchDefinition) : 0;
      const result = await runNativeWebSearchCall({
        name,
        priorUses,
        maxUses,
        isWebSearch: webSearchDefinition !== undefined,
        recordUse: () => nativeToolUses.set(name, priorUses + 1),
        runSearch: () => runCodexWebSearch(input, webSearchDefinition, options)
      });
      messages.push({ role: "tool", tool_call_id: id, content: result });
    }
  }
  return {
    id: `chatcmpl_${randomUUID9().replaceAll("-", "")}`,
    choices: [
      {
        finish_reason: "stop",
        message: {
          content: "I could not complete native web search because the model kept requesting additional search tool calls."
        }
      }
    ]
  };
}
function isNebiusTemplateError(text) {
  return /process_messages_failed|not callable|apply chat template|invalid operation/i.test(text);
}
function cloneMessagesForRetry(messages) {
  const arr = Array.isArray(messages) ? messages : [];
  return arr.map((msg) => ({
    ...msg,
    ...msg.tool_calls ? {
      tool_calls: msg.tool_calls.map((tc) => ({
        ...tc,
        function: { ...tc.function }
      }))
    } : {}
  }));
}
function sanitizePayloadForTemplateRetry(payload) {
  const messages = cloneMessagesForRetry(payload.messages);
  let changed = false;
  for (const message of messages) {
    if (!message.tool_calls)
      continue;
    for (const toolCall of message.tool_calls) {
      try {
        const parsed = JSON.parse(toolCall.function.arguments);
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
          continue;
        let modified = false;
        for (const key of Object.keys(parsed)) {
          if (TEMPLATE_ERROR_DICT_METHODS.has(key)) {
            parsed[`_${key}`] = parsed[key];
            delete parsed[key];
            modified = true;
          }
        }
        if (modified) {
          toolCall.function.arguments = JSON.stringify(parsed);
          changed = true;
        }
      } catch {
      }
    }
  }
  if (changed) {
    payload.messages = messages;
  }
  return changed;
}
async function fetchNebiusChat(payload, options, modelDefinition, signal) {
  const first = await postNebiusChat(payload, options, modelDefinition, signal);
  if (first.ok) {
    return { ok: true, response: first };
  }
  const text = await first.text();
  if (isNebiusTemplateError(text)) {
    const sanitized = { ...payload };
    if (sanitizePayloadForTemplateRetry(sanitized)) {
      debugLog9(options, "retrying nebius request after template-error sanitization", {
        model: sanitized.model,
        originalError: text.slice(0, 1000)
      });
      const retry = await postNebiusChat(sanitized, options, modelDefinition, signal);
      if (retry.ok) {
        return { ok: true, response: retry };
      }
      return { ok: false, status: retry.status, text: await retry.text() };
    }
  }
  return { ok: false, status: first.status, text };
}
async function postNebiusChat(payload, options, modelDefinition, signal) {
  return postChatCompletion(payload, options, signal, { modelDefinition, debug: options.debug });
}
function debugLog9(options, label, payload) {
  writeProxyDebugLog("nebiusrelay codex proxy", options, label, payload);
}
var TEMPLATE_ERROR_DICT_METHODS;
var init_nebius_call2 = __esm(() => {
  init_proxy_debug();
  init_nebius_client();
  init_translate_request2();
  TEMPLATE_ERROR_DICT_METHODS = new Set([
    "items",
    "keys",
    "values",
    "get",
    "pop",
    "popitem",
    "setdefault",
    "update",
    "clear",
    "copy",
    "fromkeys"
  ]);
});

// packages/cli/src/lib/codex/usage.ts
function recordUsage(usage, options, modelDefinition) {
  if (!usage) {
    return;
  }
  options.costTracker?.addUsage(usage.prompt_tokens ?? 0, usage.prompt_tokens_details?.cached_tokens ?? usage.cached_tokens ?? 0, usage.completion_tokens ?? 0, modelDefinition);
}

// packages/cli/src/lib/codex/stream.ts
import { randomUUID as randomUUID10 } from "crypto";
async function streamResponseFromNebius(res, body, options, payload, toolTranslation, modelDefinition, signal, perf) {
  const responseId = `resp_${randomUUID10().replaceAll("-", "")}`;
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive"
  });
  res.flushHeaders?.();
  res.socket?.setNoDelay(true);
  writeResponsesSse(res, "response.created", {
    type: "response.created",
    response: {
      id: responseId,
      object: "response",
      created_at: Math.floor(Date.now() / 1000),
      status: "in_progress",
      model: body.model ?? options.modelId,
      output: []
    }
  });
  writeResponsesSse(res, "response.in_progress", {
    type: "response.in_progress",
    response: {
      id: responseId,
      object: "response",
      created_at: Math.floor(Date.now() / 1000),
      status: "in_progress",
      model: body.model ?? options.modelId,
      output: []
    }
  });
  const outputState = {
    nextOutputIndex: 0,
    reasoningText: "",
    text: ""
  };
  if (toolTranslation.nativeTools.length > 0) {
    return streamResponseWithNativeTools(res, body, options, payload, toolTranslation, modelDefinition, outputState, responseId, signal, perf);
  }
  let turn;
  try {
    turn = await streamNebiusTurnWithIdleRetries(res, body, options, payload, toolTranslation, modelDefinition, outputState, signal, perf);
  } catch (err) {
    if (err instanceof NebiusSsePrematureCloseError) {
      return failStream(res, responseId, 502, err.message);
    }
    if (err instanceof SseIdleTimeoutError || err instanceof NebiusSseIdleTimeoutError || err instanceof NebiusResponseHeaderTimeoutError) {
      return failStream(res, responseId, 504, err.message);
    }
    if (err instanceof NebiusSseRetryResponseError) {
      return failStream(res, responseId, err.response.status, `Nebius SSE retry returned ${err.response.status}: ${(await err.response.text()).slice(0, 1000)}`);
    }
    throw err;
  }
  if (!turn.ok) {
    return failStream(res, responseId, turn.status, turn.error);
  }
  return completeStreamResponse(res, body, options, responseId, outputState, turn.toolCalls, turn.usage, modelDefinition, toolTranslation, turn.finishReason);
}
async function streamNebiusTurn(res, body, options, payload, toolTranslation, modelDefinition, outputState, signal, perf) {
  const upstreamResult = await (perf?.span("upstream_fetch", () => fetchNebiusChat(payload, options, modelDefinition, signal), { stream: true }) ?? fetchNebiusChat(payload, options, modelDefinition, signal));
  if (!upstreamResult.ok) {
    const message = `Nebius API returned ${upstreamResult.status}: ${upstreamResult.text.slice(0, 1000)}`;
    return { ok: false, status: upstreamResult.status, error: message };
  }
  const upstream = upstreamResult.response;
  if (!upstream.body) {
    const message = "Nebius returned no stream body.";
    return { ok: false, status: 500, error: message };
  }
  const toolCalls = new Map;
  let usage;
  let reasoningText = "";
  let text = "";
  let finishReason;
  const turnStartedAt = Date.now();
  let lastProgressAt = Date.now();
  const progressTimeoutMs = codexStreamIdleTimeoutMs();
  const turnTimeoutMs = codexStreamTurnTimeoutMs();
  let streamAttempt = 0;
  for await (const eventData of readNebiusSseWithRetry(upstream, async () => {
    const retried = await fetchNebiusChat(payload, options, modelDefinition, signal);
    return retried.ok ? retried.response : new Response(retried.text, {
      status: retried.status,
      headers: { "content-type": "application/json" }
    });
  }, {
    isOutputStarted: () => streamOutputStarted(outputState),
    onRetry: ({ attempt, maxRetries, timeoutMs }) => debugLog10(options, "retrying nebius stream after idle timeout", {
      attempt,
      maxRetries,
      model: payload.model,
      timeoutMs
    })
  })) {
    if (eventData.attempt !== streamAttempt) {
      streamAttempt = eventData.attempt;
      toolCalls.clear();
      usage = undefined;
      reasoningText = "";
      text = "";
      finishReason = undefined;
      lastProgressAt = Date.now();
    }
    const chunk = eventData.data;
    assertStreamTurnDuration(turnStartedAt, turnTimeoutMs);
    if (chunk === "[DONE]") {
      break;
    }
    let parsed;
    try {
      parsed = JSON.parse(chunk);
    } catch {
      continue;
    }
    let madeProgress = false;
    if (parsed.usage) {
      usage = parsed.usage;
      madeProgress = true;
    }
    const choice = parsed.choices?.[0];
    if (choice?.finish_reason) {
      finishReason = choice.finish_reason;
    }
    const delta = choice?.delta;
    if (!delta) {
      assertStreamProgress(lastProgressAt, progressTimeoutMs);
      continue;
    }
    const reasoningDelta = delta.reasoning ?? delta.reasoning_content;
    if (reasoningDelta) {
      madeProgress = true;
      perf?.markOnce("first_delta", { kind: "reasoning" });
      openReasoningOutputItem(res, outputState);
      outputState.reasoningText += reasoningDelta;
      reasoningText += reasoningDelta;
      writeResponsesSse(res, "response.reasoning_text.delta", {
        type: "response.reasoning_text.delta",
        item_id: outputState.reasoningItemId,
        output_index: outputState.reasoningOutputIndex,
        content_index: 0,
        delta: reasoningDelta
      });
    }
    if (delta.content) {
      madeProgress = true;
      perf?.markOnce("first_delta", { kind: "text" });
      openTextOutputItem(res, outputState);
      outputState.text += delta.content;
      text += delta.content;
      writeResponsesSse(res, "response.output_text.delta", {
        type: "response.output_text.delta",
        item_id: outputState.textItemId,
        output_index: outputState.textOutputIndex,
        content_index: 0,
        delta: delta.content
      });
    }
    for (const toolCall of delta.tool_calls ?? []) {
      if (toolCall.id || toolCall.function?.name || toolCall.function?.arguments) {
        madeProgress = true;
        perf?.markOnce("first_delta", { kind: "tool_call" });
      }
      const index = toolCall.index ?? 0;
      const current = toolCalls.get(index) ?? {
        id: toolCall.id ?? `call_${randomUUID10().replaceAll("-", "")}`,
        name: "",
        arguments: ""
      };
      if (toolCall.id) {
        current.id = toolCall.id;
      }
      if (toolCall.function?.name) {
        current.name += toolCall.function.name;
      }
      if (toolCall.function?.arguments) {
        current.arguments += toolCall.function.arguments;
      }
      toolCalls.set(index, current);
    }
    if (madeProgress) {
      lastProgressAt = Date.now();
    } else {
      assertStreamProgress(lastProgressAt, progressTimeoutMs);
    }
  }
  if (!finishReason) {
    return { ok: false, status: 502, error: "Nebius stream ended without a finish reason." };
  }
  return { ok: true, toolCalls: [...toolCalls.values()], usage, reasoningText, text, finishReason };
}
function assertStreamProgress(lastProgressAt, timeoutMs) {
  if (Date.now() - lastProgressAt > timeoutMs) {
    throw new SseIdleTimeoutError(timeoutMs);
  }
}
function assertStreamTurnDuration(startedAt, timeoutMs) {
  if (Date.now() - startedAt > timeoutMs) {
    throw new SseIdleTimeoutError(timeoutMs, "turn");
  }
}
async function streamResponseWithNativeTools(res, body, options, payload, toolTranslation, modelDefinition, outputState, responseId, signal, perf) {
  const messages = Array.isArray(payload.messages) ? [...payload.messages] : [];
  const nativeToolNames = new Set(toolTranslation.nativeTools.map((tool) => tool.modelName));
  const nativeToolUses = new Map;
  let usage;
  let lastFinishReason;
  for (let iteration = 0;iteration < 6; iteration += 1) {
    let turn;
    try {
      turn = await streamNebiusTurnWithIdleRetries(res, body, options, { ...payload, messages, stream: true, stream_options: { include_usage: true } }, toolTranslation, modelDefinition, outputState, signal, perf);
    } catch (err) {
      if (err instanceof NebiusSsePrematureCloseError) {
        return failStream(res, responseId, 502, err.message);
      }
      if (err instanceof SseIdleTimeoutError || err instanceof NebiusSseIdleTimeoutError || err instanceof NebiusResponseHeaderTimeoutError) {
        return failStream(res, responseId, 504, err.message);
      }
      if (err instanceof NebiusSseRetryResponseError) {
        return failStream(res, responseId, err.response.status, `Nebius SSE retry returned ${err.response.status}: ${(await err.response.text()).slice(0, 1000)}`);
      }
      throw err;
    }
    if (!turn.ok) {
      return failStream(res, responseId, turn.status, turn.error);
    }
    usage = mergeUsage(usage, turn.usage);
    lastFinishReason = turn.finishReason;
    const nativeToolCalls = turn.toolCalls.filter((toolCall) => nativeToolNames.has(toolCall.name));
    if (nativeToolCalls.length === 0) {
      return completeStreamResponse(res, body, options, responseId, outputState, turn.toolCalls, usage, modelDefinition, toolTranslation, turn.finishReason);
    }
    const assistantToolCalls = turn.toolCalls.map((toolCall) => ({
      id: toolCall.id,
      type: "function",
      function: {
        name: toolCall.name || "tool",
        arguments: toolCall.arguments || "{}"
      }
    }));
    const nativeResultMessages = await runNativeToolCalls(nativeToolCalls, nativeToolUses, toolTranslation, options);
    if (nativeToolCalls.length !== turn.toolCalls.length) {
      const nativeText = nativeResultMessages.map((message) => `Native ${toolTranslation.mappings.get(message.name)?.sourceName ?? message.name} result:
${message.content}`).join(`

`);
      if (nativeText) {
        openTextOutputItem(res, outputState);
        const delta = `${outputState.text ? `

` : ""}${nativeText}`;
        outputState.text += delta;
        writeResponsesSse(res, "response.output_text.delta", {
          type: "response.output_text.delta",
          item_id: outputState.textItemId,
          output_index: outputState.textOutputIndex,
          content_index: 0,
          delta
        });
      }
      const clientToolCalls = turn.toolCalls.filter((toolCall) => !nativeToolNames.has(toolCall.name));
      return completeStreamResponse(res, body, options, responseId, outputState, clientToolCalls, usage, modelDefinition, toolTranslation, turn.finishReason);
    }
    messages.push({
      role: "assistant",
      content: turn.text || null,
      tool_calls: assistantToolCalls,
      ...turn.reasoningText ? { reasoning_content: turn.reasoningText } : {}
    });
    for (const result of nativeResultMessages) {
      messages.push({ role: "tool", tool_call_id: result.id, content: result.content });
    }
  }
  openTextOutputItem(res, outputState);
  const fallback = "I could not complete native web search because the model kept requesting additional search tool calls.";
  outputState.text += fallback;
  writeResponsesSse(res, "response.output_text.delta", {
    type: "response.output_text.delta",
    item_id: outputState.textItemId,
    output_index: outputState.textOutputIndex,
    content_index: 0,
    delta: fallback
  });
  return completeStreamResponse(res, body, options, responseId, outputState, [], usage, modelDefinition, toolTranslation, lastFinishReason);
}
async function streamNebiusTurnWithIdleRetries(res, body, options, payload, toolTranslation, modelDefinition, outputState, signal, perf) {
  const maxRetries = codexStreamIdleRetries();
  for (let attempt = 0;attempt <= maxRetries; attempt += 1) {
    try {
      return await streamNebiusTurn(res, body, options, payload, toolTranslation, modelDefinition, outputState, signal, perf);
    } catch (err) {
      if (!(err instanceof SseIdleTimeoutError) || streamOutputStarted(outputState) || attempt >= maxRetries) {
        throw err;
      }
      debugLog10(options, "retrying nebius stream after idle timeout", {
        attempt,
        maxRetries,
        model: payload.model,
        timeoutMs: err.timeoutMs
      });
      await sleep(backoffMs(attempt));
    }
  }
  throw new SseIdleTimeoutError(codexStreamIdleTimeoutMs());
}
function streamOutputStarted(outputState) {
  return outputState.reasoningItemId !== undefined || outputState.textItemId !== undefined;
}
async function runNativeToolCalls(nativeToolCalls, nativeToolUses, toolTranslation, options) {
  const results = [];
  for (const toolCall of nativeToolCalls) {
    const name = toolCall.name || "web_search";
    const nativeTool = toolTranslation.mappings.get(name);
    const input = parseJsonOrEmpty2(toolCall.arguments);
    const priorUses = nativeToolUses.get(name) ?? 0;
    const webSearchDefinition = nativeTool?.kind === "web_search" ? nativeTool.definition : undefined;
    const maxUses = webSearchDefinition !== undefined ? codexNativeToolMaxUses(webSearchDefinition) : 0;
    const content = await runNativeWebSearchCall({
      name,
      priorUses,
      maxUses,
      isWebSearch: webSearchDefinition !== undefined,
      recordUse: () => nativeToolUses.set(name, priorUses + 1),
      runSearch: () => runCodexWebSearch(input, webSearchDefinition, options)
    });
    results.push({ id: toolCall.id, name, content });
  }
  return results;
}
function completeOpenOutputItems(res, outputState) {
  if (outputState.reasoningItemId !== undefined) {
    writeResponsesSse(res, "response.reasoning_text.done", {
      type: "response.reasoning_text.done",
      item_id: outputState.reasoningItemId,
      output_index: outputState.reasoningOutputIndex,
      content_index: 0,
      text: outputState.reasoningText
    });
    writeResponsesSse(res, "response.output_item.done", {
      type: "response.output_item.done",
      output_index: outputState.reasoningOutputIndex,
      item: reasoningOutputItem(outputState.reasoningItemId)
    });
  }
  if (outputState.textItemId !== undefined) {
    writeResponsesSse(res, "response.output_text.done", {
      type: "response.output_text.done",
      item_id: outputState.textItemId,
      output_index: outputState.textOutputIndex,
      content_index: 0,
      text: outputState.text
    });
    writeResponsesSse(res, "response.content_part.done", {
      type: "response.content_part.done",
      item_id: outputState.textItemId,
      output_index: outputState.textOutputIndex,
      content_index: 0,
      part: { type: "output_text", text: outputState.text, annotations: [] }
    });
    writeResponsesSse(res, "response.output_item.done", {
      type: "response.output_item.done",
      output_index: outputState.textOutputIndex,
      item: messageOutputItem(outputState.text, outputState.textItemId)
    });
  }
}
function completeStreamResponse(res, body, options, responseId, outputState, toolCalls, usage, modelDefinition, toolTranslation, finishReason) {
  completeOpenOutputItems(res, outputState);
  let outputIndex = outputState.nextOutputIndex;
  for (const toolCall of toolCalls) {
    const item = responseToolCallOutputItem(toolCall, toolTranslation);
    writeResponsesSse(res, "response.output_item.added", {
      type: "response.output_item.added",
      output_index: outputIndex,
      item
    });
    writeResponsesSse(res, "response.output_item.done", {
      type: "response.output_item.done",
      output_index: outputIndex,
      item
    });
    outputIndex += 1;
  }
  if (usage) {
    recordUsage(usage, options, modelDefinition);
  }
  const isLengthTruncated = finishReason === "length";
  writeResponsesSse(res, "response.completed", {
    type: "response.completed",
    response: {
      id: responseId,
      object: "response",
      created_at: Math.floor(Date.now() / 1000),
      status: isLengthTruncated ? "incomplete" : "completed",
      model: body.model ?? options.modelId,
      output: [
        ...outputState.reasoningItemId !== undefined ? [reasoningOutputItem(outputState.reasoningItemId)] : [],
        ...outputState.textItemId !== undefined ? [messageOutputItem(outputState.text, outputState.textItemId)] : [],
        ...[...toolCalls.values()].map((toolCall) => responseToolCallOutputItem(toolCall, toolTranslation))
      ],
      usage: toResponsesUsage(usage),
      ...isLengthTruncated ? { incomplete_details: { reason: "max_output_tokens" } } : {}
    }
  });
  res.end();
  return { ok: true, status: res.statusCode };
}
function failStream(res, responseId, status, message) {
  writeResponsesSse(res, "response.failed", {
    type: "response.failed",
    response: { id: responseId, status: "failed" },
    error: { message }
  });
  res.end();
  return { ok: false, status, error: message };
}
function mergeUsage(current, next) {
  if (!current) {
    return next;
  }
  if (!next) {
    return current;
  }
  const cachedTokens = (current.prompt_tokens_details?.cached_tokens ?? current.cached_tokens ?? 0) + (next.prompt_tokens_details?.cached_tokens ?? next.cached_tokens ?? 0);
  const reasoningTokens = (current.completion_tokens_details?.reasoning_tokens ?? current.reasoning_tokens ?? 0) + (next.completion_tokens_details?.reasoning_tokens ?? next.reasoning_tokens ?? 0);
  return {
    prompt_tokens: (current.prompt_tokens ?? 0) + (next.prompt_tokens ?? 0),
    completion_tokens: (current.completion_tokens ?? 0) + (next.completion_tokens ?? 0),
    total_tokens: (current.total_tokens ?? 0) + (next.total_tokens ?? 0),
    cached_tokens: cachedTokens,
    reasoning_tokens: reasoningTokens,
    prompt_tokens_details: { cached_tokens: cachedTokens },
    completion_tokens_details: { reasoning_tokens: reasoningTokens }
  };
}
function codexStreamIdleTimeoutMs() {
  const raw = process.env.NEBIUSRELAY_STREAM_IDLE_TIMEOUT_MS ?? process.env.NEBIUSRELAY_CODEX_STREAM_IDLE_TIMEOUT_MS;
  const parsed = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? Math.max(100, parsed) : DEFAULT_CODEX_STREAM_IDLE_TIMEOUT_MS;
}
function codexStreamTurnTimeoutMs() {
  const raw = process.env.NEBIUSRELAY_CODEX_STREAM_TURN_TIMEOUT_MS;
  const parsed = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? Math.max(100, parsed) : DEFAULT_CODEX_STREAM_TURN_TIMEOUT_MS;
}
function codexStreamIdleRetries() {
  const raw = process.env.NEBIUSRELAY_CODEX_STREAM_IDLE_RETRIES;
  const parsed = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : MAX_NEBIUS_STREAM_IDLE_RETRIES;
}
function debugLog10(options, label, payload) {
  writeProxyDebugLog("nebiusrelay codex proxy", options, label, payload);
}
var MAX_NEBIUS_STREAM_IDLE_RETRIES = 3, DEFAULT_CODEX_STREAM_IDLE_TIMEOUT_MS = 120000, DEFAULT_CODEX_STREAM_TURN_TIMEOUT_MS = 600000, SseIdleTimeoutError;
var init_stream2 = __esm(() => {
  init_proxy_debug();
  init_nebius_client();
  init_nebius_stream();
  init_sse();
  init_translate_request2();
  init_translate_response2();
  init_nebius_call2();
  SseIdleTimeoutError = class SseIdleTimeoutError extends Error {
    timeoutMs;
    kind;
    constructor(timeoutMs, kind = "idle") {
      super(kind === "turn" ? `Nebius stream exceeded maximum turn duration of ${timeoutMs}ms.` : `Nebius stream produced no SSE event for ${timeoutMs}ms.`);
      this.timeoutMs = timeoutMs;
      this.kind = kind;
      this.name = "SseIdleTimeoutError";
    }
  };
});

// packages/cli/src/lib/codex/proxy.ts
async function handleCodexProxyRequest(req, res, options) {
  const path8 = requestPath(req);
  const perf = createProxyPerfTracer("codex.proxy", {
    method: req.method,
    path: path8
  }, options.perfSink);
  debugLog11(options, "http request", { method: req.method, url: req.url, path: path8 });
  if (req.method === "HEAD" && path8 === "/") {
    res.writeHead(200);
    res.end();
    return;
  }
  if (req.method === "GET" && path8 === "/v1/models") {
    writeJson(res, 200, codexModelCatalog());
    return;
  }
  if (req.method !== "POST" || path8 !== "/v1/responses") {
    writeOpenAIError(res, 404, "not_found_error", `Unsupported route ${req.method ?? ""} ${req.url ?? ""}`.trim());
    return;
  }
  const { body: parsedBody, rawBytes } = await perf.span("body_read_parse", () => readJsonBodyWithSize(req));
  const body = parsedBody;
  options.costTracker?.noteRequestBytes(rawBytes);
  options.costTracker?.beginRequest();
  const estimatedInputTokens = options.costTracker?.tokenEstimator.estimate(rawBytes) ?? Math.ceil(rawBytes / 4);
  const translated = perf.spanSync("translate_request", () => {
    const toolTranslation2 = translateCodexRequestTools(body);
    const nativeToolCount2 = toolTranslation2.nativeTools.length;
    const requestModel2 = resolveCodexRequestModel(body, options);
    if (!requestModel2.memory) {
      recordAgentModel("codex", requestModel2.targetModelId);
    }
    const translatedPayload2 = toChatPayload(body, options, Boolean(body.stream), toolTranslation2, requestModel2, estimatedInputTokens);
    return { nativeToolCount: nativeToolCount2, toolTranslation: toolTranslation2, requestModel: requestModel2, translatedPayload: translatedPayload2 };
  });
  const { nativeToolCount, toolTranslation, requestModel, translatedPayload } = translated;
  const upstreamAbort = new AbortController;
  const markClientDisconnected = () => {
    upstreamAbort.abort();
  };
  req.once("aborted", markClientDisconnected);
  res.once("close", () => {
    if (!res.writableEnded) {
      markClientDisconnected();
    }
  });
  debugLog11(options, "responses request", () => ({
    model: body.model,
    targetModel: requestModel.targetModelId,
    memory: requestModel.memory,
    stream: body.stream,
    inputItems: Array.isArray(body.input) ? body.input.length : typeof body.input,
    toolCount: body.tools?.length ?? 0,
    nativeToolCount,
    tools: summarizeResponsesTools(body.tools)
  }));
  if (body.stream) {
    await perf.span("stream_response", () => streamResponseFromNebius(res, body, options, translatedPayload, toolTranslation, requestModel.definition, upstreamAbort.signal, perf), { nativeToolCount });
    perf.end({ status: res.statusCode, stream: true });
    return;
  }
  const chatResponse = await perf.span("upstream_fetch_and_tool_loop", () => callNebiusWithNativeTools(translatedPayload, toolTranslation, options, requestModel.definition, upstreamAbort.signal), { nativeToolCount });
  recordUsage(chatResponse.usage, options, requestModel.definition);
  const responseBody = perf.spanSync("response_map", () => toResponsesResponse(chatResponse, body, options, toolTranslation));
  writeJson(res, 200, responseBody);
  perf.end({ status: res.statusCode, stream: false });
}
function summarizeResponsesTools(tools) {
  if (!tools || tools.length === 0) {
    return;
  }
  return tools.map((tool) => ({
    name: tool.name,
    type: tool.type,
    parameterKeys: objectKeys2(tool.parameters),
    rawKeys: Object.keys(tool)
  }));
}
function writeOpenAIError(res, status, type, message) {
  writeJson(res, status, { error: { type, message } });
}
function debugLog11(options, label, payload) {
  writeProxyDebugLog("nebiusrelay codex proxy", options, label, payload);
}
var init_proxy2 = __esm(() => {
  init_catalog();
  init_proxy_perf();
  init_http_util();
  init_proxy_debug();
  init_model_preferences();
  init_translate_request2();
  init_translate_response2();
  init_nebius_call2();
  init_stream2();
});

// packages/cli/src/lib/daemon/app-registration.ts
import { mkdir as mkdir3, readFile as readFile2, rename as rename2, rm, writeFile as writeFile2 } from "fs/promises";
import path8 from "path";
function appRegistrationPath(home = nebiusrelayHome2()) {
  return path8.join(home, "codex-app", REGISTRATION_FILE);
}
async function writeAppRegistration(registration, home = nebiusrelayHome2()) {
  const file = appRegistrationPath(home);
  await mkdir3(path8.dirname(file), { recursive: true });
  const tmp = `${file}.tmp-${process.pid}`;
  await writeFile2(tmp, `${JSON.stringify(registration, null, 2)}
`, {
    encoding: "utf8",
    mode: 384
  });
  await rename2(tmp, file);
}
async function clearAppRegistration(home = nebiusrelayHome2()) {
  await rm(appRegistrationPath(home), { force: true });
}
async function readAppRegistration(home = nebiusrelayHome2()) {
  let raw;
  try {
    raw = await readFile2(appRegistrationPath(home), "utf8");
  } catch {
    return;
  }
  try {
    const parsed = JSON.parse(raw);
    const valid = typeof parsed.token === "string" && parsed.token !== "" && typeof parsed.apiKey === "string" && parsed.apiKey !== "" && typeof parsed.modelLabel === "string" && parsed.modelLabel !== "" && typeof parsed.modelDefinition === "object" && parsed.modelDefinition !== null && typeof parsed.modelId === "string" && parsed.modelId !== "" && typeof parsed.targetModelId === "string" && parsed.targetModelId !== "";
    if (valid) {
      return parsed;
    }
  } catch {
  }
  return;
}
var REGISTRATION_FILE = "registration.json";
var init_app_registration = __esm(() => {
  init_paths();
});

// packages/cli/src/lib/model-catalog-init.ts
import path9 from "path";
function cachePath(home) {
  return path9.join(nebiusrelayHome(home), "model-catalog.json");
}
async function initModelCatalog(options = {}) {
  if (inFlight && !options.force) {
    return inFlight;
  }
  const run = loadCatalog(options).catch(() => {
  });
  inFlight = run;
  return run;
}
async function loadCatalog(options) {
  const home = options.home;
  const now = options.now ?? Date.now();
  const baseUrl = (options.baseUrl ?? NEBIUS_BASE_URL).replace(/\/$/, "");
  const file = cachePath(home);
  const cached = await readJsonIfExists(file);
  const cacheFresh = cached && Array.isArray(cached.models) && cached.models.length > 0 && cached.baseUrl === baseUrl && now - cached.fetchedAt < CACHE_TTL_MS;
  if (cacheFresh && !options.force) {
    applyCatalog(buildCatalog(cached.models));
    return;
  }
  const apiKey = await resolveNebiusApiKey({
    ...options.apiKey !== undefined ? { apiKey: options.apiKey } : {},
    ...home !== undefined ? { home } : {}
  });
  if (!apiKey) {
    if (cached && Array.isArray(cached.models) && cached.models.length > 0) {
      applyCatalog(buildCatalog(cached.models));
    }
    return;
  }
  const models = await fetchVerboseModels(apiKey, baseUrl);
  if (models.length === 0) {
    if (cached && Array.isArray(cached.models) && cached.models.length > 0) {
      applyCatalog(buildCatalog(cached.models));
    }
    return;
  }
  applyCatalog(buildCatalog(models));
  await writeJsonAtomic(file, {
    fetchedAt: now,
    baseUrl,
    models
  }).catch(() => {
  });
}
async function fetchVerboseModels(apiKey, baseUrl) {
  const controller = new AbortController;
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(`${baseUrl}/models?verbose=true`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: controller.signal
    });
    if (!res.ok) {
      return [];
    }
    const body = await res.json();
    return Array.isArray(body.data) ? body.data : [];
  } finally {
    clearTimeout(timer);
  }
}
var CACHE_TTL_MS, FETCH_TIMEOUT_MS = 3000, inFlight;
var init_model_catalog_init = __esm(() => {
  init_dist3();
  init_global_config();
  init_nebius_core();
  CACHE_TTL_MS = 6 * 60 * 60 * 1000;
});

// packages/cli/src/lib/cost.ts
function pricingFor(model) {
  return {
    inputPerToken: costPerToken(model.cost.input),
    cachedInputPerToken: costPerToken(model.cost.cache_read),
    outputPerToken: costPerToken(model.cost.output)
  };
}

class CostTracker {
  defaultMainModel;
  promptTokens = 0;
  cachedTokens = 0;
  completionTokens = 0;
  costUsd = 0;
  byModel = new Map;
  visionCalls = 0;
  visionPromptTokens = 0;
  visionCompletionTokens = 0;
  visionCostUsd = 0;
  externalSummary;
  requestStartCost = 0;
  requestStartPrompt = 0;
  requestStartCached = 0;
  requestStartCompletion = 0;
  lastRequestRawBytes;
  bytesPerToken;
  pendingCalibration = false;
  estimator = {
    estimate: (bytes) => {
      const ratio = this.bytesPerToken ?? APPROX_CHARS_PER_TOKEN;
      return Math.max(1, Math.ceil(bytes / ratio));
    }
  };
  constructor(mainModel = getDefaultModel()) {
    this.defaultMainModel = mainModel;
  }
  beginRequest() {
    this.requestStartCost = this.costUsd;
    this.requestStartPrompt = this.promptTokens;
    this.requestStartCached = this.cachedTokens;
    this.requestStartCompletion = this.completionTokens;
    this.pendingCalibration = true;
  }
  noteRequestBytes(rawBytes) {
    this.lastRequestRawBytes = rawBytes > 0 ? rawBytes : undefined;
  }
  get tokenEstimator() {
    return this.estimator;
  }
  addUsage(promptTokens, cachedTokens, completionTokens, model = this.defaultMainModel) {
    if (this.pendingCalibration) {
      this.pendingCalibration = false;
      if (this.lastRequestRawBytes !== undefined && promptTokens >= MIN_CALIBRATION_PROMPT_TOKENS) {
        const ratio = this.lastRequestRawBytes / promptTokens;
        if (Number.isFinite(ratio) && ratio > 0) {
          this.bytesPerToken = Math.min(MAX_BYTES_PER_TOKEN, Math.max(MIN_BYTES_PER_TOKEN, ratio));
        }
      }
    }
    const pricing = pricingFor(model);
    const cached = Math.max(0, Math.min(cachedTokens, promptTokens));
    const nonCachedInput = Math.max(0, promptTokens - cached);
    const cost = nonCachedInput * pricing.inputPerToken + cached * pricing.cachedInputPerToken + completionTokens * pricing.outputPerToken;
    this.promptTokens += promptTokens;
    this.cachedTokens += cached;
    this.completionTokens += completionTokens;
    this.costUsd += cost;
    const bucket = this.byModel.get(model.id) ?? {
      promptTokens: 0,
      cachedTokens: 0,
      completionTokens: 0,
      costUsd: 0
    };
    bucket.promptTokens += promptTokens;
    bucket.cachedTokens += cached;
    bucket.completionTokens += completionTokens;
    bucket.costUsd += cost;
    this.byModel.set(model.id, bucket);
    return cost;
  }
  addVisionUsage(model, promptTokens, completionTokens) {
    const definition = findModelById(model);
    if (!definition) {
      return 0;
    }
    const cost = promptTokens * costPerToken(definition.cost.input) + completionTokens * costPerToken(definition.cost.output);
    this.visionCalls += 1;
    this.visionPromptTokens += promptTokens;
    this.visionCompletionTokens += completionTokens;
    this.visionCostUsd += cost;
    this.costUsd += cost;
    const bucket = this.byModel.get(model) ?? {
      promptTokens: 0,
      cachedTokens: 0,
      completionTokens: 0,
      costUsd: 0
    };
    bucket.promptTokens += promptTokens;
    bucket.completionTokens += completionTokens;
    bucket.costUsd += cost;
    this.byModel.set(model, bucket);
    return cost;
  }
  setExternalSummary(summary) {
    this.externalSummary = summary;
  }
  hydrateUsage(totals, externalSummary) {
    this.promptTokens = totals.promptTokens ?? 0;
    this.cachedTokens = Math.max(0, Math.min(totals.cachedTokens ?? 0, this.promptTokens));
    this.completionTokens = totals.completionTokens ?? 0;
    this.costUsd = totals.costUsd ?? 0;
    this.externalSummary = externalSummary;
    this.byModel.set(this.defaultMainModel.id, { ...this.totals });
    this.beginRequest();
  }
  get totals() {
    return {
      promptTokens: this.promptTokens,
      cachedTokens: this.cachedTokens,
      completionTokens: this.completionTokens,
      costUsd: this.costUsd
    };
  }
  get totalsByModel() {
    return Array.from(this.byModel.entries()).map(([model, usage]) => ({ model, ...usage }));
  }
  get requestDelta() {
    return {
      promptTokens: this.promptTokens - this.requestStartPrompt,
      cachedTokens: this.cachedTokens - this.requestStartCached,
      completionTokens: this.completionTokens - this.requestStartCompletion,
      costUsd: this.costUsd - this.requestStartCost
    };
  }
  summarize() {
    if (this.externalSummary) {
      return this.externalSummary;
    }
    const main = `[nebiusrelay cost] session total: $${this.costUsd.toFixed(4)} ` + `(${this.formatTokens(this.promptTokens)} in` + (this.cachedTokens > 0 ? ` incl ${this.formatTokens(this.cachedTokens)} cached` : "") + `, ${this.formatTokens(this.completionTokens)} out)`;
    if (this.visionCalls > 0) {
      return `${main}
[nebiusrelay cost] vision: ${this.visionCalls} image(s), ` + `$${this.visionCostUsd.toFixed(4)} ` + `(${this.formatTokens(this.visionPromptTokens)} in, ${this.formatTokens(this.visionCompletionTokens)} out)`;
    }
    return main;
  }
  formatTokens(n) {
    return n.toLocaleString("en-US");
  }
}
var MIN_CALIBRATION_PROMPT_TOKENS = 64, MIN_BYTES_PER_TOKEN = 1, MAX_BYTES_PER_TOKEN = 16;
var init_cost = __esm(() => {
  init_dist3();
  init_context_budget();
});

// packages/cli/src/lib/daemon/storage.ts
import { chmod as chmod2, mkdir as mkdir4 } from "fs/promises";
import path10 from "path";
async function createSessionStore(home = nebiusrelayHome2()) {
  await mkdir4(home, { recursive: true });
  const sqlite = await openSqlite(path10.join(home, DATABASE_FILE));
  if (sqlite) {
    await chmod2(path10.join(home, DATABASE_FILE), 384).catch(() => {
    });
    try {
      return new ResilientSessionStore(new SqliteSessionStore(sqlite));
    } catch (err) {
      sqlite.close?.();
      warnStoreError("initialize sqlite session store", err);
    }
  }
  return new ResilientSessionStore(new MemorySessionStore);
}
async function openSqlite(file) {
  const dynamicImport = new Function("specifier", "return import(specifier)");
  const preferBun = typeof globalThis.Bun !== "undefined";
  const attempts = preferBun ? ["bun:sqlite", "node:sqlite"] : ["node:sqlite", "bun:sqlite"];
  for (const specifier of attempts) {
    try {
      const mod = await dynamicImport(specifier);
      if (specifier === "bun:sqlite" && typeof mod.Database === "function") {
        return new BunSqliteDatabase(new mod.Database(file));
      }
      if (specifier === "node:sqlite" && typeof mod.DatabaseSync === "function") {
        return new NodeSqliteDatabase(new mod.DatabaseSync(file));
      }
    } catch {
    }
  }
  return;
}

class BunSqliteDatabase {
  db;
  constructor(db) {
    this.db = db;
  }
  exec(sql) {
    this.db.exec(sql);
  }
  prepare(sql) {
    const statement = this.db.query(sql);
    return {
      run: (...params) => statement.run(...params),
      get: (...params) => statement.get(...params),
      all: (...params) => statement.all(...params)
    };
  }
  close() {
    this.db.close?.();
  }
}

class NodeSqliteDatabase {
  db;
  constructor(db) {
    this.db = db;
  }
  exec(sql) {
    this.db.exec(sql);
  }
  prepare(sql) {
    const statement = this.db.prepare(sql);
    return {
      run: (...params) => statement.run(...params),
      get: (...params) => statement.get(...params),
      all: (...params) => statement.all(...params)
    };
  }
  close() {
    this.db.close?.();
  }
}

class ResilientSessionStore {
  inner;
  kind;
  constructor(inner) {
    this.inner = inner;
    this.kind = inner.kind;
  }
  restoreActiveSessions() {
    try {
      return this.inner.restoreActiveSessions();
    } catch (err) {
      warnStoreError("restore sessions", err);
      return [];
    }
  }
  upsertSession(session) {
    this.write("persist session", () => this.inner.upsertSession(session));
  }
  markSessionEnded(token, endedAt, costSummary, costTotals) {
    this.write("mark session ended", () => this.inner.markSessionEnded(token, endedAt, costSummary, costTotals));
  }
  updateSessionPid(token, pid) {
    this.write("update session pid", () => this.inner.updateSessionPid(token, pid));
  }
  updateSessionUsage(token, costSummary, costTotals, externalSummary) {
    this.write("update session usage", () => this.inner.updateSessionUsage(token, costSummary, costTotals, externalSummary));
  }
  updateSessionLastSeen(token, lastSeenAt) {
    this.write("update session last seen", () => this.inner.updateSessionLastSeen(token, lastSeenAt));
  }
  close() {
    try {
      this.inner.close();
    } catch (err) {
      warnStoreError("close session store", err);
    }
  }
  write(action, fn) {
    try {
      fn();
    } catch (err) {
      warnStoreError(action, err);
    }
  }
}
function warnStoreError(action, err) {
  const message = err instanceof Error ? err.message : String(err);
  process.stderr.write(`[nebiusrelay daemon] Could not ${action}: ${message}
`);
}

class SqliteSessionStore {
  db;
  kind = "sqlite";
  constructor(db) {
    this.db = db;
    this.migrate();
  }
  restoreActiveSessions() {
    const rows = this.db.prepare("SELECT * FROM sessions WHERE ended_at IS NULL ORDER BY started_at ASC").all();
    return rows.map((row) => this.toStoredSession(row));
  }
  upsertSession(session) {
    this.db.prepare(`
        INSERT INTO sessions (
          token, agent, pid, started_at, last_seen_at, ended_at, model_label, api_key, base_url,
          auth_token,
          model_id, target_model_id, model_name, model_definition_json,
          claude_code_max_output_tokens, claude_code_max_output_tokens_user_set, debug,
          prompt_tokens, cached_tokens, completion_tokens, cost_usd, cost_summary,
          external_summary, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(token) DO UPDATE SET
          agent = excluded.agent,
          pid = excluded.pid,
          started_at = excluded.started_at,
          last_seen_at = excluded.last_seen_at,
          ended_at = excluded.ended_at,
          model_label = excluded.model_label,
          api_key = excluded.api_key,
          base_url = excluded.base_url,
          auth_token = excluded.auth_token,
          model_id = excluded.model_id,
          target_model_id = excluded.target_model_id,
          model_name = excluded.model_name,
          model_definition_json = excluded.model_definition_json,
          claude_code_max_output_tokens = excluded.claude_code_max_output_tokens,
          claude_code_max_output_tokens_user_set = excluded.claude_code_max_output_tokens_user_set,
          debug = excluded.debug,
          prompt_tokens = excluded.prompt_tokens,
          cached_tokens = excluded.cached_tokens,
          completion_tokens = excluded.completion_tokens,
          cost_usd = excluded.cost_usd,
          cost_summary = excluded.cost_summary,
          external_summary = excluded.external_summary,
          updated_at = excluded.updated_at
      `).run(...sessionParams(session, Date.now()));
  }
  markSessionEnded(token, endedAt, costSummary, costTotals) {
    this.db.prepare(`
        UPDATE sessions
        SET ended_at = ?, prompt_tokens = ?, cached_tokens = ?, completion_tokens = ?,
            cost_usd = ?, cost_summary = ?, updated_at = ?
        WHERE token = ?
      `).run(endedAt, costTotals.promptTokens, costTotals.cachedTokens, costTotals.completionTokens, costTotals.costUsd, costSummary, Date.now(), token);
  }
  updateSessionPid(token, pid) {
    this.db.prepare("UPDATE sessions SET pid = ?, updated_at = ? WHERE token = ?").run(pid, Date.now(), token);
  }
  updateSessionUsage(token, costSummary, costTotals, externalSummary) {
    this.db.prepare(`
        UPDATE sessions
        SET prompt_tokens = ?, cached_tokens = ?, completion_tokens = ?, cost_usd = ?,
            cost_summary = ?, external_summary = COALESCE(?, external_summary), updated_at = ?
        WHERE token = ?
      `).run(costTotals.promptTokens, costTotals.cachedTokens, costTotals.completionTokens, costTotals.costUsd, costSummary, externalSummary ?? null, Date.now(), token);
  }
  updateSessionLastSeen(token, lastSeenAt) {
    this.db.prepare("UPDATE sessions SET last_seen_at = ?, updated_at = ? WHERE token = ?").run(lastSeenAt, Date.now(), token);
  }
  close() {
    this.db.close?.();
  }
  migrate() {
    this.db.exec(`
      PRAGMA journal_mode = WAL;
      PRAGMA synchronous = NORMAL;

      CREATE TABLE IF NOT EXISTS sessions (
        token TEXT PRIMARY KEY,
        agent TEXT NOT NULL,
        pid INTEGER,
        started_at INTEGER NOT NULL,
        last_seen_at INTEGER,
        ended_at INTEGER,
        model_label TEXT NOT NULL,
        api_key TEXT NOT NULL,
        base_url TEXT,
        auth_token TEXT,
        model_id TEXT,
        target_model_id TEXT,
        model_name TEXT,
        model_definition_json TEXT NOT NULL,
        claude_code_max_output_tokens INTEGER,
        claude_code_max_output_tokens_user_set INTEGER,
        debug INTEGER,
        prompt_tokens INTEGER NOT NULL DEFAULT 0,
        cached_tokens INTEGER NOT NULL DEFAULT 0,
        completion_tokens INTEGER NOT NULL DEFAULT 0,
        cost_usd REAL NOT NULL DEFAULT 0,
        cost_summary TEXT NOT NULL DEFAULT '',
        external_summary TEXT,
        updated_at INTEGER NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_sessions_ended_at ON sessions(ended_at DESC);
    `);
    this.addColumnIfMissing("sessions", "last_seen_at", "INTEGER");
    this.addColumnIfMissing("sessions", "base_url", "TEXT");
    this.addColumnIfMissing("sessions", "claude_code_max_output_tokens", "INTEGER");
    this.addColumnIfMissing("sessions", "claude_code_max_output_tokens_user_set", "INTEGER");
  }
  addColumnIfMissing(table, column, type) {
    try {
      this.db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}`);
    } catch {
    }
  }
  toStoredSession(row) {
    const session = rowToSessionBase(row);
    return {
      ...session,
      promptTokens: row.prompt_tokens,
      cachedTokens: row.cached_tokens,
      completionTokens: row.completion_tokens,
      costUsd: row.cost_usd,
      ...row.external_summary ? { externalSummary: row.external_summary } : {}
    };
  }
}

class MemorySessionStore {
  kind = "memory";
  restoreActiveSessions() {
    return [];
  }
  upsertSession() {
  }
  markSessionEnded() {
  }
  updateSessionPid() {
  }
  updateSessionUsage() {
  }
  updateSessionLastSeen() {
  }
  close() {
  }
}
function sessionParams(session, updatedAt) {
  return [
    session.token,
    session.agent ?? "claude",
    session.pid ?? null,
    session.startedAt,
    session.lastSeenAt,
    session.endedAt ?? null,
    session.modelLabel,
    session.apiKey,
    session.baseUrl ?? null,
    session.authToken ?? null,
    session.modelId ?? null,
    session.targetModelId ?? null,
    session.modelName ?? null,
    JSON.stringify(session.modelDefinition),
    session.claudeCodeMaxOutputTokens ?? null,
    session.claudeCodeMaxOutputTokensUserSet === undefined ? null : session.claudeCodeMaxOutputTokensUserSet ? 1 : 0,
    session.debug === undefined ? null : session.debug ? 1 : 0,
    session.costTotals.promptTokens,
    session.costTotals.cachedTokens,
    session.costTotals.completionTokens,
    session.costTotals.costUsd,
    session.costSummary,
    session.externalSummary ?? null,
    updatedAt
  ];
}
function rowToSessionBase(row) {
  return {
    token: row.token,
    agent: row.agent,
    ...typeof row.pid === "number" ? { pid: row.pid } : {},
    apiKey: row.api_key,
    ...row.base_url ? { baseUrl: row.base_url } : {},
    ...row.auth_token ? { authToken: row.auth_token } : {},
    modelLabel: row.model_label,
    modelDefinition: parseJson(row.model_definition_json, {}),
    ...row.model_id ? { modelId: row.model_id } : {},
    ...row.target_model_id ? { targetModelId: row.target_model_id } : {},
    ...row.model_name ? { modelName: row.model_name } : {},
    ...typeof row.claude_code_max_output_tokens === "number" ? { claudeCodeMaxOutputTokens: row.claude_code_max_output_tokens } : {},
    ...row.claude_code_max_output_tokens_user_set !== null ? { claudeCodeMaxOutputTokensUserSet: row.claude_code_max_output_tokens_user_set === 1 } : {},
    ...row.debug !== null ? { debug: row.debug === 1 } : {},
    startedAt: row.started_at,
    ...typeof row.last_seen_at === "number" ? { lastSeenAt: row.last_seen_at } : {},
    ...typeof row.ended_at === "number" ? { endedAt: row.ended_at } : {}
  };
}
function parseJson(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}
var DATABASE_FILE = "daemon.sqlite";
var init_storage = __esm(() => {
  init_paths();
});

// packages/cli/src/lib/daemon/state.ts
class SessionRegistry {
  map = new Map;
  store;
  register(state) {
    this.map.set(state.token, state);
    this.persistSession(state);
    this.enforceNoPidSessionLimit(Date.now());
  }
  get(token) {
    const state = this.map.get(token);
    if (state) {
      this.markSeen(state);
    }
    return state;
  }
  delete(token) {
    const state = this.map.get(token);
    if (!state) {
      return false;
    }
    this.map.delete(token);
    state.endedAt = Date.now();
    this.store?.markSessionEnded(state.token, state.endedAt, state.costTracker.summarize(), state.costTracker.totals);
    emitDaemonSessionEndedTelemetry(state);
    return true;
  }
  get size() {
    return this.map.size;
  }
  list() {
    return [...this.map.values()];
  }
  updatePid(token, pid) {
    const state = this.map.get(token);
    if (!state) {
      return false;
    }
    state.pid = pid;
    this.store?.updateSessionPid(token, pid);
    return true;
  }
  async restorePersisted() {
    this.store = await createSessionStore();
    const persisted = this.store.restoreActiveSessions();
    let restored = 0;
    const now = Date.now();
    for (const session of persisted) {
      if (session.pid !== undefined && !isProcessAlive(session.pid)) {
        this.store.markSessionEnded(session.token, now, "[nebiusrelay cost] session total: $0.0000 (0 in, 0 out)", { promptTokens: 0, cachedTokens: 0, completionTokens: 0, costUsd: 0 });
        continue;
      }
      const lastSeenAt = session.lastSeenAt ?? session.startedAt;
      if (session.pid === undefined && isNoPidSessionIdle(lastSeenAt, now)) {
        this.store.markSessionEnded(session.token, now, session.externalSummary ?? "[nebiusrelay cost] session total: $0.0000 (0 in, 0 out)", {
          promptTokens: session.promptTokens ?? 0,
          cachedTokens: session.cachedTokens ?? 0,
          completionTokens: session.completionTokens ?? 0,
          costUsd: session.costUsd ?? 0
        });
        continue;
      }
      const state = buildSession(session);
      state.startedAt = session.startedAt;
      state.lastSeenAt = lastSeenAt;
      state.lastSeenPersistedAt = lastSeenAt;
      if (session.externalSummary !== undefined) {
        state.externalSummary = session.externalSummary;
      }
      state.costTracker.hydrateUsage({
        promptTokens: session.promptTokens ?? 0,
        cachedTokens: session.cachedTokens ?? 0,
        completionTokens: session.completionTokens ?? 0,
        costUsd: session.costUsd ?? 0
      }, session.externalSummary);
      this.map.set(state.token, state);
      restored += 1;
    }
    restored -= this.enforceNoPidSessionLimit(now);
    return restored;
  }
  reapDead() {
    let removed = 0;
    const now = Date.now();
    for (const state of this.map.values()) {
      if (state.pid === undefined) {
        if (isNoPidSessionIdle(state.lastSeenAt, now)) {
          this.delete(state.token);
          removed += 1;
        }
        continue;
      }
      if (!isProcessAlive(state.pid)) {
        this.delete(state.token);
        removed += 1;
      }
    }
    removed += this.enforceNoPidSessionLimit(now);
    return removed;
  }
  updateUsage(token, externalSummary) {
    const state = this.map.get(token);
    if (!state) {
      return;
    }
    if (externalSummary) {
      state.externalSummary = externalSummary;
    }
    this.store?.updateSessionUsage(token, state.costTracker.summarize(), state.costTracker.totals, state.externalSummary);
  }
  closeStore() {
    this.store?.close();
    this.store = undefined;
  }
  persistSession(state) {
    this.store?.upsertSession(toPersistedSession(state));
  }
  markSeen(state) {
    const now = Date.now();
    state.lastSeenAt = now;
    if (now - (state.lastSeenPersistedAt ?? 0) < LAST_SEEN_PERSIST_INTERVAL_MS) {
      return;
    }
    state.lastSeenPersistedAt = now;
    this.store?.updateSessionLastSeen(state.token, now);
  }
  enforceNoPidSessionLimit(now) {
    const noPidSessions = [...this.map.values()].filter((state) => state.pid === undefined).sort((a3, b3) => a3.lastSeenAt - b3.lastSeenAt);
    const overflow = noPidSessions.length - MAX_NO_PID_SESSIONS;
    if (overflow <= 0) {
      return 0;
    }
    let removed = 0;
    for (const state of noPidSessions.slice(0, overflow)) {
      if (state.lastSeenAt > now) {
        continue;
      }
      if (this.delete(state.token)) {
        removed += 1;
      }
    }
    return removed;
  }
}
function isProxiedAgent(agent) {
  return PROXIED_AGENTS.has(agent);
}
function buildSession(req) {
  const agent = req.agent ?? "claude";
  const costTracker = new CostTracker(req.modelDefinition);
  const now = Date.now();
  const baseUrl = req.baseUrl ?? NEBIUS_BASE_URL2;
  const state = {
    token: req.token,
    agent,
    startedAt: now,
    lastSeenAt: now,
    lastSeenPersistedAt: now,
    modelLabel: req.modelLabel,
    apiKey: req.apiKey,
    baseUrl,
    modelDefinition: req.modelDefinition,
    costTracker,
    ...typeof req.pid === "number" ? { pid: req.pid } : {},
    ...req.debug !== undefined ? { debug: req.debug } : {}
  };
  if (isProxiedAgent(agent)) {
    state.options = {
      apiKey: req.apiKey,
      baseUrl,
      modelId: req.modelId ?? req.modelLabel,
      targetModelId: req.targetModelId ?? req.modelDefinition.id,
      modelName: req.modelName ?? req.modelLabel,
      modelDefinition: req.modelDefinition,
      authToken: req.authToken ?? req.token,
      ...req.claudeCodeMaxOutputTokens !== undefined ? { claudeCodeMaxOutputTokens: req.claudeCodeMaxOutputTokens } : {},
      ...req.claudeCodeMaxOutputTokensUserSet !== undefined ? { claudeCodeMaxOutputTokensUserSet: req.claudeCodeMaxOutputTokensUserSet } : {},
      ...req.debug !== undefined ? { debug: req.debug } : {},
      costTracker,
      ...process.env.NEBIUSRELAY_PERF === "1" ? { perfSink: (payload) => recordSessionProxyPerf(state, payload) } : {}
    };
  }
  return state;
}
function toPublicSessionView(state) {
  return {
    agent: state.agent,
    modelLabel: state.modelLabel,
    ...state.pid !== undefined ? { pid: state.pid } : {},
    startedAt: state.startedAt,
    ...state.endedAt !== undefined ? { endedAt: state.endedAt } : {},
    status: state.endedAt === undefined ? "running" : "ended",
    lastSeenAt: state.lastSeenAt,
    costSummary: state.costTracker.summarize(),
    ...state.proxyPerf !== undefined ? { proxyPerf: state.proxyPerf } : {}
  };
}
function recordSessionProxyPerf(state, payload) {
  state.proxyPerf ??= { requestCount: 0, totalMs: 0, maxMs: 0, spans: {} };
  state.proxyPerf.requestCount += 1;
  state.proxyPerf.totalMs = roundPerfMs(state.proxyPerf.totalMs + payload.totalMs);
  state.proxyPerf.maxMs = Math.max(state.proxyPerf.maxMs, payload.totalMs);
  for (const span of payload.spans) {
    addPerfMetric(state.proxyPerf.spans, span.name, span.durationMs);
  }
  for (const mark of payload.marks) {
    if (mark.name === "first_delta") {
      state.proxyPerf.firstDelta ??= { count: 0, totalMs: 0, maxMs: 0 };
      addPerfMetricValue(state.proxyPerf.firstDelta, mark.atMs);
    }
  }
}
function addPerfMetric(metrics, name, durationMs) {
  metrics[name] ??= { count: 0, totalMs: 0, maxMs: 0 };
  addPerfMetricValue(metrics[name], durationMs);
}
function addPerfMetricValue(metric, durationMs) {
  metric.count += 1;
  metric.totalMs = roundPerfMs(metric.totalMs + durationMs);
  metric.maxMs = Math.max(metric.maxMs, durationMs);
}
function roundPerfMs(value) {
  return Math.round(value * 1000) / 1000;
}
function toPersistedSession(state) {
  const base = {
    token: state.token,
    agent: state.agent,
    apiKey: state.apiKey,
    baseUrl: state.baseUrl,
    ...state.options?.authToken !== undefined && state.options.authToken !== state.token ? { authToken: state.options.authToken } : {},
    modelLabel: state.modelLabel,
    modelDefinition: state.modelDefinition,
    startedAt: state.startedAt,
    lastSeenAt: state.lastSeenAt,
    costSummary: state.costTracker.summarize(),
    costTotals: state.costTracker.totals,
    ...state.pid !== undefined ? { pid: state.pid } : {},
    ...state.endedAt !== undefined ? { endedAt: state.endedAt } : {},
    ...state.externalSummary !== undefined ? { externalSummary: state.externalSummary } : {},
    ...state.debug !== undefined ? { debug: state.debug } : {}
  };
  if (state.options !== undefined) {
    base.modelId = state.options.modelId;
    base.targetModelId = state.options.targetModelId;
    base.modelName = state.options.modelName;
    if (state.agent === "claude") {
      const claudeOptions = state.options;
      if (claudeOptions.claudeCodeMaxOutputTokens !== undefined) {
        base.claudeCodeMaxOutputTokens = claudeOptions.claudeCodeMaxOutputTokens;
      }
      if (claudeOptions.claudeCodeMaxOutputTokensUserSet !== undefined) {
        base.claudeCodeMaxOutputTokensUserSet = claudeOptions.claudeCodeMaxOutputTokensUserSet;
      }
    }
  }
  return base;
}
function isNoPidSessionIdle(lastSeenAt, now) {
  return now - lastSeenAt > NO_PID_SESSION_IDLE_TTL_MS;
}
function envInt(name, fallback) {
  const raw = process.env[name];
  if (!raw) {
    return fallback;
  }
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}
function emitDaemonSessionEndedTelemetry(state) {
  if (state.agent !== "codex-app" || state.endedAt === undefined) {
    return;
  }
  const usageByModel = state.costTracker.totalsByModel;
  const fallbackModel2 = state.options?.targetModelId ?? state.modelDefinition.id;
  sendTelemetryEvent({
    event: "session_ended",
    sessionId: state.token,
    agent: state.agent,
    initialModel: fallbackModel2,
    finalModel: fallbackModel2,
    startedAt: state.startedAt,
    endedAt: state.endedAt,
    durationMs: state.endedAt - state.startedAt,
    usage: state.costTracker.totals,
    ...usageByModel.length > 0 ? { usageByModel } : {},
    metadata: {
      integration: "codex-app",
      emittedBy: "daemon"
    }
  });
}
var DEFAULT_NO_PID_SESSION_IDLE_TTL_MS, DEFAULT_MAX_NO_PID_SESSIONS = 50, DEFAULT_LAST_SEEN_PERSIST_INTERVAL_MS, NO_PID_SESSION_IDLE_TTL_MS, MAX_NO_PID_SESSIONS, LAST_SEEN_PERSIST_INTERVAL_MS, sessions, PROXIED_AGENTS;
var init_state = __esm(() => {
  init_cost();
  init_nebius_core();
  init_telemetry();
  init_paths();
  init_storage();
  DEFAULT_NO_PID_SESSION_IDLE_TTL_MS = 24 * 60 * 60 * 1000;
  DEFAULT_LAST_SEEN_PERSIST_INTERVAL_MS = 5 * 60 * 1000;
  NO_PID_SESSION_IDLE_TTL_MS = envInt("NEBIUSRELAY_DAEMON_NO_PID_SESSION_IDLE_TTL_MS", DEFAULT_NO_PID_SESSION_IDLE_TTL_MS);
  MAX_NO_PID_SESSIONS = envInt("NEBIUSRELAY_DAEMON_MAX_NO_PID_SESSIONS", DEFAULT_MAX_NO_PID_SESSIONS);
  LAST_SEEN_PERSIST_INTERVAL_MS = envInt("NEBIUSRELAY_DAEMON_LAST_SEEN_PERSIST_INTERVAL_MS", DEFAULT_LAST_SEEN_PERSIST_INTERVAL_MS);
  sessions = new SessionRegistry;
  PROXIED_AGENTS = new Set(["claude", "codex", "codex-app"]);
});

// packages/cli/src/lib/daemon/server.ts
var exports_server = {};
__export(exports_server, {
  runDaemon: () => runDaemon,
  resolveDaemonPort: () => resolveDaemonPort,
  renderDaemonError: () => renderDaemonError,
  probeHealthz: () => probeHealthz,
  probeDaemonHealth: () => probeDaemonHealth,
  daemonUrl: () => daemonUrl,
  daemonPidPath: () => daemonPidPath,
  DEFAULT_DAEMON_PORT: () => DEFAULT_DAEMON_PORT
});
import http from "http";
import { once } from "events";
import { statSync } from "fs";
import { writeFile as writeFile3, unlink, mkdir as mkdir5 } from "fs/promises";
import path11 from "path";
import os4 from "os";
function daemonPidPath(home = nebiusrelayHome2()) {
  return path11.join(home, "daemon.pid");
}
function resolveDaemonPort() {
  const raw = process.env.NEBIUSRELAY_PORT;
  const parsed = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_DAEMON_PORT;
}
function daemonUrl(port = resolveDaemonPort()) {
  return `http://${CLAUDE_LOCAL_PROXY_HOST}:${port}`;
}
async function listenOrExitOnRace(server, port) {
  await new Promise((resolve, reject) => {
    const onError = (err) => {
      if (err.code === "EADDRINUSE") {
        server.removeListener("error", onError);
        probeHealthz(port).then((healthy) => {
          if (healthy) {
            process.exit(0);
          }
          process.stderr.write(`[nebiusrelay daemon] port ${port} in use by a non-daemon process.
`);
          process.exit(1);
        });
        return;
      }
      server.removeListener("error", onError);
      reject(err);
    };
    server.once("error", onError);
    server.listen(port, CLAUDE_LOCAL_PROXY_HOST, () => {
      server.removeListener("error", onError);
      resolve();
    });
  });
}
function renderDaemonError(res, err, agent) {
  if (agent === "codex" || agent === "codex-app") {
    if (isNebiusApiError(err)) {
      writeOpenAIError(res, err.anthropicStatus, err.anthropicType, err.message);
      return;
    }
    writeOpenAIError(res, 500, "api_error", err instanceof Error ? err.message : String(err));
    return;
  }
  if (isNebiusApiError(err)) {
    writeAnthropicError(res, err.anthropicStatus, err.anthropicType, err.message);
    return;
  }
  writeAnthropicError(res, 500, "api_error", err instanceof Error ? err.message : String(err));
}
async function runDaemon(options = {}) {
  const port = resolveDaemonPort();
  const debug2 = options.debug ?? process.env.NEBIUSRELAY_DEBUG === "1";
  activeSessions = options.sessions ?? sessions;
  const restored = await activeSessions.restorePersisted();
  let requestAgent;
  const server = http.createServer((req, res) => {
    handleDaemonRequest(req, res, {
      debug: debug2,
      setAgent: (a3) => {
        requestAgent = a3;
      }
    }).catch((err) => {
      renderDaemonError(res, err, requestAgent);
    });
  });
  await listenOrExitOnRace(server, port);
  initModelCatalog({ home: os4.homedir() }).then(() => {
    if (debug2) {
      process.stderr.write(`[nebiusrelay daemon] model catalog loaded.
`);
    }
  });
  await mkdir5(path11.dirname(daemonPidPath()), { recursive: true });
  await writeFile3(daemonPidPath(), `${process.pid}
`, { encoding: "utf8" });
  if (debug2) {
    process.stderr.write(`[nebiusrelay daemon] listening: ${daemonUrl(port)} (pid ${process.pid})
`);
    if (restored > 0) {
      process.stderr.write(`[nebiusrelay daemon] restored ${restored} active session(s).
`);
    }
  }
  let closing = false;
  const reaper = setInterval(() => {
    const removed = activeSessions.reapDead();
    if (debug2 && removed > 0) {
      process.stderr.write(`[nebiusrelay daemon] reaped ${removed} dead session(s).
`);
    }
  }, SESSION_REAP_INTERVAL_MS);
  reaper.unref();
  const shutdown = async (signal) => {
    if (closing) {
      return;
    }
    closing = true;
    clearInterval(reaper);
    if (debug2) {
      process.stderr.write(`[nebiusrelay daemon] ${signal} - shutting down.
`);
    }
    activeSessions.closeStore();
    server.close();
    try {
      await unlink(daemonPidPath());
    } catch {
    }
    process.exit(0);
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
  await once(server, "close");
}
async function handleDaemonRequest(req, res, opts) {
  const path_ = requestPath(req);
  if (opts.debug) {
    process.stderr.write(`[nebiusrelay daemon] ${req.method} ${path_}
`);
  }
  if (req.method === "HEAD" && path_ === "/") {
    res.writeHead(200);
    res.end();
    return;
  }
  if (req.method === "GET" && path_ === "/healthz") {
    writeJson(res, 200, {
      ok: true,
      pid: process.pid,
      version: VERSION,
      home: nebiusrelayHome2(),
      scriptPath: RUNNING_DAEMON_IDENTITY.scriptPath,
      scriptSize: RUNNING_DAEMON_IDENTITY.scriptSize,
      scriptMtimeMs: RUNNING_DAEMON_IDENTITY.scriptMtimeMs,
      activeSessionCount: activeSessions.size
    });
    return;
  }
  if (req.method === "GET" && path_ === "/") {
    writeJson(res, 200, {
      ok: true,
      service: "nebiusrelay daemon",
      version: VERSION,
      activeSessionCount: activeSessions.size
    });
    return;
  }
  if (path_ === "/internal/sessions") {
    if (req.method === "POST") {
      await registerSession(req, res);
      return;
    }
    if (req.method === "GET") {
      writeJson(res, 200, {
        count: activeSessions.size,
        sessions: activeSessions.list().map(toPublicSessionView)
      });
      return;
    }
    writeAnthropicError(res, 405, "method_not_allowed", `Unsupported method ${req.method ?? ""}`);
    return;
  }
  const costMatch = path_.match(COST_ROUTE);
  if (costMatch && req.method === "GET") {
    const state = activeSessions.get(decodeURIComponent(costMatch[1]));
    if (!state) {
      writeAnthropicError(res, 404, "not_found_error", "Unknown session token.");
      return;
    }
    writeJson(res, 200, {
      summary: state.costTracker.summarize(),
      totals: state.costTracker.totals,
      totalsByModel: state.costTracker.totalsByModel,
      ...state.proxyPerf !== undefined ? { proxyPerf: state.proxyPerf } : {}
    });
    return;
  }
  const usageMatch = path_.match(USAGE_ROUTE);
  if (usageMatch && req.method === "POST") {
    const state = activeSessions.get(decodeURIComponent(usageMatch[1]));
    if (!state) {
      writeAnthropicError(res, 404, "not_found_error", "Unknown session token.");
      return;
    }
    const body = await readJsonBody(req);
    const promptTokens = typeof body?.promptTokens === "number" ? body.promptTokens : 0;
    const completionTokens = typeof body?.completionTokens === "number" ? body.completionTokens : 0;
    const cachedTokens = typeof body?.cachedTokens === "number" ? body.cachedTokens : 0;
    if (promptTokens > 0 || completionTokens > 0) {
      state.costTracker.addUsage(promptTokens, cachedTokens, completionTokens, state.modelDefinition);
    }
    if (typeof body?.summary === "string" && body.summary) {
      state.costTracker.setExternalSummary(body.summary);
    }
    activeSessions.updateUsage(state.token, typeof body?.summary === "string" && body.summary ? body.summary : undefined);
    writeJson(res, 200, { ok: true });
    return;
  }
  const pidMatch = path_.match(PID_ROUTE);
  if (pidMatch && req.method === "POST") {
    const token2 = decodeURIComponent(pidMatch[1]);
    const state = activeSessions.get(token2);
    if (!state) {
      writeAnthropicError(res, 404, "not_found_error", "Unknown session token.");
      return;
    }
    const body = await readJsonBody(req);
    if (typeof body?.pid === "number") {
      activeSessions.updatePid(token2, body.pid);
    }
    writeJson(res, 200, { ok: true });
    return;
  }
  const deleteMatch = path_.match(SESSION_ROUTE);
  if (deleteMatch && req.method === "DELETE") {
    const removed = activeSessions.delete(decodeURIComponent(deleteMatch[1]));
    writeJson(res, removed ? 200 : 404, removed ? { ok: true } : { ok: false });
    return;
  }
  const sessionRoute = localSessionRoute(req, path_);
  const token = sessionRoute?.token ?? extractToken(req);
  let session = token !== undefined ? activeSessions.get(token) : undefined;
  if (session === undefined && token !== undefined) {
    session = await restoreAppSession(token);
  }
  if (!session) {
    writeAnthropicError(res, 401, "authentication_error", "Unauthorized local proxy request.");
    return;
  }
  opts.setAgent?.(session.agent);
  if (!isProxiedAgent(session.agent) || session.options === undefined) {
    writeAnthropicError(res, 404, "not_found_error", `This session's agent (${session.agent}) is not proxied by the daemon.`);
    return;
  }
  if (sessionRoute !== undefined) {
    req.headers.authorization = `Bearer ${session.options.authToken}`;
    delete req.headers["x-api-key"];
  }
  if (session.agent === "codex" || session.agent === "codex-app") {
    try {
      await handleCodexProxyRequest(req, res, session.options);
    } finally {
      sessionRoute?.restore();
    }
    return;
  }
  try {
    await handleProxyRequest(req, res, session.options);
  } finally {
    sessionRoute?.restore();
  }
}
async function restoreAppSession(token) {
  const registration = await readAppRegistration();
  if (registration === undefined || registration.token !== token) {
    return;
  }
  const state = buildSession(registration);
  activeSessions.register(state);
  return state;
}
function localSessionRoute(req, path_) {
  const match = path_.match(/^\/session\/([^/]+)(\/.*)$/);
  if (!match) {
    return;
  }
  const originalUrl = req.url;
  const url = new URL(req.url ?? path_, "http://127.0.0.1");
  url.pathname = match[2];
  req.url = `${url.pathname}${url.search}`;
  return {
    token: decodeURIComponent(match[1]),
    restore: () => {
      req.url = originalUrl;
    }
  };
}
async function registerSession(req, res) {
  const body = await readJsonBody(req);
  const coreMissing = !body || typeof body.token !== "string" || !body.token || typeof body.apiKey !== "string" || !body.apiKey || typeof body.modelLabel !== "string" || !body.modelLabel || typeof body.modelDefinition !== "object" || body.modelDefinition === null;
  if (coreMissing) {
    writeAnthropicError(res, 400, "invalid_request_error", "Malformed register body: requires token, apiKey, modelLabel, modelDefinition.");
    return;
  }
  const agent = body.agent ?? "claude";
  if (isProxiedAgent(agent)) {
    const proxyMissing = typeof body.modelId !== "string" || !body.modelId || typeof body.targetModelId !== "string" || !body.targetModelId;
    if (proxyMissing) {
      writeAnthropicError(res, 400, "invalid_request_error", `Agent "${agent}" is proxied and requires modelId + targetModelId.`);
      return;
    }
  }
  const state = buildSession(body);
  activeSessions.register(state);
  writeJson(res, 200, {
    ok: true,
    session: {
      agent: state.agent,
      modelLabel: state.modelLabel,
      ...state.pid !== undefined ? { pid: state.pid } : {},
      startedAt: state.startedAt
    }
  });
}
async function probeHealthz(port) {
  return await probeDaemonHealth(port) !== undefined;
}
async function probeDaemonHealth(port) {
  try {
    const controller = new AbortController;
    const timer = setTimeout(() => controller.abort(), 300);
    const response = await fetch(`${daemonUrl(port)}/healthz`, { signal: controller.signal });
    clearTimeout(timer);
    if (!response.ok) {
      return;
    }
    const body = await response.json().catch(() => {
      return;
    });
    if (body?.ok !== true) {
      return;
    }
    return {
      ok: true,
      pid: typeof body.pid === "number" ? body.pid : 0,
      version: typeof body.version === "string" ? body.version : "",
      home: typeof body.home === "string" ? body.home : null,
      scriptPath: typeof body.scriptPath === "string" ? body.scriptPath : null,
      scriptSize: typeof body.scriptSize === "number" ? body.scriptSize : null,
      scriptMtimeMs: typeof body.scriptMtimeMs === "number" ? body.scriptMtimeMs : null,
      activeSessionCount: typeof body.activeSessionCount === "number" ? body.activeSessionCount : -1
    };
  } catch {
    return;
  }
}
function daemonIdentityAtStartup() {
  const scriptPath = process.argv[1] ? path11.resolve(process.argv[1]) : null;
  if (!scriptPath) {
    return { scriptPath: null, scriptSize: null, scriptMtimeMs: null };
  }
  try {
    const stat = statSync(scriptPath);
    return { scriptPath, scriptSize: stat.size, scriptMtimeMs: stat.mtimeMs };
  } catch {
    return { scriptPath, scriptSize: null, scriptMtimeMs: null };
  }
}
var activeSessions, DEFAULT_DAEMON_PORT = 7878, SESSION_REAP_INTERVAL_MS = 30000, COST_ROUTE, PID_ROUTE, USAGE_ROUTE, SESSION_ROUTE, RUNNING_DAEMON_IDENTITY;
var init_server = __esm(() => {
  init_version();
  init_defaults();
  init_http_util();
  init_proxy();
  init_nebius_call();
  init_proxy2();
  init_app_registration();
  init_paths();
  init_model_catalog_init();
  init_state();
  activeSessions = sessions;
  COST_ROUTE = /^\/internal\/sessions\/([^/]+)\/cost$/;
  PID_ROUTE = /^\/internal\/sessions\/([^/]+)\/pid$/;
  USAGE_ROUTE = /^\/internal\/sessions\/([^/]+)\/usage$/;
  SESSION_ROUTE = /^\/internal\/sessions\/([^/]+)$/;
  RUNNING_DAEMON_IDENTITY = daemonIdentityAtStartup();
});

// packages/cli/src/lib/daemon/launch.ts
import { spawn } from "child_process";
import { randomBytes } from "crypto";
import { mkdir as mkdir6, readFile as readFile3, stat, unlink as unlink2, writeFile as writeFile4 } from "fs/promises";
import path12 from "path";
import { fileURLToPath } from "url";
async function ensureDaemon() {
  const port = resolveDaemonPort();
  const url = daemonUrl(port);
  const scriptIdentity = await currentScriptIdentity();
  const health = await probeDaemonHealth(port);
  if (health && daemonMatchesCurrentScript(health, scriptIdentity)) {
    return { url };
  }
  if (health) {
    const activeSessionCount = health.activeSessionCount >= 0 ? health.activeSessionCount : await activeSessionCountFor(url);
    const daemonPid = health.pid > 0 ? health.pid : await readDaemonPid();
    if (activeSessionCount === 0 && daemonPid !== undefined) {
      await stopDaemonPid(daemonPid);
      await waitForDaemonToExit(port);
    } else {
      return { url };
    }
  }
  await clearStalePidFile();
  const scriptPath = currentScriptPath();
  const child = spawn(process.execPath, [scriptPath, "--daemon"], {
    detached: true,
    stdio: "ignore",
    env: {
      ...process.env,
      NEBIUSRELAY_PORT: String(port)
    }
  });
  child.unref();
  const deadline = Date.now() + HEALTH_POLL_TIMEOUT_MS;
  while (Date.now() < deadline) {
    await sleep2(HEALTH_POLL_INTERVAL_MS);
    if (await probeHealthz(port)) {
      return { url };
    }
  }
  throw new Error(`nebiusrelay daemon did not become healthy on ${url} within ${HEALTH_POLL_TIMEOUT_MS / 1000}s. ` + `Set NEBIUSRELAY_PORT to use a different port.`);
}
async function currentScriptIdentity() {
  const scriptPath = currentScriptPath();
  try {
    const info = await stat(scriptPath);
    return { scriptPath, scriptSize: info.size, scriptMtimeMs: info.mtimeMs };
  } catch {
    return { scriptPath, scriptSize: null, scriptMtimeMs: null };
  }
}
function daemonMatchesCurrentScript(health, current) {
  if (health.home !== null && health.home !== nebiusrelayHome2()) {
    return false;
  }
  if (health.scriptPath !== current.scriptPath) {
    return false;
  }
  if (health.scriptSize === null || current.scriptSize === null || health.scriptMtimeMs === null || current.scriptMtimeMs === null) {
    return health.version !== "";
  }
  return health.scriptSize === current.scriptSize && health.scriptMtimeMs === current.scriptMtimeMs;
}
async function activeSessionCountFor(url) {
  try {
    const response = await daemonFetch(`${url}/internal/sessions`);
    if (!response.ok) {
      return;
    }
    const body = await response.json();
    if (typeof body.count === "number") {
      return body.count;
    }
    return Array.isArray(body.sessions) ? body.sessions.length : undefined;
  } catch {
    return;
  }
}
async function readDaemonPid() {
  try {
    const raw = (await readFile3(daemonPidPath(), "utf8")).trim();
    const pid = raw ? Number.parseInt(raw, 10) : NaN;
    return Number.isFinite(pid) ? pid : undefined;
  } catch {
    return;
  }
}
async function stopDaemonPid(pid) {
  try {
    process.kill(pid, "SIGTERM");
  } catch (err) {
    if (err.code !== "ESRCH") {
      throw err;
    }
  }
}
async function waitForDaemonToExit(port) {
  const deadline = Date.now() + HEALTH_POLL_TIMEOUT_MS;
  while (Date.now() < deadline) {
    if (!await probeHealthz(port)) {
      return;
    }
    await sleep2(HEALTH_POLL_INTERVAL_MS);
  }
}
function currentScriptPath() {
  const argv1 = process.argv[1];
  if (argv1) {
    return path12.isAbsolute(argv1) ? argv1 : path12.resolve(argv1);
  }
  try {
    return fileURLToPath(import.meta.url);
  } catch {
    return import.meta.url;
  }
}
async function clearStalePidFile() {
  let pid;
  try {
    const raw = (await readFile3(daemonPidPath(), "utf8")).trim();
    pid = raw ? Number.parseInt(raw, 10) : undefined;
  } catch {
    return;
  }
  if (!pid || !Number.isFinite(pid)) {
    try {
      await unlink2(daemonPidPath());
    } catch {
    }
    return;
  }
  if (isProcessAlive(pid)) {
    return;
  }
  try {
    await unlink2(daemonPidPath());
  } catch {
  }
}
function sleep2(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function daemonFetch(url, init) {
  const controller = new AbortController;
  const timer = setTimeout(() => controller.abort(), DAEMON_CALL_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init ?? {}, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}
async function registerDaemonSession(proxyUrl, registration) {
  const response = await daemonFetch(`${proxyUrl}/internal/sessions`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(registration)
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`daemon registration failed (HTTP ${response.status})${detail ? `: ${detail.slice(0, 300)}` : ""}`);
  }
}
async function updateDaemonSessionPid(proxyUrl, token, pid) {
  await daemonFetch(`${proxyUrl}/internal/sessions/${encodeURIComponent(token)}/pid`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ pid })
  });
}
async function localProxyAuthToken() {
  const file = path12.join(nebiusrelayHome2(), LOCAL_PROXY_TOKEN_FILE);
  try {
    const token2 = (await readFile3(file, "utf8")).trim();
    if (token2) {
      return token2;
    }
  } catch {
  }
  const token = `nebiusrelay-local-${randomBytes(32).toString("base64url")}`;
  await mkdir6(path12.dirname(file), { recursive: true });
  await writeFile4(file, `${token}
`, { encoding: "utf8", mode: 384 });
  return token;
}
function daemonSessionUrl(proxyUrl, sessionId) {
  return `${proxyUrl}/session/${encodeURIComponent(sessionId)}`;
}
function startDaemonSessionKeepalive(registration, options = {}) {
  let stopped = false;
  let inFlight2 = false;
  let lastRecoveredAt = 0;
  const recover = async (reason) => {
    const now = Date.now();
    if (now - lastRecoveredAt < SESSION_KEEPALIVE_INTERVAL_MS) {
      return;
    }
    lastRecoveredAt = now;
    const { url } = await ensureDaemon();
    await registerDaemonSession(url, {
      ...registration,
      ...options.pid !== undefined ? { pid: options.pid } : {}
    });
    if (options.debug) {
      process.stderr.write(`[nebiusrelay daemon] restored ${options.label ?? registration.agent ?? "session"} after ${reason}.
`);
    }
  };
  const safeRecover = async (reason) => {
    try {
      await recover(reason);
    } catch (err) {
      if (options.debug) {
        process.stderr.write(`[nebiusrelay daemon] could not restore ${options.label ?? registration.agent ?? "session"}: ${err instanceof Error ? err.message : String(err)}
`);
      }
    }
  };
  const tick = () => {
    if (stopped || inFlight2) {
      return;
    }
    inFlight2 = true;
    (async () => {
      const port = resolveDaemonPort();
      const url = daemonUrl(port);
      try {
        const response = await daemonFetch(`${url}/internal/sessions/${encodeURIComponent(registration.token)}/cost`);
        if (response.status === 404 || response.status === 401) {
          await safeRecover(`missing session (${response.status})`);
        }
      } catch (err) {
        await safeRecover(err instanceof Error ? err.message : "daemon unreachable");
      } finally {
        inFlight2 = false;
      }
    })();
  };
  const timer = setInterval(tick, SESSION_KEEPALIVE_INTERVAL_MS);
  timer.unref();
  tick();
  return {
    stop: () => {
      stopped = true;
      clearInterval(timer);
    }
  };
}
var HEALTH_POLL_INTERVAL_MS = 50, HEALTH_POLL_TIMEOUT_MS = 5000, DAEMON_CALL_TIMEOUT_MS = 3000, SESSION_KEEPALIVE_INTERVAL_MS = 500, LOCAL_PROXY_TOKEN_FILE = "local-proxy-token";
var init_launch = __esm(() => {
  init_defaults();
  init_server();
  init_paths();
});

// packages/cli/src/lib/proxied-session.ts
import { spawn as spawn2 } from "child_process";
import { randomBytes as randomBytes2 } from "crypto";
async function runProxiedSession(spec) {
  const debug2 = process.env.NEBIUSRELAY_DEBUG === "1";
  const sessionId = randomLocalProxyToken();
  const authToken = await localProxyAuthToken();
  const telemetrySessionId = randomSessionId();
  const { url: proxyUrl } = await ensureDaemon();
  const agentProxyUrl = daemonSessionUrl(proxyUrl, sessionId);
  const registration = {
    token: sessionId,
    authToken,
    agent: spec.agent,
    apiKey: spec.apiKey,
    baseUrl: spec.baseUrl,
    modelLabel: spec.modelName,
    modelId: spec.registrationModelId ?? spec.modelId,
    targetModelId: spec.targetModelId,
    modelName: spec.modelName,
    modelDefinition: spec.modelDefinition,
    ...debug2 ? { debug: true } : {},
    ...spec.extraRegistration
  };
  try {
    await registerDaemonSession(proxyUrl, registration);
  } catch (err) {
    throw new Error(`Could not register this ${spec.agent === "claude" ? "Claude" : "Codex"} session with the nebiusrelay daemon: ${err instanceof Error ? err.message : String(err)}`);
  }
  const startedAt = Date.now();
  sendTelemetryEvent({
    event: "session_started",
    sessionId: telemetrySessionId,
    agent: spec.agent,
    initialModel: spec.targetModelId,
    startedAt
  });
  process.stderr.write(spec.banner(spec.modelName));
  if (debug2) {
    process.stderr.write(`[nebiusrelay proxy] daemon: ${proxyUrl}
`);
    process.stderr.write(`[nebiusrelay proxy] session: ${agentProxyUrl}
`);
    process.stderr.write(`[nebiusrelay ${spec.agent}] model: ${spec.modelId}
`);
  }
  const beforeSpawnResult = spec.beforeSpawn ? await spec.beforeSpawn() : undefined;
  const child = spawn2(spec.binary, spec.buildArgs({
    proxyUrl: agentProxyUrl,
    authToken,
    modelId: spec.modelId,
    args: spec.args ?? [],
    beforeSpawnResult
  }), {
    env: spec.buildEnv({
      proxyUrl: agentProxyUrl,
      authToken,
      modelId: spec.modelId,
      modelName: spec.modelName,
      beforeSpawnResult
    }),
    stdio: "inherit"
  });
  if (!spec.preserveSessionAfterExit && typeof child.pid === "number") {
    try {
      await updateDaemonSessionPid(proxyUrl, sessionId, child.pid);
    } catch {
    }
  }
  const keepalive = startDaemonSessionKeepalive(registration, {
    ...!spec.preserveSessionAfterExit && typeof child.pid === "number" ? { pid: child.pid } : {},
    debug: debug2,
    label: spec.keepaliveLabel
  });
  const result = await new Promise((resolve) => {
    child.on("error", (err) => {
      process.stderr.write(`Nebius TF Relay \u25B8 Failed to launch ${spec.binary}: ${err.message}.
`);
      resolve({ status: 1, signal: null });
    });
    child.on("exit", (status, signal) => resolve({ status, signal }));
  });
  const detachedSessionActive = spec.preserveSessionAfterExit && result.status === 0 && result.signal === null;
  keepalive.stop();
  if (detachedSessionActive) {
    process.stderr.write(`Nebius TF Relay \u25B8 Background Claude session remains routed through Nebius Token Factory.
`);
    return result;
  }
  const { usage, usageByModel } = await printSessionCost(proxyUrl, sessionId);
  try {
    await daemonFetch(`${proxyUrl}/internal/sessions/${encodeURIComponent(sessionId)}`, {
      method: "DELETE"
    });
  } catch {
  }
  if (spec.afterDeregister) {
    await spec.afterDeregister();
  }
  const endedAt = Date.now();
  sendTelemetryEvent({
    event: "session_ended",
    sessionId: telemetrySessionId,
    agent: spec.agent,
    initialModel: spec.targetModelId,
    finalModel: spec.targetModelId,
    startedAt,
    endedAt,
    durationMs: endedAt - startedAt,
    ...usage ? { usage } : {},
    ...usageByModel && usageByModel.length > 0 ? { usageByModel } : {},
    ...typeof result.status === "number" ? { exitCode: result.status } : {},
    ...result.signal ? { signal: result.signal } : {}
  });
  return result;
}
async function printSessionCost(proxyUrl, authToken) {
  try {
    const response = await daemonFetch(`${proxyUrl}/internal/sessions/${encodeURIComponent(authToken)}/cost`);
    if (response.ok) {
      const { summary, totals, totalsByModel } = await response.json();
      if (summary) {
        process.stderr.write(`${summary}
`);
      }
      return {
        ...totals ? { usage: totals } : {},
        ...totalsByModel ? { usageByModel: totalsByModel } : {}
      };
    }
  } catch {
  }
  return {};
}
function randomLocalProxyToken() {
  return `nebiusrelay-${randomBytes2(24).toString("base64url")}`;
}
var init_proxied_session = __esm(() => {
  init_launch();
  init_telemetry();
});

// packages/cli/src/lib/claude/core.ts
function buildClaudeEnv({
  apiKey,
  modelId,
  proxyUrl,
  authToken
}) {
  const env = { ...process.env };
  for (const key of CONFLICTING_ENV_KEYS) {
    delete env[key];
  }
  env.ANTHROPIC_BASE_URL = proxyUrl;
  env.ANTHROPIC_AUTH_TOKEN = authToken;
  env.CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY = "1";
  env.ANTHROPIC_MODEL = modelId;
  if (!env.ENABLE_TOOL_SEARCH?.trim()) {
    env.ENABLE_TOOL_SEARCH = "true";
  }
  if (env.CLAUDE_CODE_MAX_OUTPUT_TOKENS === undefined) {
    env.CLAUDE_CODE_MAX_OUTPUT_TOKENS = String(DEFAULT_CLAUDE_CODE_MAX_OUTPUT_TOKENS);
  }
  applyClaudeModelMenuEnv(env, modelId);
  if (env.CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY === undefined) {
    env.CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY = "1";
  }
  if (env.DISABLE_FEEDBACK_COMMAND === undefined) {
    env.DISABLE_FEEDBACK_COMMAND = "1";
  }
  return env;
}
function applyClaudeModelMenuEnv(env, selectedAlias) {
  const selected = resolveClaudeModel(selectedAlias);
  const supported = getClaudeSupportedModels();
  const defaultModel = supported[0] ?? selected;
  const secondaryModel = supported.find((model) => model.alias !== defaultModel.alias) ?? selected;
  setTierModelEnv(env, "OPUS", defaultModel);
  setTierModelEnv(env, "SONNET", secondaryModel);
  setTierModelEnv(env, "HAIKU", CLAUDE_HAIKU_MODEL_SELECTION);
  env.ANTHROPIC_CUSTOM_MODEL_OPTION = selected.alias;
  env.ANTHROPIC_CUSTOM_MODEL_OPTION_NAME = selected.definition.name;
  env.ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION = "Local Anthropic-to-Nebius proxy";
  env.ANTHROPIC_CUSTOM_MODEL_OPTION_SUPPORTED_CAPABILITIES = CLAUDE_MODEL_CAPABILITIES;
}
function setTierModelEnv(env, tier, model) {
  const prefix = `ANTHROPIC_DEFAULT_${tier}_MODEL`;
  env[prefix] = model.alias;
  env[`${prefix}_NAME`] = model.definition.name;
  env[`${prefix}_DESCRIPTION`] = `Nebius Token Factory (${model.definition.name}) via nebiusrelay - not Anthropic`;
}
async function runClaudeNebius(options) {
  const args = options.args ?? [];
  const selectedModel = resolveClaudeModel(options.modelId);
  const result = await runProxiedSession({
    agent: "claude",
    apiKey: options.apiKey,
    baseUrl: options.baseUrl,
    modelId: selectedModel.alias,
    registrationModelId: selectedModel.alias,
    targetModelId: selectedModel.definition.id,
    modelName: selectedModel.definition.name,
    modelDefinition: selectedModel.definition,
    extraRegistration: {
      claudeCodeMaxOutputTokens: claudeCodeMaxOutputTokensFromEnv(process.env.CLAUDE_CODE_MAX_OUTPUT_TOKENS),
      claudeCodeMaxOutputTokensUserSet: process.env.CLAUDE_CODE_MAX_OUTPUT_TOKENS !== undefined
    },
    args,
    binary: "claude",
    keepaliveLabel: "Claude session",
    preserveSessionAfterExit: claudeRunsInBackground(args),
    banner: (modelName) => `Nebius TF Relay \u25B8 Routing Claude Code \u2192 Nebius Token Factory (${modelName}). Not Anthropic.
`,
    buildEnv: ({ proxyUrl, authToken, modelId, modelName }) => buildClaudeEnv({ ...options, modelId, modelName, proxyUrl, authToken }),
    buildArgs: ({ args: launchArgs, authToken }) => buildClaudeLaunchArgs(launchArgs, authToken)
  });
  return result;
}
function claudeRunsInBackground(args) {
  return args.some((arg) => arg === "--bg" || arg === "--background");
}
function buildClaudeLaunchArgs(args, authToken) {
  return [
    ...claudeArgsWithoutModelOverrides(args),
    ...claudeCacheFriendlyArgs(args),
    ...claudeEffortArgs(args),
    ...claudeExtraSettingsArgs(args, authToken)
  ];
}
function claudeEffortArgs(args) {
  for (const arg of args) {
    if (arg === "--effort" || arg.startsWith("--effort=")) {
      return [];
    }
    if (arg === "-p" || arg === "--print") {
      return [];
    }
  }
  const env = process.env.NEBIUSRELAY_REASONING_EFFORT?.toLowerCase();
  const level = env === "medium" || env === "high" || env === "xhigh" || env === "max" || env === "low" ? env : "low";
  return ["--effort", level];
}
function claudeCodeMaxOutputTokensFromEnv(value) {
  if (value === undefined || value.trim() === "") {
    return DEFAULT_CLAUDE_CODE_MAX_OUTPUT_TOKENS;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_CLAUDE_CODE_MAX_OUTPUT_TOKENS;
}
function claudeArgsWithoutModelOverrides(args) {
  const sanitized = [];
  for (let i = 0;i < args.length; i += 1) {
    const arg = args[i];
    if (arg === undefined) {
      continue;
    }
    if (arg === "--model" || arg === "-m") {
      i += 1;
      continue;
    }
    if (arg.startsWith("--model=")) {
      continue;
    }
    sanitized.push(arg);
  }
  return sanitized;
}
function claudeCacheFriendlyArgs(args) {
  for (const arg of args) {
    if (arg === "--exclude-dynamic-system-prompt-sections" || arg === "--system-prompt" || arg.startsWith("--system-prompt=") || arg === "--system-prompt-file" || arg.startsWith("--system-prompt-file=")) {
      return [];
    }
  }
  return ["--exclude-dynamic-system-prompt-sections"];
}
function claudeExtraSettingsArgs(args, authToken) {
  for (const arg of args) {
    if (arg === "--settings" || arg.startsWith("--settings=")) {
      return [];
    }
  }
  const settings = {
    skipWebFetchPreflight: true,
    attribution: {
      commit: "",
      pr: ""
    }
  };
  if (authToken) {
    settings.apiKeyHelper = `printf %s ${JSON.stringify(authToken)}`;
  }
  return ["--settings", JSON.stringify(settings)];
}
var CONFLICTING_ENV_KEYS, DEFAULT_CLAUDE_CODE_MAX_OUTPUT_TOKENS = 32000;
var init_core = __esm(() => {
  init_defaults();
  init_launch();
  init_proxied_session();
  CONFLICTING_ENV_KEYS = [
    "ANTHROPIC_API_KEY",
    "ANTHROPIC_AUTH_TOKEN",
    "CLAUDE_CODE_OAUTH_TOKEN",
    "ANTHROPIC_MODEL",
    "ANTHROPIC_DEFAULT_OPUS_MODEL",
    "ANTHROPIC_DEFAULT_OPUS_MODEL_NAME",
    "ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION",
    "ANTHROPIC_DEFAULT_SONNET_MODEL",
    "ANTHROPIC_DEFAULT_SONNET_MODEL_NAME",
    "ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION",
    "ANTHROPIC_CUSTOM_MODEL_OPTION",
    "ANTHROPIC_CUSTOM_MODEL_OPTION_NAME",
    "ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION",
    "ANTHROPIC_CUSTOM_MODEL_OPTION_SUPPORTED_CAPABILITIES"
  ];
});

// packages/cli/src/lib/harnesses/claude.ts
var exports_claude = {};
__export(exports_claude, {
  default: () => claude_default
});
function resolveClaudeModelSafe(value) {
  try {
    return resolveClaudeModel(value);
  } catch {
    return resolveClaudeModel(undefined);
  }
}
var claude_default;
var init_claude = __esm(() => {
  init_defaults();
  init_harness();
  init_nebius_core();
  init_core();
  init_model_preferences();
  claude_default = defineHarness({
    id: HARNESS.CLAUDE,
    label: "Claude Code",
    async run(ctx) {
      const apiKey = await resolveNebiusApiKey({
        apiKey: ctx.apiKey,
        home: ctx.home
      });
      if (!apiKey) {
        throw new Error("No Nebius API key found. Pass --api-key or set NEBIUS_API_KEY.");
      }
      const requested = ctx.main ?? await readAgentModelPreference("claude");
      const selectedModel = resolveClaudeModelSafe(requested);
      if (ctx.main) {
        await recordAgentModel("claude", selectedModel.definition.id);
      }
      const launchOptions = {
        apiKey,
        baseUrl: resolveNebiusBaseUrl(),
        modelId: selectedModel.alias,
        ...ctx.passthrough ? { args: ctx.passthrough } : {}
      };
      const result = await runClaudeNebius(launchOptions);
      if (typeof result.status === "number") {
        process.exitCode = result.status;
      }
      return {};
    }
  });
});

// packages/cli/src/lib/codex/user-config.ts
import { mkdir as mkdir7, readFile as readFile4, rename as rename3, writeFile as writeFile5 } from "fs/promises";
import path13 from "path";
async function ensureCodexGenericUserDefaults(home) {
  const configPath = codexConfigPath(home);
  const existing = await readTextIfExists(configPath);
  const next = applyCodexGenericUserDefaults(existing ?? "");
  if (next === (existing ?? "")) {
    return;
  }
  await writeTextAtomic(configPath, next);
}
function applyCodexGenericUserDefaults(rawConfig) {
  if (rawConfig.trim() !== "") {
    return rawConfig;
  }
  return `${Object.entries(FIRST_RUN_CODEX_DEFAULTS).map(([key, value]) => `${key} = ${tomlString(value)}`).join(`
`)}
`;
}
function codexArgsIgnoreUserConfig(args) {
  return args.includes("--ignore-user-config");
}
function codexConfigPath(home) {
  return path13.join(home, ".codex", "config.toml");
}
async function readTextIfExists(file) {
  try {
    return await readFile4(file, "utf8");
  } catch (err) {
    if (isNodeError2(err) && err.code === "ENOENT") {
      return;
    }
    throw err;
  }
}
async function writeTextAtomic(file, value) {
  await mkdir7(path13.dirname(file), { recursive: true });
  const tmp = `${file}.tmp-${process.pid}`;
  await writeFile5(tmp, value, { encoding: "utf8", mode: 384 });
  await rename3(tmp, file);
}
function tomlString(value) {
  return JSON.stringify(value);
}
function isNodeError2(err) {
  return err instanceof Error && "code" in err;
}
var FIRST_RUN_CODEX_DEFAULTS;
var init_user_config = __esm(() => {
  FIRST_RUN_CODEX_DEFAULTS = {
    approval_policy: "on-request",
    sandbox_mode: "workspace-write",
    approvals_reviewer: "auto_review"
  };
});

// packages/cli/src/lib/codex/core.ts
import { mkdtempSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
function applyNoMcp(args) {
  if (!args.includes("--no-mcp")) {
    return args;
  }
  const out = [];
  let injected = false;
  for (const arg of args) {
    if (arg === "--no-mcp") {
      if (!injected && !args.includes("--ignore-user-config")) {
        out.push("--ignore-user-config");
      }
      injected = true;
      continue;
    }
    out.push(arg);
  }
  return out;
}
async function runCodexNebius(options) {
  const args = applyNoMcp(options.args ?? []);
  if (!codexArgsIgnoreUserConfig(args)) {
    await ensureCodexGenericUserDefaults(options.home);
  }
  const selectedModel = resolveCodexModel(options.modelId);
  let catalog;
  const result = await runProxiedSession({
    agent: "codex",
    apiKey: options.apiKey,
    baseUrl: options.baseUrl,
    modelId: selectedModel.definition.id,
    targetModelId: selectedModel.definition.id,
    modelName: selectedModel.definition.name,
    modelDefinition: selectedModel.definition,
    args,
    binary: "codex",
    keepaliveLabel: "Codex session",
    banner: (modelName) => `Nebius TF Relay \u25B8 Routing Codex \u2192 Nebius Token Factory (${modelName}). Not OpenAI.
`,
    beforeSpawn: () => {
      catalog = writeCodexModelCatalog();
      return catalog;
    },
    buildEnv: ({ authToken }) => buildCodexEnv(authToken),
    buildArgs: ({ proxyUrl, authToken, modelId, beforeSpawnResult }) => [
      ...codexArgsWithoutModelOverrides(args),
      ...codexConfigArgs(proxyUrl, authToken, modelId, beforeSpawnResult?.path ?? "")
    ],
    afterDeregister: () => catalog?.cleanup()
  });
  return result;
}
function buildCodexEnv(authToken) {
  return {
    ...process.env,
    [CODEX_AUTH_ENV]: authToken
  };
}
function codexConfigArgs(proxyUrl, authToken, modelId, catalogPath) {
  return [
    "-c",
    `model_provider="${CODEX_PROVIDER_ID}"`,
    "-c",
    `model="${modelId}"`,
    "-c",
    `model_catalog_json="${catalogPath}"`,
    "-c",
    `model_providers.${CODEX_PROVIDER_ID}.name="Nebius TF Relay"`,
    "-c",
    `model_providers.${CODEX_PROVIDER_ID}.base_url="${proxyUrl}/v1"`,
    "-c",
    `model_providers.${CODEX_PROVIDER_ID}.wire_api="responses"`,
    "-c",
    `model_providers.${CODEX_PROVIDER_ID}.env_key="${CODEX_AUTH_ENV}"`
  ];
}
function writeCodexModelCatalog() {
  const dir = mkdtempSync(join(tmpdir(), "nebiusrelay-codex-catalog-"));
  const path14 = join(dir, "models.json");
  writeFileSync(path14, codexModelCatalogJson(), "utf8");
  return {
    path: path14,
    cleanup: () => {
      try {
        rmSync(dir, { recursive: true, force: true });
      } catch {
      }
    }
  };
}
function codexArgsWithoutModelOverrides(args) {
  const sanitized = [];
  for (let i = 0;i < args.length; i += 1) {
    const arg = args[i];
    if (arg === undefined) {
      continue;
    }
    if (MODEL_OVERRIDE_FLAGS.has(arg)) {
      i += 1;
      continue;
    }
    if (arg.startsWith("--model=")) {
      continue;
    }
    sanitized.push(arg);
  }
  return sanitized;
}
var MODEL_OVERRIDE_FLAGS;
var init_core2 = __esm(() => {
  init_catalog();
  init_defaults2();
  init_user_config();
  init_launch();
  init_proxied_session();
  MODEL_OVERRIDE_FLAGS = new Set(["--model", "-m"]);
});

// packages/cli/src/lib/harnesses/codex.ts
var exports_codex = {};
__export(exports_codex, {
  default: () => codex_default
});
function resolveCodexModelSafe(value) {
  try {
    return resolveCodexModel(value);
  } catch {
    return resolveCodexModel(undefined);
  }
}
var codex_default;
var init_codex = __esm(() => {
  init_defaults2();
  init_core2();
  init_harness();
  init_nebius_core();
  init_model_preferences();
  codex_default = defineHarness({
    id: HARNESS.CODEX,
    label: "Codex",
    async run(ctx) {
      const apiKey = await resolveNebiusApiKey({
        apiKey: ctx.apiKey,
        home: ctx.home
      });
      if (!apiKey) {
        throw new Error("No Nebius API key found. Pass --api-key or set NEBIUS_API_KEY.");
      }
      const requested = ctx.main ?? await readAgentModelPreference("codex");
      const selectedModel = resolveCodexModelSafe(requested);
      if (ctx.main) {
        await recordAgentModel("codex", selectedModel.id);
      }
      const result = await runCodexNebius({
        apiKey,
        baseUrl: resolveNebiusBaseUrl(),
        home: ctx.home,
        modelId: selectedModel.id,
        ...ctx.passthrough ? { args: ctx.passthrough } : {}
      });
      if (typeof result.status === "number") {
        process.exitCode = result.status;
      }
      return {};
    }
  });
});

// packages/cli/src/lib/opencode/defaults.ts
function toOpencodeModelEntry(model) {
  return {
    name: model.name,
    attachment: model.attachment,
    reasoning: model.reasoning,
    temperature: model.temperature,
    tool_call: model.tool_call,
    limit: { context: model.limit.context, output: model.limit.output },
    modalities: {
      input: [...model.modalities.input],
      output: [...model.modalities.output]
    },
    cost: { input: model.cost.input, output: model.cost.output, cache_read: model.cost.cache_read }
  };
}
function opencodeModelEntries() {
  return Object.fromEntries(getSelectableModels().map((model) => [model.id, toOpencodeModelEntry(model)]));
}
function opencodeModelWhitelist() {
  return getSelectableModels().map((model) => model.id);
}
function opencodeVisionModelSelector() {
  return `${OPENCODE_PROVIDER_ID}/${getVisionPrimary().id}`;
}
var OPENCODE_PROVIDER_ID = "nebius", OPENCODE_DEFAULT_MODEL, OPENCODE_BUILD_PROMPT = `You are a senior software engineering agent collaborating with the user in their workspace.

You have access to tools to read, edit, search, and run code. Use them deliberately: explore before changing, make focused edits that match the surrounding style, and verify your work by running the relevant tests or commands when possible.

- Prefer the smallest correct change. Don't refactor code you weren't asked to touch.
- When you're unsure about intent, ask a concise clarifying question rather than guessing.
- Explain trade-offs when a decision matters, and say plainly what you did and what you verified.
- If something fails, report the real output and adjust - don't claim success without evidence.

## Images (self-select by your own capabilities)

Whether you can see images depends on which model you are running as - you know
this about yourself at runtime:

- **If you can see image content** (the attached image arrives to you as a real
  image part): use it directly. Describe, reason over, or act on it as needed.
  Do NOT delegate to any subagent for an image you can already see.
- **If you cannot see image content** (you are a text-only model; OpenCode
  strips image bytes before they reach you, though you may still be told an image
  was attached): do NOT pretend to see it, do NOT guess at its contents, and do
  NOT invoke the \`@vision\` subagent - it won't receive the image and will only
  error. Instead, tell the user plainly that you (the current model) can't see
  images, and that to work with an image they should switch to a vision-capable
  model via the \`/models\` command (e.g. Kimi K2.6 or MiniMax M3)
  and re-send the image. Do not retry the subagent.

Under no circumstances guess at or fabricate the contents of an image you did not
actually receive.`, OPENCODE_VISION_AGENT_PROMPT;
var init_defaults3 = __esm(() => {
  init_dist3();
  OPENCODE_DEFAULT_MODEL = getDefaultModel().id;
  OPENCODE_VISION_AGENT_PROMPT = `${VISION_PROMPT}

` + "You are a vision subagent. You are invoked (as @vision) when the user attaches " + "an image that the primary model cannot see. Describe only what is in the image; " + "do not attempt file edits or other tool work. Keep your description tight so the " + "primary agent can reason over it.";
});

// packages/cli/src/lib/opencode/core.ts
function buildOpencodeConfigJson({
  modelId = OPENCODE_DEFAULT_MODEL,
  apiKeyEnvRef = NEBIUS_API_KEY_ENV_REF,
  buildPrompt = OPENCODE_BUILD_PROMPT,
  visionPrompt = OPENCODE_VISION_AGENT_PROMPT
} = {}) {
  const models = { ...opencodeModelEntries() };
  const provider = {
    npm: "@ai-sdk/openai-compatible",
    name: "Nebius Token Factory",
    options: { apiKey: apiKeyEnvRef, baseURL: NEBIUS_BASE_URL },
    models,
    whitelist: opencodeModelWhitelist()
  };
  return {
    $schema: "https://opencode.ai/config.json",
    provider: {
      [OPENCODE_PROVIDER_ID]: provider
    },
    model: `${OPENCODE_PROVIDER_ID}/${modelId}`,
    enabled_providers: [OPENCODE_PROVIDER_ID],
    disabled_providers: ["opencode"],
    agent: {
      build: {
        prompt: buildPrompt
      },
      vision: {
        mode: "subagent",
        description: "Describes images the user attaches, for use by a text-only primary model. Because of an OpenCode bug (#25553) the image is not always forwarded to this subagent, so the primary agent does not auto-invoke it. You can still invoke it explicitly with @vision; if it reports it can't see the image, switch to a vision-capable model via /models instead.",
        model: opencodeVisionModelSelector(),
        prompt: visionPrompt
      }
    }
  };
}
function buildOpencodeEnv({
  apiKey,
  configJson
}) {
  return {
    ...process.env,
    OPENCODE_CONFIG_CONTENT: JSON.stringify(configJson),
    NEBIUS_API_KEY: apiKey
  };
}
var init_core3 = __esm(() => {
  init_dist3();
  init_nebius_core();
  init_defaults3();
});

// packages/cli/src/lib/harnesses/opencode.ts
var exports_opencode = {};
__export(exports_opencode, {
  default: () => opencode_default
});
import { spawn as spawn3 } from "child_process";
function opencodeArgsWithoutModelOverrides(args) {
  const sanitized = [];
  for (let i = 0;i < args.length; i += 1) {
    const arg = args[i];
    if (arg === undefined) {
      continue;
    }
    if (arg === "--model" || arg === "-m") {
      i += 1;
      continue;
    }
    if (arg.startsWith("--model=")) {
      continue;
    }
    sanitized.push(arg);
  }
  return sanitized;
}
var opencode_default;
var init_opencode = __esm(() => {
  init_defaults3();
  init_core3();
  init_nebius_core();
  init_harness();
  opencode_default = defineHarness({
    id: HARNESS.OPENCODE,
    label: "OpenCode",
    async run(ctx) {
      const apiKey = await resolveNebiusApiKey({
        apiKey: ctx.apiKey,
        home: ctx.home
      });
      if (!apiKey) {
        throw new Error("No Nebius API key found. Pass --api-key or set NEBIUS_API_KEY.");
      }
      const modelId = ctx.main ?? OPENCODE_DEFAULT_MODEL;
      const configJson = buildOpencodeConfigJson({ modelId });
      const env = buildOpencodeEnv({ apiKey, configJson });
      if (process.env.NEBIUSRELAY_DEBUG === "1") {
        process.stderr.write(`[nebiusrelay opencode] custom model: ${modelId}
`);
        process.stderr.write(`[nebiusrelay opencode] config: ${JSON.stringify(configJson)}
`);
      }
      const modelSelector = `${OPENCODE_PROVIDER_ID}/${modelId}`;
      const opencodeArgs = [
        "--model",
        modelSelector,
        ...opencodeArgsWithoutModelOverrides(ctx.passthrough ?? [])
      ];
      const child = spawn3("opencode", opencodeArgs, {
        env,
        stdio: "inherit"
      });
      const result = await new Promise((resolve, reject) => {
        child.on("error", reject);
        child.on("exit", (status, signal) => resolve({ status, signal }));
      });
      if (typeof result.status === "number") {
        process.exitCode = result.status;
      }
      return {};
    }
  });
});

// packages/cli/src/lib/harnesses/pi.ts
var exports_pi = {};
__export(exports_pi, {
  default: () => pi_default
});
import { spawn as spawn4 } from "child_process";
import { mkdtempSync as mkdtempSync2, rmSync as rmSync2, writeFileSync as writeFileSync2 } from "fs";
import { homedir, tmpdir as tmpdir2 } from "os";
import { join as join2 } from "path";
function piSupportedModels() {
  return getCodexSupportedModels().map((model) => model.id).join(",");
}
function piArgsWithoutNebiusrelayOverrides(args) {
  const sanitized = [];
  for (let i = 0;i < args.length; i += 1) {
    const arg = args[i];
    if (arg === undefined) {
      continue;
    }
    if (VALUE_FLAGS.has(arg)) {
      i += 1;
      continue;
    }
    if (arg.startsWith("--api-key=") || arg.startsWith("--provider=") || arg.startsWith("--model=") || arg.startsWith("--models=")) {
      continue;
    }
    sanitized.push(arg);
  }
  return sanitized;
}
function writePiModelsJson(agentDir, apiKey) {
  const models = getCodexSupportedModels().map(({ definition }) => ({
    id: definition.id,
    name: definition.name,
    reasoning: definition.reasoning,
    input: definition.modalities.input,
    contextWindow: definition.limit.context,
    maxTokens: definition.limit.output,
    cost: {
      input: definition.cost.input,
      output: definition.cost.output,
      cacheRead: definition.cost.cache_read ?? 0,
      cacheWrite: 0
    }
  }));
  writeFileSync2(join2(agentDir, "models.json"), `${JSON.stringify({
    providers: {
      [PI_PROVIDER_ID]: {
        baseUrl: NEBIUS_BASE_URL,
        api: "openai-completions",
        apiKey,
        compat: { supportsDeveloperRole: false },
        models
      }
    }
  }, null, 2)}
`, "utf8");
}
var PI_PROVIDER_ID = "nebius", VALUE_FLAGS, pi_default;
var init_pi = __esm(() => {
  init_dist3();
  init_defaults2();
  init_harness();
  init_nebius_core();
  VALUE_FLAGS = new Set(["--api-key", "--provider", "--model", "--models"]);
  pi_default = defineHarness({
    id: HARNESS.PI,
    label: "Pi Code",
    async run(ctx) {
      const apiKey = await resolveNebiusApiKey({
        apiKey: ctx.apiKey,
        home: ctx.home
      });
      if (!apiKey) {
        throw new Error("No Nebius API key found. Pass --api-key or set NEBIUS_API_KEY.");
      }
      const agentDir = mkdtempSync2(join2(tmpdir2(), "nebiusrelay-pi-"));
      const sessionDir = process.env.PI_CODING_AGENT_SESSION_DIR ?? join2(ctx.home || homedir(), ".pi", "agent", "sessions");
      writePiModelsJson(agentDir, apiKey);
      const selectedModel = resolveCodexModel(ctx.main);
      const supportedModels = piSupportedModels();
      const args = [
        "--provider",
        PI_PROVIDER_ID,
        "--model",
        selectedModel.id,
        "--models",
        supportedModels,
        "--api-key",
        apiKey,
        "--no-approve",
        "--no-extensions",
        "--no-skills",
        "--no-prompt-templates",
        "--no-themes",
        ...piArgsWithoutNebiusrelayOverrides(ctx.passthrough ?? [])
      ];
      if (process.env.NEBIUSRELAY_DEBUG === "1") {
        process.stderr.write(`[nebiusrelay pi] provider: ${PI_PROVIDER_ID}
`);
        process.stderr.write(`[nebiusrelay pi] model: ${selectedModel.id}
`);
        process.stderr.write(`[nebiusrelay pi] models: ${supportedModels}
`);
        process.stderr.write(`[nebiusrelay pi] temp config dir: ${agentDir}
`);
        process.stderr.write(`[nebiusrelay pi] session dir: ${sessionDir}
`);
      }
      process.stderr.write(`Nebius TF Relay \u25B8 Launching Pi Code with Nebius Token Factory.
`);
      const child = spawn4("pi", args, {
        env: {
          ...process.env,
          PI_CODING_AGENT_DIR: agentDir,
          PI_CODING_AGENT_SESSION_DIR: sessionDir,
          NEBIUS_API_KEY: apiKey
        },
        stdio: "inherit"
      });
      const result = await new Promise((resolve) => {
        child.on("error", (err) => {
          process.stderr.write(`Nebius TF Relay \u25B8 Failed to launch pi: ${err.message}.
`);
          resolve({ status: 1, signal: null });
        });
        child.on("exit", (status, signal) => resolve({ status, signal }));
      });
      try {
        rmSync2(agentDir, { recursive: true, force: true });
      } catch {
      }
      if (typeof result.status === "number") {
        process.exitCode = result.status;
      }
      return {};
    }
  });
});

// packages/cli/src/lib/harnesses/prime.ts
var exports_prime = {};
__export(exports_prime, {
  primeModelsJson: () => primeModelsJson,
  default: () => prime_default
});
import { spawn as spawn5 } from "child_process";
import { mkdirSync, writeFileSync as writeFileSync3 } from "fs";
import { join as join3 } from "path";
function primeAgentDir() {
  return join3(nebiusrelayHome2(), "prime-agent");
}
function primeArgsWithoutNebiusrelayOverrides(args) {
  const sanitized = [];
  for (let i = 0;i < args.length; i += 1) {
    const arg = args[i];
    if (arg === undefined) {
      continue;
    }
    if (VALUE_FLAGS2.has(arg)) {
      i += 1;
      continue;
    }
    if (arg.startsWith("--api-key=") || arg.startsWith("--provider=") || arg.startsWith("--model=") || arg.startsWith("--models=")) {
      continue;
    }
    sanitized.push(arg);
  }
  return sanitized;
}
function primeModelsJson(apiKey) {
  const models = getCodexSupportedModels().map(({ definition }) => ({
    id: definition.id,
    name: definition.name,
    reasoning: definition.reasoning,
    input: definition.modalities.input,
    contextWindow: definition.limit.context,
    maxTokens: definition.limit.output,
    cost: {
      input: definition.cost.input,
      output: definition.cost.output,
      cacheRead: definition.cost.cache_read ?? 0,
      cacheWrite: 0
    }
  }));
  return `${JSON.stringify({
    providers: {
      [PRIME_PROVIDER_ID]: {
        baseUrl: NEBIUS_BASE_URL,
        api: "openai-completions",
        apiKey,
        compat: { supportsDeveloperRole: false },
        models
      }
    }
  }, null, 2)}
`;
}
var PRIME_PROVIDER_ID = "nebius", PRIME_BIN = "prime-agent", VALUE_FLAGS2, prime_default;
var init_prime = __esm(() => {
  init_dist3();
  init_defaults2();
  init_harness();
  init_nebius_core();
  init_paths();
  VALUE_FLAGS2 = new Set(["--api-key", "--provider", "--model", "--models"]);
  prime_default = defineHarness({
    id: HARNESS.PRIME,
    label: "Prime Agent",
    async run(ctx) {
      const apiKey = await resolveNebiusApiKey({
        apiKey: ctx.apiKey,
        home: ctx.home
      });
      if (!apiKey) {
        throw new Error("No Nebius API key found. Pass --api-key or set NEBIUS_API_KEY.");
      }
      const agentDir = primeAgentDir();
      mkdirSync(agentDir, { recursive: true, mode: 448 });
      writeFileSync3(join3(agentDir, "models.json"), primeModelsJson(apiKey), {
        encoding: "utf8",
        mode: 384
      });
      const selectedModel = resolveCodexModel(ctx.main);
      const args = [
        "--provider",
        PRIME_PROVIDER_ID,
        "--model",
        selectedModel.id,
        ...primeArgsWithoutNebiusrelayOverrides(ctx.passthrough ?? [])
      ];
      if (process.env.NEBIUSRELAY_DEBUG === "1") {
        process.stderr.write(`[nebiusrelay prime] provider: ${PRIME_PROVIDER_ID}
`);
        process.stderr.write(`[nebiusrelay prime] model: ${selectedModel.id}
`);
        process.stderr.write(`[nebiusrelay prime] config dir: ${agentDir}
`);
      }
      process.stderr.write(`Nebius TF Relay \u25B8 Launching Prime Agent with Nebius Token Factory (${selectedModel.definition.name}).
`);
      const child = spawn5(PRIME_BIN, args, {
        env: {
          ...process.env,
          PRIME_AGENT_CODING_AGENT_DIR: agentDir,
          NEBIUS_API_KEY: apiKey
        },
        stdio: "inherit"
      });
      const result = await new Promise((resolve) => {
        child.on("error", (err) => {
          process.stderr.write(`Nebius TF Relay \u25B8 Failed to launch ${PRIME_BIN}: ${err.message}.
`);
          resolve({ status: 1, signal: null });
        });
        child.on("exit", (status, signal) => resolve({ status, signal }));
      });
      if (typeof result.status === "number") {
        process.exitCode = result.status;
      }
      return {};
    }
  });
});

// packages/cli/src/lib/codex-app/toml.ts
function removeManagedBlock(raw, markerStart, markerEnd) {
  const start = raw.indexOf(markerStart);
  if (start < 0) {
    return raw;
  }
  const end = raw.indexOf(markerEnd, start);
  if (end < 0) {
    return raw;
  }
  const afterEnd = end + markerEnd.length;
  return `${raw.slice(0, start).trimEnd()}
${raw.slice(afterEnd).replace(/^\s*\n/, "")}`;
}
function removeTomlSections(raw, sectionNames) {
  if (sectionNames.length === 0 || raw.trim() === "") {
    return raw;
  }
  const remove = new Set(sectionNames.map((section) => `[${section}]`));
  const lines = raw.split(`
`);
  const kept = [];
  let skipping = false;
  for (const line of lines) {
    if (/^\s*\[/.test(line)) {
      skipping = remove.has(line.trim());
    }
    if (!skipping) {
      kept.push(line);
    }
  }
  return kept.join(`
`).replace(/\n{3,}/g, `

`);
}
function splitTomlPreamble(raw) {
  const match = raw.match(/(?:^|\n)\s*\[/);
  if (!match || match.index === undefined) {
    return [raw, ""];
  }
  const tableStart = match[0].startsWith(`
`) ? match.index + 1 : match.index;
  return [raw.slice(0, tableStart), raw.slice(tableStart)];
}
function upsertTopLevelTomlKeys(preamble, values) {
  const seen = new Set;
  const lines = preamble.split(/\n/);
  const next = lines.map((line) => {
    const match = /^(\s*)([A-Za-z0-9_-]+)(\s*=\s*)(.*)$/.exec(line);
    if (!match) {
      return line;
    }
    const key = match[2];
    if (!key) {
      return line;
    }
    const value = values[key];
    if (value === undefined) {
      return line;
    }
    seen.add(key);
    return `${match[1] ?? ""}${key}${match[3] ?? " = "}${value}`;
  });
  const insertion = Object.entries(values).filter(([key]) => !seen.has(key)).map(([key, value]) => `${key} = ${value}`);
  const compact = next.join(`
`).trimEnd();
  const prefix = compact ? `${compact}
` : "";
  return `${prefix}${insertion.join(`
`)}${insertion.length > 0 ? `
` : ""}`;
}
function removeTopLevelTomlKeys(preamble, keys) {
  const remove = new Set(keys);
  return preamble.split(/\n/).filter((line) => {
    const match = /^(\s*)([A-Za-z0-9_-]+)(\s*=\s*)(.*)$/.exec(line);
    return !match || !remove.has(match[2] ?? "");
  }).join(`
`);
}
function tomlString2(value) {
  return JSON.stringify(value);
}

// packages/cli/src/lib/codex-app/session-lock.ts
import { mkdir as mkdir8, readFile as readFile6, rename as rename5, writeFile as writeFile7 } from "fs/promises";
import path15 from "path";
function appSessionLockPath(home) {
  return path15.join(nebiusrelayHomeDir(home), "codex-app", "session.json");
}
function nebiusrelayHomeDir(home) {
  return process.env.NEBIUSRELAY_HOME || path15.join(home, ".nebiusrelay");
}
async function writeAppSessionLock(home, lock) {
  await writeTextAtomic2(appSessionLockPath(home), `${JSON.stringify(lock, null, 2)}
`);
}
async function isManagedCodexAppConfig(home, configPath, markerStart, modelCatalogPath) {
  const raw = await readTextIfExists2(configPath);
  if (!raw) {
    return false;
  }
  if (raw.includes(markerStart)) {
    return true;
  }
  return raw.includes('model_provider = "openai"') && raw.includes('openai_base_url = "http://127.0.0.1:') && raw.includes(modelCatalogPath);
}
async function readTextIfExists2(file) {
  try {
    return await readFile6(file, "utf8");
  } catch (err) {
    if (isNodeError3(err) && err.code === "ENOENT") {
      return;
    }
    throw err;
  }
}
async function writeTextAtomic2(file, value) {
  await mkdir8(path15.dirname(file), { recursive: true });
  const tmp = `${file}.tmp-${process.pid}`;
  await writeFile7(tmp, value, { encoding: "utf8", mode: 384 });
  await rename5(tmp, file);
}
function isNodeError3(err) {
  return err instanceof Error && "code" in err;
}
var init_session_lock = __esm(() => {
  init_paths();
});

// packages/cli/src/lib/codex-app/process.ts
import { execFile, spawn as spawn6 } from "child_process";
import { promisify } from "util";
async function launchCodexApp(options) {
  const wasRunning = await isCodexAppRunning();
  let restarted = false;
  let restartDeclined = false;
  let restartUnsupported = false;
  if (wasRunning) {
    if (await shouldRestartCodexApp(options.reason)) {
      restarted = await quitCodexApp();
      restartUnsupported = !restarted;
    } else {
      restartDeclined = true;
    }
  }
  const launchAttempted = !(restartDeclined || restartUnsupported || !options.openIfClosed);
  const launched = launchAttempted ? await openCodexApp() : false;
  return { launched, launchAttempted, wasRunning, restarted, restartDeclined, restartUnsupported };
}
function codexAppLaunchMessage(result) {
  if (result.wasRunning && result.restarted && result.launched) {
    return "ChatGPT App was already open; restart approved and relaunch requested.";
  }
  if (result.wasRunning && result.restartDeclined) {
    return "ChatGPT App is already open. Restart it when you are ready so it reloads this profile.";
  }
  if (result.wasRunning && result.restartUnsupported) {
    return "ChatGPT App is already open, but nebiusrelay could not restart it. Quit and reopen ChatGPT App when you are ready.";
  }
  if (!result.wasRunning && !result.launchAttempted) {
    return "ChatGPT App was not running.";
  }
  return result.launched ? "ChatGPT App launch requested." : "Config written, but ChatGPT App could not be launched automatically. Open ChatGPT App manually.";
}
async function shouldRestartCodexApp(reason) {
  if (!isInteractive()) {
    return false;
  }
  const clack = await Promise.resolve().then(() => (init_dist2(), exports_dist));
  const action = reason === "restored" ? "reload your restored ChatGPT profile" : "reload the Nebius TF Relay profile";
  const restart = await clack.confirm({
    message: `ChatGPT App is already open. Restart it now to ${action}?`,
    initialValue: false
  });
  return restart === true;
}
async function openCodexApp() {
  const launchedViaCodex = await spawnDetached("codex", ["app", process.cwd()]);
  if (launchedViaCodex) {
    return true;
  }
  if (process.platform === "darwin") {
    for (const name of MACOS_APP_NAMES) {
      if (await spawnDetached("open", ["-a", name, process.cwd()])) {
        return true;
      }
    }
    return false;
  }
  if (process.platform === "win32") {
    for (const name of WIN32_PROCESS_NAMES) {
      if (await spawnDetached("cmd", ["/c", "start", "", name])) {
        return true;
      }
    }
    return false;
  }
  return false;
}
async function isCodexAppRunning() {
  if (process.platform === "darwin") {
    return Boolean(await runningMacosAppName());
  }
  if (process.platform === "win32") {
    return Boolean(await runningWin32ProcessName());
  }
  return false;
}
async function quitCodexApp() {
  if (process.platform === "darwin") {
    const name = await runningMacosAppName();
    if (!name) {
      return false;
    }
    try {
      await execFileAsync("/usr/bin/osascript", ["-e", `tell application "${name}" to quit`]);
      return waitForCodexAppExit();
    } catch {
      return false;
    }
  }
  if (process.platform === "win32") {
    const name = await runningWin32ProcessName();
    if (!name) {
      return false;
    }
    try {
      await execFileAsync("taskkill", ["/IM", name]);
      return waitForCodexAppExit();
    } catch {
      return false;
    }
  }
  return false;
}
async function runningMacosAppName() {
  for (const name of MACOS_APP_NAMES) {
    try {
      const { stdout } = await execFileAsync("/usr/bin/osascript", [
        "-e",
        `application "${name}" is running`
      ]);
      if (stdout.trim() === "true") {
        return name;
      }
    } catch {
    }
  }
  return;
}
async function runningWin32ProcessName() {
  for (const name of WIN32_PROCESS_NAMES) {
    try {
      const { stdout } = await execFileAsync("tasklist", ["/FI", `IMAGENAME eq ${name}`]);
      if (stdout.toLowerCase().includes(name.toLowerCase())) {
        return name;
      }
    } catch {
    }
  }
  return;
}
async function waitForCodexAppExit() {
  const deadline = Date.now() + 5000;
  while (Date.now() < deadline) {
    if (!await isCodexAppRunning()) {
      return true;
    }
    await sleep3(200);
  }
  return false;
}
async function spawnDetached(command, args) {
  return new Promise((resolve) => {
    const child = spawn6(command, args, {
      detached: true,
      stdio: "ignore"
    });
    child.once("error", () => resolve(false));
    child.once("spawn", () => {
      child.unref();
      resolve(true);
    });
  });
}
function isInteractive() {
  return Boolean(process.stdin.isTTY && process.stdout.isTTY);
}
function sleep3(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
var execFileAsync, MACOS_APP_NAMES, WIN32_PROCESS_NAMES;
var init_process = __esm(() => {
  execFileAsync = promisify(execFile);
  MACOS_APP_NAMES = ["ChatGPT", "Codex"];
  WIN32_PROCESS_NAMES = ["ChatGPT.exe", "Codex.exe"];
});

// packages/cli/src/lib/codex-app.ts
var exports_codex_app = {};
__export(exports_codex_app, {
  runCodexAppCommand: () => runCodexAppCommand,
  codexAppModelCatalogJson: () => codexAppModelCatalogJson,
  buildCodexAppConfig: () => buildCodexAppConfig,
  CODEX_APP_ALPHA_STATUS: () => CODEX_APP_ALPHA_STATUS
});
import { constants as fsConstants } from "fs";
import { access as access2, copyFile, mkdir as mkdir9, readFile as readFile7, rename as rename6, rm as rm2, writeFile as writeFile8 } from "fs/promises";
import path16 from "path";
async function runCodexAppCommand(ctx) {
  if (ctx.restore) {
    return restoreCodexApp(ctx.home);
  }
  const apiKey = await resolveNebiusApiKey({
    apiKey: ctx.apiKey,
    home: ctx.home
  });
  await initModelCatalog({
    ...apiKey ? { apiKey } : {},
    ...ctx.home ? { home: ctx.home } : {}
  });
  if (!apiKey) {
    throw new Error("No Nebius API key found. Pass --api-key, run `nebiusrelay configure`, or set NEBIUS_API_KEY.");
  }
  const selectedModel = resolveCodexModel(ctx.main);
  const authToken = await localProxyAuthToken();
  const sessionToken = codexAppSessionToken(authToken);
  const telemetrySessionId = sessionToken;
  const startedAt = Date.now();
  const { url: proxyUrl } = await ensureDaemon();
  const agentProxyUrl = daemonSessionUrl(proxyUrl, sessionToken);
  const catalogPath = await writePersistentModelCatalog(ctx.home);
  const registration = {
    token: sessionToken,
    authToken,
    agent: "codex-app",
    apiKey,
    modelLabel: `${selectedModel.definition.name} (ChatGPT App alpha)`,
    modelId: selectedModel.definition.id,
    targetModelId: selectedModel.definition.id,
    modelName: selectedModel.definition.name,
    modelDefinition: selectedModel.definition,
    ...process.env.NEBIUSRELAY_DEBUG === "1" ? { debug: true } : {}
  };
  await registerDaemonSession(proxyUrl, registration);
  await writeAppRegistration(registration, nebiusrelayHomeDir2(ctx.home));
  const configPath = codexConfigPath2(ctx.home);
  const backup = await backupCodexAppConfig(ctx.home, configPath);
  const existing = await readTextIfExists3(configPath);
  const next = buildCodexAppConfig(existing ?? "", {
    modelId: selectedModel.definition.id,
    providerId: CODEX_APP_PROVIDER_ID,
    providerName: "Nebius TF Relay",
    baseUrl: `${agentProxyUrl}/v1`,
    bearerToken: authToken,
    catalogPath
  });
  await writeTextAtomic3(configPath, next);
  await bustStaleModelsCache(ctx.home);
  await writeAppSessionLock(ctx.home, {
    pid: process.pid,
    startedAt: new Date().toISOString(),
    sessionToken,
    configPath,
    catalogPath
  });
  const launch = await launchCodexApp({ reason: "configured", openIfClosed: true });
  sendTelemetryEvent({
    event: "session_started",
    sessionId: telemetrySessionId,
    agent: "codex-app",
    initialModel: selectedModel.definition.id,
    startedAt,
    metadata: {
      integration: "codex-app",
      providerId: CODEX_APP_PROVIDER_ID,
      providerAuthWorkaround: CODEX_APP_REQUIRES_OPENAI_AUTH_WORKAROUND,
      workaroundIssue: "openai/codex#10867",
      catalogModelCount: codexAppModelCatalogCount(),
      proxySessionRegistered: true,
      launchAttempted: launch.launchAttempted,
      launched: launch.launched,
      wasRunning: launch.wasRunning,
      restarted: launch.restarted,
      restartDeclined: launch.restartDeclined,
      restartUnsupported: launch.restartUnsupported
    }
  });
  const intro = [
    "ChatGPT App profile changed to Nebius TF Relay. (alpha)",
    `Model: ${selectedModel.definition.name}`,
    "Start a task or open a repository in ChatGPT App as usual.",
    "Restore your previous ChatGPT App profile with: nebiusrelay chatgpt --restore",
    `Backup: ${backup}`,
    codexAppLaunchMessage(launch)
  ].filter(Boolean).join(`
`);
  return { message: intro };
}
function buildCodexAppConfig(rawConfig, options) {
  const withoutManagedBlock = removeManagedBlock(rawConfig, CODEX_APP_CONFIG_MARKER_START, CODEX_APP_CONFIG_MARKER_END);
  const withoutLegacyTables = removeTomlSections(withoutManagedBlock, [
    `profiles.${options.providerId}`,
    `profiles."${options.providerId}"`,
    `model_providers.${options.providerId}`,
    `model_providers."${options.providerId}"`
  ]);
  const withGenericDefaults = applyCodexGenericUserDefaults(withoutLegacyTables);
  const [preamble, rest] = splitTomlPreamble(withGenericDefaults);
  const managedPreamble = upsertTopLevelTomlKeys(preamble, {
    model: tomlString2(options.modelId),
    model_provider: tomlString2(options.providerId),
    model_catalog_json: tomlString2(options.catalogPath)
  });
  const cleanedPreamble = removeTopLevelTomlKeys(managedPreamble, [
    "model_reasoning_effort",
    "openai_base_url",
    "profile",
    "model_context_window",
    "model_auto_compact_token_limit"
  ]);
  const providerBlock = [
    CODEX_APP_CONFIG_MARKER_START,
    "# nebiusrelay codex-app configures a dedicated alpha provider for ChatGPT Desktop.",
    `[model_providers.${options.providerId}]`,
    `name = ${tomlString2(options.providerName)}`,
    `base_url = ${tomlString2(options.baseUrl)}`,
    'wire_api = "responses"',
    "# ChatGPT Desktop currently gates its model picker on provider auth state.",
    "# Setting this true is a Desktop workaround for custom providers; the",
    "# actual model requests still go to the local Nebius TF Relay base_url above.",
    "# See https://github.com/openai/codex/issues/10867",
    `requires_openai_auth = ${CODEX_APP_REQUIRES_OPENAI_AUTH_WORKAROUND ? "true" : "false"}`,
    CODEX_APP_CONFIG_MARKER_END,
    ""
  ].join(`
`);
  const body = `${cleanedPreamble}${rest}`;
  const trimmedBody = body.endsWith(`
`) ? body : `${body}
`;
  return `${trimmedBody}
${providerBlock}`;
}
async function restoreCodexApp(home) {
  const manifestPath = path16.join(backupDir(home), BACKUP_MANIFEST);
  const raw = await readTextIfExists3(manifestPath);
  if (!raw) {
    throw new Error(`No ChatGPT App backup found at ${manifestPath}.`);
  }
  const manifest = JSON.parse(raw);
  for (const entry of manifest.files) {
    if (entry.existed) {
      if (!entry.backupPath) {
        throw new Error(`Backup manifest is missing backupPath for ${entry.path}.`);
      }
      await mkdir9(path16.dirname(entry.path), { recursive: true });
      await copyFile(entry.backupPath, entry.path);
    } else {
      await rm2(entry.path, { force: true });
    }
  }
  await rm2(modelCatalogPath(home), { force: true });
  await rm2(appSessionLockPath(home), { force: true });
  await clearAppRegistration(nebiusrelayHomeDir2(home));
  await bustStaleModelsCache(home);
  try {
    const authToken = await localProxyAuthToken();
    const { url } = await ensureDaemon();
    await daemonFetch(`${url}/internal/sessions/${encodeURIComponent(codexAppSessionToken(authToken))}`, { method: "DELETE" });
  } catch {
  }
  const launch = await launchCodexApp({ reason: "restored", openIfClosed: false });
  return {
    message: [
      "ChatGPT App restored to your previous profile.",
      `Backup date: ${manifest.createdAt}`,
      codexAppLaunchMessage(launch)
    ].join(`
`)
  };
}
async function backupFiles(home, files) {
  const dir = backupDir(home);
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const snapshotDir = path16.join(dir, stamp);
  await mkdir9(snapshotDir, { recursive: true });
  const entries = [];
  for (const file of files) {
    if (await exists(file)) {
      const backupPath = path16.join(snapshotDir, backupNameFor(file));
      await mkdir9(path16.dirname(backupPath), { recursive: true });
      await copyFile(file, backupPath);
      entries.push({ path: file, backupPath, existed: true });
    } else {
      entries.push({ path: file, existed: false });
    }
  }
  const manifest = { createdAt: new Date().toISOString(), files: entries };
  await writeTextAtomic3(path16.join(dir, BACKUP_MANIFEST), `${JSON.stringify(manifest, null, 2)}
`);
  return snapshotDir;
}
async function backupCodexAppConfig(home, configPath) {
  const manifestPath = path16.join(backupDir(home), BACKUP_MANIFEST);
  if (await isManagedCodexAppConfig(home, codexConfigPath2(home), CODEX_APP_CONFIG_MARKER_START, modelCatalogPath(home))) {
    const existing = await readTextIfExists3(manifestPath);
    if (existing) {
      try {
        const manifest = JSON.parse(existing);
        if (manifest.files.some((entry) => entry.path === configPath)) {
          return path16.dirname(manifest.files.find((entry) => entry.path === configPath)?.backupPath ?? manifestPath);
        }
      } catch {
      }
    }
  }
  return backupFiles(home, [configPath]);
}
async function writePersistentModelCatalog(home) {
  const file = modelCatalogPath(home);
  await writeTextAtomic3(file, `${codexAppModelCatalogJson()}
`);
  return file;
}
function codexAppModelCatalogJson() {
  return codexModelCatalogJson();
}
function codexAppModelCatalogCount() {
  try {
    const parsed = JSON.parse(codexAppModelCatalogJson());
    return Array.isArray(parsed.models) ? parsed.models.length : 0;
  } catch {
    return 0;
  }
}
function codexConfigPath2(home) {
  return path16.join(home, ".codex", "config.toml");
}
function backupDir(home) {
  return path16.join(process.env.NEBIUSRELAY_HOME || path16.join(home, ".nebiusrelay"), "backup", "codex-app");
}
function modelCatalogPath(home) {
  return path16.join(home, ".codex", "nebiusrelay-codex-app-models.json");
}
async function bustStaleModelsCache(home) {
  const cachePath2 = path16.join(home, ".codex", "models_cache.json");
  try {
    await rm2(cachePath2, { force: true });
  } catch {
  }
}
function nebiusrelayHomeDir2(home) {
  return process.env.NEBIUSRELAY_HOME || path16.join(home, ".nebiusrelay");
}
function codexAppSessionToken(authToken) {
  return authToken;
}
function backupNameFor(file) {
  return file.replace(/^[a-zA-Z]:/, "").split(path16.sep).filter(Boolean).join("__") || "file";
}
async function readTextIfExists3(file) {
  try {
    return await readFile7(file, "utf8");
  } catch (err) {
    if (isNodeError4(err) && err.code === "ENOENT") {
      return;
    }
    throw err;
  }
}
async function writeTextAtomic3(file, value) {
  await mkdir9(path16.dirname(file), { recursive: true });
  const tmp = `${file}.tmp-${process.pid}`;
  await writeFile8(tmp, value, { encoding: "utf8", mode: 384 });
  await rename6(tmp, file);
}
async function exists(file) {
  try {
    await access2(file, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}
function isNodeError4(err) {
  return err instanceof Error && "code" in err;
}
var CODEX_APP_PROVIDER_ID, CODEX_APP_CONFIG_MARKER_START = "# >>> nebiusrelay codex-app alpha >>>", CODEX_APP_CONFIG_MARKER_END = "# <<< nebiusrelay codex-app alpha <<<", CODEX_APP_REQUIRES_OPENAI_AUTH_WORKAROUND = true, BACKUP_MANIFEST = "latest.json", CODEX_APP_ALPHA_STATUS;
var init_codex_app = __esm(() => {
  init_defaults2();
  init_catalog();
  init_model_catalog_init();
  init_user_config();
  init_app_registration();
  init_launch();
  init_telemetry();
  init_nebius_core();
  init_paths();
  init_session_lock();
  init_process();
  CODEX_APP_PROVIDER_ID = `${CODEX_PROVIDER_ID}_codex_app`;
  CODEX_APP_ALPHA_STATUS = {
    providerId: CODEX_APP_PROVIDER_ID,
    defaultModel: codexDefaultModelId()
  };
});

// packages/cli/src/bin/nebiusrelay.ts
import os8 from "os";

// packages/cli/src/lib/load-env.ts
import { readFileSync, existsSync } from "fs";
import path from "path";
var LOADABLE_ENV_KEYS = new Set(["NEBIUS_API_KEY"]);
function loadEnvFile(startDir = process.cwd()) {
  const file = findEnvFile(startDir);
  if (!file) {
    return;
  }
  const raw = readFileSync(file, "utf8");
  for (const entry of parseEnv(raw)) {
    if (!LOADABLE_ENV_KEYS.has(entry.key)) {
      continue;
    }
    if (process.env[entry.key] === undefined) {
      process.env[entry.key] = entry.value;
    }
  }
}
function findEnvFile(startDir) {
  let dir = path.resolve(startDir);
  for (let i = 0;i < 20; i += 1) {
    const candidate = path.join(dir, ".env");
    if (existsSync(candidate)) {
      return candidate;
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      break;
    }
    dir = parent;
  }
  return null;
}
function parseEnv(raw) {
  const entries = [];
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const withoutExport = trimmed.startsWith("export ") ? trimmed.slice("export ".length) : trimmed;
    const eq = withoutExport.indexOf("=");
    if (eq <= 0) {
      continue;
    }
    const key = withoutExport.slice(0, eq).trim();
    if (!key || !/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) {
      continue;
    }
    let value = withoutExport.slice(eq + 1).trim();
    if (value.startsWith('"') && value.endsWith('"') || value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    } else if (value.includes(" #")) {
      value = (value.split(" #")[0] ?? value).trim();
    }
    entries.push({ key, value });
  }
  return entries;
}

// packages/cli/src/lib/parse-args.ts
init_harness();
var FLAG_ALIASES = {
  "--api-key": "apiKey",
  "--main": "main",
  "--model": "main",
  "--search": "search",
  "--slot": "slot"
};
var BOOLEAN_FLAGS = new Set(["--json", "--restore"]);
var BOOLEAN_FLAG_KEYS = {
  "--json": "json",
  "--restore": "restore"
};
function parseArgs(argv) {
  const positional = [];
  const flags = { json: false, restore: false };
  for (let i = 0;i < argv.length; i += 1) {
    const token = argv[i];
    if (token === undefined) {
      continue;
    }
    if (token === "--") {
      flags.passthrough = argv.slice(i + 1);
      break;
    }
    if (BOOLEAN_FLAGS.has(token)) {
      flags[BOOLEAN_FLAG_KEYS[token]] = true;
      continue;
    }
    if (token in FLAG_ALIASES) {
      const key = FLAG_ALIASES[token];
      const value = argv[i + 1];
      if (value === undefined) {
        throw new Error(`Flag ${token} expects a value`);
      }
      flags[key] = value;
      i += 1;
      continue;
    }
    positional.push(token);
    if (isHarnessToken(token)) {
      flags.passthrough = argv.slice(i + 1);
      break;
    }
  }
  if (flags.apiKey) {
    flags.apiKeyFromFlag = true;
  }
  return { positional, flags };
}
function isHarnessToken(value) {
  return value === "picode" || ALL_HARNESSES.includes(value);
}

// packages/cli/src/lib/commands/global.ts
init_dist2();
init_harness();
import os5 from "os";

// packages/cli/src/lib/harness-registry.ts
init_harness();
var LOADERS = {
  [HARNESS.CLAUDE]: () => Promise.resolve().then(() => (init_claude(), exports_claude)),
  [HARNESS.CODEX]: () => Promise.resolve().then(() => (init_codex(), exports_codex)),
  [HARNESS.OPENCODE]: () => Promise.resolve().then(() => (init_opencode(), exports_opencode)),
  [HARNESS.PI]: () => Promise.resolve().then(() => (init_pi(), exports_pi)),
  [HARNESS.PRIME]: () => Promise.resolve().then(() => (init_prime(), exports_prime))
};
async function loadHarness(harness) {
  const loader = LOADERS[harness];
  if (!loader) {
    throw new Error(`Harness "${harness}" is not implemented yet.`);
  }
  const mod = await loader();
  return mod.default;
}
function isHarnessImplemented(harness) {
  return harness in LOADERS;
}

// packages/cli/src/lib/detect.ts
init_harness();
import { spawnSync } from "child_process";
function resolveBinPath(bin) {
  const isWindows = process.platform === "win32";
  const result = spawnSync(isWindows ? "where" : "which", [bin], { encoding: "utf8" });
  if (result.status !== 0) {
    return null;
  }
  const path14 = result.stdout.trim().split(`
`)[0]?.trim();
  return path14 || null;
}
function detectInstalledHarnesses(harnesses = ALL_HARNESSES) {
  const result = {};
  for (const harness of harnesses) {
    const path14 = resolveBinPath(HARNESS_BIN[harness]);
    result[harness] = { installed: Boolean(path14), path: path14 };
  }
  return result;
}
function detectInstalledHarness(harness) {
  const path14 = resolveBinPath(HARNESS_BIN[harness]);
  return { installed: Boolean(path14), path: path14 };
}
function missingHarnessMessage(harness) {
  const install = HARNESS_INSTALL[harness];
  return [
    `${HARNESS_LABEL[harness]} is not installed or "${HARNESS_BIN[harness]}" is not on PATH.`,
    `Install it with: ${install.command}`,
    `Docs: ${install.url}`,
    `Then re-run: nebiusrelay ${harness}`
  ].join(`
`);
}

// packages/cli/src/lib/commands/global.ts
init_global_config();
init_version();
function printHelp() {
  console.log(`nebiusrelay v${VERSION} - Nebius Token Factory for coding CLIs

Usage:
  nebiusrelay configure
  nebiusrelay whoami
  nebiusrelay chatgpt [--model <model>] [--restore]  (alpha)
  nebiusrelay codex [...]       (alias: ncodex)
  nebiusrelay claude [...]      (alias: nclaude)
  nebiusrelay pi [...]          (alias: npi)
  nebiusrelay opencode [...]    (alias: nopencode)
  nebiusrelay prime [...]       (alias: nprime)

Extra args after codex/claude/pi/opencode/prime are passed through.
ChatGPT App support is alpha; run \`nebiusrelay chatgpt --restore\` (alias: codex-app) to restore the previous desktop config.

Codex flags:
  --no-mcp   Skip your ~/.codex/config.toml MCP servers for a fast startup
             (maps to codex --ignore-user-config; also skips other codex config).

Your last-used model is remembered per tool: change it with /model (or --model
before the harness) and the next launch reuses it.

Docs: https://nebius-tf-relay.vercel.app/llms.txt
  LLM-readable documentation - if you are an AI agent asked to install, configure,
  or use nebiusrelay (including headless use), read that file first.
`);
}
async function runConfigure(home = os5.homedir()) {
  pe("nebiusrelay configure");
  const detected = detectInstalledHarnesses();
  const notImplemented = ALL_HARNESSES.filter((h2) => !isHarnessImplemented(h2));
  const lines = ALL_HARNESSES.map((h2) => {
    const found = detected[h2].installed ? "found" : "not found";
    const support = isHarnessImplemented(h2) ? " (ephemeral settings)" : " (support coming later)";
    return `  ${HARNESS_LABEL[h2]}: ${found}${support}`;
  });
  v2.info(`Detected tools:
${lines.join(`
`)}`);
  const existing = resolveStoredApiKey((await readGlobalConfig(home)).apiKey);
  let apiKey = existing || process.env.NEBIUS_API_KEY || "";
  if (!apiKey) {
    const entered = await oe({
      message: "Nebius API key (from https://tokenfactory.nebius.com/?modals=create-api-key):",
      validate: (value) => value.trim() ? undefined : "An API key is required"
    });
    if (lD(entered)) {
      he("Cancelled.");
      return false;
    }
    apiKey = entered.trim();
  }
  await setGlobalApiKey(home, apiKey);
  const existingTavily = resolveStoredTavilyApiKey((await readGlobalConfig(home)).tavilyApiKey);
  let tavilyApiKey = existingTavily || process.env.TAVILY_API_KEY || "";
  if (!tavilyApiKey) {
    const enteredTavily = await oe({
      message: "Tavily API key for web search (from https://app.tavily.com - press Enter to skip; web search will be disabled):",
      validate: (value) => value.trim() || value === "" ? undefined : undefined
    });
    if (lD(enteredTavily)) {
      he("Cancelled.");
      return false;
    }
    tavilyApiKey = enteredTavily.trim();
  }
  await setGlobalTavilyApiKey(home, tavilyApiKey);
  if (tavilyApiKey) {
    v2.success("Tavily web search enabled.");
  } else {
    v2.info("Tavily key skipped - web search will be unavailable in your agents.");
  }
  const launchable = ALL_HARNESSES.filter((h2) => isHarnessImplemented(h2) && detected[h2].installed);
  if (launchable.length > 0) {
    v2.info(`Ready to launch: ${launchable.map((h2) => HARNESS_LABEL[h2]).join(", ")}. Run \`nebiusrelay <harness>\` to start - nothing is written to disk.`);
  }
  if (notImplemented.length > 0) {
    v2.info(`${notImplemented.map((h2) => HARNESS_LABEL[h2]).join(" and ")} support is coming in a later phase (needs a local translation proxy).`);
  }
  ge("Done.");
  return true;
}

// packages/cli/src/lib/commands/harness.ts
init_harness();
import os6 from "os";
init_model_catalog_init();
async function dispatchHarnessCommand(harnessName, verb, flags) {
  if (!isKnownHarness(harnessName)) {
    throw new Error(`Unknown harness "${harnessName}". Expected one of: ${ALL_HARNESSES.join(", ")}`);
  }
  if (!isHarnessImplemented(harnessName)) {
    throw new Error(`${HARNESS_LABEL[harnessName]} support isn't built yet (coming in a later phase - it needs a local translation proxy).`);
  }
  const harnessModule = await loadHarness(harnessName);
  if (verb !== undefined && verb !== "run") {
    throw new Error(`Unknown command "${harnessName} ${verb}". Expected: run.`);
  }
  if (!detectInstalledHarness(harnessName).installed) {
    throw new Error(missingHarnessMessage(harnessName));
  }
  const ctx = { home: os6.homedir(), ...flags };
  await initModelCatalog({ home: ctx.home });
  const result = await harnessModule.run(ctx);
  renderResult(result, flags);
}
function isKnownHarness(value) {
  return value !== undefined && ALL_HARNESSES.includes(value);
}
function renderResult(result, flags) {
  if (!result) {
    return;
  }
  if (result.message) {
    console.log(result.message);
  }
  if (result.payload) {
    if (flags.json) {
      console.log(JSON.stringify(result.payload, null, 2));
    } else {
      for (const [key, value] of Object.entries(result.payload)) {
        console.log(`${key}: ${value ?? "(unset)"}`);
      }
    }
  }
}

// packages/cli/src/lib/commands/harness-invocation.ts
init_harness();
function resolveHarnessInvocation(positional, flags) {
  const [rawCommand, ...passthrough] = positional;
  const command = rawCommand === "picode" ? "pi" : rawCommand;
  return isHarnessCommand(command) ? { command, flags: withPrependedPassthrough(flags, passthrough) } : { command, flags };
}
function isHarnessCommand(value) {
  return value !== undefined && ALL_HARNESSES.includes(value);
}
function withPrependedPassthrough(flags, args) {
  const passthrough = [...args, ...flags.passthrough ?? []];
  if (passthrough.length === 0) {
    return flags;
  }
  const hasSeparator = passthrough[0] === "--";
  return {
    ...flags,
    passthrough: hasSeparator ? passthrough.slice(1) : passthrough,
    ...hasSeparator ? { passthroughSeparator: true } : {}
  };
}

// packages/cli/src/bin/nebiusrelay.ts
init_global_config();

// packages/cli/src/lib/autoupdate.ts
init_version();
import { writeFile as writeFile6, rename as rename4, stat as stat2 } from "fs/promises";
import path14 from "path";
import os7 from "os";
var UPDATE_ORIGIN = "https://nebius-tf-relay.vercel.app";
function resolveManifestUrl() {
  return process.env.NEBIUSRELAY_MANIFEST_URL ?? `${UPDATE_ORIGIN}/latest.json`;
}
var THROTTLE_MS = 60 * 60 * 1000;
var OVERALL_TIMEOUT_MS = 1e4;
var FETCH_TIMEOUT_MS2 = 5000;
function resolveInstallDir() {
  return process.env.NEBIUSRELAY_HOME || path14.join(os7.homedir(), ".nebiusrelay");
}
function installedBundlePath() {
  return path14.join(resolveInstallDir(), "bin", "nebiusrelay.js");
}
function isInstalledBundle() {
  const argv1 = process.argv[1];
  if (!argv1) {
    return false;
  }
  try {
    const resolved = path14.resolve(argv1);
    const installed = installedBundlePath();
    return realpathSafe(resolved) === realpathSafe(installed);
  } catch {
    return false;
  }
}
function realpathSafe(p) {
  try {
    return import.meta.require("fs").realpathSync(p);
  } catch {
    return p;
  }
}
function throttleFile() {
  return path14.join(resolveInstallDir(), ".update-check");
}
async function throttled() {
  try {
    const s = await stat2(throttleFile());
    return Date.now() - s.mtimeMs < THROTTLE_MS;
  } catch {
    return false;
  }
}
async function touchThrottle() {
  try {
    await writeFile6(throttleFile(), "", { flag: "w" });
  } catch {
  }
}
function parseSemver(v3) {
  const m2 = /^v?(\d+)\.(\d+)\.(\d+)/.exec(v3.trim());
  if (!m2) {
    return null;
  }
  return [Number(m2[1]), Number(m2[2]), Number(m2[3])];
}
function isNewer(latest, current) {
  const a3 = parseSemver(latest);
  const b3 = parseSemver(current);
  if (!a3 || !b3) {
    return false;
  }
  for (let i = 0;i < 3; i += 1) {
    const av = a3[i];
    const bv = b3[i];
    if (av !== bv && av !== undefined && bv !== undefined) {
      return av > bv;
    }
  }
  return false;
}
async function withTimeout(p, ms) {
  let timer;
  const guard = new Promise((_3, reject) => {
    timer = setTimeout(() => reject(new Error("timeout")), ms);
  });
  try {
    return await Promise.race([p, guard]);
  } finally {
    if (timer) {
      clearTimeout(timer);
    }
  }
}
async function fetchManifest() {
  const res = await withTimeout(fetch(resolveManifestUrl(), {
    headers: { "User-Agent": `nebiusrelay/${VERSION}` },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS2)
  }), FETCH_TIMEOUT_MS2);
  if (!res.ok) {
    throw new Error(`manifest ${res.status}`);
  }
  const data = await res.json();
  if (!data?.version) {
    throw new Error("manifest missing version");
  }
  return data;
}
async function downloadTo(url, dest) {
  const res = await withTimeout(fetch(url, {
    headers: { "User-Agent": `nebiusrelay/${VERSION}` },
    signal: AbortSignal.timeout(OVERALL_TIMEOUT_MS)
  }), OVERALL_TIMEOUT_MS);
  if (!res.ok || !res.body) {
    throw new Error(`download ${res.status}`);
  }
  const buf = new Uint8Array(await res.arrayBuffer());
  if (buf.byteLength === 0) {
    throw new Error("empty download");
  }
  const tmp = `${dest}.new-${process.pid}`;
  await writeFile6(tmp, buf, { mode: 420 });
  await rename4(tmp, dest);
}
async function maybeSelfUpdate() {
  if (process.env.NEBIUSRELAY_DISABLE_AUTOUPDATE === "1") {
    return;
  }
  if (!isInstalledBundle()) {
    return;
  }
  if (await throttled()) {
    return;
  }
  await touchThrottle();
  try {
    const manifest = await withTimeout(fetchManifest(), OVERALL_TIMEOUT_MS);
    if (!isNewer(manifest.version, VERSION)) {
      return;
    }
    const dest = installedBundlePath();
    const url = manifest.url ?? `${UPDATE_ORIGIN}/nebiusrelay.js`;
    await downloadTo(url, dest);
    process.stderr.write(`nebiusrelay: updated to v${manifest.version} (next run uses it)
`);
  } catch {
  }
}

// packages/cli/src/bin/nebiusrelay.ts
init_telemetry();
init_version();
async function daemonStop() {
  const { resolveDaemonPort: resolveDaemonPort2, daemonUrl: daemonUrl2, daemonPidPath: daemonPidPath2 } = await Promise.resolve().then(() => (init_server(), exports_server));
  const { readFile: readFile8, unlink: unlink3 } = await import("fs/promises");
  const pidPath = daemonPidPath2();
  const port = resolveDaemonPort2();
  let pid;
  try {
    const raw = (await readFile8(pidPath, "utf8")).trim();
    const parsed = raw ? Number.parseInt(raw, 10) : NaN;
    pid = Number.isFinite(parsed) ? parsed : undefined;
  } catch {
    pid = undefined;
  }
  if (pid === undefined) {
    console.log(`nebiusrelay daemon: not running (no pid file at ${pidPath}).`);
    return;
  }
  try {
    process.kill(pid, "SIGTERM");
  } catch (err) {
    const code = err.code;
    if (code === "ESRCH") {
      try {
        await unlink3(pidPath);
      } catch {
      }
      console.log(`nebiusrelay daemon: not running (stale pid file removed).`);
      return;
    }
    throw err;
  }
  await new Promise((resolve) => setTimeout(resolve, 300));
  try {
    await unlink3(pidPath);
  } catch {
  }
  console.log(`nebiusrelay daemon: stopped (pid ${pid}) on ${daemonUrl2(port)}.`);
}
async function loadStoredTavilyKey() {
  if (process.env.TAVILY_API_KEY) {
    return;
  }
  try {
    const { tavilyApiKey } = await readGlobalConfig("/Users/astrodevil");
    const resolved = resolveStoredTavilyApiKey(tavilyApiKey);
    if (resolved) {
      process.env.TAVILY_API_KEY = resolved;
    }
  } catch {
  }
}
async function hasNebiusApiKey() {
  try {
    const home = "/Users/astrodevil";
    if (!home) {
      return Boolean(process.env.NEBIUS_API_KEY?.trim());
    }
    const existing = resolveStoredApiKey((await readGlobalConfig(home)).apiKey);
    return Boolean(existing || process.env.NEBIUS_API_KEY?.trim());
  } catch {
    return Boolean(process.env.NEBIUS_API_KEY?.trim());
  }
}
async function ensureConfiguredForInteractiveLaunch() {
  if (await hasNebiusApiKey()) {
    return true;
  }
  if (!isInteractive2()) {
    return false;
  }
  const configured = await runConfigure();
  await loadStoredTavilyKey();
  return configured && await hasNebiusApiKey();
}
async function runInteractiveLauncher() {
  if (!isInteractive2()) {
    printHelp();
    return;
  }
  if (!await ensureConfiguredForInteractiveLaunch()) {
    return;
  }
  const clack = await Promise.resolve().then(() => (init_dist2(), exports_dist));
  const choice = await clack.select({
    message: "What do you want to run?",
    options: [
      { value: "codex", label: "Codex", hint: "ncodex" },
      { value: "claude", label: "Claude Code", hint: "nclaude" },
      { value: "pi", label: "Pi Code", hint: "npi" },
      { value: "opencode", label: "OpenCode", hint: "nopencode" },
      { value: "chatgpt", label: "ChatGPT Desktop", hint: "chatgpt" },
      { value: "configure", label: "Configure", hint: "API keys and detected tools" }
    ]
  });
  if (clack.isCancel(choice)) {
    clack.cancel("Cancelled.");
    return;
  }
  if (choice === "configure") {
    await runConfigure();
    return;
  }
  if (choice === "chatgpt") {
    const { runCodexAppCommand: runCodexAppCommand2 } = await Promise.resolve().then(() => (init_codex_app(), exports_codex_app));
    const result = await runCodexAppCommand2({ home: os8.homedir() });
    if (result.message) {
      console.log(result.message);
    }
    if (result.payload) {
      console.log(JSON.stringify(result.payload, null, 2));
    }
    return;
  }
  await dispatchHarnessCommand(choice, undefined, {});
}
function isInteractive2() {
  return Boolean(process.stdin.isTTY && process.stdout.isTTY);
}
async function main() {
  await maybeSelfUpdate();
  loadEnvFile();
  await loadStoredTavilyKey();
  const parsed = parseArgs(process.argv.slice(2));
  const [rawCommand, rawVerb] = parsed.positional;
  const command = rawCommand === "picode" ? "pi" : rawCommand === "chatgpt" || rawCommand === "chatgpt-app" ? "codex-app" : rawCommand;
  if (!command) {
    await runInteractiveLauncher();
    return;
  }
  if (command === "help" || command === "--help" || command === "-h") {
    printHelp();
    return;
  }
  if (command === "--version" || command === "-v" || command === "version") {
    process.stdout.write(`nebiusrelay v${VERSION}
`);
    return;
  }
  if (command === "whoami") {
    process.stdout.write(`${await getInstallId()}
`);
    return;
  }
  if (command === "configure") {
    await runConfigure();
    return;
  }
  if (command === "__telemetry-install-completed") {
    await sendTelemetryEvent({ event: "install_completed" });
    return;
  }
  if (command === "--daemon") {
    const { runDaemon: runDaemon2 } = await Promise.resolve().then(() => (init_server(), exports_server));
    await runDaemon2();
    return;
  }
  if (command === "daemon") {
    const verb = rawVerb;
    if (verb === undefined) {
      throw new Error('Unknown "daemon" command. Expected: stop.');
    }
    if (verb === "stop") {
      await daemonStop();
      return;
    }
    if (verb === "serve") {
      const { runDaemon: runDaemon2 } = await Promise.resolve().then(() => (init_server(), exports_server));
      await runDaemon2();
      return;
    }
    throw new Error(`Unknown "daemon ${verb}" command. Expected: stop.`);
  }
  if (command === "codex-app") {
    if (!parsed.flags.restore && !await ensureConfiguredForInteractiveLaunch()) {
      throw new Error("No Nebius API key found. Run `nebiusrelay configure` or set NEBIUS_API_KEY.");
    }
    const { runCodexAppCommand: runCodexAppCommand2 } = await Promise.resolve().then(() => (init_codex_app(), exports_codex_app));
    const result = await runCodexAppCommand2({ home: os8.homedir(), ...parsed.flags });
    if (result.message) {
      console.log(result.message);
    }
    if (result.payload) {
      console.log(JSON.stringify(result.payload, null, 2));
    }
    return;
  }
  const invocation = resolveHarnessInvocation(parsed.positional, parsed.flags);
  if ((invocation.command === "claude" || invocation.command === "codex" || invocation.command === "opencode" || invocation.command === "pi") && invocation.command !== undefined) {
    if (!await ensureConfiguredForInteractiveLaunch()) {
      throw new Error("No Nebius API key found. Run `nebiusrelay configure` or set NEBIUS_API_KEY.");
    }
  }
  if (isHarnessCommand(invocation.command)) {
    sendTelemetryEvent({ event: "cli_started", agent: invocation.command });
  }
  await dispatchHarnessCommand(invocation.command, undefined, invocation.flags);
}
main().catch((err) => {
  if (!(err instanceof Error)) {
    console.error(`Error: ${String(err)}`);
    process.exitCode = 1;
    return;
  }
  console.error(`Error: ${err.message}`);
  process.exitCode = 1;
});
