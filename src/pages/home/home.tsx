import logo from "../../assets/logo.svg";
import heroImage from "../../assets/home_hero.png";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/auth/auth-modal/auth-modal";
import { AuthScreen } from "@/utils/enums/auth.enum";
import { useState } from "react";

interface FooterLink {
  href: string;
  label: string;
  hiddenOnMobile?: boolean;
}

const footerLinks: FooterLink[] = [
  { href: "https://medium.statuspage.io/", label: "Status" },
  { href: "https://about.medium.com", label: "About" },
  { href: "https://medium.com/careers", label: "Careers" },
  { href: "https://medium.com/press", label: "Press" },
  { href: "https://help.medium.com", label: "Help", hiddenOnMobile: true },
  { href: "https://blog.medium.com", label: "Blog", hiddenOnMobile: true },
  { href: "https://medium.com/policy/privacy-policy", label: "Privacy" },
  { href: "https://medium.com/policy/terms-of-service", label: "Terms" },
];

const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authScreen, setAuthScreen] = useState<AuthScreen>(AuthScreen.REGISTER);

  const onAuthModalOpen = (screen: AuthScreen) => {
    setAuthScreen(screen);
    setIsAuthModalOpen(true);
  };

  const onAuthModalClose = () => setIsAuthModalOpen(false);

  return (
    <div className="bg-[#f7f4ed] h-screen overflow-hidden">
      <div className="max-w-screen-2xl mx-auto h-full">
        {/* Navbar */}
        <div className="navbar h-[75px] px-2 md:px-36 py-6 border-b border-black flex justify-between items-center">
          <img width={112} height={25} src={logo} alt="Logo" />
          <ul className="flex gap-6 text-sm font-medium items-center">
            <li
              className="hidden md:block cursor-pointer"
              onClick={() => onAuthModalOpen(AuthScreen.LOGIN)}
            >
              Write
            </li>
            <li
              className="hidden md:block cursor-pointer"
              onClick={() => onAuthModalOpen(AuthScreen.LOGIN)}
            >
              Sign in
            </li>
            <li
              className="bg-black text-white rounded-full px-3 py-2 cursor-pointer"
              onClick={() => onAuthModalOpen(AuthScreen.REGISTER)}
            >
              Get Started
            </li>
          </ul>
        </div>

        {/* Hero Section */}
        <div className="hero h-4/5 border-b overflow-hidden border-black flex items-center justify-between">
          <div className="p-4 md:pl-36">
            <h1 className="text-6xl sm:text-8xl md:text-[120px] font-serif font-medium leading-tight text-[#242424] tracking-tighter">
              Human <br className="hidden md:block" /> stories & ideas
            </h1>
            <p className="mt-6 text-[#242424] text-base sm:text-xl md:text-2xl">
              A place to read, write, and deepen your understanding
            </p>

            <Button
              onClick={() => onAuthModalOpen(AuthScreen.REGISTER)}
              className="mt-8 h-12 rounded-full text-lg px-12 "
            >
              Start Reading
            </Button>
          </div>
          <img
            src={heroImage}
            alt="Hero Image"
            className="max-w-md -mb-12 hidden md:block"
          />
        </div>
        {/* Footer */}
        <div className="footer bg-black md:bg-transparent w-full py-7 flex justify-center">
          <ul className="flex gap-4 text-xs text-white md:text-gray-500">
            {footerLinks.map(({ href, label, hiddenOnMobile }, index) => (
              <li
                key={index}
                className={hiddenOnMobile ? "hidden md:block" : ""}
              >
                <a href={href} className="hover:underline">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={onAuthModalClose}
        screen={authScreen}
        setAuthScreen={setAuthScreen}
      />
    </div>
  );
};

export default Home;
