import { Sidebar } from "@/components/dashboard/Sidebar";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#07070f] text-white flex">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <ComingSoon title="Profile" />
      </div>
    </div>
  );
}
