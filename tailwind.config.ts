import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          green: {
            "6": "#186405"
          },
          white: "#F7FAF4"
            
        },
        secondary: {
          
          gray: {
            "6": "#C3C1C2",
            "8": "#7D7D7D"
          }
        }
      }
    },
    boxShadow: {
      primary:
        "0.07rem 0.125rem #131315,-0.07rem 0.125rem #131315,-0.07rem 0 #131315,0.07rem 0 #131315",
      cast: "0.125rem 0.125rem rgba(36, 60, 6, 0.43)"
    },
    fontFamily: {
      sans: ['Ubuntu'],
    },

  },
  plugins: []
} satisfies Config;
