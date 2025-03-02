var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
import require$$0 from "os";
import require$$0$1 from "crypto";
import fs$1 from "fs";
import path from "path";
import require$$2 from "http";
import require$$3 from "https";
import require$$0$5 from "net";
import require$$1 from "tls";
import require$$4 from "events";
import require$$0$3 from "assert";
import require$$0$2 from "util";
import require$$0$4 from "stream";
import require$$7 from "buffer";
import require$$8 from "querystring";
import require$$14 from "stream/web";
import require$$0$7 from "node:stream";
import require$$1$1 from "node:util";
import require$$0$6 from "node:events";
import require$$0$8 from "worker_threads";
import require$$2$1 from "perf_hooks";
import require$$5 from "util/types";
import require$$4$1 from "async_hooks";
import require$$1$2 from "console";
import require$$1$3 from "url";
import require$$3$1 from "zlib";
import require$$6 from "string_decoder";
import require$$0$9 from "diagnostics_channel";
import require$$2$2 from "child_process";
import require$$6$1 from "timers";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var core = {};
var command = {};
var utils$1 = {};
Object.defineProperty(utils$1, "__esModule", { value: true });
utils$1.toCommandProperties = utils$1.toCommandValue = void 0;
function toCommandValue(input) {
  if (input === null || input === void 0) {
    return "";
  } else if (typeof input === "string" || input instanceof String) {
    return input;
  }
  return JSON.stringify(input);
}
utils$1.toCommandValue = toCommandValue;
function toCommandProperties(annotationProperties) {
  if (!Object.keys(annotationProperties).length) {
    return {};
  }
  return {
    title: annotationProperties.title,
    file: annotationProperties.file,
    line: annotationProperties.startLine,
    endLine: annotationProperties.endLine,
    col: annotationProperties.startColumn,
    endColumn: annotationProperties.endColumn
  };
}
utils$1.toCommandProperties = toCommandProperties;
var __createBinding$2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function() {
      return m[k];
    } };
  }
  Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault$2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
});
var __importStar$2 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod)
      if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
        __createBinding$2(result, mod, k);
  }
  __setModuleDefault$2(result, mod);
  return result;
};
Object.defineProperty(command, "__esModule", { value: true });
command.issue = command.issueCommand = void 0;
const os$1 = __importStar$2(require$$0);
const utils_1$1 = utils$1;
function issueCommand(command2, properties, message) {
  const cmd = new Command(command2, properties, message);
  process.stdout.write(cmd.toString() + os$1.EOL);
}
command.issueCommand = issueCommand;
function issue(name, message = "") {
  issueCommand(name, {}, message);
}
command.issue = issue;
const CMD_STRING = "::";
class Command {
  constructor(command2, properties, message) {
    if (!command2) {
      command2 = "missing.command";
    }
    this.command = command2;
    this.properties = properties;
    this.message = message;
  }
  toString() {
    let cmdStr = CMD_STRING + this.command;
    if (this.properties && Object.keys(this.properties).length > 0) {
      cmdStr += " ";
      let first = true;
      for (const key in this.properties) {
        if (this.properties.hasOwnProperty(key)) {
          const val = this.properties[key];
          if (val) {
            if (first) {
              first = false;
            } else {
              cmdStr += ",";
            }
            cmdStr += `${key}=${escapeProperty(val)}`;
          }
        }
      }
    }
    cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
    return cmdStr;
  }
}
function escapeData(s) {
  return (0, utils_1$1.toCommandValue)(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}
function escapeProperty(s) {
  return (0, utils_1$1.toCommandValue)(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
}
var fileCommand = {};
var __createBinding$1 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function() {
      return m[k];
    } };
  }
  Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault$1 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
});
var __importStar$1 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod)
      if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
        __createBinding$1(result, mod, k);
  }
  __setModuleDefault$1(result, mod);
  return result;
};
Object.defineProperty(fileCommand, "__esModule", { value: true });
fileCommand.prepareKeyValueMessage = fileCommand.issueFileCommand = void 0;
const crypto = __importStar$1(require$$0$1);
const fs = __importStar$1(fs$1);
const os = __importStar$1(require$$0);
const utils_1 = utils$1;
function issueFileCommand(command2, message) {
  const filePath = process.env[`GITHUB_${command2}`];
  if (!filePath) {
    throw new Error(`Unable to find environment variable for file command ${command2}`);
  }
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing file at path: ${filePath}`);
  }
  fs.appendFileSync(filePath, `${(0, utils_1.toCommandValue)(message)}${os.EOL}`, {
    encoding: "utf8"
  });
}
fileCommand.issueFileCommand = issueFileCommand;
function prepareKeyValueMessage(key, value) {
  const delimiter = `ghadelimiter_${crypto.randomUUID()}`;
  const convertedValue = (0, utils_1.toCommandValue)(value);
  if (key.includes(delimiter)) {
    throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
  }
  if (convertedValue.includes(delimiter)) {
    throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
  }
  return `${key}<<${delimiter}${os.EOL}${convertedValue}${os.EOL}${delimiter}`;
}
fileCommand.prepareKeyValueMessage = prepareKeyValueMessage;
var oidcUtils = {};
var lib = {};
var proxy = {};
Object.defineProperty(proxy, "__esModule", { value: true });
proxy.checkBypass = proxy.getProxyUrl = void 0;
function getProxyUrl$1(reqUrl) {
  const usingSsl = reqUrl.protocol === "https:";
  if (checkBypass(reqUrl)) {
    return void 0;
  }
  const proxyVar = (() => {
    if (usingSsl) {
      return process.env["https_proxy"] || process.env["HTTPS_PROXY"];
    } else {
      return process.env["http_proxy"] || process.env["HTTP_PROXY"];
    }
  })();
  if (proxyVar) {
    try {
      return new DecodedURL(proxyVar);
    } catch (_a) {
      if (!proxyVar.startsWith("http://") && !proxyVar.startsWith("https://"))
        return new DecodedURL(`http://${proxyVar}`);
    }
  } else {
    return void 0;
  }
}
proxy.getProxyUrl = getProxyUrl$1;
function checkBypass(reqUrl) {
  if (!reqUrl.hostname) {
    return false;
  }
  const reqHost = reqUrl.hostname;
  if (isLoopbackAddress(reqHost)) {
    return true;
  }
  const noProxy = process.env["no_proxy"] || process.env["NO_PROXY"] || "";
  if (!noProxy) {
    return false;
  }
  let reqPort;
  if (reqUrl.port) {
    reqPort = Number(reqUrl.port);
  } else if (reqUrl.protocol === "http:") {
    reqPort = 80;
  } else if (reqUrl.protocol === "https:") {
    reqPort = 443;
  }
  const upperReqHosts = [reqUrl.hostname.toUpperCase()];
  if (typeof reqPort === "number") {
    upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
  }
  for (const upperNoProxyItem of noProxy.split(",").map((x) => x.trim().toUpperCase()).filter((x) => x)) {
    if (upperNoProxyItem === "*" || upperReqHosts.some((x) => x === upperNoProxyItem || x.endsWith(`.${upperNoProxyItem}`) || upperNoProxyItem.startsWith(".") && x.endsWith(`${upperNoProxyItem}`))) {
      return true;
    }
  }
  return false;
}
proxy.checkBypass = checkBypass;
function isLoopbackAddress(host) {
  const hostLower = host.toLowerCase();
  return hostLower === "localhost" || hostLower.startsWith("127.") || hostLower.startsWith("[::1]") || hostLower.startsWith("[0:0:0:0:0:0:0:1]");
}
class DecodedURL extends URL {
  constructor(url, base) {
    super(url, base);
    this._decodedUsername = decodeURIComponent(super.username);
    this._decodedPassword = decodeURIComponent(super.password);
  }
  get username() {
    return this._decodedUsername;
  }
  get password() {
    return this._decodedPassword;
  }
}
var tunnel$2 = {};
var tls$1 = require$$1;
var http$2 = require$$2;
var https$1 = require$$3;
var events$1 = require$$4;
var util$k = require$$0$2;
tunnel$2.httpOverHttp = httpOverHttp;
tunnel$2.httpsOverHttp = httpsOverHttp;
tunnel$2.httpOverHttps = httpOverHttps;
tunnel$2.httpsOverHttps = httpsOverHttps;
function httpOverHttp(options) {
  var agent2 = new TunnelingAgent(options);
  agent2.request = http$2.request;
  return agent2;
}
function httpsOverHttp(options) {
  var agent2 = new TunnelingAgent(options);
  agent2.request = http$2.request;
  agent2.createSocket = createSecureSocket;
  agent2.defaultPort = 443;
  return agent2;
}
function httpOverHttps(options) {
  var agent2 = new TunnelingAgent(options);
  agent2.request = https$1.request;
  return agent2;
}
function httpsOverHttps(options) {
  var agent2 = new TunnelingAgent(options);
  agent2.request = https$1.request;
  agent2.createSocket = createSecureSocket;
  agent2.defaultPort = 443;
  return agent2;
}
function TunnelingAgent(options) {
  var self2 = this;
  self2.options = options || {};
  self2.proxyOptions = self2.options.proxy || {};
  self2.maxSockets = self2.options.maxSockets || http$2.Agent.defaultMaxSockets;
  self2.requests = [];
  self2.sockets = [];
  self2.on("free", function onFree(socket, host, port, localAddress) {
    var options2 = toOptions(host, port, localAddress);
    for (var i = 0, len = self2.requests.length; i < len; ++i) {
      var pending = self2.requests[i];
      if (pending.host === options2.host && pending.port === options2.port) {
        self2.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self2.removeSocket(socket);
  });
}
util$k.inherits(TunnelingAgent, events$1.EventEmitter);
TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self2 = this;
  var options = mergeOptions({ request: req }, self2.options, toOptions(host, port, localAddress));
  if (self2.sockets.length >= this.maxSockets) {
    self2.requests.push(options);
    return;
  }
  self2.createSocket(options, function(socket) {
    socket.on("free", onFree);
    socket.on("close", onCloseOrRemove);
    socket.on("agentRemove", onCloseOrRemove);
    req.onSocket(socket);
    function onFree() {
      self2.emit("free", socket, options);
    }
    function onCloseOrRemove(err) {
      self2.removeSocket(socket);
      socket.removeListener("free", onFree);
      socket.removeListener("close", onCloseOrRemove);
      socket.removeListener("agentRemove", onCloseOrRemove);
    }
  });
};
TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self2 = this;
  var placeholder = {};
  self2.sockets.push(placeholder);
  var connectOptions = mergeOptions({}, self2.proxyOptions, {
    method: "CONNECT",
    path: options.host + ":" + options.port,
    agent: false,
    headers: {
      host: options.host + ":" + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers["Proxy-Authorization"] = "Basic " + new Buffer(connectOptions.proxyAuth).toString("base64");
  }
  debug("making CONNECT request");
  var connectReq = self2.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false;
  connectReq.once("response", onResponse);
  connectReq.once("upgrade", onUpgrade);
  connectReq.once("connect", onConnect);
  connectReq.once("error", onError2);
  connectReq.end();
  function onResponse(res) {
    res.upgrade = true;
  }
  function onUpgrade(res, socket, head) {
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }
  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();
    if (res.statusCode !== 200) {
      debug(
        "tunneling socket could not be established, statusCode=%d",
        res.statusCode
      );
      socket.destroy();
      var error = new Error("tunneling socket could not be established, statusCode=" + res.statusCode);
      error.code = "ECONNRESET";
      options.request.emit("error", error);
      self2.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug("got illegal response body from proxy");
      socket.destroy();
      var error = new Error("got illegal response body from proxy");
      error.code = "ECONNRESET";
      options.request.emit("error", error);
      self2.removeSocket(placeholder);
      return;
    }
    debug("tunneling connection has established");
    self2.sockets[self2.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }
  function onError2(cause) {
    connectReq.removeAllListeners();
    debug(
      "tunneling socket could not be established, cause=%s\n",
      cause.message,
      cause.stack
    );
    var error = new Error("tunneling socket could not be established, cause=" + cause.message);
    error.code = "ECONNRESET";
    options.request.emit("error", error);
    self2.removeSocket(placeholder);
  }
};
TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket);
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);
  var pending = this.requests.shift();
  if (pending) {
    this.createSocket(pending, function(socket2) {
      pending.request.onSocket(socket2);
    });
  }
};
function createSecureSocket(options, cb) {
  var self2 = this;
  TunnelingAgent.prototype.createSocket.call(self2, options, function(socket) {
    var hostHeader = options.request.getHeader("host");
    var tlsOptions = mergeOptions({}, self2.options, {
      socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, "") : options.host
    });
    var secureSocket = tls$1.connect(0, tlsOptions);
    self2.sockets[self2.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}
function toOptions(host, port, localAddress) {
  if (typeof host === "string") {
    return {
      host,
      port,
      localAddress
    };
  }
  return host;
}
function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === "object") {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== void 0) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}
var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === "string") {
      args[0] = "TUNNEL: " + args[0];
    } else {
      args.unshift("TUNNEL:");
    }
    console.error.apply(console, args);
  };
} else {
  debug = function() {
  };
}
tunnel$2.debug = debug;
var tunnel$1 = tunnel$2;
var undici = {};
var symbols$4 = {
  kClose: Symbol("close"),
  kDestroy: Symbol("destroy"),
  kDispatch: Symbol("dispatch"),
  kUrl: Symbol("url"),
  kWriting: Symbol("writing"),
  kResuming: Symbol("resuming"),
  kQueue: Symbol("queue"),
  kConnect: Symbol("connect"),
  kConnecting: Symbol("connecting"),
  kHeadersList: Symbol("headers list"),
  kKeepAliveDefaultTimeout: Symbol("default keep alive timeout"),
  kKeepAliveMaxTimeout: Symbol("max keep alive timeout"),
  kKeepAliveTimeoutThreshold: Symbol("keep alive timeout threshold"),
  kKeepAliveTimeoutValue: Symbol("keep alive timeout"),
  kKeepAlive: Symbol("keep alive"),
  kHeadersTimeout: Symbol("headers timeout"),
  kBodyTimeout: Symbol("body timeout"),
  kServerName: Symbol("server name"),
  kLocalAddress: Symbol("local address"),
  kHost: Symbol("host"),
  kNoRef: Symbol("no ref"),
  kBodyUsed: Symbol("used"),
  kRunning: Symbol("running"),
  kBlocking: Symbol("blocking"),
  kPending: Symbol("pending"),
  kSize: Symbol("size"),
  kBusy: Symbol("busy"),
  kQueued: Symbol("queued"),
  kFree: Symbol("free"),
  kConnected: Symbol("connected"),
  kClosed: Symbol("closed"),
  kNeedDrain: Symbol("need drain"),
  kReset: Symbol("reset"),
  kDestroyed: Symbol.for("nodejs.stream.destroyed"),
  kMaxHeadersSize: Symbol("max headers size"),
  kRunningIdx: Symbol("running index"),
  kPendingIdx: Symbol("pending index"),
  kError: Symbol("error"),
  kClients: Symbol("clients"),
  kClient: Symbol("client"),
  kParser: Symbol("parser"),
  kOnDestroyed: Symbol("destroy callbacks"),
  kPipelining: Symbol("pipelining"),
  kSocket: Symbol("socket"),
  kHostHeader: Symbol("host header"),
  kConnector: Symbol("connector"),
  kStrictContentLength: Symbol("strict content length"),
  kMaxRedirections: Symbol("maxRedirections"),
  kMaxRequests: Symbol("maxRequestsPerClient"),
  kProxy: Symbol("proxy agent options"),
  kCounter: Symbol("socket request counter"),
  kInterceptors: Symbol("dispatch interceptors"),
  kMaxResponseSize: Symbol("max response size"),
  kHTTP2Session: Symbol("http2Session"),
  kHTTP2SessionState: Symbol("http2Session state"),
  kHTTP2BuildRequest: Symbol("http2 build request"),
  kHTTP1BuildRequest: Symbol("http1 build request"),
  kHTTP2CopyHeaders: Symbol("http2 copy headers"),
  kHTTPConnVersion: Symbol("http connection version"),
  kRetryHandlerDefaultRetry: Symbol("retry agent default retry"),
  kConstruct: Symbol("constructable")
};
let UndiciError$2 = class UndiciError extends Error {
  constructor(message) {
    super(message);
    this.name = "UndiciError";
    this.code = "UND_ERR";
  }
};
let ConnectTimeoutError$1 = class ConnectTimeoutError extends UndiciError$2 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, ConnectTimeoutError);
    this.name = "ConnectTimeoutError";
    this.message = message || "Connect Timeout Error";
    this.code = "UND_ERR_CONNECT_TIMEOUT";
  }
};
let HeadersTimeoutError$1 = class HeadersTimeoutError extends UndiciError$2 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, HeadersTimeoutError);
    this.name = "HeadersTimeoutError";
    this.message = message || "Headers Timeout Error";
    this.code = "UND_ERR_HEADERS_TIMEOUT";
  }
};
let HeadersOverflowError$1 = class HeadersOverflowError extends UndiciError$2 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, HeadersOverflowError);
    this.name = "HeadersOverflowError";
    this.message = message || "Headers Overflow Error";
    this.code = "UND_ERR_HEADERS_OVERFLOW";
  }
};
let BodyTimeoutError$1 = class BodyTimeoutError extends UndiciError$2 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, BodyTimeoutError);
    this.name = "BodyTimeoutError";
    this.message = message || "Body Timeout Error";
    this.code = "UND_ERR_BODY_TIMEOUT";
  }
};
let ResponseStatusCodeError$1 = class ResponseStatusCodeError extends UndiciError$2 {
  constructor(message, statusCode, headers2, body2) {
    super(message);
    Error.captureStackTrace(this, ResponseStatusCodeError);
    this.name = "ResponseStatusCodeError";
    this.message = message || "Response Status Code Error";
    this.code = "UND_ERR_RESPONSE_STATUS_CODE";
    this.body = body2;
    this.status = statusCode;
    this.statusCode = statusCode;
    this.headers = headers2;
  }
};
let InvalidArgumentError$m = class InvalidArgumentError extends UndiciError$2 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, InvalidArgumentError);
    this.name = "InvalidArgumentError";
    this.message = message || "Invalid Argument Error";
    this.code = "UND_ERR_INVALID_ARG";
  }
};
let InvalidReturnValueError$2 = class InvalidReturnValueError extends UndiciError$2 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, InvalidReturnValueError);
    this.name = "InvalidReturnValueError";
    this.message = message || "Invalid Return Value Error";
    this.code = "UND_ERR_INVALID_RETURN_VALUE";
  }
};
let RequestAbortedError$9 = class RequestAbortedError extends UndiciError$2 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, RequestAbortedError);
    this.name = "AbortError";
    this.message = message || "Request aborted";
    this.code = "UND_ERR_ABORTED";
  }
};
let InformationalError$1 = class InformationalError extends UndiciError$2 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, InformationalError);
    this.name = "InformationalError";
    this.message = message || "Request information";
    this.code = "UND_ERR_INFO";
  }
};
let RequestContentLengthMismatchError$1 = class RequestContentLengthMismatchError extends UndiciError$2 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, RequestContentLengthMismatchError);
    this.name = "RequestContentLengthMismatchError";
    this.message = message || "Request body length does not match content-length header";
    this.code = "UND_ERR_REQ_CONTENT_LENGTH_MISMATCH";
  }
};
let ResponseContentLengthMismatchError$1 = class ResponseContentLengthMismatchError extends UndiciError$2 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, ResponseContentLengthMismatchError);
    this.name = "ResponseContentLengthMismatchError";
    this.message = message || "Response body length does not match content-length header";
    this.code = "UND_ERR_RES_CONTENT_LENGTH_MISMATCH";
  }
};
let ClientDestroyedError$2 = class ClientDestroyedError extends UndiciError$2 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, ClientDestroyedError);
    this.name = "ClientDestroyedError";
    this.message = message || "The client is destroyed";
    this.code = "UND_ERR_DESTROYED";
  }
};
let ClientClosedError$1 = class ClientClosedError extends UndiciError$2 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, ClientClosedError);
    this.name = "ClientClosedError";
    this.message = message || "The client is closed";
    this.code = "UND_ERR_CLOSED";
  }
};
let SocketError$3 = class SocketError extends UndiciError$2 {
  constructor(message, socket) {
    super(message);
    Error.captureStackTrace(this, SocketError);
    this.name = "SocketError";
    this.message = message || "Socket error";
    this.code = "UND_ERR_SOCKET";
    this.socket = socket;
  }
};
let NotSupportedError$2 = class NotSupportedError extends UndiciError$2 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, NotSupportedError);
    this.name = "NotSupportedError";
    this.message = message || "Not supported error";
    this.code = "UND_ERR_NOT_SUPPORTED";
  }
};
let BalancedPoolMissingUpstreamError$1 = class BalancedPoolMissingUpstreamError extends UndiciError$2 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, NotSupportedError$2);
    this.name = "MissingUpstreamError";
    this.message = message || "No upstream has been added to the BalancedPool";
    this.code = "UND_ERR_BPL_MISSING_UPSTREAM";
  }
};
let HTTPParserError$1 = class HTTPParserError extends Error {
  constructor(message, code, data) {
    super(message);
    Error.captureStackTrace(this, HTTPParserError);
    this.name = "HTTPParserError";
    this.code = code ? `HPE_${code}` : void 0;
    this.data = data ? data.toString() : void 0;
  }
};
let ResponseExceededMaxSizeError$1 = class ResponseExceededMaxSizeError extends UndiciError$2 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, ResponseExceededMaxSizeError);
    this.name = "ResponseExceededMaxSizeError";
    this.message = message || "Response content exceeded max size";
    this.code = "UND_ERR_RES_EXCEEDED_MAX_SIZE";
  }
};
let RequestRetryError$1 = class RequestRetryError extends UndiciError$2 {
  constructor(message, code, { headers: headers2, data }) {
    super(message);
    Error.captureStackTrace(this, RequestRetryError);
    this.name = "RequestRetryError";
    this.message = message || "Request retry error";
    this.code = "UND_ERR_REQ_RETRY";
    this.statusCode = code;
    this.data = data;
    this.headers = headers2;
  }
};
var errors$1 = {
  HTTPParserError: HTTPParserError$1,
  UndiciError: UndiciError$2,
  HeadersTimeoutError: HeadersTimeoutError$1,
  HeadersOverflowError: HeadersOverflowError$1,
  BodyTimeoutError: BodyTimeoutError$1,
  RequestContentLengthMismatchError: RequestContentLengthMismatchError$1,
  ConnectTimeoutError: ConnectTimeoutError$1,
  ResponseStatusCodeError: ResponseStatusCodeError$1,
  InvalidArgumentError: InvalidArgumentError$m,
  InvalidReturnValueError: InvalidReturnValueError$2,
  RequestAbortedError: RequestAbortedError$9,
  ClientDestroyedError: ClientDestroyedError$2,
  ClientClosedError: ClientClosedError$1,
  InformationalError: InformationalError$1,
  SocketError: SocketError$3,
  NotSupportedError: NotSupportedError$2,
  ResponseContentLengthMismatchError: ResponseContentLengthMismatchError$1,
  BalancedPoolMissingUpstreamError: BalancedPoolMissingUpstreamError$1,
  ResponseExceededMaxSizeError: ResponseExceededMaxSizeError$1,
  RequestRetryError: RequestRetryError$1
};
const headerNameLowerCasedRecord$1 = {};
const wellknownHeaderNames = [
  "Accept",
  "Accept-Encoding",
  "Accept-Language",
  "Accept-Ranges",
  "Access-Control-Allow-Credentials",
  "Access-Control-Allow-Headers",
  "Access-Control-Allow-Methods",
  "Access-Control-Allow-Origin",
  "Access-Control-Expose-Headers",
  "Access-Control-Max-Age",
  "Access-Control-Request-Headers",
  "Access-Control-Request-Method",
  "Age",
  "Allow",
  "Alt-Svc",
  "Alt-Used",
  "Authorization",
  "Cache-Control",
  "Clear-Site-Data",
  "Connection",
  "Content-Disposition",
  "Content-Encoding",
  "Content-Language",
  "Content-Length",
  "Content-Location",
  "Content-Range",
  "Content-Security-Policy",
  "Content-Security-Policy-Report-Only",
  "Content-Type",
  "Cookie",
  "Cross-Origin-Embedder-Policy",
  "Cross-Origin-Opener-Policy",
  "Cross-Origin-Resource-Policy",
  "Date",
  "Device-Memory",
  "Downlink",
  "ECT",
  "ETag",
  "Expect",
  "Expect-CT",
  "Expires",
  "Forwarded",
  "From",
  "Host",
  "If-Match",
  "If-Modified-Since",
  "If-None-Match",
  "If-Range",
  "If-Unmodified-Since",
  "Keep-Alive",
  "Last-Modified",
  "Link",
  "Location",
  "Max-Forwards",
  "Origin",
  "Permissions-Policy",
  "Pragma",
  "Proxy-Authenticate",
  "Proxy-Authorization",
  "RTT",
  "Range",
  "Referer",
  "Referrer-Policy",
  "Refresh",
  "Retry-After",
  "Sec-WebSocket-Accept",
  "Sec-WebSocket-Extensions",
  "Sec-WebSocket-Key",
  "Sec-WebSocket-Protocol",
  "Sec-WebSocket-Version",
  "Server",
  "Server-Timing",
  "Service-Worker-Allowed",
  "Service-Worker-Navigation-Preload",
  "Set-Cookie",
  "SourceMap",
  "Strict-Transport-Security",
  "Supports-Loading-Mode",
  "TE",
  "Timing-Allow-Origin",
  "Trailer",
  "Transfer-Encoding",
  "Upgrade",
  "Upgrade-Insecure-Requests",
  "User-Agent",
  "Vary",
  "Via",
  "WWW-Authenticate",
  "X-Content-Type-Options",
  "X-DNS-Prefetch-Control",
  "X-Frame-Options",
  "X-Permitted-Cross-Domain-Policies",
  "X-Powered-By",
  "X-Requested-With",
  "X-XSS-Protection"
];
for (let i = 0; i < wellknownHeaderNames.length; ++i) {
  const key = wellknownHeaderNames[i];
  const lowerCasedKey = key.toLowerCase();
  headerNameLowerCasedRecord$1[key] = headerNameLowerCasedRecord$1[lowerCasedKey] = lowerCasedKey;
}
Object.setPrototypeOf(headerNameLowerCasedRecord$1, null);
var constants$5 = {
  wellknownHeaderNames,
  headerNameLowerCasedRecord: headerNameLowerCasedRecord$1
};
const assert$9 = require$$0$3;
const { kDestroyed: kDestroyed$1, kBodyUsed: kBodyUsed$1 } = symbols$4;
const { IncomingMessage } = require$$2;
const stream$1 = require$$0$4;
const net$2 = require$$0$5;
const { InvalidArgumentError: InvalidArgumentError$l } = errors$1;
const { Blob: Blob$2 } = require$$7;
const nodeUtil = require$$0$2;
const { stringify } = require$$8;
const { headerNameLowerCasedRecord } = constants$5;
const [nodeMajor, nodeMinor] = process.versions.node.split(".").map((v) => Number(v));
function nop$1() {
}
function isStream(obj) {
  return obj && typeof obj === "object" && typeof obj.pipe === "function" && typeof obj.on === "function";
}
function isBlobLike(object) {
  return Blob$2 && object instanceof Blob$2 || object && typeof object === "object" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
}
function buildURL$2(url, queryParams) {
  if (url.includes("?") || url.includes("#")) {
    throw new Error('Query params cannot be passed when url already contains "?" or "#".');
  }
  const stringified = stringify(queryParams);
  if (stringified) {
    url += "?" + stringified;
  }
  return url;
}
function parseURL(url) {
  if (typeof url === "string") {
    url = new URL(url);
    if (!/^https?:/.test(url.origin || url.protocol)) {
      throw new InvalidArgumentError$l("Invalid URL protocol: the URL must start with `http:` or `https:`.");
    }
    return url;
  }
  if (!url || typeof url !== "object") {
    throw new InvalidArgumentError$l("Invalid URL: The URL argument must be a non-null object.");
  }
  if (!/^https?:/.test(url.origin || url.protocol)) {
    throw new InvalidArgumentError$l("Invalid URL protocol: the URL must start with `http:` or `https:`.");
  }
  if (!(url instanceof URL)) {
    if (url.port != null && url.port !== "" && !Number.isFinite(parseInt(url.port))) {
      throw new InvalidArgumentError$l("Invalid URL: port must be a valid integer or a string representation of an integer.");
    }
    if (url.path != null && typeof url.path !== "string") {
      throw new InvalidArgumentError$l("Invalid URL path: the path must be a string or null/undefined.");
    }
    if (url.pathname != null && typeof url.pathname !== "string") {
      throw new InvalidArgumentError$l("Invalid URL pathname: the pathname must be a string or null/undefined.");
    }
    if (url.hostname != null && typeof url.hostname !== "string") {
      throw new InvalidArgumentError$l("Invalid URL hostname: the hostname must be a string or null/undefined.");
    }
    if (url.origin != null && typeof url.origin !== "string") {
      throw new InvalidArgumentError$l("Invalid URL origin: the origin must be a string or null/undefined.");
    }
    const port = url.port != null ? url.port : url.protocol === "https:" ? 443 : 80;
    let origin = url.origin != null ? url.origin : `${url.protocol}//${url.hostname}:${port}`;
    let path2 = url.path != null ? url.path : `${url.pathname || ""}${url.search || ""}`;
    if (origin.endsWith("/")) {
      origin = origin.substring(0, origin.length - 1);
    }
    if (path2 && !path2.startsWith("/")) {
      path2 = `/${path2}`;
    }
    url = new URL(origin + path2);
  }
  return url;
}
function parseOrigin$1(url) {
  url = parseURL(url);
  if (url.pathname !== "/" || url.search || url.hash) {
    throw new InvalidArgumentError$l("invalid url");
  }
  return url;
}
function getHostname(host) {
  if (host[0] === "[") {
    const idx2 = host.indexOf("]");
    assert$9(idx2 !== -1);
    return host.substring(1, idx2);
  }
  const idx = host.indexOf(":");
  if (idx === -1)
    return host;
  return host.substring(0, idx);
}
function getServerName(host) {
  if (!host) {
    return null;
  }
  assert$9.strictEqual(typeof host, "string");
  const servername = getHostname(host);
  if (net$2.isIP(servername)) {
    return "";
  }
  return servername;
}
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function isAsyncIterable(obj) {
  return !!(obj != null && typeof obj[Symbol.asyncIterator] === "function");
}
function isIterable(obj) {
  return !!(obj != null && (typeof obj[Symbol.iterator] === "function" || typeof obj[Symbol.asyncIterator] === "function"));
}
function bodyLength(body2) {
  if (body2 == null) {
    return 0;
  } else if (isStream(body2)) {
    const state = body2._readableState;
    return state && state.objectMode === false && state.ended === true && Number.isFinite(state.length) ? state.length : null;
  } else if (isBlobLike(body2)) {
    return body2.size != null ? body2.size : null;
  } else if (isBuffer(body2)) {
    return body2.byteLength;
  }
  return null;
}
function isDestroyed(stream2) {
  return !stream2 || !!(stream2.destroyed || stream2[kDestroyed$1]);
}
function isReadableAborted(stream2) {
  const state = stream2 && stream2._readableState;
  return isDestroyed(stream2) && state && !state.endEmitted;
}
function destroy(stream2, err) {
  if (stream2 == null || !isStream(stream2) || isDestroyed(stream2)) {
    return;
  }
  if (typeof stream2.destroy === "function") {
    if (Object.getPrototypeOf(stream2).constructor === IncomingMessage) {
      stream2.socket = null;
    }
    stream2.destroy(err);
  } else if (err) {
    process.nextTick((stream3, err2) => {
      stream3.emit("error", err2);
    }, stream2, err);
  }
  if (stream2.destroyed !== true) {
    stream2[kDestroyed$1] = true;
  }
}
const KEEPALIVE_TIMEOUT_EXPR = /timeout=(\d+)/;
function parseKeepAliveTimeout(val) {
  const m = val.toString().match(KEEPALIVE_TIMEOUT_EXPR);
  return m ? parseInt(m[1], 10) * 1e3 : null;
}
function headerNameToString(value) {
  return headerNameLowerCasedRecord[value] || value.toLowerCase();
}
function parseHeaders$1(headers2, obj = {}) {
  if (!Array.isArray(headers2))
    return headers2;
  for (let i = 0; i < headers2.length; i += 2) {
    const key = headers2[i].toString().toLowerCase();
    let val = obj[key];
    if (!val) {
      if (Array.isArray(headers2[i + 1])) {
        obj[key] = headers2[i + 1].map((x) => x.toString("utf8"));
      } else {
        obj[key] = headers2[i + 1].toString("utf8");
      }
    } else {
      if (!Array.isArray(val)) {
        val = [val];
        obj[key] = val;
      }
      val.push(headers2[i + 1].toString("utf8"));
    }
  }
  if ("content-length" in obj && "content-disposition" in obj) {
    obj["content-disposition"] = Buffer.from(obj["content-disposition"]).toString("latin1");
  }
  return obj;
}
function parseRawHeaders(headers2) {
  const ret = [];
  let hasContentLength = false;
  let contentDispositionIdx = -1;
  for (let n = 0; n < headers2.length; n += 2) {
    const key = headers2[n + 0].toString();
    const val = headers2[n + 1].toString("utf8");
    if (key.length === 14 && (key === "content-length" || key.toLowerCase() === "content-length")) {
      ret.push(key, val);
      hasContentLength = true;
    } else if (key.length === 19 && (key === "content-disposition" || key.toLowerCase() === "content-disposition")) {
      contentDispositionIdx = ret.push(key, val) - 1;
    } else {
      ret.push(key, val);
    }
  }
  if (hasContentLength && contentDispositionIdx !== -1) {
    ret[contentDispositionIdx] = Buffer.from(ret[contentDispositionIdx]).toString("latin1");
  }
  return ret;
}
function isBuffer(buffer) {
  return buffer instanceof Uint8Array || Buffer.isBuffer(buffer);
}
function validateHandler(handler, method, upgrade2) {
  if (!handler || typeof handler !== "object") {
    throw new InvalidArgumentError$l("handler must be an object");
  }
  if (typeof handler.onConnect !== "function") {
    throw new InvalidArgumentError$l("invalid onConnect method");
  }
  if (typeof handler.onError !== "function") {
    throw new InvalidArgumentError$l("invalid onError method");
  }
  if (typeof handler.onBodySent !== "function" && handler.onBodySent !== void 0) {
    throw new InvalidArgumentError$l("invalid onBodySent method");
  }
  if (upgrade2 || method === "CONNECT") {
    if (typeof handler.onUpgrade !== "function") {
      throw new InvalidArgumentError$l("invalid onUpgrade method");
    }
  } else {
    if (typeof handler.onHeaders !== "function") {
      throw new InvalidArgumentError$l("invalid onHeaders method");
    }
    if (typeof handler.onData !== "function") {
      throw new InvalidArgumentError$l("invalid onData method");
    }
    if (typeof handler.onComplete !== "function") {
      throw new InvalidArgumentError$l("invalid onComplete method");
    }
  }
}
function isDisturbed$1(body2) {
  return !!(body2 && (stream$1.isDisturbed ? stream$1.isDisturbed(body2) || body2[kBodyUsed$1] : body2[kBodyUsed$1] || body2.readableDidRead || body2._readableState && body2._readableState.dataEmitted || isReadableAborted(body2)));
}
function isErrored(body2) {
  return !!(body2 && (stream$1.isErrored ? stream$1.isErrored(body2) : /state: 'errored'/.test(
    nodeUtil.inspect(body2)
  )));
}
function isReadable(body2) {
  return !!(body2 && (stream$1.isReadable ? stream$1.isReadable(body2) : /state: 'readable'/.test(
    nodeUtil.inspect(body2)
  )));
}
function getSocketInfo(socket) {
  return {
    localAddress: socket.localAddress,
    localPort: socket.localPort,
    remoteAddress: socket.remoteAddress,
    remotePort: socket.remotePort,
    remoteFamily: socket.remoteFamily,
    timeout: socket.timeout,
    bytesWritten: socket.bytesWritten,
    bytesRead: socket.bytesRead
  };
}
async function* convertIterableToBuffer(iterable) {
  for await (const chunk of iterable) {
    yield Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
  }
}
let ReadableStream;
function ReadableStreamFrom$1(iterable) {
  if (!ReadableStream) {
    ReadableStream = require$$14.ReadableStream;
  }
  if (ReadableStream.from) {
    return ReadableStream.from(convertIterableToBuffer(iterable));
  }
  let iterator;
  return new ReadableStream(
    {
      async start() {
        iterator = iterable[Symbol.asyncIterator]();
      },
      async pull(controller) {
        const { done, value } = await iterator.next();
        if (done) {
          queueMicrotask(() => {
            controller.close();
          });
        } else {
          const buf = Buffer.isBuffer(value) ? value : Buffer.from(value);
          controller.enqueue(new Uint8Array(buf));
        }
        return controller.desiredSize > 0;
      },
      async cancel(reason) {
        await iterator.return();
      }
    },
    0
  );
}
function isFormDataLike(object) {
  return object && typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && object[Symbol.toStringTag] === "FormData";
}
function throwIfAborted(signal) {
  if (!signal) {
    return;
  }
  if (typeof signal.throwIfAborted === "function") {
    signal.throwIfAborted();
  } else {
    if (signal.aborted) {
      const err = new Error("The operation was aborted");
      err.name = "AbortError";
      throw err;
    }
  }
}
function addAbortListener$1(signal, listener) {
  if ("addEventListener" in signal) {
    signal.addEventListener("abort", listener, { once: true });
    return () => signal.removeEventListener("abort", listener);
  }
  signal.addListener("abort", listener);
  return () => signal.removeListener("abort", listener);
}
const hasToWellFormed = !!String.prototype.toWellFormed;
function toUSVString$2(val) {
  if (hasToWellFormed) {
    return `${val}`.toWellFormed();
  } else if (nodeUtil.toUSVString) {
    return nodeUtil.toUSVString(val);
  }
  return `${val}`;
}
function parseRangeHeader$1(range) {
  if (range == null || range === "")
    return { start: 0, end: null, size: null };
  const m = range ? range.match(/^bytes (\d+)-(\d+)\/(\d+)?$/) : null;
  return m ? {
    start: parseInt(m[1]),
    end: m[2] ? parseInt(m[2]) : null,
    size: m[3] ? parseInt(m[3]) : null
  } : null;
}
const kEnumerableProperty = /* @__PURE__ */ Object.create(null);
kEnumerableProperty.enumerable = true;
var util$j = {
  kEnumerableProperty,
  nop: nop$1,
  isDisturbed: isDisturbed$1,
  isErrored,
  isReadable,
  toUSVString: toUSVString$2,
  isReadableAborted,
  isBlobLike,
  parseOrigin: parseOrigin$1,
  parseURL,
  getServerName,
  isStream,
  isIterable,
  isAsyncIterable,
  isDestroyed,
  headerNameToString,
  parseRawHeaders,
  parseHeaders: parseHeaders$1,
  parseKeepAliveTimeout,
  destroy,
  bodyLength,
  deepClone,
  ReadableStreamFrom: ReadableStreamFrom$1,
  isBuffer,
  validateHandler,
  getSocketInfo,
  isFormDataLike,
  buildURL: buildURL$2,
  throwIfAborted,
  addAbortListener: addAbortListener$1,
  parseRangeHeader: parseRangeHeader$1,
  nodeMajor,
  nodeMinor,
  nodeHasAutoSelectFamily: nodeMajor > 18 || nodeMajor === 18 && nodeMinor >= 13,
  safeHTTPMethods: ["GET", "HEAD", "OPTIONS", "TRACE"]
};
let fastNow = Date.now();
let fastNowTimeout;
const fastTimers = [];
function onTimeout() {
  fastNow = Date.now();
  let len = fastTimers.length;
  let idx = 0;
  while (idx < len) {
    const timer = fastTimers[idx];
    if (timer.state === 0) {
      timer.state = fastNow + timer.delay;
    } else if (timer.state > 0 && fastNow >= timer.state) {
      timer.state = -1;
      timer.callback(timer.opaque);
    }
    if (timer.state === -1) {
      timer.state = -2;
      if (idx !== len - 1) {
        fastTimers[idx] = fastTimers.pop();
      } else {
        fastTimers.pop();
      }
      len -= 1;
    } else {
      idx += 1;
    }
  }
  if (fastTimers.length > 0) {
    refreshTimeout();
  }
}
function refreshTimeout() {
  if (fastNowTimeout && fastNowTimeout.refresh) {
    fastNowTimeout.refresh();
  } else {
    clearTimeout(fastNowTimeout);
    fastNowTimeout = setTimeout(onTimeout, 1e3);
    if (fastNowTimeout.unref) {
      fastNowTimeout.unref();
    }
  }
}
class Timeout {
  constructor(callback, delay, opaque) {
    this.callback = callback;
    this.delay = delay;
    this.opaque = opaque;
    this.state = -2;
    this.refresh();
  }
  refresh() {
    if (this.state === -2) {
      fastTimers.push(this);
      if (!fastNowTimeout || fastTimers.length === 1) {
        refreshTimeout();
      }
    }
    this.state = 0;
  }
  clear() {
    this.state = -1;
  }
}
var timers$1 = {
  setTimeout(callback, delay, opaque) {
    return delay < 1e3 ? setTimeout(callback, delay, opaque) : new Timeout(callback, delay, opaque);
  },
  clearTimeout(timeout) {
    if (timeout instanceof Timeout) {
      timeout.clear();
    } else {
      clearTimeout(timeout);
    }
  }
};
var main = { exports: {} };
var sbmh;
var hasRequiredSbmh;
function requireSbmh() {
  if (hasRequiredSbmh)
    return sbmh;
  hasRequiredSbmh = 1;
  const EventEmitter2 = require$$0$6.EventEmitter;
  const inherits = require$$1$1.inherits;
  function SBMH(needle) {
    if (typeof needle === "string") {
      needle = Buffer.from(needle);
    }
    if (!Buffer.isBuffer(needle)) {
      throw new TypeError("The needle has to be a String or a Buffer.");
    }
    const needleLength = needle.length;
    if (needleLength === 0) {
      throw new Error("The needle cannot be an empty String/Buffer.");
    }
    if (needleLength > 256) {
      throw new Error("The needle cannot have a length bigger than 256.");
    }
    this.maxMatches = Infinity;
    this.matches = 0;
    this._occ = new Array(256).fill(needleLength);
    this._lookbehind_size = 0;
    this._needle = needle;
    this._bufpos = 0;
    this._lookbehind = Buffer.alloc(needleLength);
    for (var i = 0; i < needleLength - 1; ++i) {
      this._occ[needle[i]] = needleLength - 1 - i;
    }
  }
  inherits(SBMH, EventEmitter2);
  SBMH.prototype.reset = function() {
    this._lookbehind_size = 0;
    this.matches = 0;
    this._bufpos = 0;
  };
  SBMH.prototype.push = function(chunk, pos) {
    if (!Buffer.isBuffer(chunk)) {
      chunk = Buffer.from(chunk, "binary");
    }
    const chlen = chunk.length;
    this._bufpos = pos || 0;
    let r;
    while (r !== chlen && this.matches < this.maxMatches) {
      r = this._sbmh_feed(chunk);
    }
    return r;
  };
  SBMH.prototype._sbmh_feed = function(data) {
    const len = data.length;
    const needle = this._needle;
    const needleLength = needle.length;
    const lastNeedleChar = needle[needleLength - 1];
    let pos = -this._lookbehind_size;
    let ch;
    if (pos < 0) {
      while (pos < 0 && pos <= len - needleLength) {
        ch = this._sbmh_lookup_char(data, pos + needleLength - 1);
        if (ch === lastNeedleChar && this._sbmh_memcmp(data, pos, needleLength - 1)) {
          this._lookbehind_size = 0;
          ++this.matches;
          this.emit("info", true);
          return this._bufpos = pos + needleLength;
        }
        pos += this._occ[ch];
      }
      if (pos < 0) {
        while (pos < 0 && !this._sbmh_memcmp(data, pos, len - pos)) {
          ++pos;
        }
      }
      if (pos >= 0) {
        this.emit("info", false, this._lookbehind, 0, this._lookbehind_size);
        this._lookbehind_size = 0;
      } else {
        const bytesToCutOff = this._lookbehind_size + pos;
        if (bytesToCutOff > 0) {
          this.emit("info", false, this._lookbehind, 0, bytesToCutOff);
        }
        this._lookbehind.copy(
          this._lookbehind,
          0,
          bytesToCutOff,
          this._lookbehind_size - bytesToCutOff
        );
        this._lookbehind_size -= bytesToCutOff;
        data.copy(this._lookbehind, this._lookbehind_size);
        this._lookbehind_size += len;
        this._bufpos = len;
        return len;
      }
    }
    pos += (pos >= 0) * this._bufpos;
    if (data.indexOf(needle, pos) !== -1) {
      pos = data.indexOf(needle, pos);
      ++this.matches;
      if (pos > 0) {
        this.emit("info", true, data, this._bufpos, pos);
      } else {
        this.emit("info", true);
      }
      return this._bufpos = pos + needleLength;
    } else {
      pos = len - needleLength;
    }
    while (pos < len && (data[pos] !== needle[0] || Buffer.compare(
      data.subarray(pos, pos + len - pos),
      needle.subarray(0, len - pos)
    ) !== 0)) {
      ++pos;
    }
    if (pos < len) {
      data.copy(this._lookbehind, 0, pos, pos + (len - pos));
      this._lookbehind_size = len - pos;
    }
    if (pos > 0) {
      this.emit("info", false, data, this._bufpos, pos < len ? pos : len);
    }
    this._bufpos = len;
    return len;
  };
  SBMH.prototype._sbmh_lookup_char = function(data, pos) {
    return pos < 0 ? this._lookbehind[this._lookbehind_size + pos] : data[pos];
  };
  SBMH.prototype._sbmh_memcmp = function(data, pos, len) {
    for (var i = 0; i < len; ++i) {
      if (this._sbmh_lookup_char(data, pos + i) !== this._needle[i]) {
        return false;
      }
    }
    return true;
  };
  sbmh = SBMH;
  return sbmh;
}
var PartStream_1;
var hasRequiredPartStream;
function requirePartStream() {
  if (hasRequiredPartStream)
    return PartStream_1;
  hasRequiredPartStream = 1;
  const inherits = require$$1$1.inherits;
  const ReadableStream2 = require$$0$7.Readable;
  function PartStream(opts) {
    ReadableStream2.call(this, opts);
  }
  inherits(PartStream, ReadableStream2);
  PartStream.prototype._read = function(n) {
  };
  PartStream_1 = PartStream;
  return PartStream_1;
}
var getLimit;
var hasRequiredGetLimit;
function requireGetLimit() {
  if (hasRequiredGetLimit)
    return getLimit;
  hasRequiredGetLimit = 1;
  getLimit = function getLimit2(limits, name, defaultLimit) {
    if (!limits || limits[name] === void 0 || limits[name] === null) {
      return defaultLimit;
    }
    if (typeof limits[name] !== "number" || isNaN(limits[name])) {
      throw new TypeError("Limit " + name + " is not a valid number");
    }
    return limits[name];
  };
  return getLimit;
}
var HeaderParser_1;
var hasRequiredHeaderParser;
function requireHeaderParser() {
  if (hasRequiredHeaderParser)
    return HeaderParser_1;
  hasRequiredHeaderParser = 1;
  const EventEmitter2 = require$$0$6.EventEmitter;
  const inherits = require$$1$1.inherits;
  const getLimit2 = requireGetLimit();
  const StreamSearch = requireSbmh();
  const B_DCRLF = Buffer.from("\r\n\r\n");
  const RE_CRLF = /\r\n/g;
  const RE_HDR = /^([^:]+):[ \t]?([\x00-\xFF]+)?$/;
  function HeaderParser(cfg) {
    EventEmitter2.call(this);
    cfg = cfg || {};
    const self2 = this;
    this.nread = 0;
    this.maxed = false;
    this.npairs = 0;
    this.maxHeaderPairs = getLimit2(cfg, "maxHeaderPairs", 2e3);
    this.maxHeaderSize = getLimit2(cfg, "maxHeaderSize", 80 * 1024);
    this.buffer = "";
    this.header = {};
    this.finished = false;
    this.ss = new StreamSearch(B_DCRLF);
    this.ss.on("info", function(isMatch, data, start, end) {
      if (data && !self2.maxed) {
        if (self2.nread + end - start >= self2.maxHeaderSize) {
          end = self2.maxHeaderSize - self2.nread + start;
          self2.nread = self2.maxHeaderSize;
          self2.maxed = true;
        } else {
          self2.nread += end - start;
        }
        self2.buffer += data.toString("binary", start, end);
      }
      if (isMatch) {
        self2._finish();
      }
    });
  }
  inherits(HeaderParser, EventEmitter2);
  HeaderParser.prototype.push = function(data) {
    const r = this.ss.push(data);
    if (this.finished) {
      return r;
    }
  };
  HeaderParser.prototype.reset = function() {
    this.finished = false;
    this.buffer = "";
    this.header = {};
    this.ss.reset();
  };
  HeaderParser.prototype._finish = function() {
    if (this.buffer) {
      this._parseHeader();
    }
    this.ss.matches = this.ss.maxMatches;
    const header = this.header;
    this.header = {};
    this.buffer = "";
    this.finished = true;
    this.nread = this.npairs = 0;
    this.maxed = false;
    this.emit("header", header);
  };
  HeaderParser.prototype._parseHeader = function() {
    if (this.npairs === this.maxHeaderPairs) {
      return;
    }
    const lines = this.buffer.split(RE_CRLF);
    const len = lines.length;
    let m, h;
    for (var i = 0; i < len; ++i) {
      if (lines[i].length === 0) {
        continue;
      }
      if (lines[i][0] === "	" || lines[i][0] === " ") {
        if (h) {
          this.header[h][this.header[h].length - 1] += lines[i];
          continue;
        }
      }
      const posColon = lines[i].indexOf(":");
      if (posColon === -1 || posColon === 0) {
        return;
      }
      m = RE_HDR.exec(lines[i]);
      h = m[1].toLowerCase();
      this.header[h] = this.header[h] || [];
      this.header[h].push(m[2] || "");
      if (++this.npairs === this.maxHeaderPairs) {
        break;
      }
    }
  };
  HeaderParser_1 = HeaderParser;
  return HeaderParser_1;
}
var Dicer_1;
var hasRequiredDicer;
function requireDicer() {
  if (hasRequiredDicer)
    return Dicer_1;
  hasRequiredDicer = 1;
  const WritableStream = require$$0$7.Writable;
  const inherits = require$$1$1.inherits;
  const StreamSearch = requireSbmh();
  const PartStream = requirePartStream();
  const HeaderParser = requireHeaderParser();
  const DASH = 45;
  const B_ONEDASH = Buffer.from("-");
  const B_CRLF = Buffer.from("\r\n");
  const EMPTY_FN = function() {
  };
  function Dicer(cfg) {
    if (!(this instanceof Dicer)) {
      return new Dicer(cfg);
    }
    WritableStream.call(this, cfg);
    if (!cfg || !cfg.headerFirst && typeof cfg.boundary !== "string") {
      throw new TypeError("Boundary required");
    }
    if (typeof cfg.boundary === "string") {
      this.setBoundary(cfg.boundary);
    } else {
      this._bparser = void 0;
    }
    this._headerFirst = cfg.headerFirst;
    this._dashes = 0;
    this._parts = 0;
    this._finished = false;
    this._realFinish = false;
    this._isPreamble = true;
    this._justMatched = false;
    this._firstWrite = true;
    this._inHeader = true;
    this._part = void 0;
    this._cb = void 0;
    this._ignoreData = false;
    this._partOpts = { highWaterMark: cfg.partHwm };
    this._pause = false;
    const self2 = this;
    this._hparser = new HeaderParser(cfg);
    this._hparser.on("header", function(header) {
      self2._inHeader = false;
      self2._part.emit("header", header);
    });
  }
  inherits(Dicer, WritableStream);
  Dicer.prototype.emit = function(ev) {
    if (ev === "finish" && !this._realFinish) {
      if (!this._finished) {
        const self2 = this;
        process.nextTick(function() {
          self2.emit("error", new Error("Unexpected end of multipart data"));
          if (self2._part && !self2._ignoreData) {
            const type = self2._isPreamble ? "Preamble" : "Part";
            self2._part.emit("error", new Error(type + " terminated early due to unexpected end of multipart data"));
            self2._part.push(null);
            process.nextTick(function() {
              self2._realFinish = true;
              self2.emit("finish");
              self2._realFinish = false;
            });
            return;
          }
          self2._realFinish = true;
          self2.emit("finish");
          self2._realFinish = false;
        });
      }
    } else {
      WritableStream.prototype.emit.apply(this, arguments);
    }
  };
  Dicer.prototype._write = function(data, encoding2, cb) {
    if (!this._hparser && !this._bparser) {
      return cb();
    }
    if (this._headerFirst && this._isPreamble) {
      if (!this._part) {
        this._part = new PartStream(this._partOpts);
        if (this.listenerCount("preamble") !== 0) {
          this.emit("preamble", this._part);
        } else {
          this._ignore();
        }
      }
      const r = this._hparser.push(data);
      if (!this._inHeader && r !== void 0 && r < data.length) {
        data = data.slice(r);
      } else {
        return cb();
      }
    }
    if (this._firstWrite) {
      this._bparser.push(B_CRLF);
      this._firstWrite = false;
    }
    this._bparser.push(data);
    if (this._pause) {
      this._cb = cb;
    } else {
      cb();
    }
  };
  Dicer.prototype.reset = function() {
    this._part = void 0;
    this._bparser = void 0;
    this._hparser = void 0;
  };
  Dicer.prototype.setBoundary = function(boundary) {
    const self2 = this;
    this._bparser = new StreamSearch("\r\n--" + boundary);
    this._bparser.on("info", function(isMatch, data, start, end) {
      self2._oninfo(isMatch, data, start, end);
    });
  };
  Dicer.prototype._ignore = function() {
    if (this._part && !this._ignoreData) {
      this._ignoreData = true;
      this._part.on("error", EMPTY_FN);
      this._part.resume();
    }
  };
  Dicer.prototype._oninfo = function(isMatch, data, start, end) {
    let buf;
    const self2 = this;
    let i = 0;
    let r;
    let shouldWriteMore = true;
    if (!this._part && this._justMatched && data) {
      while (this._dashes < 2 && start + i < end) {
        if (data[start + i] === DASH) {
          ++i;
          ++this._dashes;
        } else {
          if (this._dashes) {
            buf = B_ONEDASH;
          }
          this._dashes = 0;
          break;
        }
      }
      if (this._dashes === 2) {
        if (start + i < end && this.listenerCount("trailer") !== 0) {
          this.emit("trailer", data.slice(start + i, end));
        }
        this.reset();
        this._finished = true;
        if (self2._parts === 0) {
          self2._realFinish = true;
          self2.emit("finish");
          self2._realFinish = false;
        }
      }
      if (this._dashes) {
        return;
      }
    }
    if (this._justMatched) {
      this._justMatched = false;
    }
    if (!this._part) {
      this._part = new PartStream(this._partOpts);
      this._part._read = function(n) {
        self2._unpause();
      };
      if (this._isPreamble && this.listenerCount("preamble") !== 0) {
        this.emit("preamble", this._part);
      } else if (this._isPreamble !== true && this.listenerCount("part") !== 0) {
        this.emit("part", this._part);
      } else {
        this._ignore();
      }
      if (!this._isPreamble) {
        this._inHeader = true;
      }
    }
    if (data && start < end && !this._ignoreData) {
      if (this._isPreamble || !this._inHeader) {
        if (buf) {
          shouldWriteMore = this._part.push(buf);
        }
        shouldWriteMore = this._part.push(data.slice(start, end));
        if (!shouldWriteMore) {
          this._pause = true;
        }
      } else if (!this._isPreamble && this._inHeader) {
        if (buf) {
          this._hparser.push(buf);
        }
        r = this._hparser.push(data.slice(start, end));
        if (!this._inHeader && r !== void 0 && r < end) {
          this._oninfo(false, data, start + r, end);
        }
      }
    }
    if (isMatch) {
      this._hparser.reset();
      if (this._isPreamble) {
        this._isPreamble = false;
      } else {
        if (start !== end) {
          ++this._parts;
          this._part.on("end", function() {
            if (--self2._parts === 0) {
              if (self2._finished) {
                self2._realFinish = true;
                self2.emit("finish");
                self2._realFinish = false;
              } else {
                self2._unpause();
              }
            }
          });
        }
      }
      this._part.push(null);
      this._part = void 0;
      this._ignoreData = false;
      this._justMatched = true;
      this._dashes = 0;
    }
  };
  Dicer.prototype._unpause = function() {
    if (!this._pause) {
      return;
    }
    this._pause = false;
    if (this._cb) {
      const cb = this._cb;
      this._cb = void 0;
      cb();
    }
  };
  Dicer_1 = Dicer;
  return Dicer_1;
}
var decodeText_1;
var hasRequiredDecodeText;
function requireDecodeText() {
  if (hasRequiredDecodeText)
    return decodeText_1;
  hasRequiredDecodeText = 1;
  const utf8Decoder = new TextDecoder("utf-8");
  const textDecoders = /* @__PURE__ */ new Map([
    ["utf-8", utf8Decoder],
    ["utf8", utf8Decoder]
  ]);
  function getDecoder(charset) {
    let lc;
    while (true) {
      switch (charset) {
        case "utf-8":
        case "utf8":
          return decoders.utf8;
        case "latin1":
        case "ascii":
        case "us-ascii":
        case "iso-8859-1":
        case "iso8859-1":
        case "iso88591":
        case "iso_8859-1":
        case "windows-1252":
        case "iso_8859-1:1987":
        case "cp1252":
        case "x-cp1252":
          return decoders.latin1;
        case "utf16le":
        case "utf-16le":
        case "ucs2":
        case "ucs-2":
          return decoders.utf16le;
        case "base64":
          return decoders.base64;
        default:
          if (lc === void 0) {
            lc = true;
            charset = charset.toLowerCase();
            continue;
          }
          return decoders.other.bind(charset);
      }
    }
  }
  const decoders = {
    utf8: (data, sourceEncoding) => {
      if (data.length === 0) {
        return "";
      }
      if (typeof data === "string") {
        data = Buffer.from(data, sourceEncoding);
      }
      return data.utf8Slice(0, data.length);
    },
    latin1: (data, sourceEncoding) => {
      if (data.length === 0) {
        return "";
      }
      if (typeof data === "string") {
        return data;
      }
      return data.latin1Slice(0, data.length);
    },
    utf16le: (data, sourceEncoding) => {
      if (data.length === 0) {
        return "";
      }
      if (typeof data === "string") {
        data = Buffer.from(data, sourceEncoding);
      }
      return data.ucs2Slice(0, data.length);
    },
    base64: (data, sourceEncoding) => {
      if (data.length === 0) {
        return "";
      }
      if (typeof data === "string") {
        data = Buffer.from(data, sourceEncoding);
      }
      return data.base64Slice(0, data.length);
    },
    other: (data, sourceEncoding) => {
      if (data.length === 0) {
        return "";
      }
      if (typeof data === "string") {
        data = Buffer.from(data, sourceEncoding);
      }
      if (textDecoders.has(this.toString())) {
        try {
          return textDecoders.get(this).decode(data);
        } catch {
        }
      }
      return typeof data === "string" ? data : data.toString();
    }
  };
  function decodeText(text, sourceEncoding, destEncoding) {
    if (text) {
      return getDecoder(destEncoding)(text, sourceEncoding);
    }
    return text;
  }
  decodeText_1 = decodeText;
  return decodeText_1;
}
var parseParams_1;
var hasRequiredParseParams;
function requireParseParams() {
  if (hasRequiredParseParams)
    return parseParams_1;
  hasRequiredParseParams = 1;
  const decodeText = requireDecodeText();
  const RE_ENCODED = /%[a-fA-F0-9][a-fA-F0-9]/g;
  const EncodedLookup = {
    "%00": "\0",
    "%01": "",
    "%02": "",
    "%03": "",
    "%04": "",
    "%05": "",
    "%06": "",
    "%07": "\x07",
    "%08": "\b",
    "%09": "	",
    "%0a": "\n",
    "%0A": "\n",
    "%0b": "\v",
    "%0B": "\v",
    "%0c": "\f",
    "%0C": "\f",
    "%0d": "\r",
    "%0D": "\r",
    "%0e": "",
    "%0E": "",
    "%0f": "",
    "%0F": "",
    "%10": "",
    "%11": "",
    "%12": "",
    "%13": "",
    "%14": "",
    "%15": "",
    "%16": "",
    "%17": "",
    "%18": "",
    "%19": "",
    "%1a": "",
    "%1A": "",
    "%1b": "\x1B",
    "%1B": "\x1B",
    "%1c": "",
    "%1C": "",
    "%1d": "",
    "%1D": "",
    "%1e": "",
    "%1E": "",
    "%1f": "",
    "%1F": "",
    "%20": " ",
    "%21": "!",
    "%22": '"',
    "%23": "#",
    "%24": "$",
    "%25": "%",
    "%26": "&",
    "%27": "'",
    "%28": "(",
    "%29": ")",
    "%2a": "*",
    "%2A": "*",
    "%2b": "+",
    "%2B": "+",
    "%2c": ",",
    "%2C": ",",
    "%2d": "-",
    "%2D": "-",
    "%2e": ".",
    "%2E": ".",
    "%2f": "/",
    "%2F": "/",
    "%30": "0",
    "%31": "1",
    "%32": "2",
    "%33": "3",
    "%34": "4",
    "%35": "5",
    "%36": "6",
    "%37": "7",
    "%38": "8",
    "%39": "9",
    "%3a": ":",
    "%3A": ":",
    "%3b": ";",
    "%3B": ";",
    "%3c": "<",
    "%3C": "<",
    "%3d": "=",
    "%3D": "=",
    "%3e": ">",
    "%3E": ">",
    "%3f": "?",
    "%3F": "?",
    "%40": "@",
    "%41": "A",
    "%42": "B",
    "%43": "C",
    "%44": "D",
    "%45": "E",
    "%46": "F",
    "%47": "G",
    "%48": "H",
    "%49": "I",
    "%4a": "J",
    "%4A": "J",
    "%4b": "K",
    "%4B": "K",
    "%4c": "L",
    "%4C": "L",
    "%4d": "M",
    "%4D": "M",
    "%4e": "N",
    "%4E": "N",
    "%4f": "O",
    "%4F": "O",
    "%50": "P",
    "%51": "Q",
    "%52": "R",
    "%53": "S",
    "%54": "T",
    "%55": "U",
    "%56": "V",
    "%57": "W",
    "%58": "X",
    "%59": "Y",
    "%5a": "Z",
    "%5A": "Z",
    "%5b": "[",
    "%5B": "[",
    "%5c": "\\",
    "%5C": "\\",
    "%5d": "]",
    "%5D": "]",
    "%5e": "^",
    "%5E": "^",
    "%5f": "_",
    "%5F": "_",
    "%60": "`",
    "%61": "a",
    "%62": "b",
    "%63": "c",
    "%64": "d",
    "%65": "e",
    "%66": "f",
    "%67": "g",
    "%68": "h",
    "%69": "i",
    "%6a": "j",
    "%6A": "j",
    "%6b": "k",
    "%6B": "k",
    "%6c": "l",
    "%6C": "l",
    "%6d": "m",
    "%6D": "m",
    "%6e": "n",
    "%6E": "n",
    "%6f": "o",
    "%6F": "o",
    "%70": "p",
    "%71": "q",
    "%72": "r",
    "%73": "s",
    "%74": "t",
    "%75": "u",
    "%76": "v",
    "%77": "w",
    "%78": "x",
    "%79": "y",
    "%7a": "z",
    "%7A": "z",
    "%7b": "{",
    "%7B": "{",
    "%7c": "|",
    "%7C": "|",
    "%7d": "}",
    "%7D": "}",
    "%7e": "~",
    "%7E": "~",
    "%7f": "",
    "%7F": "",
    "%80": "",
    "%81": "",
    "%82": "",
    "%83": "",
    "%84": "",
    "%85": "",
    "%86": "",
    "%87": "",
    "%88": "",
    "%89": "",
    "%8a": "",
    "%8A": "",
    "%8b": "",
    "%8B": "",
    "%8c": "",
    "%8C": "",
    "%8d": "",
    "%8D": "",
    "%8e": "",
    "%8E": "",
    "%8f": "",
    "%8F": "",
    "%90": "",
    "%91": "",
    "%92": "",
    "%93": "",
    "%94": "",
    "%95": "",
    "%96": "",
    "%97": "",
    "%98": "",
    "%99": "",
    "%9a": "",
    "%9A": "",
    "%9b": "",
    "%9B": "",
    "%9c": "",
    "%9C": "",
    "%9d": "",
    "%9D": "",
    "%9e": "",
    "%9E": "",
    "%9f": "",
    "%9F": "",
    "%a0": " ",
    "%A0": " ",
    "%a1": "¡",
    "%A1": "¡",
    "%a2": "¢",
    "%A2": "¢",
    "%a3": "£",
    "%A3": "£",
    "%a4": "¤",
    "%A4": "¤",
    "%a5": "¥",
    "%A5": "¥",
    "%a6": "¦",
    "%A6": "¦",
    "%a7": "§",
    "%A7": "§",
    "%a8": "¨",
    "%A8": "¨",
    "%a9": "©",
    "%A9": "©",
    "%aa": "ª",
    "%Aa": "ª",
    "%aA": "ª",
    "%AA": "ª",
    "%ab": "«",
    "%Ab": "«",
    "%aB": "«",
    "%AB": "«",
    "%ac": "¬",
    "%Ac": "¬",
    "%aC": "¬",
    "%AC": "¬",
    "%ad": "­",
    "%Ad": "­",
    "%aD": "­",
    "%AD": "­",
    "%ae": "®",
    "%Ae": "®",
    "%aE": "®",
    "%AE": "®",
    "%af": "¯",
    "%Af": "¯",
    "%aF": "¯",
    "%AF": "¯",
    "%b0": "°",
    "%B0": "°",
    "%b1": "±",
    "%B1": "±",
    "%b2": "²",
    "%B2": "²",
    "%b3": "³",
    "%B3": "³",
    "%b4": "´",
    "%B4": "´",
    "%b5": "µ",
    "%B5": "µ",
    "%b6": "¶",
    "%B6": "¶",
    "%b7": "·",
    "%B7": "·",
    "%b8": "¸",
    "%B8": "¸",
    "%b9": "¹",
    "%B9": "¹",
    "%ba": "º",
    "%Ba": "º",
    "%bA": "º",
    "%BA": "º",
    "%bb": "»",
    "%Bb": "»",
    "%bB": "»",
    "%BB": "»",
    "%bc": "¼",
    "%Bc": "¼",
    "%bC": "¼",
    "%BC": "¼",
    "%bd": "½",
    "%Bd": "½",
    "%bD": "½",
    "%BD": "½",
    "%be": "¾",
    "%Be": "¾",
    "%bE": "¾",
    "%BE": "¾",
    "%bf": "¿",
    "%Bf": "¿",
    "%bF": "¿",
    "%BF": "¿",
    "%c0": "À",
    "%C0": "À",
    "%c1": "Á",
    "%C1": "Á",
    "%c2": "Â",
    "%C2": "Â",
    "%c3": "Ã",
    "%C3": "Ã",
    "%c4": "Ä",
    "%C4": "Ä",
    "%c5": "Å",
    "%C5": "Å",
    "%c6": "Æ",
    "%C6": "Æ",
    "%c7": "Ç",
    "%C7": "Ç",
    "%c8": "È",
    "%C8": "È",
    "%c9": "É",
    "%C9": "É",
    "%ca": "Ê",
    "%Ca": "Ê",
    "%cA": "Ê",
    "%CA": "Ê",
    "%cb": "Ë",
    "%Cb": "Ë",
    "%cB": "Ë",
    "%CB": "Ë",
    "%cc": "Ì",
    "%Cc": "Ì",
    "%cC": "Ì",
    "%CC": "Ì",
    "%cd": "Í",
    "%Cd": "Í",
    "%cD": "Í",
    "%CD": "Í",
    "%ce": "Î",
    "%Ce": "Î",
    "%cE": "Î",
    "%CE": "Î",
    "%cf": "Ï",
    "%Cf": "Ï",
    "%cF": "Ï",
    "%CF": "Ï",
    "%d0": "Ð",
    "%D0": "Ð",
    "%d1": "Ñ",
    "%D1": "Ñ",
    "%d2": "Ò",
    "%D2": "Ò",
    "%d3": "Ó",
    "%D3": "Ó",
    "%d4": "Ô",
    "%D4": "Ô",
    "%d5": "Õ",
    "%D5": "Õ",
    "%d6": "Ö",
    "%D6": "Ö",
    "%d7": "×",
    "%D7": "×",
    "%d8": "Ø",
    "%D8": "Ø",
    "%d9": "Ù",
    "%D9": "Ù",
    "%da": "Ú",
    "%Da": "Ú",
    "%dA": "Ú",
    "%DA": "Ú",
    "%db": "Û",
    "%Db": "Û",
    "%dB": "Û",
    "%DB": "Û",
    "%dc": "Ü",
    "%Dc": "Ü",
    "%dC": "Ü",
    "%DC": "Ü",
    "%dd": "Ý",
    "%Dd": "Ý",
    "%dD": "Ý",
    "%DD": "Ý",
    "%de": "Þ",
    "%De": "Þ",
    "%dE": "Þ",
    "%DE": "Þ",
    "%df": "ß",
    "%Df": "ß",
    "%dF": "ß",
    "%DF": "ß",
    "%e0": "à",
    "%E0": "à",
    "%e1": "á",
    "%E1": "á",
    "%e2": "â",
    "%E2": "â",
    "%e3": "ã",
    "%E3": "ã",
    "%e4": "ä",
    "%E4": "ä",
    "%e5": "å",
    "%E5": "å",
    "%e6": "æ",
    "%E6": "æ",
    "%e7": "ç",
    "%E7": "ç",
    "%e8": "è",
    "%E8": "è",
    "%e9": "é",
    "%E9": "é",
    "%ea": "ê",
    "%Ea": "ê",
    "%eA": "ê",
    "%EA": "ê",
    "%eb": "ë",
    "%Eb": "ë",
    "%eB": "ë",
    "%EB": "ë",
    "%ec": "ì",
    "%Ec": "ì",
    "%eC": "ì",
    "%EC": "ì",
    "%ed": "í",
    "%Ed": "í",
    "%eD": "í",
    "%ED": "í",
    "%ee": "î",
    "%Ee": "î",
    "%eE": "î",
    "%EE": "î",
    "%ef": "ï",
    "%Ef": "ï",
    "%eF": "ï",
    "%EF": "ï",
    "%f0": "ð",
    "%F0": "ð",
    "%f1": "ñ",
    "%F1": "ñ",
    "%f2": "ò",
    "%F2": "ò",
    "%f3": "ó",
    "%F3": "ó",
    "%f4": "ô",
    "%F4": "ô",
    "%f5": "õ",
    "%F5": "õ",
    "%f6": "ö",
    "%F6": "ö",
    "%f7": "÷",
    "%F7": "÷",
    "%f8": "ø",
    "%F8": "ø",
    "%f9": "ù",
    "%F9": "ù",
    "%fa": "ú",
    "%Fa": "ú",
    "%fA": "ú",
    "%FA": "ú",
    "%fb": "û",
    "%Fb": "û",
    "%fB": "û",
    "%FB": "û",
    "%fc": "ü",
    "%Fc": "ü",
    "%fC": "ü",
    "%FC": "ü",
    "%fd": "ý",
    "%Fd": "ý",
    "%fD": "ý",
    "%FD": "ý",
    "%fe": "þ",
    "%Fe": "þ",
    "%fE": "þ",
    "%FE": "þ",
    "%ff": "ÿ",
    "%Ff": "ÿ",
    "%fF": "ÿ",
    "%FF": "ÿ"
  };
  function encodedReplacer(match) {
    return EncodedLookup[match];
  }
  const STATE_KEY = 0;
  const STATE_VALUE = 1;
  const STATE_CHARSET = 2;
  const STATE_LANG = 3;
  function parseParams(str) {
    const res = [];
    let state = STATE_KEY;
    let charset = "";
    let inquote = false;
    let escaping = false;
    let p = 0;
    let tmp = "";
    const len = str.length;
    for (var i = 0; i < len; ++i) {
      const char = str[i];
      if (char === "\\" && inquote) {
        if (escaping) {
          escaping = false;
        } else {
          escaping = true;
          continue;
        }
      } else if (char === '"') {
        if (!escaping) {
          if (inquote) {
            inquote = false;
            state = STATE_KEY;
          } else {
            inquote = true;
          }
          continue;
        } else {
          escaping = false;
        }
      } else {
        if (escaping && inquote) {
          tmp += "\\";
        }
        escaping = false;
        if ((state === STATE_CHARSET || state === STATE_LANG) && char === "'") {
          if (state === STATE_CHARSET) {
            state = STATE_LANG;
            charset = tmp.substring(1);
          } else {
            state = STATE_VALUE;
          }
          tmp = "";
          continue;
        } else if (state === STATE_KEY && (char === "*" || char === "=") && res.length) {
          state = char === "*" ? STATE_CHARSET : STATE_VALUE;
          res[p] = [tmp, void 0];
          tmp = "";
          continue;
        } else if (!inquote && char === ";") {
          state = STATE_KEY;
          if (charset) {
            if (tmp.length) {
              tmp = decodeText(
                tmp.replace(RE_ENCODED, encodedReplacer),
                "binary",
                charset
              );
            }
            charset = "";
          } else if (tmp.length) {
            tmp = decodeText(tmp, "binary", "utf8");
          }
          if (res[p] === void 0) {
            res[p] = tmp;
          } else {
            res[p][1] = tmp;
          }
          tmp = "";
          ++p;
          continue;
        } else if (!inquote && (char === " " || char === "	")) {
          continue;
        }
      }
      tmp += char;
    }
    if (charset && tmp.length) {
      tmp = decodeText(
        tmp.replace(RE_ENCODED, encodedReplacer),
        "binary",
        charset
      );
    } else if (tmp) {
      tmp = decodeText(tmp, "binary", "utf8");
    }
    if (res[p] === void 0) {
      if (tmp) {
        res[p] = tmp;
      }
    } else {
      res[p][1] = tmp;
    }
    return res;
  }
  parseParams_1 = parseParams;
  return parseParams_1;
}
var basename;
var hasRequiredBasename;
function requireBasename() {
  if (hasRequiredBasename)
    return basename;
  hasRequiredBasename = 1;
  basename = function basename2(path2) {
    if (typeof path2 !== "string") {
      return "";
    }
    for (var i = path2.length - 1; i >= 0; --i) {
      switch (path2.charCodeAt(i)) {
        case 47:
        case 92:
          path2 = path2.slice(i + 1);
          return path2 === ".." || path2 === "." ? "" : path2;
      }
    }
    return path2 === ".." || path2 === "." ? "" : path2;
  };
  return basename;
}
var multipart;
var hasRequiredMultipart;
function requireMultipart() {
  if (hasRequiredMultipart)
    return multipart;
  hasRequiredMultipart = 1;
  const { Readable: Readable2 } = require$$0$7;
  const { inherits } = require$$1$1;
  const Dicer = requireDicer();
  const parseParams = requireParseParams();
  const decodeText = requireDecodeText();
  const basename2 = requireBasename();
  const getLimit2 = requireGetLimit();
  const RE_BOUNDARY = /^boundary$/i;
  const RE_FIELD = /^form-data$/i;
  const RE_CHARSET = /^charset$/i;
  const RE_FILENAME = /^filename$/i;
  const RE_NAME = /^name$/i;
  Multipart.detect = /^multipart\/form-data/i;
  function Multipart(boy, cfg) {
    let i;
    let len;
    const self2 = this;
    let boundary;
    const limits = cfg.limits;
    const isPartAFile = cfg.isPartAFile || ((fieldName, contentType, fileName) => contentType === "application/octet-stream" || fileName !== void 0);
    const parsedConType = cfg.parsedConType || [];
    const defCharset = cfg.defCharset || "utf8";
    const preservePath = cfg.preservePath;
    const fileOpts = { highWaterMark: cfg.fileHwm };
    for (i = 0, len = parsedConType.length; i < len; ++i) {
      if (Array.isArray(parsedConType[i]) && RE_BOUNDARY.test(parsedConType[i][0])) {
        boundary = parsedConType[i][1];
        break;
      }
    }
    function checkFinished() {
      if (nends === 0 && finished2 && !boy._done) {
        finished2 = false;
        self2.end();
      }
    }
    if (typeof boundary !== "string") {
      throw new Error("Multipart: Boundary not found");
    }
    const fieldSizeLimit = getLimit2(limits, "fieldSize", 1 * 1024 * 1024);
    const fileSizeLimit = getLimit2(limits, "fileSize", Infinity);
    const filesLimit = getLimit2(limits, "files", Infinity);
    const fieldsLimit = getLimit2(limits, "fields", Infinity);
    const partsLimit = getLimit2(limits, "parts", Infinity);
    const headerPairsLimit = getLimit2(limits, "headerPairs", 2e3);
    const headerSizeLimit = getLimit2(limits, "headerSize", 80 * 1024);
    let nfiles = 0;
    let nfields = 0;
    let nends = 0;
    let curFile;
    let curField;
    let finished2 = false;
    this._needDrain = false;
    this._pause = false;
    this._cb = void 0;
    this._nparts = 0;
    this._boy = boy;
    const parserCfg = {
      boundary,
      maxHeaderPairs: headerPairsLimit,
      maxHeaderSize: headerSizeLimit,
      partHwm: fileOpts.highWaterMark,
      highWaterMark: cfg.highWaterMark
    };
    this.parser = new Dicer(parserCfg);
    this.parser.on("drain", function() {
      self2._needDrain = false;
      if (self2._cb && !self2._pause) {
        const cb = self2._cb;
        self2._cb = void 0;
        cb();
      }
    }).on("part", function onPart(part) {
      if (++self2._nparts > partsLimit) {
        self2.parser.removeListener("part", onPart);
        self2.parser.on("part", skipPart);
        boy.hitPartsLimit = true;
        boy.emit("partsLimit");
        return skipPart(part);
      }
      if (curField) {
        const field = curField;
        field.emit("end");
        field.removeAllListeners("end");
      }
      part.on("header", function(header) {
        let contype;
        let fieldname;
        let parsed;
        let charset;
        let encoding2;
        let filename;
        let nsize = 0;
        if (header["content-type"]) {
          parsed = parseParams(header["content-type"][0]);
          if (parsed[0]) {
            contype = parsed[0].toLowerCase();
            for (i = 0, len = parsed.length; i < len; ++i) {
              if (RE_CHARSET.test(parsed[i][0])) {
                charset = parsed[i][1].toLowerCase();
                break;
              }
            }
          }
        }
        if (contype === void 0) {
          contype = "text/plain";
        }
        if (charset === void 0) {
          charset = defCharset;
        }
        if (header["content-disposition"]) {
          parsed = parseParams(header["content-disposition"][0]);
          if (!RE_FIELD.test(parsed[0])) {
            return skipPart(part);
          }
          for (i = 0, len = parsed.length; i < len; ++i) {
            if (RE_NAME.test(parsed[i][0])) {
              fieldname = parsed[i][1];
            } else if (RE_FILENAME.test(parsed[i][0])) {
              filename = parsed[i][1];
              if (!preservePath) {
                filename = basename2(filename);
              }
            }
          }
        } else {
          return skipPart(part);
        }
        if (header["content-transfer-encoding"]) {
          encoding2 = header["content-transfer-encoding"][0].toLowerCase();
        } else {
          encoding2 = "7bit";
        }
        let onData, onEnd;
        if (isPartAFile(fieldname, contype, filename)) {
          if (nfiles === filesLimit) {
            if (!boy.hitFilesLimit) {
              boy.hitFilesLimit = true;
              boy.emit("filesLimit");
            }
            return skipPart(part);
          }
          ++nfiles;
          if (boy.listenerCount("file") === 0) {
            self2.parser._ignore();
            return;
          }
          ++nends;
          const file2 = new FileStream(fileOpts);
          curFile = file2;
          file2.on("end", function() {
            --nends;
            self2._pause = false;
            checkFinished();
            if (self2._cb && !self2._needDrain) {
              const cb = self2._cb;
              self2._cb = void 0;
              cb();
            }
          });
          file2._read = function(n) {
            if (!self2._pause) {
              return;
            }
            self2._pause = false;
            if (self2._cb && !self2._needDrain) {
              const cb = self2._cb;
              self2._cb = void 0;
              cb();
            }
          };
          boy.emit("file", fieldname, file2, filename, encoding2, contype);
          onData = function(data) {
            if ((nsize += data.length) > fileSizeLimit) {
              const extralen = fileSizeLimit - nsize + data.length;
              if (extralen > 0) {
                file2.push(data.slice(0, extralen));
              }
              file2.truncated = true;
              file2.bytesRead = fileSizeLimit;
              part.removeAllListeners("data");
              file2.emit("limit");
              return;
            } else if (!file2.push(data)) {
              self2._pause = true;
            }
            file2.bytesRead = nsize;
          };
          onEnd = function() {
            curFile = void 0;
            file2.push(null);
          };
        } else {
          if (nfields === fieldsLimit) {
            if (!boy.hitFieldsLimit) {
              boy.hitFieldsLimit = true;
              boy.emit("fieldsLimit");
            }
            return skipPart(part);
          }
          ++nfields;
          ++nends;
          let buffer = "";
          let truncated = false;
          curField = part;
          onData = function(data) {
            if ((nsize += data.length) > fieldSizeLimit) {
              const extralen = fieldSizeLimit - (nsize - data.length);
              buffer += data.toString("binary", 0, extralen);
              truncated = true;
              part.removeAllListeners("data");
            } else {
              buffer += data.toString("binary");
            }
          };
          onEnd = function() {
            curField = void 0;
            if (buffer.length) {
              buffer = decodeText(buffer, "binary", charset);
            }
            boy.emit("field", fieldname, buffer, false, truncated, encoding2, contype);
            --nends;
            checkFinished();
          };
        }
        part._readableState.sync = false;
        part.on("data", onData);
        part.on("end", onEnd);
      }).on("error", function(err) {
        if (curFile) {
          curFile.emit("error", err);
        }
      });
    }).on("error", function(err) {
      boy.emit("error", err);
    }).on("finish", function() {
      finished2 = true;
      checkFinished();
    });
  }
  Multipart.prototype.write = function(chunk, cb) {
    const r = this.parser.write(chunk);
    if (r && !this._pause) {
      cb();
    } else {
      this._needDrain = !r;
      this._cb = cb;
    }
  };
  Multipart.prototype.end = function() {
    const self2 = this;
    if (self2.parser.writable) {
      self2.parser.end();
    } else if (!self2._boy._done) {
      process.nextTick(function() {
        self2._boy._done = true;
        self2._boy.emit("finish");
      });
    }
  };
  function skipPart(part) {
    part.resume();
  }
  function FileStream(opts) {
    Readable2.call(this, opts);
    this.bytesRead = 0;
    this.truncated = false;
  }
  inherits(FileStream, Readable2);
  FileStream.prototype._read = function(n) {
  };
  multipart = Multipart;
  return multipart;
}
var Decoder_1;
var hasRequiredDecoder;
function requireDecoder() {
  if (hasRequiredDecoder)
    return Decoder_1;
  hasRequiredDecoder = 1;
  const RE_PLUS = /\+/g;
  const HEX = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ];
  function Decoder() {
    this.buffer = void 0;
  }
  Decoder.prototype.write = function(str) {
    str = str.replace(RE_PLUS, " ");
    let res = "";
    let i = 0;
    let p = 0;
    const len = str.length;
    for (; i < len; ++i) {
      if (this.buffer !== void 0) {
        if (!HEX[str.charCodeAt(i)]) {
          res += "%" + this.buffer;
          this.buffer = void 0;
          --i;
        } else {
          this.buffer += str[i];
          ++p;
          if (this.buffer.length === 2) {
            res += String.fromCharCode(parseInt(this.buffer, 16));
            this.buffer = void 0;
          }
        }
      } else if (str[i] === "%") {
        if (i > p) {
          res += str.substring(p, i);
          p = i;
        }
        this.buffer = "";
        ++p;
      }
    }
    if (p < len && this.buffer === void 0) {
      res += str.substring(p);
    }
    return res;
  };
  Decoder.prototype.reset = function() {
    this.buffer = void 0;
  };
  Decoder_1 = Decoder;
  return Decoder_1;
}
var urlencoded;
var hasRequiredUrlencoded;
function requireUrlencoded() {
  if (hasRequiredUrlencoded)
    return urlencoded;
  hasRequiredUrlencoded = 1;
  const Decoder = requireDecoder();
  const decodeText = requireDecodeText();
  const getLimit2 = requireGetLimit();
  const RE_CHARSET = /^charset$/i;
  UrlEncoded.detect = /^application\/x-www-form-urlencoded/i;
  function UrlEncoded(boy, cfg) {
    const limits = cfg.limits;
    const parsedConType = cfg.parsedConType;
    this.boy = boy;
    this.fieldSizeLimit = getLimit2(limits, "fieldSize", 1 * 1024 * 1024);
    this.fieldNameSizeLimit = getLimit2(limits, "fieldNameSize", 100);
    this.fieldsLimit = getLimit2(limits, "fields", Infinity);
    let charset;
    for (var i = 0, len = parsedConType.length; i < len; ++i) {
      if (Array.isArray(parsedConType[i]) && RE_CHARSET.test(parsedConType[i][0])) {
        charset = parsedConType[i][1].toLowerCase();
        break;
      }
    }
    if (charset === void 0) {
      charset = cfg.defCharset || "utf8";
    }
    this.decoder = new Decoder();
    this.charset = charset;
    this._fields = 0;
    this._state = "key";
    this._checkingBytes = true;
    this._bytesKey = 0;
    this._bytesVal = 0;
    this._key = "";
    this._val = "";
    this._keyTrunc = false;
    this._valTrunc = false;
    this._hitLimit = false;
  }
  UrlEncoded.prototype.write = function(data, cb) {
    if (this._fields === this.fieldsLimit) {
      if (!this.boy.hitFieldsLimit) {
        this.boy.hitFieldsLimit = true;
        this.boy.emit("fieldsLimit");
      }
      return cb();
    }
    let idxeq;
    let idxamp;
    let i;
    let p = 0;
    const len = data.length;
    while (p < len) {
      if (this._state === "key") {
        idxeq = idxamp = void 0;
        for (i = p; i < len; ++i) {
          if (!this._checkingBytes) {
            ++p;
          }
          if (data[i] === 61) {
            idxeq = i;
            break;
          } else if (data[i] === 38) {
            idxamp = i;
            break;
          }
          if (this._checkingBytes && this._bytesKey === this.fieldNameSizeLimit) {
            this._hitLimit = true;
            break;
          } else if (this._checkingBytes) {
            ++this._bytesKey;
          }
        }
        if (idxeq !== void 0) {
          if (idxeq > p) {
            this._key += this.decoder.write(data.toString("binary", p, idxeq));
          }
          this._state = "val";
          this._hitLimit = false;
          this._checkingBytes = true;
          this._val = "";
          this._bytesVal = 0;
          this._valTrunc = false;
          this.decoder.reset();
          p = idxeq + 1;
        } else if (idxamp !== void 0) {
          ++this._fields;
          let key;
          const keyTrunc = this._keyTrunc;
          if (idxamp > p) {
            key = this._key += this.decoder.write(data.toString("binary", p, idxamp));
          } else {
            key = this._key;
          }
          this._hitLimit = false;
          this._checkingBytes = true;
          this._key = "";
          this._bytesKey = 0;
          this._keyTrunc = false;
          this.decoder.reset();
          if (key.length) {
            this.boy.emit(
              "field",
              decodeText(key, "binary", this.charset),
              "",
              keyTrunc,
              false
            );
          }
          p = idxamp + 1;
          if (this._fields === this.fieldsLimit) {
            return cb();
          }
        } else if (this._hitLimit) {
          if (i > p) {
            this._key += this.decoder.write(data.toString("binary", p, i));
          }
          p = i;
          if ((this._bytesKey = this._key.length) === this.fieldNameSizeLimit) {
            this._checkingBytes = false;
            this._keyTrunc = true;
          }
        } else {
          if (p < len) {
            this._key += this.decoder.write(data.toString("binary", p));
          }
          p = len;
        }
      } else {
        idxamp = void 0;
        for (i = p; i < len; ++i) {
          if (!this._checkingBytes) {
            ++p;
          }
          if (data[i] === 38) {
            idxamp = i;
            break;
          }
          if (this._checkingBytes && this._bytesVal === this.fieldSizeLimit) {
            this._hitLimit = true;
            break;
          } else if (this._checkingBytes) {
            ++this._bytesVal;
          }
        }
        if (idxamp !== void 0) {
          ++this._fields;
          if (idxamp > p) {
            this._val += this.decoder.write(data.toString("binary", p, idxamp));
          }
          this.boy.emit(
            "field",
            decodeText(this._key, "binary", this.charset),
            decodeText(this._val, "binary", this.charset),
            this._keyTrunc,
            this._valTrunc
          );
          this._state = "key";
          this._hitLimit = false;
          this._checkingBytes = true;
          this._key = "";
          this._bytesKey = 0;
          this._keyTrunc = false;
          this.decoder.reset();
          p = idxamp + 1;
          if (this._fields === this.fieldsLimit) {
            return cb();
          }
        } else if (this._hitLimit) {
          if (i > p) {
            this._val += this.decoder.write(data.toString("binary", p, i));
          }
          p = i;
          if (this._val === "" && this.fieldSizeLimit === 0 || (this._bytesVal = this._val.length) === this.fieldSizeLimit) {
            this._checkingBytes = false;
            this._valTrunc = true;
          }
        } else {
          if (p < len) {
            this._val += this.decoder.write(data.toString("binary", p));
          }
          p = len;
        }
      }
    }
    cb();
  };
  UrlEncoded.prototype.end = function() {
    if (this.boy._done) {
      return;
    }
    if (this._state === "key" && this._key.length > 0) {
      this.boy.emit(
        "field",
        decodeText(this._key, "binary", this.charset),
        "",
        this._keyTrunc,
        false
      );
    } else if (this._state === "val") {
      this.boy.emit(
        "field",
        decodeText(this._key, "binary", this.charset),
        decodeText(this._val, "binary", this.charset),
        this._keyTrunc,
        this._valTrunc
      );
    }
    this.boy._done = true;
    this.boy.emit("finish");
  };
  urlencoded = UrlEncoded;
  return urlencoded;
}
var hasRequiredMain;
function requireMain() {
  if (hasRequiredMain)
    return main.exports;
  hasRequiredMain = 1;
  const WritableStream = require$$0$7.Writable;
  const { inherits } = require$$1$1;
  const Dicer = requireDicer();
  const MultipartParser = requireMultipart();
  const UrlencodedParser = requireUrlencoded();
  const parseParams = requireParseParams();
  function Busboy(opts) {
    if (!(this instanceof Busboy)) {
      return new Busboy(opts);
    }
    if (typeof opts !== "object") {
      throw new TypeError("Busboy expected an options-Object.");
    }
    if (typeof opts.headers !== "object") {
      throw new TypeError("Busboy expected an options-Object with headers-attribute.");
    }
    if (typeof opts.headers["content-type"] !== "string") {
      throw new TypeError("Missing Content-Type-header.");
    }
    const {
      headers: headers2,
      ...streamOptions
    } = opts;
    this.opts = {
      autoDestroy: false,
      ...streamOptions
    };
    WritableStream.call(this, this.opts);
    this._done = false;
    this._parser = this.getParserByHeaders(headers2);
    this._finished = false;
  }
  inherits(Busboy, WritableStream);
  Busboy.prototype.emit = function(ev) {
    var _a;
    if (ev === "finish") {
      if (!this._done) {
        (_a = this._parser) == null ? void 0 : _a.end();
        return;
      } else if (this._finished) {
        return;
      }
      this._finished = true;
    }
    WritableStream.prototype.emit.apply(this, arguments);
  };
  Busboy.prototype.getParserByHeaders = function(headers2) {
    const parsed = parseParams(headers2["content-type"]);
    const cfg = {
      defCharset: this.opts.defCharset,
      fileHwm: this.opts.fileHwm,
      headers: headers2,
      highWaterMark: this.opts.highWaterMark,
      isPartAFile: this.opts.isPartAFile,
      limits: this.opts.limits,
      parsedConType: parsed,
      preservePath: this.opts.preservePath
    };
    if (MultipartParser.detect.test(parsed[0])) {
      return new MultipartParser(this, cfg);
    }
    if (UrlencodedParser.detect.test(parsed[0])) {
      return new UrlencodedParser(this, cfg);
    }
    throw new Error("Unsupported Content-Type.");
  };
  Busboy.prototype._write = function(chunk, encoding2, cb) {
    this._parser.write(chunk, cb);
  };
  main.exports = Busboy;
  main.exports.default = Busboy;
  main.exports.Busboy = Busboy;
  main.exports.Dicer = Dicer;
  return main.exports;
}
var constants$4;
var hasRequiredConstants$3;
function requireConstants$3() {
  if (hasRequiredConstants$3)
    return constants$4;
  hasRequiredConstants$3 = 1;
  const { MessageChannel, receiveMessageOnPort } = require$$0$8;
  const corsSafeListedMethods = ["GET", "HEAD", "POST"];
  const corsSafeListedMethodsSet = new Set(corsSafeListedMethods);
  const nullBodyStatus = [101, 204, 205, 304];
  const redirectStatus = [301, 302, 303, 307, 308];
  const redirectStatusSet = new Set(redirectStatus);
  const badPorts = [
    "1",
    "7",
    "9",
    "11",
    "13",
    "15",
    "17",
    "19",
    "20",
    "21",
    "22",
    "23",
    "25",
    "37",
    "42",
    "43",
    "53",
    "69",
    "77",
    "79",
    "87",
    "95",
    "101",
    "102",
    "103",
    "104",
    "109",
    "110",
    "111",
    "113",
    "115",
    "117",
    "119",
    "123",
    "135",
    "137",
    "139",
    "143",
    "161",
    "179",
    "389",
    "427",
    "465",
    "512",
    "513",
    "514",
    "515",
    "526",
    "530",
    "531",
    "532",
    "540",
    "548",
    "554",
    "556",
    "563",
    "587",
    "601",
    "636",
    "989",
    "990",
    "993",
    "995",
    "1719",
    "1720",
    "1723",
    "2049",
    "3659",
    "4045",
    "5060",
    "5061",
    "6000",
    "6566",
    "6665",
    "6666",
    "6667",
    "6668",
    "6669",
    "6697",
    "10080"
  ];
  const badPortsSet = new Set(badPorts);
  const referrerPolicy = [
    "",
    "no-referrer",
    "no-referrer-when-downgrade",
    "same-origin",
    "origin",
    "strict-origin",
    "origin-when-cross-origin",
    "strict-origin-when-cross-origin",
    "unsafe-url"
  ];
  const referrerPolicySet = new Set(referrerPolicy);
  const requestRedirect = ["follow", "manual", "error"];
  const safeMethods = ["GET", "HEAD", "OPTIONS", "TRACE"];
  const safeMethodsSet = new Set(safeMethods);
  const requestMode = ["navigate", "same-origin", "no-cors", "cors"];
  const requestCredentials = ["omit", "same-origin", "include"];
  const requestCache = [
    "default",
    "no-store",
    "reload",
    "no-cache",
    "force-cache",
    "only-if-cached"
  ];
  const requestBodyHeader = [
    "content-encoding",
    "content-language",
    "content-location",
    "content-type",
    // See https://github.com/nodejs/undici/issues/2021
    // 'Content-Length' is a forbidden header name, which is typically
    // removed in the Headers implementation. However, undici doesn't
    // filter out headers, so we add it here.
    "content-length"
  ];
  const requestDuplex = [
    "half"
  ];
  const forbiddenMethods = ["CONNECT", "TRACE", "TRACK"];
  const forbiddenMethodsSet = new Set(forbiddenMethods);
  const subresource = [
    "audio",
    "audioworklet",
    "font",
    "image",
    "manifest",
    "paintworklet",
    "script",
    "style",
    "track",
    "video",
    "xslt",
    ""
  ];
  const subresourceSet = new Set(subresource);
  const DOMException2 = globalThis.DOMException ?? (() => {
    try {
      atob("~");
    } catch (err) {
      return Object.getPrototypeOf(err).constructor;
    }
  })();
  let channel;
  const structuredClone = globalThis.structuredClone ?? // https://github.com/nodejs/node/blob/b27ae24dcc4251bad726d9d84baf678d1f707fed/lib/internal/structured_clone.js
  // structuredClone was added in v17.0.0, but fetch supports v16.8
  function structuredClone2(value, options = void 0) {
    if (arguments.length === 0) {
      throw new TypeError("missing argument");
    }
    if (!channel) {
      channel = new MessageChannel();
    }
    channel.port1.unref();
    channel.port2.unref();
    channel.port1.postMessage(value, options == null ? void 0 : options.transfer);
    return receiveMessageOnPort(channel.port2).message;
  };
  constants$4 = {
    DOMException: DOMException2,
    structuredClone,
    subresource,
    forbiddenMethods,
    requestBodyHeader,
    referrerPolicy,
    requestRedirect,
    requestMode,
    requestCredentials,
    requestCache,
    redirectStatus,
    corsSafeListedMethods,
    nullBodyStatus,
    safeMethods,
    badPorts,
    requestDuplex,
    subresourceSet,
    badPortsSet,
    redirectStatusSet,
    corsSafeListedMethodsSet,
    safeMethodsSet,
    forbiddenMethodsSet,
    referrerPolicySet
  };
  return constants$4;
}
var global$2;
var hasRequiredGlobal;
function requireGlobal() {
  if (hasRequiredGlobal)
    return global$2;
  hasRequiredGlobal = 1;
  const globalOrigin = Symbol.for("undici.globalOrigin.1");
  function getGlobalOrigin() {
    return globalThis[globalOrigin];
  }
  function setGlobalOrigin(newOrigin) {
    if (newOrigin === void 0) {
      Object.defineProperty(globalThis, globalOrigin, {
        value: void 0,
        writable: true,
        enumerable: false,
        configurable: false
      });
      return;
    }
    const parsedURL = new URL(newOrigin);
    if (parsedURL.protocol !== "http:" && parsedURL.protocol !== "https:") {
      throw new TypeError(`Only http & https urls are allowed, received ${parsedURL.protocol}`);
    }
    Object.defineProperty(globalThis, globalOrigin, {
      value: parsedURL,
      writable: true,
      enumerable: false,
      configurable: false
    });
  }
  global$2 = {
    getGlobalOrigin,
    setGlobalOrigin
  };
  return global$2;
}
var util$i;
var hasRequiredUtil$4;
function requireUtil$4() {
  if (hasRequiredUtil$4)
    return util$i;
  hasRequiredUtil$4 = 1;
  const { redirectStatusSet, referrerPolicySet: referrerPolicyTokens, badPortsSet } = requireConstants$3();
  const { getGlobalOrigin } = requireGlobal();
  const { performance: performance2 } = require$$2$1;
  const { isBlobLike: isBlobLike2, toUSVString: toUSVString2, ReadableStreamFrom: ReadableStreamFrom2 } = util$j;
  const assert2 = require$$0$3;
  const { isUint8Array } = require$$5;
  let supportedHashes = [];
  let crypto2;
  try {
    crypto2 = require("crypto");
    const possibleRelevantHashes = ["sha256", "sha384", "sha512"];
    supportedHashes = crypto2.getHashes().filter((hash) => possibleRelevantHashes.includes(hash));
  } catch {
  }
  function responseURL(response2) {
    const urlList = response2.urlList;
    const length = urlList.length;
    return length === 0 ? null : urlList[length - 1].toString();
  }
  function responseLocationURL(response2, requestFragment) {
    if (!redirectStatusSet.has(response2.status)) {
      return null;
    }
    let location = response2.headersList.get("location");
    if (location !== null && isValidHeaderValue(location)) {
      location = new URL(location, responseURL(response2));
    }
    if (location && !location.hash) {
      location.hash = requestFragment;
    }
    return location;
  }
  function requestCurrentURL(request2) {
    return request2.urlList[request2.urlList.length - 1];
  }
  function requestBadPort(request2) {
    const url = requestCurrentURL(request2);
    if (urlIsHttpHttpsScheme(url) && badPortsSet.has(url.port)) {
      return "blocked";
    }
    return "allowed";
  }
  function isErrorLike(object) {
    var _a, _b;
    return object instanceof Error || (((_a = object == null ? void 0 : object.constructor) == null ? void 0 : _a.name) === "Error" || ((_b = object == null ? void 0 : object.constructor) == null ? void 0 : _b.name) === "DOMException");
  }
  function isValidReasonPhrase(statusText) {
    for (let i = 0; i < statusText.length; ++i) {
      const c = statusText.charCodeAt(i);
      if (!(c === 9 || // HTAB
      c >= 32 && c <= 126 || // SP / VCHAR
      c >= 128 && c <= 255)) {
        return false;
      }
    }
    return true;
  }
  function isTokenCharCode(c) {
    switch (c) {
      case 34:
      case 40:
      case 41:
      case 44:
      case 47:
      case 58:
      case 59:
      case 60:
      case 61:
      case 62:
      case 63:
      case 64:
      case 91:
      case 92:
      case 93:
      case 123:
      case 125:
        return false;
      default:
        return c >= 33 && c <= 126;
    }
  }
  function isValidHTTPToken(characters) {
    if (characters.length === 0) {
      return false;
    }
    for (let i = 0; i < characters.length; ++i) {
      if (!isTokenCharCode(characters.charCodeAt(i))) {
        return false;
      }
    }
    return true;
  }
  function isValidHeaderName(potentialValue) {
    return isValidHTTPToken(potentialValue);
  }
  function isValidHeaderValue(potentialValue) {
    if (potentialValue.startsWith("	") || potentialValue.startsWith(" ") || potentialValue.endsWith("	") || potentialValue.endsWith(" ")) {
      return false;
    }
    if (potentialValue.includes("\0") || potentialValue.includes("\r") || potentialValue.includes("\n")) {
      return false;
    }
    return true;
  }
  function setRequestReferrerPolicyOnRedirect(request2, actualResponse) {
    const { headersList } = actualResponse;
    const policyHeader = (headersList.get("referrer-policy") ?? "").split(",");
    let policy = "";
    if (policyHeader.length > 0) {
      for (let i = policyHeader.length; i !== 0; i--) {
        const token = policyHeader[i - 1].trim();
        if (referrerPolicyTokens.has(token)) {
          policy = token;
          break;
        }
      }
    }
    if (policy !== "") {
      request2.referrerPolicy = policy;
    }
  }
  function crossOriginResourcePolicyCheck() {
    return "allowed";
  }
  function corsCheck() {
    return "success";
  }
  function TAOCheck() {
    return "success";
  }
  function appendFetchMetadata(httpRequest) {
    let header = null;
    header = httpRequest.mode;
    httpRequest.headersList.set("sec-fetch-mode", header);
  }
  function appendRequestOriginHeader(request2) {
    let serializedOrigin = request2.origin;
    if (request2.responseTainting === "cors" || request2.mode === "websocket") {
      if (serializedOrigin) {
        request2.headersList.append("origin", serializedOrigin);
      }
    } else if (request2.method !== "GET" && request2.method !== "HEAD") {
      switch (request2.referrerPolicy) {
        case "no-referrer":
          serializedOrigin = null;
          break;
        case "no-referrer-when-downgrade":
        case "strict-origin":
        case "strict-origin-when-cross-origin":
          if (request2.origin && urlHasHttpsScheme(request2.origin) && !urlHasHttpsScheme(requestCurrentURL(request2))) {
            serializedOrigin = null;
          }
          break;
        case "same-origin":
          if (!sameOrigin(request2, requestCurrentURL(request2))) {
            serializedOrigin = null;
          }
          break;
      }
      if (serializedOrigin) {
        request2.headersList.append("origin", serializedOrigin);
      }
    }
  }
  function coarsenedSharedCurrentTime(crossOriginIsolatedCapability) {
    return performance2.now();
  }
  function createOpaqueTimingInfo(timingInfo) {
    return {
      startTime: timingInfo.startTime ?? 0,
      redirectStartTime: 0,
      redirectEndTime: 0,
      postRedirectStartTime: timingInfo.startTime ?? 0,
      finalServiceWorkerStartTime: 0,
      finalNetworkResponseStartTime: 0,
      finalNetworkRequestStartTime: 0,
      endTime: 0,
      encodedBodySize: 0,
      decodedBodySize: 0,
      finalConnectionTimingInfo: null
    };
  }
  function makePolicyContainer() {
    return {
      referrerPolicy: "strict-origin-when-cross-origin"
    };
  }
  function clonePolicyContainer(policyContainer) {
    return {
      referrerPolicy: policyContainer.referrerPolicy
    };
  }
  function determineRequestsReferrer(request2) {
    const policy = request2.referrerPolicy;
    assert2(policy);
    let referrerSource = null;
    if (request2.referrer === "client") {
      const globalOrigin = getGlobalOrigin();
      if (!globalOrigin || globalOrigin.origin === "null") {
        return "no-referrer";
      }
      referrerSource = new URL(globalOrigin);
    } else if (request2.referrer instanceof URL) {
      referrerSource = request2.referrer;
    }
    let referrerURL = stripURLForReferrer(referrerSource);
    const referrerOrigin = stripURLForReferrer(referrerSource, true);
    if (referrerURL.toString().length > 4096) {
      referrerURL = referrerOrigin;
    }
    const areSameOrigin = sameOrigin(request2, referrerURL);
    const isNonPotentiallyTrustWorthy = isURLPotentiallyTrustworthy(referrerURL) && !isURLPotentiallyTrustworthy(request2.url);
    switch (policy) {
      case "origin":
        return referrerOrigin != null ? referrerOrigin : stripURLForReferrer(referrerSource, true);
      case "unsafe-url":
        return referrerURL;
      case "same-origin":
        return areSameOrigin ? referrerOrigin : "no-referrer";
      case "origin-when-cross-origin":
        return areSameOrigin ? referrerURL : referrerOrigin;
      case "strict-origin-when-cross-origin": {
        const currentURL = requestCurrentURL(request2);
        if (sameOrigin(referrerURL, currentURL)) {
          return referrerURL;
        }
        if (isURLPotentiallyTrustworthy(referrerURL) && !isURLPotentiallyTrustworthy(currentURL)) {
          return "no-referrer";
        }
        return referrerOrigin;
      }
      case "strict-origin":
      case "no-referrer-when-downgrade":
      default:
        return isNonPotentiallyTrustWorthy ? "no-referrer" : referrerOrigin;
    }
  }
  function stripURLForReferrer(url, originOnly) {
    assert2(url instanceof URL);
    if (url.protocol === "file:" || url.protocol === "about:" || url.protocol === "blank:") {
      return "no-referrer";
    }
    url.username = "";
    url.password = "";
    url.hash = "";
    if (originOnly) {
      url.pathname = "";
      url.search = "";
    }
    return url;
  }
  function isURLPotentiallyTrustworthy(url) {
    if (!(url instanceof URL)) {
      return false;
    }
    if (url.href === "about:blank" || url.href === "about:srcdoc") {
      return true;
    }
    if (url.protocol === "data:")
      return true;
    if (url.protocol === "file:")
      return true;
    return isOriginPotentiallyTrustworthy(url.origin);
    function isOriginPotentiallyTrustworthy(origin) {
      if (origin == null || origin === "null")
        return false;
      const originAsURL = new URL(origin);
      if (originAsURL.protocol === "https:" || originAsURL.protocol === "wss:") {
        return true;
      }
      if (/^127(?:\.[0-9]+){0,2}\.[0-9]+$|^\[(?:0*:)*?:?0*1\]$/.test(originAsURL.hostname) || (originAsURL.hostname === "localhost" || originAsURL.hostname.includes("localhost.")) || originAsURL.hostname.endsWith(".localhost")) {
        return true;
      }
      return false;
    }
  }
  function bytesMatch(bytes, metadataList) {
    if (crypto2 === void 0) {
      return true;
    }
    const parsedMetadata = parseMetadata(metadataList);
    if (parsedMetadata === "no metadata") {
      return true;
    }
    if (parsedMetadata.length === 0) {
      return true;
    }
    const strongest = getStrongestMetadata(parsedMetadata);
    const metadata = filterMetadataListByAlgorithm(parsedMetadata, strongest);
    for (const item of metadata) {
      const algorithm = item.algo;
      const expectedValue = item.hash;
      let actualValue = crypto2.createHash(algorithm).update(bytes).digest("base64");
      if (actualValue[actualValue.length - 1] === "=") {
        if (actualValue[actualValue.length - 2] === "=") {
          actualValue = actualValue.slice(0, -2);
        } else {
          actualValue = actualValue.slice(0, -1);
        }
      }
      if (compareBase64Mixed(actualValue, expectedValue)) {
        return true;
      }
    }
    return false;
  }
  const parseHashWithOptions = /(?<algo>sha256|sha384|sha512)-((?<hash>[A-Za-z0-9+/]+|[A-Za-z0-9_-]+)={0,2}(?:\s|$)( +[!-~]*)?)?/i;
  function parseMetadata(metadata) {
    const result = [];
    let empty = true;
    for (const token of metadata.split(" ")) {
      empty = false;
      const parsedToken = parseHashWithOptions.exec(token);
      if (parsedToken === null || parsedToken.groups === void 0 || parsedToken.groups.algo === void 0) {
        continue;
      }
      const algorithm = parsedToken.groups.algo.toLowerCase();
      if (supportedHashes.includes(algorithm)) {
        result.push(parsedToken.groups);
      }
    }
    if (empty === true) {
      return "no metadata";
    }
    return result;
  }
  function getStrongestMetadata(metadataList) {
    let algorithm = metadataList[0].algo;
    if (algorithm[3] === "5") {
      return algorithm;
    }
    for (let i = 1; i < metadataList.length; ++i) {
      const metadata = metadataList[i];
      if (metadata.algo[3] === "5") {
        algorithm = "sha512";
        break;
      } else if (algorithm[3] === "3") {
        continue;
      } else if (metadata.algo[3] === "3") {
        algorithm = "sha384";
      }
    }
    return algorithm;
  }
  function filterMetadataListByAlgorithm(metadataList, algorithm) {
    if (metadataList.length === 1) {
      return metadataList;
    }
    let pos = 0;
    for (let i = 0; i < metadataList.length; ++i) {
      if (metadataList[i].algo === algorithm) {
        metadataList[pos++] = metadataList[i];
      }
    }
    metadataList.length = pos;
    return metadataList;
  }
  function compareBase64Mixed(actualValue, expectedValue) {
    if (actualValue.length !== expectedValue.length) {
      return false;
    }
    for (let i = 0; i < actualValue.length; ++i) {
      if (actualValue[i] !== expectedValue[i]) {
        if (actualValue[i] === "+" && expectedValue[i] === "-" || actualValue[i] === "/" && expectedValue[i] === "_") {
          continue;
        }
        return false;
      }
    }
    return true;
  }
  function tryUpgradeRequestToAPotentiallyTrustworthyURL(request2) {
  }
  function sameOrigin(A, B) {
    if (A.origin === B.origin && A.origin === "null") {
      return true;
    }
    if (A.protocol === B.protocol && A.hostname === B.hostname && A.port === B.port) {
      return true;
    }
    return false;
  }
  function createDeferredPromise() {
    let res;
    let rej;
    const promise = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });
    return { promise, resolve: res, reject: rej };
  }
  function isAborted(fetchParams) {
    return fetchParams.controller.state === "aborted";
  }
  function isCancelled(fetchParams) {
    return fetchParams.controller.state === "aborted" || fetchParams.controller.state === "terminated";
  }
  const normalizeMethodRecord = {
    delete: "DELETE",
    DELETE: "DELETE",
    get: "GET",
    GET: "GET",
    head: "HEAD",
    HEAD: "HEAD",
    options: "OPTIONS",
    OPTIONS: "OPTIONS",
    post: "POST",
    POST: "POST",
    put: "PUT",
    PUT: "PUT"
  };
  Object.setPrototypeOf(normalizeMethodRecord, null);
  function normalizeMethod(method) {
    return normalizeMethodRecord[method.toLowerCase()] ?? method;
  }
  function serializeJavascriptValueToJSONString(value) {
    const result = JSON.stringify(value);
    if (result === void 0) {
      throw new TypeError("Value is not JSON serializable");
    }
    assert2(typeof result === "string");
    return result;
  }
  const esIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));
  function makeIterator(iterator, name, kind) {
    const object = {
      index: 0,
      kind,
      target: iterator
    };
    const i = {
      next() {
        if (Object.getPrototypeOf(this) !== i) {
          throw new TypeError(
            `'next' called on an object that does not implement interface ${name} Iterator.`
          );
        }
        const { index, kind: kind2, target } = object;
        const values = target();
        const len = values.length;
        if (index >= len) {
          return { value: void 0, done: true };
        }
        const pair = values[index];
        object.index = index + 1;
        return iteratorResult(pair, kind2);
      },
      // The class string of an iterator prototype object for a given interface is the
      // result of concatenating the identifier of the interface and the string " Iterator".
      [Symbol.toStringTag]: `${name} Iterator`
    };
    Object.setPrototypeOf(i, esIteratorPrototype);
    return Object.setPrototypeOf({}, i);
  }
  function iteratorResult(pair, kind) {
    let result;
    switch (kind) {
      case "key": {
        result = pair[0];
        break;
      }
      case "value": {
        result = pair[1];
        break;
      }
      case "key+value": {
        result = pair;
        break;
      }
    }
    return { value: result, done: false };
  }
  async function fullyReadBody(body2, processBody, processBodyError) {
    const successSteps = processBody;
    const errorSteps = processBodyError;
    let reader;
    try {
      reader = body2.stream.getReader();
    } catch (e) {
      errorSteps(e);
      return;
    }
    try {
      const result = await readAllBytes(reader);
      successSteps(result);
    } catch (e) {
      errorSteps(e);
    }
  }
  let ReadableStream2 = globalThis.ReadableStream;
  function isReadableStreamLike(stream2) {
    if (!ReadableStream2) {
      ReadableStream2 = require$$14.ReadableStream;
    }
    return stream2 instanceof ReadableStream2 || stream2[Symbol.toStringTag] === "ReadableStream" && typeof stream2.tee === "function";
  }
  const MAXIMUM_ARGUMENT_LENGTH = 65535;
  function isomorphicDecode(input) {
    if (input.length < MAXIMUM_ARGUMENT_LENGTH) {
      return String.fromCharCode(...input);
    }
    return input.reduce((previous, current) => previous + String.fromCharCode(current), "");
  }
  function readableStreamClose(controller) {
    try {
      controller.close();
    } catch (err) {
      if (!err.message.includes("Controller is already closed")) {
        throw err;
      }
    }
  }
  function isomorphicEncode(input) {
    for (let i = 0; i < input.length; i++) {
      assert2(input.charCodeAt(i) <= 255);
    }
    return input;
  }
  async function readAllBytes(reader) {
    const bytes = [];
    let byteLength = 0;
    while (true) {
      const { done, value: chunk } = await reader.read();
      if (done) {
        return Buffer.concat(bytes, byteLength);
      }
      if (!isUint8Array(chunk)) {
        throw new TypeError("Received non-Uint8Array chunk");
      }
      bytes.push(chunk);
      byteLength += chunk.length;
    }
  }
  function urlIsLocal(url) {
    assert2("protocol" in url);
    const protocol = url.protocol;
    return protocol === "about:" || protocol === "blob:" || protocol === "data:";
  }
  function urlHasHttpsScheme(url) {
    if (typeof url === "string") {
      return url.startsWith("https:");
    }
    return url.protocol === "https:";
  }
  function urlIsHttpHttpsScheme(url) {
    assert2("protocol" in url);
    const protocol = url.protocol;
    return protocol === "http:" || protocol === "https:";
  }
  const hasOwn = Object.hasOwn || ((dict, key) => Object.prototype.hasOwnProperty.call(dict, key));
  util$i = {
    isAborted,
    isCancelled,
    createDeferredPromise,
    ReadableStreamFrom: ReadableStreamFrom2,
    toUSVString: toUSVString2,
    tryUpgradeRequestToAPotentiallyTrustworthyURL,
    coarsenedSharedCurrentTime,
    determineRequestsReferrer,
    makePolicyContainer,
    clonePolicyContainer,
    appendFetchMetadata,
    appendRequestOriginHeader,
    TAOCheck,
    corsCheck,
    crossOriginResourcePolicyCheck,
    createOpaqueTimingInfo,
    setRequestReferrerPolicyOnRedirect,
    isValidHTTPToken,
    requestBadPort,
    requestCurrentURL,
    responseURL,
    responseLocationURL,
    isBlobLike: isBlobLike2,
    isURLPotentiallyTrustworthy,
    isValidReasonPhrase,
    sameOrigin,
    normalizeMethod,
    serializeJavascriptValueToJSONString,
    makeIterator,
    isValidHeaderName,
    isValidHeaderValue,
    hasOwn,
    isErrorLike,
    fullyReadBody,
    bytesMatch,
    isReadableStreamLike,
    readableStreamClose,
    isomorphicEncode,
    isomorphicDecode,
    urlIsLocal,
    urlHasHttpsScheme,
    urlIsHttpHttpsScheme,
    readAllBytes,
    normalizeMethodRecord,
    parseMetadata
  };
  return util$i;
}
var symbols$3;
var hasRequiredSymbols$3;
function requireSymbols$3() {
  if (hasRequiredSymbols$3)
    return symbols$3;
  hasRequiredSymbols$3 = 1;
  symbols$3 = {
    kUrl: Symbol("url"),
    kHeaders: Symbol("headers"),
    kSignal: Symbol("signal"),
    kState: Symbol("state"),
    kGuard: Symbol("guard"),
    kRealm: Symbol("realm")
  };
  return symbols$3;
}
var webidl_1;
var hasRequiredWebidl;
function requireWebidl() {
  if (hasRequiredWebidl)
    return webidl_1;
  hasRequiredWebidl = 1;
  const { types } = require$$0$2;
  const { hasOwn, toUSVString: toUSVString2 } = requireUtil$4();
  const webidl = {};
  webidl.converters = {};
  webidl.util = {};
  webidl.errors = {};
  webidl.errors.exception = function(message) {
    return new TypeError(`${message.header}: ${message.message}`);
  };
  webidl.errors.conversionFailed = function(context) {
    const plural = context.types.length === 1 ? "" : " one of";
    const message = `${context.argument} could not be converted to${plural}: ${context.types.join(", ")}.`;
    return webidl.errors.exception({
      header: context.prefix,
      message
    });
  };
  webidl.errors.invalidArgument = function(context) {
    return webidl.errors.exception({
      header: context.prefix,
      message: `"${context.value}" is an invalid ${context.type}.`
    });
  };
  webidl.brandCheck = function(V, I, opts = void 0) {
    if ((opts == null ? void 0 : opts.strict) !== false && !(V instanceof I)) {
      throw new TypeError("Illegal invocation");
    } else {
      return (V == null ? void 0 : V[Symbol.toStringTag]) === I.prototype[Symbol.toStringTag];
    }
  };
  webidl.argumentLengthCheck = function({ length }, min, ctx) {
    if (length < min) {
      throw webidl.errors.exception({
        message: `${min} argument${min !== 1 ? "s" : ""} required, but${length ? " only" : ""} ${length} found.`,
        ...ctx
      });
    }
  };
  webidl.illegalConstructor = function() {
    throw webidl.errors.exception({
      header: "TypeError",
      message: "Illegal constructor"
    });
  };
  webidl.util.Type = function(V) {
    switch (typeof V) {
      case "undefined":
        return "Undefined";
      case "boolean":
        return "Boolean";
      case "string":
        return "String";
      case "symbol":
        return "Symbol";
      case "number":
        return "Number";
      case "bigint":
        return "BigInt";
      case "function":
      case "object": {
        if (V === null) {
          return "Null";
        }
        return "Object";
      }
    }
  };
  webidl.util.ConvertToInt = function(V, bitLength, signedness, opts = {}) {
    let upperBound;
    let lowerBound;
    if (bitLength === 64) {
      upperBound = Math.pow(2, 53) - 1;
      if (signedness === "unsigned") {
        lowerBound = 0;
      } else {
        lowerBound = Math.pow(-2, 53) + 1;
      }
    } else if (signedness === "unsigned") {
      lowerBound = 0;
      upperBound = Math.pow(2, bitLength) - 1;
    } else {
      lowerBound = Math.pow(-2, bitLength) - 1;
      upperBound = Math.pow(2, bitLength - 1) - 1;
    }
    let x = Number(V);
    if (x === 0) {
      x = 0;
    }
    if (opts.enforceRange === true) {
      if (Number.isNaN(x) || x === Number.POSITIVE_INFINITY || x === Number.NEGATIVE_INFINITY) {
        throw webidl.errors.exception({
          header: "Integer conversion",
          message: `Could not convert ${V} to an integer.`
        });
      }
      x = webidl.util.IntegerPart(x);
      if (x < lowerBound || x > upperBound) {
        throw webidl.errors.exception({
          header: "Integer conversion",
          message: `Value must be between ${lowerBound}-${upperBound}, got ${x}.`
        });
      }
      return x;
    }
    if (!Number.isNaN(x) && opts.clamp === true) {
      x = Math.min(Math.max(x, lowerBound), upperBound);
      if (Math.floor(x) % 2 === 0) {
        x = Math.floor(x);
      } else {
        x = Math.ceil(x);
      }
      return x;
    }
    if (Number.isNaN(x) || x === 0 && Object.is(0, x) || x === Number.POSITIVE_INFINITY || x === Number.NEGATIVE_INFINITY) {
      return 0;
    }
    x = webidl.util.IntegerPart(x);
    x = x % Math.pow(2, bitLength);
    if (signedness === "signed" && x >= Math.pow(2, bitLength) - 1) {
      return x - Math.pow(2, bitLength);
    }
    return x;
  };
  webidl.util.IntegerPart = function(n) {
    const r = Math.floor(Math.abs(n));
    if (n < 0) {
      return -1 * r;
    }
    return r;
  };
  webidl.sequenceConverter = function(converter) {
    return (V) => {
      var _a;
      if (webidl.util.Type(V) !== "Object") {
        throw webidl.errors.exception({
          header: "Sequence",
          message: `Value of type ${webidl.util.Type(V)} is not an Object.`
        });
      }
      const method = (_a = V == null ? void 0 : V[Symbol.iterator]) == null ? void 0 : _a.call(V);
      const seq = [];
      if (method === void 0 || typeof method.next !== "function") {
        throw webidl.errors.exception({
          header: "Sequence",
          message: "Object is not an iterator."
        });
      }
      while (true) {
        const { done, value } = method.next();
        if (done) {
          break;
        }
        seq.push(converter(value));
      }
      return seq;
    };
  };
  webidl.recordConverter = function(keyConverter, valueConverter) {
    return (O) => {
      if (webidl.util.Type(O) !== "Object") {
        throw webidl.errors.exception({
          header: "Record",
          message: `Value of type ${webidl.util.Type(O)} is not an Object.`
        });
      }
      const result = {};
      if (!types.isProxy(O)) {
        const keys2 = Object.keys(O);
        for (const key of keys2) {
          const typedKey = keyConverter(key);
          const typedValue = valueConverter(O[key]);
          result[typedKey] = typedValue;
        }
        return result;
      }
      const keys = Reflect.ownKeys(O);
      for (const key of keys) {
        const desc = Reflect.getOwnPropertyDescriptor(O, key);
        if (desc == null ? void 0 : desc.enumerable) {
          const typedKey = keyConverter(key);
          const typedValue = valueConverter(O[key]);
          result[typedKey] = typedValue;
        }
      }
      return result;
    };
  };
  webidl.interfaceConverter = function(i) {
    return (V, opts = {}) => {
      if (opts.strict !== false && !(V instanceof i)) {
        throw webidl.errors.exception({
          header: i.name,
          message: `Expected ${V} to be an instance of ${i.name}.`
        });
      }
      return V;
    };
  };
  webidl.dictionaryConverter = function(converters) {
    return (dictionary) => {
      const type = webidl.util.Type(dictionary);
      const dict = {};
      if (type === "Null" || type === "Undefined") {
        return dict;
      } else if (type !== "Object") {
        throw webidl.errors.exception({
          header: "Dictionary",
          message: `Expected ${dictionary} to be one of: Null, Undefined, Object.`
        });
      }
      for (const options of converters) {
        const { key, defaultValue, required, converter } = options;
        if (required === true) {
          if (!hasOwn(dictionary, key)) {
            throw webidl.errors.exception({
              header: "Dictionary",
              message: `Missing required key "${key}".`
            });
          }
        }
        let value = dictionary[key];
        const hasDefault = hasOwn(options, "defaultValue");
        if (hasDefault && value !== null) {
          value = value ?? defaultValue;
        }
        if (required || hasDefault || value !== void 0) {
          value = converter(value);
          if (options.allowedValues && !options.allowedValues.includes(value)) {
            throw webidl.errors.exception({
              header: "Dictionary",
              message: `${value} is not an accepted type. Expected one of ${options.allowedValues.join(", ")}.`
            });
          }
          dict[key] = value;
        }
      }
      return dict;
    };
  };
  webidl.nullableConverter = function(converter) {
    return (V) => {
      if (V === null) {
        return V;
      }
      return converter(V);
    };
  };
  webidl.converters.DOMString = function(V, opts = {}) {
    if (V === null && opts.legacyNullToEmptyString) {
      return "";
    }
    if (typeof V === "symbol") {
      throw new TypeError("Could not convert argument of type symbol to string.");
    }
    return String(V);
  };
  webidl.converters.ByteString = function(V) {
    const x = webidl.converters.DOMString(V);
    for (let index = 0; index < x.length; index++) {
      if (x.charCodeAt(index) > 255) {
        throw new TypeError(
          `Cannot convert argument to a ByteString because the character at index ${index} has a value of ${x.charCodeAt(index)} which is greater than 255.`
        );
      }
    }
    return x;
  };
  webidl.converters.USVString = toUSVString2;
  webidl.converters.boolean = function(V) {
    const x = Boolean(V);
    return x;
  };
  webidl.converters.any = function(V) {
    return V;
  };
  webidl.converters["long long"] = function(V) {
    const x = webidl.util.ConvertToInt(V, 64, "signed");
    return x;
  };
  webidl.converters["unsigned long long"] = function(V) {
    const x = webidl.util.ConvertToInt(V, 64, "unsigned");
    return x;
  };
  webidl.converters["unsigned long"] = function(V) {
    const x = webidl.util.ConvertToInt(V, 32, "unsigned");
    return x;
  };
  webidl.converters["unsigned short"] = function(V, opts) {
    const x = webidl.util.ConvertToInt(V, 16, "unsigned", opts);
    return x;
  };
  webidl.converters.ArrayBuffer = function(V, opts = {}) {
    if (webidl.util.Type(V) !== "Object" || !types.isAnyArrayBuffer(V)) {
      throw webidl.errors.conversionFailed({
        prefix: `${V}`,
        argument: `${V}`,
        types: ["ArrayBuffer"]
      });
    }
    if (opts.allowShared === false && types.isSharedArrayBuffer(V)) {
      throw webidl.errors.exception({
        header: "ArrayBuffer",
        message: "SharedArrayBuffer is not allowed."
      });
    }
    return V;
  };
  webidl.converters.TypedArray = function(V, T, opts = {}) {
    if (webidl.util.Type(V) !== "Object" || !types.isTypedArray(V) || V.constructor.name !== T.name) {
      throw webidl.errors.conversionFailed({
        prefix: `${T.name}`,
        argument: `${V}`,
        types: [T.name]
      });
    }
    if (opts.allowShared === false && types.isSharedArrayBuffer(V.buffer)) {
      throw webidl.errors.exception({
        header: "ArrayBuffer",
        message: "SharedArrayBuffer is not allowed."
      });
    }
    return V;
  };
  webidl.converters.DataView = function(V, opts = {}) {
    if (webidl.util.Type(V) !== "Object" || !types.isDataView(V)) {
      throw webidl.errors.exception({
        header: "DataView",
        message: "Object is not a DataView."
      });
    }
    if (opts.allowShared === false && types.isSharedArrayBuffer(V.buffer)) {
      throw webidl.errors.exception({
        header: "ArrayBuffer",
        message: "SharedArrayBuffer is not allowed."
      });
    }
    return V;
  };
  webidl.converters.BufferSource = function(V, opts = {}) {
    if (types.isAnyArrayBuffer(V)) {
      return webidl.converters.ArrayBuffer(V, opts);
    }
    if (types.isTypedArray(V)) {
      return webidl.converters.TypedArray(V, V.constructor);
    }
    if (types.isDataView(V)) {
      return webidl.converters.DataView(V, opts);
    }
    throw new TypeError(`Could not convert ${V} to a BufferSource.`);
  };
  webidl.converters["sequence<ByteString>"] = webidl.sequenceConverter(
    webidl.converters.ByteString
  );
  webidl.converters["sequence<sequence<ByteString>>"] = webidl.sequenceConverter(
    webidl.converters["sequence<ByteString>"]
  );
  webidl.converters["record<ByteString, ByteString>"] = webidl.recordConverter(
    webidl.converters.ByteString,
    webidl.converters.ByteString
  );
  webidl_1 = {
    webidl
  };
  return webidl_1;
}
var dataURL;
var hasRequiredDataURL;
function requireDataURL() {
  if (hasRequiredDataURL)
    return dataURL;
  hasRequiredDataURL = 1;
  const assert2 = require$$0$3;
  const { atob: atob2 } = require$$7;
  const { isomorphicDecode } = requireUtil$4();
  const encoder = new TextEncoder();
  const HTTP_TOKEN_CODEPOINTS = /^[!#$%&'*+-.^_|~A-Za-z0-9]+$/;
  const HTTP_WHITESPACE_REGEX = /(\u000A|\u000D|\u0009|\u0020)/;
  const HTTP_QUOTED_STRING_TOKENS = /[\u0009|\u0020-\u007E|\u0080-\u00FF]/;
  function dataURLProcessor(dataURL2) {
    assert2(dataURL2.protocol === "data:");
    let input = URLSerializer(dataURL2, true);
    input = input.slice(5);
    const position = { position: 0 };
    let mimeType = collectASequenceOfCodePointsFast(
      ",",
      input,
      position
    );
    const mimeTypeLength = mimeType.length;
    mimeType = removeASCIIWhitespace(mimeType, true, true);
    if (position.position >= input.length) {
      return "failure";
    }
    position.position++;
    const encodedBody = input.slice(mimeTypeLength + 1);
    let body2 = stringPercentDecode(encodedBody);
    if (/;(\u0020){0,}base64$/i.test(mimeType)) {
      const stringBody = isomorphicDecode(body2);
      body2 = forgivingBase64(stringBody);
      if (body2 === "failure") {
        return "failure";
      }
      mimeType = mimeType.slice(0, -6);
      mimeType = mimeType.replace(/(\u0020)+$/, "");
      mimeType = mimeType.slice(0, -1);
    }
    if (mimeType.startsWith(";")) {
      mimeType = "text/plain" + mimeType;
    }
    let mimeTypeRecord = parseMIMEType(mimeType);
    if (mimeTypeRecord === "failure") {
      mimeTypeRecord = parseMIMEType("text/plain;charset=US-ASCII");
    }
    return { mimeType: mimeTypeRecord, body: body2 };
  }
  function URLSerializer(url, excludeFragment = false) {
    if (!excludeFragment) {
      return url.href;
    }
    const href = url.href;
    const hashLength = url.hash.length;
    return hashLength === 0 ? href : href.substring(0, href.length - hashLength);
  }
  function collectASequenceOfCodePoints(condition, input, position) {
    let result = "";
    while (position.position < input.length && condition(input[position.position])) {
      result += input[position.position];
      position.position++;
    }
    return result;
  }
  function collectASequenceOfCodePointsFast(char, input, position) {
    const idx = input.indexOf(char, position.position);
    const start = position.position;
    if (idx === -1) {
      position.position = input.length;
      return input.slice(start);
    }
    position.position = idx;
    return input.slice(start, position.position);
  }
  function stringPercentDecode(input) {
    const bytes = encoder.encode(input);
    return percentDecode(bytes);
  }
  function percentDecode(input) {
    const output = [];
    for (let i = 0; i < input.length; i++) {
      const byte = input[i];
      if (byte !== 37) {
        output.push(byte);
      } else if (byte === 37 && !/^[0-9A-Fa-f]{2}$/i.test(String.fromCharCode(input[i + 1], input[i + 2]))) {
        output.push(37);
      } else {
        const nextTwoBytes = String.fromCharCode(input[i + 1], input[i + 2]);
        const bytePoint = Number.parseInt(nextTwoBytes, 16);
        output.push(bytePoint);
        i += 2;
      }
    }
    return Uint8Array.from(output);
  }
  function parseMIMEType(input) {
    input = removeHTTPWhitespace(input, true, true);
    const position = { position: 0 };
    const type = collectASequenceOfCodePointsFast(
      "/",
      input,
      position
    );
    if (type.length === 0 || !HTTP_TOKEN_CODEPOINTS.test(type)) {
      return "failure";
    }
    if (position.position > input.length) {
      return "failure";
    }
    position.position++;
    let subtype = collectASequenceOfCodePointsFast(
      ";",
      input,
      position
    );
    subtype = removeHTTPWhitespace(subtype, false, true);
    if (subtype.length === 0 || !HTTP_TOKEN_CODEPOINTS.test(subtype)) {
      return "failure";
    }
    const typeLowercase = type.toLowerCase();
    const subtypeLowercase = subtype.toLowerCase();
    const mimeType = {
      type: typeLowercase,
      subtype: subtypeLowercase,
      /** @type {Map<string, string>} */
      parameters: /* @__PURE__ */ new Map(),
      // https://mimesniff.spec.whatwg.org/#mime-type-essence
      essence: `${typeLowercase}/${subtypeLowercase}`
    };
    while (position.position < input.length) {
      position.position++;
      collectASequenceOfCodePoints(
        // https://fetch.spec.whatwg.org/#http-whitespace
        (char) => HTTP_WHITESPACE_REGEX.test(char),
        input,
        position
      );
      let parameterName = collectASequenceOfCodePoints(
        (char) => char !== ";" && char !== "=",
        input,
        position
      );
      parameterName = parameterName.toLowerCase();
      if (position.position < input.length) {
        if (input[position.position] === ";") {
          continue;
        }
        position.position++;
      }
      if (position.position > input.length) {
        break;
      }
      let parameterValue = null;
      if (input[position.position] === '"') {
        parameterValue = collectAnHTTPQuotedString(input, position, true);
        collectASequenceOfCodePointsFast(
          ";",
          input,
          position
        );
      } else {
        parameterValue = collectASequenceOfCodePointsFast(
          ";",
          input,
          position
        );
        parameterValue = removeHTTPWhitespace(parameterValue, false, true);
        if (parameterValue.length === 0) {
          continue;
        }
      }
      if (parameterName.length !== 0 && HTTP_TOKEN_CODEPOINTS.test(parameterName) && (parameterValue.length === 0 || HTTP_QUOTED_STRING_TOKENS.test(parameterValue)) && !mimeType.parameters.has(parameterName)) {
        mimeType.parameters.set(parameterName, parameterValue);
      }
    }
    return mimeType;
  }
  function forgivingBase64(data) {
    data = data.replace(/[\u0009\u000A\u000C\u000D\u0020]/g, "");
    if (data.length % 4 === 0) {
      data = data.replace(/=?=$/, "");
    }
    if (data.length % 4 === 1) {
      return "failure";
    }
    if (/[^+/0-9A-Za-z]/.test(data)) {
      return "failure";
    }
    const binary = atob2(data);
    const bytes = new Uint8Array(binary.length);
    for (let byte = 0; byte < binary.length; byte++) {
      bytes[byte] = binary.charCodeAt(byte);
    }
    return bytes;
  }
  function collectAnHTTPQuotedString(input, position, extractValue) {
    const positionStart = position.position;
    let value = "";
    assert2(input[position.position] === '"');
    position.position++;
    while (true) {
      value += collectASequenceOfCodePoints(
        (char) => char !== '"' && char !== "\\",
        input,
        position
      );
      if (position.position >= input.length) {
        break;
      }
      const quoteOrBackslash = input[position.position];
      position.position++;
      if (quoteOrBackslash === "\\") {
        if (position.position >= input.length) {
          value += "\\";
          break;
        }
        value += input[position.position];
        position.position++;
      } else {
        assert2(quoteOrBackslash === '"');
        break;
      }
    }
    if (extractValue) {
      return value;
    }
    return input.slice(positionStart, position.position);
  }
  function serializeAMimeType(mimeType) {
    assert2(mimeType !== "failure");
    const { parameters, essence } = mimeType;
    let serialization = essence;
    for (let [name, value] of parameters.entries()) {
      serialization += ";";
      serialization += name;
      serialization += "=";
      if (!HTTP_TOKEN_CODEPOINTS.test(value)) {
        value = value.replace(/(\\|")/g, "\\$1");
        value = '"' + value;
        value += '"';
      }
      serialization += value;
    }
    return serialization;
  }
  function isHTTPWhiteSpace(char) {
    return char === "\r" || char === "\n" || char === "	" || char === " ";
  }
  function removeHTTPWhitespace(str, leading = true, trailing = true) {
    let lead = 0;
    let trail = str.length - 1;
    if (leading) {
      for (; lead < str.length && isHTTPWhiteSpace(str[lead]); lead++)
        ;
    }
    if (trailing) {
      for (; trail > 0 && isHTTPWhiteSpace(str[trail]); trail--)
        ;
    }
    return str.slice(lead, trail + 1);
  }
  function isASCIIWhitespace(char) {
    return char === "\r" || char === "\n" || char === "	" || char === "\f" || char === " ";
  }
  function removeASCIIWhitespace(str, leading = true, trailing = true) {
    let lead = 0;
    let trail = str.length - 1;
    if (leading) {
      for (; lead < str.length && isASCIIWhitespace(str[lead]); lead++)
        ;
    }
    if (trailing) {
      for (; trail > 0 && isASCIIWhitespace(str[trail]); trail--)
        ;
    }
    return str.slice(lead, trail + 1);
  }
  dataURL = {
    dataURLProcessor,
    URLSerializer,
    collectASequenceOfCodePoints,
    collectASequenceOfCodePointsFast,
    stringPercentDecode,
    parseMIMEType,
    collectAnHTTPQuotedString,
    serializeAMimeType
  };
  return dataURL;
}
var file;
var hasRequiredFile;
function requireFile() {
  if (hasRequiredFile)
    return file;
  hasRequiredFile = 1;
  const { Blob: Blob2, File: NativeFile } = require$$7;
  const { types } = require$$0$2;
  const { kState } = requireSymbols$3();
  const { isBlobLike: isBlobLike2 } = requireUtil$4();
  const { webidl } = requireWebidl();
  const { parseMIMEType, serializeAMimeType } = requireDataURL();
  const { kEnumerableProperty: kEnumerableProperty2 } = util$j;
  const encoder = new TextEncoder();
  class File extends Blob2 {
    constructor(fileBits, fileName, options = {}) {
      webidl.argumentLengthCheck(arguments, 2, { header: "File constructor" });
      fileBits = webidl.converters["sequence<BlobPart>"](fileBits);
      fileName = webidl.converters.USVString(fileName);
      options = webidl.converters.FilePropertyBag(options);
      const n = fileName;
      let t = options.type;
      let d;
      substep: {
        if (t) {
          t = parseMIMEType(t);
          if (t === "failure") {
            t = "";
            break substep;
          }
          t = serializeAMimeType(t).toLowerCase();
        }
        d = options.lastModified;
      }
      super(processBlobParts(fileBits, options), { type: t });
      this[kState] = {
        name: n,
        lastModified: d,
        type: t
      };
    }
    get name() {
      webidl.brandCheck(this, File);
      return this[kState].name;
    }
    get lastModified() {
      webidl.brandCheck(this, File);
      return this[kState].lastModified;
    }
    get type() {
      webidl.brandCheck(this, File);
      return this[kState].type;
    }
  }
  class FileLike {
    constructor(blobLike, fileName, options = {}) {
      const n = fileName;
      const t = options.type;
      const d = options.lastModified ?? Date.now();
      this[kState] = {
        blobLike,
        name: n,
        type: t,
        lastModified: d
      };
    }
    stream(...args) {
      webidl.brandCheck(this, FileLike);
      return this[kState].blobLike.stream(...args);
    }
    arrayBuffer(...args) {
      webidl.brandCheck(this, FileLike);
      return this[kState].blobLike.arrayBuffer(...args);
    }
    slice(...args) {
      webidl.brandCheck(this, FileLike);
      return this[kState].blobLike.slice(...args);
    }
    text(...args) {
      webidl.brandCheck(this, FileLike);
      return this[kState].blobLike.text(...args);
    }
    get size() {
      webidl.brandCheck(this, FileLike);
      return this[kState].blobLike.size;
    }
    get type() {
      webidl.brandCheck(this, FileLike);
      return this[kState].blobLike.type;
    }
    get name() {
      webidl.brandCheck(this, FileLike);
      return this[kState].name;
    }
    get lastModified() {
      webidl.brandCheck(this, FileLike);
      return this[kState].lastModified;
    }
    get [Symbol.toStringTag]() {
      return "File";
    }
  }
  Object.defineProperties(File.prototype, {
    [Symbol.toStringTag]: {
      value: "File",
      configurable: true
    },
    name: kEnumerableProperty2,
    lastModified: kEnumerableProperty2
  });
  webidl.converters.Blob = webidl.interfaceConverter(Blob2);
  webidl.converters.BlobPart = function(V, opts) {
    if (webidl.util.Type(V) === "Object") {
      if (isBlobLike2(V)) {
        return webidl.converters.Blob(V, { strict: false });
      }
      if (ArrayBuffer.isView(V) || types.isAnyArrayBuffer(V)) {
        return webidl.converters.BufferSource(V, opts);
      }
    }
    return webidl.converters.USVString(V, opts);
  };
  webidl.converters["sequence<BlobPart>"] = webidl.sequenceConverter(
    webidl.converters.BlobPart
  );
  webidl.converters.FilePropertyBag = webidl.dictionaryConverter([
    {
      key: "lastModified",
      converter: webidl.converters["long long"],
      get defaultValue() {
        return Date.now();
      }
    },
    {
      key: "type",
      converter: webidl.converters.DOMString,
      defaultValue: ""
    },
    {
      key: "endings",
      converter: (value) => {
        value = webidl.converters.DOMString(value);
        value = value.toLowerCase();
        if (value !== "native") {
          value = "transparent";
        }
        return value;
      },
      defaultValue: "transparent"
    }
  ]);
  function processBlobParts(parts, options) {
    const bytes = [];
    for (const element of parts) {
      if (typeof element === "string") {
        let s = element;
        if (options.endings === "native") {
          s = convertLineEndingsNative(s);
        }
        bytes.push(encoder.encode(s));
      } else if (types.isAnyArrayBuffer(element) || types.isTypedArray(element)) {
        if (!element.buffer) {
          bytes.push(new Uint8Array(element));
        } else {
          bytes.push(
            new Uint8Array(element.buffer, element.byteOffset, element.byteLength)
          );
        }
      } else if (isBlobLike2(element)) {
        bytes.push(element);
      }
    }
    return bytes;
  }
  function convertLineEndingsNative(s) {
    let nativeLineEnding = "\n";
    if (process.platform === "win32") {
      nativeLineEnding = "\r\n";
    }
    return s.replace(/\r?\n/g, nativeLineEnding);
  }
  function isFileLike(object) {
    return NativeFile && object instanceof NativeFile || object instanceof File || object && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && object[Symbol.toStringTag] === "File";
  }
  file = { File, FileLike, isFileLike };
  return file;
}
var formdata;
var hasRequiredFormdata;
function requireFormdata() {
  if (hasRequiredFormdata)
    return formdata;
  hasRequiredFormdata = 1;
  const { isBlobLike: isBlobLike2, toUSVString: toUSVString2, makeIterator } = requireUtil$4();
  const { kState } = requireSymbols$3();
  const { File: UndiciFile, FileLike, isFileLike } = requireFile();
  const { webidl } = requireWebidl();
  const { Blob: Blob2, File: NativeFile } = require$$7;
  const File = NativeFile ?? UndiciFile;
  class FormData {
    constructor(form) {
      if (form !== void 0) {
        throw webidl.errors.conversionFailed({
          prefix: "FormData constructor",
          argument: "Argument 1",
          types: ["undefined"]
        });
      }
      this[kState] = [];
    }
    append(name, value, filename = void 0) {
      webidl.brandCheck(this, FormData);
      webidl.argumentLengthCheck(arguments, 2, { header: "FormData.append" });
      if (arguments.length === 3 && !isBlobLike2(value)) {
        throw new TypeError(
          "Failed to execute 'append' on 'FormData': parameter 2 is not of type 'Blob'"
        );
      }
      name = webidl.converters.USVString(name);
      value = isBlobLike2(value) ? webidl.converters.Blob(value, { strict: false }) : webidl.converters.USVString(value);
      filename = arguments.length === 3 ? webidl.converters.USVString(filename) : void 0;
      const entry = makeEntry(name, value, filename);
      this[kState].push(entry);
    }
    delete(name) {
      webidl.brandCheck(this, FormData);
      webidl.argumentLengthCheck(arguments, 1, { header: "FormData.delete" });
      name = webidl.converters.USVString(name);
      this[kState] = this[kState].filter((entry) => entry.name !== name);
    }
    get(name) {
      webidl.brandCheck(this, FormData);
      webidl.argumentLengthCheck(arguments, 1, { header: "FormData.get" });
      name = webidl.converters.USVString(name);
      const idx = this[kState].findIndex((entry) => entry.name === name);
      if (idx === -1) {
        return null;
      }
      return this[kState][idx].value;
    }
    getAll(name) {
      webidl.brandCheck(this, FormData);
      webidl.argumentLengthCheck(arguments, 1, { header: "FormData.getAll" });
      name = webidl.converters.USVString(name);
      return this[kState].filter((entry) => entry.name === name).map((entry) => entry.value);
    }
    has(name) {
      webidl.brandCheck(this, FormData);
      webidl.argumentLengthCheck(arguments, 1, { header: "FormData.has" });
      name = webidl.converters.USVString(name);
      return this[kState].findIndex((entry) => entry.name === name) !== -1;
    }
    set(name, value, filename = void 0) {
      webidl.brandCheck(this, FormData);
      webidl.argumentLengthCheck(arguments, 2, { header: "FormData.set" });
      if (arguments.length === 3 && !isBlobLike2(value)) {
        throw new TypeError(
          "Failed to execute 'set' on 'FormData': parameter 2 is not of type 'Blob'"
        );
      }
      name = webidl.converters.USVString(name);
      value = isBlobLike2(value) ? webidl.converters.Blob(value, { strict: false }) : webidl.converters.USVString(value);
      filename = arguments.length === 3 ? toUSVString2(filename) : void 0;
      const entry = makeEntry(name, value, filename);
      const idx = this[kState].findIndex((entry2) => entry2.name === name);
      if (idx !== -1) {
        this[kState] = [
          ...this[kState].slice(0, idx),
          entry,
          ...this[kState].slice(idx + 1).filter((entry2) => entry2.name !== name)
        ];
      } else {
        this[kState].push(entry);
      }
    }
    entries() {
      webidl.brandCheck(this, FormData);
      return makeIterator(
        () => this[kState].map((pair) => [pair.name, pair.value]),
        "FormData",
        "key+value"
      );
    }
    keys() {
      webidl.brandCheck(this, FormData);
      return makeIterator(
        () => this[kState].map((pair) => [pair.name, pair.value]),
        "FormData",
        "key"
      );
    }
    values() {
      webidl.brandCheck(this, FormData);
      return makeIterator(
        () => this[kState].map((pair) => [pair.name, pair.value]),
        "FormData",
        "value"
      );
    }
    /**
     * @param {(value: string, key: string, self: FormData) => void} callbackFn
     * @param {unknown} thisArg
     */
    forEach(callbackFn, thisArg = globalThis) {
      webidl.brandCheck(this, FormData);
      webidl.argumentLengthCheck(arguments, 1, { header: "FormData.forEach" });
      if (typeof callbackFn !== "function") {
        throw new TypeError(
          "Failed to execute 'forEach' on 'FormData': parameter 1 is not of type 'Function'."
        );
      }
      for (const [key, value] of this) {
        callbackFn.apply(thisArg, [value, key, this]);
      }
    }
  }
  FormData.prototype[Symbol.iterator] = FormData.prototype.entries;
  Object.defineProperties(FormData.prototype, {
    [Symbol.toStringTag]: {
      value: "FormData",
      configurable: true
    }
  });
  function makeEntry(name, value, filename) {
    name = Buffer.from(name).toString("utf8");
    if (typeof value === "string") {
      value = Buffer.from(value).toString("utf8");
    } else {
      if (!isFileLike(value)) {
        value = value instanceof Blob2 ? new File([value], "blob", { type: value.type }) : new FileLike(value, "blob", { type: value.type });
      }
      if (filename !== void 0) {
        const options = {
          type: value.type,
          lastModified: value.lastModified
        };
        value = NativeFile && value instanceof NativeFile || value instanceof UndiciFile ? new File([value], filename, options) : new FileLike(value, filename, options);
      }
    }
    return { name, value };
  }
  formdata = { FormData };
  return formdata;
}
var body;
var hasRequiredBody;
function requireBody() {
  if (hasRequiredBody)
    return body;
  hasRequiredBody = 1;
  const Busboy = requireMain();
  const util2 = util$j;
  const {
    ReadableStreamFrom: ReadableStreamFrom2,
    isBlobLike: isBlobLike2,
    isReadableStreamLike,
    readableStreamClose,
    createDeferredPromise,
    fullyReadBody
  } = requireUtil$4();
  const { FormData } = requireFormdata();
  const { kState } = requireSymbols$3();
  const { webidl } = requireWebidl();
  const { DOMException: DOMException2, structuredClone } = requireConstants$3();
  const { Blob: Blob2, File: NativeFile } = require$$7;
  const { kBodyUsed: kBodyUsed2 } = symbols$4;
  const assert2 = require$$0$3;
  const { isErrored: isErrored2 } = util$j;
  const { isUint8Array, isArrayBuffer } = require$$5;
  const { File: UndiciFile } = requireFile();
  const { parseMIMEType, serializeAMimeType } = requireDataURL();
  let random;
  try {
    const crypto2 = require("node:crypto");
    random = (max) => crypto2.randomInt(0, max);
  } catch {
    random = (max) => Math.floor(Math.random(max));
  }
  let ReadableStream2 = globalThis.ReadableStream;
  const File = NativeFile ?? UndiciFile;
  const textEncoder = new TextEncoder();
  const textDecoder = new TextDecoder();
  function extractBody2(object, keepalive = false) {
    if (!ReadableStream2) {
      ReadableStream2 = require$$14.ReadableStream;
    }
    let stream2 = null;
    if (object instanceof ReadableStream2) {
      stream2 = object;
    } else if (isBlobLike2(object)) {
      stream2 = object.stream();
    } else {
      stream2 = new ReadableStream2({
        async pull(controller) {
          controller.enqueue(
            typeof source === "string" ? textEncoder.encode(source) : source
          );
          queueMicrotask(() => readableStreamClose(controller));
        },
        start() {
        },
        type: void 0
      });
    }
    assert2(isReadableStreamLike(stream2));
    let action = null;
    let source = null;
    let length = null;
    let type = null;
    if (typeof object === "string") {
      source = object;
      type = "text/plain;charset=UTF-8";
    } else if (object instanceof URLSearchParams) {
      source = object.toString();
      type = "application/x-www-form-urlencoded;charset=UTF-8";
    } else if (isArrayBuffer(object)) {
      source = new Uint8Array(object.slice());
    } else if (ArrayBuffer.isView(object)) {
      source = new Uint8Array(object.buffer.slice(object.byteOffset, object.byteOffset + object.byteLength));
    } else if (util2.isFormDataLike(object)) {
      const boundary = `----formdata-undici-0${`${random(1e11)}`.padStart(11, "0")}`;
      const prefix = `--${boundary}\r
Content-Disposition: form-data`;
      /*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
      const escape = (str) => str.replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
      const normalizeLinefeeds = (value) => value.replace(/\r?\n|\r/g, "\r\n");
      const blobParts = [];
      const rn = new Uint8Array([13, 10]);
      length = 0;
      let hasUnknownSizeValue = false;
      for (const [name, value] of object) {
        if (typeof value === "string") {
          const chunk2 = textEncoder.encode(prefix + `; name="${escape(normalizeLinefeeds(name))}"\r
\r
${normalizeLinefeeds(value)}\r
`);
          blobParts.push(chunk2);
          length += chunk2.byteLength;
        } else {
          const chunk2 = textEncoder.encode(`${prefix}; name="${escape(normalizeLinefeeds(name))}"` + (value.name ? `; filename="${escape(value.name)}"` : "") + `\r
Content-Type: ${value.type || "application/octet-stream"}\r
\r
`);
          blobParts.push(chunk2, value, rn);
          if (typeof value.size === "number") {
            length += chunk2.byteLength + value.size + rn.byteLength;
          } else {
            hasUnknownSizeValue = true;
          }
        }
      }
      const chunk = textEncoder.encode(`--${boundary}--`);
      blobParts.push(chunk);
      length += chunk.byteLength;
      if (hasUnknownSizeValue) {
        length = null;
      }
      source = object;
      action = async function* () {
        for (const part of blobParts) {
          if (part.stream) {
            yield* part.stream();
          } else {
            yield part;
          }
        }
      };
      type = "multipart/form-data; boundary=" + boundary;
    } else if (isBlobLike2(object)) {
      source = object;
      length = object.size;
      if (object.type) {
        type = object.type;
      }
    } else if (typeof object[Symbol.asyncIterator] === "function") {
      if (keepalive) {
        throw new TypeError("keepalive");
      }
      if (util2.isDisturbed(object) || object.locked) {
        throw new TypeError(
          "Response body object should not be disturbed or locked"
        );
      }
      stream2 = object instanceof ReadableStream2 ? object : ReadableStreamFrom2(object);
    }
    if (typeof source === "string" || util2.isBuffer(source)) {
      length = Buffer.byteLength(source);
    }
    if (action != null) {
      let iterator;
      stream2 = new ReadableStream2({
        async start() {
          iterator = action(object)[Symbol.asyncIterator]();
        },
        async pull(controller) {
          const { value, done } = await iterator.next();
          if (done) {
            queueMicrotask(() => {
              controller.close();
            });
          } else {
            if (!isErrored2(stream2)) {
              controller.enqueue(new Uint8Array(value));
            }
          }
          return controller.desiredSize > 0;
        },
        async cancel(reason) {
          await iterator.return();
        },
        type: void 0
      });
    }
    const body2 = { stream: stream2, source, length };
    return [body2, type];
  }
  function safelyExtractBody(object, keepalive = false) {
    if (!ReadableStream2) {
      ReadableStream2 = require$$14.ReadableStream;
    }
    if (object instanceof ReadableStream2) {
      assert2(!util2.isDisturbed(object), "The body has already been consumed.");
      assert2(!object.locked, "The stream is locked.");
    }
    return extractBody2(object, keepalive);
  }
  function cloneBody(body2) {
    const [out1, out2] = body2.stream.tee();
    const out2Clone = structuredClone(out2, { transfer: [out2] });
    const [, finalClone] = out2Clone.tee();
    body2.stream = out1;
    return {
      stream: finalClone,
      length: body2.length,
      source: body2.source
    };
  }
  async function* consumeBody(body2) {
    if (body2) {
      if (isUint8Array(body2)) {
        yield body2;
      } else {
        const stream2 = body2.stream;
        if (util2.isDisturbed(stream2)) {
          throw new TypeError("The body has already been consumed.");
        }
        if (stream2.locked) {
          throw new TypeError("The stream is locked.");
        }
        stream2[kBodyUsed2] = true;
        yield* stream2;
      }
    }
  }
  function throwIfAborted2(state) {
    if (state.aborted) {
      throw new DOMException2("The operation was aborted.", "AbortError");
    }
  }
  function bodyMixinMethods(instance) {
    const methods = {
      blob() {
        return specConsumeBody(this, (bytes) => {
          let mimeType = bodyMimeType(this);
          if (mimeType === "failure") {
            mimeType = "";
          } else if (mimeType) {
            mimeType = serializeAMimeType(mimeType);
          }
          return new Blob2([bytes], { type: mimeType });
        }, instance);
      },
      arrayBuffer() {
        return specConsumeBody(this, (bytes) => {
          return new Uint8Array(bytes).buffer;
        }, instance);
      },
      text() {
        return specConsumeBody(this, utf8DecodeBytes, instance);
      },
      json() {
        return specConsumeBody(this, parseJSONFromBytes, instance);
      },
      async formData() {
        webidl.brandCheck(this, instance);
        throwIfAborted2(this[kState]);
        const contentType = this.headers.get("Content-Type");
        if (/multipart\/form-data/.test(contentType)) {
          const headers2 = {};
          for (const [key, value] of this.headers)
            headers2[key.toLowerCase()] = value;
          const responseFormData = new FormData();
          let busboy;
          try {
            busboy = new Busboy({
              headers: headers2,
              preservePath: true
            });
          } catch (err) {
            throw new DOMException2(`${err}`, "AbortError");
          }
          busboy.on("field", (name, value) => {
            responseFormData.append(name, value);
          });
          busboy.on("file", (name, value, filename, encoding2, mimeType) => {
            const chunks = [];
            if (encoding2 === "base64" || encoding2.toLowerCase() === "base64") {
              let base64chunk = "";
              value.on("data", (chunk) => {
                base64chunk += chunk.toString().replace(/[\r\n]/gm, "");
                const end = base64chunk.length - base64chunk.length % 4;
                chunks.push(Buffer.from(base64chunk.slice(0, end), "base64"));
                base64chunk = base64chunk.slice(end);
              });
              value.on("end", () => {
                chunks.push(Buffer.from(base64chunk, "base64"));
                responseFormData.append(name, new File(chunks, filename, { type: mimeType }));
              });
            } else {
              value.on("data", (chunk) => {
                chunks.push(chunk);
              });
              value.on("end", () => {
                responseFormData.append(name, new File(chunks, filename, { type: mimeType }));
              });
            }
          });
          const busboyResolve = new Promise((resolve, reject) => {
            busboy.on("finish", resolve);
            busboy.on("error", (err) => reject(new TypeError(err)));
          });
          if (this.body !== null)
            for await (const chunk of consumeBody(this[kState].body))
              busboy.write(chunk);
          busboy.end();
          await busboyResolve;
          return responseFormData;
        } else if (/application\/x-www-form-urlencoded/.test(contentType)) {
          let entries;
          try {
            let text = "";
            const streamingDecoder = new TextDecoder("utf-8", { ignoreBOM: true });
            for await (const chunk of consumeBody(this[kState].body)) {
              if (!isUint8Array(chunk)) {
                throw new TypeError("Expected Uint8Array chunk");
              }
              text += streamingDecoder.decode(chunk, { stream: true });
            }
            text += streamingDecoder.decode();
            entries = new URLSearchParams(text);
          } catch (err) {
            throw Object.assign(new TypeError(), { cause: err });
          }
          const formData = new FormData();
          for (const [name, value] of entries) {
            formData.append(name, value);
          }
          return formData;
        } else {
          await Promise.resolve();
          throwIfAborted2(this[kState]);
          throw webidl.errors.exception({
            header: `${instance.name}.formData`,
            message: "Could not parse content as FormData."
          });
        }
      }
    };
    return methods;
  }
  function mixinBody(prototype) {
    Object.assign(prototype.prototype, bodyMixinMethods(prototype));
  }
  async function specConsumeBody(object, convertBytesToJSValue, instance) {
    webidl.brandCheck(object, instance);
    throwIfAborted2(object[kState]);
    if (bodyUnusable(object[kState].body)) {
      throw new TypeError("Body is unusable");
    }
    const promise = createDeferredPromise();
    const errorSteps = (error) => promise.reject(error);
    const successSteps = (data) => {
      try {
        promise.resolve(convertBytesToJSValue(data));
      } catch (e) {
        errorSteps(e);
      }
    };
    if (object[kState].body == null) {
      successSteps(new Uint8Array());
      return promise.promise;
    }
    await fullyReadBody(object[kState].body, successSteps, errorSteps);
    return promise.promise;
  }
  function bodyUnusable(body2) {
    return body2 != null && (body2.stream.locked || util2.isDisturbed(body2.stream));
  }
  function utf8DecodeBytes(buffer) {
    if (buffer.length === 0) {
      return "";
    }
    if (buffer[0] === 239 && buffer[1] === 187 && buffer[2] === 191) {
      buffer = buffer.subarray(3);
    }
    const output = textDecoder.decode(buffer);
    return output;
  }
  function parseJSONFromBytes(bytes) {
    return JSON.parse(utf8DecodeBytes(bytes));
  }
  function bodyMimeType(object) {
    const { headersList } = object[kState];
    const contentType = headersList.get("content-type");
    if (contentType === null) {
      return "failure";
    }
    return parseMIMEType(contentType);
  }
  body = {
    extractBody: extractBody2,
    safelyExtractBody,
    cloneBody,
    mixinBody
  };
  return body;
}
const {
  InvalidArgumentError: InvalidArgumentError$k,
  NotSupportedError: NotSupportedError$1
} = errors$1;
const assert$8 = require$$0$3;
const { kHTTP2BuildRequest: kHTTP2BuildRequest$1, kHTTP2CopyHeaders: kHTTP2CopyHeaders$1, kHTTP1BuildRequest: kHTTP1BuildRequest$1 } = symbols$4;
const util$h = util$j;
const tokenRegExp = /^[\^_`a-zA-Z\-0-9!#$%&'*+.|~]+$/;
const headerCharRegex = /[^\t\x20-\x7e\x80-\xff]/;
const invalidPathRegex = /[^\u0021-\u00ff]/;
const kHandler = Symbol("handler");
const channels$1 = {};
let extractBody;
try {
  const diagnosticsChannel = require("diagnostics_channel");
  channels$1.create = diagnosticsChannel.channel("undici:request:create");
  channels$1.bodySent = diagnosticsChannel.channel("undici:request:bodySent");
  channels$1.headers = diagnosticsChannel.channel("undici:request:headers");
  channels$1.trailers = diagnosticsChannel.channel("undici:request:trailers");
  channels$1.error = diagnosticsChannel.channel("undici:request:error");
} catch {
  channels$1.create = { hasSubscribers: false };
  channels$1.bodySent = { hasSubscribers: false };
  channels$1.headers = { hasSubscribers: false };
  channels$1.trailers = { hasSubscribers: false };
  channels$1.error = { hasSubscribers: false };
}
let Request$1 = class Request {
  constructor(origin, {
    path: path2,
    method,
    body: body2,
    headers: headers2,
    query,
    idempotent,
    blocking,
    upgrade: upgrade2,
    headersTimeout,
    bodyTimeout,
    reset,
    throwOnError,
    expectContinue
  }, handler) {
    if (typeof path2 !== "string") {
      throw new InvalidArgumentError$k("path must be a string");
    } else if (path2[0] !== "/" && !(path2.startsWith("http://") || path2.startsWith("https://")) && method !== "CONNECT") {
      throw new InvalidArgumentError$k("path must be an absolute URL or start with a slash");
    } else if (invalidPathRegex.exec(path2) !== null) {
      throw new InvalidArgumentError$k("invalid request path");
    }
    if (typeof method !== "string") {
      throw new InvalidArgumentError$k("method must be a string");
    } else if (tokenRegExp.exec(method) === null) {
      throw new InvalidArgumentError$k("invalid request method");
    }
    if (upgrade2 && typeof upgrade2 !== "string") {
      throw new InvalidArgumentError$k("upgrade must be a string");
    }
    if (headersTimeout != null && (!Number.isFinite(headersTimeout) || headersTimeout < 0)) {
      throw new InvalidArgumentError$k("invalid headersTimeout");
    }
    if (bodyTimeout != null && (!Number.isFinite(bodyTimeout) || bodyTimeout < 0)) {
      throw new InvalidArgumentError$k("invalid bodyTimeout");
    }
    if (reset != null && typeof reset !== "boolean") {
      throw new InvalidArgumentError$k("invalid reset");
    }
    if (expectContinue != null && typeof expectContinue !== "boolean") {
      throw new InvalidArgumentError$k("invalid expectContinue");
    }
    this.headersTimeout = headersTimeout;
    this.bodyTimeout = bodyTimeout;
    this.throwOnError = throwOnError === true;
    this.method = method;
    this.abort = null;
    if (body2 == null) {
      this.body = null;
    } else if (util$h.isStream(body2)) {
      this.body = body2;
      const rState = this.body._readableState;
      if (!rState || !rState.autoDestroy) {
        this.endHandler = function autoDestroy() {
          util$h.destroy(this);
        };
        this.body.on("end", this.endHandler);
      }
      this.errorHandler = (err) => {
        if (this.abort) {
          this.abort(err);
        } else {
          this.error = err;
        }
      };
      this.body.on("error", this.errorHandler);
    } else if (util$h.isBuffer(body2)) {
      this.body = body2.byteLength ? body2 : null;
    } else if (ArrayBuffer.isView(body2)) {
      this.body = body2.buffer.byteLength ? Buffer.from(body2.buffer, body2.byteOffset, body2.byteLength) : null;
    } else if (body2 instanceof ArrayBuffer) {
      this.body = body2.byteLength ? Buffer.from(body2) : null;
    } else if (typeof body2 === "string") {
      this.body = body2.length ? Buffer.from(body2) : null;
    } else if (util$h.isFormDataLike(body2) || util$h.isIterable(body2) || util$h.isBlobLike(body2)) {
      this.body = body2;
    } else {
      throw new InvalidArgumentError$k("body must be a string, a Buffer, a Readable stream, an iterable, or an async iterable");
    }
    this.completed = false;
    this.aborted = false;
    this.upgrade = upgrade2 || null;
    this.path = query ? util$h.buildURL(path2, query) : path2;
    this.origin = origin;
    this.idempotent = idempotent == null ? method === "HEAD" || method === "GET" : idempotent;
    this.blocking = blocking == null ? false : blocking;
    this.reset = reset == null ? null : reset;
    this.host = null;
    this.contentLength = null;
    this.contentType = null;
    this.headers = "";
    this.expectContinue = expectContinue != null ? expectContinue : false;
    if (Array.isArray(headers2)) {
      if (headers2.length % 2 !== 0) {
        throw new InvalidArgumentError$k("headers array must be even");
      }
      for (let i = 0; i < headers2.length; i += 2) {
        processHeader(this, headers2[i], headers2[i + 1]);
      }
    } else if (headers2 && typeof headers2 === "object") {
      const keys = Object.keys(headers2);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        processHeader(this, key, headers2[key]);
      }
    } else if (headers2 != null) {
      throw new InvalidArgumentError$k("headers must be an object or an array");
    }
    if (util$h.isFormDataLike(this.body)) {
      if (util$h.nodeMajor < 16 || util$h.nodeMajor === 16 && util$h.nodeMinor < 8) {
        throw new InvalidArgumentError$k("Form-Data bodies are only supported in node v16.8 and newer.");
      }
      if (!extractBody) {
        extractBody = requireBody().extractBody;
      }
      const [bodyStream, contentType] = extractBody(body2);
      if (this.contentType == null) {
        this.contentType = contentType;
        this.headers += `content-type: ${contentType}\r
`;
      }
      this.body = bodyStream.stream;
      this.contentLength = bodyStream.length;
    } else if (util$h.isBlobLike(body2) && this.contentType == null && body2.type) {
      this.contentType = body2.type;
      this.headers += `content-type: ${body2.type}\r
`;
    }
    util$h.validateHandler(handler, method, upgrade2);
    this.servername = util$h.getServerName(this.host);
    this[kHandler] = handler;
    if (channels$1.create.hasSubscribers) {
      channels$1.create.publish({ request: this });
    }
  }
  onBodySent(chunk) {
    if (this[kHandler].onBodySent) {
      try {
        return this[kHandler].onBodySent(chunk);
      } catch (err) {
        this.abort(err);
      }
    }
  }
  onRequestSent() {
    if (channels$1.bodySent.hasSubscribers) {
      channels$1.bodySent.publish({ request: this });
    }
    if (this[kHandler].onRequestSent) {
      try {
        return this[kHandler].onRequestSent();
      } catch (err) {
        this.abort(err);
      }
    }
  }
  onConnect(abort2) {
    assert$8(!this.aborted);
    assert$8(!this.completed);
    if (this.error) {
      abort2(this.error);
    } else {
      this.abort = abort2;
      return this[kHandler].onConnect(abort2);
    }
  }
  onHeaders(statusCode, headers2, resume2, statusText) {
    assert$8(!this.aborted);
    assert$8(!this.completed);
    if (channels$1.headers.hasSubscribers) {
      channels$1.headers.publish({ request: this, response: { statusCode, headers: headers2, statusText } });
    }
    try {
      return this[kHandler].onHeaders(statusCode, headers2, resume2, statusText);
    } catch (err) {
      this.abort(err);
    }
  }
  onData(chunk) {
    assert$8(!this.aborted);
    assert$8(!this.completed);
    try {
      return this[kHandler].onData(chunk);
    } catch (err) {
      this.abort(err);
      return false;
    }
  }
  onUpgrade(statusCode, headers2, socket) {
    assert$8(!this.aborted);
    assert$8(!this.completed);
    return this[kHandler].onUpgrade(statusCode, headers2, socket);
  }
  onComplete(trailers) {
    this.onFinally();
    assert$8(!this.aborted);
    this.completed = true;
    if (channels$1.trailers.hasSubscribers) {
      channels$1.trailers.publish({ request: this, trailers });
    }
    try {
      return this[kHandler].onComplete(trailers);
    } catch (err) {
      this.onError(err);
    }
  }
  onError(error) {
    this.onFinally();
    if (channels$1.error.hasSubscribers) {
      channels$1.error.publish({ request: this, error });
    }
    if (this.aborted) {
      return;
    }
    this.aborted = true;
    return this[kHandler].onError(error);
  }
  onFinally() {
    if (this.errorHandler) {
      this.body.off("error", this.errorHandler);
      this.errorHandler = null;
    }
    if (this.endHandler) {
      this.body.off("end", this.endHandler);
      this.endHandler = null;
    }
  }
  // TODO: adjust to support H2
  addHeader(key, value) {
    processHeader(this, key, value);
    return this;
  }
  static [kHTTP1BuildRequest$1](origin, opts, handler) {
    return new Request(origin, opts, handler);
  }
  static [kHTTP2BuildRequest$1](origin, opts, handler) {
    const headers2 = opts.headers;
    opts = { ...opts, headers: null };
    const request2 = new Request(origin, opts, handler);
    request2.headers = {};
    if (Array.isArray(headers2)) {
      if (headers2.length % 2 !== 0) {
        throw new InvalidArgumentError$k("headers array must be even");
      }
      for (let i = 0; i < headers2.length; i += 2) {
        processHeader(request2, headers2[i], headers2[i + 1], true);
      }
    } else if (headers2 && typeof headers2 === "object") {
      const keys = Object.keys(headers2);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        processHeader(request2, key, headers2[key], true);
      }
    } else if (headers2 != null) {
      throw new InvalidArgumentError$k("headers must be an object or an array");
    }
    return request2;
  }
  static [kHTTP2CopyHeaders$1](raw) {
    const rawHeaders = raw.split("\r\n");
    const headers2 = {};
    for (const header of rawHeaders) {
      const [key, value] = header.split(": ");
      if (value == null || value.length === 0)
        continue;
      if (headers2[key])
        headers2[key] += `,${value}`;
      else
        headers2[key] = value;
    }
    return headers2;
  }
};
function processHeaderValue(key, val, skipAppend) {
  if (val && typeof val === "object") {
    throw new InvalidArgumentError$k(`invalid ${key} header`);
  }
  val = val != null ? `${val}` : "";
  if (headerCharRegex.exec(val) !== null) {
    throw new InvalidArgumentError$k(`invalid ${key} header`);
  }
  return skipAppend ? val : `${key}: ${val}\r
`;
}
function processHeader(request2, key, val, skipAppend = false) {
  if (val && (typeof val === "object" && !Array.isArray(val))) {
    throw new InvalidArgumentError$k(`invalid ${key} header`);
  } else if (val === void 0) {
    return;
  }
  if (request2.host === null && key.length === 4 && key.toLowerCase() === "host") {
    if (headerCharRegex.exec(val) !== null) {
      throw new InvalidArgumentError$k(`invalid ${key} header`);
    }
    request2.host = val;
  } else if (request2.contentLength === null && key.length === 14 && key.toLowerCase() === "content-length") {
    request2.contentLength = parseInt(val, 10);
    if (!Number.isFinite(request2.contentLength)) {
      throw new InvalidArgumentError$k("invalid content-length header");
    }
  } else if (request2.contentType === null && key.length === 12 && key.toLowerCase() === "content-type") {
    request2.contentType = val;
    if (skipAppend)
      request2.headers[key] = processHeaderValue(key, val, skipAppend);
    else
      request2.headers += processHeaderValue(key, val);
  } else if (key.length === 17 && key.toLowerCase() === "transfer-encoding") {
    throw new InvalidArgumentError$k("invalid transfer-encoding header");
  } else if (key.length === 10 && key.toLowerCase() === "connection") {
    const value = typeof val === "string" ? val.toLowerCase() : null;
    if (value !== "close" && value !== "keep-alive") {
      throw new InvalidArgumentError$k("invalid connection header");
    } else if (value === "close") {
      request2.reset = true;
    }
  } else if (key.length === 10 && key.toLowerCase() === "keep-alive") {
    throw new InvalidArgumentError$k("invalid keep-alive header");
  } else if (key.length === 7 && key.toLowerCase() === "upgrade") {
    throw new InvalidArgumentError$k("invalid upgrade header");
  } else if (key.length === 6 && key.toLowerCase() === "expect") {
    throw new NotSupportedError$1("expect header not supported");
  } else if (tokenRegExp.exec(key) === null) {
    throw new InvalidArgumentError$k("invalid header key");
  } else {
    if (Array.isArray(val)) {
      for (let i = 0; i < val.length; i++) {
        if (skipAppend) {
          if (request2.headers[key])
            request2.headers[key] += `,${processHeaderValue(key, val[i], skipAppend)}`;
          else
            request2.headers[key] = processHeaderValue(key, val[i], skipAppend);
        } else {
          request2.headers += processHeaderValue(key, val[i]);
        }
      }
    } else {
      if (skipAppend)
        request2.headers[key] = processHeaderValue(key, val, skipAppend);
      else
        request2.headers += processHeaderValue(key, val);
    }
  }
}
var request$2 = Request$1;
const EventEmitter = require$$4;
let Dispatcher$3 = class Dispatcher extends EventEmitter {
  dispatch() {
    throw new Error("not implemented");
  }
  close() {
    throw new Error("not implemented");
  }
  destroy() {
    throw new Error("not implemented");
  }
};
var dispatcher = Dispatcher$3;
const Dispatcher$2 = dispatcher;
const {
  ClientDestroyedError: ClientDestroyedError$1,
  ClientClosedError: ClientClosedError2,
  InvalidArgumentError: InvalidArgumentError$j
} = errors$1;
const { kDestroy: kDestroy$4, kClose: kClose$6, kDispatch: kDispatch$3, kInterceptors: kInterceptors$5 } = symbols$4;
const kDestroyed = Symbol("destroyed");
const kClosed = Symbol("closed");
const kOnDestroyed = Symbol("onDestroyed");
const kOnClosed = Symbol("onClosed");
const kInterceptedDispatch = Symbol("Intercepted Dispatch");
let DispatcherBase$4 = class DispatcherBase extends Dispatcher$2 {
  constructor() {
    super();
    this[kDestroyed] = false;
    this[kOnDestroyed] = null;
    this[kClosed] = false;
    this[kOnClosed] = [];
  }
  get destroyed() {
    return this[kDestroyed];
  }
  get closed() {
    return this[kClosed];
  }
  get interceptors() {
    return this[kInterceptors$5];
  }
  set interceptors(newInterceptors) {
    if (newInterceptors) {
      for (let i = newInterceptors.length - 1; i >= 0; i--) {
        const interceptor = this[kInterceptors$5][i];
        if (typeof interceptor !== "function") {
          throw new InvalidArgumentError$j("interceptor must be an function");
        }
      }
    }
    this[kInterceptors$5] = newInterceptors;
  }
  close(callback) {
    if (callback === void 0) {
      return new Promise((resolve, reject) => {
        this.close((err, data) => {
          return err ? reject(err) : resolve(data);
        });
      });
    }
    if (typeof callback !== "function") {
      throw new InvalidArgumentError$j("invalid callback");
    }
    if (this[kDestroyed]) {
      queueMicrotask(() => callback(new ClientDestroyedError$1(), null));
      return;
    }
    if (this[kClosed]) {
      if (this[kOnClosed]) {
        this[kOnClosed].push(callback);
      } else {
        queueMicrotask(() => callback(null, null));
      }
      return;
    }
    this[kClosed] = true;
    this[kOnClosed].push(callback);
    const onClosed = () => {
      const callbacks = this[kOnClosed];
      this[kOnClosed] = null;
      for (let i = 0; i < callbacks.length; i++) {
        callbacks[i](null, null);
      }
    };
    this[kClose$6]().then(() => this.destroy()).then(() => {
      queueMicrotask(onClosed);
    });
  }
  destroy(err, callback) {
    if (typeof err === "function") {
      callback = err;
      err = null;
    }
    if (callback === void 0) {
      return new Promise((resolve, reject) => {
        this.destroy(err, (err2, data) => {
          return err2 ? (
            /* istanbul ignore next: should never error */
            reject(err2)
          ) : resolve(data);
        });
      });
    }
    if (typeof callback !== "function") {
      throw new InvalidArgumentError$j("invalid callback");
    }
    if (this[kDestroyed]) {
      if (this[kOnDestroyed]) {
        this[kOnDestroyed].push(callback);
      } else {
        queueMicrotask(() => callback(null, null));
      }
      return;
    }
    if (!err) {
      err = new ClientDestroyedError$1();
    }
    this[kDestroyed] = true;
    this[kOnDestroyed] = this[kOnDestroyed] || [];
    this[kOnDestroyed].push(callback);
    const onDestroyed = () => {
      const callbacks = this[kOnDestroyed];
      this[kOnDestroyed] = null;
      for (let i = 0; i < callbacks.length; i++) {
        callbacks[i](null, null);
      }
    };
    this[kDestroy$4](err).then(() => {
      queueMicrotask(onDestroyed);
    });
  }
  [kInterceptedDispatch](opts, handler) {
    if (!this[kInterceptors$5] || this[kInterceptors$5].length === 0) {
      this[kInterceptedDispatch] = this[kDispatch$3];
      return this[kDispatch$3](opts, handler);
    }
    let dispatch = this[kDispatch$3].bind(this);
    for (let i = this[kInterceptors$5].length - 1; i >= 0; i--) {
      dispatch = this[kInterceptors$5][i](dispatch);
    }
    this[kInterceptedDispatch] = dispatch;
    return dispatch(opts, handler);
  }
  dispatch(opts, handler) {
    if (!handler || typeof handler !== "object") {
      throw new InvalidArgumentError$j("handler must be an object");
    }
    try {
      if (!opts || typeof opts !== "object") {
        throw new InvalidArgumentError$j("opts must be an object.");
      }
      if (this[kDestroyed] || this[kOnDestroyed]) {
        throw new ClientDestroyedError$1();
      }
      if (this[kClosed]) {
        throw new ClientClosedError2();
      }
      return this[kInterceptedDispatch](opts, handler);
    } catch (err) {
      if (typeof handler.onError !== "function") {
        throw new InvalidArgumentError$j("invalid onError method");
      }
      handler.onError(err);
      return false;
    }
  }
};
var dispatcherBase = DispatcherBase$4;
const net$1 = require$$0$5;
const assert$7 = require$$0$3;
const util$g = util$j;
const { InvalidArgumentError: InvalidArgumentError$i, ConnectTimeoutError: ConnectTimeoutError2 } = errors$1;
let tls;
let SessionCache;
if (commonjsGlobal.FinalizationRegistry && !process.env.NODE_V8_COVERAGE) {
  SessionCache = class WeakSessionCache {
    constructor(maxCachedSessions) {
      this._maxCachedSessions = maxCachedSessions;
      this._sessionCache = /* @__PURE__ */ new Map();
      this._sessionRegistry = new commonjsGlobal.FinalizationRegistry((key) => {
        if (this._sessionCache.size < this._maxCachedSessions) {
          return;
        }
        const ref = this._sessionCache.get(key);
        if (ref !== void 0 && ref.deref() === void 0) {
          this._sessionCache.delete(key);
        }
      });
    }
    get(sessionKey) {
      const ref = this._sessionCache.get(sessionKey);
      return ref ? ref.deref() : null;
    }
    set(sessionKey, session) {
      if (this._maxCachedSessions === 0) {
        return;
      }
      this._sessionCache.set(sessionKey, new WeakRef(session));
      this._sessionRegistry.register(session, sessionKey);
    }
  };
} else {
  SessionCache = class SimpleSessionCache {
    constructor(maxCachedSessions) {
      this._maxCachedSessions = maxCachedSessions;
      this._sessionCache = /* @__PURE__ */ new Map();
    }
    get(sessionKey) {
      return this._sessionCache.get(sessionKey);
    }
    set(sessionKey, session) {
      if (this._maxCachedSessions === 0) {
        return;
      }
      if (this._sessionCache.size >= this._maxCachedSessions) {
        const { value: oldestKey } = this._sessionCache.keys().next();
        this._sessionCache.delete(oldestKey);
      }
      this._sessionCache.set(sessionKey, session);
    }
  };
}
function buildConnector$4({ allowH2, maxCachedSessions, socketPath, timeout, ...opts }) {
  if (maxCachedSessions != null && (!Number.isInteger(maxCachedSessions) || maxCachedSessions < 0)) {
    throw new InvalidArgumentError$i("maxCachedSessions must be a positive integer or zero");
  }
  const options = { path: socketPath, ...opts };
  const sessionCache = new SessionCache(maxCachedSessions == null ? 100 : maxCachedSessions);
  timeout = timeout == null ? 1e4 : timeout;
  allowH2 = allowH2 != null ? allowH2 : false;
  return function connect2({ hostname, host, protocol, port, servername, localAddress, httpSocket }, callback) {
    let socket;
    if (protocol === "https:") {
      if (!tls) {
        tls = require$$1;
      }
      servername = servername || options.servername || util$g.getServerName(host) || null;
      const sessionKey = servername || hostname;
      const session = sessionCache.get(sessionKey) || null;
      assert$7(sessionKey);
      socket = tls.connect({
        highWaterMark: 16384,
        // TLS in node can't have bigger HWM anyway...
        ...options,
        servername,
        session,
        localAddress,
        // TODO(HTTP/2): Add support for h2c
        ALPNProtocols: allowH2 ? ["http/1.1", "h2"] : ["http/1.1"],
        socket: httpSocket,
        // upgrade socket connection
        port: port || 443,
        host: hostname
      });
      socket.on("session", function(session2) {
        sessionCache.set(sessionKey, session2);
      });
    } else {
      assert$7(!httpSocket, "httpSocket can only be sent on TLS update");
      socket = net$1.connect({
        highWaterMark: 64 * 1024,
        // Same as nodejs fs streams.
        ...options,
        localAddress,
        port: port || 80,
        host: hostname
      });
    }
    if (options.keepAlive == null || options.keepAlive) {
      const keepAliveInitialDelay = options.keepAliveInitialDelay === void 0 ? 6e4 : options.keepAliveInitialDelay;
      socket.setKeepAlive(true, keepAliveInitialDelay);
    }
    const cancelTimeout = setupTimeout(() => onConnectTimeout(socket), timeout);
    socket.setNoDelay(true).once(protocol === "https:" ? "secureConnect" : "connect", function() {
      cancelTimeout();
      if (callback) {
        const cb = callback;
        callback = null;
        cb(null, this);
      }
    }).on("error", function(err) {
      cancelTimeout();
      if (callback) {
        const cb = callback;
        callback = null;
        cb(err);
      }
    });
    return socket;
  };
}
function setupTimeout(onConnectTimeout2, timeout) {
  if (!timeout) {
    return () => {
    };
  }
  let s1 = null;
  let s2 = null;
  const timeoutId = setTimeout(() => {
    s1 = setImmediate(() => {
      if (process.platform === "win32") {
        s2 = setImmediate(() => onConnectTimeout2());
      } else {
        onConnectTimeout2();
      }
    });
  }, timeout);
  return () => {
    clearTimeout(timeoutId);
    clearImmediate(s1);
    clearImmediate(s2);
  };
}
function onConnectTimeout(socket) {
  util$g.destroy(socket, new ConnectTimeoutError2());
}
var connect$2 = buildConnector$4;
var constants$3 = {};
var utils = {};
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils)
    return utils;
  hasRequiredUtils = 1;
  Object.defineProperty(utils, "__esModule", { value: true });
  utils.enumToMap = void 0;
  function enumToMap(obj) {
    const res = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (typeof value === "number") {
        res[key] = value;
      }
    });
    return res;
  }
  utils.enumToMap = enumToMap;
  return utils;
}
var hasRequiredConstants$2;
function requireConstants$2() {
  if (hasRequiredConstants$2)
    return constants$3;
  hasRequiredConstants$2 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SPECIAL_HEADERS = exports.HEADER_STATE = exports.MINOR = exports.MAJOR = exports.CONNECTION_TOKEN_CHARS = exports.HEADER_CHARS = exports.TOKEN = exports.STRICT_TOKEN = exports.HEX = exports.URL_CHAR = exports.STRICT_URL_CHAR = exports.USERINFO_CHARS = exports.MARK = exports.ALPHANUM = exports.NUM = exports.HEX_MAP = exports.NUM_MAP = exports.ALPHA = exports.FINISH = exports.H_METHOD_MAP = exports.METHOD_MAP = exports.METHODS_RTSP = exports.METHODS_ICE = exports.METHODS_HTTP = exports.METHODS = exports.LENIENT_FLAGS = exports.FLAGS = exports.TYPE = exports.ERROR = void 0;
    const utils_12 = requireUtils();
    (function(ERROR) {
      ERROR[ERROR["OK"] = 0] = "OK";
      ERROR[ERROR["INTERNAL"] = 1] = "INTERNAL";
      ERROR[ERROR["STRICT"] = 2] = "STRICT";
      ERROR[ERROR["LF_EXPECTED"] = 3] = "LF_EXPECTED";
      ERROR[ERROR["UNEXPECTED_CONTENT_LENGTH"] = 4] = "UNEXPECTED_CONTENT_LENGTH";
      ERROR[ERROR["CLOSED_CONNECTION"] = 5] = "CLOSED_CONNECTION";
      ERROR[ERROR["INVALID_METHOD"] = 6] = "INVALID_METHOD";
      ERROR[ERROR["INVALID_URL"] = 7] = "INVALID_URL";
      ERROR[ERROR["INVALID_CONSTANT"] = 8] = "INVALID_CONSTANT";
      ERROR[ERROR["INVALID_VERSION"] = 9] = "INVALID_VERSION";
      ERROR[ERROR["INVALID_HEADER_TOKEN"] = 10] = "INVALID_HEADER_TOKEN";
      ERROR[ERROR["INVALID_CONTENT_LENGTH"] = 11] = "INVALID_CONTENT_LENGTH";
      ERROR[ERROR["INVALID_CHUNK_SIZE"] = 12] = "INVALID_CHUNK_SIZE";
      ERROR[ERROR["INVALID_STATUS"] = 13] = "INVALID_STATUS";
      ERROR[ERROR["INVALID_EOF_STATE"] = 14] = "INVALID_EOF_STATE";
      ERROR[ERROR["INVALID_TRANSFER_ENCODING"] = 15] = "INVALID_TRANSFER_ENCODING";
      ERROR[ERROR["CB_MESSAGE_BEGIN"] = 16] = "CB_MESSAGE_BEGIN";
      ERROR[ERROR["CB_HEADERS_COMPLETE"] = 17] = "CB_HEADERS_COMPLETE";
      ERROR[ERROR["CB_MESSAGE_COMPLETE"] = 18] = "CB_MESSAGE_COMPLETE";
      ERROR[ERROR["CB_CHUNK_HEADER"] = 19] = "CB_CHUNK_HEADER";
      ERROR[ERROR["CB_CHUNK_COMPLETE"] = 20] = "CB_CHUNK_COMPLETE";
      ERROR[ERROR["PAUSED"] = 21] = "PAUSED";
      ERROR[ERROR["PAUSED_UPGRADE"] = 22] = "PAUSED_UPGRADE";
      ERROR[ERROR["PAUSED_H2_UPGRADE"] = 23] = "PAUSED_H2_UPGRADE";
      ERROR[ERROR["USER"] = 24] = "USER";
    })(exports.ERROR || (exports.ERROR = {}));
    (function(TYPE) {
      TYPE[TYPE["BOTH"] = 0] = "BOTH";
      TYPE[TYPE["REQUEST"] = 1] = "REQUEST";
      TYPE[TYPE["RESPONSE"] = 2] = "RESPONSE";
    })(exports.TYPE || (exports.TYPE = {}));
    (function(FLAGS) {
      FLAGS[FLAGS["CONNECTION_KEEP_ALIVE"] = 1] = "CONNECTION_KEEP_ALIVE";
      FLAGS[FLAGS["CONNECTION_CLOSE"] = 2] = "CONNECTION_CLOSE";
      FLAGS[FLAGS["CONNECTION_UPGRADE"] = 4] = "CONNECTION_UPGRADE";
      FLAGS[FLAGS["CHUNKED"] = 8] = "CHUNKED";
      FLAGS[FLAGS["UPGRADE"] = 16] = "UPGRADE";
      FLAGS[FLAGS["CONTENT_LENGTH"] = 32] = "CONTENT_LENGTH";
      FLAGS[FLAGS["SKIPBODY"] = 64] = "SKIPBODY";
      FLAGS[FLAGS["TRAILING"] = 128] = "TRAILING";
      FLAGS[FLAGS["TRANSFER_ENCODING"] = 512] = "TRANSFER_ENCODING";
    })(exports.FLAGS || (exports.FLAGS = {}));
    (function(LENIENT_FLAGS) {
      LENIENT_FLAGS[LENIENT_FLAGS["HEADERS"] = 1] = "HEADERS";
      LENIENT_FLAGS[LENIENT_FLAGS["CHUNKED_LENGTH"] = 2] = "CHUNKED_LENGTH";
      LENIENT_FLAGS[LENIENT_FLAGS["KEEP_ALIVE"] = 4] = "KEEP_ALIVE";
    })(exports.LENIENT_FLAGS || (exports.LENIENT_FLAGS = {}));
    var METHODS;
    (function(METHODS2) {
      METHODS2[METHODS2["DELETE"] = 0] = "DELETE";
      METHODS2[METHODS2["GET"] = 1] = "GET";
      METHODS2[METHODS2["HEAD"] = 2] = "HEAD";
      METHODS2[METHODS2["POST"] = 3] = "POST";
      METHODS2[METHODS2["PUT"] = 4] = "PUT";
      METHODS2[METHODS2["CONNECT"] = 5] = "CONNECT";
      METHODS2[METHODS2["OPTIONS"] = 6] = "OPTIONS";
      METHODS2[METHODS2["TRACE"] = 7] = "TRACE";
      METHODS2[METHODS2["COPY"] = 8] = "COPY";
      METHODS2[METHODS2["LOCK"] = 9] = "LOCK";
      METHODS2[METHODS2["MKCOL"] = 10] = "MKCOL";
      METHODS2[METHODS2["MOVE"] = 11] = "MOVE";
      METHODS2[METHODS2["PROPFIND"] = 12] = "PROPFIND";
      METHODS2[METHODS2["PROPPATCH"] = 13] = "PROPPATCH";
      METHODS2[METHODS2["SEARCH"] = 14] = "SEARCH";
      METHODS2[METHODS2["UNLOCK"] = 15] = "UNLOCK";
      METHODS2[METHODS2["BIND"] = 16] = "BIND";
      METHODS2[METHODS2["REBIND"] = 17] = "REBIND";
      METHODS2[METHODS2["UNBIND"] = 18] = "UNBIND";
      METHODS2[METHODS2["ACL"] = 19] = "ACL";
      METHODS2[METHODS2["REPORT"] = 20] = "REPORT";
      METHODS2[METHODS2["MKACTIVITY"] = 21] = "MKACTIVITY";
      METHODS2[METHODS2["CHECKOUT"] = 22] = "CHECKOUT";
      METHODS2[METHODS2["MERGE"] = 23] = "MERGE";
      METHODS2[METHODS2["M-SEARCH"] = 24] = "M-SEARCH";
      METHODS2[METHODS2["NOTIFY"] = 25] = "NOTIFY";
      METHODS2[METHODS2["SUBSCRIBE"] = 26] = "SUBSCRIBE";
      METHODS2[METHODS2["UNSUBSCRIBE"] = 27] = "UNSUBSCRIBE";
      METHODS2[METHODS2["PATCH"] = 28] = "PATCH";
      METHODS2[METHODS2["PURGE"] = 29] = "PURGE";
      METHODS2[METHODS2["MKCALENDAR"] = 30] = "MKCALENDAR";
      METHODS2[METHODS2["LINK"] = 31] = "LINK";
      METHODS2[METHODS2["UNLINK"] = 32] = "UNLINK";
      METHODS2[METHODS2["SOURCE"] = 33] = "SOURCE";
      METHODS2[METHODS2["PRI"] = 34] = "PRI";
      METHODS2[METHODS2["DESCRIBE"] = 35] = "DESCRIBE";
      METHODS2[METHODS2["ANNOUNCE"] = 36] = "ANNOUNCE";
      METHODS2[METHODS2["SETUP"] = 37] = "SETUP";
      METHODS2[METHODS2["PLAY"] = 38] = "PLAY";
      METHODS2[METHODS2["PAUSE"] = 39] = "PAUSE";
      METHODS2[METHODS2["TEARDOWN"] = 40] = "TEARDOWN";
      METHODS2[METHODS2["GET_PARAMETER"] = 41] = "GET_PARAMETER";
      METHODS2[METHODS2["SET_PARAMETER"] = 42] = "SET_PARAMETER";
      METHODS2[METHODS2["REDIRECT"] = 43] = "REDIRECT";
      METHODS2[METHODS2["RECORD"] = 44] = "RECORD";
      METHODS2[METHODS2["FLUSH"] = 45] = "FLUSH";
    })(METHODS = exports.METHODS || (exports.METHODS = {}));
    exports.METHODS_HTTP = [
      METHODS.DELETE,
      METHODS.GET,
      METHODS.HEAD,
      METHODS.POST,
      METHODS.PUT,
      METHODS.CONNECT,
      METHODS.OPTIONS,
      METHODS.TRACE,
      METHODS.COPY,
      METHODS.LOCK,
      METHODS.MKCOL,
      METHODS.MOVE,
      METHODS.PROPFIND,
      METHODS.PROPPATCH,
      METHODS.SEARCH,
      METHODS.UNLOCK,
      METHODS.BIND,
      METHODS.REBIND,
      METHODS.UNBIND,
      METHODS.ACL,
      METHODS.REPORT,
      METHODS.MKACTIVITY,
      METHODS.CHECKOUT,
      METHODS.MERGE,
      METHODS["M-SEARCH"],
      METHODS.NOTIFY,
      METHODS.SUBSCRIBE,
      METHODS.UNSUBSCRIBE,
      METHODS.PATCH,
      METHODS.PURGE,
      METHODS.MKCALENDAR,
      METHODS.LINK,
      METHODS.UNLINK,
      METHODS.PRI,
      // TODO(indutny): should we allow it with HTTP?
      METHODS.SOURCE
    ];
    exports.METHODS_ICE = [
      METHODS.SOURCE
    ];
    exports.METHODS_RTSP = [
      METHODS.OPTIONS,
      METHODS.DESCRIBE,
      METHODS.ANNOUNCE,
      METHODS.SETUP,
      METHODS.PLAY,
      METHODS.PAUSE,
      METHODS.TEARDOWN,
      METHODS.GET_PARAMETER,
      METHODS.SET_PARAMETER,
      METHODS.REDIRECT,
      METHODS.RECORD,
      METHODS.FLUSH,
      // For AirPlay
      METHODS.GET,
      METHODS.POST
    ];
    exports.METHOD_MAP = utils_12.enumToMap(METHODS);
    exports.H_METHOD_MAP = {};
    Object.keys(exports.METHOD_MAP).forEach((key) => {
      if (/^H/.test(key)) {
        exports.H_METHOD_MAP[key] = exports.METHOD_MAP[key];
      }
    });
    (function(FINISH) {
      FINISH[FINISH["SAFE"] = 0] = "SAFE";
      FINISH[FINISH["SAFE_WITH_CB"] = 1] = "SAFE_WITH_CB";
      FINISH[FINISH["UNSAFE"] = 2] = "UNSAFE";
    })(exports.FINISH || (exports.FINISH = {}));
    exports.ALPHA = [];
    for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
      exports.ALPHA.push(String.fromCharCode(i));
      exports.ALPHA.push(String.fromCharCode(i + 32));
    }
    exports.NUM_MAP = {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9
    };
    exports.HEX_MAP = {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      A: 10,
      B: 11,
      C: 12,
      D: 13,
      E: 14,
      F: 15,
      a: 10,
      b: 11,
      c: 12,
      d: 13,
      e: 14,
      f: 15
    };
    exports.NUM = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9"
    ];
    exports.ALPHANUM = exports.ALPHA.concat(exports.NUM);
    exports.MARK = ["-", "_", ".", "!", "~", "*", "'", "(", ")"];
    exports.USERINFO_CHARS = exports.ALPHANUM.concat(exports.MARK).concat(["%", ";", ":", "&", "=", "+", "$", ","]);
    exports.STRICT_URL_CHAR = [
      "!",
      '"',
      "$",
      "%",
      "&",
      "'",
      "(",
      ")",
      "*",
      "+",
      ",",
      "-",
      ".",
      "/",
      ":",
      ";",
      "<",
      "=",
      ">",
      "@",
      "[",
      "\\",
      "]",
      "^",
      "_",
      "`",
      "{",
      "|",
      "}",
      "~"
    ].concat(exports.ALPHANUM);
    exports.URL_CHAR = exports.STRICT_URL_CHAR.concat(["	", "\f"]);
    for (let i = 128; i <= 255; i++) {
      exports.URL_CHAR.push(i);
    }
    exports.HEX = exports.NUM.concat(["a", "b", "c", "d", "e", "f", "A", "B", "C", "D", "E", "F"]);
    exports.STRICT_TOKEN = [
      "!",
      "#",
      "$",
      "%",
      "&",
      "'",
      "*",
      "+",
      "-",
      ".",
      "^",
      "_",
      "`",
      "|",
      "~"
    ].concat(exports.ALPHANUM);
    exports.TOKEN = exports.STRICT_TOKEN.concat([" "]);
    exports.HEADER_CHARS = ["	"];
    for (let i = 32; i <= 255; i++) {
      if (i !== 127) {
        exports.HEADER_CHARS.push(i);
      }
    }
    exports.CONNECTION_TOKEN_CHARS = exports.HEADER_CHARS.filter((c) => c !== 44);
    exports.MAJOR = exports.NUM_MAP;
    exports.MINOR = exports.MAJOR;
    var HEADER_STATE;
    (function(HEADER_STATE2) {
      HEADER_STATE2[HEADER_STATE2["GENERAL"] = 0] = "GENERAL";
      HEADER_STATE2[HEADER_STATE2["CONNECTION"] = 1] = "CONNECTION";
      HEADER_STATE2[HEADER_STATE2["CONTENT_LENGTH"] = 2] = "CONTENT_LENGTH";
      HEADER_STATE2[HEADER_STATE2["TRANSFER_ENCODING"] = 3] = "TRANSFER_ENCODING";
      HEADER_STATE2[HEADER_STATE2["UPGRADE"] = 4] = "UPGRADE";
      HEADER_STATE2[HEADER_STATE2["CONNECTION_KEEP_ALIVE"] = 5] = "CONNECTION_KEEP_ALIVE";
      HEADER_STATE2[HEADER_STATE2["CONNECTION_CLOSE"] = 6] = "CONNECTION_CLOSE";
      HEADER_STATE2[HEADER_STATE2["CONNECTION_UPGRADE"] = 7] = "CONNECTION_UPGRADE";
      HEADER_STATE2[HEADER_STATE2["TRANSFER_ENCODING_CHUNKED"] = 8] = "TRANSFER_ENCODING_CHUNKED";
    })(HEADER_STATE = exports.HEADER_STATE || (exports.HEADER_STATE = {}));
    exports.SPECIAL_HEADERS = {
      "connection": HEADER_STATE.CONNECTION,
      "content-length": HEADER_STATE.CONTENT_LENGTH,
      "proxy-connection": HEADER_STATE.CONNECTION,
      "transfer-encoding": HEADER_STATE.TRANSFER_ENCODING,
      "upgrade": HEADER_STATE.UPGRADE
    };
  })(constants$3);
  return constants$3;
}
const util$f = util$j;
const { kBodyUsed } = symbols$4;
const assert$6 = require$$0$3;
const { InvalidArgumentError: InvalidArgumentError$h } = errors$1;
const EE = require$$4;
const redirectableStatusCodes = [300, 301, 302, 303, 307, 308];
const kBody$1 = Symbol("body");
class BodyAsyncIterable {
  constructor(body2) {
    this[kBody$1] = body2;
    this[kBodyUsed] = false;
  }
  async *[Symbol.asyncIterator]() {
    assert$6(!this[kBodyUsed], "disturbed");
    this[kBodyUsed] = true;
    yield* this[kBody$1];
  }
}
let RedirectHandler$2 = class RedirectHandler {
  constructor(dispatch, maxRedirections, opts, handler) {
    if (maxRedirections != null && (!Number.isInteger(maxRedirections) || maxRedirections < 0)) {
      throw new InvalidArgumentError$h("maxRedirections must be a positive number");
    }
    util$f.validateHandler(handler, opts.method, opts.upgrade);
    this.dispatch = dispatch;
    this.location = null;
    this.abort = null;
    this.opts = { ...opts, maxRedirections: 0 };
    this.maxRedirections = maxRedirections;
    this.handler = handler;
    this.history = [];
    if (util$f.isStream(this.opts.body)) {
      if (util$f.bodyLength(this.opts.body) === 0) {
        this.opts.body.on("data", function() {
          assert$6(false);
        });
      }
      if (typeof this.opts.body.readableDidRead !== "boolean") {
        this.opts.body[kBodyUsed] = false;
        EE.prototype.on.call(this.opts.body, "data", function() {
          this[kBodyUsed] = true;
        });
      }
    } else if (this.opts.body && typeof this.opts.body.pipeTo === "function") {
      this.opts.body = new BodyAsyncIterable(this.opts.body);
    } else if (this.opts.body && typeof this.opts.body !== "string" && !ArrayBuffer.isView(this.opts.body) && util$f.isIterable(this.opts.body)) {
      this.opts.body = new BodyAsyncIterable(this.opts.body);
    }
  }
  onConnect(abort2) {
    this.abort = abort2;
    this.handler.onConnect(abort2, { history: this.history });
  }
  onUpgrade(statusCode, headers2, socket) {
    this.handler.onUpgrade(statusCode, headers2, socket);
  }
  onError(error) {
    this.handler.onError(error);
  }
  onHeaders(statusCode, headers2, resume2, statusText) {
    this.location = this.history.length >= this.maxRedirections || util$f.isDisturbed(this.opts.body) ? null : parseLocation(statusCode, headers2);
    if (this.opts.origin) {
      this.history.push(new URL(this.opts.path, this.opts.origin));
    }
    if (!this.location) {
      return this.handler.onHeaders(statusCode, headers2, resume2, statusText);
    }
    const { origin, pathname, search } = util$f.parseURL(new URL(this.location, this.opts.origin && new URL(this.opts.path, this.opts.origin)));
    const path2 = search ? `${pathname}${search}` : pathname;
    this.opts.headers = cleanRequestHeaders(this.opts.headers, statusCode === 303, this.opts.origin !== origin);
    this.opts.path = path2;
    this.opts.origin = origin;
    this.opts.maxRedirections = 0;
    this.opts.query = null;
    if (statusCode === 303 && this.opts.method !== "HEAD") {
      this.opts.method = "GET";
      this.opts.body = null;
    }
  }
  onData(chunk) {
    if (this.location)
      ;
    else {
      return this.handler.onData(chunk);
    }
  }
  onComplete(trailers) {
    if (this.location) {
      this.location = null;
      this.abort = null;
      this.dispatch(this.opts, this);
    } else {
      this.handler.onComplete(trailers);
    }
  }
  onBodySent(chunk) {
    if (this.handler.onBodySent) {
      this.handler.onBodySent(chunk);
    }
  }
};
function parseLocation(statusCode, headers2) {
  if (redirectableStatusCodes.indexOf(statusCode) === -1) {
    return null;
  }
  for (let i = 0; i < headers2.length; i += 2) {
    if (headers2[i].toString().toLowerCase() === "location") {
      return headers2[i + 1];
    }
  }
}
function shouldRemoveHeader(header, removeContent, unknownOrigin) {
  if (header.length === 4) {
    return util$f.headerNameToString(header) === "host";
  }
  if (removeContent && util$f.headerNameToString(header).startsWith("content-")) {
    return true;
  }
  if (unknownOrigin && (header.length === 13 || header.length === 6 || header.length === 19)) {
    const name = util$f.headerNameToString(header);
    return name === "authorization" || name === "cookie" || name === "proxy-authorization";
  }
  return false;
}
function cleanRequestHeaders(headers2, removeContent, unknownOrigin) {
  const ret = [];
  if (Array.isArray(headers2)) {
    for (let i = 0; i < headers2.length; i += 2) {
      if (!shouldRemoveHeader(headers2[i], removeContent, unknownOrigin)) {
        ret.push(headers2[i], headers2[i + 1]);
      }
    }
  } else if (headers2 && typeof headers2 === "object") {
    for (const key of Object.keys(headers2)) {
      if (!shouldRemoveHeader(key, removeContent, unknownOrigin)) {
        ret.push(key, headers2[key]);
      }
    }
  } else {
    assert$6(headers2 == null, "headers must be an object or an array");
  }
  return ret;
}
var RedirectHandler_1 = RedirectHandler$2;
const RedirectHandler$1 = RedirectHandler_1;
function createRedirectInterceptor$3({ maxRedirections: defaultMaxRedirections }) {
  return (dispatch) => {
    return function Intercept(opts, handler) {
      const { maxRedirections = defaultMaxRedirections } = opts;
      if (!maxRedirections) {
        return dispatch(opts, handler);
      }
      const redirectHandler = new RedirectHandler$1(dispatch, maxRedirections, opts, handler);
      opts = { ...opts, maxRedirections: 0 };
      return dispatch(opts, redirectHandler);
    };
  };
}
var redirectInterceptor = createRedirectInterceptor$3;
var llhttpWasm;
var hasRequiredLlhttpWasm;
function requireLlhttpWasm() {
  if (hasRequiredLlhttpWasm)
    return llhttpWasm;
  hasRequiredLlhttpWasm = 1;
  llhttpWasm = "AGFzbQEAAAABMAhgAX8Bf2ADf39/AX9gBH9/f38Bf2AAAGADf39/AGABfwBgAn9/AGAGf39/f39/AALLAQgDZW52GHdhc21fb25faGVhZGVyc19jb21wbGV0ZQACA2VudhV3YXNtX29uX21lc3NhZ2VfYmVnaW4AAANlbnYLd2FzbV9vbl91cmwAAQNlbnYOd2FzbV9vbl9zdGF0dXMAAQNlbnYUd2FzbV9vbl9oZWFkZXJfZmllbGQAAQNlbnYUd2FzbV9vbl9oZWFkZXJfdmFsdWUAAQNlbnYMd2FzbV9vbl9ib2R5AAEDZW52GHdhc21fb25fbWVzc2FnZV9jb21wbGV0ZQAAA0ZFAwMEAAAFAAAAAAAABQEFAAUFBQAABgAAAAAGBgYGAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAABAQcAAAUFAwABBAUBcAESEgUDAQACBggBfwFBgNQECwfRBSIGbWVtb3J5AgALX2luaXRpYWxpemUACRlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQALbGxodHRwX2luaXQAChhsbGh0dHBfc2hvdWxkX2tlZXBfYWxpdmUAQQxsbGh0dHBfYWxsb2MADAZtYWxsb2MARgtsbGh0dHBfZnJlZQANBGZyZWUASA9sbGh0dHBfZ2V0X3R5cGUADhVsbGh0dHBfZ2V0X2h0dHBfbWFqb3IADxVsbGh0dHBfZ2V0X2h0dHBfbWlub3IAEBFsbGh0dHBfZ2V0X21ldGhvZAARFmxsaHR0cF9nZXRfc3RhdHVzX2NvZGUAEhJsbGh0dHBfZ2V0X3VwZ3JhZGUAEwxsbGh0dHBfcmVzZXQAFA5sbGh0dHBfZXhlY3V0ZQAVFGxsaHR0cF9zZXR0aW5nc19pbml0ABYNbGxodHRwX2ZpbmlzaAAXDGxsaHR0cF9wYXVzZQAYDWxsaHR0cF9yZXN1bWUAGRtsbGh0dHBfcmVzdW1lX2FmdGVyX3VwZ3JhZGUAGhBsbGh0dHBfZ2V0X2Vycm5vABsXbGxodHRwX2dldF9lcnJvcl9yZWFzb24AHBdsbGh0dHBfc2V0X2Vycm9yX3JlYXNvbgAdFGxsaHR0cF9nZXRfZXJyb3JfcG9zAB4RbGxodHRwX2Vycm5vX25hbWUAHxJsbGh0dHBfbWV0aG9kX25hbWUAIBJsbGh0dHBfc3RhdHVzX25hbWUAIRpsbGh0dHBfc2V0X2xlbmllbnRfaGVhZGVycwAiIWxsaHR0cF9zZXRfbGVuaWVudF9jaHVua2VkX2xlbmd0aAAjHWxsaHR0cF9zZXRfbGVuaWVudF9rZWVwX2FsaXZlACQkbGxodHRwX3NldF9sZW5pZW50X3RyYW5zZmVyX2VuY29kaW5nACUYbGxodHRwX21lc3NhZ2VfbmVlZHNfZW9mAD8JFwEAQQELEQECAwQFCwYHNTk3MS8tJyspCsLgAkUCAAsIABCIgICAAAsZACAAEMKAgIAAGiAAIAI2AjggACABOgAoCxwAIAAgAC8BMiAALQAuIAAQwYCAgAAQgICAgAALKgEBf0HAABDGgICAACIBEMKAgIAAGiABQYCIgIAANgI4IAEgADoAKCABCwoAIAAQyICAgAALBwAgAC0AKAsHACAALQAqCwcAIAAtACsLBwAgAC0AKQsHACAALwEyCwcAIAAtAC4LRQEEfyAAKAIYIQEgAC0ALSECIAAtACghAyAAKAI4IQQgABDCgICAABogACAENgI4IAAgAzoAKCAAIAI6AC0gACABNgIYCxEAIAAgASABIAJqEMOAgIAACxAAIABBAEHcABDMgICAABoLZwEBf0EAIQECQCAAKAIMDQACQAJAAkACQCAALQAvDgMBAAMCCyAAKAI4IgFFDQAgASgCLCIBRQ0AIAAgARGAgICAAAAiAQ0DC0EADwsQyoCAgAAACyAAQcOWgIAANgIQQQ4hAQsgAQseAAJAIAAoAgwNACAAQdGbgIAANgIQIABBFTYCDAsLFgACQCAAKAIMQRVHDQAgAEEANgIMCwsWAAJAIAAoAgxBFkcNACAAQQA2AgwLCwcAIAAoAgwLBwAgACgCEAsJACAAIAE2AhALBwAgACgCFAsiAAJAIABBJEkNABDKgICAAAALIABBAnRBoLOAgABqKAIACyIAAkAgAEEuSQ0AEMqAgIAAAAsgAEECdEGwtICAAGooAgAL7gsBAX9B66iAgAAhAQJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIABBnH9qDvQDY2IAAWFhYWFhYQIDBAVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhBgcICQoLDA0OD2FhYWFhEGFhYWFhYWFhYWFhEWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYRITFBUWFxgZGhthYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2YTc4OTphYWFhYWFhYTthYWE8YWFhYT0+P2FhYWFhYWFhQGFhQWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYUJDREVGR0hJSktMTU5PUFFSU2FhYWFhYWFhVFVWV1hZWlthXF1hYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFeYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhX2BhC0Hhp4CAAA8LQaShgIAADwtBy6yAgAAPC0H+sYCAAA8LQcCkgIAADwtBq6SAgAAPC0GNqICAAA8LQeKmgIAADwtBgLCAgAAPC0G5r4CAAA8LQdekgIAADwtB75+AgAAPC0Hhn4CAAA8LQfqfgIAADwtB8qCAgAAPC0Gor4CAAA8LQa6ygIAADwtBiLCAgAAPC0Hsp4CAAA8LQYKigIAADwtBjp2AgAAPC0HQroCAAA8LQcqjgIAADwtBxbKAgAAPC0HfnICAAA8LQdKcgIAADwtBxKCAgAAPC0HXoICAAA8LQaKfgIAADwtB7a6AgAAPC0GrsICAAA8LQdSlgIAADwtBzK6AgAAPC0H6roCAAA8LQfyrgIAADwtB0rCAgAAPC0HxnYCAAA8LQbuggIAADwtB96uAgAAPC0GQsYCAAA8LQdexgIAADwtBoq2AgAAPC0HUp4CAAA8LQeCrgIAADwtBn6yAgAAPC0HrsYCAAA8LQdWfgIAADwtByrGAgAAPC0HepYCAAA8LQdSegIAADwtB9JyAgAAPC0GnsoCAAA8LQbGdgIAADwtBoJ2AgAAPC0G5sYCAAA8LQbywgIAADwtBkqGAgAAPC0GzpoCAAA8LQemsgIAADwtBrJ6AgAAPC0HUq4CAAA8LQfemgIAADwtBgKaAgAAPC0GwoYCAAA8LQf6egIAADwtBjaOAgAAPC0GJrYCAAA8LQfeigIAADwtBoLGAgAAPC0Gun4CAAA8LQcalgIAADwtB6J6AgAAPC0GTooCAAA8LQcKvgIAADwtBw52AgAAPC0GLrICAAA8LQeGdgIAADwtBja+AgAAPC0HqoYCAAA8LQbStgIAADwtB0q+AgAAPC0HfsoCAAA8LQdKygIAADwtB8LCAgAAPC0GpooCAAA8LQfmjgIAADwtBmZ6AgAAPC0G1rICAAA8LQZuwgIAADwtBkrKAgAAPC0G2q4CAAA8LQcKigIAADwtB+LKAgAAPC0GepYCAAA8LQdCigIAADwtBup6AgAAPC0GBnoCAAA8LEMqAgIAAAAtB1qGAgAAhAQsgAQsWACAAIAAtAC1B/gFxIAFBAEdyOgAtCxkAIAAgAC0ALUH9AXEgAUEAR0EBdHI6AC0LGQAgACAALQAtQfsBcSABQQBHQQJ0cjoALQsZACAAIAAtAC1B9wFxIAFBAEdBA3RyOgAtCy4BAn9BACEDAkAgACgCOCIERQ0AIAQoAgAiBEUNACAAIAQRgICAgAAAIQMLIAMLSQECf0EAIQMCQCAAKAI4IgRFDQAgBCgCBCIERQ0AIAAgASACIAFrIAQRgYCAgAAAIgNBf0cNACAAQcaRgIAANgIQQRghAwsgAwsuAQJ/QQAhAwJAIAAoAjgiBEUNACAEKAIwIgRFDQAgACAEEYCAgIAAACEDCyADC0kBAn9BACEDAkAgACgCOCIERQ0AIAQoAggiBEUNACAAIAEgAiABayAEEYGAgIAAACIDQX9HDQAgAEH2ioCAADYCEEEYIQMLIAMLLgECf0EAIQMCQCAAKAI4IgRFDQAgBCgCNCIERQ0AIAAgBBGAgICAAAAhAwsgAwtJAQJ/QQAhAwJAIAAoAjgiBEUNACAEKAIMIgRFDQAgACABIAIgAWsgBBGBgICAAAAiA0F/Rw0AIABB7ZqAgAA2AhBBGCEDCyADCy4BAn9BACEDAkAgACgCOCIERQ0AIAQoAjgiBEUNACAAIAQRgICAgAAAIQMLIAMLSQECf0EAIQMCQCAAKAI4IgRFDQAgBCgCECIERQ0AIAAgASACIAFrIAQRgYCAgAAAIgNBf0cNACAAQZWQgIAANgIQQRghAwsgAwsuAQJ/QQAhAwJAIAAoAjgiBEUNACAEKAI8IgRFDQAgACAEEYCAgIAAACEDCyADC0kBAn9BACEDAkAgACgCOCIERQ0AIAQoAhQiBEUNACAAIAEgAiABayAEEYGAgIAAACIDQX9HDQAgAEGqm4CAADYCEEEYIQMLIAMLLgECf0EAIQMCQCAAKAI4IgRFDQAgBCgCQCIERQ0AIAAgBBGAgICAAAAhAwsgAwtJAQJ/QQAhAwJAIAAoAjgiBEUNACAEKAIYIgRFDQAgACABIAIgAWsgBBGBgICAAAAiA0F/Rw0AIABB7ZOAgAA2AhBBGCEDCyADCy4BAn9BACEDAkAgACgCOCIERQ0AIAQoAkQiBEUNACAAIAQRgICAgAAAIQMLIAMLLgECf0EAIQMCQCAAKAI4IgRFDQAgBCgCJCIERQ0AIAAgBBGAgICAAAAhAwsgAwsuAQJ/QQAhAwJAIAAoAjgiBEUNACAEKAIsIgRFDQAgACAEEYCAgIAAACEDCyADC0kBAn9BACEDAkAgACgCOCIERQ0AIAQoAigiBEUNACAAIAEgAiABayAEEYGAgIAAACIDQX9HDQAgAEH2iICAADYCEEEYIQMLIAMLLgECf0EAIQMCQCAAKAI4IgRFDQAgBCgCUCIERQ0AIAAgBBGAgICAAAAhAwsgAwtJAQJ/QQAhAwJAIAAoAjgiBEUNACAEKAIcIgRFDQAgACABIAIgAWsgBBGBgICAAAAiA0F/Rw0AIABBwpmAgAA2AhBBGCEDCyADCy4BAn9BACEDAkAgACgCOCIERQ0AIAQoAkgiBEUNACAAIAQRgICAgAAAIQMLIAMLSQECf0EAIQMCQCAAKAI4IgRFDQAgBCgCICIERQ0AIAAgASACIAFrIAQRgYCAgAAAIgNBf0cNACAAQZSUgIAANgIQQRghAwsgAwsuAQJ/QQAhAwJAIAAoAjgiBEUNACAEKAJMIgRFDQAgACAEEYCAgIAAACEDCyADCy4BAn9BACEDAkAgACgCOCIERQ0AIAQoAlQiBEUNACAAIAQRgICAgAAAIQMLIAMLLgECf0EAIQMCQCAAKAI4IgRFDQAgBCgCWCIERQ0AIAAgBBGAgICAAAAhAwsgAwtFAQF/AkACQCAALwEwQRRxQRRHDQBBASEDIAAtAChBAUYNASAALwEyQeUARiEDDAELIAAtAClBBUYhAwsgACADOgAuQQAL/gEBA39BASEDAkAgAC8BMCIEQQhxDQAgACkDIEIAUiEDCwJAAkAgAC0ALkUNAEEBIQUgAC0AKUEFRg0BQQEhBSAEQcAAcUUgA3FBAUcNAQtBACEFIARBwABxDQBBAiEFIARB//8DcSIDQQhxDQACQCADQYAEcUUNAAJAIAAtAChBAUcNACAALQAtQQpxDQBBBQ8LQQQPCwJAIANBIHENAAJAIAAtAChBAUYNACAALwEyQf//A3EiAEGcf2pB5ABJDQAgAEHMAUYNACAAQbACRg0AQQQhBSAEQShxRQ0CIANBiARxQYAERg0CC0EADwtBAEEDIAApAyBQGyEFCyAFC2IBAn9BACEBAkAgAC0AKEEBRg0AIAAvATJB//8DcSICQZx/akHkAEkNACACQcwBRg0AIAJBsAJGDQAgAC8BMCIAQcAAcQ0AQQEhASAAQYgEcUGABEYNACAAQShxRSEBCyABC6cBAQN/AkACQAJAIAAtACpFDQAgAC0AK0UNAEEAIQMgAC8BMCIEQQJxRQ0BDAILQQAhAyAALwEwIgRBAXFFDQELQQEhAyAALQAoQQFGDQAgAC8BMkH//wNxIgVBnH9qQeQASQ0AIAVBzAFGDQAgBUGwAkYNACAEQcAAcQ0AQQAhAyAEQYgEcUGABEYNACAEQShxQQBHIQMLIABBADsBMCAAQQA6AC8gAwuZAQECfwJAAkACQCAALQAqRQ0AIAAtACtFDQBBACEBIAAvATAiAkECcUUNAQwCC0EAIQEgAC8BMCICQQFxRQ0BC0EBIQEgAC0AKEEBRg0AIAAvATJB//8DcSIAQZx/akHkAEkNACAAQcwBRg0AIABBsAJGDQAgAkHAAHENAEEAIQEgAkGIBHFBgARGDQAgAkEocUEARyEBCyABC1kAIABBGGpCADcDACAAQgA3AwAgAEE4akIANwMAIABBMGpCADcDACAAQShqQgA3AwAgAEEgakIANwMAIABBEGpCADcDACAAQQhqQgA3AwAgAEHdATYCHEEAC3sBAX8CQCAAKAIMIgMNAAJAIAAoAgRFDQAgACABNgIECwJAIAAgASACEMSAgIAAIgMNACAAKAIMDwsgACADNgIcQQAhAyAAKAIEIgFFDQAgACABIAIgACgCCBGBgICAAAAiAUUNACAAIAI2AhQgACABNgIMIAEhAwsgAwvk8wEDDn8DfgR/I4CAgIAAQRBrIgMkgICAgAAgASEEIAEhBSABIQYgASEHIAEhCCABIQkgASEKIAEhCyABIQwgASENIAEhDiABIQ8CQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgACgCHCIQQX9qDt0B2gEB2QECAwQFBgcICQoLDA0O2AEPENcBERLWARMUFRYXGBkaG+AB3wEcHR7VAR8gISIjJCXUASYnKCkqKyzTAdIBLS7RAdABLzAxMjM0NTY3ODk6Ozw9Pj9AQUJDREVG2wFHSElKzwHOAUvNAUzMAU1OT1BRUlNUVVZXWFlaW1xdXl9gYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp7fH1+f4ABgQGCAYMBhAGFAYYBhwGIAYkB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QAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAQDscBAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxweHyAhIyUoP0BBREVGR0hJSktMTU9QUVJT3gNXWVtcXWBiZWZnaGlqa2xtb3BxcnN0dXZ3eHl6e3x9foABggGFAYYBhwGJAYsBjAGNAY4BjwGQAZEBlAGVAZYBlwGYAZkBmgGbAZwBnQGeAZ8BoAGhAaIBowGkAaUBpgGnAagBqQGqAasBrAGtAa4BrwGwAbEBsgGzAbQBtQG2AbcBuAG5AboBuwG8Ab0BvgG/AcABwQHCAcMBxAHFAcYBxwHIAckBygHLAcwBzQHOAc8B0AHRAdIB0wHUAdUB1gHXAdgB2QHaAdsB3AHdAd4B4AHhAeIB4wHkAeUB5gHnAegB6QHqAesB7AHtAe4B7wHwAfEB8gHzAZkCpAKwAv4C/gILIAEiBCACRw3zAUHdASEQDP8DCyABIhAgAkcN3QFBwwEhEAz+AwsgASIBIAJHDZABQfcAIRAM/QMLIAEiASACRw2GAUHvACEQDPwDCyABIgEgAkcNf0HqACEQDPsDCyABIgEgAkcNe0HoACEQDPoDCyABIgEgAkcNeEHmACEQDPkDCyABIgEgAkcNGkEYIRAM+AMLIAEiASACRw0UQRIhEAz3AwsgASIBIAJHDVlBxQAhEAz2AwsgASIBIAJHDUpBPyEQDPUDCyABIgEgAkcNSEE8IRAM9AMLIAEiASACRw1BQTEhEAzzAwsgAC0ALkEBRg3rAwyHAgsgACABIgEgAhDAgICAAEEBRw3mASAAQgA3AyAM5wELIAAgASIBIAIQtICAgAAiEA3nASABIQEM9QILAkAgASIBIAJHDQBBBiEQDPADCyAAIAFBAWoiASACELuAgIAAIhAN6AEgASEBDDELIABCADcDIEESIRAM1QMLIAEiECACRw0rQR0hEAztAwsCQCABIgEgAkYNACABQQFqIQFBECEQDNQDC0EHIRAM7AMLIABCACAAKQMgIhEgAiABIhBrrSISfSITIBMgEVYbNwMgIBEgElYiFEUN5QFBCCEQDOsDCwJAIAEiASACRg0AIABBiYCAgAA2AgggACABNgIEIAEhAUEUIRAM0gMLQQkhEAzqAwsgASEBIAApAyBQDeQBIAEhAQzyAgsCQCABIgEgAkcNAEELIRAM6QMLIAAgAUEBaiIBIAIQtoCAgAAiEA3lASABIQEM8gILIAAgASIBIAIQuICAgAAiEA3lASABIQEM8gILIAAgASIBIAIQuICAgAAiEA3mASABIQEMDQsgACABIgEgAhC6gICAACIQDecBIAEhAQzwAgsCQCABIgEgAkcNAEEPIRAM5QMLIAEtAAAiEEE7Rg0IIBBBDUcN6AEgAUEBaiEBDO8CCyAAIAEiASACELqAgIAAIhAN6AEgASEBDPICCwNAAkAgAS0AAEHwtYCAAGotAAAiEEEBRg0AIBBBAkcN6wEgACgCBCEQIABBADYCBCAAIBAgAUEBaiIBELmAgIAAIhAN6gEgASEBDPQCCyABQQFqIgEgAkcNAAtBEiEQDOIDCyAAIAEiASACELqAgIAAIhAN6QEgASEBDAoLIAEiASACRw0GQRshEAzgAwsCQCABIgEgAkcNAEEWIRAM4AMLIABBioCAgAA2AgggACABNgIEIAAgASACELiAgIAAIhAN6gEgASEBQSAhEAzGAwsCQCABIgEgAkYNAANAAkAgAS0AAEHwt4CAAGotAAAiEEECRg0AAkAgEEF/ag4E5QHsAQDrAewBCyABQQFqIQFBCCEQDMgDCyABQQFqIgEgAkcNAAtBFSEQDN8DC0EVIRAM3gMLA0ACQCABLQAAQfC5gIAAai0AACIQQQJGDQAgEEF/ag4E3gHsAeAB6wHsAQsgAUEBaiIBIAJHDQALQRghEAzdAwsCQCABIgEgAkYNACAAQYuAgIAANgIIIAAgATYCBCABIQFBByEQDMQDC0EZIRAM3AMLIAFBAWohAQwCCwJAIAEiFCACRw0AQRohEAzbAwsgFCEBAkAgFC0AAEFzag4U3QLuAu4C7gLuAu4C7gLuAu4C7gLuAu4C7gLuAu4C7gLuAu4C7gIA7gILQQAhECAAQQA2AhwgAEGvi4CAADYCECAAQQI2AgwgACAUQQFqNgIUDNoDCwJAIAEtAAAiEEE7Rg0AIBBBDUcN6AEgAUEBaiEBDOUCCyABQQFqIQELQSIhEAy/AwsCQCABIhAgAkcNAEEcIRAM2AMLQgAhESAQIQEgEC0AAEFQag435wHmAQECAwQFBgcIAAAAAAAAAAkKCwwNDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADxAREhMUAAtBHiEQDL0DC0ICIREM5QELQgMhEQzkAQtCBCERDOMBC0IFIREM4gELQgYhEQzhAQtCByERDOABC0IIIREM3wELQgkhEQzeAQtCCiERDN0BC0ILIREM3AELQgwhEQzbAQtCDSERDNoBC0IOIREM2QELQg8hEQzYAQtCCiERDNcBC0ILIREM1gELQgwhEQzVAQtCDSERDNQBC0IOIREM0wELQg8hEQzSAQtCACERAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAQLQAAQVBqDjflAeQBAAECAwQFBgfmAeYB5gHmAeYB5gHmAQgJCgsMDeYB5gHmAeYB5gHmAeYB5gHmAeYB5gHmAeYB5gHmAeYB5gHmAeYB5gHmAeYB5gHmAeYB5gEODxAREhPmAQtCAiERDOQBC0IDIREM4wELQgQhEQziAQtCBSERDOEBC0IGIREM4AELQgchEQzfAQtCCCERDN4BC0IJIREM3QELQgohEQzcAQtCCyERDNsBC0IMIREM2gELQg0hEQzZAQtCDiERDNgBC0IPIREM1wELQgohEQzWAQtCCyERDNUBC0IMIREM1AELQg0hEQzTAQtCDiERDNIBC0IPIREM0QELIABCACAAKQMgIhEgAiABIhBrrSISfSITIBMgEVYbNwMgIBEgElYiFEUN0gFBHyEQDMADCwJAIAEiASACRg0AIABBiYCAgAA2AgggACABNgIEIAEhAUEkIRAMpwMLQSAhEAy/AwsgACABIhAgAhC+gICAAEF/ag4FtgEAxQIB0QHSAQtBESEQDKQDCyAAQQE6AC8gECEBDLsDCyABIgEgAkcN0gFBJCEQDLsDCyABIg0gAkcNHkHGACEQDLoDCyAAIAEiASACELKAgIAAIhAN1AEgASEBDLUBCyABIhAgAkcNJkHQACEQDLgDCwJAIAEiASACRw0AQSghEAy4AwsgAEEANgIEIABBjICAgAA2AgggACABIAEQsYCAgAAiEA3TASABIQEM2AELAkAgASIQIAJHDQBBKSEQDLcDCyAQLQAAIgFBIEYNFCABQQlHDdMBIBBBAWohAQwVCwJAIAEiASACRg0AIAFBAWohAQwXC0EqIRAMtQMLAkAgASIQIAJHDQBBKyEQDLUDCwJAIBAtAAAiAUEJRg0AIAFBIEcN1QELIAAtACxBCEYN0wEgECEBDJEDCwJAIAEiASACRw0AQSwhEAy0AwsgAS0AAEEKRw3VASABQQFqIQEMyQILIAEiDiACRw3VAUEvIRAMsgMLA0ACQCABLQAAIhBBIEYNAAJAIBBBdmoOBADcAdwBANoBCyABIQEM4AELIAFBAWoiASACRw0AC0ExIRAMsQMLQTIhECABIhQgAkYNsAMgAiAUayAAKAIAIgFqIRUgFCABa0EDaiEWAkADQCAULQAAIhdBIHIgFyAXQb9/akH/AXFBGkkbQf8BcSABQfC7gIAAai0AAEcNAQJAIAFBA0cNAEEGIQEMlgMLIAFBAWohASAUQQFqIhQgAkcNAAsgACAVNgIADLEDCyAAQQA2AgAgFCEBDNkBC0EzIRAgASIUIAJGDa8DIAIgFGsgACgCACIBaiEVIBQgAWtBCGohFgJAA0AgFC0AACIXQSByIBcgF0G/f2pB/wFxQRpJG0H/AXEgAUH0u4CAAGotAABHDQECQCABQQhHDQBBBSEBDJUDCyABQQFqIQEgFEEBaiIUIAJHDQALIAAgFTYCAAywAwsgAEEANgIAIBQhAQzYAQtBNCEQIAEiFCACRg2uAyACIBRrIAAoAgAiAWohFSAUIAFrQQVqIRYCQANAIBQtAAAiF0EgciAXIBdBv39qQf8BcUEaSRtB/wFxIAFB0MKAgABqLQAARw0BAkAgAUEFRw0AQQchAQyUAwsgAUEBaiEBIBRBAWoiFCACRw0ACyAAIBU2AgAMrwMLIABBADYCACAUIQEM1wELAkAgASIBIAJGDQADQAJAIAEtAABBgL6AgABqLQAAIhBBAUYNACAQQQJGDQogASEBDN0BCyABQQFqIgEgAkcNAAtBMCEQDK4DC0EwIRAMrQMLAkAgASIBIAJGDQADQAJAIAEtAAAiEEEgRg0AIBBBdmoOBNkB2gHaAdkB2gELIAFBAWoiASACRw0AC0E4IRAMrQMLQTghEAysAwsDQAJAIAEtAAAiEEEgRg0AIBBBCUcNAwsgAUEBaiIBIAJHDQALQTwhEAyrAwsDQAJAIAEtAAAiEEEgRg0AAkACQCAQQXZqDgTaAQEB2gEACyAQQSxGDdsBCyABIQEMBAsgAUEBaiIBIAJHDQALQT8hEAyqAwsgASEBDNsBC0HAACEQIAEiFCACRg2oAyACIBRrIAAoAgAiAWohFiAUIAFrQQZqIRcCQANAIBQtAABBIHIgAUGAwICAAGotAABHDQEgAUEGRg2OAyABQQFqIQEgFEEBaiIUIAJHDQALIAAgFjYCAAypAwsgAEEANgIAIBQhAQtBNiEQDI4DCwJAIAEiDyACRw0AQcEAIRAMpwMLIABBjICAgAA2AgggACAPNgIEIA8hASAALQAsQX9qDgTNAdUB1wHZAYcDCyABQQFqIQEMzAELAkAgASIBIAJGDQADQAJAIAEtAAAiEEEgciAQIBBBv39qQf8BcUEaSRtB/wFxIhBBCUYNACAQQSBGDQACQAJAAkACQCAQQZ1/ag4TAAMDAwMDAwMBAwMDAwMDAwMDAgMLIAFBAWohAUExIRAMkQMLIAFBAWohAUEyIRAMkAMLIAFBAWohAUEzIRAMjwMLIAEhAQzQAQsgAUEBaiIBIAJHDQALQTUhEAylAwtBNSEQDKQDCwJAIAEiASACRg0AA0ACQCABLQAAQYC8gIAAai0AAEEBRg0AIAEhAQzTAQsgAUEBaiIBIAJHDQALQT0hEAykAwtBPSEQDKMDCyAAIAEiASACELCAgIAAIhAN1gEgASEBDAELIBBBAWohAQtBPCEQDIcDCwJAIAEiASACRw0AQcIAIRAMoAMLAkADQAJAIAEtAABBd2oOGAAC/gL+AoQD/gL+Av4C/gL+Av4C/gL+Av4C/gL+Av4C/gL+Av4C/gL+Av4CAP4CCyABQQFqIgEgAkcNAAtBwgAhEAygAwsgAUEBaiEBIAAtAC1BAXFFDb0BIAEhAQtBLCEQDIUDCyABIgEgAkcN0wFBxAAhEAydAwsDQAJAIAEtAABBkMCAgABqLQAAQQFGDQAgASEBDLcCCyABQQFqIgEgAkcNAAtBxQAhEAycAwsgDS0AACIQQSBGDbMBIBBBOkcNgQMgACgCBCEBIABBADYCBCAAIAEgDRCvgICAACIBDdABIA1BAWohAQyzAgtBxwAhECABIg0gAkYNmgMgAiANayAAKAIAIgFqIRYgDSABa0EFaiEXA0AgDS0AACIUQSByIBQgFEG/f2pB/wFxQRpJG0H/AXEgAUGQwoCAAGotAABHDYADIAFBBUYN9AIgAUEBaiEBIA1BAWoiDSACRw0ACyAAIBY2AgAMmgMLQcgAIRAgASINIAJGDZkDIAIgDWsgACgCACIBaiEWIA0gAWtBCWohFwNAIA0tAAAiFEEgciAUIBRBv39qQf8BcUEaSRtB/wFxIAFBlsKAgABqLQAARw3/AgJAIAFBCUcNAEECIQEM9QILIAFBAWohASANQQFqIg0gAkcNAAsgACAWNgIADJkDCwJAIAEiDSACRw0AQckAIRAMmQMLAkACQCANLQAAIgFBIHIgASABQb9/akH/AXFBGkkbQf8BcUGSf2oOBwCAA4ADgAOAA4ADAYADCyANQQFqIQFBPiEQDIADCyANQQFqIQFBPyEQDP8CC0HKACEQIAEiDSACRg2XAyACIA1rIAAoAgAiAWohFiANIAFrQQFqIRcDQCANLQAAIhRBIHIgFCAUQb9/akH/AXFBGkkbQf8BcSABQaDCgIAAai0AAEcN/QIgAUEBRg3wAiABQQFqIQEgDUEBaiINIAJHDQALIAAgFjYCAAyXAwtBywAhECABIg0gAkYNlgMgAiANayAAKAIAIgFqIRYgDSABa0EOaiEXA0AgDS0AACIUQSByIBQgFEG/f2pB/wFxQRpJG0H/AXEgAUGiwoCAAGotAABHDfwCIAFBDkYN8AIgAUEBaiEBIA1BAWoiDSACRw0ACyAAIBY2AgAMlgMLQcwAIRAgASINIAJGDZUDIAIgDWsgACgCACIBaiEWIA0gAWtBD2ohFwNAIA0tAAAiFEEgciAUIBRBv39qQf8BcUEaSRtB/wFxIAFBwMKAgABqLQAARw37AgJAIAFBD0cNAEEDIQEM8QILIAFBAWohASANQQFqIg0gAkcNAAsgACAWNgIADJUDC0HNACEQIAEiDSACRg2UAyACIA1rIAAoAgAiAWohFiANIAFrQQVqIRcDQCANLQAAIhRBIHIgFCAUQb9/akH/AXFBGkkbQf8BcSABQdDCgIAAai0AAEcN+gICQCABQQVHDQBBBCEBDPACCyABQQFqIQEgDUEBaiINIAJHDQALIAAgFjYCAAyUAwsCQCABIg0gAkcNAEHOACEQDJQDCwJAAkACQAJAIA0tAAAiAUEgciABIAFBv39qQf8BcUEaSRtB/wFxQZ1/ag4TAP0C/QL9Av0C/QL9Av0C/QL9Av0C/QL9AgH9Av0C/QICA/0CCyANQQFqIQFBwQAhEAz9AgsgDUEBaiEBQcIAIRAM/AILIA1BAWohAUHDACEQDPsCCyANQQFqIQFBxAAhEAz6AgsCQCABIgEgAkYNACAAQY2AgIAANgIIIAAgATYCBCABIQFBxQAhEAz6AgtBzwAhEAySAwsgECEBAkACQCAQLQAAQXZqDgQBqAKoAgCoAgsgEEEBaiEBC0EnIRAM+AILAkAgASIBIAJHDQBB0QAhEAyRAwsCQCABLQAAQSBGDQAgASEBDI0BCyABQQFqIQEgAC0ALUEBcUUNxwEgASEBDIwBCyABIhcgAkcNyAFB0gAhEAyPAwtB0wAhECABIhQgAkYNjgMgAiAUayAAKAIAIgFqIRYgFCABa0EBaiEXA0AgFC0AACABQdbCgIAAai0AAEcNzAEgAUEBRg3HASABQQFqIQEgFEEBaiIUIAJHDQALIAAgFjYCAAyOAwsCQCABIgEgAkcNAEHVACEQDI4DCyABLQAAQQpHDcwBIAFBAWohAQzHAQsCQCABIgEgAkcNAEHWACEQDI0DCwJAAkAgAS0AAEF2ag4EAM0BzQEBzQELIAFBAWohAQzHAQsgAUEBaiEBQcoAIRAM8wILIAAgASIBIAIQroCAgAAiEA3LASABIQFBzQAhEAzyAgsgAC0AKUEiRg2FAwymAgsCQCABIgEgAkcNAEHbACEQDIoDC0EAIRRBASEXQQEhFkEAIRACQAJAAkACQAJAAkACQAJAAkAgAS0AAEFQag4K1AHTAQABAgMEBQYI1QELQQIhEAwGC0EDIRAMBQtBBCEQDAQLQQUhEAwDC0EGIRAMAgtBByEQDAELQQghEAtBACEXQQAhFkEAIRQMzAELQQkhEEEBIRRBACEXQQAhFgzLAQsCQCABIgEgAkcNAEHdACEQDIkDCyABLQAAQS5HDcwBIAFBAWohAQymAgsgASIBIAJHDcwBQd8AIRAMhwMLAkAgASIBIAJGDQAgAEGOgICAADYCCCAAIAE2AgQgASEBQdAAIRAM7gILQeAAIRAMhgMLQeEAIRAgASIBIAJGDYUDIAIgAWsgACgCACIUaiEWIAEgFGtBA2ohFwNAIAEtAAAgFEHiwoCAAGotAABHDc0BIBRBA0YNzAEgFEEBaiEUIAFBAWoiASACRw0ACyAAIBY2AgAMhQMLQeIAIRAgASIBIAJGDYQDIAIgAWsgACgCACIUaiEWIAEgFGtBAmohFwNAIAEtAAAgFEHmwoCAAGotAABHDcwBIBRBAkYNzgEgFEEBaiEUIAFBAWoiASACRw0ACyAAIBY2AgAMhAMLQeMAIRAgASIBIAJGDYMDIAIgAWsgACgCACIUaiEWIAEgFGtBA2ohFwNAIAEtAAAgFEHpwoCAAGotAABHDcsBIBRBA0YNzgEgFEEBaiEUIAFBAWoiASACRw0ACyAAIBY2AgAMgwMLAkAgASIBIAJHDQBB5QAhEAyDAwsgACABQQFqIgEgAhCogICAACIQDc0BIAEhAUHWACEQDOkCCwJAIAEiASACRg0AA0ACQCABLQAAIhBBIEYNAAJAAkACQCAQQbh/ag4LAAHPAc8BzwHPAc8BzwHPAc8BAs8BCyABQQFqIQFB0gAhEAztAgsgAUEBaiEBQdMAIRAM7AILIAFBAWohAUHUACEQDOsCCyABQQFqIgEgAkcNAAtB5AAhEAyCAwtB5AAhEAyBAwsDQAJAIAEtAABB8MKAgABqLQAAIhBBAUYNACAQQX5qDgPPAdAB0QHSAQsgAUEBaiIBIAJHDQALQeYAIRAMgAMLAkAgASIBIAJGDQAgAUEBaiEBDAMLQecAIRAM/wILA0ACQCABLQAAQfDEgIAAai0AACIQQQFGDQACQCAQQX5qDgTSAdMB1AEA1QELIAEhAUHXACEQDOcCCyABQQFqIgEgAkcNAAtB6AAhEAz+AgsCQCABIgEgAkcNAEHpACEQDP4CCwJAIAEtAAAiEEF2ag4augHVAdUBvAHVAdUB1QHVAdUB1QHVAdUB1QHVAdUB1QHVAdUB1QHVAdUB1QHKAdUB1QEA0wELIAFBAWohAQtBBiEQDOMCCwNAAkAgAS0AAEHwxoCAAGotAABBAUYNACABIQEMngILIAFBAWoiASACRw0AC0HqACEQDPsCCwJAIAEiASACRg0AIAFBAWohAQwDC0HrACEQDPoCCwJAIAEiASACRw0AQewAIRAM+gILIAFBAWohAQwBCwJAIAEiASACRw0AQe0AIRAM+QILIAFBAWohAQtBBCEQDN4CCwJAIAEiFCACRw0AQe4AIRAM9wILIBQhAQJAAkACQCAULQAAQfDIgIAAai0AAEF/ag4H1AHVAdYBAJwCAQLXAQsgFEEBaiEBDAoLIBRBAWohAQzNAQtBACEQIABBADYCHCAAQZuSgIAANgIQIABBBzYCDCAAIBRBAWo2AhQM9gILAkADQAJAIAEtAABB8MiAgABqLQAAIhBBBEYNAAJAAkAgEEF/ag4H0gHTAdQB2QEABAHZAQsgASEBQdoAIRAM4AILIAFBAWohAUHcACEQDN8CCyABQQFqIgEgAkcNAAtB7wAhEAz2AgsgAUEBaiEBDMsBCwJAIAEiFCACRw0AQfAAIRAM9QILIBQtAABBL0cN1AEgFEEBaiEBDAYLAkAgASIUIAJHDQBB8QAhEAz0AgsCQCAULQAAIgFBL0cNACAUQQFqIQFB3QAhEAzbAgsgAUF2aiIEQRZLDdMBQQEgBHRBiYCAAnFFDdMBDMoCCwJAIAEiASACRg0AIAFBAWohAUHeACEQDNoCC0HyACEQDPICCwJAIAEiFCACRw0AQfQAIRAM8gILIBQhAQJAIBQtAABB8MyAgABqLQAAQX9qDgPJApQCANQBC0HhACEQDNgCCwJAIAEiFCACRg0AA0ACQCAULQAAQfDKgIAAai0AACIBQQNGDQACQCABQX9qDgLLAgDVAQsgFCEBQd8AIRAM2gILIBRBAWoiFCACRw0AC0HzACEQDPECC0HzACEQDPACCwJAIAEiASACRg0AIABBj4CAgAA2AgggACABNgIEIAEhAUHgACEQDNcCC0H1ACEQDO8CCwJAIAEiASACRw0AQfYAIRAM7wILIABBj4CAgAA2AgggACABNgIEIAEhAQtBAyEQDNQCCwNAIAEtAABBIEcNwwIgAUEBaiIBIAJHDQALQfcAIRAM7AILAkAgASIBIAJHDQBB+AAhEAzsAgsgAS0AAEEgRw3OASABQQFqIQEM7wELIAAgASIBIAIQrICAgAAiEA3OASABIQEMjgILAkAgASIEIAJHDQBB+gAhEAzqAgsgBC0AAEHMAEcN0QEgBEEBaiEBQRMhEAzPAQsCQCABIgQgAkcNAEH7ACEQDOkCCyACIARrIAAoAgAiAWohFCAEIAFrQQVqIRADQCAELQAAIAFB8M6AgABqLQAARw3QASABQQVGDc4BIAFBAWohASAEQQFqIgQgAkcNAAsgACAUNgIAQfsAIRAM6AILAkAgASIEIAJHDQBB/AAhEAzoAgsCQAJAIAQtAABBvX9qDgwA0QHRAdEB0QHRAdEB0QHRAdEB0QEB0QELIARBAWohAUHmACEQDM8CCyAEQQFqIQFB5wAhEAzOAgsCQCABIgQgAkcNAEH9ACEQDOcCCyACIARrIAAoAgAiAWohFCAEIAFrQQJqIRACQANAIAQtAAAgAUHtz4CAAGotAABHDc8BIAFBAkYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgFDYCAEH9ACEQDOcCCyAAQQA2AgAgEEEBaiEBQRAhEAzMAQsCQCABIgQgAkcNAEH+ACEQDOYCCyACIARrIAAoAgAiAWohFCAEIAFrQQVqIRACQANAIAQtAAAgAUH2zoCAAGotAABHDc4BIAFBBUYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgFDYCAEH+ACEQDOYCCyAAQQA2AgAgEEEBaiEBQRYhEAzLAQsCQCABIgQgAkcNAEH/ACEQDOUCCyACIARrIAAoAgAiAWohFCAEIAFrQQNqIRACQANAIAQtAAAgAUH8zoCAAGotAABHDc0BIAFBA0YNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgFDYCAEH/ACEQDOUCCyAAQQA2AgAgEEEBaiEBQQUhEAzKAQsCQCABIgQgAkcNAEGAASEQDOQCCyAELQAAQdkARw3LASAEQQFqIQFBCCEQDMkBCwJAIAEiBCACRw0AQYEBIRAM4wILAkACQCAELQAAQbJ/ag4DAMwBAcwBCyAEQQFqIQFB6wAhEAzKAgsgBEEBaiEBQewAIRAMyQILAkAgASIEIAJHDQBBggEhEAziAgsCQAJAIAQtAABBuH9qDggAywHLAcsBywHLAcsBAcsBCyAEQQFqIQFB6gAhEAzJAgsgBEEBaiEBQe0AIRAMyAILAkAgASIEIAJHDQBBgwEhEAzhAgsgAiAEayAAKAIAIgFqIRAgBCABa0ECaiEUAkADQCAELQAAIAFBgM+AgABqLQAARw3JASABQQJGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIBA2AgBBgwEhEAzhAgtBACEQIABBADYCACAUQQFqIQEMxgELAkAgASIEIAJHDQBBhAEhEAzgAgsgAiAEayAAKAIAIgFqIRQgBCABa0EEaiEQAkADQCAELQAAIAFBg8+AgABqLQAARw3IASABQQRGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIBQ2AgBBhAEhEAzgAgsgAEEANgIAIBBBAWohAUEjIRAMxQELAkAgASIEIAJHDQBBhQEhEAzfAgsCQAJAIAQtAABBtH9qDggAyAHIAcgByAHIAcgBAcgBCyAEQQFqIQFB7wAhEAzGAgsgBEEBaiEBQfAAIRAMxQILAkAgASIEIAJHDQBBhgEhEAzeAgsgBC0AAEHFAEcNxQEgBEEBaiEBDIMCCwJAIAEiBCACRw0AQYcBIRAM3QILIAIgBGsgACgCACIBaiEUIAQgAWtBA2ohEAJAA0AgBC0AACABQYjPgIAAai0AAEcNxQEgAUEDRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAUNgIAQYcBIRAM3QILIABBADYCACAQQQFqIQFBLSEQDMIBCwJAIAEiBCACRw0AQYgBIRAM3AILIAIgBGsgACgCACIBaiEUIAQgAWtBCGohEAJAA0AgBC0AACABQdDPgIAAai0AAEcNxAEgAUEIRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAUNgIAQYgBIRAM3AILIABBADYCACAQQQFqIQFBKSEQDMEBCwJAIAEiASACRw0AQYkBIRAM2wILQQEhECABLQAAQd8ARw3AASABQQFqIQEMgQILAkAgASIEIAJHDQBBigEhEAzaAgsgAiAEayAAKAIAIgFqIRQgBCABa0EBaiEQA0AgBC0AACABQYzPgIAAai0AAEcNwQEgAUEBRg2vAiABQQFqIQEgBEEBaiIEIAJHDQALIAAgFDYCAEGKASEQDNkCCwJAIAEiBCACRw0AQYsBIRAM2QILIAIgBGsgACgCACIBaiEUIAQgAWtBAmohEAJAA0AgBC0AACABQY7PgIAAai0AAEcNwQEgAUECRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAUNgIAQYsBIRAM2QILIABBADYCACAQQQFqIQFBAiEQDL4BCwJAIAEiBCACRw0AQYwBIRAM2AILIAIgBGsgACgCACIBaiEUIAQgAWtBAWohEAJAA0AgBC0AACABQfDPgIAAai0AAEcNwAEgAUEBRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAUNgIAQYwBIRAM2AILIABBADYCACAQQQFqIQFBHyEQDL0BCwJAIAEiBCACRw0AQY0BIRAM1wILIAIgBGsgACgCACIBaiEUIAQgAWtBAWohEAJAA0AgBC0AACABQfLPgIAAai0AAEcNvwEgAUEBRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAUNgIAQY0BIRAM1wILIABBADYCACAQQQFqIQFBCSEQDLwBCwJAIAEiBCACRw0AQY4BIRAM1gILAkACQCAELQAAQbd/ag4HAL8BvwG/Ab8BvwEBvwELIARBAWohAUH4ACEQDL0CCyAEQQFqIQFB+QAhEAy8AgsCQCABIgQgAkcNAEGPASEQDNUCCyACIARrIAAoAgAiAWohFCAEIAFrQQVqIRACQANAIAQtAAAgAUGRz4CAAGotAABHDb0BIAFBBUYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgFDYCAEGPASEQDNUCCyAAQQA2AgAgEEEBaiEBQRghEAy6AQsCQCABIgQgAkcNAEGQASEQDNQCCyACIARrIAAoAgAiAWohFCAEIAFrQQJqIRACQANAIAQtAAAgAUGXz4CAAGotAABHDbwBIAFBAkYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgFDYCAEGQASEQDNQCCyAAQQA2AgAgEEEBaiEBQRchEAy5AQsCQCABIgQgAkcNAEGRASEQDNMCCyACIARrIAAoAgAiAWohFCAEIAFrQQZqIRACQANAIAQtAAAgAUGaz4CAAGotAABHDbsBIAFBBkYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgFDYCAEGRASEQDNMCCyAAQQA2AgAgEEEBaiEBQRUhEAy4AQsCQCABIgQgAkcNAEGSASEQDNICCyACIARrIAAoAgAiAWohFCAEIAFrQQVqIRACQANAIAQtAAAgAUGhz4CAAGotAABHDboBIAFBBUYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgFDYCAEGSASEQDNICCyAAQQA2AgAgEEEBaiEBQR4hEAy3AQsCQCABIgQgAkcNAEGTASEQDNECCyAELQAAQcwARw24ASAEQQFqIQFBCiEQDLYBCwJAIAQgAkcNAEGUASEQDNACCwJAAkAgBC0AAEG/f2oODwC5AbkBuQG5AbkBuQG5AbkBuQG5AbkBuQG5AQG5AQsgBEEBaiEBQf4AIRAMtwILIARBAWohAUH/ACEQDLYCCwJAIAQgAkcNAEGVASEQDM8CCwJAAkAgBC0AAEG/f2oOAwC4AQG4AQsgBEEBaiEBQf0AIRAMtgILIARBAWohBEGAASEQDLUCCwJAIAQgAkcNAEGWASEQDM4CCyACIARrIAAoAgAiAWohFCAEIAFrQQFqIRACQANAIAQtAAAgAUGnz4CAAGotAABHDbYBIAFBAUYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgFDYCAEGWASEQDM4CCyAAQQA2AgAgEEEBaiEBQQshEAyzAQsCQCAEIAJHDQBBlwEhEAzNAgsCQAJAAkACQCAELQAAQVNqDiMAuAG4AbgBuAG4AbgBuAG4AbgBuAG4AbgBuAG4AbgBuAG4AbgBuAG4AbgBuAG4AQG4AbgBuAG4AbgBArgBuAG4AQO4AQsgBEEBaiEBQfsAIRAMtgILIARBAWohAUH8ACEQDLUCCyAEQQFqIQRBgQEhEAy0AgsgBEEBaiEEQYIBIRAMswILAkAgBCACRw0AQZgBIRAMzAILIAIgBGsgACgCACIBaiEUIAQgAWtBBGohEAJAA0AgBC0AACABQanPgIAAai0AAEcNtAEgAUEERg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAUNgIAQZgBIRAMzAILIABBADYCACAQQQFqIQFBGSEQDLEBCwJAIAQgAkcNAEGZASEQDMsCCyACIARrIAAoAgAiAWohFCAEIAFrQQVqIRACQANAIAQtAAAgAUGuz4CAAGotAABHDbMBIAFBBUYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgFDYCAEGZASEQDMsCCyAAQQA2AgAgEEEBaiEBQQYhEAywAQsCQCAEIAJHDQBBmgEhEAzKAgsgAiAEayAAKAIAIgFqIRQgBCABa0EBaiEQAkADQCAELQAAIAFBtM+AgABqLQAARw2yASABQQFGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIBQ2AgBBmgEhEAzKAgsgAEEANgIAIBBBAWohAUEcIRAMrwELAkAgBCACRw0AQZsBIRAMyQILIAIgBGsgACgCACIBaiEUIAQgAWtBAWohEAJAA0AgBC0AACABQbbPgIAAai0AAEcNsQEgAUEBRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAUNgIAQZsBIRAMyQILIABBADYCACAQQQFqIQFBJyEQDK4BCwJAIAQgAkcNAEGcASEQDMgCCwJAAkAgBC0AAEGsf2oOAgABsQELIARBAWohBEGGASEQDK8CCyAEQQFqIQRBhwEhEAyuAgsCQCAEIAJHDQBBnQEhEAzHAgsgAiAEayAAKAIAIgFqIRQgBCABa0EBaiEQAkADQCAELQAAIAFBuM+AgABqLQAARw2vASABQQFGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIBQ2AgBBnQEhEAzHAgsgAEEANgIAIBBBAWohAUEmIRAMrAELAkAgBCACRw0AQZ4BIRAMxgILIAIgBGsgACgCACIBaiEUIAQgAWtBAWohEAJAA0AgBC0AACABQbrPgIAAai0AAEcNrgEgAUEBRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAUNgIAQZ4BIRAMxgILIABBADYCACAQQQFqIQFBAyEQDKsBCwJAIAQgAkcNAEGfASEQDMUCCyACIARrIAAoAgAiAWohFCAEIAFrQQJqIRACQANAIAQtAAAgAUHtz4CAAGotAABHDa0BIAFBAkYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgFDYCAEGfASEQDMUCCyAAQQA2AgAgEEEBaiEBQQwhEAyqAQsCQCAEIAJHDQBBoAEhEAzEAgsgAiAEayAAKAIAIgFqIRQgBCABa0EDaiEQAkADQCAELQAAIAFBvM+AgABqLQAARw2sASABQQNGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIBQ2AgBBoAEhEAzEAgsgAEEANgIAIBBBAWohAUENIRAMqQELAkAgBCACRw0AQaEBIRAMwwILAkACQCAELQAAQbp/ag4LAKwBrAGsAawBrAGsAawBrAGsAQGsAQsgBEEBaiEEQYsBIRAMqgILIARBAWohBEGMASEQDKkCCwJAIAQgAkcNAEGiASEQDMICCyAELQAAQdAARw2pASAEQQFqIQQM6QELAkAgBCACRw0AQaMBIRAMwQILAkACQCAELQAAQbd/ag4HAaoBqgGqAaoBqgEAqgELIARBAWohBEGOASEQDKgCCyAEQQFqIQFBIiEQDKYBCwJAIAQgAkcNAEGkASEQDMACCyACIARrIAAoAgAiAWohFCAEIAFrQQFqIRACQANAIAQtAAAgAUHAz4CAAGotAABHDagBIAFBAUYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgFDYCAEGkASEQDMACCyAAQQA2AgAgEEEBaiEBQR0hEAylAQsCQCAEIAJHDQBBpQEhEAy/AgsCQAJAIAQtAABBrn9qDgMAqAEBqAELIARBAWohBEGQASEQDKYCCyAEQQFqIQFBBCEQDKQBCwJAIAQgAkcNAEGmASEQDL4CCwJAAkACQAJAAkAgBC0AAEG/f2oOFQCqAaoBqgGqAaoBqgGqAaoBqgGqAQGqAaoBAqoBqgEDqgGqAQSqAQsgBEEBaiEEQYgBIRAMqAILIARBAWohBEGJASEQDKcCCyAEQQFqIQRBigEhEAymAgsgBEEBaiEEQY8BIRAMpQILIARBAWohBEGRASEQDKQCCwJAIAQgAkcNAEGnASEQDL0CCyACIARrIAAoAgAiAWohFCAEIAFrQQJqIRACQANAIAQtAAAgAUHtz4CAAGotAABHDaUBIAFBAkYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgFDYCAEGnASEQDL0CCyAAQQA2AgAgEEEBaiEBQREhEAyiAQsCQCAEIAJHDQBBqAEhEAy8AgsgAiAEayAAKAIAIgFqIRQgBCABa0ECaiEQAkADQCAELQAAIAFBws+AgABqLQAARw2kASABQQJGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIBQ2AgBBqAEhEAy8AgsgAEEANgIAIBBBAWohAUEsIRAMoQELAkAgBCACRw0AQakBIRAMuwILIAIgBGsgACgCACIBaiEUIAQgAWtBBGohEAJAA0AgBC0AACABQcXPgIAAai0AAEcNowEgAUEERg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAUNgIAQakBIRAMuwILIABBADYCACAQQQFqIQFBKyEQDKABCwJAIAQgAkcNAEGqASEQDLoCCyACIARrIAAoAgAiAWohFCAEIAFrQQJqIRACQANAIAQtAAAgAUHKz4CAAGotAABHDaIBIAFBAkYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgFDYCAEGqASEQDLoCCyAAQQA2AgAgEEEBaiEBQRQhEAyfAQsCQCAEIAJHDQBBqwEhEAy5AgsCQAJAAkACQCAELQAAQb5/ag4PAAECpAGkAaQBpAGkAaQBpAGkAaQBpAGkAQOkAQsgBEEBaiEEQZMBIRAMogILIARBAWohBEGUASEQDKECCyAEQQFqIQRBlQEhEAygAgsgBEEBaiEEQZYBIRAMnwILAkAgBCACRw0AQawBIRAMuAILIAQtAABBxQBHDZ8BIARBAWohBAzgAQsCQCAEIAJHDQBBrQEhEAy3AgsgAiAEayAAKAIAIgFqIRQgBCABa0ECaiEQAkADQCAELQAAIAFBzc+AgABqLQAARw2fASABQQJGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIBQ2AgBBrQEhEAy3AgsgAEEANgIAIBBBAWohAUEOIRAMnAELAkAgBCACRw0AQa4BIRAMtgILIAQtAABB0ABHDZ0BIARBAWohAUElIRAMmwELAkAgBCACRw0AQa8BIRAMtQILIAIgBGsgACgCACIBaiEUIAQgAWtBCGohEAJAA0AgBC0AACABQdDPgIAAai0AAEcNnQEgAUEIRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAUNgIAQa8BIRAMtQILIABBADYCACAQQQFqIQFBKiEQDJoBCwJAIAQgAkcNAEGwASEQDLQCCwJAAkAgBC0AAEGrf2oOCwCdAZ0BnQGdAZ0BnQGdAZ0BnQEBnQELIARBAWohBEGaASEQDJsCCyAEQQFqIQRBmwEhEAyaAgsCQCAEIAJHDQBBsQEhEAyzAgsCQAJAIAQtAABBv39qDhQAnAGcAZwBnAGcAZwBnAGcAZwBnAGcAZwBnAGcAZwBnAGcAZwBAZwBCyAEQQFqIQRBmQEhEAyaAgsgBEEBaiEEQZwBIRAMmQILAkAgBCACRw0AQbIBIRAMsgILIAIgBGsgACgCACIBaiEUIAQgAWtBA2ohEAJAA0AgBC0AACABQdnPgIAAai0AAEcNmgEgAUEDRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAUNgIAQbIBIRAMsgILIABBADYCACAQQQFqIQFBISEQDJcBCwJAIAQgAkcNAEGzASEQDLECCyACIARrIAAoAgAiAWohFCAEIAFrQQZqIRACQANAIAQtAAAgAUHdz4CAAGotAABHDZkBIAFBBkYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgFDYCAEGzASEQDLECCyAAQQA2AgAgEEEBaiEBQRohEAyWAQsCQCAEIAJHDQBBtAEhEAywAgsCQAJAAkAgBC0AAEG7f2oOEQCaAZoBmgGaAZoBmgGaAZoBmgEBmgGaAZoBmgGaAQKaAQsgBEEBaiEEQZ0BIRAMmAILIARBAWohBEGeASEQDJcCCyAEQQFqIQRBnwEhEAyWAgsCQCAEIAJHDQBBtQEhEAyvAgsgAiAEayAAKAIAIgFqIRQgBCABa0EFaiEQAkADQCAELQAAIAFB5M+AgABqLQAARw2XASABQQVGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIBQ2AgBBtQEhEAyvAgsgAEEANgIAIBBBAWohAUEoIRAMlAELAkAgBCACRw0AQbYBIRAMrgILIAIgBGsgACgCACIBaiEUIAQgAWtBAmohEAJAA0AgBC0AACABQerPgIAAai0AAEcNlgEgAUECRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAUNgIAQbYBIRAMrgILIABBADYCACAQQQFqIQFBByEQDJMBCwJAIAQgAkcNAEG3ASEQDK0CCwJAAkAgBC0AAEG7f2oODgCWAZYBlgGWAZYBlgGWAZYBlgGWAZYBlgEBlgELIARBAWohBEGhASEQDJQCCyAEQQFqIQRBogEhEAyTAgsCQCAEIAJHDQBBuAEhEAysAgsgAiAEayAAKAIAIgFqIRQgBCABa0ECaiEQAkADQCAELQAAIAFB7c+AgABqLQAARw2UASABQQJGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAIBQ2AgBBuAEhEAysAgsgAEEANgIAIBBBAWohAUESIRAMkQELAkAgBCACRw0AQbkBIRAMqwILIAIgBGsgACgCACIBaiEUIAQgAWtBAWohEAJAA0AgBC0AACABQfDPgIAAai0AAEcNkwEgAUEBRg0BIAFBAWohASAEQQFqIgQgAkcNAAsgACAUNgIAQbkBIRAMqwILIABBADYCACAQQQFqIQFBICEQDJABCwJAIAQgAkcNAEG6ASEQDKoCCyACIARrIAAoAgAiAWohFCAEIAFrQQFqIRACQANAIAQtAAAgAUHyz4CAAGotAABHDZIBIAFBAUYNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgFDYCAEG6ASEQDKoCCyAAQQA2AgAgEEEBaiEBQQ8hEAyPAQsCQCAEIAJHDQBBuwEhEAypAgsCQAJAIAQtAABBt39qDgcAkgGSAZIBkgGSAQGSAQsgBEEBaiEEQaUBIRAMkAILIARBAWohBEGmASEQDI8CCwJAIAQgAkcNAEG8ASEQDKgCCyACIARrIAAoAgAiAWohFCAEIAFrQQdqIRACQANAIAQtAAAgAUH0z4CAAGotAABHDZABIAFBB0YNASABQQFqIQEgBEEBaiIEIAJHDQALIAAgFDYCAEG8ASEQDKgCCyAAQQA2AgAgEEEBaiEBQRshEAyNAQsCQCAEIAJHDQBBvQEhEAynAgsCQAJAAkAgBC0AAEG+f2oOEgCRAZEBkQGRAZEBkQGRAZEBkQEBkQGRAZEBkQGRAZEBApEBCyAEQQFqIQRBpAEhEAyPAgsgBEEBaiEEQacBIRAMjgILIARBAWohBEGoASEQDI0CCwJAIAQgAkcNAEG+ASEQDKYCCyAELQAAQc4ARw2NASAEQQFqIQQMzwELAkAgBCACRw0AQb8BIRAMpQILAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgBC0AAEG/f2oOFQABAgOcAQQFBpwBnAGcAQcICQoLnAEMDQ4PnAELIARBAWohAUHoACEQDJoCCyAEQQFqIQFB6QAhEAyZAgsgBEEBaiEBQe4AIRAMmAILIARBAWohAUHyACEQDJcCCyAEQQFqIQFB8wAhEAyWAgsgBEEBaiEBQfYAIRAMlQILIARBAWohAUH3ACEQDJQCCyAEQQFqIQFB+gAhEAyTAgsgBEEBaiEEQYMBIRAMkgILIARBAWohBEGEASEQDJECCyAEQQFqIQRBhQEhEAyQAgsgBEEBaiEEQZIBIRAMjwILIARBAWohBEGYASEQDI4CCyAEQQFqIQRBoAEhEAyNAgsgBEEBaiEEQaMBIRAMjAILIARBAWohBEGqASEQDIsCCwJAIAQgAkYNACAAQZCAgIAANgIIIAAgBDYCBEGrASEQDIsCC0HAASEQDKMCCyAAIAUgAhCqgICAACIBDYsBIAUhAQxcCwJAIAYgAkYNACAGQQFqIQUMjQELQcIBIRAMoQILA0ACQCAQLQAAQXZqDgSMAQAAjwEACyAQQQFqIhAgAkcNAAtBwwEhEAygAgsCQCAHIAJGDQAgAEGRgICAADYCCCAAIAc2AgQgByEBQQEhEAyHAgtBxAEhEAyfAgsCQCAHIAJHDQBBxQEhEAyfAgsCQAJAIActAABBdmoOBAHOAc4BAM4BCyAHQQFqIQYMjQELIAdBAWohBQyJAQsCQCAHIAJHDQBBxgEhEAyeAgsCQAJAIActAABBdmoOFwGPAY8BAY8BjwGPAY8BjwGPAY8BjwGPAY8BjwGPAY8BjwGPAY8BjwGPAQCPAQsgB0EBaiEHC0GwASEQDIQCCwJAIAggAkcNAEHIASEQDJ0CCyAILQAAQSBHDY0BIABBADsBMiAIQQFqIQFBswEhEAyDAgsgASEXAkADQCAXIgcgAkYNASAHLQAAQVBqQf8BcSIQQQpPDcwBAkAgAC8BMiIUQZkzSw0AIAAgFEEKbCIUOwEyIBBB//8DcyAUQf7/A3FJDQAgB0EBaiEXIAAgFCAQaiIQOwEyIBBB//8DcUHoB0kNAQsLQQAhECAAQQA2AhwgAEHBiYCAADYCECAAQQ02AgwgACAHQQFqNgIUDJwCC0HHASEQDJsCCyAAIAggAhCugICAACIQRQ3KASAQQRVHDYwBIABByAE2AhwgACAINgIUIABByZeAgAA2AhAgAEEVNgIMQQAhEAyaAgsCQCAJIAJHDQBBzAEhEAyaAgtBACEUQQEhF0EBIRZBACEQAkACQAJAAkACQAJAAkACQAJAIAktAABBUGoOCpYBlQEAAQIDBAUGCJcBC0ECIRAMBgtBAyEQDAULQQQhEAwEC0EFIRAMAwtBBiEQDAILQQchEAwBC0EIIRALQQAhF0EAIRZBACEUDI4BC0EJIRBBASEUQQAhF0EAIRYMjQELAkAgCiACRw0AQc4BIRAMmQILIAotAABBLkcNjgEgCkEBaiEJDMoBCyALIAJHDY4BQdABIRAMlwILAkAgCyACRg0AIABBjoCAgAA2AgggACALNgIEQbcBIRAM/gELQdEBIRAMlgILAkAgBCACRw0AQdIBIRAMlgILIAIgBGsgACgCACIQaiEUIAQgEGtBBGohCwNAIAQtAAAgEEH8z4CAAGotAABHDY4BIBBBBEYN6QEgEEEBaiEQIARBAWoiBCACRw0ACyAAIBQ2AgBB0gEhEAyVAgsgACAMIAIQrICAgAAiAQ2NASAMIQEMuAELAkAgBCACRw0AQdQBIRAMlAILIAIgBGsgACgCACIQaiEUIAQgEGtBAWohDANAIAQtAAAgEEGB0ICAAGotAABHDY8BIBBBAUYNjgEgEEEBaiEQIARBAWoiBCACRw0ACyAAIBQ2AgBB1AEhEAyTAgsCQCAEIAJHDQBB1gEhEAyTAgsgAiAEayAAKAIAIhBqIRQgBCAQa0ECaiELA0AgBC0AACAQQYPQgIAAai0AAEcNjgEgEEECRg2QASAQQQFqIRAgBEEBaiIEIAJHDQALIAAgFDYCAEHWASEQDJICCwJAIAQgAkcNAEHXASEQDJICCwJAAkAgBC0AAEG7f2oOEACPAY8BjwGPAY8BjwGPAY8BjwGPAY8BjwGPAY8BAY8BCyAEQQFqIQRBuwEhEAz5AQsgBEEBaiEEQbwBIRAM+AELAkAgBCACRw0AQdgBIRAMkQILIAQtAABByABHDYwBIARBAWohBAzEAQsCQCAEIAJGDQAgAEGQgICAADYCCCAAIAQ2AgRBvgEhEAz3AQtB2QEhEAyPAgsCQCAEIAJHDQBB2gEhEAyPAgsgBC0AAEHIAEYNwwEgAEEBOgAoDLkBCyAAQQI6AC8gACAEIAIQpoCAgAAiEA2NAUHCASEQDPQBCyAALQAoQX9qDgK3AbkBuAELA0ACQCAELQAAQXZqDgQAjgGOAQCOAQsgBEEBaiIEIAJHDQALQd0BIRAMiwILIABBADoALyAALQAtQQRxRQ2EAgsgAEEAOgAvIABBAToANCABIQEMjAELIBBBFUYN2gEgAEEANgIcIAAgATYCFCAAQaeOgIAANgIQIABBEjYCDEEAIRAMiAILAkAgACAQIAIQtICAgAAiBA0AIBAhAQyBAgsCQCAEQRVHDQAgAEEDNgIcIAAgEDYCFCAAQbCYgIAANgIQIABBFTYCDEEAIRAMiAILIABBADYCHCAAIBA2AhQgAEGnjoCAADYCECAAQRI2AgxBACEQDIcCCyAQQRVGDdYBIABBADYCHCAAIAE2AhQgAEHajYCAADYCECAAQRQ2AgxBACEQDIYCCyAAKAIEIRcgAEEANgIEIBAgEadqIhYhASAAIBcgECAWIBQbIhAQtYCAgAAiFEUNjQEgAEEHNgIcIAAgEDYCFCAAIBQ2AgxBACEQDIUCCyAAIAAvATBBgAFyOwEwIAEhAQtBKiEQDOoBCyAQQRVGDdEBIABBADYCHCAAIAE2AhQgAEGDjICAADYCECAAQRM2AgxBACEQDIICCyAQQRVGDc8BIABBADYCHCAAIAE2AhQgAEGaj4CAADYCECAAQSI2AgxBACEQDIECCyAAKAIEIRAgAEEANgIEAkAgACAQIAEQt4CAgAAiEA0AIAFBAWohAQyNAQsgAEEMNgIcIAAgEDYCDCAAIAFBAWo2AhRBACEQDIACCyAQQRVGDcwBIABBADYCHCAAIAE2AhQgAEGaj4CAADYCECAAQSI2AgxBACEQDP8BCyAAKAIEIRAgAEEANgIEAkAgACAQIAEQt4CAgAAiEA0AIAFBAWohAQyMAQsgAEENNgIcIAAgEDYCDCAAIAFBAWo2AhRBACEQDP4BCyAQQRVGDckBIABBADYCHCAAIAE2AhQgAEHGjICAADYCECAAQSM2AgxBACEQDP0BCyAAKAIEIRAgAEEANgIEAkAgACAQIAEQuYCAgAAiEA0AIAFBAWohAQyLAQsgAEEONgIcIAAgEDYCDCAAIAFBAWo2AhRBACEQDPwBCyAAQQA2AhwgACABNgIUIABBwJWAgAA2AhAgAEECNgIMQQAhEAz7AQsgEEEVRg3FASAAQQA2AhwgACABNgIUIABBxoyAgAA2AhAgAEEjNgIMQQAhEAz6AQsgAEEQNgIcIAAgATYCFCAAIBA2AgxBACEQDPkBCyAAKAIEIQQgAEEANgIEAkAgACAEIAEQuYCAgAAiBA0AIAFBAWohAQzxAQsgAEERNgIcIAAgBDYCDCAAIAFBAWo2AhRBACEQDPgBCyAQQRVGDcEBIABBADYCHCAAIAE2AhQgAEHGjICAADYCECAAQSM2AgxBACEQDPcBCyAAKAIEIRAgAEEANgIEAkAgACAQIAEQuYCAgAAiEA0AIAFBAWohAQyIAQsgAEETNgIcIAAgEDYCDCAAIAFBAWo2AhRBACEQDPYBCyAAKAIEIQQgAEEANgIEAkAgACAEIAEQuYCAgAAiBA0AIAFBAWohAQztAQsgAEEUNgIcIAAgBDYCDCAAIAFBAWo2AhRBACEQDPUBCyAQQRVGDb0BIABBADYCHCAAIAE2AhQgAEGaj4CAADYCECAAQSI2AgxBACEQDPQBCyAAKAIEIRAgAEEANgIEAkAgACAQIAEQt4CAgAAiEA0AIAFBAWohAQyGAQsgAEEWNgIcIAAgEDYCDCAAIAFBAWo2AhRBACEQDPMBCyAAKAIEIQQgAEEANgIEAkAgACAEIAEQt4CAgAAiBA0AIAFBAWohAQzpAQsgAEEXNgIcIAAgBDYCDCAAIAFBAWo2AhRBACEQDPIBCyAAQQA2AhwgACABNgIUIABBzZOAgAA2AhAgAEEMNgIMQQAhEAzxAQtCASERCyAQQQFqIQECQCAAKQMgIhJC//////////8PVg0AIAAgEkIEhiARhDcDICABIQEMhAELIABBADYCHCAAIAE2AhQgAEGtiYCAADYCECAAQQw2AgxBACEQDO8BCyAAQQA2AhwgACAQNgIUIABBzZOAgAA2AhAgAEEMNgIMQQAhEAzuAQsgACgCBCEXIABBADYCBCAQIBGnaiIWIQEgACAXIBAgFiAUGyIQELWAgIAAIhRFDXMgAEEFNgIcIAAgEDYCFCAAIBQ2AgxBACEQDO0BCyAAQQA2AhwgACAQNgIUIABBqpyAgAA2AhAgAEEPNgIMQQAhEAzsAQsgACAQIAIQtICAgAAiAQ0BIBAhAQtBDiEQDNEBCwJAIAFBFUcNACAAQQI2AhwgACAQNgIUIABBsJiAgAA2AhAgAEEVNgIMQQAhEAzqAQsgAEEANgIcIAAgEDYCFCAAQaeOgIAANgIQIABBEjYCDEEAIRAM6QELIAFBAWohEAJAIAAvATAiAUGAAXFFDQACQCAAIBAgAhC7gICAACIBDQAgECEBDHALIAFBFUcNugEgAEEFNgIcIAAgEDYCFCAAQfmXgIAANgIQIABBFTYCDEEAIRAM6QELAkAgAUGgBHFBoARHDQAgAC0ALUECcQ0AIABBADYCHCAAIBA2AhQgAEGWk4CAADYCECAAQQQ2AgxBACEQDOkBCyAAIBAgAhC9gICAABogECEBAkACQAJAAkACQCAAIBAgAhCzgICAAA4WAgEABAQEBAQEBAQEBAQEBAQEBAQEAwQLIABBAToALgsgACAALwEwQcAAcjsBMCAQIQELQSYhEAzRAQsgAEEjNgIcIAAgEDYCFCAAQaWWgIAANgIQIABBFTYCDEEAIRAM6QELIABBADYCHCAAIBA2AhQgAEHVi4CAADYCECAAQRE2AgxBACEQDOgBCyAALQAtQQFxRQ0BQcMBIRAMzgELAkAgDSACRg0AA0ACQCANLQAAQSBGDQAgDSEBDMQBCyANQQFqIg0gAkcNAAtBJSEQDOcBC0ElIRAM5gELIAAoAgQhBCAAQQA2AgQgACAEIA0Qr4CAgAAiBEUNrQEgAEEmNgIcIAAgBDYCDCAAIA1BAWo2AhRBACEQDOUBCyAQQRVGDasBIABBADYCHCAAIAE2AhQgAEH9jYCAADYCECAAQR02AgxBACEQDOQBCyAAQSc2AhwgACABNgIUIAAgEDYCDEEAIRAM4wELIBAhAUEBIRQCQAJAAkACQAJAAkACQCAALQAsQX5qDgcGBQUDAQIABQsgACAALwEwQQhyOwEwDAMLQQIhFAwBC0EEIRQLIABBAToALCAAIAAvATAgFHI7ATALIBAhAQtBKyEQDMoBCyAAQQA2AhwgACAQNgIUIABBq5KAgAA2AhAgAEELNgIMQQAhEAziAQsgAEEANgIcIAAgATYCFCAAQeGPgIAANgIQIABBCjYCDEEAIRAM4QELIABBADoALCAQIQEMvQELIBAhAUEBIRQCQAJAAkACQAJAIAAtACxBe2oOBAMBAgAFCyAAIAAvATBBCHI7ATAMAwtBAiEUDAELQQQhFAsgAEEBOgAsIAAgAC8BMCAUcjsBMAsgECEBC0EpIRAMxQELIABBADYCHCAAIAE2AhQgAEHwlICAADYCECAAQQM2AgxBACEQDN0BCwJAIA4tAABBDUcNACAAKAIEIQEgAEEANgIEAkAgACABIA4QsYCAgAAiAQ0AIA5BAWohAQx1CyAAQSw2AhwgACABNgIMIAAgDkEBajYCFEEAIRAM3QELIAAtAC1BAXFFDQFBxAEhEAzDAQsCQCAOIAJHDQBBLSEQDNwBCwJAAkADQAJAIA4tAABBdmoOBAIAAAMACyAOQQFqIg4gAkcNAAtBLSEQDN0BCyAAKAIEIQEgAEEANgIEAkAgACABIA4QsYCAgAAiAQ0AIA4hAQx0CyAAQSw2AhwgACAONgIUIAAgATYCDEEAIRAM3AELIAAoAgQhASAAQQA2AgQCQCAAIAEgDhCxgICAACIBDQAgDkEBaiEBDHMLIABBLDYCHCAAIAE2AgwgACAOQQFqNgIUQQAhEAzbAQsgACgCBCEEIABBADYCBCAAIAQgDhCxgICAACIEDaABIA4hAQzOAQsgEEEsRw0BIAFBAWohEEEBIQECQAJAAkACQAJAIAAtACxBe2oOBAMBAgQACyAQIQEMBAtBAiEBDAELQQQhAQsgAEEBOgAsIAAgAC8BMCABcjsBMCAQIQEMAQsgACAALwEwQQhyOwEwIBAhAQtBOSEQDL8BCyAAQQA6ACwgASEBC0E0IRAMvQELIAAgAC8BMEEgcjsBMCABIQEMAgsgACgCBCEEIABBADYCBAJAIAAgBCABELGAgIAAIgQNACABIQEMxwELIABBNzYCHCAAIAE2AhQgACAENgIMQQAhEAzUAQsgAEEIOgAsIAEhAQtBMCEQDLkBCwJAIAAtAChBAUYNACABIQEMBAsgAC0ALUEIcUUNkwEgASEBDAMLIAAtADBBIHENlAFBxQEhEAy3AQsCQCAPIAJGDQACQANAAkAgDy0AAEFQaiIBQf8BcUEKSQ0AIA8hAUE1IRAMugELIAApAyAiEUKZs+bMmbPmzBlWDQEgACARQgp+IhE3AyAgESABrUL/AYMiEkJ/hVYNASAAIBEgEnw3AyAgD0EBaiIPIAJHDQALQTkhEAzRAQsgACgCBCECIABBADYCBCAAIAIgD0EBaiIEELGAgIAAIgINlQEgBCEBDMMBC0E5IRAMzwELAkAgAC8BMCIBQQhxRQ0AIAAtAChBAUcNACAALQAtQQhxRQ2QAQsgACABQff7A3FBgARyOwEwIA8hAQtBNyEQDLQBCyAAIAAvATBBEHI7ATAMqwELIBBBFUYNiwEgAEEANgIcIAAgATYCFCAAQfCOgIAANgIQIABBHDYCDEEAIRAMywELIABBwwA2AhwgACABNgIMIAAgDUEBajYCFEEAIRAMygELAkAgAS0AAEE6Rw0AIAAoAgQhECAAQQA2AgQCQCAAIBAgARCvgICAACIQDQAgAUEBaiEBDGMLIABBwwA2AhwgACAQNgIMIAAgAUEBajYCFEEAIRAMygELIABBADYCHCAAIAE2AhQgAEGxkYCAADYCECAAQQo2AgxBACEQDMkBCyAAQQA2AhwgACABNgIUIABBoJmAgAA2AhAgAEEeNgIMQQAhEAzIAQsgAEEANgIACyAAQYASOwEqIAAgF0EBaiIBIAIQqICAgAAiEA0BIAEhAQtBxwAhEAysAQsgEEEVRw2DASAAQdEANgIcIAAgATYCFCAAQeOXgIAANgIQIABBFTYCDEEAIRAMxAELIAAoAgQhECAAQQA2AgQCQCAAIBAgARCngICAACIQDQAgASEBDF4LIABB0gA2AhwgACABNgIUIAAgEDYCDEEAIRAMwwELIABBADYCHCAAIBQ2AhQgAEHBqICAADYCECAAQQc2AgwgAEEANgIAQQAhEAzCAQsgACgCBCEQIABBADYCBAJAIAAgECABEKeAgIAAIhANACABIQEMXQsgAEHTADYCHCAAIAE2AhQgACAQNgIMQQAhEAzBAQtBACEQIABBADYCHCAAIAE2AhQgAEGAkYCAADYCECAAQQk2AgwMwAELIBBBFUYNfSAAQQA2AhwgACABNgIUIABBlI2AgAA2AhAgAEEhNgIMQQAhEAy/AQtBASEWQQAhF0EAIRRBASEQCyAAIBA6ACsgAUEBaiEBAkACQCAALQAtQRBxDQACQAJAAkAgAC0AKg4DAQACBAsgFkUNAwwCCyAUDQEMAgsgF0UNAQsgACgCBCEQIABBADYCBAJAIAAgECABEK2AgIAAIhANACABIQEMXAsgAEHYADYCHCAAIAE2AhQgACAQNgIMQQAhEAy+AQsgACgCBCEEIABBADYCBAJAIAAgBCABEK2AgIAAIgQNACABIQEMrQELIABB2QA2AhwgACABNgIUIAAgBDYCDEEAIRAMvQELIAAoAgQhBCAAQQA2AgQCQCAAIAQgARCtgICAACIEDQAgASEBDKsBCyAAQdoANgIcIAAgATYCFCAAIAQ2AgxBACEQDLwBCyAAKAIEIQQgAEEANgIEAkAgACAEIAEQrYCAgAAiBA0AIAEhAQypAQsgAEHcADYCHCAAIAE2AhQgACAENgIMQQAhEAy7AQsCQCABLQAAQVBqIhBB/wFxQQpPDQAgACAQOgAqIAFBAWohAUHPACEQDKIBCyAAKAIEIQQgAEEANgIEAkAgACAEIAEQrYCAgAAiBA0AIAEhAQynAQsgAEHeADYCHCAAIAE2AhQgACAENgIMQQAhEAy6AQsgAEEANgIAIBdBAWohAQJAIAAtAClBI08NACABIQEMWQsgAEEANgIcIAAgATYCFCAAQdOJgIAANgIQIABBCDYCDEEAIRAMuQELIABBADYCAAtBACEQIABBADYCHCAAIAE2AhQgAEGQs4CAADYCECAAQQg2AgwMtwELIABBADYCACAXQQFqIQECQCAALQApQSFHDQAgASEBDFYLIABBADYCHCAAIAE2AhQgAEGbioCAADYCECAAQQg2AgxBACEQDLYBCyAAQQA2AgAgF0EBaiEBAkAgAC0AKSIQQV1qQQtPDQAgASEBDFULAkAgEEEGSw0AQQEgEHRBygBxRQ0AIAEhAQxVC0EAIRAgAEEANgIcIAAgATYCFCAAQfeJgIAANgIQIABBCDYCDAy1AQsgEEEVRg1xIABBADYCHCAAIAE2AhQgAEG5jYCAADYCECAAQRo2AgxBACEQDLQBCyAAKAIEIRAgAEEANgIEAkAgACAQIAEQp4CAgAAiEA0AIAEhAQxUCyAAQeUANgIcIAAgATYCFCAAIBA2AgxBACEQDLMBCyAAKAIEIRAgAEEANgIEAkAgACAQIAEQp4CAgAAiEA0AIAEhAQxNCyAAQdIANgIcIAAgATYCFCAAIBA2AgxBACEQDLIBCyAAKAIEIRAgAEEANgIEAkAgACAQIAEQp4CAgAAiEA0AIAEhAQxNCyAAQdMANgIcIAAgATYCFCAAIBA2AgxBACEQDLEBCyAAKAIEIRAgAEEANgIEAkAgACAQIAEQp4CAgAAiEA0AIAEhAQxRCyAAQeUANgIcIAAgATYCFCAAIBA2AgxBACEQDLABCyAAQQA2AhwgACABNgIUIABBxoqAgAA2AhAgAEEHNgIMQQAhEAyvAQsgACgCBCEQIABBADYCBAJAIAAgECABEKeAgIAAIhANACABIQEMSQsgAEHSADYCHCAAIAE2AhQgACAQNgIMQQAhEAyuAQsgACgCBCEQIABBADYCBAJAIAAgECABEKeAgIAAIhANACABIQEMSQsgAEHTADYCHCAAIAE2AhQgACAQNgIMQQAhEAytAQsgACgCBCEQIABBADYCBAJAIAAgECABEKeAgIAAIhANACABIQEMTQsgAEHlADYCHCAAIAE2AhQgACAQNgIMQQAhEAysAQsgAEEANgIcIAAgATYCFCAAQdyIgIAANgIQIABBBzYCDEEAIRAMqwELIBBBP0cNASABQQFqIQELQQUhEAyQAQtBACEQIABBADYCHCAAIAE2AhQgAEH9koCAADYCECAAQQc2AgwMqAELIAAoAgQhECAAQQA2AgQCQCAAIBAgARCngICAACIQDQAgASEBDEILIABB0gA2AhwgACABNgIUIAAgEDYCDEEAIRAMpwELIAAoAgQhECAAQQA2AgQCQCAAIBAgARCngICAACIQDQAgASEBDEILIABB0wA2AhwgACABNgIUIAAgEDYCDEEAIRAMpgELIAAoAgQhECAAQQA2AgQCQCAAIBAgARCngICAACIQDQAgASEBDEYLIABB5QA2AhwgACABNgIUIAAgEDYCDEEAIRAMpQELIAAoAgQhASAAQQA2AgQCQCAAIAEgFBCngICAACIBDQAgFCEBDD8LIABB0gA2AhwgACAUNgIUIAAgATYCDEEAIRAMpAELIAAoAgQhASAAQQA2AgQCQCAAIAEgFBCngICAACIBDQAgFCEBDD8LIABB0wA2AhwgACAUNgIUIAAgATYCDEEAIRAMowELIAAoAgQhASAAQQA2AgQCQCAAIAEgFBCngICAACIBDQAgFCEBDEMLIABB5QA2AhwgACAU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YWdlX2JlZ2luYCBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfZXh0ZW5zaW9uX3ZhbHVlYCBjYWxsYmFjayBlcnJvcgBgb25fc3RhdHVzX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fdmVyc2lvbl9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX3VybF9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25faGVhZGVyX3ZhbHVlX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fbWVzc2FnZV9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX21ldGhvZF9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX2hlYWRlcl9maWVsZF9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2V4dGVuc2lvbl9uYW1lYCBjYWxsYmFjayBlcnJvcgBVbmV4cGVjdGVkIGNoYXIgaW4gdXJsIHNlcnZlcgBJbnZhbGlkIGhlYWRlciB2YWx1ZSBjaGFyAEludmFsaWQgaGVhZGVyIGZpZWxkIGNoYXIAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl92ZXJzaW9uAEludmFsaWQgbWlub3IgdmVyc2lvbgBJbnZhbGlkIG1ham9yIHZlcnNpb24ARXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgdmVyc2lvbgBFeHBlY3RlZCBDUkxGIGFmdGVyIHZlcnNpb24ASW52YWxpZCBIVFRQIHZlcnNpb24ASW52YWxpZCBoZWFkZXIgdG9rZW4AU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl91cmwASW52YWxpZCBjaGFyYWN0ZXJzIGluIHVybABVbmV4cGVjdGVkIHN0YXJ0IGNoYXIgaW4gdXJsAERvdWJsZSBAIGluIHVybABFbXB0eSBDb250ZW50LUxlbmd0aABJbnZhbGlkIGNoYXJhY3RlciBpbiBDb250ZW50LUxlbmd0aABEdXBsaWNhdGUgQ29udGVudC1MZW5ndGgASW52YWxpZCBjaGFyIGluIHVybCBwYXRoAENvbnRlbnQtTGVuZ3RoIGNhbid0IGJlIHByZXNlbnQgd2l0aCBUcmFuc2Zlci1FbmNvZGluZwBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBzaXplAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25faGVhZGVyX3ZhbHVlAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fY2h1bmtfZXh0ZW5zaW9uX3ZhbHVlAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgdmFsdWUATWlzc2luZyBleHBlY3RlZCBMRiBhZnRlciBoZWFkZXIgdmFsdWUASW52YWxpZCBgVHJhbnNmZXItRW5jb2RpbmdgIGhlYWRlciB2YWx1ZQBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBleHRlbnNpb25zIHF1b3RlIHZhbHVlAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgcXVvdGVkIHZhbHVlAFBhdXNlZCBieSBvbl9oZWFkZXJzX2NvbXBsZXRlAEludmFsaWQgRU9GIHN0YXRlAG9uX3Jlc2V0IHBhdXNlAG9uX2NodW5rX2hlYWRlciBwYXVzZQBvbl9tZXNzYWdlX2JlZ2luIHBhdXNlAG9uX2NodW5rX2V4dGVuc2lvbl92YWx1ZSBwYXVzZQBvbl9zdGF0dXNfY29tcGxldGUgcGF1c2UAb25fdmVyc2lvbl9jb21wbGV0ZSBwYXVzZQBvbl91cmxfY29tcGxldGUgcGF1c2UAb25fY2h1bmtfY29tcGxldGUgcGF1c2UAb25faGVhZGVyX3ZhbHVlX2NvbXBsZXRlIHBhdXNlAG9uX21lc3NhZ2VfY29tcGxldGUgcGF1c2UAb25fbWV0aG9kX2NvbXBsZXRlIHBhdXNlAG9uX2hlYWRlcl9maWVsZF9jb21wbGV0ZSBwYXVzZQBvbl9jaHVua19leHRlbnNpb25fbmFtZSBwYXVzZQBVbmV4cGVjdGVkIHNwYWNlIGFmdGVyIHN0YXJ0IGxpbmUAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9jaHVua19leHRlbnNpb25fbmFtZQBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBleHRlbnNpb25zIG5hbWUAUGF1c2Ugb24gQ09OTkVDVC9VcGdyYWRlAFBhdXNlIG9uIFBSSS9VcGdyYWRlAEV4cGVjdGVkIEhUVFAvMiBDb25uZWN0aW9uIFByZWZhY2UAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9tZXRob2QARXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgbWV0aG9kAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25faGVhZGVyX2ZpZWxkAFBhdXNlZABJbnZhbGlkIHdvcmQgZW5jb3VudGVyZWQASW52YWxpZCBtZXRob2QgZW5jb3VudGVyZWQAVW5leHBlY3RlZCBjaGFyIGluIHVybCBzY2hlbWEAUmVxdWVzdCBoYXMgaW52YWxpZCBgVHJhbnNmZXItRW5jb2RpbmdgAFNXSVRDSF9QUk9YWQBVU0VfUFJPWFkATUtBQ1RJVklUWQBVTlBST0NFU1NBQkxFX0VOVElUWQBDT1BZAE1PVkVEX1BFUk1BTkVOVExZAFRPT19FQVJMWQBOT1RJRlkARkFJTEVEX0RFUEVOREVOQ1kAQkFEX0dBVEVXQVkAUExBWQBQVVQAQ0hFQ0tPVVQAR0FURVdBWV9USU1FT1VUAFJFUVVFU1RfVElNRU9VVABORVRXT1JLX0NPTk5FQ1RfVElNRU9VVABDT05ORUNUSU9OX1RJTUVPVVQATE9HSU5fVElNRU9VVABORVRXT1JLX1JFQURfVElNRU9VVABQT1NUAE1JU0RJUkVDVEVEX1JFUVVFU1QAQ0xJRU5UX0NMT1NFRF9SRVFVRVNUAENMSUVOVF9DTE9TRURfTE9BRF9CQUxBTkNFRF9SRVFVRVNUAEJBRF9SRVFVRVNUAEhUVFBfUkVRVUVTVF9TRU5UX1RPX0hUVFBTX1BPUlQAUkVQT1JUAElNX0FfVEVBUE9UAFJFU0VUX0NPTlRFTlQATk9fQ09OVEVOVABQQVJUSUFMX0NPTlRFTlQASFBFX0lOVkFMSURfQ09OU1RBTlQASFBFX0NCX1JFU0VUAEdFVABIUEVfU1RSSUNUAENPTkZMSUNUAFRFTVBPUkFSWV9SRURJUkVDVABQRVJNQU5FTlRfUkVESVJFQ1QAQ09OTkVDVABNVUxUSV9TVEFUVVMASFBFX0lOVkFMSURfU1RBVFVTAFRPT19NQU5ZX1JFUVVFU1RTAEVBUkxZX0hJTlRTAFVOQVZBSUxBQkxFX0ZPUl9MRUdBTF9SRUFTT05TAE9QVElPTlMAU1dJVENISU5HX1BST1RPQ09MUwBWQVJJQU5UX0FMU09fTkVHT1RJQVRFUwBNVUxUSVBMRV9DSE9JQ0VTAElOVEVSTkFMX1NFUlZFUl9FUlJPUgBXRUJfU0VSVkVSX1VOS05PV05fRVJST1IAUkFJTEdVTl9FUlJPUgBJREVOVElUWV9QUk9WSURFUl9BVVRIRU5USUNBVElPTl9FUlJPUgBTU0xfQ0VSVElGSUNBVEVfRVJST1IASU5WQUxJRF9YX0ZPUldBUkRFRF9GT1IAU0VUX1BBUkFNRVRFUgBHRVRfUEFSQU1FVEVSAEhQRV9VU0VSAFNFRV9PVEhFUgBIUEVfQ0JfQ0hVTktfSEVBREVSAE1LQ0FMRU5EQVIAU0VUVVAAV0VCX1NFUlZFUl9JU19ET1dOAFRFQVJET1dOAEhQRV9DTE9TRURfQ09OTkVDVElPTgBIRVVSSVNUSUNfRVhQSVJBVElPTgBESVNDT05ORUNURURfT1BFUkFUSU9OAE5PTl9BVVRIT1JJVEFUSVZFX0lORk9STUFUSU9OAEhQRV9JTlZBTElEX1ZFUlNJT04ASFBFX0NCX01FU1NBR0VfQkVHSU4AU0lURV9JU19GUk9aRU4ASFBFX0lOVkFMSURfSEVBREVSX1RPS0VOAElOVkFMSURfVE9LRU4ARk9SQklEREVOAEVOSEFOQ0VfWU9VUl9DQUxNAEhQRV9JTlZBTElEX1VSTABCTE9DS0VEX0JZX1BBUkVOVEFMX0NPTlRST0wATUtDT0wAQUNMAEhQRV9JTlRFUk5BTABSRVFVRVNUX0hFQURFUl9GSUVMRFNfVE9PX0xBUkdFX1VOT0ZGSUNJQUwASFBFX09LAFVOTElOSwBVTkxPQ0sAUFJJAFJFVFJZX1dJVEgASFBFX0lOVkFMSURfQ09OVEVOVF9MRU5HVEgASFBFX1VORVhQRUNURURfQ09OVEVOVF9MRU5HVEgARkxVU0gAUFJPUFBBVENIAE0tU0VBUkNIAFVSSV9UT09fTE9ORwBQUk9DRVNTSU5HAE1JU0NFTExBTkVPVVNfUEVSU0lTVEVOVF9XQVJOSU5HAE1JU0NFTExBTkVPVVNfV0FSTklORwBIUEVfSU5WQUxJRF9UUkFOU0ZFUl9FTkNPRElORwBFeHBlY3RlZCBDUkxGAEhQRV9JTlZBTElEX0NIVU5LX1NJWkUATU9WRQBDT05USU5VRQBIUEVfQ0JfU1RBVFVTX0NPTVBMRVRFAEhQRV9DQl9IRUFERVJTX0NPTVBMRVRFAEhQRV9DQl9WRVJTSU9OX0NPTVBMRVRFAEhQRV9DQl9VUkxfQ09NUExFVEUASFBFX0NCX0NIVU5LX0NPTVBMRVRFAEhQRV9DQl9IRUFERVJfVkFMVUVfQ09NUExFVEUASFBFX0NCX0NIVU5LX0VYVEVOU0lPTl9WQUxVRV9DT01QTEVURQBIUEVfQ0JfQ0hVTktfRVhURU5TSU9OX05BTUVfQ09NUExFVEUASFBFX0NCX01FU1NBR0VfQ09NUExFVEUASFBFX0NCX01FVEhPRF9DT01QTEVURQBIUEVfQ0JfSEVBREVSX0ZJRUxEX0NPTVBMRVRFAERFTEVURQBIUEVfSU5WQUxJRF9FT0ZfU1RBVEUASU5WQUxJRF9TU0xfQ0VSVElGSUNBVEUAUEFVU0UATk9fUkVTUE9OU0UAVU5TVVBQT1JURURfTUVESUFfVFlQRQBHT05FAE5PVF9BQ0NFUFRBQkxFAFNFUlZJQ0VfVU5BVkFJTEFCTEUAUkFOR0VfTk9UX1NBVElTRklBQkxFAE9SSUdJTl9JU19VTlJFQUNIQUJMRQBSRVNQT05TRV9JU19TVEFMRQBQVVJHRQBNRVJHRQBSRVFVRVNUX0hFQURFUl9GSUVMRFNfVE9PX0xBUkdFAFJFUVVFU1RfSEVBREVSX1RPT19MQVJHRQBQQVlMT0FEX1RPT19MQVJHRQBJTlNVRkZJQ0lFTlRfU1RPUkFHRQBIUEVfUEFVU0VEX1VQR1JBREUASFBFX1BBVVNFRF9IMl9VUEdSQURFAFNPVVJDRQBBTk5PVU5DRQBUUkFDRQBIUEVfVU5FWFBFQ1RFRF9TUEFDRQBERVNDUklCRQBVTlNVQlNDUklCRQBSRUNPUkQASFBFX0lOVkFMSURfTUVUSE9EAE5PVF9GT1VORABQUk9QRklORABVTkJJTkQAUkVCSU5EAFVOQVVUSE9SSVpFRABNRVRIT0RfTk9UX0FMTE9XRUQASFRUUF9WRVJTSU9OX05PVF9TVVBQT1JURUQAQUxSRUFEWV9SRVBPUlRFRABBQ0NFUFRFRABOT1RfSU1QTEVNRU5URUQATE9PUF9ERVRFQ1RFRABIUEVfQ1JfRVhQRUNURUQASFBFX0xGX0VYUEVDVEVEAENSRUFURUQASU1fVVNFRABIUEVfUEFVU0VEAFRJTUVPVVRfT0NDVVJFRABQQVlNRU5UX1JFUVVJUkVEAFBSRUNPTkRJVElPTl9SRVFVSVJFRABQUk9YWV9BVVRIRU5USUNBVElPTl9SRVFVSVJFRABORVRXT1JLX0FVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEAExFTkdUSF9SRVFVSVJFRABTU0xfQ0VSVElGSUNBVEVfUkVRVUlSRUQAVVBHUkFERV9SRVFVSVJFRABQQUdFX0VYUElSRUQAUFJFQ09ORElUSU9OX0ZBSUxFRABFWFBFQ1RBVElPTl9GQUlMRUQAUkVWQUxJREFUSU9OX0ZBSUxFRABTU0xfSEFORFNIQUtFX0ZBSUxFRABMT0NLRUQAVFJBTlNGT1JNQVRJT05fQVBQTElFRABOT1RfTU9ESUZJRUQATk9UX0VYVEVOREVEAEJBTkRXSURUSF9MSU1JVF9FWENFRURFRABTSVRFX0lTX09WRVJMT0FERUQASEVBRABFeHBlY3RlZCBIVFRQLwAAXhMAACYTAAAwEAAA8BcAAJ0TAAAVEgAAORcAAPASAAAKEAAAdRIAAK0SAACCEwAATxQAAH8QAACgFQAAIxQAAIkSAACLFAAATRUAANQRAADPFAAAEBgAAMkWAADcFgAAwREAAOAXAAC7FAAAdBQAAHwVAADlFAAACBcAAB8QAABlFQAAoxQAACgVAAACFQAAmRUAACwQAACLGQAATw8AANQOAABqEAAAzhAAAAIXAACJDgAAbhMAABwTAABmFAAAVhcAAMETAADNEwAAbBMAAGgXAABmFwAAXxcAACITAADODwAAaQ4AANgOAABjFgAAyxMAAKoOAAAoFwAAJhcAAMUTAABdFgAA6BEAAGcTAABlEwAA8hYAAHMTAAAdFwAA+RYAAPMRAADPDgAAzhUAAAwSAACzEQAApREAAGEQAAAyFwAAuxMAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQIBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAIDAgICAgIAAAICAAICAAICAgICAgICAgIABAAAAAAAAgICAgICAgICAgICAgICAgICAgICAgICAgIAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAACAAICAgICAAACAgACAgACAgICAgICAgICAAMABAAAAAICAgICAgICAgICAgICAgICAgICAgICAgICAAAAAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbG9zZWVlcC1hbGl2ZQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQEBAQEBAQIBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBY2h1bmtlZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEAAQEBAQEAAAEBAAEBAAEBAQEBAQEBAQEAAAAAAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABlY3Rpb25lbnQtbGVuZ3Rob25yb3h5LWNvbm5lY3Rpb24AAAAAAAAAAAAAAAAAAAByYW5zZmVyLWVuY29kaW5ncGdyYWRlDQoNCg0KU00NCg0KVFRQL0NFL1RTUC8AAAAAAAAAAAAAAAABAgABAwAAAAAAAAAAAAAAAAAAAAAAAAQBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAQIAAQMAAAAAAAAAAAAAAAAAAAAAAAAEAQEFAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAEAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAAAAQAAAgAAAAAAAAAAAAAAAAAAAAAAAAMEAAAEBAQEBAQEBAQEBAUEBAQEBAQEBAQEBAQABAAGBwQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAEAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAABAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAIAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABOT1VOQ0VFQ0tPVVRORUNURVRFQ1JJQkVMVVNIRVRFQURTRUFSQ0hSR0VDVElWSVRZTEVOREFSVkVPVElGWVBUSU9OU0NIU0VBWVNUQVRDSEdFT1JESVJFQ1RPUlRSQ0hQQVJBTUVURVJVUkNFQlNDUklCRUFSRE9XTkFDRUlORE5LQ0tVQlNDUklCRUhUVFAvQURUUC8=";
  return llhttpWasm;
}
var llhttp_simdWasm;
var hasRequiredLlhttp_simdWasm;
function requireLlhttp_simdWasm() {
  if (hasRequiredLlhttp_simdWasm)
    return llhttp_simdWasm;
  hasRequiredLlhttp_simdWasm = 1;
  llhttp_simdWasm = "AGFzbQEAAAABMAhgAX8Bf2ADf39/AX9gBH9/f38Bf2AAAGADf39/AGABfwBgAn9/AGAGf39/f39/AALLAQgDZW52GHdhc21fb25faGVhZGVyc19jb21wbGV0ZQACA2VudhV3YXNtX29uX21lc3NhZ2VfYmVnaW4AAANlbnYLd2FzbV9vbl91cmwAAQNlbnYOd2FzbV9vbl9zdGF0dXMAAQNlbnYUd2FzbV9vbl9oZWFkZXJfZmllbGQAAQNlbnYUd2FzbV9vbl9oZWFkZXJfdmFsdWUAAQNlbnYMd2FzbV9vbl9ib2R5AAEDZW52GHdhc21fb25fbWVzc2FnZV9jb21wbGV0ZQAAA0ZFAwMEAAAFAAAAAAAABQEFAAUFBQAABgAAAAAGBgYGAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAABAQcAAAUFAwABBAUBcAESEgUDAQACBggBfwFBgNQECwfRBSIGbWVtb3J5AgALX2luaXRpYWxpemUACRlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQALbGxodHRwX2luaXQAChhsbGh0dHBfc2hvdWxkX2tlZXBfYWxpdmUAQQxsbGh0dHBfYWxsb2MADAZtYWxsb2MARgtsbGh0dHBfZnJlZQANBGZyZWUASA9sbGh0dHBfZ2V0X3R5cGUADhVsbGh0dHBfZ2V0X2h0dHBfbWFqb3IADxVsbGh0dHBfZ2V0X2h0dHBfbWlub3IAEBFsbGh0dHBfZ2V0X21ldGhvZAARFmxsaHR0cF9nZXRfc3RhdHVzX2NvZGUAEhJsbGh0dHBfZ2V0X3VwZ3JhZGUAEwxsbGh0dHBfcmVzZXQAFA5sbGh0dHBfZXhlY3V0ZQAVFGxsaHR0cF9zZXR0aW5nc19pbml0ABYNbGxodHRwX2ZpbmlzaAAXDGxsaHR0cF9wYXVzZQAYDWxsaHR0cF9yZXN1bWUAGRtsbGh0dHBfcmVzdW1lX2FmdGVyX3VwZ3JhZGUAGhBsbGh0dHBfZ2V0X2Vycm5vABsXbGxodHRwX2dldF9lcnJvcl9yZWFzb24AHBdsbGh0dHBfc2V0X2Vycm9yX3JlYXNvbgAdFGxsaHR0cF9nZXRfZXJyb3JfcG9zAB4RbGxodHRwX2Vycm5vX25hbWUAHxJsbGh0dHBfbWV0aG9kX25hbWUAIBJs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IAH9CwMAIABBMGogAf0LAwAgAEEgaiAB/QsDACAAQd0BNgIcQQALewEBfwJAIAAoAgwiAw0AAkAgACgCBEUNACAAIAE2AgQLAkAgACABIAIQxICAgAAiAw0AIAAoAgwPCyAAIAM2AhxBACEDIAAoAgQiAUUNACAAIAEgAiAAKAIIEYGAgIAAACIBRQ0AIAAgAjYCFCAAIAE2AgwgASEDCyADC+TzAQMOfwN+BH8jgICAgABBEGsiAySAgICAACABIQQgASEFIAEhBiABIQcgASEIIAEhCSABIQogASELIAEhDCABIQ0gASEOIAEhDwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAKAIcIhBBf2oO3QHaAQHZAQIDBAUGBwgJCgsMDQ7YAQ8Q1wEREtYBExQVFhcYGRob4AHfARwdHtUBHyAhIiMkJdQBJicoKSorLNMB0gEtLtEB0AEvMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUbbAUdISUrPAc4BS80BTMwBTU5PUFFSU1RVVldYWVpbXF1eX2BhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ent8fX5/gAGBAYIBgwGEAYUBhgGHAYgBiQGKAYsBjAGNAY4BjwGQAZEB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QAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIBAOxwEAAQID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YWNrIGVycm9yAGBvbl9jaHVua19leHRlbnNpb25fdmFsdWVgIGNhbGxiYWNrIGVycm9yAGBvbl9zdGF0dXNfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl92ZXJzaW9uX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fdXJsX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9oZWFkZXJfdmFsdWVfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9tZXNzYWdlX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fbWV0aG9kX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25faGVhZGVyX2ZpZWxkX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfZXh0ZW5zaW9uX25hbWVgIGNhbGxiYWNrIGVycm9yAFVuZXhwZWN0ZWQgY2hhciBpbiB1cmwgc2VydmVyAEludmFsaWQgaGVhZGVyIHZhbHVlIGNoYXIASW52YWxpZCBoZWFkZXIgZmllbGQgY2hhcgBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX3ZlcnNpb24ASW52YWxpZCBtaW5vciB2ZXJzaW9uAEludmFsaWQgbWFqb3IgdmVyc2lvbgBFeHBlY3RlZCBzcGFjZSBhZnRlciB2ZXJzaW9uAEV4cGVjdGVkIENSTEYgYWZ0ZXIgdmVyc2lvbgBJbnZhbGlkIEhUVFAgdmVyc2lvbgBJbnZhbGlkIGhlYWRlciB0b2tlbgBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX3VybABJbnZhbGlkIGNoYXJhY3RlcnMgaW4gdXJsAFVuZXhwZWN0ZWQgc3RhcnQgY2hhciBpbiB1cmwARG91YmxlIEAgaW4gdXJsAEVtcHR5IENvbnRlbnQtTGVuZ3RoAEludmFsaWQgY2hhcmFjdGVyIGluIENvbnRlbnQtTGVuZ3RoAER1cGxpY2F0ZSBDb250ZW50LUxlbmd0aABJbnZhbGlkIGNoYXIgaW4gdXJsIHBhdGgAQ29udGVudC1MZW5ndGggY2FuJ3QgYmUgcHJlc2VudCB3aXRoIFRyYW5zZmVyLUVuY29kaW5nAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIHNpemUAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9oZWFkZXJfdmFsdWUAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9jaHVua19leHRlbnNpb25fdmFsdWUASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgZXh0ZW5zaW9ucyB2YWx1ZQBNaXNzaW5nIGV4cGVjdGVkIExGIGFmdGVyIGhlYWRlciB2YWx1ZQBJbnZhbGlkIGBUcmFuc2Zlci1FbmNvZGluZ2AgaGVhZGVyIHZhbHVlAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgcXVvdGUgdmFsdWUASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgZXh0ZW5zaW9ucyBxdW90ZWQgdmFsdWUAUGF1c2VkIGJ5IG9uX2hlYWRlcnNfY29tcGxldGUASW52YWxpZCBFT0Ygc3RhdGUAb25fcmVzZXQgcGF1c2UAb25fY2h1bmtfaGVhZGVyIHBhdXNlAG9uX21lc3NhZ2VfYmVnaW4gcGF1c2UAb25fY2h1bmtfZXh0ZW5zaW9uX3ZhbHVlIHBhdXNlAG9uX3N0YXR1c19jb21wbGV0ZSBwYXVzZQBvbl92ZXJzaW9uX2NvbXBsZXRlIHBhdXNlAG9uX3VybF9jb21wbGV0ZSBwYXVzZQBvbl9jaHVua19jb21wbGV0ZSBwYXVzZQBvbl9oZWFkZXJfdmFsdWVfY29tcGxldGUgcGF1c2UAb25fbWVzc2FnZV9jb21wbGV0ZSBwYXVzZQBvbl9tZXRob2RfY29tcGxldGUgcGF1c2UAb25faGVhZGVyX2ZpZWxkX2NvbXBsZXRlIHBhdXNlAG9uX2NodW5rX2V4dGVuc2lvbl9uYW1lIHBhdXNlAFVuZXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgc3RhcnQgbGluZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2NodW5rX2V4dGVuc2lvbl9uYW1lAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgbmFtZQBQYXVzZSBvbiBDT05ORUNUL1VwZ3JhZGUAUGF1c2Ugb24gUFJJL1VwZ3JhZGUARXhwZWN0ZWQgSFRUUC8yIENvbm5lY3Rpb24gUHJlZmFjZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX21ldGhvZABFeHBlY3RlZCBzcGFjZSBhZnRlciBtZXRob2QAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9oZWFkZXJfZmllbGQAUGF1c2VkAEludmFsaWQgd29yZCBlbmNvdW50ZXJlZABJbnZhbGlkIG1ldGhvZCBlbmNvdW50ZXJlZABVbmV4cGVjdGVkIGNoYXIgaW4gdXJsIHNjaGVtYQBSZXF1ZXN0IGhhcyBpbnZhbGlkIGBUcmFuc2Zlci1FbmNvZGluZ2AAU1dJVENIX1BST1hZAFVTRV9QUk9YWQBNS0FDVElWSVRZAFVOUFJPQ0VTU0FCTEVfRU5USVRZAENPUFkATU9WRURfUEVSTUFORU5UTFkAVE9PX0VBUkxZAE5PVElGWQBGQUlMRURfREVQRU5ERU5DWQBCQURfR0FURVdBWQBQTEFZAFBVVABDSEVDS09VVABHQVRFV0FZX1RJTUVPVVQAUkVRVUVTVF9USU1FT1VUAE5FVFdPUktfQ09OTkVDVF9USU1FT1VUAENPTk5FQ1RJT05fVElNRU9VVABMT0dJTl9USU1FT1VUAE5FVFdPUktfUkVBRF9USU1FT1VUAFBPU1QATUlTRElSRUNURURfUkVRVUVTVABDTElFTlRfQ0xPU0VEX1JFUVVFU1QAQ0xJRU5UX0NMT1NFRF9MT0FEX0JBTEFOQ0VEX1JFUVVFU1QAQkFEX1JFUVVFU1QASFRUUF9SRVFVRVNUX1NFTlRfVE9fSFRUUFNfUE9SVABSRVBPUlQASU1fQV9URUFQT1QAUkVTRVRfQ09OVEVOVABOT19DT05URU5UAFBBUlRJQUxfQ09OVEVOVABIUEVfSU5WQUxJRF9DT05TVEFOVABIUEVfQ0JfUkVTRVQAR0VUAEhQRV9TVFJJQ1QAQ09ORkxJQ1QAVEVNUE9SQVJZX1JFRElSRUNUAFBFUk1BTkVOVF9SRURJUkVDVABDT05ORUNUAE1VTFRJX1NUQVRVUwBIUEVfSU5WQUxJRF9TVEFUVVMAVE9PX01BTllfUkVRVUVTVFMARUFSTFlfSElOVFMAVU5BVkFJTEFCTEVfRk9SX0xFR0FMX1JFQVNPTlMAT1BUSU9OUwBTV0lUQ0hJTkdfUFJPVE9DT0xTAFZBUklBTlRfQUxTT19ORUdPVElBVEVTAE1VTFRJUExFX0NIT0lDRVMASU5URVJOQUxfU0VSVkVSX0VSUk9SAFdFQl9TRVJWRVJfVU5LTk9XTl9FUlJPUgBSQUlMR1VOX0VSUk9SAElERU5USVRZX1BST1ZJREVSX0FVVEhFTlRJQ0FUSU9OX0VSUk9SAFNTTF9DRVJUSUZJQ0FURV9FUlJPUgBJTlZBTElEX1hfRk9SV0FSREVEX0ZPUgBTRVRfUEFSQU1FVEVSAEdFVF9QQVJBTUVURVIASFBFX1VTRVIAU0VFX09USEVSAEhQRV9DQl9DSFVOS19IRUFERVIATUtDQUxFTkRBUgBTRVRVUABXRUJfU0VSVkVSX0lTX0RPV04AVEVBUkRPV04ASFBFX0NMT1NFRF9DT05ORUNUSU9OAEhFVVJJU1RJQ19FWFBJUkFUSU9OAERJU0NPTk5FQ1RFRF9PUEVSQVRJT04ATk9OX0FVVEhPUklUQVRJVkVfSU5GT1JNQVRJT04ASFBFX0lOVkFMSURfVkVSU0lPTgBIUEVfQ0JfTUVTU0FHRV9CRUdJTgBTSVRFX0lTX0ZST1pFTgBIUEVfSU5WQUxJRF9IRUFERVJfVE9LRU4ASU5WQUxJRF9UT0tFTgBGT1JCSURERU4ARU5IQU5DRV9ZT1VSX0NBTE0ASFBFX0lOVkFMSURfVVJMAEJMT0NLRURfQllfUEFSRU5UQUxfQ09OVFJPTABNS0NPTABBQ0wASFBFX0lOVEVSTkFMAFJFUVVFU1RfSEVBREVSX0ZJRUxEU19UT09fTEFSR0VfVU5PRkZJQ0lBTABIUEVfT0sAVU5MSU5LAFVOTE9DSwBQUkkAUkVUUllfV0lUSABIUEVfSU5WQUxJRF9DT05URU5UX0xFTkdUSABIUEVfVU5FWFBFQ1RFRF9DT05URU5UX0xFTkdUSABGTFVTSABQUk9QUEFUQ0gATS1TRUFSQ0gAVVJJX1RPT19MT05HAFBST0NFU1NJTkcATUlTQ0VMTEFORU9VU19QRVJTSVNURU5UX1dBUk5JTkcATUlTQ0VMTEFORU9VU19XQVJOSU5HAEhQRV9JTlZBTElEX1RSQU5TRkVSX0VOQ09ESU5HAEV4cGVjdGVkIENSTEYASFBFX0lOVkFMSURfQ0hVTktfU0laRQBNT1ZFAENPTlRJTlVFAEhQRV9DQl9TVEFUVVNfQ09NUExFVEUASFBFX0NCX0hFQURFUlNfQ09NUExFVEUASFBFX0NCX1ZFUlNJT05fQ09NUExFVEUASFBFX0NCX1VSTF9DT01QTEVURQBIUEVfQ0JfQ0hVTktfQ09NUExFVEUASFBFX0NCX0hFQURFUl9WQUxVRV9DT01QTEVURQBIUEVfQ0JfQ0hVTktfRVhURU5TSU9OX1ZBTFVFX0NPTVBMRVRFAEhQRV9DQl9DSFVOS19FWFRFTlNJT05fTkFNRV9DT01QTEVURQBIUEVfQ0JfTUVTU0FHRV9DT01QTEVURQBIUEVfQ0JfTUVUSE9EX0NPTVBMRVRFAEhQRV9DQl9IRUFERVJfRklFTERfQ09NUExFVEUAREVMRVRFAEhQRV9JTlZBTElEX0VPRl9TVEFURQBJTlZBTElEX1NTTF9DRVJUSUZJQ0FURQBQQVVTRQBOT19SRVNQT05TRQBVTlNVUFBPUlRFRF9NRURJQV9UWVBFAEdPTkUATk9UX0FDQ0VQVEFCTEUAU0VSVklDRV9VTkFWQUlMQUJMRQBSQU5HRV9OT1RfU0FUSVNGSUFCTEUAT1JJR0lOX0lTX1VOUkVBQ0hBQkxFAFJFU1BPTlNFX0lTX1NUQUxFAFBVUkdFAE1FUkdFAFJFUVVFU1RfSEVBREVSX0ZJRUxEU19UT09fTEFSR0UAUkVRVUVTVF9IRUFERVJfVE9PX0xBUkdFAFBBWUxPQURfVE9PX0xBUkdFAElOU1VGRklDSUVOVF9TVE9SQUdFAEhQRV9QQVVTRURfVVBHUkFERQBIUEVfUEFVU0VEX0gyX1VQR1JBREUAU09VUkNFAEFOTk9VTkNFAFRSQUNFAEhQRV9VTkVYUEVDVEVEX1NQQUNFAERFU0NSSUJFAFVOU1VCU0NSSUJFAFJFQ09SRABIUEVfSU5WQUxJRF9NRVRIT0QATk9UX0ZPVU5EAFBST1BGSU5EAFVOQklORABSRUJJTkQAVU5BVVRIT1JJWkVEAE1FVEhPRF9OT1RfQUxMT1dFRABIVFRQX1ZFUlNJT05fTk9UX1NVUFBPUlRFRABBTFJFQURZX1JFUE9SVEVEAEFDQ0VQVEVEAE5PVF9JTVBMRU1FTlRFRABMT09QX0RFVEVDVEVEAEhQRV9DUl9FWFBFQ1RFRABIUEVfTEZfRVhQRUNURUQAQ1JFQVRFRABJTV9VU0VEAEhQRV9QQVVTRUQAVElNRU9VVF9PQ0NVUkVEAFBBWU1FTlRfUkVRVUlSRUQAUFJFQ09ORElUSU9OX1JFUVVJUkVEAFBST1hZX0FVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEAE5FVFdPUktfQVVUSEVOVElDQVRJT05fUkVRVUlSRUQATEVOR1RIX1JFUVVJUkVEAFNTTF9DRVJUSUZJQ0FURV9SRVFVSVJFRABVUEdSQURFX1JFUVVJUkVEAFBBR0VfRVhQSVJFRABQUkVDT05ESVRJT05fRkFJTEVEAEVYUEVDVEFUSU9OX0ZBSUxFRABSRVZBTElEQVRJT05fRkFJTEVEAFNTTF9IQU5EU0hBS0VfRkFJTEVEAExPQ0tFRABUUkFOU0ZPUk1BVElPTl9BUFBMSUVEAE5PVF9NT0RJRklFRABOT1RfRVhURU5ERUQAQkFORFdJRFRIX0xJTUlUX0VYQ0VFREVEAFNJVEVfSVNfT1ZFUkxPQURFRABIRUFEAEV4cGVjdGVkIEhUVFAvAABeEwAAJhMAADAQAADwFwAAnRMAABUSAAA5FwAA8BIAAAoQAAB1EgAArRIAAIITAABPFAAAfxAAAKAVAAAjFAAAiRIAAIsUAABNFQAA1BEAAM8UAAAQGAAAyRYAANwWAADBEQAA4BcAALsUAAB0FAAAfBUAAOUUAAAIFwAAHxAAAGUVAACjFAAAKBUAAAIVAACZFQAALBAAAIsZAABPDwAA1A4AAGoQAADOEAAAAhcAAIkOAABuEwAAHBMAAGYUAABWFwAAwRMAAM0TAABsEwAAaBcAAGYXAABfFwAAIhMAAM4PAABpDgAA2A4AAGMWAADLEwAAqg4AACgXAAAmFwAAxRMAAF0WAADoEQAAZxMAAGUTAADyFgAAcxMAAB0XAAD5FgAA8xEAAM8OAADOFQAADBIAALMRAAClEQAAYRAAADIXAAC7EwAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAgMCAgICAgAAAgIAAgIAAgICAgICAgICAgAEAAAAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgAAAAICAgICAgICAgICAgICAgICAgICAgICAgICAgICAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgICAgIAAAICAAICAAICAgICAgICAgIAAwAEAAAAAgICAgICAgICAgICAgICAgICAgICAgICAgIAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsb3NlZWVwLWFsaXZlAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAQEBAQEBAgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQFjaHVua2VkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQABAQEBAQAAAQEAAQEAAQEBAQEBAQEBAQAAAAAAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGVjdGlvbmVudC1sZW5ndGhvbnJveHktY29ubmVjdGlvbgAAAAAAAAAAAAAAAAAAAHJhbnNmZXItZW5jb2RpbmdwZ3JhZGUNCg0KDQpTTQ0KDQpUVFAvQ0UvVFNQLwAAAAAAAAAAAAAAAAECAAEDAAAAAAAAAAAAAAAAAAAAAAAABAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAABAgABAwAAAAAAAAAAAAAAAAAAAAAAAAQBAQUBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAQAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAABAAACAAAAAAAAAAAAAAAAAAAAAAAAAwQAAAQEBAQEBAQEBAQEBQQEBAQEBAQEBAQEBAAEAAYHBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQABAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAEAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAgAAAAACAAAAAAAAAAAAAAAAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE5PVU5DRUVDS09VVE5FQ1RFVEVDUklCRUxVU0hFVEVBRFNFQVJDSFJHRUNUSVZJVFlMRU5EQVJWRU9USUZZUFRJT05TQ0hTRUFZU1RBVENIR0VPUkRJUkVDVE9SVFJDSFBBUkFNRVRFUlVSQ0VCU0NSSUJFQVJET1dOQUNFSU5ETktDS1VCU0NSSUJFSFRUUC9BRFRQLw==";
  return llhttp_simdWasm;
}
const assert$5 = require$$0$3;
const net = require$$0$5;
const http$1 = require$$2;
const { pipeline: pipeline$1 } = require$$0$4;
const util$e = util$j;
const timers = timers$1;
const Request2 = request$2;
const DispatcherBase$3 = dispatcherBase;
const {
  RequestContentLengthMismatchError: RequestContentLengthMismatchError2,
  ResponseContentLengthMismatchError: ResponseContentLengthMismatchError2,
  InvalidArgumentError: InvalidArgumentError$g,
  RequestAbortedError: RequestAbortedError$8,
  HeadersTimeoutError: HeadersTimeoutError2,
  HeadersOverflowError: HeadersOverflowError2,
  SocketError: SocketError$2,
  InformationalError: InformationalError2,
  BodyTimeoutError: BodyTimeoutError2,
  HTTPParserError: HTTPParserError2,
  ResponseExceededMaxSizeError: ResponseExceededMaxSizeError2,
  ClientDestroyedError: ClientDestroyedError2
} = errors$1;
const buildConnector$3 = connect$2;
const {
  kUrl: kUrl$3,
  kReset,
  kServerName,
  kClient: kClient$1,
  kBusy: kBusy$1,
  kParser,
  kConnect,
  kBlocking,
  kResuming,
  kRunning: kRunning$3,
  kPending: kPending$2,
  kSize: kSize$4,
  kWriting,
  kQueue: kQueue$1,
  kConnected: kConnected$5,
  kConnecting,
  kNeedDrain: kNeedDrain$3,
  kNoRef,
  kKeepAliveDefaultTimeout,
  kHostHeader,
  kPendingIdx,
  kRunningIdx,
  kError,
  kPipelining,
  kSocket,
  kKeepAliveTimeoutValue,
  kMaxHeadersSize,
  kKeepAliveMaxTimeout,
  kKeepAliveTimeoutThreshold,
  kHeadersTimeout,
  kBodyTimeout,
  kStrictContentLength,
  kConnector,
  kMaxRedirections: kMaxRedirections$1,
  kMaxRequests,
  kCounter,
  kClose: kClose$5,
  kDestroy: kDestroy$3,
  kDispatch: kDispatch$2,
  kInterceptors: kInterceptors$4,
  kLocalAddress,
  kMaxResponseSize,
  kHTTPConnVersion,
  // HTTP2
  kHost,
  kHTTP2Session,
  kHTTP2SessionState,
  kHTTP2BuildRequest,
  kHTTP2CopyHeaders,
  kHTTP1BuildRequest
} = symbols$4;
let http2;
try {
  http2 = require("http2");
} catch {
  http2 = { constants: {} };
}
const {
  constants: {
    HTTP2_HEADER_AUTHORITY,
    HTTP2_HEADER_METHOD,
    HTTP2_HEADER_PATH,
    HTTP2_HEADER_SCHEME,
    HTTP2_HEADER_CONTENT_LENGTH,
    HTTP2_HEADER_EXPECT,
    HTTP2_HEADER_STATUS
  }
} = http2;
let h2ExperimentalWarned = false;
const FastBuffer = Buffer[Symbol.species];
const kClosedResolve$1 = Symbol("kClosedResolve");
const channels = {};
try {
  const diagnosticsChannel = require("diagnostics_channel");
  channels.sendHeaders = diagnosticsChannel.channel("undici:client:sendHeaders");
  channels.beforeConnect = diagnosticsChannel.channel("undici:client:beforeConnect");
  channels.connectError = diagnosticsChannel.channel("undici:client:connectError");
  channels.connected = diagnosticsChannel.channel("undici:client:connected");
} catch {
  channels.sendHeaders = { hasSubscribers: false };
  channels.beforeConnect = { hasSubscribers: false };
  channels.connectError = { hasSubscribers: false };
  channels.connected = { hasSubscribers: false };
}
let Client$4 = class Client extends DispatcherBase$3 {
  /**
   *
   * @param {string|URL} url
   * @param {import('../types/client').Client.Options} options
   */
  constructor(url, {
    interceptors,
    maxHeaderSize,
    headersTimeout,
    socketTimeout,
    requestTimeout,
    connectTimeout,
    bodyTimeout,
    idleTimeout,
    keepAlive,
    keepAliveTimeout,
    maxKeepAliveTimeout,
    keepAliveMaxTimeout,
    keepAliveTimeoutThreshold,
    socketPath,
    pipelining,
    tls: tls2,
    strictContentLength,
    maxCachedSessions,
    maxRedirections,
    connect: connect2,
    maxRequestsPerClient,
    localAddress,
    maxResponseSize,
    autoSelectFamily,
    autoSelectFamilyAttemptTimeout,
    // h2
    allowH2,
    maxConcurrentStreams
  } = {}) {
    super();
    if (keepAlive !== void 0) {
      throw new InvalidArgumentError$g("unsupported keepAlive, use pipelining=0 instead");
    }
    if (socketTimeout !== void 0) {
      throw new InvalidArgumentError$g("unsupported socketTimeout, use headersTimeout & bodyTimeout instead");
    }
    if (requestTimeout !== void 0) {
      throw new InvalidArgumentError$g("unsupported requestTimeout, use headersTimeout & bodyTimeout instead");
    }
    if (idleTimeout !== void 0) {
      throw new InvalidArgumentError$g("unsupported idleTimeout, use keepAliveTimeout instead");
    }
    if (maxKeepAliveTimeout !== void 0) {
      throw new InvalidArgumentError$g("unsupported maxKeepAliveTimeout, use keepAliveMaxTimeout instead");
    }
    if (maxHeaderSize != null && !Number.isFinite(maxHeaderSize)) {
      throw new InvalidArgumentError$g("invalid maxHeaderSize");
    }
    if (socketPath != null && typeof socketPath !== "string") {
      throw new InvalidArgumentError$g("invalid socketPath");
    }
    if (connectTimeout != null && (!Number.isFinite(connectTimeout) || connectTimeout < 0)) {
      throw new InvalidArgumentError$g("invalid connectTimeout");
    }
    if (keepAliveTimeout != null && (!Number.isFinite(keepAliveTimeout) || keepAliveTimeout <= 0)) {
      throw new InvalidArgumentError$g("invalid keepAliveTimeout");
    }
    if (keepAliveMaxTimeout != null && (!Number.isFinite(keepAliveMaxTimeout) || keepAliveMaxTimeout <= 0)) {
      throw new InvalidArgumentError$g("invalid keepAliveMaxTimeout");
    }
    if (keepAliveTimeoutThreshold != null && !Number.isFinite(keepAliveTimeoutThreshold)) {
      throw new InvalidArgumentError$g("invalid keepAliveTimeoutThreshold");
    }
    if (headersTimeout != null && (!Number.isInteger(headersTimeout) || headersTimeout < 0)) {
      throw new InvalidArgumentError$g("headersTimeout must be a positive integer or zero");
    }
    if (bodyTimeout != null && (!Number.isInteger(bodyTimeout) || bodyTimeout < 0)) {
      throw new InvalidArgumentError$g("bodyTimeout must be a positive integer or zero");
    }
    if (connect2 != null && typeof connect2 !== "function" && typeof connect2 !== "object") {
      throw new InvalidArgumentError$g("connect must be a function or an object");
    }
    if (maxRedirections != null && (!Number.isInteger(maxRedirections) || maxRedirections < 0)) {
      throw new InvalidArgumentError$g("maxRedirections must be a positive number");
    }
    if (maxRequestsPerClient != null && (!Number.isInteger(maxRequestsPerClient) || maxRequestsPerClient < 0)) {
      throw new InvalidArgumentError$g("maxRequestsPerClient must be a positive number");
    }
    if (localAddress != null && (typeof localAddress !== "string" || net.isIP(localAddress) === 0)) {
      throw new InvalidArgumentError$g("localAddress must be valid string IP address");
    }
    if (maxResponseSize != null && (!Number.isInteger(maxResponseSize) || maxResponseSize < -1)) {
      throw new InvalidArgumentError$g("maxResponseSize must be a positive number");
    }
    if (autoSelectFamilyAttemptTimeout != null && (!Number.isInteger(autoSelectFamilyAttemptTimeout) || autoSelectFamilyAttemptTimeout < -1)) {
      throw new InvalidArgumentError$g("autoSelectFamilyAttemptTimeout must be a positive number");
    }
    if (allowH2 != null && typeof allowH2 !== "boolean") {
      throw new InvalidArgumentError$g("allowH2 must be a valid boolean value");
    }
    if (maxConcurrentStreams != null && (typeof maxConcurrentStreams !== "number" || maxConcurrentStreams < 1)) {
      throw new InvalidArgumentError$g("maxConcurrentStreams must be a possitive integer, greater than 0");
    }
    if (typeof connect2 !== "function") {
      connect2 = buildConnector$3({
        ...tls2,
        maxCachedSessions,
        allowH2,
        socketPath,
        timeout: connectTimeout,
        ...util$e.nodeHasAutoSelectFamily && autoSelectFamily ? { autoSelectFamily, autoSelectFamilyAttemptTimeout } : void 0,
        ...connect2
      });
    }
    this[kInterceptors$4] = interceptors && interceptors.Client && Array.isArray(interceptors.Client) ? interceptors.Client : [createRedirectInterceptor$2({ maxRedirections })];
    this[kUrl$3] = util$e.parseOrigin(url);
    this[kConnector] = connect2;
    this[kSocket] = null;
    this[kPipelining] = pipelining != null ? pipelining : 1;
    this[kMaxHeadersSize] = maxHeaderSize || http$1.maxHeaderSize;
    this[kKeepAliveDefaultTimeout] = keepAliveTimeout == null ? 4e3 : keepAliveTimeout;
    this[kKeepAliveMaxTimeout] = keepAliveMaxTimeout == null ? 6e5 : keepAliveMaxTimeout;
    this[kKeepAliveTimeoutThreshold] = keepAliveTimeoutThreshold == null ? 1e3 : keepAliveTimeoutThreshold;
    this[kKeepAliveTimeoutValue] = this[kKeepAliveDefaultTimeout];
    this[kServerName] = null;
    this[kLocalAddress] = localAddress != null ? localAddress : null;
    this[kResuming] = 0;
    this[kNeedDrain$3] = 0;
    this[kHostHeader] = `host: ${this[kUrl$3].hostname}${this[kUrl$3].port ? `:${this[kUrl$3].port}` : ""}\r
`;
    this[kBodyTimeout] = bodyTimeout != null ? bodyTimeout : 3e5;
    this[kHeadersTimeout] = headersTimeout != null ? headersTimeout : 3e5;
    this[kStrictContentLength] = strictContentLength == null ? true : strictContentLength;
    this[kMaxRedirections$1] = maxRedirections;
    this[kMaxRequests] = maxRequestsPerClient;
    this[kClosedResolve$1] = null;
    this[kMaxResponseSize] = maxResponseSize > -1 ? maxResponseSize : -1;
    this[kHTTPConnVersion] = "h1";
    this[kHTTP2Session] = null;
    this[kHTTP2SessionState] = !allowH2 ? null : {
      // streams: null, // Fixed queue of streams - For future support of `push`
      openStreams: 0,
      // Keep track of them to decide wether or not unref the session
      maxConcurrentStreams: maxConcurrentStreams != null ? maxConcurrentStreams : 100
      // Max peerConcurrentStreams for a Node h2 server
    };
    this[kHost] = `${this[kUrl$3].hostname}${this[kUrl$3].port ? `:${this[kUrl$3].port}` : ""}`;
    this[kQueue$1] = [];
    this[kRunningIdx] = 0;
    this[kPendingIdx] = 0;
  }
  get pipelining() {
    return this[kPipelining];
  }
  set pipelining(value) {
    this[kPipelining] = value;
    resume(this, true);
  }
  get [kPending$2]() {
    return this[kQueue$1].length - this[kPendingIdx];
  }
  get [kRunning$3]() {
    return this[kPendingIdx] - this[kRunningIdx];
  }
  get [kSize$4]() {
    return this[kQueue$1].length - this[kRunningIdx];
  }
  get [kConnected$5]() {
    return !!this[kSocket] && !this[kConnecting] && !this[kSocket].destroyed;
  }
  get [kBusy$1]() {
    const socket = this[kSocket];
    return socket && (socket[kReset] || socket[kWriting] || socket[kBlocking]) || this[kSize$4] >= (this[kPipelining] || 1) || this[kPending$2] > 0;
  }
  /* istanbul ignore: only used for test */
  [kConnect](cb) {
    connect$1(this);
    this.once("connect", cb);
  }
  [kDispatch$2](opts, handler) {
    const origin = opts.origin || this[kUrl$3].origin;
    const request2 = this[kHTTPConnVersion] === "h2" ? Request2[kHTTP2BuildRequest](origin, opts, handler) : Request2[kHTTP1BuildRequest](origin, opts, handler);
    this[kQueue$1].push(request2);
    if (this[kResuming])
      ;
    else if (util$e.bodyLength(request2.body) == null && util$e.isIterable(request2.body)) {
      this[kResuming] = 1;
      process.nextTick(resume, this);
    } else {
      resume(this, true);
    }
    if (this[kResuming] && this[kNeedDrain$3] !== 2 && this[kBusy$1]) {
      this[kNeedDrain$3] = 2;
    }
    return this[kNeedDrain$3] < 2;
  }
  async [kClose$5]() {
    return new Promise((resolve) => {
      if (!this[kSize$4]) {
        resolve(null);
      } else {
        this[kClosedResolve$1] = resolve;
      }
    });
  }
  async [kDestroy$3](err) {
    return new Promise((resolve) => {
      const requests = this[kQueue$1].splice(this[kPendingIdx]);
      for (let i = 0; i < requests.length; i++) {
        const request2 = requests[i];
        errorRequest(this, request2, err);
      }
      const callback = () => {
        if (this[kClosedResolve$1]) {
          this[kClosedResolve$1]();
          this[kClosedResolve$1] = null;
        }
        resolve();
      };
      if (this[kHTTP2Session] != null) {
        util$e.destroy(this[kHTTP2Session], err);
        this[kHTTP2Session] = null;
        this[kHTTP2SessionState] = null;
      }
      if (!this[kSocket]) {
        queueMicrotask(callback);
      } else {
        util$e.destroy(this[kSocket].on("close", callback), err);
      }
      resume(this);
    });
  }
};
function onHttp2SessionError(err) {
  assert$5(err.code !== "ERR_TLS_CERT_ALTNAME_INVALID");
  this[kSocket][kError] = err;
  onError(this[kClient$1], err);
}
function onHttp2FrameError(type, code, id) {
  const err = new InformationalError2(`HTTP/2: "frameError" received - type ${type}, code ${code}`);
  if (id === 0) {
    this[kSocket][kError] = err;
    onError(this[kClient$1], err);
  }
}
function onHttp2SessionEnd() {
  util$e.destroy(this, new SocketError$2("other side closed"));
  util$e.destroy(this[kSocket], new SocketError$2("other side closed"));
}
function onHTTP2GoAway(code) {
  const client2 = this[kClient$1];
  const err = new InformationalError2(`HTTP/2: "GOAWAY" frame received with code ${code}`);
  client2[kSocket] = null;
  client2[kHTTP2Session] = null;
  if (client2.destroyed) {
    assert$5(this[kPending$2] === 0);
    const requests = client2[kQueue$1].splice(client2[kRunningIdx]);
    for (let i = 0; i < requests.length; i++) {
      const request2 = requests[i];
      errorRequest(this, request2, err);
    }
  } else if (client2[kRunning$3] > 0) {
    const request2 = client2[kQueue$1][client2[kRunningIdx]];
    client2[kQueue$1][client2[kRunningIdx]++] = null;
    errorRequest(client2, request2, err);
  }
  client2[kPendingIdx] = client2[kRunningIdx];
  assert$5(client2[kRunning$3] === 0);
  client2.emit(
    "disconnect",
    client2[kUrl$3],
    [client2],
    err
  );
  resume(client2);
}
const constants$2 = requireConstants$2();
const createRedirectInterceptor$2 = redirectInterceptor;
const EMPTY_BUF = Buffer.alloc(0);
async function lazyllhttp() {
  const llhttpWasmData = process.env.JEST_WORKER_ID ? requireLlhttpWasm() : void 0;
  let mod;
  try {
    mod = await WebAssembly.compile(Buffer.from(requireLlhttp_simdWasm(), "base64"));
  } catch (e) {
    mod = await WebAssembly.compile(Buffer.from(llhttpWasmData || requireLlhttpWasm(), "base64"));
  }
  return await WebAssembly.instantiate(mod, {
    env: {
      /* eslint-disable camelcase */
      wasm_on_url: (p, at, len) => {
        return 0;
      },
      wasm_on_status: (p, at, len) => {
        assert$5.strictEqual(currentParser.ptr, p);
        const start = at - currentBufferPtr + currentBufferRef.byteOffset;
        return currentParser.onStatus(new FastBuffer(currentBufferRef.buffer, start, len)) || 0;
      },
      wasm_on_message_begin: (p) => {
        assert$5.strictEqual(currentParser.ptr, p);
        return currentParser.onMessageBegin() || 0;
      },
      wasm_on_header_field: (p, at, len) => {
        assert$5.strictEqual(currentParser.ptr, p);
        const start = at - currentBufferPtr + currentBufferRef.byteOffset;
        return currentParser.onHeaderField(new FastBuffer(currentBufferRef.buffer, start, len)) || 0;
      },
      wasm_on_header_value: (p, at, len) => {
        assert$5.strictEqual(currentParser.ptr, p);
        const start = at - currentBufferPtr + currentBufferRef.byteOffset;
        return currentParser.onHeaderValue(new FastBuffer(currentBufferRef.buffer, start, len)) || 0;
      },
      wasm_on_headers_complete: (p, statusCode, upgrade2, shouldKeepAlive) => {
        assert$5.strictEqual(currentParser.ptr, p);
        return currentParser.onHeadersComplete(statusCode, Boolean(upgrade2), Boolean(shouldKeepAlive)) || 0;
      },
      wasm_on_body: (p, at, len) => {
        assert$5.strictEqual(currentParser.ptr, p);
        const start = at - currentBufferPtr + currentBufferRef.byteOffset;
        return currentParser.onBody(new FastBuffer(currentBufferRef.buffer, start, len)) || 0;
      },
      wasm_on_message_complete: (p) => {
        assert$5.strictEqual(currentParser.ptr, p);
        return currentParser.onMessageComplete() || 0;
      }
      /* eslint-enable camelcase */
    }
  });
}
let llhttpInstance = null;
let llhttpPromise = lazyllhttp();
llhttpPromise.catch();
let currentParser = null;
let currentBufferRef = null;
let currentBufferSize = 0;
let currentBufferPtr = null;
const TIMEOUT_HEADERS = 1;
const TIMEOUT_BODY = 2;
const TIMEOUT_IDLE = 3;
class Parser {
  constructor(client2, socket, { exports }) {
    assert$5(Number.isFinite(client2[kMaxHeadersSize]) && client2[kMaxHeadersSize] > 0);
    this.llhttp = exports;
    this.ptr = this.llhttp.llhttp_alloc(constants$2.TYPE.RESPONSE);
    this.client = client2;
    this.socket = socket;
    this.timeout = null;
    this.timeoutValue = null;
    this.timeoutType = null;
    this.statusCode = null;
    this.statusText = "";
    this.upgrade = false;
    this.headers = [];
    this.headersSize = 0;
    this.headersMaxSize = client2[kMaxHeadersSize];
    this.shouldKeepAlive = false;
    this.paused = false;
    this.resume = this.resume.bind(this);
    this.bytesRead = 0;
    this.keepAlive = "";
    this.contentLength = "";
    this.connection = "";
    this.maxResponseSize = client2[kMaxResponseSize];
  }
  setTimeout(value, type) {
    this.timeoutType = type;
    if (value !== this.timeoutValue) {
      timers.clearTimeout(this.timeout);
      if (value) {
        this.timeout = timers.setTimeout(onParserTimeout, value, this);
        if (this.timeout.unref) {
          this.timeout.unref();
        }
      } else {
        this.timeout = null;
      }
      this.timeoutValue = value;
    } else if (this.timeout) {
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }
  }
  resume() {
    if (this.socket.destroyed || !this.paused) {
      return;
    }
    assert$5(this.ptr != null);
    assert$5(currentParser == null);
    this.llhttp.llhttp_resume(this.ptr);
    assert$5(this.timeoutType === TIMEOUT_BODY);
    if (this.timeout) {
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }
    this.paused = false;
    this.execute(this.socket.read() || EMPTY_BUF);
    this.readMore();
  }
  readMore() {
    while (!this.paused && this.ptr) {
      const chunk = this.socket.read();
      if (chunk === null) {
        break;
      }
      this.execute(chunk);
    }
  }
  execute(data) {
    assert$5(this.ptr != null);
    assert$5(currentParser == null);
    assert$5(!this.paused);
    const { socket, llhttp } = this;
    if (data.length > currentBufferSize) {
      if (currentBufferPtr) {
        llhttp.free(currentBufferPtr);
      }
      currentBufferSize = Math.ceil(data.length / 4096) * 4096;
      currentBufferPtr = llhttp.malloc(currentBufferSize);
    }
    new Uint8Array(llhttp.memory.buffer, currentBufferPtr, currentBufferSize).set(data);
    try {
      let ret;
      try {
        currentBufferRef = data;
        currentParser = this;
        ret = llhttp.llhttp_execute(this.ptr, currentBufferPtr, data.length);
      } catch (err) {
        throw err;
      } finally {
        currentParser = null;
        currentBufferRef = null;
      }
      const offset = llhttp.llhttp_get_error_pos(this.ptr) - currentBufferPtr;
      if (ret === constants$2.ERROR.PAUSED_UPGRADE) {
        this.onUpgrade(data.slice(offset));
      } else if (ret === constants$2.ERROR.PAUSED) {
        this.paused = true;
        socket.unshift(data.slice(offset));
      } else if (ret !== constants$2.ERROR.OK) {
        const ptr = llhttp.llhttp_get_error_reason(this.ptr);
        let message = "";
        if (ptr) {
          const len = new Uint8Array(llhttp.memory.buffer, ptr).indexOf(0);
          message = "Response does not match the HTTP/1.1 protocol (" + Buffer.from(llhttp.memory.buffer, ptr, len).toString() + ")";
        }
        throw new HTTPParserError2(message, constants$2.ERROR[ret], data.slice(offset));
      }
    } catch (err) {
      util$e.destroy(socket, err);
    }
  }
  destroy() {
    assert$5(this.ptr != null);
    assert$5(currentParser == null);
    this.llhttp.llhttp_free(this.ptr);
    this.ptr = null;
    timers.clearTimeout(this.timeout);
    this.timeout = null;
    this.timeoutValue = null;
    this.timeoutType = null;
    this.paused = false;
  }
  onStatus(buf) {
    this.statusText = buf.toString();
  }
  onMessageBegin() {
    const { socket, client: client2 } = this;
    if (socket.destroyed) {
      return -1;
    }
    const request2 = client2[kQueue$1][client2[kRunningIdx]];
    if (!request2) {
      return -1;
    }
  }
  onHeaderField(buf) {
    const len = this.headers.length;
    if ((len & 1) === 0) {
      this.headers.push(buf);
    } else {
      this.headers[len - 1] = Buffer.concat([this.headers[len - 1], buf]);
    }
    this.trackHeader(buf.length);
  }
  onHeaderValue(buf) {
    let len = this.headers.length;
    if ((len & 1) === 1) {
      this.headers.push(buf);
      len += 1;
    } else {
      this.headers[len - 1] = Buffer.concat([this.headers[len - 1], buf]);
    }
    const key = this.headers[len - 2];
    if (key.length === 10 && key.toString().toLowerCase() === "keep-alive") {
      this.keepAlive += buf.toString();
    } else if (key.length === 10 && key.toString().toLowerCase() === "connection") {
      this.connection += buf.toString();
    } else if (key.length === 14 && key.toString().toLowerCase() === "content-length") {
      this.contentLength += buf.toString();
    }
    this.trackHeader(buf.length);
  }
  trackHeader(len) {
    this.headersSize += len;
    if (this.headersSize >= this.headersMaxSize) {
      util$e.destroy(this.socket, new HeadersOverflowError2());
    }
  }
  onUpgrade(head) {
    const { upgrade: upgrade2, client: client2, socket, headers: headers2, statusCode } = this;
    assert$5(upgrade2);
    const request2 = client2[kQueue$1][client2[kRunningIdx]];
    assert$5(request2);
    assert$5(!socket.destroyed);
    assert$5(socket === client2[kSocket]);
    assert$5(!this.paused);
    assert$5(request2.upgrade || request2.method === "CONNECT");
    this.statusCode = null;
    this.statusText = "";
    this.shouldKeepAlive = null;
    assert$5(this.headers.length % 2 === 0);
    this.headers = [];
    this.headersSize = 0;
    socket.unshift(head);
    socket[kParser].destroy();
    socket[kParser] = null;
    socket[kClient$1] = null;
    socket[kError] = null;
    socket.removeListener("error", onSocketError).removeListener("readable", onSocketReadable).removeListener("end", onSocketEnd).removeListener("close", onSocketClose);
    client2[kSocket] = null;
    client2[kQueue$1][client2[kRunningIdx]++] = null;
    client2.emit("disconnect", client2[kUrl$3], [client2], new InformationalError2("upgrade"));
    try {
      request2.onUpgrade(statusCode, headers2, socket);
    } catch (err) {
      util$e.destroy(socket, err);
    }
    resume(client2);
  }
  onHeadersComplete(statusCode, upgrade2, shouldKeepAlive) {
    const { client: client2, socket, headers: headers2, statusText } = this;
    if (socket.destroyed) {
      return -1;
    }
    const request2 = client2[kQueue$1][client2[kRunningIdx]];
    if (!request2) {
      return -1;
    }
    assert$5(!this.upgrade);
    assert$5(this.statusCode < 200);
    if (statusCode === 100) {
      util$e.destroy(socket, new SocketError$2("bad response", util$e.getSocketInfo(socket)));
      return -1;
    }
    if (upgrade2 && !request2.upgrade) {
      util$e.destroy(socket, new SocketError$2("bad upgrade", util$e.getSocketInfo(socket)));
      return -1;
    }
    assert$5.strictEqual(this.timeoutType, TIMEOUT_HEADERS);
    this.statusCode = statusCode;
    this.shouldKeepAlive = shouldKeepAlive || // Override llhttp value which does not allow keepAlive for HEAD.
    request2.method === "HEAD" && !socket[kReset] && this.connection.toLowerCase() === "keep-alive";
    if (this.statusCode >= 200) {
      const bodyTimeout = request2.bodyTimeout != null ? request2.bodyTimeout : client2[kBodyTimeout];
      this.setTimeout(bodyTimeout, TIMEOUT_BODY);
    } else if (this.timeout) {
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }
    if (request2.method === "CONNECT") {
      assert$5(client2[kRunning$3] === 1);
      this.upgrade = true;
      return 2;
    }
    if (upgrade2) {
      assert$5(client2[kRunning$3] === 1);
      this.upgrade = true;
      return 2;
    }
    assert$5(this.headers.length % 2 === 0);
    this.headers = [];
    this.headersSize = 0;
    if (this.shouldKeepAlive && client2[kPipelining]) {
      const keepAliveTimeout = this.keepAlive ? util$e.parseKeepAliveTimeout(this.keepAlive) : null;
      if (keepAliveTimeout != null) {
        const timeout = Math.min(
          keepAliveTimeout - client2[kKeepAliveTimeoutThreshold],
          client2[kKeepAliveMaxTimeout]
        );
        if (timeout <= 0) {
          socket[kReset] = true;
        } else {
          client2[kKeepAliveTimeoutValue] = timeout;
        }
      } else {
        client2[kKeepAliveTimeoutValue] = client2[kKeepAliveDefaultTimeout];
      }
    } else {
      socket[kReset] = true;
    }
    const pause = request2.onHeaders(statusCode, headers2, this.resume, statusText) === false;
    if (request2.aborted) {
      return -1;
    }
    if (request2.method === "HEAD") {
      return 1;
    }
    if (statusCode < 200) {
      return 1;
    }
    if (socket[kBlocking]) {
      socket[kBlocking] = false;
      resume(client2);
    }
    return pause ? constants$2.ERROR.PAUSED : 0;
  }
  onBody(buf) {
    const { client: client2, socket, statusCode, maxResponseSize } = this;
    if (socket.destroyed) {
      return -1;
    }
    const request2 = client2[kQueue$1][client2[kRunningIdx]];
    assert$5(request2);
    assert$5.strictEqual(this.timeoutType, TIMEOUT_BODY);
    if (this.timeout) {
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }
    assert$5(statusCode >= 200);
    if (maxResponseSize > -1 && this.bytesRead + buf.length > maxResponseSize) {
      util$e.destroy(socket, new ResponseExceededMaxSizeError2());
      return -1;
    }
    this.bytesRead += buf.length;
    if (request2.onData(buf) === false) {
      return constants$2.ERROR.PAUSED;
    }
  }
  onMessageComplete() {
    const { client: client2, socket, statusCode, upgrade: upgrade2, headers: headers2, contentLength, bytesRead, shouldKeepAlive } = this;
    if (socket.destroyed && (!statusCode || shouldKeepAlive)) {
      return -1;
    }
    if (upgrade2) {
      return;
    }
    const request2 = client2[kQueue$1][client2[kRunningIdx]];
    assert$5(request2);
    assert$5(statusCode >= 100);
    this.statusCode = null;
    this.statusText = "";
    this.bytesRead = 0;
    this.contentLength = "";
    this.keepAlive = "";
    this.connection = "";
    assert$5(this.headers.length % 2 === 0);
    this.headers = [];
    this.headersSize = 0;
    if (statusCode < 200) {
      return;
    }
    if (request2.method !== "HEAD" && contentLength && bytesRead !== parseInt(contentLength, 10)) {
      util$e.destroy(socket, new ResponseContentLengthMismatchError2());
      return -1;
    }
    request2.onComplete(headers2);
    client2[kQueue$1][client2[kRunningIdx]++] = null;
    if (socket[kWriting]) {
      assert$5.strictEqual(client2[kRunning$3], 0);
      util$e.destroy(socket, new InformationalError2("reset"));
      return constants$2.ERROR.PAUSED;
    } else if (!shouldKeepAlive) {
      util$e.destroy(socket, new InformationalError2("reset"));
      return constants$2.ERROR.PAUSED;
    } else if (socket[kReset] && client2[kRunning$3] === 0) {
      util$e.destroy(socket, new InformationalError2("reset"));
      return constants$2.ERROR.PAUSED;
    } else if (client2[kPipelining] === 1) {
      setImmediate(resume, client2);
    } else {
      resume(client2);
    }
  }
}
function onParserTimeout(parser) {
  const { socket, timeoutType, client: client2 } = parser;
  if (timeoutType === TIMEOUT_HEADERS) {
    if (!socket[kWriting] || socket.writableNeedDrain || client2[kRunning$3] > 1) {
      assert$5(!parser.paused, "cannot be paused while waiting for headers");
      util$e.destroy(socket, new HeadersTimeoutError2());
    }
  } else if (timeoutType === TIMEOUT_BODY) {
    if (!parser.paused) {
      util$e.destroy(socket, new BodyTimeoutError2());
    }
  } else if (timeoutType === TIMEOUT_IDLE) {
    assert$5(client2[kRunning$3] === 0 && client2[kKeepAliveTimeoutValue]);
    util$e.destroy(socket, new InformationalError2("socket idle timeout"));
  }
}
function onSocketReadable() {
  const { [kParser]: parser } = this;
  if (parser) {
    parser.readMore();
  }
}
function onSocketError(err) {
  const { [kClient$1]: client2, [kParser]: parser } = this;
  assert$5(err.code !== "ERR_TLS_CERT_ALTNAME_INVALID");
  if (client2[kHTTPConnVersion] !== "h2") {
    if (err.code === "ECONNRESET" && parser.statusCode && !parser.shouldKeepAlive) {
      parser.onMessageComplete();
      return;
    }
  }
  this[kError] = err;
  onError(this[kClient$1], err);
}
function onError(client2, err) {
  if (client2[kRunning$3] === 0 && err.code !== "UND_ERR_INFO" && err.code !== "UND_ERR_SOCKET") {
    assert$5(client2[kPendingIdx] === client2[kRunningIdx]);
    const requests = client2[kQueue$1].splice(client2[kRunningIdx]);
    for (let i = 0; i < requests.length; i++) {
      const request2 = requests[i];
      errorRequest(client2, request2, err);
    }
    assert$5(client2[kSize$4] === 0);
  }
}
function onSocketEnd() {
  const { [kParser]: parser, [kClient$1]: client2 } = this;
  if (client2[kHTTPConnVersion] !== "h2") {
    if (parser.statusCode && !parser.shouldKeepAlive) {
      parser.onMessageComplete();
      return;
    }
  }
  util$e.destroy(this, new SocketError$2("other side closed", util$e.getSocketInfo(this)));
}
function onSocketClose() {
  const { [kClient$1]: client2, [kParser]: parser } = this;
  if (client2[kHTTPConnVersion] === "h1" && parser) {
    if (!this[kError] && parser.statusCode && !parser.shouldKeepAlive) {
      parser.onMessageComplete();
    }
    this[kParser].destroy();
    this[kParser] = null;
  }
  const err = this[kError] || new SocketError$2("closed", util$e.getSocketInfo(this));
  client2[kSocket] = null;
  if (client2.destroyed) {
    assert$5(client2[kPending$2] === 0);
    const requests = client2[kQueue$1].splice(client2[kRunningIdx]);
    for (let i = 0; i < requests.length; i++) {
      const request2 = requests[i];
      errorRequest(client2, request2, err);
    }
  } else if (client2[kRunning$3] > 0 && err.code !== "UND_ERR_INFO") {
    const request2 = client2[kQueue$1][client2[kRunningIdx]];
    client2[kQueue$1][client2[kRunningIdx]++] = null;
    errorRequest(client2, request2, err);
  }
  client2[kPendingIdx] = client2[kRunningIdx];
  assert$5(client2[kRunning$3] === 0);
  client2.emit("disconnect", client2[kUrl$3], [client2], err);
  resume(client2);
}
async function connect$1(client2) {
  assert$5(!client2[kConnecting]);
  assert$5(!client2[kSocket]);
  let { host, hostname, protocol, port } = client2[kUrl$3];
  if (hostname[0] === "[") {
    const idx = hostname.indexOf("]");
    assert$5(idx !== -1);
    const ip = hostname.substring(1, idx);
    assert$5(net.isIP(ip));
    hostname = ip;
  }
  client2[kConnecting] = true;
  if (channels.beforeConnect.hasSubscribers) {
    channels.beforeConnect.publish({
      connectParams: {
        host,
        hostname,
        protocol,
        port,
        servername: client2[kServerName],
        localAddress: client2[kLocalAddress]
      },
      connector: client2[kConnector]
    });
  }
  try {
    const socket = await new Promise((resolve, reject) => {
      client2[kConnector]({
        host,
        hostname,
        protocol,
        port,
        servername: client2[kServerName],
        localAddress: client2[kLocalAddress]
      }, (err, socket2) => {
        if (err) {
          reject(err);
        } else {
          resolve(socket2);
        }
      });
    });
    if (client2.destroyed) {
      util$e.destroy(socket.on("error", () => {
      }), new ClientDestroyedError2());
      return;
    }
    client2[kConnecting] = false;
    assert$5(socket);
    const isH2 = socket.alpnProtocol === "h2";
    if (isH2) {
      if (!h2ExperimentalWarned) {
        h2ExperimentalWarned = true;
        process.emitWarning("H2 support is experimental, expect them to change at any time.", {
          code: "UNDICI-H2"
        });
      }
      const session = http2.connect(client2[kUrl$3], {
        createConnection: () => socket,
        peerMaxConcurrentStreams: client2[kHTTP2SessionState].maxConcurrentStreams
      });
      client2[kHTTPConnVersion] = "h2";
      session[kClient$1] = client2;
      session[kSocket] = socket;
      session.on("error", onHttp2SessionError);
      session.on("frameError", onHttp2FrameError);
      session.on("end", onHttp2SessionEnd);
      session.on("goaway", onHTTP2GoAway);
      session.on("close", onSocketClose);
      session.unref();
      client2[kHTTP2Session] = session;
      socket[kHTTP2Session] = session;
    } else {
      if (!llhttpInstance) {
        llhttpInstance = await llhttpPromise;
        llhttpPromise = null;
      }
      socket[kNoRef] = false;
      socket[kWriting] = false;
      socket[kReset] = false;
      socket[kBlocking] = false;
      socket[kParser] = new Parser(client2, socket, llhttpInstance);
    }
    socket[kCounter] = 0;
    socket[kMaxRequests] = client2[kMaxRequests];
    socket[kClient$1] = client2;
    socket[kError] = null;
    socket.on("error", onSocketError).on("readable", onSocketReadable).on("end", onSocketEnd).on("close", onSocketClose);
    client2[kSocket] = socket;
    if (channels.connected.hasSubscribers) {
      channels.connected.publish({
        connectParams: {
          host,
          hostname,
          protocol,
          port,
          servername: client2[kServerName],
          localAddress: client2[kLocalAddress]
        },
        connector: client2[kConnector],
        socket
      });
    }
    client2.emit("connect", client2[kUrl$3], [client2]);
  } catch (err) {
    if (client2.destroyed) {
      return;
    }
    client2[kConnecting] = false;
    if (channels.connectError.hasSubscribers) {
      channels.connectError.publish({
        connectParams: {
          host,
          hostname,
          protocol,
          port,
          servername: client2[kServerName],
          localAddress: client2[kLocalAddress]
        },
        connector: client2[kConnector],
        error: err
      });
    }
    if (err.code === "ERR_TLS_CERT_ALTNAME_INVALID") {
      assert$5(client2[kRunning$3] === 0);
      while (client2[kPending$2] > 0 && client2[kQueue$1][client2[kPendingIdx]].servername === client2[kServerName]) {
        const request2 = client2[kQueue$1][client2[kPendingIdx]++];
        errorRequest(client2, request2, err);
      }
    } else {
      onError(client2, err);
    }
    client2.emit("connectionError", client2[kUrl$3], [client2], err);
  }
  resume(client2);
}
function emitDrain(client2) {
  client2[kNeedDrain$3] = 0;
  client2.emit("drain", client2[kUrl$3], [client2]);
}
function resume(client2, sync) {
  if (client2[kResuming] === 2) {
    return;
  }
  client2[kResuming] = 2;
  _resume(client2, sync);
  client2[kResuming] = 0;
  if (client2[kRunningIdx] > 256) {
    client2[kQueue$1].splice(0, client2[kRunningIdx]);
    client2[kPendingIdx] -= client2[kRunningIdx];
    client2[kRunningIdx] = 0;
  }
}
function _resume(client2, sync) {
  while (true) {
    if (client2.destroyed) {
      assert$5(client2[kPending$2] === 0);
      return;
    }
    if (client2[kClosedResolve$1] && !client2[kSize$4]) {
      client2[kClosedResolve$1]();
      client2[kClosedResolve$1] = null;
      return;
    }
    const socket = client2[kSocket];
    if (socket && !socket.destroyed && socket.alpnProtocol !== "h2") {
      if (client2[kSize$4] === 0) {
        if (!socket[kNoRef] && socket.unref) {
          socket.unref();
          socket[kNoRef] = true;
        }
      } else if (socket[kNoRef] && socket.ref) {
        socket.ref();
        socket[kNoRef] = false;
      }
      if (client2[kSize$4] === 0) {
        if (socket[kParser].timeoutType !== TIMEOUT_IDLE) {
          socket[kParser].setTimeout(client2[kKeepAliveTimeoutValue], TIMEOUT_IDLE);
        }
      } else if (client2[kRunning$3] > 0 && socket[kParser].statusCode < 200) {
        if (socket[kParser].timeoutType !== TIMEOUT_HEADERS) {
          const request3 = client2[kQueue$1][client2[kRunningIdx]];
          const headersTimeout = request3.headersTimeout != null ? request3.headersTimeout : client2[kHeadersTimeout];
          socket[kParser].setTimeout(headersTimeout, TIMEOUT_HEADERS);
        }
      }
    }
    if (client2[kBusy$1]) {
      client2[kNeedDrain$3] = 2;
    } else if (client2[kNeedDrain$3] === 2) {
      if (sync) {
        client2[kNeedDrain$3] = 1;
        process.nextTick(emitDrain, client2);
      } else {
        emitDrain(client2);
      }
      continue;
    }
    if (client2[kPending$2] === 0) {
      return;
    }
    if (client2[kRunning$3] >= (client2[kPipelining] || 1)) {
      return;
    }
    const request2 = client2[kQueue$1][client2[kPendingIdx]];
    if (client2[kUrl$3].protocol === "https:" && client2[kServerName] !== request2.servername) {
      if (client2[kRunning$3] > 0) {
        return;
      }
      client2[kServerName] = request2.servername;
      if (socket && socket.servername !== request2.servername) {
        util$e.destroy(socket, new InformationalError2("servername changed"));
        return;
      }
    }
    if (client2[kConnecting]) {
      return;
    }
    if (!socket && !client2[kHTTP2Session]) {
      connect$1(client2);
      return;
    }
    if (socket.destroyed || socket[kWriting] || socket[kReset] || socket[kBlocking]) {
      return;
    }
    if (client2[kRunning$3] > 0 && !request2.idempotent) {
      return;
    }
    if (client2[kRunning$3] > 0 && (request2.upgrade || request2.method === "CONNECT")) {
      return;
    }
    if (client2[kRunning$3] > 0 && util$e.bodyLength(request2.body) !== 0 && (util$e.isStream(request2.body) || util$e.isAsyncIterable(request2.body))) {
      return;
    }
    if (!request2.aborted && write(client2, request2)) {
      client2[kPendingIdx]++;
    } else {
      client2[kQueue$1].splice(client2[kPendingIdx], 1);
    }
  }
}
function shouldSendContentLength(method) {
  return method !== "GET" && method !== "HEAD" && method !== "OPTIONS" && method !== "TRACE" && method !== "CONNECT";
}
function write(client2, request2) {
  if (client2[kHTTPConnVersion] === "h2") {
    writeH2(client2, client2[kHTTP2Session], request2);
    return;
  }
  const { body: body2, method, path: path2, host, upgrade: upgrade2, headers: headers2, blocking, reset } = request2;
  const expectsPayload = method === "PUT" || method === "POST" || method === "PATCH";
  if (body2 && typeof body2.read === "function") {
    body2.read(0);
  }
  const bodyLength2 = util$e.bodyLength(body2);
  let contentLength = bodyLength2;
  if (contentLength === null) {
    contentLength = request2.contentLength;
  }
  if (contentLength === 0 && !expectsPayload) {
    contentLength = null;
  }
  if (shouldSendContentLength(method) && contentLength > 0 && request2.contentLength !== null && request2.contentLength !== contentLength) {
    if (client2[kStrictContentLength]) {
      errorRequest(client2, request2, new RequestContentLengthMismatchError2());
      return false;
    }
    process.emitWarning(new RequestContentLengthMismatchError2());
  }
  const socket = client2[kSocket];
  try {
    request2.onConnect((err) => {
      if (request2.aborted || request2.completed) {
        return;
      }
      errorRequest(client2, request2, err || new RequestAbortedError$8());
      util$e.destroy(socket, new InformationalError2("aborted"));
    });
  } catch (err) {
    errorRequest(client2, request2, err);
  }
  if (request2.aborted) {
    return false;
  }
  if (method === "HEAD") {
    socket[kReset] = true;
  }
  if (upgrade2 || method === "CONNECT") {
    socket[kReset] = true;
  }
  if (reset != null) {
    socket[kReset] = reset;
  }
  if (client2[kMaxRequests] && socket[kCounter]++ >= client2[kMaxRequests]) {
    socket[kReset] = true;
  }
  if (blocking) {
    socket[kBlocking] = true;
  }
  let header = `${method} ${path2} HTTP/1.1\r
`;
  if (typeof host === "string") {
    header += `host: ${host}\r
`;
  } else {
    header += client2[kHostHeader];
  }
  if (upgrade2) {
    header += `connection: upgrade\r
upgrade: ${upgrade2}\r
`;
  } else if (client2[kPipelining] && !socket[kReset]) {
    header += "connection: keep-alive\r\n";
  } else {
    header += "connection: close\r\n";
  }
  if (headers2) {
    header += headers2;
  }
  if (channels.sendHeaders.hasSubscribers) {
    channels.sendHeaders.publish({ request: request2, headers: header, socket });
  }
  if (!body2 || bodyLength2 === 0) {
    if (contentLength === 0) {
      socket.write(`${header}content-length: 0\r
\r
`, "latin1");
    } else {
      assert$5(contentLength === null, "no body must not have content length");
      socket.write(`${header}\r
`, "latin1");
    }
    request2.onRequestSent();
  } else if (util$e.isBuffer(body2)) {
    assert$5(contentLength === body2.byteLength, "buffer body must have content length");
    socket.cork();
    socket.write(`${header}content-length: ${contentLength}\r
\r
`, "latin1");
    socket.write(body2);
    socket.uncork();
    request2.onBodySent(body2);
    request2.onRequestSent();
    if (!expectsPayload) {
      socket[kReset] = true;
    }
  } else if (util$e.isBlobLike(body2)) {
    if (typeof body2.stream === "function") {
      writeIterable({ body: body2.stream(), client: client2, request: request2, socket, contentLength, header, expectsPayload });
    } else {
      writeBlob({ body: body2, client: client2, request: request2, socket, contentLength, header, expectsPayload });
    }
  } else if (util$e.isStream(body2)) {
    writeStream({ body: body2, client: client2, request: request2, socket, contentLength, header, expectsPayload });
  } else if (util$e.isIterable(body2)) {
    writeIterable({ body: body2, client: client2, request: request2, socket, contentLength, header, expectsPayload });
  } else {
    assert$5(false);
  }
  return true;
}
function writeH2(client2, session, request2) {
  const { body: body2, method, path: path2, host, upgrade: upgrade2, expectContinue, signal, headers: reqHeaders } = request2;
  let headers2;
  if (typeof reqHeaders === "string")
    headers2 = Request2[kHTTP2CopyHeaders](reqHeaders.trim());
  else
    headers2 = reqHeaders;
  if (upgrade2) {
    errorRequest(client2, request2, new Error("Upgrade not supported for H2"));
    return false;
  }
  try {
    request2.onConnect((err) => {
      if (request2.aborted || request2.completed) {
        return;
      }
      errorRequest(client2, request2, err || new RequestAbortedError$8());
    });
  } catch (err) {
    errorRequest(client2, request2, err);
  }
  if (request2.aborted) {
    return false;
  }
  let stream2;
  const h2State = client2[kHTTP2SessionState];
  headers2[HTTP2_HEADER_AUTHORITY] = host || client2[kHost];
  headers2[HTTP2_HEADER_METHOD] = method;
  if (method === "CONNECT") {
    session.ref();
    stream2 = session.request(headers2, { endStream: false, signal });
    if (stream2.id && !stream2.pending) {
      request2.onUpgrade(null, null, stream2);
      ++h2State.openStreams;
    } else {
      stream2.once("ready", () => {
        request2.onUpgrade(null, null, stream2);
        ++h2State.openStreams;
      });
    }
    stream2.once("close", () => {
      h2State.openStreams -= 1;
      if (h2State.openStreams === 0)
        session.unref();
    });
    return true;
  }
  headers2[HTTP2_HEADER_PATH] = path2;
  headers2[HTTP2_HEADER_SCHEME] = "https";
  const expectsPayload = method === "PUT" || method === "POST" || method === "PATCH";
  if (body2 && typeof body2.read === "function") {
    body2.read(0);
  }
  let contentLength = util$e.bodyLength(body2);
  if (contentLength == null) {
    contentLength = request2.contentLength;
  }
  if (contentLength === 0 || !expectsPayload) {
    contentLength = null;
  }
  if (shouldSendContentLength(method) && contentLength > 0 && request2.contentLength != null && request2.contentLength !== contentLength) {
    if (client2[kStrictContentLength]) {
      errorRequest(client2, request2, new RequestContentLengthMismatchError2());
      return false;
    }
    process.emitWarning(new RequestContentLengthMismatchError2());
  }
  if (contentLength != null) {
    assert$5(body2, "no body must not have content length");
    headers2[HTTP2_HEADER_CONTENT_LENGTH] = `${contentLength}`;
  }
  session.ref();
  const shouldEndStream = method === "GET" || method === "HEAD";
  if (expectContinue) {
    headers2[HTTP2_HEADER_EXPECT] = "100-continue";
    stream2 = session.request(headers2, { endStream: shouldEndStream, signal });
    stream2.once("continue", writeBodyH2);
  } else {
    stream2 = session.request(headers2, {
      endStream: shouldEndStream,
      signal
    });
    writeBodyH2();
  }
  ++h2State.openStreams;
  stream2.once("response", (headers3) => {
    const { [HTTP2_HEADER_STATUS]: statusCode, ...realHeaders } = headers3;
    if (request2.onHeaders(Number(statusCode), realHeaders, stream2.resume.bind(stream2), "") === false) {
      stream2.pause();
    }
  });
  stream2.once("end", () => {
    request2.onComplete([]);
  });
  stream2.on("data", (chunk) => {
    if (request2.onData(chunk) === false) {
      stream2.pause();
    }
  });
  stream2.once("close", () => {
    h2State.openStreams -= 1;
    if (h2State.openStreams === 0) {
      session.unref();
    }
  });
  stream2.once("error", function(err) {
    if (client2[kHTTP2Session] && !client2[kHTTP2Session].destroyed && !this.closed && !this.destroyed) {
      h2State.streams -= 1;
      util$e.destroy(stream2, err);
    }
  });
  stream2.once("frameError", (type, code) => {
    const err = new InformationalError2(`HTTP/2: "frameError" received - type ${type}, code ${code}`);
    errorRequest(client2, request2, err);
    if (client2[kHTTP2Session] && !client2[kHTTP2Session].destroyed && !this.closed && !this.destroyed) {
      h2State.streams -= 1;
      util$e.destroy(stream2, err);
    }
  });
  return true;
  function writeBodyH2() {
    if (!body2) {
      request2.onRequestSent();
    } else if (util$e.isBuffer(body2)) {
      assert$5(contentLength === body2.byteLength, "buffer body must have content length");
      stream2.cork();
      stream2.write(body2);
      stream2.uncork();
      stream2.end();
      request2.onBodySent(body2);
      request2.onRequestSent();
    } else if (util$e.isBlobLike(body2)) {
      if (typeof body2.stream === "function") {
        writeIterable({
          client: client2,
          request: request2,
          contentLength,
          h2stream: stream2,
          expectsPayload,
          body: body2.stream(),
          socket: client2[kSocket],
          header: ""
        });
      } else {
        writeBlob({
          body: body2,
          client: client2,
          request: request2,
          contentLength,
          expectsPayload,
          h2stream: stream2,
          header: "",
          socket: client2[kSocket]
        });
      }
    } else if (util$e.isStream(body2)) {
      writeStream({
        body: body2,
        client: client2,
        request: request2,
        contentLength,
        expectsPayload,
        socket: client2[kSocket],
        h2stream: stream2,
        header: ""
      });
    } else if (util$e.isIterable(body2)) {
      writeIterable({
        body: body2,
        client: client2,
        request: request2,
        contentLength,
        expectsPayload,
        header: "",
        h2stream: stream2,
        socket: client2[kSocket]
      });
    } else {
      assert$5(false);
    }
  }
}
function writeStream({ h2stream, body: body2, client: client2, request: request2, socket, contentLength, header, expectsPayload }) {
  assert$5(contentLength !== 0 || client2[kRunning$3] === 0, "stream body cannot be pipelined");
  if (client2[kHTTPConnVersion] === "h2") {
    let onPipeData = function(chunk) {
      request2.onBodySent(chunk);
    };
    const pipe = pipeline$1(
      body2,
      h2stream,
      (err) => {
        if (err) {
          util$e.destroy(body2, err);
          util$e.destroy(h2stream, err);
        } else {
          request2.onRequestSent();
        }
      }
    );
    pipe.on("data", onPipeData);
    pipe.once("end", () => {
      pipe.removeListener("data", onPipeData);
      util$e.destroy(pipe);
    });
    return;
  }
  let finished2 = false;
  const writer = new AsyncWriter({ socket, request: request2, contentLength, client: client2, expectsPayload, header });
  const onData = function(chunk) {
    if (finished2) {
      return;
    }
    try {
      if (!writer.write(chunk) && this.pause) {
        this.pause();
      }
    } catch (err) {
      util$e.destroy(this, err);
    }
  };
  const onDrain = function() {
    if (finished2) {
      return;
    }
    if (body2.resume) {
      body2.resume();
    }
  };
  const onAbort = function() {
    if (finished2) {
      return;
    }
    const err = new RequestAbortedError$8();
    queueMicrotask(() => onFinished(err));
  };
  const onFinished = function(err) {
    if (finished2) {
      return;
    }
    finished2 = true;
    assert$5(socket.destroyed || socket[kWriting] && client2[kRunning$3] <= 1);
    socket.off("drain", onDrain).off("error", onFinished);
    body2.removeListener("data", onData).removeListener("end", onFinished).removeListener("error", onFinished).removeListener("close", onAbort);
    if (!err) {
      try {
        writer.end();
      } catch (er) {
        err = er;
      }
    }
    writer.destroy(err);
    if (err && (err.code !== "UND_ERR_INFO" || err.message !== "reset")) {
      util$e.destroy(body2, err);
    } else {
      util$e.destroy(body2);
    }
  };
  body2.on("data", onData).on("end", onFinished).on("error", onFinished).on("close", onAbort);
  if (body2.resume) {
    body2.resume();
  }
  socket.on("drain", onDrain).on("error", onFinished);
}
async function writeBlob({ h2stream, body: body2, client: client2, request: request2, socket, contentLength, header, expectsPayload }) {
  assert$5(contentLength === body2.size, "blob body must have content length");
  const isH2 = client2[kHTTPConnVersion] === "h2";
  try {
    if (contentLength != null && contentLength !== body2.size) {
      throw new RequestContentLengthMismatchError2();
    }
    const buffer = Buffer.from(await body2.arrayBuffer());
    if (isH2) {
      h2stream.cork();
      h2stream.write(buffer);
      h2stream.uncork();
    } else {
      socket.cork();
      socket.write(`${header}content-length: ${contentLength}\r
\r
`, "latin1");
      socket.write(buffer);
      socket.uncork();
    }
    request2.onBodySent(buffer);
    request2.onRequestSent();
    if (!expectsPayload) {
      socket[kReset] = true;
    }
    resume(client2);
  } catch (err) {
    util$e.destroy(isH2 ? h2stream : socket, err);
  }
}
async function writeIterable({ h2stream, body: body2, client: client2, request: request2, socket, contentLength, header, expectsPayload }) {
  assert$5(contentLength !== 0 || client2[kRunning$3] === 0, "iterator body cannot be pipelined");
  let callback = null;
  function onDrain() {
    if (callback) {
      const cb = callback;
      callback = null;
      cb();
    }
  }
  const waitForDrain = () => new Promise((resolve, reject) => {
    assert$5(callback === null);
    if (socket[kError]) {
      reject(socket[kError]);
    } else {
      callback = resolve;
    }
  });
  if (client2[kHTTPConnVersion] === "h2") {
    h2stream.on("close", onDrain).on("drain", onDrain);
    try {
      for await (const chunk of body2) {
        if (socket[kError]) {
          throw socket[kError];
        }
        const res = h2stream.write(chunk);
        request2.onBodySent(chunk);
        if (!res) {
          await waitForDrain();
        }
      }
    } catch (err) {
      h2stream.destroy(err);
    } finally {
      request2.onRequestSent();
      h2stream.end();
      h2stream.off("close", onDrain).off("drain", onDrain);
    }
    return;
  }
  socket.on("close", onDrain).on("drain", onDrain);
  const writer = new AsyncWriter({ socket, request: request2, contentLength, client: client2, expectsPayload, header });
  try {
    for await (const chunk of body2) {
      if (socket[kError]) {
        throw socket[kError];
      }
      if (!writer.write(chunk)) {
        await waitForDrain();
      }
    }
    writer.end();
  } catch (err) {
    writer.destroy(err);
  } finally {
    socket.off("close", onDrain).off("drain", onDrain);
  }
}
class AsyncWriter {
  constructor({ socket, request: request2, contentLength, client: client2, expectsPayload, header }) {
    this.socket = socket;
    this.request = request2;
    this.contentLength = contentLength;
    this.client = client2;
    this.bytesWritten = 0;
    this.expectsPayload = expectsPayload;
    this.header = header;
    socket[kWriting] = true;
  }
  write(chunk) {
    const { socket, request: request2, contentLength, client: client2, bytesWritten, expectsPayload, header } = this;
    if (socket[kError]) {
      throw socket[kError];
    }
    if (socket.destroyed) {
      return false;
    }
    const len = Buffer.byteLength(chunk);
    if (!len) {
      return true;
    }
    if (contentLength !== null && bytesWritten + len > contentLength) {
      if (client2[kStrictContentLength]) {
        throw new RequestContentLengthMismatchError2();
      }
      process.emitWarning(new RequestContentLengthMismatchError2());
    }
    socket.cork();
    if (bytesWritten === 0) {
      if (!expectsPayload) {
        socket[kReset] = true;
      }
      if (contentLength === null) {
        socket.write(`${header}transfer-encoding: chunked\r
`, "latin1");
      } else {
        socket.write(`${header}content-length: ${contentLength}\r
\r
`, "latin1");
      }
    }
    if (contentLength === null) {
      socket.write(`\r
${len.toString(16)}\r
`, "latin1");
    }
    this.bytesWritten += len;
    const ret = socket.write(chunk);
    socket.uncork();
    request2.onBodySent(chunk);
    if (!ret) {
      if (socket[kParser].timeout && socket[kParser].timeoutType === TIMEOUT_HEADERS) {
        if (socket[kParser].timeout.refresh) {
          socket[kParser].timeout.refresh();
        }
      }
    }
    return ret;
  }
  end() {
    const { socket, contentLength, client: client2, bytesWritten, expectsPayload, header, request: request2 } = this;
    request2.onRequestSent();
    socket[kWriting] = false;
    if (socket[kError]) {
      throw socket[kError];
    }
    if (socket.destroyed) {
      return;
    }
    if (bytesWritten === 0) {
      if (expectsPayload) {
        socket.write(`${header}content-length: 0\r
\r
`, "latin1");
      } else {
        socket.write(`${header}\r
`, "latin1");
      }
    } else if (contentLength === null) {
      socket.write("\r\n0\r\n\r\n", "latin1");
    }
    if (contentLength !== null && bytesWritten !== contentLength) {
      if (client2[kStrictContentLength]) {
        throw new RequestContentLengthMismatchError2();
      } else {
        process.emitWarning(new RequestContentLengthMismatchError2());
      }
    }
    if (socket[kParser].timeout && socket[kParser].timeoutType === TIMEOUT_HEADERS) {
      if (socket[kParser].timeout.refresh) {
        socket[kParser].timeout.refresh();
      }
    }
    resume(client2);
  }
  destroy(err) {
    const { socket, client: client2 } = this;
    socket[kWriting] = false;
    if (err) {
      assert$5(client2[kRunning$3] <= 1, "pipeline should only contain this request");
      util$e.destroy(socket, err);
    }
  }
}
function errorRequest(client2, request2, err) {
  try {
    request2.onError(err);
    assert$5(request2.aborted);
  } catch (err2) {
    client2.emit("error", err2);
  }
}
var client = Client$4;
const kSize$3 = 2048;
const kMask = kSize$3 - 1;
class FixedCircularBuffer {
  constructor() {
    this.bottom = 0;
    this.top = 0;
    this.list = new Array(kSize$3);
    this.next = null;
  }
  isEmpty() {
    return this.top === this.bottom;
  }
  isFull() {
    return (this.top + 1 & kMask) === this.bottom;
  }
  push(data) {
    this.list[this.top] = data;
    this.top = this.top + 1 & kMask;
  }
  shift() {
    const nextItem = this.list[this.bottom];
    if (nextItem === void 0)
      return null;
    this.list[this.bottom] = void 0;
    this.bottom = this.bottom + 1 & kMask;
    return nextItem;
  }
}
var fixedQueue = class FixedQueue {
  constructor() {
    this.head = this.tail = new FixedCircularBuffer();
  }
  isEmpty() {
    return this.head.isEmpty();
  }
  push(data) {
    if (this.head.isFull()) {
      this.head = this.head.next = new FixedCircularBuffer();
    }
    this.head.push(data);
  }
  shift() {
    const tail = this.tail;
    const next = tail.shift();
    if (tail.isEmpty() && tail.next !== null) {
      this.tail = tail.next;
    }
    return next;
  }
};
const { kFree: kFree$1, kConnected: kConnected$4, kPending: kPending$1, kQueued: kQueued$1, kRunning: kRunning$2, kSize: kSize$2 } = symbols$4;
const kPool = Symbol("pool");
let PoolStats$1 = class PoolStats {
  constructor(pool2) {
    this[kPool] = pool2;
  }
  get connected() {
    return this[kPool][kConnected$4];
  }
  get free() {
    return this[kPool][kFree$1];
  }
  get pending() {
    return this[kPool][kPending$1];
  }
  get queued() {
    return this[kPool][kQueued$1];
  }
  get running() {
    return this[kPool][kRunning$2];
  }
  get size() {
    return this[kPool][kSize$2];
  }
};
var poolStats = PoolStats$1;
const DispatcherBase$2 = dispatcherBase;
const FixedQueue2 = fixedQueue;
const { kConnected: kConnected$3, kSize: kSize$1, kRunning: kRunning$1, kPending, kQueued, kBusy, kFree, kUrl: kUrl$2, kClose: kClose$4, kDestroy: kDestroy$2, kDispatch: kDispatch$1 } = symbols$4;
const PoolStats2 = poolStats;
const kClients$4 = Symbol("clients");
const kNeedDrain$2 = Symbol("needDrain");
const kQueue = Symbol("queue");
const kClosedResolve = Symbol("closed resolve");
const kOnDrain$1 = Symbol("onDrain");
const kOnConnect$1 = Symbol("onConnect");
const kOnDisconnect$1 = Symbol("onDisconnect");
const kOnConnectionError$1 = Symbol("onConnectionError");
const kGetDispatcher$2 = Symbol("get dispatcher");
const kAddClient$2 = Symbol("add client");
const kRemoveClient$1 = Symbol("remove client");
const kStats = Symbol("stats");
let PoolBase$2 = class PoolBase extends DispatcherBase$2 {
  constructor() {
    super();
    this[kQueue] = new FixedQueue2();
    this[kClients$4] = [];
    this[kQueued] = 0;
    const pool2 = this;
    this[kOnDrain$1] = function onDrain(origin, targets) {
      const queue = pool2[kQueue];
      let needDrain = false;
      while (!needDrain) {
        const item = queue.shift();
        if (!item) {
          break;
        }
        pool2[kQueued]--;
        needDrain = !this.dispatch(item.opts, item.handler);
      }
      this[kNeedDrain$2] = needDrain;
      if (!this[kNeedDrain$2] && pool2[kNeedDrain$2]) {
        pool2[kNeedDrain$2] = false;
        pool2.emit("drain", origin, [pool2, ...targets]);
      }
      if (pool2[kClosedResolve] && queue.isEmpty()) {
        Promise.all(pool2[kClients$4].map((c) => c.close())).then(pool2[kClosedResolve]);
      }
    };
    this[kOnConnect$1] = (origin, targets) => {
      pool2.emit("connect", origin, [pool2, ...targets]);
    };
    this[kOnDisconnect$1] = (origin, targets, err) => {
      pool2.emit("disconnect", origin, [pool2, ...targets], err);
    };
    this[kOnConnectionError$1] = (origin, targets, err) => {
      pool2.emit("connectionError", origin, [pool2, ...targets], err);
    };
    this[kStats] = new PoolStats2(this);
  }
  get [kBusy]() {
    return this[kNeedDrain$2];
  }
  get [kConnected$3]() {
    return this[kClients$4].filter((client2) => client2[kConnected$3]).length;
  }
  get [kFree]() {
    return this[kClients$4].filter((client2) => client2[kConnected$3] && !client2[kNeedDrain$2]).length;
  }
  get [kPending]() {
    let ret = this[kQueued];
    for (const { [kPending]: pending } of this[kClients$4]) {
      ret += pending;
    }
    return ret;
  }
  get [kRunning$1]() {
    let ret = 0;
    for (const { [kRunning$1]: running } of this[kClients$4]) {
      ret += running;
    }
    return ret;
  }
  get [kSize$1]() {
    let ret = this[kQueued];
    for (const { [kSize$1]: size } of this[kClients$4]) {
      ret += size;
    }
    return ret;
  }
  get stats() {
    return this[kStats];
  }
  async [kClose$4]() {
    if (this[kQueue].isEmpty()) {
      return Promise.all(this[kClients$4].map((c) => c.close()));
    } else {
      return new Promise((resolve) => {
        this[kClosedResolve] = resolve;
      });
    }
  }
  async [kDestroy$2](err) {
    while (true) {
      const item = this[kQueue].shift();
      if (!item) {
        break;
      }
      item.handler.onError(err);
    }
    return Promise.all(this[kClients$4].map((c) => c.destroy(err)));
  }
  [kDispatch$1](opts, handler) {
    const dispatcher2 = this[kGetDispatcher$2]();
    if (!dispatcher2) {
      this[kNeedDrain$2] = true;
      this[kQueue].push({ opts, handler });
      this[kQueued]++;
    } else if (!dispatcher2.dispatch(opts, handler)) {
      dispatcher2[kNeedDrain$2] = true;
      this[kNeedDrain$2] = !this[kGetDispatcher$2]();
    }
    return !this[kNeedDrain$2];
  }
  [kAddClient$2](client2) {
    client2.on("drain", this[kOnDrain$1]).on("connect", this[kOnConnect$1]).on("disconnect", this[kOnDisconnect$1]).on("connectionError", this[kOnConnectionError$1]);
    this[kClients$4].push(client2);
    if (this[kNeedDrain$2]) {
      process.nextTick(() => {
        if (this[kNeedDrain$2]) {
          this[kOnDrain$1](client2[kUrl$2], [this, client2]);
        }
      });
    }
    return this;
  }
  [kRemoveClient$1](client2) {
    client2.close(() => {
      const idx = this[kClients$4].indexOf(client2);
      if (idx !== -1) {
        this[kClients$4].splice(idx, 1);
      }
    });
    this[kNeedDrain$2] = this[kClients$4].some((dispatcher2) => !dispatcher2[kNeedDrain$2] && dispatcher2.closed !== true && dispatcher2.destroyed !== true);
  }
};
var poolBase = {
  PoolBase: PoolBase$2,
  kClients: kClients$4,
  kNeedDrain: kNeedDrain$2,
  kAddClient: kAddClient$2,
  kRemoveClient: kRemoveClient$1,
  kGetDispatcher: kGetDispatcher$2
};
const {
  PoolBase: PoolBase$1,
  kClients: kClients$3,
  kNeedDrain: kNeedDrain$1,
  kAddClient: kAddClient$1,
  kGetDispatcher: kGetDispatcher$1
} = poolBase;
const Client$3 = client;
const {
  InvalidArgumentError: InvalidArgumentError$f
} = errors$1;
const util$d = util$j;
const { kUrl: kUrl$1, kInterceptors: kInterceptors$3 } = symbols$4;
const buildConnector$2 = connect$2;
const kOptions$3 = Symbol("options");
const kConnections = Symbol("connections");
const kFactory$3 = Symbol("factory");
function defaultFactory$3(origin, opts) {
  return new Client$3(origin, opts);
}
let Pool$5 = class Pool extends PoolBase$1 {
  constructor(origin, {
    connections,
    factory = defaultFactory$3,
    connect: connect2,
    connectTimeout,
    tls: tls2,
    maxCachedSessions,
    socketPath,
    autoSelectFamily,
    autoSelectFamilyAttemptTimeout,
    allowH2,
    ...options
  } = {}) {
    super();
    if (connections != null && (!Number.isFinite(connections) || connections < 0)) {
      throw new InvalidArgumentError$f("invalid connections");
    }
    if (typeof factory !== "function") {
      throw new InvalidArgumentError$f("factory must be a function.");
    }
    if (connect2 != null && typeof connect2 !== "function" && typeof connect2 !== "object") {
      throw new InvalidArgumentError$f("connect must be a function or an object");
    }
    if (typeof connect2 !== "function") {
      connect2 = buildConnector$2({
        ...tls2,
        maxCachedSessions,
        allowH2,
        socketPath,
        timeout: connectTimeout,
        ...util$d.nodeHasAutoSelectFamily && autoSelectFamily ? { autoSelectFamily, autoSelectFamilyAttemptTimeout } : void 0,
        ...connect2
      });
    }
    this[kInterceptors$3] = options.interceptors && options.interceptors.Pool && Array.isArray(options.interceptors.Pool) ? options.interceptors.Pool : [];
    this[kConnections] = connections || null;
    this[kUrl$1] = util$d.parseOrigin(origin);
    this[kOptions$3] = { ...util$d.deepClone(options), connect: connect2, allowH2 };
    this[kOptions$3].interceptors = options.interceptors ? { ...options.interceptors } : void 0;
    this[kFactory$3] = factory;
  }
  [kGetDispatcher$1]() {
    let dispatcher2 = this[kClients$3].find((dispatcher3) => !dispatcher3[kNeedDrain$1]);
    if (dispatcher2) {
      return dispatcher2;
    }
    if (!this[kConnections] || this[kClients$3].length < this[kConnections]) {
      dispatcher2 = this[kFactory$3](this[kUrl$1], this[kOptions$3]);
      this[kAddClient$1](dispatcher2);
    }
    return dispatcher2;
  }
};
var pool = Pool$5;
const {
  BalancedPoolMissingUpstreamError: BalancedPoolMissingUpstreamError2,
  InvalidArgumentError: InvalidArgumentError$e
} = errors$1;
const {
  PoolBase: PoolBase2,
  kClients: kClients$2,
  kNeedDrain,
  kAddClient,
  kRemoveClient,
  kGetDispatcher
} = poolBase;
const Pool$4 = pool;
const { kUrl, kInterceptors: kInterceptors$2 } = symbols$4;
const { parseOrigin } = util$j;
const kFactory$2 = Symbol("factory");
const kOptions$2 = Symbol("options");
const kGreatestCommonDivisor = Symbol("kGreatestCommonDivisor");
const kCurrentWeight = Symbol("kCurrentWeight");
const kIndex = Symbol("kIndex");
const kWeight = Symbol("kWeight");
const kMaxWeightPerServer = Symbol("kMaxWeightPerServer");
const kErrorPenalty = Symbol("kErrorPenalty");
function getGreatestCommonDivisor(a, b) {
  if (b === 0)
    return a;
  return getGreatestCommonDivisor(b, a % b);
}
function defaultFactory$2(origin, opts) {
  return new Pool$4(origin, opts);
}
let BalancedPool$1 = class BalancedPool extends PoolBase2 {
  constructor(upstreams = [], { factory = defaultFactory$2, ...opts } = {}) {
    super();
    this[kOptions$2] = opts;
    this[kIndex] = -1;
    this[kCurrentWeight] = 0;
    this[kMaxWeightPerServer] = this[kOptions$2].maxWeightPerServer || 100;
    this[kErrorPenalty] = this[kOptions$2].errorPenalty || 15;
    if (!Array.isArray(upstreams)) {
      upstreams = [upstreams];
    }
    if (typeof factory !== "function") {
      throw new InvalidArgumentError$e("factory must be a function.");
    }
    this[kInterceptors$2] = opts.interceptors && opts.interceptors.BalancedPool && Array.isArray(opts.interceptors.BalancedPool) ? opts.interceptors.BalancedPool : [];
    this[kFactory$2] = factory;
    for (const upstream of upstreams) {
      this.addUpstream(upstream);
    }
    this._updateBalancedPoolStats();
  }
  addUpstream(upstream) {
    const upstreamOrigin = parseOrigin(upstream).origin;
    if (this[kClients$2].find((pool3) => pool3[kUrl].origin === upstreamOrigin && pool3.closed !== true && pool3.destroyed !== true)) {
      return this;
    }
    const pool2 = this[kFactory$2](upstreamOrigin, Object.assign({}, this[kOptions$2]));
    this[kAddClient](pool2);
    pool2.on("connect", () => {
      pool2[kWeight] = Math.min(this[kMaxWeightPerServer], pool2[kWeight] + this[kErrorPenalty]);
    });
    pool2.on("connectionError", () => {
      pool2[kWeight] = Math.max(1, pool2[kWeight] - this[kErrorPenalty]);
      this._updateBalancedPoolStats();
    });
    pool2.on("disconnect", (...args) => {
      const err = args[2];
      if (err && err.code === "UND_ERR_SOCKET") {
        pool2[kWeight] = Math.max(1, pool2[kWeight] - this[kErrorPenalty]);
        this._updateBalancedPoolStats();
      }
    });
    for (const client2 of this[kClients$2]) {
      client2[kWeight] = this[kMaxWeightPerServer];
    }
    this._updateBalancedPoolStats();
    return this;
  }
  _updateBalancedPoolStats() {
    this[kGreatestCommonDivisor] = this[kClients$2].map((p) => p[kWeight]).reduce(getGreatestCommonDivisor, 0);
  }
  removeUpstream(upstream) {
    const upstreamOrigin = parseOrigin(upstream).origin;
    const pool2 = this[kClients$2].find((pool3) => pool3[kUrl].origin === upstreamOrigin && pool3.closed !== true && pool3.destroyed !== true);
    if (pool2) {
      this[kRemoveClient](pool2);
    }
    return this;
  }
  get upstreams() {
    return this[kClients$2].filter((dispatcher2) => dispatcher2.closed !== true && dispatcher2.destroyed !== true).map((p) => p[kUrl].origin);
  }
  [kGetDispatcher]() {
    if (this[kClients$2].length === 0) {
      throw new BalancedPoolMissingUpstreamError2();
    }
    const dispatcher2 = this[kClients$2].find((dispatcher3) => !dispatcher3[kNeedDrain] && dispatcher3.closed !== true && dispatcher3.destroyed !== true);
    if (!dispatcher2) {
      return;
    }
    const allClientsBusy = this[kClients$2].map((pool2) => pool2[kNeedDrain]).reduce((a, b) => a && b, true);
    if (allClientsBusy) {
      return;
    }
    let counter = 0;
    let maxWeightIndex = this[kClients$2].findIndex((pool2) => !pool2[kNeedDrain]);
    while (counter++ < this[kClients$2].length) {
      this[kIndex] = (this[kIndex] + 1) % this[kClients$2].length;
      const pool2 = this[kClients$2][this[kIndex]];
      if (pool2[kWeight] > this[kClients$2][maxWeightIndex][kWeight] && !pool2[kNeedDrain]) {
        maxWeightIndex = this[kIndex];
      }
      if (this[kIndex] === 0) {
        this[kCurrentWeight] = this[kCurrentWeight] - this[kGreatestCommonDivisor];
        if (this[kCurrentWeight] <= 0) {
          this[kCurrentWeight] = this[kMaxWeightPerServer];
        }
      }
      if (pool2[kWeight] >= this[kCurrentWeight] && !pool2[kNeedDrain]) {
        return pool2;
      }
    }
    this[kCurrentWeight] = this[kClients$2][maxWeightIndex][kWeight];
    this[kIndex] = maxWeightIndex;
    return this[kClients$2][maxWeightIndex];
  }
};
var balancedPool = BalancedPool$1;
const { kConnected: kConnected$2, kSize } = symbols$4;
class CompatWeakRef {
  constructor(value) {
    this.value = value;
  }
  deref() {
    return this.value[kConnected$2] === 0 && this.value[kSize] === 0 ? void 0 : this.value;
  }
}
class CompatFinalizer {
  constructor(finalizer) {
    this.finalizer = finalizer;
  }
  register(dispatcher2, key) {
    if (dispatcher2.on) {
      dispatcher2.on("disconnect", () => {
        if (dispatcher2[kConnected$2] === 0 && dispatcher2[kSize] === 0) {
          this.finalizer(key);
        }
      });
    }
  }
}
var dispatcherWeakref = function() {
  if (process.env.NODE_V8_COVERAGE) {
    return {
      WeakRef: CompatWeakRef,
      FinalizationRegistry: CompatFinalizer
    };
  }
  return {
    WeakRef: commonjsGlobal.WeakRef || CompatWeakRef,
    FinalizationRegistry: commonjsGlobal.FinalizationRegistry || CompatFinalizer
  };
};
const { InvalidArgumentError: InvalidArgumentError$d } = errors$1;
const { kClients: kClients$1, kRunning, kClose: kClose$3, kDestroy: kDestroy$1, kDispatch, kInterceptors: kInterceptors$1 } = symbols$4;
const DispatcherBase$1 = dispatcherBase;
const Pool$3 = pool;
const Client$2 = client;
const util$c = util$j;
const createRedirectInterceptor$1 = redirectInterceptor;
const { WeakRef: WeakRef$1, FinalizationRegistry } = dispatcherWeakref();
const kOnConnect = Symbol("onConnect");
const kOnDisconnect = Symbol("onDisconnect");
const kOnConnectionError = Symbol("onConnectionError");
const kMaxRedirections = Symbol("maxRedirections");
const kOnDrain = Symbol("onDrain");
const kFactory$1 = Symbol("factory");
const kFinalizer = Symbol("finalizer");
const kOptions$1 = Symbol("options");
function defaultFactory$1(origin, opts) {
  return opts && opts.connections === 1 ? new Client$2(origin, opts) : new Pool$3(origin, opts);
}
let Agent$4 = class Agent extends DispatcherBase$1 {
  constructor({ factory = defaultFactory$1, maxRedirections = 0, connect: connect2, ...options } = {}) {
    super();
    if (typeof factory !== "function") {
      throw new InvalidArgumentError$d("factory must be a function.");
    }
    if (connect2 != null && typeof connect2 !== "function" && typeof connect2 !== "object") {
      throw new InvalidArgumentError$d("connect must be a function or an object");
    }
    if (!Number.isInteger(maxRedirections) || maxRedirections < 0) {
      throw new InvalidArgumentError$d("maxRedirections must be a positive number");
    }
    if (connect2 && typeof connect2 !== "function") {
      connect2 = { ...connect2 };
    }
    this[kInterceptors$1] = options.interceptors && options.interceptors.Agent && Array.isArray(options.interceptors.Agent) ? options.interceptors.Agent : [createRedirectInterceptor$1({ maxRedirections })];
    this[kOptions$1] = { ...util$c.deepClone(options), connect: connect2 };
    this[kOptions$1].interceptors = options.interceptors ? { ...options.interceptors } : void 0;
    this[kMaxRedirections] = maxRedirections;
    this[kFactory$1] = factory;
    this[kClients$1] = /* @__PURE__ */ new Map();
    this[kFinalizer] = new FinalizationRegistry(
      /* istanbul ignore next: gc is undeterministic */
      (key) => {
        const ref = this[kClients$1].get(key);
        if (ref !== void 0 && ref.deref() === void 0) {
          this[kClients$1].delete(key);
        }
      }
    );
    const agent2 = this;
    this[kOnDrain] = (origin, targets) => {
      agent2.emit("drain", origin, [agent2, ...targets]);
    };
    this[kOnConnect] = (origin, targets) => {
      agent2.emit("connect", origin, [agent2, ...targets]);
    };
    this[kOnDisconnect] = (origin, targets, err) => {
      agent2.emit("disconnect", origin, [agent2, ...targets], err);
    };
    this[kOnConnectionError] = (origin, targets, err) => {
      agent2.emit("connectionError", origin, [agent2, ...targets], err);
    };
  }
  get [kRunning]() {
    let ret = 0;
    for (const ref of this[kClients$1].values()) {
      const client2 = ref.deref();
      if (client2) {
        ret += client2[kRunning];
      }
    }
    return ret;
  }
  [kDispatch](opts, handler) {
    let key;
    if (opts.origin && (typeof opts.origin === "string" || opts.origin instanceof URL)) {
      key = String(opts.origin);
    } else {
      throw new InvalidArgumentError$d("opts.origin must be a non-empty string or URL.");
    }
    const ref = this[kClients$1].get(key);
    let dispatcher2 = ref ? ref.deref() : null;
    if (!dispatcher2) {
      dispatcher2 = this[kFactory$1](opts.origin, this[kOptions$1]).on("drain", this[kOnDrain]).on("connect", this[kOnConnect]).on("disconnect", this[kOnDisconnect]).on("connectionError", this[kOnConnectionError]);
      this[kClients$1].set(key, new WeakRef$1(dispatcher2));
      this[kFinalizer].register(dispatcher2, key);
    }
    return dispatcher2.dispatch(opts, handler);
  }
  async [kClose$3]() {
    const closePromises = [];
    for (const ref of this[kClients$1].values()) {
      const client2 = ref.deref();
      if (client2) {
        closePromises.push(client2.close());
      }
    }
    await Promise.all(closePromises);
  }
  async [kDestroy$1](err) {
    const destroyPromises = [];
    for (const ref of this[kClients$1].values()) {
      const client2 = ref.deref();
      if (client2) {
        destroyPromises.push(client2.destroy(err));
      }
    }
    await Promise.all(destroyPromises);
  }
};
var agent = Agent$4;
var api$1 = {};
var apiRequest = { exports: {} };
const assert$4 = require$$0$3;
const { Readable: Readable$2 } = require$$0$4;
const { RequestAbortedError: RequestAbortedError$7, NotSupportedError: NotSupportedError2, InvalidArgumentError: InvalidArgumentError$c } = errors$1;
const util$b = util$j;
const { ReadableStreamFrom, toUSVString: toUSVString$1 } = util$j;
let Blob$1;
const kConsume = Symbol("kConsume");
const kReading = Symbol("kReading");
const kBody = Symbol("kBody");
const kAbort = Symbol("abort");
const kContentType = Symbol("kContentType");
const noop = () => {
};
var readable = class BodyReadable extends Readable$2 {
  constructor({
    resume: resume2,
    abort: abort2,
    contentType = "",
    highWaterMark = 64 * 1024
    // Same as nodejs fs streams.
  }) {
    super({
      autoDestroy: true,
      read: resume2,
      highWaterMark
    });
    this._readableState.dataEmitted = false;
    this[kAbort] = abort2;
    this[kConsume] = null;
    this[kBody] = null;
    this[kContentType] = contentType;
    this[kReading] = false;
  }
  destroy(err) {
    if (this.destroyed) {
      return this;
    }
    if (!err && !this._readableState.endEmitted) {
      err = new RequestAbortedError$7();
    }
    if (err) {
      this[kAbort]();
    }
    return super.destroy(err);
  }
  emit(ev, ...args) {
    if (ev === "data") {
      this._readableState.dataEmitted = true;
    } else if (ev === "error") {
      this._readableState.errorEmitted = true;
    }
    return super.emit(ev, ...args);
  }
  on(ev, ...args) {
    if (ev === "data" || ev === "readable") {
      this[kReading] = true;
    }
    return super.on(ev, ...args);
  }
  addListener(ev, ...args) {
    return this.on(ev, ...args);
  }
  off(ev, ...args) {
    const ret = super.off(ev, ...args);
    if (ev === "data" || ev === "readable") {
      this[kReading] = this.listenerCount("data") > 0 || this.listenerCount("readable") > 0;
    }
    return ret;
  }
  removeListener(ev, ...args) {
    return this.off(ev, ...args);
  }
  push(chunk) {
    if (this[kConsume] && chunk !== null && this.readableLength === 0) {
      consumePush(this[kConsume], chunk);
      return this[kReading] ? super.push(chunk) : true;
    }
    return super.push(chunk);
  }
  // https://fetch.spec.whatwg.org/#dom-body-text
  async text() {
    return consume(this, "text");
  }
  // https://fetch.spec.whatwg.org/#dom-body-json
  async json() {
    return consume(this, "json");
  }
  // https://fetch.spec.whatwg.org/#dom-body-blob
  async blob() {
    return consume(this, "blob");
  }
  // https://fetch.spec.whatwg.org/#dom-body-arraybuffer
  async arrayBuffer() {
    return consume(this, "arrayBuffer");
  }
  // https://fetch.spec.whatwg.org/#dom-body-formdata
  async formData() {
    throw new NotSupportedError2();
  }
  // https://fetch.spec.whatwg.org/#dom-body-bodyused
  get bodyUsed() {
    return util$b.isDisturbed(this);
  }
  // https://fetch.spec.whatwg.org/#dom-body-body
  get body() {
    if (!this[kBody]) {
      this[kBody] = ReadableStreamFrom(this);
      if (this[kConsume]) {
        this[kBody].getReader();
        assert$4(this[kBody].locked);
      }
    }
    return this[kBody];
  }
  dump(opts) {
    let limit = opts && Number.isFinite(opts.limit) ? opts.limit : 262144;
    const signal = opts && opts.signal;
    if (signal) {
      try {
        if (typeof signal !== "object" || !("aborted" in signal)) {
          throw new InvalidArgumentError$c("signal must be an AbortSignal");
        }
        util$b.throwIfAborted(signal);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    if (this.closed) {
      return Promise.resolve(null);
    }
    return new Promise((resolve, reject) => {
      const signalListenerCleanup = signal ? util$b.addAbortListener(signal, () => {
        this.destroy();
      }) : noop;
      this.on("close", function() {
        signalListenerCleanup();
        if (signal && signal.aborted) {
          reject(signal.reason || Object.assign(new Error("The operation was aborted"), { name: "AbortError" }));
        } else {
          resolve(null);
        }
      }).on("error", noop).on("data", function(chunk) {
        limit -= chunk.length;
        if (limit <= 0) {
          this.destroy();
        }
      }).resume();
    });
  }
};
function isLocked(self2) {
  return self2[kBody] && self2[kBody].locked === true || self2[kConsume];
}
function isUnusable(self2) {
  return util$b.isDisturbed(self2) || isLocked(self2);
}
async function consume(stream2, type) {
  if (isUnusable(stream2)) {
    throw new TypeError("unusable");
  }
  assert$4(!stream2[kConsume]);
  return new Promise((resolve, reject) => {
    stream2[kConsume] = {
      type,
      stream: stream2,
      resolve,
      reject,
      length: 0,
      body: []
    };
    stream2.on("error", function(err) {
      consumeFinish(this[kConsume], err);
    }).on("close", function() {
      if (this[kConsume].body !== null) {
        consumeFinish(this[kConsume], new RequestAbortedError$7());
      }
    });
    process.nextTick(consumeStart, stream2[kConsume]);
  });
}
function consumeStart(consume2) {
  if (consume2.body === null) {
    return;
  }
  const { _readableState: state } = consume2.stream;
  for (const chunk of state.buffer) {
    consumePush(consume2, chunk);
  }
  if (state.endEmitted) {
    consumeEnd(this[kConsume]);
  } else {
    consume2.stream.on("end", function() {
      consumeEnd(this[kConsume]);
    });
  }
  consume2.stream.resume();
  while (consume2.stream.read() != null) {
  }
}
function consumeEnd(consume2) {
  const { type, body: body2, resolve, stream: stream2, length } = consume2;
  try {
    if (type === "text") {
      resolve(toUSVString$1(Buffer.concat(body2)));
    } else if (type === "json") {
      resolve(JSON.parse(Buffer.concat(body2)));
    } else if (type === "arrayBuffer") {
      const dst = new Uint8Array(length);
      let pos = 0;
      for (const buf of body2) {
        dst.set(buf, pos);
        pos += buf.byteLength;
      }
      resolve(dst.buffer);
    } else if (type === "blob") {
      if (!Blob$1) {
        Blob$1 = require("buffer").Blob;
      }
      resolve(new Blob$1(body2, { type: stream2[kContentType] }));
    }
    consumeFinish(consume2);
  } catch (err) {
    stream2.destroy(err);
  }
}
function consumePush(consume2, chunk) {
  consume2.length += chunk.length;
  consume2.body.push(chunk);
}
function consumeFinish(consume2, err) {
  if (consume2.body === null) {
    return;
  }
  if (err) {
    consume2.reject(err);
  } else {
    consume2.resolve();
  }
  consume2.type = null;
  consume2.stream = null;
  consume2.resolve = null;
  consume2.reject = null;
  consume2.length = 0;
  consume2.body = null;
}
const assert$3 = require$$0$3;
const {
  ResponseStatusCodeError: ResponseStatusCodeError2
} = errors$1;
const { toUSVString } = util$j;
async function getResolveErrorBodyCallback$2({ callback, body: body2, contentType, statusCode, statusMessage, headers: headers2 }) {
  assert$3(body2);
  let chunks = [];
  let limit = 0;
  for await (const chunk of body2) {
    chunks.push(chunk);
    limit += chunk.length;
    if (limit > 128 * 1024) {
      chunks = null;
      break;
    }
  }
  if (statusCode === 204 || !contentType || !chunks) {
    process.nextTick(callback, new ResponseStatusCodeError2(`Response status code ${statusCode}${statusMessage ? `: ${statusMessage}` : ""}`, statusCode, headers2));
    return;
  }
  try {
    if (contentType.startsWith("application/json")) {
      const payload = JSON.parse(toUSVString(Buffer.concat(chunks)));
      process.nextTick(callback, new ResponseStatusCodeError2(`Response status code ${statusCode}${statusMessage ? `: ${statusMessage}` : ""}`, statusCode, headers2, payload));
      return;
    }
    if (contentType.startsWith("text/")) {
      const payload = toUSVString(Buffer.concat(chunks));
      process.nextTick(callback, new ResponseStatusCodeError2(`Response status code ${statusCode}${statusMessage ? `: ${statusMessage}` : ""}`, statusCode, headers2, payload));
      return;
    }
  } catch (err) {
  }
  process.nextTick(callback, new ResponseStatusCodeError2(`Response status code ${statusCode}${statusMessage ? `: ${statusMessage}` : ""}`, statusCode, headers2));
}
var util$a = { getResolveErrorBodyCallback: getResolveErrorBodyCallback$2 };
const { addAbortListener } = util$j;
const { RequestAbortedError: RequestAbortedError$6 } = errors$1;
const kListener = Symbol("kListener");
const kSignal = Symbol("kSignal");
function abort(self2) {
  if (self2.abort) {
    self2.abort();
  } else {
    self2.onError(new RequestAbortedError$6());
  }
}
function addSignal$5(self2, signal) {
  self2[kSignal] = null;
  self2[kListener] = null;
  if (!signal) {
    return;
  }
  if (signal.aborted) {
    abort(self2);
    return;
  }
  self2[kSignal] = signal;
  self2[kListener] = () => {
    abort(self2);
  };
  addAbortListener(self2[kSignal], self2[kListener]);
}
function removeSignal$5(self2) {
  if (!self2[kSignal]) {
    return;
  }
  if ("removeEventListener" in self2[kSignal]) {
    self2[kSignal].removeEventListener("abort", self2[kListener]);
  } else {
    self2[kSignal].removeListener("abort", self2[kListener]);
  }
  self2[kSignal] = null;
  self2[kListener] = null;
}
var abortSignal = {
  addSignal: addSignal$5,
  removeSignal: removeSignal$5
};
const Readable$1 = readable;
const {
  InvalidArgumentError: InvalidArgumentError$b,
  RequestAbortedError: RequestAbortedError$5
} = errors$1;
const util$9 = util$j;
const { getResolveErrorBodyCallback: getResolveErrorBodyCallback$1 } = util$a;
const { AsyncResource: AsyncResource$4 } = require$$4$1;
const { addSignal: addSignal$4, removeSignal: removeSignal$4 } = abortSignal;
class RequestHandler extends AsyncResource$4 {
  constructor(opts, callback) {
    if (!opts || typeof opts !== "object") {
      throw new InvalidArgumentError$b("invalid opts");
    }
    const { signal, method, opaque, body: body2, onInfo, responseHeaders, throwOnError, highWaterMark } = opts;
    try {
      if (typeof callback !== "function") {
        throw new InvalidArgumentError$b("invalid callback");
      }
      if (highWaterMark && (typeof highWaterMark !== "number" || highWaterMark < 0)) {
        throw new InvalidArgumentError$b("invalid highWaterMark");
      }
      if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
        throw new InvalidArgumentError$b("signal must be an EventEmitter or EventTarget");
      }
      if (method === "CONNECT") {
        throw new InvalidArgumentError$b("invalid method");
      }
      if (onInfo && typeof onInfo !== "function") {
        throw new InvalidArgumentError$b("invalid onInfo callback");
      }
      super("UNDICI_REQUEST");
    } catch (err) {
      if (util$9.isStream(body2)) {
        util$9.destroy(body2.on("error", util$9.nop), err);
      }
      throw err;
    }
    this.responseHeaders = responseHeaders || null;
    this.opaque = opaque || null;
    this.callback = callback;
    this.res = null;
    this.abort = null;
    this.body = body2;
    this.trailers = {};
    this.context = null;
    this.onInfo = onInfo || null;
    this.throwOnError = throwOnError;
    this.highWaterMark = highWaterMark;
    if (util$9.isStream(body2)) {
      body2.on("error", (err) => {
        this.onError(err);
      });
    }
    addSignal$4(this, signal);
  }
  onConnect(abort2, context) {
    if (!this.callback) {
      throw new RequestAbortedError$5();
    }
    this.abort = abort2;
    this.context = context;
  }
  onHeaders(statusCode, rawHeaders, resume2, statusMessage) {
    const { callback, opaque, abort: abort2, context, responseHeaders, highWaterMark } = this;
    const headers2 = responseHeaders === "raw" ? util$9.parseRawHeaders(rawHeaders) : util$9.parseHeaders(rawHeaders);
    if (statusCode < 200) {
      if (this.onInfo) {
        this.onInfo({ statusCode, headers: headers2 });
      }
      return;
    }
    const parsedHeaders = responseHeaders === "raw" ? util$9.parseHeaders(rawHeaders) : headers2;
    const contentType = parsedHeaders["content-type"];
    const body2 = new Readable$1({ resume: resume2, abort: abort2, contentType, highWaterMark });
    this.callback = null;
    this.res = body2;
    if (callback !== null) {
      if (this.throwOnError && statusCode >= 400) {
        this.runInAsyncScope(
          getResolveErrorBodyCallback$1,
          null,
          { callback, body: body2, contentType, statusCode, statusMessage, headers: headers2 }
        );
      } else {
        this.runInAsyncScope(callback, null, null, {
          statusCode,
          headers: headers2,
          trailers: this.trailers,
          opaque,
          body: body2,
          context
        });
      }
    }
  }
  onData(chunk) {
    const { res } = this;
    return res.push(chunk);
  }
  onComplete(trailers) {
    const { res } = this;
    removeSignal$4(this);
    util$9.parseHeaders(trailers, this.trailers);
    res.push(null);
  }
  onError(err) {
    const { res, callback, body: body2, opaque } = this;
    removeSignal$4(this);
    if (callback) {
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }
    if (res) {
      this.res = null;
      queueMicrotask(() => {
        util$9.destroy(res, err);
      });
    }
    if (body2) {
      this.body = null;
      util$9.destroy(body2, err);
    }
  }
}
function request$1(opts, callback) {
  if (callback === void 0) {
    return new Promise((resolve, reject) => {
      request$1.call(this, opts, (err, data) => {
        return err ? reject(err) : resolve(data);
      });
    });
  }
  try {
    this.dispatch(opts, new RequestHandler(opts, callback));
  } catch (err) {
    if (typeof callback !== "function") {
      throw err;
    }
    const opaque = opts && opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}
apiRequest.exports = request$1;
apiRequest.exports.RequestHandler = RequestHandler;
var apiRequestExports = apiRequest.exports;
const { finished, PassThrough: PassThrough$1 } = require$$0$4;
const {
  InvalidArgumentError: InvalidArgumentError$a,
  InvalidReturnValueError: InvalidReturnValueError$1,
  RequestAbortedError: RequestAbortedError$4
} = errors$1;
const util$8 = util$j;
const { getResolveErrorBodyCallback } = util$a;
const { AsyncResource: AsyncResource$3 } = require$$4$1;
const { addSignal: addSignal$3, removeSignal: removeSignal$3 } = abortSignal;
class StreamHandler extends AsyncResource$3 {
  constructor(opts, factory, callback) {
    if (!opts || typeof opts !== "object") {
      throw new InvalidArgumentError$a("invalid opts");
    }
    const { signal, method, opaque, body: body2, onInfo, responseHeaders, throwOnError } = opts;
    try {
      if (typeof callback !== "function") {
        throw new InvalidArgumentError$a("invalid callback");
      }
      if (typeof factory !== "function") {
        throw new InvalidArgumentError$a("invalid factory");
      }
      if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
        throw new InvalidArgumentError$a("signal must be an EventEmitter or EventTarget");
      }
      if (method === "CONNECT") {
        throw new InvalidArgumentError$a("invalid method");
      }
      if (onInfo && typeof onInfo !== "function") {
        throw new InvalidArgumentError$a("invalid onInfo callback");
      }
      super("UNDICI_STREAM");
    } catch (err) {
      if (util$8.isStream(body2)) {
        util$8.destroy(body2.on("error", util$8.nop), err);
      }
      throw err;
    }
    this.responseHeaders = responseHeaders || null;
    this.opaque = opaque || null;
    this.factory = factory;
    this.callback = callback;
    this.res = null;
    this.abort = null;
    this.context = null;
    this.trailers = null;
    this.body = body2;
    this.onInfo = onInfo || null;
    this.throwOnError = throwOnError || false;
    if (util$8.isStream(body2)) {
      body2.on("error", (err) => {
        this.onError(err);
      });
    }
    addSignal$3(this, signal);
  }
  onConnect(abort2, context) {
    if (!this.callback) {
      throw new RequestAbortedError$4();
    }
    this.abort = abort2;
    this.context = context;
  }
  onHeaders(statusCode, rawHeaders, resume2, statusMessage) {
    const { factory, opaque, context, callback, responseHeaders } = this;
    const headers2 = responseHeaders === "raw" ? util$8.parseRawHeaders(rawHeaders) : util$8.parseHeaders(rawHeaders);
    if (statusCode < 200) {
      if (this.onInfo) {
        this.onInfo({ statusCode, headers: headers2 });
      }
      return;
    }
    this.factory = null;
    let res;
    if (this.throwOnError && statusCode >= 400) {
      const parsedHeaders = responseHeaders === "raw" ? util$8.parseHeaders(rawHeaders) : headers2;
      const contentType = parsedHeaders["content-type"];
      res = new PassThrough$1();
      this.callback = null;
      this.runInAsyncScope(
        getResolveErrorBodyCallback,
        null,
        { callback, body: res, contentType, statusCode, statusMessage, headers: headers2 }
      );
    } else {
      if (factory === null) {
        return;
      }
      res = this.runInAsyncScope(factory, null, {
        statusCode,
        headers: headers2,
        opaque,
        context
      });
      if (!res || typeof res.write !== "function" || typeof res.end !== "function" || typeof res.on !== "function") {
        throw new InvalidReturnValueError$1("expected Writable");
      }
      finished(res, { readable: false }, (err) => {
        const { callback: callback2, res: res2, opaque: opaque2, trailers, abort: abort2 } = this;
        this.res = null;
        if (err || !res2.readable) {
          util$8.destroy(res2, err);
        }
        this.callback = null;
        this.runInAsyncScope(callback2, null, err || null, { opaque: opaque2, trailers });
        if (err) {
          abort2();
        }
      });
    }
    res.on("drain", resume2);
    this.res = res;
    const needDrain = res.writableNeedDrain !== void 0 ? res.writableNeedDrain : res._writableState && res._writableState.needDrain;
    return needDrain !== true;
  }
  onData(chunk) {
    const { res } = this;
    return res ? res.write(chunk) : true;
  }
  onComplete(trailers) {
    const { res } = this;
    removeSignal$3(this);
    if (!res) {
      return;
    }
    this.trailers = util$8.parseHeaders(trailers);
    res.end();
  }
  onError(err) {
    const { res, callback, opaque, body: body2 } = this;
    removeSignal$3(this);
    this.factory = null;
    if (res) {
      this.res = null;
      util$8.destroy(res, err);
    } else if (callback) {
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }
    if (body2) {
      this.body = null;
      util$8.destroy(body2, err);
    }
  }
}
function stream(opts, factory, callback) {
  if (callback === void 0) {
    return new Promise((resolve, reject) => {
      stream.call(this, opts, factory, (err, data) => {
        return err ? reject(err) : resolve(data);
      });
    });
  }
  try {
    this.dispatch(opts, new StreamHandler(opts, factory, callback));
  } catch (err) {
    if (typeof callback !== "function") {
      throw err;
    }
    const opaque = opts && opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}
var apiStream = stream;
const {
  Readable,
  Duplex,
  PassThrough
} = require$$0$4;
const {
  InvalidArgumentError: InvalidArgumentError$9,
  InvalidReturnValueError: InvalidReturnValueError2,
  RequestAbortedError: RequestAbortedError$3
} = errors$1;
const util$7 = util$j;
const { AsyncResource: AsyncResource$2 } = require$$4$1;
const { addSignal: addSignal$2, removeSignal: removeSignal$2 } = abortSignal;
const assert$2 = require$$0$3;
const kResume = Symbol("resume");
class PipelineRequest extends Readable {
  constructor() {
    super({ autoDestroy: true });
    this[kResume] = null;
  }
  _read() {
    const { [kResume]: resume2 } = this;
    if (resume2) {
      this[kResume] = null;
      resume2();
    }
  }
  _destroy(err, callback) {
    this._read();
    callback(err);
  }
}
class PipelineResponse extends Readable {
  constructor(resume2) {
    super({ autoDestroy: true });
    this[kResume] = resume2;
  }
  _read() {
    this[kResume]();
  }
  _destroy(err, callback) {
    if (!err && !this._readableState.endEmitted) {
      err = new RequestAbortedError$3();
    }
    callback(err);
  }
}
class PipelineHandler extends AsyncResource$2 {
  constructor(opts, handler) {
    if (!opts || typeof opts !== "object") {
      throw new InvalidArgumentError$9("invalid opts");
    }
    if (typeof handler !== "function") {
      throw new InvalidArgumentError$9("invalid handler");
    }
    const { signal, method, opaque, onInfo, responseHeaders } = opts;
    if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
      throw new InvalidArgumentError$9("signal must be an EventEmitter or EventTarget");
    }
    if (method === "CONNECT") {
      throw new InvalidArgumentError$9("invalid method");
    }
    if (onInfo && typeof onInfo !== "function") {
      throw new InvalidArgumentError$9("invalid onInfo callback");
    }
    super("UNDICI_PIPELINE");
    this.opaque = opaque || null;
    this.responseHeaders = responseHeaders || null;
    this.handler = handler;
    this.abort = null;
    this.context = null;
    this.onInfo = onInfo || null;
    this.req = new PipelineRequest().on("error", util$7.nop);
    this.ret = new Duplex({
      readableObjectMode: opts.objectMode,
      autoDestroy: true,
      read: () => {
        const { body: body2 } = this;
        if (body2 && body2.resume) {
          body2.resume();
        }
      },
      write: (chunk, encoding2, callback) => {
        const { req } = this;
        if (req.push(chunk, encoding2) || req._readableState.destroyed) {
          callback();
        } else {
          req[kResume] = callback;
        }
      },
      destroy: (err, callback) => {
        const { body: body2, req, res, ret, abort: abort2 } = this;
        if (!err && !ret._readableState.endEmitted) {
          err = new RequestAbortedError$3();
        }
        if (abort2 && err) {
          abort2();
        }
        util$7.destroy(body2, err);
        util$7.destroy(req, err);
        util$7.destroy(res, err);
        removeSignal$2(this);
        callback(err);
      }
    }).on("prefinish", () => {
      const { req } = this;
      req.push(null);
    });
    this.res = null;
    addSignal$2(this, signal);
  }
  onConnect(abort2, context) {
    const { ret, res } = this;
    assert$2(!res, "pipeline cannot be retried");
    if (ret.destroyed) {
      throw new RequestAbortedError$3();
    }
    this.abort = abort2;
    this.context = context;
  }
  onHeaders(statusCode, rawHeaders, resume2) {
    const { opaque, handler, context } = this;
    if (statusCode < 200) {
      if (this.onInfo) {
        const headers2 = this.responseHeaders === "raw" ? util$7.parseRawHeaders(rawHeaders) : util$7.parseHeaders(rawHeaders);
        this.onInfo({ statusCode, headers: headers2 });
      }
      return;
    }
    this.res = new PipelineResponse(resume2);
    let body2;
    try {
      this.handler = null;
      const headers2 = this.responseHeaders === "raw" ? util$7.parseRawHeaders(rawHeaders) : util$7.parseHeaders(rawHeaders);
      body2 = this.runInAsyncScope(handler, null, {
        statusCode,
        headers: headers2,
        opaque,
        body: this.res,
        context
      });
    } catch (err) {
      this.res.on("error", util$7.nop);
      throw err;
    }
    if (!body2 || typeof body2.on !== "function") {
      throw new InvalidReturnValueError2("expected Readable");
    }
    body2.on("data", (chunk) => {
      const { ret, body: body3 } = this;
      if (!ret.push(chunk) && body3.pause) {
        body3.pause();
      }
    }).on("error", (err) => {
      const { ret } = this;
      util$7.destroy(ret, err);
    }).on("end", () => {
      const { ret } = this;
      ret.push(null);
    }).on("close", () => {
      const { ret } = this;
      if (!ret._readableState.ended) {
        util$7.destroy(ret, new RequestAbortedError$3());
      }
    });
    this.body = body2;
  }
  onData(chunk) {
    const { res } = this;
    return res.push(chunk);
  }
  onComplete(trailers) {
    const { res } = this;
    res.push(null);
  }
  onError(err) {
    const { ret } = this;
    this.handler = null;
    util$7.destroy(ret, err);
  }
}
function pipeline(opts, handler) {
  try {
    const pipelineHandler = new PipelineHandler(opts, handler);
    this.dispatch({ ...opts, body: pipelineHandler.req }, pipelineHandler);
    return pipelineHandler.ret;
  } catch (err) {
    return new PassThrough().destroy(err);
  }
}
var apiPipeline = pipeline;
const { InvalidArgumentError: InvalidArgumentError$8, RequestAbortedError: RequestAbortedError$2, SocketError: SocketError$1 } = errors$1;
const { AsyncResource: AsyncResource$1 } = require$$4$1;
const util$6 = util$j;
const { addSignal: addSignal$1, removeSignal: removeSignal$1 } = abortSignal;
const assert$1 = require$$0$3;
class UpgradeHandler extends AsyncResource$1 {
  constructor(opts, callback) {
    if (!opts || typeof opts !== "object") {
      throw new InvalidArgumentError$8("invalid opts");
    }
    if (typeof callback !== "function") {
      throw new InvalidArgumentError$8("invalid callback");
    }
    const { signal, opaque, responseHeaders } = opts;
    if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
      throw new InvalidArgumentError$8("signal must be an EventEmitter or EventTarget");
    }
    super("UNDICI_UPGRADE");
    this.responseHeaders = responseHeaders || null;
    this.opaque = opaque || null;
    this.callback = callback;
    this.abort = null;
    this.context = null;
    addSignal$1(this, signal);
  }
  onConnect(abort2, context) {
    if (!this.callback) {
      throw new RequestAbortedError$2();
    }
    this.abort = abort2;
    this.context = null;
  }
  onHeaders() {
    throw new SocketError$1("bad upgrade", null);
  }
  onUpgrade(statusCode, rawHeaders, socket) {
    const { callback, opaque, context } = this;
    assert$1.strictEqual(statusCode, 101);
    removeSignal$1(this);
    this.callback = null;
    const headers2 = this.responseHeaders === "raw" ? util$6.parseRawHeaders(rawHeaders) : util$6.parseHeaders(rawHeaders);
    this.runInAsyncScope(callback, null, null, {
      headers: headers2,
      socket,
      opaque,
      context
    });
  }
  onError(err) {
    const { callback, opaque } = this;
    removeSignal$1(this);
    if (callback) {
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }
  }
}
function upgrade(opts, callback) {
  if (callback === void 0) {
    return new Promise((resolve, reject) => {
      upgrade.call(this, opts, (err, data) => {
        return err ? reject(err) : resolve(data);
      });
    });
  }
  try {
    const upgradeHandler = new UpgradeHandler(opts, callback);
    this.dispatch({
      ...opts,
      method: opts.method || "GET",
      upgrade: opts.protocol || "Websocket"
    }, upgradeHandler);
  } catch (err) {
    if (typeof callback !== "function") {
      throw err;
    }
    const opaque = opts && opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}
var apiUpgrade = upgrade;
const { AsyncResource } = require$$4$1;
const { InvalidArgumentError: InvalidArgumentError$7, RequestAbortedError: RequestAbortedError$1, SocketError: SocketError2 } = errors$1;
const util$5 = util$j;
const { addSignal, removeSignal } = abortSignal;
class ConnectHandler extends AsyncResource {
  constructor(opts, callback) {
    if (!opts || typeof opts !== "object") {
      throw new InvalidArgumentError$7("invalid opts");
    }
    if (typeof callback !== "function") {
      throw new InvalidArgumentError$7("invalid callback");
    }
    const { signal, opaque, responseHeaders } = opts;
    if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
      throw new InvalidArgumentError$7("signal must be an EventEmitter or EventTarget");
    }
    super("UNDICI_CONNECT");
    this.opaque = opaque || null;
    this.responseHeaders = responseHeaders || null;
    this.callback = callback;
    this.abort = null;
    addSignal(this, signal);
  }
  onConnect(abort2, context) {
    if (!this.callback) {
      throw new RequestAbortedError$1();
    }
    this.abort = abort2;
    this.context = context;
  }
  onHeaders() {
    throw new SocketError2("bad connect", null);
  }
  onUpgrade(statusCode, rawHeaders, socket) {
    const { callback, opaque, context } = this;
    removeSignal(this);
    this.callback = null;
    let headers2 = rawHeaders;
    if (headers2 != null) {
      headers2 = this.responseHeaders === "raw" ? util$5.parseRawHeaders(rawHeaders) : util$5.parseHeaders(rawHeaders);
    }
    this.runInAsyncScope(callback, null, null, {
      statusCode,
      headers: headers2,
      socket,
      opaque,
      context
    });
  }
  onError(err) {
    const { callback, opaque } = this;
    removeSignal(this);
    if (callback) {
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }
  }
}
function connect(opts, callback) {
  if (callback === void 0) {
    return new Promise((resolve, reject) => {
      connect.call(this, opts, (err, data) => {
        return err ? reject(err) : resolve(data);
      });
    });
  }
  try {
    const connectHandler = new ConnectHandler(opts, callback);
    this.dispatch({ ...opts, method: "CONNECT" }, connectHandler);
  } catch (err) {
    if (typeof callback !== "function") {
      throw err;
    }
    const opaque = opts && opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}
var apiConnect = connect;
api$1.request = apiRequestExports;
api$1.stream = apiStream;
api$1.pipeline = apiPipeline;
api$1.upgrade = apiUpgrade;
api$1.connect = apiConnect;
const { UndiciError: UndiciError$1 } = errors$1;
let MockNotMatchedError$1 = class MockNotMatchedError extends UndiciError$1 {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, MockNotMatchedError);
    this.name = "MockNotMatchedError";
    this.message = message || "The request does not match any registered mock dispatches";
    this.code = "UND_MOCK_ERR_MOCK_NOT_MATCHED";
  }
};
var mockErrors$1 = {
  MockNotMatchedError: MockNotMatchedError$1
};
var mockSymbols = {
  kAgent: Symbol("agent"),
  kOptions: Symbol("options"),
  kFactory: Symbol("factory"),
  kDispatches: Symbol("dispatches"),
  kDispatchKey: Symbol("dispatch key"),
  kDefaultHeaders: Symbol("default headers"),
  kDefaultTrailers: Symbol("default trailers"),
  kContentLength: Symbol("content length"),
  kMockAgent: Symbol("mock agent"),
  kMockAgentSet: Symbol("mock agent set"),
  kMockAgentGet: Symbol("mock agent get"),
  kMockDispatch: Symbol("mock dispatch"),
  kClose: Symbol("close"),
  kOriginalClose: Symbol("original agent close"),
  kOrigin: Symbol("origin"),
  kIsMockActive: Symbol("is mock active"),
  kNetConnect: Symbol("net connect"),
  kGetNetConnect: Symbol("get net connect"),
  kConnected: Symbol("connected")
};
const { MockNotMatchedError: MockNotMatchedError2 } = mockErrors$1;
const {
  kDispatches: kDispatches$4,
  kMockAgent: kMockAgent$2,
  kOriginalDispatch: kOriginalDispatch$2,
  kOrigin: kOrigin$2,
  kGetNetConnect: kGetNetConnect$1
} = mockSymbols;
const { buildURL: buildURL$1, nop } = util$j;
const { STATUS_CODES } = require$$2;
const {
  types: {
    isPromise
  }
} = require$$0$2;
function matchValue$1(match, value) {
  if (typeof match === "string") {
    return match === value;
  }
  if (match instanceof RegExp) {
    return match.test(value);
  }
  if (typeof match === "function") {
    return match(value) === true;
  }
  return false;
}
function lowerCaseEntries(headers2) {
  return Object.fromEntries(
    Object.entries(headers2).map(([headerName, headerValue]) => {
      return [headerName.toLocaleLowerCase(), headerValue];
    })
  );
}
function getHeaderByName(headers2, key) {
  if (Array.isArray(headers2)) {
    for (let i = 0; i < headers2.length; i += 2) {
      if (headers2[i].toLocaleLowerCase() === key.toLocaleLowerCase()) {
        return headers2[i + 1];
      }
    }
    return void 0;
  } else if (typeof headers2.get === "function") {
    return headers2.get(key);
  } else {
    return lowerCaseEntries(headers2)[key.toLocaleLowerCase()];
  }
}
function buildHeadersFromArray(headers2) {
  const clone = headers2.slice();
  const entries = [];
  for (let index = 0; index < clone.length; index += 2) {
    entries.push([clone[index], clone[index + 1]]);
  }
  return Object.fromEntries(entries);
}
function matchHeaders(mockDispatch2, headers2) {
  if (typeof mockDispatch2.headers === "function") {
    if (Array.isArray(headers2)) {
      headers2 = buildHeadersFromArray(headers2);
    }
    return mockDispatch2.headers(headers2 ? lowerCaseEntries(headers2) : {});
  }
  if (typeof mockDispatch2.headers === "undefined") {
    return true;
  }
  if (typeof headers2 !== "object" || typeof mockDispatch2.headers !== "object") {
    return false;
  }
  for (const [matchHeaderName, matchHeaderValue] of Object.entries(mockDispatch2.headers)) {
    const headerValue = getHeaderByName(headers2, matchHeaderName);
    if (!matchValue$1(matchHeaderValue, headerValue)) {
      return false;
    }
  }
  return true;
}
function safeUrl(path2) {
  if (typeof path2 !== "string") {
    return path2;
  }
  const pathSegments = path2.split("?");
  if (pathSegments.length !== 2) {
    return path2;
  }
  const qp = new URLSearchParams(pathSegments.pop());
  qp.sort();
  return [...pathSegments, qp.toString()].join("?");
}
function matchKey(mockDispatch2, { path: path2, method, body: body2, headers: headers2 }) {
  const pathMatch = matchValue$1(mockDispatch2.path, path2);
  const methodMatch = matchValue$1(mockDispatch2.method, method);
  const bodyMatch = typeof mockDispatch2.body !== "undefined" ? matchValue$1(mockDispatch2.body, body2) : true;
  const headersMatch = matchHeaders(mockDispatch2, headers2);
  return pathMatch && methodMatch && bodyMatch && headersMatch;
}
function getResponseData$1(data) {
  if (Buffer.isBuffer(data)) {
    return data;
  } else if (typeof data === "object") {
    return JSON.stringify(data);
  } else {
    return data.toString();
  }
}
function getMockDispatch(mockDispatches, key) {
  const basePath = key.query ? buildURL$1(key.path, key.query) : key.path;
  const resolvedPath = typeof basePath === "string" ? safeUrl(basePath) : basePath;
  let matchedMockDispatches = mockDispatches.filter(({ consumed }) => !consumed).filter(({ path: path2 }) => matchValue$1(safeUrl(path2), resolvedPath));
  if (matchedMockDispatches.length === 0) {
    throw new MockNotMatchedError2(`Mock dispatch not matched for path '${resolvedPath}'`);
  }
  matchedMockDispatches = matchedMockDispatches.filter(({ method }) => matchValue$1(method, key.method));
  if (matchedMockDispatches.length === 0) {
    throw new MockNotMatchedError2(`Mock dispatch not matched for method '${key.method}'`);
  }
  matchedMockDispatches = matchedMockDispatches.filter(({ body: body2 }) => typeof body2 !== "undefined" ? matchValue$1(body2, key.body) : true);
  if (matchedMockDispatches.length === 0) {
    throw new MockNotMatchedError2(`Mock dispatch not matched for body '${key.body}'`);
  }
  matchedMockDispatches = matchedMockDispatches.filter((mockDispatch2) => matchHeaders(mockDispatch2, key.headers));
  if (matchedMockDispatches.length === 0) {
    throw new MockNotMatchedError2(`Mock dispatch not matched for headers '${typeof key.headers === "object" ? JSON.stringify(key.headers) : key.headers}'`);
  }
  return matchedMockDispatches[0];
}
function addMockDispatch$1(mockDispatches, key, data) {
  const baseData = { timesInvoked: 0, times: 1, persist: false, consumed: false };
  const replyData = typeof data === "function" ? { callback: data } : { ...data };
  const newMockDispatch = { ...baseData, ...key, pending: true, data: { error: null, ...replyData } };
  mockDispatches.push(newMockDispatch);
  return newMockDispatch;
}
function deleteMockDispatch(mockDispatches, key) {
  const index = mockDispatches.findIndex((dispatch) => {
    if (!dispatch.consumed) {
      return false;
    }
    return matchKey(dispatch, key);
  });
  if (index !== -1) {
    mockDispatches.splice(index, 1);
  }
}
function buildKey$1(opts) {
  const { path: path2, method, body: body2, headers: headers2, query } = opts;
  return {
    path: path2,
    method,
    body: body2,
    headers: headers2,
    query
  };
}
function generateKeyValues(data) {
  return Object.entries(data).reduce((keyValuePairs, [key, value]) => [
    ...keyValuePairs,
    Buffer.from(`${key}`),
    Array.isArray(value) ? value.map((x) => Buffer.from(`${x}`)) : Buffer.from(`${value}`)
  ], []);
}
function getStatusText(statusCode) {
  return STATUS_CODES[statusCode] || "unknown";
}
async function getResponse(body2) {
  const buffers = [];
  for await (const data of body2) {
    buffers.push(data);
  }
  return Buffer.concat(buffers).toString("utf8");
}
function mockDispatch(opts, handler) {
  const key = buildKey$1(opts);
  const mockDispatch2 = getMockDispatch(this[kDispatches$4], key);
  mockDispatch2.timesInvoked++;
  if (mockDispatch2.data.callback) {
    mockDispatch2.data = { ...mockDispatch2.data, ...mockDispatch2.data.callback(opts) };
  }
  const { data: { statusCode, data, headers: headers2, trailers, error }, delay, persist } = mockDispatch2;
  const { timesInvoked, times } = mockDispatch2;
  mockDispatch2.consumed = !persist && timesInvoked >= times;
  mockDispatch2.pending = timesInvoked < times;
  if (error !== null) {
    deleteMockDispatch(this[kDispatches$4], key);
    handler.onError(error);
    return true;
  }
  if (typeof delay === "number" && delay > 0) {
    setTimeout(() => {
      handleReply(this[kDispatches$4]);
    }, delay);
  } else {
    handleReply(this[kDispatches$4]);
  }
  function handleReply(mockDispatches, _data = data) {
    const optsHeaders = Array.isArray(opts.headers) ? buildHeadersFromArray(opts.headers) : opts.headers;
    const body2 = typeof _data === "function" ? _data({ ...opts, headers: optsHeaders }) : _data;
    if (isPromise(body2)) {
      body2.then((newData) => handleReply(mockDispatches, newData));
      return;
    }
    const responseData = getResponseData$1(body2);
    const responseHeaders = generateKeyValues(headers2);
    const responseTrailers = generateKeyValues(trailers);
    handler.abort = nop;
    handler.onHeaders(statusCode, responseHeaders, resume2, getStatusText(statusCode));
    handler.onData(Buffer.from(responseData));
    handler.onComplete(responseTrailers);
    deleteMockDispatch(mockDispatches, key);
  }
  function resume2() {
  }
  return true;
}
function buildMockDispatch$2() {
  const agent2 = this[kMockAgent$2];
  const origin = this[kOrigin$2];
  const originalDispatch = this[kOriginalDispatch$2];
  return function dispatch(opts, handler) {
    if (agent2.isMockActive) {
      try {
        mockDispatch.call(this, opts, handler);
      } catch (error) {
        if (error instanceof MockNotMatchedError2) {
          const netConnect = agent2[kGetNetConnect$1]();
          if (netConnect === false) {
            throw new MockNotMatchedError2(`${error.message}: subsequent request to origin ${origin} was not allowed (net.connect disabled)`);
          }
          if (checkNetConnect(netConnect, origin)) {
            originalDispatch.call(this, opts, handler);
          } else {
            throw new MockNotMatchedError2(`${error.message}: subsequent request to origin ${origin} was not allowed (net.connect is not enabled for this origin)`);
          }
        } else {
          throw error;
        }
      }
    } else {
      originalDispatch.call(this, opts, handler);
    }
  };
}
function checkNetConnect(netConnect, origin) {
  const url = new URL(origin);
  if (netConnect === true) {
    return true;
  } else if (Array.isArray(netConnect) && netConnect.some((matcher) => matchValue$1(matcher, url.host))) {
    return true;
  }
  return false;
}
function buildMockOptions$1(opts) {
  if (opts) {
    const { agent: agent2, ...mockOptions } = opts;
    return mockOptions;
  }
}
var mockUtils = {
  getResponseData: getResponseData$1,
  getMockDispatch,
  addMockDispatch: addMockDispatch$1,
  deleteMockDispatch,
  buildKey: buildKey$1,
  generateKeyValues,
  matchValue: matchValue$1,
  getResponse,
  getStatusText,
  mockDispatch,
  buildMockDispatch: buildMockDispatch$2,
  checkNetConnect,
  buildMockOptions: buildMockOptions$1,
  getHeaderByName
};
var mockInterceptor = {};
const { getResponseData, buildKey, addMockDispatch } = mockUtils;
const {
  kDispatches: kDispatches$3,
  kDispatchKey,
  kDefaultHeaders,
  kDefaultTrailers,
  kContentLength,
  kMockDispatch
} = mockSymbols;
const { InvalidArgumentError: InvalidArgumentError$6 } = errors$1;
const { buildURL } = util$j;
class MockScope {
  constructor(mockDispatch2) {
    this[kMockDispatch] = mockDispatch2;
  }
  /**
   * Delay a reply by a set amount in ms.
   */
  delay(waitInMs) {
    if (typeof waitInMs !== "number" || !Number.isInteger(waitInMs) || waitInMs <= 0) {
      throw new InvalidArgumentError$6("waitInMs must be a valid integer > 0");
    }
    this[kMockDispatch].delay = waitInMs;
    return this;
  }
  /**
   * For a defined reply, never mark as consumed.
   */
  persist() {
    this[kMockDispatch].persist = true;
    return this;
  }
  /**
   * Allow one to define a reply for a set amount of matching requests.
   */
  times(repeatTimes) {
    if (typeof repeatTimes !== "number" || !Number.isInteger(repeatTimes) || repeatTimes <= 0) {
      throw new InvalidArgumentError$6("repeatTimes must be a valid integer > 0");
    }
    this[kMockDispatch].times = repeatTimes;
    return this;
  }
}
let MockInterceptor$2 = class MockInterceptor {
  constructor(opts, mockDispatches) {
    if (typeof opts !== "object") {
      throw new InvalidArgumentError$6("opts must be an object");
    }
    if (typeof opts.path === "undefined") {
      throw new InvalidArgumentError$6("opts.path must be defined");
    }
    if (typeof opts.method === "undefined") {
      opts.method = "GET";
    }
    if (typeof opts.path === "string") {
      if (opts.query) {
        opts.path = buildURL(opts.path, opts.query);
      } else {
        const parsedURL = new URL(opts.path, "data://");
        opts.path = parsedURL.pathname + parsedURL.search;
      }
    }
    if (typeof opts.method === "string") {
      opts.method = opts.method.toUpperCase();
    }
    this[kDispatchKey] = buildKey(opts);
    this[kDispatches$3] = mockDispatches;
    this[kDefaultHeaders] = {};
    this[kDefaultTrailers] = {};
    this[kContentLength] = false;
  }
  createMockScopeDispatchData(statusCode, data, responseOptions = {}) {
    const responseData = getResponseData(data);
    const contentLength = this[kContentLength] ? { "content-length": responseData.length } : {};
    const headers2 = { ...this[kDefaultHeaders], ...contentLength, ...responseOptions.headers };
    const trailers = { ...this[kDefaultTrailers], ...responseOptions.trailers };
    return { statusCode, data, headers: headers2, trailers };
  }
  validateReplyParameters(statusCode, data, responseOptions) {
    if (typeof statusCode === "undefined") {
      throw new InvalidArgumentError$6("statusCode must be defined");
    }
    if (typeof data === "undefined") {
      throw new InvalidArgumentError$6("data must be defined");
    }
    if (typeof responseOptions !== "object") {
      throw new InvalidArgumentError$6("responseOptions must be an object");
    }
  }
  /**
   * Mock an undici request with a defined reply.
   */
  reply(replyData) {
    if (typeof replyData === "function") {
      const wrappedDefaultsCallback = (opts) => {
        const resolvedData = replyData(opts);
        if (typeof resolvedData !== "object") {
          throw new InvalidArgumentError$6("reply options callback must return an object");
        }
        const { statusCode: statusCode2, data: data2 = "", responseOptions: responseOptions2 = {} } = resolvedData;
        this.validateReplyParameters(statusCode2, data2, responseOptions2);
        return {
          ...this.createMockScopeDispatchData(statusCode2, data2, responseOptions2)
        };
      };
      const newMockDispatch2 = addMockDispatch(this[kDispatches$3], this[kDispatchKey], wrappedDefaultsCallback);
      return new MockScope(newMockDispatch2);
    }
    const [statusCode, data = "", responseOptions = {}] = [...arguments];
    this.validateReplyParameters(statusCode, data, responseOptions);
    const dispatchData = this.createMockScopeDispatchData(statusCode, data, responseOptions);
    const newMockDispatch = addMockDispatch(this[kDispatches$3], this[kDispatchKey], dispatchData);
    return new MockScope(newMockDispatch);
  }
  /**
   * Mock an undici request with a defined error.
   */
  replyWithError(error) {
    if (typeof error === "undefined") {
      throw new InvalidArgumentError$6("error must be defined");
    }
    const newMockDispatch = addMockDispatch(this[kDispatches$3], this[kDispatchKey], { error });
    return new MockScope(newMockDispatch);
  }
  /**
   * Set default reply headers on the interceptor for subsequent replies
   */
  defaultReplyHeaders(headers2) {
    if (typeof headers2 === "undefined") {
      throw new InvalidArgumentError$6("headers must be defined");
    }
    this[kDefaultHeaders] = headers2;
    return this;
  }
  /**
   * Set default reply trailers on the interceptor for subsequent replies
   */
  defaultReplyTrailers(trailers) {
    if (typeof trailers === "undefined") {
      throw new InvalidArgumentError$6("trailers must be defined");
    }
    this[kDefaultTrailers] = trailers;
    return this;
  }
  /**
   * Set reply content length header for replies on the interceptor
   */
  replyContentLength() {
    this[kContentLength] = true;
    return this;
  }
};
mockInterceptor.MockInterceptor = MockInterceptor$2;
mockInterceptor.MockScope = MockScope;
const { promisify: promisify$1 } = require$$0$2;
const Client$1 = client;
const { buildMockDispatch: buildMockDispatch$1 } = mockUtils;
const {
  kDispatches: kDispatches$2,
  kMockAgent: kMockAgent$1,
  kClose: kClose$2,
  kOriginalClose: kOriginalClose$1,
  kOrigin: kOrigin$1,
  kOriginalDispatch: kOriginalDispatch$1,
  kConnected: kConnected$1
} = mockSymbols;
const { MockInterceptor: MockInterceptor$1 } = mockInterceptor;
const Symbols$1 = symbols$4;
const { InvalidArgumentError: InvalidArgumentError$5 } = errors$1;
let MockClient$2 = class MockClient extends Client$1 {
  constructor(origin, opts) {
    super(origin, opts);
    if (!opts || !opts.agent || typeof opts.agent.dispatch !== "function") {
      throw new InvalidArgumentError$5("Argument opts.agent must implement Agent");
    }
    this[kMockAgent$1] = opts.agent;
    this[kOrigin$1] = origin;
    this[kDispatches$2] = [];
    this[kConnected$1] = 1;
    this[kOriginalDispatch$1] = this.dispatch;
    this[kOriginalClose$1] = this.close.bind(this);
    this.dispatch = buildMockDispatch$1.call(this);
    this.close = this[kClose$2];
  }
  get [Symbols$1.kConnected]() {
    return this[kConnected$1];
  }
  /**
   * Sets up the base interceptor for mocking replies from undici.
   */
  intercept(opts) {
    return new MockInterceptor$1(opts, this[kDispatches$2]);
  }
  async [kClose$2]() {
    await promisify$1(this[kOriginalClose$1])();
    this[kConnected$1] = 0;
    this[kMockAgent$1][Symbols$1.kClients].delete(this[kOrigin$1]);
  }
};
var mockClient = MockClient$2;
const { promisify } = require$$0$2;
const Pool$2 = pool;
const { buildMockDispatch } = mockUtils;
const {
  kDispatches: kDispatches$1,
  kMockAgent,
  kClose: kClose$1,
  kOriginalClose,
  kOrigin,
  kOriginalDispatch,
  kConnected
} = mockSymbols;
const { MockInterceptor: MockInterceptor2 } = mockInterceptor;
const Symbols = symbols$4;
const { InvalidArgumentError: InvalidArgumentError$4 } = errors$1;
let MockPool$2 = class MockPool extends Pool$2 {
  constructor(origin, opts) {
    super(origin, opts);
    if (!opts || !opts.agent || typeof opts.agent.dispatch !== "function") {
      throw new InvalidArgumentError$4("Argument opts.agent must implement Agent");
    }
    this[kMockAgent] = opts.agent;
    this[kOrigin] = origin;
    this[kDispatches$1] = [];
    this[kConnected] = 1;
    this[kOriginalDispatch] = this.dispatch;
    this[kOriginalClose] = this.close.bind(this);
    this.dispatch = buildMockDispatch.call(this);
    this.close = this[kClose$1];
  }
  get [Symbols.kConnected]() {
    return this[kConnected];
  }
  /**
   * Sets up the base interceptor for mocking replies from undici.
   */
  intercept(opts) {
    return new MockInterceptor2(opts, this[kDispatches$1]);
  }
  async [kClose$1]() {
    await promisify(this[kOriginalClose])();
    this[kConnected] = 0;
    this[kMockAgent][Symbols.kClients].delete(this[kOrigin]);
  }
};
var mockPool = MockPool$2;
const singulars = {
  pronoun: "it",
  is: "is",
  was: "was",
  this: "this"
};
const plurals = {
  pronoun: "they",
  is: "are",
  was: "were",
  this: "these"
};
var pluralizer = class Pluralizer {
  constructor(singular, plural) {
    this.singular = singular;
    this.plural = plural;
  }
  pluralize(count) {
    const one = count === 1;
    const keys = one ? singulars : plurals;
    const noun = one ? this.singular : this.plural;
    return { ...keys, count, noun };
  }
};
const { Transform } = require$$0$4;
const { Console } = require$$1$2;
var pendingInterceptorsFormatter = class PendingInterceptorsFormatter {
  constructor({ disableColors } = {}) {
    this.transform = new Transform({
      transform(chunk, _enc, cb) {
        cb(null, chunk);
      }
    });
    this.logger = new Console({
      stdout: this.transform,
      inspectOptions: {
        colors: !disableColors && !process.env.CI
      }
    });
  }
  format(pendingInterceptors) {
    const withPrettyHeaders = pendingInterceptors.map(
      ({ method, path: path2, data: { statusCode }, persist, times, timesInvoked, origin }) => ({
        Method: method,
        Origin: origin,
        Path: path2,
        "Status code": statusCode,
        Persistent: persist ? "✅" : "❌",
        Invocations: timesInvoked,
        Remaining: persist ? Infinity : times - timesInvoked
      })
    );
    this.logger.table(withPrettyHeaders);
    return this.transform.read().toString();
  }
};
const { kClients } = symbols$4;
const Agent$3 = agent;
const {
  kAgent: kAgent$1,
  kMockAgentSet,
  kMockAgentGet,
  kDispatches,
  kIsMockActive,
  kNetConnect,
  kGetNetConnect,
  kOptions,
  kFactory
} = mockSymbols;
const MockClient$1 = mockClient;
const MockPool$1 = mockPool;
const { matchValue, buildMockOptions } = mockUtils;
const { InvalidArgumentError: InvalidArgumentError$3, UndiciError: UndiciError2 } = errors$1;
const Dispatcher$1 = dispatcher;
const Pluralizer2 = pluralizer;
const PendingInterceptorsFormatter2 = pendingInterceptorsFormatter;
class FakeWeakRef {
  constructor(value) {
    this.value = value;
  }
  deref() {
    return this.value;
  }
}
let MockAgent$1 = class MockAgent extends Dispatcher$1 {
  constructor(opts) {
    super(opts);
    this[kNetConnect] = true;
    this[kIsMockActive] = true;
    if (opts && opts.agent && typeof opts.agent.dispatch !== "function") {
      throw new InvalidArgumentError$3("Argument opts.agent must implement Agent");
    }
    const agent2 = opts && opts.agent ? opts.agent : new Agent$3(opts);
    this[kAgent$1] = agent2;
    this[kClients] = agent2[kClients];
    this[kOptions] = buildMockOptions(opts);
  }
  get(origin) {
    let dispatcher2 = this[kMockAgentGet](origin);
    if (!dispatcher2) {
      dispatcher2 = this[kFactory](origin);
      this[kMockAgentSet](origin, dispatcher2);
    }
    return dispatcher2;
  }
  dispatch(opts, handler) {
    this.get(opts.origin);
    return this[kAgent$1].dispatch(opts, handler);
  }
  async close() {
    await this[kAgent$1].close();
    this[kClients].clear();
  }
  deactivate() {
    this[kIsMockActive] = false;
  }
  activate() {
    this[kIsMockActive] = true;
  }
  enableNetConnect(matcher) {
    if (typeof matcher === "string" || typeof matcher === "function" || matcher instanceof RegExp) {
      if (Array.isArray(this[kNetConnect])) {
        this[kNetConnect].push(matcher);
      } else {
        this[kNetConnect] = [matcher];
      }
    } else if (typeof matcher === "undefined") {
      this[kNetConnect] = true;
    } else {
      throw new InvalidArgumentError$3("Unsupported matcher. Must be one of String|Function|RegExp.");
    }
  }
  disableNetConnect() {
    this[kNetConnect] = false;
  }
  // This is required to bypass issues caused by using global symbols - see:
  // https://github.com/nodejs/undici/issues/1447
  get isMockActive() {
    return this[kIsMockActive];
  }
  [kMockAgentSet](origin, dispatcher2) {
    this[kClients].set(origin, new FakeWeakRef(dispatcher2));
  }
  [kFactory](origin) {
    const mockOptions = Object.assign({ agent: this }, this[kOptions]);
    return this[kOptions] && this[kOptions].connections === 1 ? new MockClient$1(origin, mockOptions) : new MockPool$1(origin, mockOptions);
  }
  [kMockAgentGet](origin) {
    const ref = this[kClients].get(origin);
    if (ref) {
      return ref.deref();
    }
    if (typeof origin !== "string") {
      const dispatcher2 = this[kFactory]("http://localhost:9999");
      this[kMockAgentSet](origin, dispatcher2);
      return dispatcher2;
    }
    for (const [keyMatcher, nonExplicitRef] of Array.from(this[kClients])) {
      const nonExplicitDispatcher = nonExplicitRef.deref();
      if (nonExplicitDispatcher && typeof keyMatcher !== "string" && matchValue(keyMatcher, origin)) {
        const dispatcher2 = this[kFactory](origin);
        this[kMockAgentSet](origin, dispatcher2);
        dispatcher2[kDispatches] = nonExplicitDispatcher[kDispatches];
        return dispatcher2;
      }
    }
  }
  [kGetNetConnect]() {
    return this[kNetConnect];
  }
  pendingInterceptors() {
    const mockAgentClients = this[kClients];
    return Array.from(mockAgentClients.entries()).flatMap(([origin, scope]) => scope.deref()[kDispatches].map((dispatch) => ({ ...dispatch, origin }))).filter(({ pending }) => pending);
  }
  assertNoPendingInterceptors({ pendingInterceptorsFormatter: pendingInterceptorsFormatter2 = new PendingInterceptorsFormatter2() } = {}) {
    const pending = this.pendingInterceptors();
    if (pending.length === 0) {
      return;
    }
    const pluralizer2 = new Pluralizer2("interceptor", "interceptors").pluralize(pending.length);
    throw new UndiciError2(`
${pluralizer2.count} ${pluralizer2.noun} ${pluralizer2.is} pending:

${pendingInterceptorsFormatter2.format(pending)}
`.trim());
  }
};
var mockAgent = MockAgent$1;
const { kProxy, kClose, kDestroy, kInterceptors } = symbols$4;
const { URL: URL$1 } = require$$1$3;
const Agent$2 = agent;
const Pool$1 = pool;
const DispatcherBase2 = dispatcherBase;
const { InvalidArgumentError: InvalidArgumentError$2, RequestAbortedError: RequestAbortedError2 } = errors$1;
const buildConnector$1 = connect$2;
const kAgent = Symbol("proxy agent");
const kClient = Symbol("proxy client");
const kProxyHeaders = Symbol("proxy headers");
const kRequestTls = Symbol("request tls settings");
const kProxyTls = Symbol("proxy tls settings");
const kConnectEndpoint = Symbol("connect endpoint function");
function defaultProtocolPort(protocol) {
  return protocol === "https:" ? 443 : 80;
}
function buildProxyOptions(opts) {
  if (typeof opts === "string") {
    opts = { uri: opts };
  }
  if (!opts || !opts.uri) {
    throw new InvalidArgumentError$2("Proxy opts.uri is mandatory");
  }
  return {
    uri: opts.uri,
    protocol: opts.protocol || "https"
  };
}
function defaultFactory(origin, opts) {
  return new Pool$1(origin, opts);
}
let ProxyAgent$1 = class ProxyAgent extends DispatcherBase2 {
  constructor(opts) {
    super(opts);
    this[kProxy] = buildProxyOptions(opts);
    this[kAgent] = new Agent$2(opts);
    this[kInterceptors] = opts.interceptors && opts.interceptors.ProxyAgent && Array.isArray(opts.interceptors.ProxyAgent) ? opts.interceptors.ProxyAgent : [];
    if (typeof opts === "string") {
      opts = { uri: opts };
    }
    if (!opts || !opts.uri) {
      throw new InvalidArgumentError$2("Proxy opts.uri is mandatory");
    }
    const { clientFactory = defaultFactory } = opts;
    if (typeof clientFactory !== "function") {
      throw new InvalidArgumentError$2("Proxy opts.clientFactory must be a function.");
    }
    this[kRequestTls] = opts.requestTls;
    this[kProxyTls] = opts.proxyTls;
    this[kProxyHeaders] = opts.headers || {};
    const resolvedUrl = new URL$1(opts.uri);
    const { origin, port, host, username, password } = resolvedUrl;
    if (opts.auth && opts.token) {
      throw new InvalidArgumentError$2("opts.auth cannot be used in combination with opts.token");
    } else if (opts.auth) {
      this[kProxyHeaders]["proxy-authorization"] = `Basic ${opts.auth}`;
    } else if (opts.token) {
      this[kProxyHeaders]["proxy-authorization"] = opts.token;
    } else if (username && password) {
      this[kProxyHeaders]["proxy-authorization"] = `Basic ${Buffer.from(`${decodeURIComponent(username)}:${decodeURIComponent(password)}`).toString("base64")}`;
    }
    const connect2 = buildConnector$1({ ...opts.proxyTls });
    this[kConnectEndpoint] = buildConnector$1({ ...opts.requestTls });
    this[kClient] = clientFactory(resolvedUrl, { connect: connect2 });
    this[kAgent] = new Agent$2({
      ...opts,
      connect: async (opts2, callback) => {
        let requestedHost = opts2.host;
        if (!opts2.port) {
          requestedHost += `:${defaultProtocolPort(opts2.protocol)}`;
        }
        try {
          const { socket, statusCode } = await this[kClient].connect({
            origin,
            port,
            path: requestedHost,
            signal: opts2.signal,
            headers: {
              ...this[kProxyHeaders],
              host
            }
          });
          if (statusCode !== 200) {
            socket.on("error", () => {
            }).destroy();
            callback(new RequestAbortedError2(`Proxy response (${statusCode}) !== 200 when HTTP Tunneling`));
          }
          if (opts2.protocol !== "https:") {
            callback(null, socket);
            return;
          }
          let servername;
          if (this[kRequestTls]) {
            servername = this[kRequestTls].servername;
          } else {
            servername = opts2.servername;
          }
          this[kConnectEndpoint]({ ...opts2, servername, httpSocket: socket }, callback);
        } catch (err) {
          callback(err);
        }
      }
    });
  }
  dispatch(opts, handler) {
    const { host } = new URL$1(opts.origin);
    const headers2 = buildHeaders(opts.headers);
    throwIfProxyAuthIsSent(headers2);
    return this[kAgent].dispatch(
      {
        ...opts,
        headers: {
          ...headers2,
          host
        }
      },
      handler
    );
  }
  async [kClose]() {
    await this[kAgent].close();
    await this[kClient].close();
  }
  async [kDestroy]() {
    await this[kAgent].destroy();
    await this[kClient].destroy();
  }
};
function buildHeaders(headers2) {
  if (Array.isArray(headers2)) {
    const headersPair = {};
    for (let i = 0; i < headers2.length; i += 2) {
      headersPair[headers2[i]] = headers2[i + 1];
    }
    return headersPair;
  }
  return headers2;
}
function throwIfProxyAuthIsSent(headers2) {
  const existProxyAuth = headers2 && Object.keys(headers2).find((key) => key.toLowerCase() === "proxy-authorization");
  if (existProxyAuth) {
    throw new InvalidArgumentError$2("Proxy-Authorization should be sent in ProxyAgent constructor");
  }
}
var proxyAgent = ProxyAgent$1;
const assert = require$$0$3;
const { kRetryHandlerDefaultRetry } = symbols$4;
const { RequestRetryError: RequestRetryError2 } = errors$1;
const { isDisturbed, parseHeaders, parseRangeHeader } = util$j;
function calculateRetryAfterHeader(retryAfter) {
  const current = Date.now();
  const diff = new Date(retryAfter).getTime() - current;
  return diff;
}
let RetryHandler$1 = class RetryHandler {
  constructor(opts, handlers) {
    const { retryOptions, ...dispatchOpts } = opts;
    const {
      // Retry scoped
      retry: retryFn,
      maxRetries,
      maxTimeout,
      minTimeout,
      timeoutFactor,
      // Response scoped
      methods,
      errorCodes,
      retryAfter,
      statusCodes
    } = retryOptions ?? {};
    this.dispatch = handlers.dispatch;
    this.handler = handlers.handler;
    this.opts = dispatchOpts;
    this.abort = null;
    this.aborted = false;
    this.retryOpts = {
      retry: retryFn ?? RetryHandler[kRetryHandlerDefaultRetry],
      retryAfter: retryAfter ?? true,
      maxTimeout: maxTimeout ?? 30 * 1e3,
      // 30s,
      timeout: minTimeout ?? 500,
      // .5s
      timeoutFactor: timeoutFactor ?? 2,
      maxRetries: maxRetries ?? 5,
      // What errors we should retry
      methods: methods ?? ["GET", "HEAD", "OPTIONS", "PUT", "DELETE", "TRACE"],
      // Indicates which errors to retry
      statusCodes: statusCodes ?? [500, 502, 503, 504, 429],
      // List of errors to retry
      errorCodes: errorCodes ?? [
        "ECONNRESET",
        "ECONNREFUSED",
        "ENOTFOUND",
        "ENETDOWN",
        "ENETUNREACH",
        "EHOSTDOWN",
        "EHOSTUNREACH",
        "EPIPE"
      ]
    };
    this.retryCount = 0;
    this.start = 0;
    this.end = null;
    this.etag = null;
    this.resume = null;
    this.handler.onConnect((reason) => {
      this.aborted = true;
      if (this.abort) {
        this.abort(reason);
      } else {
        this.reason = reason;
      }
    });
  }
  onRequestSent() {
    if (this.handler.onRequestSent) {
      this.handler.onRequestSent();
    }
  }
  onUpgrade(statusCode, headers2, socket) {
    if (this.handler.onUpgrade) {
      this.handler.onUpgrade(statusCode, headers2, socket);
    }
  }
  onConnect(abort2) {
    if (this.aborted) {
      abort2(this.reason);
    } else {
      this.abort = abort2;
    }
  }
  onBodySent(chunk) {
    if (this.handler.onBodySent)
      return this.handler.onBodySent(chunk);
  }
  static [kRetryHandlerDefaultRetry](err, { state, opts }, cb) {
    const { statusCode, code, headers: headers2 } = err;
    const { method, retryOptions } = opts;
    const {
      maxRetries,
      timeout,
      maxTimeout,
      timeoutFactor,
      statusCodes,
      errorCodes,
      methods
    } = retryOptions;
    let { counter, currentTimeout } = state;
    currentTimeout = currentTimeout != null && currentTimeout > 0 ? currentTimeout : timeout;
    if (code && code !== "UND_ERR_REQ_RETRY" && code !== "UND_ERR_SOCKET" && !errorCodes.includes(code)) {
      cb(err);
      return;
    }
    if (Array.isArray(methods) && !methods.includes(method)) {
      cb(err);
      return;
    }
    if (statusCode != null && Array.isArray(statusCodes) && !statusCodes.includes(statusCode)) {
      cb(err);
      return;
    }
    if (counter > maxRetries) {
      cb(err);
      return;
    }
    let retryAfterHeader = headers2 != null && headers2["retry-after"];
    if (retryAfterHeader) {
      retryAfterHeader = Number(retryAfterHeader);
      retryAfterHeader = isNaN(retryAfterHeader) ? calculateRetryAfterHeader(retryAfterHeader) : retryAfterHeader * 1e3;
    }
    const retryTimeout = retryAfterHeader > 0 ? Math.min(retryAfterHeader, maxTimeout) : Math.min(currentTimeout * timeoutFactor ** counter, maxTimeout);
    state.currentTimeout = retryTimeout;
    setTimeout(() => cb(null), retryTimeout);
  }
  onHeaders(statusCode, rawHeaders, resume2, statusMessage) {
    const headers2 = parseHeaders(rawHeaders);
    this.retryCount += 1;
    if (statusCode >= 300) {
      this.abort(
        new RequestRetryError2("Request failed", statusCode, {
          headers: headers2,
          count: this.retryCount
        })
      );
      return false;
    }
    if (this.resume != null) {
      this.resume = null;
      if (statusCode !== 206) {
        return true;
      }
      const contentRange = parseRangeHeader(headers2["content-range"]);
      if (!contentRange) {
        this.abort(
          new RequestRetryError2("Content-Range mismatch", statusCode, {
            headers: headers2,
            count: this.retryCount
          })
        );
        return false;
      }
      if (this.etag != null && this.etag !== headers2.etag) {
        this.abort(
          new RequestRetryError2("ETag mismatch", statusCode, {
            headers: headers2,
            count: this.retryCount
          })
        );
        return false;
      }
      const { start, size, end = size } = contentRange;
      assert(this.start === start, "content-range mismatch");
      assert(this.end == null || this.end === end, "content-range mismatch");
      this.resume = resume2;
      return true;
    }
    if (this.end == null) {
      if (statusCode === 206) {
        const range = parseRangeHeader(headers2["content-range"]);
        if (range == null) {
          return this.handler.onHeaders(
            statusCode,
            rawHeaders,
            resume2,
            statusMessage
          );
        }
        const { start, size, end = size } = range;
        assert(
          start != null && Number.isFinite(start) && this.start !== start,
          "content-range mismatch"
        );
        assert(Number.isFinite(start));
        assert(
          end != null && Number.isFinite(end) && this.end !== end,
          "invalid content-length"
        );
        this.start = start;
        this.end = end;
      }
      if (this.end == null) {
        const contentLength = headers2["content-length"];
        this.end = contentLength != null ? Number(contentLength) : null;
      }
      assert(Number.isFinite(this.start));
      assert(
        this.end == null || Number.isFinite(this.end),
        "invalid content-length"
      );
      this.resume = resume2;
      this.etag = headers2.etag != null ? headers2.etag : null;
      return this.handler.onHeaders(
        statusCode,
        rawHeaders,
        resume2,
        statusMessage
      );
    }
    const err = new RequestRetryError2("Request failed", statusCode, {
      headers: headers2,
      count: this.retryCount
    });
    this.abort(err);
    return false;
  }
  onData(chunk) {
    this.start += chunk.length;
    return this.handler.onData(chunk);
  }
  onComplete(rawTrailers) {
    this.retryCount = 0;
    return this.handler.onComplete(rawTrailers);
  }
  onError(err) {
    if (this.aborted || isDisturbed(this.opts.body)) {
      return this.handler.onError(err);
    }
    this.retryOpts.retry(
      err,
      {
        state: { counter: this.retryCount++, currentTimeout: this.retryAfter },
        opts: { retryOptions: this.retryOpts, ...this.opts }
      },
      onRetry.bind(this)
    );
    function onRetry(err2) {
      if (err2 != null || this.aborted || isDisturbed(this.opts.body)) {
        return this.handler.onError(err2);
      }
      if (this.start !== 0) {
        this.opts = {
          ...this.opts,
          headers: {
            ...this.opts.headers,
            range: `bytes=${this.start}-${this.end ?? ""}`
          }
        };
      }
      try {
        this.dispatch(this.opts, this);
      } catch (err3) {
        this.handler.onError(err3);
      }
    }
  }
};
var RetryHandler_1 = RetryHandler$1;
const globalDispatcher = Symbol.for("undici.globalDispatcher.1");
const { InvalidArgumentError: InvalidArgumentError$1 } = errors$1;
const Agent$1 = agent;
if (getGlobalDispatcher$1() === void 0) {
  setGlobalDispatcher$1(new Agent$1());
}
function setGlobalDispatcher$1(agent2) {
  if (!agent2 || typeof agent2.dispatch !== "function") {
    throw new InvalidArgumentError$1("Argument agent must implement Agent");
  }
  Object.defineProperty(globalThis, globalDispatcher, {
    value: agent2,
    writable: true,
    enumerable: false,
    configurable: false
  });
}
function getGlobalDispatcher$1() {
  return globalThis[globalDispatcher];
}
var global$1 = {
  setGlobalDispatcher: setGlobalDispatcher$1,
  getGlobalDispatcher: getGlobalDispatcher$1
};
var DecoratorHandler_1 = class DecoratorHandler {
  constructor(handler) {
    this.handler = handler;
  }
  onConnect(...args) {
    return this.handler.onConnect(...args);
  }
  onError(...args) {
    return this.handler.onError(...args);
  }
  onUpgrade(...args) {
    return this.handler.onUpgrade(...args);
  }
  onHeaders(...args) {
    return this.handler.onHeaders(...args);
  }
  onData(...args) {
    return this.handler.onData(...args);
  }
  onComplete(...args) {
    return this.handler.onComplete(...args);
  }
  onBodySent(...args) {
    return this.handler.onBodySent(...args);
  }
};
var headers;
var hasRequiredHeaders;
function requireHeaders() {
  if (hasRequiredHeaders)
    return headers;
  hasRequiredHeaders = 1;
  const { kHeadersList, kConstruct } = symbols$4;
  const { kGuard } = requireSymbols$3();
  const { kEnumerableProperty: kEnumerableProperty2 } = util$j;
  const {
    makeIterator,
    isValidHeaderName,
    isValidHeaderValue
  } = requireUtil$4();
  const { webidl } = requireWebidl();
  const assert2 = require$$0$3;
  const kHeadersMap = Symbol("headers map");
  const kHeadersSortedMap = Symbol("headers map sorted");
  function isHTTPWhiteSpaceCharCode(code) {
    return code === 10 || code === 13 || code === 9 || code === 32;
  }
  function headerValueNormalize(potentialValue) {
    let i = 0;
    let j = potentialValue.length;
    while (j > i && isHTTPWhiteSpaceCharCode(potentialValue.charCodeAt(j - 1)))
      --j;
    while (j > i && isHTTPWhiteSpaceCharCode(potentialValue.charCodeAt(i)))
      ++i;
    return i === 0 && j === potentialValue.length ? potentialValue : potentialValue.substring(i, j);
  }
  function fill(headers2, object) {
    if (Array.isArray(object)) {
      for (let i = 0; i < object.length; ++i) {
        const header = object[i];
        if (header.length !== 2) {
          throw webidl.errors.exception({
            header: "Headers constructor",
            message: `expected name/value pair to be length 2, found ${header.length}.`
          });
        }
        appendHeader(headers2, header[0], header[1]);
      }
    } else if (typeof object === "object" && object !== null) {
      const keys = Object.keys(object);
      for (let i = 0; i < keys.length; ++i) {
        appendHeader(headers2, keys[i], object[keys[i]]);
      }
    } else {
      throw webidl.errors.conversionFailed({
        prefix: "Headers constructor",
        argument: "Argument 1",
        types: ["sequence<sequence<ByteString>>", "record<ByteString, ByteString>"]
      });
    }
  }
  function appendHeader(headers2, name, value) {
    value = headerValueNormalize(value);
    if (!isValidHeaderName(name)) {
      throw webidl.errors.invalidArgument({
        prefix: "Headers.append",
        value: name,
        type: "header name"
      });
    } else if (!isValidHeaderValue(value)) {
      throw webidl.errors.invalidArgument({
        prefix: "Headers.append",
        value,
        type: "header value"
      });
    }
    if (headers2[kGuard] === "immutable") {
      throw new TypeError("immutable");
    } else if (headers2[kGuard] === "request-no-cors")
      ;
    return headers2[kHeadersList].append(name, value);
  }
  class HeadersList {
    constructor(init) {
      /** @type {[string, string][]|null} */
      __publicField(this, "cookies", null);
      if (init instanceof HeadersList) {
        this[kHeadersMap] = new Map(init[kHeadersMap]);
        this[kHeadersSortedMap] = init[kHeadersSortedMap];
        this.cookies = init.cookies === null ? null : [...init.cookies];
      } else {
        this[kHeadersMap] = new Map(init);
        this[kHeadersSortedMap] = null;
      }
    }
    // https://fetch.spec.whatwg.org/#header-list-contains
    contains(name) {
      name = name.toLowerCase();
      return this[kHeadersMap].has(name);
    }
    clear() {
      this[kHeadersMap].clear();
      this[kHeadersSortedMap] = null;
      this.cookies = null;
    }
    // https://fetch.spec.whatwg.org/#concept-header-list-append
    append(name, value) {
      this[kHeadersSortedMap] = null;
      const lowercaseName = name.toLowerCase();
      const exists = this[kHeadersMap].get(lowercaseName);
      if (exists) {
        const delimiter = lowercaseName === "cookie" ? "; " : ", ";
        this[kHeadersMap].set(lowercaseName, {
          name: exists.name,
          value: `${exists.value}${delimiter}${value}`
        });
      } else {
        this[kHeadersMap].set(lowercaseName, { name, value });
      }
      if (lowercaseName === "set-cookie") {
        this.cookies ?? (this.cookies = []);
        this.cookies.push(value);
      }
    }
    // https://fetch.spec.whatwg.org/#concept-header-list-set
    set(name, value) {
      this[kHeadersSortedMap] = null;
      const lowercaseName = name.toLowerCase();
      if (lowercaseName === "set-cookie") {
        this.cookies = [value];
      }
      this[kHeadersMap].set(lowercaseName, { name, value });
    }
    // https://fetch.spec.whatwg.org/#concept-header-list-delete
    delete(name) {
      this[kHeadersSortedMap] = null;
      name = name.toLowerCase();
      if (name === "set-cookie") {
        this.cookies = null;
      }
      this[kHeadersMap].delete(name);
    }
    // https://fetch.spec.whatwg.org/#concept-header-list-get
    get(name) {
      const value = this[kHeadersMap].get(name.toLowerCase());
      return value === void 0 ? null : value.value;
    }
    *[Symbol.iterator]() {
      for (const [name, { value }] of this[kHeadersMap]) {
        yield [name, value];
      }
    }
    get entries() {
      const headers2 = {};
      if (this[kHeadersMap].size) {
        for (const { name, value } of this[kHeadersMap].values()) {
          headers2[name] = value;
        }
      }
      return headers2;
    }
  }
  class Headers2 {
    constructor(init = void 0) {
      if (init === kConstruct) {
        return;
      }
      this[kHeadersList] = new HeadersList();
      this[kGuard] = "none";
      if (init !== void 0) {
        init = webidl.converters.HeadersInit(init);
        fill(this, init);
      }
    }
    // https://fetch.spec.whatwg.org/#dom-headers-append
    append(name, value) {
      webidl.brandCheck(this, Headers2);
      webidl.argumentLengthCheck(arguments, 2, { header: "Headers.append" });
      name = webidl.converters.ByteString(name);
      value = webidl.converters.ByteString(value);
      return appendHeader(this, name, value);
    }
    // https://fetch.spec.whatwg.org/#dom-headers-delete
    delete(name) {
      webidl.brandCheck(this, Headers2);
      webidl.argumentLengthCheck(arguments, 1, { header: "Headers.delete" });
      name = webidl.converters.ByteString(name);
      if (!isValidHeaderName(name)) {
        throw webidl.errors.invalidArgument({
          prefix: "Headers.delete",
          value: name,
          type: "header name"
        });
      }
      if (this[kGuard] === "immutable") {
        throw new TypeError("immutable");
      } else if (this[kGuard] === "request-no-cors")
        ;
      if (!this[kHeadersList].contains(name)) {
        return;
      }
      this[kHeadersList].delete(name);
    }
    // https://fetch.spec.whatwg.org/#dom-headers-get
    get(name) {
      webidl.brandCheck(this, Headers2);
      webidl.argumentLengthCheck(arguments, 1, { header: "Headers.get" });
      name = webidl.converters.ByteString(name);
      if (!isValidHeaderName(name)) {
        throw webidl.errors.invalidArgument({
          prefix: "Headers.get",
          value: name,
          type: "header name"
        });
      }
      return this[kHeadersList].get(name);
    }
    // https://fetch.spec.whatwg.org/#dom-headers-has
    has(name) {
      webidl.brandCheck(this, Headers2);
      webidl.argumentLengthCheck(arguments, 1, { header: "Headers.has" });
      name = webidl.converters.ByteString(name);
      if (!isValidHeaderName(name)) {
        throw webidl.errors.invalidArgument({
          prefix: "Headers.has",
          value: name,
          type: "header name"
        });
      }
      return this[kHeadersList].contains(name);
    }
    // https://fetch.spec.whatwg.org/#dom-headers-set
    set(name, value) {
      webidl.brandCheck(this, Headers2);
      webidl.argumentLengthCheck(arguments, 2, { header: "Headers.set" });
      name = webidl.converters.ByteString(name);
      value = webidl.converters.ByteString(value);
      value = headerValueNormalize(value);
      if (!isValidHeaderName(name)) {
        throw webidl.errors.invalidArgument({
          prefix: "Headers.set",
          value: name,
          type: "header name"
        });
      } else if (!isValidHeaderValue(value)) {
        throw webidl.errors.invalidArgument({
          prefix: "Headers.set",
          value,
          type: "header value"
        });
      }
      if (this[kGuard] === "immutable") {
        throw new TypeError("immutable");
      } else if (this[kGuard] === "request-no-cors")
        ;
      this[kHeadersList].set(name, value);
    }
    // https://fetch.spec.whatwg.org/#dom-headers-getsetcookie
    getSetCookie() {
      webidl.brandCheck(this, Headers2);
      const list = this[kHeadersList].cookies;
      if (list) {
        return [...list];
      }
      return [];
    }
    // https://fetch.spec.whatwg.org/#concept-header-list-sort-and-combine
    get [kHeadersSortedMap]() {
      if (this[kHeadersList][kHeadersSortedMap]) {
        return this[kHeadersList][kHeadersSortedMap];
      }
      const headers2 = [];
      const names = [...this[kHeadersList]].sort((a, b) => a[0] < b[0] ? -1 : 1);
      const cookies2 = this[kHeadersList].cookies;
      for (let i = 0; i < names.length; ++i) {
        const [name, value] = names[i];
        if (name === "set-cookie") {
          for (let j = 0; j < cookies2.length; ++j) {
            headers2.push([name, cookies2[j]]);
          }
        } else {
          assert2(value !== null);
          headers2.push([name, value]);
        }
      }
      this[kHeadersList][kHeadersSortedMap] = headers2;
      return headers2;
    }
    keys() {
      webidl.brandCheck(this, Headers2);
      if (this[kGuard] === "immutable") {
        const value = this[kHeadersSortedMap];
        return makeIterator(
          () => value,
          "Headers",
          "key"
        );
      }
      return makeIterator(
        () => [...this[kHeadersSortedMap].values()],
        "Headers",
        "key"
      );
    }
    values() {
      webidl.brandCheck(this, Headers2);
      if (this[kGuard] === "immutable") {
        const value = this[kHeadersSortedMap];
        return makeIterator(
          () => value,
          "Headers",
          "value"
        );
      }
      return makeIterator(
        () => [...this[kHeadersSortedMap].values()],
        "Headers",
        "value"
      );
    }
    entries() {
      webidl.brandCheck(this, Headers2);
      if (this[kGuard] === "immutable") {
        const value = this[kHeadersSortedMap];
        return makeIterator(
          () => value,
          "Headers",
          "key+value"
        );
      }
      return makeIterator(
        () => [...this[kHeadersSortedMap].values()],
        "Headers",
        "key+value"
      );
    }
    /**
     * @param {(value: string, key: string, self: Headers) => void} callbackFn
     * @param {unknown} thisArg
     */
    forEach(callbackFn, thisArg = globalThis) {
      webidl.brandCheck(this, Headers2);
      webidl.argumentLengthCheck(arguments, 1, { header: "Headers.forEach" });
      if (typeof callbackFn !== "function") {
        throw new TypeError(
          "Failed to execute 'forEach' on 'Headers': parameter 1 is not of type 'Function'."
        );
      }
      for (const [key, value] of this) {
        callbackFn.apply(thisArg, [value, key, this]);
      }
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
      webidl.brandCheck(this, Headers2);
      return this[kHeadersList];
    }
  }
  Headers2.prototype[Symbol.iterator] = Headers2.prototype.entries;
  Object.defineProperties(Headers2.prototype, {
    append: kEnumerableProperty2,
    delete: kEnumerableProperty2,
    get: kEnumerableProperty2,
    has: kEnumerableProperty2,
    set: kEnumerableProperty2,
    getSetCookie: kEnumerableProperty2,
    keys: kEnumerableProperty2,
    values: kEnumerableProperty2,
    entries: kEnumerableProperty2,
    forEach: kEnumerableProperty2,
    [Symbol.iterator]: { enumerable: false },
    [Symbol.toStringTag]: {
      value: "Headers",
      configurable: true
    }
  });
  webidl.converters.HeadersInit = function(V) {
    if (webidl.util.Type(V) === "Object") {
      if (V[Symbol.iterator]) {
        return webidl.converters["sequence<sequence<ByteString>>"](V);
      }
      return webidl.converters["record<ByteString, ByteString>"](V);
    }
    throw webidl.errors.conversionFailed({
      prefix: "Headers constructor",
      argument: "Argument 1",
      types: ["sequence<sequence<ByteString>>", "record<ByteString, ByteString>"]
    });
  };
  headers = {
    fill,
    Headers: Headers2,
    HeadersList
  };
  return headers;
}
var response;
var hasRequiredResponse;
function requireResponse() {
  if (hasRequiredResponse)
    return response;
  hasRequiredResponse = 1;
  const { Headers: Headers2, HeadersList, fill } = requireHeaders();
  const { extractBody: extractBody2, cloneBody, mixinBody } = requireBody();
  const util2 = util$j;
  const { kEnumerableProperty: kEnumerableProperty2 } = util2;
  const {
    isValidReasonPhrase,
    isCancelled,
    isAborted,
    isBlobLike: isBlobLike2,
    serializeJavascriptValueToJSONString,
    isErrorLike,
    isomorphicEncode
  } = requireUtil$4();
  const {
    redirectStatusSet,
    nullBodyStatus,
    DOMException: DOMException2
  } = requireConstants$3();
  const { kState, kHeaders, kGuard, kRealm } = requireSymbols$3();
  const { webidl } = requireWebidl();
  const { FormData } = requireFormdata();
  const { getGlobalOrigin } = requireGlobal();
  const { URLSerializer } = requireDataURL();
  const { kHeadersList, kConstruct } = symbols$4;
  const assert2 = require$$0$3;
  const { types } = require$$0$2;
  const ReadableStream2 = globalThis.ReadableStream || require$$14.ReadableStream;
  const textEncoder = new TextEncoder("utf-8");
  class Response {
    // Creates network error Response.
    static error() {
      const relevantRealm = { settingsObject: {} };
      const responseObject = new Response();
      responseObject[kState] = makeNetworkError();
      responseObject[kRealm] = relevantRealm;
      responseObject[kHeaders][kHeadersList] = responseObject[kState].headersList;
      responseObject[kHeaders][kGuard] = "immutable";
      responseObject[kHeaders][kRealm] = relevantRealm;
      return responseObject;
    }
    // https://fetch.spec.whatwg.org/#dom-response-json
    static json(data, init = {}) {
      webidl.argumentLengthCheck(arguments, 1, { header: "Response.json" });
      if (init !== null) {
        init = webidl.converters.ResponseInit(init);
      }
      const bytes = textEncoder.encode(
        serializeJavascriptValueToJSONString(data)
      );
      const body2 = extractBody2(bytes);
      const relevantRealm = { settingsObject: {} };
      const responseObject = new Response();
      responseObject[kRealm] = relevantRealm;
      responseObject[kHeaders][kGuard] = "response";
      responseObject[kHeaders][kRealm] = relevantRealm;
      initializeResponse(responseObject, init, { body: body2[0], type: "application/json" });
      return responseObject;
    }
    // Creates a redirect Response that redirects to url with status status.
    static redirect(url, status = 302) {
      const relevantRealm = { settingsObject: {} };
      webidl.argumentLengthCheck(arguments, 1, { header: "Response.redirect" });
      url = webidl.converters.USVString(url);
      status = webidl.converters["unsigned short"](status);
      let parsedURL;
      try {
        parsedURL = new URL(url, getGlobalOrigin());
      } catch (err) {
        throw Object.assign(new TypeError("Failed to parse URL from " + url), {
          cause: err
        });
      }
      if (!redirectStatusSet.has(status)) {
        throw new RangeError("Invalid status code " + status);
      }
      const responseObject = new Response();
      responseObject[kRealm] = relevantRealm;
      responseObject[kHeaders][kGuard] = "immutable";
      responseObject[kHeaders][kRealm] = relevantRealm;
      responseObject[kState].status = status;
      const value = isomorphicEncode(URLSerializer(parsedURL));
      responseObject[kState].headersList.append("location", value);
      return responseObject;
    }
    // https://fetch.spec.whatwg.org/#dom-response
    constructor(body2 = null, init = {}) {
      if (body2 !== null) {
        body2 = webidl.converters.BodyInit(body2);
      }
      init = webidl.converters.ResponseInit(init);
      this[kRealm] = { settingsObject: {} };
      this[kState] = makeResponse({});
      this[kHeaders] = new Headers2(kConstruct);
      this[kHeaders][kGuard] = "response";
      this[kHeaders][kHeadersList] = this[kState].headersList;
      this[kHeaders][kRealm] = this[kRealm];
      let bodyWithType = null;
      if (body2 != null) {
        const [extractedBody, type] = extractBody2(body2);
        bodyWithType = { body: extractedBody, type };
      }
      initializeResponse(this, init, bodyWithType);
    }
    // Returns response’s type, e.g., "cors".
    get type() {
      webidl.brandCheck(this, Response);
      return this[kState].type;
    }
    // Returns response’s URL, if it has one; otherwise the empty string.
    get url() {
      webidl.brandCheck(this, Response);
      const urlList = this[kState].urlList;
      const url = urlList[urlList.length - 1] ?? null;
      if (url === null) {
        return "";
      }
      return URLSerializer(url, true);
    }
    // Returns whether response was obtained through a redirect.
    get redirected() {
      webidl.brandCheck(this, Response);
      return this[kState].urlList.length > 1;
    }
    // Returns response’s status.
    get status() {
      webidl.brandCheck(this, Response);
      return this[kState].status;
    }
    // Returns whether response’s status is an ok status.
    get ok() {
      webidl.brandCheck(this, Response);
      return this[kState].status >= 200 && this[kState].status <= 299;
    }
    // Returns response’s status message.
    get statusText() {
      webidl.brandCheck(this, Response);
      return this[kState].statusText;
    }
    // Returns response’s headers as Headers.
    get headers() {
      webidl.brandCheck(this, Response);
      return this[kHeaders];
    }
    get body() {
      webidl.brandCheck(this, Response);
      return this[kState].body ? this[kState].body.stream : null;
    }
    get bodyUsed() {
      webidl.brandCheck(this, Response);
      return !!this[kState].body && util2.isDisturbed(this[kState].body.stream);
    }
    // Returns a clone of response.
    clone() {
      webidl.brandCheck(this, Response);
      if (this.bodyUsed || this.body && this.body.locked) {
        throw webidl.errors.exception({
          header: "Response.clone",
          message: "Body has already been consumed."
        });
      }
      const clonedResponse = cloneResponse(this[kState]);
      const clonedResponseObject = new Response();
      clonedResponseObject[kState] = clonedResponse;
      clonedResponseObject[kRealm] = this[kRealm];
      clonedResponseObject[kHeaders][kHeadersList] = clonedResponse.headersList;
      clonedResponseObject[kHeaders][kGuard] = this[kHeaders][kGuard];
      clonedResponseObject[kHeaders][kRealm] = this[kHeaders][kRealm];
      return clonedResponseObject;
    }
  }
  mixinBody(Response);
  Object.defineProperties(Response.prototype, {
    type: kEnumerableProperty2,
    url: kEnumerableProperty2,
    status: kEnumerableProperty2,
    ok: kEnumerableProperty2,
    redirected: kEnumerableProperty2,
    statusText: kEnumerableProperty2,
    headers: kEnumerableProperty2,
    clone: kEnumerableProperty2,
    body: kEnumerableProperty2,
    bodyUsed: kEnumerableProperty2,
    [Symbol.toStringTag]: {
      value: "Response",
      configurable: true
    }
  });
  Object.defineProperties(Response, {
    json: kEnumerableProperty2,
    redirect: kEnumerableProperty2,
    error: kEnumerableProperty2
  });
  function cloneResponse(response2) {
    if (response2.internalResponse) {
      return filterResponse(
        cloneResponse(response2.internalResponse),
        response2.type
      );
    }
    const newResponse = makeResponse({ ...response2, body: null });
    if (response2.body != null) {
      newResponse.body = cloneBody(response2.body);
    }
    return newResponse;
  }
  function makeResponse(init) {
    return {
      aborted: false,
      rangeRequested: false,
      timingAllowPassed: false,
      requestIncludesCredentials: false,
      type: "default",
      status: 200,
      timingInfo: null,
      cacheState: "",
      statusText: "",
      ...init,
      headersList: init.headersList ? new HeadersList(init.headersList) : new HeadersList(),
      urlList: init.urlList ? [...init.urlList] : []
    };
  }
  function makeNetworkError(reason) {
    const isError = isErrorLike(reason);
    return makeResponse({
      type: "error",
      status: 0,
      error: isError ? reason : new Error(reason ? String(reason) : reason),
      aborted: reason && reason.name === "AbortError"
    });
  }
  function makeFilteredResponse(response2, state) {
    state = {
      internalResponse: response2,
      ...state
    };
    return new Proxy(response2, {
      get(target, p) {
        return p in state ? state[p] : target[p];
      },
      set(target, p, value) {
        assert2(!(p in state));
        target[p] = value;
        return true;
      }
    });
  }
  function filterResponse(response2, type) {
    if (type === "basic") {
      return makeFilteredResponse(response2, {
        type: "basic",
        headersList: response2.headersList
      });
    } else if (type === "cors") {
      return makeFilteredResponse(response2, {
        type: "cors",
        headersList: response2.headersList
      });
    } else if (type === "opaque") {
      return makeFilteredResponse(response2, {
        type: "opaque",
        urlList: Object.freeze([]),
        status: 0,
        statusText: "",
        body: null
      });
    } else if (type === "opaqueredirect") {
      return makeFilteredResponse(response2, {
        type: "opaqueredirect",
        status: 0,
        statusText: "",
        headersList: [],
        body: null
      });
    } else {
      assert2(false);
    }
  }
  function makeAppropriateNetworkError(fetchParams, err = null) {
    assert2(isCancelled(fetchParams));
    return isAborted(fetchParams) ? makeNetworkError(Object.assign(new DOMException2("The operation was aborted.", "AbortError"), { cause: err })) : makeNetworkError(Object.assign(new DOMException2("Request was cancelled."), { cause: err }));
  }
  function initializeResponse(response2, init, body2) {
    if (init.status !== null && (init.status < 200 || init.status > 599)) {
      throw new RangeError('init["status"] must be in the range of 200 to 599, inclusive.');
    }
    if ("statusText" in init && init.statusText != null) {
      if (!isValidReasonPhrase(String(init.statusText))) {
        throw new TypeError("Invalid statusText");
      }
    }
    if ("status" in init && init.status != null) {
      response2[kState].status = init.status;
    }
    if ("statusText" in init && init.statusText != null) {
      response2[kState].statusText = init.statusText;
    }
    if ("headers" in init && init.headers != null) {
      fill(response2[kHeaders], init.headers);
    }
    if (body2) {
      if (nullBodyStatus.includes(response2.status)) {
        throw webidl.errors.exception({
          header: "Response constructor",
          message: "Invalid response status code " + response2.status
        });
      }
      response2[kState].body = body2.body;
      if (body2.type != null && !response2[kState].headersList.contains("Content-Type")) {
        response2[kState].headersList.append("content-type", body2.type);
      }
    }
  }
  webidl.converters.ReadableStream = webidl.interfaceConverter(
    ReadableStream2
  );
  webidl.converters.FormData = webidl.interfaceConverter(
    FormData
  );
  webidl.converters.URLSearchParams = webidl.interfaceConverter(
    URLSearchParams
  );
  webidl.converters.XMLHttpRequestBodyInit = function(V) {
    if (typeof V === "string") {
      return webidl.converters.USVString(V);
    }
    if (isBlobLike2(V)) {
      return webidl.converters.Blob(V, { strict: false });
    }
    if (types.isArrayBuffer(V) || types.isTypedArray(V) || types.isDataView(V)) {
      return webidl.converters.BufferSource(V);
    }
    if (util2.isFormDataLike(V)) {
      return webidl.converters.FormData(V, { strict: false });
    }
    if (V instanceof URLSearchParams) {
      return webidl.converters.URLSearchParams(V);
    }
    return webidl.converters.DOMString(V);
  };
  webidl.converters.BodyInit = function(V) {
    if (V instanceof ReadableStream2) {
      return webidl.converters.ReadableStream(V);
    }
    if (V == null ? void 0 : V[Symbol.asyncIterator]) {
      return V;
    }
    return webidl.converters.XMLHttpRequestBodyInit(V);
  };
  webidl.converters.ResponseInit = webidl.dictionaryConverter([
    {
      key: "status",
      converter: webidl.converters["unsigned short"],
      defaultValue: 200
    },
    {
      key: "statusText",
      converter: webidl.converters.ByteString,
      defaultValue: ""
    },
    {
      key: "headers",
      converter: webidl.converters.HeadersInit
    }
  ]);
  response = {
    makeNetworkError,
    makeResponse,
    makeAppropriateNetworkError,
    filterResponse,
    Response,
    cloneResponse
  };
  return response;
}
var request;
var hasRequiredRequest;
function requireRequest() {
  if (hasRequiredRequest)
    return request;
  hasRequiredRequest = 1;
  const { extractBody: extractBody2, mixinBody, cloneBody } = requireBody();
  const { Headers: Headers2, fill: fillHeaders, HeadersList } = requireHeaders();
  const { FinalizationRegistry: FinalizationRegistry2 } = dispatcherWeakref();
  const util2 = util$j;
  const {
    isValidHTTPToken,
    sameOrigin,
    normalizeMethod,
    makePolicyContainer,
    normalizeMethodRecord
  } = requireUtil$4();
  const {
    forbiddenMethodsSet,
    corsSafeListedMethodsSet,
    referrerPolicy,
    requestRedirect,
    requestMode,
    requestCredentials,
    requestCache,
    requestDuplex
  } = requireConstants$3();
  const { kEnumerableProperty: kEnumerableProperty2 } = util2;
  const { kHeaders, kSignal: kSignal2, kState, kGuard, kRealm } = requireSymbols$3();
  const { webidl } = requireWebidl();
  const { getGlobalOrigin } = requireGlobal();
  const { URLSerializer } = requireDataURL();
  const { kHeadersList, kConstruct } = symbols$4;
  const assert2 = require$$0$3;
  const { getMaxListeners, setMaxListeners, getEventListeners, defaultMaxListeners } = require$$4;
  let TransformStream = globalThis.TransformStream;
  const kAbortController = Symbol("abortController");
  const requestFinalizer = new FinalizationRegistry2(({ signal, abort: abort2 }) => {
    signal.removeEventListener("abort", abort2);
  });
  class Request3 {
    // https://fetch.spec.whatwg.org/#dom-request
    constructor(input, init = {}) {
      var _a, _b;
      if (input === kConstruct) {
        return;
      }
      webidl.argumentLengthCheck(arguments, 1, { header: "Request constructor" });
      input = webidl.converters.RequestInfo(input);
      init = webidl.converters.RequestInit(init);
      this[kRealm] = {
        settingsObject: {
          baseUrl: getGlobalOrigin(),
          get origin() {
            var _a2;
            return (_a2 = this.baseUrl) == null ? void 0 : _a2.origin;
          },
          policyContainer: makePolicyContainer()
        }
      };
      let request2 = null;
      let fallbackMode = null;
      const baseUrl = this[kRealm].settingsObject.baseUrl;
      let signal = null;
      if (typeof input === "string") {
        let parsedURL;
        try {
          parsedURL = new URL(input, baseUrl);
        } catch (err) {
          throw new TypeError("Failed to parse URL from " + input, { cause: err });
        }
        if (parsedURL.username || parsedURL.password) {
          throw new TypeError(
            "Request cannot be constructed from a URL that includes credentials: " + input
          );
        }
        request2 = makeRequest({ urlList: [parsedURL] });
        fallbackMode = "cors";
      } else {
        assert2(input instanceof Request3);
        request2 = input[kState];
        signal = input[kSignal2];
      }
      const origin = this[kRealm].settingsObject.origin;
      let window2 = "client";
      if (((_b = (_a = request2.window) == null ? void 0 : _a.constructor) == null ? void 0 : _b.name) === "EnvironmentSettingsObject" && sameOrigin(request2.window, origin)) {
        window2 = request2.window;
      }
      if (init.window != null) {
        throw new TypeError(`'window' option '${window2}' must be null`);
      }
      if ("window" in init) {
        window2 = "no-window";
      }
      request2 = makeRequest({
        // URL request’s URL.
        // undici implementation note: this is set as the first item in request's urlList in makeRequest
        // method request’s method.
        method: request2.method,
        // header list A copy of request’s header list.
        // undici implementation note: headersList is cloned in makeRequest
        headersList: request2.headersList,
        // unsafe-request flag Set.
        unsafeRequest: request2.unsafeRequest,
        // client This’s relevant settings object.
        client: this[kRealm].settingsObject,
        // window window.
        window: window2,
        // priority request’s priority.
        priority: request2.priority,
        // origin request’s origin. The propagation of the origin is only significant for navigation requests
        // being handled by a service worker. In this scenario a request can have an origin that is different
        // from the current client.
        origin: request2.origin,
        // referrer request’s referrer.
        referrer: request2.referrer,
        // referrer policy request’s referrer policy.
        referrerPolicy: request2.referrerPolicy,
        // mode request’s mode.
        mode: request2.mode,
        // credentials mode request’s credentials mode.
        credentials: request2.credentials,
        // cache mode request’s cache mode.
        cache: request2.cache,
        // redirect mode request’s redirect mode.
        redirect: request2.redirect,
        // integrity metadata request’s integrity metadata.
        integrity: request2.integrity,
        // keepalive request’s keepalive.
        keepalive: request2.keepalive,
        // reload-navigation flag request’s reload-navigation flag.
        reloadNavigation: request2.reloadNavigation,
        // history-navigation flag request’s history-navigation flag.
        historyNavigation: request2.historyNavigation,
        // URL list A clone of request’s URL list.
        urlList: [...request2.urlList]
      });
      const initHasKey = Object.keys(init).length !== 0;
      if (initHasKey) {
        if (request2.mode === "navigate") {
          request2.mode = "same-origin";
        }
        request2.reloadNavigation = false;
        request2.historyNavigation = false;
        request2.origin = "client";
        request2.referrer = "client";
        request2.referrerPolicy = "";
        request2.url = request2.urlList[request2.urlList.length - 1];
        request2.urlList = [request2.url];
      }
      if (init.referrer !== void 0) {
        const referrer = init.referrer;
        if (referrer === "") {
          request2.referrer = "no-referrer";
        } else {
          let parsedReferrer;
          try {
            parsedReferrer = new URL(referrer, baseUrl);
          } catch (err) {
            throw new TypeError(`Referrer "${referrer}" is not a valid URL.`, { cause: err });
          }
          if (parsedReferrer.protocol === "about:" && parsedReferrer.hostname === "client" || origin && !sameOrigin(parsedReferrer, this[kRealm].settingsObject.baseUrl)) {
            request2.referrer = "client";
          } else {
            request2.referrer = parsedReferrer;
          }
        }
      }
      if (init.referrerPolicy !== void 0) {
        request2.referrerPolicy = init.referrerPolicy;
      }
      let mode;
      if (init.mode !== void 0) {
        mode = init.mode;
      } else {
        mode = fallbackMode;
      }
      if (mode === "navigate") {
        throw webidl.errors.exception({
          header: "Request constructor",
          message: "invalid request mode navigate."
        });
      }
      if (mode != null) {
        request2.mode = mode;
      }
      if (init.credentials !== void 0) {
        request2.credentials = init.credentials;
      }
      if (init.cache !== void 0) {
        request2.cache = init.cache;
      }
      if (request2.cache === "only-if-cached" && request2.mode !== "same-origin") {
        throw new TypeError(
          "'only-if-cached' can be set only with 'same-origin' mode"
        );
      }
      if (init.redirect !== void 0) {
        request2.redirect = init.redirect;
      }
      if (init.integrity != null) {
        request2.integrity = String(init.integrity);
      }
      if (init.keepalive !== void 0) {
        request2.keepalive = Boolean(init.keepalive);
      }
      if (init.method !== void 0) {
        let method = init.method;
        if (!isValidHTTPToken(method)) {
          throw new TypeError(`'${method}' is not a valid HTTP method.`);
        }
        if (forbiddenMethodsSet.has(method.toUpperCase())) {
          throw new TypeError(`'${method}' HTTP method is unsupported.`);
        }
        method = normalizeMethodRecord[method] ?? normalizeMethod(method);
        request2.method = method;
      }
      if (init.signal !== void 0) {
        signal = init.signal;
      }
      this[kState] = request2;
      const ac = new AbortController();
      this[kSignal2] = ac.signal;
      this[kSignal2][kRealm] = this[kRealm];
      if (signal != null) {
        if (!signal || typeof signal.aborted !== "boolean" || typeof signal.addEventListener !== "function") {
          throw new TypeError(
            "Failed to construct 'Request': member signal is not of type AbortSignal."
          );
        }
        if (signal.aborted) {
          ac.abort(signal.reason);
        } else {
          this[kAbortController] = ac;
          const acRef = new WeakRef(ac);
          const abort2 = function() {
            const ac2 = acRef.deref();
            if (ac2 !== void 0) {
              ac2.abort(this.reason);
            }
          };
          try {
            if (typeof getMaxListeners === "function" && getMaxListeners(signal) === defaultMaxListeners) {
              setMaxListeners(100, signal);
            } else if (getEventListeners(signal, "abort").length >= defaultMaxListeners) {
              setMaxListeners(100, signal);
            }
          } catch {
          }
          util2.addAbortListener(signal, abort2);
          requestFinalizer.register(ac, { signal, abort: abort2 });
        }
      }
      this[kHeaders] = new Headers2(kConstruct);
      this[kHeaders][kHeadersList] = request2.headersList;
      this[kHeaders][kGuard] = "request";
      this[kHeaders][kRealm] = this[kRealm];
      if (mode === "no-cors") {
        if (!corsSafeListedMethodsSet.has(request2.method)) {
          throw new TypeError(
            `'${request2.method} is unsupported in no-cors mode.`
          );
        }
        this[kHeaders][kGuard] = "request-no-cors";
      }
      if (initHasKey) {
        const headersList = this[kHeaders][kHeadersList];
        const headers2 = init.headers !== void 0 ? init.headers : new HeadersList(headersList);
        headersList.clear();
        if (headers2 instanceof HeadersList) {
          for (const [key, val] of headers2) {
            headersList.append(key, val);
          }
          headersList.cookies = headers2.cookies;
        } else {
          fillHeaders(this[kHeaders], headers2);
        }
      }
      const inputBody = input instanceof Request3 ? input[kState].body : null;
      if ((init.body != null || inputBody != null) && (request2.method === "GET" || request2.method === "HEAD")) {
        throw new TypeError("Request with GET/HEAD method cannot have body.");
      }
      let initBody = null;
      if (init.body != null) {
        const [extractedBody, contentType] = extractBody2(
          init.body,
          request2.keepalive
        );
        initBody = extractedBody;
        if (contentType && !this[kHeaders][kHeadersList].contains("content-type")) {
          this[kHeaders].append("content-type", contentType);
        }
      }
      const inputOrInitBody = initBody ?? inputBody;
      if (inputOrInitBody != null && inputOrInitBody.source == null) {
        if (initBody != null && init.duplex == null) {
          throw new TypeError("RequestInit: duplex option is required when sending a body.");
        }
        if (request2.mode !== "same-origin" && request2.mode !== "cors") {
          throw new TypeError(
            'If request is made from ReadableStream, mode should be "same-origin" or "cors"'
          );
        }
        request2.useCORSPreflightFlag = true;
      }
      let finalBody = inputOrInitBody;
      if (initBody == null && inputBody != null) {
        if (util2.isDisturbed(inputBody.stream) || inputBody.stream.locked) {
          throw new TypeError(
            "Cannot construct a Request with a Request object that has already been used."
          );
        }
        if (!TransformStream) {
          TransformStream = require$$14.TransformStream;
        }
        const identityTransform = new TransformStream();
        inputBody.stream.pipeThrough(identityTransform);
        finalBody = {
          source: inputBody.source,
          length: inputBody.length,
          stream: identityTransform.readable
        };
      }
      this[kState].body = finalBody;
    }
    // Returns request’s HTTP method, which is "GET" by default.
    get method() {
      webidl.brandCheck(this, Request3);
      return this[kState].method;
    }
    // Returns the URL of request as a string.
    get url() {
      webidl.brandCheck(this, Request3);
      return URLSerializer(this[kState].url);
    }
    // Returns a Headers object consisting of the headers associated with request.
    // Note that headers added in the network layer by the user agent will not
    // be accounted for in this object, e.g., the "Host" header.
    get headers() {
      webidl.brandCheck(this, Request3);
      return this[kHeaders];
    }
    // Returns the kind of resource requested by request, e.g., "document"
    // or "script".
    get destination() {
      webidl.brandCheck(this, Request3);
      return this[kState].destination;
    }
    // Returns the referrer of request. Its value can be a same-origin URL if
    // explicitly set in init, the empty string to indicate no referrer, and
    // "about:client" when defaulting to the global’s default. This is used
    // during fetching to determine the value of the `Referer` header of the
    // request being made.
    get referrer() {
      webidl.brandCheck(this, Request3);
      if (this[kState].referrer === "no-referrer") {
        return "";
      }
      if (this[kState].referrer === "client") {
        return "about:client";
      }
      return this[kState].referrer.toString();
    }
    // Returns the referrer policy associated with request.
    // This is used during fetching to compute the value of the request’s
    // referrer.
    get referrerPolicy() {
      webidl.brandCheck(this, Request3);
      return this[kState].referrerPolicy;
    }
    // Returns the mode associated with request, which is a string indicating
    // whether the request will use CORS, or will be restricted to same-origin
    // URLs.
    get mode() {
      webidl.brandCheck(this, Request3);
      return this[kState].mode;
    }
    // Returns the credentials mode associated with request,
    // which is a string indicating whether credentials will be sent with the
    // request always, never, or only when sent to a same-origin URL.
    get credentials() {
      return this[kState].credentials;
    }
    // Returns the cache mode associated with request,
    // which is a string indicating how the request will
    // interact with the browser’s cache when fetching.
    get cache() {
      webidl.brandCheck(this, Request3);
      return this[kState].cache;
    }
    // Returns the redirect mode associated with request,
    // which is a string indicating how redirects for the
    // request will be handled during fetching. A request
    // will follow redirects by default.
    get redirect() {
      webidl.brandCheck(this, Request3);
      return this[kState].redirect;
    }
    // Returns request’s subresource integrity metadata, which is a
    // cryptographic hash of the resource being fetched. Its value
    // consists of multiple hashes separated by whitespace. [SRI]
    get integrity() {
      webidl.brandCheck(this, Request3);
      return this[kState].integrity;
    }
    // Returns a boolean indicating whether or not request can outlive the
    // global in which it was created.
    get keepalive() {
      webidl.brandCheck(this, Request3);
      return this[kState].keepalive;
    }
    // Returns a boolean indicating whether or not request is for a reload
    // navigation.
    get isReloadNavigation() {
      webidl.brandCheck(this, Request3);
      return this[kState].reloadNavigation;
    }
    // Returns a boolean indicating whether or not request is for a history
    // navigation (a.k.a. back-foward navigation).
    get isHistoryNavigation() {
      webidl.brandCheck(this, Request3);
      return this[kState].historyNavigation;
    }
    // Returns the signal associated with request, which is an AbortSignal
    // object indicating whether or not request has been aborted, and its
    // abort event handler.
    get signal() {
      webidl.brandCheck(this, Request3);
      return this[kSignal2];
    }
    get body() {
      webidl.brandCheck(this, Request3);
      return this[kState].body ? this[kState].body.stream : null;
    }
    get bodyUsed() {
      webidl.brandCheck(this, Request3);
      return !!this[kState].body && util2.isDisturbed(this[kState].body.stream);
    }
    get duplex() {
      webidl.brandCheck(this, Request3);
      return "half";
    }
    // Returns a clone of request.
    clone() {
      var _a;
      webidl.brandCheck(this, Request3);
      if (this.bodyUsed || ((_a = this.body) == null ? void 0 : _a.locked)) {
        throw new TypeError("unusable");
      }
      const clonedRequest = cloneRequest(this[kState]);
      const clonedRequestObject = new Request3(kConstruct);
      clonedRequestObject[kState] = clonedRequest;
      clonedRequestObject[kRealm] = this[kRealm];
      clonedRequestObject[kHeaders] = new Headers2(kConstruct);
      clonedRequestObject[kHeaders][kHeadersList] = clonedRequest.headersList;
      clonedRequestObject[kHeaders][kGuard] = this[kHeaders][kGuard];
      clonedRequestObject[kHeaders][kRealm] = this[kHeaders][kRealm];
      const ac = new AbortController();
      if (this.signal.aborted) {
        ac.abort(this.signal.reason);
      } else {
        util2.addAbortListener(
          this.signal,
          () => {
            ac.abort(this.signal.reason);
          }
        );
      }
      clonedRequestObject[kSignal2] = ac.signal;
      return clonedRequestObject;
    }
  }
  mixinBody(Request3);
  function makeRequest(init) {
    const request2 = {
      method: "GET",
      localURLsOnly: false,
      unsafeRequest: false,
      body: null,
      client: null,
      reservedClient: null,
      replacesClientId: "",
      window: "client",
      keepalive: false,
      serviceWorkers: "all",
      initiator: "",
      destination: "",
      priority: null,
      origin: "client",
      policyContainer: "client",
      referrer: "client",
      referrerPolicy: "",
      mode: "no-cors",
      useCORSPreflightFlag: false,
      credentials: "same-origin",
      useCredentials: false,
      cache: "default",
      redirect: "follow",
      integrity: "",
      cryptoGraphicsNonceMetadata: "",
      parserMetadata: "",
      reloadNavigation: false,
      historyNavigation: false,
      userActivation: false,
      taintedOrigin: false,
      redirectCount: 0,
      responseTainting: "basic",
      preventNoCacheCacheControlHeaderModification: false,
      done: false,
      timingAllowFailed: false,
      ...init,
      headersList: init.headersList ? new HeadersList(init.headersList) : new HeadersList()
    };
    request2.url = request2.urlList[0];
    return request2;
  }
  function cloneRequest(request2) {
    const newRequest = makeRequest({ ...request2, body: null });
    if (request2.body != null) {
      newRequest.body = cloneBody(request2.body);
    }
    return newRequest;
  }
  Object.defineProperties(Request3.prototype, {
    method: kEnumerableProperty2,
    url: kEnumerableProperty2,
    headers: kEnumerableProperty2,
    redirect: kEnumerableProperty2,
    clone: kEnumerableProperty2,
    signal: kEnumerableProperty2,
    duplex: kEnumerableProperty2,
    destination: kEnumerableProperty2,
    body: kEnumerableProperty2,
    bodyUsed: kEnumerableProperty2,
    isHistoryNavigation: kEnumerableProperty2,
    isReloadNavigation: kEnumerableProperty2,
    keepalive: kEnumerableProperty2,
    integrity: kEnumerableProperty2,
    cache: kEnumerableProperty2,
    credentials: kEnumerableProperty2,
    attribute: kEnumerableProperty2,
    referrerPolicy: kEnumerableProperty2,
    referrer: kEnumerableProperty2,
    mode: kEnumerableProperty2,
    [Symbol.toStringTag]: {
      value: "Request",
      configurable: true
    }
  });
  webidl.converters.Request = webidl.interfaceConverter(
    Request3
  );
  webidl.converters.RequestInfo = function(V) {
    if (typeof V === "string") {
      return webidl.converters.USVString(V);
    }
    if (V instanceof Request3) {
      return webidl.converters.Request(V);
    }
    return webidl.converters.USVString(V);
  };
  webidl.converters.AbortSignal = webidl.interfaceConverter(
    AbortSignal
  );
  webidl.converters.RequestInit = webidl.dictionaryConverter([
    {
      key: "method",
      converter: webidl.converters.ByteString
    },
    {
      key: "headers",
      converter: webidl.converters.HeadersInit
    },
    {
      key: "body",
      converter: webidl.nullableConverter(
        webidl.converters.BodyInit
      )
    },
    {
      key: "referrer",
      converter: webidl.converters.USVString
    },
    {
      key: "referrerPolicy",
      converter: webidl.converters.DOMString,
      // https://w3c.github.io/webappsec-referrer-policy/#referrer-policy
      allowedValues: referrerPolicy
    },
    {
      key: "mode",
      converter: webidl.converters.DOMString,
      // https://fetch.spec.whatwg.org/#concept-request-mode
      allowedValues: requestMode
    },
    {
      key: "credentials",
      converter: webidl.converters.DOMString,
      // https://fetch.spec.whatwg.org/#requestcredentials
      allowedValues: requestCredentials
    },
    {
      key: "cache",
      converter: webidl.converters.DOMString,
      // https://fetch.spec.whatwg.org/#requestcache
      allowedValues: requestCache
    },
    {
      key: "redirect",
      converter: webidl.converters.DOMString,
      // https://fetch.spec.whatwg.org/#requestredirect
      allowedValues: requestRedirect
    },
    {
      key: "integrity",
      converter: webidl.converters.DOMString
    },
    {
      key: "keepalive",
      converter: webidl.converters.boolean
    },
    {
      key: "signal",
      converter: webidl.nullableConverter(
        (signal) => webidl.converters.AbortSignal(
          signal,
          { strict: false }
        )
      )
    },
    {
      key: "window",
      converter: webidl.converters.any
    },
    {
      key: "duplex",
      converter: webidl.converters.DOMString,
      allowedValues: requestDuplex
    }
  ]);
  request = { Request: Request3, makeRequest };
  return request;
}
var fetch_1;
var hasRequiredFetch;
function requireFetch() {
  if (hasRequiredFetch)
    return fetch_1;
  hasRequiredFetch = 1;
  const {
    Response,
    makeNetworkError,
    makeAppropriateNetworkError,
    filterResponse,
    makeResponse
  } = requireResponse();
  const { Headers: Headers2 } = requireHeaders();
  const { Request: Request3, makeRequest } = requireRequest();
  const zlib = require$$3$1;
  const {
    bytesMatch,
    makePolicyContainer,
    clonePolicyContainer,
    requestBadPort,
    TAOCheck,
    appendRequestOriginHeader,
    responseLocationURL,
    requestCurrentURL,
    setRequestReferrerPolicyOnRedirect,
    tryUpgradeRequestToAPotentiallyTrustworthyURL,
    createOpaqueTimingInfo,
    appendFetchMetadata,
    corsCheck,
    crossOriginResourcePolicyCheck,
    determineRequestsReferrer,
    coarsenedSharedCurrentTime,
    createDeferredPromise,
    isBlobLike: isBlobLike2,
    sameOrigin,
    isCancelled,
    isAborted,
    isErrorLike,
    fullyReadBody,
    readableStreamClose,
    isomorphicEncode,
    urlIsLocal,
    urlIsHttpHttpsScheme,
    urlHasHttpsScheme
  } = requireUtil$4();
  const { kState, kHeaders, kGuard, kRealm } = requireSymbols$3();
  const assert2 = require$$0$3;
  const { safelyExtractBody } = requireBody();
  const {
    redirectStatusSet,
    nullBodyStatus,
    safeMethodsSet,
    requestBodyHeader,
    subresourceSet,
    DOMException: DOMException2
  } = requireConstants$3();
  const { kHeadersList } = symbols$4;
  const EE2 = require$$4;
  const { Readable: Readable2, pipeline: pipeline2 } = require$$0$4;
  const { addAbortListener: addAbortListener2, isErrored: isErrored2, isReadable: isReadable2, nodeMajor: nodeMajor2, nodeMinor: nodeMinor2 } = util$j;
  const { dataURLProcessor, serializeAMimeType } = requireDataURL();
  const { TransformStream } = require$$14;
  const { getGlobalDispatcher: getGlobalDispatcher2 } = global$1;
  const { webidl } = requireWebidl();
  const { STATUS_CODES: STATUS_CODES2 } = require$$2;
  const GET_OR_HEAD = ["GET", "HEAD"];
  let resolveObjectURL;
  let ReadableStream2 = globalThis.ReadableStream;
  class Fetch extends EE2 {
    constructor(dispatcher2) {
      super();
      this.dispatcher = dispatcher2;
      this.connection = null;
      this.dump = false;
      this.state = "ongoing";
      this.setMaxListeners(21);
    }
    terminate(reason) {
      var _a;
      if (this.state !== "ongoing") {
        return;
      }
      this.state = "terminated";
      (_a = this.connection) == null ? void 0 : _a.destroy(reason);
      this.emit("terminated", reason);
    }
    // https://fetch.spec.whatwg.org/#fetch-controller-abort
    abort(error) {
      var _a;
      if (this.state !== "ongoing") {
        return;
      }
      this.state = "aborted";
      if (!error) {
        error = new DOMException2("The operation was aborted.", "AbortError");
      }
      this.serializedAbortReason = error;
      (_a = this.connection) == null ? void 0 : _a.destroy(error);
      this.emit("terminated", error);
    }
  }
  function fetch(input, init = {}) {
    var _a;
    webidl.argumentLengthCheck(arguments, 1, { header: "globalThis.fetch" });
    const p = createDeferredPromise();
    let requestObject;
    try {
      requestObject = new Request3(input, init);
    } catch (e) {
      p.reject(e);
      return p.promise;
    }
    const request2 = requestObject[kState];
    if (requestObject.signal.aborted) {
      abortFetch(p, request2, null, requestObject.signal.reason);
      return p.promise;
    }
    const globalObject = request2.client.globalObject;
    if (((_a = globalObject == null ? void 0 : globalObject.constructor) == null ? void 0 : _a.name) === "ServiceWorkerGlobalScope") {
      request2.serviceWorkers = "none";
    }
    let responseObject = null;
    const relevantRealm = null;
    let locallyAborted = false;
    let controller = null;
    addAbortListener2(
      requestObject.signal,
      () => {
        locallyAborted = true;
        assert2(controller != null);
        controller.abort(requestObject.signal.reason);
        abortFetch(p, request2, responseObject, requestObject.signal.reason);
      }
    );
    const handleFetchDone = (response2) => finalizeAndReportTiming(response2, "fetch");
    const processResponse = (response2) => {
      if (locallyAborted) {
        return Promise.resolve();
      }
      if (response2.aborted) {
        abortFetch(p, request2, responseObject, controller.serializedAbortReason);
        return Promise.resolve();
      }
      if (response2.type === "error") {
        p.reject(
          Object.assign(new TypeError("fetch failed"), { cause: response2.error })
        );
        return Promise.resolve();
      }
      responseObject = new Response();
      responseObject[kState] = response2;
      responseObject[kRealm] = relevantRealm;
      responseObject[kHeaders][kHeadersList] = response2.headersList;
      responseObject[kHeaders][kGuard] = "immutable";
      responseObject[kHeaders][kRealm] = relevantRealm;
      p.resolve(responseObject);
    };
    controller = fetching({
      request: request2,
      processResponseEndOfBody: handleFetchDone,
      processResponse,
      dispatcher: init.dispatcher ?? getGlobalDispatcher2()
      // undici
    });
    return p.promise;
  }
  function finalizeAndReportTiming(response2, initiatorType = "other") {
    var _a;
    if (response2.type === "error" && response2.aborted) {
      return;
    }
    if (!((_a = response2.urlList) == null ? void 0 : _a.length)) {
      return;
    }
    const originalURL = response2.urlList[0];
    let timingInfo = response2.timingInfo;
    let cacheState = response2.cacheState;
    if (!urlIsHttpHttpsScheme(originalURL)) {
      return;
    }
    if (timingInfo === null) {
      return;
    }
    if (!response2.timingAllowPassed) {
      timingInfo = createOpaqueTimingInfo({
        startTime: timingInfo.startTime
      });
      cacheState = "";
    }
    timingInfo.endTime = coarsenedSharedCurrentTime();
    response2.timingInfo = timingInfo;
    markResourceTiming(
      timingInfo,
      originalURL,
      initiatorType,
      globalThis,
      cacheState
    );
  }
  function markResourceTiming(timingInfo, originalURL, initiatorType, globalThis2, cacheState) {
    if (nodeMajor2 > 18 || nodeMajor2 === 18 && nodeMinor2 >= 2) {
      performance.markResourceTiming(timingInfo, originalURL.href, initiatorType, globalThis2, cacheState);
    }
  }
  function abortFetch(p, request2, responseObject, error) {
    var _a, _b;
    if (!error) {
      error = new DOMException2("The operation was aborted.", "AbortError");
    }
    p.reject(error);
    if (request2.body != null && isReadable2((_a = request2.body) == null ? void 0 : _a.stream)) {
      request2.body.stream.cancel(error).catch((err) => {
        if (err.code === "ERR_INVALID_STATE") {
          return;
        }
        throw err;
      });
    }
    if (responseObject == null) {
      return;
    }
    const response2 = responseObject[kState];
    if (response2.body != null && isReadable2((_b = response2.body) == null ? void 0 : _b.stream)) {
      response2.body.stream.cancel(error).catch((err) => {
        if (err.code === "ERR_INVALID_STATE") {
          return;
        }
        throw err;
      });
    }
  }
  function fetching({
    request: request2,
    processRequestBodyChunkLength,
    processRequestEndOfBody,
    processResponse,
    processResponseEndOfBody,
    processResponseConsumeBody,
    useParallelQueue = false,
    dispatcher: dispatcher2
    // undici
  }) {
    var _a, _b, _c, _d;
    let taskDestination = null;
    let crossOriginIsolatedCapability = false;
    if (request2.client != null) {
      taskDestination = request2.client.globalObject;
      crossOriginIsolatedCapability = request2.client.crossOriginIsolatedCapability;
    }
    const currenTime = coarsenedSharedCurrentTime(crossOriginIsolatedCapability);
    const timingInfo = createOpaqueTimingInfo({
      startTime: currenTime
    });
    const fetchParams = {
      controller: new Fetch(dispatcher2),
      request: request2,
      timingInfo,
      processRequestBodyChunkLength,
      processRequestEndOfBody,
      processResponse,
      processResponseConsumeBody,
      processResponseEndOfBody,
      taskDestination,
      crossOriginIsolatedCapability
    };
    assert2(!request2.body || request2.body.stream);
    if (request2.window === "client") {
      request2.window = ((_c = (_b = (_a = request2.client) == null ? void 0 : _a.globalObject) == null ? void 0 : _b.constructor) == null ? void 0 : _c.name) === "Window" ? request2.client : "no-window";
    }
    if (request2.origin === "client") {
      request2.origin = (_d = request2.client) == null ? void 0 : _d.origin;
    }
    if (request2.policyContainer === "client") {
      if (request2.client != null) {
        request2.policyContainer = clonePolicyContainer(
          request2.client.policyContainer
        );
      } else {
        request2.policyContainer = makePolicyContainer();
      }
    }
    if (!request2.headersList.contains("accept")) {
      const value = "*/*";
      request2.headersList.append("accept", value);
    }
    if (!request2.headersList.contains("accept-language")) {
      request2.headersList.append("accept-language", "*");
    }
    if (request2.priority === null)
      ;
    if (subresourceSet.has(request2.destination))
      ;
    mainFetch(fetchParams).catch((err) => {
      fetchParams.controller.terminate(err);
    });
    return fetchParams.controller;
  }
  async function mainFetch(fetchParams, recursive = false) {
    const request2 = fetchParams.request;
    let response2 = null;
    if (request2.localURLsOnly && !urlIsLocal(requestCurrentURL(request2))) {
      response2 = makeNetworkError("local URLs only");
    }
    tryUpgradeRequestToAPotentiallyTrustworthyURL(request2);
    if (requestBadPort(request2) === "blocked") {
      response2 = makeNetworkError("bad port");
    }
    if (request2.referrerPolicy === "") {
      request2.referrerPolicy = request2.policyContainer.referrerPolicy;
    }
    if (request2.referrer !== "no-referrer") {
      request2.referrer = determineRequestsReferrer(request2);
    }
    if (response2 === null) {
      response2 = await (async () => {
        const currentURL = requestCurrentURL(request2);
        if (
          // - request’s current URL’s origin is same origin with request’s origin,
          //   and request’s response tainting is "basic"
          sameOrigin(currentURL, request2.url) && request2.responseTainting === "basic" || // request’s current URL’s scheme is "data"
          currentURL.protocol === "data:" || // - request’s mode is "navigate" or "websocket"
          (request2.mode === "navigate" || request2.mode === "websocket")
        ) {
          request2.responseTainting = "basic";
          return await schemeFetch(fetchParams);
        }
        if (request2.mode === "same-origin") {
          return makeNetworkError('request mode cannot be "same-origin"');
        }
        if (request2.mode === "no-cors") {
          if (request2.redirect !== "follow") {
            return makeNetworkError(
              'redirect mode cannot be "follow" for "no-cors" request'
            );
          }
          request2.responseTainting = "opaque";
          return await schemeFetch(fetchParams);
        }
        if (!urlIsHttpHttpsScheme(requestCurrentURL(request2))) {
          return makeNetworkError("URL scheme must be a HTTP(S) scheme");
        }
        request2.responseTainting = "cors";
        return await httpFetch(fetchParams);
      })();
    }
    if (recursive) {
      return response2;
    }
    if (response2.status !== 0 && !response2.internalResponse) {
      if (request2.responseTainting === "cors")
        ;
      if (request2.responseTainting === "basic") {
        response2 = filterResponse(response2, "basic");
      } else if (request2.responseTainting === "cors") {
        response2 = filterResponse(response2, "cors");
      } else if (request2.responseTainting === "opaque") {
        response2 = filterResponse(response2, "opaque");
      } else {
        assert2(false);
      }
    }
    let internalResponse = response2.status === 0 ? response2 : response2.internalResponse;
    if (internalResponse.urlList.length === 0) {
      internalResponse.urlList.push(...request2.urlList);
    }
    if (!request2.timingAllowFailed) {
      response2.timingAllowPassed = true;
    }
    if (response2.type === "opaque" && internalResponse.status === 206 && internalResponse.rangeRequested && !request2.headers.contains("range")) {
      response2 = internalResponse = makeNetworkError();
    }
    if (response2.status !== 0 && (request2.method === "HEAD" || request2.method === "CONNECT" || nullBodyStatus.includes(internalResponse.status))) {
      internalResponse.body = null;
      fetchParams.controller.dump = true;
    }
    if (request2.integrity) {
      const processBodyError = (reason) => fetchFinale(fetchParams, makeNetworkError(reason));
      if (request2.responseTainting === "opaque" || response2.body == null) {
        processBodyError(response2.error);
        return;
      }
      const processBody = (bytes) => {
        if (!bytesMatch(bytes, request2.integrity)) {
          processBodyError("integrity mismatch");
          return;
        }
        response2.body = safelyExtractBody(bytes)[0];
        fetchFinale(fetchParams, response2);
      };
      await fullyReadBody(response2.body, processBody, processBodyError);
    } else {
      fetchFinale(fetchParams, response2);
    }
  }
  function schemeFetch(fetchParams) {
    if (isCancelled(fetchParams) && fetchParams.request.redirectCount === 0) {
      return Promise.resolve(makeAppropriateNetworkError(fetchParams));
    }
    const { request: request2 } = fetchParams;
    const { protocol: scheme } = requestCurrentURL(request2);
    switch (scheme) {
      case "about:": {
        return Promise.resolve(makeNetworkError("about scheme is not supported"));
      }
      case "blob:": {
        if (!resolveObjectURL) {
          resolveObjectURL = require$$7.resolveObjectURL;
        }
        const blobURLEntry = requestCurrentURL(request2);
        if (blobURLEntry.search.length !== 0) {
          return Promise.resolve(makeNetworkError("NetworkError when attempting to fetch resource."));
        }
        const blobURLEntryObject = resolveObjectURL(blobURLEntry.toString());
        if (request2.method !== "GET" || !isBlobLike2(blobURLEntryObject)) {
          return Promise.resolve(makeNetworkError("invalid method"));
        }
        const bodyWithType = safelyExtractBody(blobURLEntryObject);
        const body2 = bodyWithType[0];
        const length = isomorphicEncode(`${body2.length}`);
        const type = bodyWithType[1] ?? "";
        const response2 = makeResponse({
          statusText: "OK",
          headersList: [
            ["content-length", { name: "Content-Length", value: length }],
            ["content-type", { name: "Content-Type", value: type }]
          ]
        });
        response2.body = body2;
        return Promise.resolve(response2);
      }
      case "data:": {
        const currentURL = requestCurrentURL(request2);
        const dataURLStruct = dataURLProcessor(currentURL);
        if (dataURLStruct === "failure") {
          return Promise.resolve(makeNetworkError("failed to fetch the data URL"));
        }
        const mimeType = serializeAMimeType(dataURLStruct.mimeType);
        return Promise.resolve(makeResponse({
          statusText: "OK",
          headersList: [
            ["content-type", { name: "Content-Type", value: mimeType }]
          ],
          body: safelyExtractBody(dataURLStruct.body)[0]
        }));
      }
      case "file:": {
        return Promise.resolve(makeNetworkError("not implemented... yet..."));
      }
      case "http:":
      case "https:": {
        return httpFetch(fetchParams).catch((err) => makeNetworkError(err));
      }
      default: {
        return Promise.resolve(makeNetworkError("unknown scheme"));
      }
    }
  }
  function finalizeResponse(fetchParams, response2) {
    fetchParams.request.done = true;
    if (fetchParams.processResponseDone != null) {
      queueMicrotask(() => fetchParams.processResponseDone(response2));
    }
  }
  function fetchFinale(fetchParams, response2) {
    if (response2.type === "error") {
      response2.urlList = [fetchParams.request.urlList[0]];
      response2.timingInfo = createOpaqueTimingInfo({
        startTime: fetchParams.timingInfo.startTime
      });
    }
    const processResponseEndOfBody = () => {
      fetchParams.request.done = true;
      if (fetchParams.processResponseEndOfBody != null) {
        queueMicrotask(() => fetchParams.processResponseEndOfBody(response2));
      }
    };
    if (fetchParams.processResponse != null) {
      queueMicrotask(() => fetchParams.processResponse(response2));
    }
    if (response2.body == null) {
      processResponseEndOfBody();
    } else {
      const identityTransformAlgorithm = (chunk, controller) => {
        controller.enqueue(chunk);
      };
      const transformStream = new TransformStream({
        start() {
        },
        transform: identityTransformAlgorithm,
        flush: processResponseEndOfBody
      }, {
        size() {
          return 1;
        }
      }, {
        size() {
          return 1;
        }
      });
      response2.body = { stream: response2.body.stream.pipeThrough(transformStream) };
    }
    if (fetchParams.processResponseConsumeBody != null) {
      const processBody = (nullOrBytes) => fetchParams.processResponseConsumeBody(response2, nullOrBytes);
      const processBodyError = (failure) => fetchParams.processResponseConsumeBody(response2, failure);
      if (response2.body == null) {
        queueMicrotask(() => processBody(null));
      } else {
        return fullyReadBody(response2.body, processBody, processBodyError);
      }
      return Promise.resolve();
    }
  }
  async function httpFetch(fetchParams) {
    const request2 = fetchParams.request;
    let response2 = null;
    let actualResponse = null;
    const timingInfo = fetchParams.timingInfo;
    if (request2.serviceWorkers === "all")
      ;
    if (response2 === null) {
      if (request2.redirect === "follow") {
        request2.serviceWorkers = "none";
      }
      actualResponse = response2 = await httpNetworkOrCacheFetch(fetchParams);
      if (request2.responseTainting === "cors" && corsCheck(request2, response2) === "failure") {
        return makeNetworkError("cors failure");
      }
      if (TAOCheck(request2, response2) === "failure") {
        request2.timingAllowFailed = true;
      }
    }
    if ((request2.responseTainting === "opaque" || response2.type === "opaque") && crossOriginResourcePolicyCheck(
      request2.origin,
      request2.client,
      request2.destination,
      actualResponse
    ) === "blocked") {
      return makeNetworkError("blocked");
    }
    if (redirectStatusSet.has(actualResponse.status)) {
      if (request2.redirect !== "manual") {
        fetchParams.controller.connection.destroy();
      }
      if (request2.redirect === "error") {
        response2 = makeNetworkError("unexpected redirect");
      } else if (request2.redirect === "manual") {
        response2 = actualResponse;
      } else if (request2.redirect === "follow") {
        response2 = await httpRedirectFetch(fetchParams, response2);
      } else {
        assert2(false);
      }
    }
    response2.timingInfo = timingInfo;
    return response2;
  }
  function httpRedirectFetch(fetchParams, response2) {
    const request2 = fetchParams.request;
    const actualResponse = response2.internalResponse ? response2.internalResponse : response2;
    let locationURL;
    try {
      locationURL = responseLocationURL(
        actualResponse,
        requestCurrentURL(request2).hash
      );
      if (locationURL == null) {
        return response2;
      }
    } catch (err) {
      return Promise.resolve(makeNetworkError(err));
    }
    if (!urlIsHttpHttpsScheme(locationURL)) {
      return Promise.resolve(makeNetworkError("URL scheme must be a HTTP(S) scheme"));
    }
    if (request2.redirectCount === 20) {
      return Promise.resolve(makeNetworkError("redirect count exceeded"));
    }
    request2.redirectCount += 1;
    if (request2.mode === "cors" && (locationURL.username || locationURL.password) && !sameOrigin(request2, locationURL)) {
      return Promise.resolve(makeNetworkError('cross origin not allowed for request mode "cors"'));
    }
    if (request2.responseTainting === "cors" && (locationURL.username || locationURL.password)) {
      return Promise.resolve(makeNetworkError(
        'URL cannot contain credentials for request mode "cors"'
      ));
    }
    if (actualResponse.status !== 303 && request2.body != null && request2.body.source == null) {
      return Promise.resolve(makeNetworkError());
    }
    if ([301, 302].includes(actualResponse.status) && request2.method === "POST" || actualResponse.status === 303 && !GET_OR_HEAD.includes(request2.method)) {
      request2.method = "GET";
      request2.body = null;
      for (const headerName of requestBodyHeader) {
        request2.headersList.delete(headerName);
      }
    }
    if (!sameOrigin(requestCurrentURL(request2), locationURL)) {
      request2.headersList.delete("authorization");
      request2.headersList.delete("proxy-authorization", true);
      request2.headersList.delete("cookie");
      request2.headersList.delete("host");
    }
    if (request2.body != null) {
      assert2(request2.body.source != null);
      request2.body = safelyExtractBody(request2.body.source)[0];
    }
    const timingInfo = fetchParams.timingInfo;
    timingInfo.redirectEndTime = timingInfo.postRedirectStartTime = coarsenedSharedCurrentTime(fetchParams.crossOriginIsolatedCapability);
    if (timingInfo.redirectStartTime === 0) {
      timingInfo.redirectStartTime = timingInfo.startTime;
    }
    request2.urlList.push(locationURL);
    setRequestReferrerPolicyOnRedirect(request2, actualResponse);
    return mainFetch(fetchParams, true);
  }
  async function httpNetworkOrCacheFetch(fetchParams, isAuthenticationFetch = false, isNewConnectionFetch = false) {
    const request2 = fetchParams.request;
    let httpFetchParams = null;
    let httpRequest = null;
    let response2 = null;
    if (request2.window === "no-window" && request2.redirect === "error") {
      httpFetchParams = fetchParams;
      httpRequest = request2;
    } else {
      httpRequest = makeRequest(request2);
      httpFetchParams = { ...fetchParams };
      httpFetchParams.request = httpRequest;
    }
    const includeCredentials = request2.credentials === "include" || request2.credentials === "same-origin" && request2.responseTainting === "basic";
    const contentLength = httpRequest.body ? httpRequest.body.length : null;
    let contentLengthHeaderValue = null;
    if (httpRequest.body == null && ["POST", "PUT"].includes(httpRequest.method)) {
      contentLengthHeaderValue = "0";
    }
    if (contentLength != null) {
      contentLengthHeaderValue = isomorphicEncode(`${contentLength}`);
    }
    if (contentLengthHeaderValue != null) {
      httpRequest.headersList.append("content-length", contentLengthHeaderValue);
    }
    if (contentLength != null && httpRequest.keepalive)
      ;
    if (httpRequest.referrer instanceof URL) {
      httpRequest.headersList.append("referer", isomorphicEncode(httpRequest.referrer.href));
    }
    appendRequestOriginHeader(httpRequest);
    appendFetchMetadata(httpRequest);
    if (!httpRequest.headersList.contains("user-agent")) {
      httpRequest.headersList.append("user-agent", typeof esbuildDetection === "undefined" ? "undici" : "node");
    }
    if (httpRequest.cache === "default" && (httpRequest.headersList.contains("if-modified-since") || httpRequest.headersList.contains("if-none-match") || httpRequest.headersList.contains("if-unmodified-since") || httpRequest.headersList.contains("if-match") || httpRequest.headersList.contains("if-range"))) {
      httpRequest.cache = "no-store";
    }
    if (httpRequest.cache === "no-cache" && !httpRequest.preventNoCacheCacheControlHeaderModification && !httpRequest.headersList.contains("cache-control")) {
      httpRequest.headersList.append("cache-control", "max-age=0");
    }
    if (httpRequest.cache === "no-store" || httpRequest.cache === "reload") {
      if (!httpRequest.headersList.contains("pragma")) {
        httpRequest.headersList.append("pragma", "no-cache");
      }
      if (!httpRequest.headersList.contains("cache-control")) {
        httpRequest.headersList.append("cache-control", "no-cache");
      }
    }
    if (httpRequest.headersList.contains("range")) {
      httpRequest.headersList.append("accept-encoding", "identity");
    }
    if (!httpRequest.headersList.contains("accept-encoding")) {
      if (urlHasHttpsScheme(requestCurrentURL(httpRequest))) {
        httpRequest.headersList.append("accept-encoding", "br, gzip, deflate");
      } else {
        httpRequest.headersList.append("accept-encoding", "gzip, deflate");
      }
    }
    httpRequest.headersList.delete("host");
    {
      httpRequest.cache = "no-store";
    }
    if (httpRequest.mode !== "no-store" && httpRequest.mode !== "reload")
      ;
    if (response2 == null) {
      if (httpRequest.mode === "only-if-cached") {
        return makeNetworkError("only if cached");
      }
      const forwardResponse = await httpNetworkFetch(
        httpFetchParams,
        includeCredentials,
        isNewConnectionFetch
      );
      if (!safeMethodsSet.has(httpRequest.method) && forwardResponse.status >= 200 && forwardResponse.status <= 399)
        ;
      if (response2 == null) {
        response2 = forwardResponse;
      }
    }
    response2.urlList = [...httpRequest.urlList];
    if (httpRequest.headersList.contains("range")) {
      response2.rangeRequested = true;
    }
    response2.requestIncludesCredentials = includeCredentials;
    if (response2.status === 407) {
      if (request2.window === "no-window") {
        return makeNetworkError();
      }
      if (isCancelled(fetchParams)) {
        return makeAppropriateNetworkError(fetchParams);
      }
      return makeNetworkError("proxy authentication required");
    }
    if (
      // response’s status is 421
      response2.status === 421 && // isNewConnectionFetch is false
      !isNewConnectionFetch && // request’s body is null, or request’s body is non-null and request’s body’s source is non-null
      (request2.body == null || request2.body.source != null)
    ) {
      if (isCancelled(fetchParams)) {
        return makeAppropriateNetworkError(fetchParams);
      }
      fetchParams.controller.connection.destroy();
      response2 = await httpNetworkOrCacheFetch(
        fetchParams,
        isAuthenticationFetch,
        true
      );
    }
    return response2;
  }
  async function httpNetworkFetch(fetchParams, includeCredentials = false, forceNewConnection = false) {
    assert2(!fetchParams.controller.connection || fetchParams.controller.connection.destroyed);
    fetchParams.controller.connection = {
      abort: null,
      destroyed: false,
      destroy(err) {
        var _a;
        if (!this.destroyed) {
          this.destroyed = true;
          (_a = this.abort) == null ? void 0 : _a.call(this, err ?? new DOMException2("The operation was aborted.", "AbortError"));
        }
      }
    };
    const request2 = fetchParams.request;
    let response2 = null;
    const timingInfo = fetchParams.timingInfo;
    {
      request2.cache = "no-store";
    }
    if (request2.mode === "websocket")
      ;
    let requestBody = null;
    if (request2.body == null && fetchParams.processRequestEndOfBody) {
      queueMicrotask(() => fetchParams.processRequestEndOfBody());
    } else if (request2.body != null) {
      const processBodyChunk = async function* (bytes) {
        var _a;
        if (isCancelled(fetchParams)) {
          return;
        }
        yield bytes;
        (_a = fetchParams.processRequestBodyChunkLength) == null ? void 0 : _a.call(fetchParams, bytes.byteLength);
      };
      const processEndOfBody = () => {
        if (isCancelled(fetchParams)) {
          return;
        }
        if (fetchParams.processRequestEndOfBody) {
          fetchParams.processRequestEndOfBody();
        }
      };
      const processBodyError = (e) => {
        if (isCancelled(fetchParams)) {
          return;
        }
        if (e.name === "AbortError") {
          fetchParams.controller.abort();
        } else {
          fetchParams.controller.terminate(e);
        }
      };
      requestBody = async function* () {
        try {
          for await (const bytes of request2.body.stream) {
            yield* processBodyChunk(bytes);
          }
          processEndOfBody();
        } catch (err) {
          processBodyError(err);
        }
      }();
    }
    try {
      const { body: body2, status, statusText, headersList, socket } = await dispatch({ body: requestBody });
      if (socket) {
        response2 = makeResponse({ status, statusText, headersList, socket });
      } else {
        const iterator = body2[Symbol.asyncIterator]();
        fetchParams.controller.next = () => iterator.next();
        response2 = makeResponse({ status, statusText, headersList });
      }
    } catch (err) {
      if (err.name === "AbortError") {
        fetchParams.controller.connection.destroy();
        return makeAppropriateNetworkError(fetchParams, err);
      }
      return makeNetworkError(err);
    }
    const pullAlgorithm = () => {
      fetchParams.controller.resume();
    };
    const cancelAlgorithm = (reason) => {
      fetchParams.controller.abort(reason);
    };
    if (!ReadableStream2) {
      ReadableStream2 = require$$14.ReadableStream;
    }
    const stream2 = new ReadableStream2(
      {
        async start(controller) {
          fetchParams.controller.controller = controller;
        },
        async pull(controller) {
          await pullAlgorithm();
        },
        async cancel(reason) {
          await cancelAlgorithm(reason);
        }
      },
      {
        highWaterMark: 0,
        size() {
          return 1;
        }
      }
    );
    response2.body = { stream: stream2 };
    fetchParams.controller.on("terminated", onAborted);
    fetchParams.controller.resume = async () => {
      while (true) {
        let bytes;
        let isFailure;
        try {
          const { done, value } = await fetchParams.controller.next();
          if (isAborted(fetchParams)) {
            break;
          }
          bytes = done ? void 0 : value;
        } catch (err) {
          if (fetchParams.controller.ended && !timingInfo.encodedBodySize) {
            bytes = void 0;
          } else {
            bytes = err;
            isFailure = true;
          }
        }
        if (bytes === void 0) {
          readableStreamClose(fetchParams.controller.controller);
          finalizeResponse(fetchParams, response2);
          return;
        }
        timingInfo.decodedBodySize += (bytes == null ? void 0 : bytes.byteLength) ?? 0;
        if (isFailure) {
          fetchParams.controller.terminate(bytes);
          return;
        }
        fetchParams.controller.controller.enqueue(new Uint8Array(bytes));
        if (isErrored2(stream2)) {
          fetchParams.controller.terminate();
          return;
        }
        if (!fetchParams.controller.controller.desiredSize) {
          return;
        }
      }
    };
    function onAborted(reason) {
      if (isAborted(fetchParams)) {
        response2.aborted = true;
        if (isReadable2(stream2)) {
          fetchParams.controller.controller.error(
            fetchParams.controller.serializedAbortReason
          );
        }
      } else {
        if (isReadable2(stream2)) {
          fetchParams.controller.controller.error(new TypeError("terminated", {
            cause: isErrorLike(reason) ? reason : void 0
          }));
        }
      }
      fetchParams.controller.connection.destroy();
    }
    return response2;
    async function dispatch({ body: body2 }) {
      const url = requestCurrentURL(request2);
      const agent2 = fetchParams.controller.dispatcher;
      return new Promise((resolve, reject) => agent2.dispatch(
        {
          path: url.pathname + url.search,
          origin: url.origin,
          method: request2.method,
          body: fetchParams.controller.dispatcher.isMockActive ? request2.body && (request2.body.source || request2.body.stream) : body2,
          headers: request2.headersList.entries,
          maxRedirections: 0,
          upgrade: request2.mode === "websocket" ? "websocket" : void 0
        },
        {
          body: null,
          abort: null,
          onConnect(abort2) {
            const { connection: connection2 } = fetchParams.controller;
            if (connection2.destroyed) {
              abort2(new DOMException2("The operation was aborted.", "AbortError"));
            } else {
              fetchParams.controller.on("terminated", abort2);
              this.abort = connection2.abort = abort2;
            }
          },
          onHeaders(status, headersList, resume2, statusText) {
            if (status < 200) {
              return;
            }
            let codings = [];
            let location = "";
            const headers2 = new Headers2();
            if (Array.isArray(headersList)) {
              for (let n = 0; n < headersList.length; n += 2) {
                const key = headersList[n + 0].toString("latin1");
                const val = headersList[n + 1].toString("latin1");
                if (key.toLowerCase() === "content-encoding") {
                  codings = val.toLowerCase().split(",").map((x) => x.trim());
                } else if (key.toLowerCase() === "location") {
                  location = val;
                }
                headers2[kHeadersList].append(key, val);
              }
            } else {
              const keys = Object.keys(headersList);
              for (const key of keys) {
                const val = headersList[key];
                if (key.toLowerCase() === "content-encoding") {
                  codings = val.toLowerCase().split(",").map((x) => x.trim()).reverse();
                } else if (key.toLowerCase() === "location") {
                  location = val;
                }
                headers2[kHeadersList].append(key, val);
              }
            }
            this.body = new Readable2({ read: resume2 });
            const decoders = [];
            const willFollow = request2.redirect === "follow" && location && redirectStatusSet.has(status);
            if (request2.method !== "HEAD" && request2.method !== "CONNECT" && !nullBodyStatus.includes(status) && !willFollow) {
              for (const coding of codings) {
                if (coding === "x-gzip" || coding === "gzip") {
                  decoders.push(zlib.createGunzip({
                    // Be less strict when decoding compressed responses, since sometimes
                    // servers send slightly invalid responses that are still accepted
                    // by common browsers.
                    // Always using Z_SYNC_FLUSH is what cURL does.
                    flush: zlib.constants.Z_SYNC_FLUSH,
                    finishFlush: zlib.constants.Z_SYNC_FLUSH
                  }));
                } else if (coding === "deflate") {
                  decoders.push(zlib.createInflate());
                } else if (coding === "br") {
                  decoders.push(zlib.createBrotliDecompress());
                } else {
                  decoders.length = 0;
                  break;
                }
              }
            }
            resolve({
              status,
              statusText,
              headersList: headers2[kHeadersList],
              body: decoders.length ? pipeline2(this.body, ...decoders, () => {
              }) : this.body.on("error", () => {
              })
            });
            return true;
          },
          onData(chunk) {
            if (fetchParams.controller.dump) {
              return;
            }
            const bytes = chunk;
            timingInfo.encodedBodySize += bytes.byteLength;
            return this.body.push(bytes);
          },
          onComplete() {
            if (this.abort) {
              fetchParams.controller.off("terminated", this.abort);
            }
            fetchParams.controller.ended = true;
            this.body.push(null);
          },
          onError(error) {
            var _a;
            if (this.abort) {
              fetchParams.controller.off("terminated", this.abort);
            }
            (_a = this.body) == null ? void 0 : _a.destroy(error);
            fetchParams.controller.terminate(error);
            reject(error);
          },
          onUpgrade(status, headersList, socket) {
            if (status !== 101) {
              return;
            }
            const headers2 = new Headers2();
            for (let n = 0; n < headersList.length; n += 2) {
              const key = headersList[n + 0].toString("latin1");
              const val = headersList[n + 1].toString("latin1");
              headers2[kHeadersList].append(key, val);
            }
            resolve({
              status,
              statusText: STATUS_CODES2[status],
              headersList: headers2[kHeadersList],
              socket
            });
            return true;
          }
        }
      ));
    }
  }
  fetch_1 = {
    fetch,
    Fetch,
    fetching,
    finalizeAndReportTiming
  };
  return fetch_1;
}
var symbols$2;
var hasRequiredSymbols$2;
function requireSymbols$2() {
  if (hasRequiredSymbols$2)
    return symbols$2;
  hasRequiredSymbols$2 = 1;
  symbols$2 = {
    kState: Symbol("FileReader state"),
    kResult: Symbol("FileReader result"),
    kError: Symbol("FileReader error"),
    kLastProgressEventFired: Symbol("FileReader last progress event fired timestamp"),
    kEvents: Symbol("FileReader events"),
    kAborted: Symbol("FileReader aborted")
  };
  return symbols$2;
}
var progressevent;
var hasRequiredProgressevent;
function requireProgressevent() {
  if (hasRequiredProgressevent)
    return progressevent;
  hasRequiredProgressevent = 1;
  const { webidl } = requireWebidl();
  const kState = Symbol("ProgressEvent state");
  class ProgressEvent extends Event {
    constructor(type, eventInitDict = {}) {
      type = webidl.converters.DOMString(type);
      eventInitDict = webidl.converters.ProgressEventInit(eventInitDict ?? {});
      super(type, eventInitDict);
      this[kState] = {
        lengthComputable: eventInitDict.lengthComputable,
        loaded: eventInitDict.loaded,
        total: eventInitDict.total
      };
    }
    get lengthComputable() {
      webidl.brandCheck(this, ProgressEvent);
      return this[kState].lengthComputable;
    }
    get loaded() {
      webidl.brandCheck(this, ProgressEvent);
      return this[kState].loaded;
    }
    get total() {
      webidl.brandCheck(this, ProgressEvent);
      return this[kState].total;
    }
  }
  webidl.converters.ProgressEventInit = webidl.dictionaryConverter([
    {
      key: "lengthComputable",
      converter: webidl.converters.boolean,
      defaultValue: false
    },
    {
      key: "loaded",
      converter: webidl.converters["unsigned long long"],
      defaultValue: 0
    },
    {
      key: "total",
      converter: webidl.converters["unsigned long long"],
      defaultValue: 0
    },
    {
      key: "bubbles",
      converter: webidl.converters.boolean,
      defaultValue: false
    },
    {
      key: "cancelable",
      converter: webidl.converters.boolean,
      defaultValue: false
    },
    {
      key: "composed",
      converter: webidl.converters.boolean,
      defaultValue: false
    }
  ]);
  progressevent = {
    ProgressEvent
  };
  return progressevent;
}
var encoding;
var hasRequiredEncoding;
function requireEncoding() {
  if (hasRequiredEncoding)
    return encoding;
  hasRequiredEncoding = 1;
  function getEncoding(label) {
    if (!label) {
      return "failure";
    }
    switch (label.trim().toLowerCase()) {
      case "unicode-1-1-utf-8":
      case "unicode11utf8":
      case "unicode20utf8":
      case "utf-8":
      case "utf8":
      case "x-unicode20utf8":
        return "UTF-8";
      case "866":
      case "cp866":
      case "csibm866":
      case "ibm866":
        return "IBM866";
      case "csisolatin2":
      case "iso-8859-2":
      case "iso-ir-101":
      case "iso8859-2":
      case "iso88592":
      case "iso_8859-2":
      case "iso_8859-2:1987":
      case "l2":
      case "latin2":
        return "ISO-8859-2";
      case "csisolatin3":
      case "iso-8859-3":
      case "iso-ir-109":
      case "iso8859-3":
      case "iso88593":
      case "iso_8859-3":
      case "iso_8859-3:1988":
      case "l3":
      case "latin3":
        return "ISO-8859-3";
      case "csisolatin4":
      case "iso-8859-4":
      case "iso-ir-110":
      case "iso8859-4":
      case "iso88594":
      case "iso_8859-4":
      case "iso_8859-4:1988":
      case "l4":
      case "latin4":
        return "ISO-8859-4";
      case "csisolatincyrillic":
      case "cyrillic":
      case "iso-8859-5":
      case "iso-ir-144":
      case "iso8859-5":
      case "iso88595":
      case "iso_8859-5":
      case "iso_8859-5:1988":
        return "ISO-8859-5";
      case "arabic":
      case "asmo-708":
      case "csiso88596e":
      case "csiso88596i":
      case "csisolatinarabic":
      case "ecma-114":
      case "iso-8859-6":
      case "iso-8859-6-e":
      case "iso-8859-6-i":
      case "iso-ir-127":
      case "iso8859-6":
      case "iso88596":
      case "iso_8859-6":
      case "iso_8859-6:1987":
        return "ISO-8859-6";
      case "csisolatingreek":
      case "ecma-118":
      case "elot_928":
      case "greek":
      case "greek8":
      case "iso-8859-7":
      case "iso-ir-126":
      case "iso8859-7":
      case "iso88597":
      case "iso_8859-7":
      case "iso_8859-7:1987":
      case "sun_eu_greek":
        return "ISO-8859-7";
      case "csiso88598e":
      case "csisolatinhebrew":
      case "hebrew":
      case "iso-8859-8":
      case "iso-8859-8-e":
      case "iso-ir-138":
      case "iso8859-8":
      case "iso88598":
      case "iso_8859-8":
      case "iso_8859-8:1988":
      case "visual":
        return "ISO-8859-8";
      case "csiso88598i":
      case "iso-8859-8-i":
      case "logical":
        return "ISO-8859-8-I";
      case "csisolatin6":
      case "iso-8859-10":
      case "iso-ir-157":
      case "iso8859-10":
      case "iso885910":
      case "l6":
      case "latin6":
        return "ISO-8859-10";
      case "iso-8859-13":
      case "iso8859-13":
      case "iso885913":
        return "ISO-8859-13";
      case "iso-8859-14":
      case "iso8859-14":
      case "iso885914":
        return "ISO-8859-14";
      case "csisolatin9":
      case "iso-8859-15":
      case "iso8859-15":
      case "iso885915":
      case "iso_8859-15":
      case "l9":
        return "ISO-8859-15";
      case "iso-8859-16":
        return "ISO-8859-16";
      case "cskoi8r":
      case "koi":
      case "koi8":
      case "koi8-r":
      case "koi8_r":
        return "KOI8-R";
      case "koi8-ru":
      case "koi8-u":
        return "KOI8-U";
      case "csmacintosh":
      case "mac":
      case "macintosh":
      case "x-mac-roman":
        return "macintosh";
      case "iso-8859-11":
      case "iso8859-11":
      case "iso885911":
      case "tis-620":
      case "windows-874":
        return "windows-874";
      case "cp1250":
      case "windows-1250":
      case "x-cp1250":
        return "windows-1250";
      case "cp1251":
      case "windows-1251":
      case "x-cp1251":
        return "windows-1251";
      case "ansi_x3.4-1968":
      case "ascii":
      case "cp1252":
      case "cp819":
      case "csisolatin1":
      case "ibm819":
      case "iso-8859-1":
      case "iso-ir-100":
      case "iso8859-1":
      case "iso88591":
      case "iso_8859-1":
      case "iso_8859-1:1987":
      case "l1":
      case "latin1":
      case "us-ascii":
      case "windows-1252":
      case "x-cp1252":
        return "windows-1252";
      case "cp1253":
      case "windows-1253":
      case "x-cp1253":
        return "windows-1253";
      case "cp1254":
      case "csisolatin5":
      case "iso-8859-9":
      case "iso-ir-148":
      case "iso8859-9":
      case "iso88599":
      case "iso_8859-9":
      case "iso_8859-9:1989":
      case "l5":
      case "latin5":
      case "windows-1254":
      case "x-cp1254":
        return "windows-1254";
      case "cp1255":
      case "windows-1255":
      case "x-cp1255":
        return "windows-1255";
      case "cp1256":
      case "windows-1256":
      case "x-cp1256":
        return "windows-1256";
      case "cp1257":
      case "windows-1257":
      case "x-cp1257":
        return "windows-1257";
      case "cp1258":
      case "windows-1258":
      case "x-cp1258":
        return "windows-1258";
      case "x-mac-cyrillic":
      case "x-mac-ukrainian":
        return "x-mac-cyrillic";
      case "chinese":
      case "csgb2312":
      case "csiso58gb231280":
      case "gb2312":
      case "gb_2312":
      case "gb_2312-80":
      case "gbk":
      case "iso-ir-58":
      case "x-gbk":
        return "GBK";
      case "gb18030":
        return "gb18030";
      case "big5":
      case "big5-hkscs":
      case "cn-big5":
      case "csbig5":
      case "x-x-big5":
        return "Big5";
      case "cseucpkdfmtjapanese":
      case "euc-jp":
      case "x-euc-jp":
        return "EUC-JP";
      case "csiso2022jp":
      case "iso-2022-jp":
        return "ISO-2022-JP";
      case "csshiftjis":
      case "ms932":
      case "ms_kanji":
      case "shift-jis":
      case "shift_jis":
      case "sjis":
      case "windows-31j":
      case "x-sjis":
        return "Shift_JIS";
      case "cseuckr":
      case "csksc56011987":
      case "euc-kr":
      case "iso-ir-149":
      case "korean":
      case "ks_c_5601-1987":
      case "ks_c_5601-1989":
      case "ksc5601":
      case "ksc_5601":
      case "windows-949":
        return "EUC-KR";
      case "csiso2022kr":
      case "hz-gb-2312":
      case "iso-2022-cn":
      case "iso-2022-cn-ext":
      case "iso-2022-kr":
      case "replacement":
        return "replacement";
      case "unicodefffe":
      case "utf-16be":
        return "UTF-16BE";
      case "csunicode":
      case "iso-10646-ucs-2":
      case "ucs-2":
      case "unicode":
      case "unicodefeff":
      case "utf-16":
      case "utf-16le":
        return "UTF-16LE";
      case "x-user-defined":
        return "x-user-defined";
      default:
        return "failure";
    }
  }
  encoding = {
    getEncoding
  };
  return encoding;
}
var util$4;
var hasRequiredUtil$3;
function requireUtil$3() {
  if (hasRequiredUtil$3)
    return util$4;
  hasRequiredUtil$3 = 1;
  const {
    kState,
    kError: kError2,
    kResult,
    kAborted,
    kLastProgressEventFired
  } = requireSymbols$2();
  const { ProgressEvent } = requireProgressevent();
  const { getEncoding } = requireEncoding();
  const { DOMException: DOMException2 } = requireConstants$3();
  const { serializeAMimeType, parseMIMEType } = requireDataURL();
  const { types } = require$$0$2;
  const { StringDecoder } = require$$6;
  const { btoa } = require$$7;
  const staticPropertyDescriptors = {
    enumerable: true,
    writable: false,
    configurable: false
  };
  function readOperation(fr, blob, type, encodingName) {
    if (fr[kState] === "loading") {
      throw new DOMException2("Invalid state", "InvalidStateError");
    }
    fr[kState] = "loading";
    fr[kResult] = null;
    fr[kError2] = null;
    const stream2 = blob.stream();
    const reader = stream2.getReader();
    const bytes = [];
    let chunkPromise = reader.read();
    let isFirstChunk = true;
    (async () => {
      while (!fr[kAborted]) {
        try {
          const { done, value } = await chunkPromise;
          if (isFirstChunk && !fr[kAborted]) {
            queueMicrotask(() => {
              fireAProgressEvent("loadstart", fr);
            });
          }
          isFirstChunk = false;
          if (!done && types.isUint8Array(value)) {
            bytes.push(value);
            if ((fr[kLastProgressEventFired] === void 0 || Date.now() - fr[kLastProgressEventFired] >= 50) && !fr[kAborted]) {
              fr[kLastProgressEventFired] = Date.now();
              queueMicrotask(() => {
                fireAProgressEvent("progress", fr);
              });
            }
            chunkPromise = reader.read();
          } else if (done) {
            queueMicrotask(() => {
              fr[kState] = "done";
              try {
                const result = packageData(bytes, type, blob.type, encodingName);
                if (fr[kAborted]) {
                  return;
                }
                fr[kResult] = result;
                fireAProgressEvent("load", fr);
              } catch (error) {
                fr[kError2] = error;
                fireAProgressEvent("error", fr);
              }
              if (fr[kState] !== "loading") {
                fireAProgressEvent("loadend", fr);
              }
            });
            break;
          }
        } catch (error) {
          if (fr[kAborted]) {
            return;
          }
          queueMicrotask(() => {
            fr[kState] = "done";
            fr[kError2] = error;
            fireAProgressEvent("error", fr);
            if (fr[kState] !== "loading") {
              fireAProgressEvent("loadend", fr);
            }
          });
          break;
        }
      }
    })();
  }
  function fireAProgressEvent(e, reader) {
    const event = new ProgressEvent(e, {
      bubbles: false,
      cancelable: false
    });
    reader.dispatchEvent(event);
  }
  function packageData(bytes, type, mimeType, encodingName) {
    switch (type) {
      case "DataURL": {
        let dataURL2 = "data:";
        const parsed = parseMIMEType(mimeType || "application/octet-stream");
        if (parsed !== "failure") {
          dataURL2 += serializeAMimeType(parsed);
        }
        dataURL2 += ";base64,";
        const decoder = new StringDecoder("latin1");
        for (const chunk of bytes) {
          dataURL2 += btoa(decoder.write(chunk));
        }
        dataURL2 += btoa(decoder.end());
        return dataURL2;
      }
      case "Text": {
        let encoding2 = "failure";
        if (encodingName) {
          encoding2 = getEncoding(encodingName);
        }
        if (encoding2 === "failure" && mimeType) {
          const type2 = parseMIMEType(mimeType);
          if (type2 !== "failure") {
            encoding2 = getEncoding(type2.parameters.get("charset"));
          }
        }
        if (encoding2 === "failure") {
          encoding2 = "UTF-8";
        }
        return decode(bytes, encoding2);
      }
      case "ArrayBuffer": {
        const sequence = combineByteSequences(bytes);
        return sequence.buffer;
      }
      case "BinaryString": {
        let binaryString = "";
        const decoder = new StringDecoder("latin1");
        for (const chunk of bytes) {
          binaryString += decoder.write(chunk);
        }
        binaryString += decoder.end();
        return binaryString;
      }
    }
  }
  function decode(ioQueue, encoding2) {
    const bytes = combineByteSequences(ioQueue);
    const BOMEncoding = BOMSniffing(bytes);
    let slice = 0;
    if (BOMEncoding !== null) {
      encoding2 = BOMEncoding;
      slice = BOMEncoding === "UTF-8" ? 3 : 2;
    }
    const sliced = bytes.slice(slice);
    return new TextDecoder(encoding2).decode(sliced);
  }
  function BOMSniffing(ioQueue) {
    const [a, b, c] = ioQueue;
    if (a === 239 && b === 187 && c === 191) {
      return "UTF-8";
    } else if (a === 254 && b === 255) {
      return "UTF-16BE";
    } else if (a === 255 && b === 254) {
      return "UTF-16LE";
    }
    return null;
  }
  function combineByteSequences(sequences) {
    const size = sequences.reduce((a, b) => {
      return a + b.byteLength;
    }, 0);
    let offset = 0;
    return sequences.reduce((a, b) => {
      a.set(b, offset);
      offset += b.byteLength;
      return a;
    }, new Uint8Array(size));
  }
  util$4 = {
    staticPropertyDescriptors,
    readOperation,
    fireAProgressEvent
  };
  return util$4;
}
var filereader;
var hasRequiredFilereader;
function requireFilereader() {
  if (hasRequiredFilereader)
    return filereader;
  hasRequiredFilereader = 1;
  const {
    staticPropertyDescriptors,
    readOperation,
    fireAProgressEvent
  } = requireUtil$3();
  const {
    kState,
    kError: kError2,
    kResult,
    kEvents,
    kAborted
  } = requireSymbols$2();
  const { webidl } = requireWebidl();
  const { kEnumerableProperty: kEnumerableProperty2 } = util$j;
  class FileReader extends EventTarget {
    constructor() {
      super();
      this[kState] = "empty";
      this[kResult] = null;
      this[kError2] = null;
      this[kEvents] = {
        loadend: null,
        error: null,
        abort: null,
        load: null,
        progress: null,
        loadstart: null
      };
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dfn-readAsArrayBuffer
     * @param {import('buffer').Blob} blob
     */
    readAsArrayBuffer(blob) {
      webidl.brandCheck(this, FileReader);
      webidl.argumentLengthCheck(arguments, 1, { header: "FileReader.readAsArrayBuffer" });
      blob = webidl.converters.Blob(blob, { strict: false });
      readOperation(this, blob, "ArrayBuffer");
    }
    /**
     * @see https://w3c.github.io/FileAPI/#readAsBinaryString
     * @param {import('buffer').Blob} blob
     */
    readAsBinaryString(blob) {
      webidl.brandCheck(this, FileReader);
      webidl.argumentLengthCheck(arguments, 1, { header: "FileReader.readAsBinaryString" });
      blob = webidl.converters.Blob(blob, { strict: false });
      readOperation(this, blob, "BinaryString");
    }
    /**
     * @see https://w3c.github.io/FileAPI/#readAsDataText
     * @param {import('buffer').Blob} blob
     * @param {string?} encoding
     */
    readAsText(blob, encoding2 = void 0) {
      webidl.brandCheck(this, FileReader);
      webidl.argumentLengthCheck(arguments, 1, { header: "FileReader.readAsText" });
      blob = webidl.converters.Blob(blob, { strict: false });
      if (encoding2 !== void 0) {
        encoding2 = webidl.converters.DOMString(encoding2);
      }
      readOperation(this, blob, "Text", encoding2);
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dfn-readAsDataURL
     * @param {import('buffer').Blob} blob
     */
    readAsDataURL(blob) {
      webidl.brandCheck(this, FileReader);
      webidl.argumentLengthCheck(arguments, 1, { header: "FileReader.readAsDataURL" });
      blob = webidl.converters.Blob(blob, { strict: false });
      readOperation(this, blob, "DataURL");
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dfn-abort
     */
    abort() {
      if (this[kState] === "empty" || this[kState] === "done") {
        this[kResult] = null;
        return;
      }
      if (this[kState] === "loading") {
        this[kState] = "done";
        this[kResult] = null;
      }
      this[kAborted] = true;
      fireAProgressEvent("abort", this);
      if (this[kState] !== "loading") {
        fireAProgressEvent("loadend", this);
      }
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dom-filereader-readystate
     */
    get readyState() {
      webidl.brandCheck(this, FileReader);
      switch (this[kState]) {
        case "empty":
          return this.EMPTY;
        case "loading":
          return this.LOADING;
        case "done":
          return this.DONE;
      }
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dom-filereader-result
     */
    get result() {
      webidl.brandCheck(this, FileReader);
      return this[kResult];
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dom-filereader-error
     */
    get error() {
      webidl.brandCheck(this, FileReader);
      return this[kError2];
    }
    get onloadend() {
      webidl.brandCheck(this, FileReader);
      return this[kEvents].loadend;
    }
    set onloadend(fn) {
      webidl.brandCheck(this, FileReader);
      if (this[kEvents].loadend) {
        this.removeEventListener("loadend", this[kEvents].loadend);
      }
      if (typeof fn === "function") {
        this[kEvents].loadend = fn;
        this.addEventListener("loadend", fn);
      } else {
        this[kEvents].loadend = null;
      }
    }
    get onerror() {
      webidl.brandCheck(this, FileReader);
      return this[kEvents].error;
    }
    set onerror(fn) {
      webidl.brandCheck(this, FileReader);
      if (this[kEvents].error) {
        this.removeEventListener("error", this[kEvents].error);
      }
      if (typeof fn === "function") {
        this[kEvents].error = fn;
        this.addEventListener("error", fn);
      } else {
        this[kEvents].error = null;
      }
    }
    get onloadstart() {
      webidl.brandCheck(this, FileReader);
      return this[kEvents].loadstart;
    }
    set onloadstart(fn) {
      webidl.brandCheck(this, FileReader);
      if (this[kEvents].loadstart) {
        this.removeEventListener("loadstart", this[kEvents].loadstart);
      }
      if (typeof fn === "function") {
        this[kEvents].loadstart = fn;
        this.addEventListener("loadstart", fn);
      } else {
        this[kEvents].loadstart = null;
      }
    }
    get onprogress() {
      webidl.brandCheck(this, FileReader);
      return this[kEvents].progress;
    }
    set onprogress(fn) {
      webidl.brandCheck(this, FileReader);
      if (this[kEvents].progress) {
        this.removeEventListener("progress", this[kEvents].progress);
      }
      if (typeof fn === "function") {
        this[kEvents].progress = fn;
        this.addEventListener("progress", fn);
      } else {
        this[kEvents].progress = null;
      }
    }
    get onload() {
      webidl.brandCheck(this, FileReader);
      return this[kEvents].load;
    }
    set onload(fn) {
      webidl.brandCheck(this, FileReader);
      if (this[kEvents].load) {
        this.removeEventListener("load", this[kEvents].load);
      }
      if (typeof fn === "function") {
        this[kEvents].load = fn;
        this.addEventListener("load", fn);
      } else {
        this[kEvents].load = null;
      }
    }
    get onabort() {
      webidl.brandCheck(this, FileReader);
      return this[kEvents].abort;
    }
    set onabort(fn) {
      webidl.brandCheck(this, FileReader);
      if (this[kEvents].abort) {
        this.removeEventListener("abort", this[kEvents].abort);
      }
      if (typeof fn === "function") {
        this[kEvents].abort = fn;
        this.addEventListener("abort", fn);
      } else {
        this[kEvents].abort = null;
      }
    }
  }
  FileReader.EMPTY = FileReader.prototype.EMPTY = 0;
  FileReader.LOADING = FileReader.prototype.LOADING = 1;
  FileReader.DONE = FileReader.prototype.DONE = 2;
  Object.defineProperties(FileReader.prototype, {
    EMPTY: staticPropertyDescriptors,
    LOADING: staticPropertyDescriptors,
    DONE: staticPropertyDescriptors,
    readAsArrayBuffer: kEnumerableProperty2,
    readAsBinaryString: kEnumerableProperty2,
    readAsText: kEnumerableProperty2,
    readAsDataURL: kEnumerableProperty2,
    abort: kEnumerableProperty2,
    readyState: kEnumerableProperty2,
    result: kEnumerableProperty2,
    error: kEnumerableProperty2,
    onloadstart: kEnumerableProperty2,
    onprogress: kEnumerableProperty2,
    onload: kEnumerableProperty2,
    onabort: kEnumerableProperty2,
    onerror: kEnumerableProperty2,
    onloadend: kEnumerableProperty2,
    [Symbol.toStringTag]: {
      value: "FileReader",
      writable: false,
      enumerable: false,
      configurable: true
    }
  });
  Object.defineProperties(FileReader, {
    EMPTY: staticPropertyDescriptors,
    LOADING: staticPropertyDescriptors,
    DONE: staticPropertyDescriptors
  });
  filereader = {
    FileReader
  };
  return filereader;
}
var symbols$1;
var hasRequiredSymbols$1;
function requireSymbols$1() {
  if (hasRequiredSymbols$1)
    return symbols$1;
  hasRequiredSymbols$1 = 1;
  symbols$1 = {
    kConstruct: symbols$4.kConstruct
  };
  return symbols$1;
}
var util$3;
var hasRequiredUtil$2;
function requireUtil$2() {
  if (hasRequiredUtil$2)
    return util$3;
  hasRequiredUtil$2 = 1;
  const assert2 = require$$0$3;
  const { URLSerializer } = requireDataURL();
  const { isValidHeaderName } = requireUtil$4();
  function urlEquals(A, B, excludeFragment = false) {
    const serializedA = URLSerializer(A, excludeFragment);
    const serializedB = URLSerializer(B, excludeFragment);
    return serializedA === serializedB;
  }
  function fieldValues(header) {
    assert2(header !== null);
    const values = [];
    for (let value of header.split(",")) {
      value = value.trim();
      if (!value.length) {
        continue;
      } else if (!isValidHeaderName(value)) {
        continue;
      }
      values.push(value);
    }
    return values;
  }
  util$3 = {
    urlEquals,
    fieldValues
  };
  return util$3;
}
var cache;
var hasRequiredCache;
function requireCache() {
  var _relevantRequestResponseList, _batchCacheOperations, batchCacheOperations_fn, _queryCache, queryCache_fn, _requestMatchesCachedItem, requestMatchesCachedItem_fn;
  if (hasRequiredCache)
    return cache;
  hasRequiredCache = 1;
  const { kConstruct } = requireSymbols$1();
  const { urlEquals, fieldValues: getFieldValues } = requireUtil$2();
  const { kEnumerableProperty: kEnumerableProperty2, isDisturbed: isDisturbed2 } = util$j;
  const { kHeadersList } = symbols$4;
  const { webidl } = requireWebidl();
  const { Response, cloneResponse } = requireResponse();
  const { Request: Request3 } = requireRequest();
  const { kState, kHeaders, kGuard, kRealm } = requireSymbols$3();
  const { fetching } = requireFetch();
  const { urlIsHttpHttpsScheme, createDeferredPromise, readAllBytes } = requireUtil$4();
  const assert2 = require$$0$3;
  const { getGlobalDispatcher: getGlobalDispatcher2 } = global$1;
  const _Cache = class _Cache {
    constructor() {
      /**
       * @see https://w3c.github.io/ServiceWorker/#batch-cache-operations-algorithm
       * @param {CacheBatchOperation[]} operations
       * @returns {requestResponseList}
       */
      __privateAdd(this, _batchCacheOperations);
      /**
       * @see https://w3c.github.io/ServiceWorker/#query-cache
       * @param {any} requestQuery
       * @param {import('../../types/cache').CacheQueryOptions} options
       * @param {requestResponseList} targetStorage
       * @returns {requestResponseList}
       */
      __privateAdd(this, _queryCache);
      /**
       * @see https://w3c.github.io/ServiceWorker/#request-matches-cached-item-algorithm
       * @param {any} requestQuery
       * @param {any} request
       * @param {any | null} response
       * @param {import('../../types/cache').CacheQueryOptions | undefined} options
       * @returns {boolean}
       */
      __privateAdd(this, _requestMatchesCachedItem);
      /**
       * @see https://w3c.github.io/ServiceWorker/#dfn-relevant-request-response-list
       * @type {requestResponseList}
       */
      __privateAdd(this, _relevantRequestResponseList, void 0);
      if (arguments[0] !== kConstruct) {
        webidl.illegalConstructor();
      }
      __privateSet(this, _relevantRequestResponseList, arguments[1]);
    }
    async match(request2, options = {}) {
      webidl.brandCheck(this, _Cache);
      webidl.argumentLengthCheck(arguments, 1, { header: "Cache.match" });
      request2 = webidl.converters.RequestInfo(request2);
      options = webidl.converters.CacheQueryOptions(options);
      const p = await this.matchAll(request2, options);
      if (p.length === 0) {
        return;
      }
      return p[0];
    }
    async matchAll(request2 = void 0, options = {}) {
      var _a;
      webidl.brandCheck(this, _Cache);
      if (request2 !== void 0)
        request2 = webidl.converters.RequestInfo(request2);
      options = webidl.converters.CacheQueryOptions(options);
      let r = null;
      if (request2 !== void 0) {
        if (request2 instanceof Request3) {
          r = request2[kState];
          if (r.method !== "GET" && !options.ignoreMethod) {
            return [];
          }
        } else if (typeof request2 === "string") {
          r = new Request3(request2)[kState];
        }
      }
      const responses = [];
      if (request2 === void 0) {
        for (const requestResponse of __privateGet(this, _relevantRequestResponseList)) {
          responses.push(requestResponse[1]);
        }
      } else {
        const requestResponses = __privateMethod(this, _queryCache, queryCache_fn).call(this, r, options);
        for (const requestResponse of requestResponses) {
          responses.push(requestResponse[1]);
        }
      }
      const responseList = [];
      for (const response2 of responses) {
        const responseObject = new Response(((_a = response2.body) == null ? void 0 : _a.source) ?? null);
        const body2 = responseObject[kState].body;
        responseObject[kState] = response2;
        responseObject[kState].body = body2;
        responseObject[kHeaders][kHeadersList] = response2.headersList;
        responseObject[kHeaders][kGuard] = "immutable";
        responseList.push(responseObject);
      }
      return Object.freeze(responseList);
    }
    async add(request2) {
      webidl.brandCheck(this, _Cache);
      webidl.argumentLengthCheck(arguments, 1, { header: "Cache.add" });
      request2 = webidl.converters.RequestInfo(request2);
      const requests = [request2];
      const responseArrayPromise = this.addAll(requests);
      return await responseArrayPromise;
    }
    async addAll(requests) {
      webidl.brandCheck(this, _Cache);
      webidl.argumentLengthCheck(arguments, 1, { header: "Cache.addAll" });
      requests = webidl.converters["sequence<RequestInfo>"](requests);
      const responsePromises = [];
      const requestList = [];
      for (const request2 of requests) {
        if (typeof request2 === "string") {
          continue;
        }
        const r = request2[kState];
        if (!urlIsHttpHttpsScheme(r.url) || r.method !== "GET") {
          throw webidl.errors.exception({
            header: "Cache.addAll",
            message: "Expected http/s scheme when method is not GET."
          });
        }
      }
      const fetchControllers = [];
      for (const request2 of requests) {
        const r = new Request3(request2)[kState];
        if (!urlIsHttpHttpsScheme(r.url)) {
          throw webidl.errors.exception({
            header: "Cache.addAll",
            message: "Expected http/s scheme."
          });
        }
        r.initiator = "fetch";
        r.destination = "subresource";
        requestList.push(r);
        const responsePromise = createDeferredPromise();
        fetchControllers.push(fetching({
          request: r,
          dispatcher: getGlobalDispatcher2(),
          processResponse(response2) {
            if (response2.type === "error" || response2.status === 206 || response2.status < 200 || response2.status > 299) {
              responsePromise.reject(webidl.errors.exception({
                header: "Cache.addAll",
                message: "Received an invalid status code or the request failed."
              }));
            } else if (response2.headersList.contains("vary")) {
              const fieldValues = getFieldValues(response2.headersList.get("vary"));
              for (const fieldValue of fieldValues) {
                if (fieldValue === "*") {
                  responsePromise.reject(webidl.errors.exception({
                    header: "Cache.addAll",
                    message: "invalid vary field value"
                  }));
                  for (const controller of fetchControllers) {
                    controller.abort();
                  }
                  return;
                }
              }
            }
          },
          processResponseEndOfBody(response2) {
            if (response2.aborted) {
              responsePromise.reject(new DOMException("aborted", "AbortError"));
              return;
            }
            responsePromise.resolve(response2);
          }
        }));
        responsePromises.push(responsePromise.promise);
      }
      const p = Promise.all(responsePromises);
      const responses = await p;
      const operations = [];
      let index = 0;
      for (const response2 of responses) {
        const operation = {
          type: "put",
          // 7.3.2
          request: requestList[index],
          // 7.3.3
          response: response2
          // 7.3.4
        };
        operations.push(operation);
        index++;
      }
      const cacheJobPromise = createDeferredPromise();
      let errorData = null;
      try {
        __privateMethod(this, _batchCacheOperations, batchCacheOperations_fn).call(this, operations);
      } catch (e) {
        errorData = e;
      }
      queueMicrotask(() => {
        if (errorData === null) {
          cacheJobPromise.resolve(void 0);
        } else {
          cacheJobPromise.reject(errorData);
        }
      });
      return cacheJobPromise.promise;
    }
    async put(request2, response2) {
      webidl.brandCheck(this, _Cache);
      webidl.argumentLengthCheck(arguments, 2, { header: "Cache.put" });
      request2 = webidl.converters.RequestInfo(request2);
      response2 = webidl.converters.Response(response2);
      let innerRequest = null;
      if (request2 instanceof Request3) {
        innerRequest = request2[kState];
      } else {
        innerRequest = new Request3(request2)[kState];
      }
      if (!urlIsHttpHttpsScheme(innerRequest.url) || innerRequest.method !== "GET") {
        throw webidl.errors.exception({
          header: "Cache.put",
          message: "Expected an http/s scheme when method is not GET"
        });
      }
      const innerResponse = response2[kState];
      if (innerResponse.status === 206) {
        throw webidl.errors.exception({
          header: "Cache.put",
          message: "Got 206 status"
        });
      }
      if (innerResponse.headersList.contains("vary")) {
        const fieldValues = getFieldValues(innerResponse.headersList.get("vary"));
        for (const fieldValue of fieldValues) {
          if (fieldValue === "*") {
            throw webidl.errors.exception({
              header: "Cache.put",
              message: "Got * vary field value"
            });
          }
        }
      }
      if (innerResponse.body && (isDisturbed2(innerResponse.body.stream) || innerResponse.body.stream.locked)) {
        throw webidl.errors.exception({
          header: "Cache.put",
          message: "Response body is locked or disturbed"
        });
      }
      const clonedResponse = cloneResponse(innerResponse);
      const bodyReadPromise = createDeferredPromise();
      if (innerResponse.body != null) {
        const stream2 = innerResponse.body.stream;
        const reader = stream2.getReader();
        readAllBytes(reader).then(bodyReadPromise.resolve, bodyReadPromise.reject);
      } else {
        bodyReadPromise.resolve(void 0);
      }
      const operations = [];
      const operation = {
        type: "put",
        // 14.
        request: innerRequest,
        // 15.
        response: clonedResponse
        // 16.
      };
      operations.push(operation);
      const bytes = await bodyReadPromise.promise;
      if (clonedResponse.body != null) {
        clonedResponse.body.source = bytes;
      }
      const cacheJobPromise = createDeferredPromise();
      let errorData = null;
      try {
        __privateMethod(this, _batchCacheOperations, batchCacheOperations_fn).call(this, operations);
      } catch (e) {
        errorData = e;
      }
      queueMicrotask(() => {
        if (errorData === null) {
          cacheJobPromise.resolve();
        } else {
          cacheJobPromise.reject(errorData);
        }
      });
      return cacheJobPromise.promise;
    }
    async delete(request2, options = {}) {
      webidl.brandCheck(this, _Cache);
      webidl.argumentLengthCheck(arguments, 1, { header: "Cache.delete" });
      request2 = webidl.converters.RequestInfo(request2);
      options = webidl.converters.CacheQueryOptions(options);
      let r = null;
      if (request2 instanceof Request3) {
        r = request2[kState];
        if (r.method !== "GET" && !options.ignoreMethod) {
          return false;
        }
      } else {
        assert2(typeof request2 === "string");
        r = new Request3(request2)[kState];
      }
      const operations = [];
      const operation = {
        type: "delete",
        request: r,
        options
      };
      operations.push(operation);
      const cacheJobPromise = createDeferredPromise();
      let errorData = null;
      let requestResponses;
      try {
        requestResponses = __privateMethod(this, _batchCacheOperations, batchCacheOperations_fn).call(this, operations);
      } catch (e) {
        errorData = e;
      }
      queueMicrotask(() => {
        if (errorData === null) {
          cacheJobPromise.resolve(!!(requestResponses == null ? void 0 : requestResponses.length));
        } else {
          cacheJobPromise.reject(errorData);
        }
      });
      return cacheJobPromise.promise;
    }
    /**
     * @see https://w3c.github.io/ServiceWorker/#dom-cache-keys
     * @param {any} request
     * @param {import('../../types/cache').CacheQueryOptions} options
     * @returns {readonly Request[]}
     */
    async keys(request2 = void 0, options = {}) {
      webidl.brandCheck(this, _Cache);
      if (request2 !== void 0)
        request2 = webidl.converters.RequestInfo(request2);
      options = webidl.converters.CacheQueryOptions(options);
      let r = null;
      if (request2 !== void 0) {
        if (request2 instanceof Request3) {
          r = request2[kState];
          if (r.method !== "GET" && !options.ignoreMethod) {
            return [];
          }
        } else if (typeof request2 === "string") {
          r = new Request3(request2)[kState];
        }
      }
      const promise = createDeferredPromise();
      const requests = [];
      if (request2 === void 0) {
        for (const requestResponse of __privateGet(this, _relevantRequestResponseList)) {
          requests.push(requestResponse[0]);
        }
      } else {
        const requestResponses = __privateMethod(this, _queryCache, queryCache_fn).call(this, r, options);
        for (const requestResponse of requestResponses) {
          requests.push(requestResponse[0]);
        }
      }
      queueMicrotask(() => {
        const requestList = [];
        for (const request3 of requests) {
          const requestObject = new Request3("https://a");
          requestObject[kState] = request3;
          requestObject[kHeaders][kHeadersList] = request3.headersList;
          requestObject[kHeaders][kGuard] = "immutable";
          requestObject[kRealm] = request3.client;
          requestList.push(requestObject);
        }
        promise.resolve(Object.freeze(requestList));
      });
      return promise.promise;
    }
  };
  _relevantRequestResponseList = new WeakMap();
  _batchCacheOperations = new WeakSet();
  batchCacheOperations_fn = function(operations) {
    const cache2 = __privateGet(this, _relevantRequestResponseList);
    const backupCache = [...cache2];
    const addedItems = [];
    const resultList = [];
    try {
      for (const operation of operations) {
        if (operation.type !== "delete" && operation.type !== "put") {
          throw webidl.errors.exception({
            header: "Cache.#batchCacheOperations",
            message: 'operation type does not match "delete" or "put"'
          });
        }
        if (operation.type === "delete" && operation.response != null) {
          throw webidl.errors.exception({
            header: "Cache.#batchCacheOperations",
            message: "delete operation should not have an associated response"
          });
        }
        if (__privateMethod(this, _queryCache, queryCache_fn).call(this, operation.request, operation.options, addedItems).length) {
          throw new DOMException("???", "InvalidStateError");
        }
        let requestResponses;
        if (operation.type === "delete") {
          requestResponses = __privateMethod(this, _queryCache, queryCache_fn).call(this, operation.request, operation.options);
          if (requestResponses.length === 0) {
            return [];
          }
          for (const requestResponse of requestResponses) {
            const idx = cache2.indexOf(requestResponse);
            assert2(idx !== -1);
            cache2.splice(idx, 1);
          }
        } else if (operation.type === "put") {
          if (operation.response == null) {
            throw webidl.errors.exception({
              header: "Cache.#batchCacheOperations",
              message: "put operation should have an associated response"
            });
          }
          const r = operation.request;
          if (!urlIsHttpHttpsScheme(r.url)) {
            throw webidl.errors.exception({
              header: "Cache.#batchCacheOperations",
              message: "expected http or https scheme"
            });
          }
          if (r.method !== "GET") {
            throw webidl.errors.exception({
              header: "Cache.#batchCacheOperations",
              message: "not get method"
            });
          }
          if (operation.options != null) {
            throw webidl.errors.exception({
              header: "Cache.#batchCacheOperations",
              message: "options must not be defined"
            });
          }
          requestResponses = __privateMethod(this, _queryCache, queryCache_fn).call(this, operation.request);
          for (const requestResponse of requestResponses) {
            const idx = cache2.indexOf(requestResponse);
            assert2(idx !== -1);
            cache2.splice(idx, 1);
          }
          cache2.push([operation.request, operation.response]);
          addedItems.push([operation.request, operation.response]);
        }
        resultList.push([operation.request, operation.response]);
      }
      return resultList;
    } catch (e) {
      __privateGet(this, _relevantRequestResponseList).length = 0;
      __privateSet(this, _relevantRequestResponseList, backupCache);
      throw e;
    }
  };
  _queryCache = new WeakSet();
  queryCache_fn = function(requestQuery, options, targetStorage) {
    const resultList = [];
    const storage = targetStorage ?? __privateGet(this, _relevantRequestResponseList);
    for (const requestResponse of storage) {
      const [cachedRequest, cachedResponse] = requestResponse;
      if (__privateMethod(this, _requestMatchesCachedItem, requestMatchesCachedItem_fn).call(this, requestQuery, cachedRequest, cachedResponse, options)) {
        resultList.push(requestResponse);
      }
    }
    return resultList;
  };
  _requestMatchesCachedItem = new WeakSet();
  requestMatchesCachedItem_fn = function(requestQuery, request2, response2 = null, options) {
    const queryURL = new URL(requestQuery.url);
    const cachedURL = new URL(request2.url);
    if (options == null ? void 0 : options.ignoreSearch) {
      cachedURL.search = "";
      queryURL.search = "";
    }
    if (!urlEquals(queryURL, cachedURL, true)) {
      return false;
    }
    if (response2 == null || (options == null ? void 0 : options.ignoreVary) || !response2.headersList.contains("vary")) {
      return true;
    }
    const fieldValues = getFieldValues(response2.headersList.get("vary"));
    for (const fieldValue of fieldValues) {
      if (fieldValue === "*") {
        return false;
      }
      const requestValue = request2.headersList.get(fieldValue);
      const queryValue = requestQuery.headersList.get(fieldValue);
      if (requestValue !== queryValue) {
        return false;
      }
    }
    return true;
  };
  let Cache = _Cache;
  Object.defineProperties(Cache.prototype, {
    [Symbol.toStringTag]: {
      value: "Cache",
      configurable: true
    },
    match: kEnumerableProperty2,
    matchAll: kEnumerableProperty2,
    add: kEnumerableProperty2,
    addAll: kEnumerableProperty2,
    put: kEnumerableProperty2,
    delete: kEnumerableProperty2,
    keys: kEnumerableProperty2
  });
  const cacheQueryOptionConverters = [
    {
      key: "ignoreSearch",
      converter: webidl.converters.boolean,
      defaultValue: false
    },
    {
      key: "ignoreMethod",
      converter: webidl.converters.boolean,
      defaultValue: false
    },
    {
      key: "ignoreVary",
      converter: webidl.converters.boolean,
      defaultValue: false
    }
  ];
  webidl.converters.CacheQueryOptions = webidl.dictionaryConverter(cacheQueryOptionConverters);
  webidl.converters.MultiCacheQueryOptions = webidl.dictionaryConverter([
    ...cacheQueryOptionConverters,
    {
      key: "cacheName",
      converter: webidl.converters.DOMString
    }
  ]);
  webidl.converters.Response = webidl.interfaceConverter(Response);
  webidl.converters["sequence<RequestInfo>"] = webidl.sequenceConverter(
    webidl.converters.RequestInfo
  );
  cache = {
    Cache
  };
  return cache;
}
var cachestorage;
var hasRequiredCachestorage;
function requireCachestorage() {
  var _caches;
  if (hasRequiredCachestorage)
    return cachestorage;
  hasRequiredCachestorage = 1;
  const { kConstruct } = requireSymbols$1();
  const { Cache } = requireCache();
  const { webidl } = requireWebidl();
  const { kEnumerableProperty: kEnumerableProperty2 } = util$j;
  const _CacheStorage = class _CacheStorage {
    constructor() {
      /**
       * @see https://w3c.github.io/ServiceWorker/#dfn-relevant-name-to-cache-map
       * @type {Map<string, import('./cache').requestResponseList}
       */
      __privateAdd(this, _caches, /* @__PURE__ */ new Map());
      if (arguments[0] !== kConstruct) {
        webidl.illegalConstructor();
      }
    }
    async match(request2, options = {}) {
      webidl.brandCheck(this, _CacheStorage);
      webidl.argumentLengthCheck(arguments, 1, { header: "CacheStorage.match" });
      request2 = webidl.converters.RequestInfo(request2);
      options = webidl.converters.MultiCacheQueryOptions(options);
      if (options.cacheName != null) {
        if (__privateGet(this, _caches).has(options.cacheName)) {
          const cacheList = __privateGet(this, _caches).get(options.cacheName);
          const cache2 = new Cache(kConstruct, cacheList);
          return await cache2.match(request2, options);
        }
      } else {
        for (const cacheList of __privateGet(this, _caches).values()) {
          const cache2 = new Cache(kConstruct, cacheList);
          const response2 = await cache2.match(request2, options);
          if (response2 !== void 0) {
            return response2;
          }
        }
      }
    }
    /**
     * @see https://w3c.github.io/ServiceWorker/#cache-storage-has
     * @param {string} cacheName
     * @returns {Promise<boolean>}
     */
    async has(cacheName) {
      webidl.brandCheck(this, _CacheStorage);
      webidl.argumentLengthCheck(arguments, 1, { header: "CacheStorage.has" });
      cacheName = webidl.converters.DOMString(cacheName);
      return __privateGet(this, _caches).has(cacheName);
    }
    /**
     * @see https://w3c.github.io/ServiceWorker/#dom-cachestorage-open
     * @param {string} cacheName
     * @returns {Promise<Cache>}
     */
    async open(cacheName) {
      webidl.brandCheck(this, _CacheStorage);
      webidl.argumentLengthCheck(arguments, 1, { header: "CacheStorage.open" });
      cacheName = webidl.converters.DOMString(cacheName);
      if (__privateGet(this, _caches).has(cacheName)) {
        const cache3 = __privateGet(this, _caches).get(cacheName);
        return new Cache(kConstruct, cache3);
      }
      const cache2 = [];
      __privateGet(this, _caches).set(cacheName, cache2);
      return new Cache(kConstruct, cache2);
    }
    /**
     * @see https://w3c.github.io/ServiceWorker/#cache-storage-delete
     * @param {string} cacheName
     * @returns {Promise<boolean>}
     */
    async delete(cacheName) {
      webidl.brandCheck(this, _CacheStorage);
      webidl.argumentLengthCheck(arguments, 1, { header: "CacheStorage.delete" });
      cacheName = webidl.converters.DOMString(cacheName);
      return __privateGet(this, _caches).delete(cacheName);
    }
    /**
     * @see https://w3c.github.io/ServiceWorker/#cache-storage-keys
     * @returns {string[]}
     */
    async keys() {
      webidl.brandCheck(this, _CacheStorage);
      const keys = __privateGet(this, _caches).keys();
      return [...keys];
    }
  };
  _caches = new WeakMap();
  let CacheStorage = _CacheStorage;
  Object.defineProperties(CacheStorage.prototype, {
    [Symbol.toStringTag]: {
      value: "CacheStorage",
      configurable: true
    },
    match: kEnumerableProperty2,
    has: kEnumerableProperty2,
    open: kEnumerableProperty2,
    delete: kEnumerableProperty2,
    keys: kEnumerableProperty2
  });
  cachestorage = {
    CacheStorage
  };
  return cachestorage;
}
var constants$1;
var hasRequiredConstants$1;
function requireConstants$1() {
  if (hasRequiredConstants$1)
    return constants$1;
  hasRequiredConstants$1 = 1;
  const maxAttributeValueSize = 1024;
  const maxNameValuePairSize = 4096;
  constants$1 = {
    maxAttributeValueSize,
    maxNameValuePairSize
  };
  return constants$1;
}
var util$2;
var hasRequiredUtil$1;
function requireUtil$1() {
  if (hasRequiredUtil$1)
    return util$2;
  hasRequiredUtil$1 = 1;
  const assert2 = require$$0$3;
  const { kHeadersList } = symbols$4;
  function isCTLExcludingHtab(value) {
    if (value.length === 0) {
      return false;
    }
    for (const char of value) {
      const code = char.charCodeAt(0);
      if (code >= 0 || code <= 8 || (code >= 10 || code <= 31) || code === 127) {
        return false;
      }
    }
  }
  function validateCookieName(name) {
    for (const char of name) {
      const code = char.charCodeAt(0);
      if (code <= 32 || code > 127 || char === "(" || char === ")" || char === ">" || char === "<" || char === "@" || char === "," || char === ";" || char === ":" || char === "\\" || char === '"' || char === "/" || char === "[" || char === "]" || char === "?" || char === "=" || char === "{" || char === "}") {
        throw new Error("Invalid cookie name");
      }
    }
  }
  function validateCookieValue(value) {
    for (const char of value) {
      const code = char.charCodeAt(0);
      if (code < 33 || // exclude CTLs (0-31)
      code === 34 || code === 44 || code === 59 || code === 92 || code > 126) {
        throw new Error("Invalid header value");
      }
    }
  }
  function validateCookiePath(path2) {
    for (const char of path2) {
      const code = char.charCodeAt(0);
      if (code < 33 || char === ";") {
        throw new Error("Invalid cookie path");
      }
    }
  }
  function validateCookieDomain(domain) {
    if (domain.startsWith("-") || domain.endsWith(".") || domain.endsWith("-")) {
      throw new Error("Invalid cookie domain");
    }
  }
  function toIMFDate(date) {
    if (typeof date === "number") {
      date = new Date(date);
    }
    const days = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const dayName = days[date.getUTCDay()];
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    const hour = date.getUTCHours().toString().padStart(2, "0");
    const minute = date.getUTCMinutes().toString().padStart(2, "0");
    const second = date.getUTCSeconds().toString().padStart(2, "0");
    return `${dayName}, ${day} ${month} ${year} ${hour}:${minute}:${second} GMT`;
  }
  function validateCookieMaxAge(maxAge) {
    if (maxAge < 0) {
      throw new Error("Invalid cookie max-age");
    }
  }
  function stringify2(cookie) {
    if (cookie.name.length === 0) {
      return null;
    }
    validateCookieName(cookie.name);
    validateCookieValue(cookie.value);
    const out = [`${cookie.name}=${cookie.value}`];
    if (cookie.name.startsWith("__Secure-")) {
      cookie.secure = true;
    }
    if (cookie.name.startsWith("__Host-")) {
      cookie.secure = true;
      cookie.domain = null;
      cookie.path = "/";
    }
    if (cookie.secure) {
      out.push("Secure");
    }
    if (cookie.httpOnly) {
      out.push("HttpOnly");
    }
    if (typeof cookie.maxAge === "number") {
      validateCookieMaxAge(cookie.maxAge);
      out.push(`Max-Age=${cookie.maxAge}`);
    }
    if (cookie.domain) {
      validateCookieDomain(cookie.domain);
      out.push(`Domain=${cookie.domain}`);
    }
    if (cookie.path) {
      validateCookiePath(cookie.path);
      out.push(`Path=${cookie.path}`);
    }
    if (cookie.expires && cookie.expires.toString() !== "Invalid Date") {
      out.push(`Expires=${toIMFDate(cookie.expires)}`);
    }
    if (cookie.sameSite) {
      out.push(`SameSite=${cookie.sameSite}`);
    }
    for (const part of cookie.unparsed) {
      if (!part.includes("=")) {
        throw new Error("Invalid unparsed");
      }
      const [key, ...value] = part.split("=");
      out.push(`${key.trim()}=${value.join("=")}`);
    }
    return out.join("; ");
  }
  let kHeadersListNode;
  function getHeadersList(headers2) {
    if (headers2[kHeadersList]) {
      return headers2[kHeadersList];
    }
    if (!kHeadersListNode) {
      kHeadersListNode = Object.getOwnPropertySymbols(headers2).find(
        (symbol) => symbol.description === "headers list"
      );
      assert2(kHeadersListNode, "Headers cannot be parsed");
    }
    const headersList = headers2[kHeadersListNode];
    assert2(headersList);
    return headersList;
  }
  util$2 = {
    isCTLExcludingHtab,
    stringify: stringify2,
    getHeadersList
  };
  return util$2;
}
var parse;
var hasRequiredParse;
function requireParse() {
  if (hasRequiredParse)
    return parse;
  hasRequiredParse = 1;
  const { maxNameValuePairSize, maxAttributeValueSize } = requireConstants$1();
  const { isCTLExcludingHtab } = requireUtil$1();
  const { collectASequenceOfCodePointsFast } = requireDataURL();
  const assert2 = require$$0$3;
  function parseSetCookie(header) {
    if (isCTLExcludingHtab(header)) {
      return null;
    }
    let nameValuePair = "";
    let unparsedAttributes = "";
    let name = "";
    let value = "";
    if (header.includes(";")) {
      const position = { position: 0 };
      nameValuePair = collectASequenceOfCodePointsFast(";", header, position);
      unparsedAttributes = header.slice(position.position);
    } else {
      nameValuePair = header;
    }
    if (!nameValuePair.includes("=")) {
      value = nameValuePair;
    } else {
      const position = { position: 0 };
      name = collectASequenceOfCodePointsFast(
        "=",
        nameValuePair,
        position
      );
      value = nameValuePair.slice(position.position + 1);
    }
    name = name.trim();
    value = value.trim();
    if (name.length + value.length > maxNameValuePairSize) {
      return null;
    }
    return {
      name,
      value,
      ...parseUnparsedAttributes(unparsedAttributes)
    };
  }
  function parseUnparsedAttributes(unparsedAttributes, cookieAttributeList = {}) {
    if (unparsedAttributes.length === 0) {
      return cookieAttributeList;
    }
    assert2(unparsedAttributes[0] === ";");
    unparsedAttributes = unparsedAttributes.slice(1);
    let cookieAv = "";
    if (unparsedAttributes.includes(";")) {
      cookieAv = collectASequenceOfCodePointsFast(
        ";",
        unparsedAttributes,
        { position: 0 }
      );
      unparsedAttributes = unparsedAttributes.slice(cookieAv.length);
    } else {
      cookieAv = unparsedAttributes;
      unparsedAttributes = "";
    }
    let attributeName = "";
    let attributeValue = "";
    if (cookieAv.includes("=")) {
      const position = { position: 0 };
      attributeName = collectASequenceOfCodePointsFast(
        "=",
        cookieAv,
        position
      );
      attributeValue = cookieAv.slice(position.position + 1);
    } else {
      attributeName = cookieAv;
    }
    attributeName = attributeName.trim();
    attributeValue = attributeValue.trim();
    if (attributeValue.length > maxAttributeValueSize) {
      return parseUnparsedAttributes(unparsedAttributes, cookieAttributeList);
    }
    const attributeNameLowercase = attributeName.toLowerCase();
    if (attributeNameLowercase === "expires") {
      const expiryTime = new Date(attributeValue);
      cookieAttributeList.expires = expiryTime;
    } else if (attributeNameLowercase === "max-age") {
      const charCode = attributeValue.charCodeAt(0);
      if ((charCode < 48 || charCode > 57) && attributeValue[0] !== "-") {
        return parseUnparsedAttributes(unparsedAttributes, cookieAttributeList);
      }
      if (!/^\d+$/.test(attributeValue)) {
        return parseUnparsedAttributes(unparsedAttributes, cookieAttributeList);
      }
      const deltaSeconds = Number(attributeValue);
      cookieAttributeList.maxAge = deltaSeconds;
    } else if (attributeNameLowercase === "domain") {
      let cookieDomain = attributeValue;
      if (cookieDomain[0] === ".") {
        cookieDomain = cookieDomain.slice(1);
      }
      cookieDomain = cookieDomain.toLowerCase();
      cookieAttributeList.domain = cookieDomain;
    } else if (attributeNameLowercase === "path") {
      let cookiePath = "";
      if (attributeValue.length === 0 || attributeValue[0] !== "/") {
        cookiePath = "/";
      } else {
        cookiePath = attributeValue;
      }
      cookieAttributeList.path = cookiePath;
    } else if (attributeNameLowercase === "secure") {
      cookieAttributeList.secure = true;
    } else if (attributeNameLowercase === "httponly") {
      cookieAttributeList.httpOnly = true;
    } else if (attributeNameLowercase === "samesite") {
      let enforcement = "Default";
      const attributeValueLowercase = attributeValue.toLowerCase();
      if (attributeValueLowercase.includes("none")) {
        enforcement = "None";
      }
      if (attributeValueLowercase.includes("strict")) {
        enforcement = "Strict";
      }
      if (attributeValueLowercase.includes("lax")) {
        enforcement = "Lax";
      }
      cookieAttributeList.sameSite = enforcement;
    } else {
      cookieAttributeList.unparsed ?? (cookieAttributeList.unparsed = []);
      cookieAttributeList.unparsed.push(`${attributeName}=${attributeValue}`);
    }
    return parseUnparsedAttributes(unparsedAttributes, cookieAttributeList);
  }
  parse = {
    parseSetCookie,
    parseUnparsedAttributes
  };
  return parse;
}
var cookies;
var hasRequiredCookies;
function requireCookies() {
  if (hasRequiredCookies)
    return cookies;
  hasRequiredCookies = 1;
  const { parseSetCookie } = requireParse();
  const { stringify: stringify2, getHeadersList } = requireUtil$1();
  const { webidl } = requireWebidl();
  const { Headers: Headers2 } = requireHeaders();
  function getCookies(headers2) {
    webidl.argumentLengthCheck(arguments, 1, { header: "getCookies" });
    webidl.brandCheck(headers2, Headers2, { strict: false });
    const cookie = headers2.get("cookie");
    const out = {};
    if (!cookie) {
      return out;
    }
    for (const piece of cookie.split(";")) {
      const [name, ...value] = piece.split("=");
      out[name.trim()] = value.join("=");
    }
    return out;
  }
  function deleteCookie(headers2, name, attributes) {
    webidl.argumentLengthCheck(arguments, 2, { header: "deleteCookie" });
    webidl.brandCheck(headers2, Headers2, { strict: false });
    name = webidl.converters.DOMString(name);
    attributes = webidl.converters.DeleteCookieAttributes(attributes);
    setCookie(headers2, {
      name,
      value: "",
      expires: /* @__PURE__ */ new Date(0),
      ...attributes
    });
  }
  function getSetCookies(headers2) {
    webidl.argumentLengthCheck(arguments, 1, { header: "getSetCookies" });
    webidl.brandCheck(headers2, Headers2, { strict: false });
    const cookies2 = getHeadersList(headers2).cookies;
    if (!cookies2) {
      return [];
    }
    return cookies2.map((pair) => parseSetCookie(Array.isArray(pair) ? pair[1] : pair));
  }
  function setCookie(headers2, cookie) {
    webidl.argumentLengthCheck(arguments, 2, { header: "setCookie" });
    webidl.brandCheck(headers2, Headers2, { strict: false });
    cookie = webidl.converters.Cookie(cookie);
    const str = stringify2(cookie);
    if (str) {
      headers2.append("Set-Cookie", stringify2(cookie));
    }
  }
  webidl.converters.DeleteCookieAttributes = webidl.dictionaryConverter([
    {
      converter: webidl.nullableConverter(webidl.converters.DOMString),
      key: "path",
      defaultValue: null
    },
    {
      converter: webidl.nullableConverter(webidl.converters.DOMString),
      key: "domain",
      defaultValue: null
    }
  ]);
  webidl.converters.Cookie = webidl.dictionaryConverter([
    {
      converter: webidl.converters.DOMString,
      key: "name"
    },
    {
      converter: webidl.converters.DOMString,
      key: "value"
    },
    {
      converter: webidl.nullableConverter((value) => {
        if (typeof value === "number") {
          return webidl.converters["unsigned long long"](value);
        }
        return new Date(value);
      }),
      key: "expires",
      defaultValue: null
    },
    {
      converter: webidl.nullableConverter(webidl.converters["long long"]),
      key: "maxAge",
      defaultValue: null
    },
    {
      converter: webidl.nullableConverter(webidl.converters.DOMString),
      key: "domain",
      defaultValue: null
    },
    {
      converter: webidl.nullableConverter(webidl.converters.DOMString),
      key: "path",
      defaultValue: null
    },
    {
      converter: webidl.nullableConverter(webidl.converters.boolean),
      key: "secure",
      defaultValue: null
    },
    {
      converter: webidl.nullableConverter(webidl.converters.boolean),
      key: "httpOnly",
      defaultValue: null
    },
    {
      converter: webidl.converters.USVString,
      key: "sameSite",
      allowedValues: ["Strict", "Lax", "None"]
    },
    {
      converter: webidl.sequenceConverter(webidl.converters.DOMString),
      key: "unparsed",
      defaultValue: []
    }
  ]);
  cookies = {
    getCookies,
    deleteCookie,
    getSetCookies,
    setCookie
  };
  return cookies;
}
var constants;
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants)
    return constants;
  hasRequiredConstants = 1;
  const uid = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
  const staticPropertyDescriptors = {
    enumerable: true,
    writable: false,
    configurable: false
  };
  const states = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3
  };
  const opcodes = {
    CONTINUATION: 0,
    TEXT: 1,
    BINARY: 2,
    CLOSE: 8,
    PING: 9,
    PONG: 10
  };
  const maxUnsigned16Bit = 2 ** 16 - 1;
  const parserStates = {
    INFO: 0,
    PAYLOADLENGTH_16: 2,
    PAYLOADLENGTH_64: 3,
    READ_DATA: 4
  };
  const emptyBuffer = Buffer.allocUnsafe(0);
  constants = {
    uid,
    staticPropertyDescriptors,
    states,
    opcodes,
    maxUnsigned16Bit,
    parserStates,
    emptyBuffer
  };
  return constants;
}
var symbols;
var hasRequiredSymbols;
function requireSymbols() {
  if (hasRequiredSymbols)
    return symbols;
  hasRequiredSymbols = 1;
  symbols = {
    kWebSocketURL: Symbol("url"),
    kReadyState: Symbol("ready state"),
    kController: Symbol("controller"),
    kResponse: Symbol("response"),
    kBinaryType: Symbol("binary type"),
    kSentClose: Symbol("sent close"),
    kReceivedClose: Symbol("received close"),
    kByteParser: Symbol("byte parser")
  };
  return symbols;
}
var events;
var hasRequiredEvents;
function requireEvents() {
  var _eventInit, _eventInit2, _eventInit3;
  if (hasRequiredEvents)
    return events;
  hasRequiredEvents = 1;
  const { webidl } = requireWebidl();
  const { kEnumerableProperty: kEnumerableProperty2 } = util$j;
  const { MessagePort } = require$$0$8;
  const _MessageEvent = class _MessageEvent extends Event {
    constructor(type, eventInitDict = {}) {
      webidl.argumentLengthCheck(arguments, 1, { header: "MessageEvent constructor" });
      type = webidl.converters.DOMString(type);
      eventInitDict = webidl.converters.MessageEventInit(eventInitDict);
      super(type, eventInitDict);
      __privateAdd(this, _eventInit, void 0);
      __privateSet(this, _eventInit, eventInitDict);
    }
    get data() {
      webidl.brandCheck(this, _MessageEvent);
      return __privateGet(this, _eventInit).data;
    }
    get origin() {
      webidl.brandCheck(this, _MessageEvent);
      return __privateGet(this, _eventInit).origin;
    }
    get lastEventId() {
      webidl.brandCheck(this, _MessageEvent);
      return __privateGet(this, _eventInit).lastEventId;
    }
    get source() {
      webidl.brandCheck(this, _MessageEvent);
      return __privateGet(this, _eventInit).source;
    }
    get ports() {
      webidl.brandCheck(this, _MessageEvent);
      if (!Object.isFrozen(__privateGet(this, _eventInit).ports)) {
        Object.freeze(__privateGet(this, _eventInit).ports);
      }
      return __privateGet(this, _eventInit).ports;
    }
    initMessageEvent(type, bubbles = false, cancelable = false, data = null, origin = "", lastEventId = "", source = null, ports = []) {
      webidl.brandCheck(this, _MessageEvent);
      webidl.argumentLengthCheck(arguments, 1, { header: "MessageEvent.initMessageEvent" });
      return new _MessageEvent(type, {
        bubbles,
        cancelable,
        data,
        origin,
        lastEventId,
        source,
        ports
      });
    }
  };
  _eventInit = new WeakMap();
  let MessageEvent = _MessageEvent;
  const _CloseEvent = class _CloseEvent extends Event {
    constructor(type, eventInitDict = {}) {
      webidl.argumentLengthCheck(arguments, 1, { header: "CloseEvent constructor" });
      type = webidl.converters.DOMString(type);
      eventInitDict = webidl.converters.CloseEventInit(eventInitDict);
      super(type, eventInitDict);
      __privateAdd(this, _eventInit2, void 0);
      __privateSet(this, _eventInit2, eventInitDict);
    }
    get wasClean() {
      webidl.brandCheck(this, _CloseEvent);
      return __privateGet(this, _eventInit2).wasClean;
    }
    get code() {
      webidl.brandCheck(this, _CloseEvent);
      return __privateGet(this, _eventInit2).code;
    }
    get reason() {
      webidl.brandCheck(this, _CloseEvent);
      return __privateGet(this, _eventInit2).reason;
    }
  };
  _eventInit2 = new WeakMap();
  let CloseEvent = _CloseEvent;
  const _ErrorEvent = class _ErrorEvent extends Event {
    constructor(type, eventInitDict) {
      webidl.argumentLengthCheck(arguments, 1, { header: "ErrorEvent constructor" });
      super(type, eventInitDict);
      __privateAdd(this, _eventInit3, void 0);
      type = webidl.converters.DOMString(type);
      eventInitDict = webidl.converters.ErrorEventInit(eventInitDict ?? {});
      __privateSet(this, _eventInit3, eventInitDict);
    }
    get message() {
      webidl.brandCheck(this, _ErrorEvent);
      return __privateGet(this, _eventInit3).message;
    }
    get filename() {
      webidl.brandCheck(this, _ErrorEvent);
      return __privateGet(this, _eventInit3).filename;
    }
    get lineno() {
      webidl.brandCheck(this, _ErrorEvent);
      return __privateGet(this, _eventInit3).lineno;
    }
    get colno() {
      webidl.brandCheck(this, _ErrorEvent);
      return __privateGet(this, _eventInit3).colno;
    }
    get error() {
      webidl.brandCheck(this, _ErrorEvent);
      return __privateGet(this, _eventInit3).error;
    }
  };
  _eventInit3 = new WeakMap();
  let ErrorEvent = _ErrorEvent;
  Object.defineProperties(MessageEvent.prototype, {
    [Symbol.toStringTag]: {
      value: "MessageEvent",
      configurable: true
    },
    data: kEnumerableProperty2,
    origin: kEnumerableProperty2,
    lastEventId: kEnumerableProperty2,
    source: kEnumerableProperty2,
    ports: kEnumerableProperty2,
    initMessageEvent: kEnumerableProperty2
  });
  Object.defineProperties(CloseEvent.prototype, {
    [Symbol.toStringTag]: {
      value: "CloseEvent",
      configurable: true
    },
    reason: kEnumerableProperty2,
    code: kEnumerableProperty2,
    wasClean: kEnumerableProperty2
  });
  Object.defineProperties(ErrorEvent.prototype, {
    [Symbol.toStringTag]: {
      value: "ErrorEvent",
      configurable: true
    },
    message: kEnumerableProperty2,
    filename: kEnumerableProperty2,
    lineno: kEnumerableProperty2,
    colno: kEnumerableProperty2,
    error: kEnumerableProperty2
  });
  webidl.converters.MessagePort = webidl.interfaceConverter(MessagePort);
  webidl.converters["sequence<MessagePort>"] = webidl.sequenceConverter(
    webidl.converters.MessagePort
  );
  const eventInit = [
    {
      key: "bubbles",
      converter: webidl.converters.boolean,
      defaultValue: false
    },
    {
      key: "cancelable",
      converter: webidl.converters.boolean,
      defaultValue: false
    },
    {
      key: "composed",
      converter: webidl.converters.boolean,
      defaultValue: false
    }
  ];
  webidl.converters.MessageEventInit = webidl.dictionaryConverter([
    ...eventInit,
    {
      key: "data",
      converter: webidl.converters.any,
      defaultValue: null
    },
    {
      key: "origin",
      converter: webidl.converters.USVString,
      defaultValue: ""
    },
    {
      key: "lastEventId",
      converter: webidl.converters.DOMString,
      defaultValue: ""
    },
    {
      key: "source",
      // Node doesn't implement WindowProxy or ServiceWorker, so the only
      // valid value for source is a MessagePort.
      converter: webidl.nullableConverter(webidl.converters.MessagePort),
      defaultValue: null
    },
    {
      key: "ports",
      converter: webidl.converters["sequence<MessagePort>"],
      get defaultValue() {
        return [];
      }
    }
  ]);
  webidl.converters.CloseEventInit = webidl.dictionaryConverter([
    ...eventInit,
    {
      key: "wasClean",
      converter: webidl.converters.boolean,
      defaultValue: false
    },
    {
      key: "code",
      converter: webidl.converters["unsigned short"],
      defaultValue: 0
    },
    {
      key: "reason",
      converter: webidl.converters.USVString,
      defaultValue: ""
    }
  ]);
  webidl.converters.ErrorEventInit = webidl.dictionaryConverter([
    ...eventInit,
    {
      key: "message",
      converter: webidl.converters.DOMString,
      defaultValue: ""
    },
    {
      key: "filename",
      converter: webidl.converters.USVString,
      defaultValue: ""
    },
    {
      key: "lineno",
      converter: webidl.converters["unsigned long"],
      defaultValue: 0
    },
    {
      key: "colno",
      converter: webidl.converters["unsigned long"],
      defaultValue: 0
    },
    {
      key: "error",
      converter: webidl.converters.any
    }
  ]);
  events = {
    MessageEvent,
    CloseEvent,
    ErrorEvent
  };
  return events;
}
var util$1;
var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil)
    return util$1;
  hasRequiredUtil = 1;
  const { kReadyState, kController, kResponse, kBinaryType, kWebSocketURL } = requireSymbols();
  const { states, opcodes } = requireConstants();
  const { MessageEvent, ErrorEvent } = requireEvents();
  function isEstablished(ws) {
    return ws[kReadyState] === states.OPEN;
  }
  function isClosing(ws) {
    return ws[kReadyState] === states.CLOSING;
  }
  function isClosed(ws) {
    return ws[kReadyState] === states.CLOSED;
  }
  function fireEvent(e, target, eventConstructor = Event, eventInitDict) {
    const event = new eventConstructor(e, eventInitDict);
    target.dispatchEvent(event);
  }
  function websocketMessageReceived(ws, type, data) {
    if (ws[kReadyState] !== states.OPEN) {
      return;
    }
    let dataForEvent;
    if (type === opcodes.TEXT) {
      try {
        dataForEvent = new TextDecoder("utf-8", { fatal: true }).decode(data);
      } catch {
        failWebsocketConnection(ws, "Received invalid UTF-8 in text frame.");
        return;
      }
    } else if (type === opcodes.BINARY) {
      if (ws[kBinaryType] === "blob") {
        dataForEvent = new Blob([data]);
      } else {
        dataForEvent = new Uint8Array(data).buffer;
      }
    }
    fireEvent("message", ws, MessageEvent, {
      origin: ws[kWebSocketURL].origin,
      data: dataForEvent
    });
  }
  function isValidSubprotocol(protocol) {
    if (protocol.length === 0) {
      return false;
    }
    for (const char of protocol) {
      const code = char.charCodeAt(0);
      if (code < 33 || code > 126 || char === "(" || char === ")" || char === "<" || char === ">" || char === "@" || char === "," || char === ";" || char === ":" || char === "\\" || char === '"' || char === "/" || char === "[" || char === "]" || char === "?" || char === "=" || char === "{" || char === "}" || code === 32 || // SP
      code === 9) {
        return false;
      }
    }
    return true;
  }
  function isValidStatusCode(code) {
    if (code >= 1e3 && code < 1015) {
      return code !== 1004 && // reserved
      code !== 1005 && // "MUST NOT be set as a status code"
      code !== 1006;
    }
    return code >= 3e3 && code <= 4999;
  }
  function failWebsocketConnection(ws, reason) {
    const { [kController]: controller, [kResponse]: response2 } = ws;
    controller.abort();
    if ((response2 == null ? void 0 : response2.socket) && !response2.socket.destroyed) {
      response2.socket.destroy();
    }
    if (reason) {
      fireEvent("error", ws, ErrorEvent, {
        error: new Error(reason)
      });
    }
  }
  util$1 = {
    isEstablished,
    isClosing,
    isClosed,
    fireEvent,
    isValidSubprotocol,
    isValidStatusCode,
    failWebsocketConnection,
    websocketMessageReceived
  };
  return util$1;
}
var connection;
var hasRequiredConnection;
function requireConnection() {
  if (hasRequiredConnection)
    return connection;
  hasRequiredConnection = 1;
  const diagnosticsChannel = require$$0$9;
  const { uid, states } = requireConstants();
  const {
    kReadyState,
    kSentClose,
    kByteParser,
    kReceivedClose
  } = requireSymbols();
  const { fireEvent, failWebsocketConnection } = requireUtil();
  const { CloseEvent } = requireEvents();
  const { makeRequest } = requireRequest();
  const { fetching } = requireFetch();
  const { Headers: Headers2 } = requireHeaders();
  const { getGlobalDispatcher: getGlobalDispatcher2 } = global$1;
  const { kHeadersList } = symbols$4;
  const channels2 = {};
  channels2.open = diagnosticsChannel.channel("undici:websocket:open");
  channels2.close = diagnosticsChannel.channel("undici:websocket:close");
  channels2.socketError = diagnosticsChannel.channel("undici:websocket:socket_error");
  let crypto2;
  try {
    crypto2 = require("crypto");
  } catch {
  }
  function establishWebSocketConnection(url, protocols, ws, onEstablish, options) {
    const requestURL = url;
    requestURL.protocol = url.protocol === "ws:" ? "http:" : "https:";
    const request2 = makeRequest({
      urlList: [requestURL],
      serviceWorkers: "none",
      referrer: "no-referrer",
      mode: "websocket",
      credentials: "include",
      cache: "no-store",
      redirect: "error"
    });
    if (options.headers) {
      const headersList = new Headers2(options.headers)[kHeadersList];
      request2.headersList = headersList;
    }
    const keyValue = crypto2.randomBytes(16).toString("base64");
    request2.headersList.append("sec-websocket-key", keyValue);
    request2.headersList.append("sec-websocket-version", "13");
    for (const protocol of protocols) {
      request2.headersList.append("sec-websocket-protocol", protocol);
    }
    const permessageDeflate = "";
    const controller = fetching({
      request: request2,
      useParallelQueue: true,
      dispatcher: options.dispatcher ?? getGlobalDispatcher2(),
      processResponse(response2) {
        var _a, _b;
        if (response2.type === "error" || response2.status !== 101) {
          failWebsocketConnection(ws, "Received network error or non-101 status code.");
          return;
        }
        if (protocols.length !== 0 && !response2.headersList.get("Sec-WebSocket-Protocol")) {
          failWebsocketConnection(ws, "Server did not respond with sent protocols.");
          return;
        }
        if (((_a = response2.headersList.get("Upgrade")) == null ? void 0 : _a.toLowerCase()) !== "websocket") {
          failWebsocketConnection(ws, 'Server did not set Upgrade header to "websocket".');
          return;
        }
        if (((_b = response2.headersList.get("Connection")) == null ? void 0 : _b.toLowerCase()) !== "upgrade") {
          failWebsocketConnection(ws, 'Server did not set Connection header to "upgrade".');
          return;
        }
        const secWSAccept = response2.headersList.get("Sec-WebSocket-Accept");
        const digest = crypto2.createHash("sha1").update(keyValue + uid).digest("base64");
        if (secWSAccept !== digest) {
          failWebsocketConnection(ws, "Incorrect hash received in Sec-WebSocket-Accept header.");
          return;
        }
        const secExtension = response2.headersList.get("Sec-WebSocket-Extensions");
        if (secExtension !== null && secExtension !== permessageDeflate) {
          failWebsocketConnection(ws, "Received different permessage-deflate than the one set.");
          return;
        }
        const secProtocol = response2.headersList.get("Sec-WebSocket-Protocol");
        if (secProtocol !== null && secProtocol !== request2.headersList.get("Sec-WebSocket-Protocol")) {
          failWebsocketConnection(ws, "Protocol was not set in the opening handshake.");
          return;
        }
        response2.socket.on("data", onSocketData);
        response2.socket.on("close", onSocketClose2);
        response2.socket.on("error", onSocketError2);
        if (channels2.open.hasSubscribers) {
          channels2.open.publish({
            address: response2.socket.address(),
            protocol: secProtocol,
            extensions: secExtension
          });
        }
        onEstablish(response2);
      }
    });
    return controller;
  }
  function onSocketData(chunk) {
    if (!this.ws[kByteParser].write(chunk)) {
      this.pause();
    }
  }
  function onSocketClose2() {
    const { ws } = this;
    const wasClean = ws[kSentClose] && ws[kReceivedClose];
    let code = 1005;
    let reason = "";
    const result = ws[kByteParser].closingInfo;
    if (result) {
      code = result.code ?? 1005;
      reason = result.reason;
    } else if (!ws[kSentClose]) {
      code = 1006;
    }
    ws[kReadyState] = states.CLOSED;
    fireEvent("close", ws, CloseEvent, {
      wasClean,
      code,
      reason
    });
    if (channels2.close.hasSubscribers) {
      channels2.close.publish({
        websocket: ws,
        code,
        reason
      });
    }
  }
  function onSocketError2(error) {
    const { ws } = this;
    ws[kReadyState] = states.CLOSING;
    if (channels2.socketError.hasSubscribers) {
      channels2.socketError.publish(error);
    }
    this.destroy();
  }
  connection = {
    establishWebSocketConnection
  };
  return connection;
}
var frame;
var hasRequiredFrame;
function requireFrame() {
  if (hasRequiredFrame)
    return frame;
  hasRequiredFrame = 1;
  const { maxUnsigned16Bit } = requireConstants();
  let crypto2;
  try {
    crypto2 = require("crypto");
  } catch {
  }
  class WebsocketFrameSend {
    /**
     * @param {Buffer|undefined} data
     */
    constructor(data) {
      this.frameData = data;
      this.maskKey = crypto2.randomBytes(4);
    }
    createFrame(opcode) {
      var _a;
      const bodyLength2 = ((_a = this.frameData) == null ? void 0 : _a.byteLength) ?? 0;
      let payloadLength = bodyLength2;
      let offset = 6;
      if (bodyLength2 > maxUnsigned16Bit) {
        offset += 8;
        payloadLength = 127;
      } else if (bodyLength2 > 125) {
        offset += 2;
        payloadLength = 126;
      }
      const buffer = Buffer.allocUnsafe(bodyLength2 + offset);
      buffer[0] = buffer[1] = 0;
      buffer[0] |= 128;
      buffer[0] = (buffer[0] & 240) + opcode;
      /*! ws. MIT License. Einar Otto Stangvik <einaros@gmail.com> */
      buffer[offset - 4] = this.maskKey[0];
      buffer[offset - 3] = this.maskKey[1];
      buffer[offset - 2] = this.maskKey[2];
      buffer[offset - 1] = this.maskKey[3];
      buffer[1] = payloadLength;
      if (payloadLength === 126) {
        buffer.writeUInt16BE(bodyLength2, 2);
      } else if (payloadLength === 127) {
        buffer[2] = buffer[3] = 0;
        buffer.writeUIntBE(bodyLength2, 4, 6);
      }
      buffer[1] |= 128;
      for (let i = 0; i < bodyLength2; i++) {
        buffer[offset + i] = this.frameData[i] ^ this.maskKey[i % 4];
      }
      return buffer;
    }
  }
  frame = {
    WebsocketFrameSend
  };
  return frame;
}
var receiver;
var hasRequiredReceiver;
function requireReceiver() {
  var _buffers, _byteOffset, _state, _info, _fragments;
  if (hasRequiredReceiver)
    return receiver;
  hasRequiredReceiver = 1;
  const { Writable } = require$$0$4;
  const diagnosticsChannel = require$$0$9;
  const { parserStates, opcodes, states, emptyBuffer } = requireConstants();
  const { kReadyState, kSentClose, kResponse, kReceivedClose } = requireSymbols();
  const { isValidStatusCode, failWebsocketConnection, websocketMessageReceived } = requireUtil();
  const { WebsocketFrameSend } = requireFrame();
  const channels2 = {};
  channels2.ping = diagnosticsChannel.channel("undici:websocket:ping");
  channels2.pong = diagnosticsChannel.channel("undici:websocket:pong");
  class ByteParser extends Writable {
    constructor(ws) {
      super();
      __privateAdd(this, _buffers, []);
      __privateAdd(this, _byteOffset, 0);
      __privateAdd(this, _state, parserStates.INFO);
      __privateAdd(this, _info, {});
      __privateAdd(this, _fragments, []);
      this.ws = ws;
    }
    /**
     * @param {Buffer} chunk
     * @param {() => void} callback
     */
    _write(chunk, _, callback) {
      __privateGet(this, _buffers).push(chunk);
      __privateSet(this, _byteOffset, __privateGet(this, _byteOffset) + chunk.length);
      this.run(callback);
    }
    /**
     * Runs whenever a new chunk is received.
     * Callback is called whenever there are no more chunks buffering,
     * or not enough bytes are buffered to parse.
     */
    run(callback) {
      var _a;
      while (true) {
        if (__privateGet(this, _state) === parserStates.INFO) {
          if (__privateGet(this, _byteOffset) < 2) {
            return callback();
          }
          const buffer = this.consume(2);
          __privateGet(this, _info).fin = (buffer[0] & 128) !== 0;
          __privateGet(this, _info).opcode = buffer[0] & 15;
          (_a = __privateGet(this, _info)).originalOpcode ?? (_a.originalOpcode = __privateGet(this, _info).opcode);
          __privateGet(this, _info).fragmented = !__privateGet(this, _info).fin && __privateGet(this, _info).opcode !== opcodes.CONTINUATION;
          if (__privateGet(this, _info).fragmented && __privateGet(this, _info).opcode !== opcodes.BINARY && __privateGet(this, _info).opcode !== opcodes.TEXT) {
            failWebsocketConnection(this.ws, "Invalid frame type was fragmented.");
            return;
          }
          const payloadLength = buffer[1] & 127;
          if (payloadLength <= 125) {
            __privateGet(this, _info).payloadLength = payloadLength;
            __privateSet(this, _state, parserStates.READ_DATA);
          } else if (payloadLength === 126) {
            __privateSet(this, _state, parserStates.PAYLOADLENGTH_16);
          } else if (payloadLength === 127) {
            __privateSet(this, _state, parserStates.PAYLOADLENGTH_64);
          }
          if (__privateGet(this, _info).fragmented && payloadLength > 125) {
            failWebsocketConnection(this.ws, "Fragmented frame exceeded 125 bytes.");
            return;
          } else if ((__privateGet(this, _info).opcode === opcodes.PING || __privateGet(this, _info).opcode === opcodes.PONG || __privateGet(this, _info).opcode === opcodes.CLOSE) && payloadLength > 125) {
            failWebsocketConnection(this.ws, "Payload length for control frame exceeded 125 bytes.");
            return;
          } else if (__privateGet(this, _info).opcode === opcodes.CLOSE) {
            if (payloadLength === 1) {
              failWebsocketConnection(this.ws, "Received close frame with a 1-byte body.");
              return;
            }
            const body2 = this.consume(payloadLength);
            __privateGet(this, _info).closeInfo = this.parseCloseBody(false, body2);
            if (!this.ws[kSentClose]) {
              const body3 = Buffer.allocUnsafe(2);
              body3.writeUInt16BE(__privateGet(this, _info).closeInfo.code, 0);
              const closeFrame = new WebsocketFrameSend(body3);
              this.ws[kResponse].socket.write(
                closeFrame.createFrame(opcodes.CLOSE),
                (err) => {
                  if (!err) {
                    this.ws[kSentClose] = true;
                  }
                }
              );
            }
            this.ws[kReadyState] = states.CLOSING;
            this.ws[kReceivedClose] = true;
            this.end();
            return;
          } else if (__privateGet(this, _info).opcode === opcodes.PING) {
            const body2 = this.consume(payloadLength);
            if (!this.ws[kReceivedClose]) {
              const frame2 = new WebsocketFrameSend(body2);
              this.ws[kResponse].socket.write(frame2.createFrame(opcodes.PONG));
              if (channels2.ping.hasSubscribers) {
                channels2.ping.publish({
                  payload: body2
                });
              }
            }
            __privateSet(this, _state, parserStates.INFO);
            if (__privateGet(this, _byteOffset) > 0) {
              continue;
            } else {
              callback();
              return;
            }
          } else if (__privateGet(this, _info).opcode === opcodes.PONG) {
            const body2 = this.consume(payloadLength);
            if (channels2.pong.hasSubscribers) {
              channels2.pong.publish({
                payload: body2
              });
            }
            if (__privateGet(this, _byteOffset) > 0) {
              continue;
            } else {
              callback();
              return;
            }
          }
        } else if (__privateGet(this, _state) === parserStates.PAYLOADLENGTH_16) {
          if (__privateGet(this, _byteOffset) < 2) {
            return callback();
          }
          const buffer = this.consume(2);
          __privateGet(this, _info).payloadLength = buffer.readUInt16BE(0);
          __privateSet(this, _state, parserStates.READ_DATA);
        } else if (__privateGet(this, _state) === parserStates.PAYLOADLENGTH_64) {
          if (__privateGet(this, _byteOffset) < 8) {
            return callback();
          }
          const buffer = this.consume(8);
          const upper = buffer.readUInt32BE(0);
          if (upper > 2 ** 31 - 1) {
            failWebsocketConnection(this.ws, "Received payload length > 2^31 bytes.");
            return;
          }
          const lower = buffer.readUInt32BE(4);
          __privateGet(this, _info).payloadLength = (upper << 8) + lower;
          __privateSet(this, _state, parserStates.READ_DATA);
        } else if (__privateGet(this, _state) === parserStates.READ_DATA) {
          if (__privateGet(this, _byteOffset) < __privateGet(this, _info).payloadLength) {
            return callback();
          } else if (__privateGet(this, _byteOffset) >= __privateGet(this, _info).payloadLength) {
            const body2 = this.consume(__privateGet(this, _info).payloadLength);
            __privateGet(this, _fragments).push(body2);
            if (!__privateGet(this, _info).fragmented || __privateGet(this, _info).fin && __privateGet(this, _info).opcode === opcodes.CONTINUATION) {
              const fullMessage = Buffer.concat(__privateGet(this, _fragments));
              websocketMessageReceived(this.ws, __privateGet(this, _info).originalOpcode, fullMessage);
              __privateSet(this, _info, {});
              __privateGet(this, _fragments).length = 0;
            }
            __privateSet(this, _state, parserStates.INFO);
          }
        }
        if (__privateGet(this, _byteOffset) > 0) {
          continue;
        } else {
          callback();
          break;
        }
      }
    }
    /**
     * Take n bytes from the buffered Buffers
     * @param {number} n
     * @returns {Buffer|null}
     */
    consume(n) {
      if (n > __privateGet(this, _byteOffset)) {
        return null;
      } else if (n === 0) {
        return emptyBuffer;
      }
      if (__privateGet(this, _buffers)[0].length === n) {
        __privateSet(this, _byteOffset, __privateGet(this, _byteOffset) - __privateGet(this, _buffers)[0].length);
        return __privateGet(this, _buffers).shift();
      }
      const buffer = Buffer.allocUnsafe(n);
      let offset = 0;
      while (offset !== n) {
        const next = __privateGet(this, _buffers)[0];
        const { length } = next;
        if (length + offset === n) {
          buffer.set(__privateGet(this, _buffers).shift(), offset);
          break;
        } else if (length + offset > n) {
          buffer.set(next.subarray(0, n - offset), offset);
          __privateGet(this, _buffers)[0] = next.subarray(n - offset);
          break;
        } else {
          buffer.set(__privateGet(this, _buffers).shift(), offset);
          offset += next.length;
        }
      }
      __privateSet(this, _byteOffset, __privateGet(this, _byteOffset) - n);
      return buffer;
    }
    parseCloseBody(onlyCode, data) {
      let code;
      if (data.length >= 2) {
        code = data.readUInt16BE(0);
      }
      if (onlyCode) {
        if (!isValidStatusCode(code)) {
          return null;
        }
        return { code };
      }
      let reason = data.subarray(2);
      if (reason[0] === 239 && reason[1] === 187 && reason[2] === 191) {
        reason = reason.subarray(3);
      }
      if (code !== void 0 && !isValidStatusCode(code)) {
        return null;
      }
      try {
        reason = new TextDecoder("utf-8", { fatal: true }).decode(reason);
      } catch {
        return null;
      }
      return { code, reason };
    }
    get closingInfo() {
      return __privateGet(this, _info).closeInfo;
    }
  }
  _buffers = new WeakMap();
  _byteOffset = new WeakMap();
  _state = new WeakMap();
  _info = new WeakMap();
  _fragments = new WeakMap();
  receiver = {
    ByteParser
  };
  return receiver;
}
var websocket;
var hasRequiredWebsocket;
function requireWebsocket() {
  var _events, _bufferedAmount, _protocol, _extensions, _onConnectionEstablished, onConnectionEstablished_fn;
  if (hasRequiredWebsocket)
    return websocket;
  hasRequiredWebsocket = 1;
  const { webidl } = requireWebidl();
  const { DOMException: DOMException2 } = requireConstants$3();
  const { URLSerializer } = requireDataURL();
  const { getGlobalOrigin } = requireGlobal();
  const { staticPropertyDescriptors, states, opcodes, emptyBuffer } = requireConstants();
  const {
    kWebSocketURL,
    kReadyState,
    kController,
    kBinaryType,
    kResponse,
    kSentClose,
    kByteParser
  } = requireSymbols();
  const { isEstablished, isClosing, isValidSubprotocol, failWebsocketConnection, fireEvent } = requireUtil();
  const { establishWebSocketConnection } = requireConnection();
  const { WebsocketFrameSend } = requireFrame();
  const { ByteParser } = requireReceiver();
  const { kEnumerableProperty: kEnumerableProperty2, isBlobLike: isBlobLike2 } = util$j;
  const { getGlobalDispatcher: getGlobalDispatcher2 } = global$1;
  const { types } = require$$0$2;
  let experimentalWarned = false;
  const _WebSocket = class _WebSocket extends EventTarget {
    /**
     * @param {string} url
     * @param {string|string[]} protocols
     */
    constructor(url, protocols = []) {
      super();
      /**
       * @see https://websockets.spec.whatwg.org/#feedback-from-the-protocol
       */
      __privateAdd(this, _onConnectionEstablished);
      __privateAdd(this, _events, {
        open: null,
        error: null,
        close: null,
        message: null
      });
      __privateAdd(this, _bufferedAmount, 0);
      __privateAdd(this, _protocol, "");
      __privateAdd(this, _extensions, "");
      webidl.argumentLengthCheck(arguments, 1, { header: "WebSocket constructor" });
      if (!experimentalWarned) {
        experimentalWarned = true;
        process.emitWarning("WebSockets are experimental, expect them to change at any time.", {
          code: "UNDICI-WS"
        });
      }
      const options = webidl.converters["DOMString or sequence<DOMString> or WebSocketInit"](protocols);
      url = webidl.converters.USVString(url);
      protocols = options.protocols;
      const baseURL = getGlobalOrigin();
      let urlRecord;
      try {
        urlRecord = new URL(url, baseURL);
      } catch (e) {
        throw new DOMException2(e, "SyntaxError");
      }
      if (urlRecord.protocol === "http:") {
        urlRecord.protocol = "ws:";
      } else if (urlRecord.protocol === "https:") {
        urlRecord.protocol = "wss:";
      }
      if (urlRecord.protocol !== "ws:" && urlRecord.protocol !== "wss:") {
        throw new DOMException2(
          `Expected a ws: or wss: protocol, got ${urlRecord.protocol}`,
          "SyntaxError"
        );
      }
      if (urlRecord.hash || urlRecord.href.endsWith("#")) {
        throw new DOMException2("Got fragment", "SyntaxError");
      }
      if (typeof protocols === "string") {
        protocols = [protocols];
      }
      if (protocols.length !== new Set(protocols.map((p) => p.toLowerCase())).size) {
        throw new DOMException2("Invalid Sec-WebSocket-Protocol value", "SyntaxError");
      }
      if (protocols.length > 0 && !protocols.every((p) => isValidSubprotocol(p))) {
        throw new DOMException2("Invalid Sec-WebSocket-Protocol value", "SyntaxError");
      }
      this[kWebSocketURL] = new URL(urlRecord.href);
      this[kController] = establishWebSocketConnection(
        urlRecord,
        protocols,
        this,
        (response2) => __privateMethod(this, _onConnectionEstablished, onConnectionEstablished_fn).call(this, response2),
        options
      );
      this[kReadyState] = _WebSocket.CONNECTING;
      this[kBinaryType] = "blob";
    }
    /**
     * @see https://websockets.spec.whatwg.org/#dom-websocket-close
     * @param {number|undefined} code
     * @param {string|undefined} reason
     */
    close(code = void 0, reason = void 0) {
      webidl.brandCheck(this, _WebSocket);
      if (code !== void 0) {
        code = webidl.converters["unsigned short"](code, { clamp: true });
      }
      if (reason !== void 0) {
        reason = webidl.converters.USVString(reason);
      }
      if (code !== void 0) {
        if (code !== 1e3 && (code < 3e3 || code > 4999)) {
          throw new DOMException2("invalid code", "InvalidAccessError");
        }
      }
      let reasonByteLength = 0;
      if (reason !== void 0) {
        reasonByteLength = Buffer.byteLength(reason);
        if (reasonByteLength > 123) {
          throw new DOMException2(
            `Reason must be less than 123 bytes; received ${reasonByteLength}`,
            "SyntaxError"
          );
        }
      }
      if (this[kReadyState] === _WebSocket.CLOSING || this[kReadyState] === _WebSocket.CLOSED)
        ;
      else if (!isEstablished(this)) {
        failWebsocketConnection(this, "Connection was closed before it was established.");
        this[kReadyState] = _WebSocket.CLOSING;
      } else if (!isClosing(this)) {
        const frame2 = new WebsocketFrameSend();
        if (code !== void 0 && reason === void 0) {
          frame2.frameData = Buffer.allocUnsafe(2);
          frame2.frameData.writeUInt16BE(code, 0);
        } else if (code !== void 0 && reason !== void 0) {
          frame2.frameData = Buffer.allocUnsafe(2 + reasonByteLength);
          frame2.frameData.writeUInt16BE(code, 0);
          frame2.frameData.write(reason, 2, "utf-8");
        } else {
          frame2.frameData = emptyBuffer;
        }
        const socket = this[kResponse].socket;
        socket.write(frame2.createFrame(opcodes.CLOSE), (err) => {
          if (!err) {
            this[kSentClose] = true;
          }
        });
        this[kReadyState] = states.CLOSING;
      } else {
        this[kReadyState] = _WebSocket.CLOSING;
      }
    }
    /**
     * @see https://websockets.spec.whatwg.org/#dom-websocket-send
     * @param {NodeJS.TypedArray|ArrayBuffer|Blob|string} data
     */
    send(data) {
      webidl.brandCheck(this, _WebSocket);
      webidl.argumentLengthCheck(arguments, 1, { header: "WebSocket.send" });
      data = webidl.converters.WebSocketSendData(data);
      if (this[kReadyState] === _WebSocket.CONNECTING) {
        throw new DOMException2("Sent before connected.", "InvalidStateError");
      }
      if (!isEstablished(this) || isClosing(this)) {
        return;
      }
      const socket = this[kResponse].socket;
      if (typeof data === "string") {
        const value = Buffer.from(data);
        const frame2 = new WebsocketFrameSend(value);
        const buffer = frame2.createFrame(opcodes.TEXT);
        __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) + value.byteLength);
        socket.write(buffer, () => {
          __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) - value.byteLength);
        });
      } else if (types.isArrayBuffer(data)) {
        const value = Buffer.from(data);
        const frame2 = new WebsocketFrameSend(value);
        const buffer = frame2.createFrame(opcodes.BINARY);
        __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) + value.byteLength);
        socket.write(buffer, () => {
          __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) - value.byteLength);
        });
      } else if (ArrayBuffer.isView(data)) {
        const ab = Buffer.from(data, data.byteOffset, data.byteLength);
        const frame2 = new WebsocketFrameSend(ab);
        const buffer = frame2.createFrame(opcodes.BINARY);
        __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) + ab.byteLength);
        socket.write(buffer, () => {
          __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) - ab.byteLength);
        });
      } else if (isBlobLike2(data)) {
        const frame2 = new WebsocketFrameSend();
        data.arrayBuffer().then((ab) => {
          const value = Buffer.from(ab);
          frame2.frameData = value;
          const buffer = frame2.createFrame(opcodes.BINARY);
          __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) + value.byteLength);
          socket.write(buffer, () => {
            __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) - value.byteLength);
          });
        });
      }
    }
    get readyState() {
      webidl.brandCheck(this, _WebSocket);
      return this[kReadyState];
    }
    get bufferedAmount() {
      webidl.brandCheck(this, _WebSocket);
      return __privateGet(this, _bufferedAmount);
    }
    get url() {
      webidl.brandCheck(this, _WebSocket);
      return URLSerializer(this[kWebSocketURL]);
    }
    get extensions() {
      webidl.brandCheck(this, _WebSocket);
      return __privateGet(this, _extensions);
    }
    get protocol() {
      webidl.brandCheck(this, _WebSocket);
      return __privateGet(this, _protocol);
    }
    get onopen() {
      webidl.brandCheck(this, _WebSocket);
      return __privateGet(this, _events).open;
    }
    set onopen(fn) {
      webidl.brandCheck(this, _WebSocket);
      if (__privateGet(this, _events).open) {
        this.removeEventListener("open", __privateGet(this, _events).open);
      }
      if (typeof fn === "function") {
        __privateGet(this, _events).open = fn;
        this.addEventListener("open", fn);
      } else {
        __privateGet(this, _events).open = null;
      }
    }
    get onerror() {
      webidl.brandCheck(this, _WebSocket);
      return __privateGet(this, _events).error;
    }
    set onerror(fn) {
      webidl.brandCheck(this, _WebSocket);
      if (__privateGet(this, _events).error) {
        this.removeEventListener("error", __privateGet(this, _events).error);
      }
      if (typeof fn === "function") {
        __privateGet(this, _events).error = fn;
        this.addEventListener("error", fn);
      } else {
        __privateGet(this, _events).error = null;
      }
    }
    get onclose() {
      webidl.brandCheck(this, _WebSocket);
      return __privateGet(this, _events).close;
    }
    set onclose(fn) {
      webidl.brandCheck(this, _WebSocket);
      if (__privateGet(this, _events).close) {
        this.removeEventListener("close", __privateGet(this, _events).close);
      }
      if (typeof fn === "function") {
        __privateGet(this, _events).close = fn;
        this.addEventListener("close", fn);
      } else {
        __privateGet(this, _events).close = null;
      }
    }
    get onmessage() {
      webidl.brandCheck(this, _WebSocket);
      return __privateGet(this, _events).message;
    }
    set onmessage(fn) {
      webidl.brandCheck(this, _WebSocket);
      if (__privateGet(this, _events).message) {
        this.removeEventListener("message", __privateGet(this, _events).message);
      }
      if (typeof fn === "function") {
        __privateGet(this, _events).message = fn;
        this.addEventListener("message", fn);
      } else {
        __privateGet(this, _events).message = null;
      }
    }
    get binaryType() {
      webidl.brandCheck(this, _WebSocket);
      return this[kBinaryType];
    }
    set binaryType(type) {
      webidl.brandCheck(this, _WebSocket);
      if (type !== "blob" && type !== "arraybuffer") {
        this[kBinaryType] = "blob";
      } else {
        this[kBinaryType] = type;
      }
    }
  };
  _events = new WeakMap();
  _bufferedAmount = new WeakMap();
  _protocol = new WeakMap();
  _extensions = new WeakMap();
  _onConnectionEstablished = new WeakSet();
  onConnectionEstablished_fn = function(response2) {
    this[kResponse] = response2;
    const parser = new ByteParser(this);
    parser.on("drain", function onParserDrain() {
      this.ws[kResponse].socket.resume();
    });
    response2.socket.ws = this;
    this[kByteParser] = parser;
    this[kReadyState] = states.OPEN;
    const extensions = response2.headersList.get("sec-websocket-extensions");
    if (extensions !== null) {
      __privateSet(this, _extensions, extensions);
    }
    const protocol = response2.headersList.get("sec-websocket-protocol");
    if (protocol !== null) {
      __privateSet(this, _protocol, protocol);
    }
    fireEvent("open", this);
  };
  let WebSocket = _WebSocket;
  WebSocket.CONNECTING = WebSocket.prototype.CONNECTING = states.CONNECTING;
  WebSocket.OPEN = WebSocket.prototype.OPEN = states.OPEN;
  WebSocket.CLOSING = WebSocket.prototype.CLOSING = states.CLOSING;
  WebSocket.CLOSED = WebSocket.prototype.CLOSED = states.CLOSED;
  Object.defineProperties(WebSocket.prototype, {
    CONNECTING: staticPropertyDescriptors,
    OPEN: staticPropertyDescriptors,
    CLOSING: staticPropertyDescriptors,
    CLOSED: staticPropertyDescriptors,
    url: kEnumerableProperty2,
    readyState: kEnumerableProperty2,
    bufferedAmount: kEnumerableProperty2,
    onopen: kEnumerableProperty2,
    onerror: kEnumerableProperty2,
    onclose: kEnumerableProperty2,
    close: kEnumerableProperty2,
    onmessage: kEnumerableProperty2,
    binaryType: kEnumerableProperty2,
    send: kEnumerableProperty2,
    extensions: kEnumerableProperty2,
    protocol: kEnumerableProperty2,
    [Symbol.toStringTag]: {
      value: "WebSocket",
      writable: false,
      enumerable: false,
      configurable: true
    }
  });
  Object.defineProperties(WebSocket, {
    CONNECTING: staticPropertyDescriptors,
    OPEN: staticPropertyDescriptors,
    CLOSING: staticPropertyDescriptors,
    CLOSED: staticPropertyDescriptors
  });
  webidl.converters["sequence<DOMString>"] = webidl.sequenceConverter(
    webidl.converters.DOMString
  );
  webidl.converters["DOMString or sequence<DOMString>"] = function(V) {
    if (webidl.util.Type(V) === "Object" && Symbol.iterator in V) {
      return webidl.converters["sequence<DOMString>"](V);
    }
    return webidl.converters.DOMString(V);
  };
  webidl.converters.WebSocketInit = webidl.dictionaryConverter([
    {
      key: "protocols",
      converter: webidl.converters["DOMString or sequence<DOMString>"],
      get defaultValue() {
        return [];
      }
    },
    {
      key: "dispatcher",
      converter: (V) => V,
      get defaultValue() {
        return getGlobalDispatcher2();
      }
    },
    {
      key: "headers",
      converter: webidl.nullableConverter(webidl.converters.HeadersInit)
    }
  ]);
  webidl.converters["DOMString or sequence<DOMString> or WebSocketInit"] = function(V) {
    if (webidl.util.Type(V) === "Object" && !(Symbol.iterator in V)) {
      return webidl.converters.WebSocketInit(V);
    }
    return { protocols: webidl.converters["DOMString or sequence<DOMString>"](V) };
  };
  webidl.converters.WebSocketSendData = function(V) {
    if (webidl.util.Type(V) === "Object") {
      if (isBlobLike2(V)) {
        return webidl.converters.Blob(V, { strict: false });
      }
      if (ArrayBuffer.isView(V) || types.isAnyArrayBuffer(V)) {
        return webidl.converters.BufferSource(V);
      }
    }
    return webidl.converters.USVString(V);
  };
  websocket = {
    WebSocket
  };
  return websocket;
}
const Client2 = client;
const Dispatcher2 = dispatcher;
const errors = errors$1;
const Pool2 = pool;
const BalancedPool2 = balancedPool;
const Agent2 = agent;
const util = util$j;
const { InvalidArgumentError: InvalidArgumentError2 } = errors;
const api = api$1;
const buildConnector = connect$2;
const MockClient2 = mockClient;
const MockAgent2 = mockAgent;
const MockPool2 = mockPool;
const mockErrors = mockErrors$1;
const ProxyAgent2 = proxyAgent;
const RetryHandler2 = RetryHandler_1;
const { getGlobalDispatcher, setGlobalDispatcher } = global$1;
const DecoratorHandler2 = DecoratorHandler_1;
const RedirectHandler2 = RedirectHandler_1;
const createRedirectInterceptor = redirectInterceptor;
let hasCrypto;
try {
  require("crypto");
  hasCrypto = true;
} catch {
  hasCrypto = false;
}
Object.assign(Dispatcher2.prototype, api);
undici.Dispatcher = Dispatcher2;
undici.Client = Client2;
undici.Pool = Pool2;
undici.BalancedPool = BalancedPool2;
undici.Agent = Agent2;
undici.ProxyAgent = ProxyAgent2;
undici.RetryHandler = RetryHandler2;
undici.DecoratorHandler = DecoratorHandler2;
undici.RedirectHandler = RedirectHandler2;
undici.createRedirectInterceptor = createRedirectInterceptor;
undici.buildConnector = buildConnector;
undici.errors = errors;
function makeDispatcher(fn) {
  return (url, opts, handler) => {
    if (typeof opts === "function") {
      handler = opts;
      opts = null;
    }
    if (!url || typeof url !== "string" && typeof url !== "object" && !(url instanceof URL)) {
      throw new InvalidArgumentError2("invalid url");
    }
    if (opts != null && typeof opts !== "object") {
      throw new InvalidArgumentError2("invalid opts");
    }
    if (opts && opts.path != null) {
      if (typeof opts.path !== "string") {
        throw new InvalidArgumentError2("invalid opts.path");
      }
      let path2 = opts.path;
      if (!opts.path.startsWith("/")) {
        path2 = `/${path2}`;
      }
      url = new URL(util.parseOrigin(url).origin + path2);
    } else {
      if (!opts) {
        opts = typeof url === "object" ? url : {};
      }
      url = util.parseURL(url);
    }
    const { agent: agent2, dispatcher: dispatcher2 = getGlobalDispatcher() } = opts;
    if (agent2) {
      throw new InvalidArgumentError2("unsupported opts.agent. Did you mean opts.client?");
    }
    return fn.call(dispatcher2, {
      ...opts,
      origin: url.origin,
      path: url.search ? `${url.pathname}${url.search}` : url.pathname,
      method: opts.method || (opts.body ? "PUT" : "GET")
    }, handler);
  };
}
undici.setGlobalDispatcher = setGlobalDispatcher;
undici.getGlobalDispatcher = getGlobalDispatcher;
if (util.nodeMajor > 16 || util.nodeMajor === 16 && util.nodeMinor >= 8) {
  let fetchImpl = null;
  undici.fetch = async function fetch(resource) {
    if (!fetchImpl) {
      fetchImpl = requireFetch().fetch;
    }
    try {
      return await fetchImpl(...arguments);
    } catch (err) {
      if (typeof err === "object") {
        Error.captureStackTrace(err, this);
      }
      throw err;
    }
  };
  undici.Headers = requireHeaders().Headers;
  undici.Response = requireResponse().Response;
  undici.Request = requireRequest().Request;
  undici.FormData = requireFormdata().FormData;
  undici.File = requireFile().File;
  undici.FileReader = requireFilereader().FileReader;
  const { setGlobalOrigin, getGlobalOrigin } = requireGlobal();
  undici.setGlobalOrigin = setGlobalOrigin;
  undici.getGlobalOrigin = getGlobalOrigin;
  const { CacheStorage } = requireCachestorage();
  const { kConstruct } = requireSymbols$1();
  undici.caches = new CacheStorage(kConstruct);
}
if (util.nodeMajor >= 16) {
  const { deleteCookie, getCookies, getSetCookies, setCookie } = requireCookies();
  undici.deleteCookie = deleteCookie;
  undici.getCookies = getCookies;
  undici.getSetCookies = getSetCookies;
  undici.setCookie = setCookie;
  const { parseMIMEType, serializeAMimeType } = requireDataURL();
  undici.parseMIMEType = parseMIMEType;
  undici.serializeAMimeType = serializeAMimeType;
}
if (util.nodeMajor >= 18 && hasCrypto) {
  const { WebSocket } = requireWebsocket();
  undici.WebSocket = WebSocket;
}
undici.request = makeDispatcher(api.request);
undici.stream = makeDispatcher(api.stream);
undici.pipeline = makeDispatcher(api.pipeline);
undici.connect = makeDispatcher(api.connect);
undici.upgrade = makeDispatcher(api.upgrade);
undici.MockClient = MockClient2;
undici.MockPool = MockPool2;
undici.MockAgent = MockAgent2;
undici.mockErrors = mockErrors;
var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function() {
      return m[k];
    } };
  }
  Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
});
var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod)
      if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
        __createBinding(result, mod, k);
  }
  __setModuleDefault(result, mod);
  return result;
};
var __awaiter$1 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(lib, "__esModule", { value: true });
lib.HttpClient = lib.isHttps = lib.HttpClientResponse = lib.HttpClientError = lib.getProxyUrl = lib.MediaTypes = lib.Headers = lib.HttpCodes = void 0;
const http = __importStar(require$$2);
const https = __importStar(require$$3);
const pm = __importStar(proxy);
const tunnel = __importStar(tunnel$1);
const undici_1 = undici;
var HttpCodes;
(function(HttpCodes2) {
  HttpCodes2[HttpCodes2["OK"] = 200] = "OK";
  HttpCodes2[HttpCodes2["MultipleChoices"] = 300] = "MultipleChoices";
  HttpCodes2[HttpCodes2["MovedPermanently"] = 301] = "MovedPermanently";
  HttpCodes2[HttpCodes2["ResourceMoved"] = 302] = "ResourceMoved";
  HttpCodes2[HttpCodes2["SeeOther"] = 303] = "SeeOther";
  HttpCodes2[HttpCodes2["NotModified"] = 304] = "NotModified";
  HttpCodes2[HttpCodes2["UseProxy"] = 305] = "UseProxy";
  HttpCodes2[HttpCodes2["SwitchProxy"] = 306] = "SwitchProxy";
  HttpCodes2[HttpCodes2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
  HttpCodes2[HttpCodes2["PermanentRedirect"] = 308] = "PermanentRedirect";
  HttpCodes2[HttpCodes2["BadRequest"] = 400] = "BadRequest";
  HttpCodes2[HttpCodes2["Unauthorized"] = 401] = "Unauthorized";
  HttpCodes2[HttpCodes2["PaymentRequired"] = 402] = "PaymentRequired";
  HttpCodes2[HttpCodes2["Forbidden"] = 403] = "Forbidden";
  HttpCodes2[HttpCodes2["NotFound"] = 404] = "NotFound";
  HttpCodes2[HttpCodes2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
  HttpCodes2[HttpCodes2["NotAcceptable"] = 406] = "NotAcceptable";
  HttpCodes2[HttpCodes2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
  HttpCodes2[HttpCodes2["RequestTimeout"] = 408] = "RequestTimeout";
  HttpCodes2[HttpCodes2["Conflict"] = 409] = "Conflict";
  HttpCodes2[HttpCodes2["Gone"] = 410] = "Gone";
  HttpCodes2[HttpCodes2["TooManyRequests"] = 429] = "TooManyRequests";
  HttpCodes2[HttpCodes2["InternalServerError"] = 500] = "InternalServerError";
  HttpCodes2[HttpCodes2["NotImplemented"] = 501] = "NotImplemented";
  HttpCodes2[HttpCodes2["BadGateway"] = 502] = "BadGateway";
  HttpCodes2[HttpCodes2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
  HttpCodes2[HttpCodes2["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes || (lib.HttpCodes = HttpCodes = {}));
var Headers;
(function(Headers2) {
  Headers2["Accept"] = "accept";
  Headers2["ContentType"] = "content-type";
})(Headers || (lib.Headers = Headers = {}));
var MediaTypes;
(function(MediaTypes2) {
  MediaTypes2["ApplicationJson"] = "application/json";
})(MediaTypes || (lib.MediaTypes = MediaTypes = {}));
function getProxyUrl(serverUrl) {
  const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
  return proxyUrl ? proxyUrl.href : "";
}
lib.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
  HttpCodes.MovedPermanently,
  HttpCodes.ResourceMoved,
  HttpCodes.SeeOther,
  HttpCodes.TemporaryRedirect,
  HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
  HttpCodes.BadGateway,
  HttpCodes.ServiceUnavailable,
  HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ["OPTIONS", "GET", "DELETE", "HEAD"];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "HttpClientError";
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, HttpClientError.prototype);
  }
}
lib.HttpClientError = HttpClientError;
class HttpClientResponse {
  constructor(message) {
    this.message = message;
  }
  readBody() {
    return __awaiter$1(this, void 0, void 0, function* () {
      return new Promise((resolve) => __awaiter$1(this, void 0, void 0, function* () {
        let output = Buffer.alloc(0);
        this.message.on("data", (chunk) => {
          output = Buffer.concat([output, chunk]);
        });
        this.message.on("end", () => {
          resolve(output.toString());
        });
      }));
    });
  }
  readBodyBuffer() {
    return __awaiter$1(this, void 0, void 0, function* () {
      return new Promise((resolve) => __awaiter$1(this, void 0, void 0, function* () {
        const chunks = [];
        this.message.on("data", (chunk) => {
          chunks.push(chunk);
        });
        this.message.on("end", () => {
          resolve(Buffer.concat(chunks));
        });
      }));
    });
  }
}
lib.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
  const parsedUrl = new URL(requestUrl);
  return parsedUrl.protocol === "https:";
}
lib.isHttps = isHttps;
class HttpClient {
  constructor(userAgent, handlers, requestOptions) {
    this._ignoreSslError = false;
    this._allowRedirects = true;
    this._allowRedirectDowngrade = false;
    this._maxRedirects = 50;
    this._allowRetries = false;
    this._maxRetries = 1;
    this._keepAlive = false;
    this._disposed = false;
    this.userAgent = userAgent;
    this.handlers = handlers || [];
    this.requestOptions = requestOptions;
    if (requestOptions) {
      if (requestOptions.ignoreSslError != null) {
        this._ignoreSslError = requestOptions.ignoreSslError;
      }
      this._socketTimeout = requestOptions.socketTimeout;
      if (requestOptions.allowRedirects != null) {
        this._allowRedirects = requestOptions.allowRedirects;
      }
      if (requestOptions.allowRedirectDowngrade != null) {
        this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
      }
      if (requestOptions.maxRedirects != null) {
        this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
      }
      if (requestOptions.keepAlive != null) {
        this._keepAlive = requestOptions.keepAlive;
      }
      if (requestOptions.allowRetries != null) {
        this._allowRetries = requestOptions.allowRetries;
      }
      if (requestOptions.maxRetries != null) {
        this._maxRetries = requestOptions.maxRetries;
      }
    }
  }
  options(requestUrl, additionalHeaders) {
    return __awaiter$1(this, void 0, void 0, function* () {
      return this.request("OPTIONS", requestUrl, null, additionalHeaders || {});
    });
  }
  get(requestUrl, additionalHeaders) {
    return __awaiter$1(this, void 0, void 0, function* () {
      return this.request("GET", requestUrl, null, additionalHeaders || {});
    });
  }
  del(requestUrl, additionalHeaders) {
    return __awaiter$1(this, void 0, void 0, function* () {
      return this.request("DELETE", requestUrl, null, additionalHeaders || {});
    });
  }
  post(requestUrl, data, additionalHeaders) {
    return __awaiter$1(this, void 0, void 0, function* () {
      return this.request("POST", requestUrl, data, additionalHeaders || {});
    });
  }
  patch(requestUrl, data, additionalHeaders) {
    return __awaiter$1(this, void 0, void 0, function* () {
      return this.request("PATCH", requestUrl, data, additionalHeaders || {});
    });
  }
  put(requestUrl, data, additionalHeaders) {
    return __awaiter$1(this, void 0, void 0, function* () {
      return this.request("PUT", requestUrl, data, additionalHeaders || {});
    });
  }
  head(requestUrl, additionalHeaders) {
    return __awaiter$1(this, void 0, void 0, function* () {
      return this.request("HEAD", requestUrl, null, additionalHeaders || {});
    });
  }
  sendStream(verb, requestUrl, stream2, additionalHeaders) {
    return __awaiter$1(this, void 0, void 0, function* () {
      return this.request(verb, requestUrl, stream2, additionalHeaders);
    });
  }
  /**
   * Gets a typed object from an endpoint
   * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
   */
  getJson(requestUrl, additionalHeaders = {}) {
    return __awaiter$1(this, void 0, void 0, function* () {
      additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
      const res = yield this.get(requestUrl, additionalHeaders);
      return this._processResponse(res, this.requestOptions);
    });
  }
  postJson(requestUrl, obj, additionalHeaders = {}) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const data = JSON.stringify(obj, null, 2);
      additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
      additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
      const res = yield this.post(requestUrl, data, additionalHeaders);
      return this._processResponse(res, this.requestOptions);
    });
  }
  putJson(requestUrl, obj, additionalHeaders = {}) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const data = JSON.stringify(obj, null, 2);
      additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
      additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
      const res = yield this.put(requestUrl, data, additionalHeaders);
      return this._processResponse(res, this.requestOptions);
    });
  }
  patchJson(requestUrl, obj, additionalHeaders = {}) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const data = JSON.stringify(obj, null, 2);
      additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
      additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
      const res = yield this.patch(requestUrl, data, additionalHeaders);
      return this._processResponse(res, this.requestOptions);
    });
  }
  /**
   * Makes a raw http request.
   * All other methods such as get, post, patch, and request ultimately call this.
   * Prefer get, del, post and patch
   */
  request(verb, requestUrl, data, headers2) {
    return __awaiter$1(this, void 0, void 0, function* () {
      if (this._disposed) {
        throw new Error("Client has already been disposed.");
      }
      const parsedUrl = new URL(requestUrl);
      let info = this._prepareRequest(verb, parsedUrl, headers2);
      const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb) ? this._maxRetries + 1 : 1;
      let numTries = 0;
      let response2;
      do {
        response2 = yield this.requestRaw(info, data);
        if (response2 && response2.message && response2.message.statusCode === HttpCodes.Unauthorized) {
          let authenticationHandler;
          for (const handler of this.handlers) {
            if (handler.canHandleAuthentication(response2)) {
              authenticationHandler = handler;
              break;
            }
          }
          if (authenticationHandler) {
            return authenticationHandler.handleAuthentication(this, info, data);
          } else {
            return response2;
          }
        }
        let redirectsRemaining = this._maxRedirects;
        while (response2.message.statusCode && HttpRedirectCodes.includes(response2.message.statusCode) && this._allowRedirects && redirectsRemaining > 0) {
          const redirectUrl = response2.message.headers["location"];
          if (!redirectUrl) {
            break;
          }
          const parsedRedirectUrl = new URL(redirectUrl);
          if (parsedUrl.protocol === "https:" && parsedUrl.protocol !== parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
            throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
          }
          yield response2.readBody();
          if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
            for (const header in headers2) {
              if (header.toLowerCase() === "authorization") {
                delete headers2[header];
              }
            }
          }
          info = this._prepareRequest(verb, parsedRedirectUrl, headers2);
          response2 = yield this.requestRaw(info, data);
          redirectsRemaining--;
        }
        if (!response2.message.statusCode || !HttpResponseRetryCodes.includes(response2.message.statusCode)) {
          return response2;
        }
        numTries += 1;
        if (numTries < maxTries) {
          yield response2.readBody();
          yield this._performExponentialBackoff(numTries);
        }
      } while (numTries < maxTries);
      return response2;
    });
  }
  /**
   * Needs to be called if keepAlive is set to true in request options.
   */
  dispose() {
    if (this._agent) {
      this._agent.destroy();
    }
    this._disposed = true;
  }
  /**
   * Raw request.
   * @param info
   * @param data
   */
  requestRaw(info, data) {
    return __awaiter$1(this, void 0, void 0, function* () {
      return new Promise((resolve, reject) => {
        function callbackForResult(err, res) {
          if (err) {
            reject(err);
          } else if (!res) {
            reject(new Error("Unknown error"));
          } else {
            resolve(res);
          }
        }
        this.requestRawWithCallback(info, data, callbackForResult);
      });
    });
  }
  /**
   * Raw request with callback.
   * @param info
   * @param data
   * @param onResult
   */
  requestRawWithCallback(info, data, onResult) {
    if (typeof data === "string") {
      if (!info.options.headers) {
        info.options.headers = {};
      }
      info.options.headers["Content-Length"] = Buffer.byteLength(data, "utf8");
    }
    let callbackCalled = false;
    function handleResult(err, res) {
      if (!callbackCalled) {
        callbackCalled = true;
        onResult(err, res);
      }
    }
    const req = info.httpModule.request(info.options, (msg) => {
      const res = new HttpClientResponse(msg);
      handleResult(void 0, res);
    });
    let socket;
    req.on("socket", (sock) => {
      socket = sock;
    });
    req.setTimeout(this._socketTimeout || 3 * 6e4, () => {
      if (socket) {
        socket.end();
      }
      handleResult(new Error(`Request timeout: ${info.options.path}`));
    });
    req.on("error", function(err) {
      handleResult(err);
    });
    if (data && typeof data === "string") {
      req.write(data, "utf8");
    }
    if (data && typeof data !== "string") {
      data.on("close", function() {
        req.end();
      });
      data.pipe(req);
    } else {
      req.end();
    }
  }
  /**
   * Gets an http agent. This function is useful when you need an http agent that handles
   * routing through a proxy server - depending upon the url and proxy environment variables.
   * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
   */
  getAgent(serverUrl) {
    const parsedUrl = new URL(serverUrl);
    return this._getAgent(parsedUrl);
  }
  getAgentDispatcher(serverUrl) {
    const parsedUrl = new URL(serverUrl);
    const proxyUrl = pm.getProxyUrl(parsedUrl);
    const useProxy = proxyUrl && proxyUrl.hostname;
    if (!useProxy) {
      return;
    }
    return this._getProxyAgentDispatcher(parsedUrl, proxyUrl);
  }
  _prepareRequest(method, requestUrl, headers2) {
    const info = {};
    info.parsedUrl = requestUrl;
    const usingSsl = info.parsedUrl.protocol === "https:";
    info.httpModule = usingSsl ? https : http;
    const defaultPort = usingSsl ? 443 : 80;
    info.options = {};
    info.options.host = info.parsedUrl.hostname;
    info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
    info.options.path = (info.parsedUrl.pathname || "") + (info.parsedUrl.search || "");
    info.options.method = method;
    info.options.headers = this._mergeHeaders(headers2);
    if (this.userAgent != null) {
      info.options.headers["user-agent"] = this.userAgent;
    }
    info.options.agent = this._getAgent(info.parsedUrl);
    if (this.handlers) {
      for (const handler of this.handlers) {
        handler.prepareRequest(info.options);
      }
    }
    return info;
  }
  _mergeHeaders(headers2) {
    if (this.requestOptions && this.requestOptions.headers) {
      return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers2 || {}));
    }
    return lowercaseKeys(headers2 || {});
  }
  _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
    let clientHeader;
    if (this.requestOptions && this.requestOptions.headers) {
      clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
    }
    return additionalHeaders[header] || clientHeader || _default;
  }
  _getAgent(parsedUrl) {
    let agent2;
    const proxyUrl = pm.getProxyUrl(parsedUrl);
    const useProxy = proxyUrl && proxyUrl.hostname;
    if (this._keepAlive && useProxy) {
      agent2 = this._proxyAgent;
    }
    if (!useProxy) {
      agent2 = this._agent;
    }
    if (agent2) {
      return agent2;
    }
    const usingSsl = parsedUrl.protocol === "https:";
    let maxSockets = 100;
    if (this.requestOptions) {
      maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
    }
    if (proxyUrl && proxyUrl.hostname) {
      const agentOptions = {
        maxSockets,
        keepAlive: this._keepAlive,
        proxy: Object.assign(Object.assign({}, (proxyUrl.username || proxyUrl.password) && {
          proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
        }), { host: proxyUrl.hostname, port: proxyUrl.port })
      };
      let tunnelAgent;
      const overHttps = proxyUrl.protocol === "https:";
      if (usingSsl) {
        tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
      } else {
        tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
      }
      agent2 = tunnelAgent(agentOptions);
      this._proxyAgent = agent2;
    }
    if (!agent2) {
      const options = { keepAlive: this._keepAlive, maxSockets };
      agent2 = usingSsl ? new https.Agent(options) : new http.Agent(options);
      this._agent = agent2;
    }
    if (usingSsl && this._ignoreSslError) {
      agent2.options = Object.assign(agent2.options || {}, {
        rejectUnauthorized: false
      });
    }
    return agent2;
  }
  _getProxyAgentDispatcher(parsedUrl, proxyUrl) {
    let proxyAgent2;
    if (this._keepAlive) {
      proxyAgent2 = this._proxyAgentDispatcher;
    }
    if (proxyAgent2) {
      return proxyAgent2;
    }
    const usingSsl = parsedUrl.protocol === "https:";
    proxyAgent2 = new undici_1.ProxyAgent(Object.assign({ uri: proxyUrl.href, pipelining: !this._keepAlive ? 0 : 1 }, (proxyUrl.username || proxyUrl.password) && {
      token: `Basic ${Buffer.from(`${proxyUrl.username}:${proxyUrl.password}`).toString("base64")}`
    }));
    this._proxyAgentDispatcher = proxyAgent2;
    if (usingSsl && this._ignoreSslError) {
      proxyAgent2.options = Object.assign(proxyAgent2.options.requestTls || {}, {
        rejectUnauthorized: false
      });
    }
    return proxyAgent2;
  }
  _performExponentialBackoff(retryNumber) {
    return __awaiter$1(this, void 0, void 0, function* () {
      retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
      const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
      return new Promise((resolve) => setTimeout(() => resolve(), ms));
    });
  }
  _processResponse(res, options) {
    return __awaiter$1(this, void 0, void 0, function* () {
      return new Promise((resolve, reject) => __awaiter$1(this, void 0, void 0, function* () {
        const statusCode = res.message.statusCode || 0;
        const response2 = {
          statusCode,
          result: null,
          headers: {}
        };
        if (statusCode === HttpCodes.NotFound) {
          resolve(response2);
        }
        function dateTimeDeserializer(key, value) {
          if (typeof value === "string") {
            const a = new Date(value);
            if (!isNaN(a.valueOf())) {
              return a;
            }
          }
          return value;
        }
        let obj;
        let contents;
        try {
          contents = yield res.readBody();
          if (contents && contents.length > 0) {
            if (options && options.deserializeDates) {
              obj = JSON.parse(contents, dateTimeDeserializer);
            } else {
              obj = JSON.parse(contents);
            }
            response2.result = obj;
          }
          response2.headers = res.message.headers;
        } catch (err) {
        }
        if (statusCode > 299) {
          let msg;
          if (obj && obj.message) {
            msg = obj.message;
          } else if (contents && contents.length > 0) {
            msg = contents;
          } else {
            msg = `Failed request: (${statusCode})`;
          }
          const err = new HttpClientError(msg, statusCode);
          err.result = response2.result;
          reject(err);
        } else {
          resolve(response2);
        }
      }));
    });
  }
}
lib.HttpClient = HttpClient;
const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
var auth = {};
var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(auth, "__esModule", { value: true });
auth.PersonalAccessTokenCredentialHandler = auth.BearerCredentialHandler = auth.BasicCredentialHandler = void 0;
class BasicCredentialHandler {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
  prepareRequest(options) {
    if (!options.headers) {
      throw Error("The request has no headers");
    }
    options.headers["Authorization"] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`;
  }
  // This handler cannot handle 401
  canHandleAuthentication() {
    return false;
  }
  handleAuthentication() {
    return __awaiter(this, void 0, void 0, function* () {
      throw new Error("not implemented");
    });
  }
}
auth.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
  constructor(token) {
    this.token = token;
  }
  // currently implements pre-authorization
  // TODO: support preAuth = false where it hooks on 401
  prepareRequest(options) {
    if (!options.headers) {
      throw Error("The request has no headers");
    }
    options.headers["Authorization"] = `Bearer ${this.token}`;
  }
  // This handler cannot handle 401
  canHandleAuthentication() {
    return false;
  }
  handleAuthentication() {
    return __awaiter(this, void 0, void 0, function* () {
      throw new Error("not implemented");
    });
  }
}
auth.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
  constructor(token) {
    this.token = token;
  }
  // currently implements pre-authorization
  // TODO: support preAuth = false where it hooks on 401
  prepareRequest(options) {
    if (!options.headers) {
      throw Error("The request has no headers");
    }
    options.headers["Authorization"] = `Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`;
  }
  // This handler cannot handle 401
  canHandleAuthentication() {
    return false;
  }
  handleAuthentication() {
    return __awaiter(this, void 0, void 0, function* () {
      throw new Error("not implemented");
    });
  }
}
auth.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
var hasRequiredOidcUtils;
function requireOidcUtils() {
  if (hasRequiredOidcUtils)
    return oidcUtils;
  hasRequiredOidcUtils = 1;
  var __awaiter2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(oidcUtils, "__esModule", { value: true });
  oidcUtils.OidcClient = void 0;
  const http_client_1 = lib;
  const auth_1 = auth;
  const core_1 = requireCore();
  class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
      const requestOptions = {
        allowRetries: allowRetry,
        maxRetries: maxRetry
      };
      return new http_client_1.HttpClient("actions/oidc-client", [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
      const token = process.env["ACTIONS_ID_TOKEN_REQUEST_TOKEN"];
      if (!token) {
        throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");
      }
      return token;
    }
    static getIDTokenUrl() {
      const runtimeUrl = process.env["ACTIONS_ID_TOKEN_REQUEST_URL"];
      if (!runtimeUrl) {
        throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");
      }
      return runtimeUrl;
    }
    static getCall(id_token_url) {
      var _a;
      return __awaiter2(this, void 0, void 0, function* () {
        const httpclient = OidcClient.createHttpClient();
        const res = yield httpclient.getJson(id_token_url).catch((error) => {
          throw new Error(`Failed to get ID Token. 
 
        Error Code : ${error.statusCode}
 
        Error Message: ${error.message}`);
        });
        const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
        if (!id_token) {
          throw new Error("Response json body do not have ID Token field");
        }
        return id_token;
      });
    }
    static getIDToken(audience) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          let id_token_url = OidcClient.getIDTokenUrl();
          if (audience) {
            const encodedAudience = encodeURIComponent(audience);
            id_token_url = `${id_token_url}&audience=${encodedAudience}`;
          }
          (0, core_1.debug)(`ID token url is ${id_token_url}`);
          const id_token = yield OidcClient.getCall(id_token_url);
          (0, core_1.setSecret)(id_token);
          return id_token;
        } catch (error) {
          throw new Error(`Error message: ${error.message}`);
        }
      });
    }
  }
  oidcUtils.OidcClient = OidcClient;
  return oidcUtils;
}
var summary = {};
var hasRequiredSummary;
function requireSummary() {
  if (hasRequiredSummary)
    return summary;
  hasRequiredSummary = 1;
  (function(exports) {
    var __awaiter2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
    const os_1 = require$$0;
    const fs_1 = fs$1;
    const { access, appendFile, writeFile } = fs_1.promises;
    exports.SUMMARY_ENV_VAR = "GITHUB_STEP_SUMMARY";
    exports.SUMMARY_DOCS_URL = "https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";
    class Summary {
      constructor() {
        this._buffer = "";
      }
      /**
       * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
       * Also checks r/w permissions.
       *
       * @returns step summary file path
       */
      filePath() {
        return __awaiter2(this, void 0, void 0, function* () {
          if (this._filePath) {
            return this._filePath;
          }
          const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
          if (!pathFromEnv) {
            throw new Error(`Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
          }
          try {
            yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
          } catch (_a) {
            throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
          }
          this._filePath = pathFromEnv;
          return this._filePath;
        });
      }
      /**
       * Wraps content in an HTML tag, adding any HTML attributes
       *
       * @param {string} tag HTML tag to wrap
       * @param {string | null} content content within the tag
       * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
       *
       * @returns {string} content wrapped in HTML element
       */
      wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs).map(([key, value]) => ` ${key}="${value}"`).join("");
        if (!content) {
          return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
      }
      /**
       * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
       *
       * @param {SummaryWriteOptions} [options] (optional) options for write operation
       *
       * @returns {Promise<Summary>} summary instance
       */
      write(options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
          const filePath = yield this.filePath();
          const writeFunc = overwrite ? writeFile : appendFile;
          yield writeFunc(filePath, this._buffer, { encoding: "utf8" });
          return this.emptyBuffer();
        });
      }
      /**
       * Clears the summary buffer and wipes the summary file
       *
       * @returns {Summary} summary instance
       */
      clear() {
        return __awaiter2(this, void 0, void 0, function* () {
          return this.emptyBuffer().write({ overwrite: true });
        });
      }
      /**
       * Returns the current summary buffer as a string
       *
       * @returns {string} string of summary buffer
       */
      stringify() {
        return this._buffer;
      }
      /**
       * If the summary buffer is empty
       *
       * @returns {boolen} true if the buffer is empty
       */
      isEmptyBuffer() {
        return this._buffer.length === 0;
      }
      /**
       * Resets the summary buffer without writing to summary file
       *
       * @returns {Summary} summary instance
       */
      emptyBuffer() {
        this._buffer = "";
        return this;
      }
      /**
       * Adds raw text to the summary buffer
       *
       * @param {string} text content to add
       * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
       *
       * @returns {Summary} summary instance
       */
      addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
      }
      /**
       * Adds the operating system-specific end-of-line marker to the buffer
       *
       * @returns {Summary} summary instance
       */
      addEOL() {
        return this.addRaw(os_1.EOL);
      }
      /**
       * Adds an HTML codeblock to the summary buffer
       *
       * @param {string} code content to render within fenced code block
       * @param {string} lang (optional) language to syntax highlight code
       *
       * @returns {Summary} summary instance
       */
      addCodeBlock(code, lang) {
        const attrs = Object.assign({}, lang && { lang });
        const element = this.wrap("pre", this.wrap("code", code), attrs);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML list to the summary buffer
       *
       * @param {string[]} items list of items to render
       * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
       *
       * @returns {Summary} summary instance
       */
      addList(items, ordered = false) {
        const tag = ordered ? "ol" : "ul";
        const listItems = items.map((item) => this.wrap("li", item)).join("");
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML table to the summary buffer
       *
       * @param {SummaryTableCell[]} rows table rows
       *
       * @returns {Summary} summary instance
       */
      addTable(rows) {
        const tableBody = rows.map((row) => {
          const cells = row.map((cell) => {
            if (typeof cell === "string") {
              return this.wrap("td", cell);
            }
            const { header, data, colspan, rowspan } = cell;
            const tag = header ? "th" : "td";
            const attrs = Object.assign(Object.assign({}, colspan && { colspan }), rowspan && { rowspan });
            return this.wrap(tag, data, attrs);
          }).join("");
          return this.wrap("tr", cells);
        }).join("");
        const element = this.wrap("table", tableBody);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds a collapsable HTML details element to the summary buffer
       *
       * @param {string} label text for the closed state
       * @param {string} content collapsable content
       *
       * @returns {Summary} summary instance
       */
      addDetails(label, content) {
        const element = this.wrap("details", this.wrap("summary", label) + content);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML image tag to the summary buffer
       *
       * @param {string} src path to the image you to embed
       * @param {string} alt text description of the image
       * @param {SummaryImageOptions} options (optional) addition image attributes
       *
       * @returns {Summary} summary instance
       */
      addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(Object.assign({}, width && { width }), height && { height });
        const element = this.wrap("img", null, Object.assign({ src, alt }, attrs));
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML section heading element
       *
       * @param {string} text heading text
       * @param {number | string} [level=1] (optional) the heading level, default: 1
       *
       * @returns {Summary} summary instance
       */
      addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag) ? tag : "h1";
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML thematic break (<hr>) to the summary buffer
       *
       * @returns {Summary} summary instance
       */
      addSeparator() {
        const element = this.wrap("hr", null);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML line break (<br>) to the summary buffer
       *
       * @returns {Summary} summary instance
       */
      addBreak() {
        const element = this.wrap("br", null);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML blockquote to the summary buffer
       *
       * @param {string} text quote text
       * @param {string} cite (optional) citation url
       *
       * @returns {Summary} summary instance
       */
      addQuote(text, cite) {
        const attrs = Object.assign({}, cite && { cite });
        const element = this.wrap("blockquote", text, attrs);
        return this.addRaw(element).addEOL();
      }
      /**
       * Adds an HTML anchor tag to the summary buffer
       *
       * @param {string} text link text/content
       * @param {string} href hyperlink
       *
       * @returns {Summary} summary instance
       */
      addLink(text, href) {
        const element = this.wrap("a", text, { href });
        return this.addRaw(element).addEOL();
      }
    }
    const _summary = new Summary();
    exports.markdownSummary = _summary;
    exports.summary = _summary;
  })(summary);
  return summary;
}
var pathUtils = {};
var hasRequiredPathUtils;
function requirePathUtils() {
  if (hasRequiredPathUtils)
    return pathUtils;
  hasRequiredPathUtils = 1;
  var __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar2 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding2(result, mod, k);
    }
    __setModuleDefault2(result, mod);
    return result;
  };
  Object.defineProperty(pathUtils, "__esModule", { value: true });
  pathUtils.toPlatformPath = pathUtils.toWin32Path = pathUtils.toPosixPath = void 0;
  const path$1 = __importStar2(path);
  function toPosixPath(pth) {
    return pth.replace(/[\\]/g, "/");
  }
  pathUtils.toPosixPath = toPosixPath;
  function toWin32Path(pth) {
    return pth.replace(/[/]/g, "\\");
  }
  pathUtils.toWin32Path = toWin32Path;
  function toPlatformPath(pth) {
    return pth.replace(/[/\\]/g, path$1.sep);
  }
  pathUtils.toPlatformPath = toPlatformPath;
  return pathUtils;
}
var platform = {};
var exec = {};
var toolrunner = {};
var io = {};
var ioUtil = {};
var hasRequiredIoUtil;
function requireIoUtil() {
  if (hasRequiredIoUtil)
    return ioUtil;
  hasRequiredIoUtil = 1;
  (function(exports) {
    var __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault2(result, mod);
      return result;
    };
    var __awaiter2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getCmdPath = exports.tryGetExecutablePath = exports.isRooted = exports.isDirectory = exports.exists = exports.READONLY = exports.UV_FS_O_EXLOCK = exports.IS_WINDOWS = exports.unlink = exports.symlink = exports.stat = exports.rmdir = exports.rm = exports.rename = exports.readlink = exports.readdir = exports.open = exports.mkdir = exports.lstat = exports.copyFile = exports.chmod = void 0;
    const fs2 = __importStar2(fs$1);
    const path$1 = __importStar2(path);
    _a = fs2.promises, exports.chmod = _a.chmod, exports.copyFile = _a.copyFile, exports.lstat = _a.lstat, exports.mkdir = _a.mkdir, exports.open = _a.open, exports.readdir = _a.readdir, exports.readlink = _a.readlink, exports.rename = _a.rename, exports.rm = _a.rm, exports.rmdir = _a.rmdir, exports.stat = _a.stat, exports.symlink = _a.symlink, exports.unlink = _a.unlink;
    exports.IS_WINDOWS = process.platform === "win32";
    exports.UV_FS_O_EXLOCK = 268435456;
    exports.READONLY = fs2.constants.O_RDONLY;
    function exists(fsPath) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          yield exports.stat(fsPath);
        } catch (err) {
          if (err.code === "ENOENT") {
            return false;
          }
          throw err;
        }
        return true;
      });
    }
    exports.exists = exists;
    function isDirectory(fsPath, useStat = false) {
      return __awaiter2(this, void 0, void 0, function* () {
        const stats = useStat ? yield exports.stat(fsPath) : yield exports.lstat(fsPath);
        return stats.isDirectory();
      });
    }
    exports.isDirectory = isDirectory;
    function isRooted(p) {
      p = normalizeSeparators(p);
      if (!p) {
        throw new Error('isRooted() parameter "p" cannot be empty');
      }
      if (exports.IS_WINDOWS) {
        return p.startsWith("\\") || /^[A-Z]:/i.test(p);
      }
      return p.startsWith("/");
    }
    exports.isRooted = isRooted;
    function tryGetExecutablePath(filePath, extensions) {
      return __awaiter2(this, void 0, void 0, function* () {
        let stats = void 0;
        try {
          stats = yield exports.stat(filePath);
        } catch (err) {
          if (err.code !== "ENOENT") {
            console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
          }
        }
        if (stats && stats.isFile()) {
          if (exports.IS_WINDOWS) {
            const upperExt = path$1.extname(filePath).toUpperCase();
            if (extensions.some((validExt) => validExt.toUpperCase() === upperExt)) {
              return filePath;
            }
          } else {
            if (isUnixExecutable(stats)) {
              return filePath;
            }
          }
        }
        const originalFilePath = filePath;
        for (const extension of extensions) {
          filePath = originalFilePath + extension;
          stats = void 0;
          try {
            stats = yield exports.stat(filePath);
          } catch (err) {
            if (err.code !== "ENOENT") {
              console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
            }
          }
          if (stats && stats.isFile()) {
            if (exports.IS_WINDOWS) {
              try {
                const directory = path$1.dirname(filePath);
                const upperName = path$1.basename(filePath).toUpperCase();
                for (const actualName of yield exports.readdir(directory)) {
                  if (upperName === actualName.toUpperCase()) {
                    filePath = path$1.join(directory, actualName);
                    break;
                  }
                }
              } catch (err) {
                console.log(`Unexpected error attempting to determine the actual case of the file '${filePath}': ${err}`);
              }
              return filePath;
            } else {
              if (isUnixExecutable(stats)) {
                return filePath;
              }
            }
          }
        }
        return "";
      });
    }
    exports.tryGetExecutablePath = tryGetExecutablePath;
    function normalizeSeparators(p) {
      p = p || "";
      if (exports.IS_WINDOWS) {
        p = p.replace(/\//g, "\\");
        return p.replace(/\\\\+/g, "\\");
      }
      return p.replace(/\/\/+/g, "/");
    }
    function isUnixExecutable(stats) {
      return (stats.mode & 1) > 0 || (stats.mode & 8) > 0 && stats.gid === process.getgid() || (stats.mode & 64) > 0 && stats.uid === process.getuid();
    }
    function getCmdPath() {
      var _a2;
      return (_a2 = process.env["COMSPEC"]) !== null && _a2 !== void 0 ? _a2 : `cmd.exe`;
    }
    exports.getCmdPath = getCmdPath;
  })(ioUtil);
  return ioUtil;
}
var hasRequiredIo;
function requireIo() {
  if (hasRequiredIo)
    return io;
  hasRequiredIo = 1;
  var __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() {
      return m[k];
    } });
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar2 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.hasOwnProperty.call(mod, k))
          __createBinding2(result, mod, k);
    }
    __setModuleDefault2(result, mod);
    return result;
  };
  var __awaiter2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(io, "__esModule", { value: true });
  io.findInPath = io.which = io.mkdirP = io.rmRF = io.mv = io.cp = void 0;
  const assert_1 = require$$0$3;
  const path$1 = __importStar2(path);
  const ioUtil2 = __importStar2(requireIoUtil());
  function cp(source, dest, options = {}) {
    return __awaiter2(this, void 0, void 0, function* () {
      const { force, recursive, copySourceDirectory } = readCopyOptions(options);
      const destStat = (yield ioUtil2.exists(dest)) ? yield ioUtil2.stat(dest) : null;
      if (destStat && destStat.isFile() && !force) {
        return;
      }
      const newDest = destStat && destStat.isDirectory() && copySourceDirectory ? path$1.join(dest, path$1.basename(source)) : dest;
      if (!(yield ioUtil2.exists(source))) {
        throw new Error(`no such file or directory: ${source}`);
      }
      const sourceStat = yield ioUtil2.stat(source);
      if (sourceStat.isDirectory()) {
        if (!recursive) {
          throw new Error(`Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`);
        } else {
          yield cpDirRecursive(source, newDest, 0, force);
        }
      } else {
        if (path$1.relative(source, newDest) === "") {
          throw new Error(`'${newDest}' and '${source}' are the same file`);
        }
        yield copyFile(source, newDest, force);
      }
    });
  }
  io.cp = cp;
  function mv(source, dest, options = {}) {
    return __awaiter2(this, void 0, void 0, function* () {
      if (yield ioUtil2.exists(dest)) {
        let destExists = true;
        if (yield ioUtil2.isDirectory(dest)) {
          dest = path$1.join(dest, path$1.basename(source));
          destExists = yield ioUtil2.exists(dest);
        }
        if (destExists) {
          if (options.force == null || options.force) {
            yield rmRF(dest);
          } else {
            throw new Error("Destination already exists");
          }
        }
      }
      yield mkdirP(path$1.dirname(dest));
      yield ioUtil2.rename(source, dest);
    });
  }
  io.mv = mv;
  function rmRF(inputPath) {
    return __awaiter2(this, void 0, void 0, function* () {
      if (ioUtil2.IS_WINDOWS) {
        if (/[*"<>|]/.test(inputPath)) {
          throw new Error('File path must not contain `*`, `"`, `<`, `>` or `|` on Windows');
        }
      }
      try {
        yield ioUtil2.rm(inputPath, {
          force: true,
          maxRetries: 3,
          recursive: true,
          retryDelay: 300
        });
      } catch (err) {
        throw new Error(`File was unable to be removed ${err}`);
      }
    });
  }
  io.rmRF = rmRF;
  function mkdirP(fsPath) {
    return __awaiter2(this, void 0, void 0, function* () {
      assert_1.ok(fsPath, "a path argument must be provided");
      yield ioUtil2.mkdir(fsPath, { recursive: true });
    });
  }
  io.mkdirP = mkdirP;
  function which(tool, check) {
    return __awaiter2(this, void 0, void 0, function* () {
      if (!tool) {
        throw new Error("parameter 'tool' is required");
      }
      if (check) {
        const result = yield which(tool, false);
        if (!result) {
          if (ioUtil2.IS_WINDOWS) {
            throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`);
          } else {
            throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`);
          }
        }
        return result;
      }
      const matches = yield findInPath(tool);
      if (matches && matches.length > 0) {
        return matches[0];
      }
      return "";
    });
  }
  io.which = which;
  function findInPath(tool) {
    return __awaiter2(this, void 0, void 0, function* () {
      if (!tool) {
        throw new Error("parameter 'tool' is required");
      }
      const extensions = [];
      if (ioUtil2.IS_WINDOWS && process.env["PATHEXT"]) {
        for (const extension of process.env["PATHEXT"].split(path$1.delimiter)) {
          if (extension) {
            extensions.push(extension);
          }
        }
      }
      if (ioUtil2.isRooted(tool)) {
        const filePath = yield ioUtil2.tryGetExecutablePath(tool, extensions);
        if (filePath) {
          return [filePath];
        }
        return [];
      }
      if (tool.includes(path$1.sep)) {
        return [];
      }
      const directories = [];
      if (process.env.PATH) {
        for (const p of process.env.PATH.split(path$1.delimiter)) {
          if (p) {
            directories.push(p);
          }
        }
      }
      const matches = [];
      for (const directory of directories) {
        const filePath = yield ioUtil2.tryGetExecutablePath(path$1.join(directory, tool), extensions);
        if (filePath) {
          matches.push(filePath);
        }
      }
      return matches;
    });
  }
  io.findInPath = findInPath;
  function readCopyOptions(options) {
    const force = options.force == null ? true : options.force;
    const recursive = Boolean(options.recursive);
    const copySourceDirectory = options.copySourceDirectory == null ? true : Boolean(options.copySourceDirectory);
    return { force, recursive, copySourceDirectory };
  }
  function cpDirRecursive(sourceDir, destDir, currentDepth, force) {
    return __awaiter2(this, void 0, void 0, function* () {
      if (currentDepth >= 255)
        return;
      currentDepth++;
      yield mkdirP(destDir);
      const files = yield ioUtil2.readdir(sourceDir);
      for (const fileName of files) {
        const srcFile = `${sourceDir}/${fileName}`;
        const destFile = `${destDir}/${fileName}`;
        const srcFileStat = yield ioUtil2.lstat(srcFile);
        if (srcFileStat.isDirectory()) {
          yield cpDirRecursive(srcFile, destFile, currentDepth, force);
        } else {
          yield copyFile(srcFile, destFile, force);
        }
      }
      yield ioUtil2.chmod(destDir, (yield ioUtil2.stat(sourceDir)).mode);
    });
  }
  function copyFile(srcFile, destFile, force) {
    return __awaiter2(this, void 0, void 0, function* () {
      if ((yield ioUtil2.lstat(srcFile)).isSymbolicLink()) {
        try {
          yield ioUtil2.lstat(destFile);
          yield ioUtil2.unlink(destFile);
        } catch (e) {
          if (e.code === "EPERM") {
            yield ioUtil2.chmod(destFile, "0666");
            yield ioUtil2.unlink(destFile);
          }
        }
        const symlinkFull = yield ioUtil2.readlink(srcFile);
        yield ioUtil2.symlink(symlinkFull, destFile, ioUtil2.IS_WINDOWS ? "junction" : null);
      } else if (!(yield ioUtil2.exists(destFile)) || force) {
        yield ioUtil2.copyFile(srcFile, destFile);
      }
    });
  }
  return io;
}
var hasRequiredToolrunner;
function requireToolrunner() {
  if (hasRequiredToolrunner)
    return toolrunner;
  hasRequiredToolrunner = 1;
  var __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() {
      return m[k];
    } });
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar2 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.hasOwnProperty.call(mod, k))
          __createBinding2(result, mod, k);
    }
    __setModuleDefault2(result, mod);
    return result;
  };
  var __awaiter2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(toolrunner, "__esModule", { value: true });
  toolrunner.argStringToArray = toolrunner.ToolRunner = void 0;
  const os2 = __importStar2(require$$0);
  const events2 = __importStar2(require$$4);
  const child = __importStar2(require$$2$2);
  const path$1 = __importStar2(path);
  const io2 = __importStar2(requireIo());
  const ioUtil2 = __importStar2(requireIoUtil());
  const timers_1 = require$$6$1;
  const IS_WINDOWS = process.platform === "win32";
  class ToolRunner extends events2.EventEmitter {
    constructor(toolPath, args, options) {
      super();
      if (!toolPath) {
        throw new Error("Parameter 'toolPath' cannot be null or empty.");
      }
      this.toolPath = toolPath;
      this.args = args || [];
      this.options = options || {};
    }
    _debug(message) {
      if (this.options.listeners && this.options.listeners.debug) {
        this.options.listeners.debug(message);
      }
    }
    _getCommandString(options, noPrefix) {
      const toolPath = this._getSpawnFileName();
      const args = this._getSpawnArgs(options);
      let cmd = noPrefix ? "" : "[command]";
      if (IS_WINDOWS) {
        if (this._isCmdFile()) {
          cmd += toolPath;
          for (const a of args) {
            cmd += ` ${a}`;
          }
        } else if (options.windowsVerbatimArguments) {
          cmd += `"${toolPath}"`;
          for (const a of args) {
            cmd += ` ${a}`;
          }
        } else {
          cmd += this._windowsQuoteCmdArg(toolPath);
          for (const a of args) {
            cmd += ` ${this._windowsQuoteCmdArg(a)}`;
          }
        }
      } else {
        cmd += toolPath;
        for (const a of args) {
          cmd += ` ${a}`;
        }
      }
      return cmd;
    }
    _processLineBuffer(data, strBuffer, onLine) {
      try {
        let s = strBuffer + data.toString();
        let n = s.indexOf(os2.EOL);
        while (n > -1) {
          const line = s.substring(0, n);
          onLine(line);
          s = s.substring(n + os2.EOL.length);
          n = s.indexOf(os2.EOL);
        }
        return s;
      } catch (err) {
        this._debug(`error processing line. Failed with error ${err}`);
        return "";
      }
    }
    _getSpawnFileName() {
      if (IS_WINDOWS) {
        if (this._isCmdFile()) {
          return process.env["COMSPEC"] || "cmd.exe";
        }
      }
      return this.toolPath;
    }
    _getSpawnArgs(options) {
      if (IS_WINDOWS) {
        if (this._isCmdFile()) {
          let argline = `/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;
          for (const a of this.args) {
            argline += " ";
            argline += options.windowsVerbatimArguments ? a : this._windowsQuoteCmdArg(a);
          }
          argline += '"';
          return [argline];
        }
      }
      return this.args;
    }
    _endsWith(str, end) {
      return str.endsWith(end);
    }
    _isCmdFile() {
      const upperToolPath = this.toolPath.toUpperCase();
      return this._endsWith(upperToolPath, ".CMD") || this._endsWith(upperToolPath, ".BAT");
    }
    _windowsQuoteCmdArg(arg) {
      if (!this._isCmdFile()) {
        return this._uvQuoteCmdArg(arg);
      }
      if (!arg) {
        return '""';
      }
      const cmdSpecialChars = [
        " ",
        "	",
        "&",
        "(",
        ")",
        "[",
        "]",
        "{",
        "}",
        "^",
        "=",
        ";",
        "!",
        "'",
        "+",
        ",",
        "`",
        "~",
        "|",
        "<",
        ">",
        '"'
      ];
      let needsQuotes = false;
      for (const char of arg) {
        if (cmdSpecialChars.some((x) => x === char)) {
          needsQuotes = true;
          break;
        }
      }
      if (!needsQuotes) {
        return arg;
      }
      let reverse = '"';
      let quoteHit = true;
      for (let i = arg.length; i > 0; i--) {
        reverse += arg[i - 1];
        if (quoteHit && arg[i - 1] === "\\") {
          reverse += "\\";
        } else if (arg[i - 1] === '"') {
          quoteHit = true;
          reverse += '"';
        } else {
          quoteHit = false;
        }
      }
      reverse += '"';
      return reverse.split("").reverse().join("");
    }
    _uvQuoteCmdArg(arg) {
      if (!arg) {
        return '""';
      }
      if (!arg.includes(" ") && !arg.includes("	") && !arg.includes('"')) {
        return arg;
      }
      if (!arg.includes('"') && !arg.includes("\\")) {
        return `"${arg}"`;
      }
      let reverse = '"';
      let quoteHit = true;
      for (let i = arg.length; i > 0; i--) {
        reverse += arg[i - 1];
        if (quoteHit && arg[i - 1] === "\\") {
          reverse += "\\";
        } else if (arg[i - 1] === '"') {
          quoteHit = true;
          reverse += "\\";
        } else {
          quoteHit = false;
        }
      }
      reverse += '"';
      return reverse.split("").reverse().join("");
    }
    _cloneExecOptions(options) {
      options = options || {};
      const result = {
        cwd: options.cwd || process.cwd(),
        env: options.env || process.env,
        silent: options.silent || false,
        windowsVerbatimArguments: options.windowsVerbatimArguments || false,
        failOnStdErr: options.failOnStdErr || false,
        ignoreReturnCode: options.ignoreReturnCode || false,
        delay: options.delay || 1e4
      };
      result.outStream = options.outStream || process.stdout;
      result.errStream = options.errStream || process.stderr;
      return result;
    }
    _getSpawnOptions(options, toolPath) {
      options = options || {};
      const result = {};
      result.cwd = options.cwd;
      result.env = options.env;
      result["windowsVerbatimArguments"] = options.windowsVerbatimArguments || this._isCmdFile();
      if (options.windowsVerbatimArguments) {
        result.argv0 = `"${toolPath}"`;
      }
      return result;
    }
    /**
     * Exec a tool.
     * Output will be streamed to the live console.
     * Returns promise with return code
     *
     * @param     tool     path to tool to exec
     * @param     options  optional exec options.  See ExecOptions
     * @returns   number
     */
    exec() {
      return __awaiter2(this, void 0, void 0, function* () {
        if (!ioUtil2.isRooted(this.toolPath) && (this.toolPath.includes("/") || IS_WINDOWS && this.toolPath.includes("\\"))) {
          this.toolPath = path$1.resolve(process.cwd(), this.options.cwd || process.cwd(), this.toolPath);
        }
        this.toolPath = yield io2.which(this.toolPath, true);
        return new Promise((resolve, reject) => __awaiter2(this, void 0, void 0, function* () {
          this._debug(`exec tool: ${this.toolPath}`);
          this._debug("arguments:");
          for (const arg of this.args) {
            this._debug(`   ${arg}`);
          }
          const optionsNonNull = this._cloneExecOptions(this.options);
          if (!optionsNonNull.silent && optionsNonNull.outStream) {
            optionsNonNull.outStream.write(this._getCommandString(optionsNonNull) + os2.EOL);
          }
          const state = new ExecState(optionsNonNull, this.toolPath);
          state.on("debug", (message) => {
            this._debug(message);
          });
          if (this.options.cwd && !(yield ioUtil2.exists(this.options.cwd))) {
            return reject(new Error(`The cwd: ${this.options.cwd} does not exist!`));
          }
          const fileName = this._getSpawnFileName();
          const cp = child.spawn(fileName, this._getSpawnArgs(optionsNonNull), this._getSpawnOptions(this.options, fileName));
          let stdbuffer = "";
          if (cp.stdout) {
            cp.stdout.on("data", (data) => {
              if (this.options.listeners && this.options.listeners.stdout) {
                this.options.listeners.stdout(data);
              }
              if (!optionsNonNull.silent && optionsNonNull.outStream) {
                optionsNonNull.outStream.write(data);
              }
              stdbuffer = this._processLineBuffer(data, stdbuffer, (line) => {
                if (this.options.listeners && this.options.listeners.stdline) {
                  this.options.listeners.stdline(line);
                }
              });
            });
          }
          let errbuffer = "";
          if (cp.stderr) {
            cp.stderr.on("data", (data) => {
              state.processStderr = true;
              if (this.options.listeners && this.options.listeners.stderr) {
                this.options.listeners.stderr(data);
              }
              if (!optionsNonNull.silent && optionsNonNull.errStream && optionsNonNull.outStream) {
                const s = optionsNonNull.failOnStdErr ? optionsNonNull.errStream : optionsNonNull.outStream;
                s.write(data);
              }
              errbuffer = this._processLineBuffer(data, errbuffer, (line) => {
                if (this.options.listeners && this.options.listeners.errline) {
                  this.options.listeners.errline(line);
                }
              });
            });
          }
          cp.on("error", (err) => {
            state.processError = err.message;
            state.processExited = true;
            state.processClosed = true;
            state.CheckComplete();
          });
          cp.on("exit", (code) => {
            state.processExitCode = code;
            state.processExited = true;
            this._debug(`Exit code ${code} received from tool '${this.toolPath}'`);
            state.CheckComplete();
          });
          cp.on("close", (code) => {
            state.processExitCode = code;
            state.processExited = true;
            state.processClosed = true;
            this._debug(`STDIO streams have closed for tool '${this.toolPath}'`);
            state.CheckComplete();
          });
          state.on("done", (error, exitCode) => {
            if (stdbuffer.length > 0) {
              this.emit("stdline", stdbuffer);
            }
            if (errbuffer.length > 0) {
              this.emit("errline", errbuffer);
            }
            cp.removeAllListeners();
            if (error) {
              reject(error);
            } else {
              resolve(exitCode);
            }
          });
          if (this.options.input) {
            if (!cp.stdin) {
              throw new Error("child process missing stdin");
            }
            cp.stdin.end(this.options.input);
          }
        }));
      });
    }
  }
  toolrunner.ToolRunner = ToolRunner;
  function argStringToArray(argString) {
    const args = [];
    let inQuotes = false;
    let escaped = false;
    let arg = "";
    function append(c) {
      if (escaped && c !== '"') {
        arg += "\\";
      }
      arg += c;
      escaped = false;
    }
    for (let i = 0; i < argString.length; i++) {
      const c = argString.charAt(i);
      if (c === '"') {
        if (!escaped) {
          inQuotes = !inQuotes;
        } else {
          append(c);
        }
        continue;
      }
      if (c === "\\" && escaped) {
        append(c);
        continue;
      }
      if (c === "\\" && inQuotes) {
        escaped = true;
        continue;
      }
      if (c === " " && !inQuotes) {
        if (arg.length > 0) {
          args.push(arg);
          arg = "";
        }
        continue;
      }
      append(c);
    }
    if (arg.length > 0) {
      args.push(arg.trim());
    }
    return args;
  }
  toolrunner.argStringToArray = argStringToArray;
  class ExecState extends events2.EventEmitter {
    constructor(options, toolPath) {
      super();
      this.processClosed = false;
      this.processError = "";
      this.processExitCode = 0;
      this.processExited = false;
      this.processStderr = false;
      this.delay = 1e4;
      this.done = false;
      this.timeout = null;
      if (!toolPath) {
        throw new Error("toolPath must not be empty");
      }
      this.options = options;
      this.toolPath = toolPath;
      if (options.delay) {
        this.delay = options.delay;
      }
    }
    CheckComplete() {
      if (this.done) {
        return;
      }
      if (this.processClosed) {
        this._setResult();
      } else if (this.processExited) {
        this.timeout = timers_1.setTimeout(ExecState.HandleTimeout, this.delay, this);
      }
    }
    _debug(message) {
      this.emit("debug", message);
    }
    _setResult() {
      let error;
      if (this.processExited) {
        if (this.processError) {
          error = new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`);
        } else if (this.processExitCode !== 0 && !this.options.ignoreReturnCode) {
          error = new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`);
        } else if (this.processStderr && this.options.failOnStdErr) {
          error = new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`);
        }
      }
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.done = true;
      this.emit("done", error, this.processExitCode);
    }
    static HandleTimeout(state) {
      if (state.done) {
        return;
      }
      if (!state.processClosed && state.processExited) {
        const message = `The STDIO streams did not close within ${state.delay / 1e3} seconds of the exit event from process '${state.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
        state._debug(message);
      }
      state._setResult();
    }
  }
  return toolrunner;
}
var hasRequiredExec;
function requireExec() {
  if (hasRequiredExec)
    return exec;
  hasRequiredExec = 1;
  var __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() {
      return m[k];
    } });
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar2 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.hasOwnProperty.call(mod, k))
          __createBinding2(result, mod, k);
    }
    __setModuleDefault2(result, mod);
    return result;
  };
  var __awaiter2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(exec, "__esModule", { value: true });
  exec.getExecOutput = exec.exec = void 0;
  const string_decoder_1 = require$$6;
  const tr = __importStar2(requireToolrunner());
  function exec$1(commandLine, args, options) {
    return __awaiter2(this, void 0, void 0, function* () {
      const commandArgs = tr.argStringToArray(commandLine);
      if (commandArgs.length === 0) {
        throw new Error(`Parameter 'commandLine' cannot be null or empty.`);
      }
      const toolPath = commandArgs[0];
      args = commandArgs.slice(1).concat(args || []);
      const runner = new tr.ToolRunner(toolPath, args, options);
      return runner.exec();
    });
  }
  exec.exec = exec$1;
  function getExecOutput(commandLine, args, options) {
    var _a, _b;
    return __awaiter2(this, void 0, void 0, function* () {
      let stdout = "";
      let stderr = "";
      const stdoutDecoder = new string_decoder_1.StringDecoder("utf8");
      const stderrDecoder = new string_decoder_1.StringDecoder("utf8");
      const originalStdoutListener = (_a = options === null || options === void 0 ? void 0 : options.listeners) === null || _a === void 0 ? void 0 : _a.stdout;
      const originalStdErrListener = (_b = options === null || options === void 0 ? void 0 : options.listeners) === null || _b === void 0 ? void 0 : _b.stderr;
      const stdErrListener = (data) => {
        stderr += stderrDecoder.write(data);
        if (originalStdErrListener) {
          originalStdErrListener(data);
        }
      };
      const stdOutListener = (data) => {
        stdout += stdoutDecoder.write(data);
        if (originalStdoutListener) {
          originalStdoutListener(data);
        }
      };
      const listeners = Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.listeners), { stdout: stdOutListener, stderr: stdErrListener });
      const exitCode = yield exec$1(commandLine, args, Object.assign(Object.assign({}, options), { listeners }));
      stdout += stdoutDecoder.end();
      stderr += stderrDecoder.end();
      return {
        exitCode,
        stdout,
        stderr
      };
    });
  }
  exec.getExecOutput = getExecOutput;
  return exec;
}
var hasRequiredPlatform;
function requirePlatform() {
  if (hasRequiredPlatform)
    return platform;
  hasRequiredPlatform = 1;
  (function(exports) {
    var __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault2(result, mod);
      return result;
    };
    var __awaiter2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getDetails = exports.isLinux = exports.isMacOS = exports.isWindows = exports.arch = exports.platform = void 0;
    const os_1 = __importDefault(require$$0);
    const exec2 = __importStar2(requireExec());
    const getWindowsInfo = () => __awaiter2(void 0, void 0, void 0, function* () {
      const { stdout: version } = yield exec2.getExecOutput('powershell -command "(Get-CimInstance -ClassName Win32_OperatingSystem).Version"', void 0, {
        silent: true
      });
      const { stdout: name } = yield exec2.getExecOutput('powershell -command "(Get-CimInstance -ClassName Win32_OperatingSystem).Caption"', void 0, {
        silent: true
      });
      return {
        name: name.trim(),
        version: version.trim()
      };
    });
    const getMacOsInfo = () => __awaiter2(void 0, void 0, void 0, function* () {
      var _a, _b, _c, _d;
      const { stdout } = yield exec2.getExecOutput("sw_vers", void 0, {
        silent: true
      });
      const version = (_b = (_a = stdout.match(/ProductVersion:\s*(.+)/)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : "";
      const name = (_d = (_c = stdout.match(/ProductName:\s*(.+)/)) === null || _c === void 0 ? void 0 : _c[1]) !== null && _d !== void 0 ? _d : "";
      return {
        name,
        version
      };
    });
    const getLinuxInfo = () => __awaiter2(void 0, void 0, void 0, function* () {
      const { stdout } = yield exec2.getExecOutput("lsb_release", ["-i", "-r", "-s"], {
        silent: true
      });
      const [name, version] = stdout.trim().split("\n");
      return {
        name,
        version
      };
    });
    exports.platform = os_1.default.platform();
    exports.arch = os_1.default.arch();
    exports.isWindows = exports.platform === "win32";
    exports.isMacOS = exports.platform === "darwin";
    exports.isLinux = exports.platform === "linux";
    function getDetails() {
      return __awaiter2(this, void 0, void 0, function* () {
        return Object.assign(Object.assign({}, yield exports.isWindows ? getWindowsInfo() : exports.isMacOS ? getMacOsInfo() : getLinuxInfo()), {
          platform: exports.platform,
          arch: exports.arch,
          isWindows: exports.isWindows,
          isMacOS: exports.isMacOS,
          isLinux: exports.isLinux
        });
      });
    }
    exports.getDetails = getDetails;
  })(platform);
  return platform;
}
var hasRequiredCore;
function requireCore() {
  if (hasRequiredCore)
    return core;
  hasRequiredCore = 1;
  (function(exports) {
    var __createBinding2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault2(result, mod);
      return result;
    };
    var __awaiter2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.platform = exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = exports.markdownSummary = exports.summary = exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
    const command_1 = command;
    const file_command_1 = fileCommand;
    const utils_12 = utils$1;
    const os2 = __importStar2(require$$0);
    const path$1 = __importStar2(path);
    const oidc_utils_1 = requireOidcUtils();
    var ExitCode;
    (function(ExitCode2) {
      ExitCode2[ExitCode2["Success"] = 0] = "Success";
      ExitCode2[ExitCode2["Failure"] = 1] = "Failure";
    })(ExitCode || (exports.ExitCode = ExitCode = {}));
    function exportVariable(name, val) {
      const convertedVal = (0, utils_12.toCommandValue)(val);
      process.env[name] = convertedVal;
      const filePath = process.env["GITHUB_ENV"] || "";
      if (filePath) {
        return (0, file_command_1.issueFileCommand)("ENV", (0, file_command_1.prepareKeyValueMessage)(name, val));
      }
      (0, command_1.issueCommand)("set-env", { name }, convertedVal);
    }
    exports.exportVariable = exportVariable;
    function setSecret(secret) {
      (0, command_1.issueCommand)("add-mask", {}, secret);
    }
    exports.setSecret = setSecret;
    function addPath(inputPath) {
      const filePath = process.env["GITHUB_PATH"] || "";
      if (filePath) {
        (0, file_command_1.issueFileCommand)("PATH", inputPath);
      } else {
        (0, command_1.issueCommand)("add-path", {}, inputPath);
      }
      process.env["PATH"] = `${inputPath}${path$1.delimiter}${process.env["PATH"]}`;
    }
    exports.addPath = addPath;
    function getInput(name, options) {
      const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
      if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
      }
      if (options && options.trimWhitespace === false) {
        return val;
      }
      return val.trim();
    }
    exports.getInput = getInput;
    function getMultilineInput(name, options) {
      const inputs = getInput(name, options).split("\n").filter((x) => x !== "");
      if (options && options.trimWhitespace === false) {
        return inputs;
      }
      return inputs.map((input) => input.trim());
    }
    exports.getMultilineInput = getMultilineInput;
    function getBooleanInput(name, options) {
      const trueValue = ["true", "True", "TRUE"];
      const falseValue = ["false", "False", "FALSE"];
      const val = getInput(name, options);
      if (trueValue.includes(val))
        return true;
      if (falseValue.includes(val))
        return false;
      throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
    }
    exports.getBooleanInput = getBooleanInput;
    function setOutput(name, value) {
      const filePath = process.env["GITHUB_OUTPUT"] || "";
      if (filePath) {
        return (0, file_command_1.issueFileCommand)("OUTPUT", (0, file_command_1.prepareKeyValueMessage)(name, value));
      }
      process.stdout.write(os2.EOL);
      (0, command_1.issueCommand)("set-output", { name }, (0, utils_12.toCommandValue)(value));
    }
    exports.setOutput = setOutput;
    function setCommandEcho(enabled) {
      (0, command_1.issue)("echo", enabled ? "on" : "off");
    }
    exports.setCommandEcho = setCommandEcho;
    function setFailed(message) {
      process.exitCode = ExitCode.Failure;
      error(message);
    }
    exports.setFailed = setFailed;
    function isDebug() {
      return process.env["RUNNER_DEBUG"] === "1";
    }
    exports.isDebug = isDebug;
    function debug2(message) {
      (0, command_1.issueCommand)("debug", {}, message);
    }
    exports.debug = debug2;
    function error(message, properties = {}) {
      (0, command_1.issueCommand)("error", (0, utils_12.toCommandProperties)(properties), message instanceof Error ? message.toString() : message);
    }
    exports.error = error;
    function warning(message, properties = {}) {
      (0, command_1.issueCommand)("warning", (0, utils_12.toCommandProperties)(properties), message instanceof Error ? message.toString() : message);
    }
    exports.warning = warning;
    function notice(message, properties = {}) {
      (0, command_1.issueCommand)("notice", (0, utils_12.toCommandProperties)(properties), message instanceof Error ? message.toString() : message);
    }
    exports.notice = notice;
    function info(message) {
      process.stdout.write(message + os2.EOL);
    }
    exports.info = info;
    function startGroup(name) {
      (0, command_1.issue)("group", name);
    }
    exports.startGroup = startGroup;
    function endGroup() {
      (0, command_1.issue)("endgroup");
    }
    exports.endGroup = endGroup;
    function group(name, fn) {
      return __awaiter2(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
          result = yield fn();
        } finally {
          endGroup();
        }
        return result;
      });
    }
    exports.group = group;
    function saveState(name, value) {
      const filePath = process.env["GITHUB_STATE"] || "";
      if (filePath) {
        return (0, file_command_1.issueFileCommand)("STATE", (0, file_command_1.prepareKeyValueMessage)(name, value));
      }
      (0, command_1.issueCommand)("save-state", { name }, (0, utils_12.toCommandValue)(value));
    }
    exports.saveState = saveState;
    function getState(name) {
      return process.env[`STATE_${name}`] || "";
    }
    exports.getState = getState;
    function getIDToken(aud) {
      return __awaiter2(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
      });
    }
    exports.getIDToken = getIDToken;
    var summary_1 = requireSummary();
    Object.defineProperty(exports, "summary", { enumerable: true, get: function() {
      return summary_1.summary;
    } });
    var summary_2 = requireSummary();
    Object.defineProperty(exports, "markdownSummary", { enumerable: true, get: function() {
      return summary_2.markdownSummary;
    } });
    var path_utils_1 = requirePathUtils();
    Object.defineProperty(exports, "toPosixPath", { enumerable: true, get: function() {
      return path_utils_1.toPosixPath;
    } });
    Object.defineProperty(exports, "toWin32Path", { enumerable: true, get: function() {
      return path_utils_1.toWin32Path;
    } });
    Object.defineProperty(exports, "toPlatformPath", { enumerable: true, get: function() {
      return path_utils_1.toPlatformPath;
    } });
    exports.platform = __importStar2(requirePlatform());
  })(core);
  return core;
}
var coreExports = requireCore();
const root = process.cwd();
const copy_all_demos = (source_dir, dest_dir, demos_to_copy) => {
  for (const demo of demos_to_copy) {
    fs$1.cpSync(path.join(source_dir, demo), path.join(dest_dir, demo), {
      recursive: true,
      force: true
    });
  }
};
function read_demos_from_json(json_path) {
  try {
    const data = fs$1.readFileSync(json_path, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading demos from ${json_path}:`, error.message);
    process.exit(1);
  }
}
async function run() {
  const khulnasoft_version = coreExports.getInput("khulnasoft_version");
  const khulnasoft_client_version = coreExports.getInput("khulnasoft_client_version");
  const config_path = coreExports.getInput("config_path") || path.join(root, ".config", "demos.json");
  if (!khulnasoft_version || !khulnasoft_client_version) {
    console.error(
      "Usage: node script.js <khulnasoft_version> <khulnasoft_client_version> [config_path]"
    );
    process.exit(1);
  }
  console.log(`Reading demos list from: ${config_path}`);
  const demos_to_copy = read_demos_from_json(config_path);
  const source_dir = path.join(root, "demo");
  const dest_dir = path.join(root, "demo", "all_demos", "demos");
  copy_all_demos(source_dir, dest_dir, demos_to_copy);
  const reqs_file_path = path.join(
    root,
    "demo",
    "all_demos",
    "requirements.txt"
  );
  const requirements = `
${khulnasoft_client_version}
${khulnasoft_version}
pypistats==1.1.0
plotly
matplotlib
altair
vega_datasets
	`.trim();
  fs$1.writeFileSync(reqs_file_path, requirements);
  console.log("Demos copied and requirements updated successfully.");
}
run();
