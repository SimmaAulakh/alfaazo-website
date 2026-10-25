import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async redirects() {
    return [
      // Legacy slug with stray colon (still indexed by Google) → phrases pillar (avoids a redirect chain)
      {
        source: "/blog/journey-through-basic-punjabi-\\:-ten-essential-phrases-for-new-learners",
        destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use",
        permanent: true,
      },
      // Legacy thin posts consolidated into topic pillars (Oct 2026). Each old post is
      // unpublished in Firestore once these redirects are live; see scripts/consolidation-plan.md.
      { source: "/blog/a-beginners-guide-to-punjabi-greetings", destination: "/blog/punjabi-greetings-hello-goodbye", permanent: true },
      { source: "/blog/beginners-journey-into-punjabi-5-common-phrases-you-should-know", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/deciphering-punjabi-a-beginners-guide-to-basic-greetings", destination: "/blog/punjabi-greetings-hello-goodbye", permanent: true },
      { source: "/blog/decoding-the-basics-ten-essential-phrases-in-punjabi-for-beginners", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/discovering-punjabi-through-the-magic-of-must-know-phrases", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/dive-into-daily-punjabi-top-10-essential-phrases-for-beginners", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/dive-into-punjabi-10-essential-phrases-for-beginners", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/dive-into-the-colorful-world-of-punjabi-phrases-for-beginners", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/dive-into-the-punjabi-language-the-essential-phrases-for-beginners", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/flirting-with-basics-a-fun-filled-dive-into-common-punjabi-phrases", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/getting-familiar-with-punjabi-a-beginners-guide-to-common-greetings-and-phrases", destination: "/blog/punjabi-greetings-hello-goodbye", permanent: true },
      { source: "/blog/getting-started-with-punjabi-greetings-say-hello-like-a-pro", destination: "/blog/punjabi-greetings-hello-goodbye", permanent: true },
      { source: "/blog/grasping-the-basics-top-10-useful-phrases-in-punjabi-for-beginners", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/journey-through-basic-punjabi-ten-essential-phrases-for-new-learners", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/master-formal-punjabi-greetings-in-three-simple-steps", destination: "/blog/punjabi-greetings-hello-goodbye", permanent: true },
      { source: "/blog/master-punjabi-language-with-ease---a-deep-dive", destination: "/blog/learn-punjabi-start-here", permanent: true },
      { source: "/blog/master-the-5-essential-punjabi-phrases-for-smooth-interaction", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/master-the-basics-common-punjabi-phrases-for-beginners", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/master-the-punjabi-language-with-ease", destination: "/blog/learn-punjabi-start-here", permanent: true },
      { source: "/blog/mastering-basic-punjabi-phrases-a-starters-guide", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/mastering-basic-punjabi-phrases-for-effective-communication", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/mastering-basic-punjabi-your-first-steps-to-fluency", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/mastering-daily-conversations-in-punjabi", destination: "/blog/understand-punjabi-but-cant-speak", permanent: true },
      { source: "/blog/mastering-everyday-conversations-in-punjabi-essential-phrases-for-beginners", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/mastering-everyday-greetings-in-punjabi--an-absolute-beginners-guide", destination: "/blog/punjabi-greetings-hello-goodbye", permanent: true },
      { source: "/blog/mastering-everyday-punjabi-common-phrases-for-beginners", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/mastering-polite-phrases-in-punjabi-a-starters-guide", destination: "/blog/polite-words-in-punjabi-please-welcome-excuse-me", permanent: true },
      { source: "/blog/mastering-the-magic-of-everyday-punjabi-phrases", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/punjabi-101-unveiling-essential-greetings-for-enthusiasts-beginners", destination: "/blog/punjabi-greetings-hello-goodbye", permanent: true },
      { source: "/blog/siyapa-of-punjabi-first-steps-to-mastering-basic-punjabi-phrases", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/the-colorful-garnish-of-punjabi--the-common-phrases", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/tips-to-master-basic-punjabi-conversation-skills", destination: "/blog/understand-punjabi-but-cant-speak", permanent: true },
      { source: "/blog/top-10-common-phrases-to-kickstart-your-punjabi-language-journey", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/understanding-the-beauty-of-punjabi-culture-through-language", destination: "/blog/punjabi-culture-and-festivals-guide", permanent: true },
      { source: "/blog/unlocking-punjabi-top-phrases-for-absolute-beginners", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/unlocking-the-beauty-of-punjabi-a-beginners-guide-to-common-phrases", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/unlocking-the-beauty-of-punjabi-script-a-beginners-guide-to-gurmukhi", destination: "/blog/beginners-guide-gurmukhi-alphabet", permanent: true },
      { source: "/blog/unlocking-the-charm-of-punjabi-top-10-essential-phrases-for-beginners", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
      { source: "/blog/unlocking-the-richness-of-punjabi-top-10-common-phrases-for-beginners", destination: "/blog/mastering-the-basics-common-punjabi-phrases-for-daily-use", permanent: true },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
