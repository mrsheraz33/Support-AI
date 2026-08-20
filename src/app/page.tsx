import HomeClient from "@/components/HomeClient";
import { getSession } from "@/lib/getSession";

async function Home() {
  const session = await getSession();
const picture = session?.user?.userProfile?.picture

  return (
    <>
      <HomeClient email={session?.user?.email!} picture={picture!}/>
    </>
  );
}

export default Home;
