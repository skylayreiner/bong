var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// css-bundle-update-plugin-ns:/home/sysreiner/bong/node_modules/@remix-run/css-bundle/dist/index.js
var require_dist = __commonJS({
  "css-bundle-update-plugin-ns:/home/sysreiner/bong/node_modules/@remix-run/css-bundle/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var cssBundleHref2;
    exports.cssBundleHref = cssBundleHref2;
  }
});

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest,
  handleError: () => handleError
});
var import_stream = require("stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot")), import_server = require("react-dom/server"), import_jsx_dev_runtime = require("react/jsx-dev-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return (0, import_isbot.default)(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 46,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new import_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 95,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new import_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleError(error, { request, params, context }) {
  console.log(error);
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader
});
var import_css_bundle = __toESM(require_dist()), import_node3 = require("@remix-run/node"), import_react4 = require("@remix-run/react");

// app/session.server.ts
var import_node2 = require("@remix-run/node"), import_tiny_invariant = __toESM(require("tiny-invariant"));

// app/models/user.server.ts
var import_bcryptjs = __toESM(require("bcryptjs"));

// app/db.server.ts
var import_client = require("@prisma/client");

// app/singleton.server.ts
var singleton = (name, valueFactory) => {
  var _a;
  let g = global;
  return g.__singletons ?? (g.__singletons = {}), (_a = g.__singletons)[name] ?? (_a[name] = valueFactory()), g.__singletons[name];
};

// app/db.server.ts
var prisma = singleton("prisma", () => new import_client.PrismaClient());
prisma.$connect();

// app/utils.ts
var import_react2 = require("@remix-run/react"), import_react3 = require("react"), DEFAULT_REDIRECT = "/";
function safeRedirect(to, defaultRedirect = DEFAULT_REDIRECT) {
  return !to || typeof to != "string" || !to.startsWith("/") || to.startsWith("//") ? defaultRedirect : to;
}
function useMatchesData(id) {
  let matchingRoutes = (0, import_react2.useMatches)(), route = (0, import_react3.useMemo)(
    () => matchingRoutes.find((route2) => route2.id === id),
    [matchingRoutes, id]
  );
  return route == null ? void 0 : route.data;
}
function isUser(user) {
  return user && typeof user == "object" && typeof user.username == "string";
}
function useOptionalUser() {
  let data = useMatchesData("root");
  if (!(!data || !isUser(data.user)))
    return data.user;
}
function useUser() {
  let maybeUser = useOptionalUser();
  if (!maybeUser)
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  return maybeUser;
}
function validateEmail(email) {
  return typeof email == "string" && email.length > 3 && email.includes("@");
}
function generateRandomNumber(length) {
  return Array.from(
    { length },
    () => Math.floor(Math.random() * 10)
  ).join("");
}
function generateGuestUsername(tail = generateRandomNumber(10), joinChar = "-") {
  return `guest${joinChar}${tail}`;
}

// app/models/user.server.ts
async function getUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}
async function getUserByUsername(username) {
  return prisma.user.findUnique({ where: { username } });
}
async function createUser(username, password) {
  let hashedPassword = await import_bcryptjs.default.hash(password, 10);
  return prisma.user.create({
    data: {
      username,
      password: {
        create: {
          hash: hashedPassword
        }
      }
    }
  });
}
async function createUserAsGuest() {
  let username = generateGuestUsername(), res = await prisma.user.create({
    data: {
      username
    }
  });
  return res.username || createUserAsGuest(), res;
}

// app/session.server.ts
(0, import_tiny_invariant.default)(process.env.SESSION_SECRET, "SESSION_SECRET must be set");
var sessionStorage = (0, import_node2.createCookieSessionStorage)({
  cookie: {
    name: "__session",
    httpOnly: !0,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: !1
  }
}), USER_SESSION_KEY = "userId";
async function getSession(request) {
  let cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}
async function getUserId(request) {
  return (await getSession(request)).get(USER_SESSION_KEY);
}
async function getUser(request) {
  let userId = await getUserId(request);
  if (userId === void 0)
    return null;
  let user = await getUserById(userId);
  if (user)
    return user;
  throw await logout(request);
}
async function requireUserId(request, redirectTo = new URL(request.url).pathname) {
  let userId = await getUserId(request);
  if (!userId) {
    let searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw (0, import_node2.redirect)(`/login?${searchParams}`);
  }
  return userId;
}
async function createUserSession({
  request,
  userId,
  remember,
  redirectTo
}) {
  let session = await getSession(request);
  return session.set(USER_SESSION_KEY, userId), (0, import_node2.redirect)(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember ? 60 * 60 * 24 * 7 : void 0
      })
    }
  });
}
async function logout(request) {
  let session = await getSession(request);
  return (0, import_node2.redirect)("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session)
    }
  });
}

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-3MDFIOGX.css";

// app/root.tsx
var import_jsx_dev_runtime2 = require("react/jsx-dev-runtime"), links = () => [
  { rel: "stylesheet", href: tailwind_default },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap",
    as: "stylesheet"
  },
  ...import_css_bundle.cssBundleHref ? [{ rel: "stylesheet", href: import_css_bundle.cssBundleHref }] : []
], loader = async ({ request }) => (0, import_node3.json)({ user: await getUser(request) });
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react4.Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 33,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react4.Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 34,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 32,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react4.Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 37,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react4.ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 38,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react4.Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 39,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react4.LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 40,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 36,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 31,
    columnNumber: 5
  }, this);
}

// app/routes/_register._index.tsx
var register_index_exports = {};
__export(register_index_exports, {
  default: () => Register
});
var import_jsx_dev_runtime3 = require("react/jsx-dev-runtime");
function Register() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_jsx_dev_runtime3.Fragment, {}, void 0, !1, {
    fileName: "app/routes/_register._index.tsx",
    lineNumber: 10,
    columnNumber: 10
  }, this);
}

