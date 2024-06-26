import { useUser } from "@clerk/nextjs";
import { Footer } from "./footer";
import { Header } from "./header";

type Props = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: Props) => {
  return (
    <div className="m-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex flex-col flex-1 flex-grow items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
