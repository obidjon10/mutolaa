export default function ReaderRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#EDEDEE] dark:bg-[#0F0F10]">
      {children}
    </div>
  );
}
