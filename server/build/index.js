var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) =>
  function () {
    return (
      mod ||
        (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    );
  };
var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: !0 });
  },
  __copyProps = (to, from, except, desc) => {
    if ((from && typeof from == "object") || typeof from == "function")
      for (let key of __getOwnPropNames(from))
        !__hasOwnProp.call(to, key) &&
          key !== except &&
          __defProp(to, key, {
            get: () => from[key],
            enumerable:
              !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
          });
    return to;
  };
var __toESM = (mod, isNodeMode, target) => (
    (target = mod != null ? __create(__getProtoOf(mod)) : {}),
    __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule
        ? __defProp(target, "default", { value: mod, enumerable: !0 })
        : target,
      mod
    )
  ),
  __toCommonJS = (mod) =>
    __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// css-bundle-update-plugin-ns:/home/sysreiner/bong/node_modules/@remix-run/css-bundle/dist/index.js
var require_dist = __commonJS({
  "css-bundle-update-plugin-ns:/home/sysreiner/bong/node_modules/@remix-run/css-bundle/dist/index.js"(
    exports
  ) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var cssBundleHref2;
    exports.cssBundleHref = cssBundleHref2;
  },
});

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes,
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest,
  handleError: () => handleError,
});
var import_stream = require("stream"),
  import_node = require("@remix-run/node"),
  import_react = require("@remix-run/react"),
  import_isbot = __toESM(require("isbot")),
  import_server = require("react-dom/server"),
  import_jsx_runtime = require("react/jsx-runtime"),
  ABORT_DELAY = 5e3;
function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
  loadContext
) {
  return (0, import_isbot.default)(request.headers.get("user-agent"))
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      );
}
function handleBotRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1,
      { pipe, abort } = (0, import_server.renderToPipeableStream)(
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.RemixServer, {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY,
        }),
        {
          onAllReady() {
            shellRendered = !0;
            let body = new import_stream.PassThrough();
            responseHeaders.set("Content-Type", "text/html"),
              resolve(
                new import_node.Response(body, {
                  headers: responseHeaders,
                  status: responseStatusCode,
                })
              ),
              pipe(body);
          },
          onShellError(error) {
            reject(error);
          },
          onError(error) {
            (responseStatusCode = 500), shellRendered && console.error(error);
          },
        }
      );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1,
      { pipe, abort } = (0, import_server.renderToPipeableStream)(
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.RemixServer, {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY,
        }),
        {
          onShellReady() {
            shellRendered = !0;
            let body = new import_stream.PassThrough();
            responseHeaders.set("Content-Type", "text/html"),
              resolve(
                new import_node.Response(body, {
                  headers: responseHeaders,
                  status: responseStatusCode,
                })
              ),
              pipe(body);
          },
          onShellError(error) {
            reject(error);
          },
          onError(error) {
            (responseStatusCode = 500), shellRendered && console.error(error);
          },
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
  loader: () => loader,
});
var import_css_bundle = __toESM(require_dist()),
  import_node3 = require("@remix-run/node"),
  import_react4 = require("@remix-run/react");

// app/session.server.ts
var import_node2 = require("@remix-run/node"),
  import_tiny_invariant = __toESM(require("tiny-invariant"));

// app/models/user.server.ts
var import_bcryptjs = __toESM(require("bcryptjs"));

// app/db.server.ts
var import_client = require("@prisma/client");

// app/singleton.server.ts
var singleton = (name, valueFactory) => {
  var _a;
  let g = global;
  return (
    g.__singletons ?? (g.__singletons = {}),
    (_a = g.__singletons)[name] ?? (_a[name] = valueFactory()),
    g.__singletons[name]
  );
};

// app/db.server.ts
var prisma = singleton("prisma", () => new import_client.PrismaClient());
prisma.$connect();

// app/utils.ts
var import_react2 = require("@remix-run/react"),
  import_react3 = require("react"),
  DEFAULT_REDIRECT = "/";
