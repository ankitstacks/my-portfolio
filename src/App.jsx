import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import {
  FaGithub,
  FaArrowRight,
  FaReact,
  FaNodeJs,
  FaExternalLinkAlt,
  FaTimes,
  FaCheckCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCode,
  FaDownload,
  FaFilePdf,
  FaGamepad,
  FaTrophy,
  FaBars,
  FaTerminal,
  FaChevronRight,
  FaBolt,
  FaEye,
  FaRobot,
} from "react-icons/fa";

import { SiPostgresql } from "react-icons/si";

/* =========================================================
   MAGNETIC BUTTON
========================================================= */

function MagneticButton({
  children,
  className = "",
  onClick,
  type = "button",
}) {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x =
      (e.clientX - (rect.left + rect.width / 2)) *
      0.12;

    const y =
      (e.clientY - (rect.top + rect.height / 2)) *
      0.12;

    setPosition({ x, y });
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={() =>
        setPosition({ x: 0, y: 0 })
      }
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 20,
      }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/* =========================================================
   HOVER CARD
========================================================= */

function HoverCard({
  children,
  className = "",
}) {
  const [spot, setSpot] = useState({
    x: 50,
    y: 50,
  });

  const handleMove = (e) => {
    const rect =
      e.currentTarget.getBoundingClientRect();

    setSpot({
      x:
        ((e.clientX - rect.left) /
          rect.width) *
        100,
      y:
        ((e.clientY - rect.top) /
          rect.height) *
        100,
    });
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `
          radial-gradient(
            circle at ${spot.x}% ${spot.y}%,
            rgba(0,245,255,0.10),
            transparent 35%
          )
        `,
      }}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   SKILL CARD
========================================================= */

function SkillCard({
  icon,
  title,
  skills,
  color = "cyan",
}) {
  const styles =
    color === "pink"
      ? {
          border: "border-fuchsia-500/20",
          glow: "from-fuchsia-500/15",
          icon: "text-fuchsia-400",
          bar: "bg-fuchsia-400",
        }
      : {
          border: "border-cyan-400/20",
          glow: "from-cyan-400/15",
          icon: "text-cyan-300",
          bar: "bg-cyan-400",
        };

  return (
    <HoverCard
      className={`group rounded-2xl border
      ${styles.border} bg-[#0b111b]/90 p-6
      backdrop-blur-xl`}
    >
      <div
        className={`absolute inset-0
        bg-gradient-to-br ${styles.glow}
        to-transparent opacity-0
        transition group-hover:opacity-100`}
      />

      <div className="relative">
        <div className="mb-5 flex items-center gap-4">
          <div
            className={`flex h-12 w-12
            items-center justify-center rounded-xl
            border border-white/10 bg-white/5
            text-2xl ${styles.icon}`}
          >
            {icon}
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">
              {title}
            </h3>

            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Skill Module
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-300">
                  {skill.name}
                </span>

                <span className={styles.icon}>
                  {skill.level}%
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${skill.level}%`,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                  }}
                  className={`h-full rounded-full ${styles.bar}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </HoverCard>
  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({
  project,
  index,
  onOpen,
}) {
  return (
    <HoverCard
      className="group rounded-2xl border
      border-cyan-400/10 bg-[#0b111b]/90
      backdrop-blur-xl transition
      hover:border-cyan-400/30"
    >
      {/* PROJECT IMAGE */}

      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-56 w-full object-cover
          transition duration-700
          group-hover:scale-105"
        />

        <div
          className="absolute inset-0
          bg-gradient-to-t
          from-[#080c14] via-transparent
          to-transparent"
        />

        <div
          className="absolute left-4 top-4
          rounded-full border
          border-cyan-400/30
          bg-black/60 px-3 py-1
          text-xs font-semibold
          uppercase tracking-wider
          text-cyan-300 backdrop-blur"
        >
          {project.category}
        </div>

        <div
          className="absolute right-4 top-4
          flex h-10 w-10 items-center
          justify-center rounded-full
          border border-white/10
          bg-black/60 text-xs font-bold
          text-white backdrop-blur"
        >
          0{index + 1}
        </div>
      </div>

      {/* PROJECT CONTENT */}

      <div className="p-6">
        <div
          className="mb-3 flex items-center
          gap-2 text-xs uppercase
          tracking-[0.2em]
          text-fuchsia-400"
        >
          {project.isAI ? (
            <FaRobot />
          ) : (
            <FaTerminal />
          )}

          Mission
        </div>

        <h3 className="text-xl font-bold text-white">
          {project.title}
        </h3>

        <p
          className="mt-3 line-clamp-3
          text-sm leading-6 text-slate-400"
        >
          {project.description}
        </p>

        {/* TECH */}

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="rounded-md border
              border-white/10 bg-white/[0.03]
              px-2.5 py-1 text-xs
              text-slate-300"
            >
              {item}
            </span>
          ))}
        </div>

        {/* ACTIONS */}

        <div
          className="mt-6 flex flex-wrap
          items-center justify-between
          gap-3 border-t border-white/10
          pt-5"
        >
          <button
            onClick={() => onOpen(project)}
            className="group/details flex
            items-center gap-2 text-sm
            font-semibold text-cyan-300
            transition hover:text-cyan-200"
          >
            View Details

            <FaArrowRight
              className="text-xs transition
              group-hover/details:translate-x-1"
            />
          </button>

          <div className="flex items-center gap-2">
            {/* LIVE PREVIEW */}

            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="flex items-center
                gap-2 rounded-lg
                border border-cyan-400/30
                bg-cyan-400/5 px-3 py-2
                text-xs font-semibold
                text-cyan-300
                transition
                hover:border-cyan-400/60
                hover:bg-cyan-400
                hover:text-black"
              >
                <FaEye />
                Live Preview
              </a>
            ) : (
              <span
                className="flex cursor-not-allowed
                items-center gap-2
                rounded-lg
                border border-cyan-400/10
                bg-cyan-400/[0.02]
                px-3 py-2 text-xs
                font-semibold
                text-cyan-400/30"
              >
                <FaEye />
                Live Preview
              </span>
            )}

            {/* GITHUB */}

            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              title="View source code"
              className="flex h-9 w-9
              items-center justify-center
              rounded-lg border
              border-white/10
              bg-white/5
              text-slate-300
              transition
              hover:border-fuchsia-400/40
              hover:text-fuchsia-300"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </HoverCard>
  );
}

