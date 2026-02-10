import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Img,
  Audio,
  interpolate,
  Easing,
  staticFile,
  Sequence,
} from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import {
  TransitionSeries,
  getPresentation,
  createTiming,
  StompStream,
  PushStream,
  FadeInWords,
  FadeInChars,
  BounceChars,
  Counter,
  BrowserMockup,
  Camera,
  Particles,
  Glow,
  GridBackground,
} from "../library";

// ============================================
// Brand Constants
// ============================================
const BRAND = {
  primary: "#9F5FFE",
  primaryDark: "#7C3AED",
  accent: "#22C55E",
  dark: "#0a0a0f",
  darkAlt: "#111118",
  light: "#ffffff",
  lightAlt: "#f5f5f7",
  gray: "#6B7280",
  error: "#EF4444",
};

const ASSETS = {
  screenshot: "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/outrank/1770749485761_8usb3wev728_outrank_screenshot.png",
  aiAbstract: "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/outrank/1770749496278_kud9z9xrqhl_ai_automation_abstract.png",
  music: "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/music/1770749518831_ubk8w8cvv8n_music_Premium_corporate_te.mp3",
};

// ============================================
// Shared Components
// ============================================
const FloatingOrb = ({ 
  x, 
  y, 
  size, 
  color, 
  delay = 0 
}: { 
  x: number; 
  y: number; 
  size: number; 
  color: string; 
  delay?: number;
}) => {
  const frame = useCurrentFrame();
  const floatY = Math.sin((frame + delay) / 25) * 8;
  const floatX = Math.cos((frame + delay) / 35) * 5;
  const scale = 1 + Math.sin((frame + delay) / 40) * 0.1;
  
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
        filter: "blur(40px)",
        transform: `translate(${floatX}px, ${floatY}px) scale(${scale})`,
      }}
    />
  );
};

