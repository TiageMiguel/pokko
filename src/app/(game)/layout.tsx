import { HowToPlayBoard } from "@/components/game/scoreboards/rules";
import { Scoreboard } from "@/components/game/scoreboards/scoreboard";
import { Statsboard } from "@/components/game/scoreboards/statsboard";
import { Footer } from "@/components/layout/footer";
import type { FC } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
        <div className="col-span-full lg:col-span-9 h-full">
          <div className="p-3 lg:pr-1.5 h-[65vh] lg:h-screen overflow-hidden">
            {children}
          </div>
        </div>
        <div className="col-span-full lg:col-span-3 h-full">
          <div className="h-[35vh] lg:h-screen p-3 lg:pl-1.5 rounded-lg">
            <div className="bg-neutral-950 overflow-y-auto h-full rounded-lg">
              <div className="p-3 h-full flex flex-col gap-3">
                <Scoreboard />
                <Statsboard />
                <HowToPlayBoard />
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