/* =========================================================
   TIC TAC TOE
========================================================= */

function TicTacToe() {
  const [board, setBoard] = useState(
    Array(9).fill("")
  );

  const [winner, setWinner] = useState(null);

  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (nextBoard) => {
    for (const [a, b, c] of combinations) {
      if (
        nextBoard[a] &&
        nextBoard[a] === nextBoard[b] &&
        nextBoard[a] === nextBoard[c]
      ) {
        return nextBoard[a];
      }
    }

    if (nextBoard.every(Boolean)) {
      return "draw";
    }

    return null;
  };

  const play = (index) => {
    if (board[index] || winner) return;

    const next = [...board];

    next[index] = "X";

    const humanWinner = checkWinner(next);

    if (humanWinner) {
      setBoard(next);
      setWinner(humanWinner);
      return;
    }

    const empty = next
      .map((value, i) =>
        !value ? i : null
      )
      .filter((i) => i !== null);

    if (!empty.length) {
      setBoard(next);
      setWinner("draw");
      return;
    }

    const computerMove =
      empty[
        Math.floor(
          Math.random() * empty.length
        )
      ];

    next[computerMove] = "O";

    setBoard(next);

    const computerWinner =
      checkWinner(next);

    if (computerWinner) {
      setWinner(computerWinner);
    }
  };

  const reset = () => {
    setBoard(Array(9).fill(""));
    setWinner(null);
  };

  return (
    <div className="mt-8">
      <div className="mx-auto grid max-w-xs grid-cols-3 gap-2">
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => play(index)}
            className="flex aspect-square
            items-center justify-center
            rounded-xl border
            border-white/10 bg-white/[0.03]
            text-3xl font-black transition
            hover:border-cyan-400/40
            hover:bg-cyan-400/5"
          >
            <span
              className={
                value === "X"
                  ? "text-cyan-300"
                  : "text-fuchsia-400"
              }
            >
              {value}
            </span>
          </button>
        ))}
      </div>

      {winner && (
        <div className="mt-6 text-center">
          <p className="text-xl font-bold">
            {winner === "draw"
              ? "It's a Draw!"
              : `${winner} wins!`}
          </p>

          <button
            onClick={reset}
            className="mt-4 rounded-lg
            bg-cyan-400 px-5 py-2
            text-sm font-bold text-black"
          >
            Play Again
          </button>
        </div>
      )}

      {!winner && (
        <p className="mt-5 text-center text-xs text-slate-600">
          You are X · Computer is O
        </p>
      )}
    </div>
  );
}

/* =========================================================
   MAIN APP
========================================================= */