function safeRedirect(to, defaultRedirect = DEFAULT_REDIRECT) {
  return !to ||
    typeof to != "string" ||
    !to.startsWith("/") ||
    to.startsWith("//")
    ? defaultRedirect
    : to;
}
function useMatchesData(id) {
  let matchingRoutes = (0, import_react2.useMatches)(),
    route = (0, import_react3.useMemo)(
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
  if (!(!data || !isUser(data.user))) return data.user;
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
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
}
function generateGuestUsername(
  tail = generateRandomNumber(10),
  joinChar = "-"
) {
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
          hash: hashedPassword,
        },
      },
    },
  });
}
async function createUserAsGuest() {
  let username = generateGuestUsername(),
    res = await prisma.user.create({
      data: {
        username,
      },
    });
  return res.username || createUserAsGuest(), res;
}
async function verifyLogin(username, password) {
  let userWithPassword = await prisma.user.findUnique({
    where: { username },
    include: {
      password: !0,
    },
  });
  if (
    !userWithPassword ||
    !userWithPassword.password ||
    !(await import_bcryptjs.default.compare(
      password,
      userWithPassword.password.hash
    ))
  )
    return null;
  let { password: _password, ...userWithoutPassword } = userWithPassword;
  return userWithoutPassword;
}

// app/session.server.ts
(0, import_tiny_invariant.default)(
  process.env.SESSION_SECRET,
  "SESSION_SECRET must be set"
);
var sessionStorage = (0, import_node2.createCookieSessionStorage)({
    cookie: {
      name: "__session",
      httpOnly: !0,
      path: "/",
      sameSite: "lax",
      secrets: [process.env.SESSION_SECRET],
      secure: !0,
    },
  }),
  USER_SESSION_KEY = "userId";
async function getSession(request) {
  let cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}
async function getUserId(request) {
  return (await getSession(request)).get(USER_SESSION_KEY);
}
async function getUser(request) {
  let userId = await getUserId(request);
  if (userId === void 0) return null;
  let user = await getUserById(userId);
  if (user) return user;
  throw await logout(request);
}
async function requireUserId(
  request,
  redirectTo = new URL(request.url).pathname
) {
  let userId = await getUserId(request);
  if (!userId) {
    let searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw (0, import_node2.redirect)(`/login?${searchParams}`);
  }
  return userId;
}
async function createUserSession({ request, userId, remember, redirectTo }) {
  let session = await getSession(request);
  return (
    session.set(USER_SESSION_KEY, userId),
    (0, import_node2.redirect)(redirectTo, {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session, {
          maxAge: remember ? 60 * 60 * 24 * 7 : void 0,
        }),
      },
    })
  );
}
async function logout(request) {
  let session = await getSession(request);
  return (0, import_node2.redirect)("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-NM6HDHC7.css";

// app/root.tsx
var import_jsx_runtime2 = require("react/jsx-runtime"),
  links = () => [
    { rel: "stylesheet", href: tailwind_default },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap",
      as: "stylesheet",
    },
    ...(import_css_bundle.cssBundleHref
      ? [{ rel: "stylesheet", href: import_css_bundle.cssBundleHref }]
      : []),
  ],
  loader = async ({ request }) =>
    (0, import_node3.json)({ user: await getUser(request) });
function App() {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("html", {
    lang: "en",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("head", {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react4.Meta, {}),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react4.Links, {}),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("body", {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_react4.Outlet,
            {}
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_react4.ScrollRestoration,
            {}
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_react4.Scripts,
            {}
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_react4.LiveReload,
            {}
          ),
        ],
      }),
    ],
  });
}

// app/routes/notes.$noteId.tsx
var notes_noteId_exports = {};
__export(notes_noteId_exports, {
  ErrorBoundary: () => ErrorBoundary,
  action: () => action,
  default: () => NoteDetailsPage,
  loader: () => loader2,
});
var import_node4 = require("@remix-run/node"),
  import_react5 = require("@remix-run/react"),
  import_tiny_invariant2 = __toESM(require("tiny-invariant"));