// app/routes/_register.signup.tsx
var register_signup_exports = {};
__export(register_signup_exports, {
  default: () => Signup
});
var import_react5 = require("@headlessui/react"), import_react6 = require("@remix-run/react"), import_react7 = require("react");

// app/components/buttons.tsx
var import_jsx_dev_runtime4 = require("react/jsx-dev-runtime");
function PrimaryButton({
  children,
  handleClick
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
    "button",
    {
      className: "lg:text-md active:shadow-none bg-secondary-gray-6 py-2 text-sm shadow-primary active:bg-secondary-gray-8 active:text-secondary-gray-6",
      onClick: handleClick,
      children
    },
    void 0,
    !1,
    {
      fileName: "app/components/buttons.tsx",
      lineNumber: 11,
      columnNumber: 5
    },
    this
  );
}
function SubmitButton({ isProcessing }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("button", { className: "active:shadow-none flex-grow bg-secondary-gray-6 py-1 text-sm font-medium tracking-wide text-primary-black shadow-primary active:bg-secondary-gray-8 active:text-secondary-gray-6", children: isProcessing ? /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { children: "Submit" }, void 0, !1, {
    fileName: "app/components/buttons.tsx",
    lineNumber: 44,
    columnNumber: 9
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex w-full items-center justify-center text-secondary-gray-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
      "svg",
      {
        "aria-hidden": "true",
        className: "mr-2 h-4 w-4 animate-spin fill-primary-black",
        viewBox: "0 0 100 101",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
            "path",
            {
              d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
              fill: "currentColor"
            },
            void 0,
            !1,
            {
              fileName: "app/components/buttons.tsx",
              lineNumber: 32,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
            "path",
            {
              d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
              fill: "currentFill"
            },
            void 0,
            !1,
            {
              fileName: "app/components/buttons.tsx",
              lineNumber: 36,
              columnNumber: 13
            },
            this
          )
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/buttons.tsx",
        lineNumber: 25,
        columnNumber: 11
      },
      this
    ),
    "Processing..."
  ] }, void 0, !0, {
    fileName: "app/components/buttons.tsx",
    lineNumber: 24,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/components/buttons.tsx",
    lineNumber: 22,
    columnNumber: 5
  }, this);
}
function CancelButton({ handleClick }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
    "button",
    {
      type: "button",
      onClick: handleClick,
      className: "active:shadow-none flex-grow bg-primary-red-6 py-1 text-sm font-medium tracking-wide text-secondary-gray-1 shadow-primary active:bg-primary-red-8 active:text-primary-red-10",
      children: "Cancel"
    },
    void 0,
    !1,
    {
      fileName: "app/components/buttons.tsx",
      lineNumber: 57,
      columnNumber: 5
    },
    this
  );
}

