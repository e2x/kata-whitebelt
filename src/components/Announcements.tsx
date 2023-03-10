import Link from "next/link";

const announcements = [
  {
    id: 1,
    title: 'Office closed on July 2nd',
    href: '#',
    preview:
        'Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.',
  },
  {
    id: 2,
    title: 'New password policy',
    href: '#',
    preview:
        'Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est sit autem mollitia.',
  },
  {
    id: 3,
    title: 'Office closed on July 2nd',
    href: '#',
    preview:
        'Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.',
  },
]

export default function Announcements() {
  return (
      <>
        {/* Announcements */}
        <section aria-labelledby="announcements-title">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <h2 className="text-base font-medium text-gray-900" id="announcements-title">
                Announcements
              </h2>
              <div className="mt-6 flow-root">
                <ul role="list" className="-my-5 divide-y divide-gray-200">
                  {announcements.map((announcement) => (
                      <li key={announcement.id} className="py-5">
                        <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
                          <h3 className="text-sm font-semibold text-gray-800">
                            <Link href={announcement.href}
                               className="hover:underline focus:outline-none">
                              {/* Extend touch target to entire panel */}
                              <span className="absolute inset-0" aria-hidden="true"/>
                              {announcement.title}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{announcement.preview}</p>
                        </div>
                      </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <Link
                    href="/"
                    className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  View all
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
  )
};
