import { useAuth } from "@/shared/hooks/useAuth";
import ProfileInfo from "@/features/profile/components/ProfileInfo";
import SettingsMenu from "@/features/profile/components/SettingMenu";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "@/features/profile/components/ProfileHeader";

// const recentComments = [
//   {
//     id: "1",
//     text: "This is an excellent point! I completely agree with your perspective on modern design principles. The minimalist approach really does enhance user experience.",
//     postTitle: "Modern UI Design Trends 2026",
//     timestamp: "2 hours ago",
//   },
//   {
//     id: "2",
//     text: "Thanks for sharing this tutorial. I implemented it in my project and it works perfectly. The dark mode implementation is especially useful.",
//     postTitle: "Advanced React Patterns",
//     timestamp: "5 hours ago",
//   },
//   {
//     id: "3",
//     text: "Great article! The performance optimization techniques you mentioned are game-changers. I've already seen a 40% improvement in load times.",
//     postTitle: "Web Performance Best Practices",
//     timestamp: "1 day ago",
//   },
//   {
//     id: "4",
//     text: "Interesting approach to state management. Have you considered using React Query for server state? It might simplify your data fetching logic.",
//     postTitle: "State Management Solutions Compared",
//     timestamp: "2 days ago",
//   },
// ];

export default function ProfilePage() {

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);


  return (
    <div className="min-h-screen text-white">

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <ProfileHeader/>

        <div className="h-px bg-gradient-to-r from-white/10 via-white/[0.06] to-transparent mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 items-start">

          <div className="space-y-4">
            <ProfileInfo />
            {/* <RecentComments comments={recentComments} /> */}
          </div>

          <div className="lg:sticky lg:top-24">
            <SettingsMenu />
          </div>

        </div>
      </div>
    </div>
  );
}