// app/models/note.server.ts
function getNote({ id, userId }) {
  return prisma.note.findFirst({
    select: { id: !0, body: !0, title: !0 },
    where: { id, userId },
  });
}
function getNoteListItems({ userId }) {
  return prisma.note.findMany({
    where: { userId },
    select: { id: !0, title: !0 },
    orderBy: { updatedAt: "desc" },
  });
}
function createNote({ body, title, userId }) {
  return prisma.note.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
function deleteNote({ id, userId }) {
  return prisma.note.deleteMany({
    where: { id, userId },
  });
}

// app/routes/notes.$noteId.tsx
var import_jsx_runtime3 = require("react/jsx-runtime"),
  loader2 = async ({ params, request }) => {
    let userId = await requireUserId(request);
    (0, import_tiny_invariant2.default)(params.noteId, "noteId not found");
    let note = await getNote({ id: params.noteId, userId });
    if (!note) throw new Response("Not Found", { status: 404 });
    return (0, import_node4.json)({ note });
  },
  action = async ({ params, request }) => {
    let userId = await requireUserId(request);
    return (
      (0, import_tiny_invariant2.default)(params.noteId, "noteId not found"),
      await deleteNote({ id: params.noteId, userId }),
      (0, import_node4.redirect)("/notes")
    );
  };
function NoteDetailsPage() {
  let data = (0, import_react5.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", {
        className: "text-2xl font-bold",
        children: data.note.title,
      }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", {
        className: "py-6",
        children: data.note.body,
      }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("hr", { className: "my-4" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react5.Form, {
        method: "post",
        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", {
          type: "submit",
          className:
            "rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400",
          children: "Delete",
        }),
      }),
    ],
  });
}
function ErrorBoundary() {
  let error = (0, import_react5.useRouteError)();
  return error instanceof Error
    ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", {
        children: ["An unexpected error occurred: ", error.message],
      })
    : (0, import_react5.isRouteErrorResponse)(error)
    ? error.status === 404
      ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", {
          children: "Note not found",
        })
      : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", {
          children: ["An unexpected error occurred: ", error.statusText],
        })
    : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h1", {
        children: "Unknown Error",
      });
}

// app/routes/notes._index.tsx
var notes_index_exports = {};
__export(notes_index_exports, {
  default: () => NoteIndexPage,
});
var import_react6 = require("@remix-run/react"),
  import_jsx_runtime4 = require("react/jsx-runtime");
function NoteIndexPage() {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", {
    children: [
      "No note selected. Select a note on the left, or",
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react6.Link, {
        to: "new",
        className: "text-blue-500 underline",
        children: "create a new note.",
      }),
    ],
  });
}

// app/routes/healthcheck.tsx
var healthcheck_exports = {};
__export(healthcheck_exports, {
  loader: () => loader3,
});
var loader3 = async ({ request }) => {
  let host =
    request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  try {
    let url = new URL("/", `http://${host}`);
    return (
      await Promise.all([
        prisma.user.count(),
        fetch(url.toString(), { method: "HEAD" }).then((r) => {
          if (!r.ok) return Promise.reject(r);
        }),
      ]),
      new Response("OK")
    );
  } catch (error) {
    return (
      console.log("healthcheck \u274C", { error }),
      new Response("ERROR", { status: 500 })
    );
  }
};

// app/routes/notes.new.tsx
var notes_new_exports = {};
__export(notes_new_exports, {
  action: () => action2,
  default: () => NewNotePage,
});
var import_node5 = require("@remix-run/node"),
  import_react7 = require("@remix-run/react"),
  import_react8 = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime"),
  action2 = async ({ request }) => {
    let userId = await requireUserId(request),
      formData = await request.formData(),
      title = formData.get("title"),
      body = formData.get("body");
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
  let actionData = (0, import_react7.useActionData)(),
    titleRef = (0, import_react8.useRef)(null),
    bodyRef = (0, import_react8.useRef)(null);
  return (
    (0, import_react8.useEffect)(() => {
      var _a2, _b2, _c2, _d2;
      (_a2 = actionData == null ? void 0 : actionData.errors) != null &&
      _a2.title
        ? (_b2 = titleRef.current) == null || _b2.focus()
        : (_c2 = actionData == null ? void 0 : actionData.errors) != null &&
          _c2.body &&
          ((_d2 = bodyRef.current) == null || _d2.focus());
    }, [actionData]),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_react7.Form, {
      method: "post",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", {
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", {
              className: "flex w-full flex-col gap-1",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", {
                  children: "Title: ",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", {
                  ref: titleRef,
                  name: "title",
                  className:
                    "flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose",
                  "aria-invalid":
                    (_a = actionData == null ? void 0 : actionData.errors) !=
                      null && _a.title
                      ? !0
                      : void 0,
                  "aria-errormessage":
                    (_b = actionData == null ? void 0 : actionData.errors) !=
                      null && _b.title
                      ? "title-error"
                      : void 0,
                }),
              ],
            }),
            (_c = actionData == null ? void 0 : actionData.errors) != null &&
            _c.title
              ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", {
                  className: "pt-1 text-red-700",
                  id: "title-error",
                  children: actionData.errors.title,
                })
              : null,
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", {
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", {
              className: "flex w-full flex-col gap-1",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", {
                  children: "Body: ",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("textarea", {
                  ref: bodyRef,
                  name: "body",
                  rows: 8,
                  className:
                    "w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6",
                  "aria-invalid":
                    (_d = actionData == null ? void 0 : actionData.errors) !=
                      null && _d.body
                      ? !0
                      : void 0,
                  "aria-errormessage":
                    (_e = actionData == null ? void 0 : actionData.errors) !=
                      null && _e.body
                      ? "body-error"
                      : void 0,
                }),
              ],
            }),
            (_f = actionData == null ? void 0 : actionData.errors) != null &&
            _f.body
              ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", {
                  className: "pt-1 text-red-700",
                  id: "body-error",
                  children: actionData.errors.body,
                })
              : null,
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", {
          className: "text-right",
          children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", {
            type: "submit",
            className:
              "rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400",
            children: "Save",
          }),
        }),
      ],
    })
  );
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  action: () => action3,
  default: () => Index,
  meta: () => meta,
});
var import_react9 = require("@remix-run/react");
var import_jsx_runtime6 = require("react/jsx-runtime"),
  meta = () => [{ title: "Remix Notes" }],
  action3 = async ({ request }) => {
    let user = await createUserAsGuest();
    return createUserSession({
      redirectTo: "/",
      remember: !1,
      request,
      userId: user.id,
    });
  };
