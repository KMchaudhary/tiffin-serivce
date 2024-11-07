// app/admin/dashboard/page.tsx

import { redirect } from "next/navigation";

export default function DashboardIndexPage() {
  // Redirect to the menu page
  redirect("/admin/dashboard/menu");
}
