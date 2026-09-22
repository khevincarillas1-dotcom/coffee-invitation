import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

function formatTime(timeValue) {
  if (!timeValue) return "";

  const [hours, minutes] = timeValue.split(":");
  const hour = Number(hours);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minutes} ${period}`;
}

function CoffeeCup() {
  return (
    <motion.div
      className="coffee-area"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2.5, repeat: Infinity }}
    >
      <div className="steam steam1">〰</div>
      <div className="steam steam2">〰</div>
      <div className="steam steam3">〰</div>

      <div className="cup">
        <div className="coffee"></div>
      </div>

      <div className="handle"></div>
      <div className="saucer"></div>
    </motion.div>
  );
}

function Heart({ left, delay }) {
  return (
    <motion.div
      className="heart"
      style={{ left }}
      initial={{ y: "100vh", opacity: 0 }}
      animate={{
        y: "-20vh",
        opacity: [0, 0.8, 0],
        x: [0, 20, -20, 0]
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity
      }}
    >
      ♥
    </motion.div>
  );
}

function Bouquet() {
  const flowers = [
    { symbol: "🌷", className: "flower flower-left", delay: 0.15 },
    { symbol: "🌸", className: "flower flower-center", delay: 0 },
    { symbol: "🌹", className: "flower flower-right", delay: 0.3 }
  ];

  return (
    <motion.div
      className="bouquet"
      initial={{ opacity: 0, y: 18, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      aria-label="A bouquet of flowers"
    >
      <div className="bouquet-stems">
        <span className="leaf leaf-left">⌁</span>
        <span className="leaf leaf-right">⌁</span>
      </div>

      {flowers.map((flower) => (
        <motion.span
          className={flower.className}
          key={flower.className}
          initial={{ opacity: 0, y: 12, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, delay: flower.delay, type: "spring" }}
        >
          {flower.symbol}
        </motion.span>
      ))}
    </motion.div>
  );
}

function App() {
  const [page, setPage] = useState(1);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");

  const [noPosition, setNoPosition] = useState({
    x: 0,
    y: 0
  });

  function moveButton() {
    setNoPosition({
      x: Math.random() * 220 - 110,
      y: Math.random() * 160 - 80
    });
  }

 async function confirmDate() {

    if (!date || !time) {
        alert("Choose a date and time first ☕");
        return;
    }

    try {

        const response = await fetch(
          "./save_response.php",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    date: date,
                    time: time,
                    shop: place,
                    message: "Looking forward to it! ❤️"
                })
            }
        );

        const data = await response.json();

        if (data.success) {

            setPage(3);

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert(
            "Could not connect to the server."
        );

    }
}

  return (
    <div className="app">

      {/* Floating hearts */}
      <Heart left="10%" delay={0} />
      <Heart left="25%" delay={2} />
      <Heart left="45%" delay={1} />
      <Heart left="65%" delay={3} />
      <Heart left="85%" delay={1.5} />

      <AnimatePresence mode="wait">

        {/* PAGE 1 */}
        {page === 1 && (
          <motion.div
            className="card"
            key="page1"
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.7 }}
          >

            <CoffeeCup />

            <motion.p
              className="small-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Hey, I have a little question.
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Wanna grab coffee with me?
            </motion.h1>

            <motion.p
              className="subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              Just you, me, and a cup of coffee. ☕
            </motion.p>

            <div className="buttons">

              <motion.button
                className="yes"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage(2)}
              >
                Yes, I'd love to! ☕
              </motion.button>

              <motion.button
                className="no"
                animate={{
                  x: noPosition.x,
                  y: noPosition.y
                }}
                transition={{
                  type: "spring",
                  stiffness: 300
                }}
                onMouseEnter={moveButton}
                onClick={moveButton}
              >
                Nooo, I can't. 😢
              </motion.button>

            </div>

          </motion.div>
        )}

        {/* PAGE 2 */}
        {page === 2 && (
          <motion.div
            className="card"
            key="page2"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >

            <motion.div
              className="celebrate"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [-5, 5, -5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            >
              ☕❤️
            </motion.div>

            <h1>Yay! You said yes! 🥹</h1>

            <p className="subtitle">
              I was hoping you would.
            </p>

            <div className="form">

              <label>When are you free?</label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <label>What time?</label>

              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />

              <label>Where should we get coffee?</label>

              <input
                type="text"
                placeholder="Your favorite coffee shop ☕"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />

              <motion.button
                className="yes confirm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={confirmDate}
              >
                Let's get coffee ❤️
              </motion.button>

            </div>

          </motion.div>
        )}

        {/* PAGE 3 */}
        {page === 3 && (
          <motion.div
            className="card"
            key="page3"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              type: "spring"
            }}
          >

            <motion.div
              className="big-heart"
              animate={{
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity
              }}
            >
              ❤️
            </motion.div>

            <h1>It's a coffee date! ☕</h1>

            <p className="subtitle">
              I'll see you on...
            </p>

            <Bouquet />

            <div className="details">

              <strong>📅 {date}</strong>

              <span>🕐 {formatTime(time)}</span>

              {place && (
                <span>📍 {place}</span>
              )}

            </div>

            <p className="message">
              Looking forward to seeing you. ❤️
              <br />
              — Khev
            </p>

            <div className="final-coffee">
              ☕
            </div>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}

export default App;