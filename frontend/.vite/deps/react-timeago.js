import {
  require_react
} from "./chunk-TVFQMRVC.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/react-timeago/es6/index.js
var React = __toESM(require_react());
var import_react = __toESM(require_react());

// node_modules/react-timeago/es6/dateParser.js
function dateParser(date) {
  const parsed = new Date(date);
  if (!Number.isNaN(parsed.valueOf())) {
    return parsed;
  }
  const parts = String(date).match(/\d+/g);
  if (parts == null || parts.length <= 2) {
    return parsed;
  } else {
    const [firstP, secondP, ...restPs] = parts.map((x) => parseInt(x));
    const correctedParts = [firstP, secondP - 1, ...restPs];
    const isoDate = new Date(Date.UTC(...correctedParts));
    return isoDate;
  }
}

// node_modules/react-timeago/es6/defaultFormatter.js
var defaultFormatter = (value, _unit, suffix) => {
  const unit = value !== 1 ? _unit + "s" : _unit;
  return value + " " + unit + " " + suffix;
};
var defaultFormatter_default = defaultFormatter;

// node_modules/react-timeago/es6/index.js
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
var MINUTE = 60;
var HOUR = MINUTE * 60;
var DAY = HOUR * 24;
var WEEK = DAY * 7;
var MONTH = DAY * 30;
var YEAR = DAY * 365;
var defaultNow = () => Date.now();
function TimeAgo({
  date,
  formatter,
  component = "time",
  live = true,
  minPeriod = 0,
  maxPeriod = WEEK,
  title,
  now = defaultNow,
  ...passDownProps
}) {
  const [timeNow, setTimeNow] = (0, import_react.useState)(now());
  (0, import_react.useEffect)(() => {
    if (!live) {
      return;
    }
    const tick = () => {
      const then2 = dateParser(date).valueOf();
      if (!then2) {
        console.warn("[react-timeago] Invalid Date provided");
        return 0;
      }
      const seconds2 = Math.round(Math.abs(timeNow - then2) / 1e3);
      const unboundPeriod = seconds2 < MINUTE ? 1e3 : seconds2 < HOUR ? 1e3 * MINUTE : seconds2 < DAY ? 1e3 * HOUR : 1e3 * WEEK;
      const period = Math.min(Math.max(unboundPeriod, minPeriod * 1e3), maxPeriod * 1e3);
      if (period) {
        return setTimeout(() => {
          setTimeNow(now());
        }, period);
      }
      return 0;
    };
    const timeoutId = tick();
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [date, live, maxPeriod, minPeriod, now, timeNow]);
  (0, import_react.useEffect)(() => {
    setTimeNow(now());
  }, [date]);
  const Komponent = component;
  const then = dateParser(date).valueOf();
  if (!then) {
    return null;
  }
  const seconds = Math.round(Math.abs(timeNow - then) / 1e3);
  const suffix = then < timeNow ? "ago" : "from now";
  const [value, unit] = seconds < MINUTE ? [Math.round(seconds), "second"] : seconds < HOUR ? [Math.round(seconds / MINUTE), "minute"] : seconds < DAY ? [Math.round(seconds / HOUR), "hour"] : seconds < WEEK ? [Math.round(seconds / DAY), "day"] : seconds < MONTH ? [Math.round(seconds / WEEK), "week"] : seconds < YEAR ? [Math.round(seconds / MONTH), "month"] : [Math.round(seconds / YEAR), "year"];
  const passDownTitle = typeof title === "undefined" ? typeof date === "string" ? date : dateParser(date).toISOString().substring(0, 16).replace("T", " ") : title;
  const spreadProps = Komponent === "time" ? {
    ...passDownProps,
    dateTime: dateParser(date).toISOString()
  } : passDownProps;
  const nextFormatter = (value2 = value2, unit2 = unit2, suffix2 = suffix2, epochMilliseconds = then, nextFormatter2 = defaultFormatter_default, now2 = now2) => defaultFormatter_default(value2, unit2, suffix2, epochMilliseconds, nextFormatter2, now2);
  const effectiveFormatter = formatter || defaultFormatter_default;
  let content;
  try {
    content = effectiveFormatter(value, unit, suffix, then, nextFormatter, now);
    if (!content) {
      content = defaultFormatter_default(value, unit, suffix, then, nextFormatter, now);
    }
  } catch (error) {
    console.error("[react-timeago] Formatter threw an error:", error);
    content = defaultFormatter_default(value, unit, suffix, then, nextFormatter, now);
  }
  return React.createElement(Komponent, _extends({}, spreadProps, {
    title: passDownTitle
  }), content);
}
export {
  TimeAgo as default
};
//# sourceMappingURL=react-timeago.js.map
