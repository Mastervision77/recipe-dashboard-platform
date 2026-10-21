import { useState } from "react";
import TabsBar from "../../../shared/TabsBar";
import type { BlogApi } from "../../types/blogs.types";
import BlogPartForm from "./BlogPartForm";
import { StatusTab } from "./StatusTab";
import { blogTabs } from "./blogTabs";

const STATUS_ID = "status";

const tabItems = [
  ...blogTabs.map(({ id, label }) => ({ id, label })),
  { id: STATUS_ID, label: "الحالة" },
];

export default function BlogEditTabs({ record }: { record: BlogApi }) {
  const [active, setActive] = useState(blogTabs[0].id);

  return (
    <div className="space-y-6">
      <TabsBar tabs={tabItems} active={active} onChange={setActive} />

      <div className="rounded-2xl border border-neutral-200 bg-white p-5">
        {/* كل الـ tabs متعمل لها render وبتتخفي بالـ CSS عشان التعديلات اللي لسه متحفظتش متضيعش */}
        {blogTabs.map((tab) => (
          <div key={tab.id} className={active === tab.id ? "" : "hidden"}>
            <BlogPartForm tab={tab} record={record} />
          </div>
        ))}

        <div className={active === STATUS_ID ? "" : "hidden"}>
          <StatusTab record={record} />
        </div>
      </div>
    </div>
  );
}
