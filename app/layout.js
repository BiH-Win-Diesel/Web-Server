import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Provider from "./context/client-provider";

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        style={{
          background: "#F4F4F4",
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        }}
      >
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}
