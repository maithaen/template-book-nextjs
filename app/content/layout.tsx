import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="lg:pl-[272px] pt-16 min-h-screen">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </>
  );
}
