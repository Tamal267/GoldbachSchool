import { Button } from '@/components/ui/button'

const notifications = [
  {
    time: '18 Aug 2022 12:00',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores incidunt blanditiis dignissimos, enim earum mollitia.',
  },
  {
    time: '18 Aug 2022 12:00',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores incidunt blanditiis dignissimos, enim earum mollitia.',
  },
  {
    time: '18 Aug 2022 12:00',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores incidunt blanditiis dignissimos, enim earum mollitia.',
  },
  {
    time: '18 Aug 2022 12:00',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores incidunt blanditiis dignissimos, enim earum mollitia. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores incidunt blanditiis dignissimos, enim earum mollitia.',
  },
  {
    time: '18 Aug 2022 12:00',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores incidunt',
  },
]

export default function Notification() {
  return (
    <div className="p-12">
      <h2 className="text-xl text-gray-700 mb-7">Notifictions</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li
            key={index}
            className="relative flex items-baseline gap-6 pb-5"
          >
            <div className="before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                className="bi bi-circle-fill fill-gray-400"
                viewBox="0 0 16 16"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="8"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">{notification.time}</p>
              <p className="mt-2 text-gray-600 ">{notification.message}</p>
            </div>
          </li>
        ))}
      </ul>
      <Button className="mt-10">Load More</Button>
    </div>
  )
}
