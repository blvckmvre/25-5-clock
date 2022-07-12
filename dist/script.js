const sound = "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav";

const App = () => {
  const [time, setTime] = React.useState(1500);
  const [session, setSession] = React.useState(25);
  const [breaks, setBreaks] = React.useState(5);
  const [isBreak, setIsBreak] = React.useState(false);
  const [isDisabled, setDisabled] = React.useState(false);
  const timer = React.useRef(null);
  const audio = React.useRef(null);

  React.useEffect(() => {
    if (!isBreak)
    setTime(session * 60);
  }, [isBreak, session]);

  React.useEffect(() => {
    if (isBreak)
    setTime(breaks * 60);
  }, [isBreak, breaks]);

  React.useEffect(() => {
    if (time === 0) {
      if (!isBreak) {
        setTime(breaks * 60);
        setIsBreak(true);
      } else {
        setTime(session * 60);
        setIsBreak(false);
      }
      audio.current.currentTime = 0;
      audio.current.play();
    }
  }, [time, isBreak]);

  const countDown = () => {
    if (!timer.current) {
      setDisabled(true);
      timer.current = setInterval(() => {
        setTime(p => p - 1);
      }, 1000);
    } else

    {
      clearInterval(timer.current);
      timer.current = null;
      setDisabled(false);
    }
  };

  const formatTime = React.useCallback(() => {
    let mins = Math.floor(time / 60),
    secs = time - 60 * mins;
    if (mins < 10) mins = '0' + mins;
    if (secs < 10) secs = '0' + secs;
    return `${mins}:${secs}`;
  }, [time]);

  const reset = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    if (isBreak)
    setIsBreak(false);
    if (isDisabled)
    setDisabled(false);
    setSession(25);
    setBreaks(5);
    setTime(1500);
  };

  return /*#__PURE__*/(
    React.createElement("div", { id: "app-wrapper" }, /*#__PURE__*/
    React.createElement("audio", { id: "beep", ref: audio, src: sound }), /*#__PURE__*/
    React.createElement("div", { id: "label-wrapper" }, /*#__PURE__*/
    React.createElement("h1", { id: "timer-label" },
    isBreak ? "Break" : "Session"), /*#__PURE__*/

    React.createElement("div", { className: "btns-wrapper" }, /*#__PURE__*/
    React.createElement("button", { id: "start_stop",
      onClick: countDown }, /*#__PURE__*/

    React.createElement("i", { className:

      `fa-solid fa-${isDisabled ? "stop" : "play"}` })), /*#__PURE__*/



    React.createElement("button", { id: "reset",
      onClick: reset }, /*#__PURE__*/

    React.createElement("i", { className: "fa-solid fa-rotate" })))), /*#__PURE__*/



    React.createElement(MainDisplay, { time: formatTime() }), /*#__PURE__*/
    React.createElement(ConfigBar, {
      id: "session",
      data: session,
      cb: setSession,
      isDisabled: isDisabled }), /*#__PURE__*/

    React.createElement(ConfigBar, {
      id: "break",
      data: breaks,
      cb: setBreaks,
      isDisabled: isDisabled })));



};

const MainDisplay = ({ time }) => {
  return /*#__PURE__*/(
    React.createElement("div", { id: "display" }, /*#__PURE__*/
    React.createElement("h1", { id: "time-left" }, time)));


};

const ConfigBar = ({ id, data, cb, isDisabled }) => {
  const inc = () => {
    if (data < 60)
    cb(p => p + 1);
  };
  const dec = () => {
    if (data > 1)
    cb(p => p - 1);
  };
  return /*#__PURE__*/(
    React.createElement("div", { className: "config" }, /*#__PURE__*/
    React.createElement("h3", { id: id + "-label" },
    (id + " length").toUpperCase()), /*#__PURE__*/

    React.createElement("h2", { id: id + "-length" }, data), /*#__PURE__*/
    React.createElement("div", { className: "btns-wrapper" }, /*#__PURE__*/
    React.createElement("button", {
      id: id + "-decrement",
      disabled: isDisabled,
      onClick: dec }, /*#__PURE__*/

    React.createElement("i", { className: "fa-solid fa-backward-step" })), /*#__PURE__*/

    React.createElement("button", {
      id: id + "-increment",
      disabled: isDisabled,
      onClick: inc }, /*#__PURE__*/

    React.createElement("i", { className: "fa-solid fa-forward-step" })))));




};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(App, null));