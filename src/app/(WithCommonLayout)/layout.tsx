/* eslint-disable prettier/prettier */

import { Navbar } from "@/src/components/navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <div className="w-full shadow shadow-slate-500">
        <Navbar />
      </div>
      <main>{children}</main>
    </div>
  );
}