function Index() {
  let user = useOptionalUser(),
    submit = (0, import_react9.useSubmit)();
  function handleRegisterAsGuest() {
    submit(null, { method: "post", action: "/?index" });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("main", {
    className:
      "relative min-h-screen bg-primary-green-6 sm:flex sm:items-center sm:justify-center",
    children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", {
      className: "mx-auto max-w-7xl sm:px-6 lg:px-8",
      children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", {
        className:
          "p-4 absolute z-20 top-0 inset-0 flex justify-center items-center overflow-hidden bg-theme-base-green",
        children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", {
          className:
            "h-full flex flex-col text-theme-base-black font-sans items-center justify-center m-10",
          children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", {
            className:
              "w-[min(80vh,_120vw)] lg:w-[65vh] lg:h-[65vh] h-[min(80vh,_120vw)] bg-primary-white rounded-full lg:pt-5 pt-1",
            children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", {
              className: "h-full flex flex-col items-center justify-center",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("img", {
                  src: "/img/brand/game-title.png",
                  className: "h-auto w-full ml-[8%] mt-8",
                  alt: "brand",
                }),
                user
                  ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                      import_react9.Link,
                      {
                        to: "/notes",
                        className:
                          "flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8",
                        children: ["View Notes for ", user.username],
                      }
                    )
                  : /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", {
                      className:
                        "flex flex-col w-[70%] space-y-1 lg:space-y-1.5 mb-1 text-center",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", {
                          type: "submit",
                          name: "guest-register-btn",
                          onClick: handleRegisterAsGuest,
                          className:
                            "flex-grow py-1 text-sm lg:text-md bg-secondary-gray-6 shadow-primary active:bg-secondary-gray-8 active:shadow-transparent active:text-secondary-gray-6",
                          children: "Play as guest",
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", {
                          className: "flex space-x-1",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                              import_react9.Link,
                              {
                                to: "/join",
                                className:
                                  "w-1/2 text-sm py-1 lg:text-md bg-secondary-gray-6  shadow-primary active:bg-secondary-gray-8 active:shadow-transparent active:text-secondary-gray-6",
                                children: "Sign up",
                              }
                            ),
                            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                              import_react9.Link,
                              {
                                to: "/login",
                                className:
                                  "w-1/2 text-sm py-1 lg:text-md bg-secondary-gray-6 shadow-primary active:bg-secondary-gray-8 active:shadow-transparent active:text-secondary-gray-6",
                                children: "Log In",
                              }
                            ),
                          ],
                        }),
                      ],
                    }),
              ],
            }),
          }),
        }),
      }),
    }),
  });
}

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action4,
  loader: () => loader4,
});
var import_node6 = require("@remix-run/node");
var action4 = async ({ request }) => logout(request),
  loader4 = async () => (0, import_node6.redirect)("/");

// app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action5,
  default: () => LoginPage,
  loader: () => loader5,
  meta: () => meta2,
});
var import_node7 = require("@remix-run/node"),
  import_react10 = require("@remix-run/react"),
  import_react11 = require("react");