// app/routes/_register.signup.tsx
var import_jsx_dev_runtime5 = require("react/jsx-dev-runtime");
function Signup() {
  let [isOpen, setIsOpen] = (0, import_react7.useState)(!0), navigate = (0, import_react6.useNavigate)();
  function handleCloseClick() {
    setIsOpen(!1), navigate("..");
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_jsx_dev_runtime5.Fragment, { children: isOpen && /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
    import_react5.Dialog,
    {
      open: !0,
      onClose: handleCloseClick,
      className: "relative z-50",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
          "div",
          {
            className: "fixed inset-0 flex items-center justify-center p-4 backdrop-brightness-50",
            "aria-hidden": "true"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_register.signup.tsx",
            lineNumber: 23,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "fixed inset-4 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_react5.Dialog.Panel, { className: "mb-[3%] flex w-full max-w-sm flex-col justify-center bg-primary-white p-6 text-sm lg:max-w-md lg:text-lg", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_react5.Dialog.Title, { className: "font-primary-black text-center text-3xl font-medium underline underline-offset-2", children: "Signup" }, void 0, !1, {
            fileName: "app/routes/_register.signup.tsx",
            lineNumber: 29,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "mx-auto flex w-5/6 flex-col space-y-3 py-2.5" }, void 0, !1, {
            fileName: "app/routes/_register.signup.tsx",
            lineNumber: 33,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "mx-auto flex w-5/6 space-x-2 text-center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(SubmitButton, { isProcessing: !0 }, void 0, !1, {
              fileName: "app/routes/_register.signup.tsx",
              lineNumber: 35,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(CancelButton, { handleClick: handleCloseClick }, void 0, !1, {
              fileName: "app/routes/_register.signup.tsx",
              lineNumber: 36,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_register.signup.tsx",
            lineNumber: 34,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_register.signup.tsx",
          lineNumber: 28,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/routes/_register.signup.tsx",
          lineNumber: 27,
          columnNumber: 11
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/routes/_register.signup.tsx",
      lineNumber: 18,
      columnNumber: 9
    },
    this
  ) }, void 0, !1, {
    fileName: "app/routes/_register.signup.tsx",
    lineNumber: 16,
    columnNumber: 5
  }, this);
}

// app/routes/_register.login.tsx
var register_login_exports = {};
__export(register_login_exports, {
  default: () => Login
});
var import_react8 = require("@headlessui/react"), import_react9 = require("@remix-run/react"), import_react10 = require("react");
var import_jsx_dev_runtime6 = require("react/jsx-dev-runtime");
function Login() {
  let [isOpen, setIsOpen] = (0, import_react10.useState)(!0), navigate = (0, import_react9.useNavigate)();
  function handleCloseClick() {
    setIsOpen(!1), navigate("..");
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_jsx_dev_runtime6.Fragment, { children: isOpen && /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
    import_react8.Dialog,
    {
      open: !0,
      onClose: handleCloseClick,
      className: "relative z-50",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
          "div",
          {
            className: "fixed inset-0 flex items-center justify-center p-4 backdrop-brightness-50",
            "aria-hidden": "true"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_register.login.tsx",
            lineNumber: 23,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "fixed inset-4 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_react8.Dialog.Panel, { className: "mb-[3%] flex w-full max-w-sm flex-col justify-center bg-primary-white p-6 text-sm lg:max-w-md lg:text-lg", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_react8.Dialog.Title, { className: "font-primary-black text-center text-3xl font-medium underline underline-offset-2", children: "Login" }, void 0, !1, {
            fileName: "app/routes/_register.login.tsx",
            lineNumber: 29,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "mx-auto flex w-5/6 flex-col space-y-3 py-2.5" }, void 0, !1, {
            fileName: "app/routes/_register.login.tsx",
            lineNumber: 33,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "mx-auto flex w-5/6 space-x-2 text-center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(SubmitButton, { isProcessing: !0 }, void 0, !1, {
              fileName: "app/routes/_register.login.tsx",
              lineNumber: 35,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(CancelButton, { handleClick: handleCloseClick }, void 0, !1, {
              fileName: "app/routes/_register.login.tsx",
              lineNumber: 36,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_register.login.tsx",
            lineNumber: 34,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_register.login.tsx",
          lineNumber: 28,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/routes/_register.login.tsx",
          lineNumber: 27,
          columnNumber: 11
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/routes/_register.login.tsx",
      lineNumber: 18,
      columnNumber: 9
    },
    this
  ) }, void 0, !1, {
    fileName: "app/routes/_register.login.tsx",
    lineNumber: 16,
    columnNumber: 5
  }, this);
}

// app/routes/notes.$noteId.tsx
var notes_noteId_exports = {};
__export(notes_noteId_exports, {
  ErrorBoundary: () => ErrorBoundary,
  action: () => action,
  default: () => NoteDetailsPage,
  loader: () => loader2
});
var import_node4 = require("@remix-run/node"), import_react11 = require("@remix-run/react"), import_tiny_invariant2 = __toESM(require("tiny-invariant"));

// app/models/note.server.ts
function getNote({
  id,
  userId
}) {
  return prisma.note.findFirst({
    select: { id: !0, body: !0, title: !0 },
    where: { id, userId }
  });
}
function getNoteListItems({ userId }) {
  return prisma.note.findMany({
    where: { userId },
    select: { id: !0, title: !0 },
    orderBy: { updatedAt: "desc" }
  });
}
function createNote({
  body,
  title,
  userId
}) {
  return prisma.note.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId
        }
      }
    }
  });
}
function deleteNote({
  id,
  userId
}) {
  return prisma.note.deleteMany({
    where: { id, userId }
  });
}

