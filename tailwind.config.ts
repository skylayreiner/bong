import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          green: {
            "4": "#007101",
            "6": "#186405",
            "8": "#005700"
          },
          white: "#F7FAF4",
          black: "#131315",
          red: {
            "3": "#A50900",
            "6": "#A50000",
            "8": "#670B16",
            "10": "#D8C1BE"
          },
          blue: {
            "8": "#1E06AD"
          }
        },
        secondary: {
          gray: {
            "1": "#FAF8F7",
            "3": "#E0DEDF",
            "6": "#C3C1C2",
            "7": "#8F8C8C",
            "8": "#575757",
            "9": "#1E1E1E"
          },
          purple: {
            "8": "#1B0053"
          }
        },
        accent: {
          ruby: "#F03C3C",
          teal: "#04CBFF",
          navy: "#1E06AD",
          goldenrod: "#D59926"
        }
      }
    },

    boxShadow: {
      primary:
        "0.07rem 0.125rem #131315,-0.07rem 0.125rem #131315,-0.07rem 0 #131315,0.07rem 0 #131315",
      cast: "0.125rem 0.125rem rgba(36, 60, 6, 0.43)"
    },
    fontFamily: {
      sans: ["Ubuntu"]
    },
    gridTemplateColumns: {
      3: "repeat(3, minmax(0, 1fr))",
      5: "repeat(5, minmax(0, 1fr))",
      12: "repeat(12, minmax(0, 1fr))"
    },
    gridColumns: {
      "span-2": " span 2 / span 2",
      "span-4": " span 4 / span 4",
      "span-8": " span 8 / span 8",
      "span-10": " span 10 / span 10"
    },

    gridTemplateRows: {
      3: "repeat(3, minmax(0, 1fr))",
      8: "repeat(8, minmax(0, 1fr))"
    },
    gridRow: {
      "span-6": "span 6 / span 6",
      "span-7": "span 7 / span 7"
    },
    gridRowStart: {
      2: "2",
      7: "7"
    },
    transitionProperty: {
      opacity: "opacity"
    }
  },
  plugins: []
} satisfies Config;