var import_jsx_runtime7 = require("react/jsx-runtime"),
  loader5 = async ({ request }) =>
    (await getUserId(request))
      ? (0, import_node7.redirect)("/")
      : (0, import_node7.json)({}),
  action5 = async ({ request }) => {
    let formData = await request.formData(),
      email = formData.get("email"),
      password = formData.get("password"),
      redirectTo = safeRedirect(formData.get("redirectTo"), "/"),
      remember = formData.get("remember");
    if (!validateEmail(email))
      return (0, import_node7.json)(
        { errors: { email: "Email is invalid", password: null } },
        { status: 400 }
      );
    if (typeof password != "string" || password.length === 0)
      return (0, import_node7.json)(
        { errors: { email: null, password: "Password is required" } },
        { status: 400 }
      );
    if (password.length < 8)
      return (0, import_node7.json)(
        { errors: { email: null, password: "Password is too short" } },
        { status: 400 }
      );
    let user = await verifyLogin(email, password);
    return user
      ? createUserSession({
          redirectTo,
          remember: remember === "on",
          request,
          userId: user.id,
        })
      : (0, import_node7.json)(
          { errors: { email: "Invalid email or password", password: null } },
          { status: 400 }
        );
  },
  meta2 = () => [{ title: "Login" }];
function LoginPage() {
  var _a, _b, _c, _d;
  let [searchParams] = (0, import_react10.useSearchParams)(),
    redirectTo = searchParams.get("redirectTo") || "/notes",
    actionData = (0, import_react10.useActionData)(),
    emailRef = (0, import_react11.useRef)(null),
    passwordRef = (0, import_react11.useRef)(null);
  return (
    (0, import_react11.useEffect)(() => {
      var _a2, _b2, _c2, _d2;
      (_a2 = actionData == null ? void 0 : actionData.errors) != null &&
      _a2.email
        ? (_b2 = emailRef.current) == null || _b2.focus()
        : (_c2 = actionData == null ? void 0 : actionData.errors) != null &&
          _c2.password &&
          ((_d2 = passwordRef.current) == null || _d2.focus());
    }, [actionData]),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", {
      className: "flex min-h-full flex-col justify-center",
      children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", {
        className: "mx-auto w-full max-w-md px-8",
        children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
          import_react10.Form,
          {
            method: "post",
            className: "space-y-6",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("label", {
                    htmlFor: "email",
                    className: "block text-sm font-medium text-gray-700",
                    children: "Email address",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", {
                    className: "mt-1",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("input", {
                        ref: emailRef,
                        id: "email",
                        required: !0,
                        autoFocus: !0,
                        name: "email",
                        type: "email",
                        autoComplete: "email",
                        "aria-invalid":
                          (_a =
                            actionData == null ? void 0 : actionData.errors) !=
                            null && _a.email
                            ? !0
                            : void 0,
                        "aria-describedby": "email-error",
                        className:
                          "w-full rounded border border-gray-500 px-2 py-1 text-lg",
                      }),
                      (_b = actionData == null ? void 0 : actionData.errors) !=
                        null && _b.email
                        ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", {
                            className: "pt-1 text-red-700",
                            id: "email-error",
                            children: actionData.errors.email,
                          })
                        : null,
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("label", {
                    htmlFor: "password",
                    className: "block text-sm font-medium text-gray-700",
                    children: "Password",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", {
                    className: "mt-1",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("input", {
                        id: "password",
                        ref: passwordRef,
                        name: "password",
                        type: "password",
                        autoComplete: "current-password",
                        "aria-invalid":
                          (_c =
                            actionData == null ? void 0 : actionData.errors) !=
                            null && _c.password
                            ? !0
                            : void 0,
                        "aria-describedby": "password-error",
                        className:
                          "w-full rounded border border-gray-500 px-2 py-1 text-lg",
                      }),
                      (_d = actionData == null ? void 0 : actionData.errors) !=
                        null && _d.password
                        ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", {
                            className: "pt-1 text-red-700",
                            id: "password-error",
                            children: actionData.errors.password,
                          })
                        : null,
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("input", {
                type: "hidden",
                name: "redirectTo",
                value: redirectTo,
              }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", {
                type: "submit",
                className:
                  "w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400",
                children: "Log in",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", {
                className: "flex items-center justify-between",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", {
                    className: "flex items-center",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("input", {
                        id: "remember",
                        name: "remember",
                        type: "checkbox",
                        className:
                          "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500",
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("label", {
                        htmlFor: "remember",
                        className: "ml-2 block text-sm text-gray-900",
                        children: "Remember me",
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", {
                    className: "text-center text-sm text-gray-500",
                    children: [
                      "Don't have an account?",
                      " ",
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                        import_react10.Link,
                        {
                          className: "text-blue-500 underline",
                          to: {
                            pathname: "/join",
                            search: searchParams.toString(),
                          },
                          children: "Sign up",
                        }
                      ),
                    ],
                  }),
                ],
              }),
            ],
          }
        ),
      }),
    })
  );
}