const DarkBackground = ({ children }: { children: React.ReactNode }) => {
  const frame = useCurrentFrame();
  
  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.dark }}>
      {/* Animated gradient orbs */}
      <FloatingOrb x={20} y={30} size={400} color={BRAND.primary} delay={0} />
      <FloatingOrb x={70} y={60} size={350} color={BRAND.primaryDark} delay={50} />
      <FloatingOrb x={85} y={20} size={250} color={BRAND.accent} delay={100} />
      
      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${BRAND.primary}08 1px, transparent 1px), linear-gradient(90deg, ${BRAND.primary}08 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: interpolate(frame, [0, 30], [0, 0.5], { extrapolateRight: "clamp" }),
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

const LightBackground = ({ children }: { children: React.ReactNode }) => {
  const frame = useCurrentFrame();
  
  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.lightAlt }}>
      {/* Soft gradient accents */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "60%",
          height: "60%",
          background: `radial-gradient(circle, ${BRAND.primary}15 0%, transparent 60%)`,
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: "50%",
          height: "50%",
          background: `radial-gradient(circle, ${BRAND.accent}10 0%, transparent 60%)`,
          filter: "blur(60px)",
        }}
      />
      {/* Subtle dot pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(${BRAND.gray}20 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          opacity: 0.5,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

// ============================================
// Scene Components
// ============================================

// Scene 1: Hook - Bold KineticStream
const HookScene = () => {
  const { fontFamily: headingFont } = loadSpaceGrotesk();
  
  return (
    <Camera
      keyframes={[
        { frame: 0, scale: 1.02 },
        { frame: 90, scale: 1, easing: Easing.out(Easing.cubic) },
      ]}
    >
      <DarkBackground>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ fontFamily: headingFont }}>
            <StompStream
              text="Research Write Publish Rank"
              wordsPerGroup={1}
              fontSize={110}
              fontWeight={700}
              color={BRAND.light}
              transitionDuration={0.35}
            />
          </div>
        </AbsoluteFill>
      </DarkBackground>
    </Camera>
  );
};

// Scene 2: Amplify Hook
const AmplifyScene = () => {
  const { fontFamily: headingFont } = loadSpaceGrotesk();
  const { fontFamily: bodyFont } = loadInter();
  const frame = useCurrentFrame();
  
  return (
    <Camera
      keyframes={[
        { frame: 0, scale: 1 },
        { frame: 90, scale: 1.03, easing: Easing.inOut(Easing.cubic) },
      ]}
    >
      <DarkBackground>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <FadeInWords
            style={{
              fontFamily: headingFont,
              fontSize: 72,
              fontWeight: 700,
              color: BRAND.light,
              textAlign: "center",
            }}
          >
            All on Auto-Pilot
          </FadeInWords>
          
          <div style={{ opacity: frame >= 25 ? 1 : 0 }}>
            <FadeInChars
              startFrom={25}
              style={{
                fontFamily: bodyFont,
                fontSize: 28,
                fontWeight: 400,
                color: BRAND.gray,
                textAlign: "center",
              }}
            >
              Powered by AI. Built for Growth.
            </FadeInChars>
          </div>
        </AbsoluteFill>
      </DarkBackground>
    </Camera>
  );
};

// Scene 3: Problem Statement
const ProblemScene = () => {
  const { fontFamily: headingFont } = loadSpaceGrotesk();
  const { fontFamily: bodyFont } = loadInter();
  const frame = useCurrentFrame();
  
  const shakeX = frame < 45 ? Math.sin(frame * 0.8) * 2 : 0;
  
  return (
    <Camera
      keyframes={[
        { frame: 0, scale: 1.05 },
        { frame: 90, scale: 1, easing: Easing.out(Easing.cubic) },
      ]}
    >
      <LightBackground>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 20,
            transform: `translateX(${shakeX}px)`,
          }}
        >
          <FadeInWords
            style={{
              fontFamily: headingFont,
              fontSize: 64,
              fontWeight: 700,
              color: BRAND.dark,
              textAlign: "center",
              maxWidth: "80%",
            }}
          >
            Still writing SEO content manually?
          </FadeInWords>
          
          <div style={{ opacity: frame >= 30 ? 1 : 0 }}>
            <FadeInChars
              startFrom={30}
              style={{
                fontFamily: bodyFont,
                fontSize: 26,
                fontWeight: 500,
                color: BRAND.error,
                textAlign: "center",
              }}
            >
              Hours of research. Endless revisions. Zero scale.
            </FadeInChars>
          </div>
        </AbsoluteFill>
      </LightBackground>
    </Camera>
  );
};

// Scene 4: Solution Intro
const SolutionIntroScene = () => {
  const { fontFamily: headingFont } = loadSpaceGrotesk();
  const frame = useCurrentFrame();
  
  const logoScale = interpolate(frame, [0, 20], [0.8, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });
  
  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  
  return (
    <Camera
      keyframes={[
        { frame: 0, scale: 1.1 },
        { frame: 90, scale: 1, easing: Easing.out(Easing.cubic) },
      ]}
    >
      <DarkBackground>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 30,
          }}
        >
          {/* Logo text with glow */}
          <div
            style={{
              opacity: logoOpacity,
              transform: `scale(${logoScale})`,
            }}
          >
            <div
              style={{
                fontFamily: headingFont,
                fontSize: 90,
                fontWeight: 700,
                color: BRAND.light,
                textShadow: `0 0 60px ${BRAND.primary}80, 0 0 120px ${BRAND.primary}40`,
              }}
            >
              <span style={{ color: BRAND.primary }}>Outrank</span>
              <span style={{ color: BRAND.gray }}>.so</span>
            </div>
          </div>
          
          <div style={{ opacity: frame >= 25 ? 1 : 0 }}>
            <FadeInWords
              startFrom={25}
              style={{
                fontFamily: headingFont,
                fontSize: 32,
                fontWeight: 500,
                color: BRAND.gray,
                textAlign: "center",
              }}
            >
              AI-Powered SEO Content Automation
            </FadeInWords>
          </div>
        </AbsoluteFill>
      </DarkBackground>
    </Camera>
  );
};