export default function App() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [selectedProject, setSelectedProject] =
    useState(null);

  const [showResume, setShowResume] =
    useState(false);

  const [formStatus, setFormStatus] =
    useState("");

  const [isSending, setIsSending] =
    useState(false);

  const [cursor, setCursor] = useState({
    x: -500,
    y: -500,
  });

  const [game, setGame] =
    useState(null);

  const [reactionStarted, setReactionStarted] =
    useState(false);

  const [reactionTime, setReactionTime] =
    useState(null);

  const [reactionStart, setReactionStart] =
    useState(null);

  /* =======================================================
     CURSOR
  ======================================================= */

  useEffect(() => {
    const moveCursor = (e) => {
      setCursor({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener(
      "mousemove",
      moveCursor
    );

    return () =>
      window.removeEventListener(
        "mousemove",
        moveCursor
      );
  }, []);

  /* =======================================================
     PROJECTS
  ======================================================= */

  const projects = [
    {
      title:
        "Product Recommendation System",

      category:
        "Hackathon Project",

      image:
        "/recommendation.png",

      description:
        "An interactive AI-powered product discovery platform featuring catalogue browsing, search, category filtering, favourites, recently viewed products and personalized recommendations.",

      tech: [
        "HTML",
        "CSS",
        "JavaScript",
        "Python",
        "PostgreSQL",
      ],

      features: [
        "Product catalogue",
        "Product search",
        "Category filtering",
        "Favourite products",
        "Recently viewed products",
        "AI recommendations",
        "PostgreSQL backend",
      ],

      github:
        "https://github.com/ankitstacks",

      /* LIVE PROJECT */

      live:
        "https://productrecommendationai.vercel.app/",

      isAI: true,
    },

    {
      title:
        "Cutout AI",

      category:
        "AI Background Remover",

      image:
        "/projects/ai-app.png",

      description:
        "An AI-powered image background remover that lets users upload images, automatically detect the main subject, remove the background and download a clean transparent image.",

      tech: [
        "React",
        "Node.js",
        "AI",
        "Image Processing",
      ],

      features: [
        "Image upload",
        "AI background removal",
        "Automatic subject detection",
        "Clean edge processing",
        "Transparent PNG output",
        "Download processed image",
      ],

      github:
        "https://github.com/ankitstacks",

      /* LIVE PROJECT */

      live:
        "https://cutout-ai-7qn2.onrender.com/",

      isAI: true,
    },

    {
      title:
        "CareerGuide AI",

      category:
        "AI Career Platform",

      image:
        "/projects/ai-app.png",

      description:
        "An AI-focused career platform that analyzes resumes, extracts skills and connects user skills with relevant career opportunities and job roles.",

      tech: [
        "HTML",
        "CSS",
        "JavaScript",
        "Java",
        "Servlets",
        "MySQL",
        "AI",
      ],

      features: [
        "Resume upload",
        "Skill extraction",
        "Job role selection",
        "Skill comparison",
        "Career suggestions",
        "Job recommendations",
      ],

      github:
        "https://github.com/ankitstacks",

      live: "",

      isAI: true,
    },
  ];

  /* =======================================================
     CONTACT FORM
  ======================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSending(true);
    setFormStatus("");

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        "https://formspree.io/f/mqpaogoj",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept:
              "application/json",
          },
        }
      );

      if (response.ok) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    } finally {
      setIsSending(false);

      setTimeout(() => {
        setFormStatus("");
      }, 6000);
    }
  };

  /* =======================================================
     REACTION GAME
  ======================================================= */

  const startReactionGame = () => {
    setReactionStarted(false);
    setReactionTime(null);

    const delay =
      Math.floor(
        Math.random() * 2500
      ) + 1500;

    setTimeout(() => {
      setReactionStarted(true);
      setReactionStart(Date.now());
    }, delay);
  };

  const handleReactionClick = () => {
    if (!reactionStarted) return;

    const result =
      Date.now() - reactionStart;

    setReactionTime(result);
    setReactionStarted(false);
  };

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const navItems = [
    ["Home", "home"],
    ["About", "about"],
    ["Skills", "skills"],
    ["Projects", "projects"],
    ["Arcade", "arcade"],
    ["Contact", "contact"],
  ];

  /* =======================================================
     URL HASH NAVIGATION
  ======================================================= */

  useEffect(() => {
    const updateHashFromScroll = () => {
      const marker = window.scrollY + 180;
      let currentSection = "home";

      navItems.forEach(([, id]) => {
        const section = document.getElementById(id);

        if (section && section.offsetTop <= marker) {
          currentSection = id;
        }
      });

      const nextHash = `#${currentSection}`;

      if (window.location.hash !== nextHash) {
        window.history.replaceState(
          null,
          "",
          nextHash
        );
      }
    };

    const scrollToHash = () => {
      const id = window.location.hash.replace(
        "#",
        ""
      );

      if (!id) return;

      const section = document.getElementById(id);

      if (section) {
        setTimeout(() => {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 50);
      }
    };

    window.addEventListener(
      "scroll",
      updateHashFromScroll,
      { passive: true }
    );

    window.addEventListener(
      "popstate",
      scrollToHash
    );

    window.addEventListener(
      "hashchange",
      scrollToHash
    );

    if (window.location.hash) {
      scrollToHash();
    } else {
      updateHashFromScroll();
    }

    return () => {
      window.removeEventListener(
        "scroll",
        updateHashFromScroll
      );
      window.removeEventListener(
        "popstate",
        scrollToHash
      );
      window.removeEventListener(
        "hashchange",
        scrollToHash
      );
    };
  }, []);

  const scrollTo = (id) => {
    const section = document.getElementById(id);

    if (!section) return;

    window.history.pushState(
      null,
      "",
      `#${id}`
    );

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMenuOpen(false);
  };

  return (
    <div
      className="min-h-screen
      overflow-x-hidden
      bg-[#060a12] text-white
      selection:bg-cyan-400
      selection:text-black"
    >
      {/* ===================================================
          CURSOR GLOW
      =================================================== */}

      <div
        className="pointer-events-none fixed
        z-[9999] hidden h-72 w-72
        -translate-x-1/2
        -translate-y-1/2
        rounded-full bg-cyan-400/10
        blur-3xl md:block"
        style={{
          left: cursor.x,
          top: cursor.y,
        }}
      />

      <div
        className="pointer-events-none fixed
        z-[9998] hidden h-64 w-64
        -translate-x-1/2
        -translate-y-1/2
        rounded-full bg-fuchsia-500/10
        blur-3xl md:block"
        style={{
          left: cursor.x + 120,
          top: cursor.y + 80,
        }}
      />

      {/* ===================================================
          GRID
      =================================================== */}

      <div
        className="pointer-events-none fixed
        inset-0 z-0 opacity-[0.16]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(0,245,255,0.18) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(0,245,255,0.18) 1px,
              transparent 1px
            )
          `,
          backgroundSize:
            "24px 24px",
        }}
      />

      {/* ===================================================
          NAVBAR
      =================================================== */}

      <header className="fixed left-0 right-0 top-0 z-50">
        <div
          className="mx-auto mt-3
          max-w-7xl px-4 sm:px-6"
        >
          <nav
            className="flex h-16
            items-center justify-between
            rounded-xl border
            border-cyan-400/10
            bg-[#080d16]/85 px-5
            shadow-2xl
            backdrop-blur-xl"
          >
            <button
              onClick={() =>
                scrollTo("home")
              }
              className="group flex
              items-center gap-2"
            >
              <span
                className="text-xl font-black
                tracking-tight
                bg-gradient-to-r
                from-cyan-300 via-white
                to-fuchsia-400
                bg-clip-text
                text-transparent"
              >
                AK.
              </span>

              <span
                className="hidden text-[10px]
                uppercase
                tracking-[0.25em]
                text-slate-600 sm:block"
              >
                developer
              </span>
            </button>

            <div
              className="hidden items-center
              gap-7 lg:flex"
            >
              {navItems.map(
                ([label, id]) => (
                  <button
                    key={id}
                    onClick={() =>
                      scrollTo(id)
                    }
                    className="group relative
                    text-[11px]
                    uppercase
                    tracking-wider
                    text-slate-400
                    transition
                    hover:text-cyan-300"
                  >
                    <span className="text-cyan-400">
                      _
                    </span>

                    {label}

                    <span
                      className="absolute
                      -bottom-2 left-0
                      h-px w-0
                      bg-cyan-400
                      transition-all
                      duration-300
                      group-hover:w-full"
                    />
                  </button>
                )
              )}
            </div>

            <MagneticButton
              onClick={() =>
                scrollTo("contact")
              }
              className="hidden rounded-md
              border border-fuchsia-500/60
              bg-fuchsia-500/10
              px-5 py-2.5
              text-xs font-bold
              uppercase tracking-wider
              text-fuchsia-300
              transition
              hover:bg-fuchsia-500
              hover:text-white lg:block"
            >
              _contact
            </MagneticButton>

            <button
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              className="flex h-10 w-10
              items-center justify-center
              rounded-lg border
              border-white/10
              bg-white/5
              text-slate-300 lg:hidden"
            >
              {menuOpen ? (
                <FaTimes />
              ) : (
                <FaBars />
              )}
            </button>
          </nav>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                className="mt-2 rounded-xl
                border border-cyan-400/10
                bg-[#080d16]/95 p-4
                backdrop-blur-xl lg:hidden"
              >
                {navItems.map(
                  ([label, id]) => (
                    <button
                      key={id}
                      onClick={() =>
                        scrollTo(id)
                      }
                      className="flex w-full
                      items-center gap-2
                      border-b
                      border-white/5
                      py-4 text-left
                      text-sm uppercase
                      tracking-wider
                      text-slate-300"
                    >
                      <span className="text-cyan-400">
                        _
                      </span>

                      {label}
                    </button>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ===================================================
          HERO
      =================================================== */}

      <section
        id="home"
        className="relative scroll-mt-24 flex
        min-h-screen items-center
        pt-28"
      >
        <div
          className="mx-auto grid max-w-7xl
          items-center gap-14 px-6 py-20
          lg:grid-cols-2"
        >
          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <div
              className="mb-6 inline-flex
              items-center gap-2
              rounded-full
              border border-cyan-400/30
              bg-cyan-400/5 px-4 py-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-cyan-300"
            >
              <span
                className="h-2 w-2
                animate-pulse rounded-full
                bg-cyan-400"
              />

              Full Stack Developer
            </div>

            <h1
              className="max-w-3xl
              text-5xl font-black
              leading-[0.95]
              tracking-tight
              sm:text-6xl
              lg:text-7xl"
            >
              Crafting Code
              <br />

              <span
                className="bg-gradient-to-r
                from-cyan-300
                to-cyan-400
                bg-clip-text
                text-transparent"
              >
                That Connect
              </span>

              <br />

              <span
                className="bg-gradient-to-r
                from-fuchsia-400
                to-pink-500
                bg-clip-text
                text-transparent"
              >
                The World
              </span>
            </h1>

            <p
              className="mt-7 max-w-xl
              text-base leading-7
              text-slate-400
              sm:text-lg"
            >
              I build modern web experiences
              with clean code, scalable
              technologies and interactive
              digital experiences.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <MagneticButton
                onClick={() =>
                  scrollTo("contact")
                }
                className="flex
                items-center gap-3
                rounded-md
                bg-gradient-to-r
                from-fuchsia-500
                to-pink-500
                px-6 py-3.5
                text-sm font-bold
                text-white
                shadow-lg
                shadow-fuchsia-500/20"
              >
                Initiate Contact
                <FaPaperPlane />
              </MagneticButton>

              <MagneticButton
                onClick={() =>
                  scrollTo("projects")
                }
                className="flex
                items-center gap-3
                rounded-md
                border
                border-cyan-400/50
                bg-cyan-400/5
                px-6 py-3.5
                text-sm font-bold
                text-cyan-300
                transition
                hover:bg-cyan-400
                hover:text-black"
              >
                View Projects
                <FaArrowRight />
              </MagneticButton>
            </div>

            <div
              className="mt-10 flex
              flex-wrap items-center
              gap-6 text-xs
              text-slate-500"
            >
              <a
                href="https://github.com/ankitstacks"
                target="_blank"
                rel="noreferrer"
                className="flex
                items-center gap-2
                transition
                hover:text-cyan-300"
              >
                <FaGithub />
                GitHub
              </a>

              <a
                href="mailto:ankitkumarkushwaha768@gmail.com"
                className="flex
                items-center gap-2
                transition
                hover:text-cyan-300"
              >
                <FaEnvelope />
                Email
              </a>

              <span className="flex items-center gap-2">
                <span
                  className="h-2 w-2
                  rounded-full
                  bg-cyan-400
                  shadow-lg
                  shadow-cyan-400"
                />

                Available for opportunities
              </span>
            </div>
          </motion.div>

          {/* CODE PANEL */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.9,
              delay: 0.15,
            }}
            className="relative"
          >
            <div
              className="absolute
              -inset-5 rounded-3xl
              bg-cyan-400/10 blur-3xl"
            />

            <div
              className="relative
              overflow-hidden
              rounded-2xl
              border
              border-cyan-400/40
              bg-[#080d16]/95
              shadow-[0_0_45px_rgba(0,245,255,0.12)]"
            >
              <div
                className="flex items-center
                justify-between
                border-b
                border-white/10
                px-5 py-4"
              >
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <span className="h-3 w-3 rounded-full bg-green-400/80" />
                </div>

                <div
                  className="font-mono
                  text-[10px]
                  text-slate-600"
                >
                  developer.js
                </div>

                <div
                  className="h-2 w-2
                  animate-pulse
                  rounded-full
                  bg-cyan-400"
                />
              </div>

              <div
                className="min-h-[360px]
                p-6 font-mono
                text-xs leading-7
                sm:text-sm"
              >
                <p className="text-slate-600">
                  {"// "}
                  Ankit's developer profile
                </p>

                <p className="mt-3">
                  <span className="text-fuchsia-400">
                    const
                  </span>{" "}
                  <span className="text-cyan-300">
                    developer
                  </span>{" "}
                  = {"{"}
                </p>

                <p className="pl-5">
                  <span className="text-fuchsia-300">
                    name:
                  </span>{" "}
                  <span className="text-green-300">
                    "Ankit Kushwaha"
                  </span>
                  ,
                </p>

                <p className="pl-5">
                  <span className="text-fuchsia-300">
                    role:
                  </span>{" "}
                  <span className="text-green-300">
                    "Full Stack Developer"
                  </span>
                  ,
                </p>

                <p className="pl-5">
                  <span className="text-fuchsia-300">
                    frontend:
                  </span>{" "}
                  <span className="text-green-300">
                    ["React", "JavaScript"]
                  </span>
                  ,
                </p>

                <p className="pl-5">
                  <span className="text-fuchsia-300">
                    backend:
                  </span>{" "}
                  <span className="text-green-300">
                    ["Node.js", "Express"]
                  </span>
                  ,
                </p>

                <p className="pl-5">
                  <span className="text-fuchsia-300">
                    database:
                  </span>{" "}
                  <span className="text-green-300">
                    "PostgreSQL"
                  </span>
                  ,
                </p>

                <p className="pl-5">
                  <span className="text-fuchsia-300">
                    mindset:
                  </span>{" "}
                  <span className="text-green-300">
                    "Always Learning"
                  </span>
                </p>

                <p>{"};"}</p>

                <p className="mt-5 text-slate-600">
                  {"// "}
                  build something people remember
                </p>

                <p className="mt-3">
                  <span className="text-fuchsia-400">
                    developer
                  </span>
                  <span className="text-slate-400">
                    .
                  </span>
                  <span className="text-cyan-300">
                    build
                  </span>
                  <span className="text-slate-400">
                    ();
                  </span>
                </p>

                <motion.div
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                  className="mt-2 inline-block
                  h-4 w-2 bg-cyan-400"
                />
              </div>

              <div
                className="flex flex-wrap
                justify-center gap-2
                border-t
                border-white/10
                px-5 py-4"
              >
                {[
                  "React",
                  "Node.js",
                  "PostgreSQL",
                  "AI",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full
                    border
                    border-fuchsia-400/20
                    bg-fuchsia-400/5
                    px-3 py-1
                    text-[10px]
                    text-fuchsia-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================================================
          ABOUT
      =================================================== */}

      <section
        id="about"
        className="relative scroll-mt-24 py-28"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14">
            <p
              className="mb-3 font-mono
              text-xs uppercase
              tracking-[0.3em]
              text-cyan-400"
            >
              _01 / identity
            </p>

            <h2 className="text-4xl font-black sm:text-5xl">
              About{" "}
              <span className="text-cyan-300">
                Me
              </span>
            </h2>
          </div>

          <div
            className="grid gap-8
            lg:grid-cols-[1.2fr_0.8fr]"
          >
            <HoverCard
              className="rounded-2xl
              border border-white/10
              bg-[#0b111b]/90 p-8
              backdrop-blur-xl"
            >
              <h3 className="text-2xl font-bold">
                Who I Am
              </h3>

              <p className="mt-5 leading-8 text-slate-400">
                I'm a passionate Full Stack Developer
                focused on building useful,
                responsive and visually engaging
                web applications. I enjoy turning
                ideas into functional digital products.
              </p>

              <p className="mt-4 leading-8 text-slate-400">
                My development approach combines
                clean interfaces, practical backend
                systems, databases and continuous
                experimentation with modern
                technologies.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Problem Solver",
                  "Creative Thinker",
                  "Fast Learner",
                  "Builder",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full
                    border
                    border-cyan-400/20
                    bg-cyan-400/5
                    px-4 py-2
                    text-xs
                    text-cyan-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </HoverCard>

            <div className="grid grid-cols-2 gap-4">
              {[
                ["3+", "Projects"],
                ["10+", "Technologies"],
                ["1+", "Hackathon"],
                ["∞", "Learning"],
              ].map(
                ([number, label], index) => (
                  <motion.div
                    key={label}
                    whileHover={{
                      scale: 1.03,
                    }}
                    className={`rounded-2xl
                    border p-6 ${
                      index % 2 === 0
                        ? "border-cyan-400/20 bg-cyan-400/[0.04]"
                        : "border-fuchsia-400/20 bg-fuchsia-400/[0.04]"
                    }`}
                  >
                    <div
                      className={`text-4xl
                      font-black ${
                        index % 2 === 0
                          ? "text-cyan-300"
                          : "text-fuchsia-400"
                      }`}
                    >
                      {number}
                    </div>

                    <div className="mt-2 text-sm text-slate-500">
                      {label}
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          SKILLS
      =================================================== */}

      <section
        id="skills"
        className="relative scroll-mt-24 py-28"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14">
            <p
              className="mb-3 font-mono
              text-xs uppercase
              tracking-[0.3em]
              text-fuchsia-400"
            >
              _02 / capabilities
            </p>

            <h2 className="text-4xl font-black sm:text-5xl">
              Technical{" "}
              <span className="text-fuchsia-400">
                Stack
              </span>
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <SkillCard
              title="Frontend"
              icon={<FaReact />}
              color="cyan"
              skills={[
                {
                  name: "HTML",
                  level: 90,
                },
                {
                  name: "CSS",
                  level: 85,
                },
                {
                  name: "JavaScript",
                  level: 80,
                },
                {
                  name: "React",
                  level: 75,
                },
              ]}
            />

            <SkillCard
              title="Backend"
              icon={<FaNodeJs />}
              color="pink"
              skills={[
                {
                  name: "Node.js",
                  level: 78,
                },
                {
                  name: "Express.js",
                  level: 72,
                },
              ]}
            />

            <SkillCard
              title="Database"
              icon={<SiPostgresql />}
              color="cyan"
              skills={[
                {
                  name: "PostgreSQL",
                  level: 75,
                },
                {
                  name: "SQL",
                  level: 75,
                },
              ]}
            />

            <SkillCard
              title="Tools & Development"
              icon={<FaCode />}
              color="pink"
              skills={[
                {
                  name: "Git",
                  level: 82,
                },
                {
                  name: "GitHub",
                  level: 85,
                },
                {
                  name: "VS Code",
                  level: 90,
                },
                {
                  name: "Postman",
                  level: 75,
                },
              ]}
            />
          </div>

          <HoverCard
            className="mt-5 rounded-2xl
            border border-white/10
            bg-[#0b111b]/90 p-7
            backdrop-blur-xl"
          >
            <div
              className="flex flex-col gap-5
              md:flex-row
              md:items-center
              md:justify-between"
            >
              <div>
                <p
                  className="text-xs uppercase
                  tracking-[0.25em]
                  text-slate-600"
                >
                  Currently Exploring
                </p>

                <h3 className="mt-2 text-xl font-bold">
                  Expanding the Stack
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  "Tailwind CSS",
                  "Java",
                  "JDBC",
                  "Servlets",
                  "Spring Boot",
                  "REST APIs",
                  "Machine Learning",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-lg
                    border border-white/10
                    bg-white/[0.03]
                    px-3 py-2
                    text-xs text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </HoverCard>
        </div>
      </section>

      {/* ===================================================
          PROJECTS
      =================================================== */}

      <section
        id="projects"
        className="relative scroll-mt-24 py-28"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div
            className="mb-14 flex
            flex-col justify-between
            gap-5 md:flex-row
            md:items-end"
          >
            <div>
              <p
                className="mb-3 font-mono
                text-xs uppercase
                tracking-[0.3em]
                text-cyan-400"
              >
                _03 / missions
              </p>

              <h2 className="text-4xl font-black sm:text-5xl">
                Selected{" "}
                <span className="text-cyan-300">
                  Projects
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-slate-500">
                Explore my projects, open the source
                code or launch the live application.
              </p>
            </div>

            <a
              href="https://github.com/ankitstacks"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2
              text-sm text-slate-400
              transition
              hover:text-cyan-300"
            >
              View GitHub
              <FaExternalLinkAlt className="text-xs" />
            </a>
          </div>

          <div
            className="grid gap-6
            lg:grid-cols-3"
          >
            {projects.map(
              (project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  onOpen={setSelectedProject}
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* ===================================================
          ARCADE
      =================================================== */}

      <section
        id="arcade"
        className="relative scroll-mt-24 py-28"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <div
              className="mx-auto mb-5 flex h-14
              w-14 items-center
              justify-center rounded-2xl
              border
              border-fuchsia-400/30
              bg-fuchsia-400/10
              text-2xl
              text-fuchsia-400"
            >
              <FaGamepad />
            </div>

            <p
              className="mb-3 font-mono
              text-xs uppercase
              tracking-[0.3em]
              text-fuchsia-400"
            >
              _04 / arcade mode
            </p>

            <h2 className="text-4xl font-black sm:text-5xl">
              Take a{" "}
              <span className="text-fuchsia-400">
                Break
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-slate-500">
              A small interactive corner for visitors.
              Pick a game and play for a moment.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <motion.button
              whileHover={{ y: -7 }}
              onClick={() =>
                setGame("reaction")
              }
              className="group rounded-2xl
              border border-cyan-400/20
              bg-[#0b111b]/90 p-7
              text-left backdrop-blur-xl
              transition
              hover:border-cyan-400/50"
            >
              <div className="flex justify-between">
                <div
                  className="flex h-12 w-12
                  items-center justify-center
                  rounded-xl
                  bg-cyan-400/10
                  text-xl
                  text-cyan-300"
                >
                  <FaBolt />
                </div>

                <FaChevronRight
                  className="text-slate-600
                  transition
                  group-hover:translate-x-1
                  group-hover:text-cyan-300"
                />
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Reaction Test
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Test how quickly you can react.
              </p>
            </motion.button>

            <motion.button
              whileHover={{ y: -7 }}
              onClick={() =>
                setGame("tictactoe")
              }
              className="group rounded-2xl
              border border-fuchsia-400/20
              bg-[#0b111b]/90 p-7
              text-left backdrop-blur-xl
              transition
              hover:border-fuchsia-400/50"
            >
              <div className="flex justify-between">
                <div
                  className="flex h-12 w-12
                  items-center justify-center
                  rounded-xl
                  bg-fuchsia-400/10
                  text-xl
                  text-fuchsia-300"
                >
                  ❌⭕
                </div>

                <FaChevronRight
                  className="text-slate-600
                  transition
                  group-hover:translate-x-1
                  group-hover:text-fuchsia-300"
                />
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Tic Tac Toe
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Challenge yourself against the board.
              </p>
            </motion.button>

            <motion.button
              whileHover={{ y: -7 }}
              onClick={() =>
                scrollTo("projects")
              }
              className="group rounded-2xl
              border border-cyan-400/20
              bg-[#0b111b]/90 p-7
              text-left backdrop-blur-xl
              transition
              hover:border-cyan-400/50"
            >
              <div className="flex justify-between">
                <div
                  className="flex h-12 w-12
                  items-center justify-center
                  rounded-xl
                  bg-cyan-400/10
                  text-xl
                  text-cyan-300"
                >
                  <FaTrophy />
                </div>

                <FaChevronRight
                  className="text-slate-600
                  transition
                  group-hover:translate-x-1
                  group-hover:text-cyan-300"
                />
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Explore Missions
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Explore projects and discover what I built.
              </p>
            </motion.button>
          </div>
        </div>
      </section>

      {/* ===================================================
          CONTACT
      =================================================== */}

      <section
        id="contact"
        className="relative scroll-mt-24 py-28"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14">
            <p
              className="mb-3 font-mono
              text-xs uppercase
              tracking-[0.3em]
              text-fuchsia-400"
            >
              _05 / transmission
            </p>

            <h2 className="text-4xl font-black sm:text-5xl">
              Let's Build{" "}
              <span className="text-fuchsia-400">
                Something
              </span>
            </h2>
          </div>

          <div
            className="grid gap-8
            lg:grid-cols-[0.8fr_1.2fr]"
          >
            <div className="space-y-4">
              <HoverCard
                className="rounded-2xl
                border border-cyan-400/10
                bg-[#0b111b]/90 p-6"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-11 w-11
                    items-center justify-center
                    rounded-xl
                    bg-cyan-400/10
                    text-cyan-300"
                  >
                    <FaEnvelope />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-600">
                      Email
                    </p>

                    <a
                      href="mailto:ankitkumarkushwaha768@gmail.com"
                      className="mt-1 block text-sm
                      text-slate-300
                      hover:text-cyan-300"
                    >
                      ankitkumarkushwaha768@gmail.com
                    </a>
                  </div>
                </div>
              </HoverCard>

              <HoverCard
                className="rounded-2xl
                border
                border-fuchsia-400/10
                bg-[#0b111b]/90 p-6"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-11 w-11
                    items-center justify-center
                    rounded-xl
                    bg-fuchsia-400/10
                    text-fuchsia-300"
                  >
                    <FaPhone />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-600">
                      Phone
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      Available on request
                    </p>
                  </div>
                </div>
              </HoverCard>

              <HoverCard
                className="rounded-2xl
                border border-cyan-400/10
                bg-[#0b111b]/90 p-6"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-11 w-11
                    items-center justify-center
                    rounded-xl
                    bg-cyan-400/10
                    text-cyan-300"
                  >
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-600">
                      Location
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      Indore, Madhya Pradesh
                    </p>
                  </div>
                </div>
              </HoverCard>

              {/* RESUME */}

              <div
                className="rounded-2xl
                border border-white/10
                bg-gradient-to-br
                from-cyan-400/5
                to-fuchsia-400/5 p-6"
              >
                <div className="flex justify-between">
                  <div>
                    <p
                      className="text-xs uppercase
                      tracking-[0.2em]
                      text-slate-600"
                    >
                      Document
                    </p>

                    <h3 className="mt-2 font-bold">
                      My Resume
                    </h3>
                  </div>

                  <FaFilePdf
                    className="text-2xl
                    text-fuchsia-400"
                  />
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() =>
                      setShowResume(true)
                    }
                    className="flex flex-1
                    items-center
                    justify-center gap-2
                    rounded-lg
                    border
                    border-cyan-400/30
                    bg-cyan-400/5 py-3
                    text-xs font-bold
                    text-cyan-300
                    transition
                    hover:bg-cyan-400
                    hover:text-black"
                  >
                    View
                  </button>

                  <a
                    href="/resume.pdf"
                    download="Ankit-Kushwaha-Resume.pdf"
                    className="flex h-11 w-11
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-white/10
                    bg-white/5
                    text-slate-300
                    hover:text-cyan-300"
                  >
                    <FaDownload />
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href="https://github.com/ankitstacks"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11
                  items-center
                  justify-center
                  rounded-xl
                  border border-white/10
                  bg-white/5
                  text-slate-300
                  hover:border-cyan-400/40
                  hover:text-cyan-300"
                >
                  <FaGithub />
                </a>

                <a
                  href="mailto:ankitkumarkushwaha768@gmail.com"
                  className="flex h-11 w-11
                  items-center
                  justify-center
                  rounded-xl
                  border border-white/10
                  bg-white/5
                  text-slate-300
                  hover:border-fuchsia-400/40
                  hover:text-fuchsia-300"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl
              border
              border-cyan-400/10
              bg-[#0b111b]/90
              p-6 backdrop-blur-xl
              sm:p-8"
            >
              <div
                className="grid gap-5
                sm:grid-cols-2"
              >
                <div>
                  <label
                    className="mb-2 block
                    text-xs uppercase
                    tracking-wider
                    text-slate-500"
                  >
                    Your Name
                  </label>

                  <input
                    required
                    name="user_name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full rounded-lg
                    border border-white/10
                    bg-white/[0.03]
                    px-4 py-3
                    text-sm text-white
                    outline-none
                    placeholder:text-slate-700
                    focus:border-cyan-400/50"
                  />
                </div>

                <div>
                  <label
                    className="mb-2 block
                    text-xs uppercase
                    tracking-wider
                    text-slate-500"
                  >
                    Email
                  </label>

                  <input
                    required
                    name="user_email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-lg
                    border border-white/10
                    bg-white/[0.03]
                    px-4 py-3
                    text-sm text-white
                    outline-none
                    placeholder:text-slate-700
                    focus:border-cyan-400/50"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  className="mb-2 block
                  text-xs uppercase
                  tracking-wider
                  text-slate-500"
                >
                  Subject
                </label>

                <input
                  required
                  name="subject"
                  type="text"
                  placeholder="Project / Opportunity"
                  className="w-full rounded-lg
                  border border-white/10
                  bg-white/[0.03]
                  px-4 py-3
                  text-sm text-white
                  outline-none
                  placeholder:text-slate-700
                  focus:border-cyan-400/50"
                />
              </div>

              <div className="mt-5">
                <label
                  className="mb-2 block
                  text-xs uppercase
                  tracking-wider
                  text-slate-500"
                >
                  Message
                </label>

                <textarea
                  required
                  name="message"
                  rows="7"
                  placeholder="Tell me about your idea..."
                  className="w-full resize-none
                  rounded-lg
                  border border-white/10
                  bg-white/[0.03]
                  px-4 py-3
                  text-sm text-white
                  outline-none
                  placeholder:text-slate-700
                  focus:border-cyan-400/50"
                />
              </div>

              <button
                disabled={isSending}
                type="submit"
                className="mt-6 flex w-full
                items-center
                justify-center gap-3
                rounded-lg
                bg-gradient-to-r
                from-cyan-400
                to-cyan-300
                py-3.5 text-sm
                font-black text-black
                disabled:opacity-50"
              >
                {isSending
                  ? "TRANSMITTING..."
                  : "SEND TRANSMISSION"}

                {!isSending && (
                  <FaPaperPlane />
                )}
              </button>

              <AnimatePresence>
                {formStatus === "success" && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    className="mt-4 flex
                    items-center gap-2
                    rounded-lg
                    border
                    border-green-400/20
                    bg-green-400/5
                    p-3 text-sm
                    text-green-300"
                  >
                    <FaCheckCircle />
                    Message sent successfully!
                  </motion.div>
                )}

                {formStatus === "error" && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    className="mt-4
                    rounded-lg
                    border
                    border-red-400/20
                    bg-red-400/5
                    p-3 text-sm
                    text-red-300"
                  >
                    Something went wrong.
                    Please try again.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </section>

      {/* ===================================================
          FOOTER
      =================================================== */}

      <footer className="border-t border-white/10 py-8">
        <div
          className="mx-auto flex
          max-w-7xl flex-col gap-4
          px-6 text-center text-xs
          text-slate-600
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:text-left"
        >
          <p>
            © 2026 Ankit Kushwaha.
            All rights reserved.
          </p>

          <div className="flex items-center justify-center gap-5">
            <a
              href="https://github.com/ankitstacks"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-300"
            >
              GitHub
            </a>

            <a
              href="mailto:ankitkumarkushwaha768@gmail.com"
              className="hover:text-fuchsia-300"
            >
              Email
            </a>

            <span>
              Built with React & Tailwind CSS
            </span>
          </div>
        </div>
      </footer>

      {/* ===================================================
          PROJECT MODAL
      =================================================== */}

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() =>
              setSelectedProject(null)
            }
            className="fixed inset-0 z-[100]
            flex items-center
            justify-center
            bg-black/80 p-4
            backdrop-blur-md"
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 30,
                scale: 0.96,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="max-h-[90vh]
              w-full max-w-3xl
              overflow-y-auto
              rounded-2xl
              border
              border-cyan-400/20
              bg-[#080d16]"
            >
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-60 w-full object-cover"
                />

                <div
                  className="absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#080d16]
                  to-transparent"
                />

                <button
                  onClick={() =>
                    setSelectedProject(null)
                  }
                  className="absolute
                  right-4 top-4
                  flex h-10 w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-black/60
                  text-white
                  backdrop-blur"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="p-7">
                <p
                  className="text-xs
                  uppercase
                  tracking-[0.25em]
                  text-cyan-400"
                >
                  {selectedProject.category}
                </p>

                <h2 className="mt-2 text-3xl font-black">
                  {selectedProject.title}
                </h2>

                <p
                  className="mt-4
                  leading-7
                  text-slate-400"
                >
                  {selectedProject.description}
                </p>

                <div className="mt-7">
                  <h3
                    className="text-sm
                    font-bold
                    uppercase
                    tracking-wider"
                  >
                    Features
                  </h3>

                  <div
                    className="mt-4
                    grid gap-3
                    sm:grid-cols-2"
                  >
                    {selectedProject.features.map(
                      (feature) => (
                        <div
                          key={feature}
                          className="flex
                          items-center gap-3
                          text-sm
                          text-slate-400"
                        >
                          <FaCheckCircle className="text-cyan-400" />
                          {feature}
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  {selectedProject.tech.map(
                    (tech) => (
                      <span
                        key={tech}
                        className="rounded-md
                        border
                        border-fuchsia-400/20
                        bg-fuchsia-400/5
                        px-3 py-1.5
                        text-xs
                        text-fuchsia-300"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>

                {/* MODAL BUTTONS */}

                <div className="mt-8 flex flex-wrap gap-3">
                  {selectedProject.live ? (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex
                      items-center gap-2
                      rounded-lg
                      bg-cyan-400
                      px-5 py-3
                      text-sm font-bold
                      text-black
                      transition
                      hover:bg-cyan-300"
                    >
                      <FaEye />
                      Live Preview
                    </a>
                  ) : (
                    <span
                      className="flex
                      cursor-not-allowed
                      items-center gap-2
                      rounded-lg
                      border
                      border-cyan-400/10
                      px-5 py-3
                      text-sm
                      font-bold
                      text-cyan-400/30"
                    >
                      <FaEye />
                      Live Preview
                    </span>
                  )}

                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex
                    items-center gap-2
                    rounded-lg
                    border
                    border-fuchsia-400/30
                    px-5 py-3
                    text-sm font-bold
                    text-fuchsia-300
                    hover:bg-fuchsia-400/10"
                  >
                    <FaGithub />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================
          RESUME MODAL
      =================================================== */}

      <AnimatePresence>
        {showResume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() =>
              setShowResume(false)
            }
            className="fixed inset-0 z-[110]
            flex items-center
            justify-center
            bg-black/90 p-2
            backdrop-blur-md sm:p-5"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="flex h-[94vh]
              w-full max-w-6xl
              flex-col overflow-hidden
              rounded-2xl
              border
              border-cyan-400/20
              bg-[#080d16]"
            >
              <div
                className="flex items-center
                justify-between
                border-b
                border-white/10
                px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <FaFilePdf className="text-fuchsia-400" />

                  <div>
                    <p className="text-sm font-bold">
                      Ankit Kushwaha
                    </p>

                    <p className="text-[10px] uppercase text-slate-600">
                      Resume
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="hidden rounded-lg
                    border
                    border-cyan-400/20
                    px-3 py-2
                    text-xs
                    text-cyan-300 sm:block"
                  >
                    Open
                  </a>

                  <a
                    href="/resume.pdf"
                    download="Ankit-Kushwaha-Resume.pdf"
                    className="flex h-9 w-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-white/10
                    text-slate-300"
                  >
                    <FaDownload />
                  </a>

                  <button
                    onClick={() =>
                      setShowResume(false)
                    }
                    className="flex h-9 w-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-white/10"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              <div className="min-h-0 flex-1 bg-slate-800">
                <iframe
                  src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=1"
                  title="Ankit Kushwaha Resume"
                  className="h-full w-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================
          ARCADE MODAL
      =================================================== */}

      <AnimatePresence>
        {game && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGame(null)}
            className="fixed inset-0 z-[120]
            flex items-center
            justify-center
            bg-black/90 p-4
            backdrop-blur-md"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="w-full max-w-lg
              rounded-2xl
              border
              border-cyan-400/20
              bg-[#080d16] p-6"
            >
              <div className="flex justify-between">
                <div>
                  <p
                    className="text-[10px]
                    uppercase
                    tracking-[0.25em]
                    text-cyan-400"
                  >
                    Arcade Mode
                  </p>

                  <h2 className="mt-1 text-2xl font-black">
                    {game === "reaction"
                      ? "Reaction Test"
                      : "Tic Tac Toe"}
                  </h2>
                </div>

                <button
                  onClick={() =>
                    setGame(null)
                  }
                  className="flex h-9 w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/10"
                >
                  <FaTimes />
                </button>
              </div>

              {game === "reaction" && (
                <div className="mt-8">
                  <button
                    onClick={
                      reactionStarted
                        ? handleReactionClick
                        : startReactionGame
                    }
                    className={`flex
                    min-h-[260px]
                    w-full items-center
                    justify-center
                    rounded-2xl border
                    text-center
                    transition ${
                      reactionStarted
                        ? "border-green-400 bg-green-400 text-black"
                        : "border-cyan-400/20 bg-cyan-400/5 text-cyan-300"
                    }`}
                  >
                    <div>
                      <div className="text-5xl font-black">
                        {reactionStarted
                          ? "CLICK!"
                          : "START"}
                      </div>

                      <p className="mt-3 text-sm opacity-70">
                        {reactionStarted
                          ? "Click now!"
                          : "Wait for the signal"}
                      </p>
                    </div>
                  </button>

                  {reactionTime && (
                    <div className="mt-5 text-center">
                      <p className="text-xs uppercase text-slate-600">
                        Your reaction time
                      </p>

                      <p className="mt-1 text-4xl font-black text-cyan-300">
                        {reactionTime} ms
                      </p>

                      <button
                        onClick={
                          startReactionGame
                        }
                        className="mt-4 rounded-lg
                        border
                        border-white/10
                        px-4 py-2
                        text-xs"
                      >
                        Try Again
                      </button>
                    </div>
                  )}
                </div>
              )}

              {game === "tictactoe" && (
                <TicTacToe />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}