// app/routes/notes.tsx
var notes_exports = {};
__export(notes_exports, {
  default: () => NotesPage,
  loader: () => loader6,
});
var import_node8 = require("@remix-run/node"),
  import_react12 = require("@remix-run/react");
var import_jsx_runtime8 = require("react/jsx-runtime"),
  loader6 = async ({ request }) => {
    let userId = await requireUserId(request),
      noteListItems = await getNoteListItems({ userId });
    return (0, import_node8.json)({ noteListItems });
  };
function NotesPage() {
  let data = (0, import_react12.useLoaderData)(),
    user = useUser();
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", {
    className: "flex h-full min-h-screen flex-col",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("header", {
        className:
          "flex items-center justify-between bg-slate-800 p-4 text-white",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h1", {
            className: "text-3xl font-bold",
            children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
              import_react12.Link,
              { to: ".", children: "Notes" }
            ),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", {
            children: user.username,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react12.Form, {
            action: "/logout",
            method: "post",
            children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", {
              type: "submit",
              className:
                "rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600",
              children: "Logout",
            }),
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("main", {
        className: "flex h-full bg-white",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", {
            className: "h-full w-80 border-r bg-gray-50",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                import_react12.Link,
                {
                  to: "new",
                  className: "block p-4 text-xl text-blue-500",
                  children: "+ New Note",
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("hr", {}),
              data.noteListItems.length === 0
                ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", {
                    className: "p-4",
                    children: "No notes yet",
                  })
                : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("ol", {
                    children: data.noteListItems.map((note) =>
                      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                        "li",
                        {
                          children: /* @__PURE__ */ (0,
                          import_jsx_runtime8.jsxs)(import_react12.NavLink, {
                            className: ({ isActive }) =>
                              `block border-b p-4 text-xl ${
                                isActive ? "bg-white" : ""
                              }`,
                            to: note.id,
                            children: ["\u{1F4DD} ", note.title],
                          }),
                        },
                        note.id
                      )
                    ),
                  }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", {
            className: "flex-1 p-6",
            children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
              import_react12.Outlet,
              {}
            ),
          }),
        ],
      }),
    ],
  });
}

// app/routes/join.tsx
var join_exports = {};
__export(join_exports, {
  action: () => action6,
  default: () => Join,
  loader: () => loader7,
  meta: () => meta3,
});
var import_node9 = require("@remix-run/node"),
  import_react13 = require("@remix-run/react"),
  import_react14 = require("react");
var import_jsx_runtime9 = require("react/jsx-runtime"),
  loader7 = async ({ request }) =>
    (await getUserId(request))
      ? (0, import_node9.redirect)("/")
      : (0, import_node9.json)({}),
  action6 = async ({ request }) => {
    let formData = await request.formData(),
      username = formData.get("username"),
      password = formData.get("password"),
      redirectTo = safeRedirect(formData.get("redirectTo"), "/");
    if (!validateEmail(username))
      return (0, import_node9.json)(
        { errors: { username: "Email is invalid", password: null } },
        { status: 400 }
      );
    if (typeof password != "string" || password.length === 0)
      return (0, import_node9.json)(
        { errors: { username: null, password: "Password is required" } },
        { status: 400 }
      );
    if (password.length < 8)
      return (0, import_node9.json)(
        { errors: { username: null, password: "Password is too short" } },
        { status: 400 }
      );
    if (await getUserByUsername(username))
      return (0, import_node9.json)(
        {
          errors: {
            username: "A user already exists with this username",
            password: null,
          },
        },
        { status: 400 }
      );
    let user = await createUser(username, password);
    return createUserSession({
      redirectTo,
      remember: !1,
      request,
      userId: user.id,
    });
  },
  meta3 = () => [{ title: "Sign Up" }];