// Scene 5: Feature Demo with Browser Mockup
const FeatureDemoScene = () => {
  const { fontFamily: bodyFont } = loadInter();
  const frame = useCurrentFrame();
  
  const mockupScale = interpolate(frame, [0, 25], [0.9, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  
  const mockupY = interpolate(frame, [0, 25], [30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  
  const rotateY = interpolate(frame, [0, 120], [-5, 5], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sine),
  });
  
  return (
    <Camera
      keyframes={[
        { frame: 0, scale: 1 },
        { frame: 120, scale: 1.02, easing: Easing.inOut(Easing.cubic) },
      ]}
    >
      <LightBackground>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 60,
          }}
        >
          <div
            style={{
              transform: `translateY(${mockupY}px) scale(${mockupScale}) perspective(1200px) rotateY(${rotateY}deg)`,
              width: "85%",
              boxShadow: `0 40px 100px ${BRAND.dark}30, 0 0 0 1px ${BRAND.gray}10`,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <BrowserMockup
              url="outrank.so/dashboard"
              browser="arc"
              theme="light"
              shadow={false}
            >
              <Img
                src={ASSETS.screenshot}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </BrowserMockup>
          </div>
          
          {/* Feature badges */}
          <div
            style={{
              position: "absolute",
              bottom: 80,
              display: "flex",
              gap: 16,
              opacity: frame >= 40 ? 1 : 0,
              transform: `translateY(${frame >= 40 ? 0 : 20}px)`,
              transition: "all 0.3s",
            }}
          >
            {["Keyword Research", "SERP Analysis", "Auto-Publish"].map((label, i) => (
              <div
                key={label}
                style={{
                  fontFamily: bodyFont,
                  fontSize: 14,
                  fontWeight: 600,
                  color: BRAND.dark,
                  background: BRAND.light,
                  padding: "10px 20px",
                  borderRadius: 100,
                  boxShadow: `0 4px 20px ${BRAND.dark}15`,
                  opacity: frame >= 40 + i * 8 ? 1 : 0,
                  transform: `translateY(${frame >= 40 + i * 8 ? 0 : 10}px)`,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </AbsoluteFill>
      </LightBackground>
    </Camera>
  );
};

// Scene 6: Benefits/Outcomes
const BenefitsScene = () => {
  const { fontFamily: headingFont } = loadSpaceGrotesk();
  const { fontFamily: bodyFont } = loadInter();
  const frame = useCurrentFrame();
  
  const benefits = [
    { icon: "⚡", text: "10x Faster Content" },
    { icon: "🎯", text: "SEO-Optimized" },
    { icon: "🔄", text: "Auto Publishing" },
  ];
  
  return (
    <Camera
      keyframes={[
        { frame: 0, scale: 1 },
        { frame: 90, scale: 1.02, easing: Easing.inOut(Easing.cubic) },
      ]}
    >
      <DarkBackground>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 50,
          }}
        >
          <FadeInWords
            style={{
              fontFamily: headingFont,
              fontSize: 56,
              fontWeight: 700,
              color: BRAND.light,
              textAlign: "center",
            }}
          >
            Scale Your Organic Traffic
          </FadeInWords>
          
          <div
            style={{
              display: "flex",
              gap: 40,
              marginTop: 20,
            }}
          >
            {benefits.map((benefit, i) => {
              const delay = 20 + i * 12;
              const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
                extrapolateRight: "clamp",
              });
              const y = interpolate(frame, [delay, delay + 15], [30, 0], {
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.back(1.5)),
              });
              
              return (
                <div
                  key={benefit.text}
                  style={{
                    opacity,
                    transform: `translateY(${y}px)`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                    background: `linear-gradient(135deg, ${BRAND.darkAlt} 0%, ${BRAND.dark} 100%)`,
                    padding: "30px 40px",
                    borderRadius: 20,
                    border: `1px solid ${BRAND.primary}30`,
                  }}
                >
                  <span style={{ fontSize: 40 }}>{benefit.icon}</span>
                  <span
                    style={{
                      fontFamily: bodyFont,
                      fontSize: 18,
                      fontWeight: 600,
                      color: BRAND.light,
                    }}
                  >
                    {benefit.text}
                  </span>
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      </DarkBackground>
    </Camera>
  );
};

// Scene 7: Magic Moment with AI Abstract
const MagicMomentScene = () => {
  const { fontFamily: headingFont } = loadSpaceGrotesk();
  const frame = useCurrentFrame();
  
  const imageScale = interpolate(frame, [0, 120], [1.05, 1.15], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sine),
  });
  
  return (
    <AbsoluteFill>
      {/* Full-bleed AI abstract image */}
      <Img
        src={ASSETS.aiAbstract}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${imageScale})`,
        }}
      />
      
      {/* Gradient overlay for text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to top, ${BRAND.dark}dd 0%, ${BRAND.dark}60 40%, transparent 100%)`,
        }}
      />
      
      {/* Text content */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 100,
        }}
      >
        <div style={{ opacity: frame >= 15 ? 1 : 0 }}>
          <FadeInWords
            startFrom={15}
            style={{
              fontFamily: headingFont,
              fontSize: 52,
              fontWeight: 700,
              color: BRAND.light,
              textAlign: "center",
              textShadow: `0 4px 30px ${BRAND.dark}`,
            }}
          >
            AI That Works While You Sleep
          </FadeInWords>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 8: Stats/Metrics
const StatsScene = () => {
  const { fontFamily: headingFont } = loadSpaceGrotesk();
  const { fontFamily: bodyFont } = loadInter();
  const frame = useCurrentFrame();
  
  return (
    <Camera
      keyframes={[
        { frame: 0, scale: 1.02 },
        { frame: 90, scale: 1, easing: Easing.out(Easing.cubic) },
      ]}
    >
      <LightBackground>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
            }}
          >
            <Counter
              from={0}
              to={50}
              suffix="K+"
              style={{
                fontFamily: headingFont,
                fontSize: 140,
                fontWeight: 800,
                color: BRAND.primary,
              }}
            />
          </div>
          
          <div style={{ opacity: frame >= 20 ? 1 : 0 }}>
            <FadeInWords
              startFrom={20}
              style={{
                fontFamily: bodyFont,
                fontSize: 32,
                fontWeight: 600,
                color: BRAND.dark,
                textAlign: "center",
              }}
            >
              Articles Created & Published
            </FadeInWords>
          </div>
          
          {/* Star rating */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginTop: 20,
              opacity: frame >= 40 ? 1 : 0,
              transform: `translateY(${frame >= 40 ? 0 : 15}px)`,
            }}
          >
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                style={{
                  fontSize: 32,
                  color: "#FBBF24",
                  opacity: frame >= 40 + i * 4 ? 1 : 0.3,
                }}
              >
                ★
              </span>
            ))}
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 20,
                fontWeight: 500,
                color: BRAND.gray,
                marginLeft: 12,
                alignSelf: "center",
              }}
            >
              Trusted by 10,000+ teams
            </span>
          </div>
        </AbsoluteFill>
      </LightBackground>
    </Camera>
  );
};

