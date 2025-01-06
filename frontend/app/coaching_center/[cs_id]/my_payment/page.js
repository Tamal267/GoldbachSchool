import { SquareArrowOutUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const payment_details = [
  {
    name: 'Number Of Classes',
    image: '/Assets/numberOfClasses.svg',
    value: 20,
  },
  {
    name: 'Number Of Evaluations',
    image: '/Assets/numberOfEvaluation.svg',
    value: 20,
  },
  {
    name: 'Total Payment',
    image: '/Assets/totalPayment.svg',
    value: 20,
  },
  {
    name: 'Due Payment',
    image: '/Assets/duePayment.svg',
    value: 20,
  },
  {
    name: 'Payment Details',
    image: '/Assets/paymentDetails.svg',
    link: '#',
  },
]

export default function Routine() {
  return (
    <div className="flex flex-col gap-8 p-12">
      <div className="p-4 border rounded-lg flex flex-col gap-4">
        <div className="flex flex-row items-baseline gap-4">
          <h1 className="text-2xl font-semibold font-poppins">
            Your Payment Overview
          </h1>
        </div>
        {payment_details.map((detail, index) => (
          <div
            key={index}
            className="flex justify-between rounded-full h-12 bg-[#A5C4DB] shadow-lg"
          >
            <Image
              src={detail.image}
              alt="link"
              className="h-full w-auto"
              width={500}
              height={300}
            />
            <div className="flex-grow p-4 flex items-center justify-between gap-4">
              <div className="flex flex-row gap-2 justify-between">
                {detail.name}
              </div>
              {detail.value ? (
                <div className="font-epilogue py-1 px-4 shadow-md shadow-black rounded-full">
                  {detail.value}
                </div>
              ) : (
                <Link href={detail.link}>
                  <div className="font-epilogue py-1 px-4 shadow-md shadow-black rounded-full">
                    <SquareArrowOutUpRight size={20} />
                  </div>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