function Join() {
  var _a, _b, _c, _d;
  let [searchParams] = (0, import_react13.useSearchParams)(),
    redirectTo = searchParams.get("redirectTo") ?? void 0,
    actionData = (0, import_react13.useActionData)(),
    usernameRef = (0, import_react14.useRef)(null),
    passwordRef = (0, import_react14.useRef)(null);
  return (
    (0, import_react14.useEffect)(() => {
      var _a2, _b2, _c2, _d2;
      (_a2 = actionData == null ? void 0 : actionData.errors) != null &&
      _a2.username
        ? (_b2 = usernameRef.current) == null || _b2.focus()
        : (_c2 = actionData == null ? void 0 : actionData.errors) != null &&
          _c2.password &&
          ((_d2 = passwordRef.current) == null || _d2.focus());
    }, [actionData]),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", {
      className: "flex min-h-full flex-col justify-center",
      children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", {
        className: "mx-auto w-full max-w-md px-8",
        children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
          import_react13.Form,
          {
            method: "post",
            className: "space-y-6",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("label", {
                    htmlFor: "username",
                    className: "block text-sm font-medium text-gray-700",
                    children: "username",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", {
                    className: "mt-1",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("input", {
                        ref: usernameRef,
                        id: " address",
                        required: !0,
                        autoFocus: !0,
                        name: "username",
                        type: "username",
                        autoComplete: "username",
                        "aria-invalid":
                          (_a =
                            actionData == null ? void 0 : actionData.errors) !=
                            null && _a.username
                            ? !0
                            : void 0,
                        "aria-describedby": "username-error",
                        className:
                          "w-full rounded border border-gray-500 px-2 py-1 text-lg",
                      }),
                      (_b = actionData == null ? void 0 : actionData.errors) !=
                        null && _b.username
                        ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", {
                            className: "pt-1 text-red-700",
                            id: "username-error",
                            children: actionData.errors.username,
                          })
                        : null,
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("label", {
                    htmlFor: "password",
                    className: "block text-sm font-medium text-gray-700",
                    children: "Password",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", {
                    className: "mt-1",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("input", {
                        id: "password",
                        ref: passwordRef,
                        name: "password",
                        type: "password",
                        autoComplete: "new-password",
                        "aria-invalid":
                          (_c =
                            actionData == null ? void 0 : actionData.errors) !=
                            null && _c.password
                            ? !0
                            : void 0,
                        "aria-describedby": "password-error",
                        className:
                          "w-full rounded border border-gray-500 px-2 py-1 text-lg",
                      }),
                      (_d = actionData == null ? void 0 : actionData.errors) !=
                        null && _d.password
                        ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", {
                            className: "pt-1 text-red-700",
                            id: "password-error",
                            children: actionData.errors.password,
                          })
                        : null,
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("input", {
                type: "hidden",
                name: "redirectTo",
                value: redirectTo,
              }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", {
                type: "submit",
                className:
                  "w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400",
                children: "Create Account",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", {
                className: "flex items-center justify-center",
                children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", {
                  className: "text-center text-sm text-gray-500",
                  children: [
                    "Already have an account?",
                    " ",
                    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
                      import_react13.Link,
                      {
                        className: "text-blue-500 underline",
                        to: {
                          pathname: "/login",
                          search: searchParams.toString(),
                        },
                        children: "Log in",
                      }
                    ),
                  ],
                }),
              }),
            ],
          }
        ),
      }),
    })
  );
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = {
  entry: {
    module: "/build/entry.client-NX4GY36X.js",
    imports: [
      "/build/_shared/chunk-K3DR7AZF.js",
      "/build/_shared/chunk-Q3IECNXJ.js",
    ],
  },
  routes: {
    root: {
      id: "root",
      parentId: void 0,
      path: "",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/root-7KN2AKPN.js",
      imports: [
        "/build/_shared/chunk-PGOH7JLP.js",
        "/build/_shared/chunk-FPOB764B.js",
      ],
      hasAction: !1,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/_index": {
      id: "routes/_index",
      parentId: "root",
      path: void 0,
      index: !0,
      caseSensitive: void 0,
      module: "/build/routes/_index-37FLYCCH.js",
      imports: [
        "/build/_shared/chunk-JA76ZJ7B.js",
        "/build/_shared/chunk-YMLRYBBJ.js",
      ],
      hasAction: !0,
      hasLoader: !1,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/healthcheck": {
      id: "routes/healthcheck",
      parentId: "root",
      path: "healthcheck",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/healthcheck-BQ2SXEZN.js",
      imports: void 0,
      hasAction: !1,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/join": {
      id: "routes/join",
      parentId: "root",
      path: "join",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/join-IRRDYSR5.js",
      imports: [
        "/build/_shared/chunk-JA76ZJ7B.js",
        "/build/_shared/chunk-YMLRYBBJ.js",
      ],
      hasAction: !0,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/login": {
      id: "routes/login",
      parentId: "root",
      path: "login",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/login-L55EXIYW.js",
      imports: [
        "/build/_shared/chunk-JA76ZJ7B.js",
        "/build/_shared/chunk-YMLRYBBJ.js",
      ],
      hasAction: !0,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/logout": {
      id: "routes/logout",
      parentId: "root",
      path: "logout",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/logout-GPTXG6BX.js",
      imports: void 0,
      hasAction: !0,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/notes": {
      id: "routes/notes",
      parentId: "root",
      path: "notes",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/notes-GCCA5CFM.js",
      imports: [
        "/build/_shared/chunk-EXA2H3AC.js",
        "/build/_shared/chunk-YMLRYBBJ.js",
      ],
      hasAction: !1,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/notes.$noteId": {
      id: "routes/notes.$noteId",
      parentId: "routes/notes",
      path: ":noteId",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/notes.$noteId-PFWFORTT.js",
      imports: [
        "/build/_shared/chunk-PGOH7JLP.js",
        "/build/_shared/chunk-FPOB764B.js",
      ],
      hasAction: !0,
      hasLoader: !0,
      hasCatchBoundary: !1,
      hasErrorBoundary: !0,
    },
    "routes/notes._index": {
      id: "routes/notes._index",
      parentId: "routes/notes",
      path: void 0,
      index: !0,
      caseSensitive: void 0,
      module: "/build/routes/notes._index-VT5LHOG4.js",
      imports: void 0,
      hasAction: !1,
      hasLoader: !1,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
    "routes/notes.new": {
      id: "routes/notes.new",
      parentId: "routes/notes",
      path: "new",
      index: void 0,
      caseSensitive: void 0,
      module: "/build/routes/notes.new-TJHUCXBX.js",
      imports: [
        "/build/_shared/chunk-PGOH7JLP.js",
        "/build/_shared/chunk-FPOB764B.js",
      ],
      hasAction: !0,
      hasLoader: !1,
      hasCatchBoundary: !1,
      hasErrorBoundary: !1,
    },
  },
  version: "6e5ae2fe",
  hmr: void 0,
  url: "/build/manifest-6E5AE2FE.js",
};

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build",
  future = {
    v2_dev: !0,
    unstable_postcss: !1,
    unstable_tailwind: !1,
    v2_errorBoundary: !0,
    v2_headers: !0,
    v2_meta: !0,
    v2_normalizeFormMethod: !0,
    v2_routeConvention: !0,
  },
  publicPath = "/build/",
  entry = { module: entry_server_exports },
  routes = {
    root: {
      id: "root",
      parentId: void 0,
      path: "",
      index: void 0,
      caseSensitive: void 0,
      module: root_exports,
    },
    "routes/notes.$noteId": {
      id: "routes/notes.$noteId",
      parentId: "routes/notes",
      path: ":noteId",
      index: void 0,
      caseSensitive: void 0,
      module: notes_noteId_exports,
    },
    "routes/notes._index": {
      id: "routes/notes._index",
      parentId: "routes/notes",
      path: void 0,
      index: !0,
      caseSensitive: void 0,
      module: notes_index_exports,
    },
    "routes/healthcheck": {
      id: "routes/healthcheck",
      parentId: "root",
      path: "healthcheck",
      index: void 0,
      caseSensitive: void 0,
      module: healthcheck_exports,
    },
    "routes/notes.new": {
      id: "routes/notes.new",
      parentId: "routes/notes",
      path: "new",
      index: void 0,
      caseSensitive: void 0,
      module: notes_new_exports,
    },
    "routes/_index": {
      id: "routes/_index",
      parentId: "root",
      path: void 0,
      index: !0,
      caseSensitive: void 0,
      module: index_exports,
    },
    "routes/logout": {
      id: "routes/logout",
      parentId: "root",
      path: "logout",
      index: void 0,
      caseSensitive: void 0,
      module: logout_exports,
    },
    "routes/login": {
      id: "routes/login",
      parentId: "root",
      path: "login",
      index: void 0,
      caseSensitive: void 0,
      module: login_exports,
    },
    "routes/notes": {
      id: "routes/notes",
      parentId: "root",
      path: "notes",
      index: void 0,
      caseSensitive: void 0,
      module: notes_exports,
    },
    "routes/join": {
      id: "routes/join",
      parentId: "root",
      path: "join",
      index: void 0,
      caseSensitive: void 0,
      module: join_exports,
    },
  };
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    assets,
    assetsBuildDirectory,
    entry,
    future,
    publicPath,
    routes,
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
