import Image from "next/image";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left side — form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Right side — decorative */}
      <div className="hidden lg:flex flex-1 items-center justify-center m-3 bg-muted dark:bg-muted-dark rounded-2xl">
        <div className="text-center px-12">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Image
              src="/auth-pattern-01.webp"
              alt="Pattern"
              width={223}
              height={193}
              className="h-16 w-auto"
            />
            <Image
              src="/auth-pattern-02.webp"
              alt="Pattern"
              width={258}
              height={258}
              className="h-16 w-auto"
            />
            <Image
              src="/auth-pattern-03.webp"
              alt="Pattern"
              width={236}
              height={258}
              className="h-16 w-auto"
            />
          </div>
          <div className="text-2xl font-medium">
            O&apos;qing. Tinglang. His qiling. <br />{" "}
            <span className="text-foreground-muted">Mutolaa bilan asarlar ichida yashang.</span>
          </div>
          {/* <p className="mt-0 text-lg text-gray-500 dark:text-gray-400">
            Mutolaa bilan asarlar ichida yashang.
          </p> */}
        </div>
      </div>
    </div>
  );
}
