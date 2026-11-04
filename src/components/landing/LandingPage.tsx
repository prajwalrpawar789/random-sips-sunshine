import { useState } from "react";
import {
  Apple,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  Dumbbell,
  GlassWater,
  HeartPulse,
  Leaf,
  Menu,
  Instagram,
  Mail,
  Plus,
  Recycle,
  ShieldCheck,
  Snowflake,
  Sprout,
  Truck,
  Users,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { OrderRequestForm } from "./OrderRequestForm";
import logo from "@/assets/logo-circle.webp";
import storyPhoto from "@/assets/random-sips-story.webp";
import hero from "@/assets/hero-coconuts.webp";
import versatile from "@/assets/feature-versatile.webp";
import wellness from "@/assets/feature-wellness.webp";
import coconut from "@/assets/benefits-coconut.webp";
import palmLeft from "@/assets/palm-left.webp";
import palmRight from "@/assets/palm-right.webp";
import lemonade from "@/assets/recipe-lemonade.webp";
import mojito from "@/assets/recipe-mojito.webp";
import cooler from "@/assets/recipe-cooler.webp";
import pannaCotta from "@/assets/recipe-pannacotta.webp";

const navigation = [
  ["Home", "#home"],
  ["Our Story", "#story"],
  ["Benefits", "#benefits"],
  ["Recipes", "#recipes"],
];
const benefits = [
  {
    title: "Nutritional Excellence",
    icon: Sprout,
    text: "Fresh coconut water contains naturally occurring electrolytes, including potassium and magnesium. A refreshing way to complement your everyday hydration, with the delicate sweetness of the coconut itself.",
  },
  {
    title: "Versatility in Every Sip",
    icon: GlassWater,
    text: "Enjoy a chilled sip on its own, blend it into a fruity smoothie, or mix a tropical cooler. Fresh coconut water brings a little sunshine to your favourite recipes.",
  },
  {
    title: "Thoughtful Sourcing",
    icon: Recycle,
    text: "Good refreshment starts with good coconuts. We focus on the simple things: carefully selected tender coconuts and their naturally refreshing taste.",
  },
  {
    title: "Freshness Comes First",
    icon: Snowflake,
    text: "Best enjoyed chilled. Keep your coconut water refrigerated and follow the storage and use-by instructions on your bottle for the freshest sip.",
  },
];
const promises = [
  { icon: Leaf, title: "Naturally", subtitle: "Refreshing" },
  { icon: GlassWater, title: "Fresh Coconut", subtitle: "Goodness" },
  { icon: Truck, title: "Delivered", subtitle: "Chilled" },
  { icon: ShieldCheck, title: "Carefully", subtitle: "Bottled" },
  { icon: Sprout, title: "Simple", subtitle: "Ingredients" },
  { icon: Users, title: "Made for", subtitle: "Everyday Sips" },
];
const categories = [
  {
    icon: Dumbbell,
    title: "Gym Enthusiasts",
    description: "Gym / Fitness trainers / Sports clubs",
  },
  {
    icon: HeartPulse,
    title: "Wellness Lovers",
    description: "Mindful routines / Active days / Everyday balance",
  },
  { icon: Users, title: "Everyday Sippers", description: "A refreshing moment for everyone" },
  {
    icon: BriefcaseBusiness,
    title: "Corporate Wellness",
    description: "Office refreshments / Team gatherings",
  },
  {
    icon: ShieldCheck,
    title: "Teams & Institutions",
    description: "Community groups / Clubs / Office staff",
  },
  {
    icon: CalendarDays,
    title: "Event Collaboration",
    description: "Birthdays / Weddings / Wellness events / Marathons",
  },
];
const recipes = [
  {
    image: cooler,
    title: "Fresh coconut water shikanji",
    time: "5 minutes",
    ingredients: "200 ml coconut water, ½ lemon, a pinch of roasted cumin and black salt, ice.",
    method:
      "Stir the coconut water with lemon juice, cumin and black salt. Pour over ice and finish with a slice of lemon.",
  },
  {
    image: lemonade,
    title: "Fresh coconut water lemonade",
    time: "5 minutes",
    ingredients: "200 ml coconut water, 1 tablespoon lemon juice, mint leaves, ice.",
    method:
      "Mix the coconut water and lemon juice. Add ice and gently crushed mint leaves, then stir and serve chilled.",
  },
  {
    image: pannaCotta,
    title: "Fresh coconut water panna cotta",
    time: "15 minutes + chilling",
    ingredients:
      "200 ml coconut milk, 100 ml coconut water, 2 tablespoons sugar, ½ teaspoon agar powder, fresh mango.",
    method:
      "Whisk the coconut milk, coconut water, sugar and agar in a small saucepan. Bring to a simmer for 2 minutes, stirring. Pour into moulds, refrigerate until set, and serve with fresh mango.",
  },
  {
    image: mojito,
    title: "Fresh coconut water mojito",
    time: "5 minutes",
    ingredients: "150 ml coconut water, ½ lime, 6 mint leaves, 50 ml sparkling water, crushed ice.",
    method:
      "Gently muddle the lime and mint. Add crushed ice, pour in the coconut water, and top with sparkling water. Stir gently. Enjoy alcohol-free.",
  },
];

function Palm({ className = "", right = false }: { className?: string; right?: boolean }) {
  return (
    <img
      src={right ? palmRight : palmLeft}
      className={`palm ${className}`}
      alt=""
      aria-hidden="true"
      loading="lazy"
    />
  );
}

function Island({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 270" fill="none" aria-hidden="true">
      <path d="M75 270C101 210 108 138 109 72L119 76C125 150 110 227 92 270Z" fill="#90722f" />
      <path d="M110 83C79 28 40 26 12 35C55 39 75 71 110 83Z" fill="#507e21" />
      <path d="M110 82C69 55 30 73 8 104C52 85 80 100 110 82Z" fill="#699e2e" />
      <path d="M112 82C76 83 46 117 45 155C63 117 91 110 112 82Z" fill="#427127" />
      <path d="M114 79C112 32 141 8 173 5C146 28 153 58 114 79Z" fill="#5d8d25" />
      <path d="M114 81C145 41 199 43 224 71C178 60 153 84 114 81Z" fill="#80a731" />
      <path d="M114 83C162 71 199 104 202 142C174 112 144 112 114 83Z" fill="#427727" />
      <path d="M112 79C89 40 100 15 120 0C119 26 134 54 112 79Z" fill="#7da832" />
      <circle cx="109" cy="87" r="9" fill="#8a6b24" />
      <circle cx="123" cy="88" r="8" fill="#a8842c" />
    </svg>
  );
}

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeBenefit, setActiveBenefit] = useState<number | null>(0);
  const [storyExpanded, setStoryExpanded] = useState(false);
  const [modal, setModal] = useState<"recipes" | "privacy" | "terms" | null>(null);
  const [recipeIndex, setRecipeIndex] = useState<number | null>(null);
  const close = () => {
    setModal(null);
    setRecipeIndex(null);
  };
  const selectedRecipe = recipeIndex === null ? null : recipes[recipeIndex];

  return (
    <div className="tropical-surround">
      <div className="site-paper" id="home">
        <header className="site-header">
          <nav className="desktop-nav nav-left" aria-label="Main navigation">
            {navigation.slice(0, 2).map(([label, href]) => (
              <a key={href} href={href} className={href === "#home" ? "active" : ""}>
                {label}
              </a>
            ))}
          </nav>
          <a href="#home" className="brand-logo" aria-label="Random Sips home">
            <img src={logo} alt="Random Sips" width="58" height="58" />
          </a>
          <nav className="desktop-nav nav-right" aria-label="More navigation">
            {navigation.slice(2).map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <button
            className="mobile-toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          {menuOpen && (
            <nav className="mobile-nav" aria-label="Mobile navigation">
              {navigation.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              ))}
            </nav>
          )}
        </header>
        <main>
          <section className="sip-hero" aria-labelledby="hero-heading">
            <Palm className="hero-palm-left" />
            <Palm right className="hero-palm-right" />
            <div className="hero-copy">
              <h1 id="hero-heading">
                Sip the Sweetness,
                <br />
                Taste the Tropics
              </h1>
              <p>
                At Random Sips, we’re passionate about delivering nature’s purest hydration
                <br className="desktop-break" /> straight to your doorstep.
              </p>
              <a className="sip-button" href="#request">
                Order now
              </a>
            </div>
            <div className="natural-stamp" aria-label="100 percent natural coconut goodness">
              <svg viewBox="0 0 130 130" aria-hidden="true">
                <defs>
                  <path id="stamp-circle" d="M65,65m-48,0a48,48 0 1,1 96,0a48,48 0 1,1 -96,0" />
                </defs>
                <circle cx="65" cy="65" r="61" />
                <circle cx="65" cy="65" r="38" />
                <text>
                  <textPath href="#stamp-circle" textLength="298">
                    RANDOM SIPS · 100% NATURAL · FRESH ·{" "}
                  </textPath>
                </text>
              </svg>
              <Sprout />
            </div>
            <img
              className="hero-coconuts blend-image"
              src={hero}
              alt="Three fresh green coconuts with colourful straws and a refreshing splash of water"
              width="1024"
              height="1024"
              fetchPriority="high"
            />
          </section>

          <section className="goodness-section" aria-labelledby="goodness-heading">
            <Palm right className="goodness-palm" />
            <h2 id="goodness-heading">Nothing but Goodness</h2>
            <p className="section-note">Fresh coconut water, consistently...</p>
            <div className="goodness-grid">
              {[
                { image: coconut, icon: Sprout, title: "Nutritional Powerhouse" },
                { image: versatile, icon: GlassWater, title: "Versatility in Usage" },
                { image: wellness, icon: HeartPulse, title: "Health and Wellness Benefits" },
              ].map((feature) => (
                <a className="goodness-item" href="#benefits" key={feature.title}>
                  <div className="goodness-visual">
                    <img className="blend-image" src={feature.image} alt="" loading="lazy" />
                    <span>
                      <feature.icon size={23} />
                    </span>
                  </div>
                  <h3>{feature.title}</h3>
                </a>
              ))}
            </div>
          </section>

          <section className="story-section" id="story" aria-labelledby="story-heading">
            <svg
              className="section-wave"
              viewBox="0 0 1200 130"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M-10 88C185-90 290 180 525 94S810-12 1010 49S1200 66 1220 40" />
            </svg>
            <div className="story-copy">
              <h2 id="story-heading">Our Story</h2>
              <p>
                Great refreshment begins with something simple. At Random Sips, we bring the
                goodness of tender coconut water to your everyday moments — a little taste of the
                tropics, wherever life takes you.
              </p>
              <p>
                From a slow morning to a busy afternoon, we believe there’s always room for a fresh
                start. That’s why we’re passionate about making naturally refreshing coconut water
                easy to enjoy, one sip at a time.
              </p>
              {storyExpanded && (
                <p>
                  Our coconut water comes in convenient 250 ml bottles. Enjoy it chilled, take it
                  along, or share a refreshing round with friends. Fresh. Natural. Refreshing.
                  That’s the Random Sips spirit.
                </p>
              )}
              <button
                className="text-link"
                aria-expanded={storyExpanded}
                onClick={() => setStoryExpanded(!storyExpanded)}
              >
                {storyExpanded ? "Read less" : "Read more"}
                <ChevronRight size={14} />
              </button>
            </div>
            <div className="story-image">
              <img
                src={storyPhoto}
                alt="Our Random Sips coconut water bottles, freshly prepared and ready to share"
                loading="lazy"
              />
            </div>
            <Palm className="story-ghost" />
          </section>

          <section className="benefits-section" id="benefits" aria-labelledby="benefits-heading">
            <Palm right className="benefits-palm" />
            <h2 id="benefits-heading">Benefits of Our Fresh Coconuts</h2>
            <div className="benefits-layout">
              <img
                className="benefits-coconut blend-image"
                src={coconut}
                alt="Illustrated tropical coconut with a straw, flowers, and palm leaves"
                loading="lazy"
              />
              <div className="benefits-list">
                {benefits.map((benefit, i) => (
                  <div className="benefit-item" key={benefit.title}>
                    <button
                      aria-expanded={activeBenefit === i}
                      aria-controls={`benefit-${i}`}
                      onClick={() => setActiveBenefit(activeBenefit === i ? null : i)}
                    >
                      <span className={`little-icon ${activeBenefit === i ? "selected" : ""}`}>
                        <benefit.icon size={18} />
                      </span>
                      <span>{benefit.title}</span>
                      <Plus
                        size={14}
                        className={activeBenefit === i ? "benefit-plus open" : "benefit-plus"}
                      />
                    </button>
                    <div id={`benefit-${i}`} hidden={activeBenefit !== i}>
                      <p>{benefit.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="why-section" aria-labelledby="why-heading">
            <Palm right className="why-palm" />
            <h2 id="why-heading">Why Choose Random Sips</h2>
            <div className="promise-grid">
              {promises.map((promise) => (
                <div className="promise" key={promise.title}>
                  <Palm className="wreath-left" />
                  <Palm right className="wreath-right" />
                  <div className="promise-circle">
                    <span className="promise-icon">
                      <promise.icon size={21} />
                    </span>
                    <span>
                      {promise.title}
                      <br />
                      {promise.subtitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Palm className="why-ghost" />
          </section>

          <section className="app-banner" aria-labelledby="app-heading">
            <Island className="island-main" />
            <Island className="island-small" />
            <span className="banner-sun" aria-hidden="true" />
            <span className="banner-birds" aria-hidden="true">
              ⌁ &nbsp; ⌁
            </span>
            <div>
              <h2 id="app-heading">Application is coming soon</h2>
              <p>The Random Sips app. Freshness at your fingertips.</p>
              <div
                className="store-badges"
                aria-label="Coming soon on Google Play and the App Store"
              >
                <div className="store-badge">
                  <svg viewBox="0 0 28 30" aria-hidden="true">
                    <path fill="#30d5a1" d="M2 1L17 15 2 29Z" />
                    <path fill="#52a6ff" d="M2 1L20 11 17 15Z" />
                    <path fill="#ffd458" d="M20 11L27 15 20 19 17 15Z" />
                    <path fill="#fa6264" d="M2 29L17 15 20 19Z" />
                  </svg>
                  <span>
                    <small>COMING SOON ON</small>Google Play
                  </span>
                </div>
                <div className="store-badge">
                  <Apple fill="white" size={30} />
                  <span>
                    <small>COMING SOON ON THE</small>App Store
                  </span>
                </div>
              </div>
            </div>
            <Island className="island-faded" />
          </section>

          <section className="categories-section" aria-labelledby="categories-heading">
            <h2 id="categories-heading">Categories</h2>
            <div className="categories-grid">
              {categories.map((category) => (
                <div className="category" key={category.title}>
                  <span className="category-icon">
                    <category.icon size={22} />
                  </span>
                  <div>
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="recipes-section" id="recipes" aria-labelledby="recipes-heading">
            <Palm right className="recipes-palm" />
            <Palm className="recipes-ghost" />
            <h2 id="recipes-heading">Fresh coconut water recipes</h2>
            <div className="recipes-grid">
              {recipes.map((recipe, i) => (
                <button
                  className="recipe"
                  key={recipe.title}
                  onClick={() => {
                    setRecipeIndex(i);
                    setModal("recipes");
                  }}
                >
                  <div className="recipe-image">
                    <img src={recipe.image} alt={recipe.title} loading="lazy" />
                    <span>
                      <ArrowRight size={20} />
                    </span>
                  </div>
                  <h3>{recipe.title}</h3>
                </button>
              ))}
            </div>
            <button
              className="sip-button"
              onClick={() => {
                setRecipeIndex(null);
                setModal("recipes");
              }}
            >
              View all
            </button>
          </section>
          <section className="request-section" id="request" aria-labelledby="request-heading">
            <div className="request-intro">
              <span className="request-eyebrow">
                <Leaf size={16} /> Freshness, delivered
              </span>
              <h2 id="request-heading">
                Request your <br />
                fresh sips
              </h2>
              <p>
                A refreshing little moment is just a request away. Tell us what you need and where
                to bring it.
              </p>
              <div className="request-product-note">
                <GlassWater size={25} />
                <div>
                  <strong>Fresh coconut water</strong>
                  <span>250 ml per bottle · ₹100 each</span>
                </div>
              </div>
              <p className="request-email-note">
                <Mail size={17} />
                We’ll email you a copy and get in touch to confirm your delivery.
              </p>
              <a
                className="instagram-link"
                href="https://www.instagram.com/random_sips11"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={19} /> Follow @random_sips11 <ArrowRight size={15} />
              </a>
            </div>
            <div className="request-form-card">
              <OrderRequestForm />
            </div>
          </section>
        </main>

        <footer className="sip-footer">
          <Island className="footer-island" />
          <div className="footer-top">
            <a href="#home" aria-label="Random Sips home">
              <img src={logo} width="48" height="48" alt="Random Sips" />
            </a>
            <nav aria-label="Footer navigation">
              <a href="#home">Home</a>
              <a href="#story">About Us</a>
              <a href="#benefits">Benefits</a>
              <a href="#request">Contact Us</a>
            </nav>
          </div>
          <div className="footer-bottom">
            <a
              className="footer-instagram"
              href="https://www.instagram.com/random_sips11"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={17} /> @random_sips11
            </a>
            <button onClick={() => setModal("terms")}>Terms & Conditions</button>
            <button onClick={() => setModal("privacy")}>Privacy Policy</button>
            <span>Copyright © {new Date().getFullYear()} Random Sips. All rights reserved.</span>
          </div>
        </footer>

        <Dialog
          open={modal !== null}
          onOpenChange={(open) => {
            if (!open) close();
          }}
        >
          <DialogContent className="sip-dialog">
            <DialogTitle>
              {modal === "recipes"
                ? (selectedRecipe?.title ?? "A taste of the tropics")
                : modal === "privacy"
                  ? "Your privacy"
                  : "Ordering information"}
            </DialogTitle>
            <DialogDescription>
              {modal === "recipes"
                ? "Simple recipes for a little everyday sunshine."
                : "Information from Random Sips."}
            </DialogDescription>
            {modal === "recipes" && (
              <div className="recipe-dialog-list">
                {(selectedRecipe ? [selectedRecipe] : recipes).map((recipe) => (
                  <article key={recipe.title}>
                    <img src={recipe.image} alt={recipe.title} />
                    <div>
                      <h3>{recipe.title}</h3>
                      <span>{recipe.time}</span>
                      <h4>What you’ll need</h4>
                      <p>{recipe.ingredients}</p>
                      <h4>Make it fresh</h4>
                      <p>{recipe.method}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
            {modal === "privacy" && (
              <p className="policy-copy">
                When you submit a request, your name, email, phone number, delivery address, bottle
                quantity, and notes are emailed to Random Sips so the team can respond. A separate
                acknowledgment is emailed to the address you provide. This form does not collect
                payment details or create an account. If you choose “Use my location” and allow
                location access, your current coordinates are sent directly from your browser to
                BigDataCloud to find your area. This lookup is optional; you can type your address
                instead. Your name and contact details are not sent in the location lookup. See{" "}
                <a
                  href="https://www.bigdatacloud.com/privacy-and-cookie-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BigDataCloud’s privacy policy
                </a>
                .
              </p>
            )}
            {modal === "terms" && (
              <p className="policy-copy">
                Displayed bottle prices are ₹100 for 250 ml. Orders, delivery areas, delivery
                charges, and availability must be confirmed directly with Random Sips before
                purchase. Submitting a request does not confirm an order or delivery. Keep coconut
                water refrigerated and follow the instructions on its label.
              </p>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