// app/routes/notes.$noteId.tsx
var import_jsx_dev_runtime7 = require("react/jsx-dev-runtime"), loader2 = async ({ params, request }) => {
  let userId = await requireUserId(request);
  (0, import_tiny_invariant2.default)(params.noteId, "noteId not found");
  let note = await getNote({ id: params.noteId, userId });
  if (!note)
    throw new Response("Not Found", { status: 404 });
  return (0, import_node4.json)({ note });
}, action = async ({ params, request }) => {
  let userId = await requireUserId(request);
  return (0, import_tiny_invariant2.default)(params.noteId, "noteId not found"), await deleteNote({ id: params.noteId, userId }), (0, import_node4.redirect)("/notes");
};
function NoteDetailsPage() {
  let data = (0, import_react11.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h3", { className: "text-2xl font-bold", children: data.note.title }, void 0, !1, {
      fileName: "app/routes/notes.$noteId.tsx",
      lineNumber: 39,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { className: "py-6", children: data.note.body }, void 0, !1, {
      fileName: "app/routes/notes.$noteId.tsx",
      lineNumber: 40,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("hr", { className: "my-4" }, void 0, !1, {
      fileName: "app/routes/notes.$noteId.tsx",
      lineNumber: 41,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_react11.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
      "button",
      {
        type: "submit",
        className: "rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400",
        children: "Delete"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/notes.$noteId.tsx",
        lineNumber: 43,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/notes.$noteId.tsx",
      lineNumber: 42,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/notes.$noteId.tsx",
    lineNumber: 38,
    columnNumber: 5
  }, this);
}
function ErrorBoundary() {
  let error = (0, import_react11.useRouteError)();
  return error instanceof Error ? /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { children: [
    "An unexpected error occurred: ",
    error.message
  ] }, void 0, !0, {
    fileName: "app/routes/notes.$noteId.tsx",
    lineNumber: 58,
    columnNumber: 12
  }, this) : (0, import_react11.isRouteErrorResponse)(error) ? error.status === 404 ? /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { children: "Note not found" }, void 0, !1, {
    fileName: "app/routes/notes.$noteId.tsx",
    lineNumber: 66,
    columnNumber: 12
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { children: [
    "An unexpected error occurred: ",
    error.statusText
  ] }, void 0, !0, {
    fileName: "app/routes/notes.$noteId.tsx",
    lineNumber: 69,
    columnNumber: 10
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h1", { children: "Unknown Error" }, void 0, !1, {
    fileName: "app/routes/notes.$noteId.tsx",
    lineNumber: 62,
    columnNumber: 12
  }, this);
}

// app/routes/notes._index.tsx
var notes_index_exports = {};
__export(notes_index_exports, {
  default: () => NoteIndexPage
});
var import_react12 = require("@remix-run/react"), import_jsx_dev_runtime8 = require("react/jsx-dev-runtime");
function NoteIndexPage() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("p", { children: [
    "No note selected. Select a note on the left, or",
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(import_react12.Link, { to: "new", className: "text-blue-500 underline", children: "create a new note." }, void 0, !1, {
      fileName: "app/routes/notes._index.tsx",
      lineNumber: 7,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/notes._index.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/routes/healthcheck.tsx
var healthcheck_exports = {};
__export(healthcheck_exports, {
  loader: () => loader3
});
var loader3 = async ({ request }) => {
  let host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  try {
    let url = new URL("/", `http://${host}`);
    return await Promise.all([
      prisma.user.count(),
      fetch(url.toString(), { method: "HEAD" }).then((r) => {
        if (!r.ok)
          return Promise.reject(r);
      })
    ]), new Response("OK");
  } catch (error) {
    return console.log("healthcheck \u274C", { error }), new Response("ERROR", { status: 500 });
  }
};

// app/routes/home._index.tsx
var home_index_exports = {};
__export(home_index_exports, {
  default: () => Home
});

// app/components/create-modal.tsx
var import_react13 = require("@headlessui/react"), import_react14 = require("react");
var import_jsx_dev_runtime9 = require("react/jsx-dev-runtime");
function CreateModal() {
  let [isOpen, setIsOpen] = (0, import_react14.useState)(!1);
  function handleOpenClick() {
    setIsOpen(!0);
  }
  function handleCloseClick() {
    setIsOpen(!1);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_jsx_dev_runtime9.Fragment, { children: [
    isOpen && /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
      import_react13.Dialog,
      {
        open: isOpen,
        onClose: () => setIsOpen(!1),
        className: "relative z-50",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
            "div",
            {
              className: "fixed inset-0 flex items-center justify-center p-4 backdrop-brightness-50",
              "aria-hidden": "true"
            },
            void 0,
            !1,
            {
              fileName: "app/components/create-modal.tsx",
              lineNumber: 24,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "fixed inset-4 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_react13.Dialog.Panel, { className: "mb-[3%] flex w-full max-w-sm flex-col justify-center bg-primary-white p-6 text-sm lg:max-w-md lg:text-lg", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_react13.Dialog.Title, { className: "font-primary-black text-center text-3xl font-medium underline underline-offset-2", children: "Room Settings" }, void 0, !1, {
              fileName: "app/components/create-modal.tsx",
              lineNumber: 30,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "mx-auto flex w-5/6 flex-col space-y-3 py-2.5", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("span", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("label", { htmlFor: "seat-count-select", children: "Seats:" }, void 0, !1, {
                  fileName: "app/components/create-modal.tsx",
                  lineNumber: 36,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
                  "select",
                  {
                    defaultValue: 4,
                    typeof: "number",
                    id: "seat-count-select",
                    name: "seat-count-select",
                    className: "mx-2 bg-secondary-gray-3 focus:bg-secondary-gray-6 focus:font-medium",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("option", { value: 4, children: "4" }, void 0, !1, {
                        fileName: "app/components/create-modal.tsx",
                        lineNumber: 44,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("option", { value: 3, children: "3" }, void 0, !1, {
                        fileName: "app/components/create-modal.tsx",
                        lineNumber: 45,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("option", { value: 2, children: "2" }, void 0, !1, {
                        fileName: "app/components/create-modal.tsx",
                        lineNumber: 46,
                        columnNumber: 21
                      }, this)
                    ]
                  },
                  void 0,
                  !0,
                  {
                    fileName: "app/components/create-modal.tsx",
                    lineNumber: 37,
                    columnNumber: 19
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "app/components/create-modal.tsx",
                lineNumber: 35,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("span", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("label", { htmlFor: "round-count-select", children: "# of Rounds:" }, void 0, !1, {
                  fileName: "app/components/create-modal.tsx",
                  lineNumber: 50,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
                  "select",
                  {
                    id: "round-count-select",
                    name: "round-count-select",
                    className: "mx-2 bg-secondary-gray-3 focus:bg-secondary-gray-6 focus:font-medium",
                    children: Array.from({ length: 10 }, (_, idx) => 20 - idx).map(
                      (count) => /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("option", { value: count, children: count }, `count-${count}`, !1, {
                        fileName: "app/components/create-modal.tsx",
                        lineNumber: 58,
                        columnNumber: 25
                      }, this)
                    )
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/create-modal.tsx",
                    lineNumber: 51,
                    columnNumber: 19
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "app/components/create-modal.tsx",
                lineNumber: 49,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/create-modal.tsx",
              lineNumber: 34,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "mx-auto flex w-5/6 space-x-2 text-center", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(SubmitButton, { isProcessing: !0 }, void 0, !1, {
                fileName: "app/components/create-modal.tsx",
                lineNumber: 67,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(CancelButton, { handleClick: handleCloseClick }, void 0, !1, {
                fileName: "app/components/create-modal.tsx",
                lineNumber: 68,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/create-modal.tsx",
              lineNumber: 66,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/create-modal.tsx",
            lineNumber: 29,
            columnNumber: 13
          }, this) }, void 0, !1, {
            fileName: "app/components/create-modal.tsx",
            lineNumber: 28,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/create-modal.tsx",
        lineNumber: 19,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(PrimaryButton, { handleClick: handleOpenClick, children: "Create match" }, void 0, !1, {
      fileName: "app/components/create-modal.tsx",
      lineNumber: 74,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/create-modal.tsx",
    lineNumber: 17,
    columnNumber: 5
  }, this);
}

// app/routes/home._index.tsx
var import_jsx_dev_runtime10 = require("react/jsx-dev-runtime");
function Home() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("main", { className: "relative min-h-screen bg-primary-green-6 sm:flex sm:items-center sm:justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "mx-auto max-w-7xl bg-primary-green-6 sm:px-6 lg:px-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "h-[min(80vh,_120vw)] w-[min(80vh,_120vw)] rounded-full bg-primary-white pt-1 lg:h-[65vh] lg:w-[65vh] lg:pt-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex h-full flex-col items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex h-full flex-col items-center justify-center", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
      "img",
      {
        src: "img/brand/game-title.png",
        className: "ml-[6.5%] mt-2 h-auto w-[94%]",
        alt: "brand"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/home._index.tsx",
        lineNumber: 19,
        columnNumber: 15
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex w-[65%] flex-col space-y-1.5 px-2 text-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(CreateModal, {}, void 0, !1, {
      fileName: "app/routes/home._index.tsx",
      lineNumber: 25,
      columnNumber: 17
    }, this) }, void 0, !1, {
      fileName: "app/routes/home._index.tsx",
      lineNumber: 24,
      columnNumber: 15
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/home._index.tsx",
    lineNumber: 18,
    columnNumber: 13
  }, this) }, void 0, !1, {
    fileName: "app/routes/home._index.tsx",
    lineNumber: 17,
    columnNumber: 11
  }, this) }, void 0, !1, {
    fileName: "app/routes/home._index.tsx",
    lineNumber: 16,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/home._index.tsx",
    lineNumber: 6,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/home._index.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/routes/_register.tsx
var register_exports = {};
__export(register_exports, {
  default: () => Register2
});
var import_react15 = require("@remix-run/react"), import_react16 = require("react");
var import_jsx_dev_runtime11 = require("react/jsx-dev-runtime");
function Register2() {
  let fetcher = (0, import_react15.useFetcher)(), user = useOptionalUser(), navigate = (0, import_react15.useNavigate)();
  (0, import_react16.useEffect)(() => {
    user && navigate(`/home?${user.username}`);
  }, [user, navigate]);
  function handleRegisterAsGuest() {
    fetcher.load("/register");
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_jsx_dev_runtime11.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_react15.Outlet, {}, void 0, !1, {
      fileName: "app/routes/_register.tsx",
      lineNumber: 22,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("main", { className: "relative min-h-screen bg-primary-green-6 sm:flex sm:items-center sm:justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "bg-theme-base-green absolute inset-0 top-0 z-20 flex items-center justify-center overflow-hidden p-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "text-theme-base-black m-10 flex h-full flex-col items-center justify-center font-sans", children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "h-[min(80vh,_120vw)] w-[min(80vh,_120vw)] rounded-full bg-primary-white pt-1 lg:h-[65vh] lg:w-[65vh] lg:pt-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "flex h-full flex-col items-center justify-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
        "img",
        {
          src: "/img/brand/game-title.png",
          className: "ml-[8%] mt-8 h-auto w-full",
          alt: "brand"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_register.tsx",
          lineNumber: 29,
          columnNumber: 19
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "mb-1 flex w-[70%] flex-col space-y-1 text-center lg:space-y-1.5", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
          "button",
          {
            type: "submit",
            name: "guest-register-btn",
            onClick: handleRegisterAsGuest,
            className: "lg:text-md flex-grow bg-secondary-gray-6 py-1.5 text-sm shadow-primary active:bg-secondary-gray-8 active:text-secondary-gray-6 active:shadow-transparent",
            children: "Play as guest"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_register.tsx",
            lineNumber: 35,
            columnNumber: 21
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "flex space-x-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
            import_react15.Link,
            {
              className: "lg:text-md active:shadow-none w-1/2 bg-secondary-gray-6 py-1.5 text-sm shadow-primary active:bg-secondary-gray-8 active:text-secondary-gray-6",
              to: "/signup",
              children: "Signup"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_register.tsx",
              lineNumber: 44,
              columnNumber: 23
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
            import_react15.Link,
            {
              className: "lg:text-md active:shadow-none w-1/2 bg-secondary-gray-6 py-1.5 text-sm shadow-primary active:bg-secondary-gray-8 active:text-secondary-gray-6",
              to: "/login",
              children: "Login"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_register.tsx",
              lineNumber: 50,
              columnNumber: 23
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_register.tsx",
          lineNumber: 43,
          columnNumber: 21
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_register.tsx",
        lineNumber: 34,
        columnNumber: 19
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_register.tsx",
      lineNumber: 28,
      columnNumber: 17
    }, this) }, void 0, !1, {
      fileName: "app/routes/_register.tsx",
      lineNumber: 27,
      columnNumber: 15
    }, this) }, void 0, !1, {
      fileName: "app/routes/_register.tsx",
      lineNumber: 26,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/_register.tsx",
      lineNumber: 25,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/_register.tsx",
      lineNumber: 24,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_register.tsx",
      lineNumber: 23,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_register.tsx",
    lineNumber: 21,
    columnNumber: 5
  }, this);
}

// app/routes/notes.new.tsx
var notes_new_exports = {};
__export(notes_new_exports, {
  action: () => action2,
  default: () => NewNotePage
});
var import_node5 = require("@remix-run/node"), import_react17 = require("@remix-run/react"), import_react18 = require("react");
var import_jsx_dev_runtime12 = require("react/jsx-dev-runtime"), action2 = async ({ request }) => {
  let userId = await requireUserId(request), formData = await request.formData(), title = formData.get("title"), body = formData.get("body");
  if (typeof title != "string" || title.length === 0)
    return (0, import_node5.json)(
      { errors: { body: null, title: "Title is required" } },
      { status: 400 }
    );
  if (typeof body != "string" || body.length === 0)
    return (0, import_node5.json)(
      { errors: { body: "Body is required", title: null } },
      { status: 400 }
    );
  let note = await createNote({ body, title, userId });
  return (0, import_node5.redirect)(`/notes/${note.id}`);
};
function NewNotePage() {
  var _a, _b, _c, _d, _e, _f;
  let actionData = (0, import_react17.useActionData)(), titleRef = (0, import_react18.useRef)(null), bodyRef = (0, import_react18.useRef)(null);
  return (0, import_react18.useEffect)(() => {
    var _a2, _b2, _c2, _d2;
    (_a2 = actionData == null ? void 0 : actionData.errors) != null && _a2.title ? (_b2 = titleRef.current) == null || _b2.focus() : (_c2 = actionData == null ? void 0 : actionData.errors) != null && _c2.body && ((_d2 = bodyRef.current) == null || _d2.focus());
  }, [actionData]), /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
    import_react17.Form,
    {
      method: "post",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("label", { className: "flex w-full flex-col gap-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("span", { children: "Title: " }, void 0, !1, {
              fileName: "app/routes/notes.new.tsx",
              lineNumber: 60,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
              "input",
              {
                ref: titleRef,
                name: "title",
                className: "flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose",
                "aria-invalid": (_a = actionData == null ? void 0 : actionData.errors) != null && _a.title ? !0 : void 0,
                "aria-errormessage": (_b = actionData == null ? void 0 : actionData.errors) != null && _b.title ? "title-error" : void 0
              },
              void 0,
              !1,
              {
                fileName: "app/routes/notes.new.tsx",
                lineNumber: 61,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/notes.new.tsx",
            lineNumber: 59,
            columnNumber: 9
          }, this),
          (_c = actionData == null ? void 0 : actionData.errors) != null && _c.title ? /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "pt-1 text-red-700", id: "title-error", children: actionData.errors.title }, void 0, !1, {
            fileName: "app/routes/notes.new.tsx",
            lineNumber: 72,
            columnNumber: 11
          }, this) : null
        ] }, void 0, !0, {
          fileName: "app/routes/notes.new.tsx",
          lineNumber: 58,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("label", { className: "flex w-full flex-col gap-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("span", { children: "Body: " }, void 0, !1, {
              fileName: "app/routes/notes.new.tsx",
              lineNumber: 80,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
              "textarea",
              {
                ref: bodyRef,
                name: "body",
                rows: 8,
                className: "w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6",
                "aria-invalid": (_d = actionData == null ? void 0 : actionData.errors) != null && _d.body ? !0 : void 0,
                "aria-errormessage": (_e = actionData == null ? void 0 : actionData.errors) != null && _e.body ? "body-error" : void 0
              },
              void 0,
              !1,
              {
                fileName: "app/routes/notes.new.tsx",
                lineNumber: 81,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/notes.new.tsx",
            lineNumber: 79,
            columnNumber: 9
          }, this),
          (_f = actionData == null ? void 0 : actionData.errors) != null && _f.body ? /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "pt-1 text-red-700", id: "body-error", children: actionData.errors.body }, void 0, !1, {
            fileName: "app/routes/notes.new.tsx",
            lineNumber: 93,
            columnNumber: 11
          }, this) : null
        ] }, void 0, !0, {
          fileName: "app/routes/notes.new.tsx",
          lineNumber: 78,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "text-right", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
          "button",
          {
            type: "submit",
            className: "rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400",
            children: "Save"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/notes.new.tsx",
            lineNumber: 100,
            columnNumber: 9
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/notes.new.tsx",
          lineNumber: 99,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/routes/notes.new.tsx",
      lineNumber: 49,
      columnNumber: 5
    },
    this
  );
}

// app/routes/register.ts
var register_exports2 = {};
__export(register_exports2, {
  loader: () => loader4
});
var loader4 = async ({ request }) => {
  let user = await createUserAsGuest();
  return createUserSession({
    redirectTo: "/",
    remember: !1,
    request,
    userId: user.id
  });
};

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action3,
  loader: () => loader5
});
var import_node6 = require("@remix-run/node");
var action3 = async ({ request }) => logout(request), loader5 = async () => (0, import_node6.redirect)("/");

// app/routes/notes.tsx
var notes_exports = {};
__export(notes_exports, {
  default: () => NotesPage,
  loader: () => loader6
});
var import_node7 = require("@remix-run/node"), import_react19 = require("@remix-run/react");
var import_jsx_dev_runtime13 = require("react/jsx-dev-runtime"), loader6 = async ({ request }) => {
  let userId = await requireUserId(request), noteListItems = await getNoteListItems({ userId });
  return (0, import_node7.json)({ noteListItems });
};
function NotesPage() {
  let data = (0, import_react19.useLoaderData)(), user = useUser();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "flex h-full min-h-screen flex-col", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("header", { className: "flex items-center justify-between bg-slate-800 p-4 text-white", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h1", { className: "text-3xl font-bold", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react19.Link, { to: ".", children: "Notes" }, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 23,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 22,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { children: user.username }, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 25,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react19.Form, { action: "/logout", method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
        "button",
        {
          type: "submit",
          className: "rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600",
          children: "Logout"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/notes.tsx",
          lineNumber: 27,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 26,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/notes.tsx",
      lineNumber: 21,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("main", { className: "flex h-full bg-white", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "h-full w-80 border-r bg-gray-50", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react19.Link, { to: "new", className: "block p-4 text-xl text-blue-500", children: "+ New Note" }, void 0, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 38,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("hr", {}, void 0, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 42,
          columnNumber: 11
        }, this),
        data.noteListItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "p-4", children: "No notes yet" }, void 0, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 45,
          columnNumber: 13
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("ol", { children: data.noteListItems.map((note) => /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
          import_react19.NavLink,
          {
            className: ({ isActive }) => `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`,
            to: note.id,
            children: [
              "\u{1F4DD} ",
              note.title
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/notes.tsx",
            lineNumber: 50,
            columnNumber: 19
          },
          this
        ) }, note.id, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 49,
          columnNumber: 17
        }, this)) }, void 0, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 47,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 37,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "flex-1 p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react19.Outlet, {}, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 65,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 64,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/notes.tsx",
      lineNumber: 36,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/notes.tsx",
    lineNumber: 20,
    columnNumber: 5
  }, this);
}

// app/routes/join.tsx
var join_exports = {};
__export(join_exports, {
  action: () => action4,
  default: () => Join,
  loader: () => loader7,
  meta: () => meta
});
var import_node8 = require("@remix-run/node"), import_react20 = require("@remix-run/react"), import_react21 = require("react");
var import_jsx_dev_runtime14 = require("react/jsx-dev-runtime"), loader7 = async ({ request }) => await getUserId(request) ? (0, import_node8.redirect)("/") : (0, import_node8.json)({}), action4 = async ({ request }) => {
  let formData = await request.formData(), username = formData.get("username"), password = formData.get("password"), redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  if (!validateEmail(username))
    return (0, import_node8.json)(
      { errors: { username: "Email is invalid", password: null } },
      { status: 400 }
    );
  if (typeof password != "string" || password.length === 0)
    return (0, import_node8.json)(
      { errors: { username: null, password: "Password is required" } },
      { status: 400 }
    );
  if (password.length < 8)
    return (0, import_node8.json)(
      { errors: { username: null, password: "Password is too short" } },
      { status: 400 }
    );
  if (await getUserByUsername(username))
    return (0, import_node8.json)(
      {
        errors: {
          username: "A user already exists with this username",
          password: null
        }
      },
      { status: 400 }
    );
  let user = await createUser(username, password);
  return createUserSession({
    redirectTo,
    remember: !1,
    request,
    userId: user.id
  });
}, meta = () => [{ title: "Sign Up" }];
function Join() {
  var _a, _b, _c, _d;
  let [searchParams] = (0, import_react20.useSearchParams)(), redirectTo = searchParams.get("redirectTo") ?? void 0, actionData = (0, import_react20.useActionData)(), usernameRef = (0, import_react21.useRef)(null), passwordRef = (0, import_react21.useRef)(null);
  return (0, import_react21.useEffect)(() => {
    var _a2, _b2, _c2, _d2;
    (_a2 = actionData == null ? void 0 : actionData.errors) != null && _a2.username ? (_b2 = usernameRef.current) == null || _b2.focus() : (_c2 = actionData == null ? void 0 : actionData.errors) != null && _c2.password && ((_d2 = passwordRef.current) == null || _d2.focus());
  }, [actionData]), /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "flex min-h-full flex-col justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "mx-auto w-full max-w-md px-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_react20.Form, { method: "post", className: "space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
        "label",
        {
          htmlFor: "username",
          className: "block text-sm font-medium text-gray-700",
          children: "username"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/join.tsx",
          lineNumber: 88,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "mt-1", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
          "input",
          {
            ref: usernameRef,
            id: " address",
            required: !0,
            autoFocus: !0,
            name: "username",
            type: "username",
            autoComplete: "username",
            "aria-invalid": (_a = actionData == null ? void 0 : actionData.errors) != null && _a.username ? !0 : void 0,
            "aria-describedby": "username-error",
            className: "w-full rounded border border-gray-500 px-2 py-1 text-lg"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/join.tsx",
            lineNumber: 95,
            columnNumber: 15
          },
          this
        ),
        (_b = actionData == null ? void 0 : actionData.errors) != null && _b.username ? /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "pt-1 text-red-700", id: "username-error", children: actionData.errors.username }, void 0, !1, {
          fileName: "app/routes/join.tsx",
          lineNumber: 108,
          columnNumber: 17
        }, this) : null
      ] }, void 0, !0, {
        fileName: "app/routes/join.tsx",
        lineNumber: 94,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/join.tsx",
      lineNumber: 87,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
        "label",
        {
          htmlFor: "password",
          className: "block text-sm font-medium text-gray-700",
          children: "Password"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/join.tsx",
          lineNumber: 116,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "mt-1", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
          "input",
          {
            id: "password",
            ref: passwordRef,
            name: "password",
            type: "password",
            autoComplete: "new-password",
            "aria-invalid": (_c = actionData == null ? void 0 : actionData.errors) != null && _c.password ? !0 : void 0,
            "aria-describedby": "password-error",
            className: "w-full rounded border border-gray-500 px-2 py-1 text-lg"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/join.tsx",
            lineNumber: 123,
            columnNumber: 15
          },
          this
        ),
        (_d = actionData == null ? void 0 : actionData.errors) != null && _d.password ? /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "pt-1 text-red-700", id: "password-error", children: actionData.errors.password }, void 0, !1, {
          fileName: "app/routes/join.tsx",
          lineNumber: 134,
          columnNumber: 17
        }, this) : null
      ] }, void 0, !0, {
        fileName: "app/routes/join.tsx",
        lineNumber: 122,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/join.tsx",
      lineNumber: 115,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("input", { type: "hidden", name: "redirectTo", value: redirectTo }, void 0, !1, {
      fileName: "app/routes/join.tsx",
      lineNumber: 141,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
      "button",
      {
        type: "submit",
        className: "w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400",
        children: "Create Account"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/join.tsx",
        lineNumber: 142,
        columnNumber: 11
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "text-center text-sm text-gray-500", children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
        import_react20.Link,
        {
          className: "text-blue-500 underline",
          to: {
            pathname: "/login",
            search: searchParams.toString()
          },
          children: "Log in"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/join.tsx",
          lineNumber: 151,
          columnNumber: 15
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/join.tsx",
      lineNumber: 149,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/join.tsx",
      lineNumber: 148,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/join.tsx",
    lineNumber: 86,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/join.tsx",
    lineNumber: 85,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/join.tsx",
    lineNumber: 84,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-GM2WHIYA.js", imports: ["/build/_shared/chunk-ZWGWGGVF.js", "/build/_shared/chunk-GIAAE3CH.js", "/build/_shared/chunk-XKSZADUV.js", "/build/_shared/chunk-IXQCROOZ.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-XU7DNSPJ.js", "/build/_shared/chunk-BOXFZXVX.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-ODG3Q3KF.js", imports: ["/build/_shared/chunk-2LTVY2GU.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_register": { id: "routes/_register", parentId: "root", path: void 0, index: void 0, caseSensitive: void 0, module: "/build/routes/_register-NGHQAOW2.js", imports: ["/build/_shared/chunk-22B5SI5W.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_register._index": { id: "routes/_register._index", parentId: "routes/_register", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_register._index-Y4MDNHY2.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_register.login": { id: "routes/_register.login", parentId: "routes/_register", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/_register.login-D5KGLWP5.js", imports: ["/build/_shared/chunk-OVTVCOZY.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_register.signup": { id: "routes/_register.signup", parentId: "routes/_register", path: "signup", index: void 0, caseSensitive: void 0, module: "/build/routes/_register.signup-4QTIHMRP.js", imports: ["/build/_shared/chunk-OVTVCOZY.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/healthcheck": { id: "routes/healthcheck", parentId: "root", path: "healthcheck", index: void 0, caseSensitive: void 0, module: "/build/routes/healthcheck-UKIBAX2W.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/home._index": { id: "routes/home._index", parentId: "root", path: "home", index: !0, caseSensitive: void 0, module: "/build/routes/home._index-I3KMAUJ3.js", imports: ["/build/_shared/chunk-OVTVCOZY.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/join": { id: "routes/join", parentId: "root", path: "join", index: void 0, caseSensitive: void 0, module: "/build/routes/join-CNX6XGTQ.js", imports: ["/build/_shared/chunk-22B5SI5W.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-GGSXPJWV.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/notes": { id: "routes/notes", parentId: "root", path: "notes", index: void 0, caseSensitive: void 0, module: "/build/routes/notes-XUL34PGM.js", imports: ["/build/_shared/chunk-22B5SI5W.js", "/build/_shared/chunk-2LJDV4EM.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/notes.$noteId": { id: "routes/notes.$noteId", parentId: "routes/notes", path: ":noteId", index: void 0, caseSensitive: void 0, module: "/build/routes/notes.$noteId-5CXEJZKH.js", imports: ["/build/_shared/chunk-2LTVY2GU.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !0 }, "routes/notes._index": { id: "routes/notes._index", parentId: "routes/notes", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/notes._index-IFUOYMFK.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/notes.new": { id: "routes/notes.new", parentId: "routes/notes", path: "new", index: void 0, caseSensitive: void 0, module: "/build/routes/notes.new-YBRZSXFW.js", imports: ["/build/_shared/chunk-2LTVY2GU.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/register": { id: "routes/register", parentId: "root", path: "register", index: void 0, caseSensitive: void 0, module: "/build/routes/register-62E4PYUX.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, version: "5b379403", hmr: { runtime: "/build/_shared/chunk-IXQCROOZ.js", timestamp: 1692142705526 }, url: "/build/manifest-5B379403.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { v2_dev: !0, unstable_postcss: !1, unstable_tailwind: !1, v2_errorBoundary: !0, v2_headers: !0, v2_meta: !0, v2_normalizeFormMethod: !0, v2_routeConvention: !0 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/_register._index": {
    id: "routes/_register._index",
    parentId: "routes/_register",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: register_index_exports
  },
  "routes/_register.signup": {
    id: "routes/_register.signup",
    parentId: "routes/_register",
    path: "signup",
    index: void 0,
    caseSensitive: void 0,
    module: register_signup_exports
  },
  "routes/_register.login": {
    id: "routes/_register.login",
    parentId: "routes/_register",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: register_login_exports
  },
  "routes/notes.$noteId": {
    id: "routes/notes.$noteId",
    parentId: "routes/notes",
    path: ":noteId",
    index: void 0,
    caseSensitive: void 0,
    module: notes_noteId_exports
  },
  "routes/notes._index": {
    id: "routes/notes._index",
    parentId: "routes/notes",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: notes_index_exports
  },
  "routes/healthcheck": {
    id: "routes/healthcheck",
    parentId: "root",
    path: "healthcheck",
    index: void 0,
    caseSensitive: void 0,
    module: healthcheck_exports
  },
  "routes/home._index": {
    id: "routes/home._index",
    parentId: "root",
    path: "home",
    index: !0,
    caseSensitive: void 0,
    module: home_index_exports
  },
  "routes/_register": {
    id: "routes/_register",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: register_exports
  },
  "routes/notes.new": {
    id: "routes/notes.new",
    parentId: "routes/notes",
    path: "new",
    index: void 0,
    caseSensitive: void 0,
    module: notes_new_exports
  },
  "routes/register": {
    id: "routes/register",
    parentId: "root",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: register_exports2
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/notes": {
    id: "routes/notes",
    parentId: "root",
    path: "notes",
    index: void 0,
    caseSensitive: void 0,
    module: notes_exports
  },
  "routes/join": {
    id: "routes/join",
    parentId: "root",
    path: "join",
    index: void 0,
    caseSensitive: void 0,
    module: join_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
/*! Bundled license information:

@remix-run/css-bundle/dist/index.js:
  (**
   * @remix-run/css-bundle v1.19.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
//# sourceMappingURL=index.js.map
