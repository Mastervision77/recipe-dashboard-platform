export default function Dashboard() {
  const stats = [
    {
      title: "إجمالي الوصفات",
      value: "248",
      change: "+12%",
    },
    {
      title: "إجمالي الطلبات",
      value: "1,284",
      change: "+18%",
    },
    {
      title: "إجمالي العملاء",
      value: "3,642",
      change: "+9%",
    },
    {
      title: "إجمالي الإيرادات",
      value: "24,850 ج.م",
      change: "+15%",
    },
  ];

  const topRecipes = [
    {
      name: "مكرونة بالدجاج",
      orders: 342,
      revenue: "4,280 ج.م",
    },
    {
      name: "برجر باللحم",
      orders: 286,
      revenue: "3,740 ج.م",
    },
    {
      name: "دجاج بالكريمة",
      orders: 241,
      revenue: "3,120 ج.م",
    },
    {
      name: "بيتزا مارجريتا",
      orders: 198,
      revenue: "2,680 ج.م",
    },
    {
      name: "كيكة الشوكولاتة",
      orders: 176,
      revenue: "2,240 ج.م",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-1024",
      customer: "أحمد علي",
      recipe: "مكرونة بالدجاج",
      amount: "450 ج.م",
      status: "مكتمل",
    },
    {
      id: "#ORD-1023",
      customer: "سارة محمد",
      recipe: "برجر باللحم",
      amount: "320 ج.م",
      status: "قيد الانتظار",
    },
    {
      id: "#ORD-1022",
      customer: "عمر حسن",
      recipe: "دجاج بالكريمة",
      amount: "280 ج.م",
      status: "مكتمل",
    },
    {
      id: "#ORD-1021",
      customer: "مريم علي",
      recipe: "كيكة الشوكولاتة",
      amount: "250 ج.م",
      status: "قيد التجهيز",
    },
  ];

  return (
    <div dir="rtl" className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>

        <p className="mt-1 text-sm text-gray-500">
          نظرة عامة على منصة الوصفات والمتجر
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500">{stat.title}</p>

            <div className="mt-2 flex items-end justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{stat.value}</h2>

              <span className="text-sm font-medium text-green-600">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Most Ordered */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-gray-900">
              أكثر وصفة تم طلبها
            </h2>

            <p className="text-sm text-gray-500">
              الوصفة التي حصلت على أكبر عدد من الطلبات
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">الوصفة الأكثر طلبًا</p>

                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  مكرونة بالدجاج
                </h3>
              </div>

              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">342</p>

                <p className="text-sm text-gray-500">طلب</p>
              </div>
            </div>
          </div>
        </div>

        {/* Most Favorite */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-gray-900">
              الوصفة الأكثر تفضيلًا
            </h2>

            <p className="text-sm text-gray-500">
              الوصفة التي أضافها المستخدمون إلى المفضلة أكثر من غيرها
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">الأكثر إضافة للمفضلة</p>

                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  دجاج بالكريمة
                </h3>
              </div>

              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">1,248</p>

                <p className="text-sm text-gray-500">مفضلة</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Recipes */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            أكثر الوصفات طلبًا
          </h2>

          <p className="text-sm text-gray-500">
            الوصفات الأعلى أداءً من حيث عدد الطلبات
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-3 font-medium">الوصفة</th>

                <th className="px-6 py-3 font-medium">عدد الطلبات</th>

                <th className="px-6 py-3 font-medium">الإيرادات</th>
              </tr>
            </thead>

            <tbody>
              {topRecipes.map((recipe) => (
                <tr key={recipe.name} className="border-t border-gray-100">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {recipe.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">{recipe.orders}</td>

                  <td className="px-6 py-4 text-gray-600">{recipe.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">أحدث الطلبات</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-3 font-medium">رقم الطلب</th>

                <th className="px-6 py-3 font-medium">العميل</th>

                <th className="px-6 py-3 font-medium">الوصفة</th>

                <th className="px-6 py-3 font-medium">المبلغ</th>

                <th className="px-6 py-3 font-medium">الحالة</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-t border-gray-100">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {order.id}
                  </td>

                  <td className="px-6 py-4 text-gray-600">{order.customer}</td>

                  <td className="px-6 py-4 text-gray-600">{order.recipe}</td>

                  <td className="px-6 py-4 font-medium text-gray-900">
                    {order.amount}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