// Scene 9: Tagline
const TaglineScene = () => {
  const { fontFamily: headingFont } = loadSpaceGrotesk();
  
  return (
    <Camera
      keyframes={[
        { frame: 0, scale: 1 },
        { frame: 90, scale: 1.02, easing: Easing.inOut(Easing.cubic) },
      ]}
    >
      <DarkBackground>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ fontFamily: headingFont }}>
            <PushStream
              text="Grow Organic Traffic on Auto-Pilot"
              wordsPerGroup={2}
              fontSize={72}
              fontWeight={700}
              color={BRAND.light}
              transitionDuration={0.4}
            />
          </div>
        </AbsoluteFill>
      </DarkBackground>
    </Camera>
  );
};

// Scene 10: CTA
const CTAScene = () => {
  const { fontFamily: headingFont } = loadSpaceGrotesk();
  const { fontFamily: bodyFont } = loadInter();
  const frame = useCurrentFrame();
  
  const logoScale = interpolate(frame, [0, 20], [0.8, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });
  
  const buttonPulse = 1 + Math.sin(frame / 15) * 0.03;
  const buttonGlow = interpolate(Math.sin(frame / 20), [-1, 1], [40, 60]);
  
  return (
    <Camera
      keyframes={[
        { frame: 0, scale: 1.05 },
        { frame: 120, scale: 1, easing: Easing.out(Easing.cubic) },
      ]}
    >
      <DarkBackground>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 40,
          }}
        >
          {/* Logo */}
          <div
            style={{
              transform: `scale(${logoScale})`,
              fontFamily: headingFont,
              fontSize: 70,
              fontWeight: 700,
              color: BRAND.light,
            }}
          >
            <span style={{ color: BRAND.primary }}>Outrank</span>
            <span style={{ color: BRAND.gray }}>.so</span>
          </div>
          
          {/* CTA Button */}
          <div
            style={{
              opacity: frame >= 25 ? 1 : 0,
              transform: `translateY(${frame >= 25 ? 0 : 20}px) scale(${frame >= 25 ? buttonPulse : 0.9})`,
            }}
          >
            <div
              style={{
                fontFamily: bodyFont,
                fontSize: 22,
                fontWeight: 600,
                color: BRAND.light,
                background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryDark} 100%)`,
                padding: "20px 50px",
                borderRadius: 100,
                boxShadow: `0 0 ${buttonGlow}px ${BRAND.primary}60`,
                cursor: "pointer",
              }}
            >
              Start Free Today →
            </div>
          </div>
          
          {/* Subtext */}
          <div
            style={{
              opacity: frame >= 40 ? 1 : 0,
              fontFamily: bodyFont,
              fontSize: 16,
              fontWeight: 400,
              color: BRAND.gray,
            }}
          >
            No credit card required
          </div>
        </AbsoluteFill>
      </DarkBackground>
    </Camera>
  );
};

// ============================================
// Main Composition
// ============================================
export const Main: React.FC = () => {
  const { fps } = useVideoConfig();
  
  // Scene durations in frames (30fps)
  // Total: ~32 seconds
  const SCENE_DURATION = {
    hook: 90,           // 3s
    amplify: 75,        // 2.5s
    problem: 90,        // 3s
    solutionIntro: 80,  // 2.67s
    featureDemo: 120,   // 4s
    benefits: 90,       // 3s
    magicMoment: 100,   // 3.33s
    stats: 90,          // 3s
    tagline: 90,        // 3s
    cta: 120,           // 4s - longer ending
  };
  
  const TRANSITION_DURATION = 12;
  
  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.dark }}>
      {/* Background music */}
      <Audio
        src={ASSETS.music}
        volume={0.4}
        startFrom={0}
      />
      
      <TransitionSeries>
        {/* Scene 1: Hook */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION.hook}>
          <HookScene />
        </TransitionSeries.Sequence>
        
        <TransitionSeries.Transition
          presentation={getPresentation("flashBlack")}
          timing={createTiming("snappy", TRANSITION_DURATION)}
        />
        
        {/* Scene 2: Amplify */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION.amplify}>
          <AmplifyScene />
        </TransitionSeries.Sequence>
        
        <TransitionSeries.Transition
          presentation={getPresentation("glitch")}
          timing={createTiming("snappy", TRANSITION_DURATION)}
        />
        
        {/* Scene 3: Problem */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION.problem}>
          <ProblemScene />
        </TransitionSeries.Sequence>
        
        <TransitionSeries.Transition
          presentation={getPresentation("zoomIn")}
          timing={createTiming("spring", TRANSITION_DURATION)}
        />
        
        {/* Scene 4: Solution Intro */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION.solutionIntro}>
          <SolutionIntroScene />
        </TransitionSeries.Sequence>
        
        <TransitionSeries.Transition
          presentation={getPresentation("slideLeft")}
          timing={createTiming("smooth", TRANSITION_DURATION)}
        />
        
        {/* Scene 5: Feature Demo */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION.featureDemo}>
          <FeatureDemoScene />
        </TransitionSeries.Sequence>
        
        <TransitionSeries.Transition
          presentation={getPresentation("whipPan")}
          timing={createTiming("snappy", TRANSITION_DURATION)}
        />
        
        {/* Scene 6: Benefits */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION.benefits}>
          <BenefitsScene />
        </TransitionSeries.Sequence>
        
        <TransitionSeries.Transition
          presentation={getPresentation("blurDissolve")}
          timing={createTiming("smooth", TRANSITION_DURATION)}
        />
        
        {/* Scene 7: Magic Moment */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION.magicMoment}>
          <MagicMomentScene />
        </TransitionSeries.Sequence>
        
        <TransitionSeries.Transition
          presentation={getPresentation("zoomOut")}
          timing={createTiming("spring", TRANSITION_DURATION)}
        />
        
        {/* Scene 8: Stats */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION.stats}>
          <StatsScene />
        </TransitionSeries.Sequence>
        
        <TransitionSeries.Transition
          presentation={getPresentation("flashBlack")}
          timing={createTiming("snappy", TRANSITION_DURATION)}
        />
        
        {/* Scene 9: Tagline */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION.tagline}>
          <TaglineScene />
        </TransitionSeries.Sequence>
        
        <TransitionSeries.Transition
          presentation={getPresentation("blurDissolve")}
          timing={createTiming("smooth", TRANSITION_DURATION)}
        />
        
        {/* Scene 10: CTA */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION.cta}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
